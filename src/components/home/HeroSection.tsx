'use client'
import { useState } from 'react'
import { useMode, type Mode } from '@/lib/ModeContext'

const PRO_SUBTABS = [
  { id: 'entrepreneur' as const, label: 'Entrepreneur' },
  { id: 'professionnel' as const, label: 'Professionnel' },
  { id: 'soustraitant' as const, label: 'Sous-traitant' },
  { id: 'detaillant' as const, label: 'Détaillant' },
]
const PRO_MODES = PRO_SUBTABS.map(t => t.id)

const PRO_CTAS = [
  { icon: '📋', title: 'Demande de soumission', desc: 'Trouver un sous-traitant pour votre projet', href: '/demande-soumission' },
  { icon: '💼', title: 'Trouver un contrat', desc: "Parcourez les appels d'offres disponibles", href: '/demandes' },
  { icon: '👷', title: 'Trouver des employés', desc: 'Recrutez des travailleurs qualifiés', href: '/trouver-travailleur' },
  { icon: '📢', title: "Afficher une offre d'emploi", desc: 'Publiez un poste sur la plateforme', href: '/emplois/publier' },
]

const MODES: Record<Mode, { label: string; ctas: { icon: string; title: string; desc: string; href: string }[] }> = {
  public: {
    label: 'Grand public',
    ctas: [
      { icon: '📋', title: 'Publier une demande', desc: 'Trouvez un entrepreneur qualifié', href: '/demande-soumission' },
      { icon: '🔍', title: 'Trouver un pro', desc: 'Sous-traitants, designers, architectes', href: '/trouver-professionnel' },
      { icon: '⭐', title: 'Voir les évaluations', desc: 'Profils vérifiés et notés', href: '/profil/demo-id' },
      { icon: '💬', title: 'Comment ça marche', desc: 'Gratuit et sans engagement', href: '#comment' },
    ],
  },
  entrepreneur: { label: 'Entrepreneur', ctas: PRO_CTAS },
  professionnel: { label: 'Professionnel', ctas: PRO_CTAS },
  soustraitant: { label: 'Sous-traitant', ctas: PRO_CTAS },
  detaillant: { label: 'Détaillant', ctas: PRO_CTAS },
  travailleur: {
    label: 'Travailleur',
    ctas: [
      { icon: '👷', title: 'Mon profil travailleur', desc: 'Créez votre profil gratuit', href: '/inscription?type=travailleur' },
      { icon: '🏗️', title: "Offres d'emploi", desc: 'Trouvez du travail près de chez vous', href: '/emplois' },
      { icon: '📍', title: 'Entreprises qui recrutent', desc: 'Contactez directement les entrepreneurs', href: '/trouver-travailleur' },
      { icon: '🚀', title: 'Passer au Pro', desc: 'Badge disponible + priorité', href: '/inscription?type=travailleur' },
    ],
  },
}

const HERO_TITLES: Record<Mode, React.ReactNode> = {
  public: (
    <>
      <span style={{ fontWeight: 300 }}>Trouvez les bons</span><br />
      <span style={{ fontWeight: 600 }}>partenaires pour vos projets immobiliers</span>
    </>
  ),
  entrepreneur: (
    <>
      <span style={{ fontWeight: 300 }}>Trouvez des contrats</span><br />
      <span style={{ fontWeight: 600 }}>dans votre spécialité</span>
    </>
  ),
  professionnel: (
    <>
      <span style={{ fontWeight: 300 }}>Trouvez des contrats</span><br />
      <span style={{ fontWeight: 600 }}>dans votre spécialité</span>
    </>
  ),
  soustraitant: (
    <>
      <span style={{ fontWeight: 300 }}>Décrochez des contrats</span><br />
      <span style={{ fontWeight: 600 }}>en sous-traitance au Québec</span>
    </>
  ),
  detaillant: (
    <>
      <span style={{ fontWeight: 300 }}>Rejoignez le réseau</span><br />
      <span style={{ fontWeight: 600 }}>de détaillants du Québec</span>
    </>
  ),
  travailleur: (
    <>
      <span style={{ fontWeight: 300 }}>Votre profil construction</span><br />
      <span style={{ fontWeight: 600 }}>· Gratuit</span>
    </>
  ),
}

const HERO_SUBTITLES: Record<Mode, string> = {
  public: "Entrepreneurs généraux, professionnels, boutiques — tous vos partenaires au Québec",
  entrepreneur: "Accédez aux demandes de soumissions d'entrepreneurs et de clients directs",
  professionnel: "Accédez aux demandes de soumissions d'entrepreneurs et de clients directs",
  soustraitant: "Trouvez des entrepreneurs généraux qui cherchent vos services au Québec",
  detaillant: "Connectez-vous avec les entrepreneurs et propriétaires du Québec",
  travailleur: "Rejoignez le réseau de travailleurs qualifiés du Québec · Gratuit",
}

