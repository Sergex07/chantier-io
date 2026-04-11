'use client'

const PROS = [
  { nom: 'Atelier Moreau Architectes', specialite: 'Architecture', ville: 'Montréal', note: '4.96', projets: 83, cat: 'Résidentiel & commercial', img: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=600&q=80' },
  { nom: 'Studio Leblanc Design', specialite: 'Design intérieur', ville: 'Québec', note: '4.94', projets: 61, cat: 'Résidentiel haut de gamme', img: 'https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?w=600&q=80' },
  { nom: 'Tremblay Génie-Conseil', specialite: 'Ingénierie', ville: 'Laval', note: '4.91', projets: 127, cat: 'Structure & mécanique', img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80' },
]

function Card({ p }: { p: typeof PROS[0] }) {
  return (
    <div
      style={{ borderRadius: 16, overflow: 'hidden', cursor: 'pointer', border: '1px solid #E8E6E1', transition: 'box-shadow 0.2s, transform 0.2s', background: 'white' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; el.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
    >
      <div style={{ height: 224, backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.7rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>{p.specialite}</span>
        <span style={{ position: 'absolute', top: 12, right: 12, background: 'white', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700, boxShadow: '0 1px 6px rgba(0,0,0,0.15)' }}>✓</span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#18170F' }}>{p.nom}</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#18170F' }}>★ {p.note}</div>
        </div>
        <div style={{ fontSize: '0.78rem', color: '#6B6860', marginTop: 4 }}>{p.ville} · {p.projets} projets</div>
        <div style={{ fontSize: '0.875rem', color: '#18170F', marginTop: 8 }}>{p.cat}</div>
      </div>
    </div>
  )
}

export default function ProfessionnelsSection() {
  return (
    <section style={{ padding: '0 40px 64px', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#18170F', letterSpacing: '-0.03em' }}>Professionnels en vedette</h2>
          <a href="#" style={{ fontSize: '0.875rem', color: '#18170F', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: 3 }}>Voir tous les professionnels →</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {PROS.map((p, i) => <Card key={i} p={p} />)}
        </div>
      </div>
    </section>
  )
}
