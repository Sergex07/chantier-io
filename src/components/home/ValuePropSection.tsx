export default function ValuePropSection() {
  return (
    <section style={{ padding: '80px 40px', background: '#18170F' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>

        {/* Gauche — grande phrase */}
        <div>
          <p style={{ fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '20px' }}>
            POURQUOI CHANTIER.IO
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 500, color: 'white', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '24px' }}>
            La plateforme de construction du Québec
          </h2>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '36px', maxWidth: '400px' }}>
            Que vous soyez propriétaire, entrepreneur général ou sous-traitant — Chantier.io connecte les bonnes personnes pour chaque projet.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a href="/demande-soumission" style={{
              padding: '12px 24px', background: 'white', color: '#18170F',
              borderRadius: '100px', textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 500,
            }}>
              Publier une demande →
            </a>
            <a href="/inscription" style={{
              padding: '11px 24px', color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '100px', textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: 400,
            }}>
              Créer un compte
            </a>
          </div>
        </div>

        {/* Droite — stats empilées */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {[
            { num: '1 458', label: 'Professionnels inscrits', sub: 'Vérifiés et notés par leurs clients' },
            { num: '247', label: 'Demandes actives', sub: 'Nouvelles chaque semaine au Québec' },
            { num: '48h', label: 'Délai moyen', sub: 'Pour recevoir vos premières soumissions' },
            { num: '89', label: 'Villes couvertes', sub: 'Partout au Québec' },
          ].map((stat, i) => (
            <div key={i} style={{
              padding: '24px 0',
              borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.07)' : 'none',
              display: 'flex', alignItems: 'center', gap: '24px',
            }}>
              <div style={{ minWidth: '80px' }}>
                <div style={{ fontSize: '2rem', fontWeight: 500, color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>
                  {stat.num}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500, color: 'rgba(255,255,255,0.85)', marginBottom: '3px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.4 }}>
                  {stat.sub}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
