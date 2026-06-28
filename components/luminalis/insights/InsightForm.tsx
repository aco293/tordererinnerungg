"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { authFieldClass, authLabelClass } from "@/components/auth/AuthShell";
import { LUMINALIS_PILLARS } from "@/lib/luminalis/pillars";
import type { InsightFormState } from "@/app/luminalis/erkenntnisse/neu/actions";

const initialState: InsightFormState = { error: null };

type InsightFormProps = {
  action: (
    prevState: InsightFormState,
    formData: FormData,
  ) => Promise<InsightFormState>;
  sourceEntryId?: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${buttonBase} ${buttonVariants.primary} w-full disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {pending ? "Wird gespeichert …" : "Erkenntnis speichern"}
    </button>
  );
}

export function InsightForm({ action, sourceEntryId }: InsightFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      {sourceEntryId && (
        <input type="hidden" name="source_entry_id" value={sourceEntryId} />
      )}

      <div>
        <label htmlFor="title" className={authLabelClass}>
          Gib dieser Erkenntnis einen Namen
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
        <label htmlFor="pillar" className={authLabelClass}>
          Welche Säule berührt diese Erkenntnis?
        </label>
        <select
          id="pillar"
          name="pillar"
          defaultValue={LUMINALIS_PILLARS[0].label}
          className={authFieldClass}
        >
          {LUMINALIS_PILLARS.map((p) => (
            <option key={p.id} value={p.label}>
              {p.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="insight" className={authLabelClass}>
          Welche Erkenntnis möchtest du bewahren?
        </label>
        <textarea
          id="insight"
          name="insight"
          rows={5}
          required
          className={`${authFieldClass} resize-y`}
          placeholder="Das, was du nicht wieder verlieren möchtest …"
        />
      </div>

      <div>
        <label htmlFor="integration_question" className={authLabelClass}>
          Welche Frage hilft dir, diese Erkenntnis zu integrieren?
        </label>
        <textarea
          id="integration_question"
          name="integration_question"
          rows={3}
          className={`${authFieldClass} resize-y`}
          placeholder="Optional"
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
          placeholder="z. B. Vertrauen, Klarheit"
        />
        <p className="mt-2 text-xs text-slate-500">
          Trenne mehrere Themen mit Komma.
        </p>
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-abyss-800/40 px-4 py-3">
        <input
          type="checkbox"
          name="pinned"
          value="1"
          className="h-4 w-4 accent-gold"
        />
        <span className="text-sm text-slate-200">
          Diese Erkenntnis hervorheben
        </span>
      </label>

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
