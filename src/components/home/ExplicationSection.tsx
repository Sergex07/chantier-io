export default function ExplicationSection() {
  return (
    <section style={{
      background: 'white', padding: '80px 40px',
      borderBottom: '1px solid #F0EEEA',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Titre section */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{
            fontSize: '1.8rem', fontWeight: 500, color: '#18170F',
            letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0,
          }}>
            Une plateforme, deux façons de l&apos;utiliser
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#6B6860', marginTop: '10px', margin: '10px 0 0' }}>
            Que vous cherchiez des contrats ou des sous-traitants — Chantier.io s&apos;adapte
          </p>
        </div>

        {/* 2 cartes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Carte 1 — Je cherche des contrats */}
          <div style={{
            borderRadius: '20px', border: '1px solid #E8E6E1',
            overflow: 'hidden', background: '#FAFAFA',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Barre accent violet */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />

            <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              {/* Badge profil */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '5px 12px', borderRadius: '100px',
                background: '#EEF2FF', marginBottom: '20px', alignSelf: 'flex-start',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6366f1' }} />
                <span style={{
                  fontSize: '0.7rem', fontWeight: 600, color: '#4f46e5',
                  letterSpacing: '0.08em',
                }}>
                  SOUS-TRAITANT · PROFESSIONNEL
                </span>
              </div>

              <h3 style={{
                fontSize: '1.6rem', fontWeight: 500, color: '#18170F',
                letterSpacing: '-0.02em', margin: '0 0 28px',
              }}>
                Je cherche<br />des contrats
              </h3>

              {/* Étapes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '32px' }}>
                {[
                  { titre: 'Créez votre profil', desc: 'Spécialités, région, certifications CCQ — visible par tous les donneurs d\'ouvrage' },
                  { titre: 'Parcourez les demandes', desc: 'Filtrez par spécialité et région. Nouvelles demandes chaque jour.' },
                  { titre: 'Soumissionnez', desc: 'Envoyez votre offre en 1 clic. Le client vous contacte directement.' },
                ].map((step, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '16px', padding: '18px 0',
                    borderBottom: i < 2 ? '1px solid #EBE9E4' : 'none',
                  }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                      background: '#EEF2FF',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', fontWeight: 700, color: '#4f46e5',
                    }}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.95rem', fontWeight: 500, color: '#18170F',
                        marginBottom: '4px',
                      }}>{step.titre}</div>
                      <div style={{
                        fontSize: '0.82rem', color: '#6B6860',
                        lineHeight: 1.6,
                      }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA en bas */}
              <div style={{ marginTop: 'auto' }}>
                <a href="/inscription" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', padding: '15px', borderRadius: '10px',
                  background: '#18170F', color: 'white',
                  textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600,
                  letterSpacing: '-0.01em',
                }}>
                  Créer mon profil Pro →
                </a>
                <p style={{
                  fontSize: '0.75rem', color: '#9B9891',
                  textAlign: 'center', margin: '10px 0 0',
                }}>
                  ✓ 30 jours gratuits · ✓ Aucune carte requise
                </p>
              </div>
            </div>
          </div>

          {/* Carte 2 — Je cherche un sous-traitant */}
          <div style={{
            borderRadius: '20px', border: '1px solid #E8E6E1',
            overflow: 'hidden', background: '#FAFAFA',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Barre accent vert */}
            <div style={{ height: '4px', background: 'linear-gradient(90deg, #10b981, #059669)' }} />

            <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', flex: 1 }}>
              {/* Badge profil */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                padding: '5px 12px', borderRadius: '100px',
                background: '#ECFDF5', marginBottom: '20px', alignSelf: 'flex-start',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
                <span style={{
                  fontSize: '0.7rem', fontWeight: 600, color: '#059669',
                  letterSpacing: '0.08em',
                }}>
                  ENTREPRENEUR · PROMOTEUR
                </span>
              </div>

              <h3 style={{
                fontSize: '1.6rem', fontWeight: 500, color: '#18170F',
                letterSpacing: '-0.02em', margin: '0 0 28px',
              }}>
                Je cherche<br />un sous-traitant
              </h3>

              {/* Étapes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '32px' }}>
                {[
                  { titre: 'Publiez votre demande', desc: 'Décrivez vos travaux en 2 minutes. Photos et plans bienvenus.' },
                  { titre: 'Recevez des soumissions', desc: 'Des pros qualifiés de votre région vous contactent sous 24–48 h.' },
                  { titre: 'Choisissez et démarrez', desc: 'Comparez les offres, choisissez le meilleur et démarrez votre projet.' },
                ].map((step, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '16px', padding: '18px 0',
                    borderBottom: i < 2 ? '1px solid #EBE9E4' : 'none',
                  }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                      background: '#ECFDF5',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', fontWeight: 700, color: '#059669',
                    }}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.95rem', fontWeight: 500, color: '#18170F',
                        marginBottom: '4px',
                      }}>{step.titre}</div>
                      <div style={{
                        fontSize: '0.82rem', color: '#6B6860',
                        lineHeight: 1.6,
                      }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA en bas */}
              <div style={{ marginTop: 'auto' }}>
                <a href="/demande-soumission" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  gap: '8px', padding: '15px', borderRadius: '10px',
                  background: '#059669', color: 'white',
                  textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600,
                }}>
                  Publier une demande →
                </a>
                <p style={{
                  fontSize: '0.75rem', color: '#9B9891',
                  textAlign: 'center', margin: '10px 0 0',
                }}>
                  ✓ Gratuit · ✓ Sans engagement · ✓ Réponses en 24–48 h
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Stats en bas */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '64px',
          marginTop: '56px', paddingTop: '40px',
          borderTop: '1px solid #F0EEEA',
        }}>
          {[
            { num: '1 458', label: 'professionnels inscrits' },
            { num: '247',   label: 'demandes actives' },
            { num: '89',    label: 'villes couvertes' },
            { num: '48 h',  label: 'délai de réponse moyen' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem', fontWeight: 600, color: '#18170F',
                letterSpacing: '-0.03em', marginBottom: '4px',
              }}>
                {stat.num}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#9B9891' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
