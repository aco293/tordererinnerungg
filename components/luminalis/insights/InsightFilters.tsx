import Link from "next/link";
import { authFieldClass, authLabelClass } from "@/components/auth/AuthShell";
import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { LUMINALIS_PILLARS } from "@/lib/luminalis/pillars";

export type InsightFilterValues = {
  pillar?: string;
  topic?: string;
  search?: string;
  pinned?: string;
};

/** Filter über GET-Form → Auswahl landet in den URL-Search-Params. */
export function InsightFilters({ values }: { values: InsightFilterValues }) {
  const hasActive = Boolean(
    values.pillar || values.topic || values.search || values.pinned,
  );

  return (
    <form
      method="get"
      action="/luminalis/erkenntnisse"
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="filter-pillar" className={authLabelClass}>
            Säule
          </label>
          <select
            id="filter-pillar"
            name="pillar"
            defaultValue={values.pillar ?? ""}
            className={authFieldClass}
          >
            <option value="">Alle Säulen</option>
            {LUMINALIS_PILLARS.map((p) => (
              <option key={p.id} value={p.label}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-topic" className={authLabelClass}>
            Resonanzthema
          </label>
          <input
            id="filter-topic"
            name="topic"
            type="text"
            defaultValue={values.topic ?? ""}
            className={authFieldClass}
            placeholder="z. B. Vertrauen"
          />
        </div>

        <div>
          <label htmlFor="filter-search" className={authLabelClass}>
            Suche
          </label>
          <input
            id="filter-search"
            name="search"
            type="search"
            defaultValue={values.search ?? ""}
            className={authFieldClass}
            placeholder="In Titel und Erkenntnis suchen"
          />
        </div>

        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-abyss-800/40 px-4 py-3">
            <input
              type="checkbox"
              name="pinned"
              value="1"
              defaultChecked={Boolean(values.pinned)}
              className="h-4 w-4 accent-gold"
            />
            <span className="text-sm text-slate-200">
              Nur markierte Erkenntnisse
            </span>
          </label>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className={`${buttonBase} ${buttonVariants.secondary}`}
        >
          Filtern
        </button>
        {hasActive && (
          <Link
            href="/luminalis/erkenntnisse"
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            Filter zurücksetzen
          </Link>
        )}
      </div>
    </form>
  );
}
