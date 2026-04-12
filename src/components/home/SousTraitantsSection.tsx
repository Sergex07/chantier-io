'use client'

const PROS = [
  { nom: 'Voltex Électrique inc.', specialite: 'Électricité', ville: 'Laval', note: '4.97', projets: 148, tarif: '85 $/h', img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80' },
  { nom: 'Aqua Pro Plomberie', specialite: 'Plomberie', ville: 'Montréal', note: '4.91', projets: 92, tarif: '75 $/h', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
  { nom: 'Construction Boisvert', specialite: 'Charpenterie', ville: 'Rive-Nord', note: '4.88', projets: 211, tarif: '70 $/h', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' },
]

function Card({ p }: { p: typeof PROS[0] }) {
  return (
    <a
      href="/profil/demo-id"
      style={{ borderRadius: 16, overflow: 'hidden', cursor: 'pointer', border: '1px solid #E8E6E1', transition: 'box-shadow 0.2s, transform 0.2s', background: 'white', textDecoration: 'none', display: 'block' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; el.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
    >
      <div style={{ height: 224, backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', overflow: 'hidden' }}>
        <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: 100 }}>{p.specialite}</span>
        <span style={{ position: 'absolute', top: 12, right: 12, background: 'white', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 600, boxShadow: '0 1px 6px rgba(0,0,0,0.15)' }}>✓</span>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#18170F' }}>{p.nom}</div>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#18170F' }}>★ {p.note}</div>
        </div>
        <div style={{ fontSize: '0.78rem', color: '#6B6860', marginTop: 4 }}>{p.ville} · {p.projets} projets</div>
        <div style={{ fontSize: '0.875rem', color: '#18170F', marginTop: 8 }}>À partir de <strong>{p.tarif}</strong></div>
      </div>
    </a>
  )
}

export default function SousTraitantsSection() {
  return (
    <section style={{ padding: '80px 40px', background: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
              PROFESSIONNELS VÉRIFIÉS
            </p>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
              Sous-traitants en vedette
            </h2>
          </div>
          <a href="/profil/demo-id" style={{ fontSize: '0.82rem', color: '#6B6860', textDecoration: 'none', fontWeight: 400 }}>
            Voir tous les profils →
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 24 }}>
          {PROS.map((p, i) => <Card key={i} p={p} />)}
        </div>
      </div>
    </section>
  )
}
