"use client";

import { brand } from "@/lib/brand";
import { primaryColor } from "@/lib/brand";

export function PaletteSwitcher({
  value,
  onChange,
}: {
  value: string;
  onChange: (id: string) => void;
}) {
  const entries = Object.entries(brand.palettes);
  return (
    <div className="grid grid-cols-1 gap-1.5">
      {entries.map(([id, palette]) => {
        const active = id === value;
        const primary = primaryColor(id);
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left transition-all ${
              active
                ? "bg-[color:var(--accent-soft)] ring-1 ring-inset ring-[color:var(--accent)]/30"
                : "hover:bg-[color:var(--surface-2)]"
            }`}
          >
            <span
              className="h-5 w-5 rounded-md ring-1 ring-inset ring-black/5 shrink-0"
              style={{ background: primary }}
            />
            <span className="min-w-0 flex-1">
              <span
                className={`block truncate text-[12.5px] ${
                  active
                    ? "text-[color:var(--accent)] font-semibold"
                    : "text-[color:var(--coded-navy)] font-medium"
                }`}
              >
                {palette.label}
              </span>
              <span className="block truncate text-[10.5px] font-mono text-[color:var(--text-tertiary)]">
                {primary.toUpperCase()} · {palette.colors.length} colors
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
