const PARTNERS = [
  {
    name: "The Home Depot",
    svg: (
      <svg viewBox="0 0 120 40" style={{ width: "100%", maxWidth: 130, height: 40 }}>
        <rect x="2" y="8" width="24" height="24" rx="4" fill="#F96302"/>
        <text x="14" y="24" fontFamily="Arial" fontWeight="900" fontSize="13" fill="white" textAnchor="middle">HD</text>
        <text x="34" y="26" fontFamily="Arial" fontWeight="800" fontSize="14" fill="#1A1916">The Home</text>
        <text x="34" y="38" fontFamily="Arial" fontWeight="800" fontSize="14" fill="#F96302">Depot</text>
      </svg>
    ),
  },
  {
    name: "RONA",
    svg: (
      <svg viewBox="0 0 120 40" style={{ width: "100%", maxWidth: 130, height: 40 }}>
        <rect x="2" y="10" width="20" height="20" rx="3" fill="#005B99"/>
        <text x="12" y="24" fontFamily="Arial" fontWeight="900" fontSize="11" fill="white" textAnchor="middle">R</text>
        <text x="28" y="26" fontFamily="Arial" fontWeight="800" fontSize="15" fill="#005B99">RONA</text>
      </svg>
    ),
  },
  {
    name: "Canadian Tire",
    svg: (
      <svg viewBox="0 0 140 40" style={{ width: "100%", maxWidth: 130, height: 40 }}>
        <circle cx="18" cy="20" r="12" fill="#CC0000"/>
        <text x="18" y="25" fontFamily="Arial" fontWeight="900" fontSize="12" fill="white" textAnchor="middle">CT</text>
        <text x="36" y="26" fontFamily="Arial" fontWeight="700" fontSize="13" fill="#1A1916">Canadian Tire</text>
      </svg>
    ),
  },
  {
    name: "BMR",
    svg: (
      <svg viewBox="0 0 140 40" style={{ width: "100%", maxWidth: 130, height: 40 }}>
        <rect x="2" y="8" width="22" height="22" rx="3" fill="#00843D"/>
        <text x="13" y="23" fontFamily="Arial" fontWeight="900" fontSize="11" fill="white" textAnchor="middle">BM</text>
        <text x="30" y="26" fontFamily="Arial" fontWeight="800" fontSize="13" fill="#1A1916">BMR</text>
        <text x="30" y="37" fontFamily="Arial" fontWeight="500" fontSize="9" fill="#6B6860">Matériaux</text>
      </svg>
    ),
  },
  {
    name: "Richelieu",
    svg: (
      <svg viewBox="0 0 140 40" style={{ width: "100%", maxWidth: 130, height: 40 }}>
        <rect x="2" y="6" width="26" height="26" rx="4" fill="#E31837"/>
        <text x="15" y="23" fontFamily="Arial" fontWeight="900" fontSize="11" fill="white" textAnchor="middle">RC</text>
        <text x="34" y="20" fontFamily="Arial" fontWeight="800" fontSize="12" fill="#1A1916">Richelieu</text>
        <text x="34" y="33" fontFamily="Arial" fontWeight="500" fontSize="9" fill="#6B6860">Hardware</text>
      </svg>
    ),
  },
  {
    name: "Canwel",
    svg: (
      <svg viewBox="0 0 140 40" style={{ width: "100%", maxWidth: 130, height: 40 }}>
        <rect x="2" y="8" width="22" height="22" rx="3" fill="#FF6B00"/>
        <text x="13" y="23" fontFamily="Arial" fontWeight="900" fontSize="10" fill="white" textAnchor="middle">CW</text>
        <text x="30" y="26" fontFamily="Arial" fontWeight="800" fontSize="13" fill="#1A1916">Canwel</text>
        <text x="30" y="37" fontFamily="Arial" fontWeight="500" fontSize="9" fill="#6B6860">Building Materials</text>
      </svg>
    ),
  },
  {
    name: "Lowe's",
    svg: (
      <svg viewBox="0 0 140 40" style={{ width: "100%", maxWidth: 130, height: 40 }}>
        <rect x="2" y="8" width="22" height="22" rx="3" fill="#003087"/>
        <text x="13" y="23" fontFamily="Arial" fontWeight="900" fontSize="10" fill="white" textAnchor="middle">LE</text>
        <text x="30" y="26" fontFamily="Arial" fontWeight="800" fontSize="13" fill="#1A1916">Lowe&apos;s</text>
        <text x="30" y="37" fontFamily="Arial" fontWeight="500" fontSize="9" fill="#6B6860">Canada</text>
      </svg>
    ),
  },
  {
    name: "GPC",
    svg: (
      <svg viewBox="0 0 140 40" style={{ width: "100%", maxWidth: 130, height: 40 }}>
        <rect x="2" y="8" width="22" height="22" rx="3" fill="#6B3A8F"/>
        <text x="13" y="23" fontFamily="Arial" fontWeight="900" fontSize="10" fill="white" textAnchor="middle">GP</text>
        <text x="30" y="26" fontFamily="Arial" fontWeight="800" fontSize="13" fill="#1A1916">GPC</text>
        <text x="30" y="37" fontFamily="Arial" fontWeight="500" fontSize="9" fill="#6B6860">Groupe Pro-Cal</text>
      </svg>
    ),
  },
];

export default function PartnersSection() {
  return (
    <div style={{ background: "#F7F7F7", borderTop: "1px solid #DDDDDD", borderBottom: "1px solid #DDDDDD", padding: "80px 40px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div style={{ fontSize: "0.7rem", fontWeight: 700, color: "#4A5568", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
            Fournisseurs partenaires
          </div>
          <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#18170F", letterSpacing: "-0.03em", marginBottom: 12 }}>
            Les grandes enseignes font confiance à Chantier.io
          </div>
          <p style={{ fontSize: "0.9rem", color: "#6B6860", maxWidth: "46ch", margin: "0 auto", lineHeight: 1.65 }}>
            Accédez aux meilleurs fournisseurs de matériaux et d&apos;équipements directement depuis la plateforme.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              style={{ background: "white", border: "1px solid #DDDDDD", borderRadius: 14, padding: "28px 24px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
            >
              {p.svg}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <a
            href="#"
            style={{ display: "inline-block", fontSize: "0.875rem", fontWeight: 700, color: "#18170F", padding: "12px 24px", borderRadius: 10, border: "1px solid #DDDDDD", background: "white", textDecoration: "none" }}
          >
            Devenir fournisseur partenaire →
          </a>
        </div>
      </div>
    </div>
  );
}
