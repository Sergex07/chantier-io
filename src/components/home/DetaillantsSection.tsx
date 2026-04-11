export default function DetaillantsSection() {
  const detaillants = [
    { nom: 'The Home Depot', meta: '12 succursales · Livraison chantier',
      cat: 'Matériaux · Outils · Électricité · Plomberie', note: '4.8',
      bg: '#F96302', initiales: 'HD' },
    { nom: 'RONA inc.', meta: 'Réseau québécois · Compte pro disponible',
      cat: 'Bois · Toiture · Fenestration · Quincaillerie', note: '4.7',
      bg: '#005B99', initiales: 'RONA' },
    { nom: 'Groupe BMR', meta: '100% québécois · 300+ points de vente',
      cat: 'Béton · Isolation · Revêtement · Intérieur', note: '4.6',
      bg: '#00843D', initiales: 'BMR' },
  ]
  return (
    <section style={{padding: '0 40px 64px', background: '#fff'}}>
      <div style={{maxWidth: '1280px', margin: '0 auto'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px'}}>
          <h2 style={{fontSize:'1.5rem', fontWeight:700, color:'#18170F'}}>Détaillants en vedette</h2>
          <a href="#" style={{fontSize:'0.875rem', color:'#18170F', fontWeight:600}}>Voir tous les détaillants →</a>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px'}}>
          {detaillants.map((d, i) => (
            <div key={i} style={{border:'1px solid #E8E6E1', borderRadius:'12px', overflow:'hidden', cursor:'pointer'}}>
              <div style={{height:'224px', background:d.bg, display:'flex', alignItems:'center', justifyContent:'center'}}>
                <span style={{fontSize:'3rem', fontWeight:900, color:'white', letterSpacing:'-0.02em'}}>{d.initiales}</span>
              </div>
              <div style={{padding:'14px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <div style={{fontWeight:600, fontSize:'0.9rem', color:'#18170F'}}>{d.nom}</div>
                  <div style={{fontSize:'0.82rem', fontWeight:600, color:'#18170F'}}>★ {d.note}</div>
                </div>
                <div style={{fontSize:'0.78rem', color:'#6B6860', marginTop:'4px'}}>{d.meta}</div>
                <div style={{fontSize:'0.875rem', color:'#18170F', marginTop:'6px'}}>{d.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
