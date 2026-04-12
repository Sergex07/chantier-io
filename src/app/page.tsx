import ErrorBoundary from '@/components/ErrorBoundary'
import HeroSection from '@/components/home/HeroSection'
import SousTraitantsSection from '@/components/home/SousTraitantsSection'
import AppelsSoumissionsSection from '@/components/home/AppelsSoumissionsSection'
import DetaillantsSection from '@/components/home/DetaillantsSection'
import ProfessionnelsSection from '@/components/home/ProfessionnelsSection'
import EmploisSection from '@/components/home/EmploisSection'
import TravailleursSection from '@/components/home/TravailleursSection'
import CTAFinalSection from '@/components/home/CTAFinalSection'
import FooterSection from '@/components/home/FooterSection'

export default function Home() {
  return (
    <ErrorBoundary>
      <main>
        <HeroSection />
        <SousTraitantsSection />
        <AppelsSoumissionsSection />
        <DetaillantsSection />
        <ProfessionnelsSection />
        <EmploisSection />
        <TravailleursSection />
        <CTAFinalSection />
        <FooterSection />
      </main>
    </ErrorBoundary>
  )
}
