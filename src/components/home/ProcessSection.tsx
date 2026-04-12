export default function ProcessSection() {
  return (
    <section style={{ padding: '80px 40px', background: '#F9F8F6' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '10px' }}>
            COMMENT ÇA MARCHE
          </p>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.03em', margin: 0 }}>
            Trouvez votre entrepreneur en 3 étapes simples
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '2px' }}>
          {[
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#18170F" strokeWidth="1.5">
                  <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              ),
              num: '01',
              titre: 'Décrivez votre projet',
              desc: 'En 2 minutes, expliquez vos travaux, votre budget et votre calendrier. Photos et plans bienvenus.',
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#18170F" strokeWidth="1.5">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.13 1.2 2 2 0 012.11 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.09a16 16 0 006 6l.45-.45a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                </svg>
              ),
              num: '02',
              titre: 'Recevez des soumissions',
              desc: 'Des entrepreneurs qualifiés de votre région vous contactent directement sous 24 à 48 heures.',
            },
            {
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#18170F" strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ),
              num: '03',
              titre: 'Choisissez votre pro',
              desc: 'Comparez les profils, les évaluations et les prix. Choisissez en toute confiance.',
            },
          ].map((step, i) => (
            <div key={i} style={{
              padding: '40px 32px',
              background: 'white',
              borderRadius: i === 0 ? '16px 0 0 16px' : i === 2 ? '0 16px 16px 0' : '0',
              borderRight: i < 2 ? '1px solid #F0EEEA' : 'none',
              textAlign: 'left',
            }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: '#F4F4F5', display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: '20px',
              }}>
                {step.icon}
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9B9891', letterSpacing: '0.08em', marginBottom: '8px' }}>
                ÉTAPE {step.num}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 500, color: '#18170F', marginBottom: '10px', letterSpacing: '-0.01em', margin: '0 0 10px' }}>
                {step.titre}
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#6B6860', lineHeight: 1.65, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a href="/demande-soumission" style={{
            display: 'inline-block', padding: '12px 28px',
            background: '#18170F', color: 'white',
            borderRadius: '100px', textDecoration: 'none',
            fontSize: '0.875rem', fontWeight: 500,
          }}>
            Publier une demande gratuitement →
          </a>
        </div>
      </div>
    </section>
  )
}
