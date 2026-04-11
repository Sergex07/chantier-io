"use client";

import { useState, useEffect, useRef, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { sendMessage } from "@/app/actions/messages";
import { toast } from "sonner";
import Image from "next/image";

interface Message {
  id: string;
  sender_id: string;
  contenu: string;
  created_at: string;
  lu: boolean;
}

interface Contact {
  id: string;
  name: string | null;
  avatar_url: string | null;
  initiales: string;
}

interface Props {
  conversationId: string;
  currentUserId: string;
  contact: Contact;
  initialMessages: Message[];
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("fr-CA", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateSeparator(iso: string) {
  return new Date(iso).toLocaleDateString("fr-CA", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

function isSameDay(a: string, b: string) {
  return (
    new Date(a).toDateString() === new Date(b).toDateString()
  );
}

export default function MessageThread({
  conversationId,
  currentUserId,
  contact,
  initialMessages,
}: Props) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [isPending, startTransition] = useTransition();
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Realtime subscription
  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => {
            // Avoid duplicates (optimistic insert)
            if (prev.some((m) => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const contenu = input.trim();
    if (!contenu) return;

    // Optimistic insert
    const optimistic: Message = {
      id: `optimistic-${Date.now()}`,
      sender_id: currentUserId,
      contenu,
      created_at: new Date().toISOString(),
      lu: false,
    };
    setMessages((prev) => [...prev, optimistic]);
    setInput("");

    startTransition(async () => {
      const { error } = await sendMessage(conversationId, contact.id, contenu);
      if (error) {
        toast.error(error);
        // Rollback
        setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
        setInput(contenu);
      }
    });

    inputRef.current?.focus();
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-200 bg-white shrink-0">
        <Avatar contact={contact} size={9} />
        <div>
          <p className="text-sm font-semibold text-black">
            {contact.name ?? "Utilisateur"}
          </p>
          <p className="text-xs text-gray-400">En ligne</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-1 bg-gray-50">
        {messages.length === 0 && (
          <p className="text-center text-xs text-gray-400 mt-8">
            Commencez la conversation.
          </p>
        )}
        {messages.map((msg, i) => {
          const isMine = msg.sender_id === currentUserId;
          const prev = messages[i - 1];
          const showDate = !prev || !isSameDay(prev.created_at, msg.created_at);

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-xs text-gray-400 capitalize">
                    {formatDateSeparator(msg.created_at)}
                  </span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>
              )}
              <div
                className={`flex items-end gap-2 ${isMine ? "flex-row-reverse" : "flex-row"}`}
              >
                {!isMine && (
                  <div className="shrink-0 mb-1">
                    <Avatar contact={contact} size={6} />
                  </div>
                )}
                <div
                  className={`max-w-[70%] group ${isMine ? "items-end" : "items-start"} flex flex-col`}
                >
                  <div
                    className={`px-4 py-2.5 text-sm leading-relaxed break-words ${
                      isMine
                        ? "bg-[#4A5568] text-white"
                        : "bg-white text-black border border-gray-200"
                    }`}
                  >
                    {msg.contenu}
                  </div>
                  <span className="text-[10px] text-gray-400 mt-1 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatTime(msg.created_at)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex items-center gap-3 px-6 py-4 border-t border-gray-200 bg-white shrink-0"
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Écrivez un message…"
          disabled={isPending}
          className="flex-1 border border-gray-200 px-4 py-2.5 text-sm text-black placeholder-gray-400 outline-none focus:border-black transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isPending || !input.trim()}
          className="bg-[#4A5568] text-white px-5 py-2.5 text-sm font-medium hover:bg-[#3d4a5c] transition-colors disabled:opacity-40 shrink-0"
        >
          Envoyer
        </button>
      </form>
    </div>
  );
}

// ─── Avatar helper ────────────────────────────────────────────────────────────

function Avatar({ contact, size }: { contact: Contact; size: number }) {
  const cls = `w-${size} h-${size} rounded-full bg-[#4A5568] flex items-center justify-center text-white font-semibold shrink-0 overflow-hidden`;
  const textSize = size <= 7 ? "text-xs" : "text-sm";

  return (
    <div className={cls}>
      {contact.avatar_url ? (
        <Image
          src={contact.avatar_url}
          alt={contact.name ?? ""}
          width={size * 4}
          height={size * 4}
          className="object-cover w-full h-full"
          unoptimized
        />
      ) : (
        <span className={textSize}>{contact.initiales}</span>
      )}
    </div>
  );
}
