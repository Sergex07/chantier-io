'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { activateProTrial } from '@/app/actions/profile'

const PLANS = [
  { id: 'public',      label: 'Grand public',  prix: 'Gratuit',   desc: 'Propriétaires qui cherchent un entrepreneur' },
  { id: 'pro',         label: 'Professionnel', prix: '10$/mois',  desc: 'Sous-traitants, designers, architectes' },
  { id: 'entreprise',  label: 'Entreprise',    prix: '25$/mois',  desc: 'GC et promoteurs' },
  { id: 'detaillant',  label: 'Détaillant',    prix: '29$/mois',  desc: 'Fournisseurs de matériaux' },
]

const inputStyle = {
  width: '100%', padding: '11px 14px', borderRadius: '9px',
  border: '1px solid #E8E6E1', fontSize: '0.9rem', fontFamily: 'inherit',
  color: '#18170F', outline: 'none', boxSizing: 'border-box' as const, background: 'white',
}

export default function InscriptionPage() {
  const [plan, setPlan] = useState<string | null>(null)
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const isPublic = plan === 'public'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!plan) { setError('Veuillez choisir un type de compte.'); return }
    setLoading(true); setError(null)
    const supabase = createClient()
    const { data, error: err } = await supabase.auth.signUp({
      email, password,
      options: {
        data: { plan, nom },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
      },
    })
    if (err) { setError(err.message); setLoading(false); return }
    if (data.user && !isPublic) {
      await activateProTrial(data.user.id)
    }
    window.location.href = '/connexion?registered=1'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9F8F6', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', marginBottom: '32px' }}>
        <div style={{ width: 32, height: 32, background: '#4A5568', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
        </div>
        <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#18170F', letterSpacing: '-0.03em' }}>Chantier.io</span>
      </a>

      <div style={{ background: 'white', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '560px', boxShadow: '0 4px 6px rgba(0,0,0,0.04), 0 20px 40px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#18170F', letterSpacing: '-0.04em', marginBottom: '12px' }}>Créer un compte</h1>

        {/* Badge */}
        <div style={{ marginBottom: '20px' }}>
          {plan === null ? null : isPublic ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '100px', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 600, color: '#16A34A' }}>
              <span>✅</span>
              <span>Toujours gratuit — aucune carte requise</span>
            </div>
          ) : (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '100px', padding: '5px 12px', fontSize: '0.78rem', fontWeight: 600, color: '#16A34A' }}>
              <span>🎁</span>
              <span>30 jours gratuits — aucune carte de crédit requise</span>
            </div>
          )}
        </div>

        <p style={{ fontSize: '0.875rem', color: '#6B6860', marginBottom: '24px' }}>
          Déjà inscrit ?{' '}<a href="/connexion" style={{ color: '#18170F', fontWeight: 600 }}>Se connecter</a>
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>Type de compte</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '8px' }}>
              {PLANS.map(p => (
                <button key={p.id} type="button" onClick={() => setPlan(p.id)} style={{
                  padding: '12px 10px', borderRadius: '10px',
                  border: `1px solid ${plan === p.id ? '#18170F' : '#E8E6E1'}`,
                  background: plan === p.id ? '#18170F' : 'white',
                  color: plan === p.id ? 'white' : '#18170F',
                  cursor: 'pointer', fontFamily: 'inherit', textAlign: 'center', transition: 'all 0.15s',
                }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '2px' }}>{p.label}</div>
                  <div style={{ fontSize: '0.72rem', opacity: 0.7 }}>{p.prix}</div>
                </button>
              ))}
            </div>
            <p style={{ fontSize: '0.78rem', color: '#6B6860', marginTop: '8px' }}>
              {PLANS.find(p => p.id === plan)?.desc ?? 'Choisissez votre type de compte ci-dessus'}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {[
              { label: 'Nom complet', value: nom, set: setNom, type: 'text', ph: 'Jean Tremblay' },
              { label: 'Courriel', value: email, set: setEmail, type: 'email', ph: 'vous@exemple.com' },
              { label: 'Mot de passe', value: password, set: setPassword, type: 'password', ph: '8 caractères minimum' },
            ].map(f => (
              <div key={f.label}>
                <label style={{ fontSize: '0.78rem', fontWeight: 600, color: '#18170F', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                <input type={f.type} required value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.ph} style={inputStyle} />
              </div>
            ))}
          </div>

          {error && <p style={{ fontSize: '0.85rem', color: '#C0392B', marginBottom: '16px' }}>{error}</p>}

          <button type="submit" disabled={loading} style={{ width: '100%', padding: '13px', background: '#18170F', color: 'white', border: 'none', borderRadius: '9px', fontSize: '0.95rem', fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer', fontFamily: 'inherit', opacity: loading ? 0.6 : 1 }}>
            {loading ? 'Création…' : isPublic ? 'Créer mon compte gratuit →' : 'Créer mon compte →'}
          </button>

          <p style={{ fontSize: '0.75rem', color: '#6B6860', textAlign: 'center', marginTop: '20px', lineHeight: 1.5 }}>
            En créant un compte, vous acceptez nos <a href="#" style={{ color: '#18170F' }}>Conditions d'utilisation</a> et notre <a href="#" style={{ color: '#18170F' }}>Politique de confidentialité</a>.
          </p>
        </form>
      </div>
    </div>
  )
}
