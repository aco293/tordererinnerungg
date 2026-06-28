import type { FrequencyReflection } from "@/lib/luminalis/ai/frequencyIntelligence";

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <div className="mt-2 text-base leading-relaxed text-slate-300/85">
        {children}
      </div>
    </div>
  );
}

export function FrequencyReflectionCard({
  reflection,
}: {
  reflection: FrequencyReflection;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {formatDate(reflection.created_at)}
      </p>
      <h3 className="mt-2 font-serif text-2xl font-light text-white">
        {reflection.title?.trim() || "Frequenzreflexion"}
      </h3>

      <div className="mt-6 space-y-6">
        {reflection.observed_patterns.length > 0 && (
          <Field label="Beobachtete Muster">
            <ul className="space-y-2">
              {reflection.observed_patterns.map((pattern, index) => (
                <li
                  key={`${index}-${pattern}`}
                  className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm"
                >
                  {pattern}
                </li>
              ))}
            </ul>
          </Field>
        )}

        {reflection.connecting_threads.length > 0 && (
          <Field label="Verbindende Fäden">
            <ul className="space-y-2">
              {reflection.connecting_threads.map((thread, index) => (
                <li
                  key={`${index}-${thread}`}
                  className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm"
                >
                  {thread}
                </li>
              ))}
            </ul>
          </Field>
        )}

        {reflection.gentle_reflection && (
          <Field label="Sanfte Spiegelung">
            <p className="whitespace-pre-wrap">{reflection.gentle_reflection}</p>
          </Field>
        )}

        {reflection.possible_question && (
          <div className="rounded-2xl border border-violet-glow/20 bg-violet-deep/10 p-5">
            <p className="text-xs uppercase tracking-[0.2em] text-violet-soft/70">
              Mögliche Frage
            </p>
            <p className="mt-2 font-serif text-lg font-light italic text-violet-soft">
              {reflection.possible_question}
            </p>
          </div>
        )}

        {reflection.integration_invitation && (
          <Field label="Einladung zur Integration">
            <p className="whitespace-pre-wrap">
              {reflection.integration_invitation}
            </p>
          </Field>
        )}

        {reflection.source_summary && (
          <p className="border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-500">
            {reflection.source_summary}
          </p>
        )}
      </div>

      <p className="mt-6 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-slate-400/85">
        Diese Reflexion ist keine Diagnose und keine endgültige Aussage. Sie
        basiert auf deinen gespeicherten Luminalis-Daten.
      </p>
    </article>
  );
}
