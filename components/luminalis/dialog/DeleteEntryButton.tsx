"use client";

import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { deleteEntryAction } from "@/app/luminalis/dialog/actions";

type DeleteEntryButtonProps = {
  entryId: string;
  /** Kompakte Text-Variante für Listen statt großem Button. */
  compact?: boolean;
};

export function DeleteEntryButton({
  entryId,
  compact = false,
}: DeleteEntryButtonProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!window.confirm("Möchtest du diesen Weg-Eintrag wirklich löschen?")) {
      event.preventDefault();
    }
  }

  return (
    <form action={deleteEntryAction} onSubmit={handleSubmit}>
      <input type="hidden" name="entry_id" value={entryId} />
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
          Eintrag löschen
        </button>
      )}
    </form>
  );
}
