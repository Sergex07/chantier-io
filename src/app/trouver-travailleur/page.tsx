'use client'

import { useState } from 'react'

interface Travailleur {
  id: string
  nom: string
  metier: string
  niveau: string
  region: string
  exp: number
  dispo: string
}

const TRAVAILLEURS: Travailleur[] = [
  { id: 'demo-id', nom: 'Marc Bouchard', metier: 'Électricien', niveau: 'Compagnon', region: 'Laval', exp: 12, dispo: 'disponible' },
  { id: 'demo-id', nom: 'Jean-Philippe Roy', metier: 'Plombier', niveau: 'Maître', region: 'Montréal', exp: 18, dispo: 'ouvert' },
  { id: 'demo-id', nom: 'Sylvain Gagnon', metier: 'Charpentier', niveau: 'Compagnon', region: 'Rive-Nord', exp: 8, dispo: 'occupe' },
  { id: 'demo-id', nom: 'Patrick Leblanc', metier: 'Opérateur machinerie', niveau: 'Compagnon', region: 'Québec', exp: 15, dispo: 'disponible' },
  { id: 'demo-id', nom: 'François Tremblay', metier: 'Peintre', niveau: 'Apprenti', region: 'Rive-Sud', exp: 3, dispo: 'disponible' },
  { id: 'demo-id', nom: 'Mario Côté', metier: 'Soudeur', niveau: 'Compagnon', region: 'Laval', exp: 10, dispo: 'ouvert' },
  { id: 'demo-id', nom: 'Daniel Bergeron', metier: 'Couvreur', niveau: 'Maître', region: 'Grand Montréal', exp: 20, dispo: 'occupe' },
  { id: 'demo-id', nom: 'Steve Ouellet', metier: 'Ferblantier', niveau: 'Compagnon', region: 'Montréal', exp: 7, dispo: 'disponible' },
]

function getInitials(name: string): string {
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name[0]?.toUpperCase() ?? '?'
}

function getDispoColor(dispo: string): string {
  if (dispo === 'disponible') return '#16A34A'
  if (dispo === 'ouvert') return '#2563EB'
  return '#6B7280'
}

function getDispoLabel(dispo: string): string {
  if (dispo === 'disponible') return 'Disponible'
  if (dispo === 'ouvert') return 'Ouvert aux opportunités'
  return 'En poste'
}

function getNiveauStyle(niveau: string): { bg: string; color: string } {
  if (niveau === 'Maître') return { bg: '#FEF3C7', color: '#92400E' }
  if (niveau === 'Apprenti') return { bg: '#DBEAFE', color: '#1D4ED8' }
  return { bg: '#F3F4F6', color: '#374151' }
}

function WorkerCard({ t }: { t: Travailleur }) {
  const initials = getInitials(t.nom)
  const dispoColor = getDispoColor(t.dispo)
  const dispoLabel = getDispoLabel(t.dispo)
  const niveauStyle = getNiveauStyle(t.niveau)

  return (
    <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: dispoColor, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', fontWeight: 700, flexShrink: 0 }}>
          {initials}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#18170F' }}>{t.nom}</div>
          <div style={{ fontSize: '0.82rem', color: '#6B6860', marginTop: '2px' }}>{t.metier}</div>
        </div>
      </div>

      {/* Badges */}
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        <span style={{ display: 'inline-block', padding: '3px 9px', borderRadius: '100px', background: niveauStyle.bg, color: niveauStyle.color, fontSize: '0.72rem', fontWeight: 600 }}>
          {t.niveau}
        </span>
        <span style={{ display: 'inline-block', padding: '3px 9px', borderRadius: '100px', background: dispoColor === '#16A34A' ? '#F0FDF4' : dispoColor === '#2563EB' ? '#EFF6FF' : '#F9FAFB', color: dispoColor, fontSize: '0.72rem', fontWeight: 600 }}>
          {dispoLabel}
        </span>
      </div>

      {/* Meta */}
      <div style={{ fontSize: '0.78rem', color: '#6B6860' }}>
        📍 {t.region} · {t.exp} ans exp.
      </div>

      {/* CTA */}
      <a href={`/travailleur/${t.id}`} style={{ display: 'block', padding: '10px', background: '#18170F', color: 'white', borderRadius: '9px', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 600, textAlign: 'center', marginTop: '4px' }}>
        Voir le profil →
      </a>
    </div>
  )
}

