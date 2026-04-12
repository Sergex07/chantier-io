export default function ProcessSection() {
  const steps = [
    {
      num: '01',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#18170F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
          <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      ),
      titre: 'Décrivez votre projet',
      desc: 'En 2 minutes. Type de travaux, superficie, budget, photos optionnelles.',
    },
    {
      num: '02',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#18170F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.13 1.2 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
      titre: 'Recevez des soumissions',
      desc: 'Des pros qualifiés de votre région vous contactent sous 24–48h.',
    },
    {
      num: '03',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#18170F" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      ),
      titre: 'Choisissez votre entrepreneur',
      desc: 'Comparez les profils, notes et prix. Choisissez en confiance.',
    },
  ]

  return (
    <section style={{ padding: '80px 40px', background: 'white' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.03em', marginBottom: '12px' }}>
            Simple, rapide, gratuit
          </h2>
          <p style={{ fontSize: '1rem', color: '#6B6860', maxWidth: '480px', margin: '0 auto', lineHeight: 1.6 }}>
            Trouvez le bon entrepreneur pour vos travaux en 3 étapes simples
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              position: 'relative',
              padding: '36px 32px',
              background: '#F9F8F6',
              borderRadius: '20px',
              overflow: 'hidden',
            }}>
              {/* Grand chiffre décoratif */}
              <div style={{
                position: 'absolute',
                top: '-12px',
                right: '16px',
                fontSize: '6rem',
                fontWeight: 700,
                color: '#ECEAE5',
                lineHeight: 1,
                letterSpacing: '-0.04em',
                userSelect: 'none',
                pointerEvents: 'none',
              }}>
                {step.num}
              </div>

              {/* Icône */}
              <div style={{
                width: '44px', height: '44px',
                background: 'white',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                position: 'relative', zIndex: 1,
              }}>
                {step.icon}
              </div>

              <h3 style={{
                fontSize: '1rem', fontWeight: 500, color: '#18170F',
                margin: '0 0 10px', letterSpacing: '-0.01em',
                position: 'relative', zIndex: 1,
              }}>
                {step.titre}
              </h3>
              <p style={{
                fontSize: '0.85rem', color: '#6B6860',
                lineHeight: 1.65, margin: 0,
                position: 'relative', zIndex: 1,
              }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <a href="/demande-soumission" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '13px 32px', background: '#18170F', color: 'white',
            borderRadius: '100px', textDecoration: 'none',
            fontSize: '0.9rem', fontWeight: 500,
          }}>
            Publier une demande gratuitement →
          </a>
          <p style={{ fontSize: '0.78rem', color: '#9B9891', marginTop: '10px' }}>
            Gratuit · Sans engagement · Jusqu'à 3 soumissions
          </p>
        </div>

      </div>
    </section>
  )
}
