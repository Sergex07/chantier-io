'use client'
import { useMode } from '@/lib/ModeContext'
import HeroSection from '@/components/home/HeroSection'
import AppelsSoumissionsSection from '@/components/home/AppelsSoumissionsSection'
import ProStatsSection from '@/components/home/ProStatsSection'
import CTAFinalSection from '@/components/home/CTAFinalSection'
import FooterSection from '@/components/home/FooterSection'
import OffresEmploiSection from '@/components/home/OffresEmploiSection'
import FormationSection from '@/components/home/FormationSection'
import BlogSection from '@/components/home/BlogSection'
import TravailleurPartenairesSection from '@/components/home/TravailleurPartenairesSection'
import TravailleurCTASection from '@/components/home/TravailleurCTASection'

export default function HomePage() {
  const { mode } = useMode()

  return (
    <main>
      <HeroSection />

      {mode === 'pro' && (
        <>
          <AppelsSoumissionsSection />
          <ProStatsSection />
          <CTAFinalSection />
        </>
      )}

      {mode === 'travailleur' && (
        <>
          <OffresEmploiSection />
          <FormationSection />
          <BlogSection />
          <TravailleurPartenairesSection />
          <TravailleurCTASection />
        </>
      )}

      <FooterSection />
    </main>
  )
}
