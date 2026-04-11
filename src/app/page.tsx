import HeroSection from '@/components/home/HeroSection'
import SousTraitantsSection from '@/components/home/SousTraitantsSection'
import AppelsSoumissionsSection from '@/components/home/AppelsSoumissionsSection'
import DetaillantsSection from '@/components/home/DetaillantsSection'
import ProfessionnelsSection from '@/components/home/ProfessionnelsSection'
import PartnersSection from '@/components/home/PartnersSection'
import CTAFinalSection from '@/components/home/CTAFinalSection'
import FooterSection from '@/components/home/FooterSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SousTraitantsSection />
      <AppelsSoumissionsSection />
      <DetaillantsSection />
      <ProfessionnelsSection />
      <PartnersSection />
      <CTAFinalSection />
      <FooterSection />
    </main>
  )
}