export default function HeroSection() {
  const { mode, setMode } = useMode()
  const [proDropdownOpen, setProDropdownOpen] = useState(false)
  const current = MODES[mode]

  const isProMode = PRO_MODES.includes(mode as typeof PRO_MODES[number])
  const activeProLabel = PRO_SUBTABS.find(t => t.id === mode)?.label ?? 'Entrepreneur'

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

      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 20px', maxWidth: '720px', width: '100%' }}>
        <h1 style={{
          fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
          color: 'white',
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
          marginBottom: '20px',
          textShadow: '0 2px 20px rgba(0,0,0,0.2)',
        }}>
          {HERO_TITLES[mode]}
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: 'rgba(255,255,255,0.82)',
          marginBottom: '28px',
          fontWeight: 400,
          lineHeight: 1.55,
        }}>
          {HERO_SUBTITLES[mode]}
        </p>

        {/* Mode switcher */}
        <div style={{
          display: 'inline-flex',
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(8px)',
          borderRadius: '100px',
          padding: '4px',
          gap: '2px',
          marginBottom: '28px',
        }}>
          {/* Grand public */}
          <button
            onClick={() => { setMode('public'); setProDropdownOpen(false) }}
            style={{
              padding: '8px 18px', borderRadius: '100px', border: 'none',
              cursor: 'pointer', fontSize: '0.82rem',
              fontWeight: mode === 'public' ? 600 : 400,
              background: mode === 'public' ? 'white' : 'transparent',
              color: mode === 'public' ? '#18170F' : 'rgba(255,255,255,0.85)',
              transition: 'all 0.15s', whiteSpace: 'nowrap',
            }}
          >
            Grand public
          </button>

          {/* Pro dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setProDropdownOpen(!proDropdownOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '8px 18px', borderRadius: '100px', border: 'none',
                cursor: 'pointer', fontSize: '0.82rem',
                fontWeight: isProMode ? 600 : 400,
                background: isProMode ? 'white' : 'transparent',
                color: isProMode ? '#18170F' : 'rgba(255,255,255,0.85)',
                transition: 'all 0.15s', whiteSpace: 'nowrap',
              }}
            >
              {isProMode ? activeProLabel : 'Professionnel'}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                style={{ transform: proDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {proDropdownOpen && (
              <>
                <div
                  onClick={() => setProDropdownOpen(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 8 }}
                />
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'white', borderRadius: '12px',
                  border: '1px solid #E8E6E1',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  minWidth: '160px', zIndex: 9, overflow: 'hidden',
                  padding: '4px',
                }}>
                  {PRO_SUBTABS.map(sub => (
                    <button
                      key={sub.id}
                      onClick={() => { setMode(sub.id); setProDropdownOpen(false) }}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '9px 14px', borderRadius: '8px',
                        border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                        fontSize: '0.83rem',
                        fontWeight: mode === sub.id ? 500 : 400,
                        background: mode === sub.id ? '#F4F4F5' : 'transparent',
                        color: mode === sub.id ? '#18170F' : '#6B6860',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => { if (mode !== sub.id) e.currentTarget.style.background = '#F9F8F6' }}
                      onMouseLeave={e => { e.currentTarget.style.background = mode === sub.id ? '#F4F4F5' : 'transparent' }}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Travailleur */}
          <button
            onClick={() => { setMode('travailleur'); setProDropdownOpen(false) }}
            style={{
              padding: '8px 18px', borderRadius: '100px', border: 'none',
              cursor: 'pointer', fontSize: '0.82rem',
              fontWeight: mode === 'travailleur' ? 600 : 400,
              background: mode === 'travailleur' ? 'white' : 'transparent',
              color: mode === 'travailleur' ? '#18170F' : 'rgba(255,255,255,0.85)',
              transition: 'all 0.15s', whiteSpace: 'nowrap',
            }}
          >
            Travailleur
          </button>
        </div>

        {/* CTA cards grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          background: 'white',
          borderRadius: 18,
          boxShadow: '0 4px 30px rgba(0,0,0,0.22)',
          overflow: 'hidden',
          maxWidth: 680,
          margin: '0 auto',
          opacity: 1,
        }}>
          {current.ctas.map((cta, i) => (
            <a
              key={i}
              href={cta.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '20px 22px',
                textDecoration: 'none',
                textAlign: 'left',
                borderRight: i % 2 === 0 ? '1px solid #eee' : 'none',
                borderBottom: i < 2 ? '1px solid #eee' : 'none',
                background: 'white',
              }}
            >
              <div style={{
                width: 44, height: 44,
                background: '#F4F4F5',
                borderRadius: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.25rem', flexShrink: 0,
              }}>
                {cta.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.01em', marginBottom: 3, lineHeight: 1.3 }}>
                  {cta.title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B6860', lineHeight: 1.4 }}>{cta.desc}</div>
              </div>
              <span style={{ marginLeft: 'auto', color: '#ccc', fontSize: '1.4rem', flexShrink: 0, lineHeight: 1 }}>›</span>
            </a>
          ))}
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
