export default function ExplicationSection() {
  return (
    <section style={{ background: '#18170F', padding: '72px 40px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Titre section */}
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <p style={{
            fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '10px',
          }}>
            COMMENT ÇA MARCHE
          </p>
          <h2 style={{
            fontSize: '2rem', fontWeight: 500, color: 'white',
            letterSpacing: '-0.03em', lineHeight: 1.2, margin: 0,
          }}>
            Une plateforme,<br />
            <span style={{ color: 'rgba(255,255,255,0.6)' }}>deux façons de l&apos;utiliser</span>
          </h2>
        </div>

        {/* 2 cartes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

          {/* Carte 1 — Je cherche des contrats */}
          <div style={{
            borderRadius: '20px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(10px)',
            position: 'relative',
          }}>
            {/* Accent couleur haut */}
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)' }} />

            <div style={{ padding: '40px' }}>
              {/* Header */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px', borderRadius: '100px',
                  background: 'rgba(99,102,241,0.2)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  marginBottom: '16px',
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a5b4fc' }} />
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 600, color: '#a5b4fc',
                    letterSpacing: '0.08em',
                  }}>
                    SOUS-TRAITANT · PROFESSIONNEL
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.6rem', fontWeight: 500, color: 'white',
                  letterSpacing: '-0.02em', margin: 0,
                }}>
                  Je cherche<br />des contrats
                </h3>
              </div>

              {/* Étapes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '32px' }}>
                {[
                  { titre: 'Créez votre profil', desc: 'Spécialités, région, certifications CCQ — visible par tous les donneurs d\'ouvrage' },
                  { titre: 'Parcourez les demandes', desc: 'Filtrez par spécialité et région. Nouvelles demandes chaque jour.' },
                  { titre: 'Soumissionnez', desc: 'Envoyez votre offre en 1 clic. Le client vous contacte directement.' },
                ].map((step, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '16px', padding: '20px 0',
                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                      background: 'rgba(99,102,241,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', fontWeight: 700, color: '#a5b4fc',
                    }}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.95rem', fontWeight: 500, color: 'white',
                        marginBottom: '4px',
                      }}>{step.titre}</div>
                      <div style={{
                        fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.6,
                      }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a href="/inscription" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', padding: '15px', borderRadius: '10px',
                background: 'white', color: '#18170F',
                textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600,
                letterSpacing: '-0.01em',
              }}>
                Créer mon profil Pro →
              </a>
              <p style={{
                fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)',
                textAlign: 'center', marginTop: '10px',
              }}>
                ✓ 30 jours gratuits · ✓ Aucune carte requise
              </p>
            </div>
          </div>

          {/* Carte 2 — Je cherche un sous-traitant */}
          <div style={{
            borderRadius: '20px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            position: 'relative',
          }}>
            {/* Accent couleur haut */}
            <div style={{ height: '3px', background: 'linear-gradient(90deg, #10b981, #059669)' }} />

            <div style={{ padding: '40px' }}>
              {/* Header */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '8px 16px', borderRadius: '100px',
                  background: 'rgba(16,185,129,0.2)',
                  border: '1px solid rgba(16,185,129,0.3)',
                  marginBottom: '16px',
                }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#6ee7b7' }} />
                  <span style={{
                    fontSize: '0.75rem', fontWeight: 600, color: '#6ee7b7',
                    letterSpacing: '0.08em',
                  }}>
                    ENTREPRENEUR · PROMOTEUR
                  </span>
                </div>
                <h3 style={{
                  fontSize: '1.6rem', fontWeight: 500, color: 'white',
                  letterSpacing: '-0.02em', margin: 0,
                }}>
                  Je cherche<br />un sous-traitant
                </h3>
              </div>

              {/* Étapes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginBottom: '32px' }}>
                {[
                  { titre: 'Publiez votre demande', desc: 'Décrivez vos travaux en 2 minutes. Photos et plans bienvenus.' },
                  { titre: 'Recevez des soumissions', desc: 'Des pros qualifiés de votre région vous contactent sous 24–48 h.' },
                  { titre: 'Choisissez et démarrez', desc: 'Comparez les offres, choisissez le meilleur et démarrez votre projet.' },
                ].map((step, i) => (
                  <div key={i} style={{
                    display: 'flex', gap: '16px', padding: '20px 0',
                    borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                  }}>
                    <div style={{
                      width: '32px', height: '32px', borderRadius: '8px', flexShrink: 0,
                      background: 'rgba(16,185,129,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.8rem', fontWeight: 700, color: '#6ee7b7',
                    }}>
                      {i + 1}
                    </div>
                    <div>
                      <div style={{
                        fontSize: '0.95rem', fontWeight: 500, color: 'white',
                        marginBottom: '4px',
                      }}>{step.titre}</div>
                      <div style={{
                        fontSize: '0.82rem', color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.6,
                      }}>{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <a href="/demande-soumission" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', padding: '15px', borderRadius: '10px',
                background: '#059669', color: 'white',
                textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600,
              }}>
                Publier une demande →
              </a>
              <p style={{
                fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)',
                textAlign: 'center', marginTop: '10px',
              }}>
                ✓ Gratuit · ✓ Sans engagement · ✓ Réponses en 24–48 h
              </p>
            </div>
          </div>

        </div>

        {/* Stats en bas */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '64px',
          marginTop: '48px', paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          {[
            { num: '1 458', label: 'professionnels inscrits' },
            { num: '247',   label: 'demandes actives' },
            { num: '89',    label: 'villes couvertes' },
            { num: '48 h',  label: 'délai de réponse moyen' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '2rem', fontWeight: 600, color: 'white',
                letterSpacing: '-0.03em', marginBottom: '4px',
              }}>
                {stat.num}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.45)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
