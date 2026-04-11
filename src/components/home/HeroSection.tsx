import Link from 'next/link'

const CTA_ITEMS = [
  {
    href: '/dashboard/demandes/nouvelle',
    icon: '📋',
    title: 'Publier une demande de soumission',
    desc: 'Trouvez des sous-traitants qualifiés en quelques heures',
  },
  {
    href: '/professionnels',
    icon: '🔍',
    title: 'Trouver un professionnel',
    desc: 'Sous-traitants, designers, architectes, détaillants',
  },
  {
    href: '/demandes',
    icon: '💼',
    title: 'Trouver un contrat',
    desc: 'Parcourez les demandes ouvertes dans votre spécialité',
  },
  {
    href: '/emplois',
    icon: '👔',
    title: 'Trouver un emploi',
    desc: 'Postes disponibles dans la construction au Québec',
  },
]

export default function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh',
      backgroundImage: 'url(https://images.unsplash.com/photo-1590579491624-f98f36d4c763?w=1800&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, padding: '0 20px', maxWidth: 768, width: '100%', margin: '0 auto' }}>
        <h1 style={{
          fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
          fontWeight: 800,
          color: 'white',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: 18,
          textShadow: '0 2px 20px rgba(0,0,0,0.3)',
        }}>
          Trouvez les bons partenaires pour vos chantiers
        </h1>
        <p style={{
          fontSize: '1.15rem',
          color: 'rgba(255,255,255,0.88)',
          marginBottom: 36,
          fontWeight: 400,
          textShadow: '0 1px 8px rgba(0,0,0,0.3)',
        }}>
          Sous-traitants, designers, architectes, détaillants — tous vos partenaires au Québec
        </p>

        {/* CTA Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: 'white',
          borderRadius: 18,
          boxShadow: '0 4px 30px rgba(0,0,0,0.22)',
          overflow: 'hidden',
          maxWidth: 680,
          margin: '0 auto',
        }}>
          {CTA_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '20px 22px',
                textDecoration: 'none',
                textAlign: 'left',
                borderRight: i % 2 === 0 ? '1px solid #eee' : 'none',
                borderBottom: i < 2 ? '1px solid #eee' : 'none',
                background: 'white',
              }}
            >
              <div style={{
                width: 44,
                height: 44,
                background: '#4A5568',
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#18170F', letterSpacing: '-0.02em', marginBottom: 3, lineHeight: 1.3 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B6860', lineHeight: 1.4 }}>{item.desc}</div>
              </div>
              <div style={{ fontSize: '1.4rem', color: '#B0B0B0', flexShrink: 0, lineHeight: 1 }}>›</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
