/**
 * Zentrale Seiten-Metadaten und globale Texte.
 * Alle statischen Inhalte werden hier gepflegt, damit sie an einem Ort liegen.
 */

export const site = {
  name: "Tor der Erinnerung",
  tagline: "Ein digitales Tor für Bewusstsein, Erinnerung und innere Rückverbindung.",
  description:
    "Ein ruhiger, mystischer Raum für Bewusstsein, Erinnerung, Frequenzwissen und die Rückverbindung mit dem eigenen inneren Ursprung.",
  author: "Aureon Thal’Emar",
  url: "https://tordererinnerung.de",
} as const;

export const homeHero = {
  eyebrow: "Willkommen am Tor",
  title: "Tor der Erinnerung",
  subtitle:
    "Ein digitales Tor für Bewusstsein, Erinnerung und innere Rückverbindung.",
  primaryCta: { label: "Tor betreten", href: "/raeume" },
  secondaryCta: { label: "Luminalis entdecken", href: "/luminalis" },
} as const;

export const homeIntro = {
  eyebrow: "Kein gewöhnlicher Ort",
  title: "Ein Weg der Erinnerung",
  paragraphs: [
    "Diese Seite ist kein gewöhnlicher Blog und keine Sammlung von Informationen. Sie ist ein Weg – ein stiller Pfad zurück zu dem, was in dir bereits gewusst wird.",
    "Hier geht es nicht um neues Wissen, sondern um Erinnerung. Um das ruhige Wiedererkennen dessen, was unter dem Lärm des Alltags verborgen liegt.",
  ],
} as const;

export const homeKlangraum = {
  eyebrow: "Klangraum",
  title: "Frequenz, die erinnert",
  text: "Klangformeln, meditative Sequenzen und Aktivierungen, die nicht zerstreuen, sondern sammeln. Ein Raum, in dem Stille und Schwingung zusammenfinden.",
  cta: { label: "Klangraum öffnen", href: "/klangraum" },
} as const;

export const homeAbout = {
  eyebrow: "Wegbegleiter",
  title: "Aureon Thal’Emar",
  text: "Aureon Thal’Emar versteht sich als Wegbegleiter – nicht als Guru, nicht als Autorität über deinen Weg. Eine Stimme, die erinnert, dass die Antworten bereits in dir wohnen. Du gehst, du entscheidest, du erinnerst dich selbst.",
  cta: { label: "Mehr über das Tor", href: "/ueber" },
} as const;
