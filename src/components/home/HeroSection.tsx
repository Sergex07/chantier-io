'use client'
import { useMode, type Mode } from '@/lib/ModeContext'

const MODES = {
  public: {
    label: 'Grand public',
    ctas: [
      { icon: '📋', title: 'Publier une demande', desc: 'Trouvez un entrepreneur qualifié', href: '/demande-soumission' },
      { icon: '🔍', title: 'Trouver un pro', desc: 'Sous-traitants, designers, architectes', href: '/trouver-professionnel' },
      { icon: '⭐', title: 'Voir les évaluations', desc: 'Profils vérifiés et notés', href: '/profil/demo-id' },
      { icon: '💬', title: 'Comment ça marche', desc: 'Gratuit et sans engagement', href: '#comment' },
    ],
  },
  pro: {
    label: 'Professionnel',
    ctas: [
      { icon: '📂', title: 'Demandes disponibles', desc: 'Soumissionnez sur des projets', href: '/dashboard/demandes-disponibles' },
      { icon: '👤', title: 'Mon profil Pro', desc: 'Gérez votre vitrine', href: '/dashboard/profil' },
      { icon: '💼', title: 'Trouver un contrat', desc: "Parcourez les appels d'offres", href: '/demandes' },
      { icon: '🤝', title: 'Trouver un sous-traitant', desc: 'Élargissez votre réseau', href: '/trouver-travailleur' },
    ],
  },
  travailleur: {
    label: 'Travailleur',
    ctas: [
      { icon: '👷', title: 'Mon profil travailleur', desc: 'Créez votre profil gratuit', href: '/inscription?type=travailleur' },
      { icon: '🏗️', title: "Offres d'emploi", desc: 'Trouvez du travail près de chez vous', href: '/emplois' },
      { icon: '📍', title: 'Entreprises qui recrutent', desc: 'Contactez directement les GC', href: '/trouver-travailleur' },
      { icon: '🚀', title: 'Passer au Pro', desc: 'Badge disponible + priorité', href: '/inscription?type=travailleur' },
    ],
  },
} satisfies Record<Mode, { label: string; ctas: { icon: string; title: string; desc: string; href: string }[] }>

const HERO_TITLES: Record<Mode, React.ReactNode> = {
  public: (
    <>
      <span style={{ fontWeight: 300 }}>Trouvez les bons</span><br />
      <span style={{ fontWeight: 600 }}>partenaires pour vos projets</span>
    </>
  ),
  pro: (
    <>
      <span style={{ fontWeight: 300 }}>Trouvez des contrats</span><br />
      <span style={{ fontWeight: 600 }}>dans votre spécialité</span>
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
  public: "Sous-traitants, designers, architectes, détaillants — tous vos partenaires au Québec",
  pro: "Accédez aux demandes de soumissions d'entrepreneurs et de clients directs",
  travailleur: "Rejoignez le réseau de travailleurs qualifiés du Québec · Gratuit",
}

export default function HeroSection() {
  const { mode } = useMode()
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
          transition: 'opacity 0.2s',
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
