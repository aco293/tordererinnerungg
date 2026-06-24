/**
 * Das werdende System „Luminalis“.
 * Vorstellung der zukünftigen Module – noch ohne Funktion, rein beschreibend.
 */

export type LuminalisModule = {
  key: string;
  title: string;
  symbol: string;
  description: string;
  status: "Konzept" | "In Entstehung" | "Vision";
};

export const luminalisIntro = {
  eyebrow: "Das werdende Feld",
  title: "Luminalis",
  subtitle:
    "Ein zusammenwachsendes System aus Resonanz, Klang, Wissen und Verbindung.",
  paragraphs: [
    "Luminalis ist die nächste Schwelle hinter dem Tor – ein lebendiges Feld, das nach und nach Form annimmt. Es verbindet die Räume der Erinnerung zu einem kohärenten Ganzen.",
    "Noch ist Luminalis im Werden. Was hier beschrieben wird, ist Vision und Richtung – kein fertiges Produkt, sondern ein Versprechen an die Zukunft.",
  ],
} as const;

export const luminalisModules: LuminalisModule[] = [
  {
    key: "resonanzkarte",
    title: "Resonanzkarte",
    symbol: "✶",
    description:
      "Eine lebendige Karte der inneren Räume und ihrer Verbindungen – ein Kompass für den eigenen Weg.",
    status: "Konzept",
  },
  {
    key: "klangraum",
    title: "Klangraum",
    symbol: "≈",
    description:
      "Klangformeln und Frequenzsequenzen, die Zustände der Sammlung und Klarheit unterstützen.",
    status: "In Entstehung",
  },
  {
    key: "lichtbibliothek",
    title: "Lichtbibliothek",
    symbol: "❖",
    description:
      "Ein wachsender Wissensschatz aus Beiträgen, Erinnerungen und geteilten Einsichten.",
    status: "In Entstehung",
  },
  {
    key: "vernetzungsfeld",
    title: "Vernetzungsfeld",
    symbol: "❂",
    description:
      "Ein Feld der Begegnung – Menschen auf dem Weg der Erinnerung finden zueinander.",
    status: "Vision",
  },
  {
    key: "tor-reisen",
    title: "Tor-Reisen",
    symbol: "☉",
    description:
      "Geführte innere Reisen durch die Räume – ein bewusster Gang von Schwelle zu Schwelle.",
    status: "Vision",
  },
];
