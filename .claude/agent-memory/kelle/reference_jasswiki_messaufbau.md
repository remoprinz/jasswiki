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
