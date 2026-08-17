---
name: jasswiki-internal-links-audit
description: Messung 15.08.26 der internen Verlinkung auf jasswiki.ch — 394 von 572 Fliesstext-Markern zeigen aufs falsche Ziel; Ursache ist eine Codezeile im InternalLinker
metadata:
  type: project
---

Am 15.08.2026 im Auftrag von POLIER gemessen (Stand main `7f9ea51`, live geprüft):

- **610 `(siehe Begriff "id")`-Marker** im Bestand: 572 im Fliesstext, 38 in FAQ-Antworten.
- **Fliesstext: 178 korrekt, 394 auf ein anderes Ziel als die genannte Kennung** — betrifft
  128 von 158 markertragenden Artikeln, 58 verschiedene falsche Zielseiten.
- **Alle 289 internen Linkziele leben** (272 direkt 200, 17 über 301 auf 200, **0 mal 404**).
  Das Problem ist die Zielwahl, nicht die Zielexistenz.
- **Ursache = eine Codezeile:** `src/components/layout/InternalLinker.tsx`, Regel 2 —
  `linkMap.get(term) ?? resolve(refId)`. Das angezeigte Wort schlägt die ausdrückliche
  Kennung. `linkMap` ist keyword-basiert mit «letzter Artikel gewinnt»; von 1919 Schlüsseln
  sind 820 doppelt belegt. Regel 1 und 3 machen es richtig (Kennung zuerst).
- **Verteilung der Reparatur:** 301 Fälle sind reiner Auflöser-Fehler (Kennung passt zum
  Wort) → KELLE. 93 Fälle brauchen zusätzlich einen Inhalts-Entscheid (Wort und Kennung
  passen nicht zueinander, z.B. «Trumpffarbe» → Kennung `bodentrumpf`) → SCHIRI.
- **FAQ-Antworten laufen gar nicht durch den Auflöser** (`FaqSection.tsx` rendert
  `{faq.answer}` roh, `FaqJsonLdSchema.tsx` schiebt denselben Rohtext ins FAQPage-Schema).
  38 Marker sind darum für Leser **sichtbar** und stehen im strukturierten Datensatz bei Google.

**Why:** Remo fand beim Lesen zwei falsche Verweisziele (Tischregel, Schieber); POLIER wollte
das Ausmass und die Zuständigkeit belegt haben, bevor jemand repariert.

**How to apply:** Vor jeder Arbeit an Verlinkung oder Marker-Text dieser Messung folgen:
Auflöser zuerst (eine Zeile, 301 Treffer), Inhalt danach (93 Wort/Kennung-Paare). Neue
Messung nachfahren, sobald ein Fix live ist — die Zahlen oben sind der Vorher-Stand.
Siehe [[jasswiki-faq-umgeht-linker]].
