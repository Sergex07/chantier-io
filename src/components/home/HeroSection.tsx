'use client'
import { useMode, type Mode } from '@/lib/ModeContext'

const PRO_CTAS = [
  { icon: '📋', title: 'Demande de soumission', desc: 'Trouver un sous-traitant pour votre projet', href: '/demande-soumission' },
  { icon: '💼', title: 'Trouver un contrat', desc: "Parcourez les appels d'offres disponibles", href: '/demandes' },
  { icon: '👷', title: 'Trouver des employés', desc: 'Recrutez des travailleurs qualifiés', href: '/trouver-travailleur' },
  { icon: '📢', title: "Afficher une offre d'emploi", desc: 'Publiez un poste sur la plateforme', href: '/emplois/publier' },
]

const TRAVAILLEUR_CTAS = [
  { icon: '👷', title: 'Mon profil travailleur', desc: 'Créez votre profil gratuit', href: '/inscription?type=travailleur' },
  { icon: '🏗️', title: "Offres d'emploi", desc: 'Trouvez du travail près de chez vous', href: '/emplois' },
  { icon: '📍', title: 'Entreprises qui recrutent', desc: 'Contactez directement les entrepreneurs', href: '/trouver-travailleur' },
  { icon: '🚀', title: 'Passer au Pro', desc: 'Badge disponible + priorité', href: '/inscription?type=travailleur' },
]

const MODES: Record<Mode, { ctas: { icon: string; title: string; desc: string; href: string }[] }> = {
  pro: { ctas: PRO_CTAS },
  travailleur: { ctas: TRAVAILLEUR_CTAS },
}

const HERO_TITLES: Record<Mode, React.ReactNode> = {
  pro: (
    <>
      <span style={{ fontWeight: 300 }}>Trouvez des contrats</span><br />
      <span style={{ fontWeight: 600 }}>dans votre spécialité</span>
    </>
  ),
  travailleur: (
    <>
      <span style={{ fontWeight: 300 }}>Votre réseau</span><br />
      <span style={{ fontWeight: 600 }}>professionnel construction</span>
    </>
  ),
}

const HERO_SUBTITLES: Record<Mode, string> = {
  pro: "Accédez aux demandes de soumissions d'entrepreneurs et de clients",
  travailleur: "Profil gratuit, offres d'emploi, formations — tout pour votre carrière",
}

export default function HeroSection() {
  const { mode, setMode } = useMode()
  const current = MODES[mode]

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
          <button
            onClick={() => setMode('pro')}
            style={{
              padding: '8px 18px', borderRadius: '100px', border: 'none',
              cursor: 'pointer', fontSize: '0.82rem',
              fontWeight: mode === 'pro' ? 600 : 400,
              background: mode === 'pro' ? 'white' : 'transparent',
              color: mode === 'pro' ? '#18170F' : 'rgba(255,255,255,0.85)',
              transition: 'all 0.15s', whiteSpace: 'nowrap',
            }}
          >
            Professionnel
          </button>

          <button
            onClick={() => setMode('travailleur')}
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
