import type { Metadata } from 'next'
import Navbar from '@/components/home/Navbar'

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
      <body style={{margin:0, padding:0, fontFamily:'Inter, sans-serif'}}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
