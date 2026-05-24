import { FlyerStudio } from "@/components/FlyerStudio";
import { templates } from "@/lib/templates";

export default function FlyerTemplatePage() {
  const def = templates.find((t) => t.id === "flyer")!;
  return <FlyerStudio defaultProductId={def.defaultPaletteId} />;
}
