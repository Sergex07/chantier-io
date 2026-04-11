'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

const HouseIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
  </svg>
)

const NAV_LINKS = [
  { href: '/a-propos', label: 'À propos' },
  { href: '/comment-ca-marche', label: 'Comment ça marche' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 300,
      height: 72,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 40px',
      transition: 'background 0.3s, box-shadow 0.3s',
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
      boxShadow: scrolled ? '0 1px 0 #DDDDDD' : 'none',
    }}>
      {/* Logo */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
        <div style={{
          width: 32, height: 32,
          background: '#4A5568',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <HouseIcon />
        </div>
        <span style={{
          fontWeight: 800,
          fontSize: '1.1rem',
          letterSpacing: '-0.03em',
          color: scrolled ? '#18170F' : 'white',
          transition: 'color 0.3s',
        }}>
          Chantier.io
        </span>
      </Link>

      {/* Nav links */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href} style={{
            fontSize: '0.875rem',
            fontWeight: 500,
            padding: '7px 14px',
            borderRadius: 8,
            textDecoration: 'none',
            color: scrolled ? '#6B6860' : 'rgba(255,255,255,0.85)',
            transition: 'color 0.3s',
          }}>
            {l.label}
          </Link>
        ))}
      </nav>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Link href="/connexion" style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          padding: '8px 14px',
          borderRadius: 22,
          textDecoration: 'none',
          color: scrolled ? '#18170F' : 'white',
          transition: 'color 0.3s',
        }}>
          Connexion
        </Link>
        <Link href="/inscription" style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          padding: '9px 18px',
          borderRadius: 22,
          textDecoration: 'none',
          background: scrolled ? '#18170F' : 'white',
          color: scrolled ? 'white' : '#18170F',
          transition: 'background 0.3s, color 0.3s',
        }}>
          Inscription
        </Link>
      </div>
    </header>
  )
}
