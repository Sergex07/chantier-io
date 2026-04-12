'use client'

const DETAILLANTS = [
  { nom: 'The Home Depot', meta: '12 succursales · Livraison chantier', cat: 'Matériaux · Outils · Électricité · Plomberie', note: '4.8', bg: '#F96302', initiales: 'HD' },
  { nom: 'RONA inc.', meta: 'Réseau québécois · Compte pro disponible', cat: 'Bois · Toiture · Fenestration · Quincaillerie', note: '4.7', bg: '#005B99', initiales: 'RONA' },
  { nom: 'Groupe BMR', meta: '100% québécois · 300+ points de vente', cat: 'Béton · Isolation · Revêtement · Intérieur', note: '4.6', bg: '#00843D', initiales: 'BMR' },
]

function Card({ d }: { d: typeof DETAILLANTS[0] }) {
  return (
    <div
      style={{ borderRadius: 16, overflow: 'hidden', cursor: 'pointer', border: '1px solid #E8E6E1', transition: 'box-shadow 0.2s, transform 0.2s', background: 'white' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; el.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
    >
      <div style={{ height: 224, background: d.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: d.initiales.length > 2 ? '2.2rem' : '3rem', fontWeight: 600, color: 'white', letterSpacing: '-0.02em' }}>{d.initiales}</span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#18170F' }}>{d.nom}</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#18170F' }}>★ {d.note}</div>
        </div>
        <div style={{ fontSize: '0.78rem', color: '#6B6860', marginTop: 4 }}>{d.meta}</div>
        <div style={{ fontSize: '0.875rem', color: '#18170F', marginTop: 8 }}>{d.cat}</div>
      </div>
    </div>
  )
}

export default function DetaillantsSection() {
  return (
    <section style={{ padding: '0 40px 64px', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#18170F', letterSpacing: '-0.03em' }}>Détaillants en vedette</h2>
          <a href="#" style={{ fontSize: '0.875rem', color: '#18170F', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: 3 }}>Voir tous les détaillants →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {DETAILLANTS.map((d, i) => <Card key={i} d={d} />)}
        </div>
      </div>
    </section>
  )
}
