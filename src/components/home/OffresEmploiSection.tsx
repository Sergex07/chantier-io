const offres = [
  { titre: 'Électricien certifié', entreprise: 'Groupe Électro Québec', ville: 'Laval', type: 'Permanent', salaire: '38–45$/h', specialite: 'Électricité', urgent: true, couleur: '#FEF9C3' },
  { titre: 'Plombier maître', entreprise: 'Construction Nordique', ville: 'Montréal', type: 'Contrat', salaire: '42–50$/h', specialite: 'Plomberie', urgent: false, couleur: '#DBEAFE' },
  { titre: 'Charpentier-menuisier', entreprise: 'Les Constructions Paradis', ville: 'Québec', type: 'Permanent', salaire: '32–38$/h', specialite: 'Charpenterie', urgent: false, couleur: '#D1FAE5' },
  { titre: 'Opérateur machinerie lourde', entreprise: 'Excavation Rive-Nord', ville: 'Terrebonne', type: 'Contrat', salaire: '36–44$/h', specialite: 'Excavation', urgent: true, couleur: '#FCE7F3' },
  { titre: 'Couvreur expérimenté', entreprise: 'Toitures Beaumont', ville: 'Longueuil', type: 'Saisonnier', salaire: '28–35$/h', specialite: 'Toiture', urgent: false, couleur: '#E0E7FF' },
  { titre: 'Soudeur certifié', entreprise: 'Industries Côté', ville: 'Rive-Sud', type: 'Permanent', salaire: '40–48$/h', specialite: 'Soudage', urgent: false, couleur: '#FEE2E2' },
]

const typeColor = (type: string): { bg: string; text: string } =>
  ({ Permanent:  { bg: '#F0FDF4', text: '#16A34A' },
     Contrat:    { bg: '#FFF7ED', text: '#EA580C' },
     Saisonnier: { bg: '#F0F9FF', text: '#0284C7' },
  }[type] ?? { bg: '#F4F4F5', text: '#6B6860' })

export default function OffresEmploiSection() {
  return (
    <section style={{ padding: '80px 40px', background: '#F9F8F6' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
              OFFRES D&apos;EMPLOI
            </p>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
              Postes disponibles au Québec
            </h2>
          </div>
          <a href="/emplois" style={{ fontSize: '0.82rem', color: '#6B6860', textDecoration: 'none' }}>
            Voir toutes les offres →
          </a>
        </div>

        {/* Grille 3 colonnes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}>
          {offres.map((o, i) => {
            const colors = typeColor(o.type)
            const initiale = o.entreprise[0].toUpperCase()
            return (
              <div key={i} style={{
                background: 'white', borderRadius: '16px',
                padding: '22px', boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
                display: 'flex', flexDirection: 'column', gap: '14px',
                position: 'relative',
              }}>

                {/* Badge urgent */}
                {o.urgent && (
                  <span style={{
                    position: 'absolute', top: '16px', right: '16px',
                    padding: '2px 9px', borderRadius: '100px',
                    fontSize: '0.65rem', fontWeight: 600,
                    background: '#FEF2F2', color: '#DC2626',
                  }}>
                    Urgent
                  </span>
                )}

                {/* Avatar entreprise + spécialité */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '10px',
                    background: o.couleur, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1rem', fontWeight: 700,
                    color: '#18170F', flexShrink: 0,
                  }}>
                    {initiale}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 500, color: '#18170F',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {o.entreprise}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#9B9891' }}>📍 {o.ville}</div>
                  </div>
                </div>

                {/* Titre du poste */}
                <div>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#18170F', margin: '0 0 8px', lineHeight: 1.3 }}>
                    {o.titre}
                  </h3>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ padding: '3px 9px', borderRadius: '100px', fontSize: '0.67rem', fontWeight: 500, background: '#F4F4F5', color: '#6B6860' }}>
                      {o.specialite}
                    </span>
                    <span style={{ padding: '3px 9px', borderRadius: '100px', fontSize: '0.67rem', fontWeight: 500, background: colors.bg, color: colors.text }}>
                      {o.type}
                    </span>
                  </div>
                </div>

                {/* Salaire + CTA */}
                <div style={{ borderTop: '1px solid #F4F4F5', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                  <div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#18170F', lineHeight: 1 }}>
                      {o.salaire}
                    </div>
                  </div>
                  <a href="/emplois" style={{
                    padding: '8px 16px', background: '#18170F', color: 'white',
                    borderRadius: '100px', textDecoration: 'none',
                    fontSize: '0.75rem', fontWeight: 500,
                  }}>
                    Postuler →
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
