import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ResonanceCounts } from "@/components/luminalis/resonance/ResonanceCounts";
import { ResonanceEmptyState } from "@/components/luminalis/resonance/ResonanceEmptyState";
import { ResonanceShell } from "@/components/luminalis/resonance/ResonanceShell";
import { ResonanceSummary } from "@/components/luminalis/resonance/ResonanceSummary";
import { ResonanceTimeline } from "@/components/luminalis/resonance/ResonanceTimeline";
import { ResonanceTopicCloud } from "@/components/luminalis/resonance/ResonanceTopicCloud";
import { getRecentLuminalisEntries } from "@/lib/luminalis/entries";
import { getRecentLuminalisInsights } from "@/lib/luminalis/insights";
import { getRecentLuminalisIntegrations } from "@/lib/luminalis/integrations";
import { integrationStatusLabel } from "@/lib/luminalis/integrationStatus";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";
import { getResonanceOverview } from "@/lib/luminalis/resonance";

export const metadata: Metadata = {
  title: "Frequenzspiegel",
  description: "Ein erster Spiegel deiner eigenen Weg-Einträge.",
};

const SUBTITLE = "Ein erster Spiegel deiner eigenen Weg-Einträge.";
const INTRO =
  "Der Frequenzspiegel deutet dich nicht. Er zeigt nur behutsam, welche Säulen, Modi und Themen in deinen eigenen Einträgen wiederkehren.";

export const dynamic = "force-dynamic";

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

  const [overview, recentEntries, recentInsights, recentIntegrations] =
    await Promise.all([
      getResonanceOverview(user.id),
      getRecentLuminalisEntries(user.id, 10),
      getRecentLuminalisInsights(user.id, 3),
      getRecentLuminalisIntegrations(user.id, 3),
    ]);

  return (
    <ResonanceShell title="Frequenzspiegel" subtitle={SUBTITLE} intro={INTRO}>
      <div className="mb-6 rounded-2xl border border-violet-glow/20 bg-violet-deep/10 p-6 backdrop-blur-sm">
        <h3 className="font-serif text-xl font-light text-white">
          Frequenzintelligenz
        </h3>
        <p className="mt-2 text-base leading-relaxed text-slate-300/80">
          Erzeuge eine behutsame Reflexion aus deinen eigenen Wegspuren.
        </p>
        <div className="mt-5">
          <Link
            href="/luminalis/frequenzintelligenz"
            className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/5 px-6 py-2.5 text-sm font-medium text-gold-soft transition-colors hover:border-gold/70 hover:bg-gold/10"
          >
            Frequenzintelligenz öffnen
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

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

          {recentInsights.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-xl font-light text-white">
                  Verdichtete Erkenntnisse
                </h3>
                <Link
                  href="/luminalis/erkenntnisse"
                  className="text-xs uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold"
                >
                  Alle ansehen
                </Link>
              </div>
              <ul className="mt-4 space-y-3">
                {recentInsights.map((insight) => (
                  <li key={insight.id}>
                    <Link
                      href={`/luminalis/erkenntnisse/${insight.id}`}
                      className="block rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/20"
                    >
                      <span className="block text-sm text-white">
                        {insight.title?.trim() || "Unbenannte Erkenntnis"}
                      </span>
                      <span className="mt-1 block text-xs leading-relaxed text-slate-400">
                        {insight.insight.trim().slice(0, 120)}
                        {insight.insight.trim().length > 120 ? " …" : ""}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {recentIntegrations.length > 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-serif text-xl font-light text-white">
                  Aktuelle Integrationen
                </h3>
                <Link
                  href="/luminalis/integration"
                  className="text-xs uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold"
                >
                  Alle ansehen
                </Link>
              </div>
              <ul className="mt-4 space-y-3">
                {recentIntegrations.map((integration) => (
                  <li key={integration.id}>
                    <Link
                      href={`/luminalis/integration/${integration.id}`}
                      className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/20"
                    >
                      <span className="truncate text-sm text-white">
                        {integration.title?.trim() ||
                          "Unbenannte Integration"}
                      </span>
                      <span className="shrink-0 text-[0.65rem] uppercase tracking-[0.2em] text-violet-soft/80">
                        {integrationStatusLabel(integration.status)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <ResonanceTimeline entries={recentEntries} />
        </div>
      )}
    </ResonanceShell>
  );
}
