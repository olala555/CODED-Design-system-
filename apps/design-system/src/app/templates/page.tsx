import Link from "next/link";
import { Icon } from "@/components/Icon";
import { brand } from "@/lib/brand";
import { templates } from "@/lib/templates";

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

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((t) => (
          <Link
            key={t.id}
            href={`/templates/${t.id}`}
            className="group rounded-3xl border border-[color:var(--border-soft)] bg-white p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5 transition-all"
          >
            {/* Aspect preview */}
            <div
              className="rounded-2xl overflow-hidden bg-[color:var(--surface-2)] border border-[color:var(--border-soft)] bg-dotgrid grid place-items-center"
              style={{ aspectRatio: t.aspect }}
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-[var(--shadow-soft)] text-[color:var(--accent)] group-hover:scale-110 transition-transform">
                <Icon name={t.icon} size={22} />
              </div>
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

      <div className="mt-10 text-[11.5px] font-mono text-[color:var(--text-tertiary)]">
        Themed from CODED Brand System v{brand.version} · synced {brand.lastUpdated}
      </div>
    </div>
  );
}
