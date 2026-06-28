/**
 * Zentrale, serverseitige AI-Aktivierungslogik.
 *
 * EINZIGE Quelle der Wahrheit dafür, ob der Luminalis KI-Dialog und die
 * Frequenzintelligenz aktiv sind. Setup-Check, Pages, Server Actions und der
 * Provider nutzen ausschließlich diese Funktion, damit es keine auseinander-
 * laufende Logik mehr gibt.
 *
 * Wichtig:
 * - Nur serverseitig verwenden (liest serverseitige Env-Variablen).
 * - Gibt NIEMALS den API-Key zurück – nur Booleans und den Modellnamen.
 * - Werte werden mit trim()/toLowerCase() normalisiert, damit kleine
 *   Abweichungen (Leerzeichen, Groß-/Kleinschreibung) nicht zu falschem
 *   „deaktiviert" führen.
 */

export type AiConfigStatus = {
  enabled: boolean;
  aiEnabledFlag: boolean;
  hasApiKey: boolean;
  hasModel: boolean;
  model: string | null;
  reason: string | null;
};

export function getAiConfigStatus(): AiConfigStatus {
  const aiEnabledFlag =
    process.env.AI_ENABLED?.trim().toLowerCase() === "true";
  const hasApiKey = Boolean(process.env.OPENAI_API_KEY?.trim());
  const model = process.env.OPENAI_MODEL?.trim() || null;
  const hasModel = Boolean(model);

  const enabled = aiEnabledFlag && hasApiKey && hasModel;

  let reason: string | null = null;
  if (!aiEnabledFlag) {
    reason = "AI_ENABLED ist nicht true";
  } else if (!hasApiKey) {
    reason = "OPENAI_API_KEY fehlt";
  } else if (!hasModel) {
    reason = "OPENAI_MODEL fehlt";
  }

  return { enabled, aiEnabledFlag, hasApiKey, hasModel, model, reason };
}
