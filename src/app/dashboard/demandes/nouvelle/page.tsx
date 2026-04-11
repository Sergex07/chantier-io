import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import NouvelleDemandeForm from "@/components/dashboard/NouvelleDemandeForm";

export default async function NouvelleDemandePage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  const { data: specialites } = await supabase
    .from("specialites")
    .select("id, nom")
    .order("nom");

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-black">Publier une demande</h1>
        <p className="text-sm text-gray-400 mt-1">
          Décrivez votre projet pour recevoir des soumissions.
        </p>
      </div>
      <div className="bg-white border border-gray-200 p-8">
        <NouvelleDemandeForm specialites={specialites ?? []} />
      </div>
    </div>
  );
}
