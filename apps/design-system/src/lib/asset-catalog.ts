import "server-only";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { type Asset, assetFormat, parseAssetPath } from "@/lib/assets";

const BUCKET = "assets";
/** Max concurrent Storage.list() calls. High enough to be fast, low enough to
 *  avoid the 502/504s Supabase returns when the walk bursts too many at once. */
const WALK_CONCURRENCY = 10;
/** Extra attempts after the first for a single flaky list call. */
const LIST_RETRIES = 2;

export type AssetListResult = { assets: Asset[]; error: string | null };

// Process-level cache of the last successful walk. Only read when the caller
// opts in via `maxAgeMs` (the assistant tool does; the asset page does not, so
// it always reflects fresh uploads). Errors are never cached.
let cache: { at: number; value: AssetListResult } | null = null;

/** Bounded-concurrency async map — runs `fn` over `items`, at most `limit` in flight. */
async function pmap<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const i = cursor++;
      results[i] = await fn(items[i]);
    }
  });
  await Promise.all(workers);
  return results;
}

/** Lists a single folder, retrying a few times — Supabase Storage list calls
 *  intermittently time out (504) or 502, and a quick retry almost always clears it. */
async function listFolder(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  prefix: string,
) {
  let lastError = "unknown error";
  for (let attempt = 0; attempt <= LIST_RETRIES; attempt++) {
    const { data, error } = await supabase.storage.from(BUCKET).list(prefix, {
      limit: 1000,
      sortBy: { column: "name", order: "asc" },
    });
    if (!error) return { prefix, data, error: null as string | null };
    lastError = error.message;
    await new Promise((r) => setTimeout(r, 150 * (attempt + 1)));
  }
  return { prefix, data: null, error: lastError };
}

/**
 * Walks the public `assets` bucket and returns every file as an Asset. Shared
 * by the asset library page and the brand assistant's `search_brand_assets`
 * tool so both see the exact same catalogue.
 *
 * Storage.list() is non-recursive and costs one network round-trip per folder.
 * The bucket is only a few levels deep (category / program / variant), so we
 * walk breadth-first and list each depth's folders with bounded concurrency —
 * collapsing dozens of serial round-trips (~17s, often timing out) into a few
 * fast parallel batches.
 *
 * @param maxAgeMs  If > 0 and a successful walk happened within this window,
 *                  the cached result is returned instead of re-walking.
 */
export async function listAllAssets(
  { maxAgeMs = 0 }: { maxAgeMs?: number } = {},
): Promise<AssetListResult> {
  if (maxAgeMs > 0 && cache && Date.now() - cache.at < maxAgeMs) {
    return cache.value;
  }

  const supabase = await createSupabaseServerClient();
  const assets: Asset[] = [];
  const visited = new Set<string>();
  let frontier: string[] = [""];

  while (frontier.length) {
    const prefixes = frontier.filter((p) => !visited.has(p));
    prefixes.forEach((p) => visited.add(p));

    const levelResults = await pmap(prefixes, WALK_CONCURRENCY, (prefix) =>
      listFolder(supabase, prefix),
    );

    const nextFrontier: string[] = [];
    for (const { prefix, data, error } of levelResults) {
      if (error) return { assets, error };
      if (!data) continue;

      for (const item of data) {
        const fullPath = prefix ? `${prefix}/${item.name}` : item.name;
        // Folders have a null `id`; files have one.
        if (!item.id) {
          nextFrontier.push(fullPath);
          continue;
        }
        const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(fullPath);
        const parsed = parseAssetPath(fullPath);
        const fileName = parsed?.fileName ?? item.name;
        assets.push({
          path: fullPath,
          fileName,
          size: (item.metadata as { size?: number } | null)?.size ?? null,
          contentType: (item.metadata as { mimetype?: string } | null)?.mimetype ?? null,
          format: assetFormat(fileName),
          publicUrl: pub.publicUrl,
          source: "supabase",
          category: parsed?.category ?? null,
          paletteId: parsed?.paletteId ?? null,
          variant: parsed?.variant ?? null,
          sponsor: parsed?.sponsor ?? null,
        });
      }
    }

    frontier = nextFrontier;
  }

  const value: AssetListResult = { assets, error: null };
  cache = { at: Date.now(), value };
  return value;
}

/** Clears the cached walk — call after an upload/delete so the next read is fresh. */
export function invalidateAssetCache(): void {
  cache = null;
}
