import Link from "next/link";
import { brand, getPalette, primaryColor } from "@/lib/brand";
import { products } from "@/lib/products";
import type { Product } from "@/lib/products";
import { Icon } from "@/components/Icon";

const master = products.find((p) => p.kind === "master")!;
const programs = products.filter((p) => p.kind === "program");
const youth = products.filter((p) => p.kind === "youth");

export default function BrandBookIndex() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10">
      {/* Header */}
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)]">
          <span className="font-mono">[</span> Brand book{" "}
          <span className="font-mono">]</span>
        </div>
        <h1 className="mt-3 text-[40px] lg:text-[48px] font-semibold tracking-tight text-[color:var(--coded-navy)] leading-[1.05]">
          The CODED brand, program by program.
        </h1>
        <p className="mt-4 text-[15px] lg:text-[16px] text-[color:var(--text-secondary)] leading-relaxed">
          A living source of truth. The master brand anchors every program, and
          every program owns its identity — colors, type, logo, usage rules, and
          applications. Pick a brand below to open its full guide.
        </p>

        <div className="mt-5 flex items-center gap-4 text-[12px] text-[color:var(--text-tertiary)]">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--ai-light-sea-green)]" />
            Synced with Figma · {brand.lastUpdated}
          </span>
          <span className="font-mono">v{brand.version}</span>
          <span>{Object.keys(brand.palettes).length} palettes</span>
        </div>
      </div>

      {/* Master brand — full-width feature */}
      <section className="mt-12">
        <DivisionLabel index="01" label="Master brand" />
        <MasterCard product={master} />
      </section>

      {/* Programs */}
      <section className="mt-14">
        <DivisionLabel
          index="02"
          label="Programs"
          meta={`${programs.length} programs`}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {programs.map((p) => (
            <BrandBookCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Youth */}
      {youth.length > 0 && (
        <section className="mt-14">
          <DivisionLabel index="03" label="Youth" meta="Children 8–14" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {youth.map((p) => (
              <BrandBookCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function DivisionLabel({
  index,
  label,
  meta,
}: {
  index: string;
  label: string;
  meta?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[11px] text-[color:var(--text-tertiary)]">
          {index}
        </span>
        <h2 className="text-[22px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
          {label}
        </h2>
      </div>
      {meta && (
        <span className="text-[12px] text-[color:var(--text-tertiary)]">
          {meta}
        </span>
      )}
    </div>
  );
}

function MasterCard({ product }: { product: Product }) {
  const palette = getPalette(product.paletteId);
  const primary = primaryColor(product.paletteId);
  const swatches = palette?.colors.slice(0, 5) ?? [];

  return (
    <Link
      href={`/brand-book/${product.id}`}
      className="group relative block overflow-hidden rounded-3xl border border-[color:var(--border-soft)] shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-all"
      style={{ background: primary }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(1200px_500px_at_120%_-10%,rgba(255,255,255,0.18),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_-10%_120%,rgba(255,255,255,0.08),transparent_60%)]" />

      <div className="relative grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 p-8 lg:p-10 text-white">
        <div>
          <div className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/70">
            <span className="font-mono">[</span> Master brand{" "}
            <span className="font-mono">]</span>
          </div>
          <h3 className="mt-3 text-[34px] lg:text-[42px] font-semibold tracking-tight leading-[1.05]">
            {product.name}
          </h3>
          <p className="mt-3 text-[14.5px] text-white/80 max-w-md leading-relaxed">
            {product.tagline}
          </p>
          <div className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-medium text-white">
            Open master brand book
            <Icon
              name="arrow-right"
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>

        {/* Mini contents preview */}
        <div className="rounded-2xl bg-white/10 backdrop-blur p-5 ring-1 ring-white/15">
          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/60 mb-3">
            Inside
          </div>
          <ul className="space-y-1.5 text-[13px] text-white/90">
            {[
              "Identity & voice",
              "Color system",
              "Typography",
              "Logo & lockups",
              "Usage rules",
              "Applications",
            ].map((s) => (
              <li key={s} className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-white/70" />
                {s}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex items-center gap-1.5">
            {swatches.map((c) => (
              <div
                key={c.hex}
                className="h-7 flex-1 rounded-md ring-1 ring-inset ring-white/20"
                style={{ background: c.hex }}
                title={`${c.name} · ${c.hex}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

function BrandBookCard({ product }: { product: Product }) {
  const palette = getPalette(product.paletteId);
  const primary = primaryColor(product.paletteId);
  const swatches = palette?.colors.slice(0, 5) ?? [];
  const isDraft = product.status === "draft";

  return (
    <Link
      href={`/brand-book/${product.id}`}
      className="group relative block overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-white shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5 transition-all"
    >
      {/* Color band */}
      <div
        className="relative h-28"
        style={{
          background: `linear-gradient(135deg, ${primary} 0%, ${swatches[1]?.hex ?? primary} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.22),transparent_60%)]" />
        <div className="absolute top-3 left-3 font-mono text-[11px] text-white/75">
          [{product.id}]
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-wider ${
              isDraft
                ? "bg-white/85 text-[color:var(--text-tertiary)]"
                : "bg-white/85 text-[color:var(--coded-navy)]"
            }`}
          >
            {isDraft ? "Draft" : "Active"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-[17px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
          {product.name}
        </h3>
        <p className="mt-1 text-[12.5px] text-[color:var(--text-secondary)] leading-snug line-clamp-2">
          {product.tagline}
        </p>

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

        <div className="mt-4 pt-4 border-t border-[color:var(--border-soft)] flex items-center justify-between">
          <span className="text-[11.5px] text-[color:var(--text-tertiary)]">
            Identity · Color · Type · Logo · Usage
          </span>
          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[color:var(--accent)] group-hover:text-[color:var(--accent-strong)]">
            Open
            <Icon
              name="arrow-right"
              size={12}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
