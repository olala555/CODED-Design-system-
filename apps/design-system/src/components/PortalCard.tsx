"use client";

import Link from "next/link";
import { useRef } from "react";
import { Icon, type IconName } from "./Icon";

export type PortalCardProps = {
  href: string;
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: IconName;
  features: string[];
  /** gradient stops for the card's identity */
  from: string;
  to: string;
  status: "live" | "soon";
  delay?: number;
  external?: boolean;
};

export function PortalCard({
  href,
  index,
  eyebrow,
  title,
  description,
  icon,
  features,
  from,
  to,
  status,
  delay = 0,
  external,
}: PortalCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const frame = useRef(0);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width; // 0..1
      const py = (e.clientY - r.top) / r.height; // 0..1
      const rotX = (py - 0.5) * -8; // tilt up/down
      const rotY = (px - 0.5) * 10; // tilt left/right
      el.style.setProperty("--rx", `${rotX}deg`);
      el.style.setProperty("--ry", `${rotY}deg`);
      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    });
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  const isDisabled = status === "soon";

  const inner = (
    <>
      {/* Colorful gradient aura that intensifies on hover */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[26px] opacity-60 blur-[18px] transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      />

      {/* Card body */}
      <div className="relative h-full rounded-[24px] border border-[color:var(--border-soft)] bg-white p-7 overflow-hidden flex flex-col">
        {/* Cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(340px 340px at var(--mx,50%) var(--my,50%), color-mix(in srgb, ${from} 16%, transparent), transparent 65%)`,
          }}
        />

        {/* Top: index + status */}
        <div className="relative flex items-center justify-between">
          <span
            className="font-mono text-[13px] font-semibold"
            style={{ color: from }}
          >
            {index}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${
              status === "live"
                ? "text-[color:var(--coded-navy)]"
                : "text-[color:var(--text-tertiary)]"
            }`}
            style={
              status === "live"
                ? { background: `color-mix(in srgb, ${from} 14%, transparent)` }
                : { background: "var(--surface-2)" }
            }
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: status === "live" ? from : "var(--text-tertiary)",
              }}
            />
            {status === "live" ? "Live" : "Coming soon"}
          </span>
        </div>

        {/* Icon medallion */}
        <div
          className="relative mt-7 grid h-16 w-16 place-items-center rounded-2xl text-white shadow-lg transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
          style={{
            background: `linear-gradient(135deg, ${from}, ${to})`,
            boxShadow: `0 12px 30px -8px ${from}`,
          }}
        >
          <Icon name={icon} size={28} />
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/30 to-transparent opacity-70" />
        </div>

        {/* Eyebrow + title */}
        <div className="relative mt-6">
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: from }}
          >
            {eyebrow}
          </div>
          <h3 className="mt-1.5 text-[24px] font-semibold tracking-tight text-[color:var(--coded-navy)] leading-tight">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="relative mt-2.5 text-[13.5px] leading-relaxed text-[color:var(--text-secondary)]">
          {description}
        </p>

        {/* Feature chips */}
        <div className="relative mt-5 flex flex-wrap gap-1.5">
          {features.map((f) => (
            <span
              key={f}
              className="rounded-full border border-[color:var(--border-soft)] bg-[color:var(--surface-2)]/60 px-2.5 py-1 text-[11px] font-medium text-[color:var(--text-secondary)]"
            >
              {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="relative mt-auto pt-7">
          <div
            className="inline-flex items-center gap-2 text-[13.5px] font-semibold transition-all duration-300"
            style={{ color: isDisabled ? "var(--text-tertiary)" : from }}
          >
            {isDisabled ? "In progress" : "Enter"}
            {!isDisabled && (
              <span className="grid h-7 w-7 place-items-center rounded-full text-white transition-transform duration-300 group-hover:translate-x-1"
                style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
              >
                <Icon name="arrow-right" size={14} />
              </span>
            )}
          </div>
        </div>

        {/* Bottom gradient bar */}
        <div
          className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
          style={{ background: `linear-gradient(90deg, ${from}, ${to})` }}
        />
      </div>
    </>
  );

  const className =
    "coded-fade-up portal-card group relative block h-full [transform-style:preserve-3d] transition-transform duration-200 ease-out will-change-transform hover:-translate-y-1";
  const style = {
    animationDelay: `${delay}ms`,
    transform:
      "perspective(1000px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
  } as React.CSSProperties;

  if (isDisabled) {
    return (
      <div
        ref={ref as unknown as React.RefObject<HTMLDivElement>}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`${className} cursor-default`}
        style={style}
        aria-disabled
      >
        {inner}
      </div>
    );
  }

  return (
    <Link
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={style}
    >
      {inner}
    </Link>
  );
}
