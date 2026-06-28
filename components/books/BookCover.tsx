import type { GlowTone } from "@/lib/content/books";

type BookCoverProps = {
  symbol: string;
  glow: GlowTone;
  /** Größeres Cover für die Detailseite. */
  large?: boolean;
  className?: string;
};

/** Tonabhängige Aura-Farbe des Covers (radialer Lichtkern). */
const toneAura: Record<GlowTone, string> = {
  violet:
    "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(111,111,214,0.35), transparent 70%)",
  gold:
    "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(232,193,122,0.28), transparent 70%)",
  blue:
    "radial-gradient(ellipse 70% 55% at 50% 38%, rgba(83,107,255,0.3), transparent 70%)",
};

/**
 * Abstraktes „Buchcover" als reines CSS-Visual – ein geschriebenes Tor.
 * Hochformat, feine Goldkante, zentrales Symbol und stille Sternpunkte.
 */
export function BookCover({ symbol, glow, large = false, className = "" }: BookCoverProps) {
  return (
    <div
      aria-hidden
      className={`group/cover relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-b from-abyss-800/80 to-abyss-900/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] ${
        large ? "aspect-[3/4] w-full" : "aspect-[4/5] w-full"
      } ${className}`}
    >
      {/* Tonabhängige Lichtaura */}
      <span
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{ backgroundImage: toneAura[glow] }}
      />
      {/* Feine vertikale Buchrücken-Linie */}
      <span className="pointer-events-none absolute inset-y-4 left-4 w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
      {/* Goldener Rahmen innen */}
      <span className="pointer-events-none absolute inset-3 rounded-xl border border-white/5" />

      {/* Zentrales Symbol */}
      <span
        className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 text-gold-soft shadow-glow-gold transition-transform duration-700 group-hover:scale-105 ${
          large ? "h-24 w-24 text-4xl" : "h-16 w-16 text-2xl"
        }`}
      >
        {symbol}
      </span>

      {/* Stille Sternpunkte */}
      <span className="absolute left-5 top-7 h-1 w-1 rounded-full bg-gold/70 animate-twinkle" />
      <span className="absolute right-6 top-10 h-px w-px rounded-full bg-white/70 animate-twinkle" />
      <span className="absolute bottom-8 left-1/3 h-1 w-1 rounded-full bg-violet-soft/70 animate-twinkle" />
      <span className="absolute bottom-6 right-7 h-1 w-1 rounded-full bg-gold/50 animate-twinkle" />
    </div>
  );
}
