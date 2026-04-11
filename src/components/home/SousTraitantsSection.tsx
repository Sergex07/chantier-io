export default function SousTraitantsSection() {
  const pros = [
    { nom: 'Voltex Électrique inc.', specialite: 'Électricité', ville: 'Laval',
      note: '4.97', projets: 148, tarif: '85 $/h',
      img: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80' },
    { nom: 'Aqua Pro Plomberie', specialite: 'Plomberie', ville: 'Montréal',
      note: '4.91', projets: 92, tarif: '75 $/h',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80' },
    { nom: 'Construction Boisvert', specialite: 'Charpenterie', ville: 'Rive-Nord',
      note: '4.88', projets: 211, tarif: '70 $/h',
      img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80' },
  ]
  return (
    <section style={{padding: '64px 40px', background: '#fff'}}>
      <div style={{maxWidth: '1280px', margin: '0 auto'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px'}}>
          <h2 style={{fontSize:'1.5rem', fontWeight:700, color:'#18170F'}}>Sous-traitants en vedette</h2>
          <a href="#" style={{fontSize:'0.875rem', color:'#18170F', fontWeight:600}}>Voir tous les profils →</a>
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
                <div style={{fontSize:'0.875rem', color:'#18170F', marginTop:'6px'}}>À partir de <strong>{p.tarif}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
