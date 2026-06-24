import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { luminalisModules } from "@/lib/content/luminalis";

export function LuminalisSection() {
  return (
    <Section
      id="luminalis"
      className="relative overflow-hidden"
      aria-labelledby="luminalis-title"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-violet-deep/20 blur-[120px]"
      />

      <SectionHeading
        eyebrow="Das werdende System"
        title="Luminalis"
        id="luminalis-title"
      >
        <p>
          Hinter dem Tor wächst ein zusammenhängendes Feld. Diese Module nehmen
          nach und nach Gestalt an.
        </p>
      </SectionHeading>

      <ul className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {luminalisModules.map((module) => (
          <li key={module.key}>
            <Card glow="violet">
              <div className="flex items-center justify-between">
                <span
                  aria-hidden
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-glow/30 text-lg text-violet-soft"
                >
                  {module.symbol}
                </span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-slate-400">
                  {module.status}
                </span>
              </div>
              <h3 className="mt-5 font-serif text-xl font-light text-white">
                {module.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300/75">
                {module.description}
              </p>
            </Card>
          </li>
        ))}
      </ul>

      <div className="mt-14 flex justify-center">
        <Button href="/luminalis" variant="secondary">
          Luminalis im Detail
        </Button>
      </div>
    </Section>
  );
}
