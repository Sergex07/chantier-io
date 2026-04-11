const PARTNERS = [
  {
    name: "The Home Depot",
    svg: (
      <svg viewBox="0 0 120 40">
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
      <svg viewBox="0 0 120 40">
        <rect x="2" y="10" width="20" height="20" rx="3" fill="#005B99"/>
        <text x="12" y="24" fontFamily="Arial" fontWeight="900" fontSize="11" fill="white" textAnchor="middle">R</text>
        <text x="28" y="26" fontFamily="Arial" fontWeight="800" fontSize="15" fill="#005B99">RONA</text>
      </svg>
    ),
  },
  {
    name: "Canadian Tire",
    svg: (
      <svg viewBox="0 0 140 40">
        <circle cx="18" cy="20" r="12" fill="#CC0000"/>
        <text x="18" y="25" fontFamily="Arial" fontWeight="900" fontSize="12" fill="white" textAnchor="middle">CT</text>
        <text x="36" y="26" fontFamily="Arial" fontWeight="700" fontSize="13" fill="#1A1916">Canadian Tire</text>
      </svg>
    ),
  },
  {
    name: "BMR",
    svg: (
      <svg viewBox="0 0 140 40">
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
      <svg viewBox="0 0 140 40">
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
      <svg viewBox="0 0 140 40">
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
      <svg viewBox="0 0 140 40">
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
      <svg viewBox="0 0 140 40">
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
    <div className="bg-[#F7F7F7] border-t border-b border-[#DDDDDD] py-20 px-10">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-[52px]">
          <div className="text-[0.7rem] font-bold text-[#4A5568] uppercase tracking-[0.1em] mb-[10px]">
            Fournisseurs partenaires
          </div>
          <div className="text-[clamp(1.4rem,2.5vw,2rem)] font-extrabold tracking-[-0.03em] text-[#18170F] mb-3">
            Les grandes enseignes font confiance à Chantier.io
          </div>
          <p className="text-[0.9rem] text-[#6B6860] max-w-[46ch] mx-auto leading-[1.65]">
            Accédez aux meilleurs fournisseurs de matériaux et d&apos;équipements directement depuis la plateforme.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="bg-white border border-[#DDDDDD] rounded-[14px] px-6 py-7 flex items-center justify-center hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:border-[#BBBBBB] transition-all cursor-pointer"
            >
              <div className="w-full max-w-[130px] h-10">{p.svg}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="#"
            className="inline-block text-sm font-bold text-[#18170F] px-6 py-3 rounded-[10px] border border-[#DDDDDD] bg-white hover:border-[#18170F] hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-all"
          >
            Devenir fournisseur partenaire →
          </a>
        </div>
      </div>
    </div>
  );
}
