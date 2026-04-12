import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Role } from '@/lib/types'

// ─── Data fetchers ─────────────────────────────────────────────────────────────

async function fetchStatsProf(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const [soumissions, messages, profile] = await Promise.all([
    supabase.from('soumissions').select('id, statut, created_at', { count: 'exact' }).eq('pro_id', userId).order('created_at', { ascending: false }).limit(5),
    supabase.from('messages').select('id', { count: 'exact' }).eq('receiver_id', userId).eq('lu', false),
    supabase.from('profiles').select('region, plan, trial_ends_at').eq('id', userId).single(),
  ])
  const region = profile.data?.region
  let demandesRegion = 0
  if (region) {
    const { count } = await supabase.from('demandes').select('id', { count: 'exact' }).eq('statut', 'ouvert').eq('region', region)
    demandesRegion = count ?? 0
  } else {
    const { count } = await supabase.from('demandes').select('id', { count: 'exact' }).eq('statut', 'ouvert')
    demandesRegion = count ?? 0
  }
  const trialDaysLeft =
    profile.data?.plan === 'pro_trial' && profile.data?.trial_ends_at
      ? Math.max(0, Math.ceil((new Date(profile.data.trial_ends_at).getTime() - Date.now()) / 86_400_000))
      : null
  return {
    soumissionsEnvoyees: soumissions.count ?? 0,
    demandesRegion,
    regionLabel: region ?? 'toutes régions',
    messagesNonLus: messages.count ?? 0,
    trialDaysLeft,
    activiteRecente: (soumissions.data ?? []).map(s => ({ id: s.id, texte: `Soumission ${statutLabel(s.statut)}`, date: s.created_at })),
  }
}

async function fetchStatsEntreprise(supabase: Awaited<ReturnType<typeof createClient>>, userId: string) {
  const [demandes, messages] = await Promise.all([
    supabase.from('demandes').select('id, titre, statut, created_at').eq('entreprise_id', userId).order('created_at', { ascending: false }).limit(5),
    supabase.from('messages').select('id', { count: 'exact' }).eq('receiver_id', userId).eq('lu', false),
  ])
  const demandesData = demandes.data ?? []
  const demandesActives = demandesData.filter(d => d.statut === 'ouvert').length
  const demandeIds = demandesData.map(d => d.id)
  let soumissionsCount = 0
  if (demandeIds.length > 0) {
    const { count } = await supabase.from('soumissions').select('id', { count: 'exact' }).in('demande_id', demandeIds)
    soumissionsCount = count ?? 0
  }
  return {
    demandesActives,
    soumissionsRecues: soumissionsCount,
    messagesNonLus: messages.count ?? 0,
    activiteRecente: demandesData.map(d => ({ id: d.id, texte: `Demande "${d.titre}" — ${statutLabel(d.statut)}`, date: d.created_at })),
  }
}

function statutLabel(statut: string) {
  const m: Record<string, string> = { ouvert: 'ouverte', en_cours: 'en cours', ferme: 'fermée', annule: 'annulée', en_attente: 'en attente', acceptee: 'acceptée', refusee: 'refusée', retiree: 'retirée', vue: 'vue' }
  return m[statut] ?? statut
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-CA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
}

