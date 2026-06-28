import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { LuminalisSubnav } from "@/components/luminalis/LuminalisSubnav";
import { DeleteEntryButton } from "@/components/luminalis/dialog/DeleteEntryButton";
import { getLuminalisEntryById } from "@/lib/luminalis/entries";
import { getInsightsForEntry } from "@/lib/luminalis/insights";
import { getCurrentUser, getLuminalisProfile } from "@/lib/luminalis/profile";

export const metadata: Metadata = {
  title: "Weg-Eintrag",
  description: "Ein einzelner Weg-Eintrag aus deinem Dialograum.",
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

export const dynamic = "force-dynamic";

export default async function EntryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    redirect("/anmelden?weiter=/luminalis/dialog");
  }

  const user = await getCurrentUser();
  if (!user) {
    redirect("/anmelden?weiter=/luminalis/dialog");
  }

  const profile = await getLuminalisProfile(user.id);
  if (!profile) {
    redirect("/luminalis/onboarding");
  }

  const entry = await getLuminalisEntryById(user.id, id);
  if (!entry) {
    notFound();
  }

  const insights = await getInsightsForEntry(user.id, entry.id);

  return (
    <Section className="pt-24 sm:pt-28">
      <div className="mx-auto max-w-2xl animate-fade-up">
        <LuminalisSubnav />

        <div className="mt-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em] text-slate-400">
            <span>{formatDate(entry.created_at)}</span>
            {entry.mode && (
              <>
                <span aria-hidden className="text-gold/40">
                  •
                </span>
                <span>{entry.mode}</span>
              </>
            )}
            {entry.pillar && (
              <>
                <span aria-hidden className="text-gold/40">
                  •
                </span>
                <span className="text-violet-soft/80">{entry.pillar}</span>
              </>
            )}
          </div>

          <h1 className="mt-4 font-serif text-4xl font-light leading-tight text-white sm:text-5xl">
            {entry.title?.trim() || "Unbenannter Eintrag"}
          </h1>

          {entry.resonance_topics.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {entry.resonance_topics.map((topic) => (
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
            {entry.content}
          </div>

          <div className="mt-10">
            <Button href={`/luminalis/erkenntnisse/neu?entry=${entry.id}`}>
              Aus diesem Eintrag Erkenntnis speichern
            </Button>
          </div>

          {insights.length > 0 && (
            <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <h2 className="font-serif text-xl font-light text-white">
                Erkenntnisse aus diesem Eintrag
              </h2>
              <ul className="mt-4 space-y-3">
                {insights.map((insight) => (
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

          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/10 pt-8">
            <Button href="/luminalis/dialog" variant="secondary">
              Zurück zum Dialograum
            </Button>
            <Button href={`/luminalis/dialog/${entry.id}/bearbeiten`}>
              Eintrag bearbeiten
            </Button>
            <DeleteEntryButton entryId={entry.id} />
          </div>
        </div>
      </div>
    </Section>
  );
}
