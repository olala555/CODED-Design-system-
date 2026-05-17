import Link from "next/link";
import { Icon } from "./Icon";

export function SectionHeader({
  title,
  description,
  href,
  cta,
}: {
  title: string;
  description?: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4 mb-5">
      <div>
        <h2 className="text-[18px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-[13px] text-[color:var(--text-secondary)]">
            {description}
          </p>
        )}
      </div>
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[color:var(--accent)] hover:text-[color:var(--accent-strong)]"
        >
          {cta ?? "See all"} <Icon name="arrow-right" size={13} />
        </Link>
      )}
    </div>
  );
}
