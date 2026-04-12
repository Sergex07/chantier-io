import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

const PLANS = [
  {
    id: 'public', label: 'Grand public', prix: 'Gratuit', couleur: '#6B6860',
    features: ["Voir les profils de professionnels", "Contacter un pro directement", "Accès aux offres d'emploi"],
    cta: 'Plan actuel',
  },
  {
    id: 'pro_trial', label: 'Professionnel', prix: '10 $/mois', couleur: '#18170F',
    badge: '30 jours gratuits',
    features: ['Soumettre des offres illimitées', 'Profil public référencé', 'Messages directs', 'Badge vérifié RBQ/CCQ', 'Statistiques de visibilité'],
    cta: 'Activer Pro',
  },
  {
    id: 'entreprise', label: 'Entreprise', prix: '25 $/mois', couleur: '#1D4ED8',
    features: ['Publier des demandes illimitées', 'Recevoir des soumissions', 'Gestion des sous-traitants', 'Messages directs', 'Tableau de bord analytics'],
    cta: 'Activer Entreprise',
  },
  {
    id: 'detaillant_std', label: 'Détaillant', prix: '29 $/mois', couleur: '#7C3AED',
    features: ['Profil fournisseur premium', 'Visible dans l\'annuaire détaillants', 'Badge certifié', 'Lien vers votre catalogue', 'Statistiques de clics'],
    cta: 'Activer Détaillant',
  },
]

export default async function AbonnementPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/connexion')

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan, trial_ends_at, full_name')
    .eq('id', user.id)
    .single()

  const planActuel = profile?.plan ?? 'public'

  const trialDaysLeft =
    planActuel === 'pro_trial' && profile?.trial_ends_at
      ? Math.max(0, Math.ceil((new Date(profile.trial_ends_at).getTime() - Date.now()) / 86_400_000))
      : null

  return (
    <div style={{ maxWidth: '900px' }}>

      {/* Plan actuel */}
      <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', padding: '24px', marginBottom: '32px' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px' }}>Plan actuel</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#18170F', letterSpacing: '-0.03em' }}>
              {PLANS.find(p => p.id === planActuel)?.label ?? planActuel}
            </div>
            {trialDaysLeft !== null && (
              <div style={{ fontSize: '0.82rem', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
                🎁 Essai actif — {trialDaysLeft} jour{trialDaysLeft === 1 ? '' : 's'} restant{trialDaysLeft === 1 ? '' : 's'}
              </div>
            )}
          </div>
          {planActuel !== 'public' && (
            <a href="#" style={{ marginLeft: 'auto', fontSize: '0.78rem', fontWeight: 600, color: '#C0392B', textDecoration: 'none', padding: '7px 14px', border: '1px solid #FECACA', borderRadius: '8px', background: '#FFF5F5' }}>
              Annuler l'abonnement
            </a>
          )}
        </div>
      </div>

      {/* Cards plans */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '40px' }}>
        {PLANS.map(p => {
          const isCurrent = planActuel === p.id || (planActuel === 'pro_trial' && p.id === 'pro_trial')
          return (
            <div key={p.id} style={{ background: 'white', border: `1px solid ${isCurrent ? p.couleur : '#E8E6E1'}`, borderRadius: '16px', padding: '24px', position: 'relative', overflow: 'hidden' }}>
              {isCurrent && (
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: p.couleur }} />
              )}
              {p.badge && (
                <div style={{ display: 'inline-block', fontSize: '0.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: '100px', background: '#F0FDF4', color: '#16A34A', marginBottom: '10px' }}>
                  {p.badge}
                </div>
              )}
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#18170F', marginBottom: '4px' }}>{p.label}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: p.couleur, letterSpacing: '-0.03em', marginBottom: '16px' }}>{p.prix}</div>
              <ul style={{ listStyle: 'none', margin: '0 0 20px', padding: 0, display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {p.features.map(f => (
                  <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.82rem', color: '#18170F' }}>
                    <span style={{ color: '#16a34a', fontWeight: 700, flexShrink: 0, marginTop: '1px' }}>✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              {isCurrent ? (
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: '#6B6860', textAlign: 'center', padding: '9px', border: '1px solid #F0EEEA', borderRadius: '8px' }}>
                  Plan actuel
                </div>
              ) : (
                <a href="#" style={{ display: 'block', textAlign: 'center', padding: '10px', borderRadius: '8px', background: p.couleur, color: 'white', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}>
                  {p.cta}
                </a>
              )}
            </div>
          )
        })}
      </div>

      {/* Historique facturation */}
      <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', overflow: 'hidden' }}>
        <div style={{ padding: '18px 24px', borderBottom: '1px solid #F0EEEA' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Historique de facturation</div>
        </div>
        <div style={{ padding: '40px 24px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.875rem', color: '#6B6860', margin: 0 }}>Aucune facture pour le moment.</p>
          <p style={{ fontSize: '0.75rem', color: '#B0AEA8', margin: '6px 0 0' }}>Les factures apparaîtront ici après votre premier paiement.</p>
        </div>
      </div>
    </div>
  )
}
