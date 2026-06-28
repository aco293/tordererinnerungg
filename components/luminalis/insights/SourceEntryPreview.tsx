import Link from "next/link";
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

function excerpt(text: string, max = 160): string {
  const clean = text.trim();
  return clean.length > max ? `${clean.slice(0, max).trimEnd()} …` : clean;
}

/** Kleine Quellenkarte: zeigt, aus welchem Weg-Eintrag eine Erkenntnis stammt. */
export function SourceEntryPreview({ entry }: { entry: LuminalisEntry }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        Quelle · {formatDate(entry.created_at)}
      </p>
      <p className="mt-2 font-serif text-lg font-light text-white">
        {entry.title?.trim() || "Unbenannter Eintrag"}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-300/80">
        {excerpt(entry.content)}
      </p>
      <Link
        href={`/luminalis/dialog/${entry.id}`}
        className="mt-3 inline-block text-xs uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold"
      >
        Zum Eintrag
      </Link>
    </div>
  );
}
