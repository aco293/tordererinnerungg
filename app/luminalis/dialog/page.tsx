import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { DialogEntryForm } from "@/components/luminalis/dialog/DialogEntryForm";
import { DialogFilters } from "@/components/luminalis/dialog/DialogFilters";
import { DialogShell } from "@/components/luminalis/dialog/DialogShell";
import { RecentEntries } from "@/components/luminalis/dialog/RecentEntries";
import { getLuminalisEntriesFiltered } from "@/lib/luminalis/entries";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";
import { createDialogEntry } from "./actions";

type SearchParams = {
  pillar?: string;
  mode?: string;
  topic?: string;
  search?: string;
};

export const metadata: Metadata = {
  title: "Dialograum",
  description:
    "Ein ruhiger Raum, um wahrzunehmen, was gerade in dir präsent ist.",
};

const SUBTITLE =
  "Ein ruhiger Raum, um wahrzunehmen, was gerade in dir präsent ist.";
const INTRO =
  "Luminalis antwortet hier noch nicht als KI. Dieser Raum sammelt deine eigenen Worte, damit Verbindung, Erinnerung und Resonanz mit der Zeit sichtbar werden können.";

export default async function DialogPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // Ohne Supabase-Konfiguration: ruhige Hinweisseite, kein Crash.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return (
      <DialogShell title="Dialograum" subtitle={SUBTITLE} intro={INTRO}>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 text-center backdrop-blur-sm">
          <p className="text-base leading-relaxed text-slate-300/85">
            Der persönliche Bereich wird gerade vorbereitet und ist noch nicht
            verfügbar. Bitte schau bald wieder vorbei.
          </p>
        </div>
      </DialogShell>
    );
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/dialog");
  }

  const profile = await getLuminalisProfile(user.id);
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const params = await searchParams;
  const filters = {
    pillar: params.pillar?.trim() || undefined,
    mode: params.mode?.trim() || undefined,
    topic: params.topic?.trim() || undefined,
    search: params.search?.trim() || undefined,
  };
  const hasFilters = Boolean(
    filters.pillar || filters.mode || filters.topic || filters.search,
  );

  const entries = await getLuminalisEntriesFiltered(user.id, {
    ...filters,
    limit: 20,
  });

  return (
    <DialogShell title="Dialograum" subtitle={SUBTITLE} intro={INTRO}>
      <DialogEntryForm action={createDialogEntry} />

      <div className="mt-16">
        <h2 className="font-serif text-2xl font-light text-white">
          Letzte Weg-Einträge
        </h2>

        <div className="mt-6">
          <DialogFilters values={filters} />
        </div>

        <div className="mt-6">
          <RecentEntries
            entries={entries}
            emptyMessage={
              hasFilters
                ? "Keine Einträge passen zu diesem Filter. Passe die Auswahl an oder setze die Filter zurück."
                : "Noch keine Einträge. Dein erster Eintrag beginnt deinen Weg im Dialograum."
            }
          />
        </div>
      </div>
    </DialogShell>
  );
}
