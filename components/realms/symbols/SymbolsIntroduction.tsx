import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { symbolsIntro } from "@/lib/content/symbols";

export function SymbolsIntroduction() {
  return (
    <Section id="einfuehrung" aria-labelledby="symbols-intro-title">
      <SectionHeading
        eyebrow={symbolsIntro.eyebrow}
        title={symbolsIntro.title}
        id="symbols-intro-title"
      >
        <div className="space-y-5">
          {symbolsIntro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionHeading>

      <ul className="mx-auto mt-16 grid max-w-4xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] sm:grid-cols-2">
        {symbolsIntro.aspects.map((aspect) => (
          <li
            key={aspect.title}
            className="bg-abyss-900/40 p-7 transition-colors duration-500 hover:bg-white/[0.03]"
          >
            <h3 className="font-serif text-xl font-light text-gold-soft">
              {aspect.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300/75">
              {aspect.text}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
