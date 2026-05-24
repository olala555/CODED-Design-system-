import Link from "next/link";
import { Icon } from "@/components/Icon";
import { TemplateCardPreview } from "@/components/TemplateCardPreview";
import { brand } from "@/lib/brand";
import { comingSoonTemplates, templates } from "@/lib/templates";

export default function TemplatesPage() {
  const paletteCount = Object.keys(brand.palettes).length;

  return (
    <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-10">
      <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
        Dynamic templates
      </div>
      <h1 className="mt-1 text-[36px] font-semibold tracking-tight text-[color:var(--coded-navy)] leading-[1.1]">
        One template, every program.
      </h1>
      <p className="mt-3 text-[15px] text-[color:var(--text-secondary)] max-w-2xl">
        Each template re-themes instantly across all {paletteCount} CODED
        palettes. Pick a layout, pick a program, get a fully branded file.
      </p>

      {/* Ready templates */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((t) => (
          <Link
            key={t.id}
            href={`/templates/${t.id}`}
            className="group rounded-3xl border border-[color:var(--border-soft)] bg-white p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5 transition-all"
          >
            {/* Live preview */}
            <div className="relative rounded-2xl overflow-hidden bg-[color:var(--surface-2)] border border-[color:var(--border-soft)] bg-dotgrid">
              <TemplateCardPreview id={t.id} paletteId={t.defaultPaletteId} />
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--accent)]/10 px-2.5 py-1 text-[10.5px] font-semibold text-[color:var(--accent)] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--accent)]" />
                Ready
              </span>
            </div>

            <div className="mt-5 flex items-start justify-between gap-3">
              <div>
                <div className="text-[16px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
                  {t.name}
                </div>
                <div className="mt-1 text-[12.5px] text-[color:var(--text-secondary)] leading-snug">
                  {t.tagline}
                </div>
              </div>
              <span className="shrink-0 rounded-md bg-[color:var(--surface-2)] px-2 py-0.5 font-mono text-[10.5px] text-[color:var(--text-secondary)]">
                {t.format}
              </span>
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[color:var(--accent)] group-hover:text-[color:var(--accent-strong)]">
              Open template <Icon name="arrow-right" size={13} />
            </div>
          </Link>
        ))}
      </div>

      {/* Coming soon */}
      <div className="mt-12 flex items-center gap-3">
        <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
          Coming soon
        </span>
        <span className="h-px flex-1 bg-[color:var(--border-soft)]" />
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {comingSoonTemplates.map((t) => (
          <div
            key={t.name}
            className="rounded-3xl border border-dashed border-[color:var(--border-soft)] bg-[color:var(--surface-2)]/40 p-6 select-none"
            aria-disabled="true"
          >
            {/* Placeholder preview */}
            <div className="relative rounded-2xl overflow-hidden border border-dashed border-[color:var(--border-soft)] bg-dotgrid grid place-items-center h-[300px]">
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/70 text-[color:var(--text-tertiary)] shadow-[var(--shadow-soft)]">
                <Icon name={t.icon} size={24} />
              </div>
              <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-[color:var(--text-tertiary)]/10 px-2.5 py-1 text-[10.5px] font-semibold text-[color:var(--text-tertiary)]">
                <Icon name="settings" size={11} />
                In progress
              </span>
            </div>

            <div className="mt-5 flex items-start justify-between gap-3">
              <div>
                <div className="text-[16px] font-semibold tracking-tight text-[color:var(--text-secondary)]">
                  {t.name}
                </div>
                <div className="mt-1 text-[12.5px] text-[color:var(--text-tertiary)] leading-snug">
                  {t.tagline}
                </div>
              </div>
              <span className="shrink-0 rounded-md bg-white px-2 py-0.5 font-mono text-[10.5px] text-[color:var(--text-tertiary)] border border-[color:var(--border-soft)]">
                {t.format}
              </span>
            </div>

            <div className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[color:var(--text-tertiary)]">
              Coming soon
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-[11.5px] font-mono text-[color:var(--text-tertiary)]">
        Themed from CODED Brand System v{brand.version} · synced {brand.lastUpdated}
      </div>
    </div>
  );
}
