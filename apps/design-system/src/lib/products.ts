/**
 * Every CODED program represented on the platform.
 *
 * `paletteId` maps to a palette in src/brand.json. Products without a palette
 * in the JSON (status: "draft") render with neutral CODED master colors.
 *
 * `kind`:
 *   - "master"  — the parent CODED Academy brand
 *   - "program" — a public-facing course / bootcamp
 *   - "youth"   — youth-track sub-brand
 */
export type ProductKind = "master" | "program" | "youth";

export type Product = {
  id: string;
  paletteId: string;
  name: string;
  shortName?: string;
  tagline: string;
  status: "active" | "draft";
  kind: ProductKind;
};

export const products: Product[] = [
  {
    id: "coded",
    paletteId: "coded",
    name: "CODED Academy",
    shortName: "CODED",
    tagline: "The master brand — the constant across every program.",
    status: "active",
    kind: "master",
  },
  {
    id: "ai-app-developer",
    paletteId: "ai-app-developer",
    name: "AI App Developer",
    tagline: "Build production AI apps end-to-end.",
    status: "active",
    kind: "program",
  },
  {
    id: "data-science",
    paletteId: "data-science-bootcamp",
    name: "Data Science Bootcamp",
    shortName: "Data Science",
    tagline: "From notebooks to deployed models.",
    status: "active",
    kind: "program",
  },
  {
    id: "cybersecurity",
    paletteId: "cybersecurity-bootcamp",
    name: "Cybersecurity Bootcamp",
    shortName: "Cybersecurity",
    tagline: "Blue team and red team in one bootcamp.",
    status: "active",
    kind: "program",
  },
  {
    id: "full-stack",
    paletteId: "coded",
    name: "Full Stack",
    tagline: "Web fundamentals to production deploys.",
    status: "draft",
    kind: "program",
  },
  {
    id: "academy-x",
    paletteId: "academy-x",
    name: "Academy-X",
    tagline: "Advanced executive and partner programs.",
    status: "active",
    kind: "program",
  },
  {
    id: "kuwait-codes",
    paletteId: "kuwait-codes",
    name: "Kuwait Innovation Group",
    shortName: "Kuwait Codes",
    tagline: "Kuwait's national coding initiative.",
    status: "active",
    kind: "program",
  },
  {
    id: "unicode",
    paletteId: "unicode",
    name: "Unicode",
    tagline: "Coding for high-school graduates and switchers.",
    status: "active",
    kind: "program",
  },
  {
    id: "coded-juniors",
    paletteId: "codedjuniors",
    name: "CODED Juniors",
    tagline: "Coding fundamentals for ages 8–14.",
    status: "active",
    kind: "youth",
  },
];

export function getProduct(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export const sidebarNav = [
  { href: "/dashboard", label: "Dashboard", icon: "home" as const },
  { href: "/brand-book", label: "Brand Book", icon: "book" as const },
  { href: "/assistant", label: "AI Brand Assistant", icon: "sparkles" as const },
  { href: "/assets", label: "Assets", icon: "image" as const },
  { href: "/templates", label: "Templates", icon: "layout" as const },
  { href: "/sponsors", label: "Sponsors", icon: "handshake" as const },
  { href: "/products", label: "Products", icon: "grid" as const },
  { href: "/downloads", label: "Downloads", icon: "download" as const },
  { href: "/settings", label: "Settings", icon: "settings" as const },
];
