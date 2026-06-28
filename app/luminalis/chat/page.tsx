import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AiDisabledNotice } from "@/components/luminalis/chat/AiDisabledNotice";
import { ChatSessionList } from "@/components/luminalis/chat/ChatSessionList";
import { ChatShell } from "@/components/luminalis/chat/ChatShell";
import { ContextNotice } from "@/components/luminalis/chat/ContextNotice";
import { NewChatButton } from "@/components/luminalis/chat/NewChatButton";
import { getChatSessions } from "@/lib/luminalis/ai/chat";
import { isAiConfigured } from "@/lib/luminalis/ai/provider";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Luminalis Dialog",
  description:
    "Ein persönlicher KI-Begleiter, der deine eigenen Wegspuren behutsam einbezieht.",
};

const SUBTITLE =
  "Ein persönlicher KI-Begleiter, der deine eigenen Wegspuren behutsam einbezieht.";
const INTRO =
  "Luminalis antwortet nicht aus einer fremden Wahrheit. Es arbeitet mit dem, was du selbst in deinem Weg-Raum festgehalten hast.";

export default async function ChatPage() {
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

  if (!isAiConfigured()) {
    return (
      <ChatShell title="Luminalis Dialog" subtitle={SUBTITLE} intro={INTRO}>
        <AiDisabledNotice />
      </ChatShell>
    );
  }

  const sessions = await getChatSessions(user.id);

  return (
    <ChatShell title="Luminalis Dialog" subtitle={SUBTITLE} intro={INTRO}>
      <div className="space-y-8">
        <ContextNotice />

        <div>
          <h2 className="mb-4 font-serif text-xl font-light text-white">
            Deine Dialoge
          </h2>
          <ChatSessionList sessions={sessions} />
        </div>

        <div>
          <h2 className="mb-4 font-serif text-xl font-light text-white">
            Neuen Dialog beginnen
          </h2>
          <NewChatButton />
        </div>
      </div>
    </ChatShell>
  );
}
