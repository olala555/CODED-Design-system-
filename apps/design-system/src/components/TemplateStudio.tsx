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
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const padding = 48;
      const w = el.clientWidth - padding * 2;
      const h = el.clientHeight - padding * 2;
      if (w <= 0 || h <= 0) return;
      setScale(Math.min(w / previewWidth, h / previewHeight, 1.2));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [previewWidth, previewHeight]);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
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

        {/* Preview canvas */}
        <div
          ref={containerRef}
          className={`flex-1 grid place-items-center overflow-hidden ${
            previewBackdrop === "dark"
              ? "bg-[color:var(--coded-navy)]"
              : "bg-[color:var(--surface-2)] bg-dotgrid"
          }`}
        >
          <div
            className="origin-center transition-transform"
            style={{ transform: `scale(${scale})` }}
            id="template-print-target"
          >
            {children}
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
