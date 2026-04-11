import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/dashboard/Sidebar";
import type { Role } from "@/lib/types";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/connexion?next=/dashboard");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, avatar_url")
    .eq("id", user.id)
    .single();

  const role = (profile?.role ?? "professionnel") as Role;
  const fullName = profile?.full_name ?? null;
  const initiales = fullName
    ? fullName
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : (user.email?.[0] ?? "?").toUpperCase();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar role={role} fullName={fullName} avatarInitials={initiales} />

      {/* Contenu principal */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-30">
          <div />
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-medium text-black leading-tight">
                {fullName ?? user.email}
              </p>
              <p className="text-xs text-gray-400 capitalize">{role}</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#4A5568] flex items-center justify-center text-white text-xs font-semibold">
              {initiales}
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
