"use client";

import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { deleteEntryAction } from "@/app/luminalis/dialog/actions";

export function DeleteEntryButton({ entryId }: { entryId: string }) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!window.confirm("Möchtest du diesen Weg-Eintrag wirklich löschen?")) {
      event.preventDefault();
    }
  }

  return (
    <form action={deleteEntryAction} onSubmit={handleSubmit}>
      <input type="hidden" name="entry_id" value={entryId} />
      <button type="submit" className={`${buttonBase} ${buttonVariants.ghost}`}>
        Eintrag löschen
      </button>
    </form>
  );
}
