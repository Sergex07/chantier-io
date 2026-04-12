const offres = [
  { titre: 'Électricien certifié', entreprise: 'Groupe Électro Québec', ville: 'Laval', type: 'Permanent', salaire: '38–45$/h', specialite: 'Électricité', urgent: true },
  { titre: 'Plombier maître', entreprise: 'Construction Nordique', ville: 'Montréal', type: 'Contrat', salaire: '42–50$/h', specialite: 'Plomberie', urgent: false },
  { titre: 'Charpentier-menuisier', entreprise: 'Les Constructions Paradis', ville: 'Québec', type: 'Permanent', salaire: '32–38$/h', specialite: 'Charpenterie', urgent: false },
  { titre: 'Opérateur machinerie lourde', entreprise: 'Excavation Rive-Nord', ville: 'Terrebonne', type: 'Contrat', salaire: '36–44$/h', specialite: 'Excavation', urgent: true },
  { titre: 'Couvreur expérimenté', entreprise: 'Toitures Beaumont', ville: 'Longueuil', type: 'Saisonnier', salaire: '28–35$/h', specialite: 'Toiture', urgent: false },
  { titre: 'Soudeur certifié', entreprise: 'Industries Côté', ville: 'Rive-Sud', type: 'Permanent', salaire: '40–48$/h', specialite: 'Soudage', urgent: false },
]

const typeColor = (type: string): { bg: string; text: string } =>
  ({ Permanent: { bg: '#F0FDF4', text: '#16A34A' },
     Contrat:   { bg: '#FFF7ED', text: '#EA580C' },
     Saisonnier:{ bg: '#F0F9FF', text: '#0284C7' },
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

        {/* Grille 2 colonnes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {offres.map((o, i) => {
            const colors = typeColor(o.type)
            return (
              <div key={i} style={{
                background: 'white', border: 'none',
                borderRadius: '14px', padding: '20px',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}>

                {/* Header : badges + urgent */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 500, background: '#F4F4F5', color: '#6B6860' }}>
                      {o.specialite}
                    </span>
                    <span style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 500, background: colors.bg, color: colors.text }}>
                      {o.type}
                    </span>
                  </div>
                  {o.urgent && (
                    <span style={{ padding: '2px 10px', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 600, background: '#FEF2F2', color: '#DC2626', flexShrink: 0 }}>
                      Urgent
                    </span>
                  )}
                </div>

                {/* Titre */}
                <h3 style={{ fontSize: '1rem', fontWeight: 500, color: '#18170F', margin: '2px 0 2px' }}>
                  {o.titre}
                </h3>

                {/* Entreprise + ville */}
                <p style={{ fontSize: '0.78rem', color: '#6B6860', margin: 0 }}>
                  {o.entreprise} · 📍 {o.ville}
                </p>

                {/* Séparateur */}
                <div style={{ borderTop: '1px solid #F0EEEA', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#18170F' }}>
                    {o.salaire}
                  </span>
                  <a href="/emplois" style={{
                    padding: '7px 16px', border: '1px solid #E8E6E1', borderRadius: '100px',
                    textDecoration: 'none', fontSize: '0.78rem', color: '#18170F',
                    fontWeight: 400, background: 'white',
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
