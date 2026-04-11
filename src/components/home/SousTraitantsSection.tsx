import Image from "next/image";
import Link from "next/link";

const StarIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[11px] h-[11px] fill-[#18170F]">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const SOUS_TRAITANTS = [
  {
    img: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=600&q=80&auto=format&fit=crop",
    badge: "Électricité",
    name: "Voltex Électrique inc.",
    rating: "4.97",
    meta: "Laval · 148 projets complétés",
    price: "À partir de 85 $/h",
  },
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80&auto=format&fit=crop",
    badge: "Plomberie",
    name: "Aqua Pro Plomberie",
    rating: "4.91",
    meta: "Montréal · 92 projets complétés",
    price: "À partir de 75 $/h",
  },
  {
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80&auto=format&fit=crop",
    badge: "Charpenterie",
    name: "Construction Boisvert",
    rating: "4.88",
    meta: "Rive-Nord · 211 projets complétés",
    price: "À partir de 70 $/h",
  },
];

export default function SousTraitantsSection() {
  return (
    <div className="py-16 px-10 max-w-[1400px] mx-auto">
      <div className="flex items-end justify-between mb-8">
        <div className="text-[1.5rem] font-bold text-[#18170F] tracking-[-0.03em]">
          Sous-traitants en vedette
        </div>
        <Link href="/professionnels" className="text-sm font-semibold text-[#18170F] underline underline-offset-[3px]">
          Voir tous les profils →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {SOUS_TRAITANTS.map((p) => (
          <div key={p.name} className="cursor-pointer group">
            <div className="relative aspect-[3/2] rounded-2xl overflow-hidden bg-[#eee]">
              <Image
                src={p.img}
                alt={p.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                unoptimized
              />
              <div className="absolute top-3 left-3 bg-black/60 text-white text-[0.7rem] font-bold px-[10px] py-1 rounded-full tracking-[0.02em]">
                {p.badge}
              </div>
              <div className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-[0_1px_6px_rgba(0,0,0,0.15)]">
                ✓
              </div>
            </div>
            <div className="pt-3 px-1">
              <div className="flex items-start justify-between gap-2">
                <div className="text-[0.9rem] font-semibold text-[#18170F] tracking-[-0.01em]">{p.name}</div>
                <div className="flex items-center gap-1 text-[0.82rem] font-semibold text-[#18170F] whitespace-nowrap">
                  <StarIcon /> {p.rating}
                </div>
              </div>
              <div className="text-[0.82rem] text-[#6B6860] mt-[3px]">{p.meta}</div>
              <div className="text-[0.875rem] text-[#18170F] mt-[6px]">
                <strong className="font-semibold">{p.price}</strong>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
