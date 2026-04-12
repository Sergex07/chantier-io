export default function TravailleurHeroSection() {
  const features = [
    { icon: '👤', titre: 'Profil professionnel', desc: 'Qualifications CCQ, certifications, expérience, portfolio photos' },
    { icon: '🔔', titre: "Alertes offres d'emploi", desc: 'Recevez les nouvelles offres dans votre spécialité et région' },
    { icon: '🚀', titre: 'Badge Ouvert aux opportunités', desc: "Signallez aux employeurs que vous cherchez du travail — Pro 9$/mois" },
  ]

  return (
    <section style={{ padding: '64px 40px', background: 'white', borderBottom: '1px solid #F0EEEA' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

        {/* Gauche — texte */}
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px',
            padding: '5px 12px', background: '#EFF6FF', borderRadius: '100px',
            fontSize: '0.72rem', fontWeight: 600, color: '#1D4ED8', marginBottom: '20px' }}>
            🆕 Nouveau · Gratuit pour toujours
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 500, color: '#18170F',
            letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '16px' }}>
            Votre profil construction.<br />
            <span style={{ color: '#4A5568' }}>Gratuit.</span>
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#6B6860', lineHeight: 1.7, marginBottom: '28px' }}>
            Créez votre profil professionnel, mettez vos qualifications CCQ en valeur
            et soyez trouvé par des entrepreneurs qui recrutent partout au Québec.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="/inscription?type=travailleur" style={{
              padding: '12px 24px', background: '#18170F', color: 'white',
              borderRadius: '100px', textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 500,
            }}>
              Créer mon profil gratuit →
            </a>
            <a href="/trouver-travailleur" style={{
              padding: '12px 24px', background: 'white', color: '#18170F',
              border: '1px solid #E8E6E1', borderRadius: '100px',
              textDecoration: 'none', fontSize: '0.875rem', fontWeight: 400,
            }}>
              Voir les profils
            </a>
          </div>
          <p style={{ fontSize: '0.75rem', color: '#9B9891', marginTop: '12px' }}>
            1 000+ travailleurs inscrits · 47 métiers · 89 villes
          </p>
        </div>

        {/* Droite — 3 features */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {features.map((f, i) => (
            <div key={i} style={{
              display: 'flex', gap: '16px', alignItems: 'flex-start',
              padding: '16px', borderRadius: '12px', border: '1px solid #F0EEEA',
              background: '#FAFAFA',
            }}>
              <div style={{ fontSize: '1.4rem', flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#18170F', marginBottom: '4px' }}>
                  {f.titre}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#6B6860', lineHeight: 1.5 }}>
                  {f.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
