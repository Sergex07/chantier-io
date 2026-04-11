import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DemandesTableau from "@/components/dashboard/DemandesTableau";

export default async function DemandesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  // Demandes + spécialité + count soumissions
  const { data, error } = await supabase
    .from("demandes")
    .select(`
      id,
      titre,
      region,
      date_debut,
      statut,
      created_at,
      specialites ( nom ),
      soumissions ( id )
    `)
    .eq("entreprise_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="max-w-5xl mx-auto">
        <p className="text-sm text-red-500">Erreur : {error.message}</p>
      </div>
    );
  }

  const demandes = (data ?? []).map((d) => ({
    id: d.id,
    titre: d.titre,
    region: d.region,
    date_debut: d.date_debut,
    statut: d.statut,
    created_at: d.created_at,
    specialite_nom: Array.isArray(d.specialites)
      ? (d.specialites[0] as { nom: string } | undefined)?.nom ?? null
      : (d.specialites as { nom: string } | null)?.nom ?? null,
    soumissions_count: Array.isArray(d.soumissions) ? d.soumissions.length : 0,
  }));

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-black">Mes demandes</h1>
          <p className="text-sm text-gray-400 mt-1">
            {demandes.length} demande{demandes.length !== 1 ? "s" : ""} publiée
            {demandes.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/dashboard/demandes/nouvelle"
          className="flex items-center gap-2 bg-black text-white text-sm font-medium px-4 py-2.5 hover:bg-gray-900 transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Nouvelle demande
        </Link>
      </div>

      <DemandesTableau demandes={demandes} />
    </div>
  );
}
