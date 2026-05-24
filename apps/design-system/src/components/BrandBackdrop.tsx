/**
 * Quiet, brand-faithful backdrop for the dashboard hero.
 * Uses only navy + faint dot grid + soft glow washes.
 * No literal bracket glyphs and no colored floating dots — those weren't from
 * the brand book.
 */
export function BrandBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Soft brand-glow base wash — single navy/blue tone, very low opacity */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_20%_-10%,rgba(0,74,163,0.07),transparent_60%),radial-gradient(900px_500px_at_85%_110%,rgba(20,36,63,0.05),transparent_60%),linear-gradient(180deg,#FFFFFF_0%,#F8F9FB_100%)]" />

      {/* Dot grid texture — neutral, structural */}
      <div className="absolute inset-0 opacity-[0.45] bg-[radial-gradient(circle,rgba(20,36,63,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Interactive mouse-follow halo (driven by inline style var --mx/--my in HeroSection) */}
      <div
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          background:
            "radial-gradient(380px 380px at var(--mx, 50%) var(--my, 50%), rgba(0, 74, 163, 0.08), transparent 70%)",
        }}
      />
    </div>
  );
}
