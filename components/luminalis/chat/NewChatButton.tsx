import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { authFieldClass, authLabelClass } from "@/components/auth/AuthShell";
import { ChatModeSelector } from "@/components/luminalis/chat/ChatModeSelector";
import { createChatSessionAction } from "@/app/luminalis/chat/actions";

/**
 * Formular, um einen neuen Dialog zu beginnen: optionaler Titel,
 * Ausrichtung (Modus) und der Einstieg „Neuen Dialog beginnen".
 */
export function NewChatButton() {
  return (
    <form
      action={createChatSessionAction}
      className="space-y-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
    >
      <div>
        <label htmlFor="new-chat-title" className={authLabelClass}>
          Gib diesem Dialog einen Namen
        </label>
        <input
          id="new-chat-title"
          name="title"
          type="text"
          className={authFieldClass}
          placeholder="Optional"
        />
      </div>

      <ChatModeSelector />

      <button
        type="submit"
        className={`${buttonBase} ${buttonVariants.primary} w-full`}
      >
        Neuen Dialog beginnen
      </button>
    </form>
  );
}
