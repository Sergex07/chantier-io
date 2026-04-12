'use client'

import { useState, useActionState, useEffect, useRef } from 'react'
import { toast } from 'sonner'
import { createSoumission, type SoumissionFormState } from '@/app/actions/soumissions'
import type { Specialite } from '@/lib/types'

type Statut = 'ouvert' | 'urgent' | string

interface Demande {
  id: string
  titre: string
  entreprise_nom: string | null
  region: string | null
  secteur: string | null
  date_debut: string | null
  statut: Statut
  specialite_id: string | null
}

const REGIONS = ['Grand Montréal', 'Montréal', 'Laval', 'Rive-Sud', 'Rive-Nord', 'Québec', 'Estrie', 'Outaouais']

const initialState: SoumissionFormState = { success: false }

const inp: React.CSSProperties = {
  width: '100%', padding: '10px 12px', borderRadius: '8px',
  border: '1px solid #E8E6E1', fontSize: '0.875rem', color: '#18170F',
  background: 'white', outline: 'none', fontFamily: 'inherit',
  boxSizing: 'border-box',
}

function SoumissionModal({ demande, onClose }: { demande: Demande; onClose: () => void }) {
  const [state, formAction, pending] = useActionState(createSoumission, initialState)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (state.success) { toast.success('Offre envoyée avec succès !'); onClose() }
    else if (state.error && (state as { code?: string }).code !== 'upgrade_required') toast.error(state.error)
  }, [state, onClose])

  return (
    <div
      ref={overlayRef}
      onClick={e => e.target === overlayRef.current && onClose()}
      style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.5)', padding: '20px' }}
    >
      <div style={{ background: 'white', borderRadius: '16px', width: '100%', maxWidth: '480px', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #F0EEEA' }}>
          <span style={{ fontSize: '1rem', fontWeight: 700, color: '#18170F' }}>Soumettre une offre</span>
          <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: '50%', border: '1px solid #E8E6E1', background: 'white', cursor: 'pointer', fontSize: '0.9rem', color: '#6B6860', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
        </div>
        {/* Context */}
        <div style={{ padding: '12px 24px', background: '#F9F8F6', borderBottom: '1px solid #F0EEEA' }}>
          <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#18170F' }}>{demande.titre}</span>
          {demande.region && <span style={{ fontSize: '0.78rem', color: '#6B6860' }}> · {demande.region}</span>}
        </div>
        {/* Form */}
        <form action={formAction} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input type="hidden" name="demande_id" value={demande.id} />
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#18170F', marginBottom: '6px' }}>Montant ($) *</label>
            <input type="number" name="montant" min={1} required placeholder="Ex. : 12 500" style={inp} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#18170F', marginBottom: '6px' }}>Délai estimé</label>
            <input type="text" name="delai" placeholder="Ex. : 3 semaines" style={inp} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#18170F', marginBottom: '6px' }}>Message</label>
            <textarea name="message" rows={4} placeholder="Présentez votre offre, votre expérience..." style={{ ...inp, resize: 'vertical' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '8px', borderTop: '1px solid #F0EEEA' }}>
            <button type="button" onClick={onClose} style={{ padding: '9px 18px', borderRadius: '8px', border: '1px solid #E8E6E1', background: 'white', fontSize: '0.875rem', fontWeight: 500, color: '#6B6860', cursor: 'pointer', fontFamily: 'inherit' }}>Annuler</button>
            <button type="submit" disabled={pending} style={{ padding: '9px 20px', borderRadius: '8px', background: '#18170F', color: 'white', border: 'none', fontSize: '0.875rem', fontWeight: 600, cursor: pending ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: pending ? 0.6 : 1 }}>
              {pending ? 'Envoi…' : "Envoyer l'offre"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const cols = 'minmax(0,2fr) 120px 110px 110px 80px 110px'

export default function DemandesDisponibles({ demandes, specialites, isPro }: {
  demandes: Demande[]
  specialites: Pick<Specialite, 'id' | 'nom'>[]
  isPro: boolean
}) {
  const [filtreSpec, setFiltreSpec] = useState('')
  const [filtreRegion, setFiltreRegion] = useState('')
  const [modal, setModal] = useState<Demande | null>(null)

  const filtrees = demandes.filter(d => {
    if (filtreSpec && d.specialite_id !== filtreSpec) return false
    if (filtreRegion && d.region !== filtreRegion) return false
    return true
  })

  const selStyle: React.CSSProperties = {
    padding: '8px 12px', borderRadius: '8px', border: '1px solid #E8E6E1',
    fontSize: '0.82rem', color: '#18170F', background: 'white', outline: 'none', cursor: 'pointer',
  }

  return (
    <div>
      {/* Upgrade banner */}
      {!isPro && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '12px', padding: '14px 20px', marginBottom: '20px', gap: '12px' }}>
          <span style={{ fontSize: '0.875rem', color: '#92400E', fontWeight: 500 }}>Passez au plan Pro pour soumettre des offres sur les demandes.</span>
          <a href="/dashboard/abonnement" style={{ fontSize: '0.78rem', fontWeight: 700, padding: '7px 14px', borderRadius: '8px', background: '#18170F', color: 'white', textDecoration: 'none', whiteSpace: 'nowrap' }}>Voir les plans</a>
        </div>
      )}

      {/* Filtres */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
        <select value={filtreSpec} onChange={e => setFiltreSpec(e.target.value)} style={selStyle}>
          <option value="">Toutes les spécialités</option>
          {specialites.map(s => <option key={s.id} value={s.id}>{s.nom}</option>)}
        </select>
        <select value={filtreRegion} onChange={e => setFiltreRegion(e.target.value)} style={selStyle}>
          <option value="">Toutes les régions</option>
          {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        {(filtreSpec || filtreRegion) && (
          <button onClick={() => { setFiltreSpec(''); setFiltreRegion('') }} style={{ fontSize: '0.78rem', color: '#6B6860', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}>
            Réinitialiser
          </button>
        )}
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#6B6860' }}>
          {filtrees.length} résultat{filtrees.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Table */}
      <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '14px', overflow: 'hidden' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: 0, padding: '10px 20px', background: '#F9F8F6', borderBottom: '1px solid #F0EEEA' }}>
          {['Projet', 'Entreprise', 'Région', 'Secteur', 'Date', 'Action'].map((h, i) => (
            <div key={h} style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', paddingRight: '12px', paddingLeft: i === 0 ? 0 : 0 }}>{h}</div>
          ))}
        </div>

        {filtrees.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: '#6B6860', margin: 0 }}>Aucune demande correspond à vos filtres.</p>
          </div>
        ) : filtrees.map((d, i) => (
          <div key={d.id} style={{ display: 'grid', gridTemplateColumns: cols, gap: 0, padding: '14px 20px', borderBottom: i < filtrees.length - 1 ? '1px solid #F0EEEA' : 'none', alignItems: 'center' }}>
            <div style={{ paddingRight: '12px', minWidth: 0 }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18170F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.titre}</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: d.statut === 'urgent' ? '#dc2626' : '#16a34a', flexShrink: 0 }} />
                <span style={{ fontSize: '0.7rem', color: '#6B6860', textTransform: 'capitalize' }}>{d.statut}</span>
              </div>
            </div>
            <span style={{ fontSize: '0.78rem', color: '#6B6860', paddingRight: '12px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.entreprise_nom ?? '—'}</span>
            <span style={{ fontSize: '0.78rem', color: '#6B6860', paddingRight: '12px', textTransform: 'capitalize' }}>{d.region ?? '—'}</span>
            <span style={{ fontSize: '0.78rem', color: '#6B6860', paddingRight: '12px' }}>{d.secteur ?? '—'}</span>
            <span style={{ fontSize: '0.78rem', color: '#6B6860', paddingRight: '12px' }}>
              {d.date_debut ? new Date(d.date_debut).toLocaleDateString('fr-CA', { day: 'numeric', month: 'short' }) : '—'}
            </span>
            <div>
              {isPro ? (
                <button onClick={() => setModal(d)} style={{ fontSize: '0.75rem', fontWeight: 700, padding: '6px 12px', borderRadius: '7px', background: '#18170F', color: 'white', border: 'none', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                  Soumettre
                </button>
              ) : (
                <a href="/dashboard/abonnement" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textDecoration: 'none' }}>Upgrader →</a>
              )}
            </div>
          </div>
        ))}
      </div>

      {modal && <SoumissionModal demande={modal} onClose={() => setModal(null)} />}
    </div>
  )
}
