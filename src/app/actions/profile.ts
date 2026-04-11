"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export type ProfileFormState = {
  success: boolean;
  error?: string;
};

export async function updateProfile(
  _prev: ProfileFormState,
  formData: FormData
): Promise<ProfileFormState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Non authentifié." };

  // Champs texte
  const full_name   = (formData.get("full_name")   as string)?.trim() || null;
  const phone       = (formData.get("phone")        as string)?.trim() || null;
  const region      = (formData.get("region")       as string)?.trim() || null;
  const ville       = (formData.get("ville")        as string)?.trim() || null;
  const description = (formData.get("description")  as string)?.trim() || null;
  const website     = (formData.get("website")      as string)?.trim() || null;
  const rbq_numero  = (formData.get("rbq_numero")   as string)?.trim() || null;
  const ccq_numero  = (formData.get("ccq_numero")   as string)?.trim() || null;

  // Avatar upload
  let avatar_url: string | undefined;
  const avatarFile = formData.get("avatar") as File | null;
  if (avatarFile && avatarFile.size > 0) {
    const ext = avatarFile.name.split(".").pop();
    const path = `${user.id}/avatar.${ext}`;
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, avatarFile, { upsert: true });

    if (uploadError) {
      return { success: false, error: `Upload avatar : ${uploadError.message}` };
    }

    const { data: urlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(path);
    avatar_url = urlData.publicUrl;
  }

  // Update profile
  const updates: Record<string, unknown> = {
    full_name,
    phone,
    region,
    ville,
    description,
    website,
    rbq_numero,
    ccq_numero,
    updated_at: new Date().toISOString(),
  };
  if (avatar_url) updates.avatar_url = avatar_url;

  const { error: profileError } = await supabase
    .from("profiles")
    .update(updates)
    .eq("id", user.id);

  if (profileError) {
    return { success: false, error: profileError.message };
  }

  // Spécialités — table professionnel_specialites (id, pro_id, specialite_id)
  const specialiteIds = formData.getAll("specialites") as string[];
  if (specialiteIds.length >= 0) {
    await supabase
      .from("professionnel_specialites")
      .delete()
      .eq("pro_id", user.id);

    if (specialiteIds.length > 0) {
      await supabase.from("professionnel_specialites").insert(
        specialiteIds.map((sid) => ({ pro_id: user.id, specialite_id: sid }))
      );
    }
  }

  revalidatePath("/dashboard/profil");
  return { success: true };
}
