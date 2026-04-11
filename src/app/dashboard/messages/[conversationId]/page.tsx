import { redirect, notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { markAsRead } from "@/app/actions/messages";
import MessageThread from "@/components/dashboard/MessageThread";

interface Props {
  params: Promise<{ conversationId: string }>;
}

export default async function ConversationPage({ params }: Props) {
  const { conversationId } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/connexion");

  // Validate user belongs to this conversation
  // conversation_id = sorted(uid1, uid2).join("_")
  const parts = conversationId.split("_");
  if (!parts.includes(user.id)) notFound();

  const contactId = parts.find((p) => p !== user.id) ?? parts[0];

  // Fetch messages + contact profile in parallel
  const [messagesResult, profileResult] = await Promise.all([
    supabase
      .from("messages")
      .select("id, sender_id, contenu, created_at, lu")
      .eq("conversation_id", conversationId)
      .order("created_at", { ascending: true }),
    supabase
      .from("profiles")
      .select("id, full_name, avatar_url")
      .eq("id", contactId)
      .single(),
  ]);

  // Mark received messages as read
  await markAsRead(conversationId);

  const messages = messagesResult.data ?? [];
  const profile = profileResult.data;

  const contactName = profile?.full_name ?? null;
  const contactInitiales = contactName
    ? contactName.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
    : "?";

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)]">
      <MessageThread
        conversationId={conversationId}
        currentUserId={user.id}
        contact={{
          id: contactId,
          name: contactName,
          avatar_url: profile?.avatar_url ?? null,
          initiales: contactInitiales,
        }}
        initialMessages={messages}
      />
    </div>
  );
}
