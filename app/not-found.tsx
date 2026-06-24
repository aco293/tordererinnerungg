import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section className="flex min-h-[70vh] items-center">
      <div className="mx-auto max-w-lg text-center">
        <span
          aria-hidden
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 text-2xl text-gold shadow-glow-gold"
        >
          ✦
        </span>
        <h1 className="font-serif text-4xl font-light text-white">
          Dieses Tor führt ins Leere
        </h1>
        <p className="mt-5 text-base leading-relaxed text-slate-300/80">
          Die gesuchte Schwelle existiert nicht – vielleicht noch nicht. Kehre
          zum Eingang zurück und wähle einen anderen Weg.
        </p>
        <div className="mt-10 flex justify-center">
          <Button href="/" variant="primary">
            Zum Tor zurück
          </Button>
        </div>
      </div>
    </Section>
  );
}
