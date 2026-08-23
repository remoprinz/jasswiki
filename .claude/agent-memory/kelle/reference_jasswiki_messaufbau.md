---
name: jasswiki-messaufbau
description: Wie KELLE die jasswiki-Fläche im eigenen Arbeitsbaum empirisch misst (node_modules-Kopie statt Symlink, Puppeteer-Quelle, Dev-Port, WIP-Inhalt kopieren)
metadata:
  type: reference
---

Mess-Aufbau für jasswiki-Frontend-Arbeit im eigenen Worktree (`/private/tmp/jasswiki-kelle-<thema>`):

- **node_modules physisch kopieren** (`cp -R …/jasswiki/node_modules.nosync/ <worktree>/node_modules`, ~630 MB, ~1–2 min). Ein Symlink aus dem Worktree heraus lässt Turbopack (Next 16) abstürzen: «Symlink node_modules is invalid, it points out of the filesystem root».
- **Puppeteer** liegt in `/Users/remoprinz/Documents/jassverband-schweiz/node_modules/puppeteer` (jasswiki selbst hat keins); Chrome-Cache in `~/.cache/puppeteer`.
- `npx next dev -p 3111` im Worktree reicht zum Messen; der volle `npm run build` (Korpus, llms, Sitemap …) ist dafür überflüssig.
- Der Inhalt (`src/data/jass-content-v2.json`) liegt oft nur als **uncommittetes WIP von SCHIRI im Hauptordner**; zum Messen in den Worktree kopieren, vor dem Commit mit `git checkout --` zurücksetzen.
- Messgrössen, die sich bewährt haben: `.jw-karten-band` clientWidth vs. scrollWidth (rollt?), Kartenbreite via getBoundingClientRect, Namensüberlauf (scrollWidth > clientWidth der `.jw-karte-name`), Element-Screenshots der `.jw-karten-reihe`; kurze Reihen vorher/nachher per md5 auf Bytegleichheit prüfen.
- Bekannte Bandbreiten (Artikel/Band): 375 → 311/285, 768 → 704/670, ≥1024 → 809/775.
- **`scripts/` ist in .gitignore** (interne Tools). Prüf-/Wächterskripte liegen im Repo-Root wie `sprachwaechter.mjs`; TS-Skripte via `tsx` (devDependency), z. B. `farbwoerter-pruefen.ts` (`npm run pruefe:farbwoerter`).
- Puppeteer-Falle: `evaluateOnNewDocument` läuft bei JEDEM Navigieren/Reload — wer damit localStorage leert, misst nach `reload()` immer die Vorgabe (falsch-negativ «gespeicherte Wahl greift nicht»). Stattdessen nach `goto` per `evaluate` leeren und einmal neu laden.
- **Roh-Zählung im HTML zählt den Next-Payload mit**: `getStaticProps` serialisiert den ganzen Artikeltext samt Marken nach `__NEXT_DATA__`. Vor jeder Zählung von sichtbarem Text die Skript-Blöcke entfernen (`perl -0pe 's|<script[^>]*>.*?</script>||gs'`), sonst meldet man rohe Marker, die niemand sieht.
- **Der Dev-Server malt ins Bild**: «Compiling …»-Blase und der runde N-Anzeiger von `next dev` landen in Element-Screenshots. Zwei Bilder byteweise zu vergleichen (z. B. hell gegen dunkel) schlägt daran fehl, obwohl die Fläche gleich ist — am breiten Schirm liegen die Blasen ausserhalb, dort ist der Vergleich sauber.
- **Kasten-Überschneidung ist noch keine Farb-Überschneidung**: Ein absolut gesetztes Textstück mit `width: 170%` überlappt im `getBoundingClientRect` die Nachbarkarte, obwohl der zentrierte Text sie nie berührt. Entweder `width: max-content` setzen (dann ist der Kasten die Schrift) oder die Überschneidungs-TIEFE in px ausgeben und alles unter ~2 px durchwinken.
- **«Das Bild bleibt gleich» beweist der A/B-Diff, nicht das Auge**: dieselbe Seite zweimal
  messen — einmal mit dem neuen Merkmal in der Marke, einmal ohne — und die beiden
  Mess-JSON mit `diff <(jq -S …) <(jq -S …)` gegeneinanderhalten. Bleiben nur die gewollten
  Felder übrig (Klasse, Farbe, aria), ist Geometrie-Gleichheit belegt statt behauptet. Je
  Karte messen: x, Breite, Höhe, Bildmass, Bandbreite (client/scroll), Figurenhöhe.
- **Für eine reine PRÜFUNG braucht es weder Worktree noch Dev-Server**: Puppeteer direkt
  gegen `https://jasswiki.ch` laufen lassen. Spart das 630-MB-node_modules-Kopieren, und
  das Ergebnis ist per Definition das, was der Leser sieht. Vorher einmal belegen, dass
  live dem lokalen main entspricht (ein frisches Merkmal aus dem letzten Commit im
  Live-HTML suchen). Kartenbilder haben `loading="lazy"` — vor dem Messen die ganze Seite
  durchscrollen und ~1,5 s warten, sonst sind Bildmasse 0.
- **Eine Marke kann still verschwinden — das JSON ist KEIN Beweis für die Seite.**
  `tischInhaltLesen`/`marketInhaltLesen` werfen jeden Teil weg, der stolpert (Absicht:
  ein Tippfehler kostet die Abbildung, nie den Artikel). Darum nach jeder Inhaltsarbeit
  gegen das **gerenderte** Bild prüfen, ob Legende und Aufschrift wirklich dastehen —
  z. B. `beschriftung: null` im Mess-JSON zählen. Gegenprobe, die den Fall beweist: der
  Satz steht im `__NEXT_DATA__` (roher `curl`), im sichtbaren HTML (Skript-Blöcke per
  `perl -0pe` entfernt) steht er null mal.
- **Inhalt in `jass-content-v2.json` ändern, ohne den Bestand anzufassen: `jq` mit
  `split`/`join`.** `jq '.'` gibt die Datei byteweise gleich zurück (geprüft
  23.08.2026), darum bleibt der Diff minimal. Rezept: Ersetzungsliste als eigene
  JSON (`id`, `alt`, `neu`), einmal
  `jq --slurpfile e liste.json 'reduce $e[0][] as $x (.; .[$x.id].text = (.[$x.id].text | split($x.alt) | join($x.neu)))'`.
  `split/1` ist LITERAL (die Zweiarg-Form ist Regex) — Marken mit `[[` brauchen
  darum kein Escaping. Vorher belegen, dass jedes `alt` genau einmal vorkommt;
  nachher belegen, dass nur die Marken wanderten: beide Fassungen mit
  `gsub("\\[\\[karten:[^\\]]*\\]\\]"; "MARKE")` vergleichen und zusätzlich
  `del(.text)` gegeneinanderhalten.
- Zum Messen des eigenen Bauteils **Prüf-Marken in zwei Artikel spritzen** — einen mit `sub !== topic` (Artikelseite `[category]/[subcategory]/[topic]`) und einen mit `sub === topic` (flache Leitartikel-Seite `[category]/[subcategory]`). Beide Seitenarten rendern über `InternalLinker`, aber nur so ist beides belegt. Danach `git checkout -- src/data/jass-content-v2.json`.
