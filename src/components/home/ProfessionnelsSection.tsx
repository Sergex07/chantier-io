import Image from "next/image";
import Link from "next/link";

const StarIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: 11, height: 11, fill: "#18170F" }}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const PROFESSIONNELS = [
  {
    img: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=600&q=80&auto=format&fit=crop",
    badge: "Architecture",
    name: "Atelier Moreau Architectes",
    rating: "4.96",
    meta: "Montréal · 83 projets complétés",
    cat: "Résidentiel & commercial",
  },
  {
    img: "https://images.unsplash.com/photo-1616587226960-4a03badbe8bf?w=600&q=80&auto=format&fit=crop",
    badge: "Design intérieur",
    name: "Studio Leblanc Design",
    rating: "4.94",
    meta: "Québec · 61 projets complétés",
    cat: "Résidentiel haut de gamme",
  },
  {
    img: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&q=80&auto=format&fit=crop",
    badge: "Ingénierie",
    name: "Tremblay Génie-Conseil",
    rating: "4.91",
    meta: "Laval · 127 projets complétés",
    cat: "Structure & mécanique",
  },
];

export default function ProfessionnelsSection() {
  return (
    <div style={{ padding: "0 40px 64px", background: "#ffffff" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 32 }}>
          <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "#18170F", letterSpacing: "-0.03em" }}>
            Professionnels en vedette
          </div>
          <Link href="/professionnels" style={{ fontSize: "0.875rem", fontWeight: 600, color: "#18170F", textDecoration: "underline", textUnderlineOffset: 3 }}>
            Voir tous les professionnels →
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28 }}>
          {PROFESSIONNELS.map((p) => (
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
                <div style={{ fontSize: "0.875rem", color: "#18170F", marginTop: 6 }}>{p.cat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
