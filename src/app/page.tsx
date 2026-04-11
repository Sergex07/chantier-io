import Link from "next/link";
import Image from "next/image";
import DemandesTable from "@/components/DemandesTable";

// ─── Mockup data ─────────────────────────────────────────────────────────────

const SOUS_TRAITANTS = [
  {
    id: 1,
    nom: "Construction Tremblay",
    specialite: "Charpenterie",
    region: "Montréal",
    note: 4.8,
    avis: 32,
    verified: true,
    avatar: "CT",
  },
  {
    id: 2,
    nom: "Électro-Pro Gagnon",
    specialite: "Électricité",
    region: "Québec",
    note: 4.6,
    avis: 19,
    verified: true,
    avatar: "EG",
  },
  {
    id: 3,
    nom: "Plomberie Bergeron",
    specialite: "Plomberie",
    region: "Laval",
    note: 4.9,
    avis: 47,
    verified: false,
    avatar: "PB",
  },
];

const DETAILLANTS = [
  {
    id: 1,
    nom: "Matériaux Lapointe",
    description: "Bois, quincaillerie, matériaux de construction",
    escompte: 12,
    region: "Montréal",
    initiales: "ML",
  },
  {
    id: 2,
    nom: "Toitures Beaumont",
    description: "Bardeaux, membranes, isolants",
    escompte: 8,
    region: "Québec",
    initiales: "TB",
  },
  {
    id: 3,
    nom: "Électro Depot Plus",
    description: "Fils, panneaux, disjoncteurs, outils",
    escompte: 15,
    region: "Rive-Sud",
    initiales: "ED",
  },
];

const PROFESSIONNELS = [
  {
    id: 1,
    nom: "Marie-Ève Côté",
    titre: "Architecte",
    region: "Montréal",
    projets: 24,
    avatar: "MC",
  },
  {
    id: 2,
    nom: "Jean-François Roy",
    titre: "Ingénieur civil",
    region: "Québec",
    projets: 18,
    avatar: "JR",
  },
  {
    id: 3,
    nom: "Stéphanie Lemieux",
    titre: "Designer d'intérieur",
    region: "Laval",
    projets: 31,
    avatar: "SL",
  },
];

const PARTENAIRES = ["RBQ", "CCQ", "ACQ", "APCHQ", "CNESST", "Réno-Assistance"];

const CTA_ITEMS = [
  {
    href: "/demandes/nouvelle",
    label: "Publier une demande",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/professionnels",
    label: "Trouver un professionnel",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/demandes",
    label: "Trouver un contrat",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M9 12h6M9 16h6M7 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2h-2" strokeLinecap="round" />
        <rect x="9" y="2" width="6" height="4" rx="1" />
      </svg>
    ),
  },
  {
    href: "/emplois",
    label: "Trouver un emploi",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" strokeLinecap="round" />
      </svg>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center text-white">
        <Image
          src="https://images.unsplash.com/photo-1590579491624-f98f36d4c763?w=2000&q=90"
          alt="Chantier de construction"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gray-300 mb-4">
            La plateforme québécoise du bâtiment
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Trouvez les bons partenaires pour vos chantiers
          </h1>
          <p className="text-base md:text-lg text-gray-300 mb-10 max-w-xl mx-auto">
            Connectez entrepreneurs, professionnels et détaillants sur une seule plateforme.
          </p>

          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            {CTA_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex flex-col items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 backdrop-blur-sm px-4 py-4 transition-all"
              >
                <span className="text-white">{item.icon}</span>
                <span className="text-xs font-medium text-white leading-tight text-center">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Sous-traitants en vedette ── */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <SectionHeader
          label="Sous-traitants"
          titre="Sous-traitants en vedette"
          lien={{ href: "/professionnels", texte: "Voir tous" }}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SOUS_TRAITANTS.map((p) => (
            <div
              key={p.id}
              className="border border-gray-200 p-5 hover:border-[#4A5568] transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[#4A5568] flex items-center justify-center text-white text-sm font-semibold shrink-0">
                  {p.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-black text-sm">{p.nom}</p>
                    {p.verified && (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#4A5568">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{p.specialite}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{p.region}</span>
                <span className="flex items-center gap-1">
                  <span className="text-yellow-500">★</span>
                  <span className="font-medium text-black">{p.note}</span>
                  <span>({p.avis} avis)</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Demandes en cours ── */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="Appels d'offres"
            titre="Demandes de soumissions en cours"
            lien={{ href: "/demandes", texte: "Voir toutes" }}
          />
          <DemandesTable />
        </div>
      </section>

      {/* ── Détaillants en vedette ── */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <SectionHeader
          label="Détaillants"
          titre="Détaillants en vedette"
          lien={{ href: "/detaillants", texte: "Voir tous" }}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {DETAILLANTS.map((d) => (
            <div
              key={d.id}
              className="border border-gray-200 p-5 hover:border-[#4A5568] transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-sm font-bold text-[#4A5568] shrink-0">
                  {d.initiales}
                </div>
                <div>
                  <p className="font-semibold text-black text-sm">{d.nom}</p>
                  <p className="text-xs text-gray-500">{d.region}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                {d.description}
              </p>
              <span className="inline-block text-xs font-semibold text-[#4A5568] bg-[#4A5568]/10 px-2 py-1">
                {d.escompte}% d&apos;escompte membre
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Professionnels en vedette ── */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            label="Professionnels"
            titre="Professionnels en vedette"
            lien={{ href: "/professionnels", texte: "Voir tous" }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PROFESSIONNELS.map((p) => (
              <div
                key={p.id}
                className="bg-white border border-gray-200 p-5 hover:border-[#4A5568] transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white text-sm font-semibold shrink-0">
                    {p.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-black text-sm">{p.nom}</p>
                    <p className="text-xs text-gray-500">{p.titre}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{p.region}</span>
                  <span>{p.projets} projets</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Partenaires ── */}
      <section className="py-14 px-6 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase text-gray-400 mb-8">
            Partenaires & organismes reconnus
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {PARTENAIRES.map((p) => (
              <span
                key={p}
                className="text-sm font-bold tracking-widest text-gray-300 hover:text-[#4A5568] transition-colors cursor-pointer"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ─── SectionHeader ────────────────────────────────────────────────────────────

function SectionHeader({
  label,
  titre,
  lien,
}: {
  label: string;
  titre: string;
  lien: { href: string; texte: string };
}) {
  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#4A5568] mb-1">
          {label}
        </p>
        <h2 className="text-xl md:text-2xl font-semibold text-black">{titre}</h2>
      </div>
      <Link
        href={lien.href}
        className="text-xs font-medium text-gray-500 hover:text-black transition-colors underline underline-offset-2 shrink-0 ml-4"
      >
        {lien.texte} →
      </Link>
    </div>
  );
}
