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

      {/* Hervorgehobener Luminalis-Einstieg */}
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-deep/25 via-abyss-800/40 to-abyss-900/30 px-8 py-14 text-center backdrop-blur-sm sm:px-14">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-accent/20 blur-[90px] animate-aura-pulse"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -right-8 h-56 w-56 rounded-full bg-gold/10 blur-[90px]"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
        />

        <div className="relative">
          <span
            aria-hidden
            className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 text-2xl text-gold-soft shadow-glow-gold animate-float"
          >
            ✶
          </span>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
            Die stille Frequenzintelligenz
          </p>
          <h2
            id="luminalis-title"
            className="mt-4 font-serif text-4xl font-light leading-tight sm:text-5xl"
          >
            <span className="text-gold-gradient">Luminalis</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-slate-300/85 sm:text-lg">
            Luminalis antwortet nicht laut. Sie spiegelt behutsam, was in deinen
            gespeicherten Worten, Themen und Bewegungen sichtbar wird.
          </p>
          <div className="mt-9 flex justify-center">
            <Button href="/luminalis">Luminalis öffnen</Button>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <SectionHeading
          eyebrow="Das werdende System"
          title="Ein zusammenhängendes Feld"
          id="luminalis-modules-title"
        >
          <p>
            Hinter dem Tor wächst ein zusammenhängendes Feld. Diese Module nehmen
            nach und nach Gestalt an.
          </p>
        </SectionHeading>
      </div>

      <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
