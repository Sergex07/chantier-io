import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function DemandesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')

  const { data: raw } = await supabase
    .from('demandes')
    .select(`
      id,
      titre,
      region,
      ville,
      budget,
      date_debut,
      statut,
      created_at,
      specialites ( nom ),
      soumissions ( id )
    `)
    .eq('entreprise_id', user.id)
    .order('created_at', { ascending: false })

  const demandes = (raw ?? []).map((d) => ({
    id: d.id,
    titre: d.titre,
    region: d.region,
    ville: d.ville,
    budget: d.budget,
    statut: d.statut,
    created_at: d.created_at,
    specialite: Array.isArray(d.specialites)
      ? (d.specialites[0] as { nom: string } | undefined)?.nom ?? null
      : (d.specialites as { nom: string } | null)?.nom ?? null,
    nombre_soumissions: Array.isArray(d.soumissions) ? d.soumissions.length : 0,
  }))

  const statutColor = (statut: string | null): { bg: string; text: string } =>
    ({
      urgent: { bg: '#FEF2F2', text: '#DC2626' },
      actif:  { bg: '#F0FDF4', text: '#16A34A' },
      nouveau: { bg: '#F4F4F5', text: '#6B6860' },
      ferme:  { bg: '#F4F4F5', text: '#9B9891' },
    }[statut ?? 'nouveau'] ?? { bg: '#F4F4F5', text: '#6B6860' })

  const specialiteIcon = (s: string | null) =>
    s === 'Électricité' ? '⚡' :
    s === 'Plomberie'   ? '🔧' :
    s === 'Toiture'     ? '🏠' :
    s === 'Peinture'    ? '🎨' :
    s === 'HVAC'        ? '❄️' : '📋'

  return (
    <div style={{ padding: '32px 40px', background: '#F9F8F6', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#18170F',
            letterSpacing: '-0.02em', marginBottom: '4px' }}>
            Mes demandes de soumission
          </h1>
          <p style={{ fontSize: '0.85rem', color: '#6B6860' }}>
            {demandes.length} demande{demandes.length > 1 ? 's' : ''}
          </p>
        </div>
        <Link href="/dashboard/demandes/nouvelle" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          padding: '10px 20px', background: '#18170F', color: 'white',
          borderRadius: '9px', textDecoration: 'none',
          fontSize: '0.875rem', fontWeight: 500,
        }}>
          + Nouvelle demande
        </Link>
      </div>

      {/* État vide */}
      {demandes.length === 0 ? (
        <div style={{
          background: 'white', borderRadius: '16px',
          border: '1px solid #E8E6E1', padding: '64px 40px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📋</div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 500, color: '#18170F',
            marginBottom: '8px' }}>
            Aucune demande pour l&apos;instant
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#6B6860',
            maxWidth: '360px', margin: '0 auto 24px', lineHeight: 1.6 }}>
            Publiez votre première demande et recevez des soumissions
            de professionnels qualifiés en 24–48h.
          </p>
          <Link href="/dashboard/demandes/nouvelle" style={{
            display: 'inline-block', padding: '12px 28px',
            background: '#18170F', color: 'white', borderRadius: '100px',
            textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500,
          }}>
            Publier une demande gratuitement →
          </Link>
        </div>

      ) : (
        <>
          {/* Liste */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {demandes.map((d) => {
              const colors = statutColor(d.statut)
              const dateCreation = new Date(d.created_at).toLocaleDateString('fr-CA',
                { day: 'numeric', month: 'long', year: 'numeric' })

              return (
                <div key={d.id} style={{
                  background: 'white', borderRadius: '14px',
                  border: '1px solid #E8E6E1', padding: '20px 24px',
                  display: 'flex', alignItems: 'center', gap: '20px',
                }}>

                  {/* Icône */}
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '11px',
                    background: '#F4F4F5', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0,
                  }}>
                    {specialiteIcon(d.specialite)}
                  </div>

                  {/* Infos */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center',
                      gap: '10px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '0.95rem', fontWeight: 500,
                        color: '#18170F', margin: 0,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {d.titre || 'Demande sans titre'}
                      </h3>
                      <span style={{
                        padding: '2px 10px', borderRadius: '100px', fontSize: '0.7rem',
                        fontWeight: 500, flexShrink: 0,
                        background: colors.bg, color: colors.text,
                      }}>
                        {d.statut === 'actif'  ? 'Actif'  :
                         d.statut === 'urgent' ? 'Urgent' :
                         d.statut === 'ferme'  ? 'Fermé'  : 'Nouveau'}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#9B9891',
                      display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {d.specialite && <span>🔨 {d.specialite}</span>}
                      {d.ville      && <span>📍 {d.ville}</span>}
                      {d.budget     && <span>💰 {d.budget}</span>}
                      <span>📅 {dateCreation}</span>
                    </div>
                  </div>

                  {/* Soumissions reçues */}
                  <div style={{ textAlign: 'center', flexShrink: 0 }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 600,
                      color: '#18170F', lineHeight: 1 }}>
                      {d.nombre_soumissions}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: '#9B9891', marginTop: '2px' }}>
                      soumission{d.nombre_soumissions > 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Action */}
                  <div style={{ flexShrink: 0 }}>
                    <Link href={`/dashboard/demandes/${d.id}`} style={{
                      padding: '8px 16px', background: 'white',
                      border: '1px solid #E8E6E1', borderRadius: '8px',
                      textDecoration: 'none', fontSize: '0.8rem',
                      color: '#18170F', fontWeight: 400,
                    }}>
                      Voir →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Stats rapides */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px',
            marginTop: '24px',
          }}>
            {[
              { label: 'Total demandes', val: demandes.length },
              { label: 'Soumissions reçues',
                val: demandes.reduce((acc, d) => acc + d.nombre_soumissions, 0) },
              { label: 'Demandes actives',
                val: demandes.filter(d => d.statut === 'actif' || d.statut === 'nouveau').length },
            ].map(stat => (
              <div key={stat.label} style={{
                background: 'white', borderRadius: '12px',
                border: '1px solid #E8E6E1', padding: '16px 20px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <span style={{ fontSize: '0.8rem', color: '#6B6860' }}>{stat.label}</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#18170F' }}>
                  {stat.val}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
