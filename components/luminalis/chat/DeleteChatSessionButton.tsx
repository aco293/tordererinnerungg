"use client";

import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { deleteChatSessionAction } from "@/app/luminalis/chat/actions";

export function DeleteChatSessionButton({
  sessionId,
}: {
  sessionId: string;
}) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!window.confirm("Möchtest du diesen Dialog wirklich löschen?")) {
      event.preventDefault();
    }
  }

  return (
    <form action={deleteChatSessionAction} onSubmit={handleSubmit}>
      <input type="hidden" name="session_id" value={sessionId} />
      <button type="submit" className={`${buttonBase} ${buttonVariants.ghost}`}>
        Dialog löschen
      </button>
    </form>
  );
}
