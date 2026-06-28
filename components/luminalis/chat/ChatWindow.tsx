import { ChatComposer } from "@/components/luminalis/chat/ChatComposer";
import { ChatMessageList } from "@/components/luminalis/chat/ChatMessageList";
import { ContextNotice } from "@/components/luminalis/chat/ContextNotice";
import type { LuminalisChatMessage } from "@/lib/luminalis/ai/chat";

/** Dialogfenster einer Sitzung: Verlauf, Kontext-Hinweis und Eingabe. */
export function ChatWindow({
  sessionId,
  messages,
}: {
  sessionId: string;
  messages: LuminalisChatMessage[];
}) {
  return (
    <div className="space-y-6">
      <ChatMessageList messages={messages} />
      <ContextNotice />
      <ChatComposer sessionId={sessionId} />
    </div>
  );
}
