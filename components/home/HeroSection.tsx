import { Button } from "@/components/ui/Button";
import { FirstGateOverlay } from "@/components/home/FirstGateOverlay";
import { homeHero } from "@/lib/content/site";

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[88vh] items-center justify-center overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Tor-Aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-deep/30 blur-[120px] animate-pulse-soft"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[100px]"
      />

      <div className="mx-auto w-full max-w-3xl px-6 text-center">
        {/* Tor-Symbol */}
        <div className="mb-10 flex justify-center animate-fade-in">
          <span
            aria-hidden
            className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 text-3xl text-gold shadow-glow-gold animate-float"
          >
            ✦
          </span>
        </div>

        <p className="mb-6 text-xs font-medium uppercase tracking-[0.4em] text-gold/70 animate-fade-up">
          {homeHero.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="font-serif text-5xl font-light leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="bg-gradient-to-b from-white to-gold-soft bg-clip-text text-transparent">
            {homeHero.title}
          </span>
        </h1>

        <p
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-slate-300/85 animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          {homeHero.subtitle}
        </p>

        <div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <FirstGateOverlay triggerLabel={homeHero.primaryCta.label} />
          <Button href={homeHero.secondaryCta.href} variant="secondary">
            {homeHero.secondaryCta.label}
          </Button>
        </div>
      </div>

      {/* Sanfter Scroll-Hinweis */}
      <div
        aria-hidden
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <span className="block animate-float text-xl">⌄</span>
      </div>
    </section>
  );
}
