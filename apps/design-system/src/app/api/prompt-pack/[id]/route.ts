import { renderPromptPack, suggestedFilename } from "@/lib/prompt-pack";
import { brand } from "@/lib/brand";

export const runtime = "nodejs";

export function generateStaticParams() {
  return Object.keys(brand.palettes).map((id) => ({ id }));
}

export async function GET(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const md = renderPromptPack(id);

  if (md === null) {
    return new Response("Palette not found", { status: 404 });
  }

  const url = new URL(req.url);
  const inline = url.searchParams.get("inline") === "1";
  const filename = suggestedFilename(id);

  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${filename}"`,
      "Cache-Control": "public, max-age=60",
    },
  });
}
