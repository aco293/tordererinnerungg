/**
 * Chat-Datenlogik für den Luminalis KI-Dialog.
 *
 * Nutzt den anonymen Supabase-Client über die Nutzer-Session; RLS stellt
 * sicher, dass jeder nur seine eigenen Sitzungen und Nachrichten sieht.
 * Kein Service-Role-Key. Nur serverseitig verwenden.
 */

import {
  buildLuminalisContext,
  contextPackToText,
} from "@/lib/luminalis/ai/context";
import { generateLuminalisResponse } from "@/lib/luminalis/ai/provider";
import {
  createLuminalisSystemPrompt,
  type LuminalisChatMode,
} from "@/lib/luminalis/ai/systemPrompt";
import { AI_DISABLED_MESSAGE, type ProviderMessage } from "@/lib/luminalis/ai/types";
import { getLuminalisProfile } from "@/lib/luminalis/profile";
import { createClient } from "@/lib/supabase/server";

export type LuminalisChatSession = {
  id: string;
  user_id: string;
  title: string | null;
  mode: string;
  created_at: string;
  updated_at: string;
};

export type LuminalisChatMessage = {
  id: string;
  session_id: string;
  user_id: string;
  role: string;
  content: string;
  context_summary: string | null;
  created_at: string;
};

export type CreateChatSessionInput = {
  title?: string | null;
  mode?: string;
};

export type CreateChatMessageInput = {
  session_id: string;
  role: "user" | "assistant" | "system";
  content: string;
  context_summary?: string | null;
};

const ALLOWED_MODES: LuminalisChatMode[] = [
  "begleitung",
  "klarheit",
  "erinnerung",
  "integration",
  "frequenzspiegel",
];

/** Nur erlaubte Modi zulassen, sonst ruhig auf „begleitung" zurückfallen. */
function normalizeMode(mode: string | undefined | null): LuminalisChatMode {
  return ALLOWED_MODES.includes(mode as LuminalisChatMode)
    ? (mode as LuminalisChatMode)
    : "begleitung";
}

/** Wie viele frühere Nachrichten höchstens in den Prompt einfließen. */
const MAX_HISTORY = 20;

export async function getChatSessions(
  userId: string,
): Promise<LuminalisChatSession[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_chat_sessions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  return (data as LuminalisChatSession[] | null) ?? [];
}

export async function getChatSessionById(
  userId: string,
  sessionId: string,
): Promise<LuminalisChatSession | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_chat_sessions")
    .select("*")
    .eq("id", sessionId)
    .eq("user_id", userId)
    .maybeSingle();
  return (data as LuminalisChatSession | null) ?? null;
}

export async function createChatSession(
  userId: string,
  input: CreateChatSessionInput,
): Promise<{ data: LuminalisChatSession | null; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("luminalis_chat_sessions")
    .insert({
      user_id: userId,
      title: input.title?.trim() || null,
      mode: normalizeMode(input.mode),
    })
    .select()
    .maybeSingle();
  return {
    data: (data as LuminalisChatSession | null) ?? null,
    error: error?.message ?? null,
  };
}

export async function updateChatSessionTitle(
  userId: string,
  sessionId: string,
  title: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("luminalis_chat_sessions")
    .update({ title: title.trim() || null })
    .eq("id", sessionId)
    .eq("user_id", userId);
  return { error: error?.message ?? null };
}

export async function deleteChatSession(
  userId: string,
  sessionId: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("luminalis_chat_sessions")
    .delete()
    .eq("id", sessionId)
    .eq("user_id", userId);
  return { error: error?.message ?? null };
}

export async function getChatMessages(
  userId: string,
  sessionId: string,
): Promise<LuminalisChatMessage[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_chat_messages")
    .select("*")
    .eq("user_id", userId)
    .eq("session_id", sessionId)
    .order("created_at", { ascending: true });
  return (data as LuminalisChatMessage[] | null) ?? [];
}

