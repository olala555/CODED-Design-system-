import Link from "next/link";
import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { ProductCard } from "@/components/ProductCard";
import { HeroSection } from "@/components/HeroSection";
import { FeatureCard } from "@/components/FeatureCard";
import { products } from "@/lib/products";
import { brand } from "@/lib/brand";

const features = [
  {
    href: "/brand-book",
    title: "Brand Book",
    description: "Living guidelines for every CODED program.",
    icon: "book" as const,
    accent: "var(--coded-blue)",
  },
  {
    href: "/assistant",
    title: "AI Assistant",
    description: "Ask anything about the CODED brand system.",
    icon: "sparkles" as const,
    accent: "var(--ai-light-sea-green)",
    badge: "AI",
  },
  {
    href: "/assets",
    title: "Assets",
    description: "Logos, marks, and graphics — themed per product.",
    icon: "image" as const,
    accent: "var(--ds-purple)",
  },
  {
    href: "/templates",
    title: "Templates",
    description: "Certificate and presentation, brand-themed.",
    icon: "layout" as const,
    accent: "var(--unicode-orange)",
  },
  {
    href: "/sponsors",
    title: "Sponsors",
    description: "Co-branding rules and partner usage.",
    icon: "handshake" as const,
    accent: "var(--juniors-red)",
  },
  {
    href: "/products",
    title: "Products",
    description: "Every program, its palette, and its rules.",
    icon: "grid" as const,
    accent: "var(--coded-navy)",
  },
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-8 lg:py-10">
      <HeroSection />

      {/* Feature access cards */}
      <section className="mt-12 lg:mt-16">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[color:var(--accent)] mb-2">
              Studio modules
            </div>
            <h2 className="text-[24px] lg:text-[28px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
              Everything, one click away.
            </h2>
            <p className="mt-1 text-[13.5px] text-[color:var(--text-secondary)]">
              Jump into the part of the system you need right now.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={f.href} {...f} delay={i * 70} />
          ))}
        </div>
      </section>

      {/* Product themes */}
      <section className="mt-16">
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

      {/* Three-up: recent assets + brand system status */}
      <section className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* AI Assistant shortcut */}
        <Link
          href="/assistant"
          className="group relative overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--coded-navy)] p-6 text-white shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-0.5 transition-all duration-300"
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
              Open assistant
              <Icon
                name="arrow-right"
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </div>
          </div>
        </Link>

        {/* Recently updated assets */}
        <div className="rounded-2xl border border-[color:var(--border-soft)] bg-white p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <h3 className="text-[15px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
              Recently updated assets
            </h3>
            <Link
              href="/assets"
              className="text-[12px] font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
            >
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
              <li
                key={a.name}
                className="flex items-center gap-3 py-2.5 hover:bg-[color:var(--surface-2)]/60 -mx-2 px-2 rounded-md transition-colors"
              >
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
        <div className="rounded-2xl border border-[color:var(--border-soft)] bg-white p-6 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-shadow duration-300">
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
              <li
                key={row.label}
                className="flex items-center justify-between text-[13px]"
              >
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

      <footer className="mt-16 mb-4 flex items-center justify-between text-[11.5px] text-[color:var(--text-tertiary)]">
        <div>CODED Studio — Design System Platform · capstone build</div>
        <div className="font-mono">v0.1.0</div>
      </footer>
    </div>
  );
}
