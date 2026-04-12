'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) { setScrolled(true); return }
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  const white = !isHome || scrolled

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
      height: '58px',
      display: 'flex', alignItems: 'center',
      padding: '0 40px',
      background: white ? '#ffffff' : 'transparent',
      borderBottom: white ? '1px solid #F0EEEA' : 'none',
      transition: 'background 0.25s, border-color 0.25s',
    }}>

      {/* Logo */}
      <Link href="/" style={{
        display: 'flex', alignItems: 'center', gap: '7px',
        textDecoration: 'none', marginRight: 'auto'
      }}>
        <div style={{
          width: '26px', height: '26px',
          background: white ? '#18170F' : 'white',
          borderRadius: '6px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.25s',
          flexShrink: 0
        }}>
          <svg width="13" height="13" viewBox="0 0 24 24"
            fill={white ? 'white' : '#18170F'} style={{ transition: 'fill 0.25s' }}>
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <span style={{
          fontWeight: 700, fontSize: '1rem',
          letterSpacing: '-0.02em',
          color: white ? '#18170F' : '#ffffff',
          transition: 'color 0.25s'
        }}>
          Chantier.io
        </span>
      </Link>

      {/* Liens centre */}
      <div style={{
        display: 'flex', gap: '2px',
        position: 'absolute', left: '50%',
        transform: 'translateX(-50%)'
      }}>
        {['À propos', 'Comment ça marche', 'Contact'].map(l => (
          <a key={l} href="#" style={{
            padding: '6px 12px',
            borderRadius: '7px',
            fontSize: '0.84rem',
            fontWeight: 400,
            color: white ? '#6B6860' : 'rgba(255,255,255,0.8)',
            textDecoration: 'none',
            transition: 'color 0.25s',
            whiteSpace: 'nowrap'
          }}>{l}</a>
        ))}
      </div>

      {/* Actions droite */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link href="/connexion" style={{
          padding: '6px 14px',
          fontSize: '0.84rem',
          fontWeight: 400,
          color: white ? '#6B6860' : 'rgba(255,255,255,0.85)',
          textDecoration: 'none',
          transition: 'color 0.25s'
        }}>
          Connexion
        </Link>
        <Link href="/inscription" style={{
          padding: '7px 16px',
          background: white ? '#18170F' : 'white',
          color: white ? 'white' : '#18170F',
          fontSize: '0.84rem',
          fontWeight: 500,
          borderRadius: '8px',
          textDecoration: 'none',
          transition: 'all 0.25s',
          letterSpacing: '-0.01em'
        }}>
          S'inscrire
        </Link>
      </div>
    </nav>
  )
}
