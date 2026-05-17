import Link from "next/link";
import { Icon } from "@/components/Icon";
import { StatCard } from "@/components/StatCard";
import { SectionHeader } from "@/components/SectionHeader";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";
import { brand } from "@/lib/brand";

export default function DashboardPage() {
  const totalPalettes = Object.keys(brand.palettes).length;
  const totalColors = Object.values(brand.palettes).reduce(
    (sum, p) => sum + p.colors.length,
    0
  );

  return (
    <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8 lg:py-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-[color:var(--border-soft)] bg-steel p-8 lg:p-10 shadow-[var(--shadow-soft)]">
        <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(0,74,163,0.18),transparent_60%)]" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[color:var(--border-soft)] bg-white/70 backdrop-blur px-3 py-1 text-[11px] font-medium text-[color:var(--coded-navy)] mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--ai-light-sea-green)]" />
            Brand system online — synced {brand.lastUpdated}
          </div>
          <h1 className="text-[34px] lg:text-[40px] font-semibold tracking-tight text-[color:var(--coded-navy)] leading-[1.1]">
            One source of truth for every CODED brand.
          </h1>
          <p className="mt-3 text-[15px] text-[color:var(--text-secondary)] leading-relaxed max-w-xl">
            Brand books, assets, dynamic templates, and an AI brand assistant
            — built for every product, every team, every output.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link
              href="/assistant"
              className="inline-flex items-center gap-2 rounded-xl bg-[color:var(--coded-navy)] px-4 py-2.5 text-[13.5px] font-medium text-white hover:bg-[color:var(--accent-strong)] transition-colors"
            >
              <Icon name="sparkles" size={15} /> Ask the AI assistant
            </Link>
            <Link
              href="/brand-book"
              className="inline-flex items-center gap-2 rounded-xl border border-[color:var(--border-soft)] bg-white px-4 py-2.5 text-[13.5px] font-medium text-[color:var(--coded-navy)] hover:bg-[color:var(--surface-2)] transition-colors"
            >
              <Icon name="book" size={15} /> Open brand book
            </Link>
          </div>
        </div>
      </section>

      {/* Stat cards */}
      <section className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active programs" value={String(products.filter(p => p.status === "active").length)} hint="Across CODED bootcamps" />
        <StatCard label="Palettes" value={String(totalPalettes)} hint="Including master + Kuwait Codes" />
        <StatCard label="Brand colors" value={String(totalColors)} hint="With usage rules" />
        <StatCard label="Templates" value="2" hint="Certificate · Presentation" />
      </section>

      {/* Product themes */}
      <section className="mt-12">
        <SectionHeader
          title="Product themes"
          description="Each program has its own palette, typography, and usage rules."
          href="/products"
          cta="All products"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Three-up: assistant shortcut, recent assets, recent downloads */}
      <section className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* AI Assistant shortcut */}
        <Link
          href="/assistant"
          className="group relative overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--coded-navy)] p-6 text-white shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-all"
        >
          <div className="absolute -right-8 -bottom-8 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(45,75,253,0.45),transparent_60%)]" />
          <div className="relative">
            <Icon name="sparkles" size={20} />
            <h3 className="mt-4 text-[18px] font-semibold tracking-tight">
              AI Brand Assistant
            </h3>
            <p className="mt-1 text-[13px] text-white/70 leading-snug">
              “What font for Juniors?” · “Show sponsor rules” · “Generate a
              Cybersecurity slide.”
            </p>
            <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium">
              Open assistant <Icon name="arrow-right" size={14} />
            </div>
          </div>
        </Link>

        {/* Recently updated assets */}
        <div className="rounded-2xl border border-[color:var(--border-soft)] bg-white p-6 shadow-[var(--shadow-soft)]">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
              Recently updated assets
            </h3>
            <Link href="/assets" className="text-[12px] font-medium text-[color:var(--accent)]">
              View all
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-[color:var(--border-soft)]">
            {[
              { name: "coded-mark-primary.svg", meta: "SVG · CODED master · 2.1 KB" },
              { name: "juniors-logo-stack.png", meta: "PNG · CODED Juniors · 84 KB" },
              { name: "cyber-blue-team-bg.png", meta: "PNG · Cybersecurity · 1.2 MB" },
              { name: "ai-app-gradient.svg", meta: "SVG · AI App Developer · 4.4 KB" },
            ].map((a) => (
              <li key={a.name} className="flex items-center gap-3 py-2.5">
                <div className="h-9 w-9 grid place-items-center rounded-lg bg-[color:var(--surface-2)] text-[color:var(--text-tertiary)]">
                  <Icon name="image" size={15} />
                </div>
                <div className="min-w-0">
                  <div className="text-[13px] font-medium text-[color:var(--coded-navy)] truncate">
                    {a.name}
                  </div>
                  <div className="text-[11.5px] text-[color:var(--text-tertiary)] truncate">
                    {a.meta}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand system status */}
        <div className="rounded-2xl border border-[color:var(--border-soft)] bg-white p-6 shadow-[var(--shadow-soft)]">
          <h3 className="text-[15px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
            Brand system status
          </h3>
          <ul className="mt-4 space-y-3">
            {[
              { label: "Palette source", value: "Figma · node 78-2641", ok: true },
              { label: "Theme file", value: `v${brand.version}`, ok: true },
              { label: "Typeface", value: brand.typeface, ok: true },
              { label: "Sync status", value: brand.lastUpdated, ok: true },
            ].map((row) => (
              <li key={row.label} className="flex items-center justify-between text-[13px]">
                <span className="text-[color:var(--text-secondary)]">{row.label}</span>
                <span className="inline-flex items-center gap-1.5 text-[color:var(--coded-navy)] font-medium">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${row.ok ? "bg-[color:var(--ai-light-sea-green)]" : "bg-[color:var(--juniors-red)]"}`}
                  />
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Quick access to templates */}
      <section className="mt-12">
        <SectionHeader
          title="Quick access — templates"
          description="Dynamic templates that re-theme to any CODED program."
          href="/templates"
          cta="Browse templates"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            { name: "Certificate", desc: "A4 portrait, brand-themed border + signature block." },
            { name: "Presentation", desc: "16:9 deck with title, content, and section dividers." },
          ].map((t) => (
            <div
              key={t.name}
              className="rounded-2xl border border-[color:var(--border-soft)] bg-white p-6 shadow-[var(--shadow-soft)] flex items-center gap-5"
            >
              <div className="h-20 w-28 shrink-0 rounded-lg bg-dotgrid bg-[color:var(--surface-2)] border border-[color:var(--border-soft)] grid place-items-center text-[color:var(--text-tertiary)]">
                <Icon name="layout" size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-[15px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
                  {t.name}
                </div>
                <div className="text-[12.5px] text-[color:var(--text-secondary)] mt-0.5">
                  {t.desc}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <button className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--border-soft)] bg-white px-2.5 py-1.5 text-[12px] font-medium text-[color:var(--coded-navy)] hover:bg-[color:var(--surface-2)]">
                    Preview
                  </button>
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-[color:var(--accent)] px-2.5 py-1.5 text-[12px] font-medium text-white hover:bg-[color:var(--accent-strong)]">
                    <Icon name="download" size={12} /> Export
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="mt-16 mb-4 flex items-center justify-between text-[11.5px] text-[color:var(--text-tertiary)]">
        <div>CODED Studio — Design System Platform · capstone build</div>
        <div className="font-mono">v0.1.0</div>
      </footer>
    </div>
  );
}
