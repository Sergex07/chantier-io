import Link from 'next/link'
import DemandesTableauInteractif from './DemandesModal'

export default function AppelsSoumissionsSection() {
  return (
    <section style={{ padding: '64px 40px', background: '#F7F7F7' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#18170F', letterSpacing: '-0.02em' }}>Demandes de soumissions en cours</h2>
          <Link href="/demandes" style={{ fontSize: '0.875rem', color: '#18170F', fontWeight: 500, textDecoration: 'underline' }}>
            Voir toutes les demandes →
          </Link>
        </div>
        <DemandesTableauInteractif />
      </div>
    </section>
  )
}
