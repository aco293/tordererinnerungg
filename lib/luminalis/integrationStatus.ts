/**
 * Statuswerte für Luminalis-Integrationen – ruhig und menschlich, bewusst nicht
 * produktivitätsorientiert. Client-sichere Konstante (kein Server-Code).
 */

export const INTEGRATION_STATUSES = [
  { value: "open", label: "Offen" },
  { value: "in_motion", label: "In Bewegung" },
  { value: "integrated", label: "Integriert" },
  { value: "released", label: "Losgelassen" },
] as const;

export type IntegrationStatus = (typeof INTEGRATION_STATUSES)[number]["value"];

export function integrationStatusLabel(value: string | null | undefined): string {
  return (
    INTEGRATION_STATUSES.find((status) => status.value === value)?.label ??
    "Offen"
  );
}
