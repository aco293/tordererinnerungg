"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  deleteLuminalisIntegration,
  updateLuminalisIntegrationStatus,
} from "@/lib/luminalis/integrations";
import { getCurrentUser } from "@/lib/luminalis/profile";

function configured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Integration löschen – danach zurück zur Übersicht. */
export async function deleteIntegrationAction(formData: FormData) {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/integration");
  }

  const integrationId = String(formData.get("integration_id") ?? "").trim();
  if (integrationId) {
    await deleteLuminalisIntegration(user.id, integrationId);
  }

  revalidatePath("/luminalis/integration");
  redirect("/luminalis/integration");
}

/** Status ruhig ändern – bleibt auf der aktuellen Seite. */
export async function setIntegrationStatusAction(formData: FormData) {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/integration");
  }

  const integrationId = String(formData.get("integration_id") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const allowed = ["open", "in_motion", "integrated", "released"];

  if (integrationId && allowed.includes(status)) {
    await updateLuminalisIntegrationStatus(user.id, integrationId, status);
    revalidatePath("/luminalis/integration");
    revalidatePath(`/luminalis/integration/${integrationId}`);
  }
}
