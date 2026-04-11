import Image from "next/image";
import Link from "next/link";

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

const StarIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 11, height: 11, fill: "#18170F" }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function SousTraitantsSection() {
  return (
    <div style={{ padding: "64px 40px", background: "#ffffff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#18170F", letterSpacing: "-0.03em" }}>
            Sous-traitants en vedette
          </div>
          <Link href="/professionnels" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#18170F", textDecoration: "underline", textUnderlineOffset: 3 }}>
            Voir tous les profils →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {SOUS_TRAITANTS.map((p) => (
            <div key={p.name} style={{ cursor: "pointer" }}>
              {/* Image container */}
              <div style={{ position: "relative", height: 224, width: "100%", borderRadius: 16, overflow: "hidden", background: "#eee" }}>
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  style={{ objectFit: "cover" }}
                  unoptimized
                />
                <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.6)", color: "white", fontSize: "0.7rem", fontWeight: 700, padding: "3px 10px", borderRadius: 999 }}>
                  {p.badge}
                </div>
                <div style={{ position: "absolute", top: 12, right: 12, background: "white", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.875rem", boxShadow: "0 1px 6px rgba(0,0,0,0.15)" }}>
                  ✓
                </div>
              </div>

              {/* Info */}
              <div style={{ paddingTop: 12, paddingLeft: 4, paddingRight: 4 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
                  <div style={{ fontSize: "0.9rem", fontWeight: 600, color: "#18170F", letterSpacing: "-0.01em" }}>{p.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.82rem", fontWeight: 600, color: "#18170F", whiteSpace: "nowrap" }}>
                    <StarIcon /> {p.rating}
                  </div>
                </div>
                <div style={{ fontSize: "0.82rem", color: "#6B6860", marginTop: 3 }}>{p.meta}</div>
                <div style={{ fontSize: "0.875rem", color: "#18170F", marginTop: 6, fontWeight: 600 }}>{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
