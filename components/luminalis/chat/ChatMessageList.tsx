import { ChatMessageBubble } from "@/components/luminalis/chat/ChatMessageBubble";
import type { LuminalisChatMessage } from "@/lib/luminalis/ai/chat";

export function ChatMessageList({
  messages,
}: {
  messages: LuminalisChatMessage[];
}) {
  const visible = messages.filter((message) => message.role !== "system");

  if (visible.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-center">
        <p className="text-sm leading-relaxed text-slate-400/85">
          Beginne, indem du aufschreibst, was gerade in dir präsent ist.
          Luminalis bezieht behutsam deine eigenen Wegspuren ein.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {visible.map((message) => (
        <ChatMessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
}
