# Supabase setup — Asset library

One-time configuration to back the **Assets** page with Supabase Storage + Auth.

## 1. Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
ADMIN_EMAILS=you@example.com,teammate@example.com
```

Find URL + anon key in your Supabase dashboard → **Project Settings → API**.

`ADMIN_EMAILS` is a comma-separated allowlist. Only users who sign in with one of
these emails can upload or delete files.

Restart `npm run dev` after editing `.env.local`.

## 2. Create the storage bucket

In the Supabase dashboard → **Storage → New bucket**:

- **Name:** `assets`
- **Public bucket:** ✅ yes (read-only for anonymous users)
- File size limit: whatever you want (default 50 MB is fine)

Or with SQL:

```sql
insert into storage.buckets (id, name, public)
values ('assets', 'assets', true);
```

## 3. Storage policies (RLS)

Run this in **SQL Editor**. It allows anonymous read but restricts writes to
authenticated users — the per-email admin gate is enforced in the server action
before the upload reaches Storage.

```sql
-- Anyone can read objects in the assets bucket (the bucket is also public)
create policy "Public read assets"
on storage.objects for select
to anon, authenticated
using (bucket_id = 'assets');

-- Authenticated users can write/update/delete in the assets bucket
create policy "Auth write assets"
on storage.objects for insert
to authenticated
with check (bucket_id = 'assets');

create policy "Auth update assets"
on storage.objects for update
to authenticated
using (bucket_id = 'assets');

create policy "Auth delete assets"
on storage.objects for delete
to authenticated
using (bucket_id = 'assets');
```

## 4. Configure auth redirect URLs

Dashboard → **Authentication → URL Configuration**:

- **Site URL:** `http://localhost:3000` (and your production URL when you deploy)
- **Redirect URLs:** add `http://localhost:3000/auth/callback`

## 5. Sign in for the first time

1. Visit `/login`
2. Enter an email from your `ADMIN_EMAILS` list
3. Click the magic link in your inbox — you'll land on `/assets` signed in
4. Upload a file using the **Admin upload** card

That's it.

## Path convention

The uploader writes files to a structured path so the grid can filter by
category, program, and (for logos) variant:

```
logos/<programId>/<colored|white>/<filename>
brand/<programId>/<filename>
backgrounds/<programId>/<filename>
```

Examples:

- `logos/coded/colored/wordmark.svg`
- `logos/ai-app-developer/white/icon.svg`
- `brand/coded/ornament-star.svg`
- `backgrounds/data-science-bootcamp/cover-1920.png`

`<programId>` is the palette ID from `src/brand.json` (e.g. `coded`,
`ai-app-developer`, `data-science-bootcamp`, `cybersecurity-bootcamp`,
`codedjuniors`, `unicode`).

The **Use raw folder path** toggle on the uploader lets you bypass this for
one-offs. Files outside this convention show up under an **Unfiled** section.

---

## How auth + uploads work

- `src/proxy.ts` runs on every request, refreshes the Supabase session cookie,
  and is the Next 16 replacement for `middleware.ts`.
- `src/lib/supabase/server.ts` builds a server client per request, using the
  `cookies()` helper (async in Next 16).
- `src/lib/supabase/browser.ts` is for client components if needed later.
- `src/app/assets/actions.ts` is a Server Action that checks the signed-in
  user's email against `ADMIN_EMAILS` before calling `storage.from('assets').upload(...)`.
- The bucket is public, so download links are plain public URLs — no signing needed.

## Going further (not implemented yet)

- A Postgres `assets` table for metadata (program, tags, type) and filtering
- Image optimization via `next/image` (currently using `<img>` for portability)
- Per-program access (RLS using a `profiles.role` column)
