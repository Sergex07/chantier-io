import Link from 'next/link'

const ROWS = [
  { icon: '⚡', name: 'Électricité commerciale — Phase 2', gc: 'GC Construction Laval · Laval', badge: 'Urgent', badgeBg: '#FFF0ED', badgeColor: '#C0392B', date: '14 avr.', sector: 'Commercial', offres: '6 offres' },
  { icon: '🏠', name: 'Toiture membrane — Bâtiment commercial', gc: 'Immeubles Beaumont · Montréal', badge: 'Nouveau', badgeBg: '#EDF8FF', badgeColor: '#1A7ABF', date: '30 avr.', sector: 'Commercial', offres: '2 offres' },
  { icon: '🏗️', name: 'Dalle de béton — Entrepôt 8 000 pc', gc: 'Groupe Industriel RS · Rive-Sud', badge: 'Nouveau', badgeBg: '#EDF8FF', badgeColor: '#1A7ABF', date: '1 mai', sector: 'Industriel', offres: '4 offres' },
  { icon: '❄️', name: 'Système HVAC — Multilogement 32 unités', gc: 'Développement Nordique · Laval', badge: 'Urgent', badgeBg: '#FFF0ED', badgeColor: '#C0392B', date: '22 avr.', sector: 'Résidentiel', offres: '1 offre' },
  { icon: '🪵', name: 'Charpenterie — Structure bois 3 étages', gc: 'Constructions Paradis · Québec', badge: 'Nouveau', badgeBg: '#EDF8FF', badgeColor: '#1A7ABF', date: '5 mai', sector: 'Résidentiel', offres: '3 offres' },
  { icon: '🔧', name: 'Plomberie — Immeuble 24 unités', gc: 'Les Résidences Dion · Longueuil', badge: 'Actif', badgeBg: '#EDFBF0', badgeColor: '#1A8A38', date: '10 mai', sector: 'Résidentiel', offres: '5 offres' },
]

export default function AppelsSoumissionsSection() {
  return (
    <section style={{ padding: '64px 40px', background: '#F7F7F7' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#18170F' }}>Demandes de soumissions en cours</h2>
          <Link href="/demandes" style={{ fontSize: '0.875rem', color: '#18170F', fontWeight: 600, textDecoration: 'underline' }}>
            Voir toutes les demandes →
          </Link>
        </div>

        <div style={{ border: '1px solid #DDDDDD', borderRadius: '16px', overflow: 'hidden', background: 'white' }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 100px 80px 110px', gap: '12px', padding: '10px 20px', background: '#F7F7F7', borderBottom: '1px solid #DDDDDD' }}>
            {['Projet', 'Statut', 'Début', 'Secteur', 'Offres', 'Action'].map((h, i) => (
              <div key={i} style={{ fontSize: '0.68rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.07em', paddingLeft: i === 0 ? '44px' : 0 }}>
                {h}
              </div>
            ))}
          </div>

          {ROWS.map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 90px 90px 100px 80px 110px', gap: '12px', padding: '14px 20px', borderBottom: i < ROWS.length - 1 ? '1px solid #DDDDDD' : 'none', alignItems: 'center', background: 'white' }}>
              {/* Project */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                <div style={{ width: 36, height: 36, borderRadius: '9px', background: '#F4F4F5', border: '1px solid #E4E4E7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>
                  {row.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18170F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#6B6860', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.gc}</div>
                </div>
              </div>

              {/* Badge */}
              <span style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 700, padding: '3px 9px', borderRadius: '999px', textTransform: 'uppercase', background: row.badgeBg, color: row.badgeColor }}>
                {row.badge}
              </span>

              {/* Date */}
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#18170F' }}>{row.date}</span>

              {/* Sector */}
              <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6B6860', background: '#F7F7F7', border: '1px solid #DDDDDD', padding: '3px 8px', borderRadius: '999px', display: 'inline-block' }}>{row.sector}</span>

              {/* Offres */}
              <span style={{ fontSize: '0.78rem', color: '#6B6860' }}>{row.offres}</span>

              {/* CTA */}
              <Link href="/inscription" style={{ fontSize: '0.72rem', fontWeight: 700, padding: '7px 10px', borderRadius: '8px', background: '#4A5568', color: 'white', textDecoration: 'none', textAlign: 'center', display: 'inline-block' }}>
                Soumettre
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
