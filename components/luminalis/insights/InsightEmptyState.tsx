import { Button } from "@/components/ui/Button";

export function InsightEmptyState() {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center backdrop-blur-sm">
      <h2 className="font-serif text-2xl font-light text-white">
        Noch keine Erkenntnisse gespeichert
      </h2>
      <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-slate-300/80">
        Wenn ein Weg-Eintrag für dich bedeutsam wird, kannst du daraus eine
        Erkenntnis speichern.
      </p>
      <div className="mt-8">
        <Button href="/luminalis/dialog">Zum Dialograum</Button>
      </div>
    </div>
  );
}
