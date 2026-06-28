"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { buttonBase, buttonVariants } from "@/components/ui/Button";
import {
  generateReflectionAction,
  type ReflectionActionState,
} from "@/app/luminalis/frequenzintelligenz/actions";

const initialState: ReflectionActionState = { error: null, created: 0 };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${buttonBase} ${buttonVariants.primary} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {pending ? "Spiegel entsteht …" : "Frequenzreflexion erzeugen"}
    </button>
  );
}

export function GenerateReflectionButton() {
  const [state, formAction] = useActionState(
    generateReflectionAction,
    initialState,
  );

  return (
    <form action={formAction} className="space-y-4">
      <SubmitButton />

      {state.error && (
        <p
          role="alert"
          className="rounded-xl border border-gold/20 bg-gold/[0.05] px-4 py-3 text-sm leading-relaxed text-gold-soft"
        >
          {state.error}
        </p>
      )}
    </form>
  );
}
