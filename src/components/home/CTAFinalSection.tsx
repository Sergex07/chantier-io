export default function CTAFinalSection() {
  return (
    <div style={{
      background: '#4A5568',
      padding: '96px 40px',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontSize: 'clamp(2rem, 3.8vw, 3rem)',
          fontWeight: 800,
          letterSpacing: '-0.04em',
          color: '#fff',
          lineHeight: 1.1,
          marginBottom: '14px'
        }}>
          Prêt à simplifier<br/>vos chantiers ?
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.55)',
          maxWidth: '44ch',
          margin: '0 auto 32px',
          lineHeight: 1.65
        }}>
          Rejoignez les entrepreneurs et sous-traitants québécois
          qui font confiance à Chantier.io pour chaque projet.
        </p>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <a href="/inscription" style={{
            background: '#fff',
            color: '#18170F',
            fontSize: '0.9rem',
            fontWeight: 700,
            padding: '12px 24px',
            borderRadius: '9px',
            textDecoration: 'none'
          }}>
            Créer mon compte gratuitement →
          </a>
          <a href="#" style={{
            color: 'rgba(255,255,255,0.55)',
            fontSize: '0.9rem',
            fontWeight: 500,
            textDecoration: 'none',
            padding: '12px 16px'
          }}>
            Voir une démo ↗
          </a>
        </div>
      </div>
    </div>
  )
}
