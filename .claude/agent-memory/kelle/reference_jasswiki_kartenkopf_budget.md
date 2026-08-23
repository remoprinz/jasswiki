---
name: jasswiki-kartenkopf-budget
description: Die Kopfzeile der Kartenreihe umbricht seit 23.08.2026, statt «Französisch» abzuschneiden — die Länge der Aufschrift ist frei, das alte 109-px-Budget ist Geschichte
metadata:
  type: reference
---

Die Kopfzeile `.jw-karten-kopf` ist eine Flex-Zeile aus Aufschrift
(`.jw-karten-marke`) und Sprachumschalter (`.jw-karten-wahl`). **Seit dem
23.08.2026 (Branch `kelle/bild-welle2`) hat sie `flex-wrap: wrap`, der Umschalter
`flex: 0 0 auto`, die Aufschrift `min-width: 0` + `overflow-wrap: anywhere`.**
Damit rückt der Umschalter bei einer langen Aufschrift auf eine zweite Zeile,
statt sein eigenes Wort «Französisch» abzuschneiden.

**Die Länge der Aufschrift ist damit frei.** Gemessen nach dem Umbau auf
320/375/390/1280 px, neun Seiten: `verdeckt = 0` überall, kein Textüberlauf, kein
Seitenüberlauf. Am Schirm bleibt jede Kopfzeile einzeilig; auf 320 px wird fast
jede zweizeilig (Kosten 24 px Höhe, nur beim ersten Block einer Seite, denn nur
dort steht der Umschalter). Auf 375 px wird zweizeilig, was länger ist als rund
110 px — «Kreuzweis, erster Weis» (134), «Stichfolge im Trumpf» (129).

**Why:** Vorher schnitt der Umschalter auf 375 px bis zu 25 px und auf 320 px bis
zu 53 px seines Wortes ab, sobald die Aufschrift lang wurde — und die 32
sprechenden Titel, die SCHIRI danach setzen liess, sind alle länger als
«Jasskarten». Darum musste die Kopfzeile VOR den Titeln repariert werden.

**How to apply:** Aufschriften frei nach Sinn wählen. Wer die Kopfzeile anfasst,
prüft nach: `.jw-karten-wahl` scrollWidth − clientWidth muss 0 bleiben, auf 320
und 375 px, beim ersten Block jeder Seite.

Siehe auch [[jasswiki-messaufbau]], [[jasswiki-kartenbild-doktrin]].
