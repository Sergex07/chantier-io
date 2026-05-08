'use client'
import { useMode } from '@/lib/ModeContext'

const contenu = {
  pro: [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
      ),
      numero: '01',
      titre: 'Créez votre profil',
      desc: 'Inscrivez-vous gratuitement, ajoutez vos spécialités, votre région et vos certifications CCQ/RBQ. Votre profil devient votre vitrine professionnelle.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5">
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
        </svg>
      ),
      numero: '02',
      titre: 'Parcourez les demandes',
      desc: 'Accédez aux demandes de soumissions ouvertes dans votre spécialité. Filtrez par région, type de projet et budget pour trouver les contrats qui vous correspondent.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
      ),
      numero: '03',
      titre: 'Soumissionnez et décrochez',
      desc: 'Envoyez votre offre directement au demandeur. Si votre soumission est retenue, le client vous contacte et vous démarrez votre prochain contrat.'
    },
  ],
  travailleur: [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5">
          <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
      ),
      numero: '01',
      titre: 'Créez votre profil gratuit',
      desc: 'Ajoutez votre métier, vos qualifications CCQ, vos certifications et votre expérience. Votre profil est visible par les entrepreneurs qui recrutent.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5">
          <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
        </svg>
      ),
      numero: '02',
      titre: 'Recevez des alertes emploi',
      desc: 'Soyez notifié dès qu\'une nouvelle offre d\'emploi correspond à votre spécialité et votre région. Ne manquez plus aucune opportunité.'
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="1.5">
          <path d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
      numero: '03',
      titre: 'Trouvez du travail',
      desc: 'Postulez aux offres qui vous intéressent ou attendez qu\'un entrepreneur vous contacte directement via votre profil. Gratuit, simple et efficace.'
    },
  ]
}

export default function ExplicationSection() {
  const { mode } = useMode()
  const blocs = contenu[mode as 'pro' | 'travailleur'] || contenu.pro

  return (
    <section style={{
      padding: '64px 40px',
      background: '#F9F8F6',
      borderBottom: '1px solid #F0EEEA'
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '0',
          position: 'relative'
        }}>
          {blocs.map((bloc, i) => (
            <div key={i} style={{
              padding: '0 40px',
              borderRight: i < 2 ? '1px solid #F0EEEA' : 'none',
              textAlign: 'center'
            }}>
              {/* Numéro + Icône */}
              <div style={{
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', marginBottom: '20px', gap: '12px'
              }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: '#F4F4F5',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#18170F'
                }}>
                  {bloc.icon}
                </div>
                <span style={{
                  fontSize: '0.65rem', fontWeight: 700,
                  color: '#9B9891', letterSpacing: '0.12em'
                }}>
                  ÉTAPE {bloc.numero}
                </span>
              </div>

              <h3 style={{
                fontSize: '0.95rem', fontWeight: 500,
                color: '#18170F', letterSpacing: '-0.01em',
                marginBottom: '10px'
              }}>
                {bloc.titre}
              </h3>
              <p style={{
                fontSize: '0.82rem', color: '#6B6860',
                lineHeight: 1.65, margin: 0
              }}>
                {bloc.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA discret en bas */}
        <div style={{
          textAlign: 'center', marginTop: '40px',
          paddingTop: '32px', borderTop: '1px solid #F0EEEA'
        }}>
          <a href="/inscription" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '11px 28px', background: '#18170F', color: 'white',
            borderRadius: '100px', textDecoration: 'none',
            fontSize: '0.875rem', fontWeight: 500
          }}>
            Commencer gratuitement →
          </a>
          <p style={{
            fontSize: '0.75rem', color: '#9B9891', marginTop: '10px'
          }}>
            {mode === 'pro'
              ? '30 jours d\'essai Pro · Aucune carte requise'
              : 'Profil gratuit · Accès immédiat'}
          </p>
        </div>
      </div>
    </section>
  )
}
