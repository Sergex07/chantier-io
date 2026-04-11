'use client'
import { useState } from 'react'

const CATEGORIES = [
  'Tous', 'Électricité', 'Plomberie', 'Charpenterie', 'Toiture',
  'HVAC', 'Peinture', 'Fondation', 'Porte et Fenêtre', 'Céramique',
  'Maçonnerie', 'Escalier', 'Vitrier', 'Sablage', 'Démolition',
  'Excavation', 'Revêtement extérieur', 'Isolation', 'Gypse & Plâtre',
]

export default function FiltresCategories({ onFilter }: { onFilter: (cat: string) => void }) {
  const [active, setActive] = useState('Tous')

  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px', maxHeight: '88px', overflow: 'hidden' }}>
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          onClick={() => { setActive(cat); onFilter(cat) }}
          style={{
            padding: '7px 16px',
            borderRadius: '100px',
            border: `1px solid ${active === cat ? '#18170F' : '#E8E6E1'}`,
            background: active === cat ? '#18170F' : 'white',
            color: active === cat ? 'white' : '#6B6860',
            fontSize: '0.78rem',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background 0.15s, border-color 0.15s, color 0.15s',
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
