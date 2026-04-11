import Link from 'next/link'

export default function CTAFinalSection() {
  return (
    <div style={{
      background: '#18170F',
      padding: '96px 40px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
      margin: '0 40px 80px',
      borderRadius: '28px',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute',
        top: '-30%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '700px',
        height: '500px',
        background: 'radial-gradient(ellipse, rgba(74,85,104,0.25) 0%, transparent 65%)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.5vw, 2.8rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: 'white',
          lineHeight: 1.1,
          marginBottom: '14px',
        }}>
          Prêt à transformer vos chantiers ?
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '44ch',
          margin: '0 auto 32px',
          lineHeight: 1.65,
        }}>
          Rejoignez les entrepreneurs et sous-traitants québécois qui font confiance à Chantier.io pour chaque projet.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <Link href="/inscription" style={{
            background: '#4A5568',
            color: 'white',
            fontSize: '0.95rem',
            fontWeight: 700,
            padding: '14px 28px',
            borderRadius: '12px',
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            Commencer gratuitement →
          </Link>
          <a href="#" style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '0.95rem',
            fontWeight: 500,
            padding: '14px 20px',
            borderRadius: '12px',
            textDecoration: 'none',
            display: 'inline-block',
          }}>
            Voir une démo ↗
          </a>
        </div>
      </div>
    </div>
  )
}
