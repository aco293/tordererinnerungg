"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    if (!isSupabaseConfigured) return;
    setLoading(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={loading}
      className={`${buttonBase} ${buttonVariants.ghost} disabled:cursor-not-allowed disabled:opacity-60`}
    >
      {loading ? "Wird abgemeldet …" : "Abmelden"}
    </button>
  );
}
