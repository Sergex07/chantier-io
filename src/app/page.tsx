import ErrorBoundary from '@/components/ErrorBoundary'
import HomepageAdaptive from '@/components/home/HomepageAdaptive'
import FooterSection from '@/components/home/FooterSection'

export default function Home() {
  return (
    <ErrorBoundary>
      <main>
        <HomepageAdaptive />
        <FooterSection />
      </main>
    </ErrorBoundary>
  )
}
