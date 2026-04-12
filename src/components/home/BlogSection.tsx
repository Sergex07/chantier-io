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

export default function BlogSection() {
  return (
    <section style={{ padding: '80px 40px', background: '#F9F8F6' }}>
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
          {articles.map((a, i) => (
            <div key={i} style={{
              background: 'white', border: 'none',
              borderRadius: '14px', overflow: 'hidden',
              display: 'flex', flexDirection: 'column',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            }}>
              {/* Image avec overlay catégorie */}
              <div style={{
                height: '180px',
                backgroundImage: `url(${a.img})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
                borderRadius: '14px 14px 0 0', position: 'relative', flexShrink: 0,
              }}>
                <span style={{
                  position: 'absolute', top: '12px', left: '12px',
                  padding: '4px 10px', borderRadius: '100px',
                  background: 'rgba(0,0,0,0.55)', color: 'white',
                  fontSize: '0.68rem', fontWeight: 600, backdropFilter: 'blur(4px)',
                }}>
                  {a.categorie}
                </span>
              </div>

              {/* Contenu */}
              <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 500, color: '#18170F', lineHeight: 1.4, margin: '0 0 8px' }}>
                  {a.titre}
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#6B6860', lineHeight: 1.55, margin: '0 0 16px', flex: 1 }}>
                  {a.extrait}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.72rem', color: '#9B9891' }}>
                    {a.date} · {a.tempsLecture}
                  </span>
                  <a href="/blogue" style={{ fontSize: '0.78rem', color: '#18170F', textDecoration: 'none', fontWeight: 500 }}>
                    Lire →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
