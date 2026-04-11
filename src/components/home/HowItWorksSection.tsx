const STEPS = [
  {
    num: "1",
    title: "Publiez votre besoin",
    desc: "Décrivez le travail, la spécialité requise, la région et le calendrier. Notre formulaire guidé prend 2 minutes.",
  },
  {
    num: "2",
    title: "Recevez des soumissions",
    desc: "Les sous-traitants vérifiés de votre région sont alertés. Vous recevez des soumissions directement dans votre tableau de bord.",
  },
  {
    num: "3",
    title: "Engagez en confiance",
    desc: "Comparez les profils, licences et évaluations. Confirmez votre choix et démarrez la communication — tout est centralisé.",
  },
];

export default function HowItWorksSection() {
  return (
    <div className="bg-[#F7F7F7] border-t border-b border-[#DDDDDD] py-16">
      <div className="max-w-[1280px] mx-auto px-10">
        <div className="text-center max-w-[560px] mx-auto mb-10">
          <div className="text-[0.72rem] font-bold text-[#4A5568] uppercase tracking-[0.1em] mb-[10px]">
            Comment ça marche
          </div>
          <div className="text-[1.8rem] font-extrabold tracking-[-0.03em] text-[#18170F] mb-3">
            Simple comme bonjour.
          </div>
          <p className="text-[0.97rem] text-[#6B6860] leading-[1.65]">
            De la publication de votre besoin à la confirmation du sous-traitant — en quelques heures, pas des semaines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map((step) => (
            <div key={step.num} className="text-center">
              <div className="w-12 h-12 bg-[#4A5568] text-white rounded-full flex items-center justify-center text-[1.1rem] font-extrabold mx-auto mb-5">
                {step.num}
              </div>
              <div className="text-[1.05rem] font-bold text-[#18170F] mb-2 tracking-[-0.02em]">
                {step.title}
              </div>
              <p className="text-[0.875rem] text-[#6B6860] leading-[1.65]">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
