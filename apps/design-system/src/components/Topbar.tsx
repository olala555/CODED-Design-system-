import { Icon } from "./Icon";

export function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-[color:var(--border-soft)] bg-[color:var(--surface-1)]/80 backdrop-blur-md px-6 lg:px-10 print:hidden">
      <div className="flex items-center gap-2 text-[12.5px] text-[color:var(--text-tertiary)]">
        <span>CODED Studio</span>
        <Icon name="chevron-right" size={12} />
        <span className="text-[color:var(--text-primary)] font-medium">Dashboard</span>
      </div>

      <div className="ml-auto flex items-center gap-3 max-w-md w-full">
        <label className="flex items-center gap-2.5 flex-1 h-10 rounded-lg border border-[color:var(--border-soft)] bg-[color:var(--surface-2)]/70 px-3 text-[13px] text-[color:var(--text-tertiary)] focus-within:border-[color:var(--accent)]/40 focus-within:bg-white transition-all">
          <Icon name="search" size={15} />
          <input
            placeholder="Search brand, assets, templates…"
            className="bg-transparent outline-none w-full placeholder:text-[color:var(--text-tertiary)] text-[color:var(--text-primary)]"
          />
          <span className="hidden sm:inline-flex items-center gap-1 rounded border border-[color:var(--border-soft)] bg-white px-1.5 py-0.5 font-mono text-[10.5px] text-[color:var(--text-tertiary)]">
            ⌘ K
          </span>
        </label>
      </div>

      <button className="grid place-items-center h-9 w-9 rounded-full bg-[color:var(--coded-navy)] text-white text-[12px] font-semibold">
        OA
      </button>
    </header>
  );
}
