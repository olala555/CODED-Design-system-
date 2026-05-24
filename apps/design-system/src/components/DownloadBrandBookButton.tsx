"use client";

import { Icon } from "./Icon";

/**
 * Triggers the browser print dialog so the brand book can be saved as a PDF.
 * Print styling (hiding app chrome, page breaks) lives in globals.css under
 * the `@media print` block, scoped to #brandbook-print.
 */
export function DownloadBrandBookButton({
  label = "Download PDF",
  variant = "solid",
}: {
  label?: string;
  variant?: "solid" | "ghost";
}) {
  const base =
    "inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[12.5px] font-medium transition-colors print:hidden";
  const styles =
    variant === "solid"
      ? "bg-white/15 text-white ring-1 ring-white/25 hover:bg-white/25 backdrop-blur"
      : "border border-[color:var(--border-soft)] bg-white text-[color:var(--text-primary)] hover:bg-[color:var(--surface-2)]";

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`${base} ${styles}`}
      title="Save this brand book as a PDF via your browser print dialog"
    >
      <Icon name="download" size={14} /> {label}
    </button>
  );
}
