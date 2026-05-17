import { brand, getPalette } from "./brand";

/**
 * Render a Markdown prompt pack for one CODED program palette.
 *
 * The output is meant to be pasted into Claude / Figma AI / ChatGPT as
 * system context so the LLM produces output that respects the brand.
 */
export function renderPromptPack(paletteId: string): string | null {
  const palette = getPalette(paletteId);
  if (!palette) return null;

  const lines: string[] = [];
  const push = (s = "") => lines.push(s);

  push(`# CODED Brand Context — ${palette.label}`);
  push();
  push(
    `You are producing a deliverable for **${palette.label}**, a ${palette.kind === "master" ? "master brand" : "product"} within the CODED family. Follow the rules below exactly — do not invent colors or typography.`,
  );
  push();

  // ----- Brand-wide anchor -----
  if (brand.globalRoles.navyBlueAppearsIn.includes(paletteId)) {
    push("## Brand-wide anchor");
    push();
    push(
      `\`#14243F\` **Navy Blue** is the CODED-wide anchor color and is part of this palette. Use it whenever the deliverable should read as "CODED" regardless of the specific product — formal backgrounds, typography on light surfaces, hero anchors.`,
    );
    push();
  }

  // ----- Colors -----
  push("## Color palette");
  push();
  push("| Role | Name | Hex | RGB | Usage |");
  push("|------|------|-----|-----|-------|");
  for (const c of palette.colors) {
    push(
      `| ${c.role} | ${c.name} | \`${c.hex.toUpperCase()}\` | ${c.rgb} | ${c.usage} |`,
    );
  }
  push();

  // ----- Gradients -----
  if (palette.gradients && palette.gradients.length > 0) {
    push("## Gradients");
    push();
    for (const g of palette.gradients) {
      const css = `linear-gradient(${g.direction}, ${g.stops.join(", ")})`;
      push(`- **${g.name}** — \`${css}\``);
      push(`  - ${g.usage}`);
    }
    push();
  }

  // ----- Typography -----
  push("## Typography");
  push();
  push(`Brand typeface is **${brand.typeface}**.`);
  push();
  push("- Headlines: **Bold**");
  push("- Body: Medium");
  push(
    "- Fallback (if Neufile Grotesk is unavailable): Inter, Helvetica Neue, system-ui. **Never use a serif.**",
  );
  push("- Typography color: white on dark surfaces, `#14243F` Navy on light. `#1A1A1A` Basic Black is reserved for formal print only.");
  push();

  // ----- Usage rules -----
  push("## Composition rules");
  push();
  push(`1. **Pick the primary first.** Set dominant backgrounds or hero elements to the palette's primary color.`);
  push(`2. **Pair primary with secondary** for large surfaces and type blocks.`);
  push(`3. **Use accents sparingly** — glows, gradient halos, small icons, decorative details. Never as the dominant color.`);
  if (paletteId === "cybersecurity-bootcamp") {
    push(`4. **Cybersecurity is always a gradient background by default** — \`linear-gradient(to bottom, #14243F, #00112F)\` unless a flat surface is explicitly required.`);
  }
  if (paletteId === "codedjuniors") {
    push(`4. **Juniors slides are always white-background** — bright white only, with Navy typography. Use accents for glows and detail elements.`);
  }
  push();

  // ----- Voice -----
  push("## Voice & tone");
  push();
  push(
    "Confident, technical, and premium. Respectful — not playful or salesy. No emojis. No marketing fluff. Headlines are short and declarative. Body copy is concise. When writing for **CODED Juniors**, the tone can be warmer and more encouraging, but still without emojis.",
  );
  push();

  // ----- Footer -----
  push("---");
  push();
  push(
    `_Source: CODED Brand System v${brand.version} · synced ${brand.lastUpdated} · palette \`${paletteId}\` from the Figma library._`,
  );
  push("");

  return lines.join("\n");
}

export function suggestedFilename(paletteId: string): string {
  return `coded-brand-pack-${paletteId}.md`;
}
