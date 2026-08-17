---
name: jasswiki-serp-vorlagen
description: Messung 15.08.26 der jasswiki-Suchergebnistexte — 204 von 264 Beschreibungen stammen aus fünf Vorlagen, 213 Titel überschreiten 60 Zeichen, vier verschiedene Markennamen im Titel
metadata:
  type: project
---

Live gemessen am 15.08.2026 über alle 264 Sitemap-URLs (Titel und Meta-Beschreibung aus dem
ausgelieferten HTML):

- **204 von 264 Beschreibungen (77 %) kommen aus fünf Textbausteinen:** 71× «Die Definition und
  Bedeutung des Jass-Begriffs …», 57× «Die offiziellen Jassregeln für …», 48× «Lerne die
  Jass-Variante …», 26× «Alles über … beim Jassen», 2× «Erfahre die Regeln …». 81 Beschreibungen
  bleiben unter 120 Zeichen und verschenken Platz im Suchergebnis.
- **213 von 264 Titeln sind länger als 60 Zeichen, 151 länger als 70.** Google kürzt sie.
  Die Vorlagen setzen die Wiederholung nach vorne («Jassregeln für X: Sub im Detail erklärt»).
- **Vier Markennamen im Titel:** 220× «| Jass-Wiki», 18× «| Jassguru.ch» (die
  Unterkategorie-Seiten aus `[category]/[subcategory]/index.tsx`), 18× «| Das Schweizer Jass-Wiki»,
  4× «| JassWiki».
- **Interne Konkurrenz um dasselbe Wort:** 4 Seiten tragen «Verwerfen» im Titel, 4 «Stöck»,
  3 «Kartenwert».
- Die Vorlagen liegen in den `getStaticProps` der vier Seiten-Vorlagen (grosse `switch`-Blöcke
  über die Hauptkategorie), Einzelfälle stehen dort bereits als `if (contentItem.id === …)`.

**Why:** Sechs Seiten mit über 150 Impressionen tragen null Klicks, darunter `/weis-regeln/stoeck/`
auf Position 6,89 mit 381 Impressionen. Der Verdacht fiel auf Titel und Beschreibung.

**How to apply:** Als Hebel gilt: pro Artikel ein eigenes Feld für Titel und Beschreibung im
Inhalt, Vorlage nur noch als Rückfallebene. Bei Null-Klick-Diagnosen zusätzlich die Suchanfragen
je Seite aus der GSC holen, bevor der Text als Ursache gilt; bei 0 von 381 kann ebenso eine
AI-Übersicht die Antwort abfangen. Siehe [[jasswiki-datum-wahrheit]].
