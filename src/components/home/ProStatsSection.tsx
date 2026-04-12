export default function ProStatsSection() {
  return (
    <section style={{ padding: '48px 40px', background: 'white', borderBottom: '1px solid #F0EEEA' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Bannière pro */}
        <div style={{
          background: '#18170F', borderRadius: '16px', padding: '32px 40px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '24px',
          marginBottom: '40px',
        }}>
          <div>
            <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '6px' }}>
              ESPACE PROFESSIONNEL
            </p>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: 'white', letterSpacing: '-0.02em', marginBottom: '6px' }}>
              Trouvez vos prochains contrats
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>
              Nouvelles demandes ajoutées chaque jour par des entrepreneurs et clients directs
            </p>
          </div>
          <div style={{ flexShrink: 0 }}>
            <a href="/inscription" style={{
              padding: '10px 20px', background: 'white', color: '#18170F',
              borderRadius: '9px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500,
              display: 'inline-block',
            }}>
              Créer mon profil Pro →
            </a>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px' }}>
          {[
            { num: '247', label: 'Demandes actives', sub: 'Cette semaine' },
            { num: '89', label: 'Villes couvertes', sub: 'Au Québec' },
            { num: '1 458', label: 'Entrepreneurs', sub: 'Inscrits' },
            { num: '48h', label: 'Délai moyen', sub: 'Pour recevoir des offres' },
          ].map(stat => (
            <div key={stat.label} style={{
              padding: '20px', background: '#F9F8F6', borderRadius: '12px',
              border: '1px solid #E8E6E1', textAlign: 'center',
            }}>
              <div style={{ fontSize: '1.8rem', fontWeight: 600, color: '#18170F', letterSpacing: '-0.04em', marginBottom: '4px' }}>
                {stat.num}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 500, color: '#18170F', marginBottom: '2px' }}>
                {stat.label}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#9B9891' }}>{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
