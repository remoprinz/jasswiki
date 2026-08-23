---
name: jasswiki-datum-wahrheit
description: jasswiki-Aktualitätsdatum — der Umbau auf metadata.dateModified je Artikel ist erledigt, die neue Schwachstelle ist das Handpflegen: Textänderungen gehen live, das Datum bleibt stehen
metadata:
  type: project
---

**Erledigt (Stand 23.08.2026):** `metadata.dateModified` steht je Artikel in
`jass-content-v2.json`, `generate-sitemap.mjs` liest es (Zeile 127), das `Article`-JSON-LD liest
es ebenfalls. Für alle neun geprüften Seiten stimmen Sitemap-`lastmod` und Schema-`dateModified`
überein. Die Sitemap trägt über zehn verschiedene Datumswerte statt eines Template-Bodens.
Das eingefrorene `2025-11-05` und die wandernde `fs.stat`-mtime aus der Messung vom 15.08. sind weg.

**Die neue Schwachstelle:** das Feld wird von Hand gepflegt, und die Hand vergisst.
Belegt am 23.08.: `weis_rules_kreuzweis` und `expressions_weis` wurden am 22.08. (`5c0a951`,
`7fd3a09`) und am 23.08. (`655a380`) im `text`-Feld geändert, ihr `dateModified` steht auf
2026-08-18 beziehungsweise 2026-08-20. Der `DATUM_FEHLT`-Riegel im Generator prüft nur, **ob**
ein Datum da ist, nie **ob es stimmt**.

**Why:** Ein Freshness-Signal, das nach der Änderung stehen bleibt, ist genauso wertlos wie ein
eingefrorenes — Google hat keinen Grund, neu zu bewerten. Der Umbau hat den einen Fehler durch
einen leiseren ersetzt.

**How to apply:** Vorschlag ist ein Build-Riegel, der je Eintrag das Datum des letzten Commits an
seinem `text`/`faqs`-Feld gegen `dateModified` hält und beim Auseinanderlaufen den Build stoppt —
dieselbe Härte wie `DATUM_FEHLT`. Prüfrezept ohne Skript:
`git show <sha> -- src/data/jass-content-v2.json | grep -E '^[+-][^+-]'` zeigt, welche `text`-Felder
ein Commit angefasst hat. Siehe [[jasswiki-kreuzweis-kannibalisierung]].
