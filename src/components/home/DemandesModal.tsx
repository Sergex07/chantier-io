'use client'
import { useState } from 'react'
import FiltresCategories from './FiltresCategories'

const DEMANDES = [
  {
    specialite: 'Électricité',
    icon: '⚡', name: 'Électricité commerciale — Phase 2', gc: 'GC Construction Laval · Laval',
    badge: 'Urgent', badgeBg: '#FFF0ED', badgeColor: '#C0392B',
    date: '14 avr.', sector: 'Commercial', offres: '6 offres',
    budget: '40 000 – 55 000 $', region: 'Laval',
    desc: 'Installation électrique complète pour un bâtiment commercial de 4 étages en phase 2. Travaux incluant tableaux électriques, circuits, éclairage et système de sécurité.',
    reqs: ['Licence RBQ obligatoire', 'Attestation CCQ requise', 'Assurance responsabilité 2M$+', 'Expérience bâtiment commercial 5 ans+'],
    files: [{ name: 'Plans électriques - Phase 2.pdf', size: '4.2 MB' }, { name: 'Devis technique.pdf', size: '1.8 MB' }],
  },
  {
    specialite: 'Toiture',
    icon: '🏠', name: 'Toiture membrane — Bâtiment commercial', gc: 'Immeubles Beaumont · Montréal',
    badge: 'Nouveau', badgeBg: '#EDF8FF', badgeColor: '#1A7ABF',
    date: '30 avr.', sector: 'Commercial', offres: '2 offres',
    budget: '80 000 $+', region: 'Montréal',
    desc: 'Remplacement complet de la toiture membrane d\'un bâtiment commercial de 12 000 pc.',
    reqs: ['Expérience toiture commerciale', 'Licence RBQ', 'Garantie 10 ans minimum'],
    files: [{ name: 'Plan de toiture.pdf', size: '2.9 MB' }],
  },
  {
    specialite: 'Fondation',
    icon: '🏗️', name: 'Dalle de béton — Entrepôt 8 000 pc', gc: 'Groupe Industriel RS · Rive-Sud',
    badge: 'Nouveau', badgeBg: '#EDF8FF', badgeColor: '#1A7ABF',
    date: '1 mai', sector: 'Industriel', offres: '4 offres',
    budget: '65 000 $', region: 'Rive-Sud',
    desc: 'Coulée d\'une dalle de béton industriel de 8 000 pieds carrés pour un entrepôt logistique.',
    reqs: ['Expérience dalle industrielle', 'Certification béton'],
    files: [{ name: 'Plan architectural.pdf', size: '6.1 MB' }],
  },
  {
    specialite: 'HVAC',
    icon: '❄️', name: 'Système HVAC — Multilogement 32 unités', gc: 'Développement Nordique · Laval',
    badge: 'Urgent', badgeBg: '#FFF0ED', badgeColor: '#C0392B',
    date: '22 avr.', sector: 'Résidentiel', offres: '1 offre',
    budget: '35 000 $', region: 'Laval',
    desc: 'Installation d\'un système HVAC centralisé pour un immeuble multilogement de 32 unités.',
    reqs: ['Licence RBQ chauffage-climatisation', 'Démarrage urgent'],
    files: [{ name: 'Schéma HVAC.pdf', size: '3.4 MB' }],
  },
  {
    specialite: 'Charpenterie',
    icon: '🪵', name: 'Charpenterie — Structure bois 3 étages', gc: 'Constructions Paradis · Québec',
    badge: 'Nouveau', badgeBg: '#EDF8FF', badgeColor: '#1A7ABF',
    date: '5 mai', sector: 'Résidentiel', offres: '3 offres',
    budget: '95 000 $', region: 'Québec',
    desc: 'Construction de la structure en bois d\'un bâtiment résidentiel de 3 étages.',
    reqs: ['Expérience structure multi-étages', 'Licence RBQ'],
    files: [{ name: 'Plans structuraux.pdf', size: '8.7 MB' }],
  },
  {
    specialite: 'Plomberie',
    icon: '🔧', name: 'Plomberie — Immeuble 24 unités', gc: 'Les Résidences Dion · Longueuil',
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

const cols = '2fr 100px 90px 90px 100px 80px 110px 28px'

export default function DemandesTableauInteractif() {
  const [selected, setSelected] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState('Tous')

  const filtered = activeFilter === 'Tous' ? DEMANDES : DEMANDES.filter(d => d.specialite === activeFilter)
  const demande = selected !== null ? DEMANDES[selected] : null

  return (
    <>
      <FiltresCategories onFilter={cat => { setActiveFilter(cat); setSelected(null) }} />
      <div style={{ border: '1px solid #DDDDDD', borderRadius: '16px', overflow: 'hidden', background: 'white' }}>
        {/* Header */}
        <div style={{ display: 'grid', gridTemplateColumns: cols, gap: '12px', padding: '10px 20px', background: '#F7F7F7', borderBottom: '1px solid #DDDDDD' }}>
          {['Projet', 'Ville', 'Statut', 'Début', 'Secteur', 'Offres', 'Action', ''].map((h, i) => (
            <div key={i} style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.07em', paddingLeft: i === 0 ? '44px' : 0 }}>
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
            style={{ display: 'grid', gridTemplateColumns: cols, gap: '12px', padding: '14px 20px', borderBottom: i < filtered.length - 1 ? '1px solid #DDDDDD' : 'none', alignItems: 'center', cursor: 'pointer', background: 'white' }}
          >
            {/* Project */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
              <div style={{ width: 36, height: 36, borderRadius: '9px', background: '#F4F4F5', border: '1px solid #E4E4E7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                {d.icon}
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18170F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</div>
                <div style={{ fontSize: '0.75rem', color: isConnected ? '#6B6860' : '#B0AEA8', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontStyle: isConnected ? 'normal' : 'italic' }}>{masquerNom(d.gc, isConnected)}</div>
              </div>
            </div>
            {/* Ville */}
            <span style={{ fontSize: '0.78rem', color: '#18170F', fontWeight: 500 }}>{d.region}</span>
            {/* Badge */}
            <span style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: '999px', textTransform: 'uppercase', background: d.badgeBg, color: d.badgeColor }}>
              {d.badge}
            </span>
            {/* Date */}
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#18170F' }}>{d.date}</span>
            {/* Sector */}
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6B6860', background: '#F7F7F7', border: '1px solid #DDDDDD', padding: '3px 8px', borderRadius: '999px', display: 'inline-block' }}>{d.sector}</span>
            {/* Offres */}
            <span style={{ fontSize: '0.78rem', color: '#6B6860' }}>{d.offres}</span>
            {/* CTA */}
            <a href="/inscription" onClick={e => e.stopPropagation()} style={{ fontSize: '0.72rem', fontWeight: 700, padding: '7px 10px', borderRadius: '8px', background: '#4A5568', color: 'white', textDecoration: 'none', textAlign: 'center', display: 'inline-block' }}>
              Soumettre
            </a>
            {/* Arrow */}
            <span style={{ fontSize: '1.3rem', color: '#B0B0B0', textAlign: 'center' }}>›</span>
          </div>
        ))}
      </div>

      {/* Lock banner */}
      {!isConnected && (
        <div style={{ marginTop: '12px', padding: '14px 20px', background: '#FFFBF0', border: '1px solid #F0E0A0', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.1rem' }}>🔒</span>
            <span style={{ fontSize: '0.85rem', color: '#7A6020', fontWeight: 500 }}>Connectez-vous pour voir les noms complets des demandeurs et soumettre une offre.</span>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="/connexion" style={{ fontSize: '0.78rem', fontWeight: 600, padding: '7px 14px', borderRadius: '8px', border: '1px solid #D4B84A', color: '#7A6020', textDecoration: 'none', background: 'white', display: 'inline-block' }}>Se connecter</a>
            <a href="/inscription" style={{ fontSize: '0.78rem', fontWeight: 700, padding: '7px 14px', borderRadius: '8px', background: '#18170F', color: 'white', textDecoration: 'none', display: 'inline-block' }}>S'inscrire →</a>
          </div>
        </div>
      )}

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

            <span style={{ display: 'inline-block', fontSize: '0.68rem', fontWeight: 700, padding: '4px 12px', borderRadius: '999px', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.05em', background: demande.badgeBg, color: demande.badgeColor }}>
              {demande.icon} {demande.badge}
            </span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#18170F', letterSpacing: '-0.03em', marginBottom: '6px', lineHeight: 1.25 }}>{demande.name}</div>
            <div style={{ fontSize: '0.875rem', color: '#6B6860', marginBottom: '24px' }}>{demande.gc} · {demande.region}</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
              {[['Budget', demande.budget], ['Début des travaux', demande.date], ['Région', demande.region], ['Offres reçues', demande.offres]].map(([label, val]) => (
                <div key={label} style={{ background: '#F7F7F7', borderRadius: '10px', padding: '14px 16px' }}>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: '#18170F' }}>{val}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Description</div>
            <p style={{ fontSize: '0.875rem', color: '#18170F', lineHeight: 1.7, marginBottom: '16px' }}>{demande.desc}</p>

            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px', marginTop: '16px' }}>Exigences</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
              {demande.reqs.map(r => (
                <div key={r} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#18170F' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4A5568', flexShrink: 0 }} />{r}
                </div>
              ))}
            </div>

            {demande.files.length > 0 && (
              <>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '10px', marginTop: '20px' }}>Documents</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '4px' }}>
                  {demande.files.map(f => (
                    <div key={f.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: '#F7F7F7', border: '1px solid #DDDDDD', borderRadius: '10px' }}>
                      <div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#18170F' }}>{f.name}</div>
                        <div style={{ fontSize: '0.72rem', color: '#6B6860' }}>{f.size}</div>
                      </div>
                      <a href="#" style={{ fontSize: '0.75rem', fontWeight: 600, color: '#18170F', padding: '6px 12px', borderRadius: '7px', border: '1px solid #DDDDDD', background: 'white', textDecoration: 'none' }}>Télécharger</a>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #DDDDDD' }}>
              <a href="/inscription" style={{ flex: 1, textAlign: 'center', background: '#18170F', color: 'white', fontSize: '0.875rem', fontWeight: 700, padding: '13px 0', borderRadius: '10px', textDecoration: 'none', display: 'block' }}>
                Soumettre une offre
              </a>
              <a href="#" style={{ flex: 1, textAlign: 'center', border: '1px solid #DDDDDD', color: '#18170F', fontSize: '0.875rem', fontWeight: 600, padding: '13px 0', borderRadius: '10px', textDecoration: 'none', display: 'block' }}>
                Poser une question
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
