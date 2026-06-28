import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { IntegrationEmptyState } from "@/components/luminalis/integrations/IntegrationEmptyState";
import { IntegrationFilters } from "@/components/luminalis/integrations/IntegrationFilters";
import { IntegrationList } from "@/components/luminalis/integrations/IntegrationList";
import { IntegrationShell } from "@/components/luminalis/integrations/IntegrationShell";
import { getLuminalisIntegrationsFiltered } from "@/lib/luminalis/integrations";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Integration",
  description: "Bringe Erkenntnisse behutsam in dein Leben.",
};

const SUBTITLE = "Bringe Erkenntnisse behutsam in dein Leben.";
const INTRO =
  "Integration ist kein Druck und keine Aufgabe, die du erfüllen musst. Sie ist eine Einladung, einer Erkenntnis einen kleinen, stimmigen Schritt zu geben.";

type SearchParams = {
  status?: string;
  topic?: string;
  search?: string;
};

export default async function IntegrationPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <IntegrationShell title="Integration" subtitle={SUBTITLE} intro={INTRO}>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center backdrop-blur-sm">
          <p className="text-base leading-relaxed text-slate-300/85">
            Der persönliche Bereich wird gerade vorbereitet und ist noch nicht
            verfügbar. Bitte schau bald wieder vorbei.
          </p>
        </div>
      </IntegrationShell>
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/integration");
  }

  const profile = await getLuminalisProfile(user.id);
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const params = await searchParams;
  const filters = {
    status: params.status?.trim() || undefined,
    topic: params.topic?.trim() || undefined,
    search: params.search?.trim() || undefined,
  };
  const hasFilters = Boolean(
    filters.status || filters.topic || filters.search,
  );

  const integrations = await getLuminalisIntegrationsFiltered(user.id, {
    ...filters,
    limit: 30,
  });

  return (
    <IntegrationShell title="Integration" subtitle={SUBTITLE} intro={INTRO}>
      {!hasFilters && integrations.length === 0 ? (
        <IntegrationEmptyState />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button href="/luminalis/integration/neu">Neue Integration</Button>
          </div>

          <IntegrationFilters values={filters} />

          <IntegrationList
            integrations={integrations}
            emptyMessage={
              hasFilters
                ? "Keine Integrationen passen zu diesem Filter. Passe die Auswahl an oder setze die Filter zurück."
                : "Noch keine Integration begonnen."
            }
          />
        </div>
      )}
    </IntegrationShell>
  );
}
