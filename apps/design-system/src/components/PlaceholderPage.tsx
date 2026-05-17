import { Icon, type IconName } from "./Icon";

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  icon,
  next,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: IconName;
  next?: string[];
}) {
  return (
    <div className="mx-auto max-w-[900px] px-6 lg:px-10 py-12">
      <div className="rounded-3xl border border-[color:var(--border-soft)] bg-white p-10 shadow-[var(--shadow-soft)]">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--surface-2)] text-[color:var(--accent)]">
          <Icon name={icon} size={22} />
        </div>
        <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
          {eyebrow}
        </div>
        <h1 className="mt-1 text-[30px] font-semibold tracking-tight text-[color:var(--coded-navy)] leading-tight">
          {title}
        </h1>
        <p className="mt-3 text-[14.5px] text-[color:var(--text-secondary)] max-w-xl">
          {description}
        </p>

        {next && next.length > 0 && (
          <div className="mt-6">
            <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)] mb-2">
              On the roadmap
            </div>
            <ul className="space-y-1.5">
              {next.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-[13.5px] text-[color:var(--text-secondary)]"
                >
                  <span className="h-1 w-1 rounded-full bg-[color:var(--text-tertiary)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
