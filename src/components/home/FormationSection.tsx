const formations = [
  { titre: 'Certification ASP Construction', org: 'ASP Construction', duree: '1 jour', format: 'En personne', prix: 'Gratuit CCQ', icon: '🦺' },
  { titre: 'Travail en hauteur sécuritaire', org: 'Commission CCQ', duree: '2 jours', format: 'En personne', prix: '295$', icon: '🪜' },
  { titre: 'SIMDUT 2015 — Mise à jour', org: 'En ligne', duree: '3 heures', format: 'En ligne', prix: '49$', icon: '⚗️' },
  { titre: 'Premiers secours en milieu de travail', org: 'Croix-Rouge', duree: '2 jours', format: 'En personne', prix: '185$', icon: '🩹' },
]

const formatBadge = (format: string) =>
  format === 'En ligne'
    ? { bg: '#EFF6FF', text: '#2563EB' }
    : { bg: '#F0FDF4', text: '#16A34A' }

export default function FormationSection() {
  return (
    <section style={{ padding: '80px 40px', background: 'white' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
            FORMATION
          </p>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
            Développez vos compétences
          </h2>
        </div>

        {/* Grille 2 colonnes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {formations.map((f, i) => {
            const badge = formatBadge(f.format)
            return (
              <div key={i} style={{
                background: 'white', border: '1px solid #E8E6E1',
                borderRadius: '14px', padding: '24px',
                display: 'flex', flexDirection: 'column', gap: '14px',
              }}>
                {/* Icône + titre + org */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '10px',
                    background: '#F9F8F6', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0,
                  }}>
                    {f.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#18170F', margin: '0 0 3px', lineHeight: 1.35 }}>
                      {f.titre}
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#6B6860', margin: 0 }}>
                      {f.org}
                    </p>
                  </div>
                </div>

                {/* Footer : badge + durée + prix + bouton */}
                <div style={{ borderTop: '1px solid #F0EEEA', paddingTop: '14px', display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 500, background: badge.bg, color: badge.text }}>
                    {f.format}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#9B9891' }}>⏱ {f.duree}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#18170F', marginLeft: 'auto' }}>
                    {f.prix}
                  </span>
                  <a href="/formations" style={{
                    padding: '6px 14px', border: '1px solid #E8E6E1', borderRadius: '100px',
                    textDecoration: 'none', fontSize: '0.75rem', color: '#18170F', fontWeight: 400,
                    background: 'white', whiteSpace: 'nowrap',
                  }}>
                    En savoir plus →
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
