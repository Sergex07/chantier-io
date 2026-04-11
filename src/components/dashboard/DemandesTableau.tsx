"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateStatutDemande } from "@/app/actions/demandes";

type Statut = "ouvert" | "urgent" | "ferme" | string;

interface Demande {
  id: string;
  titre: string;
  region: string | null;
  date_debut: string | null;
  statut: Statut;
  created_at: string;
  specialite_nom: string | null;
  soumissions_count: number;
}

const STATUT_NEXT: Record<string, { value: "ouvert" | "urgent" | "ferme"; label: string }[]> = {
  ouvert:  [{ value: "urgent", label: "Urgent" }, { value: "ferme", label: "Fermer" }],
  urgent:  [{ value: "ouvert", label: "Normal" }, { value: "ferme", label: "Fermer" }],
  ferme:   [{ value: "ouvert", label: "Réouvrir" }],
};

function StatutBadge({ statut }: { statut: Statut }) {
  const styles: Record<string, string> = {
    ouvert: "bg-black text-white",
    urgent: "bg-red-600 text-white",
    ferme:  "bg-gray-100 text-gray-500",
  };
  const labels: Record<string, string> = {
    ouvert: "Ouvert",
    urgent: "Urgent",
    ferme:  "Fermé",
  };
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-semibold ${styles[statut] ?? "bg-gray-100 text-gray-500"}`}>
      {labels[statut] ?? statut}
    </span>
  );
}

function StatutMenu({ demande }: { demande: Demande }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const options = STATUT_NEXT[demande.statut] ?? [];

  function handleChange(statut: "ouvert" | "urgent" | "ferme") {
    setOpen(false);
    startTransition(async () => {
      const { error } = await updateStatutDemande(demande.id, statut);
      if (error) {
        toast.error(error);
      } else {
        toast.success("Statut mis à jour.");
        router.refresh();
      }
    });
  }

  if (options.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={isPending}
        className="text-xs font-medium text-gray-500 hover:text-black border border-gray-200 px-2 py-1 transition-colors disabled:opacity-40"
      >
        {isPending ? "…" : "Statut ▾"}
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-200 shadow-sm min-w-[110px]">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleChange(opt.value)}
                className="block w-full text-left px-3 py-2 text-xs text-black hover:bg-gray-50 transition-colors"
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function DemandesTableau({ demandes }: { demandes: Demande[] }) {
  if (demandes.length === 0) {
    return (
      <div className="bg-white border border-gray-200 px-8 py-16 text-center">
        <p className="text-sm text-gray-400 mb-4">Aucune demande publiée pour l&apos;instant.</p>
        <Link
          href="/dashboard/demandes/nouvelle"
          className="inline-block bg-black text-white text-sm font-medium px-5 py-2.5 hover:bg-gray-900 transition-colors"
        >
          Publier une première demande
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200">
            {["Titre", "Spécialité", "Région", "Date début", "Statut", "Soumissions", "Actions"].map(
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
          {demandes.map((d) => (
            <tr key={d.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3">
                <span className="font-medium text-black">{d.titre}</span>
              </td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                {d.specialite_nom ?? <span className="text-gray-300">—</span>}
              </td>
              <td className="px-4 py-3 text-gray-500 capitalize whitespace-nowrap">
                {d.region ?? <span className="text-gray-300">—</span>}
              </td>
              <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                {d.date_debut
                  ? new Date(d.date_debut).toLocaleDateString("fr-CA", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  : <span className="text-gray-300">—</span>}
              </td>
              <td className="px-4 py-3 whitespace-nowrap">
                <StatutBadge statut={d.statut} />
              </td>
              <td className="px-4 py-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                  {d.soumissions_count}
                </span>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/dashboard/demandes/${d.id}/soumissions`}
                    className="text-xs font-medium text-[#4A5568] hover:underline whitespace-nowrap"
                  >
                    Voir soumissions
                  </Link>
                  <StatutMenu demande={d} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
