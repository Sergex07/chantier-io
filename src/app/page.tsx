'use client'
import { useMode } from '@/lib/ModeContext'
import HeroSection from '@/components/home/HeroSection'
import ExplicationSection from '@/components/home/ExplicationSection'
import AppelsSoumissionsSection from '@/components/home/AppelsSoumissionsSection'
import ProStatsSection from '@/components/home/ProStatsSection'
import CTAFinalSection from '@/components/home/CTAFinalSection'
import ProDoubleCtaSection from '@/components/home/ProDoubleCtaSection'
import ProProcessSection from '@/components/home/ProProcessSection'
import FooterSection from '@/components/home/FooterSection'
import TravailleurHeroSection from '@/components/home/TravailleurHeroSection'
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
      <ExplicationSection />

      {mode === 'pro' && (
        <>
          <ProDoubleCtaSection />
          <ProProcessSection />
          <AppelsSoumissionsSection />
          <ProStatsSection />
          <CTAFinalSection />
        </>
      )}

      {mode === 'travailleur' && (
        <>
          <TravailleurHeroSection />
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
