'use client'

const TEMOIGNAGES = [
  {
    initiales: 'MR',
    nom: 'Michel Rousseau',
    role: 'Entrepreneur général',
    ville: 'Montréal',
    couleur: '#2563EB',
    texte: 'J\'ai trouvé trois sous-traitants fiables en moins d\'une semaine. La qualité des profils et la rapidité des réponses m\'ont vraiment impressionné.',
    note: 5,
  },
  {
    initiales: 'SB',
    nom: 'Sophie Bergeron',
    role: 'Propriétaire',
    ville: 'Québec',
    couleur: '#059669',
    texte: 'J\'avais besoin d\'un électricien certifié rapidement. Chantier.io m\'a mis en contact avec un pro qualifié le jour même. Je recommande sans hésiter.',
    note: 5,
  },
  {
    initiales: 'JP',
    nom: 'Jean-Philippe Tremblay',
    role: 'Plombier · Pro vérifié',
    ville: 'Laval',
    couleur: '#DC2626',
    texte: 'Depuis mon inscription, j\'ai décroché 8 contrats via la plateforme. Le processus est simple, les clients sont sérieux et les paiements sont rapides.',
    note: 5,
  },
]

export default function TemoignagesSection() {
  return (
    <section style={{ padding: '80px 40px', background: '#F9F8F6' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px' }}>
            TÉMOIGNAGES
          </p>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
            Ce qu'ils en disent
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {TEMOIGNAGES.map((t, i) => (
            <div key={i} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '28px 24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}>
              <div style={{ color: '#F59E0B', fontSize: '1rem', letterSpacing: '2px' }}>
                {'★'.repeat(t.note)}
              </div>
              <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.65, fontStyle: 'italic', margin: 0, flex: 1 }}>
                "{t.texte}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: 40, height: 40,
                  borderRadius: '50%',
                  background: t.couleur,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '0.78rem', fontWeight: 600, flexShrink: 0,
                }}>
                  {t.initiales}
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#18170F' }}>{t.nom}</div>
                  <div style={{ fontSize: '0.72rem', color: '#9B9891' }}>{t.role} · {t.ville}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
