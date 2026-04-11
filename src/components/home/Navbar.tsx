'use client'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
      height: '68px', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 40px',
      transition: 'background 0.3s ease, box-shadow 0.3s ease',
      background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
      boxShadow: scrolled ? '0 1px 0 #E8E6E1' : 'none',
    }}>
      {/* Logo */}
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
        <div style={{ width: 30, height: 30, background: '#4A5568', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
        </div>
        <span style={{ fontWeight: 800, fontSize: '1.05rem', letterSpacing: '-0.03em', color: scrolled ? '#18170F' : 'white', transition: 'color 0.3s' }}>
          Chantier.io
        </span>
      </a>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '4px' }}>
        {['À propos', 'Comment ça marche', 'Contact'].map(l => (
          <a key={l} href="#" style={{
            fontSize: '0.875rem', fontWeight: 500, padding: '7px 14px', borderRadius: '8px',
            textDecoration: 'none', transition: 'color 0.3s',
            color: scrolled ? '#6B6860' : 'rgba(255,255,255,0.85)',
          }}>{l}</a>
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <a href="/connexion" style={{
          fontSize: '0.875rem', fontWeight: 600, padding: '8px 14px', borderRadius: '22px',
          textDecoration: 'none', transition: 'color 0.3s',
          color: scrolled ? '#18170F' : 'white',
        }}>Connexion</a>
        <a href="/inscription" style={{
          fontSize: '0.875rem', fontWeight: 600, padding: '9px 18px', borderRadius: '22px',
          textDecoration: 'none', transition: 'background 0.3s, color 0.3s',
          background: scrolled ? '#18170F' : 'white',
          color: scrolled ? 'white' : '#18170F',
        }}>Inscription</a>
      </div>
    </nav>
  )
}
