export default function ExplicationSection() {
  return (
    <section style={{ background: '#F9F8F6', padding: '72px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* En-tête */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{
            fontSize: '0.7rem', fontWeight: 600, color: '#9B9891',
            textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 10px',
          }}>
            COMMENT ÇA MARCHE
          </p>
          <h2 style={{
            fontSize: '1.6rem', fontWeight: 500, color: '#18170F',
            letterSpacing: '-0.03em', margin: 0,
          }}>
            Trouvez des contrats ou des sous-traitants
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#6B6860', margin: '8px 0 0' }}>
            Chantier.io s&apos;adapte selon votre rôle dans la construction
          </p>
        </div>

        {/* 2 cartes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

          {/* Carte 1 — Contrats */}
          <div style={{
            background: 'white', borderRadius: '16px',
            border: '1px solid #E8E6E1', padding: '32px',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Tag + titre */}
            <div style={{ marginBottom: '28px' }}>
              <span style={{
                display: 'inline-block', padding: '4px 12px',
                background: '#EEF2FF', color: '#4f46e5',
                borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600,
                letterSpacing: '0.06em', marginBottom: '14px',
              }}>
                Sous-traitant · Professionnel
              </span>
              <h3 style={{
                fontSize: '1.25rem', fontWeight: 500, color: '#18170F',
                letterSpacing: '-0.02em', margin: 0, lineHeight: 1.3,
              }}>
                Je cherche des contrats
              </h3>
            </div>

            {/* 3 étapes */}
            <div style={{ flex: 1, marginBottom: '28px' }}>
              {[
                { titre: 'Créez votre profil',
                  desc:  'Spécialités, région, certifications CCQ/RBQ en 5 minutes.' },
                { titre: 'Parcourez les demandes',
                  desc:  'Nouvelles demandes chaque jour dans votre spécialité et région.' },
                { titre: 'Soumissionnez en 1 clic',
                  desc:  'Envoyez votre offre. Le client vous contacte si elle est retenue.' },
              ].map((step, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '14px',
                  padding: i === 0 ? '0 0 16px' : '16px 0',
                  borderTop: i > 0 ? '1px solid #F0EEEA' : 'none',
                }}>
                  <div style={{
                    width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                    background: '#EEF2FF',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.72rem', fontWeight: 700, color: '#4f46e5',
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '0.9rem', fontWeight: 500, color: '#18170F',
                      marginBottom: '3px',
                    }}>{step.titre}</div>
                    <div style={{
                      fontSize: '0.8rem', color: '#6B6860', lineHeight: 1.55,
                    }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="/inscription" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '13px', borderRadius: '10px',
              background: '#18170F', color: 'white',
              textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600,
              letterSpacing: '-0.01em',
            }}>
              Créer mon profil Pro →
            </a>
            <p style={{
              fontSize: '0.72rem', color: '#9B9891',
              textAlign: 'center', margin: '10px 0 0',
            }}>
              ✓ 30 jours gratuits · ✓ Aucune carte requise
            </p>
          </div>

          {/* Carte 2 — Sous-traitant */}
          <div style={{
            background: 'white', borderRadius: '16px',
            border: '1px solid #E8E6E1', padding: '32px',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Tag + titre */}
            <div style={{ marginBottom: '28px' }}>
              <span style={{
                display: 'inline-block', padding: '4px 12px',
                background: '#ECFDF5', color: '#059669',
                borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600,
                letterSpacing: '0.06em', marginBottom: '14px',
              }}>
                Entrepreneur · Promoteur
              </span>
              <h3 style={{
                fontSize: '1.25rem', fontWeight: 500, color: '#18170F',
                letterSpacing: '-0.02em', margin: 0, lineHeight: 1.3,
              }}>
                Je cherche un sous-traitant
              </h3>
            </div>

            {/* 3 étapes */}
            <div style={{ flex: 1, marginBottom: '28px' }}>
              {[
                { titre: 'Publiez votre demande',
                  desc:  'Décrivez vos travaux en 2 minutes. Photos et plans bienvenus.' },
                { titre: 'Recevez des soumissions',
                  desc:  'Des pros qualifiés de votre région vous contactent en 24–48 h.' },
                { titre: 'Choisissez et démarrez',
                  desc:  'Comparez les offres, sélectionnez le meilleur et démarrez le projet.' },
              ].map((step, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '14px',
                  padding: i === 0 ? '0 0 16px' : '16px 0',
                  borderTop: i > 0 ? '1px solid #F0EEEA' : 'none',
                }}>
                  <div style={{
                    width: '26px', height: '26px', borderRadius: '50%', flexShrink: 0,
                    background: '#ECFDF5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.72rem', fontWeight: 700, color: '#059669',
                  }}>
                    {i + 1}
                  </div>
                  <div>
                    <div style={{
                      fontSize: '0.9rem', fontWeight: 500, color: '#18170F',
                      marginBottom: '3px',
                    }}>{step.titre}</div>
                    <div style={{
                      fontSize: '0.8rem', color: '#6B6860', lineHeight: 1.55,
                    }}>{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a href="/demande-soumission" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '13px', borderRadius: '10px',
              background: '#059669', color: 'white',
              textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600,
              letterSpacing: '-0.01em',
            }}>
              Publier une demande →
            </a>
            <p style={{
              fontSize: '0.72rem', color: '#9B9891',
              textAlign: 'center', margin: '10px 0 0',
            }}>
              ✓ Gratuit · ✓ Sans engagement · ✓ Réponses en 24–48 h
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}
