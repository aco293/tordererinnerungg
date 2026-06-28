"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  deleteLuminalisInsight,
  toggleLuminalisInsightPinned,
} from "@/lib/luminalis/insights";
import { getCurrentUser } from "@/lib/luminalis/profile";

function configured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Erkenntnis löschen – danach zurück zur Übersicht. */
export async function deleteInsightAction(formData: FormData) {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/erkenntnisse");
  }

  const insightId = String(formData.get("insight_id") ?? "").trim();
  if (insightId) {
    await deleteLuminalisInsight(user.id, insightId);
  }

  revalidatePath("/luminalis/erkenntnisse");
  redirect("/luminalis/erkenntnisse");
}

/** Markierung umschalten – bleibt auf der aktuellen Seite. */
export async function togglePinAction(formData: FormData) {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/erkenntnisse");
  }

  const insightId = String(formData.get("insight_id") ?? "").trim();
  const pinned = String(formData.get("pinned") ?? "") === "1";

  if (insightId) {
    await toggleLuminalisInsightPinned(user.id, insightId, pinned);
    revalidatePath("/luminalis/erkenntnisse");
    revalidatePath(`/luminalis/erkenntnisse/${insightId}`);
  }
}
