import { PresentationStudio } from "@/components/PresentationStudio";
import { templates } from "@/lib/templates";

export default function PresentationTemplatePage() {
  const def = templates.find((t) => t.id === "presentation")!;
  return <PresentationStudio defaultPaletteId={def.defaultPaletteId} />;
}
