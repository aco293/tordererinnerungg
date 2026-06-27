import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { earthCosmosQuote } from "@/lib/content/earthCosmos";

export function EarthCosmosQuote() {
  return (
    <Section className="py-32" aria-label="Abschluss des Raums Erde & Kosmos">
      <div className="relative mx-auto max-w-3xl text-center">
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]"
        />

        <span aria-hidden className="font-serif text-6xl text-gold/30">
          „
        </span>

        <blockquote className="mt-2 space-y-4 font-serif text-3xl font-light leading-snug text-white sm:text-4xl md:text-5xl">
          {earthCosmosQuote.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </blockquote>

        <div className="mt-14">
          <Button href={earthCosmosQuote.cta.href} variant="secondary">
            {earthCosmosQuote.cta.label}
          </Button>
        </div>
      </div>
    </Section>
  );
}
