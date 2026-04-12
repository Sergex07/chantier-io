import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'

interface TravailleurProfile {
  id: string
  full_name: string | null
  metier: string | null
  niveau_ccq: string | null
  carte_asp: boolean | null
  disponibilite: string | null
  open_to_work: boolean | null
  taux_horaire: number | null
  annees_experience: number | null
  certifications: string[] | null
  permis_conduire: string[] | null
  machinerie: string[] | null
  region: string | null
  bio: string | null
  created_at: string | null
}

function getInitials(name: string | null): string {
  if (!name) return '?'
  const parts = name.trim().split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name[0]?.toUpperCase() ?? '?'
}

function getNiveauStyle(niveau: string | null): { bg: string; color: string } {
  if (niveau?.toLowerCase().includes('maître')) return { bg: '#FEF3C7', color: '#92400E' }
  if (niveau?.toLowerCase().includes('apprenti')) return { bg: '#DBEAFE', color: '#1D4ED8' }
  return { bg: '#F3F4F6', color: '#374151' }
}

function getDispoInfo(profile: TravailleurProfile): { label: string; color: string; bg: string } {
  if (profile.open_to_work) return { label: '🟢 Ouvert aux opportunités', color: '#16A34A', bg: '#F0FDF4' }
  if (profile.disponibilite === 'disponible') return { label: 'Disponible', color: '#2563EB', bg: '#EFF6FF' }
  if (profile.disponibilite === 'occupe') return { label: 'En poste', color: '#6B7280', bg: '#F9FAFB' }
  return { label: 'Non spécifié', color: '#6B7280', bg: '#F9FAFB' }
}

