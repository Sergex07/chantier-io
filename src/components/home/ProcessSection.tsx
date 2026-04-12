export default function ProcessSection() {
  const steps = [
    {
      num: '1',
      titre: 'Décrivez votre projet',
      desc: 'En 2 minutes. Type de travaux, superficie, budget, photos optionnelles.',
      img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80',
    },
    {
      num: '2',
      titre: 'Recevez des soumissions',
      desc: 'Des pros qualifiés de votre région vous contactent sous 24–48h.',
      img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80',
    },
    {
      num: '3',
      titre: 'Choisissez votre entrepreneur',
      desc: 'Comparez les profils, notes et prix. Choisissez en confiance.',
      img: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80',
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '32px' }}>
          {steps.map((step, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                height: '200px',
                backgroundImage: `url(${step.img})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                borderRadius: '16px', marginBottom: '24px', position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: '12px', left: '12px',
                  width: '32px', height: '32px', borderRadius: '50%',
                  background: 'white', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '0.85rem', fontWeight: 700,
                  color: '#18170F', boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}>
                  {step.num}
                </div>
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
