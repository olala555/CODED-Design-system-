import { withAlpha } from "@/lib/color";
import { themeForPalette, type FlyerProductContent } from "@/lib/flyerProducts";

/**
 * Pixel-accurate 1240 × 1748 bootcamp flyer (Figma master: 376:5449).
 *
 * Layout, type sizes, colors, gradients, and shadows mirror the
 * Cybersecurity Bootcamp Figma frame so it can serve as the brand-book
 * reference. Theming swaps the brand/accent gradients for the active
 * product palette; the structure stays identical across products.
 */

export type FlyerProps = FlyerProductContent;

export function FlyerPreview(props: FlyerProps) {
  // The product preset already carries its own theme tokens (set when the
  // marketing team picks a product). The palette switcher writes the new
  // theme into `props.theme` directly, so we just read from there.
  const theme = props.theme ?? themeForPalette(props.paletteId);

  const { bgGradient, brand, brandLight, brandDark, accent, accentDark } =
    theme;

  // Static design tokens — match Figma exactly
  const cardBgFrom = "rgba(255,255,255,0.06)";
  const cardBgTo = "rgba(255,255,255,0.02)";
  const cardBorder = "rgba(255,255,255,0.08)";
  const rowBg = "rgba(255,255,255,0.04)";
  const rowBorder = "rgba(255,255,255,0.08)";
  const dim44 = "rgba(255,255,255,0.44)";
  const dim66 = "rgba(255,255,255,0.66)";
  const FONT_FAMILY =
    "'Neufile Grotesk', var(--font-sans), 'IBM Plex Sans Arabic', system-ui, sans-serif";

  // Split title so the FIRST word renders solid white and the rest takes the
  // brand text-gradient (matching the Figma title treatment).
  const titleParts = splitFirstWord(props.titleAr);

  return (
    <div
      dir="rtl"
      lang="ar"
      style={{
        width: 1240,
        height: 1748,
        position: "relative",
        overflow: "hidden",
        background: `linear-gradient(180deg, ${bgGradient[0]} 0%, ${bgGradient[1]} 60%, ${bgGradient[2]} 100%)`,
        color: "#FFFFFF",
        fontFamily: FONT_FAMILY,
      }}
    >
      {/* ─── Decorative red glows ─── */}
      <div
        style={{
          position: "absolute",
          top: -260,
          left: 640,
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${withAlpha(brand, 0.55)} 0%, ${withAlpha(brand, 0.18)} 35%, transparent 70%)`,
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 1240,
          left: -260,
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${withAlpha(brand, 0.45)} 0%, ${withAlpha(brand, 0.14)} 35%, transparent 70%)`,
          filter: "blur(8px)",
          pointerEvents: "none",
        }}
      />

      {/* ───────────── HEADER ───────────── */}
      <div
        style={{
          position: "absolute",
          top: 56,
          left: 64,
          width: 1112,
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* CODED wordmark — boxed "D" mark matching the brand logo */}
        <CodedLogo />
        {/* Product lockup — shield + 2-line tag */}
        <ProductLockup tag={props.programTag} />
      </div>

      {/* ───────────── HERO ───────────── */}
      <div
        style={{
          position: "absolute",
          top: 198,
          left: 64,
          width: 1112,
          paddingTop: 12,
          paddingLeft: 8,
          paddingRight: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
        }}
      >
        {/* Kicker — red gradient pill with shield */}
        <div
          style={{
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            paddingLeft: 24,
            paddingRight: 24,
            borderRadius: 999,
            background: `linear-gradient(90deg, ${brand} 0%, ${brandDark} 100%)`,
            boxShadow: `0px 12px 32px 0px ${withAlpha(brand, 0.4)}`,
          }}
        >
          <ShieldIcon size={28} color="#FFFFFF" />
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#FFFFFF",
              whiteSpace: "nowrap",
            }}
          >
            {props.kickerAr}
          </span>
        </div>

        {/* Title — first word solid white, rest brand-gradient */}
        <h1
          style={{
            margin: 0,
            fontSize: 108,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.01em",
            textAlign: "center",
            background: `linear-gradient(180deg, ${brandLight} 0%, ${brandDark} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            maxWidth: "100%",
            padding: "0 16px",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>{titleParts[0]}</span>
          {titleParts[1] && <span>{` ${titleParts[1]}`}</span>}
        </h1>

        {props.subtitleAr && (
          <p
            style={{
              margin: 0,
              fontSize: 24,
              fontWeight: 500,
              lineHeight: 1.4,
              color: dim66,
              textAlign: "center",
              maxWidth: 900,
            }}
          >
            {props.subtitleAr}
          </p>
        )}

        {/* Date pill — translucent white with red border */}
        <div
          style={{
            height: 64,
            display: "flex",
            alignItems: "center",
            gap: 14,
            paddingLeft: 28,
            paddingRight: 28,
            borderRadius: 999,
            background: "rgba(255,255,255,0.06)",
            border: `1px solid ${withAlpha(brand, 0.5)}`,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: brand,
              boxShadow: `0 0 12px ${brand}`,
            }}
          />
          <span
            style={{
              fontSize: 26,
              fontWeight: 600,
              color: "#FFFFFF",
              whiteSpace: "nowrap",
            }}
          >
            {props.dateRangeAr}
          </span>
        </div>
      </div>

      {/* ───────────── SKILLS ───────────── */}
      <div
        style={{
          position: "absolute",
          top: 537,
          left: 64,
          width: 1112,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        {/* Section label with hairline dividers */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <span
            style={{
              width: 48,
              height: 1,
              background: dim44,
            }}
          />
          <span
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: dim44,
              whiteSpace: "nowrap",
            }}
          >
            {props.skillsHeadingAr}
          </span>
          <span
            style={{
              width: 48,
              height: 1,
              background: dim44,
            }}
          />
        </div>

        {/* Pills — first one accents, the rest are translucent white */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            width: 1080,
          }}
        >
          {props.skillsAr.map((s, i) =>
            i === 0 ? (
              <span
                key={i}
                style={{
                  height: 52,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                  paddingRight: 22,
                  borderRadius: 999,
                  fontSize: 22,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  background: `linear-gradient(90deg, ${withAlpha(brand, 0.2)} 0%, ${withAlpha(brand, 0.08)} 100%)`,
                  border: `1px solid ${withAlpha(brand, 0.55)}`,
                  whiteSpace: "nowrap",
                }}
              >
                {s}
              </span>
            ) : (
              <span
                key={i}
                style={{
                  height: 52,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: 22,
                  paddingRight: 22,
                  borderRadius: 999,
                  fontSize: 22,
                  fontWeight: 500,
                  color: "#FFFFFF",
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  whiteSpace: "nowrap",
                }}
              >
                {s}
              </span>
            ),
          )}
        </div>
      </div>

      {/* ───────────── SECTION TITLE ───────────── */}
      <div
        style={{
          position: "absolute",
          top: 744,
          left: 64,
          width: 1112,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <span
          style={{
            width: 80,
            height: 2,
            background: `linear-gradient(90deg, transparent 0%, ${withAlpha(brand, 0.7)} 50%, transparent 100%)`,
          }}
        />
        <span
          style={{
            fontSize: 52,
            fontWeight: 800,
            color: "#FFFFFF",
            whiteSpace: "nowrap",
          }}
        >
          {props.detailsHeadingAr}
        </span>
        <span
          style={{
            width: 80,
            height: 2,
            background: `linear-gradient(90deg, transparent 0%, ${withAlpha(brand, 0.7)} 50%, transparent 100%)`,
          }}
        />
      </div>

      {/* ───────────── PHASES & PRICING CARD ───────────── */}
      <div
        style={{
          position: "absolute",
          top: 859,
          left: 64,
          width: 652,
          padding: 28,
          borderRadius: 28,
          background: `linear-gradient(180deg, ${cardBgFrom} 0%, ${cardBgTo} 100%)`,
          border: `1px solid ${cardBorder}`,
          boxShadow: "0px 24px 48px 0px rgba(0,0,0,0.35)",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {/* Card head */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${accent} 0%, ${accentDark} 71%)`,
              boxShadow: `0px 8px 16px 0px ${withAlpha(accent, 0.35)}`,
              display: "grid",
              placeItems: "center",
            }}
          >
            <LayersIcon size={20} color="#FFFFFF" />
          </span>
          <span style={{ fontSize: 26, fontWeight: 600, color: "#FFFFFF" }}>
            {props.phasesHeadingAr}
          </span>
        </div>

        {/* Phase 1 — translucent white row */}
        <PhaseRow
          phase={props.phases[0]}
          currency={props.currency}
          variant="neutral"
          rowBg={rowBg}
          rowBorder={rowBorder}
          dim={dim66}
        />

        {/* Phase 2 — blue-tinted highlight row */}
        <PhaseRow
          phase={props.phases[1]}
          currency={props.currency}
          variant="accent"
          accent={accent}
          rowBg={rowBg}
          rowBorder={rowBorder}
          dim={dim66}
        />

        {/* Total bar — brand gradient */}
        <div
          style={{
            padding: "18px 22px",
            borderRadius: 18,
            background: `linear-gradient(172deg, ${brand} 0%, ${brandDark} 71%)`,
            boxShadow: `0px 16px 32px 0px ${withAlpha(brand, 0.3)}`,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* DOM order in dir=rtl: first = rightmost */}
          <span style={{ fontSize: 46, fontWeight: 800, lineHeight: 1 }}>
            {props.totalPrice}
          </span>
          <span
            style={{
              fontSize: 22,
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
            }}
          >
            {props.currency}
          </span>
          <span style={{ flex: 1 }} />
          <span
            style={{
              padding: "6px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.18)",
              fontSize: 18,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {props.installmentsAr}
          </span>
          <span style={{ fontSize: 22, fontWeight: 600 }}>
            {props.totalLabelAr}
          </span>
        </div>
      </div>

      {/* ───────────── DURATION & LOCATION CARD ───────────── */}
      <div
        style={{
          position: "absolute",
          top: 859,
          left: 740,
          width: 436,
          padding: 28,
          borderRadius: 28,
          background: `linear-gradient(180deg, ${cardBgFrom} 0%, ${cardBgTo} 100%)`,
          border: `1px solid ${cardBorder}`,
          boxShadow: "0px 24px 48px 0px rgba(0,0,0,0.35)",
          display: "flex",
          flexDirection: "column",
          gap: 18,
        }}
      >
        {/* Head */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${brand} 0%, ${brandDark} 71%)`,
              boxShadow: `0px 8px 16px 0px ${withAlpha(brand, 0.35)}`,
              display: "grid",
              placeItems: "center",
            }}
          >
            <ClockIcon size={20} color="#FFFFFF" />
          </span>
          <span style={{ fontSize: 26, fontWeight: 600, color: "#FFFFFF" }}>
            {props.durationHeadingAr}
          </span>
        </div>

        {/* Mega duration number with text-gradient + red text-shadow */}
        <div
          style={{
            paddingTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <span
            style={{
              fontSize: 140,
              fontWeight: 800,
              lineHeight: 1,
              background: `linear-gradient(180deg, #FFFFFF 0%, ${brandLight} 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: `0px 0px 48px ${withAlpha(brand, 0.45)}`,
              letterSpacing: "-0.02em",
            }}
          >
            {props.durationNumber}
          </span>
          <span
            style={{
              fontSize: 30,
              fontWeight: 600,
              color: dim66,
              letterSpacing: "1px",
            }}
          >
            {props.durationUnitAr}
          </span>
        </div>

        {/* Meta rows */}
        <MetaRow
          icon="calendar"
          iconBg={withAlpha(brand, 0.18)}
          iconColor={brand}
          label={props.scheduleLabelAr}
          value={props.scheduleValueAr}
          sub={props.scheduleSubAr}
          rowBg={rowBg}
          rowBorder={rowBorder}
          dim44={dim44}
          dim66={dim66}
        />
        <MetaRow
          icon="clock"
          iconBg={withAlpha(accent, 0.18)}
          iconColor={accent}
          label={props.timeLabelAr}
          value={props.timeValueAr}
          rowBg={rowBg}
          rowBorder={rowBorder}
          dim44={dim44}
          dim66={dim66}
        />
        <MetaRow
          icon="pin"
          iconBg={withAlpha(brand, 0.18)}
          iconColor={brand}
          label={props.locationLabelAr}
          value={props.locationValueAr}
          rowBg={rowBg}
          rowBorder={rowBorder}
          dim44={dim44}
          dim66={dim66}
        />
      </div>

      {/* ───────────── CONTACT ───────────── */}
      <div
        style={{
          position: "absolute",
          top: 1531,
          left: 64,
          width: 1112,
          height: 88,
          paddingTop: 14,
          paddingBottom: 14,
          paddingLeft: 24,
          paddingRight: 14,
          borderRadius: 999,
          background: "rgba(255,255,255,0.05)",
          border: `1px solid ${rowBorder}`,
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        {/* DOM order in dir=rtl: first = rightmost. CTA reads first in Arabic. */}
        <span
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: "#FFFFFF",
            whiteSpace: "nowrap",
          }}
        >
          {props.contactCtaAr}
        </span>
        <span
          style={{
            flex: 1,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.16), transparent)",
          }}
        />
        <div
          dir="ltr"
          style={{
            height: 60,
            display: "flex",
            alignItems: "center",
            gap: 10,
            paddingLeft: 22,
            paddingRight: 22,
            borderRadius: 999,
            background: `linear-gradient(166deg, ${brand} 0%, ${brandDark} 71%)`,
            boxShadow: `0px 12px 24px 0px ${withAlpha(brand, 0.35)}`,
          }}
        >
          <PhoneIcon size={20} color="#FFFFFF" />
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: "#FFFFFF",
              whiteSpace: "nowrap",
              fontFamily: FONT_FAMILY,
            }}
          >
            {props.phone}
          </span>
        </div>
      </div>

      {/* ───────────── FOOTER TAGLINE ───────────── */}
      <div
        style={{
          position: "absolute",
          top: 1659,
          left: 64,
          width: 1112,
          textAlign: "center",
          fontSize: 22,
          fontWeight: 300,
          letterSpacing: "7px",
          color: dim44,
          height: 30,
        }}
      >
        {props.taglineEn}
      </div>
    </div>
  );
}

