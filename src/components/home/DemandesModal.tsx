'use client'
import { useState } from 'react'
import FiltresCategories from './FiltresCategories'

const DEMANDES = [
  {
    specialite: 'Électricité',
    name: 'Électricité commerciale — Phase 2', gc: 'GC Construction Laval · Laval',
    badge: 'Urgent', badgeBg: '#FFF0ED', badgeColor: '#C0392B',
    date: '14 avr.', sector: 'Commercial', offres: '6 offres',
    budget: '40 000 – 55 000 $', region: 'Laval',
    desc: 'Installation électrique complète pour un bâtiment commercial de 4 étages en phase 2. Travaux incluant tableaux électriques, circuits, éclairage et système de sécurité.',
    reqs: ['Licence RBQ obligatoire', 'Attestation CCQ requise', 'Assurance responsabilité 2M$+', 'Expérience bâtiment commercial 5 ans+'],
    files: [{ name: 'Plans électriques - Phase 2.pdf', size: '4.2 MB' }, { name: 'Devis technique.pdf', size: '1.8 MB' }],
  },
  {
    specialite: 'Toiture',
    name: 'Toiture membrane — Bâtiment commercial', gc: 'Immeubles Beaumont · Montréal',
    badge: 'Nouveau', badgeBg: '#EDF8FF', badgeColor: '#1A7ABF',
    date: '30 avr.', sector: 'Commercial', offres: '2 offres',
    budget: '80 000 $+', region: 'Montréal',
    desc: "Remplacement complet de la toiture membrane d'un bâtiment commercial de 12 000 pc.",
    reqs: ['Expérience toiture commerciale', 'Licence RBQ', 'Garantie 10 ans minimum'],
    files: [{ name: 'Plan de toiture.pdf', size: '2.9 MB' }],
  },
  {
    specialite: 'Fondation',
    name: 'Dalle de béton — Entrepôt 8 000 pc', gc: 'Groupe Industriel RS · Rive-Sud',
    badge: 'Nouveau', badgeBg: '#EDF8FF', badgeColor: '#1A7ABF',
    date: '1 mai', sector: 'Industriel', offres: '4 offres',
    budget: '65 000 $', region: 'Rive-Sud',
    desc: "Coulée d'une dalle de béton industriel de 8 000 pieds carrés pour un entrepôt logistique.",
    reqs: ['Expérience dalle industrielle', 'Certification béton'],
    files: [{ name: 'Plan architectural.pdf', size: '6.1 MB' }],
  },
  {
    specialite: 'HVAC',
    name: 'Système HVAC — Multilogement 32 unités', gc: 'Développement Nordique · Laval',
    badge: 'Urgent', badgeBg: '#FFF0ED', badgeColor: '#C0392B',
    date: '22 avr.', sector: 'Résidentiel', offres: '1 offre',
    budget: '35 000 $', region: 'Laval',
    desc: "Installation d'un système HVAC centralisé pour un immeuble multilogement de 32 unités.",
    reqs: ['Licence RBQ chauffage-climatisation', 'Démarrage urgent'],
    files: [{ name: 'Schéma HVAC.pdf', size: '3.4 MB' }],
  },
  {
    specialite: 'Charpenterie',
    name: 'Charpenterie — Structure bois 3 étages', gc: 'Constructions Paradis · Québec',
    badge: 'Nouveau', badgeBg: '#EDF8FF', badgeColor: '#1A7ABF',
    date: '5 mai', sector: 'Résidentiel', offres: '3 offres',
    budget: '95 000 $', region: 'Québec',
    desc: "Construction de la structure en bois d'un bâtiment résidentiel de 3 étages.",
    reqs: ['Expérience structure multi-étages', 'Licence RBQ'],
    files: [{ name: 'Plans structuraux.pdf', size: '8.7 MB' }],
  },
  {
    specialite: 'Plomberie',
    name: 'Plomberie — Immeuble 24 unités', gc: 'Les Résidences Dion · Longueuil',
    badge: 'Actif', badgeBg: '#EDFBF0', badgeColor: '#1A8A38',
    date: '10 mai', sector: 'Résidentiel', offres: '5 offres',
    budget: '48 000 $', region: 'Longueuil',
    desc: 'Plomberie complète pour un immeuble résidentiel neuf de 24 unités.',
    reqs: ['Licence maître-plombier', 'CCQ obligatoire'],
    files: [{ name: 'Plans plomberie.pdf', size: '5.3 MB' }],
  },
]

const isConnected = false

