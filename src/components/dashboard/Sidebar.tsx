"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { Role } from "@/lib/types";

type NavItem = { label: string; href: string; icon: React.ReactNode };

const NAV: Record<Role, NavItem[]> = {
  professionnel: [
    {
      label: "Mon profil",
      href: "/dashboard/profil",
      icon: <IconUser />,
    },
    {
      label: "Demandes disponibles",
      href: "/dashboard/demandes",
      icon: <IconList />,
    },
    {
      label: "Mes soumissions",
      href: "/dashboard/soumissions",
      icon: <IconDoc />,
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
      icon: <IconMessage />,
    },
    {
      label: "Abonnement",
      href: "/dashboard/abonnement",
      icon: <IconCard />,
    },
  ],
  entreprise: [
    {
      label: "Mes demandes",
      href: "/dashboard/demandes",
      icon: <IconList />,
    },
    {
      label: "Publier une demande",
      href: "/dashboard/demandes/nouvelle",
      icon: <IconPlus />,
    },
    {
      label: "Soumissions reçues",
      href: "/dashboard/soumissions",
      icon: <IconDoc />,
    },
    {
      label: "Messages",
      href: "/dashboard/messages",
      icon: <IconMessage />,
    },
    {
      label: "Abonnement",
      href: "/dashboard/abonnement",
      icon: <IconCard />,
    },
  ],
  detaillant: [
    {
      label: "Mon profil détaillant",
      href: "/dashboard/profil",
      icon: <IconUser />,
    },
    {
      label: "Statistiques",
      href: "/dashboard/statistiques",
      icon: <IconChart />,
    },
    {
      label: "Abonnement",
      href: "/dashboard/abonnement",
      icon: <IconCard />,
    },
  ],
  admin: [],
};

interface Props {
  role: Role;
  fullName: string | null;
  avatarInitials: string;
}

export default function Sidebar({ role, fullName, avatarInitials }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const items = NAV[role] ?? [];

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/connexion");
  }

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-[#4A5568] flex flex-col z-40">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Link href="/" className="text-base font-bold tracking-tight text-white">
          Chantier<span className="text-white/40">.io</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <p className="px-3 mb-2 text-[10px] font-semibold tracking-widest uppercase text-white/30">
          {roleLabel(role)}
        </p>
        <ul className="space-y-0.5">
          {items.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/15 text-white"
                      : "text-white/70 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="shrink-0 opacity-80">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User + déconnexion */}
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-semibold shrink-0">
            {avatarInitials}
          </div>
          <span className="text-sm text-white/80 truncate">{fullName ?? "Mon compte"}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <IconSignOut />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}

function roleLabel(role: Role) {
  switch (role) {
    case "professionnel": return "Professionnel";
    case "entreprise":    return "Entreprise";
    case "detaillant":    return "Détaillant";
    case "admin":         return "Admin";
  }
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconUser() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>
  );
}
function IconList() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01" strokeLinecap="round" />
    </svg>
  );
}
function IconDoc() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6M10 13h4M10 17h4" strokeLinecap="round" />
    </svg>
  );
}
function IconMessage() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function IconCard() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" strokeLinecap="round" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" />
    </svg>
  );
}
function IconSignOut() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
