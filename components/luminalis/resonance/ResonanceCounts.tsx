import Link from "next/link";
import type { ResonanceCount } from "@/lib/luminalis/resonance";

type ResonanceCountsProps = {
  title: string;
  description?: string;
  items: ResonanceCount[];
  /** Wenn gesetzt, verlinken die Labels auf den Dialograum-Filter. */
  linkParam?: "pillar" | "mode";
};

/** Ruhige Zählliste mit einfachen Balken – ohne Diagramm-Bibliothek. */
export function ResonanceCounts({
  title,
  description,
  items,
  linkParam,
}: ResonanceCountsProps) {
  const max = items.reduce((acc, item) => Math.max(acc, item.count), 1);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
      <h3 className="font-serif text-xl font-light text-white">{title}</h3>
      {description && (
        <p className="mt-1 text-sm leading-relaxed text-slate-400/85">
          {description}
        </p>
      )}

      {items.length === 0 ? (
        <p className="mt-5 text-sm text-slate-500">Noch nichts erfasst.</p>
      ) : (
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li key={item.label}>
              <div className="flex items-center justify-between gap-3 text-sm">
                {linkParam ? (
                  <Link
                    href={`/luminalis/dialog?${linkParam}=${encodeURIComponent(item.label)}`}
                    className="text-slate-200 transition-colors hover:text-gold-soft"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-slate-200">{item.label}</span>
                )}
                <span className="text-slate-400">{item.count}</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-violet-glow/70 to-gold/70"
                  style={{ width: `${Math.round((item.count / max) * 100)}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
