import Link from "next/link";
import { brand } from "@/lib/brand";
import { SectionHeader } from "@/components/SectionHeader";
import { Icon } from "@/components/Icon";

export default function BrandBookIndex() {
  const palettes = Object.entries(brand.palettes);

  return (
    <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-10">
      <div className="max-w-2xl">
        <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
          Brand book
        </div>
        <h1 className="mt-2 text-[36px] font-semibold tracking-tight text-[color:var(--coded-navy)] leading-[1.1]">
          The CODED brand, program by program.
        </h1>
        <p className="mt-3 text-[15px] text-[color:var(--text-secondary)]">
          A living source of truth — colors, typography, usage rules, and assets
          for every CODED product.
        </p>
      </div>

      <div className="mt-10">
        <SectionHeader title="All palettes" description={`${palettes.length} palettes loaded from the Figma library.`} />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {palettes.map(([id, palette]) => (
            <Link
              key={id}
              href={`/brand-book/${id}`}
              className="group rounded-2xl border border-[color:var(--border-soft)] bg-white p-5 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-all"
            >
              <div className="flex items-center gap-1.5 mb-4">
                {palette.colors.slice(0, 6).map((c) => (
                  <div
                    key={c.hex}
                    className="h-9 flex-1 rounded-md ring-1 ring-inset ring-black/5"
                    style={{ background: c.hex }}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[15px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
                    {palette.label}
                  </div>
                  <div className="text-[12px] text-[color:var(--text-tertiary)] capitalize">
                    {palette.kind} · {palette.colors.length} colors
                  </div>
                </div>
                <Icon name="arrow-right" size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
