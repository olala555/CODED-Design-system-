"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./Icon";
import { sidebarNav } from "@/lib/products";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[252px] shrink-0 flex-col gap-1 px-4 py-6 border-r border-[color:var(--border-soft)] bg-white/80 backdrop-blur-md shadow-[1px_0_0_rgba(20,36,63,0.02),4px_0_24px_-12px_rgba(20,36,63,0.08)] print:hidden">
      {/* Brand mark */}
      <Link href="/" className="flex items-center gap-2.5 px-2 mb-8 group">
        <div className="relative grid place-items-center h-9 w-9 rounded-xl bg-[color:var(--coded-navy)] text-white font-semibold text-sm shadow-[0_4px_14px_-4px_rgba(20,36,63,0.4)] group-hover:shadow-[0_6px_20px_-4px_rgba(20,36,63,0.55)] transition-all duration-300 group-hover:scale-[1.04]">
          C
          <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="leading-tight">
          <div className="text-[13px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
            CODED Studio
          </div>
          <div className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
            Design System
          </div>
        </div>
      </Link>

      <div className="text-[10.5px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)] px-2 mb-2">
        Workspace
      </div>

      <nav className="flex flex-col gap-0.5">
        {sidebarNav.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`group relative flex items-center gap-3 rounded-lg pl-3 pr-2.5 py-2 text-[13.5px] font-medium transition-all duration-200 active:scale-[0.985] ${
                active
                  ? "bg-[color:var(--accent-soft)] text-[color:var(--accent)] shadow-[0_1px_0_rgba(255,255,255,0.5)_inset,0_1px_2px_rgba(0,74,163,0.06)]"
                  : "text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--coded-navy)]"
              }`}
            >
              {/* Active indicator bar */}
              <span
                aria-hidden
                className={`absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full transition-all duration-300 ${
                  active
                    ? "bg-[color:var(--accent)] opacity-100"
                    : "bg-[color:var(--coded-navy)] opacity-0 group-hover:opacity-30 group-hover:top-2.5 group-hover:bottom-2.5"
                }`}
              />
              <Icon
                name={item.icon as IconName}
                size={17}
                className={`transition-transform duration-200 ${
                  active ? "" : "group-hover:scale-110"
                }`}
              />
              <span className="relative">{item.label}</span>

              {/* Hover chevron */}
              <Icon
                name="chevron-right"
                size={13}
                className={`ml-auto transition-all duration-200 ${
                  active
                    ? "opacity-60"
                    : "opacity-0 -translate-x-1 group-hover:opacity-40 group-hover:translate-x-0"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-[color:var(--border-soft)] bg-white p-4 shadow-[0_1px_2px_rgba(20,36,63,0.04),0_8px_24px_-12px_rgba(20,36,63,0.12)]">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">
          <Icon name="sparkles" size={12} />
          AI Assistant
        </div>
        <div className="mt-1.5 text-[12.5px] text-[color:var(--text-secondary)] leading-snug">
          Ask anything about the CODED brand system.
        </div>
        <Link
          href="/assistant"
          className="group mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
        >
          Open assistant
          <Icon
            name="arrow-right"
            size={14}
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </aside>
  );
}
