import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { AiDisabledNotice } from "@/components/luminalis/chat/AiDisabledNotice";
import { ChatShell } from "@/components/luminalis/chat/ChatShell";
import { ChatWindow } from "@/components/luminalis/chat/ChatWindow";
import { DeleteChatSessionButton } from "@/components/luminalis/chat/DeleteChatSessionButton";
import { chatModeLabel } from "@/lib/luminalis/ai/chatModes";
import { getChatMessages, getChatSessionById } from "@/lib/luminalis/ai/chat";
import { getAiConfigStatus } from "@/lib/luminalis/ai/config";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Luminalis Dialog",
  description: "Ein persönlicher Dialog mit Luminalis.",
};

const SUBTITLE =
  "Ein persönlicher KI-Begleiter, der deine eigenen Wegspuren behutsam einbezieht.";

export default async function ChatSessionPage({
  params,
}: {
  params: Promise<{ sessionId: string }>;
}) {
  const { sessionId } = await params;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/anmelden?weiter=/luminalis/chat");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/chat");
  }

  const profile = await getLuminalisProfile(user.id);
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const aiStatus = getAiConfigStatus();
  if (!aiStatus.enabled) {
    return (
      <ChatShell title="Luminalis Dialog" subtitle={SUBTITLE}>
        <AiDisabledNotice status={aiStatus} />
        <div className="mt-8 text-center">
          <Button href="/luminalis/chat" variant="ghost">
            Zurück zur Übersicht
          </Button>
        </div>
      </ChatShell>
    );
  }

  const session = await getChatSessionById(user.id, sessionId);
  if (!session) {
    notFound();
  }

  const messages = await getChatMessages(user.id, sessionId);
  const title = session.title?.trim() || "Luminalis Dialog";

  return (
    <ChatShell title={title} subtitle={`Ausrichtung: ${chatModeLabel(session.mode)}`}>
      <ChatWindow sessionId={session.id} messages={messages} />

      <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
        <Button href="/luminalis/chat" variant="secondary">
          Zurück zur Übersicht
        </Button>
        <DeleteChatSessionButton sessionId={session.id} />
      </div>
    </ChatShell>
  );
}
