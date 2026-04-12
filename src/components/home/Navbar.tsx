'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMode } from '@/lib/ModeContext'
import type { User } from '@supabase/supabase-js'

const PRO_SUBTABS = [
  { id: 'entrepreneur' as const, label: 'Entrepreneur' },
  { id: 'professionnel' as const, label: 'Professionnel' },
  { id: 'detaillant' as const, label: 'Détaillant' },
]

const PRO_MODES = PRO_SUBTABS.map(t => t.id)

export default function Navbar() {
  const pathname = usePathname()
  const { mode, setMode } = useMode()
  const [user, setUser] = useState<User | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [proDropdownOpen, setProDropdownOpen] = useState(false)

  const isProMode = PRO_MODES.includes(mode as typeof PRO_MODES[number])
  const activeProLabel = PRO_SUBTABS.find(t => t.id === mode)?.label ?? 'Entrepreneur'

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => setUser(session?.user ?? null)
    )
    return () => subscription.unsubscribe()
  }, [])

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
          {/* Grand public */}
          <button
            type="button"
            onClick={() => { setMode('public'); setProDropdownOpen(false) }}
            style={{
              padding: '6px 18px', borderRadius: '100px',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: '0.82rem', fontWeight: mode === 'public' ? 500 : 400,
              background: mode === 'public' ? 'white' : 'transparent',
              color: mode === 'public' ? '#18170F' : '#6B6860',
              boxShadow: mode === 'public' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}
          >
            Grand public
          </button>

          {/* Dropdown pro */}
          <div style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setProDropdownOpen(!proDropdownOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '6px 18px', borderRadius: '100px',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                fontSize: '0.82rem', fontWeight: isProMode ? 500 : 400,
                background: isProMode ? 'white' : 'transparent',
                color: isProMode ? '#18170F' : '#6B6860',
                boxShadow: isProMode ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s', whiteSpace: 'nowrap',
              }}
            >
              {isProMode ? activeProLabel : 'Professionnel'}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5"
                style={{ transform: proDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {proDropdownOpen && (
              <>
                <div
                  onClick={() => setProDropdownOpen(false)}
                  style={{ position: 'fixed', inset: 0, zIndex: 298 }}
                />
                <div style={{
                  position: 'absolute', top: 'calc(100% + 8px)', left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'white', borderRadius: '12px',
                  border: '1px solid #E8E6E1',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.10)',
                  minWidth: '160px', zIndex: 299, overflow: 'hidden',
                  padding: '4px',
                }}>
                  {PRO_SUBTABS.map(sub => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={() => { setMode(sub.id); setProDropdownOpen(false) }}
                      style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '9px 14px', borderRadius: '8px',
                        border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                        fontSize: '0.83rem',
                        fontWeight: mode === sub.id ? 500 : 400,
                        background: mode === sub.id ? '#F4F4F5' : 'transparent',
                        color: mode === sub.id ? '#18170F' : '#6B6860',
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={e => { if (mode !== sub.id) e.currentTarget.style.background = '#F9F8F6' }}
                      onMouseLeave={e => { e.currentTarget.style.background = mode === sub.id ? '#F4F4F5' : 'transparent' }}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Travailleur */}
          <button
            type="button"
            onClick={() => { setMode('travailleur'); setProDropdownOpen(false) }}
            style={{
              padding: '6px 18px', borderRadius: '100px',
              border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: '0.82rem', fontWeight: mode === 'travailleur' ? 500 : 400,
              background: mode === 'travailleur' ? 'white' : 'transparent',
              color: mode === 'travailleur' ? '#18170F' : '#6B6860',
              boxShadow: mode === 'travailleur' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              transition: 'all 0.2s', whiteSpace: 'nowrap',
            }}
          >
            Travailleur
          </button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
        {user ? (
          <div style={{position:'relative'}}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display:'flex', alignItems:'center', gap:'8px',
                padding:'6px 14px', borderRadius:'9px',
                border:'1px solid #E8E6E1', cursor:'pointer',
                fontSize:'0.84rem', fontWeight:400, color:'#18170F',
                background:'white', fontFamily:'inherit'
              }}>
              <div style={{
                width:'24px', height:'24px', borderRadius:'50%',
                background:'#18170F', color:'white',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:'0.65rem', fontWeight:600, flexShrink:0
              }}>
                {user.email?.[0].toUpperCase() || 'U'}
              </div>
              Mon compte
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2"
                style={{transform: menuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition:'transform 0.2s'}}>
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>

            {menuOpen && (
              <>
                <div
                  onClick={() => setMenuOpen(false)}
                  style={{position:'fixed', inset:0, zIndex:299}}
                />

                <div style={{
                  position:'absolute', top:'calc(100% + 8px)', right:0,
                  background:'white', borderRadius:'12px',
                  border:'1px solid #E8E6E1',
                  boxShadow:'0 8px 24px rgba(0,0,0,0.10)',
                  minWidth:'200px', zIndex:300, overflow:'hidden'
                }}>

                  <div style={{
                    padding:'14px 16px', borderBottom:'1px solid #F0EEEA'
                  }}>
                    <div style={{fontSize:'0.82rem', fontWeight:500, color:'#18170F'}}>
                      {user.email}
                    </div>
                    <div style={{fontSize:'0.72rem', color:'#9B9891', marginTop:'2px'}}>
                      Essai Pro · 30 jours
                    </div>
                  </div>

                  {[
                    { label:'Tableau de bord', href:'/dashboard', icon:'⊞' },
                    { label:'Mon profil', href:'/dashboard/profil', icon:'👤' },
                    { label:'Mes demandes', href:'/dashboard/demandes', icon:'📋' },
                    { label:'Messages', href:'/dashboard/messages', icon:'✉️' },
                    { label:'Abonnement', href:'/dashboard/abonnement', icon:'⭐' },
                  ].map(item => (
                    <a key={item.href} href={item.href}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        display:'flex', alignItems:'center', gap:'10px',
                        padding:'10px 16px', textDecoration:'none',
                        fontSize:'0.84rem', color:'#18170F',
                        transition:'background 0.1s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#F9F8F6'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <span style={{fontSize:'0.9rem'}}>{item.icon}</span>
                      {item.label}
                    </a>
                  ))}

                  <div style={{borderTop:'1px solid #F0EEEA'}}>
                    <button
                      onClick={async () => {
                        setMenuOpen(false)
                        await supabase.auth.signOut()
                        window.location.href = '/'
                      }}
                      style={{
                        display:'flex', alignItems:'center', gap:'10px',
                        width:'100%', padding:'10px 16px',
                        background:'none', border:'none', cursor:'pointer',
                        fontSize:'0.84rem', color:'#DC2626', fontFamily:'inherit',
                        textAlign:'left'
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                      <span>↩</span>
                      Déconnexion
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </nav>
  )
}
