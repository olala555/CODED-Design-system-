import Link from "next/link";
import { Icon, type IconName } from "./Icon";

export type FeatureCardProps = {
  href: string;
  title: string;
  description: string;
  icon: IconName;
  /** CSS color used for the accent ring / glow on hover */
  accent: string;
  /** Optional badge shown top-right (e.g. "New", "AI") */
  badge?: string;
  /** Animation delay in ms for stagger-in */
  delay?: number;
};

export function FeatureCard({
  href,
  title,
  description,
  icon,
  accent,
  badge,
  delay = 0,
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="coded-fade-up group relative flex flex-col items-center text-center rounded-2xl border border-[color:var(--border-soft)] bg-white p-7 shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
      style={
        {
          animationDelay: `${delay}ms`,
          "--card-accent": accent,
        } as React.CSSProperties
      }
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(420px 200px at 50% -20%, color-mix(in srgb, var(--card-accent) 14%, transparent), transparent 60%)`,
        }}
      />

      {badge && (
        <span
          className="absolute top-3 right-3 inline-flex items-center rounded-full bg-[color:var(--card-accent)]/10 px-2 py-0.5 text-[9.5px] font-semibold uppercase tracking-wider"
          style={{ color: accent }}
        >
          {badge}
        </span>
      )}

      {/* Icon disc */}
      <div className="relative mt-3 mb-5">
        {/* outer ring */}
        <div
          className="absolute inset-0 rounded-full border opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          style={{ borderColor: `color-mix(in srgb, ${accent} 35%, transparent)` }}
        />
        <div
          className="grid place-items-center h-14 w-14 rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] text-[color:var(--coded-navy)] group-hover:bg-white group-hover:shadow-[0_6px_24px_-6px_var(--card-accent)] transition-all duration-300"
          style={
            {
              ["--hover-color" as string]: accent,
            } as React.CSSProperties
          }
        >
          <Icon
            name={icon}
            size={22}
            className="transition-colors duration-300 group-hover:text-[color:var(--card-accent)]"
          />
        </div>
      </div>

      {/* Title centered */}
      <h3 className="relative text-[17px] font-semibold tracking-tight text-[color:var(--coded-navy)] group-hover:text-[color:var(--card-accent)] transition-colors duration-300">
        {title}
      </h3>

      {/* Description */}
      <p className="relative mt-2 text-[13px] leading-relaxed text-[color:var(--text-secondary)] max-w-[24ch]">
        {description}
      </p>

      {/* CTA hint */}
      <div className="relative mt-5 inline-flex items-center gap-1 text-[12px] font-medium text-[color:var(--text-tertiary)] group-hover:text-[color:var(--card-accent)] transition-colors duration-300">
        Open
        <Icon
          name="arrow-right"
          size={12}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>

      {/* Bottom accent bar */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[3px] w-0 group-hover:w-full transition-all duration-500 rounded-t-full"
        style={{ background: accent }}
      />
    </Link>
  );
}
