export default function ProDoubleCtaSection() {
  return (
    <section style={{ padding: '48px 40px 0', background: '#F9F8F6' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <p style={{
          fontSize: '0.75rem', fontWeight: 600, color: '#9B9891',
          textTransform: 'uppercase', letterSpacing: '0.1em',
          marginBottom: '8px', textAlign: 'center',
        }}>
          SELON VOTRE BESOIN
        </p>
        <h2 style={{
          fontSize: '1.2rem', fontWeight: 400, color: '#18170F',
          letterSpacing: '-0.02em', marginBottom: '28px',
          textAlign: 'center', lineHeight: 1.4,
        }}>
          Chantier.io s'adapte à ce que vous cherchez
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
          {[
            {
              icon: '📂',
              label: 'SOUS-TRAITANT · ENT. GÉNÉRAL',
              titre: 'Je cherche des contrats',
              desc: 'Parcourez les demandes ouvertes dans votre spécialité et soumissionnez directement.',
              cta: 'Voir les demandes →',
              href: '/dashboard/demandes-disponibles',
            },
            {
              icon: '📋',
              label: 'ENTREPRENEUR GÉNÉRAL',
              titre: 'Je cherche un sous-traitant',
              desc: 'Publiez une demande et recevez des offres de pros qualifiés en 24–48h.',
              cta: 'Publier une demande →',
              href: '/demande-soumission',
            },
            {
              icon: '👷',
              label: 'RECRUTEMENT',
              titre: 'Je cherche des employés',
              desc: 'Accédez au réseau de travailleurs qualifiés disponibles dans votre région.',
              cta: 'Trouver des travailleurs →',
              href: '/trouver-travailleur',
            },
          ].map((card, i) => (
            <a key={i} href={card.href} style={{
              display: 'block', textDecoration: 'none',
              padding: '24px', borderRadius: '14px',
              border: 'none', background: 'white',
              boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              transition: 'box-shadow 0.15s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.09)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.06)' }}
            >
              <div style={{ fontSize: '1.4rem', marginBottom: '12px' }}>{card.icon}</div>
              <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#9B9891', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '6px' }}>
                {card.label}
              </div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 500, color: '#18170F', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                {card.titre}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#6B6860', lineHeight: 1.6, margin: '0 0 16px' }}>
                {card.desc}
              </p>
              <span style={{ fontSize: '0.82rem', fontWeight: 500, color: '#18170F' }}>
                {card.cta}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  )
}
