'use client'
import Link from 'next/link'
import { useMode } from './ModeContext'
import HeroSection from './HeroSection'
import CommentCaMarche from './CommentCaMarche'
import SousTraitantsSection from './SousTraitantsSection'
import AppelsSoumissionsSection from './AppelsSoumissionsSection'
import EmploisSection from './EmploisSection'
import TravailleursSection from './TravailleursSection'
import CTAFinalSection from './CTAFinalSection'

const HERO_PHOTO = 'url(https://images.unsplash.com/photo-1590579491624-f98f36d4c763?w=1800&q=80)'

function HeroOverlay({ children }: { children: React.ReactNode }) {
  return (
    <section style={{
      minHeight: '92vh',
      backgroundImage: HERO_PHOTO,
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
        {children}
      </div>
    </section>
  )
}

function ProHero() {
  return (
    <HeroOverlay>
      <h1 style={{
        fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
        color: 'white', lineHeight: 1.1,
        letterSpacing: '-0.03em', marginBottom: '20px',
        textShadow: '0 2px 20px rgba(0,0,0,0.2)',
      }}>
        <span style={{ fontWeight: 300 }}>Trouvez des contrats</span><br />
        <span style={{ fontWeight: 600 }}>dans votre spécialité</span>
      </h1>
      <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.82)', marginBottom: '36px', fontWeight: 400, lineHeight: 1.55 }}>
        Accédez aux demandes de soumissions d'entrepreneurs qualifiés
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
        <Link href="/demandes" style={{
          padding: '13px 26px', background: '#18170F', color: 'white',
          borderRadius: '10px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, display: 'inline-block',
        }}>
          Voir les demandes disponibles →
        </Link>
        <Link href="/inscription" style={{
          padding: '13px 26px', background: 'transparent', color: 'white',
          border: '1px solid rgba(255,255,255,0.5)',
          borderRadius: '10px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 400, display: 'inline-block',
        }}>
          Créer mon profil Pro
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        {['247 demandes actives', '1 458 entrepreneurs', '89 villes'].map(s => (
          <span key={s} style={{
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)',
            borderRadius: '100px', padding: '5px 14px', fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.9)', fontWeight: 500,
          }}>{s}</span>
        ))}
      </div>
    </HeroOverlay>
  )
}

function TravailleurHero() {
  return (
    <HeroOverlay>
      <div style={{ marginBottom: '20px' }}>
        <span style={{
          display: 'inline-block',
          background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
          borderRadius: '100px', padding: '5px 14px',
          fontSize: '0.78rem', color: 'white', fontWeight: 500,
        }}>
          🆕 Nouveau · LinkedIn de la construction québécoise
        </span>
      </div>
      <h1 style={{
        fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
        color: 'white', lineHeight: 1.1,
        letterSpacing: '-0.03em', marginBottom: '20px',
        textShadow: '0 2px 20px rgba(0,0,0,0.2)',
      }}>
        <span style={{ fontWeight: 300 }}>Votre profil construction</span><br />
        <span style={{ fontWeight: 600 }}>Gratuit, toujours</span>
      </h1>
      <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.82)', marginBottom: '36px', fontWeight: 400, lineHeight: 1.55 }}>
        Rejoignez le réseau de travailleurs qualifiés du Québec
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/inscription?type=travailleur" style={{
          padding: '13px 26px', background: '#18170F', color: 'white',
          borderRadius: '10px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 500, display: 'inline-block',
        }}>
          Créer mon profil gratuitement →
        </Link>
        <Link href="/emplois" style={{
          padding: '13px 26px', background: 'transparent', color: 'white',
          border: '1px solid rgba(255,255,255,0.5)',
          borderRadius: '10px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 400, display: 'inline-block',
        }}>
          Voir les offres d'emploi
        </Link>
      </div>
    </HeroOverlay>
  )
}

const PRO_AVANTAGES = [
  { icon: '📋', titre: 'Visibilité accrue', desc: 'Votre profil apparaît en premier dans les résultats de recherche des GC.' },
  { icon: '🔔', titre: 'Alertes en temps réel', desc: 'Recevez les nouvelles demandes correspondant à votre spécialité dès leur publication.' },
  { icon: '📊', titre: 'Statistiques de profil', desc: "Sachez combien d'entrepreneurs ont consulté votre profil chaque semaine." },
]

function AvantagesPro() {
  return (
    <section style={{ padding: '80px 40px', background: '#F9F8F6' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
              PLAN PRO
            </p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
              Passez à la vitesse supérieure
            </h2>
          </div>
          <a href="/inscription" style={{ fontSize: '0.82rem', color: '#6B6860', textDecoration: 'none' }}>
            Essai gratuit 30 jours →
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {PRO_AVANTAGES.map(a => (
            <div key={a.titre} style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', padding: '28px 24px' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '14px' }}>{a.icon}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#18170F', marginBottom: '8px', letterSpacing: '-0.01em' }}>{a.titre}</div>
              <p style={{ fontSize: '0.82rem', color: '#6B6860', lineHeight: 1.65, margin: 0 }}>{a.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <a href="/inscription" style={{
            display: 'inline-block', padding: '12px 28px', background: '#18170F', color: 'white',
            borderRadius: '10px', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500,
          }}>
            Commencer l'essai gratuit de 30 jours →
          </a>
          <p style={{ fontSize: '0.75rem', color: '#9B9891', marginTop: '10px' }}>
            Aucune carte de crédit · Sans engagement
          </p>
        </div>
      </div>
    </section>
  )
}

export default function HomepageAdaptive() {
  const { mode } = useMode()

  if (mode === 'pro') {
    return (
      <>
        <ProHero />
        <AppelsSoumissionsSection />
        <SousTraitantsSection />
        <CTAFinalSection />
      </>
    )
  }

  if (mode === 'travailleur') {
    return (
      <>
        <TravailleurHero />
        <TravailleursSection />
        <EmploisSection />
        <AvantagesPro />
        <CTAFinalSection />
      </>
    )
  }

  return (
    <>
      <HeroSection />
      <CommentCaMarche />
      <SousTraitantsSection />
      <AppelsSoumissionsSection />
      <EmploisSection />
      <CTAFinalSection />
    </>
  )
}
