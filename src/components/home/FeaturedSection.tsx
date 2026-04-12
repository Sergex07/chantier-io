'use client'

const CATEGORIES = [
  { icon: '🍳', label: 'Rénover sa cuisine', href: '/demande-soumission?type=Cuisine' },
  { icon: '🚿', label: 'Rénover sa salle de bain', href: '/demande-soumission?type=Salle+de+bain' },
  { icon: '🔨', label: 'Rénovation générale', href: '/demande-soumission?type=Rénovation' },
  { icon: '🏡', label: 'Rénovation extérieure', href: '/demande-soumission?type=Rénovation+extérieure' },
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
              Trouver les meilleurs partenaires pour votre projet
            </h2>
          </div>
          <a href="/demande-soumission" style={{ fontSize: '0.82rem', color: '#6B6860', textDecoration: 'none' }}>
            Publier une demande →
          </a>
        </div>

        {/* Bento grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: 'auto auto', gap: '12px' }}>

          {/* Grande card value prop */}
          <a href="/demande-soumission" style={{
            gridColumn: '1', gridRow: '1 / 3',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            textDecoration: 'none',
            borderRadius: '20px', overflow: 'hidden',
            position: 'relative', minHeight: '360px',
            backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '36px',
          }}>
            {/* Overlay sombre */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.62)', pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', padding: '5px 12px', marginBottom: '24px' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ADE80', flexShrink: 0, display: 'block' }} />
                <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>247 demandes actives au Québec</span>
              </div>
              <h3 style={{ fontSize: '1.9rem', fontWeight: 500, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.15, margin: '0 0 20px', maxWidth: '320px' }}>
                Trouvez le bon pro pour votre projet en 48h
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  '1 458 entrepreneurs vérifiés',
                  'Soumissions gratuites, sans engagement',
                  'Partout au Québec',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polyline points="2 6 5 9 10 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative', zIndex: 1, marginTop: '32px' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'white', color: '#18170F', fontSize: '0.875rem', fontWeight: 500, padding: '11px 22px', borderRadius: '100px' }}>
                Publier une demande gratuitement →
              </span>
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
            { icon: '🏦', label: 'Refinancer ma maison', desc: 'Évaluez vos options de refinancement', href: '/demande-soumission?type=Refinancement' },
            { icon: '🏷️', label: 'Vendre ma maison', desc: 'Préparez votre propriété pour la vente', href: '/demande-soumission?type=Vente' },
            { icon: '🏗️', label: 'Construction neuve', desc: 'Bâtissez votre projet de A à Z', href: '/demande-soumission?type=Construction+neuve' },
          ].map((d, i) => (
            <a key={i} href={d.href} style={{
              display: 'flex', alignItems: 'center', gap: '14px',
              padding: '16px 18px',
              background: '#F9F8F6', borderRadius: '14px',
              textDecoration: 'none',
              transition: 'background 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#F0EEEA' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#F9F8F6' }}
            >
              <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
                {d.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#18170F', marginBottom: '2px' }}>{d.label}</div>
                <div style={{ fontSize: '0.72rem', color: '#9B9891' }}>{d.desc}</div>
              </div>
              <span style={{ color: '#D0CEC8', fontSize: '1.1rem', flexShrink: 0 }}>›</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
