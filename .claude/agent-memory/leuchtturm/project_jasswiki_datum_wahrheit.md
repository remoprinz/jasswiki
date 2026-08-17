---
name: jasswiki-datum-wahrheit
description: jasswiki meldet zwei falsche Aktualitätsdaten (Schema 2025-11-05 fix, Sitemap für alle 264 URLs gleich); die echte Wahrheit je Artikel ist aus 32 Commits rekonstruierbar
metadata:
  type: project
---

Gemessen am 15.08.2026, live und im Repo:

- **JSON-LD:** 231 von 231 Artikelseiten liefern `"dateModified":"2025-11-05"`. Quelle ist
  `NEXT_PUBLIC_DEFAULT_MODIFIED_DATE` mit Fallback-Literal in vier Vorlagen:
  `src/pages/[category]/[subcategory]/[topic]/index.tsx`, `src/pages/[category]/[subcategory]/index.tsx`,
  `src/pages/varianten/[topic]/index.tsx`, `src/pages/ansagen/[topic]/index.tsx`.
  32 Übersichtsseiten führen gar kein `dateModified`, `/taxonomie/` führt 2026-01-10.
- **Sitemap:** alle 264 `<lastmod>` tragen denselben Wert, nämlich die mtime von
  `src/data/jass-content-v2.json` (`generate-sitemap.mjs`, eine `fs.stat` für die ganze Datei).
  Bei jedem Deploy springen alle 264 Daten auf das Deploy-Datum (belegt: 07.07., 14.08., 15.08.).
- **Beide Richtungen falsch:** das Schema ist für jeden Artikel zu alt (älteste echte Änderung
  22.11.2025), die Sitemap ist für 225 von 231 zu neu.
- **Die Wahrheit ist billig zu haben:** nur 32 Commits berühren die Inhaltsdatei. Ein Durchlauf
  über diese Commits (Artikel-Text plus FAQ je Fassung vergleichen) liefert für alle 231 Artikel
  ein echtes Änderungsdatum, verteilt auf 15 Daten von 2025-11-22 bis 2026-08-15
  (75× 02.02.26, 55× 22.11.25, 29× 16.06.26, 28× 28.06.26, Rest kleiner).
  Mess-Skripte liegen im Scratchpad-Muster «snap.sh + dates.sh» (Snapshot je Commit via
  `git show <sha>:datei | jq`, danach `comm -13` zwischen den Fassungen).

**Why:** SCHIRI fragte nach dem eingefrorenen Schema-Datum; die Messung zeigt, dass auch die
Sitemap keine Pro-Seiten-Wahrheit sagt, sondern ein wanderndes Template-Datum.

**How to apply:** Spezifikation lautet: ein Feld `metadata.dateModified` je Artikel in
`jass-content-v2.json`, einmalig aus der Git-Historie befüllt, danach von der Redaktion
mitgeführt; Sitemap und JSON-LD lesen beide dieses Feld. Siehe [[jasswiki-dubletten-stand]].
