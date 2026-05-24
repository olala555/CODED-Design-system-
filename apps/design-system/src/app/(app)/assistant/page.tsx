import { AssistantChat } from "@/components/AssistantChat";
import { BRAND_SOURCE_VERSION } from "@/lib/system-prompt";

export default function AssistantPage() {
  return (
    <div className="mx-auto max-w-[900px] px-6 lg:px-10 py-10">
      <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-[color:var(--text-tertiary)]">
        AI Brand Assistant
      </div>
      <h1 className="mt-1 text-[36px] font-semibold tracking-tight text-[color:var(--coded-navy)] leading-[1.1]">
        Ask anything about the CODED brand.
      </h1>
      <p className="mt-3 text-[15px] text-[color:var(--text-secondary)] max-w-2xl">
        Grounded in the live brand system — palettes, typography, usage rules,
        and sponsor guidelines. Replies in your language (EN / AR).
      </p>
      <div className="mt-2 text-[11.5px] font-mono text-[color:var(--text-tertiary)]">
        Brand source · {BRAND_SOURCE_VERSION} · Sonnet 4.6
      </div>

      <div className="mt-8">
        <AssistantChat />
      </div>
    </div>
  );
}