// ─── Stat card ─────────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon, accent = false }: { label: string; value: number | string; sub?: string; icon: React.ReactNode; accent?: boolean }) {
  return (
    <div style={{ background: 'white', border: `1px solid ${accent ? '#18170F' : '#E8E6E1'}`, borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>{label}</p>
        <div style={{ width: 40, height: 40, background: accent ? '#18170F' : '#F4F4F5', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: accent ? 'white' : '#4A5568' }}>
          {icon}
        </div>
      </div>
      <div>
        <p style={{ fontSize: '1.8rem', fontWeight: 800, color: '#18170F', letterSpacing: '-0.04em', margin: '0 0 4px', lineHeight: 1 }}>{value}</p>
        {sub && <p style={{ fontSize: '0.72rem', color: '#6B6860', margin: 0 }}>{sub}</p>}
      </div>
    </div>
  )
}

// ─── Quick action card ─────────────────────────────────────────────────────────

function QuickCard({ emoji, label, href }: { emoji: string; label: string; href: string }) {
  return (
    <a href={href} style={{
      display: 'flex', alignItems: 'center', gap: '14px',
      padding: '20px', background: 'white', border: '1px solid #E8E6E1',
      borderRadius: '12px', textDecoration: 'none', cursor: 'pointer',
      transition: 'border-color 0.15s',
    }}>
      <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{emoji}</span>
      <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18170F' }}>{label}</span>
      <span style={{ marginLeft: 'auto', color: '#B0AEA8', fontSize: '1rem' }}>›</span>
    </a>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = (profile?.role ?? 'professionnel') as Role

  const [statsProf, statsEntreprise] = await Promise.all([
    role === 'professionnel' ? fetchStatsProf(supabase, user.id) : null,
    role === 'entreprise'    ? fetchStatsEntreprise(supabase, user.id) : null,
  ])

  const activiteRecente = statsProf?.activiteRecente ?? statsEntreprise?.activiteRecente ?? []

  return (
    <div style={{ maxWidth: '960px' }}>

      {/* Stat cards — Professionnel */}
      {statsProf && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <StatCard
            label="Soumissions envoyées"
            value={statsProf.soumissionsEnvoyees}
            sub="Depuis votre inscription"
            icon={<IcDoc />}
          />
          <StatCard
            label="Demandes dans ma région"
            value={statsProf.demandesRegion}
            sub={statsProf.regionLabel}
            icon={<IcList />}
            accent
          />
          <StatCard
            label="Messages non lus"
            value={statsProf.messagesNonLus}
            sub={statsProf.messagesNonLus > 0 ? 'À lire' : 'Tout est lu'}
            icon={<IcMsg />}
          />
          <StatCard
            label={statsProf.trialDaysLeft !== null ? "Jours d'essai restants" : "Abonnement"}
            value={statsProf.trialDaysLeft !== null ? statsProf.trialDaysLeft : '—'}
            sub={statsProf.trialDaysLeft !== null ? 'Essai Pro actif' : 'Voir les plans'}
            icon={<IcStar />}
          />
        </div>
      )}

      {/* Stat cards — Entreprise */}
      {statsEntreprise && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
          <StatCard
            label="Demandes actives"
            value={statsEntreprise.demandesActives}
            sub="En cours de soumission"
            icon={<IcList />}
            accent
          />
          <StatCard
            label="Soumissions reçues"
            value={statsEntreprise.soumissionsRecues}
            sub="Sur toutes vos demandes"
            icon={<IcDoc />}
          />
          <StatCard
            label="Messages non lus"
            value={statsEntreprise.messagesNonLus}
            sub={statsEntreprise.messagesNonLus > 0 ? 'À lire' : 'Tout est lu'}
            icon={<IcMsg />}
          />
          <StatCard
            label="Sous-traitants contactés"
            value="—"
            sub="Bientôt disponible"
            icon={<IcUser />}
          />
        </div>
      )}

      {/* Actions rapides */}
      <div style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px', margin: '0 0 14px' }}>
          ACTIONS RAPIDES
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {[
            { icon: '📋', title: 'Demandes disponibles', desc: 'Voir les projets ouverts',    href: '/dashboard/demandes-disponibles' },
            { icon: '👤', title: 'Mon profil',           desc: 'Compléter mes informations',  href: '/dashboard/profil' },
            { icon: '✉️', title: 'Messages',             desc: 'Voir mes conversations',      href: '/dashboard/messages' },
            { icon: '🎁', title: 'Parrainer',            desc: 'Inviter un collègue',          href: '/dashboard/parrainage' },
          ].map((card, i) => (
            <a key={i} href={card.href} style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '18px 20px', background: 'white',
              border: '1px solid #E8E6E1', borderRadius: '12px',
              textDecoration: 'none', transition: 'box-shadow 0.15s',
            }}>
              <span style={{ fontSize: '1.4rem' }}>{card.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18170F' }}>{card.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#6B6860', marginTop: '2px' }}>{card.desc}</div>
              </div>
              <span style={{ color: '#D0CEC8', fontSize: '1.1rem' }}>›</span>
            </a>
          ))}
        </div>
      </div>

      {/* Activité récente */}
      <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #F0EEEA' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0 }}>Activité récente</p>
        </div>

        {activiteRecente.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🚀</div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18170F', margin: '0 0 6px' }}>
              {role === 'entreprise' ? 'Publiez votre première demande' : role === 'professionnel' ? 'Trouvez votre premier contrat' : 'Complétez votre profil'}
            </p>
            <p style={{ fontSize: '0.78rem', color: '#6B6860', margin: 0 }}>
              {role === 'entreprise' ? 'Recevez des soumissions de sous-traitants qualifiés en moins de 48h.' : role === 'professionnel' ? 'Des dizaines de demandes attendent votre expertise.' : 'Mettez votre profil en ligne pour être visible par les entrepreneurs.'}
            </p>
          </div>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {activiteRecente.map((item, i) => (
              <li key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: i < activiteRecente.length - 1 ? '1px solid #F0EEEA' : 'none', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4A5568', flexShrink: 0, display: 'block' }} />
                  <span style={{ fontSize: '0.875rem', color: '#18170F' }}>{item.texte}</span>
                </div>
                <span style={{ fontSize: '0.72rem', color: '#B0AEA8', whiteSpace: 'nowrap', flexShrink: 0 }}>{formatDate(item.date)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

// ─── Icons ─────────────────────────────────────────────────────────────────────

function IcDoc() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M10 13h4M10 17h4"/></svg>
}
function IcList() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" strokeLinecap="round"/></svg>
}
function IcMsg() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
}
function IcUser() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/></svg>
}
function IcStar() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
