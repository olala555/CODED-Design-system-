import { brand, getPalette } from "./brand";

export type AssetCategory = "logos" | "brand" | "backgrounds" | "sponsors";
export type LogoVariant = "colored" | "white";
export type AssetSource = "supabase" | "figma";

export const CATEGORIES: ReadonlyArray<{
  id: AssetCategory;
  label: string;
  description: string;
  hasVariant: boolean;
}> = [
  {
    id: "logos",
    label: "Product logos",
    description: "Program logos in colored and white variants.",
    hasVariant: true,
  },
  {
    id: "brand",
    label: "Brand assets",
    description: "Marks, icons, ornaments, mascots, and other brand pieces.",
    hasVariant: false,
  },
  {
    id: "backgrounds",
    label: "Backgrounds",
    description: "Full-resolution backgrounds for slides, socials, and prints.",
    hasVariant: false,
  },
  {
    id: "sponsors",
    label: "Sponsors",
    description: "Partner and sponsor logos, grouped by sponsor.",
    hasVariant: false,
  },
];

export const LOGO_VARIANTS: ReadonlyArray<{ id: LogoVariant; label: string }> = [
  { id: "colored", label: "Colored" },
  { id: "white", label: "White" },
];

export function isCategory(value: string | null | undefined): value is AssetCategory {
  return (
    value === "logos" ||
    value === "brand" ||
    value === "backgrounds" ||
    value === "sponsors"
  );
}

export function isLogoVariant(value: string | null | undefined): value is LogoVariant {
  return value === "colored" || value === "white";
}

export type ProgramOption = {
  id: string;
  label: string;
  kind: "master" | "product";
};

export function programOptions(): ProgramOption[] {
  const order = (kind: "master" | "product") => (kind === "master" ? 0 : 1);
  return Object.entries(brand.palettes)
    .map(([id, p]) => ({ id, label: p.label, kind: p.kind }))
    .sort((a, b) => order(a.kind) - order(b.kind) || a.label.localeCompare(b.label));
}

export function isProgramId(value: string | null | undefined): boolean {
  return typeof value === "string" && !!getPalette(value);
}

export type AssetFormat =
  | "svg"
  | "png"
  | "jpg"
  | "webp"
  | "gif"
  | "avif"
  | "pdf"
  | "other";

export function assetFormat(fileName: string): AssetFormat {
  const ext = fileName.split(".").pop()?.toLowerCase();
  switch (ext) {
    case "svg":
    case "png":
    case "webp":
    case "gif":
    case "avif":
    case "pdf":
      return ext;
    case "jpg":
    case "jpeg":
      return "jpg";
    default:
      return "other";
  }
}

export function isImageFormat(format: AssetFormat): boolean {
  return (
    format === "svg" ||
    format === "png" ||
    format === "jpg" ||
    format === "webp" ||
    format === "gif" ||
    format === "avif"
  );
}

/**
 * Parses a Supabase Storage path like `logos/coded/colored/wordmark.svg` into
 * its structural pieces. Returns null when the path doesn't follow the
 * category/program convention — those files still render in the grid but
 * without category metadata.
 */
export type ParsedAssetPath = {
  category: AssetCategory;
  paletteId: string | null;
  variant: LogoVariant | null;
  /** Sponsor folder slug — only set for the `sponsors` category. */
  sponsor: string | null;
  fileName: string;
};

export function parseAssetPath(path: string): ParsedAssetPath | null {
  const parts = path.split("/").filter(Boolean);
  if (parts.length < 3) return null;

  const [rawCategory, second, ...rest] = parts;
  if (!isCategory(rawCategory)) return null;

  // Sponsors are grouped by sponsor slug, not by program palette.
  if (rawCategory === "sponsors") {
    return {
      category: "sponsors",
      paletteId: null,
      variant: null,
      sponsor: second,
      fileName: rest.join("/"),
    };
  }

  if (!isProgramId(second)) return null;
  const paletteId = second;

  if (rawCategory === "logos") {
    if (rest.length < 2) return null;
    const variant = rest[0];
    if (!isLogoVariant(variant)) return null;
    return {
      category: "logos",
      paletteId,
      variant,
      sponsor: null,
      fileName: rest.slice(1).join("/"),
    };
  }

  return {
    category: rawCategory,
    paletteId,
    variant: null,
    sponsor: null,
    fileName: rest.join("/"),
  };
}

export function buildAssetPath(opts: {
  category: AssetCategory;
  paletteId?: string | null;
  variant?: LogoVariant | null;
  sponsor?: string | null;
  fileName: string;
}): string {
  const safeName = opts.fileName.replace(/[^a-zA-Z0-9._-]+/g, "-");

  if (opts.category === "sponsors") {
    const slug = (opts.sponsor ?? "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    if (!slug) throw new Error("Sponsor uploads require a sponsor name.");
    return `sponsors/${slug}/${safeName}`;
  }

  if (!opts.paletteId) throw new Error("This category requires a program.");

  if (opts.category === "logos") {
    if (!opts.variant) {
      throw new Error("Logo uploads require a colored/white variant.");
    }
    return `logos/${opts.paletteId}/${opts.variant}/${safeName}`;
  }
  return `${opts.category}/${opts.paletteId}/${safeName}`;
}

export type Asset = {
  path: string;
  fileName: string;
  size: number | null;
  contentType: string | null;
  format: AssetFormat;
  publicUrl: string;
  source: AssetSource;
  category: AssetCategory | null;
  paletteId: string | null;
  variant: LogoVariant | null;
  sponsor: string | null;
};

export type AssetSearchFilters = {
  query?: string;
  category?: AssetCategory;
  variant?: LogoVariant;
};

/**
 * Searches a flat asset list for the brand assistant's tool. `category` and
 * `variant` are hard filters; the free-text `query` is scored against a
 * haystack of file name, category, variant, program id, program label, and
 * sponsor.
 *
 * Each asset scores +1 per distinct query token it contains, and only the
 * highest-scoring matches are returned. Scoring (rather than requiring *every*
 * token to match) is deliberate: the model often pads queries with synonyms the
 * filenames don't use — e.g. "CODED Juniors white wordmark" still finds
 * `juniors-logo-white` because the extra word "wordmark" simply adds no score
 * instead of eliminating the result.
 */
export function searchAssets(
  assets: Asset[],
  filters: AssetSearchFilters,
  programLabel: (paletteId: string | null) => string,
): Asset[] {
  const pool = assets.filter((a) => {
    if (filters.category && a.category !== filters.category) return false;
    if (filters.variant && a.variant !== filters.variant) return false;
    return true;
  });

  const tokens = (filters.query ?? "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  if (tokens.length === 0) return pool;

  const scored = pool
    .map((a) => {
      const haystack = [
        a.fileName,
        a.category ?? "",
        a.variant ?? "",
        a.paletteId ?? "",
        a.sponsor ?? "",
        programLabel(a.paletteId),
      ]
        .join(" ")
        .toLowerCase();
      const score = tokens.reduce((n, t) => (haystack.includes(t) ? n + 1 : n), 0);
      return { asset: a, score };
    })
    .filter((s) => s.score > 0);

  if (scored.length === 0) return [];

  const maxScore = scored.reduce((m, s) => Math.max(m, s.score), 0);
  return scored.filter((s) => s.score === maxScore).map((s) => s.asset);
}

export function formatBytes(bytes: number | null): string {
  if (bytes == null) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
