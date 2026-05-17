import { PlaceholderPage } from "@/components/PlaceholderPage";

export default function DownloadsPage() {
  return (
    <PlaceholderPage
      eyebrow="Downloads"
      title="Brand-context packs for Claude, Figma AI, and ChatGPT."
      description="One-click .md prompt packs per program — drop them into any AI tool and it instantly knows your brand."
      icon="download"
      next={[
        ".md prompt pack per program (colors + type + voice)",
        "Bulk asset zip per program",
        "Versioned exports with changelog",
      ]}
    />
  );
}
