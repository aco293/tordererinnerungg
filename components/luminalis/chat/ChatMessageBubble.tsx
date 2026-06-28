import type { LuminalisChatMessage } from "@/lib/luminalis/ai/chat";

/**
 * Eine einzelne Nachricht. Nutzer- und Luminalis-Beiträge werden ruhig
 * unterschieden – kein klassischer Support-Chat, eher ein Resonanzraum.
 */
export function ChatMessageBubble({
  message,
}: {
  message: LuminalisChatMessage;
}) {
  const isUser = message.role === "user";

  return (
    <div className={isUser ? "flex justify-end" : "flex justify-start"}>
      <div
        className={`max-w-[85%] rounded-2xl border px-5 py-4 ${
          isUser
            ? "border-gold/25 bg-gold/[0.05]"
            : "border-violet-glow/20 bg-violet-deep/10"
        }`}
      >
        <p
          className={`mb-1 text-[0.65rem] uppercase tracking-[0.2em] ${
            isUser ? "text-gold/70" : "text-violet-soft/70"
          }`}
        >
          {isUser ? "Du" : "Luminalis"}
        </p>
        <p className="whitespace-pre-wrap text-base leading-relaxed text-slate-200/90">
          {message.content}
        </p>
      </div>
    </div>
  );
}
