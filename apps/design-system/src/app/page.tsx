import { PortalCard } from "@/components/PortalCard";
import { brand } from "@/lib/brand";

const SYSTEMS = [
  {
    href: "/dashboard",
    index: "01",
    eyebrow: "Brand & Design",
    title: "Design System",
    description:
      "Brand books, palettes, logos and assets, dynamic templates, and an AI brand assistant — one source of truth for every program.",
    icon: "layout" as const,
    features: ["Brand books", "Assets", "Templates", "AI assistant"],
    from: "#004AA3",
    to: "#00B9B4",
    status: "live" as const,
  },
  {
    href: "#",
    index: "02",
    eyebrow: "Studio",
    title: "Content Creation",
    description:
      "Plan, generate, and orchestrate on-brand content across channels — campaigns, socials, and program launches in one creative hub.",
    icon: "sparkles" as const,
    features: ["Campaigns", "Social kits", "Copy & visuals", "Scheduling"],
    from: "#7E31E0",
    to: "#DF18C5",
    status: "soon" as const,
  },
  {
    href: "#",
    index: "03",
    eyebrow: "Network",
    title: "Alumni Database",
    description:
      "Search, track, and engage the CODED alumni network — profiles, cohorts, outcomes, and relationships, fully connected.",
    icon: "grid" as const,
    features: ["Profiles", "Cohorts", "Outcomes", "Engagement"],
    from: "#F46036",
    to: "#FFCC49",
    status: "soon" as const,
  },
];

export default function PortalPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Background wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_600px_at_15%_-5%,rgba(0,74,163,0.08),transparent_55%),radial-gradient(900px_600px_at_85%_5%,rgba(126,49,224,0.06),transparent_55%),radial-gradient(900px_700px_at_50%_110%,rgba(0,185,180,0.07),transparent_55%),linear-gradient(180deg,#FFFFFF_0%,#F7F8FB_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.4] bg-[radial-gradient(circle,rgba(20,36,63,0.045)_1px,transparent_1px)] [background-size:26px_26px]"
      />

      <div className="relative mx-auto flex min-h-screen max-w-[1240px] flex-col px-6 py-12 lg:py-16">
        {/* Header */}
        <header className="text-center">
          <div className="coded-fade-up flex justify-center">
            <span className="inline-flex items-center gap-2.5 px-2">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-[color:var(--coded-navy)] text-white font-semibold shadow-[0_8px_24px_-8px_rgba(20,36,63,0.5)]">
                C
              </span>
              <span className="text-left leading-tight">
                <span className="block text-[15px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
                  CODED Studio
                </span>
                <span className="block text-[10.5px] font-medium uppercase tracking-[0.14em] text-[color:var(--text-tertiary)]">
                  Unified Ecosystem
                </span>
              </span>
            </span>
          </div>

          <h1
            className="coded-fade-up mx-auto mt-9 max-w-3xl text-[40px] sm:text-[52px] lg:text-[60px] font-semibold tracking-[-0.02em] text-[color:var(--coded-navy)] leading-[1.03]"
            style={{ animationDelay: "80ms" }}
          >
            One platform.
            <br />
            Three systems.
          </h1>

          <p
            className="coded-fade-up mx-auto mt-5 max-w-xl text-[15.5px] lg:text-[16.5px] text-[color:var(--text-secondary)] leading-relaxed"
            style={{ animationDelay: "140ms" }}
          >
            Everything the CODED team builds — design, content, and community —
            connected in one place. Choose where you&rsquo;re headed.
          </p>
        </header>

        {/* Cards */}
        <section className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-7">
          {SYSTEMS.map((s, i) => (
            <PortalCard key={s.title} {...s} delay={200 + i * 90} />
          ))}
        </section>

        {/* Footer */}
        <footer
          className="coded-fade-up mt-auto pt-14 flex flex-col items-center gap-2 text-center"
          style={{ animationDelay: "520ms" }}
        >
          <div className="flex items-center gap-2 text-[12px] text-[color:var(--text-tertiary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--ai-light-sea-green)]" />
            Systems synced {brand.lastUpdated}
          </div>
          <div className="text-[11.5px] text-[color:var(--text-tertiary)]">
            CODED Studio — Unified Ecosystem · capstone build
          </div>
        </footer>
      </div>
    </main>
  );
}
