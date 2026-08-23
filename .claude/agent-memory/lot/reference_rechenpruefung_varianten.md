---
name: rechenpruefung-varianten
description: Prüfgriffe für Rechnungen und Kartenbilder in jasswiki-Varianten- und Weis-Artikeln (Generalprüfung 9 Artikel, 23.08.26) — Kartenbild gegen eigene Legende, Punktdeckel nach Ablegen, FAQ ohne Zahlenbedingung
metadata:
  type: reference
---

Gefunden bei der Generalprüfung der neun Artikel am 23.08.26 (hoch_tief, austrumpfen,
expressions_weis, stock, kreuzweis, bieder, pandur, sidi_barrani, hose_abe). Rechnerisch
hielten rund vierzig von zweiundvierzig Stellen — die Fehler sassen dort, wo eine **Zahl ein
Bild oder einen Nachbarsatz beweisen sollte**.

## 1. Jedes `[[karten:]]`-Bild gegen SEINE EIGENE Legende rechnen

Die Marke rendert die Slugs **in der genannten Reihenfolge**, ohne Sortierung
(`src/components/wissen/JassKartenReihe.tsx`, `slugs.map` bei Z. 83–86, kein `sort`). Zwei
Treffer dieser Runde, beide im selben Artikel:

- `expressions_weis` Z. 116: `[[karten: schellen-6, schellen-7, schellen-8 | … Der Sechser
  ist dort die höchste Karte und **steht darum rechts**]]` — er steht links.
- `expressions_weis` Z. 5 behauptet «Die Stöck stehen so, wie man sie nennt: König und Ober»;
  **beide** Stöck-Marken im Bestand listen `rosen-ober, rosen-koenig`.

Griff: Legt der Artikel eine Leserichtung fest («tiefste links»), jede Marke einmal gegen
diese Richtung UND gegen ihren eigenen Legendentext lesen. Bei Undenufe/Hindersi kippt die
Ordnung — dort ist die Falle systematisch.

## 2. Illustrationen, die einen Satz beweisen sollen, widerlegen ihn oft

`schieber_taktiken_austrumpfen` Z. 23 sagt richtig «Farben alle, so sind nach zwei Runden
acht der neun Trümpfe gespielt» — das gilt nur bei Verteilung 3/2/2/2. Das Bild darunter
(Z. 25) gibt dem Ansager **vier** Trümpfe: dann bleiben fünf für drei Spieler, zwei volle
Runden bräuchten sechs. Höchstens sieben Trümpfe sind spielbar.
**Griff: Bei jeder «nach N Runden sind X Karten gespielt»-Aussage die Handverteilung des
Beispiels gegenrechnen, nicht nur die Summe.**

## 3. Punktdeckel nach Ablegen/Aussortieren

`variants_strategic_bieder`: Der König legt 6 Karten mit 17 Punkten ab, der Artikel schreibt
ihm dann «rund 150 Kartenpunkte» zu. Der Artikel legt sein Modell selbst fest (gespielt +
abgelegt = 157), also liegen im Spiel höchstens 140.
**Griff: Sobald Karten aus dem Spiel genommen werden (Bieter-Ablage, Pandur-Stock,
Hose-abe-Mitte), zuerst den Punktdeckel ausrechnen, dann jede genannte Punktzahl dagegen
halten.** Deckwerte: volles Blatt 152 + 5 letzter Stich = 157; Pandur-24er ebenfalls 152 + 5
(6/7/8 zählen null); Stock zu zweit ≈ 50.

## 4. FAQ verliert die Zahlenbedingung — wieder

Wie am 20.08. (FAQ 6, inzwischen geheilt) trat es 23.08. in FAQ 11 von `hoch_tief` neu auf:
«Liegt darunter eine tiefere als die gespielte Karte, so hätte sein Partner diese gespielt» —
ohne die Bedingung «genau zwei übrig» ist der Schluss falsch. Gegenbeispiel: übrig Ober,
Banner, 7, 6; Partner spielt die 8 und hält 8+Banner+Ober (drei, tief-hoch korrekt).
**Griff: Jede FAQ, die einen Schluss aus dem Fliesstext zusammenfasst, mit einem selbst
gebauten Gegenbeispiel angreifen — die Verkürzung sitzt immer an der Zahlenbedingung.**

## 5. Zwei FAQ desselben Artikels gegeneinander lesen

