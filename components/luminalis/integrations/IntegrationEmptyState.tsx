import { Button } from "@/components/ui/Button";

export function IntegrationEmptyState() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm">
      <h2 className="font-serif text-2xl font-light text-white">
        Noch keine Integration begonnen
      </h2>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-300/80">
        Wenn eine Erkenntnis für dich bedeutsam ist, kannst du daraus einen
        bewussten nächsten Schritt formulieren.
      </p>
      <div className="mt-8">
        <Button href="/luminalis/erkenntnisse">Zu den Erkenntnissen</Button>
      </div>
    </div>
  );
}
