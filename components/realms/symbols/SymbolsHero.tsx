import { Button } from "@/components/ui/Button";
import { symbolsHero } from "@/lib/content/symbols";

export function SymbolsHero() {
  return (
    <section
      className="relative flex min-h-[78vh] items-center justify-center overflow-hidden"
      aria-labelledby="symbols-title"
    >
      {/* Ruhige Aura */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-deep/25 blur-[130px] animate-pulse-soft"
      />

      <div className="mx-auto w-full max-w-3xl px-6 text-center">
        <div className="mb-10 flex justify-center animate-fade-in">
          <span
            aria-hidden
            className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 text-3xl text-gold shadow-glow-gold animate-float"
          >
            △
          </span>
        </div>

        <p className="mb-6 text-xs font-medium uppercase tracking-[0.4em] text-gold/70 animate-fade-up">
          {symbolsHero.eyebrow}
        </p>

        <h1
          id="symbols-title"
          className="font-serif text-5xl font-light leading-[1.05] tracking-tight sm:text-6xl md:text-7xl animate-fade-up"
          style={{ animationDelay: "0.1s" }}
        >
          <span className="bg-gradient-to-b from-white via-violet-soft to-gold-soft bg-clip-text text-transparent">
            {symbolsHero.title}
          </span>
        </h1>

        <p
          className="mx-auto mt-7 max-w-xl font-serif text-2xl font-light text-violet-soft animate-fade-up"
          style={{ animationDelay: "0.2s" }}
        >
          {symbolsHero.subtitle}
        </p>

        <p
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-slate-300/80 sm:text-lg animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          {symbolsHero.text}
        </p>

        <div
          className="mt-12 flex justify-center animate-fade-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Button href={symbolsHero.cta.href} variant="primary">
            {symbolsHero.cta.label}
          </Button>
        </div>
      </div>
    </section>
  );
}
