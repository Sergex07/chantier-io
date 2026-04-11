"use server";

import { createClient } from "@/lib/supabase/server";

export type SoumissionFormState = {
  success: boolean;
  error?: string;
  code?: "upgrade_required";
};

export async function createSoumission(
  _prev: SoumissionFormState,
  formData: FormData
): Promise<SoumissionFormState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Non authentifié." };

  // Vérifier le plan
  const { data: profile } = await supabase
    .from("profiles")
    .select("plan")
    .eq("id", user.id)
    .single();

  if (profile?.plan !== "professionnel") {
    return {
      success: false,
      error: "Votre plan ne permet pas de soumettre des offres.",
      code: "upgrade_required",
    };
  }

  const demande_id = (formData.get("demande_id") as string)?.trim();
  const montant    = formData.get("montant") ? Number(formData.get("montant")) : null;
  const delai      = (formData.get("delai")   as string)?.trim() || null;
  const message    = (formData.get("message") as string)?.trim() || null;

  if (!demande_id) return { success: false, error: "Demande invalide." };
  if (!montant || montant <= 0) return { success: false, error: "Le montant est requis." };

  // Empêcher double soumission
  const { data: existing } = await supabase
    .from("soumissions")
    .select("id")
    .eq("demande_id", demande_id)
    .eq("pro_id", user.id)
    .single();

  if (existing) {
    return { success: false, error: "Vous avez déjà soumis une offre pour cette demande." };
  }

  const { error } = await supabase.from("soumissions").insert({
    demande_id,
    pro_id: user.id,
    montant,
    delai,
    message,
    statut: "en_attente",
  });

  if (error) return { success: false, error: error.message };

  return { success: true };
}

// ─── updateStatutSoumission ───────────────────────────────────────────────────

export async function updateStatutSoumission(
  soumissionId: string,
  statut: "acceptee" | "refusee"
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié." };

  // Vérifier que l'entreprise possède la demande liée
  const { data: soumission } = await supabase
    .from("soumissions")
    .select("id, demandes ( entreprise_id )")
    .eq("id", soumissionId)
    .single();

  const demandes = soumission?.demandes;
  const entrepriseId = Array.isArray(demandes)
    ? (demandes[0] as { entreprise_id: string } | undefined)?.entreprise_id
    : (demandes as { entreprise_id: string } | null | undefined)?.entreprise_id;

  if (entrepriseId !== user.id) {
    return { error: "Action non autorisée." };
  }

  const { error } = await supabase
    .from("soumissions")
    .update({ statut })
    .eq("id", soumissionId);

  if (error) return { error: error.message };
  return {};
}
