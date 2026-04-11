const ITEMS = [
  { icon: "✅", text: "Profils vérifiés RBQ & CCQ", sub: "Chaque sous-traitant est validé" },
  { icon: "⚡", text: "Première soumission en 14h", sub: "Délai moyen observé sur la plateforme" },
  { icon: "🛡️", text: "Assurances validées", sub: "Responsabilité civile confirmée" },
  { icon: "🇨🇦", text: "100% québécois", sub: "Plateforme locale, données au Canada" },
];

export default function TrustBand() {
  return (
    <div className="bg-white border-t border-b border-[#DDDDDD] py-8 px-10">
      <div className="max-w-5xl mx-auto flex items-center justify-around gap-8 flex-wrap">
        {ITEMS.map((item) => (
          <div key={item.text} className="flex items-center gap-3">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <div className="text-sm font-semibold text-[#18170F]">{item.text}</div>
              <div className="text-[0.78rem] text-[#6B6860]">{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
