import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { LuminalisSubnav } from "@/components/luminalis/LuminalisSubnav";
import { DeleteInsightButton } from "@/components/luminalis/insights/DeleteInsightButton";
import { PinInsightButton } from "@/components/luminalis/insights/PinInsightButton";
import { SourceEntryPreview } from "@/components/luminalis/insights/SourceEntryPreview";
import { getLuminalisEntryById } from "@/lib/luminalis/entries";
import { getLuminalisInsightById } from "@/lib/luminalis/insights";
import { getIntegrationsForInsight } from "@/lib/luminalis/integrations";
import { integrationStatusLabel } from "@/lib/luminalis/integrationStatus";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Erkenntnis",
  description: "Eine deiner bewahrten Erkenntnisse.",
};

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/anmelden?weiter=/luminalis/erkenntnisse");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/erkenntnisse");
  }

  const profile = await getLuminalisProfile(user.id);
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const insight = await getLuminalisInsightById(user.id, id);
  if (!insight) {
    notFound();
  }

  const sourceEntry = insight.source_entry_id
    ? await getLuminalisEntryById(user.id, insight.source_entry_id)
    : null;

  const integrations = await getIntegrationsForInsight(user.id, insight.id);

  return (
    <Section className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-2xl animate-fade-up">
        <LuminalisSubnav />

        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em] text-slate-400">
            <span>{formatDate(insight.created_at)}</span>
            {insight.pillar && (
              <>
                <span aria-hidden className="text-gold/40">
                  •
                </span>
                <span className="text-violet-soft/80">{insight.pillar}</span>
              </>
            )}
            {insight.pinned && (
              <>
                <span aria-hidden className="text-gold/40">
                  •
                </span>
                <span className="text-gold-soft">Markiert</span>
              </>
            )}
          </div>

          <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-white sm:text-5xl">
            {insight.title?.trim() || "Unbenannte Erkenntnis"}
          </h1>

          {insight.resonance_topics.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {insight.resonance_topics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300/80"
                >
                  {topic}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 whitespace-pre-wrap text-lg leading-relaxed text-slate-300/85">
            {insight.insight}
          </div>

          {insight.integration_question && (
            <div className="mt-8 rounded-2xl border border-violet-glow/20 bg-violet-deep/10 p-5">
              <p className="text-xs uppercase tracking-[0.2em] text-violet-soft/70">
                Integrationsfrage
              </p>
              <p className="mt-2 font-serif text-lg font-light italic text-violet-soft">
                {insight.integration_question}
              </p>
            </div>
          )}

          {sourceEntry && (
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                Entstanden aus
              </p>
              <SourceEntryPreview entry={sourceEntry} />
            </div>
          )}

          <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-gold/70">
              Integration
            </p>
            <p className="mt-2 text-base leading-relaxed text-slate-300/80">
              Möchtest du dieser Erkenntnis einen kleinen, stimmigen Schritt
              geben? Nicht als Aufgabe, sondern als Einladung zur Verkörperung.
            </p>
            <div className="mt-5">
              <Button href={`/luminalis/integration/neu?insight=${insight.id}`}>
                Aus dieser Erkenntnis Integration beginnen
              </Button>
            </div>

            {integrations.length > 0 && (
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                  Integrationen aus dieser Erkenntnis
                </p>
                <ul className="mt-3 space-y-2">
                  {integrations.map((integration) => (
                    <li key={integration.id}>
                      <Link
                        href={`/luminalis/integration/${integration.id}`}
                        className="block rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/20"
                      >
                        <span className="flex items-center justify-between gap-3">
                          <span className="text-sm text-white">
                            {integration.title?.trim() ||
                              "Unbenannte Integration"}
                          </span>
                          <span className="shrink-0 text-[0.65rem] uppercase tracking-[0.2em] text-violet-soft/80">
                            {integrationStatusLabel(integration.status)}
                          </span>
                        </span>
                        <span className="mt-1 block text-xs leading-relaxed text-slate-400">
                          {integration.intention.trim().slice(0, 120)}
                          {integration.intention.trim().length > 120
                            ? " …"
                            : ""}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
            <Button href="/luminalis/erkenntnisse" variant="secondary">
              Zurück zu Erkenntnisse
            </Button>
            <Button href={`/luminalis/erkenntnisse/${insight.id}/bearbeiten`}>
              Erkenntnis bearbeiten
            </Button>
            <PinInsightButton insightId={insight.id} pinned={insight.pinned} />
            <DeleteInsightButton insightId={insight.id} />
          </div>
        </div>
      </div>
    </Section>
  );
}
