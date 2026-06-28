import Link from "next/link";
import type { ResonanceCount } from "@/lib/luminalis/resonance";

export function ResonanceTopicCloud({ items }: { items: ResonanceCount[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
      <h3 className="font-serif text-xl font-light text-white">
        Resonanzthemen
      </h3>

      {items.length === 0 ? (
        <p className="mt-5 text-sm text-slate-500">
          Noch keine Resonanzthemen gespeichert.
        </p>
      ) : (
        <ul className="mt-5 flex flex-wrap gap-2">
          {items.map((item) => (
            <li key={item.label}>
              <Link
                href={`/luminalis/dialog?topic=${encodeURIComponent(item.label)}`}
                className="inline-flex items-center gap-2 rounded-full border border-violet-glow/20 bg-violet-deep/10 px-3 py-1 text-sm text-violet-soft transition-colors hover:border-violet-glow/40 hover:bg-violet-deep/20"
              >
                {item.label}
                <span className="text-xs text-slate-400">{item.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
