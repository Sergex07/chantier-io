export default function ProProcessSection() {
  const steps = [
    { titre: 'Créez votre profil', desc: 'Spécialités, région, certifications CCQ/RBQ. Gratuit, 5 minutes.' },
    { titre: 'Recevez des alertes', desc: 'Nouvelles demandes dans votre spécialité et votre région.' },
    { titre: 'Soumissionnez', desc: 'Envoyez votre offre directement au demandeur.' },
    { titre: 'Décrochez le contrat', desc: 'Le client vous contacte. Vous négociez et commencez.' },
  ]

  return (
    <section style={{ padding: '80px 40px', background: 'white' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '8px' }}>
            COMMENT ÇA MARCHE
          </p>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
            De l'inscription au premier contrat
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '24px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '14px',
              border: '1px solid #F0EEEA',
              padding: '28px 20px',
              textAlign: 'center',
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%',
                background: '#18170F', color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.78rem', fontWeight: 600, margin: '0 auto 16px',
              }}>
                {i + 1}
              </div>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#18170F', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
                {step.titre}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#6B6860', lineHeight: 1.6, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a href="/inscription" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '12px 28px', background: '#18170F', color: 'white',
            borderRadius: '100px', textDecoration: 'none',
            fontSize: '0.875rem', fontWeight: 500,
          }}>
            Créer mon profil Pro gratuitement →
          </a>
          <p style={{ fontSize: '0.75rem', color: '#9B9891', marginTop: '8px' }}>
            30 jours d'essai Pro inclus · Aucune carte requise
          </p>
        </div>

      </div>
    </section>
  )
}
