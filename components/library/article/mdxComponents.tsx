import type { ComponentPropsWithoutRef } from "react";
import Link from "next/link";

/**
 * Stilisierte Zuordnung der MDX-Elemente auf die TorDerErinnerung-Designsprache.
 * Ruhige Typografie, viel Weißraum, Lesefokus – ohne externes Typography-Plugin.
 */
export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1
      className="mt-12 font-serif text-4xl font-light leading-tight text-white first:mt-0"
      {...props}
    />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      className="mt-14 font-serif text-3xl font-light leading-snug text-white first:mt-0"
      {...props}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      className="mt-10 font-serif text-2xl font-light leading-snug text-gold-soft"
      {...props}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="mt-6 text-lg leading-relaxed text-slate-300/85" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      className="mt-6 list-disc space-y-2 pl-6 text-lg leading-relaxed text-slate-300/85 marker:text-gold/60"
      {...props}
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      className="mt-6 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-slate-300/85 marker:text-gold/60"
      {...props}
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className="pl-1.5" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="mt-8 border-l-2 border-gold/40 pl-6 font-serif text-xl font-light italic text-violet-soft"
      {...props}
    />
  ),
  a: ({ href = "#", ...props }: ComponentPropsWithoutRef<"a">) => (
    <Link
      href={href}
      className="text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
      {...props}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong className="font-semibold text-white" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<"em">) => (
    <em className="italic text-violet-soft" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr className="my-12 border-white/10" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-sm text-gold-soft"
      {...props}
    />
  ),
};
