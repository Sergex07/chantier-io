import Link from 'next/link'

export default function HeroSection() {
  return (
    <section style={{
      minHeight: '92vh',
      backgroundImage: 'url(https://images.unsplash.com/photo-1590579491624-f98f36d4c763?w=1800&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)' }} />

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '700px', width: '100%' }}>
        <h1 style={{
          fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
          color: 'white',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '20px',
          textShadow: '0 2px 20px rgba(0,0,0,0.2)',
        }}>
          <span style={{ fontWeight: 300 }}>Trouvez les bons</span><br />
          <span style={{ fontWeight: 600 }}>partenaires pour vos chantiers</span>
        </h1>
        <p style={{
          fontSize: '1.05rem',
          color: 'rgba(255,255,255,0.82)',
          marginBottom: '36px',
          fontWeight: 400,
          lineHeight: 1.55,
        }}>
          Obtenez 3 soumissions gratuites en moins de 48h
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/demande-soumission" style={{
            padding: '13px 26px', background: '#18170F', color: 'white',
            borderRadius: '10px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500,
            display: 'inline-block',
          }}>
            Publier une demande gratuitement →
          </Link>
          <Link href="/professionnels" style={{
            padding: '13px 26px', background: 'transparent', color: 'white',
            border: '1px solid rgba(255,255,255,0.5)',
            borderRadius: '10px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 400,
            display: 'inline-block',
          }}>
            Voir les professionnels
          </Link>
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: '40px', left: 0, right: 0, zIndex: 10, textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', fontWeight: 400, margin: 0, letterSpacing: '0.02em' }}>
          1 458 entrepreneurs · 247 demandes actives · 89 villes
        </p>
      </div>
    </section>
  )
}
