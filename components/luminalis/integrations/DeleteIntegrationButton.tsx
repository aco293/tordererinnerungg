"use client";

import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { deleteIntegrationAction } from "@/app/luminalis/integration/actions";

export function DeleteIntegrationButton({
  integrationId,
}: {
  integrationId: string;
}) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (!window.confirm("Möchtest du diese Integration wirklich löschen?")) {
      event.preventDefault();
    }
  }

  return (
    <form action={deleteIntegrationAction} onSubmit={handleSubmit}>
      <input type="hidden" name="integration_id" value={integrationId} />
      <button type="submit" className={`${buttonBase} ${buttonVariants.ghost}`}>
        Integration löschen
      </button>
    </form>
  );
}
