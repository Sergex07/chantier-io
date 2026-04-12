'use client'

const CATEGORIES = [
  { icon: '⚡', label: 'Électricité', href: '/demande-soumission?type=Électricité' },
  { icon: '🔧', label: 'Plomberie', href: '/demande-soumission?type=Plomberie' },
  { icon: '🏠', label: 'Toiture', href: '/demande-soumission?type=Toiture' },
  { icon: '🎨', label: 'Peinture', href: '/demande-soumission?type=Peinture' },
]

export default function FeaturedSection() {
  return (
    <section style={{ padding: '64px 40px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
              EN VEDETTE
            </p>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
              Ce qui se passe sur Chantier.io
            </h2>
          </div>
          <a href="/demande-soumission" style={{ fontSize: '0.82rem', color: '#6B6860', textDecoration: 'none' }}>
            Publier une demande →
          </a>
        </div>

        {/* Bento grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px' }}>

          {/* Grande card pro — span 2 rows */}
          <a href="/profil/demo-id" style={{
            gridColumn: '1', gridRow: '1 / 3',
            display: 'block', textDecoration: 'none',
            borderRadius: '20px', overflow: 'hidden',
            position: 'relative', minHeight: '360px',
            backgroundImage: 'url(https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800&q=80)',
            backgroundSize: 'cover', backgroundPosition: 'center',
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.01)'; (e.currentTarget as HTMLAnchorElement).style.transition = 'transform 0.3s' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)' }} />
            <div style={{ position: 'absolute', top: '16px', left: '16px' }}>
              <span style={{ background: 'white', fontSize: '0.68rem', fontWeight: 600, padding: '4px 10px', borderRadius: '100px', color: '#18170F' }}>
                ✓ Vérifié
              </span>
            </div>
            <div style={{ position: 'absolute', bottom: '24px', left: '24px', right: '24px' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '6px' }}>
                ÉLECTRICITÉ · MONTRÉAL
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 500, color: 'white', letterSpacing: '-0.02em', marginBottom: '4px' }}>
                Voltex Électrique inc.
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.8)' }}>★ 4.97 · 148 projets</span>
                <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>À partir de 85$/h</span>
              </div>
            </div>
          </a>

          {/* 4 catégories — 2×2 */}
          {CATEGORIES.map((cat, i) => (
            <a key={i} href={cat.href} style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: '8px', padding: '20px',
              background: '#F9F8F6', borderRadius: '16px',
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#F0EEEA' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#F9F8F6' }}
            >
              <span style={{ fontSize: '1.6rem' }}>{cat.icon}</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#18170F' }}>{cat.label}</span>
            </a>
          ))}

        </div>

        {/* Rangée détaillants */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '12px' }}>
          {[
            { nom: 'The Home Depot', cat: 'Matériaux · Outils', bg: '#F96302', initiales: 'HD', delai: '24–48h' },
            { nom: 'RONA inc.', cat: 'Bois · Toiture · Fenestration', bg: '#005B99', initiales: 'RONA', delai: 'Même jour' },
            { nom: 'Groupe BMR', cat: 'Béton · Isolation · Revêtement', bg: '#00843D', initiales: 'BMR', delai: '24h' },
          ].map((d, i) => (
            <a key={i} href="#" style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '16px 18px',
              background: '#F9F8F6', borderRadius: '14px',
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#F0EEEA' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#F9F8F6' }}
            >
              <div style={{ width: 40, height: 40, borderRadius: '10px', background: d.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: d.initiales.length > 2 ? '0.65rem' : '0.82rem', fontWeight: 700, flexShrink: 0 }}>
                {d.initiales}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#18170F', marginBottom: '2px' }}>{d.nom}</div>
                <div style={{ fontSize: '0.72rem', color: '#9B9891' }}>{d.cat}</div>
              </div>
              <span style={{ fontSize: '0.68rem', fontWeight: 600, color: '#6B6860', background: 'white', padding: '3px 8px', borderRadius: '100px', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {d.delai}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
