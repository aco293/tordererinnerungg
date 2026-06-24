import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { libraryHero } from "@/lib/content/library";

export function LibraryHero() {
  return (
    <Section className="pb-12 pt-20 sm:pt-28" aria-labelledby="library-title">
      <div className="animate-fade-up">
        <SectionHeading
          eyebrow="Wissen & Erinnerung"
          title={libraryHero.title}
          align="center"
          as="h1"
          id="library-title"
        >
          <p>{libraryHero.subtitle}</p>
        </SectionHeading>

        <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-slate-400/85 sm:text-lg">
          {libraryHero.text}
        </p>

        {/* Trennende Lichtlinie */}
        <div
          aria-hidden
          className="mx-auto mt-14 h-px w-40 bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        />
      </div>
    </Section>
  );
}
