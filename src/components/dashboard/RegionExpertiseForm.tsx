'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { updateProfile, type ProfileFormState } from '@/app/actions/profile'
import type { Specialite } from '@/lib/types'

const REGIONS = [
  'Grand Montréal', 'Montréal', 'Laval', 'Rive-Sud', 'Rive-Nord',
  'Laurentides', 'Lanaudière', 'Montérégie', 'Québec', 'Estrie',
  'Outaouais', 'Saguenay–Lac-Saint-Jean', 'Mauricie',
  'Chaudière-Appalaches', 'Abitibi-Témiscamingue', 'Autre',
]

// Simple SVG map of Quebec regions (schematic)
const REGIONS_MAP = [
  { id: 'Grand Montréal', label: 'Grand Mtl', x: 170, y: 200, w: 80, h: 36 },
  { id: 'Laval',          label: 'Laval',     x: 180, y: 170, w: 60, h: 26 },
  { id: 'Rive-Sud',       label: 'Rive-Sud',  x: 160, y: 240, w: 80, h: 30 },
  { id: 'Rive-Nord',      label: 'Rive-Nord', x: 150, y: 140, w: 80, h: 28 },
  { id: 'Laurentides',    label: 'Laurentides', x: 110, y: 110, w: 96, h: 28 },
  { id: 'Lanaudière',     label: 'Lanaudière', x: 230, y: 130, w: 96, h: 28 },
  { id: 'Montérégie',     label: 'Montérégie', x: 120, y: 270, w: 96, h: 28 },
  { id: 'Estrie',         label: 'Estrie',    x: 240, y: 270, w: 70, h: 28 },
  { id: 'Outaouais',      label: 'Outaouais', x: 40,  y: 130, w: 80, h: 28 },
  { id: 'Québec',         label: 'Québec',    x: 330, y: 160, w: 80, h: 30 },
  { id: 'Mauricie',       label: 'Mauricie',  x: 280, y: 100, w: 80, h: 28 },
  { id: 'Chaudière-Appalaches', label: 'Chaud.-App.', x: 330, y: 200, w: 100, h: 28 },
  { id: 'Saguenay–Lac-Saint-Jean', label: 'Saguenay', x: 330, y: 60, w: 90, h: 28 },
  { id: 'Abitibi-Témiscamingue', label: 'Abitibi', x: 60, y: 60, w: 88, h: 28 },
]

const initialState: ProfileFormState = { success: false }

interface Props {
  region: string | null
  ville: string | null
  specialites: Pick<Specialite, 'id' | 'nom'>[]
  selectedSpecialites: string[]
}

export default function RegionExpertiseForm({ region, ville, specialites, selectedSpecialites }: Props) {
  const [state, formAction, pending] = useActionState(updateProfile, initialState)
  const [selectedRegion, setSelectedRegion] = [region, (r: string) => {}] // read-only init; form handles submit

  useEffect(() => {
    if (state.success) toast.success('Région et expertise mises à jour !')
    else if (state.error) toast.error(state.error)
  }, [state])

  const inp: React.CSSProperties = {
    width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E8E6E1',
    fontSize: '0.875rem', color: '#18170F', background: 'white', outline: 'none',
    fontFamily: 'inherit', boxSizing: 'border-box',
  }

  return (
    <form action={formAction}>
      {/* Carte SVG */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>
          Carte des régions du Québec
        </div>
        <div style={{ background: '#F9F8F6', border: '1px solid #F0EEEA', borderRadius: '12px', padding: '16px', overflowX: 'auto' }}>
          <svg width="480" height="320" viewBox="0 0 480 320" style={{ display: 'block', margin: '0 auto' }}>
            {REGIONS_MAP.map(r => {
              const active = region === r.id
              return (
                <g key={r.id}>
                  <rect x={r.x} y={r.y} width={r.w} height={r.h} rx={6} ry={6}
                    fill={active ? '#18170F' : '#E8E6E1'} stroke={active ? '#18170F' : '#D0CEC8'} strokeWidth={1} />
                  <text x={r.x + r.w / 2} y={r.y + r.h / 2 + 4} textAnchor="middle"
                    fontSize={9} fontWeight={active ? 700 : 500} fill={active ? 'white' : '#6B6860'} fontFamily="inherit">
                    {r.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      {/* Région et ville */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #F0EEEA' }}>
          Ma région & disponibilité
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#18170F', marginBottom: '6px' }}>Région principale</label>
            <select name="region" defaultValue={region ?? ''} style={inp}>
              <option value="">Sélectionner une région</option>
              {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#18170F', marginBottom: '6px' }}>Ville principale</label>
            <input type="text" name="ville" defaultValue={ville ?? ''} placeholder="Ex. : Laval" style={inp} />
          </div>
        </div>
      </div>

      {/* Spécialités avec niveaux */}
      {specialites.length > 0 && (
        <div style={{ marginBottom: '32px' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px', paddingBottom: '10px', borderBottom: '1px solid #F0EEEA' }}>
            Mes spécialités
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {specialites.map(s => {
              const checked = selectedSpecialites.includes(s.id)
              return (
                <label key={s.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', border: '1px solid #E8E6E1', borderRadius: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" name="specialites" value={s.id} defaultChecked={checked} style={{ width: 15, height: 15, accentColor: '#18170F', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.82rem', color: '#18170F' }}>{s.nom}</span>
                </label>
              )
            })}
          </div>
        </div>
      )}

      {/* Submit */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '16px', borderTop: '1px solid #F0EEEA' }}>
        <button type="submit" disabled={pending} style={{ padding: '10px 24px', background: '#18170F', color: 'white', border: 'none', borderRadius: '9px', fontSize: '0.875rem', fontWeight: 600, cursor: pending ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: pending ? 0.6 : 1 }}>
          {pending ? 'Sauvegarde...' : 'Sauvegarder'}
        </button>
      </div>
    </form>
  )
}
