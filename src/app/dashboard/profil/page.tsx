import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import ProfileForm from "@/components/dashboard/ProfileForm";

export default async function ProfilPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  const [profileResult, specialitesResult, selResult] = await Promise.all([
    supabase
      .from("profiles")
      .select("full_name, avatar_url, phone, region, ville, description, website, rbq_numero, ccq_numero")
      .eq("id", user.id)
      .single(),
    supabase
      .from("specialites")
      .select("id, nom, slug")
      .order("nom"),
    supabase
      .from("professionnel_specialites")
      .select("specialite_id")
      .eq("pro_id", user.id),
  ]);

  const profile = profileResult.data ?? {};
  const specialites = specialitesResult.data ?? [];
  const selectedSpecialites = (selResult.data ?? []).map((r) => r.specialite_id as string);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-black">Mon profil</h1>
        <p className="text-sm text-gray-400 mt-1">
          Ces informations sont visibles sur votre profil public.
        </p>
      </div>

      <div className="bg-white border border-gray-200 p-8">
        <ProfileForm
          profile={profile}
          specialites={specialites}
          selectedSpecialites={selectedSpecialites}
        />
      </div>
    </div>
  );
}
