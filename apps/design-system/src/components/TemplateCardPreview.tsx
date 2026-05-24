"use client";

import { useEffect, useRef, useState } from "react";
import { CertificatePreview } from "./CertificatePreview";
import { PresentationPreview } from "./PresentationPreview";
import { FlyerPreview } from "./FlyerPreview";
import { BADGE_HEIGHT, BADGE_WIDTH, BadgePreview } from "./BadgePreview";
import { flyerProducts } from "@/lib/flyerProducts";

const NATIVE: Record<string, { w: number; h: number }> = {
  certificate: { w: 595, h: 842 },
  presentation: { w: 1920, h: 1080 },
  flyer: { w: 1240, h: 1748 },
  badge: { w: BADGE_WIDTH, h: BADGE_HEIGHT },
};

/**
 * Live, scaled-to-fit thumbnail of a real template on the listing cards.
 * The actual preview component renders at native size and is scaled with a
 * `contain` fit (letterboxed) inside a fixed-height box.
 */
export function TemplateCardPreview({
  id,
  paletteId,
}: {
  id: string;
  paletteId: string;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.1);
  const native = NATIVE[id] ?? { w: 1000, h: 1000 };

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const compute = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (w <= 0 || h <= 0) return;
      setScale(Math.min(w / native.w, h / native.h));
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    return () => ro.disconnect();
  }, [native.w, native.h]);

  return (
    <div
      ref={boxRef}
      className="relative h-[300px] w-full overflow-hidden grid place-items-center"
      style={{ pointerEvents: "none" }}
    >
      <div
        style={{
          width: native.w * scale,
          height: native.h * scale,
          position: "relative",
          borderRadius: 6,
          overflow: "hidden",
          boxShadow:
            "0 18px 40px -12px rgba(20,36,63,0.35), 0 0 0 1px rgba(20,36,63,0.06)",
        }}
      >
        <div
          style={{
            width: native.w,
            height: native.h,
            position: "absolute",
            top: 0,
            left: 0,
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          <PreviewBody id={id} paletteId={paletteId} />
        </div>
      </div>
    </div>
  );
}

function PreviewBody({ id, paletteId }: { id: string; paletteId: string }) {
  if (id === "flyer") {
    const content =
      flyerProducts[paletteId] ?? flyerProducts["cybersecurity-bootcamp"];
    return <FlyerPreview {...content} />;
  }

  if (id === "badge") {
    return (
      <BadgePreview
        name="Omar Alibrahim"
        title="General Manager"
        photoUrl={null}
      />
    );
  }

  if (id === "certificate") {
    return (
      <CertificatePreview
        paletteId={paletteId}
        recipient="Ola Al-Amari"
        course="AI App Developer Bootcamp · Cohort 04"
        date="24 May 2026"
        signatureName="Majid Kassem"
        signatureTitle="Program Director, CODED"
        issuer="CODED Academy"
      />
    );
  }

  if (id === "presentation") {
    return (
      <PresentationPreview
        paletteId={paletteId}
        eyebrow="Program kickoff · Cohort 04"
        title={"The Future,\nBuilt in Public."}
        subtitle="A practical, hands-on program for builders shipping real software."
        presenter="Presented by CODED"
      />
    );
  }

  return null;
}
