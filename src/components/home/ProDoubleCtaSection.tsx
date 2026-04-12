export default function ProDoubleCtaSection() {
  return (
    <section style={{ padding: '64px 40px', background: 'white' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.03em', marginBottom: '10px' }}>
            Que cherchez-vous à faire?
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#6B6860', margin: 0 }}>
            Chantier.io s'adapte à votre rôle
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>

          {/* Carte 1 — Trouver un contrat */}
          <a href="/dashboard/demandes-disponibles" style={{
            display: 'block', textDecoration: 'none',
            padding: '40px 36px', borderRadius: '20px',
            background: '#18170F', color: 'white',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-20px', right: '-20px',
              width: '120px', height: '120px', borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
            }} />
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'rgba(255,255,255,0.12)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', marginBottom: '20px',
            }}>📂</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '10px' }}>
              SOUS-TRAITANT · GC
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 500, color: 'white', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: 1.2 }}>
              Je cherche<br />des contrats
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '28px' }}>
              Parcourez les demandes de soumissions ouvertes dans votre spécialité
              et votre région. Soumissionnez directement.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 500, color: 'white' }}>
              Voir les demandes disponibles
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </div>
          </a>

          {/* Carte 2 — Trouver un sous-traitant */}
          <a href="/demande-soumission" style={{
            display: 'block', textDecoration: 'none',
            padding: '40px 36px', borderRadius: '20px',
            background: '#F9F8F6', color: '#18170F',
            border: '1px solid #E8E6E1',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-20px', right: '-20px',
              width: '120px', height: '120px', borderRadius: '50%',
              background: 'rgba(0,0,0,0.03)',
            }} />
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'white', border: '1px solid #E8E6E1',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', marginBottom: '20px',
            }}>🔍</div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', color: '#9B9891', textTransform: 'uppercase', marginBottom: '10px' }}>
              ENTREPRENEUR GÉNÉRAL · PROMOTEUR
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', marginBottom: '12px', lineHeight: 1.2 }}>
              Je cherche<br />un sous-traitant
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#6B6860', lineHeight: 1.6, marginBottom: '28px' }}>
              Publiez une demande de soumission et recevez des offres
              de sous-traitants qualifiés de votre région en 24–48h.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 500, color: '#18170F' }}>
              Publier une demande
              <span style={{ fontSize: '1.1rem' }}>→</span>
            </div>
          </a>

        </div>

        {/* Ligne du bas */}
        <a href="/trouver-travailleur" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginTop: '16px', padding: '20px 28px',
          background: 'white', border: '1px solid #E8E6E1',
          borderRadius: '14px', textDecoration: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '1.3rem' }}>👷</span>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#18170F' }}>
                Trouver un travailleur de la construction
              </div>
              <div style={{ fontSize: '0.78rem', color: '#9B9891', marginTop: '2px' }}>
                Électriciens, plombiers, charpentiers disponibles dans votre région
              </div>
            </div>
          </div>
          <span style={{ color: '#D0CEC8', fontSize: '1.2rem' }}>›</span>
        </a>

      </div>
    </section>
  )
}
