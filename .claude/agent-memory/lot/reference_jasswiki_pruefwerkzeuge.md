---
name: jasswiki-pruefwerkzeuge
description: Die drei Prüfläufe im jasswiki-Repo für Artikel-Kaltlesungen und ihre blinden Flecken (Sprachwächter, Farbwörter-Loch-Prüfung, Karten-Slugs)
metadata:
  type: reference
---

Nachrechenbare Gegenproben bei einer jasswiki-Kaltlesung — alle im Repo-Root
`/Users/remoprinz/Documents/Jassguru/jasswiki`:

- `npm run sprache` — Sprachwächter über alle Artikel; meldet Anweisungen auf einer
  Verneinung. **Blinder Fleck:** beschreibende Verneinungen («es gibt keinen Trumpf,
  keinen Weis») laufen durch, ebenso Behauptungen ohne Deckung.
- `npm run pruefe:farbwoerter -- <kennung>` — prüft, ob nach dem Wechsel aufs
  französische Blatt noch Deutschschweizer Kartenwörter im sichtbaren Text stehen.
  **Blinder Fleck:** ohne Argument läuft nur `variants_strategic_sidi_barrani`
  (`farbwoerter-pruefen.ts:113`). Jeden Artikel mit `metadata.farbwechsel: true` von
  Hand nachschieben.
- **Kartenreihen:** Slugs `<farbe>-<rang>` gegen `src/components/wissen/jasskarten.ts`
  (RANKS_DE/SUITS_DE) prüfen. Ein unbekannter Slug lässt die Abbildung still
  verschwinden. Unter jeder Karte steht `karte.name` («Rosen Banner») — die
  Beschriftung muss zu diesem Wort passen, auch im französischen Blatt («Herz Zehn»).
- **Farbwechsel greift nur im Fliesstext.** `FaqSection` rendert die Antworten roh
  über ReactMarkdown ohne `farbwoerterFr`; der Fliesstext läuft über `InternalLinker`
  mit `farbwechsel`. Kartenwörter in FAQ-Antworten bleiben darum beim Wechsel stehen.

Ergänzt [[kaltlese-protokoll]] und [[sollwerte-im-auftrag-pruefen]]: Diese Läufe sind
repo-interne Autorität, kein Fremdwissen.
