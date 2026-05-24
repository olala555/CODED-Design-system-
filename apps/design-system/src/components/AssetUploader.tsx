"use client";

import { useRef, useState, useTransition } from "react";
import { uploadAsset } from "@/app/(app)/assets/actions";
import {
  CATEGORIES,
  LOGO_VARIANTS,
  type AssetCategory,
  type ProgramOption,
} from "@/lib/assets";

export function AssetUploader({ programs }: { programs: ProgramOption[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [category, setCategory] = useState<AssetCategory>("logos");
  const [advanced, setAdvanced] = useState(false);

  const needsVariant = category === "logos";

  function onSubmit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      const result = await uploadAsset(formData);
      if (result?.error) {
        setMessage({ kind: "error", text: result.error });
      } else {
        setMessage({ kind: "ok", text: `Uploaded to ${result?.path ?? "assets"}.` });
        formRef.current?.reset();
        setCategory("logos");
      }
    });
  }

  return (
    <form
      ref={formRef}
      action={onSubmit}
      className="rounded-2xl border border-[color:var(--border-soft)] bg-white p-5 shadow-[var(--shadow-soft)]"
    >
      <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
        Admin upload
      </div>
      <h2 className="mt-1 text-[16px] font-semibold tracking-tight text-[color:var(--coded-navy)]">
        Add a new asset
      </h2>
      <p className="mt-1 text-[12.5px] text-[color:var(--text-secondary)]">
        Files are stored under <code className="font-mono text-[11.5px]">category / program /
        {needsVariant ? " variant /" : ""} filename</code>.
      </p>

      {!advanced && (
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="text-[12px] font-medium text-[color:var(--text-secondary)]">
            Category
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value as AssetCategory)}
              className="mt-1 w-full rounded-lg border border-[color:var(--border-soft)] bg-white px-3 py-2 text-[13px] outline-none focus:border-[color:var(--accent)]"
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </label>

          {category === "sponsors" ? (
            <label className="text-[12px] font-medium text-[color:var(--text-secondary)]">
              Sponsor name
              <input
                name="sponsor"
                type="text"
                placeholder="e.g. Gulf Bank"
                className="mt-1 w-full rounded-lg border border-[color:var(--border-soft)] bg-white px-3 py-2 text-[13px] outline-none focus:border-[color:var(--accent)]"
              />
            </label>
          ) : (
            <label className="text-[12px] font-medium text-[color:var(--text-secondary)]">
              Program
              <select
                name="paletteId"
                defaultValue="coded"
                className="mt-1 w-full rounded-lg border border-[color:var(--border-soft)] bg-white px-3 py-2 text-[13px] outline-none focus:border-[color:var(--accent)]"
              >
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.label}
                    {p.kind === "master" ? " (master)" : ""}
                  </option>
                ))}
              </select>
            </label>
          )}

          {needsVariant ? (
            <label className="text-[12px] font-medium text-[color:var(--text-secondary)]">
              Variant
              <select
                name="variant"
                defaultValue="colored"
                className="mt-1 w-full rounded-lg border border-[color:var(--border-soft)] bg-white px-3 py-2 text-[13px] outline-none focus:border-[color:var(--accent)]"
              >
                {LOGO_VARIANTS.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.label}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      )}

      {advanced && (
        <div className="mt-4">
          <label className="text-[12px] font-medium text-[color:var(--text-secondary)]">
            Folder (raw path)
            <input
              name="folder"
              type="text"
              placeholder="logos/coded/colored"
              className="mt-1 w-full rounded-lg border border-[color:var(--border-soft)] bg-white px-3 py-2 text-[13px] outline-none focus:border-[color:var(--accent)]"
            />
          </label>
          <p className="mt-1 text-[11.5px] text-[color:var(--text-tertiary)]">
            Skips the structured path. Use for one-offs that don&rsquo;t fit the taxonomy.
          </p>
        </div>
      )}

      <div className="mt-4">
        <label className="text-[12px] font-medium text-[color:var(--text-secondary)]">
          File
          <input
            name="file"
            type="file"
            accept=".svg,.png,.jpg,.jpeg,.webp,.gif,.avif,image/*"
            required
            className="mt-1 w-full rounded-lg border border-[color:var(--border-soft)] bg-white px-3 py-2 text-[13px] file:mr-3 file:rounded-md file:border-0 file:bg-[color:var(--surface-2)] file:px-3 file:py-1 file:text-[12px] file:font-medium file:text-[color:var(--coded-navy)]"
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-[color:var(--coded-navy)] px-4 py-2 text-[13.5px] font-medium text-white hover:bg-[color:var(--accent-strong)] disabled:opacity-60"
        >
          {pending ? "Uploading…" : "Upload"}
        </button>
        <button
          type="button"
          onClick={() => setAdvanced((v) => !v)}
          className="text-[12px] text-[color:var(--text-tertiary)] hover:text-[color:var(--coded-navy)]"
        >
          {advanced ? "Use structured fields" : "Use raw folder path"}
        </button>
        {message && (
          <span
            className={`text-[12.5px] ${
              message.kind === "ok" ? "text-[color:var(--accent)]" : "text-red-600"
            }`}
          >
            {message.text}
          </span>
        )}
      </div>
    </form>
  );
}
