import type { AiConfigStatus } from "@/lib/luminalis/ai/config";

/**
 * Ruhiger Hinweis, wenn der KI-Dialog vorbereitet, aber nicht aktiviert ist.
 *
 * Erhält den (serverseitig ermittelten) Status nur als Props – diese
 * Komponente liest selbst niemals Env-Variablen. Es werden ausschließlich
 * Ja/Nein-Werte und der Grund angezeigt, niemals der API-Key, kein Key-Anfang,
 * keine Providerdetails.
 */
export function AiDisabledNotice({ status }: { status?: AiConfigStatus }) {
  return (
    <div className="rounded-2xl border border-gold/20 bg-gold/[0.04] p-7 text-center backdrop-blur-sm">
      <p className="text-base leading-relaxed text-slate-300/85">
        Der Luminalis KI-Dialog ist vorbereitet, aber noch nicht aktiviert.
      </p>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-400/85">
        Sobald die Begleitung freigeschaltet ist, kann Luminalis hier behutsam
        aus deinen eigenen Wegspuren mit dir ins Gespräch kommen.
      </p>

      {status && (
        <div className="mx-auto mt-6 max-w-xs rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            KI-Status
          </p>
          {status.reason && (
            <p className="mt-2 text-xs leading-relaxed text-gold-soft">
              Grund: {status.reason}
            </p>
          )}
          <ul className="mt-3 space-y-1 text-xs text-slate-400">
            <li>AI_ENABLED gelesen: {status.aiEnabledFlag ? "Ja" : "Nein"}</li>
            <li>API Key erkannt: {status.hasApiKey ? "Ja" : "Nein"}</li>
            <li>Modell erkannt: {status.hasModel ? "Ja" : "Nein"}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
