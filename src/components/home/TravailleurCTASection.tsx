export default function TravailleurCTASection() {
  return (
    <section style={{ padding: '96px 40px', background: '#18170F', textAlign: 'center' }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, color: 'white',
          letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '16px',
        }}>
          Rejoignez le réseau des travailleurs du Québec
        </h2>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', marginBottom: '36px', lineHeight: 1.6 }}>
          Gratuit · Profil en 5 minutes · 1 000+ membres
        </p>
        <a href="/inscription?type=travailleur" style={{
          display: 'inline-block',
          padding: '14px 32px', background: 'white', color: '#18170F',
          borderRadius: '100px', textDecoration: 'none',
          fontSize: '0.9rem', fontWeight: 500,
        }}>
          Créer mon profil →
        </a>
      </div>
    </section>
  )
}
