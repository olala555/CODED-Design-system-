import { assetFormat, isImageFormat, type AssetFormat } from "./assets";

/**
 * Sponsors live in the same Supabase `assets` bucket under a dedicated prefix:
 *
 *   sponsors/<id>/logo.png          — the primary logo (transparent PNG)
 *   sponsors/<id>/<anything>.pdf    — brand guidelines (added later, per sponsor)
 *   sponsors/<id>/<other>.<ext>     — extra logo variants / files
 *
 * The page is driven by what's in storage, so dropping new files into a
 * sponsor's folder makes them appear without code changes. The registry below
 * only supplies nicer display names; unknown ids fall back to a title-cased id.
 */
export const SPONSORS_PREFIX = "sponsors";

const SPONSOR_NAMES: Record<string, string> = {
  abk: "Al Ahli Bank of Kuwait",
  agility: "Agility",
  alghanim: "Alghanim Industries",
  aws: "Amazon Web Services",
  "banking-studies": "Kuwait Institute of Banking Studies",
  boubyan: "Boubyan Bank",
  boursa: "Boursa Kuwait",
  burgan: "Burgan Bank",
  "dubai-future-foundation": "Dubai Future Foundation",
  effect: "Effect",
  floward: "Floward",
  gig: "GIG Kuwait",
  "gulf-bank": "Gulf Bank",
  injaz: "INJAZ Al-Arab",
  kdsc: "Kuwait Digital Startup Campus",
  kfas: "Kuwait Foundation for the Advancement of Sciences",
  kfh: "Kuwait Finance House",
  kia: "Kuwait Investment Authority",
  kisr: "Kuwait Institute for Scientific Research",
  knet: "KNET",
  ku: "Kuwait University",
  "kw-news": "Kuwait Times",
  m2r: "M2R",
  markaz: "Markaz",
  nbk: "National Bank of Kuwait",
  ncsc: "National Cybersecurity Center",
  pifss: "Public Institution for Social Security",
  talabat: "talabat",
  ypa: "Public Authority for Youth & Sport",
  zain: "Zain",
};

export function sponsorName(id: string): string {
  if (SPONSOR_NAMES[id]) return SPONSOR_NAMES[id];
  return id
    .split("-")
    .map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
    .join(" ");
}

export type SponsorFileKind = "logo" | "document" | "other";

export type SponsorFile = {
  path: string;
  fileName: string;
  kind: SponsorFileKind;
  format: AssetFormat;
  publicUrl: string;
  size: number | null;
};

export type Sponsor = {
  id: string;
  name: string;
  logo: SponsorFile | null;
  documents: SponsorFile[];
  others: SponsorFile[];
};

/** `sponsors/<id>/<rest...>` → { id, fileName } | null */
export function parseSponsorPath(path: string): { id: string; fileName: string } | null {
  const parts = path.split("/").filter(Boolean);
  if (parts.length < 3) return null;
  if (parts[0] !== SPONSORS_PREFIX) return null;
  const [, id, ...rest] = parts;
  return { id, fileName: rest.join("/") };
}

export function classifySponsorFile(fileName: string, format: AssetFormat): SponsorFileKind {
  const base = fileName.split("/").pop()?.toLowerCase() ?? fileName.toLowerCase();
  if (base === "logo" || base.startsWith("logo.")) return "logo";
  if (format === "pdf") return "document";
  if (isImageFormat(format)) return "logo";
  return "other";
}

/**
 * Folds a flat list of storage files into one Sponsor per folder. The primary
 * logo is the file literally named `logo.*`; if a folder has only one image and
 * no explicit `logo.*`, that image becomes the logo.
 */
export function groupSponsors(
  files: { path: string; fileName: string; publicUrl: string; size: number | null }[],
): Sponsor[] {
  const byId = new Map<string, SponsorFile[]>();

  for (const f of files) {
    const parsed = parseSponsorPath(f.path);
    if (!parsed || !parsed.fileName) continue;
    const format = assetFormat(parsed.fileName);
    const kind = classifySponsorFile(parsed.fileName, format);
    const entry: SponsorFile = {
      path: f.path,
      fileName: parsed.fileName,
      kind,
      format,
      publicUrl: f.publicUrl,
      size: f.size,
    };
    const list = byId.get(parsed.id) ?? [];
    list.push(entry);
    byId.set(parsed.id, list);
  }

  const sponsors: Sponsor[] = [];
  for (const [id, list] of byId) {
    const explicitLogo = list.find(
      (f) => f.fileName.toLowerCase() === "logo." + f.format || f.fileName.toLowerCase().startsWith("logo."),
    );
    const images = list.filter((f) => isImageFormat(f.format));
    const logo = explicitLogo ?? (images.length === 1 ? images[0] : images[0] ?? null);
    const documents = list.filter((f) => f.kind === "document");
    const others = list.filter((f) => f !== logo && f.kind !== "document");
    sponsors.push({ id, name: sponsorName(id), logo, documents, others });
  }

  sponsors.sort((a, b) => a.name.localeCompare(b.name));
  return sponsors;
}
