const partenaires = [
  { nom: 'Commission CCQ', desc: 'Carte de compétence, avantages sociaux, retraite', icon: '🏛️', url: 'https://ccq.org' },
  { nom: 'ASP Construction', desc: 'Formations santé-sécurité, certifications', icon: '🦺', url: 'https://asp-construction.org' },
  { nom: 'Emploi-Québec', desc: "Offres d'emploi, aide à la recherche", icon: '💼', url: 'https://emploiquebec.gouv.qc.ca' },
  { nom: 'CNESST', desc: 'Droits des travailleurs, accidents de travail', icon: '⚖️', url: 'https://cnesst.gouv.qc.ca' },
]

export default function TravailleurPartenairesSection() {
  return (
    <section style={{ padding: '80px 40px', background: 'white' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
            RESSOURCES
          </p>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
            Organismes partenaires
          </h2>
        </div>

        {/* Grille 2×2 */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {partenaires.map((p, i) => (
            <a key={i} href={p.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', gap: '16px', alignItems: 'flex-start',
              background: '#F9F8F6', border: 'none',
              borderRadius: '14px', padding: '24px',
              textDecoration: 'none',
              transition: 'box-shadow 0.15s',
            }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none' }}
            >
              {/* Icône dans cercle blanc */}
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'white', display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0,
                boxShadow: '0 1px 6px rgba(0,0,0,0.08)',
              }}>
                {p.icon}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 500, color: '#18170F', marginBottom: '4px' }}>
                  {p.nom}
                </div>
                <p style={{ fontSize: '0.78rem', color: '#6B6860', margin: '0 0 10px', lineHeight: 1.5 }}>
                  {p.desc}
                </p>
                <span style={{ fontSize: '0.78rem', color: '#4A5568', fontWeight: 500 }}>
                  Visiter →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
