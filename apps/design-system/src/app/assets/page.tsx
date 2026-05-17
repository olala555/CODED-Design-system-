import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function AssetsPage() {
  return (
    <PlaceholderPage
      eyebrow="Asset library"
      title="Searchable library of logos, fonts, and brand elements."
      description="The grid view ships next — SVG and PNG logos, fonts, sponsor logos, and photography references with per-program filters."
      icon="image"
      next={[
        "Grid layout with filter chips (program, type, format)",
        "Per-asset download (SVG / PNG / font file)",
        "Upload + tagging flow for admins",
      ]}
    />
  );
}
