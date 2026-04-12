export default function ProStatsSection() {
  return (
    <section style={{ padding: '48px 40px', background: 'white', borderTop: '1px solid #F0EEEA' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            POURQUOI CHANTIER.IO
          </p>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', maxWidth: '400px', lineHeight: 1.3, margin: 0 }}>
            La plateforme de référence pour les professionnels de la construction
          </h2>
        </div>

        {/* Stats en ligne — style minimal */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0', borderTop: '1px solid #E8E6E1' }}>
          {[
            { num: '247', label: 'Demandes actives', sub: 'Cette semaine' },
            { num: '89', label: 'Villes couvertes', sub: 'Au Québec' },
            { num: '1 458', label: 'Professionnels', sub: 'Inscrits' },
            { num: '48h', label: 'Délai moyen', sub: 'Pour recevoir des offres' },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              padding: '32px 24px',
              borderRight: i < 3 ? '1px solid #E8E6E1' : 'none',
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.04em', marginBottom: '6px' }}>
                {stat.num}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#18170F', marginBottom: '3px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9B9891' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        {/* CTA discret */}
        <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid #F0EEEA', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '0.85rem', color: '#6B6860', maxWidth: '400px', lineHeight: 1.5, margin: 0 }}>
            Commencez gratuitement — 30 jours d'essai Pro inclus, sans carte de crédit.
          </p>
          <a href="/inscription" style={{
            padding: '10px 24px', background: '#18170F', color: 'white',
            borderRadius: '9px', textDecoration: 'none', fontSize: '0.85rem',
            fontWeight: 500, whiteSpace: 'nowrap',
          }}>
            Créer mon compte Pro →
          </a>
        </div>

      </div>
    </section>
  )
}
