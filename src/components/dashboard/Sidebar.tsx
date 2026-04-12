'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Role } from '@/lib/types'

type NavItem = { label: string; href: string; icon: React.ReactNode }

const NAV: Record<Role, NavItem[]> = {
  professionnel: [
    { label: 'Tableau de bord',       href: '/dashboard',                    icon: <IcHome /> },
    { label: 'Mon profil',            href: '/dashboard/profil',             icon: <IcUser /> },
    { label: 'Demandes disponibles',  href: '/dashboard/demandes',           icon: <IcList /> },
    { label: 'Mes soumissions',       href: '/dashboard/soumissions',        icon: <IcDoc /> },
    { label: 'Messages',              href: '/dashboard/messages',           icon: <IcMsg /> },
    { label: 'Abonnement',            href: '/dashboard/abonnement',         icon: <IcCard /> },
    { label: 'Parrainage',            href: '/dashboard/parrainage',         icon: <IcGift /> },
  ],
  entreprise: [
    { label: 'Tableau de bord',       href: '/dashboard',                    icon: <IcHome /> },
    { label: 'Mes demandes',          href: '/dashboard/demandes',           icon: <IcList /> },
    { label: 'Publier une demande',   href: '/dashboard/demandes/nouvelle',  icon: <IcPlus /> },
    { label: 'Soumissions reçues',    href: '/dashboard/soumissions',        icon: <IcDoc /> },
    { label: 'Messages',              href: '/dashboard/messages',           icon: <IcMsg /> },
    { label: 'Abonnement',            href: '/dashboard/abonnement',         icon: <IcCard /> },
  ],
  detaillant: [
    { label: 'Tableau de bord',       href: '/dashboard',                    icon: <IcHome /> },
    { label: 'Mon profil détaillant', href: '/dashboard/profil',             icon: <IcUser /> },
    { label: 'Statistiques',          href: '/dashboard/statistiques',       icon: <IcChart /> },
    { label: 'Abonnement',            href: '/dashboard/abonnement',         icon: <IcCard /> },
  ],
  admin: [],
}

const PLAN_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  pro_trial:     { label: 'Essai Pro',  bg: '#FEF3C7', color: '#92400E' },
  pro:           { label: 'Pro',        bg: '#D1FAE5', color: '#065F46' },
  entreprise:    { label: 'Entreprise', bg: '#DBEAFE', color: '#1E40AF' },
  detaillant_std:{ label: 'Détaillant', bg: '#EDE9FE', color: '#5B21B6' },
  detaillant_pro:{ label: 'Pro',        bg: '#D1FAE5', color: '#065F46' },
  public:        { label: 'Gratuit',    bg: '#F3F4F6', color: '#6B7280' },
  free:          { label: 'Gratuit',    bg: '#F3F4F6', color: '#6B7280' },
}

interface Props {
  role: Role
  fullName: string | null
  avatarInitials: string
  plan: string | null
}

export default function Sidebar({ role, fullName, avatarInitials, plan }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const items = NAV[role] ?? []
  const badge = plan ? PLAN_BADGE[plan] : null

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/connexion')
  }

  return (
    <aside style={{ position: 'fixed', inset: '0 auto 0 0', width: '240px', background: '#18170F', display: 'flex', flexDirection: 'column', zIndex: 40 }}>

      {/* Logo */}
      <div style={{ height: '64px', display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.12)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: '1rem', color: 'white', letterSpacing: '-0.03em' }}>Chantier<span style={{ color: 'rgba(255,255,255,0.35)' }}>.io</span></span>
        </Link>
      </div>

      {/* User card */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'white', flexShrink: 0 }}>
          {avatarInitials}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {fullName ?? 'Mon compte'}
          </div>
          {badge && (
            <span style={{ fontSize: '0.65rem', fontWeight: 700, padding: '2px 7px', borderRadius: '100px', background: badge.bg, color: badge.color, display: 'inline-block', marginTop: '2px' }}>
              {badge.label}
            </span>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: '10px 10px 0' }}>
        <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '6px 10px 8px' }}>
          {roleLabel(role)}
        </div>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {items.map(item => {
            const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <li key={item.href}>
                <Link href={item.href} style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '8px 10px', borderRadius: '8px',
                  fontSize: '0.82rem', fontWeight: 500,
                  color: active ? 'white' : 'rgba(255,255,255,0.55)',
                  background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
                  borderLeft: active ? '2px solid white' : '2px solid transparent',
                  textDecoration: 'none', transition: 'all 0.12s',
                }}>
                  <span style={{ flexShrink: 0, opacity: active ? 1 : 0.7 }}>{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Déconnexion */}
      <div style={{ padding: '12px 10px 16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button onClick={handleSignOut} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
          padding: '8px 10px', borderRadius: '8px', border: 'none', background: 'transparent',
          fontSize: '0.78rem', fontWeight: 500, color: 'rgba(255,255,255,0.45)',
          cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.12s',
        }}>
          <IcSignOut />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}

function roleLabel(role: Role) {
  const m: Record<Role, string> = { professionnel: 'Professionnel', entreprise: 'Entreprise', detaillant: 'Détaillant', admin: 'Admin' }
  return m[role]
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IcHome() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
}
function IcUser() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/></svg>
}
function IcList() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" strokeLinecap="round"/></svg>
}
function IcDoc() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"/><path d="M14 2v6h6M10 13h4M10 17h4"/></svg>
}
function IcMsg() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
}
function IcCard() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20" strokeLinecap="round"/></svg>
}
function IcGift() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>
}
function IcPlus() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 5v14M5 12h14" strokeLinecap="round"/></svg>
}
function IcChart() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round"/></svg>
}
function IcSignOut() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
}
