export default function ProfessionnelsSection() {
  const pros = [
    { nom: 'Atelier Moreau Architectes', specialite: 'Architecture', ville: 'Montréal',
      note: '4.96', projets: 83, cat: 'Résidentiel & commercial',
      img: 'https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=600&q=80' },
    { nom: 'Studio Leblanc Design', specialite: 'Design intérieur', ville: 'Québec',
      note: '4.94', projets: 61, cat: 'Résidentiel haut de gamme',
      img: 'https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?w=600&q=80' },
    { nom: 'Tremblay Génie-Conseil', specialite: 'Ingénierie', ville: 'Laval',
      note: '4.91', projets: 127, cat: 'Structure & mécanique',
      img: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80' },
  ]
  return (
    <section style={{padding: '0 40px 64px', background: '#fff'}}>
      <div style={{maxWidth: '1280px', margin: '0 auto'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px'}}>
          <h2 style={{fontSize:'1.5rem', fontWeight:700, color:'#18170F'}}>Professionnels en vedette</h2>
          <a href="#" style={{fontSize:'0.875rem', color:'#18170F', fontWeight:600}}>Voir tous les professionnels →</a>
        </div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'24px'}}>
          {pros.map((p, i) => (
            <div key={i} style={{border:'1px solid #E8E6E1', borderRadius:'12px', overflow:'hidden', cursor:'pointer'}}>
              <div style={{height:'224px', backgroundImage:`url(${p.img})`, backgroundSize:'cover', backgroundPosition:'center', position:'relative'}}>
                <span style={{position:'absolute', top:'12px', left:'12px', background:'rgba(0,0,0,0.6)', color:'white', fontSize:'0.7rem', fontWeight:700, padding:'3px 10px', borderRadius:'100px'}}>{p.specialite}</span>
                <span style={{position:'absolute', top:'12px', right:'12px', background:'white', borderRadius:'50%', width:'32px', height:'32px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8rem', fontWeight:700}}>✓</span>
              </div>
              <div style={{padding:'14px'}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
                  <div style={{fontWeight:600, fontSize:'0.9rem', color:'#18170F'}}>{p.nom}</div>
                  <div style={{fontSize:'0.82rem', fontWeight:600, color:'#18170F'}}>★ {p.note}</div>
                </div>
                <div style={{fontSize:'0.78rem', color:'#6B6860', marginTop:'4px'}}>{p.ville} · {p.projets} projets</div>
                <div style={{fontSize:'0.875rem', color:'#18170F', marginTop:'6px'}}>{p.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
