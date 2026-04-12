'use client'
import { useMode } from './ModeContext'
import SousTraitantsSection from './SousTraitantsSection'
import AppelsSoumissionsSection from './AppelsSoumissionsSection'
import EmploisSection from './EmploisSection'
import TravailleursSection from './TravailleursSection'
import CTAFinalSection from './CTAFinalSection'

const PRO_AVANTAGES = [
  { icon: '📋', titre: 'Visibilité accrue', desc: 'Votre profil apparaît en premier dans les résultats de recherche des entrepreneurs généraux.' },
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
        <AppelsSoumissionsSection />
        <SousTraitantsSection />
        <CTAFinalSection />
      </>
    )
  }

  if (mode === 'travailleur') {
    return (
      <>
        <TravailleursSection />
        <EmploisSection />
        <AvantagesPro />
        <CTAFinalSection />
      </>
    )
  }

  return (
    <>
      <SousTraitantsSection />
      <AppelsSoumissionsSection />
      <EmploisSection />
      <CTAFinalSection />
    </>
  )
}
