export default function TravailleurCTASection() {
  return (
    <section style={{ padding: '96px 40px', background: '#4A5568', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* Motif décoratif */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.05) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)',
      }} />

      <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, color: 'white',
          letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '16px',
        }}>
          Rejoignez le réseau des travailleurs du Québec
        </h2>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', marginBottom: '36px', lineHeight: 1.6 }}>
          Gratuit · Profil en 5 minutes · 1 000+ membres
        </p>
        <a href="/inscription?type=travailleur" style={{
          display: 'inline-block',
          padding: '14px 32px', background: 'white', color: '#4A5568',
          borderRadius: '100px', textDecoration: 'none',
          fontSize: '0.9rem', fontWeight: 500,
        }}>
          Créer mon profil →
        </a>
        <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '20px' }}>
          👷 1 000+ membres · ⭐ 47 métiers · 📍 89 villes
        </p>
      </div>
    </section>
  )
}
