'use client'
import { ModeProvider } from './home/ModeContext'

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <ModeProvider>{children}</ModeProvider>
}
