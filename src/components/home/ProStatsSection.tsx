export default function ProStatsSection() {
  return (
    <section style={{ padding: '64px 40px', background: '#18170F' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
            POURQUOI CHANTIER.IO
          </p>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: 'white', letterSpacing: '-0.02em', maxWidth: '400px', lineHeight: 1.3, margin: 0 }}>
            La plateforme de référence pour les professionnels de la construction
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { num: '247', label: 'Demandes actives', sub: 'Cette semaine' },
            { num: '89', label: 'Villes couvertes', sub: 'Au Québec' },
            { num: '1 458', label: 'Professionnels', sub: 'Inscrits' },
            { num: '48h', label: 'Délai moyen', sub: 'Pour recevoir des offres' },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              padding: '32px 24px',
              borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
            }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 500, color: 'white', letterSpacing: '-0.04em', marginBottom: '6px' }}>
                {stat.num}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)', marginBottom: '3px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{stat.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '32px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', maxWidth: '400px', lineHeight: 1.5, margin: 0 }}>
            Commencez gratuitement — 30 jours d'essai Pro inclus, sans carte de crédit.
          </p>
          <a href="/inscription" style={{
            padding: '10px 24px', background: 'white', color: '#18170F',
            borderRadius: '100px', textDecoration: 'none', fontSize: '0.85rem',
            fontWeight: 500, whiteSpace: 'nowrap',
          }}>
            Créer mon compte Pro →
          </a>
        </div>

      </div>
    </section>
  )
}
