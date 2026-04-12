'use client'
import { useRegion } from '@/lib/useRegion'

const CATEGORIES = [
  { icon: '🏠', label: 'Toiture', count: '47 pros', href: '/demande-soumission?type=Toiture' },
  { icon: '🚿', label: 'Salle de bain', count: '89 pros', href: '/demande-soumission?type=Salle+de+bain' },
  { icon: '🍳', label: 'Cuisine', count: '62 pros', href: '/demande-soumission?type=Cuisine' },
  { icon: '⚡', label: 'Électricité', count: '124 pros', href: '/demande-soumission?type=Électricité' },
  { icon: '🔧', label: 'Plomberie', count: '98 pros', href: '/demande-soumission?type=Plomberie' },
  { icon: '🎨', label: 'Peinture', count: '76 pros', href: '/demande-soumission?type=Peinture' },
  { icon: '🏗️', label: 'Fondation', count: '34 pros', href: '/demande-soumission?type=Fondation' },
  { icon: '❄️', label: 'HVAC', count: '58 pros', href: '/demande-soumission?type=HVAC' },
  { icon: '🪟', label: 'Portes & Fenêtres', count: '43 pros', href: '/demande-soumission?type=Fenêtres' },
  { icon: '🪨', label: 'Maçonnerie', count: '29 pros', href: '/demande-soumission?type=Maçonnerie' },
  { icon: '🌿', label: 'Aménagement ext.', count: '51 pros', href: '/demande-soumission?type=Aménagement' },
  { icon: '🔨', label: 'Charpenterie', count: '67 pros', href: '/demande-soumission?type=Charpenterie' },
]

export default function CategoriesSection() {
  const { region } = useRegion()

  return (
    <section style={{ padding: '80px 40px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
              TYPES DE TRAVAUX
            </p>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', margin: '0 0 6px' }}>
              Quel type de travaux?
            </h2>
            <p style={{ color: '#6B6860', fontSize: '0.9rem', margin: 0 }}>
              {region ? `Professionnels disponibles près de ${region}` : 'Cliquez sur une catégorie pour démarrer votre demande'}
            </p>
          </div>
          <a href="/demande-soumission" style={{ fontSize: '0.82rem', color: '#6B6860', textDecoration: 'none', fontWeight: 400 }}>
            Publier une demande →
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {CATEGORIES.map((cat, i) => (
            <a
              key={i}
              href={cat.href}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '24px 16px', background: 'white',
                border: '1px solid #E8E6E1', borderRadius: '14px',
                textDecoration: 'none', cursor: 'pointer',
                transition: 'box-shadow 0.15s, transform 0.15s',
                gap: '8px',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
            >
              <span style={{ fontSize: '1.8rem' }}>{cat.icon}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#18170F', textAlign: 'center' }}>{cat.label}</span>
              <span style={{ fontSize: '0.72rem', color: '#9B9891' }}>{cat.count}</span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
