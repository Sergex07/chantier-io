import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import Sidebar from '@/components/dashboard/Sidebar'
import type { Role } from '@/lib/types'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion?next=/dashboard')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, role, avatar_url, plan, trial_ends_at')
    .eq('id', user.id)
    .single()

  const role = (profile?.role ?? 'professionnel') as Role
  const fullName =
    profile?.full_name ||
    (user.user_metadata?.full_name as string | undefined) ||
    (user.user_metadata?.name as string | undefined) ||
    null
  const plan = profile?.plan ?? null

  const initiales = fullName
    ? fullName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
    : (user.email?.[0] ?? '?').toUpperCase()

  const emailPrefix = user.email?.split('@')[0] ?? null
  const prenom = fullName?.split(' ')[0] ?? emailPrefix ?? 'vous'

  const trialDaysLeft =
    plan === 'pro_trial' && profile?.trial_ends_at
      ? Math.max(0, Math.ceil((new Date(profile.trial_ends_at).getTime() - Date.now()) / 86_400_000))
      : null
  const showTrialBanner = trialDaysLeft !== null && trialDaysLeft > 0

  const dateAujourdhui = new Date().toLocaleDateString('fr-CA', {
    weekday: 'long', day: 'numeric', month: 'long',
  })

  return (
    <div style={{ display: 'flex', minHeight: '100vh', marginTop: '-62px' }}>
      <Sidebar role={role} fullName={fullName} avatarInitials={initiales} plan={plan} />

      <div style={{ marginLeft: '260px', flex: 1, minHeight: '100vh', background: '#F9F8F6', display: 'flex', flexDirection: 'column' }}>
        {/* Content header */}
        <div style={{ padding: '32px 40px 0' }}>
          {/* Trial banner */}
          {showTrialBanner && (
            <div style={{ marginBottom: '24px', padding: '16px 20px', background: 'linear-gradient(135deg, #18170F 0%, #4A5568 100%)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '1.1rem' }}>🎁</span>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#fff', marginBottom: '2px' }}>
                    Votre essai Pro se termine dans {trialDaysLeft} jour{trialDaysLeft === 1 ? '' : 's'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
                    Profitez de toutes les fonctionnalités Pro pendant votre période d'essai
                  </div>
                </div>
              </div>
              <a href="/dashboard/abonnement" style={{ padding: '9px 18px', borderRadius: '9px', background: '#fff', color: '#18170F', fontSize: '0.82rem', fontWeight: 500, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
                Activer mon abonnement →
              </a>
            </div>
          )}

          {/* Greeting */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#18170F', letterSpacing: '-0.04em', margin: '0 0 4px' }}>
              Bonjour, {prenom} 👋
            </h1>
            <p style={{ fontSize: '0.82rem', color: '#6B6860', margin: 0, textTransform: 'capitalize' }}>
              {dateAujourdhui}
            </p>
          </div>
        </div>

        {/* Page content */}
        <main style={{ flex: 1, padding: '0 40px 40px' }}>
          {children}
        </main>
      </div>
    </div>
  )
}
