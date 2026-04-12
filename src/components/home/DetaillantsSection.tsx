'use client'

const DETAILLANTS = [
  { nom: 'The Home Depot', meta: '12 succursales · Livraison chantier', cat: 'Matériaux · Outils · Électricité · Plomberie', note: '4.8', bg: '#F96302', initiales: 'HD', delai: '24–48h' },
  { nom: 'RONA inc.', meta: 'Réseau québécois · Compte pro disponible', cat: 'Bois · Toiture · Fenestration · Quincaillerie', note: '4.7', bg: '#005B99', initiales: 'RONA', delai: 'Même jour' },
  { nom: 'Groupe BMR', meta: '100% québécois · 300+ points de vente', cat: 'Béton · Isolation · Revêtement · Intérieur', note: '4.6', bg: '#00843D', initiales: 'BMR', delai: '24h' },
]

function Card({ d }: { d: typeof DETAILLANTS[0] }) {
  return (
    <div
      style={{ borderRadius: 16, overflow: 'hidden', cursor: 'pointer', border: '1px solid #E8E6E1', transition: 'box-shadow 0.2s, transform 0.2s', background: 'white' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; el.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
    >
      <div style={{ height: 180, background: d.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <span style={{ fontSize: d.initiales.length > 2 ? '2.2rem' : '3rem', fontWeight: 600, color: 'white', letterSpacing: '-0.02em' }}>{d.initiales}</span>
        <span style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '0.68rem', fontWeight: 600, padding: '3px 10px', borderRadius: 100 }}>
          ✓ Livraison {d.delai}
        </span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#18170F' }}>{d.nom}</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#18170F' }}>★ {d.note}</div>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#6B6860', marginBottom: 6 }}>{d.meta}</div>
        <div style={{ fontSize: '0.78rem', color: '#18170F' }}>{d.cat}</div>
      </div>
    </div>
  )
}

export default function DetaillantsSection() {
  return (
    <section style={{ padding: '80px 40px', background: '#F9F8F6' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
              DÉTAILLANTS
            </p>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
              Fournisseurs de matériaux
            </h2>
          </div>
          <a href="#" style={{ fontSize: '0.82rem', color: '#6B6860', textDecoration: 'none', fontWeight: 400 }}>
            Voir tout →
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {DETAILLANTS.map((d, i) => <Card key={i} d={d} />)}
        </div>
      </div>
    </section>
  )
}
