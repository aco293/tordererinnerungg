"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  createChatSession,
  deleteChatSession,
  generateAndStoreAssistantMessage,
  updateChatSessionTitle,
} from "@/lib/luminalis/ai/chat";
import { getAiConfigStatus } from "@/lib/luminalis/ai/config";
import { AI_DISABLED_MESSAGE } from "@/lib/luminalis/ai/types";
import { getCurrentUser } from "@/lib/luminalis/profile";

export type SendMessageState = { error: string | null; sent: number };

function configured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

const ALLOWED_MODES = [
  "begleitung",
  "klarheit",
  "erinnerung",
  "integration",
  "frequenzspiegel",
];

/** Neuen Dialog beginnen – danach in die Sitzung wechseln. */
export async function createChatSessionAction(formData: FormData) {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/chat");
  }

  const modeRaw = String(formData.get("mode") ?? "").trim();
  const mode = ALLOWED_MODES.includes(modeRaw) ? modeRaw : "begleitung";
  const title = String(formData.get("title") ?? "").trim();

  const { data } = await createChatSession(user.id, {
    title: title || null,
    mode,
  });

  revalidatePath("/luminalis/chat");

  if (data) {
    redirect(`/luminalis/chat/${data.id}`);
  }
  redirect("/luminalis/chat");
}

/** Nachricht senden und Assistant-Antwort erzeugen. */
export async function sendMessageAction(
  prevState: SendMessageState,
  formData: FormData,
): Promise<SendMessageState> {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/chat");
  }

  // Dieselbe AI-Statuslogik wie Page und Provider.
  if (!getAiConfigStatus().enabled) {
    return { error: AI_DISABLED_MESSAGE, sent: prevState.sent };
  }

  const sessionId = String(formData.get("session_id") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!sessionId) {
    return { error: "Dieser Dialog wurde nicht gefunden.", sent: prevState.sent };
  }
  if (!message) {
    return { error: "Bitte schreibe zuerst eine Nachricht.", sent: prevState.sent };
  }

  const result = await generateAndStoreAssistantMessage(
    user.id,
    sessionId,
    message,
  );

  if (!result.ok) {
    return { error: result.message, sent: prevState.sent };
  }

  revalidatePath(`/luminalis/chat/${sessionId}`);
  return { error: null, sent: prevState.sent + 1 };
}

/** Dialog löschen – danach zurück zur Übersicht. */
export async function deleteChatSessionAction(formData: FormData) {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/chat");
  }

  const sessionId = String(formData.get("session_id") ?? "").trim();
  if (sessionId) {
    await deleteChatSession(user.id, sessionId);
  }

  revalidatePath("/luminalis/chat");
  redirect("/luminalis/chat");
}

/** Titel eines Dialogs ruhig anpassen. */
export async function updateChatSessionTitleAction(formData: FormData) {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/chat");
  }

  const sessionId = String(formData.get("session_id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  if (sessionId) {
    await updateChatSessionTitle(user.id, sessionId, title);
    revalidatePath(`/luminalis/chat/${sessionId}`);
    revalidatePath("/luminalis/chat");
  }
}
