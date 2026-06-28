/**
 * Ruhiger Hinweis, wenn der KI-Dialog vorbereitet, aber nicht aktiviert ist.
 * Zeigt keine technischen Details, keine Schlüssel.
 */
export function AiDisabledNotice() {
  return (
    <div className="rounded-2xl border border-gold/20 bg-gold/[0.04] p-7 text-center backdrop-blur-sm">
      <p className="text-base leading-relaxed text-slate-300/85">
        Der Luminalis KI-Dialog ist vorbereitet, aber noch nicht aktiviert.
      </p>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400/85">
        Sobald die Begleitung freigeschaltet ist, kann Luminalis hier behutsam
        aus deinen eigenen Wegspuren mit dir ins Gespräch kommen.
      </p>
    </div>
  );
}
