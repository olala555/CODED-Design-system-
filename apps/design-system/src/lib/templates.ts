import type { IconName } from "@/components/Icon";

export type TemplateDef = {
  id: "presentation" | "flyer" | "badge";
  name: string;
  tagline: string;
  format: string;
  aspect: string;
  icon: IconName;
  defaultPaletteId: string;
};

// Ready templates — ordered by readiness. The Flyer and the ID Badge are the
// featured, polished ones, so they lead the list; the Title Slide follows.
export const templates: TemplateDef[] = [
  {
    id: "flyer",
    name: "Bootcamp Flyer",
    tagline:
      "1240 × 1748 Arabic flyer — pixel-accurate to the Figma master. Hero, skills, phases & pricing, schedule, and contact. Preset for Cybersecurity, AI App Developer, and Data Science.",
    format: "A-series · 1240 × 1748 px",
    aspect: "1240 / 1748",
    icon: "image",
    defaultPaletteId: "cybersecurity-bootcamp",
  },
  {
    id: "badge",
    name: "ID Badge",
    tagline:
      "CODED staff badge with the C mark, radar rings, photo, name, and title — upload a photo and print as PDF.",
    format: "ID · portrait",
    aspect: "166.37 / 269.18",
    icon: "image",
    defaultPaletteId: "coded",
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

// Placeholder templates not yet built — rendered as non-clickable
// "Coming soon" cards after the ready ones.
export type ComingSoonTemplate = {
  name: string;
  tagline: string;
  format: string;
  icon: IconName;
};

export const comingSoonTemplates: ComingSoonTemplate[] = [
  {
    name: "Certificate of Completion",
    tagline:
      "A4 portrait certificate with brand-themed border, seal, and signature block.",
    format: "A4 · 210 × 297 mm",
    icon: "book",
  },
  {
    name: "Syllabus",
    tagline:
      "Multi-page course outline — modules, weekly breakdown, outcomes, and assessment.",
    format: "A4 · multi-page",
    icon: "book",
  },
  {
    name: "CODED Social Media Post",
    tagline:
      "Square + story formats for announcements, quotes, and program highlights.",
    format: "1:1 · 1080 × 1080 px",
    icon: "image",
  },
];
