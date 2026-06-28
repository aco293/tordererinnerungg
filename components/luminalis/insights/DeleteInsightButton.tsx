"use client";

import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { deleteInsightAction } from "@/app/luminalis/erkenntnisse/actions";

type DeleteInsightButtonProps = {
  insightId: string;
  compact?: boolean;
};

export function DeleteInsightButton({
  insightId,
  compact = false,
}: DeleteInsightButtonProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!window.confirm("Möchtest du diese Erkenntnis wirklich löschen?")) {
      event.preventDefault();
    }
  }

  return (
    <form action={deleteInsightAction} onSubmit={handleSubmit}>
      <input type="hidden" name="insight_id" value={insightId} />
      {compact ? (
        <button
          type="submit"
          className="text-xs uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-rose-300/80"
        >
          Löschen
        </button>
      ) : (
        <button
          type="submit"
          className={`${buttonBase} ${buttonVariants.ghost}`}
        >
          Erkenntnis löschen
        </button>
      )}
    </form>
  );
}