/* ───────────────────── Sub-components ───────────────────── */

function CodedLogo() {
  // Matches the boxed CODED wordmark: "CODE" outside, "D" inside a white box.
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontFamily:
          "'Neufile Grotesk', var(--font-sans), system-ui, sans-serif",
      }}
    >
      <span
        style={{
          fontSize: 36,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: "#FFFFFF",
        }}
      >
        CODE
      </span>
      <span
        style={{
          width: 44,
          height: 44,
          display: "grid",
          placeItems: "center",
          background: "#FFFFFF",
          color: "#0a1330",
          fontSize: 30,
          fontWeight: 800,
          letterSpacing: "-0.04em",
          borderRadius: 4,
        }}
      >
        D
      </span>
    </div>
  );
}

function ProductLockup({ tag }: { tag: string }) {
  // Shield with check + 2-line tag, in the layout of the Figma product logo.
  const lines = splitTwoLines(tag);
  return (
    <div
      dir="ltr"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 14,
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.16)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <ShieldIcon size={28} color="#FFFFFF" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
        <span style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>
          {lines[0]}
        </span>
        {lines[1] && (
          <span style={{ fontSize: 20, fontWeight: 700, color: "#FFFFFF" }}>
            {lines[1]}
          </span>
        )}
      </div>
    </div>
  );
}

