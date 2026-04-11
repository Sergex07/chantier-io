"use client";

import { useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateStatutSoumission } from "@/app/actions/soumissions";
import { makeConversationId } from "@/lib/utils";

type StatutSoumission = "en_attente" | "acceptee" | "refusee" | "retiree" | string;

export interface SoumissionRow {
  id: string;
  pro_id: string;
  pro_nom: string | null;
  pro_specialites: string[];
  montant: number;
  delai: string | null;
  message: string | null;
  statut: StatutSoumission;
}

export interface DemandeGroup {
  demandeId: string;
  demandeTitre: string;
  soumissions: SoumissionRow[];
}

// ─── Statut badge ─────────────────────────────────────────────────────────────

function StatutBadge({ statut }: { statut: StatutSoumission }) {
  const styles: Record<string, string> = {
    en_attente: "bg-gray-100 text-gray-600",
    acceptee:   "bg-black text-white",
    refusee:    "bg-red-100 text-red-600",
    retiree:    "bg-gray-100 text-gray-400",
  };
  const labels: Record<string, string> = {
    en_attente: "En attente",
    acceptee:   "Acceptée",
    refusee:    "Refusée",
    retiree:    "Retirée",
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-semibold ${styles[statut] ?? "bg-gray-100 text-gray-500"}`}>
      {labels[statut] ?? statut}
    </span>
  );
}

// ─── Boutons actions ──────────────────────────────────────────────────────────

function ActionButtons({
  soumission,
  currentUserId,
}: {
  soumission: SoumissionRow;
  currentUserId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const convId = makeConversationId(currentUserId, soumission.pro_id);

  function handleStatut(statut: "acceptee" | "refusee") {
    startTransition(async () => {
      const { error } = await updateStatutSoumission(soumission.id, statut);
      if (error) {
        toast.error(error);
      } else {
        toast.success(statut === "acceptee" ? "Soumission acceptée." : "Soumission refusée.");
        router.refresh();
      }
    });
  }

  const isPending_ = isPending;
  const isResolved = soumission.statut === "acceptee" || soumission.statut === "refusee";

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {!isResolved && (
        <>
          <button
            onClick={() => handleStatut("acceptee")}
            disabled={isPending_}
            className="text-xs font-medium bg-black text-white px-2.5 py-1.5 hover:bg-gray-800 transition-colors disabled:opacity-40"
          >
            Accepter
          </button>
          <button
            onClick={() => handleStatut("refusee")}
            disabled={isPending_}
            className="text-xs font-medium border border-gray-200 text-gray-600 px-2.5 py-1.5 hover:border-gray-400 transition-colors disabled:opacity-40"
          >
            Refuser
          </button>
        </>
      )}
      <Link
        href={`/dashboard/messages/${convId}`}
        className="text-xs font-medium text-[#4A5568] hover:underline whitespace-nowrap"
      >
        Envoyer un message
      </Link>
    </div>
  );
}

// ─── Tableau principal ────────────────────────────────────────────────────────

export default function SoumissionsTableau({
  groupes,
  currentUserId,
}: {
  groupes: DemandeGroup[];
  currentUserId: string;
}) {
  if (groupes.length === 0) {
    return (
      <div className="bg-white border border-gray-200 px-8 py-16 text-center">
        <p className="text-sm text-gray-400">Aucune soumission reçue pour l&apos;instant.</p>
        <p className="text-xs text-gray-300 mt-1">
          Les soumissions apparaîtront ici lorsque des professionnels répondront à vos demandes.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {groupes.map((groupe) => (
        <div key={groupe.demandeId}>
          {/* Header groupe */}
          <div className="flex items-center gap-3 mb-3">
            <h2 className="text-sm font-semibold text-black">{groupe.demandeTitre}</h2>
            <span className="text-xs text-gray-400">
              {groupe.soumissions.length} soumission{groupe.soumissions.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="bg-white border border-gray-200 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  {["Professionnel", "Spécialités", "Montant", "Délai", "Message", "Statut", "Actions"].map(
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
                {groupe.soumissions.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors align-top">
                    <td className="px-4 py-3">
                      <span className="font-medium text-black whitespace-nowrap">
                        {s.pro_nom ?? <span className="text-gray-400">—</span>}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1 max-w-[140px]">
                        {s.pro_specialites.length > 0 ? (
                          s.pro_specialites.map((sp) => (
                            <span
                              key={sp}
                              className="text-[10px] font-medium bg-gray-100 text-gray-600 px-1.5 py-0.5"
                            >
                              {sp}
                            </span>
                          ))
                        ) : (
                          <span className="text-gray-300 text-xs">—</span>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 font-semibold text-black whitespace-nowrap">
                      {s.montant.toLocaleString("fr-CA")} $
                    </td>
                    <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                      {s.delai ?? <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-4 py-3 text-gray-500 max-w-[200px]">
                      {s.message ? (
                        <span title={s.message}>
                          {s.message.length > 100
                            ? s.message.slice(0, 100) + "…"
                            : s.message}
                        </span>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <StatutBadge statut={s.statut} />
                    </td>
                    <td className="px-4 py-3">
                      <ActionButtons
                        soumission={s}
                        currentUserId={currentUserId}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
