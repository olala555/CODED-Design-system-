// Shown instantly on navigation to /assets while the server component fetches
// the asset catalog from Supabase Storage. Mirrors the real layout so the page
// doesn't jump when content streams in.

function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-[color:var(--surface-2)] ${className}`}
    />
  );
}

function CardSkeleton() {
  return (
    <li className="overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-white shadow-[var(--shadow-soft)]">
      <div className="aspect-[4/3] animate-pulse bg-[color:var(--surface-2)]" />
      <div className="p-3.5">
        <Shimmer className="h-3.5 w-3/4" />
        <Shimmer className="mt-2 h-2.5 w-1/2" />
        <div className="mt-3 flex items-center justify-between">
          <Shimmer className="h-3 w-20" />
          <Shimmer className="h-4 w-10" />
        </div>
      </div>
    </li>
  );
}

export default function Loading() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Shimmer className="h-3 w-24" />
          <Shimmer className="mt-2 h-7 w-48" />
          <Shimmer className="mt-3 h-4 w-[28rem] max-w-full" />
        </div>
        <Shimmer className="h-8 w-32" />
      </header>

      {/* Filter chip rows */}
      <section className="mt-8 space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <Shimmer className="h-4 w-16" />
          {Array.from({ length: 5 }).map((_, i) => (
            <Shimmer key={i} className="h-7 w-20 rounded-full" />
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Shimmer className="h-4 w-16" />
          {Array.from({ length: 6 }).map((_, i) => (
            <Shimmer key={i} className="h-7 w-24 rounded-full" />
          ))}
        </div>
      </section>

      {/* Asset grid */}
      <section className="mt-8">
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </ul>
      </section>
    </div>
  );
}
