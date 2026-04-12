'use client'

const DETAILLANTS = [
  { nom: 'The Home Depot', cat: 'Matériaux · Outils · Électricité', bg: '#F96302', initiales: 'HD' },
  { nom: 'RONA inc.', cat: 'Bois · Toiture · Fenestration', bg: '#005B99', initiales: 'RONA' },
  { nom: 'Groupe BMR', cat: 'Béton · Isolation · Revêtement', bg: '#00843D', initiales: 'BMR' },
]

const PROS_VEDETTE = [
  { initiales: 'VE', nom: 'Voltex Électrique', specialite: 'Électricité commerciale', ville: 'Montréal', note: '4.9', couleur: '#1D4ED8' },
  { initiales: 'AP', nom: 'Aqua Pro Plomberie', specialite: 'Plomberie résidentielle', ville: 'Laval', note: '4.8', couleur: '#0369A1' },
  { initiales: 'CB', nom: 'Construction Boisvert', specialite: 'Charpenterie · Toiture', ville: 'Québec', note: '4.9', couleur: '#15803D' },
]

export default function PartenaireVedetteSection() {
  return (
    <section style={{ padding: '80px 40px', background: '#F9F8F6' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
              PARTENAIRES
            </p>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
              Nos partenaires
            </h2>
          </div>
          <a href="/partenaires" style={{ fontSize: '0.82rem', color: '#6B6860', textDecoration: 'none', fontWeight: 400 }}>
            Devenir partenaire →
          </a>
        </div>

        {/* Détaillants */}
        <div style={{ marginBottom: '12px' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
            Fournisseurs de matériaux
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {DETAILLANTS.map((d, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px 18px',
                border: '1px solid #E8E6E1', borderRadius: '12px',
                cursor: 'pointer', transition: 'box-shadow 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '10px',
                  background: d.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: d.initiales.length > 2 ? '0.72rem' : '0.9rem', fontWeight: 700, flexShrink: 0,
                }}>
                  {d.initiales}
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18170F', marginBottom: '2px' }}>{d.nom}</div>
                  <div style={{ fontSize: '0.72rem', color: '#9B9891' }}>{d.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pros vedette */}
        <div style={{ marginTop: '24px' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>
            Professionnels vérifiés
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {PROS_VEDETTE.map((p, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: '14px',
                padding: '16px 18px',
                border: '1px solid #E8E6E1', borderRadius: '12px',
                cursor: 'pointer', transition: 'box-shadow 0.15s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none' }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: p.couleur,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '0.82rem', fontWeight: 600, flexShrink: 0,
                }}>
                  {p.initiales}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18170F', marginBottom: '2px' }}>{p.nom}</div>
                  <div style={{ fontSize: '0.72rem', color: '#9B9891' }}>{p.specialite} · {p.ville}</div>
                </div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#18170F', flexShrink: 0 }}>★ {p.note}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
