const TESTIMONIALS = [
  {
    text: "« En deux heures après avoir publié mon appel, j'avais déjà 4 soumissions d'électriciens vérifiés. Avant, ça me prenait une semaine de téléphone. Chantier.io a changé ma façon de gérer mes sous-traitants. »",
    initiales: "ML",
    name: "Martin Lalonde",
    role: "Entrepreneur général · Laval",
  },
  {
    text: "« Mon carnet de commandes est plein depuis que j'ai mis mon profil à jour. Je reçois des contrats que je n'aurais jamais trouvés par le bouche-à-oreille. La vérification RBQ intégrée rassure les entrepreneurs. »",
    initiales: "JP",
    name: "Jean-Philippe Ouellet",
    role: "Plombier certifié · Rive-Nord",
  },
  {
    text: "« On gère des dizaines de chantiers simultanément. Chantier.io nous permet de trouver les bons sous-traitants rapidement, avec la certitude que leurs licences sont à jour. Indispensable. »",
    initiales: "SB",
    name: "Sophie Beauchamp",
    role: "Directrice de projet · Montréal",
  },
];

export default function TestimonialsSection() {
  return (
    <div className="py-0 px-10 max-w-[1400px] mx-auto pb-16">
      <div className="flex items-end justify-between mb-8">
        <div className="text-[1.5rem] font-bold text-[#18170F] tracking-[-0.03em]">
          Ce qu&apos;ils en disent
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.name}
            className="bg-white border border-[#DDDDDD] rounded-[20px] p-7"
          >
            <div className="text-[#4A5568] text-sm mb-[14px]">★★★★★</div>
            <p className="text-sm text-[#18170F] leading-[1.72] mb-5">{t.text}</p>
            <div className="flex items-center gap-3 pt-[18px] border-t border-[#DDDDDD]">
              <div className="w-10 h-10 rounded-full bg-[#F7F7F7] border border-[#DDDDDD] flex items-center justify-center text-[0.75rem] font-bold text-[#6B6860] shrink-0">
                {t.initiales}
              </div>
              <div>
                <div className="text-[0.85rem] font-semibold text-[#18170F]">{t.name}</div>
                <div className="text-[0.75rem] text-[#6B6860]">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
