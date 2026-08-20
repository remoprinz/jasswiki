---
name: jasswiki-deploy-gate
description: KELLE kann jasswiki nicht selbst live stellen — Merge nach main im geteilten Checkout ist gesperrt; Stand als Branch pushen und übergeben
metadata:
  type: project
---

Auf jasswiki endet KELLEs Spur beim gepushten Branch: **das Zusammenführen nach `main` im
geteilten Checkout `/Users/remoprinz/Documents/Jassguru/jasswiki` wird vom
Berechtigungs-Wächter abgelehnt** (belegt am 20.08.2026 mit `git merge --ff-only`, zweimal,
mit und ohne `-C`). Damit fällt auch der Deploy weg, denn `npm run deploy` baut aus genau
diesem Ordner (`cd ~/Documents/Jassguru/jasswiki && npm run deploy`).

**Why:** Der jasswiki-Deploy läuft in-place aus dem Hauptordner, und dieser Ordner ist der
Arbeitsplatz von SCHIEDSRICHTER. Aus einem `/private/tmp`-Worktree zu deployen wäre
technisch möglich, würde aber eine Fassung live stellen, die auf keinem main-Stand steht —
genau die Drift, die auf jasstafel schon zweimal Arbeit zurückgerollt hat.

**How to apply:** Bauteil im eigenen Worktree fertig messen, committen, `git push -u origin
<branch>` — und dann übergeben statt selbst mergen. In der Fertigmeldung stehen: der SHA,
auf welchem main-Stand rebast wurde, und die zwei Befehle
(`git merge --ff-only <branch>` im Hauptordner, danach `cd ~/Documents/Jassguru/jasswiki &&
npm run deploy`). Vor dem Rebase immer den aktuellen main-Stand erfragen — SCHIRI schiebt
Inhalt oft mehrmals täglich nach und hält Commits eine Weile lokal
(am 20.08. lagen 6 Inhalts-Commits auf main, die origin noch nicht kannte).

Siehe auch [[jasswiki-messaufbau]].
