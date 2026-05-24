/* eslint-disable @next/next/no-img-element */

// Exact CODED badge artwork (vector) lives in /public/badge/badge.svg — card,
// lanyard slot, C mark, radar rings, CODED logo, and coded.kw are baked vectors
// from the source file. The photo and the name/title are dynamic overlays,
// positioned in the same 166.37 × 269.18 artboard coordinate space so they land
// exactly where the original design placed them.

const ART_W = 166.37;
const ART_H = 269.18;

// Photo circle (from the source clipPath): center (84.04, 121.06), r = 31.6.
const PHOTO_LEFT = (84.04 / ART_W) * 100;
const PHOTO_TOP = (121.06 / ART_H) * 100;
const PHOTO_SIZE = ((31.6 * 2) / ART_W) * 100;

export const BADGE_WIDTH = 540;
export const BADGE_HEIGHT = Math.round((BADGE_WIDTH * ART_H) / ART_W); // 874

export type BadgeProps = {
  name: string;
  title: string;
  photoUrl: string | null;
};

export function BadgePreview({ name, title, photoUrl }: BadgeProps) {
  return (
    <div className="relative" style={{ width: BADGE_WIDTH, height: BADGE_HEIGHT }}>
      {/* Exact vector design */}
      <img
        src="/badge/badge.svg"
        alt="CODED ID badge"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          filter: "drop-shadow(0 22px 45px rgba(20,36,63,0.18))",
        }}
      />

      {/* Editable name + title — same artboard coordinates as the source design */}
      <svg
        viewBox={`0 0 ${ART_W} ${ART_H}`}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        aria-hidden
      >
        <text
          x={ART_W / 2}
          y={213.62}
          textAnchor="middle"
          fill="#14243F"
          fontFamily="var(--font-dm-sans), sans-serif"
          fontSize={12.3}
          fontWeight={800}
          letterSpacing={-0.1}
        >
          {(name || "Full Name").toUpperCase()}
        </text>
        <text
          x={ART_W / 2}
          y={226.8}
          textAnchor="middle"
          fill="#14243F"
          fontFamily="var(--font-dm-sans), sans-serif"
          fontSize={9.1}
          fontWeight={600}
        >
          {title || "Job Title"}
        </text>
      </svg>

      {/* Photo — overlays the circle */}
      <div
        style={{
          position: "absolute",
          left: `${PHOTO_LEFT}%`,
          top: `${PHOTO_TOP}%`,
          width: `${PHOTO_SIZE}%`,
          aspectRatio: "1 / 1",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          overflow: "hidden",
        }}
      >
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="Badge photo"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "grid",
              placeItems: "center",
              background: "radial-gradient(circle at 50% 38%, #FBFCFE 0%, #E6EAF1 100%)",
            }}
          >
            <svg viewBox="0 0 64 64" width="46%" height="46%" aria-hidden>
              <g fill="#14243F" opacity="0.28">
                <circle cx="32" cy="23" r="12" />
                <path d="M10 56c0-12.15 9.85-22 22-22s22 9.85 22 22v2H10v-2Z" />
              </g>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
