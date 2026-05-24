import { Icon } from "@/components/Icon";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { formatBytes, isImageFormat } from "@/lib/assets";
import { groupSponsors, SPONSORS_PREFIX, type Sponsor } from "@/lib/sponsors";

export const dynamic = "force-dynamic";

const BUCKET = "assets";

async function listSponsors(): Promise<{ sponsors: Sponsor[]; error: string | null }> {
  const supabase = await createSupabaseServerClient();

  // Storage.list() is non-recursive — walk the sponsors/ subtree depth-first.
  const visited = new Set<string>();
  const queue: string[] = [SPONSORS_PREFIX];
  const files: { path: string; fileName: string; publicUrl: string; size: number | null }[] = [];

  while (queue.length) {
    const prefix = queue.shift()!;
    if (visited.has(prefix)) continue;
    visited.add(prefix);

    const { data, error } = await supabase.storage.from(BUCKET).list(prefix, {
      limit: 1000,
      sortBy: { column: "name", order: "asc" },
    });
    if (error) return { sponsors: [], error: error.message };
    if (!data) continue;

    for (const item of data) {
      const fullPath = `${prefix}/${item.name}`;
      // Folders have a null `id`; files have one.
      if (!item.id) {
        queue.push(fullPath);
        continue;
      }
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(fullPath);
      files.push({
        path: fullPath,
        fileName: item.name,
        publicUrl: pub.publicUrl,
        size: (item.metadata as { size?: number } | null)?.size ?? null,
      });
    }
  }

  return { sponsors: groupSponsors(files), error: null };
}

function SponsorCard({ sponsor }: { sponsor: Sponsor }) {
  return (
    <li className="flex flex-col overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-white shadow-[var(--shadow-soft)]">
      <div className="grid aspect-[16/10] place-items-center overflow-hidden bg-white p-7">
        {sponsor.logo && isImageFormat(sponsor.logo.format) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={sponsor.logo.publicUrl}
            alt={`${sponsor.name} logo`}
            className="h-full w-full object-contain"
            loading="lazy"
          />
        ) : (
          <Icon name="image" size={28} />
        )}
      </div>
      <div className="flex flex-1 flex-col border-t border-[color:var(--border-soft)] p-3.5">
        <div className="text-[13.5px] font-medium text-[color:var(--coded-navy)]">
          {sponsor.name}
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          {sponsor.logo && (
            <a
              href={sponsor.logo.publicUrl}
              download
              className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
            >
              <Icon name="download" size={13} /> Logo
            </a>
          )}
          {sponsor.documents.map((doc) => (
            <a
              key={doc.path}
              href={doc.publicUrl}
              download
              className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
              title={`${doc.fileName} · ${formatBytes(doc.size)}`}
            >
              <Icon name="book" size={13} /> Guidelines
            </a>
          ))}
          {!sponsor.logo && sponsor.documents.length === 0 && (
            <span className="text-[12px] text-[color:var(--text-tertiary)]">No files yet</span>
          )}
        </div>
      </div>
    </li>
  );
}

export default async function SponsorsPage() {
  const hasSupabase =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!hasSupabase) {
    return (
      <div className="mx-auto max-w-[900px] px-6 lg:px-10 py-12">
        <div className="rounded-3xl border border-[color:var(--border-soft)] bg-white p-10 shadow-[var(--shadow-soft)]">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--surface-2)] text-[color:var(--accent)]">
            <Icon name="handshake" size={22} />
          </div>
          <h1 className="mt-4 text-[24px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
            Connect Supabase to enable the sponsor library
          </h1>
          <p className="mt-2 text-[13.5px] text-[color:var(--text-secondary)]">
            Set <code>NEXT_PUBLIC_SUPABASE_URL</code> and <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>{" "}
            in <code>.env.local</code>, then restart the dev server.
          </p>
        </div>
      </div>
    );
  }

  const { sponsors, error } = await listSponsors();

  return (
    <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-10">
      <header>
        <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
          Sponsors
        </div>
        <h1 className="mt-1 text-[28px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
          Sponsor logo library
        </h1>
        <p className="mt-1 max-w-2xl text-[13.5px] text-[color:var(--text-secondary)]">
          Approved partner and sponsor logos for co-branded materials. Brand-guideline PDFs are
          added per sponsor as we receive them. Stored in Supabase Storage.
        </p>
      </header>

      <section className="mt-8">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-[13px] text-red-700">
            Could not load sponsors: {error}
          </div>
        )}

        {!error && sponsors.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[color:var(--border-soft)] bg-white p-10 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--surface-2)] text-[color:var(--text-tertiary)]">
              <Icon name="handshake" size={22} />
            </div>
            <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
              No sponsors yet
            </h3>
            <p className="mt-1 text-[13px] text-[color:var(--text-secondary)]">
              Upload logos to the <code>sponsors/&lt;id&gt;/</code> folder in the assets bucket.
            </p>
          </div>
        )}

        {!error && sponsors.length > 0 && (
          <>
            <div className="text-[12.5px] text-[color:var(--text-tertiary)]">
              {sponsors.length} sponsors
            </div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {sponsors.map((s) => (
                <SponsorCard key={s.id} sponsor={s} />
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}
