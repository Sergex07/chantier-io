const COLS = [
  {
    title: 'Plateforme',
    links: ['Trouver un sous-traitant', 'Publier une demande', 'Répertoire', 'Tarifs'],
  },
  {
    title: 'Spécialités',
    links: ['Électricité', 'Plomberie', 'Charpenterie', 'HVAC'],
  },
  {
    title: 'Entreprise',
    links: ['À propos', 'Blogue', 'Contact', 'Confidentialité'],
  },
]

export default function FooterSection() {
  return (
    <footer style={{ borderTop: '1px solid #E8E6E1', background: 'white', padding: '48px 40px 32px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '40px' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: 28, height: 28, background: '#4A5568', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                </svg>
              </div>
              <span style={{ fontWeight: 800, fontSize: '1.05rem', color: '#18170F', letterSpacing: '-0.03em' }}>
                Chantier.io
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#6B6860', lineHeight: 1.65, maxWidth: '28ch' }}>
              La place de marché B2B de la construction québécoise. Trouvez les meilleurs sous-traitants, obtenez vos soumissions, gérez vos projets.
            </p>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <div key={col.title}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#18170F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                {col.title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" style={{ fontSize: '0.85rem', color: '#6B6860', textDecoration: 'none' }}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '24px', borderTop: '1px solid #E8E6E1' }}>
          <div style={{ fontSize: '0.78rem', color: '#B0B0B0' }}>© 2025 Chantier.io — Québec, Canada</div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['in', 'f', 'X'].map((s) => (
              <a key={s} href="#" style={{ width: 34, height: 34, border: '1px solid #DDDDDD', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#6B6860', textDecoration: 'none' }}>
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