function PhaseRow({
  phase,
  currency,
  variant,
  accent,
  rowBg,
  rowBorder,
  dim,
}: {
  phase: { name: string; topic: string; duration: string; price: string };
  currency: string;
  variant: "neutral" | "accent";
  accent?: string;
  rowBg: string;
  rowBorder: string;
  dim: string;
}) {
  const isAccent = variant === "accent" && accent;
  return (
    <div
      style={{
        padding: "20px 22px",
        borderRadius: 20,
        background: isAccent
          ? `linear-gradient(166deg, ${withAlpha(accent!, 0.16)} 0%, ${withAlpha(accent!, 0.04)} 71%)`
          : rowBg,
        border: isAccent
          ? `1px solid ${withAlpha(accent!, 0.4)}`
          : `1px solid ${rowBorder}`,
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* DOM order in dir=rtl: first = rightmost (price), last = leftmost (info) */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: 4,
        }}
      >
        <span style={{ fontSize: 34, fontWeight: 800, lineHeight: 1 }}>
          {phase.price}
        </span>
        <span style={{ fontSize: 18, fontWeight: 500, color: dim }}>
          {currency}
        </span>
      </div>
      <span style={{ flex: 1, height: 1, background: "transparent" }} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 4,
          textAlign: "right",
        }}
      >
        <span style={{ fontSize: 30, fontWeight: 800, lineHeight: 1.1 }}>
          {phase.name}
        </span>
        <span style={{ fontSize: 20, fontWeight: 500, color: dim }}>
          {phase.topic}
        </span>
        <span
          style={{
            display: "inline-block",
            padding: "4px 12px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: 18,
            fontWeight: 600,
            color: dim,
            marginTop: 2,
          }}
        >
          {phase.duration}
        </span>
      </div>
    </div>
  );
}

