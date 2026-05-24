import { notFound } from "next/navigation";
import Link from "next/link";
import { getPalette, primaryColor } from "@/lib/brand";
import { getProduct, products } from "@/lib/products";
import { getBrandBook } from "@/lib/brand-book";
import { getBrandExtras } from "@/lib/brand-book-extras";
import { Icon } from "@/components/Icon";
import { DownloadBrandBookButton } from "@/components/DownloadBrandBookButton";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductBrandBook({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const palette = getPalette(product.paletteId);
  if (!palette) notFound();

  const book = getBrandBook(product.id);
  if (!book) notFound();

  const extras = getBrandExtras(product.id);

  const primary = primaryColor(product.paletteId);

  const sections = [
    { id: "identity", label: "Identity" },
    ...(extras ? [{ id: "strategy", label: "Strategy" }] : []),
    { id: "color", label: "Color" },
    { id: "typography", label: "Typography" },
    { id: "logo", label: "Logo" },
    ...(extras ? [{ id: "imagery", label: "Imagery" }] : []),
    ...(extras ? [{ id: "iconography", label: "Iconography" }] : []),
    ...(extras ? [{ id: "layout", label: "Layout" }] : []),
    { id: "usage", label: "Usage" },
    { id: "applications", label: "Applications" },
    ...(extras ? [{ id: "co-branding", label: "Co-branding" }] : []),
    ...(book.voice ? [{ id: "voice", label: "Voice" }] : []),
  ];

  return (
    <div id="brandbook-print" className="mx-auto max-w-[1400px] px-6 lg:px-10 py-10">
      {/* Breadcrumb */}
      <Link
        href="/brand-book"
        className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[color:var(--text-tertiary)] hover:text-[color:var(--coded-navy)]"
      >
        <Icon name="chevron-right" size={12} className="rotate-180" /> Brand book
      </Link>

      {/* Hero */}
      <header
        className="relative mt-4 overflow-hidden rounded-3xl border border-[color:var(--border-soft)] shadow-[var(--shadow-soft)] text-white"
        style={{
          background: `linear-gradient(135deg, ${primary} 0%, ${palette.colors[1]?.hex ?? primary} 100%)`,
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(1100px_500px_at_110%_-10%,rgba(255,255,255,0.20),transparent_60%)]" />
        <div className="relative p-8 lg:p-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8 items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/70">
              <span className="font-mono">[</span>{" "}
              {product.kind === "master"
                ? "Master brand"
                : product.kind === "youth"
                ? "Youth"
                : "Program"}{" "}
              <span className="font-mono">]</span>
            </div>
            <h1 className="mt-3 text-[42px] lg:text-[56px] font-semibold tracking-tight leading-[1.02]">
              {product.name}
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] lg:text-[16px] text-white/85 leading-relaxed">
              {book.identity.intro}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <DownloadBrandBookButton label="Download PDF" />
              <span className="text-[11.5px] text-white/55 print:hidden">
                Saves the full {product.shortName ?? product.name} brand book.
              </span>
            </div>
          </div>
          <div className="rounded-2xl bg-black/25 backdrop-blur p-5 ring-1 ring-white/15">
            <Meta label="Status" value={product.status === "active" ? "Active" : "Draft"} />
            <Meta label="Kind" value={palette.kind} />
            <Meta label="Palette" value={palette.label} />
            <Meta label="Colors" value={`${palette.colors.length} swatches`} />
            <Meta label="Typeface" value="Neufile Grotesk" last />
          </div>
        </div>
      </header>

      {/* Sticky in-page nav */}
      <nav className="sticky top-[60px] z-20 -mx-2 mt-6 mb-10 overflow-x-auto print:hidden">
        <div className="inline-flex gap-1 rounded-full border border-[color:var(--border-soft)] bg-white/90 backdrop-blur p-1 shadow-[var(--shadow-soft)]">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="rounded-full px-3 py-1.5 text-[12.5px] font-medium text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--coded-navy)]"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Identity */}
      <Section id="identity" eyebrow="01" title="Identity">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <Card span={2}>
            <SubHeader>Mission</SubHeader>
            <p className="text-[14.5px] text-[color:var(--text-secondary)] leading-relaxed">
              {book.identity.mission}
            </p>
          </Card>
          <Card>
            <SubHeader>Audience</SubHeader>
            <p className="text-[14px] text-[color:var(--text-secondary)] leading-relaxed">
              {book.identity.audience}
            </p>
          </Card>
          <Card span={3}>
            <SubHeader>Personality</SubHeader>
            <div className="flex flex-wrap gap-2">
              {book.identity.personality.map((p) => (
                <span
                  key={p}
                  className="rounded-full px-3 py-1.5 text-[12.5px] font-medium text-white"
                  style={{ background: primary }}
                >
                  {p}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </Section>

      {/* Strategy — vision, positioning, brandfeel */}
      {extras && (
        <Section id="strategy" eyebrow="02" title="Strategy">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <SubHeader>Vision</SubHeader>
              <p className="text-[14.5px] text-[color:var(--text-secondary)] leading-relaxed">
                {extras.vision}
              </p>
            </Card>
            <Card>
              <SubHeader>Brand positioning</SubHeader>
              <p className="text-[14.5px] text-[color:var(--text-secondary)] leading-relaxed">
                {extras.positioning}
              </p>
            </Card>
          </div>
          <div className="mt-5">
            <Card>
              <SubHeader>Brandfeel — keywords</SubHeader>
              <div className="flex flex-wrap gap-2">
                {extras.keywords.map((k) => (
                  <span
                    key={k}
                    className="rounded-full border px-3 py-1.5 text-[13px] font-medium"
                    style={{ borderColor: primary, color: primary }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </Section>
      )}

      {/* Color */}
      <Section id="color" eyebrow="03" title="Color">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {palette.colors.map((c) => (
            <div
              key={c.hex}
              className="overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-white shadow-[var(--shadow-soft)]"
            >
              <div className="relative h-28" style={{ background: c.hex }}>
                <div className="absolute top-3 left-3 rounded-md bg-black/15 backdrop-blur px-2 py-0.5 font-mono text-[10.5px] text-white">
                  {c.role}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-[15px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
                    {c.name}
                  </div>
                  <span className="rounded-md bg-[color:var(--surface-2)] px-2 py-0.5 font-mono text-[11px] text-[color:var(--coded-navy)]">
                    {c.hex.toUpperCase()}
                  </span>
                </div>
                <div className="mt-1 text-[11.5px] text-[color:var(--text-tertiary)] font-mono">
                  rgb({c.rgb})
                </div>
                <p className="mt-2 text-[12.5px] text-[color:var(--text-secondary)] leading-snug">
                  {c.usage}
                </p>
              </div>
            </div>
          ))}
        </div>

        {palette.gradients && palette.gradients.length > 0 && (
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {palette.gradients.map((g) => (
              <div
                key={g.name}
                className="overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-white shadow-[var(--shadow-soft)]"
              >
                <div
                  className="h-28"
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
      </Section>

      {/* Typography */}
      <Section id="typography" eyebrow="04" title="Typography">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-5">
          <Card>
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-tertiary)] mb-1">
              Primary
            </div>
            <div
              className="text-[44px] lg:text-[56px] font-semibold tracking-tight leading-none"
              style={{ color: primary }}
            >
              Aa Bb Cc
            </div>
            <div className="mt-2 text-[18px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
              {book.typography.primary.family}
            </div>
            <div className="mt-1 text-[12.5px] text-[color:var(--text-tertiary)]">
              {book.typography.primary.weights}
            </div>
            <p className="mt-3 text-[13px] text-[color:var(--text-secondary)] leading-snug">
              {book.typography.primary.usage}
            </p>
          </Card>
          {book.typography.secondary && (
            <Card>
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-tertiary)] mb-1">
                Secondary
              </div>
              <div
                className="text-[40px] font-semibold tracking-tight leading-none"
                style={{ color: primary, fontFamily: 'var(--font-arabic), sans-serif' }}
              >
                أب ج د
              </div>
              <div className="mt-2 text-[16px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
                {book.typography.secondary.family}
              </div>
              <div className="mt-1 text-[12.5px] text-[color:var(--text-tertiary)]">
                {book.typography.secondary.weights}
              </div>
              <p className="mt-3 text-[13px] text-[color:var(--text-secondary)] leading-snug">
                {book.typography.secondary.usage}
              </p>
            </Card>
          )}
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-white shadow-[var(--shadow-soft)]">
          <table className="w-full text-left">
            <thead className="bg-[color:var(--surface-2)]">
              <tr className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-tertiary)]">
                <th className="px-4 py-3">Scale</th>
                <th className="px-4 py-3">Size / Display</th>
                <th className="px-4 py-3">Line height</th>
                <th className="px-4 py-3">Usage</th>
              </tr>
            </thead>
            <tbody>
              {book.typography.scale.map((row, i) => (
                <tr
                  key={row.name}
                  className={i % 2 === 0 ? "" : "bg-[color:var(--surface-2)]/40"}
                >
                  <td className="px-4 py-3 text-[14px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
                    {row.name}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12.5px] text-[color:var(--text-secondary)]">
                    {row.size}
                  </td>
                  <td className="px-4 py-3 font-mono text-[12.5px] text-[color:var(--text-secondary)]">
                    {row.lineHeight}
                  </td>
                  <td className="px-4 py-3 text-[12.5px] text-[color:var(--text-secondary)]">
                    {row.usage}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Logo */}
      <Section id="logo" eyebrow="05" title="Logo & lockups">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-5">
          <Card>
            <SubHeader>Primary mark</SubHeader>
            <p className="text-[13.5px] text-[color:var(--text-secondary)] leading-relaxed">
              {book.logo.primaryMark}
            </p>
            <div
              className="mt-4 grid place-items-center h-36 rounded-xl ring-1 ring-inset ring-black/5"
              style={{ background: primary }}
            >
              <div className="text-center text-white">
                <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] opacity-70">
                  Lockup preview
                </div>
                <div className="mt-1 text-[28px] font-semibold tracking-tight">
                  {product.shortName ?? product.name}
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <SubHeader>Variants</SubHeader>
            <ul className="space-y-2.5">
              {book.logo.variants.map((v) => (
                <li
                  key={v.name}
                  className="rounded-lg border border-[color:var(--border-soft)] bg-[color:var(--surface-2)]/40 p-3"
                >
                  <div className="text-[13px] font-semibold text-[color:var(--coded-navy)]">
                    {v.name}
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-[color:var(--text-secondary)] leading-snug">
                    {v.usage}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <SubHeader>Clear space</SubHeader>
            <p className="text-[13.5px] text-[color:var(--text-secondary)] leading-relaxed">
              {book.logo.clearSpace}
            </p>
          </Card>
          <Card>
            <SubHeader>Minimum size</SubHeader>
            <p className="text-[13.5px] text-[color:var(--text-secondary)] leading-relaxed">
              {book.logo.minSize}
            </p>
          </Card>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-white shadow-[var(--shadow-soft)]">
          <div className="px-5 pt-4 pb-3 border-b border-[color:var(--border-soft)]">
            <SubHeader>Backgrounds</SubHeader>
          </div>
          <table className="w-full text-left">
            <thead className="bg-[color:var(--surface-2)]">
              <tr className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-tertiary)]">
                <th className="px-5 py-2.5">Surface</th>
                <th className="px-5 py-2.5">Allowed</th>
                <th className="px-5 py-2.5">Note</th>
              </tr>
            </thead>
            <tbody>
              {book.logo.background.map((b, i) => (
                <tr
                  key={b.surface}
                  className={i % 2 === 0 ? "" : "bg-[color:var(--surface-2)]/40"}
                >
                  <td className="px-5 py-3 text-[13px] font-semibold text-[color:var(--coded-navy)]">
                    {b.surface}
                  </td>
                  <td className="px-5 py-3 text-[12.5px]">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11.5px] font-medium ${
                        b.allowed
                          ? "bg-[color:var(--ai-light-sea-green)]/15 text-[color:var(--ai-stormy-teal,#026678)]"
                          : "bg-[color:var(--juniors-red)]/12 text-[color:var(--juniors-red)]"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          b.allowed
                            ? "bg-[color:var(--ai-light-sea-green)]"
                            : "bg-[color:var(--juniors-red)]"
                        }`}
                      />
                      {b.allowed ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-[12.5px] text-[color:var(--text-secondary)]">
                    {b.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* Imagery */}
      {extras && (
        <Section id="imagery" eyebrow="06" title="Imagery">
          <Card>
            <SubHeader>Photography style</SubHeader>
            <p className="text-[14px] text-[color:var(--text-secondary)] leading-relaxed">
              {extras.imagery.style}
            </p>
          </Card>
          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-[color:var(--ai-light-sea-green)]/15 text-[color:var(--ai-stormy-teal,#026678)] text-[12px] font-bold">
                  ✓
                </span>
                <SubHeader>Do</SubHeader>
              </div>
              <ul className="space-y-2.5">
                {extras.imagery.dos.map((d) => (
                  <li
                    key={d}
                    className="flex gap-2.5 text-[13.5px] text-[color:var(--text-secondary)] leading-relaxed"
                  >
                    <span className="mt-2 h-1 w-1 rounded-full bg-[color:var(--ai-light-sea-green)] flex-none" />
                    {d}
                  </li>
                ))}
              </ul>
            </Card>
            <Card>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-[color:var(--juniors-red)]/12 text-[color:var(--juniors-red)] text-[14px] font-bold">
                  ×
                </span>
                <SubHeader>Don&apos;t</SubHeader>
              </div>
              <ul className="space-y-2.5">
                {extras.imagery.donts.map((d) => (
                  <li
                    key={d}
                    className="flex gap-2.5 text-[13.5px] text-[color:var(--text-secondary)] leading-relaxed"
                  >
                    <span className="mt-2 h-1 w-1 rounded-full bg-[color:var(--juniors-red)] flex-none" />
                    {d}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>
      )}

      {/* Iconography & graphic elements */}
      {extras && (
        <Section id="iconography" eyebrow="07" title="Iconography & graphic elements">
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-5">
            <Card>
              <SubHeader>Icon style</SubHeader>
              <p className="text-[14px] text-[color:var(--text-secondary)] leading-relaxed">
                {extras.iconography.style}
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {(["grid", "command", "sparkles", "search", "layout", "image"] as const).map(
                  (ic) => (
                    <div
                      key={ic}
                      className="grid place-items-center h-12 w-12 rounded-xl border border-[color:var(--border-soft)] bg-[color:var(--surface-2)]/50"
                      style={{ color: primary }}
                    >
                      <Icon name={ic} size={20} />
                    </div>
                  )
                )}
              </div>
            </Card>
            <Card>
              <SubHeader>Motifs</SubHeader>
              <ul className="space-y-2.5">
                {extras.iconography.motifs.map((m) => (
                  <li
                    key={m}
                    className="flex gap-2.5 text-[13.5px] text-[color:var(--text-secondary)] leading-relaxed"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full flex-none"
                      style={{ background: primary }}
                    />
                    {m}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Section>
      )}

      {/* Layout & grid */}
      {extras && (
        <Section id="layout" eyebrow="08" title="Layout & grid">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <SubHeader>Grid</SubHeader>
              <p className="text-[14px] text-[color:var(--text-secondary)] leading-relaxed">
                {extras.layout.grid}
              </p>
            </Card>
            <Card>
              <SubHeader>Spacing</SubHeader>
              <p className="text-[14px] text-[color:var(--text-secondary)] leading-relaxed">
                {extras.layout.spacing}
              </p>
            </Card>
          </div>
          <div className="mt-5">
            <Card>
              <SubHeader>Layout principles</SubHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
                {extras.layout.principles.map((p, i) => (
                  <div
                    key={p}
                    className="flex gap-3 text-[13.5px] text-[color:var(--text-secondary)] leading-relaxed"
                  >
                    <span
                      className="font-mono text-[11px] mt-0.5"
                      style={{ color: primary }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </Section>
      )}

      {/* Usage */}
      <Section id="usage" eyebrow="09" title="Usage">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-[color:var(--ai-light-sea-green)]/15 text-[color:var(--ai-stormy-teal,#026678)] text-[12px] font-bold">
                ✓
              </span>
              <SubHeader>Do</SubHeader>
            </div>
            <ul className="space-y-2.5">
              {book.usage.dos.map((d) => (
                <li
                  key={d}
                  className="flex gap-2.5 text-[13.5px] text-[color:var(--text-secondary)] leading-relaxed"
                >
                  <span className="mt-2 h-1 w-1 rounded-full bg-[color:var(--ai-light-sea-green)] flex-none" />
                  {d}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-grid place-items-center h-6 w-6 rounded-full bg-[color:var(--juniors-red)]/12 text-[color:var(--juniors-red)] text-[14px] font-bold">
                ×
              </span>
              <SubHeader>Don&apos;t</SubHeader>
            </div>
            <ul className="space-y-2.5">
              {book.usage.donts.map((d) => (
                <li
                  key={d}
                  className="flex gap-2.5 text-[13.5px] text-[color:var(--text-secondary)] leading-relaxed"
                >
                  <span className="mt-2 h-1 w-1 rounded-full bg-[color:var(--juniors-red)] flex-none" />
                  {d}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* Applications */}
      <Section id="applications" eyebrow="10" title="Applications">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {book.applications.map((a) => {
            const bg =
              a.surface === "dark"
                ? primary
                : a.surface === "accent"
                ? palette.colors[1]?.hex ?? primary
                : "#FFFFFF";
            const fg = a.surface === "light" ? "var(--coded-navy)" : "white";
            return (
              <div
                key={a.title}
                className="overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-white shadow-[var(--shadow-soft)]"
              >
                <div
                  className="relative h-44 grid place-items-center"
                  style={{ background: bg, color: fg }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(255,255,255,0.18),transparent_60%)]" />
                  <div className="relative text-center px-6">
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] opacity-60">
                      {a.surface}
                    </div>
                    <div className="mt-1 text-[18px] font-semibold tracking-tight">
                      {product.shortName ?? product.name}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-[14px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
                    {a.title}
                  </div>
                  <p className="mt-1 text-[12.5px] text-[color:var(--text-secondary)] leading-snug">
                    {a.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Co-branding */}
      {extras && (
        <Section id="co-branding" eyebrow="11" title="Co-branding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <Card>
              <SubHeader>Lockup rule</SubHeader>
              <p className="text-[14px] text-[color:var(--text-secondary)] leading-relaxed">
                {extras.coBranding.rule}
              </p>
              {/* Visual: CODED + partner lockup */}
              <div className="mt-4 flex items-center justify-center gap-5 rounded-xl border border-[color:var(--border-soft)] bg-[color:var(--surface-2)]/50 px-6 py-7">
                <div className="text-[18px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
                  CODED
                </div>
                <div className="h-8 w-px bg-[color:var(--border-hard)]" />
                <div
                  className="text-[18px] font-semibold tracking-tight"
                  style={{ color: primary }}
                >
                  {product.shortName ?? product.name}
                </div>
              </div>
            </Card>
            <Card>
              <SubHeader>Clear space &amp; notes</SubHeader>
              <p className="text-[13.5px] text-[color:var(--text-secondary)] leading-relaxed">
                {extras.coBranding.clearSpace}
              </p>
              <ul className="mt-3 space-y-2.5">
                {extras.coBranding.notes.map((n) => (
                  <li
                    key={n}
                    className="flex gap-2.5 text-[13px] text-[color:var(--text-secondary)] leading-relaxed"
                  >
                    <span
                      className="mt-2 h-1 w-1 rounded-full flex-none"
                      style={{ background: primary }}
                    />
                    {n}
                  </li>
                ))}
              </ul>
              <Link
                href="/sponsors"
                className="mt-4 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-strong)] print:hidden"
              >
                Open Sponsors module <Icon name="arrow-right" size={13} />
              </Link>
            </Card>
          </div>
        </Section>
      )}

      {/* Voice */}
      {book.voice && (
        <Section id="voice" eyebrow="12" title="Voice">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {book.voice.map((v) => (
              <Card key={v.word}>
                <div
                  className="text-[24px] font-semibold tracking-tight"
                  style={{ color: primary }}
                >
                  {v.word}
                </div>
                <p className="mt-2 text-[13.5px] text-[color:var(--text-secondary)] leading-relaxed">
                  {v.meaning}
                </p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Footer nav */}
      <div className="mt-16 mb-2 flex items-center justify-between text-[12.5px] text-[color:var(--text-tertiary)]">
        <Link
          href="/brand-book"
          className="inline-flex items-center gap-1.5 hover:text-[color:var(--coded-navy)]"
        >
          <Icon name="chevron-right" size={12} className="rotate-180" /> All brand books
        </Link>
        <span className="font-mono">{product.id}</span>
      </div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 mb-14">
      <div className="flex items-baseline gap-3 mb-5">
        <span className="font-mono text-[11px] text-[color:var(--text-tertiary)]">
          {eyebrow}
        </span>
        <h2 className="text-[22px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Card({
  children,
  span,
}: {
  children: React.ReactNode;
  span?: number;
}) {
  const spanClass =
    span === 2
      ? "lg:col-span-2"
      : span === 3
      ? "lg:col-span-3"
      : "";
  return (
    <div
      className={`rounded-2xl border border-[color:var(--border-soft)] bg-white p-5 shadow-[var(--shadow-soft)] ${spanClass}`}
    >
      {children}
    </div>
  );
}

function SubHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-[color:var(--text-tertiary)] mb-2">
      {children}
    </div>
  );
}

function Meta({
  label,
  value,
  last,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between py-1.5 text-[13px] ${
        last ? "" : "border-b border-white/10"
      }`}
    >
      <span className="text-white/60 capitalize">{label}</span>
      <span className="text-white/95 font-medium capitalize">{value}</span>
    </div>
  );
}
