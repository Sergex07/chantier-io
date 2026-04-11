'use client'
import { useState } from 'react'

const categories = [
  'Tous', 'Électricité', 'Plomberie', 'Charpenterie', 'Toiture',
  'HVAC', 'Peinture', 'Fondation', 'Porte et Fenêtre', 'Céramique',
  'Maçonnerie', 'Escalier', 'Vitrier', 'Sablage', 'Démolition',
  'Excavation', 'Revêtement extérieur', 'Isolation', 'Gypse & Plâtre',
]

export default function FiltresCategories({ onFilter }: { onFilter: (cat: string) => void }) {
  const [active, setActive] = useState('Tous')
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
      {categories.map(cat => (
        <button key={cat} onClick={() => { setActive(cat); onFilter(cat) }} style={{
          padding: '6px 14px',
          borderRadius: '100px',
          border: `1px solid ${active === cat ? '#18170F' : '#E8E6E1'}`,
          background: active === cat ? '#18170F' : 'transparent',
          color: active === cat ? '#fff' : '#18170F',
          fontSize: '0.78rem',
          fontWeight: 400,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'all 0.15s',
          whiteSpace: 'nowrap',
        }}>
          {cat}
        </button>
      ))}
    </div>
  )
}
