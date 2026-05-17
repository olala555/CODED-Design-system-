import { getPalette, primaryColor } from "@/lib/brand";
import { readableTextOn, withAlpha } from "@/lib/color";

export type CertificateProps = {
  paletteId: string;
  recipient: string;
  course: string;
  date: string;
  signatureName: string;
  signatureTitle: string;
  issuer: string;
};

/**
 * Pure, server-renderable A4 portrait certificate.
 * Sized to a 595 × 842 internal coordinate system; scale via the wrapper.
 */
export function CertificatePreview(props: CertificateProps) {
  const palette = getPalette(props.paletteId);
  const primary = primaryColor(props.paletteId);
  const accent = palette?.colors.find((c) => c.role.includes("accent"))?.hex ?? primary;
  const secondary =
    palette?.colors.find((c) => c.role.includes("secondary"))?.hex ?? primary;

  const isDark = readableTextOn(primary) === "#FFFFFF";
  const surface = isDark ? "#0B1424" : "#FFFFFF";
  const text = isDark ? "#FFFFFF" : "#14243F";
  const textSoft = isDark ? "rgba(255,255,255,0.65)" : "#4B5567";

  return (
    <div
      className="relative font-sans"
      style={{
        width: 595,
        height: 842,
        background: surface,
        color: text,
        boxShadow: "0 30px 80px rgba(20,36,63,0.18), 0 2px 8px rgba(20,36,63,0.06)",
        overflow: "hidden",
      }}
    >
      {/* Brand color border */}
      <div
        style={{
          position: "absolute",
          inset: 18,
          border: `1px solid ${withAlpha(primary, isDark ? 0.4 : 0.18)}`,
          borderRadius: 6,
          pointerEvents: "none",
        }}
      />

      {/* Corner glow — uses accent color */}
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -120,
          width: 360,
          height: 360,
          background: `radial-gradient(circle, ${withAlpha(accent, 0.55)} 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -140,
          left: -120,
          width: 360,
          height: 360,
          background: `radial-gradient(circle, ${withAlpha(secondary, 0.4)} 0%, transparent 65%)`,
          pointerEvents: "none",
        }}
      />

      {/* Top brand strip */}
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          top: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 6,
              background: primary,
              color: readableTextOn(primary),
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              fontSize: 13,
            }}
          >
            C
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" }}>
            CODED · {palette?.label ?? "Brand"}
          </div>
        </div>
        <div style={{ fontSize: 10, fontFamily: "var(--font-mono)", color: textSoft }}>
          ID · {props.paletteId.slice(0, 6).toUpperCase()}-{(props.recipient + props.course).length.toString(36).toUpperCase()}
        </div>
      </div>

      {/* Title block */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          paddingLeft: 56,
          paddingRight: 56,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 18,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", color: textSoft }}>
          Certificate of Completion
        </div>
        <div style={{ fontSize: 13, color: textSoft }}>
          This certifies that
        </div>
        <div
          style={{
            fontSize: 48,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.05,
            color: text,
          }}
        >
          {props.recipient || "Recipient Name"}
        </div>
        <div style={{ fontSize: 13, color: textSoft, marginTop: 4 }}>
          has successfully completed
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
            color: primary,
            maxWidth: 440,
          }}
        >
          {props.course || "Course Title"}
        </div>
        <div style={{ fontSize: 12.5, color: textSoft, lineHeight: 1.55, maxWidth: 440 }}>
          issued by <strong style={{ color: text, fontWeight: 600 }}>{props.issuer || "CODED Academy"}</strong> on{" "}
          {props.date || "—"}.
        </div>
      </div>

      {/* Signature block */}
      <div
        style={{
          position: "absolute",
          left: 56,
          right: 56,
          bottom: 64,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 32,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              borderTop: `1px solid ${withAlpha(text, 0.25)}`,
              paddingTop: 6,
              fontSize: 11,
              color: textSoft,
            }}
          >
            Signed
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>
            {props.signatureName || "Signature Name"}
          </div>
          <div style={{ fontSize: 11, color: textSoft }}>
            {props.signatureTitle || "Title"}
          </div>
        </div>

        {/* Seal */}
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: 999,
            background: `conic-gradient(from 0deg, ${primary}, ${accent}, ${secondary}, ${primary})`,
            padding: 3,
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 999,
              background: surface,
              color: primary,
              display: "grid",
              placeItems: "center",
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            <div style={{ textAlign: "center", lineHeight: 1.1 }}>
              CODED
              <br />
              <span style={{ fontSize: 7, opacity: 0.7 }}>OFFICIAL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          position: "absolute",
          left: 40,
          right: 40,
          bottom: 28,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 9.5,
          fontFamily: "var(--font-mono)",
          color: textSoft,
          letterSpacing: "0.04em",
        }}
      >
        <span>coded.studio/verify</span>
        <span>{(palette?.label ?? "CODED").toUpperCase()}</span>
      </div>
    </div>
  );
}
