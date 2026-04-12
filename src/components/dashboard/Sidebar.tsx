'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Role } from '@/lib/types'

type NavItem = { label: string; href: string; icon: React.ReactNode }
type NavGroup = { label: string; items: NavItem[] }

function navFor(role: Role): NavGroup[] {
  const principal: NavGroup = {
    label: 'Principal',
    items: [
      { label: 'Tableau de bord', href: '/dashboard',          icon: <IcGrid /> },
      { label: 'Messages',        href: '/dashboard/messages', icon: <IcMsg /> },
      { label: 'Notifications',   href: '/dashboard/notifications', icon: <IcBell /> },
    ],
  }

  const activites: NavGroup = {
    label: 'Mes activités',
    items: [
      { label: 'Demandes disponibles', href: '/dashboard/demandes-disponibles', icon: <IcSearch /> },
      { label: 'Mes soumissions',      href: '/dashboard/mes-soumissions',      icon: <IcSend /> },
      ...(role === 'entreprise' || role === 'professionnel'
        ? [{ label: 'Mes demandes publiées', href: '/dashboard/demandes', icon: <IcList /> }]
        : []),
      ...(role === 'entreprise'
        ? [{ label: "Mes offres d'emploi", href: '/dashboard/emplois', icon: <IcBriefcase /> }]
        : []),
    ],
  }

  const trouver: NavGroup = {
    label: 'Trouver',
    items: [
      ...(role === 'professionnel'
        ? [{ label: 'Demandes disponibles', href: '/dashboard/demandes-disponibles', icon: <IcSearch /> }]
        : []),
      { label: 'Trouver un professionnel', href: '/dashboard/trouver-professionnel', icon: <IcUser /> },
      { label: 'Trouver un sous-traitant', href: '/dashboard/trouver-professionnel', icon: <IcTools /> },
      { label: 'Trouver un fournisseur',   href: '/dashboard/fournisseurs',          icon: <IcStore /> },
      { label: "Offres d'emploi",          href: '/emplois',                         icon: <IcBriefcase /> },
    ],
  }

  const compte: NavGroup = {
    label: 'Mon compte',
    items: [
      { label: 'Mon profil',              href: '/dashboard/profil',           icon: <IcUser /> },
      { label: 'Région & expertise',      href: '/dashboard/region-expertise', icon: <IcMap /> },
      { label: 'Abonnement & facturation',href: '/dashboard/abonnement',       icon: <IcCard /> },
      { label: 'Parrainage',              href: '/dashboard/parrainage',       icon: <IcGift /> },
    ],
  }

  const groups = [principal]
  if (activites.items.length > 0) groups.push(activites)
  groups.push(trouver, compte)
  return groups
}

const PLAN_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  pro_trial:      { label: 'Essai Pro',  bg: '#FEF3C7', color: '#92400E' },
  pro:            { label: 'Pro',        bg: '#D1FAE5', color: '#065F46' },
  entreprise:     { label: 'Entreprise', bg: '#DBEAFE', color: '#1E40AF' },
  detaillant_std: { label: 'Détaillant', bg: '#EDE9FE', color: '#5B21B6' },
  detaillant_pro: { label: 'Pro',        bg: '#D1FAE5', color: '#065F46' },
  public:         { label: 'Gratuit',    bg: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' },
  free:           { label: 'Gratuit',    bg: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.5)' },
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
  const groups = navFor(role)
  const badge = plan ? PLAN_BADGE[plan] : null

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/connexion')
  }

  const linkBase: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '9px 12px', borderRadius: '8px', textDecoration: 'none',
    fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.12s',
  }

  return (
    <aside style={{ position: 'fixed', inset: '0 auto 0 0', width: '260px', background: '#18170F', display: 'flex', flexDirection: 'column', zIndex: 40, overflowY: 'auto' }}>

      {/* Logo */}
      <div style={{ height: '60px', display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.12)', borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
          </div>
          <span style={{ fontWeight: 800, fontSize: '0.95rem', color: 'white', letterSpacing: '-0.03em' }}>
            Chantier<span style={{ color: 'rgba(255,255,255,0.3)' }}>.io</span>
          </span>
        </Link>
      </div>

      {/* User */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'white', flexShrink: 0 }}>
          {avatarInitials}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'white', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {fullName ?? 'Mon compte'}
          </div>
          {badge && (
            <span style={{ fontSize: '0.62rem', fontWeight: 700, padding: '2px 7px', borderRadius: '100px', background: badge.bg, color: badge.color, display: 'inline-block', marginTop: '2px' }}>
              {badge.label}
            </span>
          )}
        </div>
      </div>

      {/* CTA publier */}
      <div style={{ padding: '12px 16px 0' }}>
        <a href="/demande-soumission" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '8px', padding: '10px 16px',
          background: 'white', color: '#18170F',
          borderRadius: '9px', textDecoration: 'none',
          fontSize: '0.82rem', fontWeight: 500,
          transition: 'opacity 0.15s',
        }}>
          <span>+</span> Publier une demande
        </a>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '8px 12px 0' }}>
        {groups.map(group => (
          <div key={group.label}>
            <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '16px 12px 6px' }}>
              {group.label}
            </div>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1px' }}>
              {group.items.map(item => {
                const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                return (
                  <li key={item.href + item.label}>
                    <Link href={item.href} style={{
                      ...linkBase,
                      color: active ? 'white' : 'rgba(255,255,255,0.7)',
                      background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                      borderLeft: active ? '3px solid white' : '3px solid transparent',
                    }}>
                      <span style={{ flexShrink: 0, opacity: active ? 1 : 0.7 }}>{item.icon}</span>
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Sign out */}
      <div style={{ padding: '12px 12px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <button onClick={handleSignOut} style={{
          ...linkBase,
          width: '100%', border: 'none', background: 'transparent',
          color: 'rgba(255,255,255,0.4)', fontFamily: 'inherit', fontSize: '0.82rem',
        }}>
          <IcSignOut />
          Déconnexion
        </button>
      </div>
    </aside>
  )
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IcGrid() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
}
function IcMsg() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
}
function IcBell() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
}
function IcSend() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
}
function IcList() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" strokeLinecap="round"/></svg>
}
function IcBriefcase() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="12"/><path d="M2 12h20"/></svg>
}
function IcSearch() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
}
function IcUser() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round"/></svg>
}
function IcTools() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>
}
function IcStore() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l1-5h16l1 5"/><path d="M3 9a2 2 0 004 0 2 2 0 004 0 2 2 0 004 0 2 2 0 004 0"/><path d="M5 9v11h14V9"/></svg>
}
function IcMap() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>
}
function IcCard() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20" strokeLinecap="round"/></svg>
}
function IcGift() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7zM12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>
}
function IcSignOut() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
}
