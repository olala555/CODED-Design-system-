"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./Icon";
import { sidebarNav } from "@/lib/products";

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-[252px] shrink-0 flex-col gap-1 px-5 py-6 border-r border-[color:var(--border-soft)] bg-[color:var(--surface-1)]/70 glass">
      {/* Brand mark */}
      <Link href="/" className="flex items-center gap-2.5 px-2 mb-8 group">
        <div className="grid place-items-center h-8 w-8 rounded-lg bg-[color:var(--coded-navy)] text-white font-semibold text-sm">
          C
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
              className={`flex items-center gap-3 rounded-lg px-2.5 py-2 text-[13.5px] font-medium transition-all ${
                active
                  ? "bg-[color:var(--accent-soft)] text-[color:var(--accent)] shadow-[inset_0_0_0_1px_rgba(0,74,163,0.10)]"
                  : "text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-2)] hover:text-[color:var(--coded-navy)]"
              }`}
            >
              <Icon name={item.icon as IconName} size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-[color:var(--border-soft)] bg-white p-4 shadow-[var(--shadow-soft)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[color:var(--accent)]">
          AI Assistant
        </div>
        <div className="mt-1 text-[12.5px] text-[color:var(--text-secondary)] leading-snug">
          Ask anything about the CODED brand system.
        </div>
        <Link
          href="/assistant"
          className="mt-3 inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
        >
          Open assistant <Icon name="arrow-right" size={14} />
        </Link>
      </div>
    </aside>
  );
}