`hoch_tief` FAQ 7 «Du spielst den Puur im ersten Stich» gegen FAQ 8 «Du gibst ihn zum
Trumpfausspiel nicht». Beide gehen als schema.org einzeln hinaus. **Griff: FAQ-Liste einmal
als Liste lesen, nicht nur Artikel→FAQ.**

## 6. «In allen folgenden Beispielen …» ist eine prüfbare Behauptung

`hoch_tief` Z. 27 legt Trumpf und Ansagerblatt für «alle folgenden Beispiele» fest; drei
Unterfälle brechen es unmarkiert (Ansager spielt Puur / Ass / hält den Puur gar nicht).
Der einzige markierte Wechsel heisst «**Diesmal**» (Z. 127).

## 7. Verbandslesart-Versprechen als Checkliste benutzen

Steht im Vorspann «Wo nichts Verbindliches besteht, steht die Empfehlung des Verbands, **so
gekennzeichnet**» oder «daneben die Innerschweizer Praxis, **wo sie abweicht**», ist das eine
prüfbare Zusage. Zwei Verstösse dieser Runde:
- `sidi_barrani` Z. 106 «Das Gebot wird mit Kartenpunkten erreicht» — das eigene Quellenblatt
  `QUELLE-MUELLER-SIDI-BARRANI.md` Z. 96 führt genau das als Lücke.
- `bieder` nennt zwei Innerschweizer Abweichungen, drei fehlen: Verzicht **157** statt 257,
  Bodentrumpf 6 = Undeufe / Ass = Obeabe, «falsch abgelegt → keine Weis- **und** keine
  Spielpunkte» (`jassverzeichnis.txt:23831 ff.`, `:23871`).
**Griff: Vorspann lesen, dann die Quellenblätter im Haus (`QUELLE-MUELLER-*.md`, Abschnitt
«Was Müller NICHT nennt») Zeile für Zeile gegen den Artikel abhaken.**

## 8. Taktik-Abschnitte: steht dort eine HANDLUNG?

`bieder` Z. 164 «Darum holt der Bauer, der vor dem König an der Reihe ist, die Stiche» —
aus «der Gewinner spielt aus» folgt nicht, wer gewinnt. Die Quelle hatte das Verb noch
(«sollte die Bauernpartei den König in Mittelhand **bringen**»,
`QUELLE-MUELLER-BIETER.md` Z. 32). **Griff: In Taktikabschnitten das Verb suchen. Steht dort
nur eine Beschreibung, fehlt die Anweisung.**

## 9. Nachgeschlagene Eichstellen dieser Runde (spart die nächste Suche)

- Weiswerte + Vergleichsschritte + «Ausnahme Undeufe: hier die tiefste»: `jassverzeichnis.txt:11533–11546`
- Kartenwerte Trumpf/Undeufe/Obeabe als Tabelle: `jassverzeichnis.txt:11619` (Undeufe: Ass 0, Acht 8, Sechs 11)
- Vier Sechser schlagen vier Zehner im Undeufe: `jassverzeichnis.txt:877–881`
- Weis-Meldefrist wörtlich: `wikipedia.txt:172` («bis der Stich umgedreht ist»)
- Weis deklarieren bis zum Ausspiel des 2. Stichs: `jassverzeichnis.txt:14081`
- Trumpf-Bauer muss nie bedient werden (ausser letzter Stich): `jassverzeichnis.txt:3070`, `:8836`
- Matschprämie 100 / 1 Strich für Match: `jassverzeichnis.txt:5715`, `:12859`
- Bieter Innerschweiz komplett: `jassverzeichnis.txt:23831–23999`
- Pandur-Wertungstabelle: `jassverzeichnis.txt:1090–1110`
- Sidi-Barrani Grundform, Ansagesystem, Doppeln, Herkunft: `jassverzeichnis.txt:21284 ff.`, `:21464 ff.`
- Sidi-Schlussregeln (Bonus/Überbiet) stammen aus `swissjass.ch/dokumente/sidi1.pdf`,
  belegt über `remo-transkript.txt:3121`, `:6229` (Zweck), `:7206`

Ergänzt [[kaltlese-konventionsartikel]], [[jasswiki-pruefwerkzeuge]], [[weis-quellenlage]],
[[sammelartikel-gegen-jedes-mitglied]].
