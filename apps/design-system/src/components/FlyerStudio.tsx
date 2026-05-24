"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FlyerPreview } from "./FlyerPreview";
import { Icon } from "./Icon";
import { brand, primaryColor } from "@/lib/brand";
import {
  flyerProductIds,
  flyerProducts,
  themeForPalette,
  type FlyerPhase,
  type FlyerProductContent,
} from "@/lib/flyerProducts";

const PRODUCT_PILLS: Record<string, { short: string; long: string }> = {
  "cybersecurity-bootcamp": { short: "Cybersec", long: "Cybersecurity" },
  "ai-app-developer": { short: "AI Dev", long: "AI App Developer" },
  "data-science-bootcamp": { short: "Data Sci", long: "Data Science" },
};

type TabId = "hero" | "skills" | "details" | "contact";

const TABS: { id: TabId; label: string; icon: "sparkles" | "grid" | "layout" | "send" }[] = [
  { id: "hero", label: "Hero", icon: "sparkles" },
  { id: "skills", label: "Skills", icon: "grid" },
  { id: "details", label: "Details", icon: "layout" },
  { id: "contact", label: "Contact", icon: "send" },
];

export function FlyerStudio({ defaultProductId }: { defaultProductId: string }) {
  const initial =
    flyerProducts[defaultProductId] ?? flyerProducts["cybersecurity-bootcamp"];

  const [productId, setProductId] = useState(initial.paletteId);
  const [content, setContent] = useState<FlyerProductContent>(initial);
  const [tab, setTab] = useState<TabId>("hero");
  const [zoom, setZoom] = useState<"fit" | 0.5 | 1>("fit");

  const update = <K extends keyof FlyerProductContent>(
    key: K,
    value: FlyerProductContent[K],
  ) => setContent((c) => ({ ...c, [key]: value }));

  const updatePhase = (i: number, patch: Partial<FlyerPhase>) =>
    setContent((c) => ({
      ...c,
      phases: c.phases.map((p, j) => (j === i ? { ...p, ...patch } : p)),
    }));

  const onPickProduct = (id: string) => {
    setProductId(id);
    const preset = flyerProducts[id];
    if (preset) setContent(preset);
  };

  const onPickPalette = (id: string) =>
    setContent((c) => ({
      ...c,
      paletteId: id,
      theme: themeForPalette(id),
    }));

  // ---- Preview canvas auto-fit (flyer is 1240 × 1748) ----
  const FLYER_W = 1240;
  const FLYER_H = 1748;
  const canvasRef = useRef<HTMLDivElement>(null);
  const [autoScale, setAutoScale] = useState(0.32);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const compute = () => {
      const padding = 64;
      const w = el.clientWidth - padding * 2;
      const h = el.clientHeight - padding * 2;
      if (w <= 0 || h <= 0) return;
      const fit = Math.min(w / FLYER_W, h / FLYER_H);
      setAutoScale(Math.max(0.2, fit));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = zoom === "fit" ? autoScale : zoom;
  const filename = `coded-flyer-${content.paletteId}.png`;

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-[color:var(--surface-2)]">
      {/* ───────────── Top toolbar ───────────── */}
      <header className="border-b border-[color:var(--border-soft)] bg-white px-6 lg:px-10 py-3 flex items-center justify-between gap-6">
        <div className="min-w-0 flex items-center gap-5">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.14em] text-[color:var(--text-tertiary)] hover:text-[color:var(--coded-navy)]"
          >
            <Icon name="chevron-right" size={10} className="rotate-180" />
            Templates
          </Link>
          <div className="h-5 w-px bg-[color:var(--border-soft)]" />
          <div className="flex items-baseline gap-3 min-w-0">
            <h1 className="text-[17px] font-semibold tracking-tight text-[color:var(--coded-navy)] truncate">
              Bootcamp Flyer
            </h1>
            <span className="font-mono text-[10.5px] text-[color:var(--text-tertiary)]">
              A-series · 1240 × 1748
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom segmented */}
          <div className="hidden md:flex items-center rounded-lg border border-[color:var(--border-soft)] bg-white p-0.5 text-[11px] font-medium">
            {(["fit", 0.5, 1] as const).map((z) => (
              <button
                key={String(z)}
                type="button"
                onClick={() => setZoom(z)}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  zoom === z
                    ? "bg-[color:var(--coded-navy)] text-white"
                    : "text-[color:var(--text-secondary)] hover:text-[color:var(--coded-navy)]"
                }`}
              >
                {z === "fit" ? "Fit" : z === 0.5 ? "50%" : "100%"}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--border-soft)] bg-white px-3 py-1.5 text-[12.5px] font-medium text-[color:var(--text-primary)] hover:bg-[color:var(--surface-2)]"
          >
            <Icon name="download" size={13} /> Print / PDF
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[color:var(--coded-navy)] px-3 py-1.5 text-[12.5px] font-medium text-white hover:bg-[color:var(--accent-strong)]"
            title="PNG export coming soon"
          >
            <Icon name="download" size={13} /> Export PNG
          </button>
        </div>
      </header>

      {/* ───────────── Body ───────────── */}
      <div className="flex-1 flex min-h-0">
        {/* ============ Form panel ============ */}
        <aside className="w-[340px] shrink-0 border-r border-[color:var(--border-soft)] bg-white flex flex-col min-h-0">
          {/* Product preset row */}
          <section className="border-b border-[color:var(--border-soft)] px-4 pt-4 pb-3.5">
            <SectionLabel>Product</SectionLabel>
            <div className="mt-2 grid grid-cols-3 gap-1.5">
              {flyerProductIds.map((id) => {
                const active = id === productId;
                const primary = primaryColor(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onPickProduct(id)}
                    className={`group flex flex-col items-center gap-1.5 rounded-lg border px-2 py-2.5 transition-all ${
                      active
                        ? "border-[color:var(--coded-navy)] bg-[color:var(--coded-navy)] text-white shadow-[var(--shadow-soft)]"
                        : "border-[color:var(--border-soft)] bg-white hover:border-[color:var(--coded-navy)]/30 hover:bg-[color:var(--surface-2)]"
                    }`}
                  >
                    <span
                      className="h-3 w-3 rounded-full ring-1 ring-inset ring-black/10"
                      style={{ background: primary }}
                    />
                    <span
                      className={`text-[11px] font-semibold leading-none ${
                        active ? "text-white" : "text-[color:var(--coded-navy)]"
                      }`}
                    >
                      {PRODUCT_PILLS[id]?.short ?? id}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2.5 text-[10.5px] font-mono text-[color:var(--text-tertiary)]">
              Loads default Arabic copy for the selected product.
            </p>
          </section>

          {/* Theme palette */}
          <section className="border-b border-[color:var(--border-soft)] px-4 pt-3.5 pb-3.5">
            <SectionLabel>Theme</SectionLabel>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              {Object.entries(brand.palettes).map(([id, palette]) => {
                const active = id === content.paletteId;
                const primary = primaryColor(id);
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => onPickPalette(id)}
                    className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors ${
                      active
                        ? "bg-[color:var(--accent-soft)] ring-1 ring-inset ring-[color:var(--accent)]/30"
                        : "hover:bg-[color:var(--surface-2)]"
                    }`}
                    title={palette.label}
                  >
                    <span
                      className="h-3.5 w-3.5 rounded-md ring-1 ring-inset ring-black/5 shrink-0"
                      style={{ background: primary }}
                    />
                    <span
                      className={`truncate text-[11.5px] ${
                        active
                          ? "text-[color:var(--accent)] font-semibold"
                          : "text-[color:var(--coded-navy)] font-medium"
                      }`}
                    >
                      {palette.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Tabs */}
          <nav className="flex border-b border-[color:var(--border-soft)] bg-[color:var(--surface-2)]">
            {TABS.map((t) => {
              const active = t.id === tab;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTab(t.id)}
                  className={`relative flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 text-[11.5px] font-medium transition-colors ${
                    active
                      ? "text-[color:var(--coded-navy)] bg-white"
                      : "text-[color:var(--text-secondary)] hover:text-[color:var(--coded-navy)]"
                  }`}
                >
                  <Icon name={t.icon} size={12} />
                  {t.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-0.5 bg-[color:var(--coded-navy)]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Tab content (scrollable) */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {tab === "hero" && (
              <>
                <Field
                  label="Program tag"
                  value={content.programTag}
                  onChange={(v) => update("programTag", v)}
                />
                <Field
                  label="Kicker"
                  value={content.kickerAr}
                  onChange={(v) => update("kickerAr", v)}
                  rtl
                />
                <Field
                  label="Title"
                  value={content.titleAr}
                  onChange={(v) => update("titleAr", v)}
                  rtl
                />
                <Field
                  label="Subtitle"
                  value={content.subtitleAr}
                  onChange={(v) => update("subtitleAr", v)}
                  rtl
                  multiline
                />
                <Field
                  label="Date range"
                  value={content.dateRangeAr}
                  onChange={(v) => update("dateRangeAr", v)}
                  rtl
                />
              </>
            )}

            {tab === "skills" && (
              <>
                <Field
                  label="Section heading"
                  value={content.skillsHeadingAr}
                  onChange={(v) => update("skillsHeadingAr", v)}
                  rtl
                />
                <Field
                  label="Skills (one per line)"
                  value={content.skillsAr.join("\n")}
                  onChange={(v) =>
                    update(
                      "skillsAr",
                      v.split("\n").map((s) => s.trim()).filter(Boolean),
                    )
                  }
                  rtl
                  multiline
                  rows={7}
                  hint={`${content.skillsAr.length} pill${content.skillsAr.length === 1 ? "" : "s"}`}
                />
              </>
            )}

            {tab === "details" && (
              <>
                <Field
                  label="Section heading"
                  value={content.detailsHeadingAr}
                  onChange={(v) => update("detailsHeadingAr", v)}
                  rtl
                />

                <Subsection title="Phases & pricing">
                  <Field
                    label="Card heading"
                    value={content.phasesHeadingAr}
                    onChange={(v) => update("phasesHeadingAr", v)}
                    rtl
                  />
                  {content.phases.map((phase, i) => (
                    <div
                      key={i}
                      className="rounded-lg border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] p-2.5 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
                          Phase {i + 1}
                        </span>
                        <span className="text-[10.5px] font-mono text-[color:var(--text-tertiary)]">
                          {phase.duration}
                        </span>
                      </div>
                      <Field
                        label="Name"
                        value={phase.name}
                        onChange={(v) => updatePhase(i, { name: v })}
                        rtl
                        compact
                      />
                      <Field
                        label="Topic"
                        value={phase.topic}
                        onChange={(v) => updatePhase(i, { topic: v })}
                        rtl
                        compact
                      />
                      <div className="grid grid-cols-2 gap-2">
                        <Field
                          label="Duration"
                          value={phase.duration}
                          onChange={(v) => updatePhase(i, { duration: v })}
                          rtl
                          compact
                        />
                        <Field
                          label="Price"
                          value={phase.price}
                          onChange={(v) => updatePhase(i, { price: v })}
                          compact
                        />
                      </div>
                    </div>
                  ))}
                  <div className="grid grid-cols-2 gap-2">
                    <Field
                      label="Total"
                      value={content.totalPrice}
                      onChange={(v) => update("totalPrice", v)}
                      compact
                    />
                    <Field
                      label="Currency"
                      value={content.currency}
                      onChange={(v) => update("currency", v)}
                      rtl
                      compact
                    />
                  </div>
                  <Field
                    label="Installments badge"
                    value={content.installmentsAr}
                    onChange={(v) => update("installmentsAr", v)}
                    rtl
                    compact
                  />
                </Subsection>

                <Subsection title="Schedule & location">
                  <Field
                    label="Card heading"
                    value={content.durationHeadingAr}
                    onChange={(v) => update("durationHeadingAr", v)}
                    rtl
                    compact
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Field
                      label="Number"
                      value={content.durationNumber}
                      onChange={(v) => update("durationNumber", v)}
                      compact
                    />
                    <Field
                      label="Unit"
                      value={content.durationUnitAr}
                      onChange={(v) => update("durationUnitAr", v)}
                      rtl
                      compact
                    />
                  </div>
                  <Field
                    label="Date range"
                    value={content.scheduleValueAr}
                    onChange={(v) => update("scheduleValueAr", v)}
                    rtl
                    compact
                  />
                  <Field
                    label="Days"
                    value={content.scheduleSubAr}
                    onChange={(v) => update("scheduleSubAr", v)}
                    rtl
                    compact
                  />
                  <Field
                    label="Time"
                    value={content.timeValueAr}
                    onChange={(v) => update("timeValueAr", v)}
                    compact
                  />
                  <Field
                    label="Location"
                    value={content.locationValueAr}
                    onChange={(v) => update("locationValueAr", v)}
                    rtl
                    compact
                  />
                </Subsection>
              </>
            )}

            {tab === "contact" && (
              <>
                <Field
                  label="Phone"
                  value={content.phone}
                  onChange={(v) => update("phone", v)}
                />
                <Field
                  label="CTA text"
                  value={content.contactCtaAr}
                  onChange={(v) => update("contactCtaAr", v)}
                  rtl
                />
                <Field
                  label="Footer tagline"
                  value={content.taglineEn}
                  onChange={(v) => update("taglineEn", v)}
                />
              </>
            )}
          </div>

          {/* Footer / filename */}
          <footer className="border-t border-[color:var(--border-soft)] px-4 py-2.5 bg-[color:var(--surface-2)]">
            <div className="text-[10px] font-mono text-[color:var(--text-tertiary)] truncate">
              <span className="text-[color:var(--text-secondary)]">
                Exports as:
              </span>{" "}
              {filename}
            </div>
          </footer>
        </aside>

        {/* ============ Preview canvas ============ */}
        <main
          ref={canvasRef}
          className="flex-1 relative overflow-auto bg-[color:var(--surface-2)] bg-dotgrid"
        >
          <div className="absolute inset-0 grid place-items-center p-16">
            {/* Visual-sized wrapper — layout matches what the user sees */}
            <div
              style={{
                width: FLYER_W * scale,
                height: FLYER_H * scale,
                position: "relative",
                borderRadius: 18 * scale,
                overflow: "hidden",
                boxShadow:
                  "0 40px 100px -20px rgba(20,36,63,0.35), 0 8px 24px -8px rgba(20,36,63,0.2)",
              }}
              id="template-print-target"
            >
              <div
                style={{
                  width: FLYER_W,
                  height: FLYER_H,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  transformOrigin: "top left",
                  transform: `scale(${scale})`,
                }}
              >
                <FlyerPreview {...content} />
              </div>
            </div>
          </div>

          {/* Floating dimensions label */}
          <div className="pointer-events-none absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-md bg-white/85 backdrop-blur px-2.5 py-1 font-mono text-[10.5px] text-[color:var(--text-secondary)] shadow-[var(--shadow-soft)] border border-[color:var(--border-soft)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
            {FLYER_W} × {FLYER_H} · {Math.round(scale * 100)}%
          </div>
        </main>
      </div>
    </div>
  );
}

/* ─────────────── small helpers ─────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--text-tertiary)]">
      {children}
    </div>
  );
}

function Subsection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2 pt-1">
        <div className="h-px flex-1 bg-[color:var(--border-soft)]" />
        <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em] text-[color:var(--text-secondary)]">
          {title}
        </span>
        <div className="h-px flex-1 bg-[color:var(--border-soft)]" />
      </div>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
  rows = 2,
  rtl,
  compact,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  rows?: number;
  rtl?: boolean;
  compact?: boolean;
  hint?: string;
}) {
  const sharedClass = `w-full rounded-md border border-[color:var(--border-soft)] bg-white outline-none focus:border-[color:var(--accent)]/40 focus:ring-2 focus:ring-[color:var(--accent)]/15 text-[color:var(--coded-navy)] ${
    compact ? "px-2 py-1.5 text-[12px]" : "px-2.5 py-2 text-[12.5px]"
  }`;

  return (
    <label className="block">
      <div className="mb-1 flex items-center justify-between">
        <span
          className={`font-medium text-[color:var(--text-secondary)] ${
            compact ? "text-[10.5px]" : "text-[11px]"
          }`}
        >
          {label}
        </span>
        {hint && (
          <span className="text-[10px] font-mono text-[color:var(--text-tertiary)]">
            {hint}
          </span>
        )}
      </div>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={rows}
          dir={rtl ? "rtl" : "ltr"}
          className={`${sharedClass} resize-none`}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          dir={rtl ? "rtl" : "ltr"}
          className={sharedClass}
        />
      )}
    </label>
  );
}
