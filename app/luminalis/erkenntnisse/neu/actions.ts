"use server";

import { redirect } from "next/navigation";
import { createLuminalisInsight } from "@/lib/luminalis/insights";
import { getCurrentUser } from "@/lib/luminalis/profile";

export type InsightFormState = { error: string | null };

function configured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

function parseList(value: FormDataEntryValue | null): string[] {
  return String(value ?? "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

export async function createInsightAction(
  _prevState: InsightFormState,
  formData: FormData,
): Promise<InsightFormState> {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/erkenntnisse");
  }

  const insight = String(formData.get("insight") ?? "").trim();
  if (!insight) {
    return { error: "Bitte halte zuerst deine Erkenntnis fest." };
  }

  const sourceEntryId = String(formData.get("source_entry_id") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const pillar = String(formData.get("pillar") ?? "").trim();
  const integration = String(formData.get("integration_question") ?? "").trim();

  const { data, error } = await createLuminalisInsight(user.id, {
    source_entry_id: sourceEntryId || null,
    pillar: pillar || null,
    title: title || null,
    insight,
    integration_question: integration || null,
    resonance_topics: parseList(formData.get("resonance_topics")),
    pinned: formData.get("pinned") === "1",
  });

  if (error || !data) {
    return {
      error:
        "Die Erkenntnis konnte nicht gespeichert werden. Bitte versuche es erneut.",
    };
  }

  redirect(`/luminalis/erkenntnisse/${data.id}`);
}
