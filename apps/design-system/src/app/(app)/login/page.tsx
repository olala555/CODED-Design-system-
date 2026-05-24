import { Icon } from "@/components/Icon";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signInWithEmail } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string; error?: string }>;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) redirect("/assets");

  const { sent, error } = await searchParams;

  return (
    <div className="mx-auto max-w-[420px] px-6 py-16">
      <div className="rounded-3xl border border-[color:var(--border-soft)] bg-white p-8 shadow-[var(--shadow-soft)]">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[color:var(--surface-2)] text-[color:var(--accent)]">
          <Icon name="sparkles" size={22} />
        </div>
        <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
          Admin sign in
        </div>
        <h1 className="mt-1 text-[24px] font-semibold tracking-tight text-[color:var(--coded-navy)] leading-tight">
          Sign in to manage assets
        </h1>
        <p className="mt-2 text-[13.5px] text-[color:var(--text-secondary)]">
          We&rsquo;ll email you a magic link. Only allow-listed admin emails can upload.
        </p>

        <form action={signInWithEmail} className="mt-6 flex flex-col gap-3">
          <label className="text-[12px] font-medium text-[color:var(--text-secondary)]">
            Email
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-[color:var(--border-soft)] bg-white px-3 py-2 text-[14px] outline-none focus:border-[color:var(--accent)]"
            />
          </label>
          <button
            type="submit"
            className="mt-1 rounded-lg bg-[color:var(--coded-navy)] px-4 py-2 text-[14px] font-medium text-white hover:bg-[color:var(--accent-strong)]"
          >
            Send magic link
          </button>
        </form>

        {sent && (
          <p className="mt-4 text-[13px] text-[color:var(--accent)]">
            Check your inbox for the sign-in link.
          </p>
        )}
        {error && (
          <p className="mt-4 text-[13px] text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
