'use client'

const CATEGORIES = [
  {
    label: 'Électricité',
    sub: 'Panneau, circuits, éclairage',
    photo: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80',
    href: '/demande-soumission?specialite=Électricité',
  },
  {
    label: 'Plomberie',
    sub: 'Salle de bain, cuisine, drain',
    photo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    href: '/demande-soumission?specialite=Plomberie',
  },
  {
    label: 'Toiture',
    sub: 'Remplacement, réparation, membrane',
    photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    href: '/demande-soumission?specialite=Toiture',
  },
  {
    label: 'Rénovation cuisine',
    sub: 'Armoires, comptoirs, carrelage',
    photo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    href: '/demande-soumission?specialite=Rénovation',
  },
  {
    label: 'Salle de bain',
    sub: 'Douche, bain, céramique',
    photo: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=600&q=80',
    href: '/demande-soumission?specialite=Plomberie',
  },
  {
    label: 'Charpenterie',
    sub: 'Structure, terrasse, escalier',
    photo: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
    href: '/demande-soumission?specialite=Charpenterie',
  },
  {
    label: 'Peinture',
    sub: 'Intérieur, extérieur, enduit',
    photo: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=600&q=80',
    href: '/demande-soumission?specialite=Peinture',
  },
  {
    label: 'HVAC',
    sub: 'Chauffage, climatisation, ventilation',
    photo: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80',
    href: '/demande-soumission?specialite=HVAC',
  },
]

export default function CategoriesSection() {
  return (
    <section style={{ padding: '80px 40px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
              TYPES DE TRAVAUX
            </p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
              Quel type de projet ?
            </h2>
          </div>
          <a href="/demande-soumission" style={{ fontSize: '0.82rem', color: '#6B6860', textDecoration: 'none' }}>
            Publier une demande →
          </a>
        </div>

        {/* Grid 4×2 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          {CATEGORIES.map((cat, i) => (
            <a
              key={i}
              href={cat.href}
              style={{
                position: 'relative', borderRadius: '14px', overflow: 'hidden',
                aspectRatio: '4/3', display: 'block', textDecoration: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                const img = e.currentTarget.querySelector('.cat-img') as HTMLElement
                if (img) img.style.transform = 'scale(1.06)'
              }}
              onMouseLeave={e => {
                const img = e.currentTarget.querySelector('.cat-img') as HTMLElement
                if (img) img.style.transform = 'scale(1)'
              }}
            >
              {/* Photo */}
              <div
                className="cat-img"
                style={{
                  position: 'absolute', inset: 0,
                  backgroundImage: `url(${cat.photo})`,
                  backgroundSize: 'cover', backgroundPosition: 'center',
                  transition: 'transform 0.4s ease',
                }}
              />
              {/* Overlay gradient */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)',
              }} />
              {/* Text */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px' }}>
                <div style={{ fontSize: '0.92rem', fontWeight: 600, color: 'white', letterSpacing: '-0.01em', marginBottom: '2px' }}>
                  {cat.label}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.3 }}>
                  {cat.sub}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA strip */}
        <div style={{ marginTop: '32px', padding: '20px 28px', background: '#F9F8F6', borderRadius: '12px', border: '1px solid #E8E6E1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#18170F', marginBottom: '2px' }}>
              Vous ne trouvez pas votre type de travaux ?
            </div>
            <div style={{ fontSize: '0.78rem', color: '#6B6860' }}>
              Décrivez votre projet et recevez 3 soumissions gratuites sous 48h.
            </div>
          </div>
          <a href="/demande-soumission" style={{
            padding: '10px 22px', background: '#18170F', color: 'white',
            borderRadius: '9px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 500,
            whiteSpace: 'nowrap', flexShrink: 0,
          }}>
            Publier ma demande →
          </a>
        </div>

      </div>
    </section>
  )
}
