import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function TemplatesPage() {
  return (
    <PlaceholderPage
      eyebrow="Dynamic templates"
      title="Templates that re-theme to any CODED program."
      description="Pick a template, pick a program, get a fully branded file. Two MVP templates: Certificate (A4) and Presentation (16:9)."
      icon="layout"
      next={[
        "Certificate template — A4 portrait with brand border + signature block",
        "Presentation template — 16:9 with title, content, divider layouts",
        "PDF + PNG export via Satori",
      ]}
    />
  );
}
