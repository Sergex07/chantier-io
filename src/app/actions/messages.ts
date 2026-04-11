"use server";

import { createClient } from "@/lib/supabase/server";

// ─── sendMessage ──────────────────────────────────────────────────────────────

export async function sendMessage(
  conversationId: string,
  receiverId: string,
  contenu: string
): Promise<{ error?: string }> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié." };

  const trimmed = contenu.trim();
  if (!trimmed) return { error: "Message vide." };

  const { error } = await supabase.from("messages").insert({
    conversation_id: conversationId,
    sender_id: user.id,
    receiver_id: receiverId,
    contenu: trimmed,
    lu: false,
  });

  if (error) return { error: error.message };
  return {};
}

// ─── markAsRead ───────────────────────────────────────────────────────────────

export async function markAsRead(conversationId: string): Promise<void> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return;

  await supabase
    .from("messages")
    .update({ lu: true })
    .eq("conversation_id", conversationId)
    .eq("receiver_id", user.id)
    .eq("lu", false);
}

// ─── getConversations ─────────────────────────────────────────────────────────

export type ConversationSummary = {
  conversationId: string;
  contactId: string;
  contactName: string | null;
  contactAvatar: string | null;
  contactInitiales: string;
  dernierMessage: string;
  derniereDate: string;
  nonLus: number;
};

export async function getConversations(): Promise<ConversationSummary[]> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  // All messages involving the user
  const { data: messages } = await supabase
    .from("messages")
    .select("id, conversation_id, sender_id, receiver_id, contenu, lu, created_at")
    .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
    .order("created_at", { ascending: false });

  if (!messages || messages.length === 0) return [];

  // Group by conversation_id — keep latest message per conversation
  const convMap = new Map<
    string,
    { message: typeof messages[0]; nonLus: number }
  >();

  for (const msg of messages) {
    if (!convMap.has(msg.conversation_id)) {
      convMap.set(msg.conversation_id, { message: msg, nonLus: 0 });
    }
    if (msg.receiver_id === user.id && !msg.lu) {
      convMap.get(msg.conversation_id)!.nonLus++;
    }
  }

  // Collect contact IDs
  const contactIds = Array.from(convMap.values()).map(({ message }) =>
    message.sender_id === user.id ? message.receiver_id : message.sender_id
  );

  const uniqueContactIds = [...new Set(contactIds)];

  // Fetch profiles
  const { data: profiles } = await supabase
    .from("profiles")
    .select("id, full_name, avatar_url")
    .in("id", uniqueContactIds);

  const profileMap = new Map(
    (profiles ?? []).map((p) => [p.id, p])
  );

  const result: ConversationSummary[] = [];

  for (const [conversationId, { message, nonLus }] of convMap) {
    const contactId =
      message.sender_id === user.id ? message.receiver_id : message.sender_id;
    const profile = profileMap.get(contactId);
    const name = profile?.full_name ?? null;
    const initiales = name
      ? name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()
      : "?";

    result.push({
      conversationId,
      contactId,
      contactName: name,
      contactAvatar: profile?.avatar_url ?? null,
      contactInitiales: initiales,
      dernierMessage: message.contenu,
      derniereDate: message.created_at,
      nonLus,
    });
  }

  // Sort by most recent
  result.sort(
    (a, b) =>
      new Date(b.derniereDate).getTime() - new Date(a.derniereDate).getTime()
  );

  return result;
}
