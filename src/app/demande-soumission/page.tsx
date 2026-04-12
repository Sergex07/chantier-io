'use client'
import { useState } from 'react'

const specialites = [
  'Électricité', 'Plomberie', 'Charpenterie', 'Toiture', 'HVAC',
  'Peinture', 'Fondation', 'Porte et Fenêtre', 'Céramique', 'Maçonnerie',
  'Escalier', 'Vitrier', 'Sablage', 'Démolition', 'Excavation',
  'Revêtement extérieur', 'Isolation', 'Gypse & Plâtre', 'Béton', 'Autre'
]

export default function DemandesoumissionPage() {
  const [typeClient, setTypeClient] = useState<'particulier' | 'entrepreneur'>('particulier')
  const [etape, setEtape] = useState(1)
  const [specialite, setSpecialite] = useState('')
  const [secteur, setSecteur] = useState('')
  const [adresse, setAdresse] = useState('')
  const [ville, setVille] = useState('')
  const [province, setProvince] = useState('QC')
  const [codePostal, setCodePostal] = useState('')
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [budget, setBudget] = useState('')
  const [dateDebut, setDateDebut] = useState('')
  const [urgence, setUrgence] = useState(false)
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [entreprise, setEntreprise] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [plans, setPlans] = useState<File[]>([])
  const [photos, setPhotos] = useState<File[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [dragOverPhotos, setDragOverPhotos] = useState(false)

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: '9px',
    border: '1px solid #E8E6E1', fontSize: '0.9rem', fontFamily: 'inherit',
    color: '#18170F', outline: 'none', boxSizing: 'border-box' as const,
    background: 'white'
  }

  const labelStyle = {
    fontSize: '0.78rem', fontWeight: 600 as const, color: '#18170F',
    display: 'block' as const, marginBottom: '6px'
  }

  return (
    <div style={{ minHeight: '100vh', background: '#F9F8F6', paddingTop: '80px' }}>
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '40px 24px' }}>

        {/* En-tête */}
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 600, color: '#18170F', letterSpacing: '-0.03em', marginBottom: '8px' }}>
            Publier une demande de soumission
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#6B6860', lineHeight: 1.6 }}>
            Recevez des soumissions de professionnels qualifiés. Gratuit et sans engagement.
          </p>
        </div>

        {/* Choix type client */}
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '24px', marginBottom: '20px' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '14px' }}>
            Je suis
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { id: 'particulier', label: '🏠 Particulier', desc: 'Propriétaire cherchant un entrepreneur' },
              { id: 'entrepreneur', label: '🏗️ Entrepreneur / GC', desc: 'Cherche des sous-traitants spécialisés' },
            ].map(t => (
              <button key={t.id} onClick={() => setTypeClient(t.id as 'particulier' | 'entrepreneur')} style={{
                padding: '16px', borderRadius: '12px', cursor: 'pointer', textAlign: 'left',
                border: '1px solid ' + (typeClient === t.id ? '#18170F' : '#E8E6E1'),
                background: typeClient === t.id ? '#18170F' : 'white',
                fontFamily: 'inherit', transition: 'all 0.15s'
              }}>
                <div style={{ fontSize: '0.95rem', fontWeight: 500, color: typeClient === t.id ? 'white' : '#18170F', marginBottom: '4px' }}>{t.label}</div>
                <div style={{ fontSize: '0.75rem', color: typeClient === t.id ? 'rgba(255,255,255,0.65)' : '#6B6860' }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Indicateur d'étapes */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', alignItems: 'center' }}>
          {['Projet', 'Détails', 'Contact'].map((e, i) => (
            <div key={e} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: etape > i + 1 ? '#16A34A' : etape === i + 1 ? '#18170F' : '#E8E6E1',
                color: etape >= i + 1 ? 'white' : '#9B9891',
                fontSize: '0.75rem', fontWeight: 600
              }}>
                {etape > i + 1 ? '✓' : i + 1}
              </div>
              <span style={{ fontSize: '0.8rem', color: etape === i + 1 ? '#18170F' : '#9B9891', fontWeight: etape === i + 1 ? 500 : 400 }}>{e}</span>
              {i < 2 && <div style={{ width: '32px', height: '1px', background: '#E8E6E1', margin: '0 4px' }} />}
            </div>
          ))}
        </div>

        {/* Formulaire */}
        {!submitted ? (
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '32px' }}>

            {/* ÉTAPE 1 — Projet */}
            {etape === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#18170F', marginBottom: '4px' }}>Décrivez votre projet</h2>

                <div>
                  <label style={labelStyle}>{typeClient === 'entrepreneur' ? 'Spécialité recherchée' : 'Type de travaux'}</label>
                  <select value={specialite} onChange={e => setSpecialite(e.target.value)} style={{ ...inputStyle, appearance: 'none' as const }}>
                    <option value="">Choisir une spécialité...</option>
                    {specialites.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Secteur</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['Résidentiel', 'Commercial', 'Industriel', 'Institutionnel'].map(s => (
                      <button key={s} onClick={() => setSecteur(s)} style={{
                        padding: '7px 16px', borderRadius: '100px', cursor: 'pointer',
                        border: '1px solid ' + (secteur === s ? '#18170F' : '#E8E6E1'),
                        background: secteur === s ? '#18170F' : 'white',
                        color: secteur === s ? 'white' : '#18170F',
                        fontSize: '0.82rem', fontFamily: 'inherit', fontWeight: 400, transition: 'all 0.15s'
                      }}>{s}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Titre de la demande</label>
                  <input type="text" value={titre} onChange={e => setTitre(e.target.value)}
                    placeholder={typeClient === 'entrepreneur'
                      ? 'Ex: Électricité commerciale — Phase 2, bâtiment 8 000 pc'
                      : 'Ex: Rénovation salle de bain complète — maison unifamiliale'}
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Description détaillée</label>
                  <textarea value={description} onChange={e => setDescription(e.target.value)}
                    rows={5}
                    placeholder={typeClient === 'entrepreneur'
                      ? 'Décrivez le scope des travaux, les plans disponibles, les exigences techniques...'
                      : 'Décrivez vos travaux, la superficie, vos attentes, les matériaux souhaités...'}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }} />
                </div>

                {/* Upload plans */}
                <div>
                  <label style={labelStyle}>Plans et documents <span style={{ fontWeight: 400, color: '#9B9891' }}>(optionnel)</span></label>
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={e => {
                      e.preventDefault(); setDragOver(false)
                      const files = Array.from(e.dataTransfer.files)
                      setPlans(prev => [...prev, ...files].slice(0, 5))
                    }}
                    style={{
                      border: '2px dashed ' + (dragOver ? '#18170F' : '#E8E6E1'),
                      borderRadius: '10px', padding: '24px', textAlign: 'center',
                      background: dragOver ? '#F9F8F6' : 'white',
                      transition: 'all 0.15s', cursor: 'pointer'
                    }}
                    onClick={() => document.getElementById('plans-input')?.click()}>
                    <input id="plans-input" type="file" multiple accept=".pdf,.dwg,.jpg,.jpeg,.png"
                      style={{ display: 'none' }}
                      onChange={e => {
                        const files = Array.from(e.target.files || [])
                        setPlans(prev => [...prev, ...files].slice(0, 5))
                      }} />
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📎</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#18170F', marginBottom: '4px' }}>
                      Glissez vos fichiers ici ou cliquez pour parcourir
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#9B9891' }}>PDF, DWG, JPG, PNG · Max 5 fichiers · 10 MB chacun</div>
                  </div>
                  {plans.length > 0 && (
                    <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {plans.map((f, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', background: '#F9F8F6', borderRadius: '8px', border: '1px solid #E8E6E1' }}>
                          <span style={{ fontSize: '0.8rem', color: '#18170F' }}>📄 {f.name}</span>
                          <button onClick={() => setPlans(prev => prev.filter((_, j) => j !== i))}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9B9891', fontSize: '0.8rem', padding: '2px 6px' }}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Upload photos */}
                <div>
                  <label style={labelStyle}>Photos du chantier <span style={{ fontWeight: 400, color: '#9B9891' }}>(optionnel)</span></label>
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOverPhotos(true) }}
                    onDragLeave={() => setDragOverPhotos(false)}
                    onDrop={e => {
                      e.preventDefault(); setDragOverPhotos(false)
                      const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
                      setPhotos(prev => [...prev, ...files].slice(0, 10))
                    }}
                    style={{
                      border: '2px dashed ' + (dragOverPhotos ? '#18170F' : '#E8E6E1'),
                      borderRadius: '10px', padding: '20px', textAlign: 'center',
                      background: dragOverPhotos ? '#F9F8F6' : 'white',
                      transition: 'all 0.15s', cursor: 'pointer'
                    }}
                    onClick={() => document.getElementById('photos-input')?.click()}>
                    <input id="photos-input" type="file" multiple accept="image/*"
                      style={{ display: 'none' }}
                      onChange={e => {
                        const files = Array.from(e.target.files || [])
                        setPhotos(prev => [...prev, ...files].slice(0, 10))
                      }} />
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>📷</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500, color: '#18170F', marginBottom: '4px' }}>Ajouter des photos</div>
                    <div style={{ fontSize: '0.75rem', color: '#9B9891' }}>JPG, PNG, HEIC · Max 10 photos</div>
                  </div>
                  {photos.length > 0 && (
                    <div style={{ marginTop: '10px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                      {photos.map((f, i) => {
                        const url = URL.createObjectURL(f)
                        return (
                          <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: '8px', overflow: 'hidden' }}>
                            <img src={url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            <button onClick={() => setPhotos(prev => prev.filter((_, j) => j !== i))}
                              style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.6)', border: 'none', borderRadius: '50%', color: 'white', width: '20px', height: '20px', cursor: 'pointer', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 16px', border: '1px solid #E8E6E1', borderRadius: '9px', cursor: 'pointer' }}
                  onClick={() => setUrgence(!urgence)}>
                  <input type="checkbox" checked={urgence} onChange={() => setUrgence(!urgence)}
                    style={{ width: '16px', height: '16px', accentColor: '#18170F', cursor: 'pointer' }} />
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#18170F' }}>Demande urgente</div>
                    <div style={{ fontSize: '0.75rem', color: '#6B6860' }}>Début des travaux dans moins de 2 semaines</div>
                  </div>
                </div>

                <button onClick={() => setEtape(2)} disabled={!specialite || !titre || !secteur} style={{
                  padding: '13px', background: !specialite || !titre || !secteur ? '#E8E6E1' : '#18170F',
                  color: !specialite || !titre || !secteur ? '#9B9891' : 'white',
                  border: 'none', borderRadius: '9px', fontSize: '0.9rem', fontWeight: 500,
                  cursor: !specialite || !titre || !secteur ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit', transition: 'all 0.15s'
                }}>
                  Continuer →
                </button>
              </div>
            )}

            {/* ÉTAPE 2 — Détails */}
            {etape === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#18170F', marginBottom: '4px' }}>Localisation et budget</h2>

                <div>
                  <label style={labelStyle}>Adresse des travaux</label>
                  <input type="text" value={adresse} onChange={e => setAdresse(e.target.value)}
                    placeholder="123 Rue des Érables" style={inputStyle} />
                  <p style={{ fontSize: '0.72rem', color: '#9B9891', marginTop: '5px' }}>
                    📍 L'autocomplétion Google sera disponible prochainement
                  </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', gap: '12px' }}>
                  <div>
                    <label style={labelStyle}>Ville</label>
                    <input type="text" value={ville} onChange={e => setVille(e.target.value)} placeholder="Laval" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Province</label>
                    <select value={province} onChange={e => setProvince(e.target.value)} style={{ ...inputStyle, appearance: 'none' as const }}>
                      <option value="QC">Québec</option>
                      <option value="ON">Ontario</option>
                      <option value="BC">Colombie-Britannique</option>
                      <option value="AB">Alberta</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Code postal</label>
                    <input type="text" value={codePostal} onChange={e => setCodePostal(e.target.value.toUpperCase())}
                      placeholder="H7V 1A1" maxLength={7} style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Budget approximatif</label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {['Moins de 5 000 $', '5 000 – 25 000 $', '25 000 – 100 000 $', '100 000 – 500 000 $', '500 000 $ et plus', 'À déterminer'].map(b => (
                      <button key={b} onClick={() => setBudget(b)} style={{
                        padding: '7px 14px', borderRadius: '100px', cursor: 'pointer',
                        border: '1px solid ' + (budget === b ? '#18170F' : '#E8E6E1'),
                        background: budget === b ? '#18170F' : 'white',
                        color: budget === b ? 'white' : '#18170F',
                        fontSize: '0.78rem', fontFamily: 'inherit', fontWeight: 400,
                        transition: 'all 0.15s', whiteSpace: 'nowrap'
                      }}>{b}</button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Date de début souhaitée</label>
                  <input type="date" value={dateDebut} onChange={e => setDateDebut(e.target.value)} style={inputStyle} />
                </div>

                {typeClient === 'entrepreneur' && (
                  <div style={{ padding: '16px', background: '#F0FDF4', borderRadius: '12px', border: '1px solid #BBF7D0' }}>
                    <p style={{ fontSize: '0.82rem', color: '#15803D', lineHeight: 1.5, margin: 0 }}>
                      ✓ En tant qu'entrepreneur, votre demande sera visible uniquement par les sous-traitants certifiés dans la spécialité sélectionnée.
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setEtape(1)} style={{
                    flex: 1, padding: '13px', background: 'white', color: '#6B6860',
                    border: '1px solid #E8E6E1', borderRadius: '9px', fontSize: '0.9rem',
                    fontWeight: 400, cursor: 'pointer', fontFamily: 'inherit'
                  }}>← Retour</button>
                  <button onClick={() => setEtape(3)} disabled={!adresse || !ville} style={{
                    flex: 2, padding: '13px',
                    background: !adresse || !ville ? '#E8E6E1' : '#18170F',
                    color: !adresse || !ville ? '#9B9891' : 'white',
                    border: 'none', borderRadius: '9px', fontSize: '0.9rem',
                    fontWeight: 500, cursor: !adresse || !ville ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit', transition: 'all 0.15s'
                  }}>Continuer →</button>
                </div>
              </div>
            )}

            {/* ÉTAPE 3 — Contact */}
            {etape === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 600, color: '#18170F', marginBottom: '4px' }}>Vos coordonnées</h2>
                <p style={{ fontSize: '0.82rem', color: '#6B6860', marginTop: '-12px' }}>
                  Vos informations sont confidentielles et ne sont partagées qu'avec les soumissionnaires retenus.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={labelStyle}>Prénom</label>
                    <input type="text" value={nom.split(' ')[0] || ''} onChange={e => setNom(e.target.value + ' ' + (nom.split(' ')[1] || ''))}
                      placeholder="Jean" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Nom</label>
                    <input type="text" value={nom.split(' ')[1] || ''} onChange={e => setNom((nom.split(' ')[0] || '') + ' ' + e.target.value)}
                      placeholder="Tremblay" style={inputStyle} />
                  </div>
                </div>

                {typeClient === 'entrepreneur' && (
                  <div>
                    <label style={labelStyle}>Entreprise</label>
                    <input type="text" value={entreprise} onChange={e => setEntreprise(e.target.value)}
                      placeholder="Construction Tremblay inc." style={inputStyle} />
                  </div>
                )}

                <div>
                  <label style={labelStyle}>Courriel</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="vous@exemple.com" style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Téléphone</label>
                  <input type="tel" value={telephone} onChange={e => setTelephone(e.target.value)}
                    placeholder="514 555-1234" style={inputStyle} />
                </div>

                {/* Résumé */}
                <div style={{ padding: '16px', background: '#F9F8F6', borderRadius: '12px', border: '1px solid #E8E6E1' }}>
                  <p style={{ fontSize: '0.72rem', fontWeight: 600, color: '#6B6860', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                    Résumé de la demande
                  </p>
                  {[
                    { label: 'Type', val: typeClient === 'entrepreneur' ? 'Entrepreneur / GC' : 'Particulier' },
                    { label: 'Spécialité', val: specialite },
                    { label: 'Secteur', val: secteur },
                    { label: 'Adresse', val: `${adresse}, ${ville}, ${province} ${codePostal}`.trim().replace(/,\s*$/, '') },
                    { label: 'Budget', val: budget || 'À déterminer' },
                    { label: 'Urgence', val: urgence ? 'Oui' : 'Non' },
                  ].map(item => (
                    <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid #F0EEEA' }}>
                      <span style={{ fontSize: '0.78rem', color: '#6B6860' }}>{item.label}</span>
                      <span style={{ fontSize: '0.78rem', fontWeight: 500, color: '#18170F' }}>{item.val}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setEtape(2)} style={{
                    flex: 1, padding: '13px', background: 'white', color: '#6B6860',
                    border: '1px solid #E8E6E1', borderRadius: '9px', fontSize: '0.9rem',
                    fontWeight: 400, cursor: 'pointer', fontFamily: 'inherit'
                  }}>← Retour</button>
                  {/* On submit: save typeClient as source_type in DB.
                      Mapping: 'particulier' → 'client', 'entrepreneur' → 'pro' */}
                  <button onClick={() => setSubmitted(true)} disabled={!email || !nom.trim()} style={{
                    flex: 2, padding: '13px',
                    background: !email || !nom.trim() ? '#E8E6E1' : '#18170F',
                    color: !email || !nom.trim() ? '#9B9891' : 'white',
                    border: 'none', borderRadius: '9px', fontSize: '0.9rem',
                    fontWeight: 500, cursor: !email || !nom.trim() ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit'
                  }}>
                    Publier ma demande →
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Confirmation */
          <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #E8E6E1', padding: '48px 32px', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🎉</div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 600, color: '#18170F', letterSpacing: '-0.02em', marginBottom: '10px' }}>
              Demande publiée avec succès !
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#6B6860', lineHeight: 1.65, maxWidth: '400px', margin: '0 auto 28px' }}>
              Votre demande est maintenant visible par les professionnels qualifiés.
              Vous recevrez vos premières soumissions par courriel sous 24–48h.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <a href="/" style={{ padding: '11px 24px', border: '1px solid #E8E6E1', borderRadius: '9px', fontSize: '0.875rem', color: '#6B6860', textDecoration: 'none', fontWeight: 400 }}>
                Retour à l'accueil
              </a>
              <a href="/inscription" style={{ padding: '11px 24px', background: '#18170F', color: 'white', borderRadius: '9px', fontSize: '0.875rem', textDecoration: 'none', fontWeight: 500 }}>
                Créer un compte →
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
