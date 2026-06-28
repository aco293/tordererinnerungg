import Link from "next/link";
import { chatModeLabel } from "@/lib/luminalis/ai/chatModes";
import type { LuminalisChatSession } from "@/lib/luminalis/ai/chat";

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function ChatSessionList({
  sessions,
}: {
  sessions: LuminalisChatSession[];
}) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
        <p className="text-sm leading-relaxed text-slate-400/85">
          Noch kein Dialog begonnen. Wenn du möchtest, beginne weiter unten
          einen neuen.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {sessions.map((session) => (
        <li key={session.id}>
          <Link
            href={`/luminalis/chat/${session.id}`}
            className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors hover:border-white/20"
          >
            <span className="min-w-0">
              <span className="block truncate text-sm text-white">
                {session.title?.trim() || "Unbenannter Dialog"}
              </span>
              <span className="mt-1 block text-xs uppercase tracking-[0.15em] text-slate-500">
                {chatModeLabel(session.mode)} · {formatDate(session.created_at)}
              </span>
            </span>
            <span aria-hidden className="shrink-0 text-gold/50">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
