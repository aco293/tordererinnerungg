import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { homeKlangraum } from "@/lib/content/site";

export function KlangraumSection() {
  return (
    <Section aria-labelledby="klangraum-title">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-abyss-800/80 to-abyss-900/40 px-8 py-16 sm:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-gold/10 blur-[100px]"
        />

        {/* Klangwellen-Symbol */}
        <div aria-hidden className="mb-8 flex gap-1.5">
          {[10, 22, 34, 26, 16, 28, 38, 20, 12].map((h, i) => (
            <span
              key={i}
              className="w-1 rounded-full bg-gradient-to-t from-violet-glow/40 to-gold/70 animate-pulse-soft"
              style={{ height: `${h}px`, animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        <p className="text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
          {homeKlangraum.eyebrow}
        </p>
        <h2
          id="klangraum-title"
          className="mt-4 max-w-xl font-serif text-3xl font-light leading-tight text-white sm:text-4xl"
        >
          {homeKlangraum.title}
        </h2>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-300/80 sm:text-lg">
          {homeKlangraum.text}
        </p>
        <div className="mt-10">
          <Button href={homeKlangraum.cta.href} variant="primary">
            {homeKlangraum.cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
