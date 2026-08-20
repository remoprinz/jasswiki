---
name: jasswiki-kartenbild-doktrin
description: Ordnung jeder Kartenreihe auf jasswiki (tiefste links, höchste rechts) steht in regelauskunft/KARTENBILD.md — gitignored, vom Sprachwächter geprüft
metadata:
  type: reference
---

Wie Karten auf jasswiki gezeigt werden, steht in `regelauskunft/KARTENBILD.md` (Remo,
20.08.2026). Der Ordner `regelauskunft/` ist **gitignored** — die Datei liegt nur auf der
Platte, ein frischer Klon hat sie nicht. Dort stehen auch die Eichquellen und die
WORTLAUT-Befunde von LOT.

Der Kern, weil er jedes Kartenbauteil bindet: **links die tiefste Karte, rechts die
höchste — 6, 7, 8, 9, Banner, Under, Ober, König, Ass.** Nell und Puur stehen an ihrem
Platz als Neun und Under, auch im Trumpfspiel. Mehrere Farben stehen am Stück, jede Farbe
einmal. Eine Reihe ist eine Hand; ein Stich gehört auf den Jasstisch `[[tisch: …]]`.
Ausnahmen sind namentlich in `AUSNAHMEN.kartenreihen` in `sprachwaechter.mjs` eingetragen.

Geprüft wird sie mit `node sprachwaechter.mjs` («G · Kartenreihe verkehrt sortiert»), der
die Folge als `KARTEN_ORDNUNG` selbst führt. Wer ein Bauteil baut, das Karten sortiert,
nimmt dieselbe Folge — und sortiert am besten selbst, dann kann der Bestand die Regel gar
nicht verletzen.

Siehe auch [[jasswiki-messaufbau]].
