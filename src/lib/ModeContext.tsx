'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Mode = 'pro' | 'travailleur'

const ModeContext = createContext<{ mode: Mode; setMode: (m: Mode) => void }>({
  mode: 'pro', setMode: () => {}
})

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('pro')

  useEffect(() => {
    const saved = localStorage.getItem('chantier_mode')
    if (saved === 'pro' || saved === 'travailleur') {
      setMode(saved)
    } else {
      setMode('pro')
      localStorage.setItem('chantier_mode', 'pro')
    }
  }, [])

  const handleSetMode = (m: Mode) => {
    setMode(m)
    localStorage.setItem('chantier_mode', m)
  }

  return (
    <ModeContext.Provider value={{ mode, setMode: handleSetMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export const useMode = () => useContext(ModeContext)
export type { Mode }
