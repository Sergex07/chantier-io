"use client";

import { useRef, useState, useActionState, useEffect } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { updateProfile, type ProfileFormState } from "@/app/actions/profile";
import type { Profile, Specialite } from "@/lib/types";

const REGIONS = [
  "Montréal", "Québec", "Laval", "Rive-Sud", "Rive-Nord",
  "Laurentides", "Lanaudière", "Montérégie", "Estrie",
  "Outaouais", "Saguenay–Lac-Saint-Jean", "Mauricie",
  "Chaudière-Appalaches", "Abitibi-Témiscamingue", "Autre",
];

interface Props {
  profile: Partial<Profile>;
  specialites: Specialite[];
  selectedSpecialites: string[];
}

const initialState: ProfileFormState = { success: false };

export default function ProfileForm({ profile, specialites, selectedSpecialites }: Props) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState);
  const [preview, setPreview] = useState<string | null>(profile.avatar_url ?? null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success("Profil mis à jour avec succès !");
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
  }

  const initiales = profile.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() ?? "?";

  return (
    <form action={formAction} className="space-y-8">
      {/* ── Photo ── */}
      <section>
        <SectionTitle>Photo de profil</SectionTitle>
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="relative w-20 h-20 rounded-full overflow-hidden bg-[#4A5568] flex items-center justify-center shrink-0 hover:opacity-90 transition-opacity group"
          >
            {preview ? (
              <Image src={preview} alt="Avatar" fill className="object-cover" unoptimized />
            ) : (
              <span className="text-white text-xl font-semibold">{initiales}</span>
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-medium">Changer</span>
            </div>
          </button>
          <div>
            <p className="text-sm font-medium text-black mb-1">Téléverser une photo</p>
            <p className="text-xs text-gray-400 mb-2">JPG, PNG ou WEBP · max 2 Mo</p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="text-xs font-medium border border-gray-200 px-3 py-1.5 hover:border-gray-400 transition-colors"
            >
              Choisir un fichier
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            name="avatar"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </section>

      {/* ── Informations personnelles ── */}
      <section>
        <SectionTitle>Informations personnelles</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field label="Nom complet" name="full_name" defaultValue={profile.full_name ?? ""} placeholder="Jean Tremblay" />
          <Field label="Téléphone" name="phone" type="tel" defaultValue={profile.phone ?? ""} placeholder="514 555-0000" />
          <div>
            <label className="block text-sm font-medium text-black mb-1">Région</label>
            <select
              name="region"
              defaultValue={profile.region ?? ""}
              className="w-full border border-gray-200 px-3 py-2 text-sm text-black outline-none focus:border-black transition-colors bg-white"
            >
              <option value="">Sélectionner une région</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <Field label="Ville" name="ville" defaultValue={profile.ville ?? ""} placeholder="Montréal" />
          <Field label="Site web" name="website" type="url" defaultValue={profile.website ?? ""} placeholder="https://exemple.com" />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-black mb-1">Description</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={profile.description ?? ""}
            placeholder="Décrivez votre expérience, vos services..."
            className="w-full border border-gray-200 px-3 py-2 text-sm text-black placeholder-gray-400 outline-none focus:border-black transition-colors resize-none"
          />
        </div>
      </section>

      {/* ── Licences ── */}
      <section>
        <SectionTitle>Licences & certifications</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Field
            label="Numéro RBQ"
            name="rbq_numero"
            defaultValue={profile.rbq_numero ?? ""}
            placeholder="5678-0987-01"
            hint="Régie du bâtiment du Québec"
          />
          <Field
            label="Numéro CCQ"
            name="ccq_numero"
            defaultValue={profile.ccq_numero ?? ""}
            placeholder="123456"
            hint="Commission de la construction du Québec"
          />
        </div>
      </section>

      {/* ── Spécialités ── */}
      {specialites.length > 0 && (
        <section>
          <SectionTitle>Spécialités</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {specialites.map((s) => {
              const checked = selectedSpecialites.includes(s.id);
              return (
                <label
                  key={s.id}
                  className="flex items-center gap-2.5 px-3 py-2.5 border border-gray-200 cursor-pointer hover:border-[#4A5568] transition-colors has-[:checked]:border-[#4A5568] has-[:checked]:bg-[#4A5568]/5"
                >
                  <input
                    type="checkbox"
                    name="specialites"
                    value={s.id}
                    defaultChecked={checked}
                    className="accent-[#4A5568] w-4 h-4 shrink-0"
                  />
                  <span className="text-sm text-black">{s.nom}</span>
                </label>
              );
            })}
          </div>
        </section>
      )}

      {/* ── Submit ── */}
      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Les champs RBQ et CCQ sont visibles sur votre profil public.
        </p>
        <button
          type="submit"
          disabled={pending}
          className="bg-black text-white text-sm font-medium px-6 py-2.5 hover:bg-gray-900 transition-colors disabled:opacity-50"
        >
          {pending ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </div>
    </form>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold tracking-widest uppercase text-gray-400 mb-4 pb-2 border-b border-gray-100">
      {children}
    </h2>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-black mb-1">{label}</label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full border border-gray-200 px-3 py-2 text-sm text-black placeholder-gray-400 outline-none focus:border-black transition-colors"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}
