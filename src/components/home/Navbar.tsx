export default function Navbar() {
  return (
    <nav style={{
      position:'fixed', top:0, left:0, right:0, zIndex:300,
      height:'62px', display:'flex', alignItems:'center',
      justifyContent:'space-between', padding:'0 40px',
      background:'rgba(255,255,255,0.95)',
      borderBottom:'1px solid #E8E6E1',
      boxShadow:'0 1px 3px rgba(0,0,0,0.06)'
    }}>
      <a href="/" style={{display:'flex',alignItems:'center',gap:'8px',
        fontWeight:800,fontSize:'1.05rem',color:'#18170F',textDecoration:'none'}}>
        <div style={{width:'28px',height:'28px',background:'#4A5568',
          borderRadius:'7px',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
          </svg>
        </div>
        Chantier.io
      </a>
      <div style={{display:'flex',gap:'4px'}}>
        {['À propos','Comment ça marche','Contact'].map(l => (
          <a key={l} href="#" style={{color:'#6B6860',textDecoration:'none',
            fontSize:'0.875rem',fontWeight:500,padding:'6px 14px',borderRadius:'8px'}}>
            {l}
          </a>
        ))}
      </div>
      <div style={{display:'flex',gap:'10px',alignItems:'center'}}>
        <a href="/connexion" style={{fontSize:'0.875rem',fontWeight:500,
          color:'#6B6860',textDecoration:'none',padding:'6px 14px'}}>
          Connexion
        </a>
        <a href="/inscription" style={{background:'#18170F',color:'white',
          fontSize:'0.875rem',fontWeight:600,padding:'8px 18px',
          borderRadius:'8px',textDecoration:'none'}}>
          Inscription
        </a>
      </div>
    </nav>
  )
}
