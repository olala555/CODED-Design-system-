"use client";

import { useRef, useState } from "react";
import { Icon } from "./Icon";
import { BADGE_HEIGHT, BADGE_WIDTH, BadgePreview } from "./BadgePreview";
import { FieldGroup, TemplateStudio, TextField } from "./TemplateStudio";

export function BadgeStudio() {
  const [name, setName] = useState("Omar Alibrahim");
  const [title, setTitle] = useState("General Manager");
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function onPickPhoto(file: File | undefined) {
    if (!file) return;
    setPhotoName(file.name);
    const reader = new FileReader();
    reader.onload = () => setPhotoUrl(typeof reader.result === "string" ? reader.result : null);
    reader.readAsDataURL(file);
  }

  function clearPhoto() {
    setPhotoUrl(null);
    setPhotoName(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  return (
    <TemplateStudio
      title="ID Badge"
      subtitle="CODED staff badge · upload a photo, set the name, then print as PDF."
      formatLabel="ID · portrait"
      previewWidth={BADGE_WIDTH}
      previewHeight={BADGE_HEIGHT}
      exportFilename="coded-id-badge.png"
      formPanel={
        <div className="flex flex-col gap-6">
          <FieldGroup label="Photo">
            <input
              ref={fileRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,image/*"
              onChange={(e) => onPickPhoto(e.target.files?.[0])}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[color:var(--coded-navy)] px-4 py-2.5 text-[13px] font-medium text-white hover:bg-[color:var(--accent-strong)] transition-colors"
            >
              <Icon name="image" size={15} />
              {photoUrl ? "Change photo" : "Upload photo"}
            </button>
            {photoName ? (
              <div className="flex items-center justify-between gap-2 text-[12px]">
                <span className="truncate text-[color:var(--text-secondary)]">{photoName}</span>
                <button
                  type="button"
                  onClick={clearPhoto}
                  className="shrink-0 text-[color:var(--text-tertiary)] hover:text-[color:var(--coded-navy)]"
                >
                  Remove
                </button>
              </div>
            ) : (
              <p className="text-[11.5px] text-[color:var(--text-tertiary)]">
                Upload a square headshot for the cleanest fit. It drops straight into the badge.
              </p>
            )}
          </FieldGroup>

          <FieldGroup label="Details">
            <TextField label="Full name" value={name} onChange={setName} />
            <TextField label="Title" value={title} onChange={setTitle} />
          </FieldGroup>
        </div>
      }
    >
      <BadgePreview name={name} title={title} photoUrl={photoUrl} />
    </TemplateStudio>
  );
}
