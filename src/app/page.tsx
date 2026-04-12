'use client'
import { useMode } from '@/lib/ModeContext'
import HeroSection from '@/components/home/HeroSection'
import SousTraitantsSection from '@/components/home/SousTraitantsSection'
import AppelsSoumissionsSection from '@/components/home/AppelsSoumissionsSection'
import EmploisSection from '@/components/home/EmploisSection'
import TravailleursSection from '@/components/home/TravailleursSection'
import ProStatsSection from '@/components/home/ProStatsSection'
import CategoriesSection from '@/components/home/CategoriesSection'
import ProWowSection from '@/components/home/ProWowSection'
import DetaillantsSection from '@/components/home/DetaillantsSection'
import CTAFinalSection from '@/components/home/CTAFinalSection'
import TemoignagesSection from '@/components/home/TemoignagesSection'
import PartenaireVedetteSection from '@/components/home/PartenaireVedetteSection'
import ProcessSection from '@/components/home/ProcessSection'
import ProfessionnelsSection from '@/components/home/ProfessionnelsSection'
import ProDoubleCtaSection from '@/components/home/ProDoubleCtaSection'
import ProProcessSection from '@/components/home/ProProcessSection'
import FeaturedSection from '@/components/home/FeaturedSection'
import ValuePropSection from '@/components/home/ValuePropSection'
import FooterSection from '@/components/home/FooterSection'

export default function HomePage() {
  const { mode } = useMode()

  return (
    <main>
      <HeroSection />

      {mode === 'public' && (
        <>
          <FeaturedSection />
          <ValuePropSection />
          <ProcessSection />
          <SousTraitantsSection />
          <CategoriesSection />
          <ProfessionnelsSection />
          <TemoignagesSection />
          <CTAFinalSection />
        </>
      )}

      {(mode === 'entrepreneur' || mode === 'professionnel' || mode === 'soustraitant' || mode === 'detaillant') && (
        <>
          <ProDoubleCtaSection />
          <AppelsSoumissionsSection />
          <ProProcessSection />
          <ProStatsSection />
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
