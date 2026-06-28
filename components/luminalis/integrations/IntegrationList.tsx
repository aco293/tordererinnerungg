import { IntegrationCard } from "@/components/luminalis/integrations/IntegrationCard";
import type { LuminalisIntegration } from "@/lib/luminalis/integrations";

export function IntegrationList({
  integrations,
  emptyMessage = "Keine Integrationen passen zu diesem Filter.",
}: {
  integrations: LuminalisIntegration[];
  emptyMessage?: string;
}) {
  if (integrations.length === 0) {
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
      {integrations.map((integration) => (
        <IntegrationCard key={integration.id} integration={integration} />
      ))}
    </ul>
  );
}
