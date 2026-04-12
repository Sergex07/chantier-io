import Link from 'next/link'
import DemandesTableauInteractif from './DemandesModal'

export default function AppelsSoumissionsSection() {
  return (
    <section style={{ padding: '80px 40px', background: '#F9F8F6' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#9B9891', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>
              APPELS D'OFFRES
            </p>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#18170F', letterSpacing: '-0.02em', margin: 0 }}>
              Demandes de soumissions en cours
            </h2>
          </div>
          <Link href="/demandes" style={{ fontSize: '0.82rem', color: '#6B6860', textDecoration: 'none' }}>
            Voir tout →
          </Link>
        </div>
        <DemandesTableauInteractif />
      </div>
    </section>
  )
}