function masquerNom(nom: string, connecte: boolean): string {
  if (connecte) return nom
  const mots = nom.split(' ')
  return mots.map(m => m.slice(0, 2) + '*'.repeat(Math.max(m.length - 2, 2))).join(' ')
}

const STATUT_COLORS: Record<string, string> = { Urgent: '#dc2626', Nouveau: '#2563eb', Actif: '#16a34a' }

function SpecialiteIcon({ specialite }: { specialite: string }) {
  const s = { width: 36, height: 36, borderRadius: '8px', background: '#F4F4F5', border: '1px solid #E4E4E7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 } as const
  const icons: Record<string, React.ReactNode> = {
    'Électricité': (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    'Toiture': (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      </svg>
    ),
    'Fondation': (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    'HVAC': (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2 2 0 1 1 19 12H2" />
      </svg>
    ),
    'Charpenterie': (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 12l-8.5 8.5a2.12 2.12 0 01-3-3L12 9" />
        <path d="M17.64 15L22 10.64" />
        <path d="M20.91 11.7l-1.25-1.25c-.6-.6-.93-1.4-.93-2.25v-.86L16.01 4.6a5.56 5.56 0 0 0-3.94-1.64H9l.92.82A6.18 6.18 0 0 1 12 8.4v1.56l2 2h2.47l2.26 1.91" />
      </svg>
    ),
    'Plomberie': (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6M12 22v-6M12 8a4 4 0 0 0 0 8" />
        <path d="M12 16a4 4 0 0 1 0-8" />
      </svg>
    ),
  }
  return (
    <div style={s}>
      {icons[specialite] ?? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" />
        </svg>
      )}
    </div>
  )
}

const cols = 'minmax(0,2fr) 100px 90px 100px 70px 80px 32px'

export default function DemandesTableauInteractif() {
  const [selected, setSelected] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState('Tous')

  const filtered = activeFilter === 'Tous' ? DEMANDES : DEMANDES.filter(d => d.specialite === activeFilter)
  const demande = selected !== null ? DEMANDES[selected] : null

  return (
    <>
      <FiltresCategories onFilter={cat => { setActiveFilter(cat); setSelected(null) }} />

      <div style={{ border: '1px solid #ECEAE6', borderRadius: '16px', overflow: 'hidden', background: 'white' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '0', padding: '10px 20px', background: '#F9F8F6', borderBottom: '1px solid #F0EEEA' }}>
          {['Projet', 'Ville', 'Début', 'Secteur', 'Offres', 'Statut', ''].map((h, i) => (
            <div key={i} style={{ fontSize: '0.7rem', fontWeight: 500, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', paddingLeft: i === 0 ? '48px' : '0', paddingRight: '12px' }}>
              {h}
            </div>
          ))}
        </div>

        {/* Rows */}
        {filtered.map((d, i) => (
          <div
            key={i}
            onClick={() => setSelected(DEMANDES.indexOf(d))}
            onMouseEnter={e => (e.currentTarget.style.background = '#F9F8F6')}
            onMouseLeave={e => (e.currentTarget.style.background = 'white')}
            style={{
              display: 'grid', gridTemplateColumns: cols, gap: '0',
              padding: '14px 20px',
              borderBottom: i < filtered.length - 1 ? '1px solid #F0EEEA' : 'none',
              alignItems: 'center', cursor: 'pointer', background: 'white', transition: 'background 0.1s',
            }}
          >
            {/* Projet */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, paddingRight: '12px' }}>
              <SpecialiteIcon specialite={d.specialite} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#18170F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                <div style={{ fontSize: '0.75rem', color: isConnected ? '#6B6860' : '#B8B5AF', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontStyle: isConnected ? 'normal' : 'italic' }}>
                  {masquerNom(d.gc, isConnected)}
                </div>
              </div>
            </div>

            {/* Ville */}
            <div style={{ paddingRight: '12px' }}>
              <span style={{ fontSize: '0.78rem', color: '#18170F', fontWeight: 500 }}>{d.region}</span>
            </div>

            {/* Début */}
            <div style={{ paddingRight: '12px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#18170F' }}>{d.date}</span>
            </div>

            {/* Secteur */}
            <div style={{ paddingRight: '12px' }}>
              <span style={{ fontSize: '0.78rem', color: '#6B6860' }}>{d.sector}</span>
            </div>

            {/* Offres */}
            <div style={{ paddingRight: '12px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#18170F', lineHeight: 1.2 }}>{d.offres.split(' ')[0]}</div>
              <div style={{ fontSize: '0.68rem', color: '#6B6860' }}>offres</div>
            </div>

            {/* Statut */}
            <div style={{ paddingRight: '12px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', fontWeight: 500, color: '#18170F' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUT_COLORS[d.badge] || '#6B6860', flexShrink: 0 }} />
                {d.badge}
              </span>
            </div>

            {/* Chevron */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.2rem', color: '#D0CEC8', lineHeight: 1 }}>›</span>
            </div>
          </div>
        ))}
        {/* Lock banner */}
        {!isConnected && (
          <div style={{
            marginTop: '0',
            borderTop: '1px solid #E8E6E1',
            padding: '20px 24px',
            background: '#FAFAFA',
            borderRadius: '0 0 14px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', background: '#18170F', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#18170F', marginBottom: '1px' }}>
                  Connectez-vous pour voir les noms complets
                </div>
                <div style={{ fontSize: '0.75rem', color: '#9B9891' }}>
                  Créez un compte gratuit — accès immédiat, aucune carte requise
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <a href="/connexion" style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #E8E6E1', background: 'white', color: '#6B6860', fontSize: '0.78rem', fontWeight: 400, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                Se connecter
              </a>
              <a href="/inscription" style={{ padding: '8px 16px', borderRadius: '8px', background: '#18170F', color: 'white', fontSize: '0.78rem', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                S'inscrire gratuitement →
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {demande && (
        <div
          onClick={() => setSelected(null)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="modal-enter"
            style={{ background: 'white', borderRadius: '20px', padding: '40px', maxWidth: '560px', width: '100%', position: 'relative', boxShadow: '0 20px 60px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <button onClick={() => setSelected(null)} style={{ position: 'absolute', top: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', border: '1px solid #DDDDDD', background: 'white', cursor: 'pointer', fontSize: '0.85rem', color: '#6B6860' }}>✕</button>

            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.68rem', fontWeight: 500, padding: '4px 12px', borderRadius: '999px', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', background: demande.badgeBg, color: demande.badgeColor }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: STATUT_COLORS[demande.badge] || '#6B6860' }} />
              {demande.badge}
            </span>
            <div style={{ fontSize: '1.3rem', fontWeight: 600, color: '#18170F', letterSpacing: '-0.03em', marginBottom: '6px', lineHeight: 1.25 }}>{demande.name}</div>
            <div style={{ fontSize: '0.875rem', color: '#6B6860', marginBottom: '24px' }}>{masquerNom(demande.gc, isConnected)} · {demande.region}</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              {[['Budget', demande.budget], ['Début des travaux', demande.date], ['Région', demande.region], ['Offres reçues', demande.offres]].map(([label, val]) => (
                <div key={label} style={{ background: '#F7F7F7', borderRadius: '10px', padding: '14px 16px' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 500, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 600, color: '#18170F' }}>{val}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '0.72rem', fontWeight: 500, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Description</div>
            <p style={{ fontSize: '0.875rem', color: '#18170F', lineHeight: 1.7, marginBottom: '16px' }}>{demande.desc}</p>

            <div style={{ fontSize: '0.72rem', fontWeight: 500, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginTop: '16px' }}>Exigences</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
              {demande.reqs.map(r => (
                <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#18170F' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4A5568', flexShrink: 0 }} />{r}
                </div>
              ))}
            </div>

            {demande.files.length > 0 && (
              <>
                <div style={{ fontSize: '0.72rem', fontWeight: 500, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', marginTop: '20px' }}>Documents</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '4px' }}>
                  {demande.files.map(f => (
                    <div key={f.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#F7F7F7', border: '1px solid #DDDDDD', borderRadius: '10px' }}>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#18170F' }}>{f.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#6B6860' }}>{f.size}</div>
                      </div>
                      <a href="#" style={{ fontSize: '0.75rem', fontWeight: 500, color: '#18170F', padding: '6px 12px', borderRadius: '7px', border: '1px solid #DDDDDD', background: 'white', textDecoration: 'none' }}>Télécharger</a>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #DDDDDD' }}>
              <a href="/inscription" style={{ flex: 1, textAlign: 'center', background: '#18170F', color: 'white', fontSize: '0.875rem', fontWeight: 500, padding: '13px 0', borderRadius: '10px', textDecoration: 'none', display: 'block' }}>
                Soumettre une offre
              </a>
              <a href="#" style={{ flex: 1, textAlign: 'center', border: '1px solid #DDDDDD', color: '#18170F', fontSize: '0.875rem', fontWeight: 500, padding: '13px 0', borderRadius: '10px', textDecoration: 'none', display: 'block' }}>
                Poser une question
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
