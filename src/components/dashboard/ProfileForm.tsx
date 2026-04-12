'use client'

import { useRef, useState, useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { updateProfile, type ProfileFormState } from '@/app/actions/profile'
import type { Profile, Specialite } from '@/lib/types'

const REGIONS = [
  'Grand Montréal', 'Montréal', 'Laval', 'Rive-Sud', 'Rive-Nord',
  'Laurentides', 'Lanaudière', 'Montérégie', 'Québec', 'Estrie',
  'Outaouais', 'Saguenay–Lac-Saint-Jean', 'Mauricie',
  'Chaudière-Appalaches', 'Abitibi-Témiscamingue', 'Autre',
]

interface Props {
  profile: Partial<Profile>
  specialites: Specialite[]
  selectedSpecialites: string[]
}

const initialState: ProfileFormState = { success: false }

const inp: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: '8px',
  border: '1px solid #E8E6E1', fontSize: '0.875rem', color: '#18170F',
  background: 'white', outline: 'none', fontFamily: 'inherit',
  boxSizing: 'border-box',
}

export default function ProfileForm({ profile, specialites, selectedSpecialites }: Props) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState)
  const [preview, setPreview] = useState<string | null>(profile.avatar_url ?? null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (state.success) toast.success('Profil mis à jour avec succès !')
    else if (state.error) toast.error(state.error)
  }, [state])

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
  }

  const initiales = profile.full_name
    ?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? '?'

  return (
    <form action={formAction}>

      {/* Photo */}
      <div style={{ marginBottom: '32px' }}>
        <SectionTitle>Photo de profil</SectionTitle>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            style={{ width: 80, height: 80, borderRadius: '50%', background: '#4A5568', border: 'none', cursor: 'pointer', overflow: 'hidden', position: 'relative', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
          >
            {preview
              ? <img src={preview} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              : <span style={{ color: 'white', fontSize: '1.2rem', fontWeight: 700 }}>{initiales}</span>
            }
          </button>
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18170F', margin: '0 0 4px' }}>Téléverser une photo</p>
            <p style={{ fontSize: '0.75rem', color: '#6B6860', margin: '0 0 10px' }}>JPG, PNG ou WEBP · max 2 Mo</p>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              style={{ fontSize: '0.75rem', fontWeight: 600, border: '1px solid #E8E6E1', borderRadius: '7px', padding: '6px 14px', background: 'white', cursor: 'pointer', color: '#18170F', fontFamily: 'inherit' }}
            >
              Choisir un fichier
            </button>
          </div>
          <input ref={fileRef} type="file" name="avatar" accept="image/jpeg,image/png,image/webp" style={{ display: 'none' }} onChange={handleFileChange} />
        </div>
      </div>

      {/* Informations personnelles */}
      <div style={{ marginBottom: '32px' }}>
        <SectionTitle>Informations personnelles</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Field label="Nom complet" name="full_name" defaultValue={profile.full_name ?? ''} placeholder="Jean Tremblay" />
          <Field label="Téléphone" name="phone" type="tel" defaultValue={profile.phone ?? ''} placeholder="514 555-0000" />
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#18170F', marginBottom: '6px' }}>Région</label>
            <select name="region" defaultValue={profile.region ?? ''} style={{ ...inp }}>
              <option value="">Sélectionner une région</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <Field label="Ville" name="ville" defaultValue={profile.ville ?? ''} placeholder="Montréal" />
          <div style={{ gridColumn: '1 / -1' }}>
            <Field label="Site web" name="website" type="url" defaultValue={profile.website ?? ''} placeholder="https://exemple.com" />
          </div>
        </div>
        <div style={{ marginTop: '16px' }}>
          <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#18170F', marginBottom: '6px' }}>Description professionnelle</label>
          <textarea
            name="description"
            rows={4}
            defaultValue={profile.description ?? ''}
            placeholder="Décrivez votre expérience, vos services..."
            style={{ ...inp, resize: 'vertical' }}
          />
        </div>
      </div>

      {/* Licences */}
      <div style={{ marginBottom: '32px' }}>
        <SectionTitle>Licences & certifications</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <Field label="Numéro RBQ" name="rbq_numero" defaultValue={profile.rbq_numero ?? ''} placeholder="5678-0987-01" hint="Régie du bâtiment du Québec" />
          <Field label="Numéro CCQ" name="ccq_numero" defaultValue={profile.ccq_numero ?? ''} placeholder="123456" hint="Commission de la construction du Québec" />
        </div>
      </div>

      {/* Spécialités */}
      {specialites.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <SectionTitle>Spécialités</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {specialites.map(s => {
              const checked = selectedSpecialites.includes(s.id)
              return (
                <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: '1px solid #E8E6E1', borderRadius: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" name="specialites" value={s.id} defaultChecked={checked} style={{ width: 16, height: 16, accentColor: '#18170F', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.82rem', color: '#18170F' }}>{s.nom}</span>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* Submit */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid #F0EEEA' }}>
        <p style={{ fontSize: '0.72rem', color: '#6B6860', margin: 0 }}>
          Les champs RBQ et CCQ sont visibles sur votre profil public.
        </p>
        <button
          type="submit"
          disabled={pending}
          style={{ padding: '10px 24px', background: '#18170F', color: 'white', border: 'none', borderRadius: '9px', fontSize: '0.875rem', fontWeight: 600, cursor: pending ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: pending ? 0.6 : 1 }}
        >
          {pending ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
        </button>
      </div>
    </form>
  )
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #F0EEEA' }}>
      {children}
    </div>
  )
}

function Field({ label, name, type = 'text', defaultValue, placeholder, hint }: {
  label: string; name: string; type?: string; defaultValue?: string; placeholder?: string; hint?: string
}) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#18170F', marginBottom: '6px' }}>{label}</label>
      <input type={type} name={name} defaultValue={defaultValue} placeholder={placeholder}
        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E8E6E1', fontSize: '0.875rem', color: '#18170F', background: 'white', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
      {hint && <p style={{ fontSize: '0.72rem', color: '#6B6860', margin: '4px 0 0' }}>{hint}</p>}
    </div>
  )
}
