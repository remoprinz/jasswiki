---
name: jasswiki-dubletten-stand
description: Live-Messung 15.08.26 der jasswiki-URL-Dubletten — jede Zweitadresse liefert bereits 301, offen bleiben 31 Zwei-Sprung-Ketten und eine falsch gezielte Weiterleitung
metadata:
  type: project
---

Gemessen am 15.08.2026 gegen die Live-Site (curl mit Browser-UA, `main` sauber):

- **Sitemap: 264 URLs, alle 200, alle mit selbstbezüglichem `<link rel="canonical">`.** Null 404,
  null noindex. Der kanonische Bestand ist technisch sauber.
- **Alle in der GSC sichtbaren Doppel-Adressen liefern heute 301** auf die kanonische Fassung.
  Systematisch geprüft: 286 rekonstruierte Schatten-Adressen (3-Ebenen-Form flacher Artikel plus
  doppelt geschachtelte Form) ergaben 231× 404, 54× 301, 1× 200 (`/regeln/schreiben/`, eine echte
  Unterkategorie-Seite). **Null lebende Dubletten.** Die GSC-Zahlen stammen aus 16 Monaten und
  bilden den Zustand vor den Redirect-Wellen ab (firebase.json: 486 Einträge, gewachsen
  09.04./24.04./03.05./16.06./04.07.2026).
- **Offen 1: 31 Zwei-Sprung-Ketten** unter den 273 Weiterleitungsquellen (240 sauber ein Sprung).
  Liste steht im Bericht an SCHIRI; Fix = Ziel jeder Kette direkt auf den Endpunkt setzen.
- **Offen 2: eine falsch gezielte Weiterleitung.** `/varianten/koenigsspiel/bieter/` zeigt auf
  `/varianten/bieter-4-spieler/`, der Artikel «Bieter» (`variants_strategic_bieder`) liegt aber
  auf `/varianten/bieter/`. Einziger Treffer eines Vollabgleichs aller Schatten-Adressen.
- **Offen 3 (Entscheid SCHIRI):** `/jassapps/generelles/` trug 13 Klicks und leitet auf die
  hässlichere kanonische `/jassapps/jassapps-generelles/`.

**Why:** SCHIRI las aus den ersten GSC-Daten «14 Artikel unter zwei bis drei Adressen erreichbar»;
die Live-Messung zeigt, dass das der historische Zustand ist und die Reparatur bereits läuft.

**How to apply:** Vor jeder Dubletten-Arbeit an jasswiki zuerst live prüfen statt aus GSC-Exporten
schliessen. GSC-Seitenlisten über 16 Monate enthalten Adressen, die längst weiterleiten.
Siehe [[jasswiki-datum-wahrheit]] und [[jasswiki-serp-vorlagen]].
