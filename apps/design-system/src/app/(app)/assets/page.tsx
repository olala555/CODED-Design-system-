import Link from "next/link";
import { Icon } from "@/components/Icon";
import { AssetUploader } from "@/components/AssetUploader";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/supabase/admin-emails";
import { signOut } from "@/app/(app)/login/actions";
import { deleteAsset } from "./actions";
import { listAllAssets } from "@/lib/asset-catalog";
import {
  type Asset,
  type AssetCategory,
  type LogoVariant,
  type ProgramOption,
  CATEGORIES,
  LOGO_VARIANTS,
  formatBytes,
  isCategory,
  isImageFormat,
  isLogoVariant,
  isProgramId,
  programOptions,
} from "@/lib/assets";
import { sponsorName } from "@/lib/sponsors";
import { getPalette, primaryColor } from "@/lib/brand";

export const dynamic = "force-dynamic";

/** Items per page in the flat (single-filter) grid view. */
const PAGE_SIZE = 12;
/** Items shown per category before "View all" in the grouped "All" view. */
const PREVIEW_PER_CATEGORY = 8;

type SearchParamShape = {
  category?: string;
  program?: string;
  variant?: string;
  page?: string;
};

function buildHref(current: SearchParamShape, next: SearchParamShape): string {
  const merged = { ...current, ...next };
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(merged)) {
    if (k === "page") continue; // handled below so filters reset paging
    if (v && v !== "all") sp.set(k, v);
  }
  // Page only persists when a pagination control sets it explicitly — any
  // filter change (which omits `page` in `next`) resets back to page 1.
  if (next.page && next.page !== "1") sp.set("page", next.page);
  const qs = sp.toString();
  return qs ? `/assets?${qs}` : "/assets";
}

function Pager({
  params,
  page,
  totalPages,
}: {
  params: SearchParamShape;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const base =
    "inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2.5 text-[12.5px] font-medium";
  const inactive =
    "border border-[color:var(--border-soft)] bg-white text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--coded-navy)]";
  const activeCls = "bg-[color:var(--coded-navy)] text-white";
  const disabledCls =
    "cursor-not-allowed border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] text-[color:var(--text-tertiary)] opacity-60";

  return (
    <nav
      className="mt-8 flex flex-wrap items-center justify-center gap-1.5"
      aria-label="Asset pagination"
    >
      {page > 1 ? (
        <Link href={buildHref(params, { page: String(page - 1) })} className={`${base} ${inactive}`}>
          ‹ Prev
        </Link>
      ) : (
        <span className={`${base} ${disabledCls}`}>‹ Prev</span>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
        <Link
          key={p}
          href={buildHref(params, { page: String(p) })}
          aria-current={p === page ? "page" : undefined}
          className={`${base} ${p === page ? activeCls : inactive}`}
        >
          {p}
        </Link>
      ))}

      {page < totalPages ? (
        <Link href={buildHref(params, { page: String(page + 1) })} className={`${base} ${inactive}`}>
          Next ›
        </Link>
      ) : (
        <span className={`${base} ${disabledCls}`}>Next ›</span>
      )}
    </nav>
  );
}

function ChipLink({
  href,
  active,
  children,
  count,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  count?: number;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "inline-flex items-center gap-1.5 rounded-full bg-[color:var(--coded-navy)] px-3 py-1 text-[12px] font-medium text-white"
          : "inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border-soft)] bg-white px-3 py-1 text-[12px] font-medium text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--coded-navy)]"
      }
    >
      {children}
      {typeof count === "number" && (
        <span
          className={
            active
              ? "text-[10.5px] text-white/70"
              : "text-[10.5px] text-[color:var(--text-tertiary)]"
          }
        >
          {count}
        </span>
      )}
    </Link>
  );
}

function programLabel(programs: ProgramOption[], id: string | null): string {
  if (!id) return "Unfiled";
  return programs.find((p) => p.id === id)?.label ?? id;
}

