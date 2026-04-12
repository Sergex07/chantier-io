const partenaires = [
  { nom: 'Commission CCQ', desc: 'Carte de compétence, avantages sociaux, retraite', icon: '🏛️', url: 'https://ccq.org' },
  { nom: 'ASP Construction', desc: 'Formations santé-sécurité, certifications', icon: '🦺', url: 'https://asp-construction.org' },
  { nom: 'Emploi-Québec', desc: "Offres d'emploi, aide à la recherche", icon: '💼', url: 'https://emploiquebec.gouv.qc.ca' },
  { nom: 'CNESST', desc: 'Droits des travailleurs, accidents de travail', icon: '⚖️', url: 'https://cnesst.gouv.qc.ca' },
]

export default function TravailleurPartenairesSection() {
  return (
    <section style={{ padding: '80px 40px', background: '#F9F8F6' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
            PARTENAIRES
          </p>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
            Ressources utiles pour les travailleurs
          </h2>
        </div>

        {/* Grille 2×2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {partenaires.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', gap: '16px', alignItems: 'flex-start',
              background: 'white', border: '1px solid #E8E6E1',
              borderRadius: '12px', padding: '20px',
              textDecoration: 'none',
              transition: 'box-shadow 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.07)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '10px',
                background: '#F9F8F6', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0,
              }}>
                {p.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#18170F' }}>
                    {p.nom}
                  </span>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9B9891" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#6B6860', margin: 0, lineHeight: 1.5 }}>
                  {p.desc}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
