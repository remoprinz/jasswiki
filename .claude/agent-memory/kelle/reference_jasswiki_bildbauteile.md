---
name: jasswiki-bildbauteile
description: Feel-Entscheide an den Kartenbauteilen von jasswiki — Rollhinweis am Band, Aufschrift unter dem Jasstisch, Sprungziele aus der Aufschrift (23.08.2026)
metadata:
  type: reference
---

Entscheide an `JassKartenReihe` / `JassTisch`, die man dem Code ansieht, aber
nicht begründet findet (gebaut 23.08.2026, Branch `kelle/bild-welle2`):

- **Der Rollhinweis hängt an der gemessenen Bandlage, nie an einer Breite.**
  Das Band setzt `data-roll` (nein · rechts · beide · links) aus
  `scrollWidth/scrollLeft`, ResizeObserver plus Scroll-Lauscher; CSS malt daraus
  den Verlauf, die Komponente zeigt den Zeiger. Grund: Ob eine Reihe rollt, hängt
  von der Kartenzahl UND der Breite ab — auf 320 px rollen schon vier Karten, auf
  375 px erst fünf, am Schirm keine. Eine Regel über `data-karten` oder eine
  Media-Query wäre auf jeder zweiten Breite falsch.
- **Verlauf UND Zeiger, nicht nur der Verlauf.** Der Verlauf allein (34 px) sagt
  «da ist noch etwas», er sagt nicht wohin; erst der runde Zeiger auf der Kante
  macht es unmissverständlich. Er nimmt keine Klicks an (`pointer-events: none`),
  damit die Karte darunter anfassbar bleibt, und sitzt auf 37 % der Bandhöhe —
  das ist die Mitte des Kartenbildes, als Anteil geschrieben, damit es bei jedem
  Kartenmass stimmt.
- **Das Blatt unter dem Jasstisch heisst «Mein Blatt».** Übersteuerbar in der
  Marke mit `blatt-aufschrift …`. Grund: Der Text nennt regelmässig mehr Karten,
  als das Blatt zeigt (die ausgespielte liegt schon auf dem Filz) — die Aufschrift
  sagt, dass hier die Hand NACH dem Ausspielen steht.
- **Sprungziele kommen aus dem deutschen Wortlaut.** `InternalLinker` bildet
  `#bild-<aufschrift>` aus dem unübersetzten Text, bevor `farbwoerterFr` läuft;
  sonst wechselte die Adresse mit dem Kartenbild. Wiederholungen zählen hoch
  (`…-2`), gezählt je Renderdurchgang eines Textes — eine Seite mit ZWEI
  `InternalLinker` (Kartenfarben, Trumpffarben) könnte theoretisch kollidieren,
  am 23.08. tat es keine der neun Seiten.
- **Die hervorgehobene Karte («slug!») trägt den Griff der Arena, nicht deren
  Farbe** (23.08.2026, Remo: «so, wie wenn man das erste Mal tippt beim
  Kartenlegen»). Am `PlayerHandFan` gemessen: Hub 26 von 144 px, z-index über
  die Nachbarn, `0 0 0 2px #00FF46, 0 0 14px rgba(0,255,70,.55)`, ohne
  Bewegung. Übernommen sind Hub, Ring und Schein; der Ton wechselt auf
  `#2BB752`, weil das Neongrün auf dem hellen Kasten bei 1,2 : 1 verschwände.
  Justierbar an je einer Stelle: `--jw-hub` (Reihe und Blatt getrennt),
  `--jw-hervor`.
- **Raum für den Hub gibt es nur, wo eine Karte ihn braucht** (Klasse
  `--hebt` an der Abbildung). Grund: Das Band rollt (`overflow-x: auto`), und
  ein Rollkasten schneidet auch nach OBEN — die angehobene Karte wäre gekappt.
  Innenabstand plus negativer Aussenabstand geben den Raum wieder her, darum
  bleibt jede Abbildung ohne «!» Pixel für Pixel, wie sie war (A/B belegt).
- **Eine markierte Karte, die niemand sieht, ist keine Markierung:** Am Handy
  zeigt ein Neunblatt vier von neun Karten. `JassKartenReihe` rollt das Band
  darum beim Aufbau so weit, dass die markierte Karte ganz und ausserhalb des
  Kantenverlaufs steht (34 px rechts, 22 px links) — ohne Bewegung und nur im
  Band, die Seite selbst rührt sich nie.
- **Was bewusst offen blieb:** der Kachel-Kontrast (11 px `#88816d` = 3,66 : 1).
  Vorschlag 13 px / `#736d5c` = 4,86 : 1 liegt bereit, ist aber ein sichtbarer
  Stil-Change über 62 Reihen und 7 Tische und gehört vor Remos Auge.

Siehe auch [[jasswiki-kartenkopf-budget]], [[jasswiki-messaufbau]].
