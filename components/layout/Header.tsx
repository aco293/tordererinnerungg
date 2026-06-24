"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { mainNav } from "@/lib/content/navigation";
import { site } from "@/lib/content/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Menü bei Navigationswechsel schließen.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-abyss/70 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${site.name} – zur Startseite`}
        >
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 text-gold transition-shadow duration-500 group-hover:shadow-glow-gold"
          >
            ✦
          </span>
          <span className="font-serif text-lg tracking-wide text-white">
            {site.name}
          </span>
        </Link>

        {/* Desktop-Navigation */}
        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                    isActive(item.href)
                      ? "text-gold-soft"
                      : "text-slate-300/70 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile-Toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Menü schließen" : "Menü öffnen"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white md:hidden"
        >
          <span aria-hidden className="text-lg">
            {open ? "✕" : "☰"}
          </span>
        </button>
      </div>

      {/* Mobile-Navigation */}
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Hauptnavigation mobil"
          className="border-t border-white/5 bg-abyss-900/95 md:hidden"
        >
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`block rounded-lg px-3 py-3 text-base transition-colors ${
                    isActive(item.href)
                      ? "text-gold-soft"
                      : "text-slate-200/80 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
