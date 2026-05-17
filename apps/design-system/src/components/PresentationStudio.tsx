"use client";

import { useState } from "react";
import { PaletteSwitcher } from "./PaletteSwitcher";
import { PresentationPreview } from "./PresentationPreview";
import { FieldGroup, TemplateStudio, TextField } from "./TemplateStudio";

export function PresentationStudio({ defaultPaletteId }: { defaultPaletteId: string }) {
  const [paletteId, setPaletteId] = useState(defaultPaletteId);

  const [eyebrow, setEyebrow] = useState("Program kickoff · Cohort 04");
  const [title, setTitle] = useState("The Future,\nBuilt in Public.");
  const [subtitle, setSubtitle] = useState(
    "A practical, hands-on program for builders shipping real software.",
  );
  const [presenter, setPresenter] = useState("Presented by CODED");

  const filename = `coded-presentation-${paletteId}.png`;

  return (
    <TemplateStudio
      title="Title Slide"
      subtitle="16:9 deck cover · hero typography, brand glow, program tag."
      formatLabel="16:9 · 1920 × 1080"
      previewWidth={1920}
      previewHeight={1080}
      previewBackdrop="dark"
      exportFilename={filename}
      formPanel={
        <div className="flex flex-col gap-6">
          <FieldGroup label="Program theme">
            <PaletteSwitcher value={paletteId} onChange={setPaletteId} />
          </FieldGroup>

          <FieldGroup label="Slide content">
            <TextField label="Eyebrow tag" value={eyebrow} onChange={setEyebrow} />
            <label className="block">
              <div className="text-[11.5px] font-medium text-[color:var(--text-secondary)] mb-1">
                Headline
              </div>
              <textarea
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-[color:var(--border-soft)] bg-white px-3 py-2 text-[13px] text-[color:var(--coded-navy)] outline-none focus:border-[color:var(--accent)]/40 focus:ring-2 focus:ring-[color:var(--accent)]/15 resize-none"
              />
            </label>
            <TextField label="Subtitle" value={subtitle} onChange={setSubtitle} />
            <TextField label="Presenter" value={presenter} onChange={setPresenter} />
          </FieldGroup>
        </div>
      }
    >
      <PresentationPreview
        paletteId={paletteId}
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        presenter={presenter}
      />
    </TemplateStudio>
  );
}
