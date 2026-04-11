"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export type DemandeFormState = {
  success: boolean;
  error?: string;
};

export async function createDemande(
  _prev: DemandeFormState,
  formData: FormData
): Promise<DemandeFormState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { success: false, error: "Non authentifié." };

  const titre        = (formData.get("titre")        as string)?.trim();
  const description  = (formData.get("description")  as string)?.trim();
  const specialite_id = (formData.get("specialite_id") as string) || null;
  const region       = (formData.get("region")       as string)?.trim() || null;
  const ville        = (formData.get("ville")        as string)?.trim() || null;
  const secteur      = (formData.get("secteur")      as string)?.trim() || null;
  const date_debut   = (formData.get("date_debut")   as string) || null;
  const budget_min   = formData.get("budget_min") ? Number(formData.get("budget_min")) : null;
  const budget_max   = formData.get("budget_max") ? Number(formData.get("budget_max")) : null;

  if (!titre) return { success: false, error: "Le titre est requis." };
  if (!description) return { success: false, error: "La description est requise." };

  const { error } = await supabase.from("demandes").insert({
    titre,
    description,
    specialite_id,
    region,
    ville,
    secteur,
    budget_min,
    budget_max,
    date_debut,
    entreprise_id: user.id,
    statut: "ouvert",
  });

  if (error) return { success: false, error: error.message };

  redirect("/dashboard/demandes");
}

export async function updateStatutDemande(
  demandeId: string,
  statut: "ouvert" | "urgent" | "ferme"
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié." };

  const { error } = await supabase
    .from("demandes")
    .update({ statut })
    .eq("id", demandeId)
    .eq("entreprise_id", user.id); // sécurité : only owner

  if (error) return { error: error.message };
  return {};
}
