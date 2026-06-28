import { InsightCard } from "@/components/luminalis/insights/InsightCard";
import type { LuminalisInsight } from "@/lib/luminalis/insights";

export function InsightList({
  insights,
  emptyMessage = "Keine Erkenntnisse passen zu diesem Filter.",
}: {
  insights: LuminalisInsight[];
  emptyMessage?: string;
}) {
  if (insights.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <p className="text-sm leading-relaxed text-slate-400/85">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {insights.map((insight) => (
        <InsightCard key={insight.id} insight={insight} />
      ))}
    </ul>
  );
}
