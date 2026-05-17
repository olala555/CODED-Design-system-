"use client";

import { useState } from "react";
import { CertificatePreview } from "./CertificatePreview";
import { PaletteSwitcher } from "./PaletteSwitcher";
import { FieldGroup, TemplateStudio, TextField } from "./TemplateStudio";

export function CertificateStudio({ defaultPaletteId }: { defaultPaletteId: string }) {
  const [paletteId, setPaletteId] = useState(defaultPaletteId);
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const [recipient, setRecipient] = useState("Ola Al-Amari");
  const [course, setCourse] = useState("AI App Developer Bootcamp · Cohort 04");
  const [date, setDate] = useState(today);
  const [signatureName, setSignatureName] = useState("Majid Kassem");
  const [signatureTitle, setSignatureTitle] = useState("Program Director, CODED");
  const [issuer, setIssuer] = useState("CODED Academy");

  const filename = `coded-certificate-${paletteId}.png`;

  return (
    <TemplateStudio
      title="Certificate of Completion"
      subtitle="A4 portrait · brand-themed border, seal, signature block."
      formatLabel="A4 · 595 × 842"
      previewWidth={595}
      previewHeight={842}
      exportFilename={filename}
      formPanel={
        <div className="flex flex-col gap-6">
          <FieldGroup label="Program theme">
            <PaletteSwitcher value={paletteId} onChange={setPaletteId} />
          </FieldGroup>

          <FieldGroup label="Recipient">
            <TextField label="Full name" value={recipient} onChange={setRecipient} />
            <TextField label="Course title" value={course} onChange={setCourse} />
            <TextField label="Date of completion" value={date} onChange={setDate} />
          </FieldGroup>

          <FieldGroup label="Issuer">
            <TextField label="Organization" value={issuer} onChange={setIssuer} />
            <TextField
              label="Signatory name"
              value={signatureName}
              onChange={setSignatureName}
            />
            <TextField
              label="Signatory title"
              value={signatureTitle}
              onChange={setSignatureTitle}
            />
          </FieldGroup>
        </div>
      }
    >
      <CertificatePreview
        paletteId={paletteId}
        recipient={recipient}
        course={course}
        date={date}
        signatureName={signatureName}
        signatureTitle={signatureTitle}
        issuer={issuer}
      />
    </TemplateStudio>
  );
}
