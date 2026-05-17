import { getPalette, primaryColor } from "@/lib/brand";
import { readableTextOn, withAlpha } from "@/lib/color";

export type PresentationProps = {
  paletteId: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  presenter: string;
};

/**
 * Pure 16:9 title slide. 1920 × 1080 internal coordinate system; scale via wrapper.
 */
export function PresentationPreview(props: PresentationProps) {
  const palette = getPalette(props.paletteId);
  const primary = primaryColor(props.paletteId);
  const accent = palette?.colors.find((c) => c.role.includes("accent"))?.hex ?? primary;
  const secondary =
    palette?.colors.find((c) => c.role.includes("secondary"))?.hex ?? primary;

  const text = readableTextOn(primary);
  const textSoft = withAlpha(text, 0.7);

  // For Cybersecurity, use the brand gradient by default
  const isCyber = props.paletteId === "cybersecurity-bootcamp";
  const background = isCyber
    ? "linear-gradient(180deg, #14243F 0%, #00112F 100%)"
    : primary;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background,
        color: text,
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-sans), Inter, system-ui, sans-serif",
      }}
    >
      {/* Glow blobs */}
      <div
        style={{
          position: "absolute",
          top: -300,
          right: -200,
          width: 1100,
          height: 1100,
          background: `radial-gradient(circle, ${withAlpha(accent, 0.55)} 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -400,
          left: -300,
          width: 1100,
          height: 1100,
          background: `radial-gradient(circle, ${withAlpha(secondary, 0.35)} 0%, transparent 60%)`,
          pointerEvents: "none",
        }}
      />
      {/* Subtle grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle, ${withAlpha(text, 0.08)} 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Top bar */}
      <div
        style={{
          position: "absolute",
          top: 72,
          left: 96,
          right: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: text,
              color: primary,
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              fontSize: 28,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" }}>
            CODED
          </div>
        </div>
        <div
          style={{
            border: `1px solid ${withAlpha(text, 0.35)}`,
            borderRadius: 999,
            padding: "12px 24px",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: text,
          }}
        >
          {palette?.label ?? "Program"}
        </div>
      </div>

      {/* Hero block */}
      <div
        style={{
          position: "absolute",
          left: 96,
          right: 96,
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: 36,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: textSoft }}>
          {props.eyebrow || "Program kickoff"}
        </div>
        <div
          style={{
            fontSize: 160,
            fontWeight: 600,
            letterSpacing: "-0.04em",
            lineHeight: 0.95,
            maxWidth: 1500,
          }}
        >
          {props.title || "The Future, Built in Public."}
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            lineHeight: 1.35,
            color: textSoft,
            maxWidth: 1200,
          }}
        >
          {props.subtitle ||
            "A practical, hands-on program for builders shipping real software."}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          bottom: 72,
          left: 96,
          right: 96,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 22,
          color: textSoft,
          fontFamily: "var(--font-mono), ui-monospace, monospace",
          letterSpacing: "0.06em",
        }}
      >
        <span>{props.presenter || "Presented by CODED"}</span>
        <span>coded.studio</span>
      </div>
    </div>
  );
}
