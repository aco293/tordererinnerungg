import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { homeAbout } from "@/lib/content/site";

export function AboutSection() {
  return (
    <Section aria-labelledby="about-title">
      <div className="grid items-center gap-12 md:grid-cols-[1fr_1.4fr]">
        {/* Symbolisches Siegel */}
        <div className="flex justify-center md:justify-start">
          <div className="relative flex h-48 w-48 items-center justify-center">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full border border-gold/20 animate-pulse-soft"
            />
            <span
              aria-hidden
              className="absolute inset-4 rounded-full border border-violet-glow/20"
            />
            <span
              aria-hidden
              className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/40 text-4xl text-gold shadow-glow-gold animate-float"
            >
              ✶
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
            {homeAbout.eyebrow}
          </p>
          <h2
            id="about-title"
            className="mt-4 font-serif text-3xl font-light leading-tight text-white sm:text-4xl"
          >
            {homeAbout.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-slate-300/80 sm:text-lg">
            {homeAbout.text}
          </p>
          <div className="mt-8">
            <Button href={homeAbout.cta.href} variant="ghost">
              {homeAbout.cta.label} <span aria-hidden>→</span>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}
