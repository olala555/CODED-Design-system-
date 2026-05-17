/**
 * The five products surfaced on the dashboard.
 * Keys map to palette IDs in src/brand.json.
 */
export type Product = {
  id: string;
  paletteId: string;
  name: string;
  tagline: string;
  status: "active" | "draft";
};

export const products: Product[] = [
  {
    id: "ai-app-developer",
    paletteId: "ai-app-developer",
    name: "AI App Developer",
    tagline: "Build production AI apps end-to-end.",
    status: "active",
  },
  {
    id: "data-science",
    paletteId: "data-science-bootcamp",
    name: "Data Science",
    tagline: "From notebooks to deployed models.",
    status: "active",
  },
  {
    id: "cybersecurity",
    paletteId: "cybersecurity-bootcamp",
    name: "Cybersecurity",
    tagline: "Blue team and red team in one bootcamp.",
    status: "active",
  },
  {
    id: "coded-juniors",
    paletteId: "codedjuniors",
    name: "CODED Juniors",
    tagline: "Coding fundamentals for ages 8–14.",
    status: "active",
  },
  {
    id: "full-stack",
    paletteId: "coded",
    name: "Full Stack",
    tagline: "Web fundamentals to production deploys.",
    status: "draft",
  },
];

export const sidebarNav = [
  { href: "/", label: "Dashboard", icon: "home" as const },
  { href: "/brand-book", label: "Brand Book", icon: "book" as const },
  { href: "/assistant", label: "AI Brand Assistant", icon: "sparkles" as const },
  { href: "/assets", label: "Assets", icon: "image" as const },
  { href: "/templates", label: "Templates", icon: "layout" as const },
  { href: "/sponsors", label: "Sponsors", icon: "handshake" as const },
  { href: "/products", label: "Products", icon: "grid" as const },
  { href: "/downloads", label: "Downloads", icon: "download" as const },
  { href: "/settings", label: "Settings", icon: "settings" as const },
];
