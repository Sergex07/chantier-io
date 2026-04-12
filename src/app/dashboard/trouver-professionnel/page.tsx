import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const SPECIALITES_STATIC = ['Électricité', 'Plomberie', 'Charpenterie', 'Toiture', 'HVAC', 'Peinture', 'Fondation', 'Maçonnerie', 'Isolation', 'Gypse & Plâtre']
const REGIONS_STATIC = ['Grand Montréal', 'Montréal', 'Laval', 'Rive-Sud', 'Rive-Nord', 'Québec', 'Estrie', 'Outaouais']

export default async function TrouverProfessionnelPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')

  const { data: pros } = await supabase
    .from('profiles')
    .select('id, full_name, avatar_url, region, ville, description')
    .eq('role', 'professionnel')
    .not('full_name', 'is', null)
    .limit(24)

  const liste = pros ?? []

  const selStyle: React.CSSProperties = {
    padding: '9px 14px', borderRadius: '9px', border: '1px solid #E8E6E1',
    fontSize: '0.82rem', color: '#18170F', background: 'white', outline: 'none',
  }

  return (
    <div style={{ maxWidth: '1100px' }}>
      {/* Filtres */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <select style={selStyle}>
          <option value="">Toutes les spécialités</option>
          {SPECIALITES_STATIC.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select style={selStyle}>
          <option value="">Toutes les régions</option>
          {REGIONS_STATIC.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
        <select style={selStyle}>
          <option value="">Toutes disponibilités</option>
          <option value="now">Disponible maintenant</option>
          <option value="rdv">Sur rendez-vous</option>
        </select>
        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#6B6860', alignSelf: 'center' }}>
          {liste.length} professionnel{liste.length !== 1 ? 's' : ''}
        </span>
      </div>

      {liste.length === 0 ? (
        <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', padding: '60px 24px', textAlign: 'center' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
          <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18170F', margin: '0 0 6px' }}>Aucun professionnel pour l'instant</p>
          <p style={{ fontSize: '0.78rem', color: '#6B6860', margin: 0 }}>Les professionnels inscrits apparaîtront ici.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {liste.map(pro => {
            const initiales = pro.full_name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase() ?? '?'
            return (
              <div key={pro.id} style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '14px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Avatar + nom */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: pro.avatar_url ? `url(${pro.avatar_url}) center/cover` : '#4A5568', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {!pro.avatar_url && <span style={{ color: 'white', fontSize: '0.9rem', fontWeight: 700 }}>{initiales}</span>}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#18170F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{pro.full_name}</div>
                    {(pro.ville || pro.region) && (
                      <div style={{ fontSize: '0.75rem', color: '#6B6860', marginTop: '2px' }}>{[pro.ville, pro.region].filter(Boolean).join(' · ')}</div>
                    )}
                  </div>
                </div>

                {/* Description */}
                {pro.description && (
                  <p style={{ fontSize: '0.78rem', color: '#6B6860', margin: 0, lineHeight: 1.55, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' as const, overflow: 'hidden' }}>
                    {pro.description}
                  </p>
                )}

                {/* Footer */}
                <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid #F0EEEA' }}>
                  <a href={`/dashboard/messages?with=${pro.id}`} style={{ display: 'block', textAlign: 'center', padding: '9px', borderRadius: '8px', background: '#18170F', color: 'white', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                    Contacter
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
