---
name: jasswiki-kartenband-statt-h3
description: Entscheid 23.08.26 — die Weis-Namen bleiben Kachel-Aufschrift im Kartenband statt eigene H3; gemessen, weil Render-Extraktion die Punktzahl auch ohne Überschrift liest und H3 gar nicht zurückgibt
metadata:
  type: project
---

**Remos Frage am 23.08.2026:** «Fünfblatt steht IN der Tabelle, weiss nicht ob das best practice
ist» — je Weis eine echte H3 oder reicht der `<figure>`-Kopf? **Antwort: die Kachel bleibt,
kein H3 je Weis.** Was fehlt, ist ein `id` plus `aria-labelledby` an der Figur, damit der Weis
anspringbar wird.

Vier Messungen, die den Ausschlag gaben:

1. **WebFetch (echter Render) auf `/weis-regeln/weispunkte/` liest ohne jede Überschrift**
   «Fünfblatt: 100 Punkte» und zitiert die Bildunterschrift wörtlich
   («Vier Puur, 200 Punkte: die vier Under, der höchste Weis unter den vier Gleichen»).
2. **Derselbe Test auf `/…/austrumpfen-hoch-oder-tief/` gab die sechs H2 zurück und keinen der
   neun H3.** Wer auf H3 setzt, setzt auf die Ebene, die als Erste aus der Extraktion fällt.
3. **Sechs der 20 Kachel-Aufschriften wiederholen sich** auf derselben Seite (Dreiblatt ×3,
   Fünfblatt ×2, Dreiblatt im Undenufe ×2) — als Überschriften gäbe das doppelte Titel und
   doppelte Anker.
4. **Der Fakt steht ohnehin dreifach da:** Kachel-Aufschrift (`span.jw-karten-marke`),
   Bildunterschrift mit Name + Punkten + Erklärung, und eine echte `<table>` mit
   `<th>Weis | Karten | Punkte</th>` über alle elf Weis-Arten.

**Why:** Der bequeme Reflex ist «Überschrift = Struktur = SEO». Gemessen bringt die Überschrift
hier nichts, was nicht schon dasteht, und erzeugt Dubletten. Der einzige echte Verlust ohne
Überschrift ist das **Sprungziel**, und das hängt an `id`, nicht an `<h3>`.

**How to apply:** Bei jeder «sollte das eine Überschrift sein?»-Frage auf jasswiki zuerst mit
WebFetch prüfen, ob eine Extraktion den Fakt heute schon herausholt — erst wenn sie ihn verfehlt,
ist die Überschrift der Hebel. Und immer zählen, wie oft die Aufschrift auf der Seite vorkommt,
bevor daraus Anker werden. Siehe [[jasswiki-kreuzweis-kannibalisierung]].
