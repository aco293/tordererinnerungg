import { setIntegrationStatusAction } from "@/app/luminalis/integration/actions";
import { INTEGRATION_STATUSES } from "@/lib/luminalis/integrationStatus";

/**
 * Ruhige Statuswahl – ohne Bewertung. Jede Option ist eine Server-Action-Form;
 * der aktuelle Status ist sichtbar markiert.
 */
export function IntegrationStatusActions({
  integrationId,
  current,
}: {
  integrationId: string;
  current: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
        Wo steht diese Integration gerade?
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {INTEGRATION_STATUSES.map((status) => {
          const active = status.value === current;
          return (
            <form
              key={status.value}
              action={setIntegrationStatusAction}
            >
              <input
                type="hidden"
                name="integration_id"
                value={integrationId}
              />
              <input type="hidden" name="status" value={status.value} />
              <button
                type="submit"
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  active
                    ? "border-gold/40 bg-gold/10 text-gold-soft"
                    : "border-white/10 text-slate-300/80 hover:border-white/25 hover:text-white"
                }`}
              >
                {status.label}
              </button>
            </form>
          );
        })}
      </div>
    </div>
  );
}
