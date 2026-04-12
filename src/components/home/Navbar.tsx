'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const pathname = usePathname()
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
        textDecoration: 'none', marginRight: 'auto'
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
        <span style={{
          fontWeight: 600, fontSize: '0.95rem',
          letterSpacing: '-0.02em', color: '#18170F'
        }}>
          Chantier.io
        </span>
      </Link>

      <div style={{
        display: 'flex', gap: '2px',
        position: 'absolute', left: '50%',
        transform: 'translateX(-50%)'
      }}>
        {['À propos', 'Comment ça marche', 'Contact'].map(l => (
          <a key={l} href="#" style={{
            padding: '6px 12px', borderRadius: '7px',
            fontSize: '0.84rem', fontWeight: 400,
            color: '#6B6860', textDecoration: 'none',
          }}>{l}</a>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
          letterSpacing: '-0.01em'
        }}>
          S'inscrire
        </Link>
      </div>
    </nav>
  )
}
