const emplois = [
  {
    titre: 'Électricien certifié — Chantiers commerciaux',
    entreprise: 'GC Construction Laval',
    ville: 'Laval', region: 'Rive-Nord',
    type: 'Permanent', salaire: '38–45 $/h',
    specialite: 'Électricité',
    publie: 'Il y a 2 jours',
  },
  {
    titre: 'Charpentier-menuisier — Résidentiel neuf',
    entreprise: 'Les Constructions Paradis',
    ville: 'Québec', region: 'Québec',
    type: 'Contrat', salaire: '32–38 $/h',
    specialite: 'Charpenterie',
    publie: 'Il y a 1 jour',
  },
  {
    titre: 'Plombier maître — Multilogement',
    entreprise: 'Groupe Immobilier Côté',
    ville: 'Montréal', region: 'Grand Montréal',
    type: 'Permanent', salaire: '42–50 $/h',
    specialite: 'Plomberie',
    publie: "Aujourd'hui",
  },
]

const typeBadge: Record<string, { bg: string; color: string }> = {
  Permanent: { bg: '#EFF6FF', color: '#1D4ED8' },
  Contrat:   { bg: '#FFF7ED', color: '#C2410C' },
}

export default function EmploisSection() {
  return (
    <div style={{ background: '#F9F8F6', padding: '80px 40px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px' }}>
            Offres d'emploi
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', fontWeight: 800, color: '#18170F', letterSpacing: '-0.04em', lineHeight: 1.15, margin: 0 }}>
              Emplois en vedette
            </h2>
            <a href="/emplois" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#6B6860', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Voir toutes les offres →
            </a>
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {emplois.map((e, i) => (
            <div key={i} style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
              {/* Top row: badges + salaire */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6B6860', background: '#F4F4F5', borderRadius: '100px', padding: '3px 10px' }}>
                    {e.specialite}
                  </span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 600, borderRadius: '100px', padding: '3px 10px', background: typeBadge[e.type]?.bg ?? '#F4F4F5', color: typeBadge[e.type]?.color ?? '#6B6860' }}>
                    {e.type}
                  </span>
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#18170F', whiteSpace: 'nowrap' }}>{e.salaire}</span>
              </div>

              {/* Title + company */}
              <div style={{ marginTop: '10px', marginBottom: '4px', fontSize: '1rem', fontWeight: 700, color: '#18170F', lineHeight: 1.35 }}>
                {e.titre}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#6B6860', flexGrow: 1 }}>{e.entreprise}</div>

              {/* Footer */}
              <div style={{ borderTop: '1px solid #F0EEEA', marginTop: '16px', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: '#6B6860' }}>
                  {e.ville} · {e.region}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#B0AEA8' }}>{e.publie}</span>
              </div>

              {/* CTA */}
              <a href="/emplois" style={{ marginTop: '16px', display: 'block', textAlign: 'center', padding: '8px 20px', fontSize: '0.82rem', fontWeight: 600, color: '#18170F', border: '1px solid #E8E6E1', borderRadius: '8px', textDecoration: 'none', background: 'white' }}>
                Voir l'offre →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
