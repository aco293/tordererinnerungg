import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FirstGateOverlay } from "@/components/home/FirstGateOverlay";
import { homeHero } from "@/lib/content/site";

const heroPills = [
  { label: "Bewusstsein", href: "/raeume/bewusstsein" },
  { label: "Frequenz", href: "/raeume/frequenz" },
  { label: "Luminalis", href: "/luminalis" },
];

export function HeroSection() {
  return (
    <section
      className="relative flex min-h-[78vh] items-center overflow-hidden pt-10 pb-16 sm:min-h-[84vh] sm:pb-20"
      aria-labelledby="hero-title"
    >
      {/* Dekorative Portal-Ebene: mobil zentriert hinter dem Text, auf Desktop nach rechts versetzt */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-deep/30 blur-[140px] animate-aura-pulse lg:left-[70%]" />
        <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[100px] lg:left-[70%]" />

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40 sm:opacity-70 lg:left-[70%] lg:opacity-100">
          <div className="sacred-rings left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 sm:h-[380px] sm:w-[380px]" />
          <div className="sacred-rings left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow sm:h-[560px] sm:w-[560px]" />

          {/* Lichttor */}
          <div className="gate animate-fade-in" style={{ position: "absolute" }}>
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
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 sm:px-8 lg:grid-cols-2">
        {/* Textspalte */}
        <div className="text-center lg:text-left">
          <p className="mb-5 inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.4em] text-gold/80 animate-fade-up">
            <span aria-hidden className="h-1 w-1 rounded-full bg-gold/80 shadow-glow-gold" />
            {homeHero.eyebrow}
          </p>

          <h1
            id="hero-title"
            className="font-serif text-[2.6rem] font-light leading-[1.08] tracking-tight sm:text-6xl animate-fade-up"
            style={{ animationDelay: "0.08s" }}
          >
            <span className="text-gold-gradient [text-shadow:0_0_50px_rgba(243,217,164,0.18)]">
              Erinnere dich,
              <br />
              wer du wirklich bist.
            </span>
          </h1>

          <p
            className="mt-4 text-sm uppercase tracking-[0.3em] text-violet-soft/70 animate-fade-up"
            style={{ animationDelay: "0.16s" }}
          >
            Tor der Erinnerung
          </p>

          <p
            className="mx-auto mt-6 max-w-md text-base leading-relaxed text-slate-300/85 sm:text-lg lg:mx-0 animate-fade-up"
            style={{ animationDelay: "0.24s" }}
          >
            Ein digitales Tor für Bewusstsein, Frequenz, Resonanz und die Rückkehr
            zu deinem inneren Licht.
          </p>

          <div
            className="mt-9 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start animate-fade-up"
            style={{ animationDelay: "0.32s" }}
          >
            <FirstGateOverlay triggerLabel={homeHero.primaryCta.label} />
            <Button href={homeHero.secondaryCta.href} variant="secondary">
              {homeHero.secondaryCta.label}
            </Button>
          </div>

          {/* Mini-Navigation als sofortige Orientierung */}
          <div
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            {heroPills.map((pill) => (
              <Link
                key={pill.href}
                href={pill.href}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs tracking-wide text-slate-300/80 transition-colors duration-300 hover:border-gold/40 hover:text-gold-soft"
              >
                {pill.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Rechte Spalte: Raum für das Portal (zeigt die Dekor-Ebene) */}
        <div aria-hidden className="hidden lg:block" />
      </div>

      {/* Scroll-Hinweis als Lichtpunkt */}
      <div
        aria-hidden
        className="absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="h-8 w-px bg-gradient-to-b from-transparent to-gold/40" />
        <span className="h-1.5 w-1.5 rounded-full bg-gold/70 animate-float shadow-glow-gold" />
      </div>
    </section>
  );
}
