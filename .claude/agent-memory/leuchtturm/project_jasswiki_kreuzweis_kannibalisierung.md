---
name: jasswiki-kreuzweis-kannibalisierung
description: /weis-regeln/weispunkte/ behandelt Kreuzweis parallel zur eigenen Kreuzweis-Seite (gleiche Bilder, wörtlich gleiche FAQ-Frage) — und macht es beim Stöck auf derselben Seite vorbildlich richtig
metadata:
  type: project
---

Gemessen live am 23.08.2026. Auf jasswiki gibt es für dasselbe Muster ein gutes und ein
schlechtes Beispiel, beide auf **einer** Seite (`/weis-regeln/weispunkte/`).

**Falsch — Kreuzweis.** `/weispunkte/` führt `<h2 id="kreuzweis">`, dieselben zwei Kartenbilder
wie die zuständige Seite, dieselbe 120-Punkte-Aussage und eine FAQ-Frage, die **wörtlich identisch**
mit der der zuständigen Seite ist («Was ist ein Kreuzweis?») — der einzige wörtliche Fragen-Doppel
über alle 110 FAQ-Einträge der neun geprüften Seiten. Die Antwort auf `/weispunkte/` ist dabei
die ausführlichere. Zahlen: `/weis-arten/kreuzweis/` hat 1'333 Zeichen Artikeltext und 24 sichtbare
Nennungen, `/weispunkte/` hat 9'921 Zeichen und 12 Nennungen. Die starke Seite kann der schwachen
den Begriff wegnehmen.

**Richtig — Stöck.** Derselbe Seitentyp, derselbe Autor, andere Bauform: ein Kartenbild, ein
zusammenfassender Absatz, dann ausdrücklich «Alles dazu steht im Artikel [Stöck]». Ergebnis:
18 Nennungen auf `/weispunkte/` gegen 77 auf `/stoeck/`. Klare Zuordnung, kein FAQ-Doppel.

**Why:** Das ist die vrmandat-Lehre im Kleinen (ein Thema, eine kanonische Property), nur
innerhalb einer Domain statt zwischen Parent und Subdomain. Eine Übersichtsseite darf ein
Unterthema **anreissen und übergeben**, sie darf es nicht **zweitbehandeln**.

**How to apply:** Bei jeder Übersichts-/Detailseiten-Kombination auf jasswiki das Stöck-Muster als
Prüfmass nehmen: ein Bild, ein Absatz, ein ausdrücklicher Link. Messgriffe, die das entscheiden:
Nennungen des Begriffs im sichtbaren Teil je Seite, Länge von `.text` in `jass-content-v2.json`,
und ein Abgleich der FAQ-`name`-Felder über alle Seiten
(`jq '.mainEntity[].name'` über die FAQPage-Blöcke, dann `sort | uniq -d`).
Siehe [[jasswiki-datum-wahrheit]] und [[schiri-rahmen-statt-inhalt]].
