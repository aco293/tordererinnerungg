# Luminalis

## Definition

> Luminalis ist ein persönliches Begleitsystem, das Menschen individuell auf
> ihrer Reise unterstützt und ihnen hilft, Verbindung, Erinnerung, Resonanz,
> innere Ausrichtung und Entfaltung bewusster zu erleben.

TorDerErinnerung bleibt der öffentliche Ort. Luminalis ist der persönliche,
geschützte Bereich für eingeloggte Menschen – ein ruhiger Raum, der mit dem
Menschen wächst.

## Die erste Ausrichtung

Luminalis beginnt mit der **„Ersten Ausrichtung"** (`/luminalis/onboarding`).

In ihr nimmt der Mensch behutsam seinen aktuellen Weg wahr: Anzeigename,
aktueller Fokus, eine begleitende Leitfrage, die gerade wichtigen Säulen,
wiederkehrende Resonanzthemen und eine erste Intention.

Diese Ausrichtung bildet die **Grundlage des persönlichen Begleitsystems**. Sie
wird im persönlichen Raum „Mein Weg" gespiegelt und wächst mit der Zeit weiter.

## Die fünf Säulen

Verbindung, Erinnerung, Resonanz, Innere Ausrichtung und Entfaltung sind die
fünf Säulen von Luminalis.

### 1. Verbindung
Was gehört in deinem Leben wieder zusammen? Luminalis hilft, Beziehungen,
Themen und Lebensbereiche bewusster miteinander in Bezug zu setzen – statt sie
getrennt voneinander zu betrachten.

### 2. Erinnerung
Welche Erkenntnisse möchten sichtbar bleiben? Bedeutsame Einsichten werden
bewahrt und wieder auffindbar gemacht – nicht als Datenberg, sondern als lebendige
Erinnerung.

### 3. Resonanz
Welche Themen kehren immer wieder zu dir zurück? Luminalis macht wiederkehrende
Muster behutsam sichtbar und lädt zur Selbsterkenntnis ein.

### 4. Innere Ausrichtung
Welche Schritte passen zu deinem inneren Kompass? Luminalis stärkt die eigene
Ausrichtung, anstatt von außen zu steuern.

### 5. Entfaltung
Wie wächst du über die Zeit? Luminalis begleitet Entwicklung als offenen,
fortlaufenden Prozess – im eigenen Rhythmus.

## Dialograum V0

Der Dialograum (`/luminalis/dialog`) ist **kein KI-Chat**. Er ist der erste Raum
der Selbstverbindung: Der Mensch hält in eigenen Worten fest, was gerade in ihm
präsent ist – Modus, berührte Säule, Titel, Inhalt und mitschwingende
Resonanzthemen.

- Luminalis antwortet hier noch nicht – es hört zu.
- Nutzer speichern eigene Weg-Einträge; sie bleiben privat und beim Nutzerkonto.
- Ruhige Reflexionsfragen begleiten, ohne zu bewerten oder zu diagnostizieren.
- Diese Einträge bilden später die Grundlage für Erinnerung, Resonanz und
  Frequenzintelligenz.

## Frequenzspiegel V0

Der Frequenzspiegel (`/luminalis/frequenzspiegel`) ist die erste sichtbare
Schicht der späteren Frequenzintelligenz.

- Er basiert ausschließlich auf den eigenen Weg-Einträgen des Nutzers.
- Er zählt und ordnet Säulen, Modi und Resonanzthemen.
- Er bewertet nicht.
- Er diagnostiziert nicht.
- Er formuliert nur behutsame Spiegelungen.
- Er ist die Brücke zwischen Dialograum und späterem KI-Begleiter.

## Leitplanken

Luminalis folgt der [Charta](./CHARTA.md): Der Mensch entscheidet, die KI
begleitet. Klarheit vor Komplexität, Erinnerung vor Datenanhäufung, Datenschutz
als Grundlage.

## Status

Aktuell sind die Auth-Grundlage und die erste persönliche Profilebene
vorbereitet:

- Öffentliche Auth-Seiten: `/anmelden`, `/registrieren`
- Auth-Callback (E-Mail-Bestätigung): `/auth/callback`
- Geschützter Einstieg: `/konto`
- Geschützte erste Ausrichtung: `/luminalis/onboarding`
- Geschützter persönlicher Raum: `/luminalis/mein-weg`
- Geschützter Dialograum: `/luminalis/dialog`
- Geschützter Frequenzspiegel: `/luminalis/frequenzspiegel`

Datenbasis:

- `profiles` und `luminalis_profiles` mit Row Level Security
  (`supabase/migrations/001_luminalis_foundation.sql`).
- `luminalis_entries` für die Weg-Einträge des Dialograums
  (`supabase/migrations/002_luminalis_entries.sql`).

Der Dialograum bildet die Grundlage für den Frequenzspiegel und die spätere
Frequenzintelligenz.

Komplexere Funktionen (KI-Begleiter u. a.) folgen in späteren Phasen – behutsam
und gemäß dieser Definition.
