import { CHAT_MODES } from "@/lib/luminalis/ai/chatModes";

/**
 * Ruhige Modus-Auswahl als Radio-Gruppe. Funktioniert ohne Client-JS:
 * die Auswahl wird über `peer-checked`-Stile sichtbar gemacht.
 */
export function ChatModeSelector({
  name = "mode",
  defaultValue = "begleitung",
}: {
  name?: string;
  defaultValue?: string;
}) {
  return (
    <fieldset>
      <legend className="mb-3 block text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
        Ausrichtung dieses Dialogs
      </legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {CHAT_MODES.map((mode) => (
          <label
            key={mode.value}
            className="group relative block cursor-pointer"
          >
            <input
              type="radio"
              name={name}
              value={mode.value}
              defaultChecked={mode.value === defaultValue}
              className="peer sr-only"
            />
            <span className="block rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 transition-colors hover:border-white/20 peer-checked:border-gold/40 peer-checked:bg-gold/[0.06] peer-focus-visible:ring-2 peer-focus-visible:ring-violet-soft/40">
              <span className="block text-sm text-white">{mode.label}</span>
              <span className="mt-1 block text-xs leading-relaxed text-slate-400">
                {mode.description}
              </span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
