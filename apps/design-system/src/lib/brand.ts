import brandData from "@/brand.json";

export type BrandColor = {
  name: string;
  hex: string;
  rgb: string;
  role: string;
  usage: string;
};

export type BrandPalette = {
  label: string;
  kind: "master" | "product";
  colors: BrandColor[];
  gradients?: { name: string; stops: string[]; direction: string; usage: string }[];
};

export type BrandTheme = {
  name: string;
  version: string;
  source: string;
  lastUpdated: string;
  typeface: string;
  palettes: Record<string, BrandPalette>;
  globalRoles: {
    navyBluePrimary: string;
    navyBlueIsBrandConstant: boolean;
    navyBlueAppearsIn: string[];
  };
};

export const brand = brandData as BrandTheme;

export const paletteIds = Object.keys(brand.palettes);

export function getPalette(id: string): BrandPalette | undefined {
  return brand.palettes[id];
}

export function primaryColor(id: string): string {
  const p = getPalette(id);
  if (!p) return "#14243F";
  const primary = p.colors.find((c) => c.role.includes("primary"));
  return primary?.hex ?? p.colors[0]?.hex ?? "#14243F";
}