function MetaRow({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  sub,
  rowBg,
  rowBorder,
  dim44,
  dim66,
}: {
  icon: "calendar" | "clock" | "pin";
  iconBg: string;
  iconColor: string;
  label: string;
  value: string;
  sub?: string;
  rowBg: string;
  rowBorder: string;
  dim44: string;
  dim66: string;
}) {
  return (
    <div
      style={{
        padding: "14px 16px",
        borderRadius: 18,
        background: rowBg,
        border: `1px solid ${rowBorder}`,
        display: "flex",
        alignItems: "flex-start",
        gap: 14,
      }}
    >
      {/* DOM order in dir=rtl: first = rightmost (text), last = leftmost (icon) */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: 2,
          textAlign: "right",
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: dim44,
            letterSpacing: "1px",
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: 22, fontWeight: 600, color: "#FFFFFF" }}>
          {value}
        </span>
        {sub && (
          <span style={{ fontSize: 18, fontWeight: 500, color: dim66 }}>
            {sub}
          </span>
        )}
      </div>
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: iconBg,
          display: "grid",
          placeItems: "center",
          flexShrink: 0,
        }}
      >
        {icon === "calendar" ? (
          <CalendarIcon size={20} color={iconColor} />
        ) : icon === "clock" ? (
          <ClockIcon size={20} color={iconColor} />
        ) : (
          <PinIcon size={20} color={iconColor} />
        )}
      </span>
    </div>
  );
}

