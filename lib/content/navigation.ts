/**
 * Globale Navigationsstruktur.
 * Wird von Header und Footer gemeinsam genutzt.
 */

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

export const mainNav: NavItem[] = [
  { label: "Räume", href: "/raeume", description: "Die Bewusstseinsräume" },
  { label: "Luminalis", href: "/luminalis", description: "Das werdende System" },
  {
    label: "Lichtbibliothek",
    href: "/lichtbibliothek",
    description: "Wissen & Beiträge",
  },
  {
    label: "Klangraum",
    href: "/klangraum",
    description: "Klangformeln & Meditationen",
  },
  { label: "Über", href: "/ueber", description: "Über TorDerErinnerung" },
];

export const footerNav: NavItem[] = [
  { label: "Startseite", href: "/" },
  ...mainNav,
];
