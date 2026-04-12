'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMode } from '@/lib/ModeContext'

const TABS = [
  { id: 'public' as const, label: 'Grand public' },
  { id: 'pro' as const, label: 'Professionnel' },
  { id: 'travailleur' as const, label: 'Travailleur' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { mode, setMode } = useMode()

  if (pathname?.startsWith('/dashboard')) return null

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
      height: '58px',
      display: 'flex', alignItems: 'center',
      padding: '0 40px',
      background: '#ffffff',
      borderBottom: '1px solid #F0EEEA',
    }}>
      <Link href="/" style={{
        display: 'flex', alignItems: 'center', gap: '7px',
        textDecoration: 'none', flexShrink: 0,
      }}>
        <div style={{
          width: '26px', height: '26px',
          background: '#18170F',
          borderRadius: '6px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <span style={{ fontWeight: 600, fontSize: '0.95rem', letterSpacing: '-0.02em', color: '#18170F' }}>
          Chantier.io
        </span>
      </Link>

      {pathname === '/' && (
        <div style={{
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', background: '#F4F4F5', borderRadius: '100px',
          padding: '3px', gap: '2px',
        }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMode(tab.id)}
              style={{
                padding: '6px 18px', borderRadius: '100px',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: '0.82rem', fontWeight: mode === tab.id ? 500 : 400,
                background: mode === tab.id ? 'white' : 'transparent',
                color: mode === tab.id ? '#18170F' : '#6B6860',
                boxShadow: mode === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
        <Link href="/connexion" style={{
          padding: '6px 14px', fontSize: '0.84rem',
          fontWeight: 400, color: '#6B6860', textDecoration: 'none',
        }}>
          Connexion
        </Link>
        <Link href="/inscription" style={{
          padding: '7px 16px',
          background: '#18170F', color: 'white',
          fontSize: '0.84rem', fontWeight: 500,
          borderRadius: '8px', textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}>
          S'inscrire
        </Link>
      </div>
    </nav>
  )
}
