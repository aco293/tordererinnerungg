import type { ResonanceOverview } from "@/lib/luminalis/resonance";

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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-serif text-lg font-light text-white">{value}</p>
    </div>
  );
}

export function ResonanceSummary({
  overview,
}: {
  overview: ResonanceOverview;
}) {
  const { activePillar, activeMode } = overview;

  // Behutsame, beobachtende Formulierung – keine Bewertung, keine Diagnose.
  let reflection: string;
  if (activePillar && activeMode) {
    reflection = `In deinen bisherigen Weg-Einträgen erscheint besonders häufig die Säule ${activePillar}. Der häufigste Modus ist ${activeMode}. Das ist keine Bewertung, sondern eine Einladung zur Beobachtung.`;
  } else if (activePillar) {
    reflection = `In deinen bisherigen Weg-Einträgen erscheint besonders häufig die Säule ${activePillar}. Das ist keine Bewertung, sondern eine Einladung zur Beobachtung.`;
  } else if (activeMode) {
    reflection = `In deinen bisherigen Weg-Einträgen erscheint besonders häufig der Modus ${activeMode}. Das ist keine Bewertung, sondern eine Einladung zur Beobachtung.`;
  } else {
    reflection =
      "In deinen bisherigen Weg-Einträgen zeichnet sich noch kein klares Muster ab. Das ist keine Bewertung, sondern eine Einladung zur Beobachtung.";
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
      <p className="font-serif text-lg font-light leading-relaxed text-slate-200">
        {reflection}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <Stat label="Einträge gesamt" value={String(overview.totalEntries)} />
        <Stat
          label="Letzte 30 Tage"
          value={String(overview.entriesLast30Days)}
        />
        <Stat
          label="Häufigste Säule"
          value={activePillar ?? "–"}
        />
        <Stat label="Häufigster Modus" value={activeMode ?? "–"} />
      </div>

      {overview.lastEntryAt && (
        <p className="mt-5 text-xs uppercase tracking-[0.2em] text-slate-500">
          Letzte Aktivität: {formatDate(overview.lastEntryAt)}
        </p>
      )}
    </div>
  );
}
