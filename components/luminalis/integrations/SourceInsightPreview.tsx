import Link from "next/link";
import type { LuminalisInsight } from "@/lib/luminalis/insights";

function excerpt(text: string, max = 160): string {
  const clean = text.trim();
  return clean.length > max ? `${clean.slice(0, max).trimEnd()} …` : clean;
}

/** Kleine Quellenkarte: zeigt, aus welcher Erkenntnis eine Integration stammt. */
export function SourceInsightPreview({
  insight,
}: {
  insight: LuminalisInsight;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        Erkenntnis{insight.pillar ? ` · ${insight.pillar}` : ""}
      </p>
      <p className="mt-2 font-serif text-lg font-light text-white">
        {insight.title?.trim() || "Unbenannte Erkenntnis"}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-slate-300/80">
        {excerpt(insight.insight)}
      </p>
      <Link
        href={`/luminalis/erkenntnisse/${insight.id}`}
        className="mt-3 inline-block text-xs uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold"
      >
        Zur Erkenntnis
      </Link>
    </div>
  );
}
