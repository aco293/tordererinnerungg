import { Section } from "@/components/ui/Section";
import { homeIntro } from "@/lib/content/site";

export function IntroSection() {
  return (
    <Section aria-labelledby="intro-title">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
        {/* Textspalte */}
        <div className="text-center md:text-left">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
            {homeIntro.eyebrow}
          </p>
          <h2
            id="intro-title"
            className="font-serif text-3xl font-light leading-tight text-white sm:text-4xl"
          >
            {homeIntro.title}
          </h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-slate-300/80 sm:text-lg">
            {homeIntro.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Lichtkarte – ruhiges visuelles Element */}
        <div className="flex justify-center md:justify-end">
          <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-violet-deep/20 blur-[60px]"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border border-gold/15 animate-spin-slow"
            />
            <span
              aria-hidden
              className="absolute inset-6 rounded-full border border-violet-glow/20"
            />
            <span
              aria-hidden
              className="absolute inset-12 rounded-full border border-gold/20 animate-pulse-soft"
            />
            <span
              aria-hidden
              className="relative flex h-20 w-20 items-center justify-center rounded-full border border-gold/40 bg-abyss-900/40 text-3xl text-gold shadow-glow-gold animate-float"
            >
              ✶
            </span>
            {/* feine Sternpunkte */}
            <span aria-hidden className="absolute left-2 top-10 h-1 w-1 rounded-full bg-gold/70 animate-twinkle" />
            <span aria-hidden className="absolute bottom-8 right-4 h-1 w-1 rounded-full bg-violet-soft/70 animate-twinkle" />
            <span aria-hidden className="absolute right-10 top-3 h-px w-px rounded-full bg-white/70 animate-twinkle" />
          </div>
        </div>
      </div>

      {/* Trennende Lichtlinie */}
      <div aria-hidden className="mx-auto mt-16 flex w-48 flex-col items-center">
        <div className="divider-gold w-full" />
      </div>
    </Section>
  );
}
