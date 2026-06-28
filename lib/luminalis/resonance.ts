/**
 * Serverseitige Auswertung der eigenen Weg-Einträge für den Frequenzspiegel.
 *
 * Reine Zählung und ruhige Aufbereitung – keine KI, keine Interpretation,
 * keine Diagnose. Nutzt den anonymen Supabase-Client über die Nutzer-Session
 * (RLS schützt die Daten). Kein Service-Role-Key.
 */

import { createClient } from "@/lib/supabase/server";

export type ResonanceCount = {
  label: string;
  count: number;
};

export type ResonanceOverview = {
  totalEntries: number;
  entriesLast30Days: number;
  lastEntryAt: string | null;
  pillarCounts: ResonanceCount[];
  modeCounts: ResonanceCount[];
  topicCounts: ResonanceCount[];
  activePillar: string | null;
  activeMode: string | null;
  topTopics: string[];
};

type CountableEntry = {
  pillar: string | null;
  mode: string | null;
  resonance_topics: string[] | null;
  created_at: string;
};

function emptyOverview(): ResonanceOverview {
  return {
    totalEntries: 0,
    entriesLast30Days: 0,
    lastEntryAt: null,
    pillarCounts: [],
    modeCounts: [],
    topicCounts: [],
    activePillar: null,
    activeMode: null,
    topTopics: [],
  };
}

/**
 * Zählt Werte; trimmt, verwirft Leeres und führt gleiche Werte
 * case-insensitive zusammen – zeigt aber die zuerst gesehene (lesbare) Form.
 */
function countBy(values: (string | null | undefined)[]): ResonanceCount[] {
  const map = new Map<string, ResonanceCount>();
  for (const raw of values) {
    const label = (raw ?? "").trim();
    if (!label) continue;
    const key = label.toLowerCase();
    const existing = map.get(key);
    if (existing) {
      existing.count += 1;
    } else {
      map.set(key, { label, count: 1 });
    }
  }
  return [...map.values()].sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label, "de"),
  );
}

export async function getResonanceOverview(
  userId: string,
): Promise<ResonanceOverview> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_entries")
    .select("pillar, mode, resonance_topics, created_at")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  const entries = (data as CountableEntry[] | null) ?? [];
  if (entries.length === 0) {
    return emptyOverview();
  }

  const now = Date.now();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const entriesLast30Days = entries.filter((entry) => {
    const time = new Date(entry.created_at).getTime();
    return !Number.isNaN(time) && now - time <= thirtyDays;
  }).length;

  const pillarCounts = countBy(entries.map((entry) => entry.pillar));
  const modeCounts = countBy(entries.map((entry) => entry.mode));
  const topicCounts = countBy(
    entries.flatMap((entry) => entry.resonance_topics ?? []),
  );

  return {
    totalEntries: entries.length,
    entriesLast30Days,
    lastEntryAt: entries[0]?.created_at ?? null,
    pillarCounts,
    modeCounts,
    topicCounts,
    activePillar: pillarCounts[0]?.label ?? null,
    activeMode: modeCounts[0]?.label ?? null,
    topTopics: topicCounts.slice(0, 5).map((topic) => topic.label),
  };
}
