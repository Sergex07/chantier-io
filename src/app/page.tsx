'use client'
import { useMode } from '@/lib/ModeContext'
import HeroSection from '@/components/home/HeroSection'
import SousTraitantsSection from '@/components/home/SousTraitantsSection'
import AppelsSoumissionsSection from '@/components/home/AppelsSoumissionsSection'
import EmploisSection from '@/components/home/EmploisSection'
import TravailleursSection from '@/components/home/TravailleursSection'
import ProStatsSection from '@/components/home/ProStatsSection'
import ProWowSection from '@/components/home/ProWowSection'
import DetaillantsSection from '@/components/home/DetaillantsSection'
import CTAFinalSection from '@/components/home/CTAFinalSection'
import FooterSection from '@/components/home/FooterSection'

export default function HomePage() {
  const { mode } = useMode()

  return (
    <main>
      <HeroSection />

      {mode === 'public' && (
        <>
          <SousTraitantsSection />
          <AppelsSoumissionsSection />
          <EmploisSection />
          <CTAFinalSection />
        </>
      )}

      {mode === 'pro' && (
        <>
          <AppelsSoumissionsSection />
          <ProStatsSection />
          <SousTraitantsSection />
          <CTAFinalSection />
        </>
      )}

      {mode === 'travailleur' && (
        <>
          <TravailleursSection />
          <EmploisSection />
          <CTAFinalSection />
        </>
      )}

      <FooterSection />
    </main>
  )
}
