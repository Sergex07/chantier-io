export default function CTAFinalSection() {
  return (
    <section style={{ background: '#18170F', padding: '96px 40px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, letterSpacing: '-0.03em', color: 'white', lineHeight: 1.2, marginBottom: '16px' }}>
          Prêt à démarrer votre projet?
        </h2>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', margin: '0 auto 40px', lineHeight: 1.65 }}>
          Rejoignez 1 458 entrepreneurs et propriétaires qui font confiance à Chantier.io
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <a href="/demande-soumission" style={{
            background: 'white', color: '#18170F',
            fontSize: '0.9rem', fontWeight: 500,
            padding: '13px 28px', borderRadius: '100px',
            textDecoration: 'none', display: 'inline-block',
          }}>
            Publier une demande →
          </a>
          <a href="/inscription" style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '0.9rem', fontWeight: 400,
            padding: '12px 28px', borderRadius: '100px',
            textDecoration: 'none', display: 'inline-block',
            border: '1px solid rgba(255,255,255,0.25)',
          }}>
            S'inscrire gratuitement
          </a>
        </div>
      </div>
    </section>
  )
}
