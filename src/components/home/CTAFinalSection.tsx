import Link from "next/link";

export default function CTAFinalSection() {
  return (
    <div className="bg-[#18170F] rounded-[28px] mx-10 mb-20 px-[60px] py-20 text-center relative overflow-hidden">
      {/* Radial glow */}
      <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,rgba(74,85,104,0.25)_0%,transparent_65%)]" />

      <h2 className="relative z-10 text-[clamp(2rem,3.5vw,2.8rem)] font-extrabold text-white tracking-[-0.04em] mb-[14px] leading-[1.1]">
        Prêt à transformer vos chantiers ?
      </h2>
      <p className="relative z-10 text-base text-white/55 max-w-[44ch] mx-auto mb-8 leading-[1.65]">
        Rejoignez les entrepreneurs et sous-traitants québécois qui font confiance à Chantier.io pour chaque projet.
      </p>
      <div className="relative z-10 flex items-center justify-center gap-3 flex-wrap">
        <Link
          href="/inscription"
          className="bg-[#4A5568] text-white text-[0.95rem] font-bold px-7 py-[14px] rounded-xl hover:bg-[#364152] hover:-translate-y-0.5 transition-all"
        >
          Commencer gratuitement →
        </Link>
        <a
          href="#"
          className="text-white/55 text-[0.95rem] font-medium px-5 py-[14px] rounded-xl hover:text-white transition-colors"
        >
          Voir une démo ↗
        </a>
      </div>
    </div>
  );
}
