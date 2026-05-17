/**
 * Tiny helpers for picking foreground / background colors from a palette.
 * No external dependencies — these run on both server and client.
 */

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff };
}

/** Perceived luminance, 0..1 (uses sRGB → linear → Rec. 709 weights). */
export function luminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 1;
  const lin = (c: number) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * lin(rgb.r) + 0.7152 * lin(rgb.g) + 0.0722 * lin(rgb.b);
}

/** "white" or a dark navy depending on which has more contrast against `bg`. */
export function readableTextOn(bg: string): string {
  return luminance(bg) < 0.55 ? "#FFFFFF" : "#14243F";
}

export function withAlpha(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}
