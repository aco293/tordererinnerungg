import { deleteDialogEntry } from "@/app/luminalis/dialog/actions";
import type { LuminalisEntry } from "@/lib/luminalis/entries";

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

function excerpt(text: string, max = 180): string {
  const clean = text.trim();
  return clean.length > max ? `${clean.slice(0, max).trimEnd()} …` : clean;
}

export function RecentEntries({ entries }: { entries: LuminalisEntry[] }) {
  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <p className="text-sm leading-relaxed text-slate-400/85">
          Noch keine Einträge. Dein erster Eintrag beginnt deinen Weg im
          Dialograum.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {entries.map((entry) => (
        <li
          key={entry.id}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
        >
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

          <h3 className="mt-3 font-serif text-xl font-light text-white">
            {entry.title?.trim() || "Unbenannter Eintrag"}
          </h3>

          <p className="mt-2 text-sm leading-relaxed text-slate-300/80">
            {excerpt(entry.content)}
          </p>

          {entry.resonance_topics.length > 0 && (
            <ul className="mt-4 flex flex-wrap gap-2">
              {entry.resonance_topics.map((topic) => (
                <li
                  key={topic}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300/75"
                >
                  {topic}
                </li>
              ))}
            </ul>
          )}

          <form action={deleteDialogEntry} className="mt-5">
            <input type="hidden" name="entry_id" value={entry.id} />
            <button
              type="submit"
              className="text-xs uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-rose-300/80"
            >
              Eintrag löschen
            </button>
          </form>
        </li>
      ))}
    </ul>
  );
}
