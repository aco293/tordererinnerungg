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
import { safeInternalPath } from "@/lib/auth/redirect";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const nextPath = safeInternalPath(searchParams.get("weiter"));
  const loginHref =
    nextPath === "/konto"
      ? "/anmelden"
      : `/anmelden?weiter=${encodeURIComponent(nextPath)}`;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setNotice(null);

    if (!isSupabaseConfigured) {
      setError(
        "Die Registrierung ist noch nicht eingerichtet. Bitte später erneut versuchen.",
      );
      return;
    }

    if (password.length < 6) {
      setError("Bitte wähle ein Passwort mit mindestens 6 Zeichen.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
      },
    });
    setLoading(false);

    if (signUpError) {
      setError("Das hat nicht geklappt. Bitte versuche es erneut.");
      return;
    }

    // Mit aktiver E-Mail-Bestätigung gibt es noch keine Session.
    if (data.session) {
      router.push(nextPath);
      router.refresh();
      return;
    }

    setNotice(
      "Fast geschafft. Bitte bestätige deine E-Mail-Adresse über den Link, den wir dir gesendet haben. Danach kannst du dich anmelden.",
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
          autoComplete="new-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={authFieldClass}
          placeholder="Mindestens 6 Zeichen"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm leading-relaxed text-rose-300/90">
          {error}
        </p>
      )}
      {notice && (
        <div className="rounded-xl border border-gold/20 bg-gold/[0.05] px-4 py-3">
          <p role="status" className="text-sm leading-relaxed text-gold-soft">
            {notice}
          </p>
          <Link
            href={loginHref}
            className="mt-3 inline-block text-sm text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
          >
            Zur Anmeldung
          </Link>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`${buttonBase} ${buttonVariants.primary} w-full disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {loading ? "Einen Moment …" : "Konto erstellen"}
      </button>

      <p className="pt-2 text-center text-sm text-slate-400">
        Schon ein Konto?{" "}
        <Link
          href={loginHref}
          className="text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
        >
          Einloggen
        </Link>
      </p>
    </form>
  );
}
