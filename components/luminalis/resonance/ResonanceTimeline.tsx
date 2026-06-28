import type { LuminalisEntry } from "@/lib/luminalis/entries";

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function excerpt(text: string, max = 140): string {
  const clean = text.trim();
  return clean.length > max ? `${clean.slice(0, max).trimEnd()} …` : clean;
}

export function ResonanceTimeline({
  entries,
}: {
  entries: LuminalisEntry[];
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
      <h3 className="font-serif text-xl font-light text-white">Verlauf</h3>

      <ol className="mt-5 space-y-5 border-l border-white/10 pl-5">
        {entries.map((entry) => (
          <li key={entry.id} className="relative">
            <span
              aria-hidden
              className="absolute -left-[1.45rem] top-1.5 h-2 w-2 rounded-full bg-gold/60"
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em] text-slate-400">
              <span>{formatDate(entry.created_at)}</span>
              {entry.pillar && (
                <>
                  <span aria-hidden className="text-gold/40">
                    •
                  </span>
                  <span className="text-violet-soft/80">{entry.pillar}</span>
                </>
              )}
              {entry.mode && (
                <>
                  <span aria-hidden className="text-gold/40">
                    •
                  </span>
                  <span>{entry.mode}</span>
                </>
              )}
            </div>
            <p className="mt-2 font-serif text-lg font-light text-white">
              {entry.title?.trim() || "Unbenannter Eintrag"}
            </p>
            <p className="mt-1 text-sm leading-relaxed text-slate-300/80">
              {excerpt(entry.content)}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
