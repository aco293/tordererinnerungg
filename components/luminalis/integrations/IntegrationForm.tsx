"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { authFieldClass, authLabelClass } from "@/components/auth/AuthShell";
import { INTEGRATION_STATUSES } from "@/lib/luminalis/integrationStatus";
import type { IntegrationFormState } from "@/app/luminalis/integration/neu/actions";

const initialState: IntegrationFormState = { error: null };

type IntegrationFormProps = {
  action: (
    prevState: IntegrationFormState,
    formData: FormData,
  ) => Promise<IntegrationFormState>;
  insightId?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${buttonBase} ${buttonVariants.primary} w-full disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {pending ? "Wird gespeichert …" : "Integration speichern"}
    </button>
  );
}

export function IntegrationForm({ action, insightId }: IntegrationFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {insightId && <input type="hidden" name="insight_id" value={insightId} />}

      <div>
        <label htmlFor="title" className={authLabelClass}>
          Gib dieser Integration einen Namen
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className={authFieldClass}
          placeholder="Optional"
        />
      </div>

      <div>
        <label htmlFor="intention" className={authLabelClass}>
          Was möchtest du aus dieser Erkenntnis bewusst in dein Leben bringen?
        </label>
        <textarea
          id="intention"
          name="intention"
          rows={4}
          required
          className={`${authFieldClass} resize-y`}
          placeholder="Deine Intention …"
        />
      </div>

      <div>
        <label htmlFor="next_step" className={authLabelClass}>
          Was wäre ein kleiner, stimmiger nächster Schritt?
        </label>
        <textarea
          id="next_step"
          name="next_step"
          rows={3}
          className={`${authFieldClass} resize-y`}
          placeholder="Optional"
        />
      </div>

      <div>
        <label htmlFor="rhythm" className={authLabelClass}>
          Gibt es einen natürlichen Rhythmus dafür?
        </label>
        <input
          id="rhythm"
          name="rhythm"
          type="text"
          className={authFieldClass}
          placeholder="z. B. einmal pro Woche, morgens, nach dem Schreiben, wenn es sich stimmig anfühlt"
        />
      </div>

      <div>
        <label htmlFor="resonance_topics" className={authLabelClass}>
          Welche Themen schwingen mit?
        </label>
        <input
          id="resonance_topics"
          name="resonance_topics"
          type="text"
          className={authFieldClass}
          placeholder="z. B. Vertrauen, Geduld"
        />
        <p className="mt-2 text-xs text-slate-500">
          Trenne mehrere Themen mit Komma.
        </p>
      </div>

      <div>
        <label htmlFor="status" className={authLabelClass}>
          Wo steht diese Integration gerade?
        </label>
        <select
          id="status"
          name="status"
          defaultValue="open"
          className={authFieldClass}
        >
          {INTEGRATION_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-xl border border-rose-400/20 bg-rose-400/[0.06] px-4 py-3 text-sm leading-relaxed text-rose-200/90"
        >
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
