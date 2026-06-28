import { GENERAL_REFLECTION, REFLECTION_PROMPTS } from "@/lib/luminalis/dialog";

/**
 * Zeigt eine ruhige Reflexionsfrage – passend zur gewählten Säule, sonst
 * allgemein. Rein begleitend: keine KI, keine Diagnose, keine Bewertung.
 */
export function ReflectionPrompt({ pillar }: { pillar?: string }) {
  const prompt = (pillar && REFLECTION_PROMPTS[pillar]) || GENERAL_REFLECTION;

  return (
    <div className="rounded-2xl border border-violet-glow/20 bg-violet-deep/10 p-5">
      <p className="text-xs uppercase tracking-[0.2em] text-violet-soft/70">
        Zum Innehalten
      </p>
      <p className="mt-2 font-serif text-lg font-light italic leading-relaxed text-violet-soft">
        {prompt}
      </p>
    </div>
  );
}
