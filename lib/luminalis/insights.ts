/**
 * Serverseitige Helfer für Luminalis-Erkenntnisse.
 *
 * Nutzt den anonymen Supabase-Client über die Nutzer-Session; Row Level
 * Security stellt sicher, dass jeder nur seine eigenen Erkenntnisse sieht.
 * Kein Service-Role-Key. Nur serverseitig verwenden.
 */

import { createClient } from "@/lib/supabase/server";

export type LuminalisInsight = {
  id: string;
  user_id: string;
  source_entry_id: string | null;
  pillar: string | null;
  title: string | null;
  insight: string;
  integration_question: string | null;
  resonance_topics: string[];
  pinned: boolean;
  created_at: string;
  updated_at: string;
};

export type LuminalisInsightInput = {
  source_entry_id?: string | null;
  pillar?: string | null;
  title?: string | null;
  insight: string;
  integration_question?: string | null;
  resonance_topics?: string[];
  pinned?: boolean;
};

export type LuminalisInsightFilters = {
  pillar?: string;
  topic?: string;
  search?: string;
  pinnedOnly?: boolean;
  limit?: number;
};

/** Jüngste Erkenntnisse – markierte zuerst, dann nach Datum. */
export async function getRecentLuminalisInsights(
  userId: string,
  limit = 10,
): Promise<LuminalisInsight[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_insights")
    .select("*")
    .eq("user_id", userId)
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as LuminalisInsight[] | null) ?? [];
}

/** Anzahl aller und markierter Erkenntnisse eines Nutzers. */
export async function getLuminalisInsightCounts(
  userId: string,
): Promise<{ total: number; pinned: number }> {
  const supabase = await createClient();
  const [{ count: total }, { count: pinned }] = await Promise.all([
    supabase
      .from("luminalis_insights")
      .select("*", { head: true, count: "exact" })
      .eq("user_id", userId),
    supabase
      .from("luminalis_insights")
      .select("*", { head: true, count: "exact" })
      .eq("user_id", userId)
      .eq("pinned", true),
  ]);
  return { total: total ?? 0, pinned: pinned ?? 0 };
}

/** Einzelne Erkenntnis – nur wenn sie dem Nutzer gehört, sonst null. */
export async function getLuminalisInsightById(
  userId: string,
  insightId: string,
): Promise<LuminalisInsight | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_insights")
    .select("*")
    .eq("id", insightId)
    .eq("user_id", userId)
    .maybeSingle();
  return (data as LuminalisInsight | null) ?? null;
}

/** Gefilterte Erkenntnisse (markierte zuerst). */
export async function getLuminalisInsightsFiltered(
  userId: string,
  filters: LuminalisInsightFilters = {},
): Promise<LuminalisInsight[]> {
  const supabase = await createClient();
  let query = supabase
    .from("luminalis_insights")
    .select("*")
    .eq("user_id", userId);

  const pillar = filters.pillar?.trim();
  const topic = filters.topic?.trim();
  const search = filters.search?.trim();

  if (pillar) query = query.eq("pillar", pillar);
  if (topic) query = query.contains("resonance_topics", [topic]);
  if (filters.pinnedOnly) query = query.eq("pinned", true);
  if (search) {
    const safe = search.replace(/[%,*()]/g, " ").trim();
    if (safe) {
      query = query.or(`title.ilike.%${safe}%,insight.ilike.%${safe}%`);
    }
  }

  const { data } = await query
    .order("pinned", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(filters.limit ?? 30);

  return (data as LuminalisInsight[] | null) ?? [];
}

/** Erkenntnisse, die aus einem bestimmten Weg-Eintrag entstanden sind. */
export async function getInsightsForEntry(
  userId: string,
  entryId: string,
): Promise<LuminalisInsight[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_insights")
    .select("*")
    .eq("user_id", userId)
    .eq("source_entry_id", entryId)
    .order("created_at", { ascending: false });
  return (data as LuminalisInsight[] | null) ?? [];
}

/** Neue Erkenntnis anlegen. */
export async function createLuminalisInsight(
  userId: string,
  input: LuminalisInsightInput,
): Promise<{ data: LuminalisInsight | null; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("luminalis_insights")
    .insert({
      user_id: userId,
      source_entry_id: input.source_entry_id ?? null,
      pillar: input.pillar ?? null,
      title: input.title ?? null,
      insight: input.insight,
      integration_question: input.integration_question ?? null,
      resonance_topics: input.resonance_topics ?? [],
      pinned: input.pinned ?? false,
    })
    .select()
    .maybeSingle();

  return {
    data: (data as LuminalisInsight | null) ?? null,
    error: error?.message ?? null,
  };
}

/** Eigene Erkenntnis aktualisieren – nur wenn sie dem Nutzer gehört. */
export async function updateLuminalisInsight(
  userId: string,
  insightId: string,
  input: LuminalisInsightInput,
): Promise<{ data: LuminalisInsight | null; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("luminalis_insights")
    .update({
      source_entry_id: input.source_entry_id ?? null,
      pillar: input.pillar ?? null,
      title: input.title ?? null,
      insight: input.insight,
      integration_question: input.integration_question ?? null,
      resonance_topics: input.resonance_topics ?? [],
      pinned: input.pinned ?? false,
    })
    .eq("id", insightId)
    .eq("user_id", userId)
    .select()
    .maybeSingle();

  return {
    data: (data as LuminalisInsight | null) ?? null,
    error: error?.message ?? null,
  };
}

/** Eigene Erkenntnis löschen. */
export async function deleteLuminalisInsight(
  userId: string,
  insightId: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("luminalis_insights")
    .delete()
    .eq("id", insightId)
    .eq("user_id", userId);
  return { error: error?.message ?? null };
}

/** Markierung (pinned) setzen oder entfernen. */
export async function toggleLuminalisInsightPinned(
  userId: string,
  insightId: string,
  pinned: boolean,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("luminalis_insights")
    .update({ pinned })
    .eq("id", insightId)
    .eq("user_id", userId);
  return { error: error?.message ?? null };
}
