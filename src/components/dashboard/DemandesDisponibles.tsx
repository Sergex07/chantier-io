"use client";

import { useState, useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { createSoumission, type SoumissionFormState } from "@/app/actions/soumissions";
import type { Specialite } from "@/lib/types";

type Statut = "ouvert" | "urgent" | string;

interface Demande {
  id: string;
  titre: string;
  entreprise_nom: string | null;
  region: string | null;
  secteur: string | null;
  date_debut: string | null;
  statut: Statut;
  specialite_id: string | null;
}

const REGIONS = [
  { value: "montreal",  label: "Montréal" },
  { value: "rive-nord", label: "Rive-Nord" },
  { value: "rive-sud",  label: "Rive-Sud" },
  { value: "quebec",    label: "Québec" },
  { value: "estrie",    label: "Estrie" },
  { value: "outaouais", label: "Outaouais" },
];

function StatutBadge({ statut }: { statut: Statut }) {
  if (statut === "urgent") {
    return (
      <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-red-600 text-white">
        Urgent
      </span>
    );
  }
  return (
    <span className="inline-block px-2 py-0.5 text-xs font-semibold bg-black text-white">
      Ouvert
    </span>
  );
}

// ─── Modal soumission ─────────────────────────────────────────────────────────

const initialState: SoumissionFormState = { success: false };

function SoumissionModal({
  demande,
  onClose,
}: {
  demande: Demande;
  onClose: () => void;
}) {
  const [state, formAction, pending] = useActionState(createSoumission, initialState);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success("Offre envoyée avec succès !");
      onClose();
    } else if (state.error && state.code !== "upgrade_required") {
      toast.error(state.error);
    }
  }, [state, onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
    >
      <div className="bg-white w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-black">Soumettre une offre</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-black transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>

        <div className="px-6 py-2 bg-gray-50 border-b border-gray-100">
          <p className="text-xs text-gray-500 truncate">
            <span className="font-medium text-black">{demande.titre}</span>
            {demande.region && (
              <span className="ml-2 capitalize">· {demande.region}</span>
            )}
          </p>
        </div>

        <form action={formAction} className="px-6 py-5 space-y-4">
          <input type="hidden" name="demande_id" value={demande.id} />

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Montant ($) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="montant"
              min={1}
              required
              placeholder="Ex. : 12 500"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Délai estimé
            </label>
            <input
              type="text"
              name="delai"
              placeholder="Ex. : 3 semaines"
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows={4}
              placeholder="Présentez votre offre, votre expérience..."
              className={`${inputCls} resize-none`}
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={pending}
              className="bg-black text-white text-sm font-medium px-5 py-2.5 hover:bg-gray-900 transition-colors disabled:opacity-50"
            >
              {pending ? "Envoi…" : "Envoyer l'offre"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Tableau principal ────────────────────────────────────────────────────────

export default function DemandesDisponibles({
  demandes,
  specialites,
  isPro,
}: {
  demandes: Demande[];
  specialites: Pick<Specialite, "id" | "nom">[];
  isPro: boolean;
}) {
  const [filtreSpec, setFiltreSpec] = useState("");
  const [filtreRegion, setFiltreRegion] = useState("");
  const [modalDemande, setModalDemande] = useState<Demande | null>(null);

  const filtrees = demandes.filter((d) => {
    if (filtreSpec && d.specialite_id !== filtreSpec) return false;
    if (filtreRegion && d.region !== filtreRegion) return false;
    return true;
  });

  return (
    <div>
      {/* Banner upgrade */}
      {!isPro && (
        <div className="flex items-center justify-between bg-[#4A5568]/10 border border-[#4A5568]/20 px-5 py-3 mb-6">
          <p className="text-sm text-[#4A5568] font-medium">
            Passez au plan Pro pour soumettre des offres sur les demandes.
          </p>
          <Link
            href="/dashboard/abonnement"
            className="text-xs font-semibold bg-[#4A5568] text-white px-3 py-1.5 hover:bg-[#3d4a5c] transition-colors shrink-0 ml-4"
          >
            Voir les plans
          </Link>
        </div>
      )}

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 mb-5">
        <select
          value={filtreSpec}
          onChange={(e) => setFiltreSpec(e.target.value)}
          className={selectCls}
        >
          <option value="">Toutes les spécialités</option>
          {specialites.map((s) => (
            <option key={s.id} value={s.id}>{s.nom}</option>
          ))}
        </select>
        <select
          value={filtreRegion}
          onChange={(e) => setFiltreRegion(e.target.value)}
          className={selectCls}
        >
          <option value="">Toutes les régions</option>
          {REGIONS.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
        {(filtreSpec || filtreRegion) && (
          <button
            onClick={() => { setFiltreSpec(""); setFiltreRegion(""); }}
            className="text-xs text-gray-400 hover:text-black transition-colors"
          >
            Réinitialiser
          </button>
        )}
        <span className="ml-auto text-xs text-gray-400 self-center">
          {filtrees.length} résultat{filtrees.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Tableau */}
      <div className="bg-white border border-gray-200 overflow-x-auto">
        {filtrees.length === 0 ? (
          <div className="px-8 py-14 text-center">
            <p className="text-sm text-gray-400">Aucune demande correspond à vos filtres.</p>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                {["Titre", "Entreprise", "Région", "Secteur", "Date début", "Statut", "Action"].map(
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
              {filtrees.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-black max-w-[200px] truncate">
                    {d.titre}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {d.entreprise_nom ?? <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 capitalize whitespace-nowrap">
                    {d.region ?? <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                    {d.secteur ?? <span className="text-gray-300">—</span>}
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
                    {isPro ? (
                      <button
                        onClick={() => setModalDemande(d)}
                        className="text-xs font-medium bg-black text-white px-3 py-1.5 hover:bg-gray-900 transition-colors whitespace-nowrap"
                      >
                        Soumettre une offre
                      </button>
                    ) : (
                      <Link
                        href="/dashboard/abonnement"
                        className="text-xs font-medium text-[#4A5568] hover:underline whitespace-nowrap"
                      >
                        Upgrader →
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {modalDemande && (
        <SoumissionModal
          demande={modalDemande}
          onClose={() => setModalDemande(null)}
        />
      )}
    </div>
  );
}

const inputCls =
  "w-full border border-gray-200 px-3 py-2 text-sm text-black placeholder-gray-400 outline-none focus:border-black transition-colors bg-white";

const selectCls =
  "border border-gray-200 px-3 py-2 text-sm text-black outline-none focus:border-black transition-colors bg-white";
