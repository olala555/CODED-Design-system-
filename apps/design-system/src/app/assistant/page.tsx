import { Icon } from "@/components/Icon";

const examples = [
  "What is the Cybersecurity theme?",
  "Generate a PDF direction for Juniors.",
  "Show sponsor placement rules.",
  "Which font do we use for AI App Developer?",
];

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
        The assistant is grounded in the live brand system — palettes,
        typography, usage rules, and sponsor guidelines.
      </p>

      <div className="mt-8 rounded-3xl border border-[color:var(--border-soft)] bg-white p-6 shadow-[var(--shadow-soft)]">
        <div className="rounded-2xl bg-[color:var(--surface-2)] p-5 min-h-[260px] flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-[var(--shadow-soft)]">
              <Icon name="sparkles" size={20} />
            </div>
            <div className="mt-3 text-[14px] font-medium text-[color:var(--coded-navy)]">
              Conversation starts here.
            </div>
            <div className="text-[12.5px] text-[color:var(--text-tertiary)]">
              Wire this up to Claude with the brand system as system context.
            </div>
          </div>
        </div>

        <form className="mt-4 flex items-center gap-2 rounded-2xl border border-[color:var(--border-soft)] bg-white p-2">
          <input
            placeholder="Ask the brand assistant…"
            className="flex-1 bg-transparent outline-none px-3 py-2 text-[14px] placeholder:text-[color:var(--text-tertiary)]"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 rounded-xl bg-[color:var(--coded-navy)] px-3.5 py-2 text-[13px] font-medium text-white hover:bg-[color:var(--accent-strong)]"
          >
            <Icon name="send" size={14} /> Ask
          </button>
        </form>

        <div className="mt-5 flex flex-wrap gap-2">
          {examples.map((q) => (
            <button
              key={q}
              className="rounded-full border border-[color:var(--border-soft)] bg-white px-3 py-1.5 text-[12px] font-medium text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-2)]"
            >
              {q}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
