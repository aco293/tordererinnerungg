"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { authFieldClass } from "@/components/auth/AuthShell";
import {
  sendMessageAction,
  type SendMessageState,
} from "@/app/luminalis/chat/actions";

const initialState: SendMessageState = { error: null, sent: 0 };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${buttonBase} ${buttonVariants.primary} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {pending ? "Luminalis hört zu …" : "Senden"}
    </button>
  );
}

export function ChatComposer({ sessionId }: { sessionId: string }) {
  const [state, formAction] = useActionState(sendMessageAction, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  // Nach erfolgreichem Senden das Feld leeren.
  useEffect(() => {
    if (state.sent > 0 && !state.error) {
      formRef.current?.reset();
    }
  }, [state.sent, state.error]);

  return (
    <form ref={formRef} action={formAction} className="space-y-3">
      <input type="hidden" name="session_id" value={sessionId} />
      <textarea
        name="message"
        rows={3}
        required
        className={`${authFieldClass} resize-y`}
        placeholder="Was ist gerade präsent?"
      />

      {state.error && (
        <p
          role="alert"
          className="rounded-xl border border-rose-400/20 bg-rose-400/[0.06] px-4 py-3 text-sm leading-relaxed text-rose-200/90"
        >
          {state.error}
        </p>
      )}

      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
