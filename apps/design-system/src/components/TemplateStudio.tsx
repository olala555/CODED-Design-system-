"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

/**
 * Shared chrome for /templates/[id] pages.
 *
 * Layout: left form panel (scrollable) + right preview canvas.
 * The preview area auto-fits children of intrinsic size (`previewWidth`/
 * `previewHeight`) so the consumer renders a fixed-size artifact and we
 * scale it to fit.
 */
export function TemplateStudio({
  title,
  subtitle,
  formatLabel,
  formPanel,
  previewWidth,
  previewHeight,
  previewBackdrop = "light",
  onExportPdf,
  exportFilename,
  children,
}: {
  title: string;
  subtitle: string;
  formatLabel: string;
  formPanel: React.ReactNode;
  previewWidth: number;
  previewHeight: number;
  previewBackdrop?: "light" | "dark";
  onExportPdf?: () => void;
  exportFilename: string;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fitScale, setFitScale] = useState(1);
  const [zoom, setZoom] = useState<"fit" | number>("fit");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const padding = 48;
      const w = el.clientWidth - padding * 2;
      const h = el.clientHeight - padding * 2;
      if (w <= 0 || h <= 0) return;
      setFitScale(Math.min(w / previewWidth, h / previewHeight, 1.2));
    };
    // Measure now and again across the next few frames — layout/CSS can settle
    // after mount, and ResizeObserver is unreliable in some embedded contexts.
    update();
    const raf = requestAnimationFrame(update);
    const timers = [setTimeout(update, 60), setTimeout(update, 250)];
    window.addEventListener("resize", update);
    let ro: ResizeObserver | undefined;
    try {
      ro = new ResizeObserver(update);
      ro.observe(el);
    } catch {
      /* ResizeObserver unavailable — rAF/resize fallbacks cover it */
    }
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [previewWidth, previewHeight]);

  const effective = zoom === "fit" ? fitScale : zoom;

  return (
    <div className="flex flex-col h-[calc(100dvh-64px)] max-h-[calc(100dvh-64px)] overflow-hidden">
      {/* Sub-header */}
      <div className="border-b border-[color:var(--border-soft)] bg-white px-6 lg:px-10 py-4 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)] hover:text-[color:var(--coded-navy)]"
          >
            <Icon name="chevron-right" size={10} className="rotate-180" />
            Templates
          </Link>
          <div className="mt-1 flex items-baseline gap-3">
            <h1 className="text-[20px] font-semibold tracking-tight text-[color:var(--coded-navy)] truncate">
              {title}
            </h1>
            <span className="font-mono text-[11px] text-[color:var(--text-tertiary)]">
              {formatLabel}
            </span>
          </div>
          <p className="text-[12.5px] text-[color:var(--text-secondary)] truncate">
            {subtitle}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center rounded-lg border border-[color:var(--border-soft)] bg-white p-0.5 print:hidden">
            {([["fit", "Fit"], [0.5, "50%"], [1, "100%"]] as const).map(([val, label]) => {
              const active = zoom === val;
              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => setZoom(val)}
                  className={`rounded-md px-2.5 py-1 text-[11.5px] font-medium transition-colors ${
                    active
                      ? "bg-[color:var(--coded-navy)] text-white"
                      : "text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-2)]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--border-soft)] bg-white px-3 py-1.5 text-[12.5px] font-medium text-[color:var(--text-primary)] hover:bg-[color:var(--surface-2)]"
            title="Use the browser print dialog to save as PDF"
          >
            <Icon name="download" size={13} /> Print / PDF
          </button>
          <button
            type="button"
            onClick={onExportPdf}
            disabled={!onExportPdf}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[color:var(--coded-navy)] px-3 py-1.5 text-[12.5px] font-medium text-white hover:bg-[color:var(--accent-strong)] disabled:opacity-50 disabled:cursor-not-allowed"
            title={onExportPdf ? "Export PNG" : "PNG export coming soon"}
          >
            <Icon name="download" size={13} /> Export PNG
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex-1 flex min-h-0">
        {/* Form panel */}
        <aside className="w-[340px] shrink-0 border-r border-[color:var(--border-soft)] bg-white overflow-y-auto print:hidden">
          <div className="p-5">{formPanel}</div>
          <div className="px-5 pb-5 text-[10.5px] font-mono text-[color:var(--text-tertiary)]">
            Will export as: <span className="text-[color:var(--text-secondary)]">{exportFilename}</span>
          </div>
        </aside>

        {/* Preview canvas — scrollable; centers when it fits, scrolls when zoomed in */}
        <div
          ref={containerRef}
          className={`flex-1 flex overflow-auto ${
            previewBackdrop === "dark"
              ? "bg-[color:var(--coded-navy)]"
              : "bg-[color:var(--surface-2)] bg-dotgrid"
          }`}
        >
          {/* margin:auto centers when smaller than the canvas, and keeps the
              top-left reachable when larger (so scrolling shows everything) */}
          <div style={{ margin: "auto", padding: 48 }}>
            <div
              style={{
                width: previewWidth * effective,
                height: previewHeight * effective,
              }}
              className="transition-[width,height]"
            >
              <div
                id="template-print-target"
                className="origin-top-left"
                style={{
                  width: previewWidth,
                  height: previewHeight,
                  transform: `scale(${effective})`,
                }}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FieldGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)] mb-2">
        {label}
      </div>
      <div className="flex flex-col gap-2.5">{children}</div>
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="text-[11.5px] font-medium text-[color:var(--text-secondary)] mb-1">
        {label}
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[color:var(--border-soft)] bg-white px-3 py-2 text-[13px] text-[color:var(--coded-navy)] outline-none focus:border-[color:var(--accent)]/40 focus:ring-2 focus:ring-[color:var(--accent)]/15 placeholder:text-[color:var(--text-tertiary)]"
      />
    </label>
  );
}
