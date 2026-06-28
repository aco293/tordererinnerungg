/**
 * Serverseitige Helfer für Luminalis-Weg-Einträge.
 *
 * Nutzt den anonymen Supabase-Client über die Nutzer-Session; Row Level
 * Security stellt sicher, dass jeder nur seine eigenen Einträge sieht.
 * Kein Service-Role-Key, keine Secrets. Nur serverseitig verwenden.
 */

import { createClient } from "@/lib/supabase/server";

export type LuminalisEntry = {
  id: string;
  user_id: string;
  entry_type: string;
  pillar: string | null;
  mode: string | null;
  title: string | null;
  content: string;
  resonance_topics: string[];
  created_at: string;
  updated_at: string;
};

export type LuminalisEntryInput = {
  entry_type?: string;
  pillar?: string | null;
  mode?: string | null;
  title?: string | null;
  content: string;
  resonance_topics?: string[];
};

/** Die jüngsten Einträge eines Nutzers (neueste zuerst). */
export async function getRecentLuminalisEntries(
  userId: string,
  limit = 10,
): Promise<LuminalisEntry[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_entries")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as LuminalisEntry[] | null) ?? [];
}

export type LuminalisEntryFilters = {
  pillar?: string;
  mode?: string;
  topic?: string;
  search?: string;
  limit?: number;
};

/** Gefilterte Einträge des Nutzers (neueste zuerst). */
export async function getLuminalisEntriesFiltered(
  userId: string,
  filters: LuminalisEntryFilters = {},
): Promise<LuminalisEntry[]> {
  const supabase = await createClient();
  let query = supabase
    .from("luminalis_entries")
    .select("*")
    .eq("user_id", userId);

  const pillar = filters.pillar?.trim();
  const mode = filters.mode?.trim();
  const topic = filters.topic?.trim();
  const search = filters.search?.trim();

  if (pillar) query = query.eq("pillar", pillar);
  if (mode) query = query.eq("mode", mode);
  if (topic) query = query.contains("resonance_topics", [topic]);
  if (search) {
    // Suche in Titel und Inhalt; Sonderzeichen für ilike-Muster entschärfen.
    const safe = search.replace(/[%,()]/g, " ");
    query = query.or(`title.ilike.%${safe}%,content.ilike.%${safe}%`);
  }

  const { data } = await query
    .order("created_at", { ascending: false })
    .limit(filters.limit ?? 20);

  return (data as LuminalisEntry[] | null) ?? [];
}

/** Einzelnen Eintrag laden – nur wenn er dem Nutzer gehört, sonst null. */
export async function getLuminalisEntryById(
  userId: string,
  entryId: string,
): Promise<LuminalisEntry | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_entries")
    .select("*")
    .eq("id", entryId)
    .eq("user_id", userId)
    .maybeSingle();
  return (data as LuminalisEntry | null) ?? null;
}

/** Neuen Eintrag anlegen. */
export async function createLuminalisEntry(
  userId: string,
  input: LuminalisEntryInput,
): Promise<{ data: LuminalisEntry | null; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("luminalis_entries")
    .insert({
      user_id: userId,
      entry_type: input.entry_type ?? "dialog",
      pillar: input.pillar ?? null,
      mode: input.mode ?? null,
      title: input.title ?? null,
      content: input.content,
      resonance_topics: input.resonance_topics ?? [],
    })
    .select()
    .maybeSingle();

  return {
    data: (data as LuminalisEntry | null) ?? null,
    error: error?.message ?? null,
  };
}

/** Eigenen Eintrag aktualisieren – nur wenn er dem Nutzer gehört. */
export async function updateLuminalisEntry(
  userId: string,
  entryId: string,
  input: LuminalisEntryInput,
): Promise<{ data: LuminalisEntry | null; error: string | null }> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("luminalis_entries")
    .update({
      pillar: input.pillar ?? null,
      mode: input.mode ?? null,
      title: input.title ?? null,
      content: input.content,
      resonance_topics: input.resonance_topics ?? [],
    })
    .eq("id", entryId)
    .eq("user_id", userId)
    .select()
    .maybeSingle();

  return {
    data: (data as LuminalisEntry | null) ?? null,
    error: error?.message ?? null,
  };
}

/** Eigenen Eintrag löschen (RLS erzwingt Eigentümerschaft zusätzlich). */
export async function deleteLuminalisEntry(
  userId: string,
  entryId: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("luminalis_entries")
    .delete()
    .eq("id", entryId)
    .eq("user_id", userId);

  return { error: error?.message ?? null };
}
