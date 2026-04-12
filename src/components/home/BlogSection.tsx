const articles = [
  {
    titre: 'Comment négocier votre taux horaire en 2026',
    extrait: 'Les salaires dans la construction québécoise ont augmenté de 8% en 2025. Voici comment vous positionner pour obtenir le meilleur taux.',
    categorie: 'Carrière', tempsLecture: '4 min', date: '10 avr. 2026',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80',
  },
  {
    titre: 'CCQ 2026 : nouveaux règlements à connaître',
    extrait: 'La Commission de la construction du Québec a mis à jour plusieurs règlements. Ce qui change pour les travailleurs cette année.',
    categorie: 'Réglementation', tempsLecture: '6 min', date: '5 avr. 2026',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  },
  {
    titre: "5 certifications qui valent leur pesant d'or en construction",
    extrait: "Certaines certifications peuvent augmenter votre salaire de 20 à 40%. Lesquelles prioriser selon votre métier.",
    categorie: 'Formation', tempsLecture: '5 min', date: '1 avr. 2026',
    img: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
  },
]

const categorieColor = (cat: string) => ({
  'Carrière':       { bg: '#EFF6FF', text: '#1D4ED8' },
  'Réglementation': { bg: '#FFF7ED', text: '#C2410C' },
  'Formation':      { bg: '#F0FDF4', text: '#16A34A' },
}[cat] ?? { bg: '#F4F4F5', text: '#6B6860' })

export default function BlogSection() {
  return (
    <section style={{ padding: '80px 40px', background: 'white' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '0.7rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
              BLOGUE
            </p>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 500, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
              Actualités &amp; conseils
            </h2>
          </div>
          <a href="/blogue" style={{ fontSize: '0.82rem', color: '#6B6860', textDecoration: 'none' }}>
            Tous les articles →
          </a>
        </div>

        {/* Grille 3 colonnes */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {articles.map((a, i) => {
            const badge = categorieColor(a.categorie)
            return (
              <div key={i} style={{
                background: 'white', border: '1px solid #E8E6E1',
                borderRadius: '14px', overflow: 'hidden',
                display: 'flex', flexDirection: 'column',
              }}>
                {/* Image */}
                <div style={{
                  height: '180px',
                  backgroundImage: `url(${a.img})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  flexShrink: 0,
                }} />

                {/* Contenu */}
                <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Badge catégorie */}
                  <span style={{
                    alignSelf: 'flex-start',
                    padding: '3px 10px', borderRadius: '100px', fontSize: '0.68rem', fontWeight: 600,
                    background: badge.bg, color: badge.text, marginBottom: '10px',
                  }}>
                    {a.categorie}
                  </span>

                  {/* Titre */}
                  <h3 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#18170F', lineHeight: 1.4, margin: '0 0 8px' }}>
                    {a.titre}
                  </h3>

                  {/* Extrait */}
                  <p style={{ fontSize: '0.78rem', color: '#6B6860', lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>
                    {a.extrait}
                  </p>

                  {/* Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', color: '#9B9891' }}>
                      {a.date} · {a.tempsLecture}
                    </span>
                    <a href="/blogue" style={{
                      fontSize: '0.78rem', color: '#18170F', textDecoration: 'none', fontWeight: 500,
                    }}>
                      Lire →
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
