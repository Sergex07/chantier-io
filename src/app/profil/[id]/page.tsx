import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

export default async function ProfilPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: profil } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!profil) notFound()

  const initiales = profil.full_name
    ?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || '?'

  const specialites = profil.specialites || []
  const region = profil.region || 'Québec'
  const ville = profil.ville || ''

  const evals = [
    { nom: 'Pierre Beauchamp', note: 5, commentaire: 'Travail impeccable, ponctuel et professionnel.', date: 'Mars 2026' },
    { nom: 'Marie-Claude Vézina', note: 5, commentaire: 'Excellente communication, résultat parfait.', date: 'Fév. 2026' },
    { nom: 'Groupe Immobilier Côté', note: 4, commentaire: 'Bon travail, léger retard mais qualité au rendez-vous.', date: 'Jan. 2026' },
  ]

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
            <h1 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#18170F', marginBottom: '6px', letterSpacing: '-0.02em' }}>
              {profil.full_name || 'Professionnel'}
            </h1>
            {profil.company_name && (
              <p style={{ fontSize: '0.82rem', color: '#6B6860', marginBottom: '8px' }}>{profil.company_name}</p>
            )}
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '14px' }}>
              {specialites.slice(0, 2).map((s: string) => (
                <span key={s} style={{ padding: '3px 10px', background: '#F4F4F5', borderRadius: '100px', fontSize: '0.72rem', color: '#6B6860', fontWeight: 500 }}>{s}</span>
              ))}
              <span style={{ padding: '3px 10px', background: '#F0FDF4', color: '#16A34A', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 500 }}>✓ Vérifié</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '10px' }}>
              <span style={{ color: '#F59E0B', fontSize: '0.9rem' }}>★★★★★</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#18170F' }}>4.9</span>
              <span style={{ fontSize: '0.78rem', color: '#9B9891' }}>(47 évals.)</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#6B6860', marginBottom: '20px' }}>
              📍 {ville ? `${ville} · ` : ''}{region}
            </p>
            <a href="/dashboard/messages" style={{ display: 'block', width: '100%', padding: '11px', background: '#18170F', color: 'white', borderRadius: '9px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, textAlign: 'center', marginBottom: '10px', boxSizing: 'border-box' }}>
              Contacter
            </a>
            <a href="/inscription" style={{ display: 'block', width: '100%', padding: '11px', background: 'white', color: '#18170F', border: '1px solid #E8E6E1', borderRadius: '9px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 400, textAlign: 'center', boxSizing: 'border-box' }}>
              Demander une soumission
            </a>
          </div>

          {/* Card infos rapides */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '20px' }}>
            {[
              { label: 'Membre depuis', val: 'Janvier 2025' },
              { label: 'Projets complétés', val: '47' },
              { label: 'Taux de réponse', val: '98%' },
              { label: 'Délai de réponse', val: '< 2h' },
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

          {/* À propos */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '28px' }}>
            <h2 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>À propos</h2>
            <p style={{ fontSize: '0.9rem', color: '#3D3C38', lineHeight: 1.65 }}>
              {profil.description || 'Ce professionnel n\'a pas encore ajouté de description. Contactez-le directement pour en savoir plus sur son expérience et ses services.'}
            </p>
          </div>

          {/* Spécialités */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '28px' }}>
            <h2 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Spécialités</h2>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
              {(specialites.length ? specialites : ['Électricité', 'HVAC', 'Domotique']).map((s: string) => (
                <span key={s} style={{ padding: '6px 14px', background: '#F4F4F5', borderRadius: '100px', fontSize: '0.8rem', color: '#18170F' }}>{s}</span>
              ))}
            </div>
            {profil.rbq_numero && (
              <p style={{ fontSize: '0.78rem', color: '#6B6860' }}>🏛️ Licence RBQ : {profil.rbq_numero}</p>
            )}
            {profil.ccq_numero && (
              <p style={{ fontSize: '0.78rem', color: '#6B6860', marginTop: '4px' }}>✓ Membre CCQ</p>
            )}
          </div>

          {/* Zone de service */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '28px' }}>
            <h2 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>Zone de service</h2>
            <p style={{ fontSize: '0.9rem', color: '#18170F', marginBottom: '8px', fontWeight: 500 }}>{region}</p>
            <p style={{ fontSize: '0.82rem', color: '#6B6860' }}>Rayon d'action : 100 km · Service disponible sur rendez-vous</p>
          </div>

          {/* Évaluations */}
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Évaluations</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#F59E0B' }}>★★★★★</span>
                <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>4.9</span>
                <span style={{ color: '#9B9891', fontSize: '0.78rem' }}>/5 · 47 évaluations</span>
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
