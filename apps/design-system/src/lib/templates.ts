import type { IconName } from "@/components/Icon";

export type TemplateDef = {
  id: "certificate" | "presentation";
  name: string;
  tagline: string;
  format: string;
  aspect: string;
  icon: IconName;
  defaultPaletteId: string;
};

export const templates: TemplateDef[] = [
  {
    id: "certificate",
    name: "Certificate of Completion",
    tagline:
      "A4 portrait certificate with brand-themed border, seal, and signature block.",
    format: "A4 · 210 × 297 mm",
    aspect: "595 / 842",
    icon: "book",
    defaultPaletteId: "ai-app-developer",
  },
  {
    id: "presentation",
    name: "Title Slide",
    tagline:
      "16:9 deck cover with hero typography, brand glow, and program tag.",
    format: "16:9 · 1920 × 1080 px",
    aspect: "16 / 9",
    icon: "layout",
    defaultPaletteId: "cybersecurity-bootcamp",
  },
];
