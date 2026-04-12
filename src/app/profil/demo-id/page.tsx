const profil = {
  full_name: 'Alexandre Gagnon',
  company_name: 'Voltex Électrique inc.',
  specialites: ['Électricité', 'HVAC', 'Domotique'],
  region: 'Laval',
  ville: 'Laval',
  description: 'Entreprise spécialisée en électricité commerciale et résidentielle depuis plus de 15 ans. Voltex Électrique intervient sur tous types de projets : bâtiments commerciaux, immeubles multilogements, rénovations résidentielles. Notre équipe certifiée RBQ garantit des installations conformes aux normes en vigueur, dans les délais convenus.',
  rbq_numero: '5678-0987-01',
  ccq_numero: 'membre',
}

const evals = [
  { nom: 'Pierre Beauchamp', note: 5, commentaire: 'Travail impeccable, ponctuel et professionnel. Je recommande Voltex sans hésitation.', date: 'Mars 2026' },
  { nom: 'Marie-Claude Vézina', note: 5, commentaire: 'Excellente communication tout au long du projet, résultat parfait.', date: 'Fév. 2026' },
  { nom: 'Groupe Immobilier Côté', note: 5, commentaire: 'Très satisfait du travail réalisé sur notre immeuble de 24 unités. Sérieux et efficace.', date: 'Jan. 2026' },
]

export default function DemoProfilPage() {
  const initiales = profil.full_name.split(' ').map(n => n[0]).join('').toUpperCase()

  return (
    <div style={{ minHeight: '100vh', background: '#F9F8F6', paddingTop: '80px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '24px', alignItems: 'start' }}>

        {/* SIDEBAR */}
        <div style={{ position: 'sticky', top: '90px' }}>

          {/* Card profil */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '28px', marginBottom: '16px', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#18170F', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', fontSize: '1.5rem', fontWeight: 600, color: 'white' }}>
              {initiales}
            </div>
            <h1 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#18170F', marginBottom: '4px', letterSpacing: '-0.02em' }}>
              {profil.full_name}
            </h1>
            <p style={{ fontSize: '0.82rem', color: '#6B6860', marginBottom: '12px' }}>{profil.company_name}</p>
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
              {profil.specialites.slice(0, 2).map(s => (
                <span key={s} style={{ padding: '3px 10px', background: '#F4F4F5', borderRadius: '100px', fontSize: '0.72rem', color: '#6B6860', fontWeight: 500 }}>{s}</span>
              ))}
              <span style={{ padding: '3px 10px', background: '#F0FDF4', color: '#16A34A', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 500 }}>✓ Vérifié</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '10px' }}>
              <span style={{ color: '#F59E0B', fontSize: '0.9rem' }}>★★★★★</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#18170F' }}>4.97</span>
              <span style={{ fontSize: '0.78rem', color: '#9B9891' }}>(148 évals.)</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#6B6860', marginBottom: '20px' }}>📍 Laval · Laval</p>
            <a href="/inscription" style={{ display: 'block', width: '100%', padding: '11px', background: '#18170F', color: 'white', borderRadius: '9px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, textAlign: 'center', marginBottom: '10px', boxSizing: 'border-box' }}>
              Contacter
            </a>
            <a href="/inscription" style={{ display: 'block', width: '100%', padding: '11px', background: 'white', color: '#18170F', border: '1px solid #E8E6E1', borderRadius: '9px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 400, textAlign: 'center', boxSizing: 'border-box' }}>
              Demander une soumission
            </a>
          </div>

          {/* Infos rapides */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '20px' }}>
            {[
              { label: 'Membre depuis', val: 'Janvier 2025' },
              { label: 'Projets complétés', val: '148' },
              { label: 'Taux de réponse', val: '99%' },
              { label: 'Délai de réponse', val: '< 1h' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F0EEEA' }}>
                <span style={{ fontSize: '0.78rem', color: '#6B6860' }}>{item.label}</span>
                <span style={{ fontSize: '0.78rem', fontWeight: 500, color: '#18170F' }}>{item.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CONTENU PRINCIPAL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Photos de réalisations */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', overflow: 'hidden' }}>
            <div style={{ height: '200px', backgroundImage: 'url(https://images.unsplash.com/photo-1621905252472-943afaa20e20?w=900&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.3) 100%)' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', padding: '2px' }}>
              {[
                'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
                'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&q=80',
                'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80',
              ].map((url, i) => (
                <div key={i} style={{ height: '100px', backgroundImage: `url(${url})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: i === 0 ? '0 0 0 14px' : i === 2 ? '0 0 14px 0' : '0', cursor: 'pointer' }} />
              ))}
            </div>
            <div style={{ padding: '12px 16px', borderTop: '1px solid #F0EEEA' }}>
              <span style={{ fontSize: '0.75rem', color: '#9B9891' }}>📸 4 photos de réalisations</span>
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '28px' }}>
            <h2 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>À propos</h2>
            <p style={{ fontSize: '0.9rem', color: '#3D3C38', lineHeight: 1.65, margin: 0 }}>{profil.description}</p>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '28px' }}>
            <h2 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Spécialités</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {profil.specialites.map(s => (
                <span key={s} style={{ padding: '6px 14px', background: '#F4F4F5', borderRadius: '100px', fontSize: '0.8rem', color: '#18170F' }}>{s}</span>
              ))}
            </div>
            <p style={{ fontSize: '0.78rem', color: '#6B6860', margin: '0 0 4px' }}>🏛️ Licence RBQ : {profil.rbq_numero}</p>
            <p style={{ fontSize: '0.78rem', color: '#6B6860', margin: 0 }}>✓ Membre CCQ</p>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '28px' }}>
            <h2 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Zone de service</h2>
            <p style={{ fontSize: '0.9rem', color: '#18170F', marginBottom: '8px', fontWeight: 500 }}>Laval et environs</p>
            <p style={{ fontSize: '0.82rem', color: '#6B6860', margin: 0 }}>Rayon d'action : 100 km · Service disponible sur rendez-vous</p>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Évaluations</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#F59E0B' }}>★★★★★</span>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>4.97</span>
                <span style={{ color: '#9B9891', fontSize: '0.78rem' }}>/5 · 148 évaluations</span>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {evals.map((e, i) => (
                <div key={i} style={{ padding: '16px', background: '#F9F8F6', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontWeight: 500, fontSize: '0.85rem', color: '#18170F' }}>{e.nom}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ color: '#F59E0B', fontSize: '0.8rem' }}>{'★'.repeat(e.note)}</span>
                      <span style={{ fontSize: '0.75rem', color: '#9B9891' }}>{e.date}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#6B6860', lineHeight: 1.5, margin: 0 }}>{e.commentaire}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
