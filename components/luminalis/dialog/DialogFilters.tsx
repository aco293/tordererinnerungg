import Link from "next/link";
import { authFieldClass, authLabelClass } from "@/components/auth/AuthShell";
import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { DIALOG_MODES } from "@/lib/luminalis/dialog";
import { LUMINALIS_PILLARS } from "@/lib/luminalis/pillars";

export type DialogFilterValues = {
  pillar?: string;
  mode?: string;
  topic?: string;
  search?: string;
};

/**
 * Filter über GET-Form → die Auswahl landet in den URL-Search-Params
 * (z. B. /luminalis/dialog?pillar=Resonanz&mode=Klarheit). Keine Library.
 */
export function DialogFilters({ values }: { values: DialogFilterValues }) {
  const hasActive = Boolean(
    values.pillar || values.mode || values.topic || values.search,
  );

  return (
    <form
      method="get"
      action="/luminalis/dialog"
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
          <label htmlFor="filter-mode" className={authLabelClass}>
            Modus
          </label>
          <select
            id="filter-mode"
            name="mode"
            defaultValue={values.mode ?? ""}
            className={authFieldClass}
          >
            <option value="">Alle Modi</option>
            {DIALOG_MODES.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
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
            placeholder="In Titel und Inhalt suchen"
          />
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
            href="/luminalis/dialog"
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            Filter zurücksetzen
          </Link>
        )}
      </div>
    </form>
  );
}
