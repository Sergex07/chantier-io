import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getConversations } from "@/app/actions/messages";

function formatDate(iso: string) {
  const date = new Date(iso);
  const now = new Date();
  const diffDays = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays === 0)
    return date.toLocaleTimeString("fr-CA", { hour: "2-digit", minute: "2-digit" });
  if (diffDays === 1) return "Hier";
  if (diffDays < 7)
    return date.toLocaleDateString("fr-CA", { weekday: "short" });
  return date.toLocaleDateString("fr-CA", { day: "numeric", month: "short" });
}

export default async function MessagesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  const conversations = await getConversations();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-black">Messages</h1>
        <p className="text-sm text-gray-400 mt-1">
          {conversations.length} conversation{conversations.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="bg-white border border-gray-200 divide-y divide-gray-100">
        {conversations.length === 0 ? (
          <div className="px-6 py-14 text-center">
            <p className="text-sm text-gray-400">Aucune conversation pour l&apos;instant.</p>
            <p className="text-xs text-gray-300 mt-1">
              Les messages apparaîtront ici lorsqu&apos;une entreprise vous contactera.
            </p>
          </div>
        ) : (
          conversations.map((conv) => (
            <Link
              key={conv.conversationId}
              href={`/dashboard/messages/${conv.conversationId}`}
              className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors group"
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-[#4A5568] flex items-center justify-center text-white text-sm font-semibold shrink-0 overflow-hidden">
                {conv.contactAvatar ? (
                  <Image
                    src={conv.contactAvatar}
                    alt={conv.contactName ?? ""}
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                    unoptimized
                  />
                ) : (
                  <span>{conv.contactInitiales}</span>
                )}
              </div>

              {/* Contenu */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <p className={`text-sm truncate ${conv.nonLus > 0 ? "font-semibold text-black" : "font-medium text-black"}`}>
                    {conv.contactName ?? "Utilisateur"}
                  </p>
                  <span className="text-xs text-gray-400 shrink-0 ml-2">
                    {formatDate(conv.derniereDate)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className={`text-xs truncate ${conv.nonLus > 0 ? "text-black" : "text-gray-400"}`}>
                    {conv.dernierMessage}
                  </p>
                  {conv.nonLus > 0 && (
                    <span className="shrink-0 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {conv.nonLus > 9 ? "9+" : conv.nonLus}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
