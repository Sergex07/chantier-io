'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: '9px',
  border: '1px solid #E8E6E1', fontSize: '0.9rem', fontFamily: 'inherit',
  color: '#18170F', outline: 'none', boxSizing: 'border-box' as const, background: 'white',
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  )
}

export default function ConnexionPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [googleLoading, setGoogleLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError(null)
    const supabase = createClient()
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    if (err) { setError('Courriel ou mot de passe invalide.'); setLoading(false); return }
    window.location.href = '/dashboard'
  }

  async function handleGoogle() {
    setGoogleLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback` },
    })
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9F8F6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '32px' }}>
        <div style={{ width: 32, height: 32, background: '#4A5568', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        </div>
        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#18170F', letterSpacing: '-0.03em' }}>Chantier.io</span>
      </a>

      <div style={{ background: 'white', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '420px', boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 20px 40px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#18170F', letterSpacing: '-0.04em', marginBottom: '6px' }}>Connexion</h1>
        <p style={{ fontSize: '0.875rem', color: '#6B6860', marginBottom: '28px' }}>
          Pas encore inscrit ?{' '}<a href="/inscription" style={{ color: '#18170F', fontWeight: 600 }}>Créer un compte</a>
        </p>

        {/* Google */}
        <button type="button" onClick={handleGoogle} disabled={googleLoading} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '11px 14px', borderRadius: '9px', border: '1px solid #E8E6E1', background: 'white', fontSize: '0.9rem', fontWeight: 500, color: '#18170F', cursor: 'pointer', fontFamily: 'inherit', marginBottom: '20px', opacity: googleLoading ? 0.6 : 1 }}>
          <GoogleIcon />
          {googleLoading ? 'Redirection…' : 'Continuer avec Google'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ flex: 1, height: 1, background: '#E8E6E1' }} />
          <span style={{ fontSize: '0.75rem', color: '#B0B0B0' }}>ou</span>
          <div style={{ flex: 1, height: 1, background: '#E8E6E1' }} />
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#18170F', display: 'block', marginBottom: '6px' }}>Courriel</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="vous@exemple.com" style={inputStyle} />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#18170F' }}>Mot de passe</label>
                <a href="/mot-de-passe-oublie" style={{ fontSize: '0.75rem', color: '#6B6860', textDecoration: 'none' }}>Mot de passe oublié ?</a>
              </div>
              <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
            </div>
          </div>

          {error && <p style={{ fontSize: '0.85rem', color: '#C0392B', marginBottom: '16px' }}>{error}</p>}

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '13px', background: '#18170F', color: 'white', border: 'none', borderRadius: '9px', fontSize: '0.95rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Connexion…' : 'Se connecter →'}
          </button>
        </form>
      </div>
    </div>
  )
}
