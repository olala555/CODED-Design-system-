"use client";

import { useState } from "react";
import { Icon } from "./Icon";

export function PromptPackCard({
  id,
  label,
  kind,
  swatchHexes,
  colorCount,
  hasGradient,
  markdown,
}: {
  id: string;
  label: string;
  kind: "master" | "product";
  swatchHexes: string[];
  colorCount: number;
  hasGradient: boolean;
  markdown: string;
}) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);

  async function copy() {
    setCopyError(null);
    try {
      await navigator.clipboard.writeText(markdown);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (err) {
      setCopyError(err instanceof Error ? err.message : "Copy failed");
    }
  }

  function download() {
    // Use a same-origin <a download> click for the file save dialog
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `coded-brand-pack-${id}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  const tokenCount = Math.ceil(markdown.length / 4);
  const lineCount = markdown.split("\n").length;

  return (
    <article className="rounded-2xl border border-[color:var(--border-soft)] bg-white p-5 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-all">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[15px] font-semibold tracking-tight text-[color:var(--coded-navy)] truncate">
            {label}
          </div>
          <div className="text-[11.5px] text-[color:var(--text-tertiary)] capitalize">
            {kind} · {colorCount} colors{hasGradient ? " · 1 gradient" : ""}
          </div>
        </div>
        <span className="shrink-0 rounded-md bg-[color:var(--surface-2)] px-2 py-0.5 font-mono text-[10.5px] text-[color:var(--text-secondary)]">
          .md
        </span>
      </div>

      {/* Swatches */}
      <div className="mt-3 flex items-center gap-1">
        {swatchHexes.slice(0, 6).map((hex) => (
          <div
            key={hex}
            className="h-6 flex-1 rounded-md ring-1 ring-inset ring-black/5"
            style={{ background: hex }}
            title={hex}
          />
        ))}
      </div>

      {/* Stats */}
      <div className="mt-3 flex items-center gap-3 text-[11px] font-mono text-[color:var(--text-tertiary)]">
        <span>~{tokenCount.toLocaleString()} tokens</span>
        <span>·</span>
        <span>{lineCount} lines</span>
      </div>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={copy}
          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12.5px] font-medium transition-colors ${
            copied
              ? "bg-[color:var(--ai-light-sea-green)]/10 text-[color:var(--ai-light-sea-green)]"
              : "bg-[color:var(--coded-navy)] text-white hover:bg-[color:var(--accent-strong)]"
          }`}
        >
          {copied ? (
            <>
              <Icon name="sparkles" size={13} /> Copied
            </>
          ) : (
            <>
              <Icon name="command" size={13} /> Copy
            </>
          )}
        </button>

        <button
          type="button"
          onClick={download}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--border-soft)] bg-white px-3 py-1.5 text-[12.5px] font-medium text-[color:var(--text-primary)] hover:bg-[color:var(--surface-2)]"
        >
          <Icon name="download" size={13} /> Download
        </button>

        <a
          href={`/api/prompt-pack/${id}?inline=1`}
          target="_blank"
          rel="noreferrer"
          className="ml-auto inline-flex items-center gap-1.5 text-[12px] font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
        >
          Preview <Icon name="arrow-right" size={12} />
        </a>
      </div>

      {copyError && (
        <div className="mt-2 text-[11.5px] text-[color:var(--juniors-red)]">{copyError}</div>
      )}
    </article>
  );
}
