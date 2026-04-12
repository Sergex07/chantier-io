'use client'
import { createContext, useContext, useState } from 'react'

export type Mode = 'public' | 'pro' | 'travailleur'

const ModeContext = createContext<{
  mode: Mode
  setMode: (m: Mode) => void
}>({ mode: 'public', setMode: () => {} })

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('chantier_mode') as Mode) || 'public'
    }
    return 'public'
  })

  const handleSetMode = (m: Mode) => {
    setMode(m)
    if (typeof window !== 'undefined') localStorage.setItem('chantier_mode', m)
  }

  return (
    <ModeContext.Provider value={{ mode, setMode: handleSetMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  return useContext(ModeContext)
}
