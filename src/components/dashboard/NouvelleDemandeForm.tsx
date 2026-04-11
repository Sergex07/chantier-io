"use client";

import { useState, useActionState, useEffect } from "react";
import { toast } from "sonner";
import { createDemande, type DemandeFormState } from "@/app/actions/demandes";
import type { Specialite } from "@/lib/types";

const SECTEURS = ["Résidentiel", "Commercial", "Industriel"];

const REGIONS = [
  { value: "montreal",   label: "Montréal" },
  { value: "rive-nord",  label: "Rive-Nord" },
  { value: "rive-sud",   label: "Rive-Sud" },
  { value: "quebec",     label: "Québec" },
  { value: "estrie",     label: "Estrie" },
  { value: "outaouais",  label: "Outaouais" },
];

const STEPS = ["Projet", "Localisation & budget", "Description"];

const initialState: DemandeFormState = { success: false };

export default function NouvelleDemandeForm({
  specialites,
}: {
  specialites: Pick<Specialite, "id" | "nom">[];
}) {
  const [step, setStep] = useState(0);
  const [fields, setFields] = useState({
    titre: "",
    specialite_id: "",
    secteur: "",
    region: "",
    ville: "",
    date_debut: "",
    budget_min: "",
    budget_max: "",
    description: "",
  });

  const [state, formAction, pending] = useActionState(createDemande, initialState);

  useEffect(() => {
    if (state.error) toast.error(state.error);
  }, [state]);

  function set(key: keyof typeof fields, value: string) {
    setFields((f) => ({ ...f, [key]: value }));
  }

  function nextStep(e: React.FormEvent) {
    e.preventDefault();
    if (step === 0 && !fields.titre.trim()) {
      toast.error("Le titre est requis.");
      return;
    }
    setStep((s) => s + 1);
  }

  const progress = ((step + 1) / STEPS.length) * 100;

  return (
    <div>
      {/* Barre de progression */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEPS.map((label, i) => (
            <span
              key={label}
              className={`text-xs font-medium transition-colors ${
                i <= step ? "text-black" : "text-gray-300"
              }`}
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>
        <div className="h-1 bg-gray-100 w-full">
          <div
            className="h-1 bg-[#4A5568] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Étape 1 */}
      {step === 0 && (
        <form onSubmit={nextStep} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Titre du projet <Required />
            </label>
            <input
              type="text"
              value={fields.titre}
              onChange={(e) => set("titre", e.target.value)}
              placeholder="Ex. : Réfection toiture résidentielle"
              className={inputCls}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Spécialité requise
            </label>
            <select
              value={fields.specialite_id}
              onChange={(e) => set("specialite_id", e.target.value)}
              className={inputCls}
            >
              <option value="">Sélectionner une spécialité</option>
              {specialites.map((s) => (
                <option key={s.id} value={s.id}>{s.nom}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Secteur
            </label>
            <div className="flex gap-3">
              {SECTEURS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => set("secteur", s)}
                  className={`flex-1 py-2.5 text-sm font-medium border transition-colors ${
                    fields.secteur === s
                      ? "bg-black text-white border-black"
                      : "border-gray-200 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <StepNav step={step} total={STEPS.length} pending={pending} onBack={() => setStep((s) => s - 1)} />
        </form>
      )}

      {/* Étape 2 */}
      {step === 1 && (
        <form onSubmit={nextStep} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-black mb-1">Région</label>
              <select
                value={fields.region}
                onChange={(e) => set("region", e.target.value)}
                className={inputCls}
              >
                <option value="">Sélectionner</option>
                {REGIONS.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-black mb-1">Ville</label>
              <input
                type="text"
                value={fields.ville}
                onChange={(e) => set("ville", e.target.value)}
                placeholder="Ex. : Laval"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Date de début souhaitée
            </label>
            <input
              type="date"
              value={fields.date_debut}
              onChange={(e) => set("date_debut", e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Budget estimé ($)
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="number"
                  min={0}
                  value={fields.budget_min}
                  onChange={(e) => set("budget_min", e.target.value)}
                  placeholder="Minimum"
                  className={inputCls}
                />
                <p className="text-xs text-gray-400 mt-1">Minimum</p>
              </div>
              <div>
                <input
                  type="number"
                  min={0}
                  value={fields.budget_max}
                  onChange={(e) => set("budget_max", e.target.value)}
                  placeholder="Maximum"
                  className={inputCls}
                />
                <p className="text-xs text-gray-400 mt-1">Maximum</p>
              </div>
            </div>
          </div>

          <StepNav step={step} total={STEPS.length} pending={pending} onBack={() => setStep((s) => s - 1)} />
        </form>
      )}

      {/* Étape 3 — soumission finale */}
      {step === 2 && (
        <form action={formAction} className="space-y-5">
          {/* Hidden fields */}
          <input type="hidden" name="titre"         value={fields.titre} />
          <input type="hidden" name="specialite_id" value={fields.specialite_id} />
          <input type="hidden" name="secteur"       value={fields.secteur} />
          <input type="hidden" name="region"        value={fields.region} />
          <input type="hidden" name="ville"         value={fields.ville} />
          <input type="hidden" name="date_debut"    value={fields.date_debut} />
          <input type="hidden" name="budget_min"    value={fields.budget_min} />
          <input type="hidden" name="budget_max"    value={fields.budget_max} />

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Description détaillée <Required />
            </label>
            <p className="text-xs text-gray-400 mb-2">
              Décrivez les travaux, les matériaux souhaités, les contraintes, etc.
            </p>
            <textarea
              name="description"
              rows={8}
              value={fields.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Ex. : Réfection complète d'une toiture de 1 500 pi² sur maison unifamiliale. Bardeaux d'asphalte 30 ans. Accès difficile, stationnement limité..."
              className={`${inputCls} resize-none`}
              required
            />
          </div>

          {/* Récapitulatif */}
          <div className="bg-gray-50 border border-gray-200 p-4 text-xs text-gray-600 space-y-1">
            <p className="font-semibold text-black text-sm mb-2">Récapitulatif</p>
            <Row label="Titre"     value={fields.titre} />
            <Row label="Secteur"   value={fields.secteur || "—"} />
            <Row label="Région"    value={REGIONS.find((r) => r.value === fields.region)?.label || "—"} />
            <Row label="Ville"     value={fields.ville || "—"} />
            <Row label="Budget"    value={
              fields.budget_min || fields.budget_max
                ? `${fields.budget_min ? fields.budget_min + " $" : "—"} – ${fields.budget_max ? fields.budget_max + " $" : "—"}`
                : "—"
            } />
            <Row label="Début"     value={fields.date_debut || "—"} />
          </div>

          <StepNav step={step} total={STEPS.length} pending={pending} onBack={() => setStep((s) => s - 1)} />
        </form>
      )}
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const inputCls =
  "w-full border border-gray-200 px-3 py-2 text-sm text-black placeholder-gray-400 outline-none focus:border-black transition-colors bg-white";

function Required() {
  return <span className="text-red-500 ml-0.5">*</span>;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="text-gray-400 w-16 shrink-0">{label}</span>
      <span className="text-black font-medium">{value}</span>
    </div>
  );
}

function StepNav({
  step,
  total,
  pending,
  onBack,
}: {
  step: number;
  total: number;
  pending: boolean;
  onBack: () => void;
}) {
  const isLast = step === total - 1;

  return (
    <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-6">
      {step > 0 ? (
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
        >
          ← Précédent
        </button>
      ) : (
        <span />
      )}
      <button
        type="submit"
        disabled={pending}
        className="bg-black text-white text-sm font-medium px-6 py-2.5 hover:bg-gray-900 transition-colors disabled:opacity-50"
      >
        {pending ? "Envoi..." : isLast ? "Publier la demande" : "Suivant →"}
      </button>
    </div>
  );
}
