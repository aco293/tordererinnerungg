import Link from "next/link";
import { footerNav } from "@/lib/content/navigation";
import { site } from "@/lib/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-abyss-900/60">
      {/* Feine goldene Lichtlinie am oberen Rand */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
      />
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="group flex items-center gap-3">
              <span className="relative flex h-8 w-8 items-center justify-center">
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-gold/20 blur-md opacity-50 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="relative flex h-8 w-8 items-center justify-center rounded-full border border-gold/40 text-gold"
                >
                  ✦
                </span>
              </span>
              <span className="font-serif text-lg text-white">{site.name}</span>
            </Link>
            <p className="mt-4 font-serif text-base italic text-gold-soft/70">
              Erinnere dich, wer du wirklich bist.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-400/80">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footernavigation">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-3 text-sm">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-slate-400/80 transition-colors hover:text-gold-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.name}. Ein Weg der Erinnerung.
          </p>
          <p className="tracking-wide">Begleitet von {site.author}</p>
        </div>
      </div>
    </footer>
  );
}
