import { notFound } from "next/navigation";
import Link from "next/link";
import { brand, getPalette, primaryColor } from "@/lib/brand";
import { Icon } from "@/components/Icon";

export function generateStaticParams() {
  return Object.keys(brand.palettes).map((id) => ({ id }));
}

export default async function PaletteDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const palette = getPalette(id);
  if (!palette) notFound();

  const primary = primaryColor(id);

  return (
    <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-10">
      <Link
        href="/brand-book"
        className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[color:var(--text-tertiary)] hover:text-[color:var(--coded-navy)]"
      >
        <Icon name="chevron-right" size={12} className="rotate-180" /> Brand book
      </Link>

      <div className="mt-4 flex items-end justify-between gap-6">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
            {palette.kind} palette
          </div>
          <h1 className="mt-1 text-[36px] font-semibold tracking-tight text-[color:var(--coded-navy)] leading-[1.1]">
            {palette.label}
          </h1>
        </div>
        <div
          className="hidden md:block h-16 w-32 rounded-xl ring-1 ring-inset ring-black/5"
          style={{ background: primary }}
        />
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
        {palette.colors.map((c) => (
          <div
            key={c.hex}
            className="overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-white shadow-[var(--shadow-soft)]"
          >
            <div className="h-28" style={{ background: c.hex }} />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="text-[15px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
                  {c.name}
                </div>
                <span className="rounded-md bg-[color:var(--surface-2)] px-2 py-0.5 font-mono text-[11px] text-[color:var(--coded-navy)]">
                  {c.hex.toUpperCase()}
                </span>
              </div>
              <div className="mt-1 text-[11.5px] text-[color:var(--text-tertiary)]">
                rgb({c.rgb}) · {c.role}
              </div>
              <p className="mt-2 text-[12.5px] text-[color:var(--text-secondary)] leading-snug">
                {c.usage}
              </p>
            </div>
          </div>
        ))}
      </div>

      {palette.gradients && palette.gradients.length > 0 && (
        <div className="mt-10">
          <h2 className="text-[18px] font-semibold tracking-tight text-[color:var(--coded-navy)] mb-4">
            Gradients
          </h2>
          {palette.gradients.map((g) => (
            <div
              key={g.name}
              className="overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-white shadow-[var(--shadow-soft)]"
            >
              <div
                className="h-32"
                style={{
                  background: `linear-gradient(${g.direction}, ${g.stops.join(", ")})`,
                }}
              />
              <div className="p-4">
                <div className="text-[14px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
                  {g.name}
                </div>
                <div className="mt-1 text-[12px] text-[color:var(--text-secondary)]">
                  {g.usage}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
