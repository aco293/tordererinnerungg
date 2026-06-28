import Link from "next/link";
import { authFieldClass, authLabelClass } from "@/components/auth/AuthShell";
import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { INTEGRATION_STATUSES } from "@/lib/luminalis/integrationStatus";

export type IntegrationFilterValues = {
  status?: string;
  topic?: string;
  search?: string;
};

/** Filter über GET-Form → Auswahl landet in den URL-Search-Params. */
export function IntegrationFilters({
  values,
}: {
  values: IntegrationFilterValues;
}) {
  const hasActive = Boolean(values.status || values.topic || values.search);

  return (
    <form
      method="get"
      action="/luminalis/integration"
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="filter-status" className={authLabelClass}>
            Status
          </label>
          <select
            id="filter-status"
            name="status"
            defaultValue={values.status ?? ""}
            className={authFieldClass}
          >
            <option value="">Alle</option>
            {INTEGRATION_STATUSES.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
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

        <div className="sm:col-span-2">
          <label htmlFor="filter-search" className={authLabelClass}>
            Suche
          </label>
          <input
            id="filter-search"
            name="search"
            type="search"
            defaultValue={values.search ?? ""}
            className={authFieldClass}
            placeholder="In Titel und Intention suchen"
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
            href="/luminalis/integration"
            className="text-sm text-slate-400 transition-colors hover:text-white"
          >
            Filter zurücksetzen
          </Link>
        )}
      </div>
    </form>
  );
}
