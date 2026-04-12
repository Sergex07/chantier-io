import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavbarConditional from '@/components/home/NavbarConditional'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chantier.io',
  description: 'La plateforme de la construction québécoise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, padding: 0, fontFamily: inter.style.fontFamily }}>
        <NavbarConditional />
        {children}
      </body>
    </html>
  )
}
