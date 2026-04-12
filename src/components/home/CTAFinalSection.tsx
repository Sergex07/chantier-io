'use client'
import { useMode } from '@/lib/ModeContext'

export default function CTAFinalSection() {
  const { mode } = useMode()

  const content = mode === 'pro' ? {
    titre: "Commencez à décrocher des contrats aujourd'hui",
    sousTitre: 'Rejoignez 1 458 professionnels qui trouvent du travail sur Chantier.io',
    btn1: { label: 'Créer mon profil Pro →', href: '/inscription' },
    btn2: { label: 'Voir les demandes', href: '/dashboard/demandes-disponibles' },
  } : {
    titre: 'Prêt à démarrer votre projet?',
    sousTitre: 'Rejoignez 1 458 entrepreneurs et propriétaires qui font confiance à Chantier.io',
    btn1: { label: 'Publier une demande →', href: '/demande-soumission' },
    btn2: { label: 'S\'inscrire gratuitement', href: '/inscription' },
  }

  return (
    <section style={{ background: '#18170F', padding: '96px 40px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500, letterSpacing: '-0.03em', color: 'white', lineHeight: 1.2, marginBottom: '16px' }}>
          {content.titre}
        </h2>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.6)', margin: '0 auto 40px', lineHeight: 1.65 }}>
          {content.sousTitre}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <a href={content.btn1.href} style={{
            background: 'white', color: '#18170F',
            fontSize: '0.9rem', fontWeight: 500,
            padding: '13px 28px', borderRadius: '100px',
            textDecoration: 'none', display: 'inline-block',
          }}>
            {content.btn1.label}
          </a>
          <a href={content.btn2.href} style={{
            color: 'rgba(255,255,255,0.85)',
            fontSize: '0.9rem', fontWeight: 400,
            padding: '12px 28px', borderRadius: '100px',
            textDecoration: 'none', display: 'inline-block',
            border: '1px solid rgba(255,255,255,0.25)',
          }}>
            {content.btn2.label}
          </a>
        </div>
      </div>
    </section>
  )
}
