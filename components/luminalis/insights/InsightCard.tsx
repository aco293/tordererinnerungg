import Link from "next/link";
import type { LuminalisInsight } from "@/lib/luminalis/insights";

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

export function InsightCard({ insight }: { insight: LuminalisInsight }) {
  return (
    <li
      className={`rounded-2xl border bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-white/20 ${
        insight.pinned ? "border-gold/40 bg-gold/[0.04]" : "border-white/10"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em] text-slate-400">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{formatDate(insight.created_at)}</span>
          {insight.pillar && (
            <>
              <span aria-hidden className="text-gold/40">
                •
              </span>
              <span className="text-violet-soft/80">{insight.pillar}</span>
            </>
          )}
        </span>
        {insight.pinned && (
          <span className="rounded-full border border-gold/40 px-3 py-1 text-[0.65rem] text-gold-soft">
            Markiert
          </span>
        )}
      </div>

      <h3 className="mt-3 font-serif text-xl font-light">
        <Link
          href={`/luminalis/erkenntnisse/${insight.id}`}
          className="text-white transition-colors hover:text-gold-soft"
        >
          {insight.title?.trim() || "Unbenannte Erkenntnis"}
        </Link>
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-300/80">
        {excerpt(insight.insight)}
      </p>

      {insight.resonance_topics.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {insight.resonance_topics.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300/75"
            >
              {topic}
            </li>
          ))}
        </ul>
      )}

      <Link
        href={`/luminalis/erkenntnisse/${insight.id}`}
        className="mt-5 inline-block text-xs uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold"
      >
        Erkenntnis öffnen
      </Link>
    </li>
  );
}
