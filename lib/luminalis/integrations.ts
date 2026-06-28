/**
 * Serverseitige Helfer für Luminalis-Integrationen.
 *
 * Nutzt den anonymen Supabase-Client über die Nutzer-Session; Row Level
 * Security stellt sicher, dass jeder nur seine eigenen Integrationen sieht.
 * Kein Service-Role-Key. Nur serverseitig verwenden.
 */

import { createClient } from "@/lib/supabase/server";

export type LuminalisIntegration = {
  id: string;
  user_id: string;
  insight_id: string | null;
  title: string | null;
  intention: string;
  next_step: string | null;
  rhythm: string | null;
  status: string;
  reflection: string | null;
  resonance_topics: string[];
  created_at: string;
  updated_at: string;
  completed_at: string | null;
};

export type LuminalisIntegrationInput = {
  insight_id?: string | null;
  title?: string | null;
  intention: string;
  next_step?: string | null;
  rhythm?: string | null;
  status?: string;
  reflection?: string | null;
  resonance_topics?: string[];
};

export type LuminalisIntegrationFilters = {
  status?: string;
  topic?: string;
  search?: string;
  limit?: number;
};

/** completed_at nur setzen, wenn der Status "integrated" erreicht wird. */
function completedAtFor(status: string | undefined): string | null {
  return status === "integrated" ? new Date().toISOString() : null;
}

export async function getRecentLuminalisIntegrations(
  userId: string,
  limit = 10,
): Promise<LuminalisIntegration[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_integrations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);
  return (data as LuminalisIntegration[] | null) ?? [];
}

export async function getLuminalisIntegrationById(
  userId: string,
  integrationId: string,
): Promise<LuminalisIntegration | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_integrations")
    .select("*")
    .eq("id", integrationId)
    .eq("user_id", userId)
    .maybeSingle();
  return (data as LuminalisIntegration | null) ?? null;
}

export async function getLuminalisIntegrationsFiltered(
  userId: string,
  filters: LuminalisIntegrationFilters = {},
): Promise<LuminalisIntegration[]> {
  const supabase = await createClient();
  let query = supabase
    .from("luminalis_integrations")
    .select("*")
    .eq("user_id", userId);

  const status = filters.status?.trim();
  const topic = filters.topic?.trim();
  const search = filters.search?.trim();

  if (status) query = query.eq("status", status);
  if (topic) query = query.contains("resonance_topics", [topic]);
  if (search) {
    const safe = search.replace(/[%,*()]/g, " ").trim();
    if (safe) {
      query = query.or(`title.ilike.%${safe}%,intention.ilike.%${safe}%`);
    }
  }

  const { data } = await query
    .order("created_at", { ascending: false })
    .limit(filters.limit ?? 30);

  return (data as LuminalisIntegration[] | null) ?? [];
}

export async function getIntegrationsForInsight(
  userId: string,
  insightId: string,
): Promise<LuminalisIntegration[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("luminalis_integrations")
    .select("*")
    .eq("user_id", userId)
    .eq("insight_id", insightId)
    .order("created_at", { ascending: false });
  return (data as LuminalisIntegration[] | null) ?? [];
}

export async function createLuminalisIntegration(
  userId: string,
  input: LuminalisIntegrationInput,
): Promise<{ data: LuminalisIntegration | null; error: string | null }> {
  const supabase = await createClient();
  const status = input.status ?? "open";
  const { data, error } = await supabase
    .from("luminalis_integrations")
    .insert({
      user_id: userId,
      insight_id: input.insight_id ?? null,
      title: input.title ?? null,
      intention: input.intention,
      next_step: input.next_step ?? null,
      rhythm: input.rhythm ?? null,
      status,
      reflection: input.reflection ?? null,
      resonance_topics: input.resonance_topics ?? [],
      completed_at: completedAtFor(status),
    })
    .select()
    .maybeSingle();

  return {
    data: (data as LuminalisIntegration | null) ?? null,
    error: error?.message ?? null,
  };
}

export async function updateLuminalisIntegration(
  userId: string,
  integrationId: string,
  input: LuminalisIntegrationInput,
): Promise<{ data: LuminalisIntegration | null; error: string | null }> {
  const supabase = await createClient();
  const status = input.status ?? "open";
  const { data, error } = await supabase
    .from("luminalis_integrations")
    .update({
      insight_id: input.insight_id ?? null,
      title: input.title ?? null,
      intention: input.intention,
      next_step: input.next_step ?? null,
      rhythm: input.rhythm ?? null,
      status,
      reflection: input.reflection ?? null,
      resonance_topics: input.resonance_topics ?? [],
      completed_at: completedAtFor(status),
    })
    .eq("id", integrationId)
    .eq("user_id", userId)
    .select()
    .maybeSingle();

  return {
    data: (data as LuminalisIntegration | null) ?? null,
    error: error?.message ?? null,
  };
}

export async function deleteLuminalisIntegration(
  userId: string,
  integrationId: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("luminalis_integrations")
    .delete()
    .eq("id", integrationId)
    .eq("user_id", userId);
  return { error: error?.message ?? null };
}

export async function updateLuminalisIntegrationStatus(
  userId: string,
  integrationId: string,
  status: string,
): Promise<{ error: string | null }> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("luminalis_integrations")
    .update({ status, completed_at: completedAtFor(status) })
    .eq("id", integrationId)
    .eq("user_id", userId);
  return { error: error?.message ?? null };
}

/** Anzahl Integrationen gesamt und je relevantem Status. */
export async function getLuminalisIntegrationCounts(
  userId: string,
): Promise<{ total: number; inMotion: number; integrated: number }> {
  const supabase = await createClient();
  const [{ count: total }, { count: inMotion }, { count: integrated }] =
    await Promise.all([
      supabase
        .from("luminalis_integrations")
        .select("*", { head: true, count: "exact" })
        .eq("user_id", userId),
      supabase
        .from("luminalis_integrations")
        .select("*", { head: true, count: "exact" })
        .eq("user_id", userId)
        .eq("status", "in_motion"),
      supabase
        .from("luminalis_integrations")
        .select("*", { head: true, count: "exact" })
        .eq("user_id", userId)
        .eq("status", "integrated"),
    ]);
  return {
    total: total ?? 0,
    inMotion: inMotion ?? 0,
    integrated: integrated ?? 0,
  };
}
