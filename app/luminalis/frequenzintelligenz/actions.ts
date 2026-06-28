"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getAiConfigStatus } from "@/lib/luminalis/ai/config";
import { generateFrequencyReflection } from "@/lib/luminalis/ai/frequencyIntelligence";
import { AI_DISABLED_MESSAGE } from "@/lib/luminalis/ai/types";
import { getCurrentUser } from "@/lib/luminalis/profile";

export type ReflectionActionState = { error: string | null; created: number };

function configured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

/** Frequenzreflexion auf ausdrücklichen Wunsch erzeugen. */
export async function generateReflectionAction(
  prevState: ReflectionActionState,
  _formData: FormData,
): Promise<ReflectionActionState> {
  if (!configured()) {
    redirect("/anmelden");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/frequenzintelligenz");
  }

  // Dieselbe AI-Statuslogik wie Page und Provider.
  if (!getAiConfigStatus().enabled) {
    return { error: AI_DISABLED_MESSAGE, created: prevState.created };
  }

  const result = await generateFrequencyReflection(user.id);

  if (!result.ok) {
    return { error: result.message, created: prevState.created };
  }

  revalidatePath("/luminalis/frequenzintelligenz");
  return { error: null, created: prevState.created + 1 };
}