function formatMembre(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('fr-CA', { month: 'long', year: 'numeric' })
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

export default async function TravailleurProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, metier, niveau_ccq, carte_asp, disponibilite, open_to_work, taux_horaire, annees_experience, certifications, permis_conduire, machinerie, region, bio, created_at')
    .eq('id', id)
    .single()

  if (!profile) notFound()

  const p = profile as TravailleurProfile
  const initials = getInitials(p.full_name)
  const dispo = getDispoInfo(p)
  const niveauStyle = getNiveauStyle(p.niveau_ccq)

  return (
    <div style={{ minHeight: '100vh', background: '#F9F8F6', paddingTop: '80px', paddingBottom: '60px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', gap: '28px', alignItems: 'flex-start' }}>

        {/* Sidebar */}
        <aside style={{ width: '280px', flexShrink: 0 }}>
          <div style={{ position: 'sticky', top: '90px', display: 'flex', flexDirection: 'column', gap: '16px' }}>

            {/* Profile card */}
            <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              {/* Avatar */}
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#18170F', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 700, margin: '0 auto 14px' }}>
                {initials}
              </div>
              <h1 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#18170F', margin: '0 0 4px', letterSpacing: '-0.02em' }}>
                {p.full_name ?? 'Travailleur'}
              </h1>
              {p.metier && (
                <p style={{ fontSize: '0.85rem', color: '#6B6860', margin: '0 0 12px' }}>{p.metier}</p>
              )}

              {/* Dispo badge */}
              <div style={{ display: 'inline-block', padding: '5px 12px', borderRadius: '100px', background: dispo.bg, color: dispo.color, fontSize: '0.78rem', fontWeight: 600, marginBottom: '12px' }}>
                {dispo.label}
              </div>

              {/* Niveau CCQ */}
              {p.niveau_ccq && (
                <div style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '100px', background: niveauStyle.bg, color: niveauStyle.color, fontSize: '0.75rem', fontWeight: 600, marginBottom: '12px', marginLeft: '6px' }}>
                  {p.niveau_ccq}
                </div>
              )}

              {/* Meta info */}
              <div style={{ borderTop: '1px solid #F0EEEA', paddingTop: '12px', marginTop: '4px', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left' }}>
                {p.region && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#6B6860' }}>
                    <span>📍</span> {p.region}
                  </div>
                )}
                {p.annees_experience != null && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#6B6860' }}>
                    <span>🔨</span> {p.annees_experience} ans d'expérience
                  </div>
                )}
                {p.taux_horaire != null && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#6B6860' }}>
                    <span>💰</span> {p.taux_horaire} $/h
                  </div>
                )}
              </div>

              {/* CTA buttons */}
              <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <a href="/dashboard/messages" style={{ display: 'block', padding: '11px', background: '#18170F', color: 'white', borderRadius: '9px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, textAlign: 'center' }}>
                  Contacter
                </a>
                <a href="/dashboard/offres-emploi" style={{ display: 'block', padding: '11px', background: 'white', color: '#18170F', border: '1px solid #E8E6E1', borderRadius: '9px', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 600, textAlign: 'center' }}>
                  Proposer un emploi
                </a>
              </div>
            </div>

            {/* Quick stats card */}
            <div style={{ background: 'white', border: '1px solid #E8E6E1', borderRadius: '16px', padding: '20px' }}>
              <h3 style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 12px' }}>Informations</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                  <span style={{ color: '#6B6860' }}>Membre depuis</span>
                  <span style={{ color: '#18170F', fontWeight: 500 }}>{formatMembre(p.created_at)}</span>
                </div>
                {p.metier && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                    <span style={{ color: '#6B6860' }}>Métier</span>
                    <span style={{ color: '#18170F', fontWeight: 500 }}>{p.metier}</span>
                  </div>
                )}
                {p.niveau_ccq && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                    <span style={{ color: '#6B6860' }}>Niveau CCQ</span>
                    <span style={{ color: '#18170F', fontWeight: 500 }}>{p.niveau_ccq}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
                  <span style={{ color: '#6B6860' }}>ASP Construction</span>
                  <span style={{ color: p.carte_asp ? '#16A34A' : '#6B7280', fontWeight: 500 }}>{p.carte_asp ? '✓ Oui' : 'Non'}</span>
                </div>
              </div>
            </div>

          </div>
        </aside>

        {/* Main content */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* À propos */}
          <Card title="À propos">
            <p style={{ fontSize: '0.9rem', color: '#4A5568', lineHeight: 1.7, margin: 0 }}>
              {p.bio ?? `Travailleur de la construction avec ${p.annees_experience ?? '—'} ans d'expérience dans le domaine de ${p.metier ?? 'la construction'}. Disponible pour des contrats dans la région de ${p.region ?? 'Québec'}.`}
            </p>
          </Card>

          {/* Qualifications */}
          <Card title="Qualifications & Certifications">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {p.niveau_ccq && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Niveau CCQ</div>
                  <Chip label={p.niveau_ccq} bg={niveauStyle.bg} color={niveauStyle.color} />
                </div>
              )}
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>ASP Construction</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <span style={{ width: '16px', height: '16px', borderRadius: '4px', background: p.carte_asp ? '#16A34A' : '#E8E6E1', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.65rem', flexShrink: 0 }}>
                    {p.carte_asp ? '✓' : ''}
                  </span>
                  <span style={{ color: p.carte_asp ? '#16A34A' : '#6B7280' }}>
                    {p.carte_asp ? 'Carte ASP valide' : 'Pas de carte ASP'}
                  </span>
                </div>
              </div>
              {p.certifications && p.certifications.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Certifications</div>
                  <div>{p.certifications.map((c, i) => <Chip key={i} label={c} bg="#F3F4F6" color="#374151" />)}</div>
                </div>
              )}
              {p.permis_conduire && p.permis_conduire.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Permis de conduire</div>
                  <div>{p.permis_conduire.map((c, i) => <Chip key={i} label={c} bg="#EFF6FF" color="#1D4ED8" />)}</div>
                </div>
              )}
              {p.machinerie && p.machinerie.length > 0 && (
                <div>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Machinerie opérée</div>
                  <div>{p.machinerie.map((c, i) => <Chip key={i} label={c} bg="#FEF3C7" color="#92400E" />)}</div>
                </div>
              )}
            </div>
          </Card>

          {/* Expérience */}
          <Card title="Expérience">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { poste: p.metier ?? 'Travailleur', entreprise: 'Construction Québec inc.', periode: '2020 – Présent', desc: 'Travaux résidentiels et commerciaux.' },
                { poste: p.metier ?? 'Travailleur', entreprise: 'Groupe Bâtiment Laval', periode: '2016 – 2020', desc: 'Projets industriels et institutionnels.' },
                { poste: 'Apprenti', entreprise: 'Construction Tremblay', periode: '2012 – 2016', desc: 'Formation en apprentissage CCQ.' },
              ].map((exp, i) => (
                <div key={i} style={{ display: 'flex', gap: '16px', paddingBottom: i < 2 ? '16px' : 0, borderBottom: i < 2 ? '1px solid #F0EEEA' : 'none' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F4F4F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.2rem' }}>
                    🔨
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

          {/* Disponibilité */}
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
                  <div style={{ fontSize: '0.875rem', color: '#18170F', fontWeight: 500 }}>{p.region ?? 'Québec'}</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Évaluations */}
          <Card title="Évaluations employeurs">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { nom: 'Construction Bélair', note: 5, commentaire: 'Excellent travailleur, ponctuel et professionnel. Je le recommande fortement.', date: 'Mars 2024' },
                { nom: 'Groupe BâtiPro', note: 5, commentaire: 'Travail de qualité supérieure. Grande maîtrise de son métier.', date: 'Nov 2023' },
                { nom: 'Rénovations Leblanc', note: 4, commentaire: 'Très bon travailleur, autonome et efficace sur le chantier.', date: 'Août 2023' },
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
