'use client'

const WORKERS = [
  { nom: 'Marc Bouchard',     metier: 'Électricien',  niveau: 'Compagnon', region: 'Laval',     exp: 12, dispo: 'disponible' },
  { nom: 'Jean-Philippe Roy', metier: 'Plombier',     niveau: 'Maître',    region: 'Montréal',  exp: 18, dispo: 'ouvert' },
  { nom: 'Sylvain Gagnon',    metier: 'Charpentier',  niveau: 'Compagnon', region: 'Rive-Nord', exp: 8,  dispo: 'occupe' },
]

function getInitials(name: string): string {
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name[0]?.toUpperCase() ?? '?'
}

function getDispoColor(dispo: string): string {
  if (dispo === 'disponible') return '#16A34A'
  if (dispo === 'ouvert') return '#2563EB'
  return '#6B7280'
}

function getDispoLabel(dispo: string): string {
  if (dispo === 'disponible') return 'Disponible'
  if (dispo === 'ouvert') return 'Ouvert aux opportunités'
  return 'En poste'
}

function getNiveauStyle(niveau: string): { bg: string; color: string } {
  if (niveau === 'Maître') return { bg: '#FEF3C7', color: '#92400E' }
  if (niveau === 'Apprenti') return { bg: '#DBEAFE', color: '#1D4ED8' }
  return { bg: '#F3F4F6', color: '#374151' }
}

type Worker = typeof WORKERS[0]

function WorkerCard({ w }: { w: Worker }) {
  const initials = getInitials(w.nom)
  const dispoColor = getDispoColor(w.dispo)
  const dispoLabel = getDispoLabel(w.dispo)
  const niveauStyle = getNiveauStyle(w.niveau)
  const dispoBg = dispoColor === '#16A34A' ? '#F0FDF4' : dispoColor === '#2563EB' ? '#EFF6FF' : '#F9FAFB'

  return (
    <a
      href="/trouver-travailleur"
      style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', padding: '20px', textDecoration: 'none', display: 'block', transition: 'box-shadow 0.2s, transform 0.2s' }}
      onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'; el.style.transform = 'translateY(-4px)' }}
      onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: dispoColor, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>
          {initials}
        </div>
        <div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#18170F' }}>{w.nom}</div>
          <div style={{ fontSize: '0.82rem', color: '#6B6860', marginTop: '2px' }}>{w.metier} · {w.region}</div>
        </div>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '100px', background: niveauStyle.bg, color: niveauStyle.color, fontSize: '0.75rem', fontWeight: 600 }}>
          {w.niveau} CCQ
        </span>
      </div>
      <div style={{ fontSize: '0.82rem', color: '#6B6860', marginBottom: '10px' }}>
        🔨 {w.exp} ans d'expérience
      </div>
      <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '100px', background: dispoBg, color: dispoColor, fontSize: '0.75rem', fontWeight: 600 }}>
        {dispoLabel}
      </div>
    </a>
  )
}

export default function TravailleursSection() {
  return (
    <section style={{ padding: '80px 40px', background: 'white' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
              TRAVAILLEURS
            </p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
              Profils en vedette
            </h2>
          </div>
          <a href="/trouver-travailleur" style={{ fontSize: '0.82rem', color: '#6B6860', textDecoration: 'none' }}>
            Voir tout →
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
          {WORKERS.map((w, i) => <WorkerCard key={i} w={w} />)}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="/inscription?type=travailleur"
            style={{ display: 'inline-block', padding: '13px 28px', background: '#18170F', color: 'white', borderRadius: '10px', textDecoration: 'none', fontSize: '0.95rem', fontWeight: 600 }}
          >
            Créer mon profil travailleur gratuitement →
          </a>
        </div>
      </div>
    </section>
  )
}
