import Anthropic from "@anthropic-ai/sdk";
import { buildSystemBlocks } from "@/lib/system-prompt";
import { listAllAssets } from "@/lib/asset-catalog";
import {
  type Asset,
  type AssetCategory,
  type LogoVariant,
  formatBytes,
  programOptions,
  searchAssets,
} from "@/lib/assets";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = "claude-sonnet-4-6";
const MAX_TOKENS = 4096;
const MAX_TOOL_TURNS = 4;
const MAX_RESULTS = 12;

type ClientMessage = { role: "user" | "assistant"; content: string };

const client = new Anthropic();

const tools: Anthropic.Tool[] = [
  {
    name: "search_brand_assets",
    description:
      "Search the CODED brand asset library — product logos (colored & white), brand marks, and backgrounds, all stored in the platform. Use this whenever the user wants to find, see, or download an actual file, e.g. \"the white CODED Juniors wordmark\", \"Cybersecurity backgrounds\", or \"all Unicode logos\". Returns matching files each with a direct download URL. After calling, present the results to the user as Markdown download links in the form [file name](download_url). If nothing matches, say so plainly.",
    input_schema: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Free-text search matched against file name, program name (e.g. \"CODED Juniors\", \"Unicode\"), category, and variant. Example: \"juniors wordmark white\".",
        },
        category: {
          type: "string",
          enum: ["logos", "brand", "backgrounds"],
          description:
            "Restrict to a category: logos (program wordmarks/marks), brand (icons, ornaments, mascots), or backgrounds.",
        },
        variant: {
          type: "string",
          enum: ["colored", "white"],
          description: "Logos only: the colored or white variant.",
        },
      },
    },
  },
];

const programs = programOptions();
function programLabel(paletteId: string | null): string {
  if (!paletteId) return "Unfiled";
  return programs.find((p) => p.id === paletteId)?.label ?? paletteId;
}

type ToolInput = {
  query?: string;
  category?: AssetCategory;
  variant?: LogoVariant;
};

async function runAssetSearch(
  input: ToolInput,
  getAssets: () => Promise<{ assets: Asset[]; error: string | null }>,
): Promise<string> {
  const { assets, error } = await getAssets();
  if (error) {
    return JSON.stringify({ error: `Could not read the asset library: ${error}` });
  }

  const matches = searchAssets(assets, input, programLabel);
  console.log(
    `[chat][tool] input=${JSON.stringify(input)} assets=${assets.length} matches=${matches.length}`,
  );
  const results = matches.slice(0, MAX_RESULTS).map((a) => ({
    file_name: a.fileName,
    program: programLabel(a.paletteId),
    category: a.category,
    variant: a.variant,
    format: a.format,
    size: formatBytes(a.size),
    download_url: a.publicUrl,
  }));

  return JSON.stringify({
    total_matches: matches.length,
    returned: results.length,
    results,
  });
}

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

  const conversation: Anthropic.MessageParam[] = messages.map((m) => ({
    role: m.role,
    content: m.content,
  }));

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const emit = (text: string) => controller.enqueue(encoder.encode(text));

      // Read the asset library at most once per request, reused across tool calls.
      let assetCache: { assets: Asset[]; error: string | null } | null = null;
      const getAssets = async () =>
        (assetCache ??= await listAllAssets({ maxAgeMs: 60_000 }));

      try {
        for (let turn = 0; turn < MAX_TOOL_TURNS; turn++) {
          const claudeStream = client.messages.stream({
            model: MODEL,
            max_tokens: MAX_TOKENS,
            system: buildSystemBlocks(),
            tools,
            messages: conversation,
          });

          for await (const event of claudeStream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              emit(event.delta.text);
            }
          }

          const final = await claudeStream.finalMessage();
          const usage = final.usage;
          console.log(
            `[chat] turn=${turn} stop=${final.stop_reason} cache_read=${usage.cache_read_input_tokens ?? 0} cache_write=${usage.cache_creation_input_tokens ?? 0} input=${usage.input_tokens} output=${usage.output_tokens}`,
          );

          if (final.stop_reason !== "tool_use") break;

          const toolResults: Anthropic.ToolResultBlockParam[] = [];
          for (const block of final.content) {
            if (block.type === "tool_use" && block.name === "search_brand_assets") {
              const result = await runAssetSearch(block.input as ToolInput, getAssets);
              toolResults.push({
                type: "tool_result",
                tool_use_id: block.id,
                content: result,
              });
            }
          }

          conversation.push(
            { role: "assistant", content: final.content },
            { role: "user", content: toolResults },
          );
        }

        controller.close();
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        console.error("[chat] stream error:", msg);
        try {
          emit(`\n\n[error] ${msg}`);
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