function AssetCard({
  asset,
  programs,
  canDelete,
}: {
  asset: Asset;
  programs: ProgramOption[];
  canDelete: boolean;
}) {
  const isSponsor = asset.category === "sponsors";
  const palette = asset.paletteId ? getPalette(asset.paletteId) : null;
  const accent = asset.paletteId ? primaryColor(asset.paletteId) : "#14243F";
  // White-variant logos need a dark surface so they're actually visible.
  const previewBg =
    asset.variant === "white"
      ? `linear-gradient(135deg, ${accent} 0%, #14243F 100%)`
      : undefined;
  const previewClass = asset.variant === "white"
    ? ""
    : "bg-[color:var(--surface-2)]";
  const title = isSponsor ? sponsorName(asset.sponsor ?? "") : asset.fileName;
  const meta = isSponsor
    ? `Sponsor · ${formatBytes(asset.size)}`
    : `${programLabel(programs, asset.paletteId)}${
        asset.variant ? ` · ${asset.variant}` : ""
      } · ${formatBytes(asset.size)}`;

  return (
    <li className="overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-white shadow-[var(--shadow-soft)]">
      <div
        className={`aspect-[4/3] grid place-items-center overflow-hidden ${previewClass}`}
        style={previewBg ? { background: previewBg } : undefined}
      >
        {isImageFormat(asset.format) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={asset.publicUrl}
            alt={asset.fileName}
            className="h-full w-full object-contain p-6"
            loading="lazy"
          />
        ) : (
          <Icon name="image" size={28} />
        )}
      </div>
      <div className="p-3.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="truncate text-[13px] font-medium text-[color:var(--coded-navy)]">
              {title}
            </div>
            <div className="mt-0.5 truncate text-[11.5px] text-[color:var(--text-tertiary)]">
              {meta}
            </div>
          </div>
          {palette && (
            <div
              className="mt-0.5 h-3 w-3 shrink-0 rounded-full ring-1 ring-inset ring-black/10"
              style={{ background: accent }}
              title={`${palette.label} primary`}
            />
          )}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <a
            href={asset.publicUrl}
            download
            className="inline-flex items-center gap-1 text-[12.5px] font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
          >
            <Icon name="download" size={13} /> Download
          </a>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[color:var(--surface-2)] px-1.5 py-0.5 font-mono text-[10px] uppercase text-[color:var(--text-tertiary)]">
              {asset.format}
            </span>
            {canDelete && (
              <form action={deleteAsset}>
                <input type="hidden" name="path" value={asset.path} />
                <button
                  className="text-[12px] text-[color:var(--text-tertiary)] hover:text-red-600"
                  type="submit"
                >
                  Delete
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default async function AssetsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParamShape>;
}) {
  const hasSupabase =
    !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!hasSupabase) {
    return (
      <div className="mx-auto max-w-[900px] px-6 lg:px-10 py-12">
        <div className="rounded-3xl border border-[color:var(--border-soft)] bg-white p-10 shadow-[var(--shadow-soft)]">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--surface-2)] text-[color:var(--accent)]">
            <Icon name="image" size={22} />
          </div>
          <h1 className="mt-4 text-[24px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
            Connect Supabase to enable the asset library
          </h1>
          <p className="mt-2 text-[13.5px] text-[color:var(--text-secondary)]">
            Set <code>NEXT_PUBLIC_SUPABASE_URL</code>, <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code>,
            and <code>ADMIN_EMAILS</code> in <code>.env.local</code>, then restart the dev server.
          </p>
        </div>
      </div>
    );
  }

  const sp = await searchParams;
  const activeCategory: AssetCategory | "all" = isCategory(sp.category) ? sp.category : "all";
  const activeProgram: string | "all" = isProgramId(sp.program) ? sp.program! : "all";
  const activeVariant: LogoVariant | "all" = isLogoVariant(sp.variant) ? sp.variant : "all";
  const requestedPage = Math.max(1, Number.parseInt(sp.page ?? "1", 10) || 1);

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const canUpload = isAdminEmail(user?.email);

  // Reuse a recent walk when possible — uploads/deletes call invalidateAssetCache(),
  // so the listing is always fresh after a mutation while plain navigation stays fast
  // even when Supabase Storage's list latency spikes.
  const { assets, error } = await listAllAssets({ maxAgeMs: 30_000 });
  const programs = programOptions();

  const params: SearchParamShape = {
    category: activeCategory === "all" ? undefined : activeCategory,
    program: activeProgram === "all" ? undefined : activeProgram,
    variant: activeVariant === "all" ? undefined : activeVariant,
  };

  // Filter assets based on active params.
  const filtered = assets.filter((a) => {
    if (activeCategory !== "all" && a.category !== activeCategory) return false;
    if (activeProgram !== "all" && a.paletteId !== activeProgram) return false;
    if (activeVariant !== "all" && a.variant !== activeVariant) return false;
    return true;
  });

  // Counts for chips — these always reflect the *other* filters, so the user
  // sees how many assets would remain if they switch just this dimension.
  const countByCategory = (cat: AssetCategory | "all") =>
    assets.filter((a) => {
      if (cat !== "all" && a.category !== cat) return false;
      if (activeProgram !== "all" && a.paletteId !== activeProgram) return false;
      if (activeVariant !== "all" && a.variant !== activeVariant) return false;
      return true;
    }).length;

  const countByProgram = (programId: string | "all") =>
    assets.filter((a) => {
      if (activeCategory !== "all" && a.category !== activeCategory) return false;
      if (programId !== "all" && a.paletteId !== programId) return false;
      if (activeVariant !== "all" && a.variant !== activeVariant) return false;
      return true;
    }).length;

  const countByVariant = (variant: LogoVariant | "all") =>
    assets.filter((a) => {
      if (a.category !== "logos") return false;
      if (activeProgram !== "all" && a.paletteId !== activeProgram) return false;
      if (variant !== "all" && a.variant !== variant) return false;
      return true;
    }).length;

  const unfiledCount = assets.filter((a) => a.category === null).length;

  // Pagination applies to the flat (single-filter) grid. The grouped "All"
  // view is capped per category instead, so paging there would be confusing.
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(requestedPage, totalPages);
  const pageStart = (currentPage - 1) * PAGE_SIZE;
  const pagedAssets = filtered.slice(pageStart, pageStart + PAGE_SIZE);

  return (
    <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
            Asset library
          </div>
          <h1 className="mt-1 text-[28px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
            Brand assets
          </h1>
          <p className="mt-1 max-w-2xl text-[13.5px] text-[color:var(--text-secondary)]">
            Product logos (colored &amp; white), brand assets, and backgrounds — organised by
            program. Stored in Supabase Storage; Figma sync arrives via MCP next.
          </p>
        </div>
        <div className="flex items-center gap-3 text-[12.5px]">
          {user ? (
            <>
              <span className="text-[color:var(--text-secondary)]">
                Signed in as <strong>{user.email}</strong>
                {!canUpload && " (read-only)"}
              </span>
              <form action={signOut}>
                <button className="rounded-lg border border-[color:var(--border-soft)] bg-white px-3 py-1.5 font-medium text-[color:var(--coded-navy)] hover:bg-[color:var(--surface-2)]">
                  Sign out
                </button>
              </form>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-[color:var(--coded-navy)] px-3 py-1.5 font-medium text-white hover:bg-[color:var(--accent-strong)]"
            >
              Admin sign in
            </Link>
          )}
        </div>
      </header>

      {canUpload && (
        <div className="mt-8">
          <AssetUploader programs={programs} />
        </div>
      )}

      <section className="mt-8">
        {/* Category chips */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
            Category
          </span>
          <ChipLink
            href={buildHref(params, { category: undefined, variant: undefined })}
            active={activeCategory === "all"}
            count={countByCategory("all")}
          >
            All
          </ChipLink>
          {CATEGORIES.map((c) => (
            <ChipLink
              key={c.id}
              href={buildHref(params, {
                category: c.id,
                variant: c.id === "logos" ? activeVariant === "all" ? undefined : activeVariant : undefined,
              })}
              active={activeCategory === c.id}
              count={countByCategory(c.id)}
            >
              {c.label}
            </ChipLink>
          ))}
          {unfiledCount > 0 && (
            <span className="text-[11.5px] text-[color:var(--text-tertiary)]">
              · {unfiledCount} unfiled
            </span>
          )}
        </div>

        {/* Program chips */}
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
            Program
          </span>
          <ChipLink
            href={buildHref(params, { program: undefined })}
            active={activeProgram === "all"}
            count={countByProgram("all")}
          >
            All programs
          </ChipLink>
          {programs.map((p) => (
            <ChipLink
              key={p.id}
              href={buildHref(params, { program: p.id })}
              active={activeProgram === p.id}
              count={countByProgram(p.id)}
            >
              {p.label}
              {p.kind === "master" && (
                <span className="ml-0.5 rounded bg-white/15 px-1 text-[9.5px] uppercase tracking-wider">
                  Master
                </span>
              )}
            </ChipLink>
          ))}
        </div>

        {/* Variant chips — only shown when category is logos */}
        {activeCategory === "logos" && (
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
              Variant
            </span>
            <ChipLink
              href={buildHref(params, { variant: undefined })}
              active={activeVariant === "all"}
              count={countByVariant("all")}
            >
              Colored &amp; white
            </ChipLink>
            {LOGO_VARIANTS.map((v) => (
              <ChipLink
                key={v.id}
                href={buildHref(params, { variant: v.id })}
                active={activeVariant === v.id}
                count={countByVariant(v.id)}
              >
                {v.label}
              </ChipLink>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-[13px] text-red-700">
            Could not load assets: {error}
          </div>
        )}

        {!error && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[color:var(--border-soft)] bg-white p-10 text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--surface-2)] text-[color:var(--text-tertiary)]">
              <Icon name="image" size={22} />
            </div>
            <h3 className="mt-3 text-[15px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
              No assets here yet
            </h3>
            <p className="mt-1 text-[13px] text-[color:var(--text-secondary)]">
              {assets.length === 0
                ? canUpload
                  ? "The bucket is empty — upload your first file above."
                  : "The bucket is empty. Sign in as an admin to add files."
                : "No assets match the current filters."}
            </p>
          </div>
        )}

        {filtered.length > 0 && activeCategory === "all" ? (
          // When viewing "All", split into one section per category so it
          // remains organised even with many files.
          <div className="space-y-10">
            {CATEGORIES.map((c) => {
              const inCat = filtered.filter((a) => a.category === c.id);
              if (inCat.length === 0) return null;
              return (
                <div key={c.id}>
                  <div className="flex items-baseline justify-between">
                    <h2 className="text-[16px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
                      {c.label}
                      <span className="ml-2 text-[12px] font-normal text-[color:var(--text-tertiary)]">
                        {inCat.length}
                      </span>
                    </h2>
                    <Link
                      href={buildHref(params, { category: c.id })}
                      className="text-[12.5px] font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
                    >
                      {inCat.length > PREVIEW_PER_CATEGORY
                        ? `View all ${inCat.length} →`
                        : "View all →"}
                    </Link>
                  </div>
                  <p className="mt-0.5 text-[12.5px] text-[color:var(--text-secondary)]">
                    {c.description}
                  </p>
                  <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {inCat.slice(0, PREVIEW_PER_CATEGORY).map((a) => (
                      <AssetCard
                        key={a.path}
                        asset={a}
                        programs={programs}
                        canDelete={canUpload}
                      />
                    ))}
                  </ul>
                </div>
              );
            })}
            {unfiledCount > 0 && (
              <div>
                <h2 className="text-[16px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
                  Unfiled
                  <span className="ml-2 text-[12px] font-normal text-[color:var(--text-tertiary)]">
                    {unfiledCount}
                  </span>
                </h2>
                <p className="mt-0.5 text-[12.5px] text-[color:var(--text-secondary)]">
                  Files that don&rsquo;t follow the {`<category>/<program>/...`} convention.
                </p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {filtered
                    .filter((a) => a.category === null)
                    .map((a) => (
                      <AssetCard
                        key={a.path}
                        asset={a}
                        programs={programs}
                        canDelete={canUpload}
                      />
                    ))}
                </ul>
              </div>
            )}
          </div>
        ) : filtered.length > 0 ? (
          <>
            <div className="mb-4 text-[12px] text-[color:var(--text-tertiary)]">
              {filtered.length} asset{filtered.length === 1 ? "" : "s"}
              {totalPages > 1 && (
                <>
                  {" "}· showing {pageStart + 1}–
                  {Math.min(pageStart + PAGE_SIZE, filtered.length)} (page {currentPage} of{" "}
                  {totalPages})
                </>
              )}
            </div>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pagedAssets.map((a) => (
                <AssetCard
                  key={a.path}
                  asset={a}
                  programs={programs}
                  canDelete={canUpload}
                />
              ))}
            </ul>
            <Pager params={params} page={currentPage} totalPages={totalPages} />
          </>
        ) : null}
      </section>
    </div>
  );
}
