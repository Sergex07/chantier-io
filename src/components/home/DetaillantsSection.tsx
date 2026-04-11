import Link from "next/link";

const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] fill-[#18170F]">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const DETAILLANTS = [
  {
    bg: "#F96302",
    logo: (
      <svg viewBox="0 0 200 80" className="w-[60%] max-w-[180px]">
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
      <svg viewBox="0 0 200 80" className="w-[60%] max-w-[180px]">
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
      <svg viewBox="0 0 200 80" className="w-[60%] max-w-[180px]">
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
    <div className="py-0 px-10 max-w-[1400px] mx-auto pb-16">
      <div className="flex items-end justify-between mb-8">
        <div className="text-[1.5rem] font-bold text-[#18170F] tracking-[-0.03em]">
          Détaillants en vedette
        </div>
        <Link href="/detaillants" className="text-sm font-semibold text-[#18170F] underline underline-offset-[3px]">
          Voir tous les détaillants →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {DETAILLANTS.map((d) => (
          <div key={d.name} className="cursor-pointer group">
            <div
              className="h-56 w-full rounded-2xl overflow-hidden flex items-center justify-center"
              style={{ background: d.bg }}
            >
              {d.logo}
            </div>
            <div className="pt-3 px-1">
              <div className="flex items-start justify-between gap-2">
                <div className="text-[0.9rem] font-semibold text-[#18170F]">{d.name}</div>
                <div className="flex items-center gap-1 text-[0.82rem] font-semibold text-[#18170F] whitespace-nowrap">
                  <StarIcon /> {d.rating}
                </div>
              </div>
              <div className="text-[0.82rem] text-[#6B6860] mt-[3px]">{d.meta}</div>
              <div className="text-[0.875rem] text-[#18170F] mt-[6px]">{d.cat}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
