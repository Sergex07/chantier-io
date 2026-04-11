import Image from "next/image";
import Link from "next/link";

const CTA_ITEMS = [
  {
    href: "/dashboard/demandes/nouvelle",
    icon: "📋",
    title: "Publier une demande de soumission",
    desc: "Trouvez des sous-traitants qualifiés en quelques heures",
  },
  {
    href: "/professionnels",
    icon: "🔍",
    title: "Trouver un professionnel",
    desc: "Sous-traitants, designers, architectes, détaillants",
  },
  {
    href: "/demandes",
    icon: "💼",
    title: "Trouver un contrat",
    desc: "Parcourez les demandes ouvertes dans votre spécialité",
  },
  {
    href: "/emplois",
    icon: "👔",
    title: "Trouver un emploi",
    desc: "Postes disponibles dans la construction au Québec",
  },
];

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1590579491624-f98f36d4c763?w=2000&q=90&auto=format&fit=crop&crop=center"
          alt="Chantier construction Québec"
          fill
          className="object-cover object-center"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-5 max-w-3xl mx-auto">
        <h1 className="text-[clamp(2.6rem,5vw,4.2rem)] font-extrabold text-white leading-[1.1] tracking-[-0.03em] mb-[18px] [text-shadow:0_2px_20px_rgba(0,0,0,0.3)]">
          Trouvez les bons partenaires pour vos chantiers
        </h1>
        <p className="text-[1.15rem] text-white/88 mb-9 font-normal [text-shadow:0_1px_8px_rgba(0,0,0,0.3)]">
          Sous-traitants, designers, architectes, détaillants — tous vos partenaires au Québec
        </p>

        {/* CTA Grid */}
        <div className="grid grid-cols-2 bg-white rounded-[18px] shadow-[0_4px_30px_rgba(0,0,0,0.22)] overflow-hidden max-w-[680px] mx-auto">
          {CTA_ITEMS.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-[14px] px-[22px] py-5 hover:bg-[#f7f7f7] transition-colors text-left
                ${i % 2 === 0 ? "border-r border-[#eee]" : ""}
                ${i < 2 ? "border-b border-[#eee]" : ""}
              `}
            >
              <div className="w-11 h-11 bg-[#4A5568] rounded-xl flex items-center justify-center text-xl shrink-0">
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[0.9rem] font-bold text-[#18170F] tracking-[-0.02em] mb-[3px] leading-tight">
                  {item.title}
                </div>
                <div className="text-[0.75rem] text-[#6B6860] leading-snug">{item.desc}</div>
              </div>
              <div className="text-[1.4rem] text-[#B0B0B0] shrink-0 leading-none">›</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
