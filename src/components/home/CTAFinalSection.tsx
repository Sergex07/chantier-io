export default function CTAFinalSection() {
  return (
    <div style={{ background: '#4A5568', padding: '96px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle radial glow */}
      <div style={{ position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '500px', background: 'radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 600, letterSpacing: '-0.04em', color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
          Prêt à simplifier<br />vos chantiers ?
        </h2>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.65)', maxWidth: '44ch', margin: '0 auto 36px', lineHeight: 1.65 }}>
          Rejoignez les entrepreneurs et sous-traitants québécois qui font confiance à Chantier.io pour chaque projet.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <a href="/inscription" style={{ background: 'white', color: '#18170F', fontSize: '0.95rem', fontWeight: 500, padding: '13px 28px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}>
            Créer mon compte gratuitement →
          </a>
          <a href="#" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', fontWeight: 400, padding: '13px 20px', borderRadius: '10px', textDecoration: 'none', display: 'inline-block' }}>
            Voir une démo ↗
          </a>
        </div>
      </div>
    </div>
  )
}
