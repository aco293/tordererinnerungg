/**
 * Frequenzintelligenz V0 – behutsame Reflexionsschicht.
 *
 * Erzeugt aus den eigenen Daten des Nutzers eine strukturierte, vorsichtige
 * Reflexion und speichert sie in `luminalis_frequency_reflections`.
 *
 * Wichtig:
 * - Keine Diagnose, keine psychologische Bewertung, keine absoluten Aussagen,
 *   keine spirituellen Behauptungen als Fakten, keine Angst.
 * - Wird nur auf ausdrücklichen Wunsch (Button) ausgelöst – nie im Hintergrund.
 * - Bei zu wenig Material: freundlicher Hinweis statt erfundener Spiegelung.
 * - Kein Service-Role-Key; RLS schützt die Daten.
 */

import {
  buildLuminalisContext,
  contextPackToText,
  hasEnoughContext,
} from "@/lib/luminalis/ai/context";
import { generateLuminalisResponse } from "@/lib/luminalis/ai/provider";
import { createLuminalisSystemPrompt } from "@/lib/luminalis/ai/systemPrompt";
import { createClient } from "@/lib/supabase/server";

export type FrequencyReflection = {
  id: string;
  user_id: string;
  session_id: string | null;
  title: string | null;
  observed_patterns: string[];
  connecting_threads: string[];
  gentle_reflection: string | null;
  possible_question: string | null;
  integration_invitation: string | null;
  source_summary: string | null;
  created_at: string;
};

type ReflectionDraft = {
  title: string;
  observed_patterns: string[];
  connecting_threads: string[];
  gentle_reflection: string;
  possible_question: string;
  integration_invitation: string;
  source_summary: string;
};

export type GenerateReflectionResult =
  | { ok: true; reflection: FrequencyReflection }
  | {
      ok: false;
      reason: "ai_unavailable" | "not_enough_data" | "save_failed";
      message: string;
    };

const NOT_ENOUGH_MESSAGE =
  "Für einen stabilen Spiegel ist noch zu wenig Material vorhanden. Beginne im Dialograum mit ein paar Weg-Einträgen – daraus kann später eine behutsame Reflexion entstehen.";

const AI_UNAVAILABLE_MESSAGE =
  "Die Frequenzintelligenz ist vorbereitet, aber noch nicht aktiviert.";

const REFLECTION_INSTRUCTIONS = `Erzeuge aus dem bereitgestellten Kontext eine behutsame Frequenzreflexion.

Gib ausschließlich gültiges JSON zurück, ohne Erklärtext davor oder danach, in genau dieser Struktur:
{
  "title": string,
  "observed_patterns": string[],
  "connecting_threads": string[],
  "gentle_reflection": string,
  "possible_question": string,
  "integration_invitation": string,
  "source_summary": string
}

Regeln:
- "observed_patterns": 3 bis 5 Einträge, jeweils kurz, beschreibend, ohne Bewertung.
- "connecting_threads": maximal 3 Einträge, die behutsam Zusammenhänge benennen.
- "gentle_reflection": ein ruhiger, spiegelnder Absatz aus den eigenen Worten des Nutzers, keine Diagnose.
- "possible_question": eine einzige offene Frage zur Selbstwahrnehmung.
- "integration_invitation": eine sanfte, ausdrücklich freiwillige Einladung – kein Auftrag, kein Druck.
- "source_summary": kurze, transparente Angabe der genutzten Datenbereiche.
- Keine absoluten Aussagen, keine spirituellen Behauptungen als Fakten, keine Angst.
- Sprich nie in der Form „Du bist …". Nutze Formulierungen wie „In deinen Einträgen erscheint …".`;

/** Robust JSON aus der Modellantwort herauslesen (auch mit Codefences). */
function parseReflection(raw: string): ReflectionDraft | null {
  const cleaned = raw.replace(/```json/gi, "").replace(/```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned.slice(start, end + 1));
  } catch {
    return null;
  }
  if (typeof parsed !== "object" || parsed === null) return null;
  const obj = parsed as Record<string, unknown>;

  const toStringValue = (value: unknown): string =>
    typeof value === "string" ? value.trim() : "";
  const toStringArray = (value: unknown, max: number): string[] =>
    Array.isArray(value)
      ? value
          .map((item) => (typeof item === "string" ? item.trim() : ""))
          .filter(Boolean)
          .slice(0, max)
      : [];

  return {
    title: toStringValue(obj.title) || "Frequenzreflexion",
    observed_patterns: toStringArray(obj.observed_patterns, 5),
    connecting_threads: toStringArray(obj.connecting_threads, 3),
    gentle_reflection: toStringValue(obj.gentle_reflection),
    possible_question: toStringValue(obj.possible_question),
    integration_invitation: toStringValue(obj.integration_invitation),
    source_summary: toStringValue(obj.source_summary),
  };
}

export async function generateFrequencyReflection(
  userId: string,
  sessionId?: string,
): Promise<GenerateReflectionResult> {
  const pack = await buildLuminalisContext(userId);

  if (!hasEnoughContext(pack)) {
    return { ok: false, reason: "not_enough_data", message: NOT_ENOUGH_MESSAGE };
  }

  const systemPrompt = createLuminalisSystemPrompt({
    mode: "frequenzspiegel",
    contextPack: contextPackToText(pack),
  });

  const result = await generateLuminalisResponse({
    systemPrompt,
    messages: [{ role: "user", content: REFLECTION_INSTRUCTIONS }],
    temperature: 0.5,
    maxTokens: 900,
  });

  if (!result.ok) {
    return { ok: false, reason: "ai_unavailable", message: AI_UNAVAILABLE_MESSAGE };
  }

  const draft = parseReflection(result.content);
  if (!draft) {
    return { ok: false, reason: "ai_unavailable", message: AI_UNAVAILABLE_MESSAGE };
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("luminalis_frequency_reflections")
    .insert({
      user_id: userId,
      session_id: sessionId ?? null,
      title: draft.title,
      observed_patterns: draft.observed_patterns,
      connecting_threads: draft.connecting_threads,
      gentle_reflection: draft.gentle_reflection || null,
      possible_question: draft.possible_question || null,
      integration_invitation: draft.integration_invitation || null,
      source_summary: draft.source_summary || pack.sourceSummary,
    })
    .select()
    .maybeSingle();

  if (error || !data) {
    return {
      ok: false,
      reason: "save_failed",
      message:
        "Die Frequenzreflexion konnte nicht gespeichert werden. Bitte versuche es erneut.",
    };
  }

  return { ok: true, reflection: data as FrequencyReflection };
}

/** Jüngste Frequenzreflexionen des Nutzers. */
export async function getRecentFrequencyReflections(
  userId: string,
  limit = 10,
): Promise<FrequencyReflection[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_frequency_reflections")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as FrequencyReflection[] | null) ?? [];
}
