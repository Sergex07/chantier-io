import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import RegionExpertiseForm from '@/components/dashboard/RegionExpertiseForm'

export default async function RegionExpertisePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')

  const [profileResult, specialitesResult, selResult] = await Promise.all([
    supabase.from('profiles').select('region, ville').eq('id', user.id).single(),
    supabase.from('specialites').select('id, nom').order('nom'),
    supabase.from('professionnel_specialites').select('specialite_id').eq('pro_id', user.id),
  ])

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', padding: '32px' }}>
        <RegionExpertiseForm
          region={profileResult.data?.region ?? null}
          ville={profileResult.data?.ville ?? null}
          specialites={specialitesResult.data ?? []}
          selectedSpecialites={(selResult.data ?? []).map(r => r.specialite_id as string)}
        />
      </div>
    </div>
  )
}
