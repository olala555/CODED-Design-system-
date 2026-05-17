import Anthropic from "@anthropic-ai/sdk";
import { buildSystemBlocks } from "@/lib/system-prompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 4096;

type ClientMessage = { role: "user" | "assistant"; content: string };

const client = new Anthropic();

export async function POST(req: Request) {
  let body: { messages?: ClientMessage[] };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) {
    return new Response("messages array required", { status: 400 });
  }

  const last = messages[messages.length - 1];
  if (last.role !== "user") {
    return new Response("Last message must be from user", { status: 400 });
  }

  const apiMessages: Anthropic.MessageParam[] = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const claudeStream = client.messages.stream({
          model: MODEL,
          max_tokens: MAX_TOKENS,
          system: buildSystemBlocks(),
          messages: apiMessages,
        });

        for await (const event of claudeStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        const final = await claudeStream.finalMessage();
        const usage = final.usage;
        console.log(
          `[chat] cache_read=${usage.cache_read_input_tokens ?? 0} cache_write=${usage.cache_creation_input_tokens ?? 0} input=${usage.input_tokens} output=${usage.output_tokens}`,
        );

        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("[chat] stream error:", msg);
        try {
          controller.enqueue(encoder.encode(`\n\n[error] ${msg}`));
        } catch {
          /* controller already closed */
        }
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Accel-Buffering": "no",
    },
  });
}
