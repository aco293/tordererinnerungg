import { Button } from "@/components/ui/Button";
import { FirstGateOverlay } from "@/components/home/FirstGateOverlay";
import { homeHero } from "@/lib/content/site";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[92vh] items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Lichttor – rein dekorativ */}
      <div aria-hidden className="gate animate-fade-in">
        <div className="gate-arch">
          <span className="gate-beyond" />
          <span className="gate-mote" />
          <span className="gate-mote" />
          <span className="gate-mote" />
          <span className="gate-mote" />
          <span className="gate-mote" />
        </div>
        <span className="gate-threshold" />
      </div>

      {/* Inhalt in der Schwelle */}
      <div className="relative z-10 mx-auto w-full max-w-xl px-6 text-center">
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.4em] text-gold/80 animate-fade-up">
          {homeHero.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="font-serif text-5xl font-light leading-[1.06] tracking-tight sm:text-6xl animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="bg-gradient-to-b from-white to-gold-soft bg-clip-text text-transparent [text-shadow:0_0_40px_rgba(243,217,164,0.15)]">
            {homeHero.title}
          </span>
        </h1>

        <p
          className="mx-auto mt-7 max-w-md text-lg leading-relaxed text-slate-300/85 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          {homeHero.subtitle}
        </p>

        <div
          className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <FirstGateOverlay triggerLabel={homeHero.primaryCta.label} />
          <Button href={homeHero.secondaryCta.href} variant="secondary">
            {homeHero.secondaryCta.label}
          </Button>
        </div>
      </div>

      {/* Sanfter Scroll-Hinweis */}
      <div aria-hidden className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500">
        <span className="block animate-float text-xl">⌄</span>
      </div>
    </section>
  );
}
