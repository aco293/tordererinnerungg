import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { InsightForm } from "@/components/luminalis/insights/InsightForm";
import { InsightShell } from "@/components/luminalis/insights/InsightShell";
import { SourceEntryPreview } from "@/components/luminalis/insights/SourceEntryPreview";
import { getLuminalisEntryById } from "@/lib/luminalis/entries";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";
import { createInsightAction } from "./actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Neue Erkenntnis",
  description: "Bewahre eine Erkenntnis aus deinem Weg.",
};

const SUBTITLE = "Bewahre, was für dich bedeutsam geworden ist.";
const INTRO =
  "Du entscheidest, was eine Erkenntnis ist. Luminalis deutet nicht – es bewahrt, was du mitnehmen möchtest.";

export default async function NeueErkenntnisPage({
  searchParams,
}: {
  searchParams: Promise<{ entry?: string }>;
}) {
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

  const { entry: entryParam } = await searchParams;
  const entryId = entryParam?.trim();
  const sourceEntry = entryId
    ? await getLuminalisEntryById(user.id, entryId)
    : null;

  return (
    <InsightShell title="Neue Erkenntnis" subtitle={SUBTITLE} intro={INTRO}>
      <div className="space-y-6">
        {sourceEntry && <SourceEntryPreview entry={sourceEntry} />}
        <InsightForm
          action={createInsightAction}
          sourceEntryId={sourceEntry?.id}
        />
      </div>
    </InsightShell>
  );
}
