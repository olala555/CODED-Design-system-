import Link from "next/link";
import { Icon } from "./Icon";
import { getPalette, primaryColor } from "@/lib/brand";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const palette = getPalette(product.paletteId);
  const primary = primaryColor(product.paletteId);
  const swatches = palette?.colors.slice(0, 5) ?? [];

  return (
    <article
      className="group relative overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-white shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5"
    >
      {/* Color band */}
      <div
        className="h-24 relative"
        style={{
          background: `linear-gradient(135deg, ${primary} 0%, ${swatches[1]?.hex ?? primary} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.25),transparent_60%)]" />
        <div className="absolute top-3 right-3">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/85 backdrop-blur px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-wider text-[color:var(--coded-navy)]">
            {product.status === "active" ? "Active" : "Draft"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-[16px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
              {product.name}
            </h3>
            <p className="mt-1 text-[12.5px] text-[color:var(--text-secondary)] leading-snug">
              {product.tagline}
            </p>
          </div>
        </div>

        {/* Swatches */}
        <div className="mt-4 flex items-center gap-1.5">
          {swatches.map((c) => (
            <div
              key={c.hex}
              title={`${c.name} · ${c.hex}`}
              className="h-5 w-5 rounded-md ring-1 ring-inset ring-black/5"
              style={{ background: c.hex }}
            />
          ))}
          <span className="ml-2 font-mono text-[10.5px] text-[color:var(--text-tertiary)]">
            {primary.toUpperCase()}
          </span>
        </div>

        {/* Type preview */}
        <div className="mt-4 rounded-lg bg-[color:var(--surface-2)] px-3 py-2.5">
          <div
            className="text-[13.5px] font-semibold tracking-tight"
            style={{ color: primary }}
          >
            Neufile Grotesk
          </div>
          <div className="text-[11px] text-[color:var(--text-tertiary)]">
            Aa Bb Cc 0123 — Brand typeface
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <Link
            href={`/products/${product.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[color:var(--coded-navy)] px-3 py-1.5 text-[12.5px] font-medium text-white hover:bg-[color:var(--accent-strong)]"
          >
            Open <Icon name="arrow-right" size={13} />
          </Link>
          <Link
            href={`/brand-book/${product.id}`}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--border-soft)] px-3 py-1.5 text-[12.5px] font-medium text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-2)]"
          >
            Brand book
          </Link>
        </div>
      </div>
    </article>
  );
}
