import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AiDisabledNotice } from "@/components/luminalis/chat/AiDisabledNotice";
import { FrequencyIntelligenceShell } from "@/components/luminalis/frequency-intelligence/FrequencyIntelligenceShell";
import { FrequencyReflectionList } from "@/components/luminalis/frequency-intelligence/FrequencyReflectionList";
import { GenerateReflectionButton } from "@/components/luminalis/frequency-intelligence/GenerateReflectionButton";
import { getRecentFrequencyReflections } from "@/lib/luminalis/ai/frequencyIntelligence";
import { getAiConfigStatus } from "@/lib/luminalis/ai/config";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Frequenzintelligenz",
  description: "Ein behutsamer Spiegel aus deinen eigenen Wegspuren.",
};

const SUBTITLE = "Ein behutsamer Spiegel aus deinen eigenen Wegspuren.";
const INTRO =
  "Die Frequenzintelligenz deutet dich nicht. Sie verbindet deine eigenen Einträge, Erkenntnisse und Integrationen zu einem vorsichtigen Spiegel.";

export default async function FrequenzintelligenzPage() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/anmelden?weiter=/luminalis/frequenzintelligenz");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/frequenzintelligenz");
  }

  const profile = await getLuminalisProfile(user.id);
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const aiStatus = getAiConfigStatus();
  if (!aiStatus.enabled) {
    return (
      <FrequencyIntelligenceShell
        title="Frequenzintelligenz"
        subtitle={SUBTITLE}
        intro={INTRO}
      >
        <AiDisabledNotice status={aiStatus} />
      </FrequencyIntelligenceShell>
    );
  }

  const reflections = await getRecentFrequencyReflections(user.id, 10);

  return (
    <FrequencyIntelligenceShell
      title="Frequenzintelligenz"
      subtitle={SUBTITLE}
      intro={INTRO}
    >
      <div className="space-y-10">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
          <p className="text-base leading-relaxed text-slate-300/80">
            Wenn du möchtest, erzeugt Luminalis aus deinen gespeicherten Daten
            eine behutsame Reflexion. Sie entsteht nur, wenn du es hier
            ausdrücklich auslöst.
          </p>
          <div className="mt-6">
            <GenerateReflectionButton />
          </div>
          <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-500">
            Diese Reflexion ist keine Diagnose und keine endgültige Aussage. Sie
            basiert auf deinen gespeicherten Luminalis-Daten.
          </p>
        </div>

        <div>
          <h2 className="mb-5 font-serif text-xl font-light text-white">
            Deine Reflexionen
          </h2>
          <FrequencyReflectionList reflections={reflections} />
        </div>
      </div>
    </FrequencyIntelligenceShell>
  );
}
