'use client'

import { useState } from 'react'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }
  return (
    <button onClick={copy} style={{ padding: '8px 16px', borderRadius: '8px', border: '1px solid #E8E6E1', background: copied ? '#F0FDF4' : 'white', color: copied ? '#16A34A' : '#18170F', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
      {copied ? '✓ Copié !' : 'Copier'}
    </button>
  )
}

export default function ParrainagePage() {
  const code = 'CHANTIER-XXXX'
  const lien = `https://chantier.io/inscription?ref=${code}`

  return (
    <div style={{ maxWidth: '700px' }}>

      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #18170F 0%, #4A5568 100%)', borderRadius: '16px', padding: '32px', marginBottom: '24px', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '10px' }}>🎁</div>
        <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em', marginBottom: '8px' }}>Invitez vos collègues</div>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.65)', margin: '0 0 24px', lineHeight: 1.6 }}>
          Gagnez 1 mois gratuit pour chaque professionnel qui s'inscrit avec votre lien et active un abonnement payant.
        </p>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a
            href={`https://wa.me/?text=Rejoins-moi sur Chantier.io avec mon lien : ${encodeURIComponent(lien)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ padding: '9px 18px', borderRadius: '9px', background: '#25D366', color: 'white', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}
          >
            📱 WhatsApp
          </a>
          <a
            href={`mailto:?subject=Rejoins Chantier.io&body=Salut ! Je t'invite à rejoindre Chantier.io avec mon lien : ${lien}`}
            style={{ padding: '9px 18px', borderRadius: '9px', background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}
          >
            ✉️ Email
          </a>
        </div>
      </div>

      {/* Code + lien */}
      <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', padding: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Votre code</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ flex: 1, padding: '12px 16px', background: '#F9F8F6', border: '1px solid #F0EEEA', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 800, color: '#18170F', letterSpacing: '0.06em' }}>
              {code}
            </div>
            <CopyButton text={code} />
          </div>
        </div>
        <div>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>Votre lien de parrainage</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ flex: 1, padding: '10px 14px', background: '#F9F8F6', border: '1px solid #F0EEEA', borderRadius: '8px', fontSize: '0.82rem', color: '#6B6860', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {lien}
            </div>
            <CopyButton text={lien} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {[
          { label: 'Invités envoyés', value: '0', icon: '👥' },
          { label: 'Convertis', value: '0', icon: '✅' },
          { label: 'Mois gratuits gagnés', value: '0', icon: '🎁' },
        ].map(s => (
          <div key={s.label} style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '14px', padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{s.icon}</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#18170F', letterSpacing: '-0.03em', lineHeight: 1 }}>{s.value}</div>
            <div style={{ fontSize: '0.72rem', color: '#6B6860', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
