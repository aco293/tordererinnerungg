"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { buttonBase, buttonVariants } from "@/components/ui/Button";
import {
  authFieldClass,
  authLabelClass,
} from "@/components/auth/AuthShell";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function RegisterForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    });
    setLoading(false);

    if (signUpError) {
      setError("Das hat nicht geklappt. Bitte versuche es erneut.");
      return;
    }

    // Mit aktiver E-Mail-Bestätigung gibt es noch keine Session.
    if (data.session) {
      router.push("/konto");
      router.refresh();
      return;
    }

    setNotice(
      "Fast geschafft. Bitte bestätige deine E-Mail-Adresse über den Link, den wir dir gesendet haben.",
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
        <p role="status" className="text-sm leading-relaxed text-gold-soft">
          {notice}
        </p>
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
          href="/anmelden"
          className="text-gold underline decoration-gold/40 underline-offset-4 transition-colors hover:decoration-gold"
        >
          Einloggen
        </Link>
      </p>
    </form>
  );
}
