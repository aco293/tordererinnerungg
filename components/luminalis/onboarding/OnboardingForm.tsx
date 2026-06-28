"use client";

import { useFormStatus } from "react-dom";
import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { authFieldClass, authLabelClass } from "@/components/auth/AuthShell";
import { LUMINALIS_PILLARS } from "@/lib/luminalis/pillars";
import type { LuminalisProfile } from "@/lib/luminalis/profile";

type OnboardingFormProps = {
  action: (formData: FormData) => Promise<void>;
  defaults?: LuminalisProfile | null;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`${buttonBase} ${buttonVariants.primary} w-full disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {pending ? "Wird gespeichert …" : "Meine Ausrichtung speichern"}
    </button>
  );
}

export function OnboardingForm({ action, defaults }: OnboardingFormProps) {
  const selected = new Set(defaults?.selected_pillars ?? []);

  return (
    <form action={action} className="space-y-8">
      <div>
        <label htmlFor="display_name" className={authLabelClass}>
          Wie darf Luminalis dich ansprechen?
        </label>
        <input
          id="display_name"
          name="display_name"
          type="text"
          autoComplete="nickname"
          defaultValue={defaults?.display_name ?? ""}
          className={authFieldClass}
          placeholder="Dein Name oder ein Wort, das zu dir passt"
        />
      </div>

      <div>
        <label htmlFor="current_focus" className={authLabelClass}>
          Was beschäftigt dich im Moment am meisten?
        </label>
        <textarea
          id="current_focus"
          name="current_focus"
          rows={3}
          defaultValue={defaults?.current_focus ?? ""}
          className={`${authFieldClass} resize-y`}
          placeholder="Was gerade in dir Raum einnimmt …"
        />
      </div>

      <div>
        <label htmlFor="guiding_question" className={authLabelClass}>
          Welche Frage begleitet dich gerade?
        </label>
        <textarea
          id="guiding_question"
          name="guiding_question"
          rows={3}
          defaultValue={defaults?.guiding_question ?? ""}
          className={`${authFieldClass} resize-y`}
          placeholder="Eine Frage, die offen in dir mitgeht …"
        />
      </div>

      <fieldset>
        <legend className={authLabelClass}>
          Welche Bereiche sind gerade besonders wichtig?
        </legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {LUMINALIS_PILLARS.map((pillar) => (
            <label
              key={pillar.id}
              className="flex cursor-pointer items-start gap-3 rounded-xl border border-white/10 bg-abyss-800/40 px-4 py-3 transition-colors hover:border-gold/40 has-[:checked]:border-gold/50 has-[:checked]:bg-gold/5"
            >
              <input
                type="checkbox"
                name="pillars"
                value={pillar.label}
                defaultChecked={selected.has(pillar.label)}
                className="mt-1 h-4 w-4 accent-gold"
              />
              <span>
                <span className="block text-sm text-white">{pillar.label}</span>
                <span className="mt-0.5 block text-xs leading-relaxed text-slate-400">
                  {pillar.question}
                </span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="resonance_topics" className={authLabelClass}>
          Welche Themen kehren immer wieder zu dir zurück?
        </label>
        <input
          id="resonance_topics"
          name="resonance_topics"
          type="text"
          defaultValue={(defaults?.resonance_topics ?? []).join(", ")}
          className={authFieldClass}
          placeholder="z. B. Vertrauen, Stille, Verbundenheit"
        />
        <p className="mt-2 text-xs text-slate-500">
          Trenne mehrere Themen mit Komma.
        </p>
      </div>

      <div>
        <label htmlFor="first_intention" className={authLabelClass}>
          Was wünschst du dir von Luminalis?
        </label>
        <textarea
          id="first_intention"
          name="first_intention"
          rows={3}
          defaultValue={defaults?.first_intention ?? ""}
          className={`${authFieldClass} resize-y`}
          placeholder="Eine erste Intention für deinen Weg …"
        />
      </div>

      <SubmitButton />
    </form>
  );
}
