import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Role } from "@/lib/types";

// ─── Fetch helpers ────────────────────────────────────────────────────────────

async function fetchStatsProf(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
) {
  const [soumissions, messages, profile] = await Promise.all([
    supabase
      .from("soumissions")
      .select("id, statut, created_at", { count: "exact" })
      .eq("pro_id", userId)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("messages")
      .select("id", { count: "exact" })
      .eq("receiver_id", userId)
      .eq("lu", false),
    supabase
      .from("profiles")
      .select("region")
      .eq("id", userId)
      .single(),
  ]);

  const region = profile.data?.region;
  let demandesRegion = 0;
  if (region) {
    const { count } = await supabase
      .from("demandes")
      .select("id", { count: "exact" })
      .eq("statut", "ouvert")
      .eq("region", region);
    demandesRegion = count ?? 0;
  } else {
    const { count } = await supabase
      .from("demandes")
      .select("id", { count: "exact" })
      .eq("statut", "ouvert");
    demandesRegion = count ?? 0;
  }

  return {
    soumissionsEnvoyees: soumissions.count ?? 0,
    demandesRegion,
    regionLabel: region ?? "toutes régions",
    messagesNonLus: messages.count ?? 0,
    activiteRecente: (soumissions.data ?? []).map((s) => ({
      id: s.id,
      texte: `Soumission ${statutLabel(s.statut)}`,
      date: s.created_at,
    })),
  };
}

async function fetchStatsEntreprise(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
) {
  const [demandes, messages] = await Promise.all([
    supabase
      .from("demandes")
      .select("id, titre, statut, created_at")
      .eq("entreprise_id", userId)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("messages")
      .select("id", { count: "exact" })
      .eq("receiver_id", userId)
      .eq("lu", false),
  ]);

  const demandesData = demandes.data ?? [];
  const demandesActives = demandesData.filter((d) => d.statut === "ouvert").length;
  const demandeIds = demandesData.map((d) => d.id);

  let soumissionsCount = 0;
  if (demandeIds.length > 0) {
    const { count } = await supabase
      .from("soumissions")
      .select("id", { count: "exact" })
      .in("demande_id", demandeIds);
    soumissionsCount = count ?? 0;
  }

  return {
    demandesActives,
    soumissionsRecues: soumissionsCount,
    messagesNonLus: messages.count ?? 0,
    activiteRecente: demandesData.map((d) => ({
      id: d.id,
      texte: `Demande "${d.titre}" — ${statutLabel(d.statut)}`,
      date: d.created_at,
    })),
  };
}

