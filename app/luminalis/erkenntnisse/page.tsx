import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { InsightEmptyState } from "@/components/luminalis/insights/InsightEmptyState";
import { InsightFilters } from "@/components/luminalis/insights/InsightFilters";
import { InsightList } from "@/components/luminalis/insights/InsightList";
import { InsightShell } from "@/components/luminalis/insights/InsightShell";
import { getLuminalisInsightsFiltered } from "@/lib/luminalis/insights";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Erkenntnisse",
  description: "Verdichte, was auf deinem Weg sichtbar geworden ist.",
};

const SUBTITLE = "Verdichte, was auf deinem Weg sichtbar geworden ist.";
const INTRO =
  "Erkenntnisse entstehen nicht durch automatische Deutung. Sie entstehen, wenn du selbst spürst: Das möchte ich nicht wieder verlieren.";

type SearchParams = {
  pillar?: string;
  topic?: string;
  search?: string;
  pinned?: string;
};

export default async function ErkenntnissePage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <InsightShell title="Erkenntnisse" subtitle={SUBTITLE} intro={INTRO}>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center backdrop-blur-sm">
          <p className="text-base leading-relaxed text-slate-300/85">
            Der persönliche Bereich wird gerade vorbereitet und ist noch nicht
            verfügbar. Bitte schau bald wieder vorbei.
          </p>
        </div>
      </InsightShell>
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/erkenntnisse");
  }

  const profile = await getLuminalisProfile(user.id);
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const params = await searchParams;
  const filters = {
    pillar: params.pillar?.trim() || undefined,
    topic: params.topic?.trim() || undefined,
    search: params.search?.trim() || undefined,
    pinnedOnly: Boolean(params.pinned),
  };
  const hasFilters = Boolean(
    filters.pillar || filters.topic || filters.search || filters.pinnedOnly,
  );

  const insights = await getLuminalisInsightsFiltered(user.id, {
    ...filters,
    limit: 30,
  });

  return (
    <InsightShell title="Erkenntnisse" subtitle={SUBTITLE} intro={INTRO}>
      {!hasFilters && insights.length === 0 ? (
        <InsightEmptyState />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button href="/luminalis/erkenntnisse/neu">
              Neue Erkenntnis
            </Button>
          </div>

          <InsightFilters
            values={{
              pillar: filters.pillar,
              topic: filters.topic,
              search: filters.search,
              pinned: params.pinned,
            }}
          />

          <InsightList
            insights={insights}
            emptyMessage={
              hasFilters
                ? "Keine Erkenntnisse passen zu diesem Filter. Passe die Auswahl an oder setze die Filter zurück."
                : "Noch keine Erkenntnisse gespeichert."
            }
          />
        </div>
      )}
    </InsightShell>
  );
}
