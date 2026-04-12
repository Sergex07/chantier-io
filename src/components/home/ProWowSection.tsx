const FEATURES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    titre: 'Accédez à un réseau de sous-traitants vérifiés',
    desc: 'Électriciens, plombiers, charpentiers, peintres — trouvez les spécialistes certifiés RBQ pour chaque phase de vos chantiers.',
    lien: '/trouver-professionnel',
    label: 'Parcourir les profils →',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
      </svg>
    ),
    titre: 'Répondez aux appels d\'offres en quelques clics',
    desc: 'Clients directs et promoteurs publient leurs projets quotidiennement. Soumissionnez en quelques minutes, suivez vos offres en temps réel.',
    lien: '/demandes',
    label: 'Voir les demandes actives →',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
        <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    titre: 'Commandez vos matériaux directement',
    desc: 'Fournisseurs locaux, grandes enseignes, livraison sur chantier — tout votre approvisionnement en un seul endroit.',
    lien: '/detaillants',
    label: 'Voir les fournisseurs →',
  },
]

export default function ProWowSection() {
  return (
    <section style={{ padding: '80px 40px', background: '#18170F' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '56px', maxWidth: '600px' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '16px' }}>
            POUR LES ENTREPRENEURS GÉNÉRAUX
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 300, color: 'white', letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: '16px' }}>
            Tout ce dont un entrepreneur général a besoin,{' '}
            <span style={{ fontWeight: 600 }}>au même endroit</span>
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, margin: 0 }}>
            Chantier.io centralise vos sous-traitants, vos contrats et vos fournisseurs pour que vous passiez moins de temps à chercher et plus de temps à bâtir.
          </p>
        </div>

        {/* Features grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', borderRadius: '16px', overflow: 'hidden' }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              background: i === 1 ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
              padding: '36px 32px',
              display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.8)', marginBottom: '24px', flexShrink: 0,
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'white', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: 1.3 }}>
                {f.titre}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, margin: '0 0 24px', flexGrow: 1 }}>
                {f.desc}
              </p>
              <a href={f.lien} style={{ fontSize: '0.82rem', fontWeight: 500, color: 'rgba(255,255,255,0.75)', textDecoration: 'none' }}>
                {f.label}
              </a>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div style={{ marginTop: '40px', padding: '20px 28px', background: 'rgba(255,255,255,0.06)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
            {[
              { num: '247', label: 'demandes actives' },
              { num: '1 458', label: 'professionnels inscrits' },
              { num: '89', label: 'villes couvertes' },
            ].map(s => (
              <div key={s.label}>
                <span style={{ fontSize: '1.3rem', fontWeight: 600, color: 'white', letterSpacing: '-0.03em' }}>{s.num}</span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginLeft: '8px' }}>{s.label}</span>
              </div>
            ))}
          </div>
          <a href="/inscription" style={{
            padding: '10px 22px', background: 'white', color: '#18170F',
            borderRadius: '9px', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600,
            flexShrink: 0,
          }}>
            Créer mon profil Pro gratuit →
          </a>
        </div>

      </div>
    </section>
  )
}
