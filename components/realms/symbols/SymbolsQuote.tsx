import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { symbolsQuote } from "@/lib/content/symbols";

export function SymbolsQuote() {
  return (
    <Section className="py-32" aria-label="Abschluss des Symbolraums">
      <div className="relative mx-auto max-w-3xl text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]"
        />

        <span aria-hidden className="font-serif text-6xl text-gold/30">
          „
        </span>

        <blockquote className="mt-2 font-serif text-3xl font-light leading-snug text-white sm:text-4xl md:text-5xl">
          {symbolsQuote.lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </blockquote>

        <div className="mt-14">
          <Button href={symbolsQuote.cta.href} variant="secondary">
            {symbolsQuote.cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
