import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { IntegrationForm } from "@/components/luminalis/integrations/IntegrationForm";
import { IntegrationShell } from "@/components/luminalis/integrations/IntegrationShell";
import { SourceInsightPreview } from "@/components/luminalis/integrations/SourceInsightPreview";
import { getLuminalisInsightById } from "@/lib/luminalis/insights";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";
import { createIntegrationAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Neue Integration",
  description: "Gib einer Erkenntnis einen stimmigen nächsten Schritt.",
};

const SUBTITLE = "Gib einer Erkenntnis einen kleinen, stimmigen Schritt.";
const INTRO =
  "Du entscheidest, ob und wie eine Erkenntnis ins Leben kommt. Integration ist eine Einladung, kein Druck.";

export default async function NeueIntegrationPage({
  searchParams,
}: {
  searchParams: Promise<{ insight?: string }>;
}) {
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

  const { insight: insightParam } = await searchParams;
  const insightId = insightParam?.trim();
  const sourceInsight = insightId
    ? await getLuminalisInsightById(user.id, insightId)
    : null;

  return (
    <IntegrationShell title="Neue Integration" subtitle={SUBTITLE} intro={INTRO}>
      <div className="space-y-6">
        {sourceInsight && <SourceInsightPreview insight={sourceInsight} />}
        <IntegrationForm
          action={createIntegrationAction}
          insightId={sourceInsight?.id}
        />
      </div>
    </IntegrationShell>
  );
}