/* ───────────────────── Inline icons ───────────────────── */

type IconSized = { size: number; color?: string };

function ShieldIcon({ size, color = "currentColor" }: IconSized) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function LayersIcon({ size, color = "currentColor" }: IconSized) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 2 10 6-10 6L2 8l10-6Z" />
      <path d="m2 16 10 6 10-6" />
      <path d="m2 12 10 6 10-6" />
    </svg>
  );
}

function ClockIcon({ size, color = "currentColor" }: IconSized) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function CalendarIcon({ size, color = "currentColor" }: IconSized) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M8 3v4M16 3v4M3 10h18" />
    </svg>
  );
}

function PinIcon({ size, color = "currentColor" }: IconSized) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function PhoneIcon({ size, color = "currentColor" }: IconSized) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2L7.9 9.5a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

/* ───────────────────── Utilities ───────────────────── */

/** Split a title into [firstWord, rest]. Falls back gracefully on 1-word titles. */
function splitFirstWord(title: string): [string, string] {
  const trimmed = title.trim();
  const idx = trimmed.indexOf(" ");
  if (idx === -1) return [trimmed, ""];
  return [trimmed.slice(0, idx), trimmed.slice(idx + 1)];
}

/** Split a product tag into two lines (first word + rest, or single line). */
function splitTwoLines(tag: string): [string, string] {
  const trimmed = tag.trim();
  // Prefer splitting on " Bootcamp" so "Cybersecurity Bootcamp" → ["Cybersecurity", "Bootcamp"]
  const bootcampIdx = trimmed.lastIndexOf(" Bootcamp");
  if (bootcampIdx > 0) {
    return [trimmed.slice(0, bootcampIdx), trimmed.slice(bootcampIdx + 1)];
  }
  const idx = trimmed.lastIndexOf(" ");
  if (idx === -1) return [trimmed, ""];
  return [trimmed.slice(0, idx), trimmed.slice(idx + 1)];
}
