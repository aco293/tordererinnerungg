import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { LuminalisSubnav } from "@/components/luminalis/LuminalisSubnav";
import { DeleteIntegrationButton } from "@/components/luminalis/integrations/DeleteIntegrationButton";
import { IntegrationStatusActions } from "@/components/luminalis/integrations/IntegrationStatusActions";
import { SourceInsightPreview } from "@/components/luminalis/integrations/SourceInsightPreview";
import { integrationStatusLabel } from "@/lib/luminalis/integrationStatus";
import { getLuminalisIntegrationById } from "@/lib/luminalis/integrations";
import { getLuminalisInsightById } from "@/lib/luminalis/insights";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Integration",
  description: "Eine deiner Integrationen.",
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

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-2 whitespace-pre-wrap text-base leading-relaxed text-slate-300/85">
        {value}
      </p>
    </div>
  );
}

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/anmelden?weiter=/luminalis/integration");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/integration");
  }

  const profile = await getLuminalisProfile(user.id);
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const integration = await getLuminalisIntegrationById(user.id, id);
  if (!integration) {
    notFound();
  }

  const sourceInsight = integration.insight_id
    ? await getLuminalisInsightById(user.id, integration.insight_id)
    : null;

  return (
    <Section className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-2xl animate-fade-up">
        <LuminalisSubnav />

        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em] text-slate-400">
            <span>{formatDate(integration.created_at)}</span>
            <span aria-hidden className="text-gold/40">
              •
            </span>
            <span className="text-violet-soft/80">
              {integrationStatusLabel(integration.status)}
            </span>
          </div>

          <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-white sm:text-5xl">
            {integration.title?.trim() || "Unbenannte Integration"}
          </h1>

          {integration.resonance_topics.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {integration.resonance_topics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300/80"
                >
                  {topic}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8 space-y-5">
            <Field label="Intention" value={integration.intention} />
            {integration.next_step && (
              <Field label="Nächster Schritt" value={integration.next_step} />
            )}
            {integration.rhythm && (
              <Field label="Rhythmus" value={integration.rhythm} />
            )}
            {integration.reflection && (
              <Field label="Reflexion" value={integration.reflection} />
            )}
          </div>

          <div className="mt-8">
            <IntegrationStatusActions
              integrationId={integration.id}
              current={integration.status}
            />
          </div>

          {sourceInsight && (
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-400">
                Entstanden aus
              </p>
              <SourceInsightPreview insight={sourceInsight} />
            </div>
          )}

          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
            <Button href="/luminalis/integration" variant="secondary">
              Zurück zu Integration
            </Button>
            <Button href={`/luminalis/integration/${integration.id}/bearbeiten`}>
              Integration bearbeiten
            </Button>
            <DeleteIntegrationButton integrationId={integration.id} />
          </div>
        </div>
      </div>
    </Section>
  );
}
