import { buttonBase, buttonVariants } from "@/components/ui/Button";
import { getCheckoutUrl } from "@/lib/content/books";

type BookBuyButtonProps = {
  slug: string;
  className?: string;
  /** Kleinen Vorbereitungs-Hinweis unter dem Button zeigen. */
  withHint?: boolean;
};

/**
 * Sicherer, vorbereiteter Kaufbutton.
 *
 * - Ist eine öffentliche Checkout-URL gesetzt (NEXT_PUBLIC_…), öffnet der Button
 *   sie in einem neuen Tab: „Jetzt kaufen".
 * - Ohne URL bleibt der Button ruhig deaktiviert: „Bald verfügbar".
 *
 * Es werden niemals Preise, Produkt-IDs oder geheime Keys im Client verwendet –
 * ausschließlich die öffentliche Payment-/Produkt-Link-URL.
 */
export function BookBuyButton({ slug, className = "", withHint = false }: BookBuyButtonProps) {
  const checkoutUrl = getCheckoutUrl(slug);

  if (checkoutUrl) {
    return (
      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`${buttonBase} ${buttonVariants.primary} ${className}`}
      >
        Jetzt kaufen
      </a>
    );
  }

  const disabledButton = (
    <button
      type="button"
      disabled
      aria-disabled="true"
      className={`${buttonBase} cursor-not-allowed border border-white/10 bg-white/[0.03] text-slate-400/80 ${className}`}
    >
      Bald verfügbar
    </button>
  );

  if (!withHint) return disabledButton;

  return (
    <div>
      {disabledButton}
      <p className="mt-2 text-xs text-slate-500">
        Der Kaufbereich wird vorbereitet.
      </p>
    </div>
  );
}
