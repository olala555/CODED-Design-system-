"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { BrandBackdrop } from "./BrandBackdrop";
import { brand } from "@/lib/brand";

const PROGRAMS = [
  "AI App Developer",
  "Data Science",
  "Cybersecurity",
  "CODED Juniors",
  "Full Stack",
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const [programIdx, setProgramIdx] = useState(0);

  // Cycle the program tagline word
  useEffect(() => {
    const id = setInterval(() => {
      setProgramIdx((i) => (i + 1) % PROGRAMS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  // Mouse-follow halo for interactivity
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width) * 100;
        const y = ((e.clientY - r.top) / r.height) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
      });
    };
    const onLeave = () => {
      el.style.setProperty("--mx", "50%");
      el.style.setProperty("--my", "50%");
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden rounded-[28px] border border-[color:var(--border-soft)] bg-white shadow-[var(--shadow-soft)]"
    >
      <BrandBackdrop />

      <div className="relative px-6 lg:px-12 py-16 lg:py-24 text-center">
        {/* Status pill */}
        <div className="coded-fade-up flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-white/90 backdrop-blur px-3.5 py-1.5 text-[11.5px] font-medium text-[color:var(--coded-navy)] shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[color:var(--ai-light-sea-green)] opacity-60 animate-ping" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--ai-light-sea-green)]" />
            </span>
            Brand system online — synced {brand.lastUpdated}
          </span>
        </div>

        {/* Eyebrow */}
        <div
          className="coded-fade-up text-[11px] lg:text-[12px] font-semibold uppercase tracking-[0.32em] text-[color:var(--coded-navy)]/70 mb-6"
          style={{ animationDelay: "60ms" }}
        >
          CODED Studio · Design System
        </div>

        {/* Headline — solid navy CODED, no gradient */}
        <h1
          className="coded-fade-up mx-auto max-w-4xl text-[40px] sm:text-[52px] lg:text-[68px] font-semibold tracking-[-0.02em] text-[color:var(--coded-navy)] leading-[1.02]"
          style={{ animationDelay: "120ms" }}
        >
          One source of truth
          <br />
          for every{" "}
          <span className="font-bold">CODED</span>{" "}
          brand.
        </h1>

        {/* Animated program ticker */}
        <div
          className="coded-fade-up mt-6 flex items-center justify-center gap-2 text-[13px] text-[color:var(--text-secondary)]"
          style={{ animationDelay: "180ms" }}
        >
          <span>Powering</span>
          <span
            key={programIdx}
            className="inline-flex items-center rounded-full border border-[color:var(--border-soft)] bg-white px-3 py-1 text-[12.5px] font-semibold text-[color:var(--coded-navy)] shadow-sm coded-ticker-slide"
            aria-live="polite"
          >
            {PROGRAMS[programIdx]}
          </span>
        </div>

        {/* Subtitle */}
        <p
          className="coded-fade-up mt-6 mx-auto max-w-2xl text-[15.5px] lg:text-[17px] text-[color:var(--text-secondary)] leading-relaxed"
          style={{ animationDelay: "220ms" }}
        >
          Brand books, assets, dynamic templates, and an AI brand assistant —
          built for every product, every team, every output.
        </p>

        {/* CTAs */}
        <div
          className="coded-fade-up mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ animationDelay: "280ms" }}
        >
          <Link
            href="/assistant"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-[color:var(--coded-navy)] px-5 py-3 text-[13.5px] font-medium text-white shadow-[0_4px_20px_-4px_rgba(20,36,63,0.45)] hover:shadow-[0_8px_28px_-4px_rgba(20,36,63,0.55)] hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0 active:shadow-[0_2px_10px_-2px_rgba(20,36,63,0.4)]"
          >
            <Icon name="sparkles" size={15} />
            Ask the AI assistant
            <Icon
              name="arrow-right"
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/brand-book"
            className="group inline-flex items-center gap-2 rounded-xl border border-[color:var(--border-soft)] bg-white/90 backdrop-blur px-5 py-3 text-[13.5px] font-medium text-[color:var(--coded-navy)] hover:bg-white hover:border-[color:var(--coded-navy)]/30 hover:shadow-[var(--shadow-soft)] hover:-translate-y-0.5 transition-all duration-300 active:translate-y-0"
          >
            <Icon name="book" size={15} />
            Open brand book
            <Icon
              name="arrow-right"
              size={14}
              className="opacity-0 -ml-3 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0"
            />
          </Link>
        </div>

        {/* Quick stats strip */}
        <div
          className="coded-fade-up mt-12 grid grid-cols-3 max-w-xl mx-auto gap-1 rounded-2xl border border-[color:var(--border-soft)] bg-white/80 backdrop-blur p-2"
          style={{ animationDelay: "340ms" }}
        >
          {[
            { label: "Programs", value: "5" },
            { label: "Palettes", value: String(Object.keys(brand.palettes).length) },
            {
              label: "Brand colors",
              value: String(
                Object.values(brand.palettes).reduce(
                  (sum, p) => sum + p.colors.length,
                  0
                )
              ),
            },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-3 ${i < 2 ? "border-r border-[color:var(--border-soft)]" : ""}`}
            >
              <div className="text-[22px] font-semibold tracking-tight text-[color:var(--coded-navy)] tabular-nums">
                {s.value}
              </div>
              <div className="text-[10.5px] uppercase tracking-[0.14em] font-medium text-[color:var(--text-tertiary)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
