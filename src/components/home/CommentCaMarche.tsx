const STEPS = [
  {
    num: '01',
    titre: 'Publiez votre demande',
    desc: 'Décrivez votre projet en 2 minutes. Photos, plans, budget — tout ce dont les pros ont besoin.',
  },
  {
    num: '02',
    titre: 'Recevez des soumissions',
    desc: 'Des entrepreneurs qualifiés de votre région vous contactent sous 24–48h.',
  },
  {
    num: '03',
    titre: 'Choisissez votre pro',
    desc: 'Comparez les profils, les notes et les prix. Choisissez en toute confiance.',
  },
]

export default function CommentCaMarche() {
  return (
    <section style={{ padding: '64px 40px', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center', fontSize: '1.3rem', fontWeight: 500,
          color: '#18170F', marginBottom: '48px', letterSpacing: '-0.02em',
        }}>
          Simple, rapide, efficace
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '40px' }}>
          {STEPS.map(step => (
            <div key={step.num} style={{ textAlign: 'center', padding: '0 20px' }}>
              <div style={{
                fontSize: '2.5rem', fontWeight: 200, color: '#D0CEC8',
                letterSpacing: '-0.04em', marginBottom: '16px', fontVariantNumeric: 'tabular-nums',
              }}>
                {step.num}
              </div>
              <h3 style={{
                fontSize: '0.95rem', fontWeight: 500, color: '#18170F',
                marginBottom: '10px', letterSpacing: '-0.01em',
              }}>
                {step.titre}
              </h3>
              <p style={{ fontSize: '0.82rem', color: '#6B6860', lineHeight: 1.65, margin: 0 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
