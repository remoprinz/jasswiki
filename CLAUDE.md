# JassWiki — Agent-Instruktionen

Die Jass-Enzyklopädie unter jasswiki.ch. Diese Datei ist **verbindlich für ALLE Agenten** (Claude Code, Cursor und andere), die an diesem Repo arbeiten. Repo ist **PUBLIC** (github.com/remoprinz/jasswiki).

## Dev-Umgebung (KRITISCH)

**iCloud-Falle:** Dieses Repo liegt im iCloud-synchronisierten `Documents`-Ordner. iCloud evictet und korrumpiert `node_modules` (hunderttausende Dateien) über die Zeit → `next build` bricht ab (fehlende Module, commander/`getCurrentDirectory`-Fehler).

- **Lösung ist umgesetzt:** `node_modules` ist ein **Symlink auf `node_modules.nosync`**. Die Endung `.nosync` wird von iCloud per Apple-Konvention ignoriert, der echte Inhalt ist damit sync-immun. In `.gitignore` eingetragen.
- **REGEL: immer `npm install`** (folgt dem Symlink, installiert in `node_modules.nosync`). **NIEMALS `npm ci`** — dessen `rm -rf node_modules` löscht den Symlink, danach landet ein echtes `node_modules` wieder in iCloud und alles bricht wieder.
- Der `prebuild` (`clean-icloud-dupes.sh`) stellt den Symlink automatisch wieder her, falls iCloud ihn entfernt — `next build` startet also auch nach einem iCloud-Konflikt sauber. Manuell zur Not: `ln -s node_modules.nosync node_modules`.

**Deploy:** `npm run deploy` (baut, `firebase deploy --only hosting:jasswiki`, IndexNow-Ping). SEO- und Build-Diagnosen IMMER gegen die Live-Seite per curl prüfen, nie nur das lokale `out/`.

## Content-Konventionen

Quelle der Inhalte: `src/data/jass-content-v2.json`.

- **NULL Halluzinationen.** Jass-Wissen ist regional und uneinheitlich, Online-Quellen widersprechen sich. Fakten gegen Quellen recherchieren; taktische oder strittige Inhalte mit Remo klären (**Ghostwriter-Modell**: Remo liefert den fachlichen Kern, der Agent liefert Struktur, Sprache, SEO).
- **Genus bei Jass-Begriffen NIE aus dem Bauch** — immer prüfen oder bei Remo rückfragen. Bestätigtes Glossar: **das** Nell, **das** Banner, **die** Stöck (Einzahl = Mehrzahl, nie „Stöcke"), **der** Weis, **der** Puur.
- **Stil:** keine Gedankenstriche (—, –), keine KI-Tells, nüchternes Schweizer-Jass-Lehrmittel-Register. Länge ist nie das Ziel; ein korrekter kurzer Artikel schlägt einen aufgeblähten.

## Struktur & SEO

- **KONSOLIDIEREN, nicht streuen.** Der Haupt-Indexierungs-Killer war **Keyword-Kannibalisierung** (mehrere dünne Seiten zum selben Thema). Ein starker Leitartikel statt N dünner. Dubletten per 301 auf den Leitartikel umleiten: Eintrag in `src/data/url-redirects.json` → `node scripts/build-redirects.mjs` (merged in firebase.json).
- **Platzierung in die Fach-Rubrik, nicht reflexhaft nach `/begriffe/`.** Weise → `/weis-regeln/`, Regeln → `/regeln/`, Kartenfarben → `/begriffe/kartenbezeichnungen/`. Der umfassende Artikel ist das Subjekt seiner Rubrik, kein Streueintrag.
- **Crosslinks müssen sauber sein:** nach jeder Änderung 0 tote `see_also` und 0 tote `(siehe Begriff "…")`-Marker (alle müssen auf existierende Eintrags-Keys zeigen).
- **Build-Reihenfolge nach Content-Änderungen:** `generate-corpus.mjs` → `generate-sitemap.mjs` → `validate-urls.mjs`. `validate:urls` muss 0 Fehler zeigen (z. B. Doppelsegmente in URLs).

## Nicht tun

- Kein `npm ci` (siehe iCloud-Falle).
- Keine `.env` oder Credentials committen (Repo ist public).
- Keine Gedankenstriche in Artikeln.
- Genus oder strittige Jass-Fakten nicht erfinden — im Zweifel Remo fragen.
