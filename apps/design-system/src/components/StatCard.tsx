export function StatCard({
  label,
  value,
  delta,
  hint,
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
}) {
  return (
    <div className="rounded-2xl border border-[color:var(--border-soft)] bg-white p-5 shadow-[var(--shadow-soft)]">
      <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
        {label}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <div className="text-3xl font-semibold tracking-tight text-[color:var(--coded-navy)]">
          {value}
        </div>
        {delta && (
          <div className="text-[12px] font-medium text-[color:var(--ai-light-sea-green)]">
            {delta}
          </div>
        )}
      </div>
      {hint && (
        <div className="mt-1 text-[12px] text-[color:var(--text-tertiary)]">{hint}</div>
      )}
    </div>
  );
}
