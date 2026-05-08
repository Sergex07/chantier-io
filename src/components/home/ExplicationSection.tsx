'use client'

const COLONNES = [
  {
    label: 'SOUS-TRAITANT · PROFESSIONNEL',
    titre: 'Je cherche des contrats',
    iconBg: '#18170F',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="1.5">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
      </svg>
    ),
    steps: [
      { num: '1', texte: 'Créez votre profil avec vos spécialités et région' },
      { num: '2', texte: 'Parcourez les demandes ouvertes dans votre spécialité' },
      { num: '3', texte: 'Soumissionnez et décrochez votre prochain contrat' },
    ],
    cta: { label: 'Créer mon profil Pro →', href: '/inscription' },
    note: '30 jours d\'essai gratuit · Aucune carte requise',
  },
  {
    label: 'ENTREPRENEUR GÉNÉRAL · DONNEUR D\'OUVRAGE',
    titre: 'Je cherche un sous-traitant',
    iconBg: '#0A6E5C',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="white" strokeWidth="1.5">
        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
      </svg>
    ),
    steps: [
      { num: '1', texte: 'Publiez votre demande de soumission en quelques minutes' },
      { num: '2', texte: 'Recevez des offres de pros qualifiés en 24 à 48 h' },
      { num: '3', texte: 'Comparez les soumissions et choisissez votre sous-traitant' },
    ],
    cta: { label: 'Publier une demande →', href: '/demande-soumission' },
    note: 'Gratuit pour les donneurs d\'ouvrage · Réponses rapides',
  },
] as const

export default function ExplicationSection() {
  return (
    <section style={{ padding: '64px 40px', background: '#F9F8F6' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* En-tête */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{
            fontSize: '1.4rem', fontWeight: 500, color: '#18170F',
            letterSpacing: '-0.02em', marginBottom: '8px',
          }}>
            Une plateforme, deux façons de l&apos;utiliser
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#6B6860', margin: 0 }}>
            Que vous cherchiez des contrats ou des sous-traitants — Chantier.io s&apos;adapte à vous
          </p>
        </div>

        {/* Deux colonnes */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
        }}>
          {COLONNES.map((c, idx) => (
            <div
              key={idx}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '36px',
                border: '1px solid #E8E6E1',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Header de colonne */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '11px',
                  background: c.iconBg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  {c.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <p style={{
                    fontSize: '0.7rem', fontWeight: 600, color: '#9B9891',
                    textTransform: 'uppercase', letterSpacing: '0.1em',
                    margin: '0 0 2px',
                  }}>
                    {c.label}
                  </p>
                  <h3 style={{
                    fontSize: '1.1rem', fontWeight: 500, color: '#18170F',
                    margin: 0, letterSpacing: '-0.02em',
                  }}>
                    {c.titre}
                  </h3>
                </div>
              </div>

              {/* Étapes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                {c.steps.map((step, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                      background: '#F4F4F5',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.72rem', fontWeight: 600, color: '#6B6860',
                      marginTop: '1px',
                    }}>
                      {step.num}
                    </div>
                    <p style={{
                      fontSize: '0.85rem', color: '#3D3C38',
                      lineHeight: 1.55, margin: 0,
                    }}>
                      {step.texte}
                    </p>
                  </div>
                ))}
              </div>

              {/* CTA en bas — auto-pushed */}
              <div style={{ marginTop: 'auto' }}>
                <a
                  href={c.cta.href}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '11px', background: '#18170F', color: 'white',
                    borderRadius: '9px', textDecoration: 'none',
                    fontSize: '0.875rem', fontWeight: 500,
                  }}
                >
                  {c.cta.label}
                </a>
                <p style={{
                  fontSize: '0.72rem', color: '#9B9891',
                  textAlign: 'center', margin: '8px 0 0',
                }}>
                  {c.note}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
