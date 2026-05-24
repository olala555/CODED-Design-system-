"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";

type Message = { role: "user" | "assistant"; content: string };

const STARTER_PROMPTS = [
  "What colors does the Cybersecurity program use?",
  "Find the white CODED Juniors logo to download.",
  "Generate a brand prompt pack for CODED Juniors.",
  "Which font do we use across all programs?",
];

export function AssistantChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, sending]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setError(null);
    setInput("");

    const nextMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
      { role: "assistant", content: "" },
    ];
    setMessages(nextMessages);
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages
            .slice(0, -1)
            .map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok || !res.body) {
        const errText = await res.text().catch(() => res.statusText);
        throw new Error(errText || `Request failed: ${res.status}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantText += chunk;
        setMessages((cur) => {
          const next = cur.slice(0, -1);
          next.push({ role: "assistant", content: assistantText });
          return next;
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setMessages((cur) => cur.slice(0, -1));
    } finally {
      setSending(false);
    }
  }

  const empty = messages.length === 0;

  return (
    <div className="rounded-3xl border border-[color:var(--border-soft)] bg-white p-6 shadow-[var(--shadow-soft)]">
      {/* Conversation */}
      <div
        ref={scrollRef}
        className="rounded-2xl bg-[color:var(--surface-2)] p-5 min-h-[340px] max-h-[60vh] overflow-y-auto"
      >
        {empty ? (
          <div className="h-full grid place-items-center text-center min-h-[300px]">
            <div className="max-w-md">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-white shadow-[var(--shadow-soft)] text-[color:var(--accent)]">
                <Icon name="sparkles" size={20} />
              </div>
              <div className="mt-3 text-[14px] font-medium text-[color:var(--coded-navy)]">
                Ask anything about the CODED brand.
              </div>
              <div className="text-[12.5px] text-[color:var(--text-tertiary)]">
                Colors, typography, usage rules — bilingual.
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((m, i) => (
              <MessageBubble key={i} message={m} streaming={sending && i === messages.length - 1} />
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="mt-3 rounded-lg border border-[color:var(--juniors-red)]/30 bg-[color:var(--juniors-red)]/5 px-3 py-2 text-[12.5px] text-[color:var(--juniors-red)]">
          {error}
        </div>
      )}

      {/* Input */}
      <form
        className="mt-4 flex items-center gap-2 rounded-2xl border border-[color:var(--border-soft)] bg-white p-2"
        onSubmit={(e) => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={sending}
          placeholder={sending ? "Thinking…" : "Ask the brand assistant…"}
          className="flex-1 bg-transparent outline-none px-3 py-2 text-[14px] placeholder:text-[color:var(--text-tertiary)] disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={sending || input.trim().length === 0}
          className="inline-flex items-center gap-1.5 rounded-xl bg-[color:var(--coded-navy)] px-3.5 py-2 text-[13px] font-medium text-white hover:bg-[color:var(--accent-strong)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="send" size={14} /> {sending ? "Sending" : "Ask"}
        </button>
      </form>

      {/* Starter prompts */}
      {empty && (
        <div className="mt-5 flex flex-wrap gap-2">
          {STARTER_PROMPTS.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              disabled={sending}
              className="rounded-full border border-[color:var(--border-soft)] bg-white px-3 py-1.5 text-[12px] font-medium text-[color:var(--text-secondary)] hover:bg-[color:var(--surface-2)] disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MessageBubble({ message, streaming }: { message: Message; streaming: boolean }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-[color:var(--coded-navy)] text-white"
            : "bg-white border border-[color:var(--border-soft)] text-[color:var(--text-primary)] shadow-[var(--shadow-soft)]"
        }`}
      >
        {message.content ? (
          isUser ? message.content : <RichText text={message.content} />
        ) : streaming ? (
          <TypingDots />
        ) : null}
        {streaming && message.content ? (
          <span className="inline-block w-1.5 h-4 ml-0.5 align-[-2px] bg-[color:var(--accent)] animate-pulse" />
        ) : null}
      </div>
    </div>
  );
}

// Renders assistant text, turning Markdown links [label](https://…) into
// clickable download links. Everything else stays plain text (the parent
// bubble keeps `whitespace-pre-wrap`, so newlines are preserved).
function RichText({ text }: { text: string }) {
  const linkRe = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, label, url] = match;
    nodes.push(
      <a
        key={key++}
        href={url}
        download
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--border-soft)] bg-[color:var(--surface-2)] px-2 py-0.5 font-medium text-[color:var(--accent)] no-underline hover:bg-white hover:text-[color:var(--accent-strong)]"
      >
        <Icon name="download" size={12} />
        {label}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return <>{nodes}</>;
}

function TypingDots() {
  return (
    <span className="inline-flex items-center gap-1 text-[color:var(--text-tertiary)]">
      <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
      <span
        className="h-1.5 w-1.5 rounded-full bg-current animate-pulse"
        style={{ animationDelay: "120ms" }}
      />
      <span
        className="h-1.5 w-1.5 rounded-full bg-current animate-pulse"
        style={{ animationDelay: "240ms" }}
      />
    </span>
  );
}
