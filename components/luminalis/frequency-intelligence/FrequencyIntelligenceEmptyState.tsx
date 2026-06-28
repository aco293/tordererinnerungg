/** Ruhiger Hinweis, solange noch keine Frequenzreflexion erzeugt wurde. */
export function FrequencyIntelligenceEmptyState() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center backdrop-blur-sm">
      <p className="text-base leading-relaxed text-slate-300/85">
        Noch keine Frequenzreflexion vorhanden.
      </p>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400/85">
        Wenn du möchtest, kannst du oben eine behutsame Reflexion aus deinen
        eigenen Wegspuren erzeugen. Sie verbindet, was du selbst festgehalten
        hast – ohne dich zu bewerten.
      </p>
    </div>
  );
}
