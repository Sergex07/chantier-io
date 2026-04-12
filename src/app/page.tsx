import ErrorBoundary from '@/components/ErrorBoundary'
import HeroSection from '@/components/home/HeroSection'
import HomepageAdaptive from '@/components/home/HomepageAdaptive'
import FooterSection from '@/components/home/FooterSection'

export default function Home() {
  return (
    <ErrorBoundary>
      <main>
        <HeroSection />
        <HomepageAdaptive />
        <FooterSection />
      </main>
    </ErrorBoundary>
  )
}
