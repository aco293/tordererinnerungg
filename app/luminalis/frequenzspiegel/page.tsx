import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { ResonanceCounts } from "@/components/luminalis/resonance/ResonanceCounts";
import { ResonanceEmptyState } from "@/components/luminalis/resonance/ResonanceEmptyState";
import { ResonanceShell } from "@/components/luminalis/resonance/ResonanceShell";
import { ResonanceSummary } from "@/components/luminalis/resonance/ResonanceSummary";
import { ResonanceTimeline } from "@/components/luminalis/resonance/ResonanceTimeline";
import { ResonanceTopicCloud } from "@/components/luminalis/resonance/ResonanceTopicCloud";
import { getRecentLuminalisEntries } from "@/lib/luminalis/entries";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";
import { getResonanceOverview } from "@/lib/luminalis/resonance";

export const metadata: Metadata = {
  title: "Frequenzspiegel",
  description: "Ein erster Spiegel deiner eigenen Weg-Einträge.",
};

const SUBTITLE = "Ein erster Spiegel deiner eigenen Weg-Einträge.";
const INTRO =
  "Der Frequenzspiegel deutet dich nicht. Er zeigt nur behutsam, welche Säulen, Modi und Themen in deinen eigenen Einträgen wiederkehren.";

export default async function FrequenzspiegelPage() {
  // Ohne Supabase-Konfiguration: ruhige Hinweisseite, kein Crash.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <ResonanceShell title="Frequenzspiegel" subtitle={SUBTITLE} intro={INTRO}>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center backdrop-blur-sm">
          <p className="text-base leading-relaxed text-slate-300/85">
            Der persönliche Bereich wird gerade vorbereitet und ist noch nicht
            verfügbar. Bitte schau bald wieder vorbei.
          </p>
        </div>
      </ResonanceShell>
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/frequenzspiegel");
  }

  const profile = await getLuminalisProfile(user.id);
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const [overview, recentEntries] = await Promise.all([
    getResonanceOverview(user.id),
    getRecentLuminalisEntries(user.id, 10),
  ]);

  return (
    <ResonanceShell title="Frequenzspiegel" subtitle={SUBTITLE} intro={INTRO}>
      {overview.totalEntries === 0 ? (
        <ResonanceEmptyState />
      ) : (
        <div className="space-y-6">
          <ResonanceSummary overview={overview} />

          <div className="grid gap-6 sm:grid-cols-2">
            <ResonanceCounts
              title="Säulen"
              description="Welche Säulen deine Einträge berühren."
              items={overview.pillarCounts}
              linkParam="pillar"
            />
            <ResonanceCounts
              title="Modi"
              description="In welchen Modi du geschrieben hast."
              items={overview.modeCounts}
              linkParam="mode"
            />
          </div>

          <ResonanceTopicCloud items={overview.topicCounts.slice(0, 12)} />

          <ResonanceTimeline entries={recentEntries} />
        </div>
      )}
    </ResonanceShell>
  );
}
