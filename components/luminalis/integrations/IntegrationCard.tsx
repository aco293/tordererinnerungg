import Link from "next/link";
import { integrationStatusLabel } from "@/lib/luminalis/integrationStatus";
import type { LuminalisIntegration } from "@/lib/luminalis/integrations";

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

export function IntegrationCard({
  integration,
}: {
  integration: LuminalisIntegration;
}) {
  return (
    <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm transition-colors hover:border-white/20">
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs uppercase tracking-[0.2em] text-slate-400">
        <span>{formatDate(integration.created_at)}</span>
        <span className="rounded-full border border-violet-glow/30 px-3 py-1 text-[0.65rem] text-violet-soft">
          {integrationStatusLabel(integration.status)}
        </span>
      </div>

      <h3 className="mt-3 font-serif text-xl font-light">
        <Link
          href={`/luminalis/integration/${integration.id}`}
          className="text-white transition-colors hover:text-gold-soft"
        >
          {integration.title?.trim() || "Unbenannte Integration"}
        </Link>
      </h3>

      <p className="mt-2 text-sm leading-relaxed text-slate-300/80">
        {excerpt(integration.intention)}
      </p>

      {integration.resonance_topics.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2">
          {integration.resonance_topics.map((topic) => (
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
        href={`/luminalis/integration/${integration.id}`}
        className="mt-5 inline-block text-xs uppercase tracking-[0.2em] text-gold/70 transition-colors hover:text-gold"
      >
        Integration öffnen
      </Link>
    </li>
  );
}
