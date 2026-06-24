"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  buttonBase,
  buttonVariants,
} from "@/components/ui/Button";
import {
  firstGateIntro,
  firstGatePaths,
  type GatePath,
} from "@/lib/content/firstGate";

type FirstGateOverlayProps = {
  /** Beschriftung des Auslöser-Buttons in der HeroSection. */
  triggerLabel?: string;
};

export function FirstGateOverlay({
  triggerLabel = "Tor betreten",
}: FirstGateOverlayProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<GatePath | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    // Auswahl zurücksetzen, damit beim nächsten Öffnen wieder die Wege erscheinen.
    setSelected(null);
  }, []);

  // Escape-Taste, Fokus-Falle, Scroll-Sperre und Fokus-Rückgabe.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Fokus in den Schwellenraum bewegen.
    const focusTimer = window.setTimeout(() => {
      dialogRef.current?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key !== "Tab") return;

      // Einfache Fokus-Falle innerhalb des Dialogs.
      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(focusTimer);
      // Fokus zurück auf den Auslöser, falls noch vorhanden.
      (previouslyFocused ?? triggerRef.current)?.focus?.();
    };
  }, [open, close]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`${buttonBase} ${buttonVariants.primary}`}
      >
        {triggerLabel}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          role="presentation"
        >
          {/* Backdrop – Klick schließt den Schwellenraum. */}
          <button
            type="button"
            aria-label="Schwellenraum schließen"
            onClick={close}
            className="absolute inset-0 cursor-default bg-abyss/80 backdrop-blur-md animate-fade-in-fast"
            tabIndex={-1}
          />

          {/* Schwellenraum */}
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="first-gate-title"
            tabIndex={-1}
            className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-abyss-800/90 to-abyss-900/95 p-6 shadow-glow outline-none animate-scale-in sm:p-10 max-h-[90vh] overflow-y-auto"
          >
            {/* Atmosphärische Aura */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-deep/30 blur-[110px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-24 right-0 h-64 w-64 rounded-full bg-gold/10 blur-[100px]"
            />

            {/* Schließen-Button */}
            <button
              type="button"
              onClick={close}
              aria-label="Schwellenraum schließen"
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition-colors hover:border-gold/40 hover:text-gold"
            >
              <span aria-hidden className="text-lg">
                ✕
              </span>
            </button>

            {selected ? (
              <GateResult
                path={selected}
                onBack={() => setSelected(null)}
                onEnter={close}
              />
            ) : (
              <GateSelection onSelect={setSelected} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

/* --- Auswahlansicht: die vier Wege --- */

function GateSelection({ onSelect }: { onSelect: (path: GatePath) => void }) {
  return (
    <div className="relative animate-fade-in">
      <div className="text-center">
        <span
          aria-hidden
          className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-full border border-gold/30 text-2xl text-gold shadow-glow-gold animate-float"
        >
          ✦
        </span>
        <h2
          id="first-gate-title"
          className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl"
        >
          {firstGateIntro.title}
        </h2>
        <p className="mt-4 text-base text-slate-300/80 sm:text-lg">
          {firstGateIntro.subtitle}
        </p>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {firstGatePaths.map((path) => (
          <li key={path.id}>
            <button
              type="button"
              onClick={() => onSelect(path)}
              className="group flex h-full w-full flex-col items-start rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-glow/50 hover:bg-white/[0.05] hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-soft focus-visible:ring-offset-2 focus-visible:ring-offset-abyss"
            >
              <span
                aria-hidden
                className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-xl text-gold-soft transition-colors duration-300 group-hover:border-gold/40"
              >
                {path.symbol}
              </span>
              <span className="font-serif text-2xl font-light text-white">
                {path.title}
              </span>
              <span className="mt-3 text-sm leading-relaxed text-slate-300/75">
                {path.description}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --- Ergebnisansicht: der gewählte Pfad --- */

function GateResult({
  path,
  onBack,
  onEnter,
}: {
  path: GatePath;
  onBack: () => void;
  onEnter: () => void;
}) {
  const enterRef = useRef<HTMLAnchorElement>(null);

  // Fokus auf den primären Button, sobald das Ergebnis erscheint.
  useEffect(() => {
    enterRef.current?.focus();
  }, []);

  return (
    <div className="relative mx-auto max-w-xl py-4 text-center animate-fade-in">
      <span
        aria-hidden
        className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-gold/30 text-3xl text-gold shadow-glow-gold animate-float"
      >
        {path.symbol}
      </span>

      <h2
        id="first-gate-title"
        className="font-serif text-3xl font-light tracking-tight text-white sm:text-4xl"
      >
        {path.resultTitle}
      </h2>

      <p className="mt-5 text-lg text-violet-soft">{path.title}</p>
      <p className="mt-2 text-base leading-relaxed text-slate-300/80">
        {path.resultText}
      </p>

      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <Link
          ref={enterRef}
          href={path.href}
          onClick={onEnter}
          className={`${buttonBase} ${buttonVariants.primary}`}
        >
          Pfad betreten
        </Link>
        <button
          type="button"
          onClick={onBack}
          className={`${buttonBase} ${buttonVariants.ghost}`}
        >
          Zurück zur Auswahl
        </button>
      </div>
    </div>
  );
}
