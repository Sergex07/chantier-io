import Link from "next/link";

const StarIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 11, height: 11, fill: "#18170F" }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const DETAILLANTS = [
  {
    bg: "#F96302",
    logo: (
      <svg viewBox="0 0 200 80" style={{ width: "60%", maxWidth: 180 }}>
        <rect x="4" y="10" width="52" height="52" rx="8" fill="white" opacity=".15"/>
        <text x="30" y="46" fontFamily="Arial" fontWeight="900" fontSize="28" fill="white" textAnchor="middle">HD</text>
        <text x="70" y="36" fontFamily="Arial" fontWeight="800" fontSize="18" fill="white">The Home</text>
        <text x="70" y="58" fontFamily="Arial" fontWeight="800" fontSize="18" fill="white">Depot</text>
      </svg>
    ),
    name: "The Home Depot",
    rating: "4.8",
    meta: "12 succursales au Québec · Livraison chantier",
    cat: "Matériaux · Outils · Électricité · Plomberie",
  },
  {
    bg: "#005B99",
    logo: (
      <svg viewBox="0 0 200 80" style={{ width: "60%", maxWidth: 180 }}>
        <rect x="4" y="10" width="52" height="52" rx="8" fill="white" opacity=".15"/>
        <text x="30" y="46" fontFamily="Arial" fontWeight="900" fontSize="28" fill="white" textAnchor="middle">R</text>
        <text x="70" y="50" fontFamily="Arial" fontWeight="900" fontSize="36" fill="white">RONA</text>
      </svg>
    ),
    name: "RONA inc.",
    rating: "4.7",
    meta: "Réseau québécois · Compte pro disponible",
    cat: "Bois · Toiture · Fenestration · Quincaillerie",
  },
  {
    bg: "#00843D",
    logo: (
      <svg viewBox="0 0 200 80" style={{ width: "60%", maxWidth: 180 }}>
        <rect x="4" y="10" width="52" height="52" rx="8" fill="white" opacity=".15"/>
        <text x="30" y="46" fontFamily="Arial" fontWeight="900" fontSize="24" fill="white" textAnchor="middle">BMR</text>
        <text x="70" y="36" fontFamily="Arial" fontWeight="800" fontSize="16" fill="white">Groupe</text>
        <text x="70" y="56" fontFamily="Arial" fontWeight="800" fontSize="16" fill="white">BMR</text>
      </svg>
    ),
    name: "Groupe BMR",
    rating: "4.6",
    meta: "100% québécois · 300+ points de vente",
    cat: "Béton · Isolation · Revêtement · Intérieur",
  },
];

export default function DetaillantsSection() {
  return (
    <div style={{ padding: "0 40px 64px", background: "#ffffff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#18170F", letterSpacing: "-0.03em" }}>
            Détaillants en vedette
          </div>
          <Link href="/detaillants" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#18170F", textDecoration: "underline", textUnderlineOffset: 3 }}>
            Voir tous les détaillants →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {DETAILLANTS.map((d) => (
            <div key={d.name} style={{ cursor: "pointer" }}>
              {/* Colored logo card */}
              <div style={{ height: 224, width: "100%", borderRadius: 16, overflow: "hidden", background: d.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {d.logo}
              </div>

              {/* Info */}
              <div style={{ paddingTop: 12, paddingLeft: 4, paddingRight: 4 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#18170F" }}>{d.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.82rem", fontWeight: 600, color: "#18170F", whiteSpace: "nowrap" }}>
                    <StarIcon /> {d.rating}
                  </div>
                </div>
                <div style={{ fontSize: "0.82rem", color: "#6B6860", marginTop: 3 }}>{d.meta}</div>
                <div style={{ fontSize: "0.875rem", color: "#18170F", marginTop: 6 }}>{d.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
