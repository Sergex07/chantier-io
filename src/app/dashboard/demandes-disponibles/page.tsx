import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DemandesDisponibles from "@/components/dashboard/DemandesDisponibles";

export default async function DemandesDisponiblesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  const [profileResult, demandesResult, specialitesResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("plan")
      .eq("id", user.id)
      .single(),
    supabase
      .from("demandes")
      .select(`
        id,
        titre,
        region,
        secteur,
        date_debut,
        statut,
        specialite_id,
        profiles ( full_name )
      `)
      .neq("statut", "ferme")
      .order("created_at", { ascending: false }),
    supabase
      .from("specialites")
      .select("id, nom")
      .order("nom"),
  ]);

  const isPro = profileResult.data?.plan === "professionnel";

  const demandes = (demandesResult.data ?? []).map((d) => ({
    id: d.id,
    titre: d.titre,
    region: d.region,
    secteur: d.secteur,
    date_debut: d.date_debut,
    statut: d.statut,
    specialite_id: d.specialite_id,
    entreprise_nom: Array.isArray(d.profiles)
      ? (d.profiles[0] as { full_name: string } | undefined)?.full_name ?? null
      : (d.profiles as { full_name: string } | null)?.full_name ?? null,
  }));

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-black">Demandes disponibles</h1>
        <p className="text-sm text-gray-400 mt-1">
          Toutes les demandes de soumissions ouvertes sur la plateforme.
        </p>
      </div>

      <DemandesDisponibles
        demandes={demandes}
        specialites={specialitesResult.data ?? []}
        isPro={isPro}
      />
    </div>
  );
}
