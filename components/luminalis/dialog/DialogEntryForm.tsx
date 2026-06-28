"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { authFieldClass, authLabelClass } from "@/components/auth/AuthShell";
import { ReflectionPrompt } from "@/components/luminalis/dialog/ReflectionPrompt";
import { DIALOG_MODES } from "@/lib/luminalis/dialog";
import { LUMINALIS_PILLARS } from "@/lib/luminalis/pillars";
import type { DialogState } from "@/app/luminalis/dialog/actions";

const dialogInitialState: DialogState = { error: null, ok: false };

type DialogEntryFormProps = {
  action: (
    prevState: DialogState,
    formData: FormData,
  ) => Promise<DialogState>;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${buttonBase} ${buttonVariants.primary} w-full disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {pending ? "Wird gespeichert …" : "Eintrag speichern"}
    </button>
  );
}

export function DialogEntryForm({ action }: DialogEntryFormProps) {
  const [state, formAction] = useActionState(action, dialogInitialState);
  const [pillar, setPillar] = useState<string>(LUMINALIS_PILLARS[0].label);
  const formRef = useRef<HTMLFormElement>(null);

  // Nach erfolgreichem Speichern die Felder leeren, damit der gespeicherte
  // Text nicht weiter im Formular steht.
  useEffect(() => {
    if (state.ok && !state.error) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="mode" className={authLabelClass}>
            In welchem Modus bist du gerade?
          </label>
          <select id="mode" name="mode" defaultValue={DIALOG_MODES[0]} className={authFieldClass}>
            {DIALOG_MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="pillar" className={authLabelClass}>
            Welche Säule berührt dieser Eintrag?
          </label>
          <select
            id="pillar"
            name="pillar"
            value={pillar}
            onChange={(e) => setPillar(e.target.value)}
            className={authFieldClass}
          >
            {LUMINALIS_PILLARS.map((p) => (
              <option key={p.id} value={p.label}>
                {p.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ReflectionPrompt pillar={pillar} />

      <div>
        <label htmlFor="title" className={authLabelClass}>
          Gib diesem Moment einen Titel
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
        <label htmlFor="content" className={authLabelClass}>
          Was ist heute in dir präsent?
        </label>
        <textarea
          id="content"
          name="content"
          rows={6}
          required
          className={`${authFieldClass} resize-y`}
          placeholder="Schreibe frei – so, wie es gerade in dir ist …"
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
          placeholder="z. B. Vertrauen, Loslassen, Anfang"
        />
        <p className="mt-2 text-xs text-slate-500">
          Trenne mehrere Themen mit Komma.
        </p>
      </div>

      {state.error && (
        <p
          role="alert"
          className="rounded-xl border border-rose-400/20 bg-rose-400/[0.06] px-4 py-3 text-sm leading-relaxed text-rose-200/90"
        >
          {state.error}
        </p>
      )}
      {state.ok && !state.error && (
        <p
          role="status"
          className="rounded-xl border border-gold/20 bg-gold/[0.05] px-4 py-3 text-sm leading-relaxed text-gold-soft"
        >
          Dein Eintrag wurde gespeichert.
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
