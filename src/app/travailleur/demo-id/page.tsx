function getInitials(name: string): string {
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name[0]?.toUpperCase() ?? '?'
}

function Chip({ label, bg, color }: { label: string; bg: string; color: string }) {
  return (
    <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '100px', background: bg, color, fontSize: '0.75rem', fontWeight: 600, marginRight: '6px', marginBottom: '6px' }}>
      {label}
    </span>
  )
}

function Card({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', padding: '24px' }}>
      {title && <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#18170F', margin: '0 0 16px', letterSpacing: '-0.02em' }}>{title}</h2>}
      {children}
    </div>
  )
}

const profile = {
  full_name: 'Marc Bouchard',
  metier: 'Électricien',
  niveau_ccq: 'Compagnon CCQ',
  carte_asp: true,
  disponibilite: 'disponible',
  open_to_work: false,
  taux_horaire: 52,
  annees_experience: 12,
  certifications: ['CNESST', 'Travail en hauteur', 'Espaces clos'],
  permis_conduire: ['Classe 5', 'Classe 3'],
  machinerie: ['Nacelle', 'Chariot élévateur'],
  region: 'Laval',
  bio: 'Électricien compagnon CCQ avec 12 ans d\'expérience dans le résidentiel, le commercial et l\'industriel. Spécialisé en installation de panneaux électriques, câblage et rénovation. Disponible immédiatement pour des mandats à Laval et dans la région de Montréal.',
  created_at: '2025-01-15T00:00:00Z',
}

export default function TravailleurDemoPage() {
  const initials = getInitials(profile.full_name)
  const dispo = { label: 'Disponible', color: '#2563EB', bg: '#EFF6FF' }
  const niveauStyle = { bg: '#F3F4F6', color: '#374151' }

  return (
    <div style={{ minHeight: '100vh', background: '#F9F8F6', paddingTop: '80px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '28px', alignItems: 'flex-start' }}>

        {/* Sidebar */}
        <aside style={{ width: '280px', flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#18170F', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, margin: '0 auto 14px' }}>
                {initials}
              </div>
              <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#18170F', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                {profile.full_name}
              </h1>
              <p style={{ fontSize: '0.85rem', color: '#6B6860', margin: '0 0 12px' }}>{profile.metier}</p>

              <div style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '100px', background: dispo.bg, color: dispo.color, fontSize: '0.78rem', fontWeight: 600, marginBottom: '12px' }}>
                {dispo.label}
              </div>

              <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '100px', background: niveauStyle.bg, color: niveauStyle.color, fontSize: '0.75rem', fontWeight: 600, marginBottom: '12px', marginLeft: '6px' }}>
                {profile.niveau_ccq}
              </div>

              <div style={{ borderTop: '1px solid #F0EEEA', paddingTop: '12px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#6B6860' }}>
                  <span>📍</span> {profile.region}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#6B6860' }}>
                  <span>🔨</span> {profile.annees_experience} ans d'expérience
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#6B6860' }}>
                  <span>💰</span> {profile.taux_horaire} $/h
                </div>
              </div>

              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="/dashboard/messages" style={{ display: 'block', padding: '11px', background: '#18170F', color: 'white', borderRadius: '9px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, textAlign: 'center' }}>
                  Contacter
                </a>
                <a href="/dashboard/offres-emploi" style={{ display: 'block', padding: '11px', background: 'white', color: '#18170F', border: '1px solid #E8E6E1', borderRadius: '9px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, textAlign: 'center' }}>
                  Proposer un emploi
                </a>
              </div>
            </div>

            <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', padding: '20px' }}>
              <h3 style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Informations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                  <span style={{ color: '#6B6860' }}>Membre depuis</span>
                  <span style={{ color: '#18170F', fontWeight: 500 }}>Janvier 2025</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                  <span style={{ color: '#6B6860' }}>Métier</span>
                  <span style={{ color: '#18170F', fontWeight: 500 }}>{profile.metier}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                  <span style={{ color: '#6B6860' }}>Niveau CCQ</span>
                  <span style={{ color: '#18170F', fontWeight: 500 }}>{profile.niveau_ccq}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                  <span style={{ color: '#6B6860' }}>ASP Construction</span>
                  <span style={{ color: '#16A34A', fontWeight: 500 }}>✓ Oui</span>
                </div>
              </div>
            </div>

          </div>
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

          <Card title="À propos">
            <p style={{ fontSize: '0.9rem', color: '#4A5568', lineHeight: 1.7, margin: 0 }}>
              {profile.bio}
            </p>
          </Card>

          <Card title="Qualifications & Certifications">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Niveau CCQ</div>
                <Chip label={profile.niveau_ccq} bg="#F3F4F6" color="#374151" />
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>ASP Construction</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <span style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.65rem', flexShrink: 0 }}>✓</span>
                  <span style={{ color: '#16A34A' }}>Carte ASP valide</span>
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Certifications</div>
                <div>{profile.certifications.map((c, i) => <Chip key={i} label={c} bg="#F3F4F6" color="#374151" />)}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Permis de conduire</div>
                <div>{profile.permis_conduire.map((c, i) => <Chip key={i} label={c} bg="#EFF6FF" color="#1D4ED8" />)}</div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Machinerie opérée</div>
                <div>{profile.machinerie.map((c, i) => <Chip key={i} label={c} bg="#FEF3C7" color="#92400E" />)}</div>
              </div>
            </div>
          </Card>

          <Card title="Expérience">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { poste: 'Électricien compagnon', entreprise: 'Construction Voltex inc.', periode: '2020 – Présent', desc: 'Installation électrique résidentielle et commerciale, tableaux électriques, câblage.' },
                { poste: 'Électricien compagnon', entreprise: 'Groupe Électro Laval', periode: '2016 – 2020', desc: 'Projets industriels, maintenance préventive et corrective.' },
                { poste: 'Apprenti électricien', entreprise: 'Construction Hébert', periode: '2012 – 2016', desc: 'Formation en apprentissage sous licence CCQ, projets résidentiels.' },
              ].map((exp, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', paddingBottom: i < 2 ? '16px' : 0, borderBottom: i < 2 ? '1px solid #F0EEEA' : 'none' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F4F4F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.2rem' }}>
                    ⚡
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#18170F' }}>{exp.poste}</div>
                    <div style={{ fontSize: '0.82rem', color: '#6B6860', marginTop: '2px' }}>{exp.entreprise} · {exp.periode}</div>
                    <div style={{ fontSize: '0.82rem', color: '#4A5568', marginTop: '6px' }}>{exp.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Disponibilité">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: dispo.bg, borderRadius: '10px' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 600, color: dispo.color }}>{dispo.label}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ padding: '12px', background: '#F9FAFB', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Type de poste</div>
                  <div style={{ fontSize: '0.875rem', color: '#18170F', fontWeight: 500 }}>Temps plein · Contrat</div>
                </div>
                <div style={{ padding: '12px', background: '#F9FAFB', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '4px' }}>Région</div>
                  <div style={{ fontSize: '0.875rem', color: '#18170F', fontWeight: 500 }}>{profile.region} · Grand Montréal</div>
                </div>
              </div>
            </div>
          </Card>

          <Card title="Évaluations employeurs">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { nom: 'Construction Bélair', note: 5, commentaire: 'Marc est un électricien exceptionnel, toujours ponctuel et d\'un grand professionnalisme. Travail impeccable.', date: 'Mars 2024' },
                { nom: 'Groupe BâtiPro', note: 5, commentaire: 'Excellent travailleur, grande maîtrise de son métier. Je le recommande sans hésitation.', date: 'Nov 2023' },
                { nom: 'Rénovations Leblanc', note: 4, commentaire: 'Très bon électricien, autonome et efficace. Respectueux des échéanciers et des normes de sécurité.', date: 'Août 2023' },
              ].map((rev, i) => (
                <div key={i} style={{ paddingBottom: i < 2 ? '16px' : 0, borderBottom: i < 2 ? '1px solid #F0EEEA' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#18170F' }}>{rev.nom}</div>
                      <div style={{ fontSize: '0.75rem', color: '#6B6860', marginTop: '2px' }}>{rev.date}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {Array.from({ length: 5 }).map((_, si) => (
                        <span key={si} style={{ color: si < rev.note ? '#F59E0B' : '#E8E6E1', fontSize: '0.9rem' }}>★</span>
                      ))}
                    </div>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#4A5568', lineHeight: 1.6, margin: 0 }}>{rev.commentaire}</p>
                </div>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}
