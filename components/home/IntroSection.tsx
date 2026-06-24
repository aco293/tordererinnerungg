import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { homeIntro } from "@/lib/content/site";

export function IntroSection() {
  return (
    <Section aria-labelledby="intro-title">
      <SectionHeading
        eyebrow={homeIntro.eyebrow}
        title={homeIntro.title}
        id="intro-title"
      >
        <div className="space-y-5">
          {homeIntro.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </SectionHeading>

      {/* Trennende Lichtlinie */}
      <div
        aria-hidden
        className="mx-auto mt-16 h-px w-40 bg-gradient-to-r from-transparent via-gold/50 to-transparent"
      />
    </Section>
  );
}
