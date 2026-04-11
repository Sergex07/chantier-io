import SousTraitantsSection from '@/components/home/SousTraitantsSection'

export default function Home() {
  return (
    <div style={{minHeight: '100vh', background: 'white'}}>
      <div style={{height: '100vh', background: '#333', display: 'flex',
                   alignItems: 'center', justifyContent: 'center'}}>
        <h1 style={{color: 'white', fontSize: '3rem'}}>HERO PLACEHOLDER</h1>
      </div>
      <div style={{padding: '80px 40px', background: '#f5f5f5'}}>
        <h2 style={{fontSize: '2rem', marginBottom: '40px', color: '#18170F'}}>
          Sous-traitants en vedette
        </h2>
        <SousTraitantsSection />
      </div>
      <div style={{padding: '40px', background: 'red', color: 'white',
                   fontSize: '2rem', textAlign: 'center'}}>
        TEST SECTION VISIBLE
      </div>
    </div>
  )
}
