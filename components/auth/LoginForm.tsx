"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { buttonBase, buttonVariants } from "@/components/ui/Button";
import {
  authFieldClass,
  authLabelClass,
} from "@/components/auth/AuthShell";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const confirmFailed = searchParams.get("fehler") === "bestaetigung";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!isSupabaseConfigured) {
      setError(
        "Der persönliche Bereich ist noch nicht eingerichtet. Bitte später erneut versuchen.",
      );
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      setError("E-Mail oder Passwort stimmen nicht. Bitte versuche es erneut.");
      return;
    }

    // Nach erfolgreichem Login zum persönlichen Raum (oder zum ursprünglich
    // angefragten geschützten Ziel).
    const weiter = searchParams.get("weiter");
    router.push(weiter && weiter.startsWith("/") ? weiter : "/konto");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {confirmFailed && !error && (
        <p
          role="alert"
          className="rounded-xl border border-rose-400/20 bg-rose-400/[0.06] px-4 py-3 text-sm leading-relaxed text-rose-200/90"
        >
          Die E-Mail-Bestätigung konnte nicht abgeschlossen werden. Bitte
          versuche es erneut oder melde dich an.
        </p>
      )}

      <div>
        <label htmlFor="email" className={authLabelClass}>
          E-Mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={authFieldClass}
          placeholder="du@beispiel.de"
        />
      </div>

      <div>
        <label htmlFor="password" className={authLabelClass}>
          Passwort
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={authFieldClass}
          placeholder="••••••••"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm leading-relaxed text-rose-300/90">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`${buttonBase} ${buttonVariants.primary} w-full disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {loading ? "Einen Moment …" : "Einloggen"}
      </button>

      <p className="pt-2 text-center text-sm text-slate-400">
        Noch kein Konto?{" "}
        <Link
          href="/registrieren"
          className="text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
        >
          Registrieren
        </Link>
      </p>
    </form>
  );
}
