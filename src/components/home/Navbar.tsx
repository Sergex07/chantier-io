'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Navbar() {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    if (!isHome) return
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHome])

  // Sur les pages autres que l'accueil : toujours blanc
  // Sur l'accueil : transparent → blanc au scroll
  const isWhite = !isHome || scrolled

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
      height: '62px',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      background: isWhite ? 'rgba(255,255,255,0.97)' : 'rgba(0,0,0,0.25)',
      borderBottom: isWhite ? '1px solid #E8E6E1' : 'none',
      boxShadow: isWhite ? '0 1px 3px rgba(0,0,0,0.06)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <Link href="/" style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        fontWeight: 700, fontSize: '1.05rem',
        color: isWhite ? '#18170F' : '#fff',
        textDecoration: 'none', transition: 'color 0.3s',
        textShadow: isWhite ? 'none' : '0 1px 3px rgba(0,0,0,0.5)'
      }}>
        <div style={{
          width: '28px', height: '28px',
          background: isWhite ? '#4A5568' : 'rgba(255,255,255,0.9)',
          borderRadius: '7px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'background 0.3s'
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24"
            fill={isWhite ? 'white' : '#4A5568'}>
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
        </div>
        Chantier.io
      </Link>

      <div style={{ display: 'flex', gap: '4px' }}>
        {['À propos', 'Comment ça marche', 'Contact'].map(l => (
          <a key={l} href="#" style={{
            color: isWhite ? '#6B6860' : 'rgba(255,255,255,0.85)',
            textDecoration: 'none',
            fontSize: '0.875rem', fontWeight: 400,
            padding: '6px 14px', borderRadius: '8px',
            transition: 'color 0.3s',
            textShadow: isWhite ? 'none' : '0 1px 3px rgba(0,0,0,0.5)'
          }}>{l}</a>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <Link href="/connexion" style={{
          fontSize: '0.875rem', fontWeight: 400,
          color: isWhite ? '#6B6860' : 'rgba(255,255,255,0.85)',
          textDecoration: 'none', padding: '6px 14px',
          transition: 'color 0.3s'
        }}>
          Connexion
        </Link>
        <Link href="/inscription" style={{
          background: isWhite ? '#18170F' : 'white',
          color: isWhite ? 'white' : '#18170F',
          fontSize: '0.875rem', fontWeight: 500,
          padding: '8px 18px', borderRadius: '8px',
          textDecoration: 'none', transition: 'all 0.3s'
        }}>
          Inscription
        </Link>
      </div>
    </nav>
  )
}
