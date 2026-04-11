import Image from "next/image";
import Link from "next/link";

export default function ProfilesSplitSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1280px] mx-auto px-10 py-16">
      <div className="relative rounded-3xl overflow-hidden min-h-[480px] flex flex-col justify-end p-10">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&q=80&auto=format&fit=crop"
          alt="Entrepreneur général"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="relative z-10">
          <span className="inline-block bg-[#4A5568] text-white text-[0.7rem] font-bold px-3 py-1 rounded-full mb-[14px] uppercase tracking-[0.04em]">
            Entrepreneur général
          </span>
          <h3 className="text-[1.6rem] font-extrabold text-white tracking-[-0.03em] mb-[10px] leading-[1.15]">
            Trouvez vos sous-traitants en quelques heures
          </h3>
          <p className="text-sm text-white/80 leading-[1.6] mb-5 max-w-[36ch]">
            Publiez votre appel, comparez les soumissions de professionnels vérifiés, engagez en toute confiance.
          </p>
          <Link
            href="/inscription"
            className="inline-block bg-white text-[#18170F] text-sm font-bold px-[22px] py-3 rounded-xl hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-shadow"
          >
            Publier une demande gratuitement
          </Link>
        </div>
      </div>

      <div className="relative rounded-3xl overflow-hidden min-h-[480px] flex flex-col justify-end p-10">
        <Image
          src="https://images.unsplash.com/photo-1581244277943-fe4a9c777540?w=900&q=80&auto=format&fit=crop"
          alt="Sous-traitant"
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
        <div className="relative z-10">
          <span className="inline-block bg-[#4A5568] text-white text-[0.7rem] font-bold px-3 py-1 rounded-full mb-[14px] uppercase tracking-[0.04em]">
            Sous-traitant
          </span>
          <h3 className="text-[1.6rem] font-extrabold text-white tracking-[-0.03em] mb-[10px] leading-[1.15]">
            Remplissez votre carnet de commandes
          </h3>
          <p className="text-sm text-white/80 leading-[1.6] mb-5 max-w-[36ch]">
            Créez votre profil, recevez des alertes pour les projets qui vous correspondent, soumissionnez directement.
          </p>
          <Link
            href="/inscription"
            className="inline-block bg-white text-[#18170F] text-sm font-bold px-[22px] py-3 rounded-xl hover:shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-shadow"
          >
            Créer mon profil gratuitement
          </Link>
        </div>
      </div>
    </div>
  );
}
