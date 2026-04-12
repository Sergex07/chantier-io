import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import ProfileForm from '@/components/dashboard/ProfileForm'

export default async function ProfilPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')

  const [profileResult, specialitesResult, selResult] = await Promise.all([
    supabase.from('profiles').select('full_name, avatar_url, phone, region, ville, description, website, rbq_numero, ccq_numero').eq('id', user.id).single(),
    supabase.from('specialites').select('id, nom, slug').order('nom'),
    supabase.from('professionnel_specialites').select('specialite_id').eq('pro_id', user.id),
  ])

  const profile = profileResult.data ?? {}
  const specialites = specialitesResult.data ?? []
  const selectedSpecialites = (selResult.data ?? []).map(r => r.specialite_id as string)

  // Completion score
  const p = profileResult.data
  const fields = [p?.full_name, p?.avatar_url, p?.region, p?.description, p?.rbq_numero]
  const completed = fields.filter(Boolean).length
  const pct = Math.round((completed / fields.length) * 100)

  return (
    <div style={{ maxWidth: '800px' }}>
      {/* Completion bar */}
      {pct < 100 && (
        <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '14px', padding: '16px 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#18170F' }}>Complétion du profil</span>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#18170F' }}>{pct}%</span>
            </div>
            <div style={{ height: 6, background: '#F0EEEA', borderRadius: '100px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: '#18170F', borderRadius: '100px', transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>
      )}

      {/* Form card */}
      <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', padding: '32px' }}>
        <ProfileForm profile={profile} specialites={specialites} selectedSpecialites={selectedSpecialites} />
      </div>
    </div>
  )
}
