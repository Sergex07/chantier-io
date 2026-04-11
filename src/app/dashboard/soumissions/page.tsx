import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SoumissionsTableau, {
  type DemandeGroup,
  type SoumissionRow,
} from "@/components/dashboard/SoumissionsTableau";

export default async function SoumissionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  // Fetch toutes les soumissions sur les demandes de cette entreprise
  const { data, error } = await supabase
    .from("soumissions")
    .select(`
      id,
      pro_id,
      montant,
      delai,
      message,
      statut,
      demandes!inner (
        id,
        titre,
        entreprise_id
      ),
      profiles:pro_id (
        full_name
      )
    `)
    .eq("demandes.entreprise_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <p className="text-sm text-red-500">Erreur : {error.message}</p>
      </div>
    );
  }

  // Fetch spécialités des pros en une seule query
  const proIds = [...new Set((data ?? []).map((s) => s.pro_id))];
  let specialitesMap = new Map<string, string[]>();

  if (proIds.length > 0) {
    const { data: proSpecs } = await supabase
      .from("professionnel_specialites")
      .select("pro_id, specialites ( nom )")
      .in("pro_id", proIds);

    for (const row of proSpecs ?? []) {
      const nom = Array.isArray(row.specialites)
        ? (row.specialites[0] as { nom: string } | undefined)?.nom
        : (row.specialites as { nom: string } | null)?.nom;

      if (nom) {
        const existing = specialitesMap.get(row.pro_id) ?? [];
        specialitesMap.set(row.pro_id, [...existing, nom]);
      }
    }
  }

  // Grouper par demande
  const groupMap = new Map<string, DemandeGroup>();

  for (const s of data ?? []) {
    const demande = Array.isArray(s.demandes)
      ? (s.demandes[0] as { id: string; titre: string } | undefined)
      : (s.demandes as { id: string; titre: string } | null);

    if (!demande) continue;

    const proProfile = Array.isArray(s.profiles)
      ? (s.profiles[0] as { full_name: string } | undefined)
      : (s.profiles as { full_name: string } | null);

    const row: SoumissionRow = {
      id: s.id,
      pro_id: s.pro_id,
      pro_nom: proProfile?.full_name ?? null,
      pro_specialites: specialitesMap.get(s.pro_id) ?? [],
      montant: s.montant,
      delai: s.delai,
      message: s.message,
      statut: s.statut,
    };

    if (!groupMap.has(demande.id)) {
      groupMap.set(demande.id, {
        demandeId: demande.id,
        demandeTitre: demande.titre,
        soumissions: [],
      });
    }
    groupMap.get(demande.id)!.soumissions.push(row);
  }

  const groupes = Array.from(groupMap.values());
  const totalSoumissions = groupes.reduce((acc, g) => acc + g.soumissions.length, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-black">Soumissions reçues</h1>
        <p className="text-sm text-gray-400 mt-1">
          {totalSoumissions} soumission{totalSoumissions !== 1 ? "s" : ""} sur{" "}
          {groupes.length} demande{groupes.length !== 1 ? "s" : ""}
        </p>
      </div>

      <SoumissionsTableau groupes={groupes} currentUserId={user.id} />
    </div>
  );
}
