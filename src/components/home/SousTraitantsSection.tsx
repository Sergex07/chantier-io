'use client'
import { useRegion } from '@/lib/useRegion'

type Pro = {
  nom: string; spec: string; ville: string
  note: string; projets: number; tarif: string; img: string
}

const PROS_PAR_REGION: Record<string, Pro[]> = {
  'Laval': [
    { nom: 'Voltex Électrique', spec: 'Électricité', ville: 'Laval', note: '4.97', projets: 148, tarif: '85$/h', img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80' },
    { nom: 'Aqua Pro Plomberie', spec: 'Plomberie', ville: 'Laval', note: '4.91', projets: 92, tarif: '75$/h', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { nom: 'Construction Boisvert', spec: 'Charpenterie', ville: 'Laval', note: '4.88', projets: 211, tarif: '70$/h', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' },
  ],
  'Montréal': [
    { nom: 'Électro MTL', spec: 'Électricité', ville: 'Montréal', note: '4.95', projets: 203, tarif: '90$/h', img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80' },
    { nom: 'Plomberie Dupont', spec: 'Plomberie', ville: 'Montréal', note: '4.89', projets: 145, tarif: '80$/h', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { nom: 'Atelier Moreau', spec: 'Charpenterie', ville: 'Montréal', note: '4.92', projets: 178, tarif: '85$/h', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' },
  ],
  'Québec': [
    { nom: 'Électricité Capitale', spec: 'Électricité', ville: 'Québec', note: '4.93', projets: 167, tarif: '82$/h', img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80' },
    { nom: 'Plomberie Vézina', spec: 'Plomberie', ville: 'Québec', note: '4.87', projets: 98, tarif: '72$/h', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { nom: 'Construction Paradis', spec: 'Charpenterie', ville: 'Québec', note: '4.91', projets: 134, tarif: '68$/h', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' },
  ],
  'Rive-Nord': [
    { nom: 'Électro Rive-Nord', spec: 'Électricité', ville: 'Terrebonne', note: '4.94', projets: 121, tarif: '78$/h', img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80' },
    { nom: 'Plomberie Hamel', spec: 'Plomberie', ville: 'Blainville', note: '4.88', projets: 87, tarif: '74$/h', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { nom: 'Construction Rive-Nord', spec: 'Charpenterie', ville: 'Lorraine', note: '4.85', projets: 156, tarif: '71$/h', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' },
  ],
  'Rive-Sud': [
    { nom: 'Électricité Rive-Sud', spec: 'Électricité', ville: 'Longueuil', note: '4.90', projets: 112, tarif: '80$/h', img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80' },
    { nom: 'Plomberie Brossard', spec: 'Plomberie', ville: 'Brossard', note: '4.86', projets: 79, tarif: '73$/h', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { nom: 'Construction Rive-Sud', spec: 'Charpenterie', ville: 'Longueuil', note: '4.83', projets: 143, tarif: '69$/h', img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' },
  ],
}

const PROS_DEFAULT = PROS_PAR_REGION['Montréal']

export default function SousTraitantsSection() {
  const { region, loading } = useRegion()
  const pros = region ? (PROS_PAR_REGION[region] ?? PROS_DEFAULT) : PROS_DEFAULT

  return (
    <section style={{ padding: '80px 40px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
              PROFESSIONNELS VÉRIFIÉS
            </p>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
              {loading ? 'En vedette' : `En vedette · ${region}`}
            </h2>
          </div>
          <a href="/profil/demo-id" style={{ fontSize: '0.82rem', color: '#6B6860', textDecoration: 'none', fontWeight: 400 }}>
            Voir tous les profils →
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
          {pros.map((p, i) => (
            <a key={i} href="/profil/demo-id"
              style={{ textDecoration: 'none', display: 'block', borderRadius: '16px', overflow: 'hidden', border: '1px solid #E8E6E1', background: 'white', transition: 'box-shadow 0.2s, transform 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; el.style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
            >
              <div style={{ height: '224px', backgroundImage: `url(${p.img})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: '0.7rem', fontWeight: 600, padding: '3px 10px', borderRadius: '100px' }}>
                  {p.spec}
                </span>
                <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'white', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: 600, boxShadow: '0 1px 6px rgba(0,0,0,0.15)' }}>✓</span>
              </div>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ fontWeight: 500, fontSize: '0.9rem', color: '#18170F' }}>{p.nom}</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 500, color: '#18170F' }}>★ {p.note}</div>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#6B6860', marginTop: '4px' }}>{p.ville} · {p.projets} projets</div>
                <div style={{ fontSize: '0.875rem', color: '#18170F', marginTop: '6px' }}>À partir de <strong>{p.tarif}</strong></div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
