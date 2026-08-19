---
name: wortlaut-patchdatei
description: Format und Fallen der maschinellen Patch-Datei (alt ==== neu @@@@) für jass-content-v2.json — Eindeutigkeitsprüfung, Zwillingsartikel, generierte FAQ
metadata:
  type: reference
---

Bei der Wortlaut-Eichung wird neben dem Bericht eine **Patch-Datei** verlangt:
`<alt>` `====` `<neu>` `@@@@` `<alt>` … ohne Kopfzeile, ohne Kommentare. Der alte Text
muss **zeichengenau und im ganzen Bestand genau einmal** in `text`, `question`,
`answer` oder `seoDescription` stehen. Ein Paar, das verfehlt, wird still übersprungen
— der Fund geht dann verloren.

## Prüf-Rezept (ohne Interpreter)

```bash
jq -r '[.. | objects | (.text?, .seoDescription?, .seoTitle?, (.faqs[]? | .question, .answer))] | map(select(. != null)) | .[]' src/data/jass-content-v2.json > felder.txt
# Altstücke aus dem Patch ziehen und jedes zählen:
sed -n '/^====$/,/^@@@@$/!p' PATCH-N.txt | grep -v '^$' > alt.txt
while IFS= read -r l; do echo "$(grep -Fxc -- "$l" felder.txt) | $l"; done < alt.txt
```
`grep -Fxc` prüft ganze Zeilen; für Satzfragmente mitten in einer Zeile `grep -Fc`.
Mehrzeilige Blöcke: jede Zeile einzeln zählen **und** die Nachbarschaft mit
`grep -B1 -Fx` bestätigen.

## Vier Fallen

1. **Text und FAQ tragen denselben Satz.** Sehr häufig: Der erste Textsatz ist wörtlich
   die erste FAQ-Antwort. Lösung: dem Textstück die Etikettenzeile voranstellen
   (`Definition:\n…`, `Regel:\n…`, `Ziel:\n…`) — das macht es eindeutig. Die FAQ-Antwort
   selbst bleibt dann von Hand zu richten.
2. **Zwillingsartikel.** `variants_specialty_hindersi` und
   `variants_specialty_hindersi_vier` tragen ganze Abschnitte **wortgleich** (18.08.:
   «Jasszielsetzung», «157 Punkte belastet», «geahndet»). Kein Kontext trennt sie, auch
   die Nachbarzeilen sind identisch. Solche Funde gehören in den Bericht, nicht in den
   Patch. Der Doppelbestand selbst ist der eigentliche Befund.
3. **Aufzählungspunkt vs. FAQ.** Das führende `• ` und der fehlende Schlusspunkt machen
   Textzeile und FAQ-Antwort unterscheidbar — dann sind **beide** patchbar (zwei Paare).
4. **Das Paket ist nicht der Bestand.** Am 19.08. fehlte 1 von 111 FAQ-Fragen des
   Pakets in `jass-content-v2.json` (`platztausch`: «Wie funktioniert Plätze tauschen
   beim Jassen?»). Vor dem Melden einer FAQ gegen die JSON gegenprüfen:
   `grep -Fc '"<Frage>"' src/data/jass-content-v2.json`.
   In Paket 1 waren es **drei von 111**, alle durch Commit `e21f843` («18 Schablonenfragen
   ersetzt, zwei Doppel geloescht») geheilt: `nichtfarben`, `zusammenwerfen`,
   `variants_strategic_differenzler_drei` — jeweils die **erste** FAQ. Griff in einem Zug:
   `for k in <ids>; do jq -r --arg k "$k" '.[$k].faqs[]?.question' …; done` und mit dem Paket
   vergleichen. **Die Antwort überlebt oft die Frage** — nach dem Heilen der Frage steht die
   alte Antwort daneben und passt nicht mehr (Ja/Nein-Frage ohne «Ja», Definition auf ein
   «Wie funktioniert»). Das ist der Rest-Fund, der zu melden bleibt.
5. **Hausformel in zwei Artikeln.** Erfundene Überschriften wandern aus der Blaupause
   (Sidi Barrani) in neue Artikel. Vor jedem Patch einer Überschrift:
   `jq -r 'to_entries[] | select(.value.text // "" | test("<Formel>")) | .key' …` —
   zwei Treffer heisst Bericht statt Patch.

## Der Zwilling Text/FAQ lässt sich doch patchen (19.08., Paket 9)

Falle 1 braucht die Handarbeit nicht. Zwei Paare hintereinander schreiben und **beiden
denselben neuen Text geben**:

```
Definition:
<der Satz>
====
Definition:
<der neue Satz>
@@@@
<der Satz>
====
<der neue Satz>
```
Arbeitet der Anwender der Reihe nach, trifft Paar 1 den Text und Paar 2 danach nur noch
die FAQ. Ersetzt er global, decken beide Paare dasselbe ab. **In jeder Reihenfolge
dasselbe Ergebnis** — Voraussetzung ist, dass der neue Satz an beiden Stellen passt.
Im Bericht ausweisen, warum zwei Paare denselben Text tragen.

## Schlussprobe in einem Zug

```bash
grep -B1 '^====$' PATCH-N.txt | grep -v '^====$' | grep -v '^--$' > alt_letzte.txt
while IFS= read -r s; do n=$(grep -F -o "$s" felder.txt | wc -l | tr -d ' ');
  [ "$n" = 1 ] || echo "TREFFER=$n :: $s"; done < alt_letzte.txt
```
Prüft die **letzte Zeile** jedes Altblocks (deckt ein- und mehrzeilige Blöcke ab). Alles
ausser den bewusst doppelten Zwillingspaaren muss `1` sein.

## Zuletzt prüfen, nicht beim Schreiben

Am 19.08. sprang der geteilte Checkout **mitten in der Lesung** von `87d95746` auf
`f118557` (Wellen 1–3 eingespielt). Vier Muster aus Paket 9 waren dadurch tot
(«trumpfaufdeckende Spieler», «Minusstriche», «Spielgeber», der ganze Artikel `klopfen`).
Darum: Felder-Dump und Musterprüfung **am Schluss neu ziehen**, und Commit-SHA + `md5`
der `jass-content-v2.json` in den Bericht schreiben, gegen den geprüft wurde.

## Was der Renderer schluckt

Die Marken `(siehe Begriff "…")` sind die gespeicherte Verweis-Syntax; der Renderer
entfernt beziehungsweise verlinkt sie vor der Auslieferung (`verweise.ts`,
`FaqJsonLdSchema.tsx`). **Kein Fund** — im Patch die Marken unverändert mitführen,
damit die Verlinkung erhalten bleibt.

Siehe [[eichquelle-grep]] und [[jasswiki-pruefwerkzeuge]].
