---
name: jasswiki-kartenkopf-budget
description: In der Kopfzeile der Kartenreihe schrumpft der Sprachumschalter, wenn die Aufschrift lang ist — gemessene Grenze 109 px auf 375 px, betrifft nur den ERSTEN Kartenblock einer Seite
metadata:
  type: reference
---

Die Kopfzeile `.jw-karten-kopf` ist eine Flex-Zeile mit `justify-content: space-between`
aus Aufschrift (`.jw-karten-marke`) und Sprachumschalter (`.jw-karten-wahl`). Der
Umschalter hat **kein `flex-shrink: 0`** und trägt `overflow: hidden` — er schrumpft
darum und schneidet sein eigenes Wort «Französisch» ab.

**Gemessen am Live-Bild, 23.08.2026:** Auf 375 px ist die Kopfzeile 285 px breit, der
volle Umschalter 164 px, der Abstand 12 px. Der Aufschrift bleiben damit **109 px**.
Darüber schrumpft der Umschalter. Belegte Fälle: «Kreuzweis, erster Weis» (134 px) →
25 px verdeckt auf 375, 53 px auf 320, 18 px noch auf 390. Auf 320 px schneidet sogar
«Jasskarten» (81 px) 27 px ab. Am Desktop schrumpft nichts.

Grössenordnung gemessener Aufschriften: «Blatt A» 51 · «Hose abe»/«Vorhand» 61 ·
«Ansage 80» 69 · «Mein Blatt» 73 · «Stichfolge»/«Zwei Böcke» 76 · «Jasskarten» 81 ·
«Drei Trümpfe» 89 · «Zwei Trümpfe»/«Bodentrumpf» 92 · «Was ich verwerfe» 116 ·
«Blatt der Vorhand» 121 · «Stichfolge im Trumpf» 129.

**Why:** SCHIRI füllt gerade die 32 Reihen, die heute «Jasskarten» heissen, mit
sprechenden Titeln. Jeder davon ist länger als «Jasskarten» — wer die Titel setzt, ohne
die Kopfzeile zu reparieren, schneidet auf mehreren Seiten das Wort «Französisch» ab.

**How to apply:** Der Umschalter steht nur beim **ersten** Kartenblock einer Seite
(`mitWahl`), also gilt die Grenze auch nur dort. Dauerhafte Lösung, bevor lange
Aufschriften kommen: `.jw-karten-wahl { flex: 0 0 auto; }` plus `min-width: 0` an der
Aufschrift — dann ist die Länge frei. Solange das offen ist, für erste Blöcke ≤ 109 px
wählen.

Siehe auch [[jasswiki-messaufbau]], [[jasswiki-kartenbild-doktrin]].
