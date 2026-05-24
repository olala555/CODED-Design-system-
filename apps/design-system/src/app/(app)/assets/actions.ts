"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { invalidateAssetCache } from "@/lib/asset-catalog";
import { isAdminEmail } from "@/lib/supabase/admin-emails";
import {
  buildAssetPath,
  isCategory,
  isLogoVariant,
  isProgramId,
} from "@/lib/assets";

const BUCKET = "assets";

export async function uploadAsset(formData: FormData) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    return { error: "Not authorized." };
  }

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return { error: "Choose a file to upload." };
  }

  const category = String(formData.get("category") ?? "").trim();
  const paletteId = String(formData.get("paletteId") ?? "").trim();
  const variant = String(formData.get("variant") ?? "").trim();
  const sponsor = String(formData.get("sponsor") ?? "").trim();
  const folderOverride = String(formData.get("folder") ?? "").trim();

  let path: string;

  if (folderOverride) {
    // Escape hatch: explicit folder path overrides the structured fields.
    const safeFolder = folderOverride.replace(/^\/+|\/+$/g, "");
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]+/g, "-");
    path = safeFolder ? `${safeFolder}/${safeName}` : safeName;
  } else {
    if (!isCategory(category)) return { error: "Pick a category." };
    if (category === "sponsors") {
      if (!sponsor) return { error: "Enter a sponsor name." };
    } else {
      if (!isProgramId(paletteId)) return { error: "Pick a program." };
      if (category === "logos" && !isLogoVariant(variant)) {
        return { error: "Logo uploads require a colored or white variant." };
      }
    }
    try {
      path = buildAssetPath({
        category,
        paletteId: category === "sponsors" ? null : paletteId,
        variant: category === "logos" ? (variant as "colored" | "white") : null,
        sponsor: category === "sponsors" ? sponsor : null,
        fileName: file.name,
      });
    } catch (err) {
      return { error: err instanceof Error ? err.message : "Invalid path." };
    }
  }

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: true,
    contentType: file.type || undefined,
  });

  if (error) return { error: error.message };

  invalidateAssetCache();
  revalidatePath("/assets");
  return { ok: true, path };
}

export async function deleteAsset(formData: FormData): Promise<void> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) return;

  const path = String(formData.get("path") ?? "").trim();
  if (!path) return;

  await supabase.storage.from(BUCKET).remove([path]);
  invalidateAssetCache();
  revalidatePath("/assets");
}