async function fetchStatsDetaillant(
  supabase: Awaited<ReturnType<typeof createClient>>,
  userId: string
) {
  const { data: detaillant } = await supabase
    .from("detaillants")
    .select("id, plan")
    .eq("profile_id", userId)
    .single();

  return {
    abonnementActif: !!detaillant?.plan,
    plan: detaillant?.plan ?? null,
    activiteRecente: [] as { id: string; texte: string; date: string }[],
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function statutLabel(statut: string) {
  const map: Record<string, string> = {
    ouvert: "ouverte",
    en_cours: "en cours",
    ferme: "fermée",
    annule: "annulée",
    en_attente: "en attente",
    acceptee: "acceptée",
    refusee: "refusée",
    retiree: "retirée",
  };
  return map[statut] ?? statut;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-CA", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── StatCard ─────────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: number | string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`bg-white border p-6 ${
        accent ? "border-[#4A5568]" : "border-gray-200"
      }`}
    >
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        {label}
      </p>
      <p
        className={`text-3xl font-bold tabular-nums ${
          accent ? "text-[#4A5568]" : "text-black"
        }`}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, plan, trial_ends_at")
    .eq("id", user.id)
    .single();

  const role = (profile?.role ?? "professionnel") as Role;
  const fullName = profile?.full_name ?? null;
  const prenom = fullName?.split(" ")[0] ?? "vous";

  const trialDaysLeft =
    profile?.plan === "pro_trial" && profile?.trial_ends_at
      ? Math.max(0, Math.ceil((new Date(profile.trial_ends_at).getTime() - Date.now()) / 86_400_000))
      : null;
  const showTrialBanner = trialDaysLeft !== null && trialDaysLeft > 0;

  const subtitles: Record<Role, string> = {
    professionnel: "Tableau de bord professionnel",
    entreprise: "Tableau de bord entreprise",
    detaillant: "Espace détaillant",
    admin: "Administration",
  };

  const [statsProf, statsEntreprise, statsDetaillant] = await Promise.all([
    role === "professionnel" ? fetchStatsProf(supabase, user.id) : null,
    role === "entreprise"    ? fetchStatsEntreprise(supabase, user.id) : null,
    role === "detaillant"    ? fetchStatsDetaillant(supabase, user.id) : null,
  ]);

  const activiteRecente =
    statsProf?.activiteRecente ??
    statsEntreprise?.activiteRecente ??
    statsDetaillant?.activiteRecente ??
    [];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Pro trial banner */}
      {showTrialBanner && (
        <div style={{ marginBottom: '24px', padding: '16px 20px', background: 'linear-gradient(135deg, #18170F 0%, #4A5568 100%)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '1.2rem' }}>🎁</span>
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', marginBottom: '2px' }}>
                Votre essai Pro se termine dans {trialDaysLeft} jour{trialDaysLeft === 1 ? '' : 's'}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.6)' }}>
                Profitez de toutes les fonctionnalités Pro pendant votre période d'essai
              </div>
            </div>
          </div>
          <a href="/dashboard/abonnement" style={{ padding: '9px 18px', borderRadius: '9px', background: '#fff', color: '#18170F', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}>
            Activer mon abonnement →
          </a>
        </div>
      )}

      {/* Greeting */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-black">
          Bonjour, {prenom} 👋
        </h1>
        <p className="text-sm text-gray-400 mt-1">{subtitles[role]}</p>
      </div>

      {/* Stats — Professionnel */}
      {statsProf && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard
            label="Soumissions envoyées"
            value={statsProf.soumissionsEnvoyees}
          />
          <StatCard
            label="Demandes dans ma région"
            value={statsProf.demandesRegion}
            sub={statsProf.regionLabel}
            accent
          />
          <StatCard
            label="Messages non lus"
            value={statsProf.messagesNonLus}
            sub={statsProf.messagesNonLus > 0 ? "À lire" : "À jour"}
          />
        </div>
      )}

      {/* Stats — Entreprise */}
      {statsEntreprise && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <StatCard
            label="Demandes actives"
            value={statsEntreprise.demandesActives}
            accent
          />
          <StatCard
            label="Soumissions reçues"
            value={statsEntreprise.soumissionsRecues}
          />
          <StatCard
            label="Messages non lus"
            value={statsEntreprise.messagesNonLus}
            sub={statsEntreprise.messagesNonLus > 0 ? "À lire" : "À jour"}
          />
        </div>
      )}

      {/* Stats — Détaillant */}
      {statsDetaillant && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <StatCard
            label="Vues du profil ce mois"
            value="—"
            sub="Bientôt disponible"
          />
          <StatCard
            label="Abonnement"
            value={statsDetaillant.abonnementActif ? "Actif" : "Inactif"}
            sub={statsDetaillant.plan ? `Plan ${statsDetaillant.plan}` : "Aucun plan actif"}
            accent={statsDetaillant.abonnementActif}
          />
        </div>
      )}

      {/* Activité récente */}
      <div className="bg-white border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-black">Activité récente</h2>
        </div>

        {activiteRecente.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-sm text-gray-400">Aucune activité récente.</p>
            <p className="text-xs text-gray-300 mt-1">
              {role === "entreprise"
                ? "Publiez votre première demande pour commencer."
                : role === "professionnel"
                ? "Répondez à une demande pour démarrer."
                : "Complétez votre profil détaillant."}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {activiteRecente.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between px-6 py-4"
              >
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4A5568] shrink-0" />
                  <span className="text-sm text-black">{item.texte}</span>
                </div>
                <span className="text-xs text-gray-400 shrink-0 ml-4">
                  {formatDate(item.date)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
