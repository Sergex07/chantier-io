import Link from "next/link";

const HouseIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] fill-white">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
  </svg>
);

export default function FooterSection() {
  return (
    <footer className="border-t border-[#DDDDDD] px-10 pt-12 pb-8 max-w-[1280px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 bg-[#4A5568] rounded-[7px] flex items-center justify-center">
              <HouseIcon />
            </div>
            <span className="font-extrabold text-[1.05rem] text-[#18170F] tracking-[-0.03em]">
              Chantier.io
            </span>
          </div>
          <p className="text-[0.82rem] text-[#6B6860] leading-[1.65] max-w-[28ch]">
            La place de marché B2B de la construction québécoise. Trouvez les meilleurs sous-traitants, obtenez vos soumissions, gérez vos projets.
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-[0.8rem] font-bold text-[#18170F] uppercase tracking-[0.08em] mb-4">
            Plateforme
          </h4>
          <ul className="flex flex-col gap-[10px]">
            {["Trouver un sous-traitant", "Publier une demande", "Répertoire", "Tarifs"].map((l) => (
              <li key={l}>
                <Link href="#" className="text-[0.85rem] text-[#6B6860] hover:text-[#18170F] transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-[0.8rem] font-bold text-[#18170F] uppercase tracking-[0.08em] mb-4">
            Spécialités
          </h4>
          <ul className="flex flex-col gap-[10px]">
            {["Électricité", "Plomberie", "Charpenterie", "HVAC"].map((l) => (
              <li key={l}>
                <Link href="#" className="text-[0.85rem] text-[#6B6860] hover:text-[#18170F] transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="text-[0.8rem] font-bold text-[#18170F] uppercase tracking-[0.08em] mb-4">
            Entreprise
          </h4>
          <ul className="flex flex-col gap-[10px]">
            {["À propos", "Blogue", "Contact", "Confidentialité"].map((l) => (
              <li key={l}>
                <Link href="#" className="text-[0.85rem] text-[#6B6860] hover:text-[#18170F] transition-colors">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 border-t border-[#DDDDDD]">
        <div className="text-[0.78rem] text-[#B0B0B0]">© 2025 Chantier.io — Québec, Canada</div>
        <div className="flex gap-3">
          {["in", "f", "X"].map((s) => (
            <a
              key={s}
              href="#"
              className="w-[34px] h-[34px] border border-[#DDDDDD] rounded-full flex items-center justify-center text-[0.75rem] font-bold text-[#6B6860] hover:border-[#18170F] hover:text-[#18170F] transition-all"
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
