import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { makeConversationId } from "@/lib/utils";

type Statut = "en_attente" | "acceptee" | "refusee" | "retiree" | string;

function StatutBadge({ statut }: { statut: Statut }) {
  if (statut === "acceptee") {
    return (
      <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-black text-white border border-green-500">
        Acceptée
      </span>
    );
  }
  if (statut === "refusee") {
    return (
      <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-white text-gray-400 line-through border border-gray-200">
        Refusée
      </span>
    );
  }
  if (statut === "vue") {
    return (
      <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-black text-white">
        Vue
      </span>
    );
  }
  if (statut === "retiree") {
    return (
      <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-400">
        Retirée
      </span>
    );
  }
  // en_attente + fallback
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-500">
      En attente
    </span>
  );
}

export default async function MesSoumissionsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  const { data, error } = await supabase
    .from("soumissions")
    .select(`
      id,
      montant,
      delai,
      statut,
      created_at,
      demandes!inner (
        id,
        titre,
        entreprise_id,
        profiles:entreprise_id (
          full_name
        )
      )
    `)
    .eq("pro_id", user.id)
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="max-w-5xl mx-auto">
        <p className="text-sm text-red-500">Erreur : {error.message}</p>
      </div>
    );
  }

  type Row = {
    id: string;
    montant: number;
    delai: string | null;
    statut: Statut;
    created_at: string;
    demande_titre: string;
    entreprise_id: string;
    entreprise_nom: string | null;
  };

  const rows: Row[] = (data ?? []).map((s) => {
    const demande = Array.isArray(s.demandes)
      ? (s.demandes[0] as {
          id: string;
          titre: string;
          entreprise_id: string;
          profiles: { full_name: string } | { full_name: string }[] | null;
        } | undefined)
      : (s.demandes as {
          id: string;
          titre: string;
          entreprise_id: string;
          profiles: { full_name: string } | { full_name: string }[] | null;
        } | null);

    const profile = demande?.profiles;
    const entreprise_nom = Array.isArray(profile)
      ? (profile[0] as { full_name: string } | undefined)?.full_name ?? null
      : (profile as { full_name: string } | null)?.full_name ?? null;

    return {
      id: s.id,
      montant: s.montant,
      delai: s.delai,
      statut: s.statut,
      created_at: s.created_at,
      demande_titre: demande?.titre ?? "—",
      entreprise_id: demande?.entreprise_id ?? "",
      entreprise_nom,
    };
  });

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-black">Mes soumissions</h1>
        <p className="text-sm text-gray-400 mt-1">
          {rows.length} soumission{rows.length !== 1 ? "s" : ""} envoyée{rows.length !== 1 ? "s" : ""}
        </p>
      </div>

      {rows.length === 0 ? (
        <div className="bg-white border border-gray-200 px-8 py-16 text-center">
          <p className="text-sm text-gray-400 mb-4">Aucune soumission envoyée pour l&apos;instant.</p>
          <Link
            href="/dashboard/demandes-disponibles"
            className="inline-block bg-black text-white text-sm font-medium px-5 py-2.5 hover:bg-gray-900 transition-colors"
          >
            Voir les demandes disponibles
          </Link>
        </div>
      ) : (
        <div className="bg-white border border-gray-200 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                {["Titre du projet", "Entreprise", "Montant", "Délai", "Date d'envoi", "Statut", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row) => {
                const convId = row.entreprise_id
                  ? makeConversationId(user.id, row.entreprise_id)
                  : null;

                return (
                  <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-black max-w-[180px]">
                      <span className="block truncate" title={row.demande_titre}>
                        {row.demande_titre}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {row.entreprise_nom ?? <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 font-semibold text-black whitespace-nowrap">
                      {row.montant.toLocaleString("fr-CA")} $
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {row.delai ?? <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {new Date(row.created_at).toLocaleDateString("fr-CA", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatutBadge statut={row.statut} />
                    </td>
                    <td className="px-4 py-3">
                      {convId ? (
                        <Link
                          href={`/dashboard/messages/${convId}`}
                          className="text-xs font-medium text-[#4A5568] hover:underline whitespace-nowrap"
                        >
                          Envoyer un message
                        </Link>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
