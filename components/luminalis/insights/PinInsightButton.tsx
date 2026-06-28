import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { togglePinAction } from "@/app/luminalis/erkenntnisse/actions";

/**
 * Schaltet die Markierung (pinned) um. Server-Action-Form – kein Client-JS.
 * Der versteckte Wert ist der gewünschte Zielzustand.
 */
export function PinInsightButton({
  insightId,
  pinned,
}: {
  insightId: string;
  pinned: boolean;
}) {
  return (
    <form action={togglePinAction}>
      <input type="hidden" name="insight_id" value={insightId} />
      <input type="hidden" name="pinned" value={pinned ? "0" : "1"} />
      <button type="submit" className={`${buttonBase} ${buttonVariants.secondary}`}>
        {pinned ? "Markierung entfernen" : "Erkenntnis hervorheben"}
      </button>
    </form>
  );
}
