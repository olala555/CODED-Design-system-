import { Icon } from "@/components/Icon";
import { PromptPackCard } from "@/components/PromptPackCard";
import { brand } from "@/lib/brand";
import { renderPromptPack } from "@/lib/prompt-pack";

export default function DownloadsPage() {
  const packs = Object.entries(brand.palettes).map(([id, palette]) => ({
    id,
    label: palette.label,
    kind: palette.kind,
    swatchHexes: palette.colors.map((c) => c.hex),
    colorCount: palette.colors.length,
    hasGradient: Boolean(palette.gradients && palette.gradients.length > 0),
    markdown: renderPromptPack(id) ?? "",
  }));

  return (
    <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-10">
      <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
        Downloads
      </div>
      <h1 className="mt-1 text-[36px] font-semibold tracking-tight text-[color:var(--coded-navy)] leading-[1.1]">
        Brand-context packs for Claude, Figma AI, ChatGPT.
      </h1>
      <p className="mt-3 text-[15px] text-[color:var(--text-secondary)] max-w-2xl">
        One Markdown file per program — paste it into any AI tool as system
        context and it instantly knows your colors, typography, and usage rules.
      </p>

      {/* How-to strip */}
      <div className="mt-6 rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] p-5">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white shadow-[var(--shadow-soft)] text-[color:var(--accent)]">
            <Icon name="command" size={18} />
          </div>
          <div>
            <div className="text-[13.5px] font-semibold text-[color:var(--coded-navy)]">
              How to use
            </div>
            <div className="text-[12.5px] text-[color:var(--text-secondary)] leading-relaxed mt-0.5 max-w-2xl">
              <strong>Copy</strong> the pack and paste it at the start of a
              Claude conversation (or as a system prompt). The model will then
              respect the program&apos;s palette, typography, and composition
              rules for the rest of the chat.
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {packs.map((p) => (
          <PromptPackCard key={p.id} {...p} />
        ))}
      </div>

      <div className="mt-10 text-[11.5px] font-mono text-[color:var(--text-tertiary)]">
        Generated from CODED Brand System v{brand.version} · synced {brand.lastUpdated}
      </div>
    </div>
  );
}