export async function createChatMessage(
  userId: string,
  input: CreateChatMessageInput,
): Promise<{ data: LuminalisChatMessage | null; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("luminalis_chat_messages")
    .insert({
      user_id: userId,
      session_id: input.session_id,
      role: input.role,
      content: input.content,
      context_summary: input.context_summary ?? null,
    })
    .select()
    .maybeSingle();
  return {
    data: (data as LuminalisChatMessage | null) ?? null,
    error: error?.message ?? null,
  };
}

export type AssistantTurnResult =
  | { ok: true; userMessage: LuminalisChatMessage; assistantMessage: LuminalisChatMessage }
  | { ok: false; message: string };

/**
 * Vollständiger Dialog-Schritt:
 * 1. Nutzerkontext laden
 * 2. bisherige Chatnachrichten laden
 * 3. System-Prompt erstellen
 * 4. KI-Provider aufrufen
 * 5. Nutzer- und Assistant-Nachricht speichern
 * 6. Ergebnis zurückgeben
 *
 * Keine rohen Provider-Fehler im UI; bei deaktivierter KI ruhige Meldung.
 */
export async function generateAndStoreAssistantMessage(
  userId: string,
  sessionId: string,
  userMessage: string,
): Promise<AssistantTurnResult> {
  const trimmed = userMessage.trim();
  if (!trimmed) {
    return { ok: false, message: "Bitte schreibe zuerst eine Nachricht." };
  }

  const session = await getChatSessionById(userId, sessionId);
  if (!session) {
    return { ok: false, message: "Dieser Dialog wurde nicht gefunden." };
  }

  // Nutzer-Nachricht zuerst speichern, damit sie nicht verloren geht.
  const stored = await createChatMessage(userId, {
    session_id: sessionId,
    role: "user",
    content: trimmed,
  });
  if (stored.error || !stored.data) {
    return {
      ok: false,
      message:
        "Deine Nachricht konnte nicht gespeichert werden. Bitte versuche es erneut.",
    };
  }

  const [profile, pack, history] = await Promise.all([
    getLuminalisProfile(userId),
    buildLuminalisContext(userId),
    getChatMessages(userId, sessionId),
  ]);

  const systemPrompt = createLuminalisSystemPrompt({
    mode: normalizeMode(session.mode),
    contextPack: contextPackToText(pack),
    displayName: profile?.display_name ?? null,
  });

  const recent = history.slice(-MAX_HISTORY);
  const providerMessages: ProviderMessage[] = recent
    .filter((message) => message.role === "user" || message.role === "assistant")
    .map((message) => ({
      role: message.role as "user" | "assistant",
      content: message.content,
    }));

  const result = await generateLuminalisResponse({
    systemPrompt,
    messages: providerMessages,
  });

  if (!result.ok) {
    // Ruhige, freundliche Assistant-Antwort speichern statt eines Fehlers.
    const fallback = await createChatMessage(userId, {
      session_id: sessionId,
      role: "assistant",
      content: AI_DISABLED_MESSAGE,
      context_summary: pack.sourceSummary,
    });
    if (fallback.data) {
      return {
        ok: true,
        userMessage: stored.data,
        assistantMessage: fallback.data,
      };
    }
    return { ok: false, message: AI_DISABLED_MESSAGE };
  }

  const assistant = await createChatMessage(userId, {
    session_id: sessionId,
    role: "assistant",
    content: result.content,
    context_summary: pack.sourceSummary,
  });
  if (assistant.error || !assistant.data) {
    return {
      ok: false,
      message:
        "Die Antwort konnte nicht gespeichert werden. Bitte versuche es erneut.",
    };
  }

  // Sitzung „anstupsen", damit sie in der Liste nach oben rückt.
  const supabase = await createClient();
  await supabase
    .from("luminalis_chat_sessions")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", sessionId)
    .eq("user_id", userId);

  return {
    ok: true,
    userMessage: stored.data,
    assistantMessage: assistant.data,
  };
}
