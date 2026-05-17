import { CertificateStudio } from "@/components/CertificateStudio";
import { templates } from "@/lib/templates";

export default function CertificateTemplatePage() {
  const def = templates.find((t) => t.id === "certificate")!;
  return <CertificateStudio defaultPaletteId={def.defaultPaletteId} />;
}
