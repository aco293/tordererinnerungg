import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

/**
 * Ruhige, emotionale Abschluss-Sektion mit einem erinnernden Zitat.
 */
export function QuoteSection() {
  return (
    <Section aria-labelledby="quote-title" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[420px] w-[640px] max-w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-deep/25 blur-[130px]"
      />

      <figure className="mx-auto max-w-2xl text-center">
        <span
          aria-hidden
          className="mx-auto mb-2 block font-serif text-6xl leading-none text-gold/40"
        >
          „
        </span>
        <blockquote
          id="quote-title"
          className="font-serif text-3xl font-light leading-snug text-white sm:text-4xl"
        >
          <p className="text-gold-gradient">
            Das Tor ist kein Ort.
            <br />
            Es ist ein Zustand.
            <br />
            Eine Rückkehr zu dem,
            <br />
            was immer da war.
          </p>
        </blockquote>
        <figcaption className="mt-10">
          <span className="text-sm font-medium uppercase tracking-[0.4em] text-gold/70">
            Erinnere dich.
          </span>
        </figcaption>

        <div className="mt-10 flex justify-center">
          <Button href="/raeume">Das Tor betreten</Button>
        </div>
      </figure>
    </Section>
  );
}
