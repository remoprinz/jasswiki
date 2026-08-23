---
name: jasswiki-llms-module
description: Die sechs llms-*.md sind aktuell und markerfrei, verschenken aber Zitierbarkeit — null Artikel-URLs, kollidierende Überschriftenebenen, ersatzlos gelöschte Kartenbilder
metadata:
  type: project
---

Gemessen live am 23.08.2026 (alle sechs Module HTTP 200, `text/markdown`, mit jedem
Content-Commit neu generiert über `npm run generate:llms` → `agentic/generate-modular-llms.mjs`).

Drei Mängel, alle im Generator zu beheben:

1. **Null Artikel-URLs.** In jedem Modul steht genau **eine** eindeutige jasswiki.ch-URL, und das
   ist der Verweis auf ein anderes llms-Modul (`grep -o 'https://jasswiki.ch/[a-z0-9/-]*' | sort -u`
   → 1 je Datei). Ein Modell, das aus `llms-regeln.md` zitiert, kann jasswiki nennen und nicht
   verlinken. Für GEO der teuerste Punkt: eine Aussage ohne Adresse ist keine Zitation.
2. **Überschriften kollidieren.** Ein Eintrag steht als `### Kreuzweis {#weis_rules_kreuzweis}`,
   seine eigenen Abschnitte darunter als `## Wie der Kreuzweis gemeldet wird` — eine Ebene höher.
   Der Abschnitt hängt damit neben «## Einträge» statt unter dem Begriff. Zählung:
   `llms-varianten.md` 58 H2 gegen 63 H3, `llms-taktiken.md` 26 H2 gegen 20 H3. Jeder Chunker,
   der auf Überschriften schneidet, hängt Text an den falschen Begriff.
3. **Kartenmarker werden gelöscht statt aufgelöst.** Im Kreuzweis-Eintrag klaffen drei Leerzeilen,
   wo zwei Kartenbilder standen. Die Bildunterschriften («Das Dreiblatt in Rosen, 20 Punkte»,
   «Die vier Könige, 100 Punkte. Der Rosen-König steht in beiden Weisen») fallen mit weg, obwohl
   sie reiner zitierfähiger Text sind. Der Satz «Der Rosen-König gehört zu beiden» steht danach
   ohne den König da.

**Sauber daran:** null Rohmarker (`[[karten:`, `[[tisch:`, `(siehe Begriff`) in allen sechs
Modulen, alle neun geprüften Themen vorhanden, keine Altadresse enthalten.

**Nebenbefund robots.txt:** die dort genannten Modulgrössen stimmen alle sieben nicht mehr
(llms-varianten.md angegeben 116 KB, live 209'070 B), «228 Einträge» gegen 225 gemessene, und
«Last-Updated: 2026-06-29». Zahlen ersatzlos streichen ist billiger als sie zu pflegen.

**Why:** llms.txt selbst ist nach der GEO-Messung ein unbelegter Kanal (siehe
`reference_geo_strategy_verdict` im jasstafel-Gedächtnis) — der Punkt «Aussage ohne Adresse»
zählt trotzdem, weil er unabhängig von der Kanalwirkung gilt.

**How to apply:** Bevor Aufwand in die Module fliesst, Remo entscheiden lassen, ob der Kanal
gepflegt wird. Wenn ja, zuerst die Quell-URL je Eintrag — sie ist die einzige der drei
Korrekturen, deren Nutzen ohne Messung feststeht.
