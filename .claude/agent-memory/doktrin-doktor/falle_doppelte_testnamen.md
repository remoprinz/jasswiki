---
name: falle-doppelte-testnamen
description: Doppelte Testfunktionsnamen in derselben Datei sind NUR dann verdeckte Tests, wenn sie in derselben Klasse (oder beide auf Modulebene) stehen — Klassen sind eigene Namensräume
metadata:
  type: feedback
---

Ein Grep nach doppelten `def test_*`-Namen **pro Datei** erzeugt Fehlalarme.
Python-Klassen sind eigene Namensräume: `TestA.test_x` und `TestB.test_x` in
derselben Datei sind zwei verschiedene Tests, und pytest sammelt beide.

**Why:** Der Repo-Kehraus vom 12.08.2026 meldete «fünf Gold-Prüfungen laufen
nie» (M2) für `test_gold_weis_ist_beweis.py`, `test_konventions_beobachtung.py`,
`test_gold_erster_ansage_block.py`. Nachgeprüft: alle sechs Doppelnamen lagen je
in **verschiedenen** Testklassen. Verdeckt war nichts.

**How to apply:** Vor jeder «verdeckte Tests»-Meldung zwei Schritte:
1. Modulebene prüfen — `grep -rEo "^(async )?def test_[A-Za-z0-9_]+" tests | sort | uniq -d`
   (Zeilenanfang ohne Einrückung). Leer = keine Kollision auf Modulebene.
2. Für eingerückte Treffer die Klassengrenzen ansehen
   (`grep -nE "^(class |[ \t]*def )" <datei>`) — nur gleiche Klasse zählt.
3. Der harte Beweis ist ohnehin `pytest --collect-only -q <datei>`: gesammelte
   Zahl gegen gezählte `def test_`. Stimmt sie, ist nichts verdeckt.

Dasselbe gilt für doppelte **Klassennamen** je Datei — die verdecken wirklich
(gleicher Namensraum). Am 12.08. gab es davon null.
