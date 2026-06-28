/**
 * Kleiner, ruhiger Hinweis darauf, welche eigenen Daten der Dialog
 * behutsam einbeziehen kann. Transparenz ohne Drama.
 */
export function ContextNotice() {
  return (
    <p className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-xs leading-relaxed text-slate-400/85">
      Dieser Dialog kann dein Luminalis-Profil, Weg-Einträge, Erkenntnisse,
      Integrationen und Frequenzmuster einbeziehen. Er deutet dich nicht – er
      spiegelt aus deinen eigenen Worten. Du entscheidest, was stimmig ist.
    </p>
  );
}
