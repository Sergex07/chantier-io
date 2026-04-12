'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Mode = 'public' | 'entrepreneur' | 'professionnel' | 'detaillant' | 'soustraitant' | 'travailleur'

const ModeContext = createContext<{ mode: Mode; setMode: (m: Mode) => void }>({
  mode: 'public', setMode: () => {}
})

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>('public')

  useEffect(() => {
    const saved = localStorage.getItem('chantier_mode') as Mode
    if (saved) setMode(saved)
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