const METIERS = ['Tous les métiers', 'Électricien', 'Plombier', 'Charpentier', 'Opérateur machinerie', 'Peintre', 'Soudeur', 'Couvreur', 'Ferblantier']
const REGIONS = ['Toutes les régions', 'Montréal', 'Laval', 'Rive-Nord', 'Rive-Sud', 'Québec', 'Grand Montréal']
const DISPOS = ['Toutes', 'Disponible', 'Ouvert aux opportunités', 'En poste']

const selectStyle: React.CSSProperties = {
  padding: '10px 14px', borderRadius: '9px', border: '1px solid #E8E6E1',
  fontSize: '0.875rem', fontFamily: 'inherit', color: '#18170F',
  background: 'white', outline: 'none', cursor: 'pointer',
}

export default function TrouverTravailleurPage() {
  const [metierFilter, setMetierFilter] = useState('Tous les métiers')
  const [regionFilter, setRegionFilter] = useState('Toutes les régions')
  const [dispoFilter, setDispoFilter] = useState('Toutes')

  const filtered = TRAVAILLEURS.filter(t => {
    const matchMetier = metierFilter === 'Tous les métiers' || t.metier === metierFilter
    const matchRegion = regionFilter === 'Toutes les régions' || t.region === regionFilter
    const matchDispo = dispoFilter === 'Toutes' || getDispoLabel(t.dispo) === dispoFilter
    return matchMetier && matchRegion && matchDispo
  })

  return (
    <div style={{ minHeight: '100vh', background: '#F9F8F6', paddingTop: '80px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#18170F', letterSpacing: '-0.04em', margin: '0 0 8px' }}>
            Trouver un travailleur de la construction
          </h1>
          <p style={{ fontSize: '1rem', color: '#6B6860', margin: 0 }}>
            1 000+ profils vérifiés au Québec
          </p>
        </div>

        {/* Filters */}
        <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '14px', padding: '16px 20px', marginBottom: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
          <select value={metierFilter} onChange={e => setMetierFilter(e.target.value)} style={selectStyle}>
            {METIERS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)} style={selectStyle}>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <select value={dispoFilter} onChange={e => setDispoFilter(e.target.value)} style={selectStyle}>
            {DISPOS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <button
            onClick={() => { setMetierFilter('Tous les métiers'); setRegionFilter('Toutes les régions'); setDispoFilter('Toutes') }}
            style={{ padding: '10px 20px', background: '#18170F', color: 'white', border: 'none', borderRadius: '9px', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Rechercher
          </button>
        </div>

        {/* Results count */}
        <div style={{ fontSize: '0.82rem', color: '#6B6860', marginBottom: '16px' }}>
          {filtered.length} travailleur{filtered.length !== 1 ? 's' : ''} trouvé{filtered.length !== 1 ? 's' : ''}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {filtered.map((t, i) => (
            <WorkerCard key={i} t={t} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
            <p style={{ fontSize: '1rem', fontWeight: 600, color: '#18170F', margin: '0 0 6px' }}>Aucun travailleur trouvé</p>
            <p style={{ fontSize: '0.875rem', color: '#6B6860', margin: 0 }}>Essayez de modifier vos filtres</p>
          </div>
        )}

        {/* CTA inscription */}
        <div style={{ marginTop: '48px', background: '#18170F', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: 'white', margin: '0 0 8px', letterSpacing: '-0.03em' }}>
            Vous êtes travailleur de la construction ?
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', margin: '0 0 24px' }}>
            Créez votre profil gratuitement et soyez trouvé par des entrepreneurs qui recrutent
          </p>
          <a href="/inscription?type=travailleur" style={{ display: 'inline-block', padding: '12px 28px', background: 'white', color: '#18170F', borderRadius: '10px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 700 }}>
            Créer mon profil travailleur →
          </a>
        </div>

      </div>
    </div>
  )
}
