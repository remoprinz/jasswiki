---
id: `general_game_end`
---

**Bereinigter Haupttext:**
```markdown
Regel:
Ein Jass endet unter folgenden Umständen:
• Ein [Team](./expressions_team) hat die Zielpunktzahl erreicht und [bedankt](./bedanken)
• Beide Teams werfen [zusammen](./zusammenwerfen) (Einigung auf Neustart)
• Das Spiel wird [annulliert](./spiel_annullieren) (z.B. wegen schwerer Regelverstösse)

Nach Spielende:
• Die Punkte werden gezählt und notiert
• Bei Erreichen der Gesamtpunktzahl ist die [Partie](./expressions_partie) vorbei
• Ansonsten beginnt eine neue Runde
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wann endet ein Jass?",
    "answer": "Ein Jass endet, wenn ein Team die Zielpunktzahl erreicht und bedankt, beide Teams zusammenwerfen oder das Spiel annulliert wird."
  },
  {
    "question": "Was passiert nach dem Spielende?",
    "answer": "Nach dem Spielende werden die Punkte gezählt und notiert. Bei Erreichen der Gesamtpunktzahl ist die Partie vorbei, ansonsten beginnt eine neue Runde."
  },
  {
    "question": "Können beide Teams ein Spiel beenden?",
    "answer": "Ja, beide Teams können sich darauf einigen, zusammenzuwerfen und das Spiel neu zu beginnen."
  }
]
```

---
id: `rest_machen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
[Rest machen](./expressions_rest) ermöglicht es, das Spiel zu verkürzen, wenn man alle restlichen [Stiche](./expressions_stich) erzielen kann.

Ablauf:
• Ein Spieler ist der Ansicht, alleine oder mit seinem [Partner](./expressions_team) die restlichen Stiche zu erzielen
• Mit «Rest» oder «Rest machen» kann das Spiel verkürzt werden
• Die restlichen Karten müssen offen auf den Tisch gelegt oder gezeigt werden

Konsequenz bei Fehler:
• Wenn die Voraussetzung nicht erfüllt ist, verliert der fehlbare Spieler sowie sein Partner alle noch nicht gespielten Karten an den Gegner
• Beispiel: Wenn [Trumpf](./expressions_trumpf)-Bauer (Puur), [Nell](./expressions_nell) und Trumpf-Sechser offengelegt werden, aber der Trumpf-Siebner beim Gegner noch im Spiel ist, besitzt man nicht alle trumpfhöchsten Karten
• Beim regulären Weiterspielen hätte eine versehentlich gespielte Karte den Stich an den Gegner geben können

Ausnahmen:
• Bei [Pandur](./variants_strategic_pandur) können die Gegner das Weiterspielen verlangen, bis das zu ersteigernde Ziel erreicht ist
• Bei Auktionsjass und [Differenzler](./variants_strategic_differenzler_verdeckt) muss restliches Spiel ausgejasst werden, wenn der Gegner dies verlangt
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wann darf man Rest machen?",
    "answer": "Man darf Rest machen, wenn man der Ansicht ist, alleine oder mit seinem Partner alle restlichen Stiche erzielen zu können."
  },
  {
    "question": "Was passiert, wenn man fälschlicherweise Rest macht?",
    "answer": "Wenn die Voraussetzung nicht erfüllt ist, verlieren der fehlbare Spieler und sein Partner alle noch nicht gespielten Karten an den Gegner."
  },
  {
    "question": "Muss man die Karten zeigen beim Rest machen?",
    "answer": "Ja, die restlichen Karten müssen offen auf den Tisch gelegt oder gezeigt werden."
  },
  {
    "question": "Gibt es Ausnahmen beim Rest machen?",
    "answer": "Ja, bei Pandur und Differenzler können die Gegner das Weiterspielen verlangen, bis das zu ersteigernde Ziel erreicht ist."
  }
]
```

---
id: `spiel_annullieren`
---

**Bereinigter Haupttext:**
```markdown
Regel:
Ein Spiel kann annulliert werden, wenn schwere Regelverstösse auftreten.

Gründe für Annullierung:
• Falsche Kartenanzahl pro Spieler
• Schwere Spielfehler (z.B. wiederholtes [Nichtfarben](./nichtfarben))
• [Bemerkungen](./bemerkungen), die das Spiel beeinflussen
• Betrug oder absichtliche Regelverstösse

Ablauf und Konsequenzen:
• Das Spiel wird sofort beendet
• Keine Punkte werden vergeben
• Es wird neu [gemischt](./mischen) und ausgeteilt
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wann kann ein Spiel annulliert werden?",
    "answer": "Ein Spiel kann annulliert werden, wenn schwere Regelverstösse wie falsche Kartenanzahl, schwere Spielfehler, beeinflussende Bemerkungen oder Betrug auftreten."
  },
  {
    "question": "Was passiert bei einer Annullierung?",
    "answer": "Bei einer Annullierung wird das Spiel sofort beendet, keine Punkte werden vergeben, und es wird neu gemischt und ausgeteilt."
  },
  {
    "question": "Zählen die Punkte bei annulliertem Spiel?",
    "answer": "Nein, bei einem annullierten Spiel werden keine Punkte vergeben."
  }
]
```

---
id: `weis_rules_achtblatt`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Acht aufeinanderfolgende Karten derselben Farbe bilden ein Achtblatt (8 [Blatt](./expressions_blatt))
• Wert: 250 [Weispunkte](./expressions_weispunkte)
• Aussergewöhnliche [Weis](./weis_rules_general)-Kombination

Gültigkeit:
• Gültig für alle Jassarten mit Weisen
• Funktioniert unabhängig davon, ob [Trumpf](./expressions_trumpf), [Undenufe](./expressions_undenufe) oder [Obenabe](./expressions_obenabe) gespielt wird

Beispiel:
• Ass, König, Dame ([Ober](./expressions_banner)), Under (Puur), Zehn (Banner), Neun (Nell), Acht, Sieben in einer Farbe

Voraussetzung:
• Die Meldung vor dem ersten [Ausspiel](./ausspiel) ist zwingend erforderlich, andernfalls verliert der Weis seine Gültigkeit
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte ist ein Achtblatt wert?",
    "answer": "Ein Achtblatt ist 250 Weispunkte wert."
  },
  {
    "question": "Was ist ein Achtblatt?",
    "answer": "Ein Achtblatt sind acht aufeinanderfolgende Karten derselben Farbe."
  },
  {
    "question": "Bei welchen Spielarten gilt ein Achtblatt?",
    "answer": "Ein Achtblatt gilt bei allen Jassarten mit Weisen, unabhängig davon ob Trumpf, Undenufe oder Obenabe gespielt wird."
  },
  {
    "question": "Wann muss man ein Achtblatt melden?",
    "answer": "Ein Achtblatt muss vor dem ersten Ausspiel gemeldet werden, sonst verliert es seine Gültigkeit."
  }
]
```

---
id: `weis_rules_ausmachen_basics`
---

**Bereinigter Haupttext:**
```markdown
Grundregel:
Beim [Ausmachen](./expressions_ausmachregel) entscheidet die Reihenfolge «[Stöck](./weis_rules_stock) - [Wys](./weis_rules_general) - [Stich](./expressions_stich)».

Sondervereinbarung:
• Andere Abfolge (z.B. «Stöck - Stich - Wys») muss vor dem ersten Spiel vereinbart werden

Gültigkeit der Stöcke:
• Stöcke zählen ausschliesslich bei [Trumpffarben](./general_trump_values)
• Stöcke zählen nicht bei [Undenufe](./expressions_undenufe) oder [Obenabe](./expressions_obenabe)

Hintergrund dieser Regelung:
Die Ausmachregel orientiert sich am Aufwand verschiedener Kombinationen:
• Stöcke benötigen nur zwei spezifische Karten: König und Ober (oder Dame)
• Für einen gültigen Weis braucht es mindestens drei aufeinanderfolgende Karten
• Ein einzelner Stich kann bereits aus einer einzigen Karte bestehen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet «Stöck - Wys - Stich» beim Ausmachen?",
    "answer": "Diese Reihenfolge bestimmt, in welcher Reihenfolge Punkte gezählt werden, wenn beide Teams das Ziel erreicht haben: zuerst Stöcke, dann Weise, dann Stiche."
  },
  {
    "question": "Zählen Stöcke bei Undenufe?",
    "answer": "Nein, Stöcke zählen nur bei Trumpffarben, nicht bei Undenufe oder Obenabe."
  },
  {
    "question": "Kann man die Ausmachregel ändern?",
    "answer": "Ja, eine andere Abfolge wie «Stöck - Stich - Wys» muss aber vor dem ersten Spiel vereinbart werden."
  },
  {
    "question": "Warum gilt diese Reihenfolge?",
    "answer": "Die Reihenfolge orientiert sich am Aufwand: Stöcke benötigen nur zwei Karten, ein Weis mindestens drei, und ein Stich kann aus nur einer Karte bestehen."
  }
]
```

---
id: `weis_rules_ausmachen_early_thanking`
---

**Bereinigter Haupttext:**
```markdown
Grundregel:
Spieler, der sich [bedankt](./bedanken), obwohl er das Ziel nicht erreicht hat, verliert automatisch die [Partie](./expressions_partie).

Erlaubtes Bedanken:
• Spieler legt eine Karte und die Punkte aus allen bereits in diesem [Stich](./expressions_stich) gelegten Karten (inklusive seiner eigenen) reichen zum Sieg aus
• Der Spieler kann sich sofort bedanken

Verbotenes Verhalten:
• Während eines laufenden Spiels Karten zählen, um herauszufinden, ob die Punkte zum Sieg ausreichen
• Wer dies tut und sich bedankt, verliert die Partie, falls sich herausstellt, dass das Ziel nicht erreicht wurde

Zweck dieser Regel:
• Verhindert, dass während des Spiels gezählt wird
• Verhindert die Suche nach zusätzlichen [Bockkarten](./expressions_bockkarte)

Sonderfall – Falsch gespielte Karte:
• Falls sich ein Team bedankt und dabei Punkte einer versehentlich falsch gespielten Karte des Gegners mitzählt, wird das Bedanken als ungültig gewertet
• Dies gilt nur, wenn nach korrigierter Kartenverteilung die erforderliche Punktzahl nicht mehr erreicht wird
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was passiert, wenn man zu früh bedankt?",
    "answer": "Wer sich bedankt, obwohl er das Ziel nicht erreicht hat, verliert automatisch die Partie."
  },
  {
    "question": "Wann darf man frühzeitig bedanken?",
    "answer": "Man darf bedanken, wenn die Punkte aus allen bereits im aktuellen Stich gelegten Karten (inklusive der eigenen) zum Sieg ausreichen."
  },
  {
    "question": "Darf man während des Spiels Punkte zählen?",
    "answer": "Nein, während des laufenden Spiels Karten zu zählen ist verboten. Wer dies tut und sich bedankt, verliert die Partie, falls das Ziel nicht erreicht wurde."
  },
  {
    "question": "Was ist der Zweck dieser Regel?",
    "answer": "Die Regel verhindert, dass während des Spiels gezählt wird und nach zusätzlichen Bockkarten gesucht wird."
  }
]
```

---
id: `weis_rules_ausmachen_order`
---

**Bereinigter Haupttext:**
```markdown
Grundregel:
Nach Beendigung des ersten [Stichs](./expressions_stich) kann die [Ausmachregel](./expressions_ausmachregel) greifen. Haben beide [Teams](./expressions_team) das Ziel erreicht, gilt die feste Wertungsreihenfolge:
• Zuerst werden [Stöcke](./weis_rules_stock) gewertet (sofern ausreichend oder in Kombination)
• Danach folgt der [Weis](./weis_rules_general)
• Anschliessend der Stich

Zeitpunkt der Berufung:
• Die Möglichkeit, sich auf diese Regel zu berufen, endet erst, wenn der Spieler seine Karte zum zweiten Stich beigibt
• Bei Anwendung spielt die Reihenfolge des [Bedankens](./bedanken) keine Rolle

Besonders relevant im letzten Spiel:
• Haben alle ihre erste Karte gespielt und erreicht ein Team mit [Weispunkten](./expressions_weispunkte), das andere mit Kartenpunkten das Ziel, entscheidet die Ausmachregel über den Sieg

Standardregelung:
• Falls vor Spielbeginn keine Vereinbarung getroffen wurde und auch keine lokale Gewohnheit bekannt ist, gilt standardmässig immer die Reihenfolge «Stöck - Wys - Stich»
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wann greift die Ausmachregel?",
    "answer": "Die Ausmachregel greift nach Beendigung des ersten Stichs, wenn beide Teams das Ziel erreicht haben."
  },
  {
    "question": "In welcher Reihenfolge werden die Punkte gezählt?",
    "answer": "Zuerst werden Stöcke gewertet, danach der Weis und anschliessend der Stich."
  },
  {
    "question": "Bis wann kann man sich auf die Ausmachregel berufen?",
    "answer": "Die Möglichkeit endet erst, wenn der Spieler seine Karte zum zweiten Stich beigibt."
  },
  {
    "question": "Was ist die Standardregelung?",
    "answer": "Falls keine Vereinbarung getroffen wurde, gilt standardmässig immer die Reihenfolge «Stöck - Wys - Stich»."
  }
]
```

---
id: `weis_rules_ausmachen_schneider`
---

**Bereinigter Haupttext:**
```markdown
Besondere Situation:
Im ersten [Stich](./expressions_stich) erreicht ein [Team](./expressions_team) das Gesamtziel, während das andere Team sich noch im [Schneider](./schneider) befindet. Ein Team nutzt [Weispunkte](./expressions_weispunkte), das andere Kartenpunkte zum [Ausmachen](./expressions_ausmachregel). Hier greift ebenfalls die Ausmachregel: Entweder «[Stöck](./weis_rules_stock) - [Wys](./weis_rules_general) - Stich» oder, falls vereinbart, «Stöck - Stich - Wys».

Beispiele:

Szenario 1 – Gewinner durch Stöcke:
• Erreichen die späteren Gewinner durch ihre Stöcke das Ziel
• Verlierer können weder Weispunkte noch Kartenpunkte mehr verbuchen
• Verlierer bleiben damit im Schneider

Szenario 2 – Schneider-Vermeidung durch Weis:
• Schaffen im Schneider befindliche Spieler durch einen Weis über die Grenze
• Gewinner bedanken sich nur dann erfolgreich mit Stichpunkten, wenn die Regel «Stöck - Wys - Stich» gilt
• In diesem Fall wäre der Schneider vermieden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was passiert, wenn ein Team im Schneider ist beim Ausmachen?",
    "answer": "Wenn im ersten Stich ein Team das Ziel erreicht und das andere im Schneider ist, greift die Ausmachregel und entscheidet über den Ausgang."
  },
  {
    "question": "Kann man den Schneider durch Weispunkte vermeiden?",
    "answer": "Ja, wenn im Schneider befindliche Spieler durch einen Weis über die Grenze kommen und die Regel «Stöck - Wys - Stich» gilt, ist der Schneider vermieden."
  },
  {
    "question": "Welche Regel gilt beim Schneider-Ausmachen?",
    "answer": "Es gilt entweder «Stöck - Wys - Stich» oder, falls vereinbart, «Stöck - Stich - Wys»."
  }
]
```

---
id: `weis_rules_ausmachen_thanking`
---

**Bereinigter Haupttext:**
```markdown
Grundregel:
Während des Spielverlaufs oder beim Spielende steht es jedem [Team](./expressions_team) frei, sich jederzeit zu [bedanken](./bedanken). Ob die Partei gerade am Zug ist oder nicht, spielt keine Rolle. Entscheidend ist: Das Team, das sich zuerst bedankt und über ausreichend Punkte verfügt, gewinnt die [Partie](./expressions_partie).

Verbindlichkeit der Erklärung:
• Verschiedene Formulierungen sind gleichwertig und alle rechtsverbindlich
• Beispiele für gleichwertige Formulierungen: «Wir sind fertig», «Wir haben genug», «Mir sind dusse» oder andere Art der Siegesmeldung
• Alle haben den gleichen Stellenwert wie «Wir bedanken uns»
• Wenn ein Spieler sich bedankt, bindet dies automatisch auch seinen [Partner](./schieber_taktiken_partner)
• Gilt unabhängig davon, wer aktuell als [Schreiber](./schreiben) fungiert
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wann darf man sich bedanken?",
    "answer": "Ein Team kann sich jederzeit während des Spielverlaufs oder beim Spielende bedanken, unabhängig davon, ob es gerade am Zug ist."
  },
  {
    "question": "Welche Formulierungen gelten als Bedanken?",
    "answer": "Verschiedene Formulierungen wie «Wir sind fertig», «Wir haben genug» oder «Mir sind dusse» haben alle den gleichen Stellenwert wie «Wir bedanken uns»."
  },
  {
    "question": "Bindet das Bedanken auch den Partner?",
    "answer": "Ja, wenn ein Spieler sich bedankt, bindet dies automatisch auch seinen Partner, unabhängig davon, wer als Schreiber fungiert."
  },
  {
    "question": "Wer gewinnt, wenn beide Teams bedanken?",
    "answer": "Das Team, das sich zuerst bedankt und über ausreichend Punkte verfügt, gewinnt die Partie."
  }
]
```

---
id: `weis_rules_dreiblatt`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Drei aufeinanderfolgende Karten derselben Farbe bilden ein Dreiblatt (3 [Blatt](./expressions_blatt))
• Wert: 20 [Weispunkte](./expressions_weispunkte)

Gültigkeit:
• Gilt für sämtliche Jassvarianten, bei denen [Weisen](./weis_rules_general) erlaubt sind
• Kann bei Spielen mit [Trumpffarbe](./general_trump_values) gewiesen werden
• Kann bei [Undenufe](./expressions_undenufe) gewiesen werden
• Kann bei [Obenabe](./expressions_obenabe) gewiesen werden

Voraussetzung:
• Der Weis muss vor dem ersten [Ausspiel](./ausspiel) angemeldet werden, nur so bleibt er gültig
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte ist ein Dreiblatt wert?",
    "answer": "Ein Dreiblatt ist 20 Weispunkte wert."
  },
  {
    "question": "Was ist ein Dreiblatt?",
    "answer": "Ein Dreiblatt sind drei aufeinanderfolgende Karten derselben Farbe."
  },
  {
    "question": "Wann muss man ein Dreiblatt melden?",
    "answer": "Ein Dreiblatt muss vor dem ersten Ausspiel angemeldet werden, nur so bleibt es gültig."
  },
  {
    "question": "Bei welchen Spielarten gilt ein Dreiblatt?",
    "answer": "Ein Dreiblatt gilt für sämtliche Jassvarianten mit Weisen, bei Trumpffarbe, Undenufe und Obenabe."
  }
]
```

---
id: `weis_rules_fuenfblatt`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Fünf aufeinanderfolgende Karten derselben Farbe ergeben ein Fünfblatt (5 [Blatt](./expressions_blatt))
• Wert: 100 [Weispunkte](./expressions_weispunkte)

Gültigkeit:
• Gültig für alle Jassarten mit [Weisen](./weis_rules_general)
• Funktioniert bei [Trumpffarbe](./general_trump_values), [Undenufe](./expressions_undenufe) und [Obenabe](./expressions_obenabe) gleichermassen
• Bei gleichem Punktwert schlägt Fünfblatt [vier gleiche Karten](./weis_rules_vier_gleiche)

Beispiel:
• Ass, König, Dame (Ober), Under (Puur), Zehn ([Banner](./expressions_banner)) in einer Farbe

Voraussetzung:
• Meldung vor dem ersten [Ausspiel](./ausspiel) erforderlich, andernfalls ungültig
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte ist ein Fünfblatt wert?",
    "answer": "Ein Fünfblatt ist 100 Weispunkte wert."
  },
  {
    "question": "Was ist ein Fünfblatt?",
    "answer": "Ein Fünfblatt sind fünf aufeinanderfolgende Karten derselben Farbe."
  },
  {
    "question": "Wann muss man ein Fünfblatt melden?",
    "answer": "Ein Fünfblatt muss vor dem ersten Ausspiel gemeldet werden, sonst ist es ungültig."
  },
  {
    "question": "Was gilt bei gleichem Punktwert?",
    "answer": "Bei gleichem Punktwert schlägt ein Fünfblatt vier gleiche Karten."
  }
]
```

---
id: `weis_rules_general`
---

**Bereinigter Haupttext:**
```markdown
Grundsätzliche Regel:
Alle [Weise](./expressions_weis) müssen vor dem ersten [Ausspiel](./ausspiel) gemeldet werden.

Ausnahme:
• Der letzte Spieler darf noch weisen, bis der [Stich](./expressions_stich) zusammengenommen wurde

Korrektur falscher Meldung:
• Falls ein Spieler versehentlich eine falsche Punktezahl meldet (z.B. 20 statt 50), kann dies nur korrigiert werden, solange die entsprechende Karte noch nicht gedeckt wurde

Bei gleichwertigen Weisen:
• Der zweite Melder hat nur die Möglichkeit, mit «gut» zu antworten
• «[Vorhand](./expressions_vorhand)» zu sagen ist nicht gestattet
• Der wertvollste Weis wird grundsätzlich zuerst genannt
• Danach können weitere gleichwertige oder niedrigere Weise nachgemeldet werden

Zweite Weise und Nachfragen:
• Zweite Weise müssen spätestens bis zum zweiten Stich deklariert werden
• Falls jemand einen Weis überhört hat, kann er bis zum zweiten Stich nachfragen

Verboten:
• Unnötige [Weismeldungen](./expressions_weismeldung) sind nicht erlaubt
• Karten, die zu ungültigen Weisen verraten wurden, verlieren ihren Stechwert
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wann muss man Weise melden?",
    "answer": "Alle Weise müssen vor dem ersten Ausspiel gemeldet werden, mit Ausnahme des letzten Spielers, der noch weisen darf, bis der Stich zusammengenommen wurde."
  },
  {
    "question": "Kann man eine falsche Weismeldung korrigieren?",
    "answer": "Ja, aber nur solange die entsprechende Karte noch nicht gedeckt wurde."
  },
  {
    "question": "Was sagt man bei gleichwertigen Weisen?",
    "answer": "Der zweite Melder hat nur die Möglichkeit, mit «gut» zu antworten. «Vorhand» zu sagen ist nicht gestattet."
  },
  {
    "question": "Bis wann kann man zweite Weise melden?",
    "answer": "Zweite Weise müssen spätestens bis zum zweiten Stich deklariert werden."
  },
  {
    "question": "Was passiert bei unnötigen Weismeldungen?",
    "answer": "Unnötige Weismeldungen sind verboten, und Karten, die zu ungültigen Weisen verraten wurden, verlieren ihren Stechwert."
  }
]
```

---
id: `weis_rules_kreuzweis`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Diese Regel ermöglicht es, eine einzelne Karte für zwei verschiedene [Weismeldungen](./expressions_weismeldung) zu verwenden.

Beispiel:
• Ein [Vierblatt](./weis_rules_vierblatt) (4 Blatt) beginnend beim Ass in [Schilten](./expressions_schilte) kombiniert mit vier Königen ergibt zusammen 150 Punkte
• Die verwendeten Karten dürfen sich durchaus überschneiden

Gültigkeit:
• [Kreuzweise](./expressions_kreuzweis) sind bei allen Spielarten erlaubt, die [Weisen](./weis_rules_general) zulassen

Wichtige Regel:
• Der wertvollere [Weis](./expressions_weis) muss vor dem ersten [Ausspiel](./ausspiel) gemeldet werden
• Der weniger wertvolle darf erst dann angesagt werden, wenn der höhere Weis erfolgreich war

Grundvoraussetzung:
• Beide Weise müssen für sich genommen gültig sein
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Kreuzweis?",
    "answer": "Ein Kreuzweis ermöglicht es, eine einzelne Karte für zwei verschiedene Weismeldungen zu verwenden."
  },
  {
    "question": "Dürfen sich die Karten überschneiden?",
    "answer": "Ja, die verwendeten Karten dürfen sich durchaus überschneiden."
  },
  {
    "question": "Welcher Weis muss zuerst gemeldet werden?",
    "answer": "Der wertvollere Weis muss vor dem ersten Ausspiel gemeldet werden, der weniger wertvolle darf erst dann angesagt werden, wenn der höhere Weis erfolgreich war."
  },
  {
    "question": "Was ist die Voraussetzung für einen Kreuzweis?",
    "answer": "Beide Weise müssen für sich genommen gültig sein."
  }
]
```

---
id: `weis_rules_neunblatt`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Neun aufeinanderfolgende Karten derselben Farbe ergeben ein Neunblatt (9 [Blatt](./expressions_blatt))
• Wert: 300 [Weispunkte](./expressions_weispunkte)
• Höchste [Weis](./weis_rules_general) beim Jassen

Gültigkeit:
• Gültig für alle Jassarten, die Weisen zulassen
• Funktioniert bei [Trumpffarbe](./general_trump_values), [Undenufe](./expressions_undenufe) und [Obenabe](./expressions_obenabe) gleichermassen

Beispiel:
• Ass, König, Dame (Ober), Under (Puur), Zehn ([Banner](./expressions_banner)), Neun ([Nell](./expressions_nell)), Acht, Sieben, Sechs in einer Farbe

Voraussetzung:
• Meldung vor dem ersten [Ausspiel](./ausspiel) ist zwingend, damit der Weis rechtsgültig bleibt
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte ist ein Neunblatt wert?",
    "answer": "Ein Neunblatt ist 300 Weispunkte wert und ist der höchste Weis beim Jassen."
  },
  {
    "question": "Was ist ein Neunblatt?",
    "answer": "Ein Neunblatt sind neun aufeinanderfolgende Karten derselben Farbe."
  },
  {
    "question": "Wann muss man ein Neunblatt melden?",
    "answer": "Ein Neunblatt muss vor dem ersten Ausspiel gemeldet werden, damit es rechtsgültig bleibt."
  },
  {
    "question": "Bei welchen Spielarten gilt ein Neunblatt?",
    "answer": "Ein Neunblatt gilt für alle Jassarten mit Weisen, bei Trumpffarbe, Undenufe und Obenabe."
  }
]
```

---
id: `weis_rules_notation_basics`
---

**Bereinigter Haupttext:**
```markdown
Grundregel:
Das erzielte Resultat eines Spieles (Kartenpunkte) wird nach Beendigung sofort notiert. [Schreiben](./schreiben) ist erlaubt bis zum ersten [Stich](./expressions_stich) des neuen Spieles. Der Schreiber muss die Punkte jederzeit übersichtlich notieren.

Schreibweise auf der Tafelseite:
• Striche für 100 Punkte: Oben von links nach rechts
• Striche für 50 Punkte: Mitte der Tafelseite
• Striche für 20 Punkte: Unten von links nach rechts

Vorteile von Apps:
• Schreiben wird schneller und präziser erledigt
• App rechnet automatisch für beide [Teams](./expressions_team)
• Vermeidet Fehler bei Punkteberechnung
• Mehr Zeit zum Jassen bleibt
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wann müssen die Punkte notiert werden?",
    "answer": "Das erzielte Resultat wird nach Beendigung sofort notiert. Schreiben ist erlaubt bis zum ersten Stich des neuen Spieles."
  },
  {
    "question": "Wie werden Punkte auf der Tafel notiert?",
    "answer": "Striche für 100 Punkte oben von links nach rechts, für 50 Punkte in der Mitte, für 20 Punkte unten von links nach rechts."
  },
  {
    "question": "Was sind die Vorteile von Jass-Apps?",
    "answer": "Apps sind schneller und präziser, rechnen automatisch für beide Teams, vermeiden Fehler und lassen mehr Zeit zum Jassen."
  }
]
```

---
id: `weis_rules_notation_correction`
---

**Bereinigter Haupttext:**
```markdown
Regel bei nur einem Schreiber:
Bei nur einer Person für die Eintragung der Resultate gilt eine besondere Regelung.

Korrekturmöglichkeiten:
• Alle Teilnehmer können im Verlauf des nächsten Spiels Korrekturwünsche äussern
• Korrekturwünsche sind möglich bei vermuteten Fehlern
• Diese Möglichkeit besteht während der kompletten Dauer der folgenden Runde

Recht auf übersichtliche Darstellung:
• Gegenspieler können jederzeit eine klar strukturierte Darstellung verlangen
• Die Darstellung muss übersichtlich sein und alle bisherigen Notierungen umfassen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wann kann man Korrekturen verlangen?",
    "answer": "Alle Teilnehmer können im Verlauf des nächsten Spiels Korrekturwünsche äussern, wenn nur eine Person die Resultate einträgt."
  },
  {
    "question": "Wie lange gilt die Korrekturmöglichkeit?",
    "answer": "Die Möglichkeit besteht während der kompletten Dauer der folgenden Runde."
  },
  {
    "question": "Kann man eine übersichtliche Darstellung verlangen?",
    "answer": "Ja, Gegenspieler können jederzeit eine klar strukturierte Darstellung aller bisherigen Notierungen verlangen."
  }
]
```

---
id: `weis_rules_notation_numbers`
---

**Bereinigter Haupttext:**
```markdown
Grundregel:
Die rechte Seite der Jass-[Tafel](./expressions_braettli) ist ausschliesslich für eine einzige Zahl reserviert. Die Zahl kann positiv oder negativ sein (z.B. 8 oder -12).

Nach Eintragung durch beide [Schreiber](./schreiben):
• Änderungen sind nur noch bei eindeutigen Beweisen möglich
• Verhindert nachträgliche Manipulationen
• Sorgt für faire Spielbedingungen

Vorteile von Apps:
• Rechen- und Schreibfehler sind ausgeschlossen (höchstens Tipfehler möglich)
• Schreiben und Rechnen erfolgt mit Kalkulator
• Resultate für jeden Umgang werden digital erfasst
• Resultate können jederzeit überprüft werden
• Bei Bedarf können Resultate korrigiert werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wofür ist die rechte Seite der Tafel?",
    "answer": "Die rechte Seite der Jass-Tafel ist ausschliesslich für eine einzige Zahl (positiv oder negativ) reserviert."
  },
  {
    "question": "Kann man Zahlen nach Eintragung ändern?",
    "answer": "Änderungen sind nach Eintragung durch beide Schreiber nur noch bei eindeutigen Beweisen möglich, um Manipulationen zu verhindern."
  },
  {
    "question": "Was sind die Vorteile von Apps beim Schreiben?",
    "answer": "Apps schliessen Rechen- und Schreibfehler aus, erfassen Resultate digital und ermöglichen jederzeit Überprüfung und Korrektur."
  }
]
```

---
id: `weis_rules_sechsblatt`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Sechs aufeinanderfolgende Karten derselben Farbe bilden ein Sechsblatt (6 [Blatt](./expressions_blatt))
• Wert: 150 [Weispunkte](./expressions_weispunkte)

Gültigkeit:
• Gültig für alle Jassarten mit [Weisen](./weis_rules_general)
• Funktioniert unabhängig von der Spielart ([Trumpf](./expressions_trumpf), [Undenufe](./expressions_undenufe) oder [Obenabe](./expressions_obenabe))

Beispiel:
• Ass, König, Dame (Ober), Under (Puur), Zehn ([Banner](./expressions_banner)), Neun ([Nell](./expressions_nell)) in einer Farbe

Voraussetzung:
• Meldung vor dem ersten [Ausspiel](./ausspiel) ist zwingend, sonst verliert der Weis seine Gültigkeit
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte ist ein Sechsblatt wert?",
    "answer": "Ein Sechsblatt ist 150 Weispunkte wert."
  },
  {
    "question": "Was ist ein Sechsblatt?",
    "answer": "Ein Sechsblatt sind sechs aufeinanderfolgende Karten derselben Farbe."
  },
  {
    "question": "Wann muss man ein Sechsblatt melden?",
    "answer": "Ein Sechsblatt muss vor dem ersten Ausspiel gemeldet werden, sonst verliert es seine Gültigkeit."
  },
  {
    "question": "Bei welchen Spielarten gilt ein Sechsblatt?",
    "answer": "Ein Sechsblatt gilt für alle Jassarten mit Weisen, unabhängig von der Spielart (Trumpf, Undenufe oder Obenabe)."
  }
]
```

---
id: `weis_rules_siebenblatt`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Sieben aufeinanderfolgende Karten derselben Farbe ergeben ein Siebenblatt (7 [Blatt](./expressions_blatt))
• Wert: 200 [Weispunkte](./expressions_weispunkte)
• Seltene und sehr wertvolle [Weis](./weis_rules_general)-Kombination

Gültigkeit:
• Gültig für alle Jassarten, die Weisen zulassen
• Funktioniert bei [Trumpffarbe](./general_trump_values), [Undenufe](./expressions_undenufe) und [Obenabe](./expressions_obenabe) gleichermassen

Beispiel:
• Ass, König, Dame (Ober), Under (Puur), Zehn ([Banner](./expressions_banner)), Neun ([Nell](./expressions_nell)), Acht in einer Farbe

Voraussetzung:
• Meldung vor dem ersten [Ausspiel](./ausspiel) erforderlich, damit der Weis gültig bleibt
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte ist ein Siebenblatt wert?",
    "answer": "Ein Siebenblatt ist 200 Weispunkte wert."
  },
  {
    "question": "Was ist ein Siebenblatt?",
    "answer": "Ein Siebenblatt sind sieben aufeinanderfolgende Karten derselben Farbe und ist eine seltene, sehr wertvolle Weis-Kombination."
  },
  {
    "question": "Wann muss man ein Siebenblatt melden?",
    "answer": "Ein Siebenblatt muss vor dem ersten Ausspiel gemeldet werden, damit es gültig bleibt."
  },
  {
    "question": "Bei welchen Spielarten gilt ein Siebenblatt?",
    "answer": "Ein Siebenblatt gilt für alle Jassarten mit Weisen, bei Trumpffarbe, Undenufe und Obenabe."
  }
]
```

---
id: `weis_rules_stock`
---

**Bereinigter Haupttext:**
```markdown
Definition:
König und Ober (oder Dame) der [Trumpffarbe](./general_trump_values) ergeben zusammen die [Stöcke](./expressions_stoecke). Diese Kombination bringt 20 Punkte ein und hat einen besonderen Status im Spiel.

Zeitpunkt des Weisens:
• Die Stöcke werden in dem Moment gewiesen, in dem der Spieler seine zweite Stöckkarte ausspielt
• Nachdem diese Karte gedeckt wurde, ist es nicht mehr möglich, die Stöcke zu melden
• Wichtig: Der [Partner](./schieber_taktiken_partner) darf seinen Mitspieler nicht auf vorhandene Stöcke hinweisen

Eintragung der Punkte:
• Punkte müssen unmittelbar oder spätestens bis zum folgenden [Stich](./expressions_stich) in die Tafel eingetragen werden

Besonderheit:
• Ein [Weis](./weis_rules_general) mit Stöcken bleibt unter allen Umständen gültig
• Gilt selbst wenn kein Stich gemacht wird
• Gilt auch wenn ein Match angenommen wurde

Beim Ausmachen:
• Stöcke können zu jedem Zeitpunkt vorgewiesen werden, vorausgesetzt die 20 Punkte reichen zum Erreichen des Ziels aus
• Gleiches gilt auch bei der Wertung für den [Bergpreis](./bergpreis)
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind Stöcke?",
    "answer": "König und Ober (oder Dame) der Trumpffarbe ergeben zusammen die Stöcke und bringen 20 Punkte."
  },
  {
    "question": "Wann werden Stöcke gewiesen?",
    "answer": "Die Stöcke werden in dem Moment gewiesen, in dem der Spieler seine zweite Stöckkarte ausspielt."
  },
  {
    "question": "Kann der Partner auf Stöcke hinweisen?",
    "answer": "Nein, der Partner darf seinen Mitspieler nicht auf vorhandene Stöcke hinweisen."
  },
  {
    "question": "Gelten Stöcke auch ohne Stich?",
    "answer": "Ja, ein Weis mit Stöcken bleibt unter allen Umständen gültig, selbst wenn kein Stich gemacht wird."
  },
  {
    "question": "Wann können Stöcke beim Ausmachen verwendet werden?",
    "answer": "Stöcke können zu jedem Zeitpunkt vorgewiesen werden, vorausgesetzt die 20 Punkte reichen zum Erreichen des Ziels aus."
  }
]
```

---
id: `weis_rules_stock_hindersi`
---

**Bereinigter Haupttext:**
```markdown
Besondere Regelung:
Bei Jass-Varianten mit [Hindersi](./variants_specialty_hindersi)-Charakter gelten andere Regeln (z.B. Hindersi für 4 Spieler, Hindersi für 3 Spieler). Das Ziel ist, möglichst wenige Punkte zu erzielen.

Wer weist die Stöcke:
• Das gegnerische [Team](./expressions_team) muss die [Stöcke](./weis_rules_stock) für die Gegner weisen
• Nicht das Team, das die Stöcke hält

Grund:
• Bei Hindersi-Varianten sind Punkte negativ
• Stöcke bringen 20 unerwünschte Punkte
• Daher werden sie vom anderen Team gewiesen

Beispiele:
• Hindersi (Ziel: Möglichst wenige Punkte)
• Andere Varianten mit [Minuspunkt](./expressions_minuspunkte)-Charakter
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wer weist die Stöcke bei Hindersi?",
    "answer": "Bei Hindersi muss das gegnerische Team die Stöcke für die Gegner weisen, nicht das Team, das die Stöcke hält."
  },
  {
    "question": "Warum weist das gegnerische Team die Stöcke?",
    "answer": "Bei Hindersi-Varianten sind Punkte negativ, und Stöcke bringen 20 unerwünschte Punkte, daher werden sie vom anderen Team gewiesen."
  },
  {
    "question": "Was ist das Ziel bei Hindersi?",
    "answer": "Das Ziel bei Hindersi ist, möglichst wenige Punkte zu erzielen."
  }
]
```

---
id: `weis_rules_vier_gleiche`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Vier identische Karten ergeben einen wertvollen [Weis](./weis_rules_general).

Werte verschiedener vier gleicher Karten:
• Vier identische Karten (z.B. vier Sechser oder vier Könige): 100 Punkte
• Vier Neuner: 150 [Weispunkte](./expressions_weispunkte)
• Vier Under (Bauer, Puur): 200 Weispunkte

Gültigkeit:
• Diese Kombinationen gelten bei [Trumpffarben](./general_trump_values), [Undenufe](./expressions_undenufe) und [Obenabe](./expressions_obenabe) gleichermassen
• Vier gleiche Karten können immer gemeldet werden, ungeachtet der gewählten Spielart

Beispiele:
• Vier Sechser können bei Undenufe, Trumpf oder Obenabe gewiesen werden
• Vier Kinder (auch Asse) gelten bei Undenufe als Hunderterweis

Voraussetzung:
• Die Meldung muss vor dem ersten [Ausspiel](./ausspiel) erfolgen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte sind vier gleiche Karten wert?",
    "answer": "Vier identische Karten sind 100 Punkte wert, vier Neuner 150 Punkte und vier Under 200 Punkte."
  },
  {
    "question": "Bei welchen Spielarten gelten vier gleiche Karten?",
    "answer": "Vier gleiche Karten gelten bei Trumpffarben, Undenufe und Obenabe gleichermassen und können immer gemeldet werden."
  },
  {
    "question": "Wann muss man vier gleiche Karten melden?",
    "answer": "Die Meldung muss vor dem ersten Ausspiel erfolgen."
  },
  {
    "question": "Was gilt bei vier Kindern bei Undenufe?",
    "answer": "Vier Kinder (auch Asse) gelten bei Undenufe als Hunderterweis."
  }
]
```

---
id: `weis_rules_vierblatt`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Vier aufeinanderfolgende Karten derselben Farbe bilden ein Vierblatt (4 [Blatt](./expressions_blatt))
• Wert: 50 [Weispunkte](./expressions_weispunkte)

Gültigkeit:
• Gültig für alle Jassarten, die [Weisen](./weis_rules_general) zulassen
• Funktioniert sowohl mit [Trumpf](./expressions_trumpf) als auch bei [Undenufe](./expressions_undenufe) oder [Obenabe](./expressions_obenabe)

Beispiel:
• Ass, König, Dame (Ober), Under (Puur) in einer Farbe

Voraussetzung:
• Meldung muss vor dem ersten [Ausspiel](./ausspiel) erfolgen, sonst ungültig
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte ist ein Vierblatt wert?",
    "answer": "Ein Vierblatt ist 50 Weispunkte wert."
  },
  {
    "question": "Was ist ein Vierblatt?",
    "answer": "Ein Vierblatt sind vier aufeinanderfolgende Karten derselben Farbe."
  },
  {
    "question": "Wann muss man ein Vierblatt melden?",
    "answer": "Ein Vierblatt muss vor dem ersten Ausspiel gemeldet werden, sonst ist es ungültig."
  },
  {
    "question": "Bei welchen Spielarten gilt ein Vierblatt?",
    "answer": "Ein Vierblatt gilt für alle Jassarten mit Weisen, bei Trumpf, Undenufe und Obenabe."
  }
]
```

---
id: `zusammenwerfen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Zusammenwerfen bedeutet, dass sich beide [Teams](./expressions_team) darauf einigen, das aktuelle Spiel abzubrechen und neu zu beginnen.

Gründe für Zusammenwerfen:
• Fehler beim [Verteilen](./general_dealing_basics)
• Einigung, dass die Karten ungünstig verteilt sind
• Wunsch nach Neustart

Voraussetzung und Ablauf:
• Beide Teams müssen zustimmen
• Keine Punkte werden vergeben
• Es wird neu [gemischt](./mischen) und ausgeteilt
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Zusammenwerfen?",
    "answer": "Zusammenwerfen bedeutet, dass sich beide Teams darauf einigen, das aktuelle Spiel abzubrechen und neu zu beginnen."
  },
  {
    "question": "Wann kann man zusammenwerfen?",
    "answer": "Man kann zusammenwerfen bei Fehlern beim Verteilen, wenn die Karten ungünstig verteilt sind oder bei Wunsch nach Neustart."
  },
  {
    "question": "Müssen beide Teams zustimmen?",
    "answer": "Ja, beide Teams müssen dem Zusammenwerfen zustimmen."
  },
  {
    "question": "Zählen die Punkte beim Zusammenwerfen?",
    "answer": "Nein, beim Zusammenwerfen werden keine Punkte vergeben, es wird neu gemischt und ausgeteilt."
  }
]
```

---
id: `general_card_basics`
---

**Bereinigter Haupttext:**
```markdown
Grundkonzept:
In der Schweiz werden [Jasskarten](./general_materials) in zwei Hauptvarianten verwendet, die sich in den Farben unterscheiden.

Deutschschweizerische Karten:
• [Eicheln](./expressions_eichel)
• [Rosen](./expressions_rose)
• [Schilten](./expressions_schilte)
• [Schellen](./expressions_schelle)

Französische Karten:
• [Ecken](./expressions_ecken) (Carreau)
• [Herz](./expressions_herz) (Coeur)
• [Schaufel](./expressions_schaufel) (Pique)
• [Kreuz](./expressions_kreuz) (Trèfle)
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Welche Kartentypen gibt es beim Jassen?",
    "answer": "Beim Jassen werden zwei Hauptvarianten verwendet: Deutschschweizerische Karten (Eicheln, Rosen, Schilten, Schellen) und französische Karten (Ecken, Herz, Schaufel, Kreuz)."
  },
  {
    "question": "Was ist der Unterschied zwischen deutschen und französischen Jasskarten?",
    "answer": "Der Hauptunterschied liegt in den Farben der Karten. Deutsche Karten haben Eicheln, Rosen, Schilten und Schellen, während französische Karten Ecken, Herz, Schaufel und Kreuz haben."
  },
  {
    "question": "Welche Jasskarten werden in der Deutschschweiz verwendet?",
    "answer": "In der Deutschschweiz werden hauptsächlich die deutschschweizerischen Karten mit Eicheln, Rosen, Schilten und Schellen verwendet."
  }
]
```

---
id: `general_card_values`
---

**Bereinigter Haupttext:**
```markdown
Grundregel:
Jede der vier [Farben](./expressions_kartenfarben) umfasst neun Karten. Die Grundwerte ohne [Trumpf](./general_trump_values) sind:

Kartenwerte ohne Trumpf:
• Ass: 11 [Punkte](./general_scoring_rules)
• Zehner ([Banner](./expressions_banner)): 10 Punkte
• König: 4 Punkte
• Ober (Dame): 3 Punkte
• Under ([Puur](./expressions_trumpf_bauer)): 2 Punkte
• Neuner, Achter, Siebner, Sechser: jeweils 0 Punkte
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte ist ein Ass wert?",
    "answer": "Ein Ass ist 11 Punkte wert (ohne Trumpf)."
  },
  {
    "question": "Welche Karten zählen null Punkte?",
    "answer": "Der Neuner, Achter, Siebner und Sechser zählen jeweils 0 Punkte (ausser bei Trumpf, wo Neuner und Under Sonderwerte haben)."
  },
  {
    "question": "Wie viele Karten hat jede Farbe beim Jassen?",
    "answer": "Jede der vier Farben umfasst neun Karten."
  },
  {
    "question": "Was ist ein Banner?",
    "answer": "Banner ist die Bezeichnung für die Zehnerkarte, die 10 Punkte wert ist."
  }
]
```

---
id: `general_trump_values`
---

**Bereinigter Haupttext:**
```markdown
Grundregel:
Im [Trumpf-Spiel](./expressions_trumpf) gelten Sonderwerte für bestimmte Karten, die deutlich mehr [Punkte](./general_scoring_rules) zählen als im normalen Spiel.

Trumpf-Sonderwerte:
• Der Under ([Puur](./expressions_trumpf_bauer)) der Trumpffarbe heisst Trumpf-Puur und zählt 20 Punkte
• Der Neuner der Trumpffarbe heisst [Nell](./expressions_nell) und zählt 14 Punkte
• Diese beiden Karten sind die höchsten Trümpfe im gesamten Spiel
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte ist der Trumpf-Puur wert?",
    "answer": "Der Trumpf-Puur (Under der Trumpffarbe) zählt 20 Punkte und ist die höchste Trumpfkarte."
  },
  {
    "question": "Was ist die Nell?",
    "answer": "Die Nell ist der Neuner der Trumpffarbe und zählt 14 Punkte. Sie ist die zweithöchste Trumpfkarte nach dem Puur."
  },
  {
    "question": "Welche sind die höchsten Karten im Trumpf-Spiel?",
    "answer": "Die höchsten Trümpfe sind der Puur (Under) mit 20 Punkten und die Nell (Neuner) mit 14 Punkten."
  }
]
```

---
id: `general_special_games`
---

**Bereinigter Haupttext:**
```markdown
Grundkonzept:
Bei [Obenabe](./expressions_obenabe) und [Undenufe](./expressions_undenufe) gelten abweichende Kartenwerte, die sich deutlich von normalen [Trumpfspielen](./general_trump_values) unterscheiden.

Undenufe - Kartenwerte:
• Sechser: 11 [Punkte](./general_scoring_rules) (höchste Stechkarte)
• Zehner ([Banner](./expressions_banner)): 10 Punkte
• Achter: 8 Punkte
• König: 4 Punkte
• Ober (Dame): 3 Punkte
• Under ([Puur](./expressions_trumpf_bauer)): 2 Punkte
• Neuner, Siebner: 0 Punkte

Besonderheiten Undenufe:
• Die Sechser sind die höchsten [Stechkarten](./expressions_stechkarten)
• Karten stechen nur innerhalb ihrer eigenen Farbe
• Achter werden mit 8 Punkten gewertet (keine Trumpf-Spezialwerte)
• [Letzter Stich](./letzter_stich) zählt zusätzlich 5 Punkte

Obenabe - Kartenwerte:
• Ass: 11 Punkte (höchste Stechkarte)
• Zehner (Banner): 10 Punkte
• Achter: 8 Punkte
• König: 4 Punkte
• Ober (Dame): 3 Punkte
• Under (Puur): 2 Punkte
• Neuner, Siebner, Sechser: 0 Punkte

Besonderheit Obenabe:
• Achter werden mit 8 Punkten gewertet (keine Trumpf-Spezialwerte Puur und Nell)
• Beim Obenabe kann das Team, welches zuerst sechs Stiche macht, [bedanken](./bedanken) (häufige [Tischregel](./regeln_tischregel))
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte ist ein Sechser beim Undenufe wert?",
    "answer": "Beim Undenufe ist der Sechser 11 Punkte wert und die höchste Stechkarte."
  },
  {
    "question": "Was ist der Unterschied zwischen Obenabe und Undenufe?",
    "answer": "Beim Undenufe sind die Sechser die höchsten Karten (11 Punkte), beim Obenabe sind es die Asse (11 Punkte). Bei beiden Spielen gelten Achter 8 Punkte."
  },
  {
    "question": "Stechen Karten beim Undenufe über alle Farben?",
    "answer": "Nein, beim Undenufe (und Obenabe) können Karten nur Karten derselben Farbe stechen."
  },
  {
    "question": "Wie viele Punkte zählt ein Achter beim Obenabe?",
    "answer": "Beim Obenabe (und Undenufe) zählt ein Achter 8 Punkte."
  }
]
```

---
id: `general_dealing`
---

**Bereinigter Haupttext:**
```markdown
Grundregeln:
Beim Jassen wird die Kartenverteilung nach festen Regeln durchgeführt.

Verteilung:
• Jeder Spieler erhält 9 Karten
• Die Karten werden im Uhrzeigersinn verteilt
• Der Kartengeber beginnt beim Spieler links von sich
• Karten werden einzeln gegeben, nicht in Paketen
• Nach dem Verteilen können die Karten aufgenommen werden

Verantwortlichkeiten:
• Der Kartengeber [mischt](./mischen) und gibt die Karten
• Der Spieler rechts vom Kartengeber kann beim [Abheben](./abheben) die Karten teilen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Karten erhält jeder Spieler beim Jassen?",
    "answer": "Jeder Spieler erhält 9 Karten."
  },
  {
    "question": "In welche Richtung werden die Karten verteilt?",
    "answer": "Die Karten werden im Uhrzeigersinn verteilt, beginnend beim Spieler links vom Kartengeber."
  },
  {
    "question": "Werden die Karten einzeln oder in Paketen verteilt?",
    "answer": "Die Karten werden einzeln verteilt, nicht in Paketen."
  },
  {
    "question": "Wer darf die Karten abheben?",
    "answer": "Der Spieler rechts vom Kartengeber kann die Karten abheben (teilen)."
  }
]
```

---
id: `general_dealing_basics`
---

**Bereinigter Haupttext:**
```markdown
Grundregeln für die Kartenverteilung:
• Der Kartengeber ist für das [Mischen](./mischen) und Verteilen verantwortlich
• Karten werden einzeln verteilt, nicht in Paketen
• Verteilung erfolgt im Uhrzeigersinn, beginnend beim Spieler links vom Kartengeber
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wer ist für das Mischen verantwortlich?",
    "answer": "Der Kartengeber ist für das Mischen und Verteilen der Karten verantwortlich."
  },
  {
    "question": "Bei wem beginnt die Kartenverteilung?",
    "answer": "Die Kartenverteilung beginnt beim Spieler links vom Kartengeber."
  }
]
```

---
id: `general_dealing_methods`
---

**Bereinigter Haupttext:**
```markdown
Übersicht:
Beim Jassen gibt es verschiedene Methoden der Kartenverteilung, die je nach Region und [Tischregel](./regeln_tischregel) variieren können.

Methoden:
• Standardmethode: Karten einzeln im Uhrzeigersinn verteilen
• Klassische Methode: Kartengeber beginnt links von sich
• Moderne Variante: Kann je nach Tischregel abweichen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Gibt es verschiedene Methoden, Karten zu verteilen?",
    "answer": "Ja, es gibt verschiedene Methoden der Kartenverteilung, die je nach Region und Tischregel variieren können. Die Standardmethode ist einzeln im Uhrzeigersinn."
  },
  {
    "question": "Was ist die Standardmethode beim Kartenverteilen?",
    "answer": "Die Standardmethode ist, Karten einzeln im Uhrzeigersinn zu verteilen, beginnend beim Spieler links vom Kartengeber."
  }
]
```

---
id: `general_dealing_errors`
---

**Bereinigter Haupttext:**
```markdown
Regeln bei fehlerhafter Kartenverteilung:
• Falsche Anzahl Karten: Neuverteilung oder Korrektur, je nach Situation
• Karte fällt runter: Siehe spezifische Regel für [Karte fällt runter](./karte_faellt_runter)
• Ungleiche Verteilung: Neuverteilung kann notwendig sein
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was passiert, wenn ein Spieler die falsche Anzahl Karten erhält?",
    "answer": "Bei falscher Anzahl Karten erfolgt je nach Situation eine Neuverteilung oder Korrektur."
  },
  {
    "question": "Was passiert, wenn eine Karte beim Verteilen runterfällt?",
    "answer": "Siehe die spezifische Regel für \"Karte fällt runter\", die das genaue Vorgehen beschreibt."
  }
]
```

---
id: `general_dealing_special`
---

**Bereinigter Haupttext:**
```markdown
Sonderregeln bei der Kartenverteilung:
• [Abheben](./abheben): Spieler rechts vom Kartengeber kann Karten teilen
• [Vorspielen](./vorspielen): Spezielle Regel für erstes Ausspiel
• Schieber: Besondere Regeln beim Schieben des [Trumpfs](./general_trump_values)
• Regionale Unterschiede können vorhanden sein
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Gibt es Sonderregeln beim Kartenverteilen?",
    "answer": "Ja, es gibt mehrere Sonderregeln wie das Abheben, spezielle Regeln für das erste Ausspiel und regionale Unterschiede."
  },
  {
    "question": "Was bedeutet Abheben beim Jassen?",
    "answer": "Abheben bedeutet, dass der Spieler rechts vom Kartengeber die Karten teilen kann, bevor sie verteilt werden."
  }
]
```

---
id: `general_geography_regions`
---

**Bereinigter Haupttext:**
```markdown
Übersicht:
Beim Jassen gibt es regionale Unterschiede in der Schweiz, die sich vor allem auf Kartentypen und Varianten beziehen.

Regionale Unterschiede:
• Deutschschweiz: Meist [Schieber](./expressions_schieben) mit [deutschen Karten](./general_card_basics)
• Romandie: Oft [französische Karten](./general_card_basics), eigene Varianten
• Tessin: Italienische Einflüsse
• Graubünden: Lokale Besonderheiten in einzelnen Tälern

Gemeinsamkeit:
• Die Grundregeln bleiben überall gleich
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Welche Karten werden in der Deutschschweiz verwendet?",
    "answer": "In der Deutschschweiz werden meist deutsche Karten (Eicheln, Rosen, Schilten, Schellen) verwendet."
  },
  {
    "question": "Gibt es regionale Unterschiede beim Jassen?",
    "answer": "Ja, es gibt regionale Unterschiede vor allem bei Kartentypen und Varianten. Die Grundregeln bleiben aber überall gleich."
  },
  {
    "question": "Welche Karten verwendet man in der Romandie?",
    "answer": "In der Romandie werden oft französische Karten (Ecken, Herz, Schaufel, Kreuz) verwendet."
  }
]
```

---
id: `abheben`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Spieler rechts vom Kartengeber kann die Karten teilen (abheben oder [ablupfen](./expressions_ablupf)).

Regeln:
• Abheben ist optional
• Wenn abgehoben wird, wird der untere [Stapel](./expressions_stapel) auf den oberen gelegt
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Abheben beim Jassen?",
    "answer": "Abheben (oder Ablupfen) bedeutet, dass der Spieler rechts vom Kartengeber die Karten teilen kann."
  },
  {
    "question": "Ist Abheben Pflicht?",
    "answer": "Nein, Abheben ist optional."
  },
  {
    "question": "Wie funktioniert das Abheben?",
    "answer": "Beim Abheben wird der untere Stapel auf den oberen gelegt."
  }
]
```

---
id: `mischen`
---

**Bereinigter Haupttext:**
```markdown
Grundregel:
Vor jeder Runde müssen die Karten gründlich gemischt werden.

Regeln zum Mischen:
• Der Spielgeber ist für das Mischen verantwortlich
• Die Karten müssen ausreichend durchmischt sein
• Bei ungenügendem Mischen kann neu gemischt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wer ist für das Mischen verantwortlich?",
    "answer": "Der Spielgeber ist für das Mischen verantwortlich."
  },
  {
    "question": "Muss vor jeder Runde gemischt werden?",
    "answer": "Ja, vor jeder Runde müssen die Karten gründlich gemischt werden."
  },
  {
    "question": "Was passiert bei ungenügendem Mischen?",
    "answer": "Bei ungenügendem Mischen kann neu gemischt werden."
  }
]
```

---
id: `general_scoring_rules`
---

**Bereinigter Haupttext:**
```markdown
Grundkonzept:
Beim Jassen gibt es wichtige Punkteregeln, die das Zählen und Stechen betreffen.

Letzter Stich:
• Der [letzte Stich](./letzter_stich) eines Spiels zählt zusätzlich 5 Punkte (Ausnahmen: Cinq Cents und Doppelkart)
• Die 5 Punkte für den letzten Stich werden VOR dem Zählen der Kartenpunkte addiert
• Ein komplettes Spiel zählt insgesamt 157 Punkte

Stechregeln:
• Im [Trumpf](./general_trump_values) kann jeder Trumpf alle Farben stechen
• Bei [Obenabe](./expressions_obenabe) und [Undenufe](./expressions_undenufe) können Karten nur Karten derselben Farbe stechen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte zählt der letzte Stich?",
    "answer": "Der letzte Stich zählt zusätzlich 5 Punkte (ausser bei Cinq Cents und Doppelkart)."
  },
  {
    "question": "Wie viele Punkte hat ein komplettes Jass-Spiel?",
    "answer": "Ein komplettes Spiel zählt insgesamt 157 Punkte."
  },
  {
    "question": "Können beim Obenabe Karten über alle Farben stechen?",
    "answer": "Nein, bei Obenabe und Undenufe können Karten nur Karten derselben Farbe stechen. Nur im Trumpf kann jeder Trumpf alle Farben stechen."
  },
  {
    "question": "Wann werden die 5 Punkte für den letzten Stich addiert?",
    "answer": "Die 5 Punkte für den letzten Stich werden VOR dem Zählen der Kartenpunkte addiert."
  }
]
```

---
id: `ausmachregel`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Die Ausmachregel «[Stöck](./weis_rules_stock) - [Wys](./weis_rules_general) - [Stich](./expressions_stich)» entscheidet bei Gleichstand, wenn beide Teams gleichzeitig ein Ziel erreichen.

Reihenfolge:
• Stöck (König und Ober der [Trumpffarbe](./general_trump_values))
• Weis
• Stich
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist die Ausmachregel beim Jassen?",
    "answer": "Die Ausmachregel «Stöck - Wys - Stich» entscheidet bei Gleichstand, wenn beide Teams gleichzeitig ein Ziel erreichen."
  },
  {
    "question": "In welcher Reihenfolge zählt die Ausmachregel?",
    "answer": "Die Reihenfolge ist: 1. Stöck (König und Ober der Trumpffarbe), 2. Weis, 3. Stich."
  },
  {
    "question": "Was sind Stöck bei der Ausmachregel?",
    "answer": "Stöck sind König und Ober der Trumpffarbe und haben bei Gleichstand die höchste Priorität."
  }
]
```

---
id: `bedanken`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Bedanken bezeichnet den Vorgang, bei dem ein [Team](./expressions_team) mitteilt, dass es das Spielziel erreicht hat. Dieser Moment beendet das laufende Spiel.

Grundregeln zum Bedanken:
• Bedanken kann, wer am Zug ist - sei es beim [Ausspielen](./ausspiel) oder beim Aussagen einer Ansage
• Die genaue Punktezahl des bedankenden Teams wird erst nach Spielende ermittelt
• Nach dem Bedanken darf das betreffende Team keine Karte mehr legen

Rücknahme des Bedankens:
• Spielt ein Team nach dem Bedanken noch weiter aus, gilt dies als stillschweigende Rücknahme
• Das gegnerische Team darf nach dem Bedanken des Gegners nicht mehr ausspielen

Besonderheit beim Weisen:
• Wer beim [Weisen](./weis_rules_general) bedankt, muss seine Weis-Karten dem Gegner zeigen, bevor der [Stich](./expressions_stich) gespielt wird
• Der Gegner darf erst nach Einsicht der Weis-Karten seine eigene Karte legen

Gleichzeitiges Bedanken:
• Falls beide Teams gleichzeitig bedanken und gemeinsam das Ziel erreichen, entscheidet die [Ausmachregel](./ausmachregel) «Stöck - Wys - Stich»
• Zusätzlich wird berücksichtigt, wer als Erstes bedankt hat
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Bedanken beim Jassen?",
    "answer": "Bedanken bedeutet, dass ein Team mitteilt, dass es das Spielziel erreicht hat. Dieser Moment beendet das laufende Spiel."
  },
  {
    "question": "Wann darf man bedanken?",
    "answer": "Bedanken kann, wer am Zug ist - sei es beim Ausspielen oder beim Aussagen einer Ansage."
  },
  {
    "question": "Kann man ein Bedanken zurücknehmen?",
    "answer": "Ja, wenn ein Team nach dem Bedanken noch weiter ausspielt, gilt dies als stillschweigende Rücknahme."
  },
  {
    "question": "Was passiert, wenn beide Teams gleichzeitig bedanken?",
    "answer": "Wenn beide Teams gleichzeitig bedanken und gemeinsam das Ziel erreichen, entscheidet die Ausmachregel «Stöck - Wys - Stich» und wer als Erstes bedankt hat."
  }
]
```

---
id: `kartenpunkte_nicht_gezaehlt`
---

**Bereinigter Haupttext:**
```markdown
Regel:
Falls am Ende eines Spiels die Kartenpunkte nicht gezählt werden, gilt dies als stillschweigender Verzicht auf die Punkte.

Konsequenzen:
• Das betroffene [Team](./expressions_team) erhält für dieses Spiel null Punkte
• Der Gegner erhält die vollen Punkte
• Beide Teams sollten stets ihre Punkte zählen, um solche Situationen zu vermeiden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was passiert, wenn Kartenpunkte nicht gezählt werden?",
    "answer": "Wenn am Ende eines Spiels die Kartenpunkte nicht gezählt werden, gilt dies als stillschweigender Verzicht und das betroffene Team erhält null Punkte."
  },
  {
    "question": "Kann man vergessene Punkte nachträglich noch zählen?",
    "answer": "Nein, nicht gezählte Kartenpunkte gelten als Verzicht. Der Gegner erhält die vollen Punkte."
  }
]
```

---
id: `kontermatsch`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Kontermatsch ist ein [Matsch](./matsch), bei dem das nicht trumpfmachende [Team](./expressions_team) sämtliche [Stiche](./expressions_stich) gewinnt.

Wertung:
• Wird gleich wie Matsch gewertet (siehe Abschnitt «[Matsch und Matschprämie](./matsch)»)
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Kontermatsch?",
    "answer": "Ein Kontermatsch ist ein Matsch, bei dem das nicht trumpfmachende Team alle Stiche gewinnt."
  },
  {
    "question": "Wie wird ein Kontermatsch gewertet?",
    "answer": "Ein Kontermatsch wird gleich wie ein normaler Matsch gewertet."
  },
  {
    "question": "Was ist der Unterschied zwischen Matsch und Kontermatsch?",
    "answer": "Beim Matsch gewinnt das trumpfmachende Team alle Stiche, beim Kontermatsch gewinnt das nicht trumpfmachende Team alle Stiche."
  }
]
```

---
id: `letzter_stich`
---

**Bereinigter Haupttext:**
```markdown
Regel:
Der letzte [Stich](./expressions_stich) eines Spiels zählt zusätzlich 5 Punkte.

Ausnahmen:
• Bei Cinq Cents
• Bei Doppelkart-Spielen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte zählt der letzte Stich?",
    "answer": "Der letzte Stich eines Spiels zählt zusätzlich 5 Punkte."
  },
  {
    "question": "Gibt es Ausnahmen bei den 5 Punkten für den letzten Stich?",
    "answer": "Ja, bei Cinq Cents und Doppelkart-Spielen zählt der letzte Stich keine zusätzlichen 5 Punkte."
  }
]
```

---
id: `matsch`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Ein Matsch liegt vor, wenn ein [Team](./expressions_team) alle [Stiche](./expressions_stich) eines Spiels gewinnt.

Gültigkeit:
• Gilt für: Schieber, Varianten-Schieber, Kreuzjass oder Bieter (auch Steiger genannt)

Punktewertung:
• Grundwert: 157 Punkte (normale Punkte für alle Stiche)
• Zusatzprämie: 100 Punkte zusätzlich, sofern mit [Matschprämie](./expressions_matschpraemie) vereinbart
• Gesamt bei Matschprämie: 257 Punkte

Voraussetzungen:
• Kein Gegner hat sich vorher [bedankt](./bedanken) und genügend Punkte für das Ziel erreicht

Mehrfachbewertung beim Schieber:
• Bei doppelter Bewertung: 514 Punkte
• Bei dreifacher Bewertung: 771 Punkte
• Entsprechend höher bei vierfacher Bewertung und mehr
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Matsch beim Jassen?",
    "answer": "Ein Matsch liegt vor, wenn ein Team alle Stiche eines Spiels gewinnt."
  },
  {
    "question": "Wie viele Punkte ist ein Matsch wert?",
    "answer": "Ein Matsch ist 157 Punkte wert (Grundwert). Mit Matschprämie kommen 100 Punkte dazu, also insgesamt 257 Punkte."
  },
  {
    "question": "Bei welchen Spielarten gilt die Matsch-Regelung?",
    "answer": "Die Matsch-Regelung gilt für Schieber, Varianten-Schieber, Kreuzjass und Bieter (Steiger)."
  },
  {
    "question": "Wie viele Punkte zählt ein Matsch beim Schieber mit doppelter Bewertung?",
    "answer": "Bei doppelter Bewertung zählt ein Matsch 514 Punkte (257 × 2)."
  }
]
```

---
id: `schneider`
---

**Bereinigter Haupttext:**
```markdown
Definition:
[Schneider](./expressions_schneider) ist eine Regelung bei bestimmten Jassarten, bei der ein [Team](./expressions_team) den doppelten Einsatz verliert, wenn es die Hälfte des vereinbarten Ziels am Ende der [Partie](./expressions_partie) nicht erreicht.

Gültigkeit:
• Gilt für: Schieber, Kreuzjass, Bieter (Steiger) und Sidi-Barrani werden immer mit Schneider gespielt

Schneidergrenze und Bedanken:
• Schneidergrenze: Die Hälfte des vereinbarten Ziels (z.B. 21 Punkte bei 42 Punkten Ziel)
• Im Moment des [Bedankens](./bedanken) dürfen Kartenpunkte von gekehrten [Stichen](./expressions_stich) mitgezählt werden
• Noch nicht gemeldete [Stöckpunkte](./weis_rules_stock) dürfen ebenfalls mitgezählt werden

Besonderheiten:
• Schneider wird, ausser beim Sidi-Barrani, nicht ausgejasst, da nach dem Bedanken die Partie zu Ende ist

Ausmachregel im ersten Stich:
• Gelangt ein Team im ersten Stich mit Weispunkten ans Ziel, das andere mit Kartenpunkten aus dem Schneider, entscheidet die gültige [Ausmachregel](./ausmachregel)
• Beispiel: Wenn die Gewinner mit den Stöcken ans Ziel kommen, können die Verlierer keine Weis- und Kartenpunkte schreiben, die Verlierer bleiben im Schneider

Ausmachregel «Stock - Wys - Stich»:
• Erreicht das sich noch im Schneider befindende Team mit einem [Weis](./weis_rules_general) die Schneidergrenze, können sich die Gewinner anschliessend mit ihren Stichpunkten bedanken, sofern die Ausmachregel «Stock - Wys - Stich» lautet
• Die Verlierer wenden so den Schneider ab und verlieren nicht den doppelten Einsatz
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Schneider beim Jassen?",
    "answer": "Schneider bedeutet, dass ein Team den doppelten Einsatz verliert, wenn es die Hälfte des vereinbarten Ziels nicht erreicht."
  },
  {
    "question": "Bei welchen Jassarten wird Schneider gespielt?",
    "answer": "Schneider wird bei Schieber, Kreuzjass, Bieter (Steiger) und Sidi-Barrani gespielt."
  },
  {
    "question": "Was ist die Schneidergrenze?",
    "answer": "Die Schneidergrenze ist die Hälfte des vereinbarten Ziels (z.B. 21 Punkte bei 42 Punkten Ziel)."
  },
  {
    "question": "Kann man im Moment des Bedankens aus dem Schneider kommen?",
    "answer": "Ja, im Moment des Bedankens dürfen Kartenpunkte von gekehrten Stichen und noch nicht gemeldete Stöckpunkte mitgezählt werden."
  }
]
```

---
id: `schreiben`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Schreiben bezeichnet das Notieren der erzielten Kartenpunkte nach einem beendeten Spiel.

Grundregeln:
• Direkt nach einem beendeten Spiel werden die Punkte übersichtlich notiert
• Der Schreiber darf diese Punkte notieren, bis er an der Reihe ist, eine Karte zum ersten [Stich](./expressions_stich) des neuen Spiels zu geben

Tafelregeln:
• Auf der rechten Tafelseite darf jeweils nur eine gültige (arabische) Zahl geschrieben sein
• Alle Spieler können eine übersichtliche Darstellung der Striche und/oder Zahlen verlangen

Sonderregeln und Korrekturen:
• Bei Jassarten mit nur einem Schreiber (z.B. Coiffeur-Schieber, Pandur, Handjass) gelten spezielle Korrekturregeln
• Bei Unstimmigkeiten können alle Spieler während dem gesamten Ablauf des folgenden Spiels Korrekturen verlangen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Schreiben beim Jassen?",
    "answer": "Schreiben bezeichnet das Notieren der erzielten Kartenpunkte nach einem beendeten Spiel."
  },
  {
    "question": "Bis wann darf der Schreiber die Punkte notieren?",
    "answer": "Der Schreiber darf die Punkte notieren, bis er an der Reihe ist, eine Karte zum ersten Stich des neuen Spiels zu geben."
  },
  {
    "question": "Wie viele Zahlen dürfen auf der rechten Tafelseite stehen?",
    "answer": "Auf der rechten Tafelseite darf jeweils nur eine gültige (arabische) Zahl geschrieben sein."
  },
  {
    "question": "Können Korrekturen verlangt werden?",
    "answer": "Ja, bei Unstimmigkeiten können alle Spieler während dem gesamten Ablauf des folgenden Spiels Korrekturen verlangen."
  }
]
```

---
id: `general_gameplay`
---

**Bereinigter Haupttext:**
```markdown
Grundregeln des Spielverlaufs:
• Spieler müssen [bedienen](./nichtfarben), wenn möglich
• [Trumpf](./general_trump_values) kann alle anderen Farben stechen
• Wer den [Stich](./expressions_stich) gewinnt, spielt die nächste Karte aus
• Nach neun Stichen ist die Runde vorbei

Punktezählung:
• Punkte werden gezählt: Kartenwerte, [Weise](./weis_rules_general), Match-Bonus
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Muss man beim Jassen bedienen?",
    "answer": "Ja, Spieler müssen bedienen (die ausgespielte Farbe spielen), wenn möglich."
  },
  {
    "question": "Kann Trumpf alle Farben stechen?",
    "answer": "Ja, Trumpf kann alle anderen Farben stechen."
  },
  {
    "question": "Wie viele Stiche hat eine Jass-Runde?",
    "answer": "Nach neun Stichen ist eine Jass-Runde vorbei."
  },
  {
    "question": "Wer spielt nach einem Stich aus?",
    "answer": "Wer den Stich gewinnt, spielt die nächste Karte aus."
  }
]
```

---
id: `ausspiel`
---

**Bereinigter Haupttext:**
```markdown
Definition:
[Ausspiel](./expressions_basic_terms) ist das Legen der ersten Karte zum ersten [Stich](./expressions_stich) einer Runde. Alle Spieler haben bereits Karten aufgenommen und der [Trumpf](./general_trump_values) ist bestimmt.

Grundregel:
• [Vorhand](./expressions_vorhand) (Spieler rechts vom Kartengeber) spielt zum ersten Stich aus

Ausnahmen beim Schieber:
• Schieber oder Coiffeur-Schieber: Spielübernehmer spielt statt Vorhand aus
• Varianten-Schieber: Bei [Guschti](./expressions_guschti), [Slalom](./expressions_slalom) oder 3 mal 3 spielt bei geschobenen Spielen der trumpfmachende Spieler aus

Sonderregel Pandur/Misère:
• Bei Pandur mit Trumpf oder [Misère](./expressions_misere) mit Trumpf muss mit Trumpfkarte eröffnet werden

Kartenwahl und Spielablauf:
• Erstausspieler darf beliebige Karte einer Farbe wählen
• Wer vorherigen Stich gewann, spielt als Nächstes aus
• Andere Spieler müssen gespielte Farbe bedienen, sofern vorhanden
• Kann Spieler Farbe nicht bedienen, darf andere Karte gewählt werden ([Nichtfarben](./nichtfarben))
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Ausspiel beim Jassen?",
    "answer": "Ausspiel ist das Legen der ersten Karte zum ersten Stich einer Runde."
  },
  {
    "question": "Wer spielt zum ersten Stich aus?",
    "answer": "Vorhand (Spieler rechts vom Kartengeber) spielt zum ersten Stich aus, ausser bei bestimmten Spielarten wie Schieber."
  },
  {
    "question": "Welche Karte darf beim Ausspiel gewählt werden?",
    "answer": "Der Erstausspieler darf eine beliebige Karte einer Farbe wählen (ausser bei Pandur/Misère mit Trumpf, wo mit Trumpfkarte eröffnet werden muss)."
  },
  {
    "question": "Wer spielt beim Schieber zum ersten Stich aus?",
    "answer": "Beim Schieber oder Coiffeur-Schieber spielt der Spielübernehmer statt Vorhand aus."
  }
]
```

---
id: `bodentrumpf`
---

**Bereinigter Haupttext:**
```markdown
Definition:
[Bodentrumpf](./expressions_bodentrumpf) ist die unterste Karte nach dem [Abheben](./abheben) des Stapels, die die [Trumpffarbe](./general_trump_values) für die Runde bestimmt.

Regeln zum Auslegen:
• Die Karte wird vor oder während des Verteilens mit sichtbarem Bild auf den Tisch gelegt
• Die Trumpfkarte bleibt offen liegen, bis [Vorhand](./expressions_vorhand) zum ersten [Stich](./expressions_stich) ausspielt

Konsequenz bei Fehler:
• Wird nicht sichtbar gelegt, müssen Karten neu verteilt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Bodentrumpf?",
    "answer": "Der Bodentrumpf ist die unterste Karte nach dem Abheben des Stapels, die die Trumpffarbe für die Runde bestimmt."
  },
  {
    "question": "Wie lange bleibt die Bodentrumpf-Karte offen liegen?",
    "answer": "Die Trumpfkarte bleibt offen liegen, bis Vorhand zum ersten Stich ausspielt."
  },
  {
    "question": "Was passiert, wenn der Bodentrumpf nicht sichtbar gelegt wird?",
    "answer": "Wenn der Bodentrumpf nicht sichtbar gelegt wird, müssen die Karten neu verteilt werden."
  }
]
```

---
id: `untertrumpfen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
[Untertrumpfen](./expressions_untertrumpfen) bedeutet, einen niedrigeren [Trumpf](./general_trump_values) zu spielen als bereits ausgespielt wurde.

Regel bei vorwärts-Spielen:
• Bei Jassarten "vorwärts" (möglichst viele Punkte erzielen) darf nur untertrumpft werden, wenn man ausschliesslich noch Trumpfkarten besitzt
• Beispiele: Schieber, Kreuzjass, Handjass, Zuger, Bieter

Regel bei hindersi-Spielen:
• Bei Jassarten "[hindersi](./expressions_hindersi)" (Stiche vermeiden) ist Untertrumpfen auch erlaubt, wenn man ausgespielte Farbe nicht mehr hat
• Beispiele: Differenzler, Hindersi-Jass, Molotow, Mittlere, [Misère](./expressions_misere) mit Trumpf beim Pandur
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Untertrumpfen?",
    "answer": "Untertrumpfen bedeutet, einen niedrigeren Trumpf zu spielen als bereits ausgespielt wurde."
  },
  {
    "question": "Wann darf man untertrumpfen?",
    "answer": "Bei vorwärts-Spielen darf man nur untertrumpfen, wenn man ausschliesslich noch Trumpfkarten besitzt. Bei hindersi-Spielen ist Untertrumpfen auch erlaubt, wenn man die ausgespielte Farbe nicht mehr hat."
  },
  {
    "question": "Was sind vorwärts-Spiele?",
    "answer": "Vorwärts-Spiele sind Jassarten, bei denen man möglichst viele Punkte erzielen möchte, z.B. Schieber, Kreuzjass, Handjass, Zuger, Bieter."
  },
  {
    "question": "Bei welchen Spielen ist Untertrumpfen flexibler?",
    "answer": "Bei hindersi-Spielen (Differenzler, Hindersi-Jass, Molotow, Mittlere, Misère) ist Untertrumpfen auch erlaubt, wenn man die Farbe nicht mehr hat."
  }
]
```

---
id: `vorspielen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Vorspielen ist ein Regelverstoss, bei dem eine Karte zu früh abgelegt wird, bevor der links sitzende Spieler seine Karte gelegt hat. Die zu früh abgelegte Karte kann nicht mehr zurückgenommen werden.

Ausnahme bei Nichtfarben:
• Falls der Spieler nicht gefarbt hat, gelten die Regeln des [Nichtfarbens](./nichtfarben): Der [Stich](./expressions_stich) geht an den Gegner und die vorgespielte Karte wird mit der eigentlich zu spielenden Karte ausgetauscht

Konsequenzen:
• Sowohl die vorgespielte als auch die nachträglich ausgetauschte Karte verlieren ihren Stechwert, behalten aber den Zählwert
• Zum nächsten Stich spielt der rechts vom fehlbaren Spieler sitzende Jasser aus

Ausnahme letzter Stich:
• Beim [letzten Stich](./letzter_stich) hat Vorspielen keine Folgen und ist daher erlaubt
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Vorspielen beim Jassen?",
    "answer": "Vorspielen ist ein Regelverstoss, bei dem eine Karte zu früh abgelegt wird, bevor der links sitzende Spieler seine Karte gelegt hat."
  },
  {
    "question": "Kann man eine vorgespielte Karte zurücknehmen?",
    "answer": "Nein, die zu früh abgelegte Karte kann nicht mehr zurückgenommen werden."
  },
  {
    "question": "Was passiert beim Vorspielen?",
    "answer": "Beide Karten (die vorgespielte und die nachträglich ausgetauschte) verlieren ihren Stechwert, behalten aber den Zählwert. Zum nächsten Stich spielt der rechts vom fehlbaren Spieler sitzende Jasser aus."
  },
  {
    "question": "Ist Vorspielen beim letzten Stich erlaubt?",
    "answer": "Ja, beim letzten Stich hat Vorspielen keine Folgen und ist daher erlaubt."
  }
]
```

---
id: `general_playing_errors`
---

**Bereinigter Haupttext:**
```markdown
Übersicht:
Beim Jassen können verschiedene Spielfehler auftreten, die unterschiedliche Konsequenzen haben.

Häufige Spielfehler:
• Zwei Karten gleichzeitig gespielt: Beide verlieren [Stechwert](./nichtfarben), Gegner wählt eine Karte aus
• Voreiliges Ausspielen: Karte kann nicht zurückgenommen werden
• Falsche Farbe gespielt: Karte verliert Stechwert
• [Trumpf](./general_trump_values) nicht bedient: Alle Trümpfe (ausser [Puur](./expressions_trumpf_bauer)) verlieren Stechwert

Schwerwiegende Verstösse:
• Unerlaubtes Einsehen gekehrter [Stiche](./expressions_stich): Punkteverlust an Gegner
• Kartenverrat durch Bemerkungen: Spiel kann annulliert werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was passiert, wenn man zwei Karten gleichzeitig spielt?",
    "answer": "Beide Karten verlieren ihren Stechwert und der Gegner wählt aus, welche Karte gezählt wird."
  },
  {
    "question": "Kann man eine voreilig ausgespielte Karte zurücknehmen?",
    "answer": "Nein, eine voreilig ausgespielte Karte kann nicht zurückgenommen werden."
  },
  {
    "question": "Was passiert bei Kartenverrat?",
    "answer": "Bei Kartenverrat durch Bemerkungen kann das Spiel annulliert werden."
  }
]
```

---
id: `falscher_spieler`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Falscher Spieler spielt aus bedeutet, dass jemand zu einem [Stich](./expressions_stich) die erste Karte ausspielt, obwohl ein anderer Spieler an der Reihe gewesen wäre (beim ersten Stich oder wenn der Gewinner des vorherigen Stichs hätte ausspielen müssen).

Grundregeln bei Fehler:
• Die irrtümlich gespielte Karte muss wieder zurückgenommen werden
• Diese Karte verliert den Stechwert, aber nicht den Zählwert
• Der Spieler, der eigentlich an der Reihe gewesen wäre, spielt nun zum Stich aus
• Der Zählwert dieses Stichs gehört dem nicht fehlbaren Gegner

Nächster Stich:
• Zum nächsten Stich (falls ein solcher gespielt werden muss) spielt der vom fehlbaren Spieler rechts sitzende Jasser aus
• Ausnahme: Wenn ein Spieler vom nicht fehlbaren [Team](./expressions_team) bereits im Stich ist und der Spieler rechts von ihm falsch ausgespielt hat, dann bleibt der betreffende Spieler weiterhin im Stich

Ausnahme hindersi-Spiele:
• Beim Differenzler, [Hindersi](./expressions_hindersi), Molotow, Schellenjass und so weiter, also bei allen Jassarten, bei denen ein Stechverlust zum Vorteil des fehlbaren Spielers ist, gilt die Regel betreffend Stechwert verlieren nicht
• Die Gegner dürfen überdies entscheiden, ob der fehlbare Spieler beim nächsten Stich ausspielen muss oder ob der Spieler rechts vom fehlbaren Spieler an der Reihe ist
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet \"Falscher Spieler spielt aus\"?",
    "answer": "Das bedeutet, dass jemand die erste Karte eines Stichs ausspielt, obwohl ein anderer Spieler an der Reihe gewesen wäre."
  },
  {
    "question": "Was passiert, wenn der falsche Spieler ausspielt?",
    "answer": "Die irrtümlich gespielte Karte muss zurückgenommen werden und verliert den Stechwert (aber nicht den Zählwert). Der richtige Spieler spielt dann aus."
  },
  {
    "question": "Gilt die Regel bei hindersi-Spielen gleich?",
    "answer": "Nein, bei hindersi-Spielen (Differenzler, Hindersi, Molotow, etc.) gilt die Regel betreffend Stechwert verlieren nicht, da ein Stechverlust dort zum Vorteil des Spielers ist."
  }
]
```

---
id: `fehlende_karte`
---

**Bereinigter Haupttext:**
```markdown
Regel:
Wird während eines Spiels bemerkt, dass eine Karte fehlt, entscheiden die Gegner des betroffenen Spielers über das weitere Vorgehen.

Mögliche Vorgehensweisen:
• Möglichkeit 1: Das Spiel wird annulliert und neu gestartet
• Möglichkeit 2: Das Spiel wird mit der fehlenden Karte fortgesetzt
• Hinweis: Besonders bei punkteträchtigen Spielen sollte die Auswirkung der fehlenden Karte berücksichtigt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was passiert, wenn eine Karte fehlt?",
    "answer": "Wenn während eines Spiels eine Karte fehlt, entscheiden die Gegner des betroffenen Spielers über das weitere Vorgehen (Spiel annullieren oder fortsetzen)."
  },
  {
    "question": "Kann man mit fehlender Karte weiterspielen?",
    "answer": "Ja, das ist möglich. Die Gegner entscheiden, ob das Spiel fortgesetzt oder annulliert wird."
  }
]
```

---
id: `kartenspiel_nicht_komplett`
---

**Bereinigter Haupttext:**
```markdown
Regel:
Fehlt eine Karte im Spiel, entscheiden die Gegner des betroffenen Spielers über das Vorgehen.

Mögliche Vorgehensweisen:
• Spiel annullieren und neu beginnen
• Spiel mit fehlender Karte fortsetzen
• Wichtig: Bei punkteträchtigen Spielen sollte der Einfluss der fehlenden Karte berücksichtigt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was passiert, wenn das Kartenspiel nicht komplett ist?",
    "answer": "Wenn eine Karte im Spiel fehlt, entscheiden die Gegner des betroffenen Spielers, ob das Spiel annulliert oder mit fehlender Karte fortgesetzt wird."
  },
  {
    "question": "Wer entscheidet bei fehlenden Karten?",
    "answer": "Die Gegner des betroffenen Spielers entscheiden über das weitere Vorgehen."
  }
]
```

---
id: `karte_zu_frueh`
---

**Bereinigter Haupttext:**
```markdown
Regel:
Wird eine Karte zu früh gespielt (bevor der vorherige Spieler am Zug ist), kann sie nicht zurückgenommen werden. Die Karte bleibt liegen und wird im [Stich](./expressions_stich) mitgezählt.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Kann man eine zu früh gespielte Karte zurücknehmen?",
    "answer": "Nein, eine zu früh gespielte Karte kann nicht zurückgenommen werden und bleibt liegen."
  },
  {
    "question": "Was passiert mit einer zu früh gespielten Karte?",
    "answer": "Die Karte bleibt liegen und wird im Stich mitgezählt."
  }
]
```

---
id: `karte_faellt_runter`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Karte fällt runter ist ein versehentlicher Spielfehler, bei dem einem Spieler während eines laufenden Umgangs eine Karte aus der Hand fällt und für die Mitspieler sichtbar wird.

Entscheidung durch Gegner:
Die Gegner entscheiden, wie in dieser Situation verfahren wird:

• Option 1 - Weiterspielen: Die Karte wird ignoriert und das Spiel wird normal fortgesetzt
• Option 2 - Spiel annullieren: Das Spiel wird für ungültig erklärt und neu begonnen
• Option 3 - [Stich](./expressions_stich) geht an Gegner: Die betroffene Karte verliert ihren Stechwert und der Spieler rechts vom fehlerhaften Spieler spielt als nächstes aus, analog zum Verfahren bei [Nichtfarben](./nichtfarben)

Konsequenz:
• In jedem Fall verliert die heruntergefallene Karte ihren Stechwert
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was passiert, wenn eine Karte runterfällt?",
    "answer": "Die Gegner entscheiden, ob das Spiel normal fortgesetzt wird, annulliert wird oder der Stich an sie geht. In jedem Fall verliert die Karte ihren Stechwert."
  },
  {
    "question": "Wer entscheidet bei heruntergefallenen Karten?",
    "answer": "Die Gegner des betroffenen Spielers entscheiden über das weitere Vorgehen."
  },
  {
    "question": "Verliert eine heruntergefallene Karte ihren Wert?",
    "answer": "Ja, in jedem Fall verliert die heruntergefallene Karte ihren Stechwert."
  }
]
```

---
id: `nichtfarben`
---

**Bereinigter Haupttext:**
```markdown
Grundregel:
Wer Karten der ausgespielten Farbe besitzt, muss diese bekennen (farben/angeben). Mit [Trumpf](./general_trump_values) darf gestochen werden.

Sofort festgestellter Regelverstoss (Stich noch offen):
• Der laufende [Stich](./expressions_stich) geht an die Gegenseite
• Die falsch gespielte Karte wird gegen die korrekte Karte ausgetauscht
• Beide betroffenen Karten verlieren den Stechwert; der Zählwert bleibt bestehen

Spezialfall mehrere richtige Karten:
• Die stechhöchste Karte dieser Farbe verliert den Stechwert (Ausnahme: Trumpf-[Puur](./expressions_trumpf_bauer), falls Trumpf ausgespielt wurde)
• Die stechhöchste Karte ist dem laufenden Stich beizugeben

Nächster Stich:
• Den nächsten Stich (falls noch einer folgt) spielt der rechts vom fehlbaren Spieler sitzende Jasser aus
• Ausnahme: Wer vom nicht fehlbaren [Team](./expressions_team) bereits im Stich ist, bleibt weiterhin im Stich

Späte Entdeckung (nach dem Kehren):
• Bereits gekehrte Stiche bleiben gekehrt; ein Aufdecken erfolgt nicht
• Das Spiel wird regulär zu Ende gespielt; die Kartenkontrolle erfolgt erst danach
• Wird ein Nichtfarben nachträglich nachgewiesen, zählen der betroffene Stich sowie sämtliche folgenden Stiche der korrekt spielenden Partei bzw. dem korrekt spielenden Spieler – auch wenn dadurch ein [Matsch](./matsch) oder [Kontermatsch](./kontermatsch) entsteht

Ausnahmefälle:
• Bei Spielarten, in denen der Stechwertverlust den fehlbaren Spieler begünstigen würde (z.B. [Misère](./expressions_misere)), gelten die vorstehenden Sanktionsregeln zum Nichtfarben nicht

Hinweis zur Praxis:
• Die Grenze zu Nichtfarben und Spielfehler «[Karte fällt runter](./karte_faellt_runter)» ist gering
• Oft zeigen sich die Gegner des fehlbaren Spielers im Sinne des Friedens kulant, wenn er seine «runtergefallene» Karte unmittelbar wieder zurücknimmt
• In diesem Fall verliert die Karte in jedem Fall ihren Stechwert – es wird aber davon abgesehen, dass der Stich an die Gegner geht
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Nichtfarben?",
    "answer": "Nichtfarben bedeutet, dass ein Spieler die ausgespielte Farbe nicht bedient, obwohl er sie noch besitzt."
  },
  {
    "question": "Was passiert bei Nichtfarben?",
    "answer": "Der laufende Stich geht an die Gegenseite, die falsch gespielte Karte wird ausgetauscht und beide betroffenen Karten verlieren den Stechwert (Zählwert bleibt)."
  },
  {
    "question": "Kann Nichtfarben auch später entdeckt werden?",
    "answer": "Ja, wird Nichtfarben nach dem Kehren nachgewiesen, zählen der betroffene Stich und alle folgenden Stiche der korrekt spielenden Partei."
  },
  {
    "question": "Gilt die Nichtfarben-Regel auch bei Misère?",
    "answer": "Nein, bei Spielarten wie Misère, bei denen der Stechwertverlust den fehlbaren Spieler begünstigen würde, gelten die Sanktionsregeln nicht."
  }
]
```

---
id: `regeln_verschlagen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Verschlagen ist das absichtliche [Nichtfarben](./nichtfarben), um die Regel auszunutzen. Eine falsch gespielte Karte verliert ihren Stechwert.

Situation:
• Kommt vor, wenn ein Spieler einen blutten [Bock](./expressions_bock) hat und sein Partner den Rest
• Der Spieler verschlägt den Bock absichtlich, um dem Partner den Weg zu ebnen
• Die Nichtfarben-Regel wird dabei bewusst missbraucht
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Verschlagen beim Jassen?",
    "answer": "Verschlagen ist das absichtliche Nichtfarben, um die Regel auszunutzen. Eine falsch gespielte Karte verliert ihren Stechwert."
  },
  {
    "question": "Wann wird verschlagen?",
    "answer": "Verschlagen kommt vor, wenn ein Spieler einen blutten Bock hat und sein Partner den Rest, und der Spieler den Bock absichtlich verschlägt, um dem Partner den Weg zu ebnen."
  },
  {
    "question": "Ist Verschlagen erlaubt?",
    "answer": "Verschlagen ist ein bewusster Missbrauch der Nichtfarben-Regel. Ob es erlaubt ist, hängt von der Tischregel ab."
  }
]
```

---
id: `zwei_karten_spielen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Regelverstoss beim gleichzeitigen Spielen von zwei Karten mit sichtbaren Kartenbildern.

Konsequenzen:
• Beide Karten verlieren ihren Stechwert (Zählwert bleibt erhalten)
• Gegner bestimmen, welche der beiden Karten dem betreffenden [Stich](./expressions_stich) zugeordnet wird
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was passiert, wenn man zwei Karten gleichzeitig spielt?",
    "answer": "Beide Karten verlieren ihren Stechwert (Zählwert bleibt) und die Gegner bestimmen, welche Karte dem Stich zugeordnet wird."
  },
  {
    "question": "Verlieren zwei gleichzeitig gespielte Karten ihren Wert?",
    "answer": "Ja, beide Karten verlieren ihren Stechwert, behalten aber den Zählwert."
  },
  {
    "question": "Wer entscheidet, welche Karte gilt?",
    "answer": "Die Gegner bestimmen, welche der beiden Karten dem Stich zugeordnet wird."
  }
]
```

---
id: `bemerkungen`
---

**Bereinigter Haupttext:**
```markdown
Hinweis:
Siehe Artikel «[Bemerkungen und Schnorren](./bemerkungen_schnorren)» (ID: bemerkungen_schnorren) für vollständige Informationen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind verbotene Bemerkungen beim Jassen?",
    "answer": "Siehe den Hauptartikel \"Bemerkungen und Schnorren\" für vollständige Informationen zu verbotenen Bemerkungen während dem Spiel."
  }
]
```

---
id: `bock_erwaehnen`
---

**Bereinigter Haupttext:**
```markdown
Hinweis:
Siehe Artikel «[Bemerkungen und Schnorren](./bemerkungen_schnorren)» (ID: bemerkungen_schnorren) für vollständige Informationen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Darf man erwähnen, dass man einen Bock hat?",
    "answer": "Siehe den Hauptartikel \"Bemerkungen und Schnorren\" für vollständige Informationen zu verbotenen Bemerkungen wie dem Erwähnen eines Bocks."
  }
]
```

---
id: `bemerkungen_schnorren`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Schnorren (Bemerkungen während dem Spiel) ist grundsätzlich verboten.

Verbotene Bemerkungen:
• Kommentare über eine unschlagbare Karte (z.B. «[Bock](./expressions_bock)»)
• Bemerkungen über Karten irgendeiner Farbe
• Kommentare über Punkte, die ein Gegner während dem Spielverlauf erzielt
• Andeutungen, die Aufschluss über die Taktik vermitteln
• Antworten auf Fragen während dem Spiel (z.B. «Wie viele Trümpfe sind gelaufen?», «Wem gehört dieser Stich?», «Wer hat diese Karte gegeben?»)
• Nonverbale Zeichen wie Gestik oder Mimik

Konsequenzen bei Spielverrat:
• Die Gegner entscheiden, ob das Spiel annulliert wird oder der Fehler ohne Einfluss bleibt

Ausnahmen:
• Beim Aucho gelten eigene Regeln für Bemerkungen
• Erlaubt: Nur neutrale Aussagen ohne Informationsgehalt zu Karten oder Punkten
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Schnorren beim Jassen?",
    "answer": "Schnorren bedeutet Bemerkungen während dem Spiel und ist grundsätzlich verboten."
  },
  {
    "question": "Darf man während dem Spiel Fragen beantworten?",
    "answer": "Nein, Antworten auf Fragen während dem Spiel sind verboten (z.B. «Wie viele Trümpfe sind gelaufen?»)."
  },
  {
    "question": "Was passiert bei Spielverrat durch Bemerkungen?",
    "answer": "Die Gegner entscheiden, ob das Spiel annulliert wird oder der Fehler ohne Einfluss bleibt."
  },
  {
    "question": "Sind nonverbale Zeichen erlaubt?",
    "answer": "Nein, auch nonverbale Zeichen wie Gestik oder Mimik sind nicht erlaubt."
  },
  {
    "question": "Gibt es Ausnahmen von der Schnorren-Regel?",
    "answer": "Ja, beim Aucho gelten eigene Regeln für Bemerkungen. Generell sind nur neutrale Aussagen ohne Informationsgehalt erlaubt."
  }
]
```

---
id: `liegengelassene_stiche`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Liegengelassene [Stiche](./expressions_stich) sind Stiche, die nicht sofort nach dem Gewinnen an sich genommen werden.

Regeln:
• Stiche müssen umgehend gekehrt werden
• Liegengelassene Stiche können zu Verwirrung führen
• Bei Turnieren kann dies sanktioniert werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind liegengelassene Stiche?",
    "answer": "Liegengelassene Stiche sind Stiche, die nicht sofort nach dem Gewinnen an sich genommen werden."
  },
  {
    "question": "Müssen Stiche sofort gekehrt werden?",
    "answer": "Ja, Stiche müssen umgehend gekehrt werden. Liegengelassene Stiche können zu Verwirrung führen."
  },
  {
    "question": "Kann man für liegengelassene Stiche sanktioniert werden?",
    "answer": "Ja, bei Turnieren kann dies sanktioniert werden."
  }
]
```

---
id: `fragen_waehrend_spiel`
---

**Bereinigter Haupttext:**
```markdown
Grundregel:
Während einer laufenden Runde dürfen Spieler Fragen zu bereits gespielten [Stichen](./expressions_stich) stellen. Es ist erlaubt, vergangene Stiche anzuschauen, um sich zu orientieren.

Verbotene Fragen:
• Fragen zu Karten, die noch nicht gespielt wurden
• Fragen, die Rückschlüsse auf die eigenen oder gegnerischen [Handkarten](./expressions_handkarten) ermöglichen
• Bemerkungen, die das Spiel beeinflussen könnten

Erlaubte Beispiele:
• «Welche Karten wurden im letzten Stich gespielt?»
• «Wer hat den zweiten Stich gewonnen?»
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Darf man während dem Spiel Fragen stellen?",
    "answer": "Ja, Fragen zu bereits gespielten Stichen sind erlaubt. Es ist auch erlaubt, vergangene Stiche anzuschauen."
  },
  {
    "question": "Welche Fragen sind verboten?",
    "answer": "Verboten sind Fragen zu noch nicht gespielten Karten und Fragen, die Rückschlüsse auf Handkarten ermöglichen."
  },
  {
    "question": "Darf man fragen, welche Karten im letzten Stich gespielt wurden?",
    "answer": "Ja, das ist eine erlaubte Frage, da sie sich auf bereits gespielte Stiche bezieht."
  }
]
```

---
id: `klopfen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
[Klopfen](./expressions_basic_terms) ist ein Signal, das in manchen Jassvarianten verwendet wird, um auf bestimmte Kartensituationen hinzuweisen. Meist signalisiert Klopfen, dass man die höchste Karte hat.

Regelungen:
• Manche [Tischregeln](./regeln_tischregel) verbieten Klopfen komplett
• Andere erlauben es nur in bestimmten Situationen
• Ob und wann Klopfen erlaubt ist, muss als Tischregel vereinbart werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Klopfen beim Jassen?",
    "answer": "Klopfen ist ein Signal, das meist signalisiert, dass man die höchste Karte hat."
  },
  {
    "question": "Ist Klopfen erlaubt?",
    "answer": "Das hängt von der Tischregel ab. Manche Tischregeln verbieten Klopfen komplett, andere erlauben es in bestimmten Situationen."
  },
  {
    "question": "Muss Klopfen vor dem Spiel vereinbart werden?",
    "answer": "Ja, ob und wann Klopfen erlaubt ist, muss als Tischregel vor dem Spiel vereinbart werden."
  }
]
```

---
id: `nachschauen_gekehrter_stiche`
---

**Bereinigter Haupttext:**
```markdown
Grundregel:
Bereits gekehrte [Stiche](./expressions_stich) dürfen während des laufenden Spiels nicht mehr angeschaut werden.

Ausnahmen:
• Der aktuelle (noch nicht gekehrte) Stich darf eingesehen werden
• Nach Spielende dürfen alle Stiche kontrolliert werden

Konsequenzen bei Verstoss:
• Punkteverlust für das betroffene [Team](./expressions_team)
• Mögliche Annullierung des Spiels
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Darf man gekehrte Stiche während dem Spiel anschauen?",
    "answer": "Nein, bereits gekehrte Stiche dürfen während des laufenden Spiels nicht mehr angeschaut werden."
  },
  {
    "question": "Darf man den aktuellen Stich anschauen?",
    "answer": "Ja, der aktuelle (noch nicht gekehrte) Stich darf eingesehen werden."
  },
  {
    "question": "Was passiert, wenn man gekehrte Stiche anschaut?",
    "answer": "Das kann zu Punkteverlust für das betroffene Team oder zur Annullierung des Spiels führen."
  },
  {
    "question": "Darf man nach Spielende die Stiche kontrollieren?",
    "answer": "Ja, nach Spielende dürfen alle Stiche kontrolliert werden."
  }
]
```

---
id: `platztausch`
---

**Bereinigter Haupttext:**
```markdown
Regel:
Während einer laufenden [Partie](./expressions_partie) ist Platztausch nicht erlaubt.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Darf man während einer Partie die Plätze tauschen?",
    "answer": "Nein, während einer laufenden Partie ist Platztausch nicht erlaubt."
  },
  {
    "question": "Wann darf man die Plätze tauschen?",
    "answer": "Plätze können nur zwischen Partien getauscht werden, nicht während einer laufenden Partie."
  }
]
```

---
id: `trumpf_bauer`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Die Trumpf-Bauer-Angabe bezieht sich auf das Melden des [Trumpf-Puur](./expressions_trumpf_bauer) (oder Trumpf-Under/Buur/Bueb) während des Spiels.

Regeln:
• In manchen Varianten darf oder muss der Besitz des Trumpf-Puur angesagt werden
• Dies kann strategische Vorteile oder Nachteile haben
• Die genaue Handhabung ist eine [Tischregel](./regeln_tischregel)
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist die Trumpf-Bauer-Angabe?",
    "answer": "Die Trumpf-Bauer-Angabe bezieht sich auf das Melden des Trumpf-Puur (Under der Trumpffarbe) während des Spiels."
  },
  {
    "question": "Muss man den Trumpf-Puur angeben?",
    "answer": "Das hängt von der Variante ab. In manchen Varianten darf oder muss der Besitz des Trumpf-Puur angesagt werden."
  },
  {
    "question": "Ist es vorteilhaft, den Trumpf-Puur anzugeben?",
    "answer": "Das kann strategische Vorteile oder Nachteile haben. Die genaue Handhabung ist eine Tischregel."
  }
]
```

---
id: `regeln_tischregel`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Wenn sich Jasser an einen Tisch setzen, können sie für ihre Runde spezielle Vereinbarungen treffen. Solche individuellen Abmachungen werden als Tischregeln bezeichnet.

Vorrang:
• Tischregeln stehen hierarchisch über allen anderen Regelwerken
• Sie haben stets absolute Priorität
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind Tischregeln beim Jassen?",
    "answer": "Tischregeln sind spezielle Vereinbarungen, die Jasser für ihre Runde treffen können. Sie sind individuelle Abmachungen für den jeweiligen Tisch."
  },
  {
    "question": "Haben Tischregeln Vorrang vor offiziellen Regeln?",
    "answer": "Ja, Tischregeln stehen hierarchisch über allen anderen Regelwerken und haben stets absolute Priorität."
  },
  {
    "question": "Wann werden Tischregeln vereinbart?",
    "answer": "Tischregeln werden vereinbart, wenn sich Jasser an einen Tisch setzen, bevor das Spiel beginnt."
  }
]
```

---
id: `regeln_offizielles_regelwerk`
---

**Bereinigter Haupttext:**
```markdown
Übersicht:
Beim Jassen existieren verschiedene offizielle Regelwerke, die je nach Kontext und Region unterschiedlich angewendet werden.

Grundprinzipien:
• [Tischregeln](./regeln_tischregel) haben Vorrang vor offiziellen Regelwerken
• Regionale Varianten können abweichen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Gibt es ein offizielles Jass-Regelwerk?",
    "answer": "Ja, es existieren verschiedene offizielle Regelwerke für das Jassen, die je nach Kontext und Region unterschiedlich angewendet werden."
  },
  {
    "question": "Haben offizielle Regelwerke Vorrang vor Tischregeln?",
    "answer": "Nein, Tischregeln haben Vorrang vor offiziellen Regelwerken."
  },
  {
    "question": "Sind die Regelwerke überall gleich?",
    "answer": "Nein, regionale Varianten können von den offiziellen Regelwerken abweichen."
  }
]
```

---
id: `variants_learning_tschau_sepp`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Tschau Sepp ist die Schweizer Variante des bekannten [Kartenspiels](./general_card_basics) Mau-Mau (auch bekannt als Mau Mau).

Spieleranzahl:
• Eignet sich für 2 bis 8 Spieler
• Ab 5 Spielern wird mit zwei Kartenspielen gespielt

Grundprinzip:
• Bei diesem Ablegespiel müssen die Spieler ihre [Karten](./general_card_basics) so ablegen, dass sie entweder in der Farbe oder im Wert mit der zuletzt offenliegenden Karte übereinstimmen
• Auf diese Weise lernen Anfänger die Kartenfarben und [Kartenwerte](./general_card_values) spielerisch kennen
• Die Kartenwerte beeinflussen zwar den Spielverlauf, für die Ermittlung des Gewinners sind sie jedoch nicht relevant

Spielablauf:
• Zum ersten [Spiel](./general_game_basics) mischt und gibt der Schreiber die Karten
• In den folgenden Runden wechselt das Geben reihum im Gegenuhrzeigersinn
• Jeder Spieler erhält fünf Karten, die einzeln ausgeteilt werden
• Die übrigen Karten bilden den verdeckten [Stock](./expressions_stapel)

Ansage-Regel:
• Bei der vorletzten Karte muss der Spieler «Tschau» rufen, bei der letzten «Sepp»
• Vergisst er diese Meldung, muss er vier Strafkarten aufnehmen

Ziel:
Gewonnen hat, wer als Erster alle Karten abgelegt und «Sepp» angesagt hat.

Regelung:
Da es häufig regionale Unterschiede bei den Regeln und Funktionskarten gibt, sollte man vor Spielbeginn gemeinsam festlegen, welche Regeln gelten sollen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Spieler braucht man für Tschau Sepp?",
    "answer": "Tschau Sepp eignet sich für 2 bis 8 Spieler. Ab 5 Spielern wird mit zwei Kartenspielen gespielt."
  },
  {
    "question": "Was passiert, wenn ich vergesse «Tschau» oder «Sepp» zu sagen?",
    "answer": "Wenn du die Ansage vergisst, musst du vier Strafkarten aufnehmen."
  },
  {
    "question": "Wie gewinnt man bei Tschau Sepp?",
    "answer": "Gewonnen hat, wer als Erster alle Karten abgelegt und «Sepp» angesagt hat."
  },
  {
    "question": "Für wen ist Tschau Sepp geeignet?",
    "answer": "Tschau Sepp ist ein ideales Lernspiel für Anfänger, um die Kartenfarben und Kartenwerte spielerisch kennenzulernen."
  }
]
```

---
id: `variants_learning_bodentrumpf_vier`
---

**Bereinigter Haupttext:**
```markdown
Zielgruppe:
Diese Variante eignet sich für vier Spieler und ist besonders gut für Anfänger geeignet, die bereits die [Kartenfarben](./expressions_kartenfarben) und [Kartenwerte](./general_card_values) kennen.

Grundprinzip:
• Bei dieser Jassart spielt jeder Spieler für sich allein, es gibt keine [Teams](./expressions_team) und keine komplexen Konventionen
• Jeder Teilnehmer versucht, möglichst viele Karten- und [Weispunkte](./expressions_weispunkte) zu sammeln, basierend auf seinen eigenen Fähigkeiten und der Einschätzung seiner [Handkarten](./expressions_handkarten)

Bodentrumpf-Regeln:
• Der [Bodentrumpf](./bodentrumpf) wird bestimmt durch die unterste Karte des [Stapels](./expressions_stapel) nach dem [Abheben](./abheben)
• Diese Karte kann nicht geraubt werden und muss vor oder während des Austeilens sichtbar auf den Tisch gelegt werden
• Sie bleibt [Trumpf](./general_trump_values), auch wenn das Spiel verloren wird
• Alle Trumpfkarten stechen Karten der anderen drei Farben

Spielablauf:
• Während des Spiels können [Weisen](./weis_rules_general) gemeldet werden
• Nach Beendigung des Spiels zählen die Spieler die Punkte ihrer erzielten [Stiche](./expressions_stich)
• Der Spieler, der den [letzten Stich](./letzter_stich) macht, erhält zusätzlich fünf Punkte

Punktesystem:
• Jedes vollständige Spiel umfasst insgesamt 157 Punkte: 152 [Kartenpunkte](./general_card_values) plus 5 Punkte für den letzten Stich
• Nach zwölf Spielen ist der Gewinner ermittelt und die [Partie](./expressions_partie) beendet
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Spieler braucht man für Bodentrumpf?",
    "answer": "Bodentrumpf für vier Spieler eignet sich für genau vier Spieler und ist besonders gut für Anfänger geeignet."
  },
  {
    "question": "Was ist der Bodentrumpf und wie wird er bestimmt?",
    "answer": "Der Bodentrumpf wird durch die unterste Karte des Stapels nach dem Abheben bestimmt und kann nicht geraubt werden."
  },
  {
    "question": "Wie viele Punkte gibt es insgesamt pro Spiel?",
    "answer": "Jedes vollständige Spiel umfasst insgesamt 157 Punkte: 152 Kartenpunkte plus 5 Punkte für den letzten Stich."
  },
  {
    "question": "Können beim Bodentrumpf Weisen gemeldet werden?",
    "answer": "Ja, während des Spiels können Weisen gemeldet werden und zählen zu den Punkten."
  }
]
```

---
id: `variants_family_coiffeur_schieber`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Coiffeur-Schieber (auch «quoi faire» genannt, französisch für «was machen») ist ein [Spiel](./general_game_basics) für vier Spieler, das ursprünglich aus Frankreich stammt.

Grundprinzip:
• Wie beim klassischen [Schieber](./schieber_taktiken_basics) sitzen sich je zwei Spieler gegenüber und bilden gemeinsam ein [Team](./expressions_team)
• Anders als bei anderen Jassarten wird hier keine feste Punktzahl als Ziel vereinbart
• Stattdessen muss jedes Team jede von acht verschiedenen Varianten genau einmal spielen
• Eine komplette [Partie](./expressions_partie) umfasst somit 16 Spiele

Die acht Varianten:
• Variante 1-4: Vier [Trumpffarben](./general_trump_values), die jeweils zwei-, drei- oder vierfach bewertet werden
• Variante 5: [Obenabe](./expressions_obenabe), das fünffach zählt
• Variante 6: [Undenufe](./expressions_undenufe), das sechsfach zählt
• Variante 7-8: Zwei [Joker](./expressions_joker)-Varianten, die sieben- und achtfach bewertet werden, wobei die Trumpffarbe frei wählbar ist

Joker-Regeln:
• Bei den Joker-Varianten können [Stöck](./expressions_stoecke)- und [Weispunkte](./expressions_weispunkte) nicht gemeldet werden
• Der Spieler rechts vom Gebenden kann entweder eine Variante als Trumpf wählen oder passen
• Werden alle Varianten weitergegeben, muss [Vorhand](./expressions_vorhand) zwangsweise eine noch nicht gespielte Variante wählen

Spielstrategie:
• Die Reihenfolge, in der die Varianten gespielt werden, ist frei wählbar
• Ein Spieler, der aufgrund seiner [Handkarten](./expressions_handkarten) gute Chancen sieht, kann die Joker-Variante nutzen, um zwischen Trumpf, Obenabe oder Undenufe zu wählen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Spiele umfasst eine komplette Coiffeur-Schieber-Partie?",
    "answer": "Eine komplette Partie umfasst 16 Spiele, da jedes Team jede von acht verschiedenen Varianten genau einmal spielen muss."
  },
  {
    "question": "Was sind die Joker-Varianten beim Coiffeur-Schieber?",
    "answer": "Die Joker-Varianten sind Variante 7 und 8, die sieben- und achtfach bewertet werden, wobei die Trumpffarbe frei wählbar ist. Bei diesen Varianten können Stöck- und Weispunkte nicht gemeldet werden."
  },
  {
    "question": "Wie viele Punkte zählt Obenabe beim Coiffeur-Schieber?",
    "answer": "Obenabe zählt beim Coiffeur-Schieber fünffach."
  },
  {
    "question": "Kann ich beim Coiffeur-Schieber die Reihenfolge der Varianten frei wählen?",
    "answer": "Ja, die Reihenfolge, in der die Varianten gespielt werden, ist frei wählbar, was strategische Flexibilität ermöglicht."
  }
]
```

---
id: `variants_family_hose_abe`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Hose abe, Schnauz oder Schwimmen ist ein geselliges [Kartenspiel](./general_card_basics) für 2 bis 10 Spieler, das sich besonders für grössere Runden eignet.

Grundprinzip:
Jeder Teilnehmer erhält drei [Karten](./general_card_basics) und versucht, möglichst schnell eine möglichst wertvolle Kombination zu bilden. Eine gültige Kombination entsteht, wenn die drei Karten entweder dieselbe Farbe haben oder denselben Wert aufweisen, beispielsweise drei Asse, drei Könige oder drei Sechser.

Die Kartenkombinationen:
• «Hose abe»: Ein Ass und zwei Figuren derselben Farbe bringen 31 Punkte ein (höchste Wertung)
• «[Trio](./expressions_trio)»: Drei Karten gleichen Wertes zählen stets 30½ Punkte (zweithöchste Wertung)
• Farbkombinationen: Drei Karten derselben Farbe werden nach ihren [Kartenwerten](./general_card_values) addiert

Spielablauf:
• Die Spieler können ihre Karten tauschen oder durch «[klopfen](./klopfen)» signalisieren, dass sie zufrieden sind
• Beim Tauschen ist es möglich, entweder nur eine Karte oder alle drei Karten zu wechseln
• Besitzt ein Spieler einen «Hose abe», muss er sofort «klopfen» und das Spiel beenden

Einsätze und Ausscheiden:
• Jeder Spieler startet mit drei Einsätzen
• Nach jedem Spiel verliert der Teilnehmer mit den wenigsten Punkten einen Einsatz
• Wer alle drei Einsätze verloren hat, darf noch eine letzte Runde «mitschwimmen», bevor er ausscheidet
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte ist ein «Hose abe» wert?",
    "answer": "Ein «Hose abe» (ein Ass und zwei Figuren derselben Farbe) bringt 31 Punkte ein und ist die höchste Wertung."
  },
  {
    "question": "Was ist ein «Trio» und wie viele Punkte zählt es?",
    "answer": "Ein «Trio» besteht aus drei Karten gleichen Wertes und zählt stets 30½ Punkte, was die zweithöchste Wertung ist."
  },
  {
    "question": "Wie viele Einsätze hat jeder Spieler beim Start?",
    "answer": "Jeder Spieler startet mit drei Einsätzen. Nach jedem Spiel verliert der Spieler mit den wenigsten Punkten einen Einsatz."
  },
  {
    "question": "Was passiert, wenn ich einen «Hose abe» habe?",
    "answer": "Wenn du einen «Hose abe» besitzt, musst du sofort «klopfen» und das Spiel beenden."
  }
]
```

---
id: `variants_strategic_aucho_vier`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Diese Königsspiel-Variante für vier Spieler zeichnet sich durch das besondere «[Lukas](./expressions_lukas)»-Prinzip und das «[Erben](./expressions_erben)» von Punkten aus.

Spiel geben:
• Erstes Spiel: Jeder zieht eine Karte, wer die niedrigste hat, gibt das erste Spiel
• Der Spielgeber teilt seinen drei Mitspielern jeweils neun Karten aus, dies geschieht in drei Runden zu je drei Karten
• Die übrigen neun Karten werden als «Lukas» verdeckt als [Stock](./expressions_stapel) auf den Tisch gelegt; die unterste Karte wird aufgedeckt
• Der Spielgeber selbst erhält keine Karten und ist in diesem Spiel nicht aktiv beteiligt
• Wird das Spiel verloren, erhält der Spielgeber einen «[Härdöpfel](./expressions_haerdoepfel)» ([Nuller](./expressions_nuller)) eingetragen, und das Geben wechselt reihum zum nächsten Spieler

Weisen-Regeln:
• Vier [Under](./expressions_trumpf_bauer) ([Buben](./expressions_trumpf_bauer)) müssen vor Beginn des Spiels angemeldet werden, damit sie als [Weis](./weis_rules_general) zählen
• Wer diese Meldung versäumt und zu spät weist, erhält als Strafe einen «Härdöpfel»

Spielablauf - Trumpf machen:
• [Vorhand](./expressions_vorhand) kann das Recht auf die Trumpfwahl übernehmen, indem er eine beliebige Farbe als [Trumpf](./general_trump_values) bestimmt
• In diesem Fall muss er am Ende des Spiels mindestens einen Punkt mehr erreichen als seine beiden Gegenspieler zusammen, wobei [Weispunkte](./expressions_weispunkte) mitzählen
• Gibt Vorhand das Trumpfmachen ab, geht dieses Recht der Reihe nach auf den zweiten und dann den dritten Spieler über

Spielablauf - «[Kehr](./expressions_kehr)»:
• Alternativ kann jeder Spieler statt Trumpf zu machen einen «Kehr» verlangen
• Der Spielgeber muss dann die Karten des «Lukas»-Stocks einzeln von oben nach unten aufdecken
• Jede dieser Karten – ausser der letzten – kann vom Sechser derselben Farbe [geraubt](./expressions_rauben) werden
• Sobald eine Karte in einer Farbe erscheint, die einem Spieler zusagt, kann dieser «Halt» rufen und das Spiel mit dieser Farbe als Trumpf übernehmen
• Kommt es bis zur vorletzten Karte des «Lukas» zu keiner Übernahme, erhält derjenige, der den «Kehr» verlangt hat, zur Strafe einen «Härdöpfel» eingetragen, während seine Gegner je einen [Strich](./schreiben) bekommen

Spielgeber-Spiel:
• Falls weder Trumpf gemacht noch ein «Kehr» verlangt wird, hat der Spielgeber das Vorrecht, mit dem «Lukas» das Spiel zu übernehmen
• Er spielt dann mit diesen neun Karten gegen seine drei Mitspieler und muss ebenfalls mindestens einen Punkt mehr als sie zusammen erreichen

Schreiben:
• Wer ein Spiel erfolgreich gewinnt, erhält zwei Striche; der Spielgeber «erbt» in diesem Fall ebenfalls zwei Striche
• Verliert ein Spieler, wird ihm ein «Härdöpfel» angeschrieben
• Gelingt es einem Spieler, mit dem «Lukas» zu gewinnen, erhält er vier Striche gutgeschrieben
• Verliert er jedoch den «Lukas», bekommt er zwei «Härdöpfel» eingetragen, und seine drei Gegner erhalten je einen Strich

Ende der Partie:
Gespielt wird bis ein Spieler sieben Striche erreicht hat. Dieser scheidet dann als Sieger aus der [Partie](./expressions_partie) aus.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der «Lukas» beim Aucho?",
    "answer": "Der «Lukas» sind die neun übrigen Karten, die verdeckt als Stock auf den Tisch gelegt werden. Der Spielgeber erhält diese Karten nicht, kann aber bei Bedarf mit ihnen spielen."
  },
  {
    "question": "Was bedeutet «Erben» beim Aucho?",
    "answer": "«Erben» bedeutet, dass der Spielgeber automatisch die gleichen Striche erhält wie das gewinnende Team, auch wenn er selbst nicht aktiv spielt."
  },
  {
    "question": "Wie viele Striche erhält man, wenn man mit dem «Lukas» gewinnt?",
    "answer": "Wer mit dem «Lukas» gewinnt, erhält vier Striche gutgeschrieben. Verliert er jedoch, bekommt er zwei «Härdöpfel» eingetragen."
  },
  {
    "question": "Was ist ein «Kehr» beim Aucho?",
    "answer": "Ein «Kehr» kann verlangt werden, um die Karten des «Lukas»-Stocks einzeln aufzudecken. Erscheint eine passende Farbe, kann das Spiel mit dieser Farbe als Trumpf übernommen werden."
  },
  {
    "question": "Wie viele Striche braucht man zum Sieg beim Aucho?",
    "answer": "Gespielt wird bis ein Spieler sieben Striche erreicht hat. Dieser scheidet dann als Sieger aus der Partie aus."
  }
]
```

---
id: `variants_strategic_aucho_drei`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Bei der Dreier-Variante des Aucho nimmt der Spielgeber aktiv am Spiel teil. Das Prinzip des «[Erben](./expressions_erben)» entfällt ebenso wie der «[Lukas](./expressions_lukas)».

Kartenverteilung:
• Jeder der drei Spieler erhält neun Karten, verteilt in drei Runden zu je drei Karten
• Die verbleibenden neun Karten bilden einen [Stock](./expressions_stapel), der ausschliesslich für den «[Kehr](./expressions_kehr)» verwendet werden kann

Spielablauf:
• Genau wie beim Aucho für vier Spieler hat jeder Teilnehmer die Möglichkeit, [Trumpf](./general_trump_values) zu machen oder einen «Kehr» zu verlangen
• Der wesentliche Unterschied zur Vierer-Variante besteht darin, dass der Spielgeber vollwertig mitspielt und daher keine Punkte erben kann

Schreiben:
Die Punktregeln entsprechen grundsätzlich denen des Vierer-Aucho, mit dem Unterschied, dass das «Erben» für den Spielgeber entfällt.

Übrige Regeln:
In allen anderen Belangen entsprechen die Regeln denen des Aucho für vier Spieler.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Hauptunterschied zwischen Aucho für drei und vier Spieler?",
    "answer": "Bei der Dreier-Variante nimmt der Spielgeber aktiv am Spiel teil, wodurch das Prinzip des «Erbens» entfällt."
  },
  {
    "question": "Kann der Spielgeber beim Aucho zu dritt punkte erben?",
    "answer": "Nein, beim Aucho für drei Spieler kann der Spielgeber keine Punkte mehr erben, da er selbst mitspielt."
  },
  {
    "question": "Gibt es beim Aucho zu dritt einen «Lukas»?",
    "answer": "Nein, beim Aucho für drei Spieler entfällt der «Lukas». Die verbleibenden Karten bilden einen Stock, der nur für den «Kehr» verwendet werden kann."
  }
]
```

---
id: `variants_strategic_aucho_zwei`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Diese Zweier-Variante des Aucho funktioniert nach ähnlichen Prinzipien wie die grösseren Versionen, bringt aber spezielle [Raubregeln](./expressions_rauben) mit sich.

Spiel geben:
• Der Spielgeber verteilt jedem Spieler neun Karten in drei Runden zu je drei Karten
• Die 19. Karte wird aufgedeckt und bestimmt die [Trumpffarbe](./general_trump_values)
• Diese aufgedeckte Karte kann mit dem [Trumpf-Sechser](./general_trump_values) [geraubt](./expressions_rauben) werden
• Das Rauben kann hinausgezögert werden, bis [Vorhand](./expressions_vorhand) seine erste Karte gespielt hat
• Die übrigen Karten bilden den [Stock](./expressions_stapel), dessen unterste Karte eingesehen werden darf

Besonderheiten für zwei Spieler:
• Vier [Under](./expressions_trumpf_bauer) ([Buben](./expressions_trumpf_bauer)) müssen nicht mehr zwingend vor Spielbeginn angemeldet werden
• Aus der Hand darf ausschliesslich die aufgedeckte Farbe als [Trumpf](./general_trump_values) bestimmt werden ([Vorhand](./expressions_vorhand) geniesst dabei den Vorrang)
• Möchte ein Spieler das Spiel in einer anderen Farbe übernehmen, muss er einen «[Kehr](./expressions_kehr)» verlangen
• Der Gewinner eines Spiels erhält zwei [Striche](./schreiben)

Übrige Regeln:
In allen anderen Punkten entsprechen die Regeln denen des Aucho für vier beziehungsweise drei Spieler.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie funktioniert das Rauben beim Aucho zu zweit?",
    "answer": "Die aufgedeckte Trumpfkarte kann mit dem Trumpf-Sechser geraubt werden. Das Rauben kann hinausgezögert werden, bis Vorhand seine erste Karte gespielt hat."
  },
  {
    "question": "Muss man beim Aucho zu zweit die vier Under vor Spielbeginn anmelden?",
    "answer": "Nein, beim Aucho für zwei Spieler müssen die vier Under nicht mehr zwingend vor Spielbeginn angemeldet werden."
  },
  {
    "question": "Kann man beim Aucho zu zweit eine andere Farbe als Trumpf wählen als die aufgedeckte?",
    "answer": "Aus der Hand darf ausschliesslich die aufgedeckte Farbe als Trumpf bestimmt werden. Für eine andere Farbe muss ein «Kehr» verlangt werden."
  },
  {
    "question": "Wie viele Striche erhält der Gewinner beim Aucho zu zweit?",
    "answer": "Der Gewinner eines Spiels erhält zwei Striche."
  }
]
```

---
id: `variants_strategic_bieter_drei`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Bieter (auch [Steiger](./expressions_passe) genannt) für 3 Spieler ist ein klassisches Bietspiel, bei dem ein [König](./expressions_koenigspartei) gegen eine [Bauernpartei](./expressions_bauernpartei) antritt.

Spiel geben - Erstes Spiel:
• Beim ersten Spiel teilt der Spielgeber jedem Spieler 5 Karten aus und legt je 3 Karten verdeckt und offen auf den Tisch
• Nun verteilt er jedem Spieler nochmals 5 Karten
• Ab dem zweiten Spiel werden jedem Spieler 12 Karten (3 x 4 Karten) verteilt

Weisen-Regel:
• Beim [Hindersi](./expressions_hindersi) ([Misère](./expressions_misere)) entscheidet bei gleich hohen [Weisen](./weis_rules_general) die wertvollere Karte
• Beispiel: Ein Dreiblatt von einem König ist besser als ein Dreiblatt von einem Neuner

Bieten:
• Falls [Vorhand](./expressions_vorhand) das Spiel übernehmen will, bietet er mindestens 600 [Punkte](./general_scoring_rules) an
• Die nachfolgenden Spieler können der Reihe nach das Gebot beliebig um mindestens 10 Punkte überbieten (steigern)
• Der Meistbietende wird König, seine Gegner bilden die Bauernpartei

König-Phase:
• Der König erhält nun die 6 auf dem Tisch liegenden Karten, wobei er auf Wunsch die 3 verdeckten Karten der Bauernpartei zeigen muss
• Nachdem der König die Karten gesehen hat, kann er an deren Stelle 6 beliebige [Handkarten](./expressions_handkarten) ablegen

Spielablauf:
• Zum ersten Spiel bestimmt der König den [Trumpf](./general_trump_values): Er kann wählen zwischen einer [Trumpffarbe](./general_trump_values), einem [Obenabe](./expressions_obenabe), einem [Undenufe](./expressions_undenufe) oder einem Hindersi ohne Trumpf
• Beim Hindersi darf der König keinen [Stich](./expressions_stich) erzielen, sonst schreibt die Bauernpartei einen [Matsch](./matsch) mit [Matschprämie](./expressions_matschpraemie)

Spielziele:
• Der König hat die von ihm gebotene Zahl zu erreichen
• Die Bauernpartei muss 1000 Punkte erzielen
• Gewonnen hat, wer sein Ziel zuerst erreicht

Schneider-Regel:
Wer die Hälfte seines Ziels nicht erreicht, verliert den doppelten Einsatz.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie hoch ist das Mindestgebot beim Bieter für 3 Spieler?",
    "answer": "Das Mindestgebot liegt bei 600 Punkten, wenn Vorhand das Spiel übernehmen will."
  },
  {
    "question": "Was ist die Aufgabe der Bauernpartei beim Bieter?",
    "answer": "Die Bauernpartei muss gemeinsam 1000 Punkte erzielen, um zu gewinnen."
  },
  {
    "question": "Was passiert beim Hindersi, wenn der König einen Stich macht?",
    "answer": "Beim Hindersi darf der König keinen Stich erzielen. Macht er trotzdem einen Stich, schreibt die Bauernpartei einen Matsch mit Matschprämie."
  },
  {
    "question": "Wie viele Karten erhält jeder Spieler beim ersten Spiel beim Bieter?",
    "answer": "Beim ersten Spiel teilt der Spielgeber jedem Spieler zunächst 5 Karten aus und legt je 3 Karten verdeckt und offen auf den Tisch, dann nochmals 5 Karten."
  }
]
```

---
id: `variants_strategic_bieter_vier`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Bieter (auch [Steiger](./expressions_passe) genannt) für 4 Spieler ist ein [Team](./expressions_team)-Bietspiel, bei dem ein [König](./expressions_koenigspartei) gegen eine [Bauernpartei](./expressions_bauernpartei) aus drei Spielern antritt.

Spiel geben - Erstes Spiel:
• Beim ersten Spiel teilt der Spielgeber jedem Spieler 4 Karten aus und legt 2 Karten verdeckt und 2 Karten offen auf den Tisch
• Anschliessend verteilt er jedem Spieler nochmals 4 Karten
• Ab dem zweiten Spiel werden jedem Spieler 9 Karten verteilt

Bieten:
• Das Mindestgebot liegt bei 350 [Punkten](./general_scoring_rules)
• Der König erhält die 4 auf dem Tisch liegenden Karten und muss nach ihrer Einsichtnahme 4 beliebige [Handkarten](./expressions_handkarten) ablegen
• Seine 3 Gegner bilden die Bauernpartei

Unterschiede zur Dreier-Variante:
• Niedrigeres Mindestgebot (350 statt 600 Punkte)
• Weniger Tischkarten (4 statt 6)
• Mehr Gegner in der Bauernpartei

Spielziele:
• Der König muss seine gebotene Punktzahl erreichen
• Die Bauernpartei gemeinsam 1000 Punkte

Übrige Regeln:
Im Übrigen gelten die gleichen Regeln wie beim Bieter (Steiger) für 3 Spieler.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie hoch ist das Mindestgebot beim Bieter für 4 Spieler?",
    "answer": "Das Mindestgebot liegt bei 350 Punkten, was niedriger ist als bei der Dreier-Variante (600 Punkte)."
  },
  {
    "question": "Wie viele Karten liegen beim Bieter für 4 Spieler auf dem Tisch?",
    "answer": "Beim ersten Spiel liegen 4 Karten auf dem Tisch (2 verdeckt und 2 offen), während es bei der Dreier-Variante 6 Karten sind."
  },
  {
    "question": "Wie viele Gegner hat der König beim Bieter für 4 Spieler?",
    "answer": "Der König hat drei Gegner, die gemeinsam die Bauernpartei bilden."
  },
  {
    "question": "Welches Ziel muss die Bauernpartei beim Bieter für 4 Spieler erreichen?",
    "answer": "Die Bauernpartei muss gemeinsam 1000 Punkte erzielen, genau wie bei der Dreier-Variante."
  }
]
```

---
id: `variants_strategic_pandur`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Pandur ist ein anspruchsvolles Königsspiel für vier Spieler (auch mit drei oder zwei Spielern möglich), das sich durch strikte Regelbefolgung auszeichnet.

Strenge Regeln:
• Verstösse wie falsches oder überflüssiges [Weisen](./weis_rules_general), unzulässiges [Ausspielen](./ausspiel), das Umdrehen von [Stichen](./expressions_stich) oder Kommentare zum Spielverlauf sind untersagt
• Verstösse werden mit dem sofortigen Verlust des betreffenden Spiels geahndet

Kartenspiel und Geben:
• Verwendet wird ein reduziertes [Kartenspiel](./general_card_basics) mit 24 Karten, wobei Sechser, Siebner und Achter ausgeschlossen bleiben
• Der Spielgeber verteilt je acht Karten an seine drei Mitspieler, nimmt selbst aber nicht aktiv am Spiel teil
• Er kann jedoch Punkte «[erben](./expressions_erben)», also gutgeschrieben bekommen, wenn sein [Team](./expressions_team) gewinnt

Steigerung:
• Nach der Kartenverteilung beginnt die Steigerung
• [Vorhand](./expressions_vorhand) eröffnet das Bieten und nennt basierend auf seinen [Handkarten](./expressions_handkarten) eine Punktzahl, die er zu erreichen glaubt
• Die Mindestansage liegt bei 100 [Punkten](./general_scoring_rules)
• Jedes neue Gebot muss mindestens zehn Punkte über dem vorherigen liegen

Steigerungsreihenfolge:
• Von 100 bis 200 Punkte in Schritten zu je zehn Punkten
• [Misère](./expressions_misere) ohne [Trumpf](./general_trump_values) (zählt 8 Punkte)
• Misère mit Trumpf (zählt 10 Punkte)
• Von 210 bis 250 Punkte in Zehnerschritten
• Pandur ohne Trumpf (zählt 15 Punkte)
• Von 260 bis 300 Punkte
• Pandur mit Trumpf (zählt 16 Punkte)

Spielübernahme:
• Der Spieler mit dem höchsten abgegebenen Gebot übernimmt das Spiel
• Die beiden übrigen Teilnehmer bilden gemeinsam die Gegenpartei
• Die Gegenpartei versucht, den Spielübernehmer daran zu hindern, seine angesagte Punktzahl zu erreichen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Karten werden beim Pandur gespielt?",
    "answer": "Beim Pandur wird ein reduziertes Kartenspiel mit 24 Karten verwendet, wobei Sechser, Siebner und Achter ausgeschlossen bleiben."
  },
  {
    "question": "Wie hoch ist die Mindestansage beim Pandur?",
    "answer": "Die Mindestansage liegt bei 100 Punkten, und jedes neue Gebot muss mindestens zehn Punkte über dem vorherigen liegen."
  },
  {
    "question": "Was passiert bei Regelverstössen beim Pandur?",
    "answer": "Verstösse wie falsches Weisen oder unzulässiges Ausspielen werden mit dem sofortigen Verlust des betreffenden Spiels geahndet."
  },
  {
    "question": "Wie viele Punkte zählt ein Pandur mit Trumpf?",
    "answer": "Ein Pandur mit Trumpf zählt 16 Punkte, während ein Pandur ohne Trumpf 15 Punkte zählt."
  },
  {
    "question": "Kann der Spielgeber beim Pandur punkte erben?",
    "answer": "Ja, der Spielgeber kann Punkte «erben», also gutgeschrieben bekommen, wenn sein Team gewinnt."
  }
]
```

---
id: `variants_strategic_sidi_barrani`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Sidi-Barrani ist eine taktisch anspruchsvolle [Schieber](./schieber_taktiken_basics)-Variante mit Bieten, bei der je zwei Spieler ein [Team](./expressions_team) bilden.

Spielprinzip:
• Im Gegensatz zum Schieber wird nicht zum Partner geschoben, sondern der Reihe nach in Spielrichtung zu jedem Spieler
• Jeder Spieler kann die [Trumpffarbe](./general_trump_values) wählen, indem er ein Gebot macht
• Beim Bieten werden eine [Punktzahl](./general_scoring_rules) und die Trumpffarbe angesagt, die man mit diesem [Trumpf](./general_trump_values) zu erreichen glaubt
• Das Mindestgebot beginnt bei 90 Punkten

Ansageregeln (Empfehlungen):
• Gerade Ansagen: 60 = [Under](./expressions_trumpf_bauer) ([Bube](./expressions_trumpf_bauer)) + 2 [Karten](./general_card_basics) der gleichen Farbe / 80 = Under + 3 Karten / 100 = Under + 4 Karten
• Ungerade Ansagen: 50 = [Nell](./expressions_nell) + 2 Karten der gleichen Farbe / 70 = Nell + 3 Karten / 90 = Nell + 4 Karten
• Asse einer Farbe werden mit 5 Punkten angesagt

Doppeln und Kontern:
• Ein Gegner kann «doppeln», wenn er überzeugt ist, dass das trumpfmachende Team die Ansage nicht erreicht
• Gedoppelte Ansagen können gekontert werden

Hinweis:
Ansageregeln sind nicht verbindlich und dienen lediglich als Orientierungshilfe.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Unterschied zwischen Sidi-Barrani und normalem Schieber?",
    "answer": "Beim Sidi-Barrani wird nicht zum Partner geschoben, sondern der Reihe nach in Spielrichtung zu jedem Spieler. Zudem wird die Trumpffarbe durch Bieten bestimmt."
  },
  {
    "question": "Wie hoch ist das Mindestgebot beim Sidi-Barrani?",
    "answer": "Das Mindestgebot beginnt bei 90 Punkten."
  },
  {
    "question": "Sind die Ansageregeln beim Sidi-Barrani verbindlich?",
    "answer": "Nein, die Ansageregeln sind nicht verbindlich und dienen lediglich als Orientierungshilfe."
  },
  {
    "question": "Was bedeutet «doppeln» beim Sidi-Barrani?",
    "answer": "Ein Gegner kann «doppeln», wenn er überzeugt ist, dass das trumpfmachende Team die Ansage nicht erreicht. Gedoppelte Ansagen können gekontert werden."
  }
]
```

---
id: `variants_strategic_bieder`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Bieter (auch [Steiger](./expressions_passe) genannt) ist ein Königsspiel mit Bieten für 3 Spieler (auch 4 oder 5 Spieler möglich), bei dem ein [König](./expressions_koenigspartei) gegen eine [Bauernpartei](./expressions_bauernpartei) antritt.

Spiel geben - Erstes Spiel:
• Beim ersten Spiel teilt der Spielgeber jedem Spieler 5 [Karten](./general_card_basics) aus und legt je 3 Karten verdeckt und offen auf den Tisch
• Nun verteilt er jedem Spieler nochmals 5 Karten
• Ab dem zweiten Spiel werden jedem Spieler 12 Karten verteilt

Bieten:
• Falls [Vorhand](./expressions_vorhand) das Spiel übernehmen will, bietet er mindestens 600 [Punkte](./general_scoring_rules) an
• Die nachfolgenden Spieler können das Gebot beliebig um mindestens 10 Punkte überbieten
• Wer keine Aussicht auf ein gutes Spiel hat, sagt «[fort](./expressions_fort)» oder «ich passe»
• Der Meistbietende wird König, seine Gegner bilden die Bauernpartei

Spielziele:
• Ziel des Königs ist, am Ende der [Partie](./expressions_partie) sein Gebot zu erreichen
• Die Bauernpartei muss gemeinsam 1000 Punkte erzielen

König-Phase:
• Der König erhält die 6 auf dem Tisch liegenden Karten und kann 6 beliebige [Handkarten](./expressions_handkarten) ablegen

Spielablauf:
• Zum ersten Spiel bestimmt der König den [Trumpf](./general_trump_values) ([Trumpffarbe](./general_trump_values), [Obenabe](./expressions_obenabe), [Undenufe](./expressions_undenufe) oder [Hindersi](./expressions_hindersi) ohne Trumpf)
• Beim zweiten Spiel gilt die unterste Karte als Trumpffarbe
• Der König kann ab dem zweiten Spiel entscheiden, ob er spielen möchte oder nicht
• Falls er verzichtet, schreibt die Bauernpartei einen [Matsch](./matsch) mit [Matschprämie](./expressions_matschpraemie)
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie hoch ist das Mindestgebot beim Bieder?",
    "answer": "Falls Vorhand das Spiel übernehmen will, bietet er mindestens 600 Punkte an."
  },
  {
    "question": "Was passiert, wenn der König beim zweiten Spiel verzichtet?",
    "answer": "Falls der König verzichtet, schreibt die Bauernpartei einen Matsch mit Matschprämie."
  },
  {
    "question": "Welches Ziel muss die Bauernpartei beim Bieder erreichen?",
    "answer": "Die Bauernpartei muss gemeinsam 1000 Punkte erzielen."
  },
  {
    "question": "Kann der König beim zweiten Spiel den Trumpf selbst wählen?",
    "answer": "Nein, beim zweiten Spiel gilt automatisch die unterste Karte als Trumpffarbe. Der König kann dann entscheiden, ob er spielen möchte oder nicht."
  }
]
```

---
id: `variants_strategic_bieter_fuenf`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Beim Bieter für fünf Spieler bilden zwei Spieler die [Königspartei](./expressions_koenigspartei), während drei Spieler die [Bauernpartei](./expressions_bauernpartei) bilden.

Spiel geben:
• Nachdem der Eichel-Siebener (Schaufel-Siebener) aus dem Spiel entfernt wurde, teilt der Spielgeber jedem Spieler zuerst vier, dann drei [Karten](./general_card_basics) aus
• Jeder Spieler erhält somit bei allen Spielen je sieben Karten

Bieten und Partner-Bestimmung:
• Das Mindestgebot liegt bei 600 [Punkten](./general_scoring_rules)
• Der Meistbietende gehört der Königspartei an
• Er nennt eine Karte, die für sein Spiel von Interesse ist
• Wer diese Karte besitzt, ist sein Partner

Besondere Regeln:
• Die Spieler der Königspartei dürfen nicht nebeneinander sitzen
• Die beiden Parteien müssen sich gebildet haben, bevor der Spielübernehmer seine erste Karte ausspielt
• Diese Regel gilt auch dann, wenn der Meistbietende ein [Matschspiel](./matsch) in der Hand hält

Schreiben:
• Bei Gewinn: Der Meistbietende erhält zwei [Striche](./schreiben), sein Partner einen Strich, die Spieler der Bauernpartei schreiben je einen «[Härdöpfel](./expressions_haerdoepfel)» ([Nuller](./expressions_nuller))
• Bei Verlust: Der Meistbietende schreibt zwei «Härdöpfel», sein Partner einen «Härdöpfel», die Spieler der Bauernpartei erhalten je einen Strich

Schneider-Regel:
Wer die Hälfte seines Ziels nicht erreicht, verliert den doppelten Einsatz.

Übrige Regeln:
Im Übrigen gelten die gleichen Regeln wie beim Bieter ([Steiger](./expressions_passe)) für drei Spieler.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie wird der Partner beim Bieter für fünf Spieler bestimmt?",
    "answer": "Der Meistbietende nennt eine Karte, die für sein Spiel von Interesse ist. Wer diese Karte besitzt, wird sein Partner und bildet mit ihm die Königspartei."
  },
  {
    "question": "Wie viele Spieler bilden die Königspartei beim Bieter für fünf Spieler?",
    "answer": "Die Königspartei besteht aus zwei Spielern (dem Meistbietenden und seinem Partner), während drei Spieler die Bauernpartei bilden."
  },
  {
    "question": "Dürfen die Spieler der Königspartei nebeneinander sitzen?",
    "answer": "Nein, die Spieler der Königspartei dürfen nicht nebeneinander sitzen."
  },
  {
    "question": "Wie viele Karten erhält jeder Spieler beim Bieter für fünf Spieler?",
    "answer": "Jeder Spieler erhält bei allen Spielen je sieben Karten (zuerst vier, dann drei Karten)."
  }
]
```

---
id: `variants_strategic_bolschewik`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Bolschewik ist ähnlich wie der [Sidi-Barrani](./variants_strategic_sidi_barrani), wird jedoch mit einem [Doppelkart](./expressions_trio) (2 Kartenspiele) gespielt.

Kartenspiel und Regeln:
• Gespielt wird mit einem Doppelkart ohne die Sechser, Siebner und Achter (insgesamt 48 [Karten](./general_card_basics))
• Von den restlichen Karten (Ass bis Neuner) sind je 2 gleiche Karten im Spiel
• Die zweitgespielte Karte schlägt die erstausgespielte gleiche Karte

Teambildung:
• Jeder Spieler zieht aus einem verdeckten Kartenspiel eine Karte
• Die beiden Spieler mit den höheren Karten bilden ein [Team](./expressions_team), die beiden mit den niedrigeren Karten sind das gegnerische Team
• Die Partner sitzen sich kreuzweise gegenüber

Steigern:
• Beim Bolschewik wird [Trumpf](./general_trump_values) oder «[Bock](./expressions_bock)» ([Obenabe](./expressions_obenabe)-Spiel ohne Trumpf) der [Kartenfarbe](./expressions_kartenfarben) in Zahlen gesteigert
• Das Mindestgebot liegt bei 90 [Punkten](./general_scoring_rules)
• Die nachfolgenden Spieler können der Reihe nach dieses Gebot beliebig um mindestens 5 Punkte überbieten

Bewertung:
• Doppelkart bei Trumpf: 314 Punkte ([letzter Stich](./letzter_stich) 10 Punkte)
• Doppelkart bei «Bock»: 250 Punkte (letzter Stich 10 Punkte)
• [Matsch](./matsch): 514 Punkte
• Matsch geboten: 1028 Punkte
• Matsch geboten und gedoppelt: 1542 Punkte

Spielablauf:
• Die erste Karte darf erst ausgespielt werden, wenn alle anderen Spieler «passen» oder ein Gegner «doppelt»
• Der Letztsteigernde ist der Spielübernehmer und spielt die erste Karte aus

Besondere Regeln:
• Die beiden [Trumpf-Bauern](./expressions_trumpf_bauer) ([Under](./expressions_trumpf_bauer)) müssen nicht angegeben werden
• [Untertrumpfen](./untertrumpfen) ist erlaubt, sofern man von der ausgespielten Farbe keine Karte hat

Ende der Partie:
Gewonnen hat, wer die vereinbarte Punktzahl (2000, 3000 oder 5000) zuerst erreicht.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Karten werden beim Bolschewik gespielt?",
    "answer": "Gespielt wird mit einem Doppelkart ohne Sechser, Siebner und Achter, also insgesamt 48 Karten."
  },
  {
    "question": "Was bedeutet «Bock» beim Bolschewik?",
    "answer": "«Bock» ist ein Obenabe-Spiel ohne Trumpf, das beim Steigern gewählt werden kann. Ein Doppelkart bei Bock zählt 250 Punkte."
  },
  {
    "question": "Wie viele Punkte zählt ein Matsch beim Bolschewik?",
    "answer": "Ein Matsch zählt 514 Punkte. Ein Matsch geboten zählt 1028 Punkte, und ein Matsch geboten und gedoppelt zählt 1542 Punkte."
  },
  {
    "question": "Wie wird das Team beim Bolschewik gebildet?",
    "answer": "Jeder Spieler zieht eine Karte. Die beiden Spieler mit den höheren Karten bilden ein Team, die beiden mit den niedrigeren Karten sind das gegnerische Team."
  }
]
```

---
id: `variants_family_einzel_coiffeur`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Beim Einzel-Coiffeur-Jass spielt jeder Spieler für sich allein, zu dritt oder zu viert. Die einzelnen Varianten werden wie beim [Coiffeur-Schieber](./variants_family_coiffeur_schieber) gewählt.

Die acht Varianten:
• [Schilte](./expressions_schilte) ([Ecken](./expressions_ecken)) - 2-fach
• [Rosen](./expressions_rose) ([Kreuz](./expressions_kreuz)) - 2-fach
• [Eichel](./expressions_eichel) ([Schaufel](./expressions_schaufel)) - 3-fach
• [Schellen](./expressions_schelle) ([Herz](./expressions_herz)) - 3-fach
• [Obenabe](./expressions_obenabe) - 5-fach
• [Undenufe](./expressions_undenufe) - 6-fach
• [Joker](./expressions_joker)-Variante - 7-fach ([Trumpf](./general_trump_values) frei wählbar)
• Joker-Variante - 8-fach (Trumpf frei wählbar)

Unterschiede zum Team-Coiffeur:
• Jeder Spieler spielt für sich alleine
• Keine Partner-Absprachen möglich
• Individuelle [Punktwertung](./general_scoring_rules)
• Direkter Vergleich zwischen allen Spielern

Schreiben und Abrechnung:
• Jeder Spieler erhält seine erzielten Punkte multipliziert mit dem entsprechenden Faktor
• Die gemachten Spiele werden jedem Spieler in der entsprechenden Spalte notiert
• Am Ende werden alle Punkte addiert
• Gewinner ist der Spieler mit der höchsten Gesamtpunktzahl nach allen acht Varianten
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie unterscheidet sich Einzel-Coiffeur vom Team-Coiffeur?",
    "answer": "Beim Einzel-Coiffeur spielt jeder Spieler für sich alleine, es gibt keine Partner-Absprachen und jeder Spieler wird individuell bewertet und direkt mit allen anderen Spielern verglichen."
  },
  {
    "question": "Welche Multiplikatoren haben die verschiedenen Varianten beim Einzel-Coiffeur?",
    "answer": "Schilte und Rosen zählen 2-fach, Eichel und Schellen 3-fach, Obenabe 5-fach, Undenufe 6-fach, und die Joker-Varianten 7- bzw. 8-fach."
  },
  {
    "question": "Wer gewinnt beim Einzel-Coiffeur?",
    "answer": "Gewinner ist der Spieler mit der höchsten Gesamtpunktzahl nach allen acht Varianten."
  },
  {
    "question": "Kann ich beim Einzel-Coiffeur die Joker-Variante mit frei wählbarem Trumpf spielen?",
    "answer": "Ja, es gibt zwei Joker-Varianten (7-fach und 8-fach), bei denen die Trumpffarbe frei wählbar ist."
  }
]
```

---
id: `variants_strategic_differenzler_drei`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Differenzler mit offener Ansage für 3 Spieler ist ein Dreier-Schätzspiel, bei dem jeder Spieler vorab ansagt, wie viele [Kartenpunkte](./general_card_values) er zu erzielen glaubt.

Spiel geben:
Jeder Spieler erhält 12 [Karten](./general_card_basics) (3 x 4 Karten).

Besonderheiten für drei Spieler:
• Jeder Spieler erhält 12 statt 9 Karten
• Mehr taktische Möglichkeiten durch grössere [Handkarten](./expressions_handkarten)-Anzahl
• Präzisere Einschätzung möglich

Spielablauf und Ansage:
• [Vorhand](./expressions_vorhand) beginnt mit der ersten Ansage, wie viele Kartenpunkte er zu erzielen glaubt
• Dann meldet der nachfolgende Spieler seine geschätzte Punktzahl usw.
• Der Spielgeber macht als Letzter seine Ansage

Spielgeber-Bonus:
• Als letzter Ansager erhält der Spielgeber Gutschriftpunkte
• Pro 5 Punkte unter oder über 157 Schätzpunkten erhält er 1 Punkt gutgeschrieben
• Diese Gutschriftpunkte verrechnet er nach jedem Spiel mit seinen Differenzpunkten

Bewertungsregeln:
• Wer seine vorausgesagte Punktzahl genau erspielt, erhält 10 Minuspunkte
• Wer 0 Punkte ansagt und keinen [Stich](./expressions_stich) erzielt, erhält keine Minuspunkte
• Wer 0 Punkte ansagt und einen Stich mit 0 Kartenpunkten erspielt, erhält ebenfalls 10 Minuspunkte gutgeschrieben

Variante mit Stöckpunkten:
• Als zusätzliche Variante können die [Stöckpunkte](./expressions_stoecke) mit einbezogen werden
• Die 20 Stöckpunkte können dazugezählt beziehungsweise abgezogen werden

Übrige Regeln:
Im Übrigen gelten die gleichen Regeln wie beim Differenzler mit offener Ansage für 4 Spieler.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Karten erhält jeder Spieler beim Differenzler für 3 Spieler?",
    "answer": "Jeder Spieler erhält 12 Karten (3 x 4 Karten), was mehr ist als bei der Vierer-Variante mit 9 Karten."
  },
  {
    "question": "Welchen Vorteil hat der Spielgeber beim Differenzler für 3 Spieler?",
    "answer": "Als letzter Ansager erhält der Spielgeber Gutschriftpunkte: Pro 5 Punkte unter oder über 157 Schätzpunkten erhält er 1 Punkt gutgeschrieben."
  },
  {
    "question": "Was passiert, wenn ich meine Punktzahl genau treffe?",
    "answer": "Wer seine vorausgesagte Punktzahl genau erspielt, erhält 10 Minuspunkte gutgeschrieben."
  },
  {
    "question": "Können Stöckpunkte beim Differenzler für 3 Spieler mit einbezogen werden?",
    "answer": "Ja, als zusätzliche Variante können die Stöckpunkte (20 Punkte) dazugezählt oder abgezogen werden."
  }
]
```

---
id: `variants_family_gluecksjass`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Glücksjass ist ein einfacher Einzeljass für vier oder drei Spieler, bei dem das Glück eine wichtigere Rolle spielt als komplexe Strategien.

Spiel geben:
• Bei vier Spielern: Der Spieler links vom Schreiber verteilt je drei [Karten](./general_card_basics) in drei Runden zum ersten [Spiel](./general_game_basics)
• Bei drei Spielern: Je vier Karten in drei Runden
• In den folgenden Spielen wechselt das Geben reihum in Spielrichtung

Spielablauf:
• Beim Glücksjass spielt jeder Teilnehmer für sich allein
• Die Entscheidung über die [Trumpffarbe](./general_trump_values) hat [Vorhand](./expressions_vorhand)
• Alle Trumpffarben werden einfach gewertet
• Eine [Partie](./expressions_partie) besteht aus zwölf Spielen, was drei Umgängen bei vier Spielern oder vier Umgängen bei drei Spielern entspricht

Schreiben:
• Nach jedem Spiel notiert der Schreiber die erzielten [Kartenpunkte](./general_card_values) sowie die gültigen [Weisen](./weis_rules_general) für jeden Spieler in der entsprechenden Spalte
• Ab dem zweiten Spiel werden die Punkte fortlaufend zusammengezählt, sodass alle Spieler stets über die aktuellen Punktestände informiert sind

Spielende:
• Wer nach zwölf Spielen die höchste [Punktzahl](./general_scoring_rules) erzielt hat, gewinnt die Partie; wer am wenigsten Punkte aufweist, hat verloren
• Die Karten für die neue Partie werden vom links sitzenden Spieler des Verlierers verteilt

Spielvarianten:
• Der Glücksjass kann mit den zusätzlichen Varianten [Obenabe](./expressions_obenabe) und [Undenufe](./expressions_undenufe) gespielt werden
• Diese Varianten werden ebenfalls einfach, also ohne Multiplikatoren, gewertet

Charakter:
Wie der Name bereits andeutet, spielt beim Glücksjass das Glück eine wichtige Rolle, da keine besonderen strategischen Überlegungen notwendig sind und die Kartenverteilung entscheidend ist.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wer bestimmt die Trumpffarbe beim Glücksjass?",
    "answer": "Die Entscheidung über die Trumpffarbe hat Vorhand, also der Spieler rechts vom Kartengeber."
  },
  {
    "question": "Wie viele Spiele umfasst eine Glücksjass-Partie?",
    "answer": "Eine Partie besteht aus zwölf Spielen, was drei Umgängen bei vier Spielern oder vier Umgängen bei drei Spielern entspricht."
  },
  {
    "question": "Können Obenabe und Undenufe beim Glücksjass gespielt werden?",
    "answer": "Ja, der Glücksjass kann mit den zusätzlichen Varianten Obenabe und Undenufe gespielt werden, diese werden jedoch ebenfalls einfach (ohne Multiplikatoren) gewertet."
  },
  {
    "question": "Warum heisst es Glücksjass?",
    "answer": "Das Glück spielt eine wichtigere Rolle als komplexe Strategien, da die Kartenverteilung entscheidend ist und keine besonderen strategischen Überlegungen notwendig sind."
  }
]
```

---
id: `variants_family_guggitaler`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Guggitaler kann mit oder ohne Karten-Domino gespielt werden und bietet verschiedene Herausforderungen über fünf Spiele hinweg.

Spiel geben:
• Bei drei Spielern: Ein beliebiger Schreiber verteilt je zwölf [Karten](./general_card_basics) in drei Runden zu je vier Karten
• Bei vier Spielern: Je neun Karten in drei Runden zu je drei Karten zum ersten Spiel

Spielablauf:
• Der Guggitaler wird ohne [Trumpf](./general_trump_values) gespielt
• [Weispunkte](./expressions_weispunkte) und die fünf Punkte für den [letzten Stich](./letzter_stich) zählen nicht
• Bei insgesamt fünf Spielen pro [Partie](./expressions_partie) gilt für jedes Spiel ein anderes Ziel

Die fünf Spiele:
• Erstes Spiel: möglichst wenige [Stiche](./expressions_stich) zu machen (1 Punkt pro Stich)
• Zweites Spiel: möglichst wenige [Schellenkarten](./expressions_schelle) ([Herzkarten](./expressions_herz)) zu machen (2 Punkte pro Karte)
• Drittes Spiel: möglichst wenige Ober ([Damen](./expressions_basic_terms)) zu machen (4 Punkte pro Ober/Dame)
• Viertes Spiel: den [Rosen](./expressions_rose)-König ([Kreuz](./expressions_kreuz)-König) nicht zu machen (8 Punkte)
• Fünftes Spiel: den letzten Stich nicht zu machen (10 Punkte)

Mit Karten-Domino - Gutschriften:
• 1. Rang: minus 30 Punkte (bei drei Spielern) / minus 25 Punkte (bei vier Spielern)
• 2. Rang: minus 20 Punkte / minus 16 Punkte
• 3. Rang: minus 14 Punkte / minus 12 Punkte
• 4. Rang: minus 8 Punkte (nur bei vier Spielern)

Ohne Karten-Domino - Zusätzliche Spiele:
• Sechstes Spiel: möglichst viele Stiche zu machen
• Siebentes Spiel: möglichst viele Schellenkarten (Herzkarten) zu machen
• Achtes Spiel: möglichst viele Ober (Damen) zu machen
• Neuntes Spiel: der Stich mit dem Rosen-König (Kreuz-König) zu machen
• Zehntes Spiel: der letzte Stich zu machen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wird beim Guggitaler mit Trumpf gespielt?",
    "answer": "Nein, der Guggitaler wird ohne Trumpf gespielt. Weispunkte und die fünf Punkte für den letzten Stich zählen nicht."
  },
  {
    "question": "Wie viele Spiele hat eine Guggitaler-Partie?",
    "answer": "Mit Karten-Domino hat eine Partie fünf Spiele, ohne Karten-Domino zehn Spiele."
  },
  {
    "question": "Was ist das Ziel des ersten Spiels beim Guggitaler?",
    "answer": "Erstes Spiel: möglichst wenige Stiche zu machen (1 Punkt pro Stich)."
  },
  {
    "question": "Welche Gutschriften gibt es beim Karten-Domino?",
    "answer": "Die Gutschriften reichen von minus 30 Punkte (1. Rang bei drei Spielern) bis minus 8 Punkte (4. Rang bei vier Spielern)."
  },
  {
    "question": "Was passiert, wenn man den Rosen-König im Stich erhält?",
    "answer": "Beim vierten Spiel bringt der Rosen-König (Kreuz-König) 8 Punkte ein, was vermieden werden soll."
  }
]
```

---
id: `variants_strategic_handjass_blinder`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Bei dieser Dreier-Variante des [Handjass](./variants_strategic_handjass) kann ein Spieler seine [Karten](./general_card_basics) gegen den «[Blinden](./expressions_blinder)» tauschen.

Spiel geben und Trumpf:
• Jeder Spieler erhält neun Karten in drei Runden zu je drei Karten
• Die übrigen neun Karten bilden den «Blinden»
• Die oberste Karte des «Blinden» wird aufgedeckt und bestimmt die [Trumpffarbe](./general_trump_values)
• Sie kann mit dem [Trumpf-Sechser](./general_trump_values) von einem aktiven Spieler [geraubt](./expressions_rauben) werden, allerdings erst nachdem sich alle Spieler entschieden haben, ob sie mitspielen oder nicht
• Das Rauben muss vor dem eigenen [Ausspiel](./ausspiel) der ersten Karte erfolgen
• Die unterste Karte des «Blinden» darf nicht eingesehen werden

Spielentscheidung und Tausch:
• Wie beim Handjass für vier Spieler erklärt jeder Teilnehmer, ob er am Spiel teilnehmen will
• [Vorhand](./expressions_vorhand) kann nun seine erhaltenen Karten vollständig gegen den «Blinden» austauschen
• Verzichtet er darauf, haben anschliessend der zweite und dann der dritte Spieler diese Möglichkeit
• Wer den «Blinden» nimmt, ist verpflichtet, am Spiel teilzunehmen
• Ein Rücktausch der ursprünglich erhaltenen Karten ist nicht möglich
• Die abgelegten Karten können bis zum eigenen Ausspiel zur ersten Karte nochmals eingesehen werden

Schreiben:
• Pro Spiel kann nur der Spieler, der die meisten [Punkte](./general_scoring_rules) erzielt, einen [Strich](./schreiben) notieren, vorausgesetzt er erreicht mindestens 21 Punkte
• Erreichen beide Spieler weniger als 21 Punkte, erhalten beide je einen «[Sack](./expressions_sack)» eingetragen, und das Schreiben eines Strichs entfällt

Übrige Regeln:
In allen anderen Belangen entsprechen die Regeln denen des Handjass für vier Spieler.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der «Blinde» beim Handjass für drei Spieler?",
    "answer": "Der «Blinde» sind die neun übrigen Karten, gegen die ein Spieler seine ursprünglich erhaltenen Karten tauschen kann."
  },
  {
    "question": "Wer darf den «Blinden» zuerst tauschen?",
    "answer": "Vorhand kann als Erster den «Blinden» gegen seine erhaltenen Karten tauschen. Verzichtet er, haben anschliessend der zweite und dann der dritte Spieler diese Möglichkeit."
  },
  {
    "question": "Muss ich mitspielen, wenn ich den «Blinden» nehme?",
    "answer": "Ja, wer den «Blinden» nimmt, ist verpflichtet, am Spiel teilzunehmen. Ein Rücktausch ist nicht möglich."
  },
  {
    "question": "Wie viele Punkte brauche ich mindestens für einen Strich beim Handjass mit Blinden?",
    "answer": "Pro Spiel kann nur der Spieler mit den meisten Punkten einen Strich notieren, vorausgesetzt er erreicht mindestens 21 Punkte."
  }
]
```

---
id: `variants_strategic_handjass_bessern_drei`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Bei dieser Variante können die Spieler ihre [Handkarten](./expressions_handkarten) durch das «[Bessern](./expressions_bessern)» verbessern.

Spiel geben und Trumpf:
• Jeder Spieler erhält zunächst neun [Karten](./general_card_basics) in drei Runden zu je drei Karten
• Die neunte Karte des Spielgebers wird aufgedeckt und zeigt die [Trumpffarbe](./general_trump_values) an; sie kann nicht [geraubt](./expressions_rauben) werden
• Von den verbleibenden neun Karten erhält jeder Spieler nochmals drei Karten zugeteilt, die jedoch zunächst verdeckt bleiben

Bessern-Regeln:
• Diese drei Karten können gegen drei beliebige Handkarten ausgetauscht werden, was als «bessern» bezeichnet wird
• Beim «Bessern» müssen stets alle drei Karten getauscht werden
• Zuerst werden die drei abzugebenden Handkarten abgelegt, danach werden die drei neuen Karten aufgenommen
• Wer auf das «Bessern» verzichtet, kann die drei verdeckten Karten einsehen
• Durch das Aufnehmen der «bessern» Karten ist man nicht automatisch verpflichtet, am Spiel teilzunehmen

Fehler beim Bessern:
Werden beim «Bessern» versehentlich zu viele oder zu wenige Karten abgelegt, erhält der Spieler einen «[Sack](./expressions_sack)», während die Gegner beziehungsweise der Gegner je einen [Strich](./schreiben) gutgeschrieben bekommen.

Übrige Regeln:
In allen anderen Punkten entsprechen die Regeln denen des [Handjass](./variants_strategic_handjass) für vier Spieler.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet «Bessern» beim Handjass für drei Spieler?",
    "answer": "«Bessern» bedeutet, dass drei verdeckte Karten gegen drei beliebige Handkarten ausgetauscht werden können, um die Hand zu verbessern."
  },
  {
    "question": "Muss ich alle drei Karten beim Bessern tauschen?",
    "answer": "Ja, beim «Bessern» müssen stets alle drei Karten getauscht werden. Es ist nicht möglich, nur eine oder zwei Karten zu tauschen."
  },
  {
    "question": "Bin ich verpflichtet am Spiel teilzunehmen, wenn ich die «bessern» Karten aufnehme?",
    "answer": "Nein, durch das Aufnehmen der «bessern» Karten ist man nicht automatisch verpflichtet, am Spiel teilzunehmen."
  },
  {
    "question": "Was passiert, wenn ich beim Bessern zu viele oder zu wenige Karten ablege?",
    "answer": "Werden beim «Bessern versehentlich zu viele oder zu wenige Karten abgelegt, erhält der Spieler einen «Sack», während die Gegner je einen Strich gutgeschrieben bekommen."
  }
]
```

---
id: `variants_two_player_handjass_bessern`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Bei dieser Zweier-Variante können die Spieler ihre [Karten](./general_card_basics) durch das «[Bessern](./expressions_bessern)» verbessern.

Standard-Modus:
• Der Spielgeber verteilt sich und seinem Mitspieler jeweils zwölf Karten in drei Runden zu je vier Karten
• Die 25. Karte wird aufgedeckt und zeigt die [Trumpffarbe](./general_trump_values) an; sie kann [geraubt](./expressions_rauben) werden
• Das Rauben kann hinausgezögert werden, bis [Vorhand](./expressions_vorhand) seine erste Karte gespielt hat
• Die übrigen Karten bilden den [Stock](./expressions_stapel), dessen unterste Karte nicht eingesehen werden darf

Alternativer Modus mit Bessern:
• Der Spielgeber verteilt zunächst je neun Karten in drei Runden zu je drei Karten
• Die 19. Karte wird aufgedeckt und zeigt die Trumpffarbe an; sie kann mit dem [Trumpf-Sechser](./general_trump_values) geraubt werden
• Die nächsten sechs Karten werden zum «Bessern» einzeln, also je eine Karte, jedem Spieler verteilt
• Die restlichen Karten bilden den Stock, dessen unterste Karte eingesehen werden darf

Besondere Regeln für zwei Spieler:
• Vier [Under](./expressions_trumpf_bauer) ([Buben](./expressions_trumpf_bauer)) müssen nicht mehr vor Spielbeginn angemeldet werden
• Aus der Hand darf ausschliesslich die aufgedeckte Farbe als [Trumpf](./general_trump_values) gespielt werden ([Vorhand](./expressions_vorhand) geniesst dabei den Vorrang)
• Möchte ein Spieler das Spiel in einer anderen Farbe übernehmen, muss er einen «[Kehr](./expressions_kehr)» verlangen
• Der Gewinner eines Spiels erhält zwei [Striche](./schreiben) gutgeschrieben

Übrige Regeln:
In allen anderen Belangen entsprechen die Regeln denen des Handjass mit «Bessern» für drei Spieler.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Karten werden beim Bessern beim Handjass zu zweit getauscht?",
    "answer": "Im alternativen Modus werden sechs Karten zum «Bessern» einzeln (je eine Karte) jedem Spieler verteilt, die gegen Handkarten getauscht werden können."
  },
  {
    "question": "Muss ich beim Handjass zu zweit die vier Under vor Spielbeginn anmelden?",
    "answer": "Nein, vier Under müssen nicht mehr zwingend vor Spielbeginn angemeldet werden."
  },
  {
    "question": "Kann ich beim Handjass zu zweit eine andere Farbe als die aufgedeckte als Trumpf wählen?",
    "answer": "Aus der Hand darf ausschliesslich die aufgedeckte Farbe als Trumpf gespielt werden. Für eine andere Farbe muss ein «Kehr» verlangt werden."
  },
  {
    "question": "Wie viele Striche erhält der Gewinner beim Handjass zu zweit?",
    "answer": "Der Gewinner eines Spiels erhält zwei Striche gutgeschrieben."
  }
]
```

---
id: `variants_specialty_hindersi_vier`
---

**Bereinigter Haupttext:**
```markdown
Ziel:
Beim [Hindersi](./expressions_hindersi)-Jass für vier Spieler geht es darum, möglichst wenige [Punkte](./general_scoring_rules) zu sammeln, was das Gegenteil der üblichen Jasszielsetzung ist.

Spiel geben:
• Ein beliebiger Spieler übernimmt das Geben und verteilt jedem Spieler neun [Karten](./general_card_basics) in drei Runden zu je drei Karten
• In den folgenden Spielen wechselt das Geben reihum in Spielrichtung

Trumpffarbe:
• Die unterste Karte des [Stapels](./expressions_stapel) bestimmt die [Trumpffarbe](./general_trump_values) und kann nicht [geraubt](./expressions_rauben) werden
• Wird ein Spiel vergeben, bleibt diese Trumpffarbe für das nächste Spiel bestehen

Spielablauf:
• [Vorhand](./expressions_vorhand) eröffnet mit dem ersten [Ausspiel](./ausspiel)
• Jeder Spieler versucht, möglichst wenige [Kartenpunkte](./general_card_values) zu erzielen
• Gelingt es jedoch einem Spieler, alle [Stiche](./expressions_stich) zu machen, werden allen anderen Spielern 157 Punkte belastet

Besondere Regeln:
• [Stöck](./expressions_stoecke)- und [Weispunkte](./expressions_weispunkte) können nicht gemeldet werden und zählen nicht
• [Untertrumpfen](./untertrumpfen) ist erlaubt, sofern man keine Karte der ausgespielten Farbe besitzt
• Wird festgestellt, dass jemand absichtlich nicht gefarbt hat, um einen wertvollen Stich zu vermeiden, wird dies mit einer Strafe von 100 Punkten geahndet

Schreiben und Partie:
• Nach jedem Spiel zählt jeder Spieler seine eigenen Kartenpunkte, die der Schreiber in die entsprechende Spalte notiert
• Ein Umgang besteht aus vier Spielen und entspricht einer [Partie](./expressions_partie)
• Der Schreiber addiert für jeden Spieler die gesamten Punkte dieser Partie
• Die beiden Spieler mit dem niedrigsten Gesamtwert erhalten je einen [Strich](./schreiben)
• Die beiden Spieler mit dem zweithöchsten und höchsten Total bekommen je einen [Nuller](./expressions_nuller) eingetragen

Spielende:
• Nach einer vereinbarten Anzahl von Partien, beispielsweise vier oder acht, wird abgerechnet
• Gewinner ist der Spieler mit den meisten Strichen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist das Ziel beim Hindersi für vier Spieler?",
    "answer": "Beim Hindersi geht es darum, möglichst wenige Punkte zu sammeln, was das Gegenteil der üblichen Jasszielsetzung ist."
  },
  {
    "question": "Was passiert, wenn ein Spieler alle Stiche macht?",
    "answer": "Gelingt es einem Spieler, alle Stiche zu machen, werden allen anderen Spielern 157 Punkte belastet."
  },
  {
    "question": "Zählen Weispunkte beim Hindersi?",
    "answer": "Nein, Stöck- und Weispunkte können nicht gemeldet werden und zählen nicht."
  },
  {
    "question": "Wie viele Spieler erhalten einen Strich pro Umgang?",
    "answer": "Die beiden Spieler mit dem niedrigsten Gesamtwert erhalten je einen Strich, die beiden anderen je einen Nuller."
  },
  {
    "question": "Wird beim Hindersi mit Trumpf gespielt?",
    "answer": "Ja, die Trumpffarbe wird durch die unterste Karte des Stapels bestimmt und kann nicht geraubt werden."
  }
]
```

---
id: `variants_two_player_cinq_cents`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Cinq Cents ist ein klassischer Jass für zwei Spieler mit besonderem Fokus auf [Spielübernahme](./general_gameplay) und [Stechwerte](./general_card_values).

Spiel geben:
• Jeder Spieler erhält vorerst 6 [Karten](./general_card_basics)
• Die 13. Karte wird offen neben den verdeckten [Kartenstapel](./expressions_stapel) gelegt
• Erst bei einer Spielübernahme werden nochmals je 3 Karten ausgeteilt

Kartenspiel und Stechwerte:
• Gespielt wird mit 32 Karten (ohne Sechser)
• Die Stechwerte entsprechen dem jeweiligen [Kartenwert](./general_card_values)
• Bei der [Trumpffarbe](./general_trump_values) gilt: [Under](./expressions_trumpf_bauer) ([Bube](./expressions_trumpf_bauer)), [Nell](./expressions_nell), Ass, [Banner](./expressions_banner) ([Zehner](./expressions_banner)), König, [Ober](./expressions_basic_terms) ([Dame](./expressions_basic_terms)), Achter, Siebner

Spielübernahme:
• Die 13. Karte zeigt die Trumpffarbe an
• Jeder Spieler kann das Spiel mit [Trumpf](./general_trump_values) auf der gezeigten Farbe übernehmen
• Verzichten beide Spieler, kann das Spiel mit einer der anderen 3 Farben als Trumpf übernommen werden

Spielziel:
• Der Spielübernehmer muss mit [Stöck](./expressions_stoecke)-, [Weis](./weis_rules_general)- und [Kartenpunkten](./general_card_values) mindestens 1 Punkt mehr als sein Gegner erzielen
• Gelingt dies, schreiben beide Spieler ihre erzielten Punkte
• Andernfalls schreibt der Gegner alle Punkte beider Spieler

Besondere Weisregeln:
• Entgegen den allgemeinen Weisregeln können beim Cinq Cents 4 Neuner und 4 Banner (Zehner) nicht gewiesen werden
• Gleich hohe [Weisen](./weis_rules_general) heben sich gegenseitig auf

Matsch-Bonus:
Erzielt ein Spieler alle 9 [Stiche](./expressions_stich), kann er zusätzlich 100 Punkte zu seinen Kartenpunkten zählen. Der [letzte Stich](./letzter_stich) zählt 10 Punkte.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Karten erhält jeder Spieler zu Beginn beim Cinq Cents?",
    "answer": "Jeder Spieler erhält vorerst 6 Karten. Erst bei einer Spielübernahme werden nochmals je 3 Karten ausgeteilt."
  },
  {
    "question": "Wie viele Karten werden beim Cinq Cents gespielt?",
    "answer": "Gespielt wird mit 32 Karten (ohne Sechser)."
  },
  {
    "question": "Wie viele Punkte erhält man, wenn man alle 9 Stiche macht?",
    "answer": "Erzielt ein Spieler alle 9 Stiche, kann er zusätzlich 100 Punkte zu seinen Kartenpunkten zählen. Der letzte Stich zählt 10 Punkte."
  },
  {
    "question": "Können beim Cinq Cents 4 Neuner oder 4 Banner gewiesen werden?",
    "answer": "Nein, entgegen den allgemeinen Weisregeln können beim Cinq Cents 4 Neuner und 4 Banner (Zehner) nicht gewiesen werden."
  },
  {
    "question": "Was passiert, wenn beide Spieler verzichten?",
    "answer": "Verzichten beide Spieler auf die gezeigte Trumpffarbe, kann das Spiel mit einer der anderen 3 Farben als Trumpf übernommen werden."
  }
]
```

---
id: `variants_two_player_schmaus`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Schmaus ist ein strategisches [Kartenspiel](./general_card_basics) für zwei Spieler mit besonderem Fokus auf [Stock](./expressions_stapel)-Aufnahme und «aufwärts weisen».

Spiel geben:
• Der Spielgeber verteilt je 9 [Karten](./general_card_basics)
• Die restlichen 18 Karten bilden den Stock, dessen oberste Karte aufgedeckt wird und die [Trumpffarbe](./general_trump_values) anzeigt
• Sie kann mit dem [Trumpf-Sechser](./general_trump_values) vor jedem eigenen [Ausspiel](./ausspiel) [geraubt](./expressions_rauben) werden

Weisen mit Stock:
• Solange noch Karten vom Stock vorhanden sind, darf bei jedem [Stich](./expressions_stich) neu [gewiesen](./weis_rules_general) werden
• Dabei zählt nur der höhere [Weis](./weis_rules_general) pro Stich
• Gewiesen werden darf nur «aufwärts», d.h., nach einem Dreiblatt vom König darf im nächsten Ausspiel kein Dreiblatt von einem [Ober](./expressions_basic_terms) ([Dame](./expressions_basic_terms)) der gleichen Farbe gewiesen werden

Spielablauf während Stock-Phase:
• [Vorhand](./expressions_vorhand) spielt zum ersten Stich aus
• Nach jedem Stich nimmt zuerst der Spieler, dem der Stich gehört, anschliessend sein Gegner verdeckt eine Karte vom Stock auf
• Entgegen den allgemeinen Jassregeln muss beim Aufnehmen der Karten weder gefarbt noch [Trumpf](./general_trump_values) angegeben werden

Spielablauf nach Stock:
• Sobald der Stock aufgebraucht ist, muss gefarbt werden
• Solange «Leih» gehalten werden kann, darf nicht mit Trumpf gestochen werden
• Wer von der ausgespielten Farbe keine Karte hat, muss mit Ausnahme des [Trumpf-Bauers](./expressions_trumpf_bauer) ([Under](./expressions_trumpf_bauer)) mit Trumpf stechen

Matsch-Prämie:
Wer nach Aufbrauchen des Stocks alle weiteren Stiche erzielt, erhält zusätzlich eine Prämie von 100 Punkte. Der [letzte Stich](./letzter_stich) zählt 5 Punkte.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet «aufwärts weisen» beim Schmaus?",
    "answer": "Gewiesen werden darf nur «aufwärts», d.h., nach einem Dreiblatt vom König darf im nächsten Ausspiel kein Dreiblatt von einem Ober der gleichen Farbe gewiesen werden."
  },
  {
    "question": "Muss ich während der Stock-Phase gefarbt werden?",
    "answer": "Nein, entgegen den allgemeinen Jassregeln muss beim Aufnehmen der Karten vom Stock weder gefarbt noch Trumpf angegeben werden."
  },
  {
    "question": "Wie viele Punkte erhält man, wenn man nach Stock-Aufbrauchen alle Stiche macht?",
    "answer": "Wer nach Aufbrauchen des Stocks alle weiteren Stiche erzielt, erhält zusätzlich eine Prämie von 100 Punkten. Der letzte Stich zählt 5 Punkte."
  },
  {
    "question": "Kann ich während der Stock-Phase bei jedem Stich neu weisen?",
    "answer": "Ja, solange noch Karten vom Stock vorhanden sind, darf bei jedem Stich neu gewiesen werden, dabei zählt nur der höhere Weis pro Stich."
  }
]
```

---
id: `variants_three_player_mittlere`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Mittlere ist ein spannendes [Spiel](./general_game_basics) zu dritt, bei dem die [Trumpffarbe](./general_trump_values) erst durch die erste Fehlfarbe bestimmt wird.

Grundregeln:
• Diese Jassart kann nur zu dritt gespielt werden
• Jeder Spieler erhält 12 [Karten](./general_card_basics)
• Jeder spielt für sich, [Stöck](./expressions_stoecke)- und [Weispunkte](./expressions_weispunkte) zählen nicht

Spielablauf:
• Vorerst wird ein [Obenabe](./expressions_obenabe) gespielt, d.h. ohne Trumpffarbe
• Die [Kartenwerte](./general_card_values) zählen dabei jedoch wie bei einem [Trumpfspiel](./general_trump_values)
• Wer im laufenden [Stich](./expressions_stich) eine oder mehrere Karten von der ausgespielten Farbe hat, muss diese spielen

Trumpfbestimmung:
• Wer keine Karte in der ausgespielten Farbe hat, kann die Trumpffarbe bestimmen
• Die erste Fehlfarbe wird somit zur Trumpffarbe, die dann bis zum Ende des Spiels gilt
• Sobald die Trumpffarbe bekannt ist, kann auch mit [Trumpf](./general_trump_values) eingestochen werden

Schreiben:
• Pro Spiel werden immer 2 [Striche](./schreiben) und 2 [Nuller](./expressions_nuller) verteilt
• Die beiden Spieler mit der höchsten und der niedrigsten [Punktzahl](./general_scoring_rules) erhalten nach jedem Spiel je 1 Strich
• Der Spieler mit der mittleren Punktzahl erhält 2 Nuller

Besondere Regeln:
• Können alle Spieler in allen 12 Stichen farben und kann deswegen keine Trumpffarbe bestimmt werden, wird das Spiel annulliert
• Wer 100 und mehr [Kartenpunkte](./general_card_values) erreicht, muss sich 2 Nuller notieren lassen und seine Mitspieler erhalten je 1 Strich
• Wer nicht mindestens 1 Stich erzielt, erhält 2 Nuller
• Ein [Matschspiel](./matsch) wird mit 2 Strichen belohnt
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie wird die Trumpffarbe beim Mittlere bestimmt?",
    "answer": "Die Trumpffarbe wird durch die erste Fehlfarbe bestimmt: Wer keine Karte in der ausgespielten Farbe hat, kann die Trumpffarbe bestimmen."
  },
  {
    "question": "Wie viele Striche und Nuller werden pro Spiel verteilt?",
    "answer": "Pro Spiel werden immer 2 Striche und 2 Nuller verteilt: Die beiden Spieler mit höchster und niedrigster Punktzahl erhalten je 1 Strich, der Spieler mit mittlerer Punktzahl erhält 2 Nuller."
  },
  {
    "question": "Was passiert, wenn alle Spieler in allen 12 Stichen farben können?",
    "answer": "Kann keine Trumpffarbe bestimmt werden, wird das Spiel annulliert."
  },
  {
    "question": "Wie viele Punkte brauche ich, um 2 Nuller zu erhalten?",
    "answer": "Wer 100 und mehr Kartenpunkte erreicht, muss sich 2 Nuller notieren lassen, oder wer keinen Stich erzielt, erhält ebenfalls 2 Nuller."
  }
]
```

---
id: `variants_three_player_aucho`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Aucho ist ein traditionelles [Spiel](./general_game_basics) für vier Spieler (auch drei oder zwei Spieler sind möglich), bei dem ein sogenannter «[Lukas](./expressions_lukas)» als [Stock](./expressions_stapel) fungiert.

Spiel geben:
• Der Spielgeber verteilt seinen drei Mitspielern je neun [Karten](./general_card_basics)
• Die restlichen neun Karten bilden den «Lukas» und werden verdeckt als Stock auf den Tisch gelegt, wobei die unterste Karte aufgedeckt wird
• Der Spielgeber selbst erhält keine Karten

Spielablauf - Trumpf machen:
• Wenn [Vorhand](./expressions_vorhand) das Spiel übernimmt, kann er eine beliebige Farbe als [Trumpf](./general_trump_values) wählen
• Er muss am Ende mindestens einen Punkt mehr als seine beiden Gegner zusammen erzielen
• Verzichtet Vorhand, geht das Recht auf den zweiten, dann den dritten Spieler über

Spielablauf - «[Kehr](./expressions_kehr)»:
• Anstatt Trumpf zu machen kann jeder Spieler einen «Kehr» verlangen
• Der Spielgeber muss dann die Karten des «Lukas» einzeln von oben nach unten aufdecken
• Dabei kann jede Karte (ausser der letzten) vom Sechser der gleichen Farbe [geraubt](./expressions_rauben) werden
• Jeder Spieler kann beim Erscheinen einer ihm zusagenden Farbe «Halt» sagen und das Spiel in der betreffenden Farbe übernehmen

Spielgeber-Spiel mit «Lukas»:
• Wenn weder Trumpf gemacht noch ein «Kehr» verlangt wird, hat der Spielgeber das Recht, mit dem «Lukas» das Spiel zu übernehmen
• Er spielt mit diesem Stock gegen die drei Mitspieler

Schreiben:
• Wer ein Spiel gewinnt, erhält zwei [Striche](./schreiben), der Spielgeber «[erbt](./expressions_erben)» dabei ebenfalls zwei Striche
• Gewinnt ein Spieler den «Lukas», werden ihm vier Striche gutgeschrieben
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der «Lukas» beim Aucho?",
    "answer": "Der «Lukas» sind die neun restlichen Karten, die verdeckt als Stock auf den Tisch gelegt werden. Der Spielgeber erhält diese Karten nicht."
  },
  {
    "question": "Wie viele Striche erhält man, wenn man mit dem «Lukas» gewinnt?",
    "answer": "Gewinnt ein Spieler den «Lukas», werden ihm vier Striche gutgeschrieben. Gewinnt ein normaler Spieler, erhält er zwei Striche, der Spielgeber «erbt» dabei ebenfalls zwei Striche."
  },
  {
    "question": "Was ist ein «Kehr» beim Aucho?",
    "answer": "Ein «Kehr» kann verlangt werden, um die Karten des «Lukas» einzeln aufzudecken. Erscheint eine passende Farbe, kann das Spiel mit dieser Farbe als Trumpf übernommen werden."
  },
  {
    "question": "Was passiert, wenn weder Trumpf gemacht noch ein Kehr verlangt wird?",
    "answer": "In diesem Fall hat der Spielgeber das Recht, mit dem «Lukas» das Spiel zu übernehmen und gegen die drei Mitspieler zu spielen."
  }
]
```

---
id: `variants_strategic_differenzler_offen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Beim Differenzler mit offener Ansage für vier Spieler (auch mit drei Spielern möglich) spielt jeder Teilnehmer gegen jeden anderen. Vor Beginn des Spiels schätzt jeder Spieler basierend auf seiner [Handkarte](./expressions_handkarten), wie viele [Kartenpunkte](./general_card_values) er am Ende erzielen wird.

Besonderheit offene Ansage:
Bei der offenen Ansage kennen alle Spieler die Schätzwerte ihrer Mitspieler.

Grundregeln:
• Ein vollständiges [Spiel](./general_game_basics) umfasst 152 Kartenpunkte plus fünf Punkte für den [letzten Stich](./letzter_stich), insgesamt also 157 Punkte (ein [Matsch](./matsch) zählt ebenfalls 157 Punkte)
• Alle [Trumpffarben](./general_trump_values) werden einfach gewertet, [Stöck](./expressions_stoecke)- und [Weispunkte](./expressions_weispunkte) können nicht gemeldet werden
• Die unterste Karte des [Stapels](./expressions_stapel) bestimmt die Trumpffarbe und kann nicht [geraubt](./expressions_rauben) werden

Ansage:
• [Vorhand](./expressions_vorhand) beginnt mit der ersten Schätzansage, danach melden die nachfolgenden Spieler der Reihe nach ihre geschätzten Punktzahlen
• Der Spielgeber macht als Letzter seine Ansage

Spielregeln:
• Beim Differenzler dürfen Spieler ihre eigenen gekehrten [Stiche](./expressions_stich) nochmals einsehen
• [Untertrumpfen](./untertrumpfen) ist erlaubt, sofern man keine Karte der ausgespielten Farbe besitzt

Bewertung:
• Nach dem Spiel zählt jeder Teilnehmer seine tatsächlich erzielten Kartenpunkte
• Der Schreiber notiert für jeden Spieler die Differenz zwischen angesagter und tatsächlich erreichter Punktzahl
• Wer seine vorhergesagte Punktzahl exakt trifft, erhält eine Gutschrift von zehn Minuspunkten (gilt nicht, wenn null Punkte angesagt wurden)

Spielende:
Nach 16 Spielen wird die abschliessende Rangliste erstellt. Gewinner ist der Spieler mit dem niedrigsten Differenz-Total.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Unterschied zwischen offener und verdeckter Ansage beim Differenzler?",
    "answer": "Bei der offenen Ansage kennen alle Spieler die Schätzwerte ihrer Mitspieler, während bei der verdeckten Ansage die Schätzwerte geheim gehalten werden."
  },
  {
    "question": "Wie viele Punkte umfasst ein vollständiges Spiel beim Differenzler?",
    "answer": "Ein vollständiges Spiel umfasst 152 Kartenpunkte plus fünf Punkte für den letzten Stich, insgesamt also 157 Punkte."
  },
  {
    "question": "Was passiert, wenn ich meine Punktzahl genau treffe?",
    "answer": "Wer seine vorhergesagte Punktzahl exakt trifft, erhält eine Gutschrift von zehn Minuspunkten (gilt nicht, wenn null Punkte angesagt wurden)."
  },
  {
    "question": "Wie viele Spiele umfasst eine Differenzler-Partie?",
    "answer": "Nach 16 Spielen wird die abschliessende Rangliste erstellt. Gewinner ist der Spieler mit dem niedrigsten Differenz-Total."
  },
  {
    "question": "Können Stöck- und Weispunkte beim Differenzler gemeldet werden?",
    "answer": "Nein, Stöck- und Weispunkte können nicht gemeldet werden und zählen nicht."
  }
]
```

---
id: `variants_strategic_differenzler_verdeckt`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Differenzler mit verdeckter Ansage für vier Spieler gilt als anspruchsvoll aber fair, da er sowohl mit guten als auch mit schwächeren [Handkarten](./expressions_handkarten) gewonnen werden kann.

Besonderheit verdeckte Ansage:
• Bei der verdeckten Ansage kennen die Mitspieler die Schätzwerte der anderen nicht
• Jeder Spieler schreibt seine geschätzte Punktzahl auf einen persönlichen Zettel
• Diese Schätzzettel werden bis zum Spielende verdeckt unter den Jassteppich gelegt

Schätzung:
• Basierend auf den erhaltenen [Karten](./general_card_basics) muss vor Spielbeginn abgeschätzt werden, wie viele [Kartenpunkte](./general_card_values) erzielt werden können
• Für eine möglichst präzise Schätzung zählt man die Werte der [Trumpfkarten](./general_trump_values) doppelt und addiert für jeden möglichen [Stich](./expressions_stich) mit einem Ass zusätzlich elf Punkte

Spielstrategie:
• Neben der Genauigkeit der Schätzung ist auch das taktische Spielen auf die angesagte Punktzahl entscheidend
• Es ist vorteilhaft, Karten, die einen Stich versprechen, möglichst früh im Spielverlauf einzusetzen, um später mit schwächeren Karten aussteigen zu können
• Eine Schlüsselkarte ist der [Trumpf-Bauer](./expressions_trumpf_bauer) ([Under](./expressions_trumpf_bauer)), da er beim Trumpfausspiel nicht extra angemeldet werden muss
• Er sollte für einen strategisch wichtigen Moment zurückgehalten werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Unterschied zwischen verdeckter und offener Ansage beim Differenzler?",
    "answer": "Bei der verdeckten Ansage kennen die Mitspieler die Schätzwerte der anderen nicht. Jeder Spieler schreibt seine geschätzte Punktzahl auf einen Zettel, der bis zum Spielende verdeckt bleibt."
  },
  {
    "question": "Wie schätzt man am besten beim Differenzler mit verdeckter Ansage?",
    "answer": "Für eine präzise Schätzung zählt man die Werte der Trumpfkarten doppelt und addiert für jeden möglichen Stich mit einem Ass zusätzlich elf Punkte."
  },
  {
    "question": "Warum ist der Trumpf-Bauer beim Differenzler so wichtig?",
    "answer": "Der Trumpf-Bauer ist eine Schlüsselkarte, da er beim Trumpfausspiel nicht extra angemeldet werden muss und für einen strategisch wichtigen Moment zurückgehalten werden sollte."
  },
  {
    "question": "Ist der Differenzler mit verdeckter Ansage fair?",
    "answer": "Ja, er gilt als anspruchsvoll aber fair, da er sowohl mit guten als auch mit schwächeren Handkarten gewonnen werden kann."
  }
]
```

---
id: `variants_specialty_hindersi`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Beim [Hindersi](./expressions_hindersi)-Jass für vier Spieler (auch mit drei Spielern möglich) geht es darum, möglichst wenige Punkte zu sammeln, was eine Umkehrung der üblichen Jasszielsetzung darstellt.

Grundregeln:
• Die unterste Karte des [Stapels](./expressions_stapel) bestimmt die [Trumpffarbe](./general_trump_values) und kann nicht [geraubt](./expressions_rauben) werden
• Jeder Spieler versucht, möglichst wenige [Kartenpunkte](./general_card_values) zu erzielen
• Gelingt es jedoch einem Spieler, alle [Stiche](./expressions_stich) zu machen, werden allen anderen Spielern 157 Punkte belastet

Besondere Regeln:
• [Stöck](./expressions_stoecke)- und [Weispunkte](./expressions_weispunkte) können nicht gemeldet werden und zählen somit nicht
• [Untertrumpfen](./untertrumpfen) ist erlaubt, sofern man keine Karte der ausgespielten Farbe besitzt
• Wird festgestellt, dass jemand absichtlich nicht gefarbt hat, um einen wertvollen Stich zu vermeiden, wird dies mit einer Strafe von 100 Punkten geahndet

Schreiben und Partie:
• Nach jedem Spiel zählt jeder Spieler seine eigenen Kartenpunkte
• Ein Umgang besteht aus vier Spielen und entspricht einer [Partie](./expressions_partie)

Schreiben bei vier Spielern:
• Die beiden Spieler mit dem niedrigsten Gesamtwert erhalten je einen [Strich](./schreiben)
• Die beiden Spieler mit dem zweithöchsten und höchsten Total bekommen je einen [Nuller](./expressions_nuller) eingetragen

Schreiben bei drei Spielern:
• Der Spieler mit dem niedrigsten Total erhält einen Strich, der mit dem höchsten Total einen Nuller
• Der Spieler mit dem mittleren Resultat geht leer aus

Spielende:
Nach vier Partien wird die Abrechnung vorgenommen. Gewinner ist der Spieler mit den meisten Strichen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist das Ziel beim Hindersi?",
    "answer": "Beim Hindersi geht es darum, möglichst wenige Punkte zu sammeln, was eine Umkehrung der üblichen Jasszielsetzung darstellt."
  },
  {
    "question": "Wie viele Punkte werden allen anderen Spielern belastet, wenn einer alle Stiche macht?",
    "answer": "Gelingt es einem Spieler, alle Stiche zu machen, werden allen anderen Spielern 157 Punkte belastet."
  },
  {
    "question": "Was passiert, wenn man beim Hindersi absichtlich nicht färbt?",
    "answer": "Wird festgestellt, dass jemand absichtlich nicht gefarbt hat, um einen wertvollen Stich zu vermeiden, wird dies mit einer Strafe von 100 Punkten geahndet."
  },
  {
    "question": "Wie viele Partien werden beim Hindersi gespielt?",
    "answer": "Nach vier Partien wird die Abrechnung vorgenommen. Gewinner ist der Spieler mit den meisten Strichen."
  },
  {
    "question": "Wie unterscheidet sich die Strich-Verteilung bei drei und vier Spielern?",
    "answer": "Bei vier Spielern erhalten die beiden Spieler mit niedrigstem Wert je einen Strich, die anderen je einen Nuller. Bei drei Spielern erhält nur der niedrigste einen Strich, der höchste einen Nuller, der mittlere geht leer aus."
  }
]
```

---
id: `variants_strategic_handjass`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Handjass, auch als Butzer, Sackjass oder Schläger bekannt, ist ein klassischer Einzeljass für vier Spieler, der aber auch mit drei oder zwei Spielern gespielt werden kann.

Grundprinzip:
• Beim Handjass spielt jeder Teilnehmer für sich allein
• Die unterste Karte des [Stapels](./expressions_stapel) bestimmt die [Trumpffarbe](./general_trump_values) und kann nicht [geraubt](./expressions_rauben) werden

Spielentscheidung:
• [Vorhand](./expressions_vorhand) entscheidet als Erster, ob er mitspielen will oder nicht, danach entscheiden die nachfolgenden Spieler der Reihe nach
• Spieler, die keine realistische Chance auf ein erfolgreiches Spiel sehen, können passen, indem sie «[fort](./expressions_fort)» oder «ich passe» sagen
• Wer sich noch unsicher ist, kann zunächst «eventuell» oder «i lose» (ich höre) melden und muss sich dann erst im zweiten Umgang endgültig entscheiden
• Mindestens zwei Spieler müssen erklären, dass sie mit ihren [Handkarten](./expressions_handkarten) «kommen» möchten
• Kommen nicht mindestens zwei Spieler zusammen, wird das Spiel vom nachfolgenden Spieler neu gegeben

Schreiben - Handjass/Butzer/Sackjass:
• Die beiden Spieler, die pro Spiel die meisten [Karten](./general_card_basics)- und [Weispunkte](./expressions_weispunkte) erzielen, erhalten je einen [Strich](./schreiben)
• Wer weniger als 21 Punkte erreicht, erhält einen «[Sack](./expressions_sack)» ([Härdöpfel](./expressions_haerdoepfel)) eingetragen
• Dieser kann im weiteren Spielverlauf durch einen Strich wieder ausgeglichen werden

Schreiben - Schläger:
• Beim Schläger werden bei vier Spielern drei Striche verteilt
• Wer das Mindestziel von 26 Punkten nicht erreicht, bekommt einen «Härdöpfel» eingetragen

Spielende:
• Eine [Partie](./expressions_partie) wird auf sieben Striche gespielt
• Wer dieses Ziel erreicht, gewinnt und scheidet aus dem Spiel aus, während die übrigen Spieler weiterspielen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Spieler müssen beim Handjass mitspielen?",
    "answer": "Mindestens zwei Spieler müssen erklären, dass sie mit ihren Handkarten «kommen» möchten. Kommen nicht mindestens zwei Spieler zusammen, wird das Spiel neu gegeben."
  },
  {
    "question": "Was bedeutet «eventuell» oder «i lose» beim Handjass?",
    "answer": "Wer sich noch unsicher ist, kann zunächst «eventuell» oder «i lose» (ich höre) melden und muss sich dann erst im zweiten Umgang endgültig entscheiden."
  },
  {
    "question": "Wie viele Punkte brauche ich mindestens für einen Strich beim Handjass?",
    "answer": "Bei Handjass/Butzer/Sackjass müssen mindestens 21 Punkte erreicht werden. Wer weniger erreicht, erhält einen «Sack» (Härdöpfel). Beim Schläger beträgt das Mindestziel 26 Punkte."
  },
  {
    "question": "Wie viele Striche brauche ich zum Sieg beim Handjass?",
    "answer": "Eine Partie wird auf sieben Striche gespielt. Wer dieses Ziel erreicht, gewinnt und scheidet aus dem Spiel aus."
  },
  {
    "question": "Kann ich den «Sack» wieder ausgleichen?",
    "answer": "Ja, der «Sack» kann im weiteren Spielverlauf durch einen Strich wieder ausgeglichen werden."
  }
]
```

---
id: `variants_multi_player_ramset`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Beim Ramset für 2 bis 6 Spieler geht es in einigen Landesgegenden nicht nur ums Jassen, sondern wortwörtlich auch um die Wurst. Nach alter Tradition wird in der Altjahrswoche in den Landbeizen um Würste gespielt.

Kartenspiel und Geben:
• Gespielt wird mit 32 [Karten](./general_card_basics) (ohne Sechser)
• Jeder Spieler erhält 5 Karten
• Bei 5 und weniger Spielern wird mit einem «[Blinden](./expressions_blinder)» gespielt
• Die oberste Karte des [Stocks](./expressions_stapel) zeigt die [Trumpffarbe](./general_trump_values) an

Stechwerte:
• Der stechhöchste [Trumpf](./general_trump_values) ist das Ass
• Der «[Belli](./expressions_belli)» ([Schellen](./expressions_schelle)-Siebener/[Ecken](./expressions_ecken)-Siebener) ist bei jeder Trumpffarbe die zweithöchste Stechkarte
• Danach folgen König, [Ober](./expressions_basic_terms) ([Dame](./expressions_basic_terms)), [Under](./expressions_trumpf_bauer) ([Bube](./expressions_trumpf_bauer)), [Banner](./expressions_banner) ([Zehner](./expressions_banner)), Neuner, Achter und Siebner der jeweiligen Trumpffarbe

Spielentscheidung:
• Jeder Spieler muss sich vor Spielbeginn entscheiden, ob er mitspielen will oder nicht
• [Vorhand](./expressions_vorhand) kann als Erster den «Blinden» gegen sein eigenes Blatt tauschen
• Der Spielgeber kann die aufgedeckte Trumpfkarte [rauben](./expressions_rauben)

Spielregeln:
• Falls Vorhand das Trumpf-Ass hat, muss er mit dieser Karte beginnen
• Beim Ramset gilt «Leihhalten» oder Trumpf: Solange «Leih» gehalten werden kann, darf nicht mit Trumpf gestochen werden

Bewertung:
• Beim Ramset zählen nicht die Punkte, sondern die Anzahl [Stiche](./expressions_stich)
• Jedem Spieler wird pro Stich 1 [Strich](./schreiben) notiert
• Wer mitspielt und keinen Stich macht, erhält einen «[Härdöpfel](./expressions_haerdoepfel)»
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Karten werden beim Ramset gespielt?",
    "answer": "Gespielt wird mit 32 Karten (ohne Sechser). Jeder Spieler erhält 5 Karten."
  },
  {
    "question": "Was ist ein «Belli» beim Ramset?",
    "answer": "Der «Belli» ist der Schellen-Siebener oder Ecken-Siebener und ist bei jeder Trumpffarbe die zweithöchste Stechkarte (nach dem Ass)."
  },
  {
    "question": "Was zählt beim Ramset - Punkte oder Stiche?",
    "answer": "Beim Ramset zählen nicht die Punkte, sondern die Anzahl Stiche. Jedem Spieler wird pro Stich 1 Strich notiert."
  },
  {
    "question": "Was passiert, wenn ich keinen Stich mache?",
    "answer": "Wer mitspielt und keinen Stich macht, erhält einen «Härdöpfel»."
  },
  {
    "question": "Muss Vorhand mit dem Trumpf-Ass beginnen?",
    "answer": "Ja, falls Vorhand das Trumpf-Ass hat, muss er mit dieser Karte beginnen."
  }
]
```

---
id: `variants_multi_player_rumba`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Rumba ist ein Glücksspiel für 3 bis 5 Spieler, das in der Regel zu viert gespielt wird. Wegen des Stechzwangs kann der Spielverlauf nur geringfügig durch Können beeinflusst werden, weshalb Glück beim Rumba eine wichtige Rolle spielt.

Kartenspiel und Geben:
• Dieses [Stichspiel](./general_gameplay) wird mit 36 [Karten](./general_card_basics) gespielt
• Jeder Spieler erhält vorerst 5 Karten
• Die oberste Karte des [Stocks](./expressions_stapel) zeigt die [Trumpffarbe](./general_trump_values) an

Stechwerte:
Die Reihenfolge der Stechwerte entspricht dem [Obenabe](./expressions_obenabe): Ass, König, [Ober](./expressions_basic_terms) ([Dame](./expressions_basic_terms)), [Under](./expressions_trumpf_bauer) ([Bube](./expressions_trumpf_bauer)), [Banner](./expressions_banner) ([Zehner](./expressions_banner)), Neuner, Achter, Siebner, Sechser.

Spielübernahme:
• Nachdem die Trumpffarbe bekannt ist, fragt der Spielgeber jeden Mitspieler, ob er am Spiel teilnimmt
• Im ersten Umgang wird geklärt, ob ein Spieler einen «Rumba» übernehmen will
• Mit guten [Handkarten](./expressions_handkarten) kann ein «Rumba» angemeldet werden: Wer einen «Rumba» meldet, muss mit seinen 5 Handkarten mindestens 3 [Stiche](./expressions_stich) machen
• Wenn niemand einen «Rumba» übernehmen will, wird nach einem einfachen Spiel gefragt: Wer ein einfaches Spiel übernimmt, muss mindestens 2 Stiche machen

Bewertung:
• Bei einem erfolgreichen «Rumba» erhält der Spielübernehmer pro Stich 2 Pluspunkte
• Bei einem einfachen Spiel erhält er 1 Pluspunkt pro Stich
• Die übrigen aktiven Spieler erhalten 1 Pluspunkt pro gemachten Stich
• Geht ein «Rumba» verloren, erhält der Spielübernehmer 10 Minuspunkte
• Bei einem verlorenen einfachen Spiel erhält er 5 Minuspunkte
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Karten erhält jeder Spieler beim Rumba?",
    "answer": "Jeder Spieler erhält vorerst 5 Karten."
  },
  {
    "question": "Wie viele Stiche muss man beim «Rumba» mindestens machen?",
    "answer": "Wer einen «Rumba» meldet, muss mit seinen 5 Handkarten mindestens 3 Stiche machen."
  },
  {
    "question": "Wie viele Stiche braucht man beim einfachen Spiel?",
    "answer": "Wer ein einfaches Spiel übernimmt, muss mindestens 2 Stiche machen."
  },
  {
    "question": "Was passiert, wenn ein «Rumba» verloren geht?",
    "answer": "Geht ein «Rumba» verloren, erhält der Spielübernehmer 10 Minuspunkte. Bei einem verlorenen einfachen Spiel erhält er 5 Minuspunkte."
  },
  {
    "question": "Warum ist Glück beim Rumba so wichtig?",
    "answer": "Wegen des Stechzwangs kann der Spielverlauf nur geringfügig durch Können beeinflusst werden, weshalb Glück beim Rumba eine wichtige Rolle spielt."
  }
]
```

---
id: `variants_multi_player_zwick_jass`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Zwick-Jass wird in der Regel zu viert gespielt und ist ein geselliges Spiel mit besonderen Regeln zum «[Schlecken](./expressions_schlecken)» und «[Schieben](./expressions_schieben)».

Kartenspiel und Geben:
• Gespielt wird mit 28 [Karten](./general_card_basics), wobei Sechser und Achter entfernt werden
• Der Spielgeber legt die gemischten Karten verdeckt als [Stapel](./expressions_stapel) auf den Tisch und lässt sie vom links sitzenden Spieler [abheben](./abheben)

Schlecken:
• Dieser kann bis zu fünf Karten des [Ablupfs](./expressions_ablupf) «schlecken», das heisst, die jeweils unterste Karte des Stapels einsehen, und falls sie wertvoll ist, für sich behalten
• «Schleckt» er keine Karte, kann der Spielgeber mit dem gleichen Ablupf bis zu fünf Karten «schlecken»

Stechwerte:
• Die stechhöchste Karte ist stets das [Trumpf](./general_trump_values)-Ass
• Danach folgen die «[Bellis](./expressions_belli)» (die Siebener von [Schellen](./expressions_schelle), [Schilten](./expressions_schilte), [Rosen](./expressions_rose), [Eichel](./expressions_eichel))
• Anschliessend folgen König, [Ober](./expressions_basic_terms) ([Dame](./expressions_basic_terms)), [Under](./expressions_trumpf_bauer) ([Bauer](./expressions_trumpf_bauer)), [Banner](./expressions_banner) ([Zehner](./expressions_banner)) und Neuner der jeweiligen [Trumpffarbe](./general_trump_values)

Trumpfwahl durch Schieben:
• Der Spielgeber schiebt den [Stock](./expressions_stapel) zum nachfolgenden Spieler
• Dieser kann die oberste Karte aufdecken und als Trumpffarbe wählen
• Ist er nicht zufrieden, kann er die nächste Karte aufdecken
• Hat er keine Aussicht auf mindestens einen [Stich](./expressions_stich), schiebt er den Stock weiter
• Wer eine Karte aufdeckt und damit die Trumpffarbe bestimmt, muss mitspielen
• Verzichten alle Mitspieler auf eine Spielteilnahme, erhält der trumpfaufdeckende Spieler fünf [Striche](./schreiben) gutgeschrieben

Bewertung:
• Für jeden Stich wird ein Strich notiert
• Wer mitspielt, aber keinen Stich erzielt, erhält einen «[Vogel](./expressions_vogel)» (fünf Minusstriche)

Spielende:
Gewonnen hat, wer zuerst 16 Striche «erzwickt» und sämtliche «Vögel» abverdient hat.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet «Schlecken» beim Zwick-Jass?",
    "answer": "«Schlecken» bedeutet, bis zu fünf Karten des Ablupfs einzusehen (die jeweils unterste Karte des Stapels) und falls sie wertvoll ist, für sich zu behalten."
  },
  {
    "question": "Was sind «Bellis» beim Zwick-Jass?",
    "answer": "Die «Bellis» sind die Siebener von Schellen, Schilten, Rosen und Eichel. Sie sind die zweithöchsten Stechkarten (nach dem Trumpf-Ass)."
  },
  {
    "question": "Was ist ein «Vogel» beim Zwick-Jass?",
    "answer": "Ein «Vogel» sind fünf Minusstriche. Wer mitspielt, aber keinen Stich erzielt, erhält einen «Vogel»."
  },
  {
    "question": "Wie viele Striche brauche ich zum Sieg beim Zwick-Jass?",
    "answer": "Gewonnen hat, wer zuerst 16 Striche «erzwickt» und sämtliche «Vögel» abverdient hat."
  },
  {
    "question": "Was passiert, wenn alle Mitspieler verzichten?",
    "answer": "Verzichten alle Mitspieler auf eine Spielteilnahme, erhält der trumpfaufdeckende Spieler fünf Striche gutgeschrieben."
  }
]
```

---
id: `variants_specialty_hindersi_drei`
---

**Bereinigter Haupttext:**
```markdown
Definition:
[Hindersi](./expressions_hindersi)-Jass für 3 Spieler ist ein Dreier-Vermeidungsspiel, bei dem es darum geht, möglichst wenige [Kartenpunkte](./general_card_values) zu erspielen.

Spiel geben:
Jedem Spieler werden 12 [Karten](./general_card_basics) (3 x 4 Karten) verteilt.

Spielablauf:
• Wie beim Hindersi-Jass für 4 Spieler versucht jeder Spieler, möglichst wenige Kartenpunkte zu erspielen
• Kann ein Spieler alle [Stiche](./expressions_stich) machen, werden allen anderen Spielern je 157 Punkte belastet

Schreiben:
• Ein Umgang, also 3 Spiele, entspricht einer [Partie](./expressions_partie)
• Der Spieler mit dem niedrigsten Total erhält 1 [Strich](./schreiben), der mit dem höchsten Total 1 [Nuller](./expressions_nuller)
• Der Spieler mit dem mittleren Resultat geht leer aus

Spielende:
• Nach beispielsweise 4 Partien (oder 8 Partien, je nach Vereinbarung) wird abgerechnet
• Gewonnen hat der Spieler mit den meisten Strichen

Übrige Regeln:
Im Übrigen gelten die gleichen Regeln wie beim Hindersi-Jass für 4 Spieler.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Karten erhält jeder Spieler beim Hindersi für 3 Spieler?",
    "answer": "Jedem Spieler werden 12 Karten (3 x 4 Karten) verteilt."
  },
  {
    "question": "Wie viele Spiele umfasst eine Partie beim Hindersi für 3 Spieler?",
    "answer": "Ein Umgang, also 3 Spiele, entspricht einer Partie."
  },
  {
    "question": "Welche Spieler erhalten einen Strich oder Nuller?",
    "answer": "Der Spieler mit dem niedrigsten Total erhält 1 Strich, der mit dem höchsten Total 1 Nuller. Der Spieler mit dem mittleren Resultat geht leer aus."
  },
  {
    "question": "Was passiert, wenn ein Spieler alle Stiche macht?",
    "answer": "Kann ein Spieler alle Stiche machen, werden allen anderen Spielern je 157 Punkte belastet."
  }
]
```

---
id: `variants_strategic_palette_jass`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Palette-Jass ist eine abwechslungsreiche Jassart für fortgeschrittene [Schieber](./schieber_taktiken_basics)-Spieler (4 oder 5 Spieler).

Spiel geben:
• Ein beliebiger Schreiber verteilt die [Karten](./general_card_basics) zum ersten Spiel
• Bei vier Spielern: je drei Karten in drei Runden
• Bei fünf Spielern: abwechselnd drei und vier Karten (der Rosen-Siebener bzw. Kreuz-Siebener wird aus dem Spiel entfernt)

Bieten ([Steigern](./expressions_passe)):
• Nach dem Verteilen der Karten wird gesteigert
• [Vorhand](./expressions_vorhand) beginnt und macht anhand seiner [Handkarten](./expressions_handkarten) ein Gebot über die zu erreichenden [Punkte](./general_scoring_rules) am Ende des Spiels
• Das Mindestgebot beginnt bei 110 Punkten, das von den nachfolgenden Spielern um jeweils mindestens einen Punkt überboten werden kann
• Ein «[Matsch](./matsch) mit Partner» kann nur mit einem «Matsch alleine» überboten werden
• Ein «Matsch alleine» kann nicht überboten werden

Spielablauf:
• Alle Varianten ([Trumpffarben](./general_trump_values), [Obenabe](./expressions_obenabe) und [Undenufe](./expressions_undenufe)) werden einfach gewertet
• [Stöck](./expressions_stoecke)- und [Weispunkte](./expressions_weispunkte) zählen nicht
• Beim Obenabe zählen die Asse (11 Punkte) und die Achter (8 Punkte), beim Undenufe die Sechser (11 Punkte) und die Achter (8 Punkte)

Partner-Bestimmung:
• Der Meistbietende übernimmt das Spiel und kann eine Karte der Gegner verlangen, die ihm für sein Spiel nützlich erscheint
• Wer die verlangte Karte besitzt, wird Partner des Spielübernehmers
• Er darf sich jedoch bis zum [Ausspiel](./ausspiel) dieser Karte nicht anmerken lassen, dass er sie hat

Bewertung:
110 bis 119 Punkte: 2 Schreibpunkte (höhere Wertungen wurden im Original nicht vollständig angegeben)

Spielende:
Nach zwölf Spielen ist die [Partie](./expressions_partie) zu Ende. Gewinner ist der Spieler mit den meisten Punkten.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie hoch ist das Mindestgebot beim Palette-Jass?",
    "answer": "Das Mindestgebot beginnt bei 110 Punkten, das von den nachfolgenden Spielern um jeweils mindestens einen Punkt überboten werden kann."
  },
  {
    "question": "Wie wird der Partner beim Palette-Jass bestimmt?",
    "answer": "Der Meistbietende kann eine Karte der Gegner verlangen. Wer diese Karte besitzt, wird sein Partner, darf sich aber bis zum Ausspiel dieser Karte nicht anmerken lassen, dass er sie hat."
  },
  {
    "question": "Zählen Stöck- und Weispunkte beim Palette-Jass?",
    "answer": "Nein, Stöck- und Weispunkte zählen nicht. Alle Varianten (Trumpffarben, Obenabe und Undenufe) werden einfach gewertet."
  },
  {
    "question": "Wie viele Spiele umfasst eine Palette-Jass-Partie?",
    "answer": "Nach zwölf Spielen ist die Partie zu Ende. Gewinner ist der Spieler mit den meisten Punkten."
  }
]
```

---
id: `variants_strategic_pandur_drei`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Pandur für 3 Spieler ist ein Dreier-Königsspiel mit denselben Steigerungsregeln wie beim [Pandur](./variants_strategic_pandur) für 4 Spieler.

Spiel geben:
• Jeder Spieler erhält 8 [Karten](./general_card_basics) (2 x 4 Karten)
• Der Spielgeber spielt aktiv mit, womit das «[Erben](./expressions_erben)» wegfällt

Steigern:
Die Regeln für das Steigern bleiben gleich wie beim Pandur für 4 Spieler.

Schreiben:
• Da alle drei Spieler aktiv spielen, werden die Schreibpunkte direkt unter den Spielern aufgeteilt
• Der Spielübernehmer erhält die entsprechenden Punkte bei Erfolg, bei Misserfolg die beiden Gegner

Taktik:
• Bei nur drei Spielern ist es schwieriger, sich gegen einen starken Spielübernehmer zu verbünden
• Jeder Spieler muss mehr auf sich allein gestellt agieren

Übrige Regeln:
Im Übrigen gelten die gleichen Regeln wie beim Pandur für 4 Spieler.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Karten erhält jeder Spieler beim Pandur für 3 Spieler?",
    "answer": "Jeder Spieler erhält 8 Karten (2 x 4 Karten)."
  },
  {
    "question": "Kann der Spielgeber beim Pandur für 3 Spieler punkte erben?",
    "answer": "Nein, der Spielgeber spielt aktiv mit, womit das «Erben» wegfällt."
  },
  {
    "question": "Wie unterscheidet sich die Taktik beim Pandur für 3 Spieler?",
    "answer": "Bei nur drei Spielern ist es schwieriger, sich gegen einen starken Spielübernehmer zu verbünden. Jeder Spieler muss mehr auf sich allein gestellt agieren."
  },
  {
    "question": "Sind die Steigerungsregeln anders als beim Pandur für 4 Spieler?",
    "answer": "Nein, die Regeln für das Steigern bleiben gleich wie beim Pandur für 4 Spieler."
  }
]
```

---
id: `variants_strategic_pandur_zwei`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Pandur für 2 Spieler ist ein Zweier-Königsspiel mit besonderem Fokus auf direkte Konfrontation.

Spiel geben:
• Jeder Spieler erhält 8 [Karten](./general_card_basics) (2 x 4 Karten)
• Die restlichen 8 Karten bilden den [Stock](./expressions_stapel), dessen unterste Karte eingesehen werden darf

Steigern:
• Das Bieten erfolgt abwechselnd zwischen den beiden Spielern
• Jeder kann das Gebot des anderen überbieten oder passen
• Die gleichen Ansagewerte gelten wie beim [Pandur](./variants_strategic_pandur) für 4 Spieler

Stock-Regeln:
• Die unterste Karte des Stocks darf eingesehen werden, was zusätzliche Informationen für das Bieten und Spielen liefert
• Der Stock selbst wird nicht gespielt, beeinflusst aber die Taktik

Schreiben:
• Der Gewinner eines Spiels erhält die entsprechenden Schreibpunkte, der Verlierer geht leer aus
• Das macht jeden [Stich](./expressions_stich) besonders wertvoll

Taktik:
• Bei nur zwei Spielern wird jede Karte wichtig
• Die Kenntnis der untersten Stock-Karte kann entscheidende Hinweise auf die Kartenverteilung geben

Übrige Regeln:
Im Übrigen gelten die gleichen Regeln wie beim Pandur für 4 Spieler.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Kann ich beim Pandur für 2 Spieler die unterste Stock-Karte einsehen?",
    "answer": "Ja, die unterste Karte des Stocks darf eingesehen werden, was zusätzliche Informationen für das Bieten und Spielen liefert."
  },
  {
    "question": "Wie funktioniert das Bieten beim Pandur für 2 Spieler?",
    "answer": "Das Bieten erfolgt abwechselnd zwischen den beiden Spielern. Jeder kann das Gebot des anderen überbieten oder passen."
  },
  {
    "question": "Erhält der Verlierer beim Pandur für 2 Spieler auch Punkte?",
    "answer": "Nein, der Gewinner eines Spiels erhält die entsprechenden Schreibpunkte, der Verlierer geht leer aus."
  },
  {
    "question": "Warum ist jeder Stich beim Pandur für 2 Spieler besonders wertvoll?",
    "answer": "Da der Verlierer leer ausgeht und der Gewinner alle Punkte erhält, macht jeder Stich besonders wertvoll."
  }
]
```

---
id: `variants_strategic_schafhauser`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Schafhauser, auch als Fischenthaler bekannt, ist ein Königsspiel für drei Spieler, bei dem ein [König](./expressions_koenigspartei) gegen eine [Bauernpartei](./expressions_bauernpartei) aus zwei Spielern antritt.

Spiel geben:
• Für das erste Spiel bestimmt ein beliebiger Spieler, wer König ist und damit die [Karten](./general_card_basics) ausgibt
• Der König verteilt jedem der drei Spieler zwölf Karten in drei Runden zu je vier Karten
• In den folgenden Spielen wechselt das Geben reihum in Spielrichtung
• Nach dem [Abheben](./abheben) wird die unterste Karte aufgedeckt, welche die [Trumpffarbe](./general_trump_values) bestimmt
• Diese Trumpfkarte gehört dem König und kann von niemandem [geraubt](./expressions_rauben) werden

Spielablauf:
• Im Unterschied zum [Bieter](./variants_strategic_bieter_drei) wird das Ziel nicht durch Bieten festgelegt
• Der König hat stets 350 [Punkte](./general_scoring_rules) zu erreichen, während die Bauernpartei gemeinsam 1000 Punkte erzielen muss
• Der König kann basierend auf seiner [Handkarte](./expressions_handkarten) entscheiden, ob er das Spiel übernehmen möchte oder passen will
• Verzichtet er auf das Spiel, erhält die Bauernpartei einen [Matsch](./matsch) mit entsprechender [Prämie](./expressions_matschpraemie) sowie gegebenenfalls [Stöckpunkten](./expressions_stoecke)

Schreiben:
• Nach jedem Spiel werden die erzielten Punkte notiert
• Erreicht weder der König noch die Bauernpartei einen [Stich](./expressions_stich), wird ein Matsch mit Matschprämie eingetragen
• Der König kann [Stöcke](./expressions_stoecke) nur dann gutschreiben lassen, wenn er tatsächlich mitspielt

Schneider-Regel:
Wer weniger als die Hälfte seines Ziels erreicht, verliert den doppelten Einsatz.

Partie-Struktur:
Die [Partie](./expressions_partie) wird so gespielt, dass über drei Runden jeder Spieler genau einmal die Rolle des Königs übernimmt.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte muss der König beim Schafhauser erreichen?",
    "answer": "Der König hat stets 350 Punkte zu erreichen, während die Bauernpartei gemeinsam 1000 Punkte erzielen muss."
  },
  {
    "question": "Kann der König auf das Spiel verzichten?",
    "answer": "Ja, der König kann basierend auf seiner Handkarte entscheiden, ob er das Spiel übernehmen möchte oder passen will. Verzichtet er, erhält die Bauernpartei einen Matsch mit entsprechender Prämie."
  },
  {
    "question": "Wie viele Runden umfasst eine Schafhauser-Partie?",
    "answer": "Die Partie wird so gespielt, dass über drei Runden jeder Spieler genau einmal die Rolle des Königs übernimmt."
  },
  {
    "question": "Kann die Trumpfkarte beim Schafhauser geraubt werden?",
    "answer": "Nein, die Trumpfkarte gehört dem König und kann von niemandem geraubt werden."
  }
]
```

---
id: `variants_two_player_schaggi_haas`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Schaggi-Haas ist ein anspruchsvolles Zweierspiel mit besonderen Regeln zum «[Bessern](./expressions_bessern)» und [Rauben](./expressions_rauben).

Spiel geben:
• Wer die niedrigste Karte aus einem verdeckten [Kartenspiel](./general_card_basics) zieht, gibt das erste Spiel
• Auch bei den folgenden Spielen wird durch das Ziehen einer Karte der Spielgeber bestimmt
• Der Spielgeber verteilt sich und seinem Mitspieler je zwölf [Karten](./general_card_basics) in drei Runden zu je vier Karten
• Die 25. Karte legt er offen auf den Tisch und zeigt damit die [Trumpffarbe](./general_trump_values) an
• Diese Karte kann mit dem [Trumpf-Sechser](./general_trump_values) geraubt werden (muss vor dem eigenen [Ausspiel](./ausspiel) zum ersten [Stich](./expressions_stich) erfolgen)

Bessern-Phase:
• Anschliessend verteilt der Spielgeber nochmals sich und seinem Mitspieler einzeln je vier Karten, die jedoch noch nicht eingesehen werden dürfen
• Diese können (müssen aber nicht) gegen vier beliebige [Handkarten](./expressions_handkarten) getauscht werden («bessern»)
• Beim «Bessern» müssen alle vier Karten getauscht werden, wobei diese zuerst abgelegt werden müssen, bevor die «bessern» vier Karten aufgenommen werden
• Wer auf das «Bessern» verzichtet, kann die verdeckten Karten einsehen
• Die Werte der abgelegten Karten oder der liegengelassenen «Bessern» zählen nicht

Stock:
Die restlichen drei Karten bilden zusammen mit der gezeigten Trumpfkarte den [Stock](./expressions_stapel), dessen unterste Karte nicht eingesehen werden darf.

Spielablauf:
• [Vorhand](./expressions_vorhand) spielt zum ersten Stich aus
• Wer einen Stich gemacht hat, muss wieder ausspielen
• Ist mit [Trumpf](./general_trump_values) eingestochen worden, darf nur [untertrumpft](./untertrumpfen) werden, wenn man nur noch Trumpfkarten hat
• Erzielt ein Spieler alle zwölf Stiche, erhält er keine zusätzliche [Matschprämie](./expressions_matschpraemie), da nicht mit allen Karten gejasst wird

Spielende:
Eine [Partie](./expressions_partie) geht auf 1000 Punkte. Wer diese [Punktzahl](./general_scoring_rules) zuerst erreicht, hat gewonnen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Karten werden beim Bessern beim Schaggi-Haas getauscht?",
    "answer": "Anschliessend verteilt der Spielgeber nochmals je vier Karten, die gegen vier beliebige Handkarten getauscht werden können. Beim «Bessern» müssen alle vier Karten getauscht werden."
  },
  {
    "question": "Muss ich beim Schaggi-Haas die vier Bessern-Karten tauschen?",
    "answer": "Nein, das «Bessern» ist freiwillig. Wer darauf verzichtet, kann die verdeckten Karten einsehen."
  },
  {
    "question": "Wie viele Punkte brauche ich zum Sieg beim Schaggi-Haas?",
    "answer": "Eine Partie geht auf 1000 Punkte. Wer diese Punktzahl zuerst erreicht, hat gewonnen."
  },
  {
    "question": "Gibt es eine Matschprämie beim Schaggi-Haas?",
    "answer": "Nein, erzielt ein Spieler alle zwölf Stiche, erhält er keine zusätzliche Matschprämie, da nicht mit allen Karten gejasst wird."
  }
]
```

---
id: `variants_specialty_schaufel_dame`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Schaufel-Dame-Jass ist ein spannendes Spiel für vier Spieler, bei dem eine einzige [Karte](./general_card_basics) zum Verhängnis werden kann.

Spiel geben:
• Ein beliebiger Spieler verteilt jedem Spieler neun Karten in drei Runden zu je drei Karten zum ersten Spiel
• Die folgenden Spiele werden der Reihe nach in Spielrichtung gegeben

Besonderheit:
• Die [Schaufel](./expressions_schaufel)-Dame ([Pik](./expressions_schaufel)-Dame) bringt demjenigen, der sie im [Stich](./expressions_stich) erhält, automatisch 100 Minuspunkte ein
• Alle anderen Karten werden nach ihren normalen Werten gewertet
• Es wird ohne [Trumpf](./general_trump_values) gespielt

Spielablauf und Taktik:
• Ziel ist es, möglichst viele [Punkte](./general_scoring_rules) zu sammeln, aber die gefährliche Schaufel-Dame zu vermeiden
• Der Spieler mit der Schaufel-Dame auf der [Hand](./expressions_handkarten) hat die schwierige Aufgabe, sie geschickt loszuwerden
• Wer die Schaufel-Dame hat, versucht sie bei einem gegnerischen Stich abzulegen
• Die anderen Spieler müssen vorsichtig agieren, um nicht ungewollt die Dame zu bekommen
• Hohe [Schaufel](./expressions_schaufel)-Karten sind besonders gefährlich, da sie [Stiche](./expressions_stich) machen könnten

Schreiben:
Nach jedem Spiel werden die normalen [Kartenpunkte](./general_card_values) plus die 100 Minuspunkte für die Schaufel-Dame verrechnet.

Spielende:
Eine [Partie](./expressions_partie) kann über eine bestimmte Anzahl Spiele gespielt werden. Gewinner ist der Spieler mit den meisten Pluspunkten am Ende.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Minuspunkte bringt die Schaufel-Dame?",
    "answer": "Die Schaufel-Dame bringt demjenigen, der sie im Stich erhält, automatisch 100 Minuspunkte ein."
  },
  {
    "question": "Wird beim Schaufel-Dame-Jass mit Trumpf gespielt?",
    "answer": "Nein, es wird ohne Trumpf gespielt. Alle Karten werden nach ihren normalen Werten gewertet."
  },
  {
    "question": "Was ist die beste Taktik, wenn ich die Schaufel-Dame habe?",
    "answer": "Der Spieler mit der Schaufel-Dame versucht sie bei einem gegnerischen Stich abzulegen, um die Minuspunkte zu vermeiden."
  },
  {
    "question": "Warum sind hohe Schaufel-Karten gefährlich?",
    "answer": "Hohe Schaufel-Karten sind besonders gefährlich, da sie Stiche machen könnten und man dadurch ungewollt die Schaufel-Dame bekommen könnte."
  }
]
```

---
id: `variants_strategic_schellenjass`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Beim Schellenjass für 3 oder 4 Spieler ist [Schellen](./expressions_schelle) immer und ausschliesslich [Trumpf](./general_trump_values). Es gibt keine anderen Trumpfvarianten wie [Obenabe](./expressions_obenabe), [Undenufe](./expressions_undenufe) oder andere Farben.

Spiel geben:
• Bei 3 Spielern: Alle erhalten 9 [Karten](./general_card_basics) (3 x 3 Karten), 3 Karten werden aus dem Spiel entfernt
• Bei 4 Spielern: 36 Karten werden gespielt (je 9 Karten pro Spieler)
• Ein beliebiger Spieler verteilt die entsprechende Anzahl Karten zum ersten Spiel
• Die folgenden Spiele werden der Reihe nach in Spielrichtung gegeben

Spielablauf und Taktik:
• Da Schellen immer Trumpf ist, entwickelt sich eine ganz eigene Taktik
• Spieler müssen ihre Schellen-[Karten](./general_card_basics) besonders strategisch einsetzen, da diese die einzigen Trumpfkarten im Spiel sind

Spielende:
Eine normale [Partie](./expressions_partie) nach [Punkten](./general_scoring_rules) oder eine bestimmte Anzahl Spiele.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Welche Farbe ist immer Trumpf beim Schellenjass?",
    "answer": "Schellen ist immer und ausschliesslich Trumpf. Es gibt keine anderen Trumpfvarianten wie Obenabe, Undenufe oder andere Farben."
  },
  {
    "question": "Wie viele Karten erhält jeder Spieler beim Schellenjass für 3 Spieler?",
    "answer": "Bei 3 Spielern erhalten alle 9 Karten (3 x 3 Karten), 3 Karten werden aus dem Spiel entfernt."
  },
  {
    "question": "Wie viele Karten werden beim Schellenjass für 4 Spieler gespielt?",
    "answer": "Bei 4 Spielern werden 36 Karten gespielt (je 9 Karten pro Spieler)."
  },
  {
    "question": "Welche Taktik ist beim Schellenjass wichtig?",
    "answer": "Da Schellen immer Trumpf ist, müssen Spieler ihre Schellen-Karten besonders strategisch einsetzen, da diese die einzigen Trumpfkarten im Spiel sind."
  }
]
```

---
id: `variants_two_player_schnueffler`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Schnüffler ist ein dynamisches Zweierspiel, bei dem während des Spiels laufend neue [Karten](./general_card_basics) vom [Stock](./expressions_stapel) aufgenommen werden.

Spiel geben:
• Jeder Spieler erhält zwölf Karten in drei Runden zu je vier Karten
• Die restlichen zwölf Karten werden als verdeckter Stock auf den Tisch gelegt
• Die oberste Stockkarte wird aufgedeckt und zeigt die [Trumpffarbe](./general_trump_values) an

Das «Schnüffeln»:
• Wer einen [Stich](./expressions_stich) macht, darf die oberste Stockkarte nehmen
• Danach wird die nächste Stockkarte aufgedeckt
• So «schnüffelt» man sich durch den Stock

Rauben:
Die aufgedeckte Trumpfkarte kann mit dem [Trumpf-Sechser](./general_trump_values) [geraubt](./expressions_rauben) werden, solange noch Stockkarten vorhanden sind.

Spielablauf:
• Der Nicht-Spielgeber spielt zum ersten Stich aus
• Nach jedem Stich nimmt der Stichgewinner die oberste Stockkarte, und die nächste wird aufgedeckt
• Dadurch verändert sich das Spiel laufend
• Da die Spieler laufend neue Karten erhalten, müssen sie strategisch entscheiden, welche Karten sie behalten und welche sie abgeben

Taktik:
• Stiche zu machen wird doppelt wertvoll ([Punkte](./general_scoring_rules) plus neue Karte)
• Die Kenntnis der aufgedeckten Trumpfkarte hilft bei der Planung
• Das Spiel entwickelt sich sehr dynamisch

Spielende:
• Wenn der Stock aufgebraucht ist, wird mit den verbleibenden [Handkarten](./expressions_handkarten) zu Ende gespielt
• Übliche Zielwerte sind 500 bis 1000 Punkte
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet «Schnüffeln» beim Schnüffler?",
    "answer": "«Schnüffeln» bedeutet, dass wer einen Stich macht, die oberste Stockkarte nehmen darf. Danach wird die nächste Stockkarte aufgedeckt, und so «schnüffelt» man sich durch den Stock."
  },
  {
    "question": "Kann die Trumpfkarte beim Schnüffler geraubt werden?",
    "answer": "Ja, die aufgedeckte Trumpfkarte kann mit dem Trumpf-Sechser geraubt werden, solange noch Stockkarten vorhanden sind."
  },
  {
    "question": "Warum ist jeder Stich beim Schnüffler besonders wertvoll?",
    "answer": "Stiche zu machen wird doppelt wertvoll: Man erhält sowohl Punkte als auch eine neue Karte vom Stock."
  },
  {
    "question": "Wie viele Punkte brauche ich zum Sieg beim Schnüffler?",
    "answer": "Übliche Zielwerte sind 500 bis 1000 Punkte."
  }
]
```

---
id: `variants_specialty_stich_differenzler`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Beim Stich-Differenzler für 2 oder 3 Spieler zählen nicht die [Kartenpunkte](./general_card_values), sondern ausschliesslich die Anzahl der gemachten [Stiche](./expressions_stich). Jeder Stich ist gleich viel wert, unabhängig von den [Kartenwerten](./general_card_values).

Spiel geben:
• Bei zwei Spielern: beide je zwölf [Karten](./general_card_basics) in drei Runden zu je vier Karten
• Bei drei Spielern: je neun Karten in drei Runden zu je drei Karten
• Ein beliebiger Spieler verteilt die entsprechende Anzahl Karten
• Die restlichen Karten bilden bei zwei Spielern einen [Stock](./expressions_stapel)

Ansage der Stichanzahl:
Vor Spielbeginn muss jeder Spieler ansagen, wie viele Stiche er zu machen gedenkt. Diese Ansage ist verbindlich.

Spielablauf und Bewertung:
• Das Spiel verläuft normal, aber am Ende zählen nur die tatsächlich gemachten Stiche
• Die Kartenwerte sind irrelevant
• Erreicht ein Spieler genau seine angesagte Stichanzahl: Pluspunkte

Taktik:
• Genaue Einschätzung der eigenen Stärke ist entscheidend
• Manchmal ist es besser, bewusst einen Stich zu verlieren
• Gegner bei ihrer Stichzahl-Erfüllung zu hindern wird wichtig

Trumpf:
Es kann mit [Trumpf](./general_trump_values) gespielt werden, aber auch [Obenabe](./expressions_obenabe) oder [Undenufe](./expressions_undenufe) sind möglich, je nach Vereinbarung.

Spielende:
Gespielt wird meist auf eine bestimmte [Punktzahl](./general_scoring_rules) oder eine festgelegte Anzahl Spiele.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was zählt beim Stich-Differenzler - Punkte oder Stiche?",
    "answer": "Beim Stich-Differenzler zählen nicht die Kartenpunkte, sondern ausschliesslich die Anzahl der gemachten Stiche. Jeder Stich ist gleich viel wert."
  },
  {
    "question": "Muss ich vor Spielbeginn ansagen, wie viele Stiche ich machen will?",
    "answer": "Ja, vor Spielbeginn muss jeder Spieler ansagen, wie viele Stiche er zu machen gedenkt. Diese Ansage ist verbindlich."
  },
  {
    "question": "Was passiert, wenn ich genau meine angesagte Stichanzahl erreiche?",
    "answer": "Erreicht ein Spieler genau seine angesagte Stichanzahl, erhält er Pluspunkte."
  },
  {
    "question": "Kann beim Stich-Differenzler mit Obenabe oder Undenufe gespielt werden?",
    "answer": "Ja, es kann mit Trumpf gespielt werden, aber auch Obenabe oder Undenufe sind möglich, je nach Vereinbarung."
  }
]
```

---
id: `variants_specialty_zuger_drei`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Zuger für 3 Spieler ist eine Schreibspiel-Variante, bei der der Spielgeber nicht aktiv mitspielt, sondern 10 Schreibpunkte erhält.

Spiel geben:
• Zwei Spieler erhalten je 12 [Karten](./general_card_basics) (3 x 4 Karten)
• Der dritte Spieler ist der Spielgeber und erhält keine Karten, sondern 10 [Schreibpunkte](./schreiben) gutgeschrieben

Spielentscheidung:
Die beiden aktiven Spieler entscheiden vor Spielbeginn, ob sie mitspielen möchten.

Schreibregeln:
• Wie beim Zuger für 4 Spieler wird nur der zehnte Teil der [Kartenpunkte](./general_card_values) geschrieben
• Wer unter 21 Punkte bleibt, fällt herunter und erhält 10 Minuspunkte

Der Papagei (Spielgeber):
Erhält immer 10 Schreibpunkte, unabhängig vom Spielausgang.

Spielende:
• Gespielt wird auf 150 Schreibpunkte
• Die [Partie](./expressions_partie) endet, wenn gleich viele Plus- wie Minuspunkte auf der Tafel stehen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Punkte erhält der Spielgeber beim Zuger für 3 Spieler?",
    "answer": "Der Spielgeber (auch «Papagei» genannt) erhält immer 10 Schreibpunkte, unabhängig vom Spielausgang."
  },
  {
    "question": "Wie viele Karten erhält jeder aktive Spieler?",
    "answer": "Zwei Spieler erhalten je 12 Karten (3 x 4 Karten), während der Spielgeber keine Karten erhält."
  },
  {
    "question": "Was passiert, wenn ich unter 21 Punkte bleibe?",
    "answer": "Wer unter 21 Punkte bleibt, fällt herunter und erhält 10 Minuspunkte."
  },
  {
    "question": "Wie viele Schreibpunkte brauche ich zum Sieg?",
    "answer": "Gespielt wird auf 150 Schreibpunkte. Die Partie endet, wenn gleich viele Plus- wie Minuspunkte auf der Tafel stehen."
  },
  {
    "question": "Wie wird beim Zuger geschrieben?",
    "answer": "Wie beim Zuger für 4 Spieler wird nur der zehnte Teil der Kartenpunkte geschrieben."
  }
]
```

---
id: `expressions_ablupf`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Der [Ablupf](./abheben) ist ein zentraler Vorgang beim [Jassen](./general_introduction)
• Der Spieler links vom Geber nimmt die Karten vom [Stapel](./expressions_stapel)
• Das Kartenabheben entscheidet oft über den Spielverlauf und gilt als einer der entscheidenden Momente
• Wer hier ruhig bleibt und überlegt vorgeht, schafft bessere Voraussetzungen für das nachfolgende Spiel
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Ablupf beim Jassen?",
    "answer": "Der Ablupf ist das Kartenabheben. Der Spieler links vom Geber nimmt die Karten vom Stapel."
  },
  {
    "question": "Wer macht den Ablupf?",
    "answer": "Der Spieler links vom Geber macht den Ablupf."
  },
  {
    "question": "Warum ist der Ablupf wichtig?",
    "answer": "Das Kartenabheben entscheidet oft über den Spielverlauf und gilt als einer der entscheidenden Momente."
  }
]
```

---
id: `expressions_ausmachregel`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Die [Ausmachregel](./weis_rules_ausmachen_basics) kommt zum Tragen, wenn zwei [Teams](./expressions_team) gleichzeitig im selben [Stich](./expressions_stich) das Spielziel erreichen

Zweck:
• Klärt die Situation bei Schluss oder [Bergpreis](./expressions_berg)
• Sorgt für einen fairen Spielverlauf
• Wichtig für die korrekte Abrechnung
• Verhindert Unklarheiten beim Punktestand
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wann greift die Ausmachregel?",
    "answer": "Die Ausmachregel greift, wenn zwei Teams gleichzeitig im selben Stich das Spielziel erreichen."
  },
  {
    "question": "Was regelt die Ausmachregel?",
    "answer": "Sie klärt die Situation bei Schluss oder Bergpreis und sorgt für einen fairen Spielverlauf."
  },
  {
    "question": "Was ist die bekannteste Ausmachregel?",
    "answer": "Die bekannteste Ausmachregel ist \"Stöck-Wys-Stich\", die festlegt, in welcher Reihenfolge Punkte gezählt werden."
  }
]
```

---
id: `expressions_banner`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Der Banner ist der Zehner einer Farbe bei den [deutschschweizerischen Spielkarten](./general_card_systems)
• Er stellt die stechmässig höchste Karte jeder Farbe dar und besitzt damit einen besonders hohen Wert im Spiel
• Diese Karte ist besonders wertvoll und sollte strategisch eingesetzt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Banner beim Jassen?",
    "answer": "Der Banner ist der Zehner einer Farbe bei den deutschschweizerischen Spielkarten."
  },
  {
    "question": "Wie stark ist der Banner?",
    "answer": "Der Banner ist die stechmässig höchste Karte jeder Farbe."
  },
  {
    "question": "Welche Karte entspricht dem Banner bei französischen Karten?",
    "answer": "Bei französischen Karten entspricht die Zehn dem Banner bei deutschen Karten."
  }
]
```

---
id: `expressions_basic_terms`
---

**Bereinigter Haupttext:**
```markdown
Grundkonzept:
• Grundlegende [Jass-Ausdrücke](./general_orientation) bilden das Fundament für das Verständnis des Spiels
• Diese Terminologie umfasst die wichtigsten Begriffe, die jeder Spieler kennen sollte
• Notwendig, um erfolgreich beim [Jassen](./general_introduction) zu können

Dazu gehören:
• Bezeichnungen für [Karten](./general_card_basics)
• Spielaktionen
• Spielsituationen
• Alle werden in allen Jassvarianten verwendet
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Welche Grundbegriffe sollte man beim Jassen kennen?",
    "answer": "Wichtige Grundbegriffe sind Bezeichnungen für Karten, Spielaktionen und Spielsituationen, die in allen Jassvarianten verwendet werden."
  },
  {
    "question": "Warum sind Jass-Grundbegriffe wichtig?",
    "answer": "Grundlegende Jass-Ausdrücke bilden das Fundament für das Verständnis des Spiels und sind notwendig, um erfolgreich beim Jassen zu können."
  },
  {
    "question": "Wo kann ich die wichtigsten Jass-Begriffe lernen?",
    "answer": "Die zentrale Begriffserklärung finden Sie unter \"Zentrale Begriffe\" im Grundlagenbereich."
  }
]
```

---
id: `expressions_belli`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Belli bezeichnet den Schellen-Siebner oder Ecken-Siebner als zweithöchste [Stechkarte](./expressions_stechkarten) bei [Ramset](./variants_multi_player_ramset)
• Bei der Jassart [Zwick-Jass](./variants_multi_player_zwick_jass) gelten alle Siebner als zweit- bis fünft-höchste Stechkarten, was ihnen eine besondere strategische Bedeutung verleiht
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Belli beim Jassen?",
    "answer": "Belli ist der Schellen-Siebner oder Ecken-Siebner, der bei Ramset die zweithöchste Stechkarte ist."
  },
  {
    "question": "Bei welchen Jassvarianten ist der Belli wichtig?",
    "answer": "Der Belli ist vor allem bei Ramset und Zwick-Jass von Bedeutung."
  },
  {
    "question": "Wie stark ist der Belli?",
    "answer": "Bei Ramset ist der Belli die zweithöchste Stechkarte. Bei Zwick-Jass sind alle Siebner zweit- bis fünft-höchste Stechkarten."
  }
]
```

---
id: `expressions_berg`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Der Berg oder [Bergpreis](./bergpreis) ist eine Zusatzprämie für das [Team](./expressions_team), das als Erstes die Hälfte des Spielziels erreicht
• Diese besondere Auszeichnung motiviert die Teams und bringt zusätzliche Spannung in die [Partie](./expressions_partie)
• Der Berg wird separat notiert und zählt zur Gesamtwertung
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Berg beim Jassen?",
    "answer": "Der Berg ist eine Zusatzprämie für das Team, das als Erstes die Hälfte des Spielziels erreicht."
  },
  {
    "question": "Wie wird der Berg notiert?",
    "answer": "Der Berg wird separat notiert und zählt zur Gesamtwertung."
  },
  {
    "question": "Warum gibt es den Bergpreis?",
    "answer": "Der Bergpreis motiviert die Teams und bringt zusätzliche Spannung in die Partie."
  }
]
```

---
id: `expressions_blatt`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Als Blatt werden die [Spielkarten](./general_card_basics) bezeichnet
• Karten sind mit französischen oder [deutschschweizerischen Motiven](./general_card_systems) gestaltet

Verwendung des Begriffs:
• Begriff findet sich in Verbindung mit [Weisen](./weis_rules_general) wieder
• Beispiel: [Dreiblatt](./weis_rules_dreiblatt) (spezielle Kartenkombination)

Im Spiel:
• Das Blatt umfasst alle Karten, die ein Spieler in der [Hand](./expressions_handkarten) hält
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet \"Blatt\" beim Jassen?",
    "answer": "Als Blatt werden die Spielkarten bezeichnet. Es kann auch die Karten in der Hand eines Spielers meinen."
  },
  {
    "question": "Wo wird der Begriff \"Blatt\" verwendet?",
    "answer": "Der Begriff findet sich vor allem in Verbindung mit Weisen wieder, wie beim Dreiblatt, Vierblatt, etc."
  },
  {
    "question": "Welche Kartensysteme gibt es?",
    "answer": "Es gibt französische und deutschschweizerische Spielkarten mit unterschiedlichen Motiven."
  }
]
```

---
id: `expressions_blinder`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Ein Blinder ist ein Austauschblatt, das in verschiedenen Spielvarianten verwendet wird

Bei der Jassart Schnüffler:
• Diese Karten erhalten eine besondere Bedeutung
• Sie müssen nicht getauscht werden, müssen aber von den Spielern erraten werden
• Dies macht das Spiel zusätzlich spannend
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Blinder beim Jassen?",
    "answer": "Ein Blinder ist ein Austauschblatt, das in verschiedenen Spielvarianten verwendet wird."
  },
  {
    "question": "Bei welcher Jassart sind Blinde wichtig?",
    "answer": "Blinde spielen vor allem beim Schnüffler eine wichtige Rolle."
  },
  {
    "question": "Was macht man mit dem Blinden beim Schnüffler?",
    "answer": "Beim Schnüffler müssen die Spieler die Karten des Blinden erraten, ohne sie zu sehen."
  }
]
```

---
id: `expressions_bock`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Als Bock wird die höchste Karte einer Farbe bezeichnet, die nicht gestochen werden kann
• Diese Karte hat eine besondere Stellung und ist sehr wertvoll, da sie nur durch [Trumpfkarten](./expressions_trumpf) oder durch eine höhere Karte der gleichen Farbe geschlagen werden kann
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Bock beim Jassen?",
    "answer": "Ein Bock ist die höchste Karte einer Farbe, die nicht gestochen werden kann."
  },
  {
    "question": "Wie kann ein Bock geschlagen werden?",
    "answer": "Ein Bock kann nur durch Trumpfkarten oder durch eine höhere Karte der gleichen Farbe geschlagen werden."
  },
  {
    "question": "Wann hat man einen Bock?",
    "answer": "Man hat einen Bock, wenn man die höchste Karte einer bestimmten Farbe hält, die im Spiel noch nicht gefallen ist."
  }
]
```

---
id: `expressions_bockkarte`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Die Bockkarte ist die stechmässig höchste Karte jeder Farbe
• Sie stellt somit das stärkste Blatt einer Farbe dar und kann nur durch [Trumpfkarten](./expressions_trumpf) geschlagen werden
• Diese Position macht sie zu einer besonders wertvollen Karte im Spiel
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist eine Bockkarte?",
    "answer": "Die Bockkarte ist die stechmässig höchste Karte jeder Farbe."
  },
  {
    "question": "Wie kann eine Bockkarte geschlagen werden?",
    "answer": "Eine Bockkarte kann nur durch Trumpfkarten geschlagen werden."
  },
  {
    "question": "Welche Karte ist die Bockkarte bei Trumpf?",
    "answer": "Bei Trumpffarben ist der Trumpf-Bauer (Puur) die höchste Karte. Bei anderen Farben ist es normalerweise das Ass."
  }
]
```

---
id: `expressions_bodentrumpf`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Der [Bodentrumpf](./bodentrumpf) ist die unterste Karte, die nach dem [Abheben](./abheben) sichtbar wird
• Diese Karte zeigt die [Trumpffarbe](./general_trump_values) an und bestimmt damit, welche Farbe im aktuellen Spiel die stärkste ist
• Sie ist von zentraler Bedeutung für den Spielverlauf und die taktischen Entscheidungen der Spieler
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Bodentrumpf?",
    "answer": "Der Bodentrumpf ist die unterste Karte, die nach dem Abheben sichtbar wird und die Trumpffarbe anzeigt."
  },
  {
    "question": "Wie wird die Trumpffarbe beim Bodentrumpf bestimmt?",
    "answer": "Die Farbe der untersten Karte nach dem Abheben bestimmt, welche Farbe Trumpf ist."
  },
  {
    "question": "Bei welchen Jassvarianten spielt man mit Bodentrumpf?",
    "answer": "Bodentrumpf wird vor allem bei einfacheren Jassvarianten und Lernspielen verwendet."
  }
]
```

---
id: `expressions_braettli`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Brättli ist die Sammelbezeichnung für die Sechser, Siebner, Achter und Neuner
• Diese [Karten](./general_card_basics) besitzen einen geringen Punktwert und werden oft für taktische Spielzüge verwendet, um höherwertige Karten zu schonen oder dem Partner zu signalisieren
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind Brättli beim Jassen?",
    "answer": "Brättli sind die Sechser, Siebner, Achter und Neuner – die Karten mit geringem Punktwert."
  },
  {
    "question": "Wofür verwendet man Brättli?",
    "answer": "Brättli werden oft für taktische Spielzüge verwendet, um höherwertige Karten zu schonen oder dem Partner zu signalisieren."
  },
  {
    "question": "Wie viele Punkte sind Brättli wert?",
    "answer": "Brättli haben einen geringen oder gar keinen Punktwert, je nach Spielart. Bei Obenabe und Undenufe haben sie spezielle Werte."
  }
]
```

---
id: `expressions_ecken`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Ecken ist eine der vier [Kartenfarben](./expressions_kartenfarben) der [französischen Spielkarten](./general_card_systems)
• Sie gehört zu den standardmässigen Farben und wird in allen Jassvarianten verwendet, die mit französischen Karten gespielt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Ecken beim Jassen?",
    "answer": "Ecken (Karo) ist eine der vier Kartenfarben der französischen Spielkarten."
  },
  {
    "question": "Welche Farben gibt es bei französischen Karten?",
    "answer": "Bei französischen Karten gibt es Ecken (Karo), Herz, Schaufel (Pik) und Kreuz (Treff)."
  },
  {
    "question": "Was entspricht Ecken bei deutschen Karten?",
    "answer": "Ecken bei französischen Karten entspricht Schellen bei deutschschweizerischen Karten."
  }
]
```

---
id: `expressions_eichel`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Eichel ist eine der vier [Kartenfarben](./expressions_kartenfarben) der [deutschschweizerischen Spielkarten](./general_card_systems)
• Sie gehört zu den traditionellen Farben des Deutschschweizer Blatts und wird in allen Varianten verwendet, die mit diesen Karten gespielt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Eichel beim Jassen?",
    "answer": "Eichel ist eine der vier Kartenfarben der deutschschweizerischen Spielkarten."
  },
  {
    "question": "Welche Farben gibt es bei deutschen Karten?",
    "answer": "Bei deutschschweizerischen Karten gibt es Eichel, Schilten, Rosen und Schellen."
  },
  {
    "question": "Was entspricht Eichel bei französischen Karten?",
    "answer": "Eichel bei deutschen Karten entspricht Kreuz (Treff) bei französischen Karten."
  }
]
```

---
id: `expressions_haerdoepfel`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Härdöpfel ist eine weitere Bezeichnung für [Nuller](./expressions_nuller) oder [Sack](./expressions_sack)
• Dieser Begriff wird vor allem in der Schweiz verwendet und bezeichnet [Minuspunkte](./expressions_minuspunkte), die ein Spieler erhalten kann, wenn er sein Ziel nicht erreicht
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind Härdöpfel beim Jassen?",
    "answer": "Härdöpfel ist eine umgangssprachliche Bezeichnung für Minuspunkte (Nuller oder Sack)."
  },
  {
    "question": "Wann bekommt man Härdöpfel?",
    "answer": "Man bekommt Härdöpfel, wenn man bei Differenz-Jassarten sein angesagtes Ziel nicht erreicht."
  },
  {
    "question": "Ist Härdöpfel ein offizieller Begriff?",
    "answer": "Nein, Härdöpfel ist ein umgangssprachlicher, vor allem in der Schweiz verwendeter Begriff für Minuspunkte."
  }
]
```

---
id: `expressions_handkarten`
---

**Bereinigter Haupttext:**
```markdown
Grundkonzept:
• Handkarten sind das [Blatt](./expressions_blatt) oder die Karten, die ein Spieler gefächert in der Hand hält
• Diese Karten bilden das persönliche Spielmaterial jedes Teilnehmers
• Bestimmen die taktischen Möglichkeiten während der [Partie](./expressions_partie)
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind Handkarten beim Jassen?",
    "answer": "Handkarten sind das Blatt oder die Karten, die ein Spieler gefächert in der Hand hält."
  },
  {
    "question": "Wie viele Handkarten hat man normalerweise?",
    "answer": "Bei den meisten Jassvarianten erhält jeder Spieler 9 Handkarten."
  },
  {
    "question": "Darf man die Handkarten anderen zeigen?",
    "answer": "Nein, die Handkarten müssen geheim gehalten werden und dürfen nicht anderen Spielern gezeigt werden."
  }
]
```

---
id: `expressions_herz`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Herz ist eine der vier [Kartenfarben](./expressions_kartenfarben) der [französischen Spielkarten](./general_card_systems)
• Sie zählt zu den standardmässigen Farben und wird in allen Jassvarianten verwendet, die mit französischen Karten gespielt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Herz beim Jassen?",
    "answer": "Herz (Cœur) ist eine der vier Kartenfarben der französischen Spielkarten."
  },
  {
    "question": "Welche Farbe entspricht Herz bei deutschen Karten?",
    "answer": "Herz bei französischen Karten entspricht Rosen bei deutschschweizerischen Karten."
  },
  {
    "question": "Ist Herz eine rote Farbe?",
    "answer": "Ja, Herz ist neben Ecken (Karo) eine der beiden roten Farben bei französischen Karten."
  }
]
```

---
id: `expressions_kartenfarben`
---

**Bereinigter Haupttext:**
```markdown
Grundkonzept:
• Die Kartenfarben unterscheiden sich je nach [Kartensystem](./general_card_systems)
• Bei den [deutschschweizerischen Spielkarten](./general_card_systems) gibt es vier Farben: [Schellen](./expressions_schelle), [Schilten](./expressions_schilte), [Rosen](./expressions_rose) und [Eichel](./expressions_eichel)
• Bei den [französischen Karten](./general_card_systems) sind es [Ecken](./expressions_ecken), [Schaufel](./expressions_schaufel), [Herz](./expressions_herz) und [Kreuz](./expressions_kreuz). Jede Farbe umfasst neun Karten und bildet einen wichtigen Bestandteil des Spiels
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Welche Kartenfarben gibt es beim Jassen?",
    "answer": "Bei deutschen Karten: Schellen, Schilten, Rosen und Eichel. Bei französischen Karten: Ecken (Karo), Schaufel (Pik), Herz und Kreuz (Treff)."
  },
  {
    "question": "Wie viele Karten hat jede Farbe?",
    "answer": "Jede Kartenfarbe umfasst neun Karten."
  },
  {
    "question": "Was ist der Unterschied zwischen deutschen und französischen Karten?",
    "answer": "Beide Systeme haben vier Farben mit je neun Karten, aber unterschiedliche Symbole und Bezeichnungen."
  }
]
```

---
id: `expressions_knecht`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Der Knecht ist der fünfte Spieler bei der Jassart [Schieber zu fünft](./schieber_conventions)

Alternative Bezeichnung:
• Dieser Begriff ist auch als Joker bekannt

Rolle:
• Bezeichnet einen Spieler, der eine besondere Rolle im Spiel einnimmt und in bestimmten Situationen eine wichtige strategische Position haben kann
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Knecht beim Jassen?",
    "answer": "Der Knecht ist der fünfte Spieler bei der Jassart Schieber zu fünft."
  },
  {
    "question": "Welche andere Bezeichnung gibt es für den Knecht?",
    "answer": "Der Knecht wird auch als Joker bezeichnet."
  },
  {
    "question": "Welche Rolle hat der Knecht?",
    "answer": "Der Knecht nimmt eine besondere Rolle ein und hat in bestimmten Situationen eine wichtige strategische Position."
  }
]
```

---
id: `expressions_kontermatsch`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Kontermatsch bezeichnet die Situation, in der das nicht trumpfmachende [Team](./expressions_team) alle [Stiche](./expressions_stich) erzielt
• Auch hier gibt es die [Matschprämie](./expressions_matschpraemie), allerdings für die gegnerische Seite
• Da dieses Ereignis sehr selten vorkommt, werden oft zwei Striche notiert, um die besondere Leistung zu würdigen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Kontermatsch?",
    "answer": "Ein Kontermatsch ist, wenn das nicht trumpfmachende Team alle Stiche erzielt."
  },
  {
    "question": "Wie oft kommt ein Kontermatsch vor?",
    "answer": "Ein Kontermatsch ist sehr selten, da das Team ohne Trumpf alle Stiche gewinnen muss."
  },
  {
    "question": "Gibt es eine Prämie für Kontermatsch?",
    "answer": "Ja, es gibt die Matschprämie für das nicht trumpfmachende Team. Oft werden sogar zwei Striche notiert."
  }
]
```

---
id: `expressions_kreuz`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Kreuz ist eine der vier [Kartenfarben](./expressions_kartenfarben) der [französischen Spielkarten](./general_card_systems)
• Sie gehört zu den standardmässigen Farben und wird in allen Jassvarianten, die mit französischen Karten gespielt werden, verwendet
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Kreuz beim Jassen?",
    "answer": "Kreuz (Treff) ist eine der vier Kartenfarben der französischen Spielkarten."
  },
  {
    "question": "Welche Farbe entspricht Kreuz bei deutschen Karten?",
    "answer": "Kreuz bei französischen Karten entspricht Eichel bei deutschschweizerischen Karten."
  },
  {
    "question": "Ist Kreuz eine schwarze Farbe?",
    "answer": "Ja, Kreuz ist neben Schaufel (Pik) eine der beiden schwarzen Farben bei französischen Karten."
  }
]
```

---
id: `expressions_lukas`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Als Lukas wird beim Jassen der [Stock](./expressions_stock) oder die nicht verteilten Karten bei der Jassart [Aucho](./variants_strategic_aucho_vier) bezeichnet
• Diese Karten spielen eine besondere Rolle im Spielverlauf und werden im Rahmen des Kehrs einzeln aufgedeckt
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Lukas beim Jassen?",
    "answer": "Der Lukas ist der Stock oder die nicht verteilten Karten bei der Jassart Aucho."
  },
  {
    "question": "Bei welcher Jassart gibt es den Lukas?",
    "answer": "Der Begriff Lukas wird vor allem bei Aucho verwendet."
  },
  {
    "question": "Was macht man mit dem Lukas?",
    "answer": "Die Karten des Lukas werden im Rahmen des Kehrs einzeln aufgedeckt und spielen eine besondere Rolle im Spielverlauf."
  }
]
```

---
id: `expressions_matsch`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• [Matsch](./matsch) bedeutet, dass ein [Team](./expressions_team) alle [Stiche](./expressions_stich) eines Umlaufs erzielt

Belohnung:
• Diese aussergewöhnliche Leistung wird in der Regel mit einer [Prämie](./expressions_matschpraemie) belohnt, die je nach Spielvariante unterschiedlich hoch ausfällt

Seltenheit:
• Der Matsch ist ein seltenes, aber sehr lohnendes Ereignis im Spielverlauf
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Matsch beim Jassen?",
    "answer": "Ein Matsch bedeutet, dass ein Team alle Stiche eines Umlaufs erzielt."
  },
  {
    "question": "Wie wird ein Matsch belohnt?",
    "answer": "Ein Matsch wird mit einer Prämie belohnt, die je nach Spielvariante unterschiedlich hoch ausfällt."
  },
  {
    "question": "Wie oft kommt ein Matsch vor?",
    "answer": "Ein Matsch ist ein seltenes, aber sehr lohnendes Ereignis im Spielverlauf."
  }
]
```

---
id: `expressions_matschpraemie`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Die Matschprämie sind zusätzliche Punkte, die ein [Team](./expressions_team) erhält, wenn es alle [Stiche](./expressions_stich) eines Spiels erzielt

Verbreitung:
• Diese Belohnung wird in den meisten Jassvarianten vergeben und macht den [Matsch](./expressions_matsch) zu einem besonders lohnenden Ziel

Höhe:
• Die Höhe der Prämie kann je nach Spielvariante unterschiedlich ausfallen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist die Matschprämie?",
    "answer": "Die Matschprämie sind zusätzliche Punkte, die ein Team für einen Matsch (alle Stiche) erhält."
  },
  {
    "question": "Wie hoch ist die Matschprämie?",
    "answer": "Die Höhe der Matschprämie kann je nach Spielvariante unterschiedlich ausfallen, ist aber meist 100 Punkte beim Schieber."
  },
  {
    "question": "In welchen Jassvarianten gibt es die Matschprämie?",
    "answer": "Die Matschprämie wird in den meisten Jassvarianten vergeben."
  }
]
```

---
id: `expressions_minuspunkte`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Minuspunkte entstehen bei Differenz-Jassarten, wenn die geschätzte Karten- und [Weispunktzahl](./expressions_weispunkte) nicht erreicht wird

Synonyme:
• Auch als [Nuller](./expressions_nuller), [Sack](./expressions_sack) oder [Härdöpfel](./expressions_haerdoepfel) bezeichnet

Ausgleich:
• Müssen später durch positive Leistungen ausgeglichen werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind Minuspunkte beim Jassen?",
    "answer": "Minuspunkte entstehen bei Differenz-Jassarten, wenn die geschätzte Karten- und Weispunktzahl nicht erreicht wird."
  },
  {
    "question": "Welche anderen Begriffe gibt es für Minuspunkte?",
    "answer": "Minuspunkte werden auch als Nuller, Sack oder Härdöpfel bezeichnet."
  },
  {
    "question": "Wie gleicht man Minuspunkte aus?",
    "answer": "Minuspunkte müssen später durch positive Leistungen ausgeglichen werden."
  }
]
```

---
id: `expressions_nell`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Die Nell ist die Bezeichnung für den [Trumpf](./expressions_trumpf)-Neuner
• Sie ist sowohl wert- als auch stechmässig die zweithöchste Karte einer Trumpffarbe und damit eine sehr wertvolle Karte, die strategisch klug eingesetzt werden sollte
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist die Nell beim Jassen?",
    "answer": "Die Nell ist der Trumpf-Neuner, die zweithöchste Karte einer Trumpffarbe."
  },
  {
    "question": "Wie viele Punkte ist die Nell wert?",
    "answer": "Die Nell ist 14 Punkte wert."
  },
  {
    "question": "Welche Karte ist stärker als die Nell?",
    "answer": "Nur der Trumpf-Bauer (Puur) ist stärker als die Nell."
  }
]
```

---
id: `expressions_nuller`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Ein Nuller entspricht einem Minusstrich, der mit einem Strich verrechnet wird

Synonyme:
• Dieser Begriff ist auch bekannt als [Sack](./expressions_sack) oder [Härdöpfel](./expressions_haerdoepfel)

Entstehung:
• Wird verwendet, um [Minuspunkte](./expressions_minuspunkte) zu bezeichnen, die ein Spieler bei Differenz-Jassarten erhält, wenn er sein angesagtes Ziel nicht erreicht
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Nuller beim Jassen?",
    "answer": "Ein Nuller ist ein Minusstrich, der mit einem Strich verrechnet wird."
  },
  {
    "question": "Wann bekommt man einen Nuller?",
    "answer": "Man bekommt einen Nuller bei Differenz-Jassarten, wenn man sein angesagtes Ziel nicht erreicht."
  },
  {
    "question": "Welche anderen Begriffe gibt es für Nuller?",
    "answer": "Nuller wird auch als Sack oder Härdöpfel bezeichnet."
  }
]
```

---
id: `expressions_offene_ansage`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Die offene Ansage ist die geschätzte Kartenpunktzahl bei der Jassart [Differenzler](./variants_strategic_differenzler_offen)

Transparenz:
• Wird für alle Spieler offen angesagt, sodass jeder die Ansagen der anderen kennt

Strategie:
• Ermöglicht bessere Planung, da alle Teilnehmer die Einschätzungen der anderen einbeziehen können
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist die offene Ansage beim Jassen?",
    "answer": "Die offene Ansage ist die geschätzte Kartenpunktzahl beim Differenzler, die für alle Spieler sichtbar ist."
  },
  {
    "question": "Was ist der Unterschied zur verdeckten Ansage?",
    "answer": "Bei der offenen Ansage kennen alle Spieler die Ansagen der anderen, bei der verdeckten Ansage bleiben sie geheim."
  },
  {
    "question": "Welche Strategie ermöglicht die offene Ansage?",
    "answer": "Die offene Ansage ermöglicht bessere Planung, da alle Teilnehmer die Einschätzungen der anderen einbeziehen können."
  }
]
```

---
id: `expressions_partie`
---

**Bereinigter Haupttext:**
```markdown
Grundkonzept:
• Eine Partie setzt sich aus mehreren zusammengehörenden Spielen zusammen
• Erst am Ende dieser Spielserie wird festgestellt, welche Seite gewonnen oder verloren hat
• Die Partie ist somit die übergeordnete Spieleinheit
• Entscheidet über den finalen Ausgang
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist eine Partie beim Jassen?",
    "answer": "Eine Partie ist eine Spielserie aus mehreren zusammengehörenden Spielen."
  },
  {
    "question": "Wann ist eine Partie zu Ende?",
    "answer": "Eine Partie ist zu Ende, wenn ein Team das Spielziel erreicht hat, meist 1000 oder 2500 Punkte beim Schieber."
  },
  {
    "question": "Was ist der Unterschied zwischen Spiel und Partie?",
    "answer": "Ein Spiel ist ein einzelner Durchgang, eine Partie besteht aus mehreren Spielen bis zum Erreichen des Spielziels."
  }
]
```

---
id: `expressions_passe`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Eine Passe bezeichnet einen Durchgang aus mehreren Spielen innerhalb eines Turniers
• Zusammensetzung der Spieler bleibt dabei unverändert
• Ermöglicht eine kontinuierliche Bewertung über mehrere Runden hinweg
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist eine Passe beim Jassen?",
    "answer": "Eine Passe ist ein Durchgang aus mehreren Spielen innerhalb eines Turniers mit unveränderter Spielerzusammensetzung."
  },
  {
    "question": "Wie lange dauert eine Passe?",
    "answer": "Die Dauer einer Passe variiert je nach Turnierregeln, typischerweise umfasst sie mehrere Spiele oder eine festgelegte Zeitspanne."
  },
  {
    "question": "Was ist eine Streichpasse?",
    "answer": "Eine Streichpasse ist die schlechteste Passe eines Teilnehmers, die bei der Turnierwertung nicht gezählt wird."
  }
]
```

---
id: `expressions_rampo`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Rampo ist ein notierter Querstrich bei der Jassart Schellenjass, auch Herzjass genannt

Bedingung:
• Dieser wird notiert, wenn mindestens zwei Spieler gleich viele Schellenkarten stechen müssen

Bedeutung:
• Das Rampo ist ein wichtiger Bestandteil der Spielabrechnung und beeinflusst den Spielverlauf erheblich
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Rampo beim Jassen?",
    "answer": "Ein Rampo ist ein notierter Querstrich beim Schellenjass, wenn mindestens zwei Spieler gleich viele Schellenkarten stechen müssen."
  },
  {
    "question": "Bei welcher Jassart gibt es Rampo?",
    "answer": "Rampo gibt es beim Schellenjass, auch Herzjass genannt."
  },
  {
    "question": "Wann wird ein Rampo notiert?",
    "answer": "Ein Rampo wird notiert, wenn mindestens zwei Spieler gleich viele Schellenkarten stechen müssen."
  }
]
```

---
id: `expressions_rest`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Mit Rest wird die Bemerkung bezeichnet, wenn ein Spieler ankündigt, die restlichen [Stiche](./expressions_stich) machen zu können

Wichtiger Hinweis:
• Diese Ansage ist in den meisten Spielvarianten nicht erlaubt
• Sollte daher vor dem Spiel geklärt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet \"Rest\" beim Jassen?",
    "answer": "\"Rest\" ist die Ankündigung eines Spielers, alle restlichen Stiche machen zu können."
  },
  {
    "question": "Ist \"Rest\" überall erlaubt?",
    "answer": "Nein, die Ansage \"Rest\" ist in den meisten Spielvarianten nicht erlaubt und sollte vor dem Spiel geklärt werden."
  },
  {
    "question": "Wann darf man \"Rest\" sagen?",
    "answer": "Die Regeln für \"Rest machen\" variieren je nach Spielvariante und Tischregel. In vielen Fällen muss man die Karten offen zeigen können."
  }
]
```

---
id: `expressions_rose`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Rose ist eine der vier [Kartenfarben](./expressions_kartenfarben) der [deutschschweizerischen Spielkarten](./general_card_systems)

Zuordnung:
• Sie gehört zu den Grundfarben im Deutschschweizer Blatt

Verwendung:
• Wird in allen Varianten verwendet, die mit diesen traditionellen Karten gespielt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Rose beim Jassen?",
    "answer": "Rose (Rosen) ist eine der vier Kartenfarben der deutschschweizerischen Spielkarten."
  },
  {
    "question": "Welche Farbe entspricht Rose bei französischen Karten?",
    "answer": "Rose bei deutschen Karten entspricht Herz bei französischen Karten."
  },
  {
    "question": "Ist Rose eine rote Farbe?",
    "answer": "Ja, Rose ist neben Schellen eine der beiden roten Farben bei deutschschweizerischen Karten."
  }
]
```

---
id: `expressions_sack`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Sack ist eine Bezeichnung für einen [Nuller](./expressions_nuller) oder Minusstrich

Synonym:
• Dieser Begriff wird auch als [Härdöpfel](./expressions_haerdoepfel) bezeichnet

Entstehung:
• Bezeichnet [Minuspunkte](./expressions_minuspunkte), die ein Spieler erhält, wenn er bei Differenz-Jassarten sein angesagtes Ziel nicht erreicht

Ausgleich:
• Der Sack muss später durch positive Leistungen ausgeglichen werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Sack beim Jassen?",
    "answer": "Ein Sack ist eine Bezeichnung für einen Nuller oder Minusstrich bei Differenz-Jassarten."
  },
  {
    "question": "Wann bekommt man einen Sack?",
    "answer": "Man bekommt einen Sack, wenn man bei Differenz-Jassarten sein angesagtes Ziel nicht erreicht."
  },
  {
    "question": "Wie gleicht man einen Sack aus?",
    "answer": "Ein Sack muss später durch positive Leistungen ausgeglichen werden."
  }
]
```

---
id: `expressions_schaufel`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Schaufel ist eine der vier [Kartenfarben](./expressions_kartenfarben) der [französischen Spielkarten](./general_card_systems)

Zuordnung:
• Sie gehört zu den standardmässigen Farben

Verwendung:
• Wird in allen Jassvarianten verwendet, die mit französischen Karten gespielt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Schaufel beim Jassen?",
    "answer": "Schaufel (Pik) ist eine der vier Kartenfarben der französischen Spielkarten."
  },
  {
    "question": "Welche Farbe entspricht Schaufel bei deutschen Karten?",
    "answer": "Schaufel bei französischen Karten entspricht Schilten bei deutschschweizerischen Karten."
  },
  {
    "question": "Ist Schaufel eine schwarze Farbe?",
    "answer": "Ja, Schaufel ist neben Kreuz (Treff) eine der beiden schwarzen Farben bei französischen Karten."
  }
]
```

---
id: `expressions_schelle`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Schelle ist eine der vier [Kartenfarben](./expressions_kartenfarben) der [deutschschweizerischen Spielkarten](./general_card_systems)

Zuordnung:
• Sie gehört zu den traditionellen Farben des Deutschschweizer Blatts

Verwendung:
• Wird in allen Varianten verwendet, die mit diesen Karten gespielt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Schelle beim Jassen?",
    "answer": "Schelle (Schellen) ist eine der vier Kartenfarben der deutschschweizerischen Spielkarten."
  },
  {
    "question": "Welche Farbe entspricht Schelle bei französischen Karten?",
    "answer": "Schelle bei deutschen Karten entspricht Ecken (Karo) bei französischen Karten."
  },
  {
    "question": "Ist Schelle eine rote Farbe?",
    "answer": "Ja, Schelle ist neben Rosen eine der beiden roten Farben bei deutschschweizerischen Karten."
  }
]
```

---
id: `expressions_schilte`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Schilte ist eine der vier [Kartenfarben](./expressions_kartenfarben) der [deutschschweizerischen Spielkarten](./general_card_systems)

Zuordnung:
• Sie gehört zu den traditionellen Farben des Deutschschweizer Blatts

Verwendung:
• Wird in allen Varianten verwendet, die mit diesen Karten gespielt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Schilte beim Jassen?",
    "answer": "Schilte (Schilten) ist eine der vier Kartenfarben der deutschschweizerischen Spielkarten."
  },
  {
    "question": "Welche Farbe entspricht Schilte bei französischen Karten?",
    "answer": "Schilte bei deutschen Karten entspricht Schaufel (Pik) bei französischen Karten."
  },
  {
    "question": "Ist Schilte eine schwarze Farbe?",
    "answer": "Ja, Schilte ist neben Eichel eine der beiden schwarzen Farben bei deutschschweizerischen Karten."
  }
]
```

---
id: `expressions_schneider`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• [Schneider](./schneider) bezeichnet die Situation, wenn ein [Team](./expressions_team) die Hälfte des Ziels einer [Partie](./expressions_partie) nicht erreicht

Bedeutung:
• Dieser wichtige Begriff ist entscheidend für die Spielabrechnung und kann erhebliche Auswirkungen auf das Endergebnis haben

Strafe:
• Der Schneider wird in der Regel mit zusätzlichen Minuspunkten bestraft
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Schneider beim Jassen?",
    "answer": "Schneider bedeutet, dass ein Team die Hälfte des Ziels einer Partie nicht erreicht hat."
  },
  {
    "question": "Gibt es eine Strafe für Schneider?",
    "answer": "Ja, der Schneider wird in der Regel mit zusätzlichen Minuspunkten bestraft."
  },
  {
    "question": "Wie vermeidet man Schneider?",
    "answer": "Man muss mindestens die Hälfte der Zielpunktzahl erreichen, um nicht Schneider zu werden."
  }
]
```

---
id: `expressions_solokarte`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Eine Solokarte ist die einzige Karte einer Farbe, die ein Spieler in seinem [Blatt](./expressions_blatt) besitzt
• Diese Situation ist taktisch bedeutsam, da sie sowohl Möglichkeiten als auch Risiken birgt
• Der Spieler muss entscheiden, wann der richtige Zeitpunkt ist, diese Karte zu spielen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist eine Solokarte beim Jassen?",
    "answer": "Eine Solokarte ist die einzige Karte einer Farbe, die ein Spieler in seinem Blatt besitzt."
  },
  {
    "question": "Ist eine Solokarte gut oder schlecht?",
    "answer": "Eine Solokarte kann beides sein – sie bietet taktische Möglichkeiten, birgt aber auch Risiken, da man nach ihrem Einsatz in dieser Farbe abwerfen kann."
  },
  {
    "question": "Wann spielt man eine Solokarte?",
    "answer": "Der richtige Zeitpunkt zum Spielen einer Solokarte hängt von der taktischen Situation ab – manchmal will man schnell abwerfen können, manchmal eine wichtige Karte schützen."
  }
]
```

---
id: `expressions_stapel`
---

**Bereinigter Haupttext:**
```markdown
Grundkonzept:
• Der Stapel umfasst Karten, die während des Spiels möglicherweise aufgenommen werden können

Wichtiger Unterschied:
• Der Stapel unterscheidet sich vom [Stöck](./expressions_stock)
• Beide Begriffe werden manchmal ähnlich verwendet, sind aber nicht identisch
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Stapel beim Jassen?",
    "answer": "Der Stapel umfasst Karten, die während des Spiels möglicherweise aufgenommen werden können."
  },
  {
    "question": "Was ist der Unterschied zwischen Stapel und Stöck?",
    "answer": "Der Stapel und der Stöck werden manchmal ähnlich verwendet, bezeichnen aber unterschiedliche Kartenstapel je nach Spielvariante."
  },
  {
    "question": "Wer nimmt Karten vom Stapel?",
    "answer": "Der Spieler links vom Geber nimmt die Karten beim Abheben (Ablupf) vom Stapel."
  }
]
```

---
id: `expressions_stechkarten`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Stechkarten sind stechmässig höhere Karten als die im laufenden [Stich](./expressions_stich) gespielten

Bedeutung:
• Diese Karten sind wichtig für die taktische Spielplanung, da sie die Möglichkeit bieten, den Stich zu gewinnen

Hierarchie:
• Das Verständnis der Stechhierarchie ist entscheidend für erfolgreiches [Jassen](./general_introduction)
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind Stechkarten beim Jassen?",
    "answer": "Stechkarten sind stechmässig höhere Karten als die im laufenden Stich bereits gespielten Karten."
  },
  {
    "question": "Warum sind Stechkarten wichtig?",
    "answer": "Stechkarten sind wichtig für die taktische Spielplanung, da sie die Möglichkeit bieten, den Stich zu gewinnen."
  },
  {
    "question": "Was ist die höchste Stechkarte?",
    "answer": "Die höchste Stechkarte hängt von der Spielart ab. Bei Trumpf ist es der Trumpf-Bauer, bei anderen Farben normalerweise das Ass."
  }
]
```

---
id: `expressions_stich`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Ein Stich entsteht, wenn jeder Spieler genau eine Karte in einem Umgang ausgespielt hat
• Der Stich ist die grundlegende Einheit des [Spiels](./general_gameplay)
• Bildet die Basis für die Punktezählung
• Wer die höchste Karte legt, gewinnt den Stich
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Stich beim Jassen?",
    "answer": "Ein Stich entsteht, wenn jeder Spieler genau eine Karte in einem Umgang ausgespielt hat."
  },
  {
    "question": "Wer gewinnt den Stich?",
    "answer": "Wer die höchste Karte legt (unter Berücksichtigung von Trumpf und Farbe), gewinnt den Stich."
  },
  {
    "question": "Wie viele Stiche gibt es in einem Spiel?",
    "answer": "Bei den meisten Jassvarianten gibt es 9 Stiche pro Spiel, da jeder Spieler 9 Karten hat."
  }
]
```

---
id: `expressions_stock`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Als Stöck werden jene Karten bezeichnet, die beim Austeilen nicht an die Spieler verteilt werden
• Diese restlichen Karten spielen bei verschiedenen Spielvarianten eine wichtige Rolle
• Können im weiteren Spielverlauf aufgenommen werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Stöck beim Jassen?",
    "answer": "Der Stöck sind die Karten, die beim Austeilen nicht an die Spieler verteilt werden."
  },
  {
    "question": "Was macht man mit dem Stöck?",
    "answer": "Je nach Spielvariante können die Stöck-Karten im Spielverlauf aufgenommen oder haben andere spezielle Funktionen."
  },
  {
    "question": "Bei welchen Jassvarianten gibt es einen Stöck?",
    "answer": "Einen Stöck gibt es bei vielen Jassvarianten, besonders bei Handjass und Aucho."
  }
]
```

---
id: `expressions_stoeck_wys_stich`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• [Stöck-Wys-Stich](./weis_rules_ausmachen_order) ist eine klassische [Ausmachregel](./expressions_ausmachregel), die angewendet wird, wenn beide [Teams](./expressions_team) im selben [Stich](./expressions_stich) das Spielziel erreichen

Funktion:
• Diese Regel klärt die Situation und sorgt für einen fairen Spielabschluss

Herkunft:
• Der Name leitet sich von den drei Elementen ab: Stöck, Weis und Stich
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Stöck-Wys-Stich?",
    "answer": "Stöck-Wys-Stich ist eine Ausmachregel, die festlegt, in welcher Reihenfolge Punkte gezählt werden, wenn beide Teams gleichzeitig das Spielziel erreichen."
  },
  {
    "question": "In welcher Reihenfolge werden die Punkte gezählt?",
    "answer": "Zuerst werden Stöcke gezählt, dann Weise, und zuletzt die Stiche – in dieser Reihenfolge wird bestimmt, wer gewinnt."
  },
  {
    "question": "Wann wird diese Regel angewendet?",
    "answer": "Die Regel wird angewendet, wenn beide Teams im selben Stich das Spielziel erreichen."
  }
]
```

---
id: `expressions_stoecke`
---

**Bereinigter Haupttext:**
```markdown
Grundkonzept:
• Die [Stöcke](./weis_rules_stock) bezeichnen die Kombination aus Trumpf-König und Trumpf-Ober beziehungsweise Trumpf-Dame
• Diese wichtige Kartenkombination ist besonders wertvoll für [Weismeldungen](./expressions_weismeldung) und kann erheblich zum Erfolg beitragen, wenn sie strategisch eingesetzt wird
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind Stöcke beim Jassen?",
    "answer": "Stöcke sind die Kombination aus Trumpf-König und Trumpf-Ober (oder Trumpf-Dame bei französischen Karten)."
  },
  {
    "question": "Wie viele Punkte sind Stöcke wert?",
    "answer": "Stöcke sind 20 Weispunkte wert."
  },
  {
    "question": "Muss man Stöcke melden?",
    "answer": "Ja, Stöcke müssen wie andere Weise vor dem ersten Ausspiel gemeldet werden, um gültig zu sein."
  }
]
```

---
id: `expressions_streichpasse`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Als Streichpasse wird jene [Passe](./expressions_passe) bezeichnet, die bei einem Turnier gestrichen wird
• Handelt es sich in der Regel um die schlechteste Leistung eines Teilnehmers
• Diese Passe geht nicht in die Wertung ein
• Sichert so die faire Bewertung
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist eine Streichpasse?",
    "answer": "Eine Streichpasse ist die Passe, die bei einem Turnier gestrichen wird und nicht in die Wertung eingeht."
  },
  {
    "question": "Welche Passe wird gestrichen?",
    "answer": "In der Regel wird die schlechteste Passe eines Teilnehmers gestrichen."
  },
  {
    "question": "Warum gibt es Streichpassen?",
    "answer": "Streichpassen sorgen für eine fairere Bewertung, indem Ausreisser nach unten nicht zu stark ins Gewicht fallen."
  }
]
```

---
id: `expressions_team`
---

**Bereinigter Haupttext:**
```markdown
Grundkonzept:
• Ein Team besteht aus zwei oder drei Spielern
• Spieler treten gemeinsam gegen eine gegnerische Mannschaft an
• Zusammenarbeit im Team ist entscheidend für den Spielerfolg
• Erfordert gutes Zusammenspiel und Taktik
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Spieler hat ein Team beim Jassen?",
    "answer": "Ein Team besteht normalerweise aus zwei Spielern, bei manchen Varianten auch aus drei Spielern."
  },
  {
    "question": "Wie wichtig ist die Teamarbeit beim Jassen?",
    "answer": "Die Zusammenarbeit im Team ist entscheidend für den Spielerfolg und erfordert gutes Zusammenspiel und Taktik."
  },
  {
    "question": "Wer sitzt im Team zusammen?",
    "answer": "Die Teamspieler sitzen sich beim Schieber gegenüber (Vorhand und Hinterhand)."
  }
]
```

---
id: `expressions_tisch_weis`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Tisch-Weis sind [Weise](./weis_rules_general), die bei der Jassart Molotow entstehen

Entstehung:
• Sie ergeben sich direkt auf dem Tisch durch das Spielen der Karten im Verlauf des Spiels, anstatt bereits zu Beginn gemeldet zu werden

Anforderung:
• Diese besondere Form des Weises erfordert eine gute Beobachtungsgabe und schnelle Reaktion
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind Tisch-Weise?",
    "answer": "Tisch-Weise sind Weise, die bei Molotow direkt auf dem Tisch durch das Spielen der Karten entstehen."
  },
  {
    "question": "Wann werden Tisch-Weise gemeldet?",
    "answer": "Tisch-Weise werden nicht vorab gemeldet, sondern ergeben sich im Verlauf des Spiels durch die gespielten Karten."
  },
  {
    "question": "Bei welcher Jassart gibt es Tisch-Weise?",
    "answer": "Tisch-Weise gibt es vor allem bei der Jassart Molotow."
  }
]
```

---
id: `expressions_trumpf`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• [Trumpf](./general_trump_values) sind jene Karten, die alle übrigen Farben stechen können

Bestimmung:
• Die Trumpffarbe wird durch die Trumpfansage oder durch die spezifische Spielart bestimmt

Bedeutung:
• Trumpfkarten haben somit die höchste Stechkraft und sind entscheidend für den Spielverlauf
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Trumpf beim Jassen?",
    "answer": "Trumpf sind Karten einer bestimmten Farbe, die alle übrigen Farben stechen können."
  },
  {
    "question": "Wie wird die Trumpffarbe bestimmt?",
    "answer": "Die Trumpffarbe wird durch die Trumpfansage oder durch die spezifische Spielart bestimmt."
  },
  {
    "question": "Welche ist die stärkste Trumpfkarte?",
    "answer": "Der Trumpf-Bauer (Puur) ist die stärkste Trumpfkarte, gefolgt von der Nell (Trumpf-Neuner)."
  }
]
```

---
id: `expressions_trumpf_bauer`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Der [Trumpf-Bauer](./trumpf_bauer), auch Trumpf-Under oder Trumpf-Bube genannt, ist sowohl wert- als auch stechmässig die höchste Karte einer [Trumpffarbe](./general_trump_values)

Position:
• Diese einzigartige Position macht ihn zur wertvollsten Karte im gesamten Spiel

Einsatz:
• Sollte mit Bedacht eingesetzt werden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Trumpf-Bauer?",
    "answer": "Der Trumpf-Bauer (Puur) ist die höchste Karte einer Trumpffarbe und die wertvollste Karte im Spiel."
  },
  {
    "question": "Wie viele Punkte ist der Trumpf-Bauer wert?",
    "answer": "Der Trumpf-Bauer ist 20 Punkte wert."
  },
  {
    "question": "Kann der Trumpf-Bauer geschlagen werden?",
    "answer": "Nein, der Trumpf-Bauer kann von keiner anderen Karte geschlagen werden."
  }
]
```

---
id: `expressions_trumpf_bauer_kombinationen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Trumpf-Bauer-Kombinationen sind wichtige [Weismeldungen](./expressions_weismeldung), die aus dem [Trumpf-Bauer](./expressions_trumpf_bauer) und weiteren [Trumpfkarten](./expressions_trumpf) bestehen

Kombinationen:
• "zu dritt" (2 weitere), "zu viert" (3 weitere), "zu fünft" (4 weitere), "zu sechst" (5 weitere Trumpfkarten)

Wert:
• Diese Kombinationen erhöhen den Wert des [Weises](./weis_rules_general) erheblich
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind Trumpf-Bauer-Kombinationen?",
    "answer": "Trumpf-Bauer-Kombinationen sind Weismeldungen aus dem Trumpf-Bauer und weiteren aufeinanderfolgenden Trumpfkarten."
  },
  {
    "question": "Wie viele Punkte sind Trumpf-Bauer-Kombinationen wert?",
    "answer": "\"Zu dritt\" (Bauer, Nell, Ass) = 50 Punkte, \"zu viert\" = 100 Punkte, \"zu fünft\" = 150 Punkte, \"zu sechst\" = 200 Punkte."
  },
  {
    "question": "Muss man Trumpf-Bauer-Kombinationen melden?",
    "answer": "Ja, wie alle Weise müssen auch Trumpf-Bauer-Kombinationen vor dem ersten Ausspiel gemeldet werden."
  }
]
```

---
id: `expressions_verdeckte_ansage`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Die verdeckte Ansage ist die geschätzte Kartenpunktzahl bei der Jassart [Differenzler](./variants_strategic_differenzler_verdeckt)

Geheimhaltung:
• Sie wird für alle Spieler verdeckt angesagt, sodass kein Spieler die Ansagen der anderen kennt

Strategie:
• Diese Variante erhöht die Spannung und erfordert eine präzise Einschätzung der eigenen Chancen ohne Kenntnis der gegnerischen Pläne
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist die verdeckte Ansage beim Jassen?",
    "answer": "Die verdeckte Ansage ist die geschätzte Kartenpunktzahl beim Differenzler, die für alle Spieler geheim bleibt."
  },
  {
    "question": "Was ist der Unterschied zur offenen Ansage?",
    "answer": "Bei der verdeckten Ansage kennen die Spieler die Ansagen der anderen nicht, bei der offenen Ansage sind sie für alle sichtbar."
  },
  {
    "question": "Welche Strategie erfordert die verdeckte Ansage?",
    "answer": "Die verdeckte Ansage erfordert eine präzise Einschätzung der eigenen Chancen ohne Kenntnis der gegnerischen Pläne."
  }
]
```

---
id: `expressions_vogel`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Der Vogel wird durch das Notieren eines "V" gekennzeichnet

Zwick-Jass:
• Beim [Zwick-Jass](./variants_multi_player_zwick_jass) entspricht dies fünf abzuverdienenden Minusstrichen

Schieber:
• Beim [Schieber](./schieber_taktiken_basics) bedeutet ein Vogel 500 Schreibpunkte

Verwendung:
• Dieser Begriff wird verwendet, um bestimmte Spielsituationen zu dokumentieren und in die Abrechnung einzubeziehen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Vogel beim Jassen?",
    "answer": "Ein Vogel ist ein Notationszeichen (\"V\"), das je nach Spielvariante unterschiedliche Bedeutungen hat."
  },
  {
    "question": "Was bedeutet ein Vogel beim Schieber?",
    "answer": "Beim Schieber bedeutet ein Vogel 500 Schreibpunkte."
  },
  {
    "question": "Was bedeutet ein Vogel beim Zwick-Jass?",
    "answer": "Beim Zwick-Jass entspricht ein Vogel fünf abzuverdienenden Minusstrichen."
  }
]
```

---
id: `expressions_vorhand`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Die Vorhand ist der Spieler, der rechts vom Geber sitzt
• Sie spielt als Erste eine Karte aus

Strategische Vorteile:
• Die Position bietet strategische Vorteile
• Der Spieler hat den ersten Zug und kann damit den Rhythmus des Spiels mitbestimmen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist die Vorhand beim Jassen?",
    "answer": "Die Vorhand ist der Spieler, der rechts vom Geber sitzt und als Erster eine Karte ausspielt."
  },
  {
    "question": "Welche Vorteile hat die Vorhand?",
    "answer": "Die Vorhand hat den ersten Zug und kann damit den Rhythmus des Spiels mitbestimmen."
  },
  {
    "question": "Wer sitzt wo beim Schieber?",
    "answer": "Die Vorhand sitzt rechts vom Geber, gegenüber sitzt die Hinterhand (Partner), links vom Geber die Mittelhand."
  }
]
```

---
id: `expressions_weis`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Ein [Weis](./weis_rules_general) ist eine wertvolle Kartenkombination, die auf verschiedene Weise entstehen kann: Entweder durch aufeinanderfolgende Karten der gleichen Farbe wie Ober, König und Ass, oder durch vier Karten mit gleichen Bildern

Weismeldung:
• Bei der [Weismeldung](./expressions_weismeldung) wird die Weishöhe angesagt

Weisdeklaration:
• Bei der [Weisdeklaration](./expressions_weisdeklaration) wird die genaue Kartenkombination bekanntgegeben

Weispunkte:
• Die [Weispunkte](./expressions_weispunkte) bewerten den Wert des Weises
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Weis beim Jassen?",
    "answer": "Ein Weis ist eine wertvolle Kartenkombination aus aufeinanderfolgenden Karten derselben Farbe oder vier gleichen Karten."
  },
  {
    "question": "Wann muss man Weise melden?",
    "answer": "Weise müssen vor dem ersten Ausspiel gemeldet werden, um gültig zu sein."
  },
  {
    "question": "Wie viele Punkte ist ein Weis wert?",
    "answer": "Der Wert variiert: Dreiblatt = 20 Punkte, Vierblatt = 50 Punkte, und so weiter. Vier gleiche Karten = 100-200 Punkte."
  }
]
```

---
id: `expressions_weisdeklaration`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Die Weisdeklaration ist die Bekanntgabe, aus welchen Karten sich der gültige [Weis](./weis_rules_general) zusammensetzt

Ablauf:
• Diese erfolgt nach der [Weismeldung](./expressions_weismeldung)

Funktion:
• Gibt den anderen Spielern Aufschluss über die genaue Kartenkombination

Bedeutung:
• Die Weisdeklaration ist wichtig für die Spielabrechnung und die strategische Planung der weiteren Spielzüge
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist die Weisdeklaration?",
    "answer": "Die Weisdeklaration ist die Bekanntgabe, aus welchen konkreten Karten sich der gültige Weis zusammensetzt."
  },
  {
    "question": "Wann erfolgt die Weisdeklaration?",
    "answer": "Die Weisdeklaration erfolgt nach der Weismeldung, wenn geklärt werden muss, welcher Weis höher ist."
  },
  {
    "question": "Muss man den Weis immer deklarieren?",
    "answer": "Nein, nur wenn ein anderer Spieler einen gleich hohen oder höheren Weis meldet, muss man zur Klärung deklarieren."
  }
]
```

---
id: `expressions_weismeldung`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Die Weismeldung ist die Ansage der Weishöhe durch den Spieler, der einen [Weis](./weis_rules_general) besitzt

Bedeutung:
• Dies ist ein wichtiger Moment im Spielablauf, da die Meldung den Wert des Weises bekanntgibt und in die Spielabrechnung einfliesst

Timing:
• Die Weismeldung erfolgt meist zu Beginn des Spiels oder zu einem bestimmten Zeitpunkt, je nach Spielvariante
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist die Weismeldung?",
    "answer": "Die Weismeldung ist die Ansage der Weishöhe durch den Spieler, der einen Weis besitzt."
  },
  {
    "question": "Wann meldet man Weise?",
    "answer": "Weise werden vor dem ersten Ausspiel gemeldet."
  },
  {
    "question": "Wie meldet man einen Weis?",
    "answer": "Man meldet die Höhe des Weises, z.B. \"20\", \"50\" oder \"100\". Nur bei Gleichstand muss man zur Klärung deklarieren."
  }
]
```

---
id: `expressions_weispunkte`
---

**Bereinigter Haupttext:**
```markdown
Definition:
• Weispunkte sind die Bewertung des [Weises](./weis_rules_general), die je nach Art und Höhe des Weises unterschiedlich ausfallen

Integration:
• Die Punktzahlen werden in die Spielabrechnung einbezogen und können den Spielverlauf erheblich beeinflussen

Wert:
• Ein höherer Weis bringt entsprechend mehr Weispunkte ein, was sich positiv auf die Gesamtpunktzahl auswirkt
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind Weispunkte?",
    "answer": "Weispunkte sind die Bewertung eines Weises, die je nach Art und Höhe unterschiedlich ausfällt."
  },
  {
    "question": "Wie viele Weispunkte gibt es?",
    "answer": "Dreiblatt = 20, Vierblatt = 50, Fünfblatt = 100, etc. Vier gleiche Karten = 100-200 Punkte."
  },
  {
    "question": "Wann werden Weispunkte gezählt?",
    "answer": "Weispunkte werden am Ende des Spiels zur Gesamtpunktzahl hinzugezählt."
  }
]
```

---
id: `expressions_anziehen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
[Anziehen](./schieber_taktiken_anziehen) ist eine Spielaktion beim Jassen, bei der ein Spieler seinem [Partner](./schieber_taktiken_partner) durch das Ausspielen einer bestimmten [Karte](./general_card_basics) signalisiert, welche Farbe bei ihm besonders stark ist.

Bedeutung:
• Diese Spielaktion zeigt dem Partner, dass man in dieser Farbe gute Karten besitzt
• Ermöglicht eine bessere Koordination innerhalb des [Teams](./expressions_team)
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Anziehen beim Jassen?",
    "answer": "Anziehen ist eine Spielaktion, bei der ein Spieler seinem Partner durch das Ausspielen einer bestimmten Karte signalisiert, welche Farbe bei ihm besonders stark ist."
  },
  {
    "question": "Wann zieht man beim Jassen an?",
    "answer": "Man zieht typischerweise an, wenn man in einer bestimmten Farbe gute Karten besitzt und dem Partner signalisieren möchte, dass diese Farbe stark ist."
  },
  {
    "question": "Wie hilft Anziehen dem Team?",
    "answer": "Anziehen ermöglicht eine bessere Koordination innerhalb des Teams, da der Partner erfährt, in welcher Farbe man viele oder starke Karten hat."
  }
]
```

---
id: `expressions_bedanken`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Das [Bedanken](./bedanken) ist eine verbindliche Aussage, mit der ein Spieler das aktuelle [Spiel](./general_game_basics) beendet.

Bedeutung für die Punkteabrechnung:
• Dieser wichtige Moment ist entscheidend für die [Punkteabrechnung](./general_scoring_rules)
• Hier werden die finalen Punkte ermittelt und dem entsprechenden [Team](./expressions_team) gutgeschrieben
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was passiert beim Bedanken?",
    "answer": "Beim Bedanken beendet ein Spieler verbindlich das aktuelle Spiel, woraufhin die Punkte abgerechnet werden."
  },
  {
    "question": "Wann muss man sich bedanken?",
    "answer": "Man bedankt sich, wenn man glaubt, dass das eigene Team genügend Punkte erreicht hat, um das Spiel zu gewinnen."
  },
  {
    "question": "Kann man das Bedanken zurücknehmen?",
    "answer": "Nein, das Bedanken ist eine verbindliche Aussage und kann nicht zurückgenommen werden."
  }
]
```

---
id: `expressions_bessern`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Das Bessern bezeichnet den Austausch von vermeintlich schlechten [Karten](./general_card_basics) gegen möglicherweise bessere.

Charakteristik:
• Diese taktische Spielaktion ist ein wichtiges Element in bestimmten [Spielvarianten](./general_variants)
• Erfordert eine gute Einschätzung der eigenen Chancen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Bessern beim Jassen?",
    "answer": "Bessern bezeichnet den Austausch von vermeintlich schlechten Karten gegen möglicherweise bessere Karten."
  },
  {
    "question": "In welchen Jassvarianten kann man bessern?",
    "answer": "Das Bessern ist ein Element in bestimmten Spielvarianten, wie zum Beispiel beim Handjass."
  },
  {
    "question": "Wann sollte man bessern?",
    "answer": "Das Bessern erfordert eine gute Einschätzung der eigenen Chancen - man sollte bessern, wenn man glaubt, dass die neuen Karten besser sein werden als die alten."
  }
]
```

---
id: `expressions_erben`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Wenn ein Spielgeber nicht mitspielt, erhält er die vereinbarten Schreibpunkte. Dies wird als Erben bezeichnet.

Zweck:
Diese Regelung sorgt für eine faire Beteiligung, auch bei Spielern, die gerade nicht aktiv am [Spiel](./general_game_basics) teilnehmen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Erben beim Jassen?",
    "answer": "Erben bedeutet, dass ein Spielgeber, der nicht mitspielt, trotzdem die vereinbarten Schreibpunkte erhält."
  },
  {
    "question": "Warum gibt es die Erben-Regelung?",
    "answer": "Diese Regelung sorgt für eine faire Beteiligung, auch bei Spielern, die gerade nicht aktiv am Spiel teilnehmen."
  },
  {
    "question": "Wer erbt beim Jassen?",
    "answer": "Der Spielgeber, also derjenige, der die Karten verteilt hat, erbt die vereinbarten Punkte, wenn er selbst nicht mitspielt."
  }
]
```

---
id: `expressions_farbenhalten`
---

**Bereinigter Haupttext:**
```markdown
Definition:
[Farben](./expressions_kartenfarben) oder [Leih halten](./expressions_leih_halten) bedeutet, dass man eine [Karte](./general_card_basics) der ausgespielten Farbe spielen muss, sofern man eine solche Karte besitzt.

Wichtig:
Diese Regel zählt zu den grundlegenden [Spielregeln](./general_most_important_rules) beim Jassen und muss von jedem Spieler strikt befolgt werden.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Farben halten?",
    "answer": "Farben halten bedeutet, dass man eine Karte der ausgespielten Farbe spielen muss, sofern man eine solche Karte besitzt."
  },
  {
    "question": "Muss man immer Farben halten?",
    "answer": "Ja, dies ist eine grundlegende Spielregel beim Jassen und muss von jedem Spieler strikt befolgt werden."
  },
  {
    "question": "Was passiert, wenn man nicht Farben hält?",
    "answer": "Wenn man nicht Farben hält, obwohl man könnte, begeht man einen Regelverstoss, der zu Konsequenzen führen kann."
  }
]
```

---
id: `expressions_fort`
---

**Bereinigter Haupttext:**
```markdown
Definition:
[Fort](./expressions_passen) ist die Bemerkung, die ein Spieler äussert, wenn er kein Angebot mehr machen kann oder möchte.

Verwendung:
Diese Spielaktion kommt besonders bei der Jassart [Bieter](./variants_strategic_bieter_vier) (auch Steiger genannt) zum Einsatz und beendet für diesen Spieler die Bietphase.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Fort beim Jassen?",
    "answer": "Fort ist die Bemerkung, die ein Spieler äussert, wenn er kein Angebot mehr machen kann oder möchte."
  },
  {
    "question": "Wann sagt man Fort?",
    "answer": "Man sagt Fort besonders bei der Jassart Bieter (auch Steiger genannt), um die Bietphase für sich zu beenden."
  },
  {
    "question": "Ist Fort das gleiche wie Passen?",
    "answer": "Ja, Fort und Passen bedeuten dasselbe beim Jassen."
  }
]
```

---
id: `expressions_kehr`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Kehr ist eine Spielübernahme bei der Jassart [Aucho](./variants_strategic_aucho_vier) (oder Augen).

Ablauf:
• Die [Karten](./general_card_basics) werden einzeln vom [Lukas](./expressions_lukas) (Stock) aufgedeckt und umgedreht, bis die Entscheidung über die [Trumpffarbe](./general_trump_values) getroffen wird
• Diese besondere Spielweise bringt zusätzliche Spannung ins Spiel
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Kehr beim Jassen?",
    "answer": "Der Kehr ist eine Spielübernahme bei der Jassart Aucho, bei der Karten einzeln aufgedeckt werden, bis die Trumpffarbe bestimmt ist."
  },
  {
    "question": "Bei welcher Jassvariante gibt es den Kehr?",
    "answer": "Der Kehr kommt bei der Jassart Aucho (oder Augen) zum Einsatz."
  },
  {
    "question": "Was macht den Kehr besonders?",
    "answer": "Beim Kehr werden die Karten einzeln vom Lukas aufgedeckt, was zusätzliche Spannung ins Spiel bringt."
  }
]
```

---
id: `expressions_leih_halten`
---

**Bereinigter Haupttext:**
```markdown
Definition:
[Leih halten](./expressions_farbenhalten) bedeutet, die [Farbe](./expressions_kartenfarben) zu bekennen, also eine [Karte](./general_card_basics) der ausgespielten Farbe anzugeben.

Regel:
Dies ist eine grundlegende [Spielregel](./general_most_important_rules) im Jass und muss strikt befolgt werden, sofern der Spieler eine entsprechende Karte besitzt.

Funktion:
Diese Regel sorgt für eine faire Spielweise und klare Spielmechanik.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Leih halten?",
    "answer": "Leih halten bedeutet, die Farbe zu bekennen, also eine Karte der ausgespielten Farbe anzugeben."
  },
  {
    "question": "Muss man immer Leih halten?",
    "answer": "Ja, dies ist eine grundlegende Spielregel im Jass und muss strikt befolgt werden, sofern man eine entsprechende Karte besitzt."
  },
  {
    "question": "Was ist der Unterschied zwischen Leih halten und Farben halten?",
    "answer": "Leih halten und Farben halten bedeuten dasselbe - beide Begriffe beschreiben die Pflicht, die ausgespielte Farbe zu bedienen."
  }
]
```

---
id: `expressions_passen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Passen (oder [Fort](./expressions_fort)) ist die Bemerkung, die ein Spieler äussert, wenn er kein Angebot mehr machen kann oder möchte.

Besonders relevant:
Diese Spielaktion kommt besonders bei der Jassart [Bieter](./variants_strategic_bieter_vier) (auch Steiger genannt) häufig zum Einsatz und beendet die Bietphase für den jeweiligen Spieler.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Passen beim Jassen?",
    "answer": "Passen ist die Bemerkung, die ein Spieler äussert, wenn er kein Angebot mehr machen kann oder möchte."
  },
  {
    "question": "Wann sagt man Passen?",
    "answer": "Man sagt Passen besonders bei der Jassart Bieter, um anzuzeigen, dass man nicht mehr mitbieten möchte."
  },
  {
    "question": "Ist Passen das gleiche wie Fort?",
    "answer": "Ja, Passen und Fort sind synonyme Begriffe und bedeuten dasselbe."
  }
]
```

---
id: `expressions_rauben`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Das Rauben bezeichnet eine [Trumpfkarte](./general_trump_values), die mit einer bestimmten anderen [Karte](./general_card_basics) getauscht werden kann.

Wichtig:
• Die genaue Regelung dieser Spielaktion variiert je nach gespielter [Jassart](./general_variants)
• Sollte daher vor dem Spiel genau geklärt werden, um Missverständnisse zu vermeiden
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Rauben beim Jassen?",
    "answer": "Rauben bezeichnet eine Trumpfkarte, die mit einer bestimmten anderen Karte getauscht werden kann."
  },
  {
    "question": "Ist das Rauben bei allen Jassvarianten gleich?",
    "answer": "Nein, die genaue Regelung des Raubens variiert je nach gespielter Jassart."
  },
  {
    "question": "Was sollte man vor dem Spiel klären?",
    "answer": "Man sollte vor dem Spiel genau klären, wie das Rauben gehandhabt wird, um Missverständnisse zu vermeiden."
  }
]
```

---
id: `expressions_schieben`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Das Schieben bedeutet, dass die [Vorhand](./expressions_vorhand) die Entscheidung über den [Trumpf](./general_trump_values) einem anderen Spieler überlässt.

Beim Schieber:
• Die Vorhand überträgt diese wichtige Entscheidung ihrem [Partner](./schieber_taktiken_partner)
• Gibt dem Spiel seinen charakteristischen Namen und rückt die Teamarbeit in den Vordergrund
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Schieben beim Jassen?",
    "answer": "Schieben bedeutet, dass die Vorhand die Entscheidung über den Trumpf einem anderen Spieler überlässt."
  },
  {
    "question": "Wer entscheidet beim Schieber über den Trumpf?",
    "answer": "Beim Schieber überträgt die Vorhand die Trumpf-Entscheidung ihrem Partner."
  },
  {
    "question": "Warum heisst der Schieber so?",
    "answer": "Der Name \"Schieber\" kommt davon, dass die Vorhand die Trumpf-Entscheidung zum Partner \"schiebt\"."
  }
]
```

---
id: `expressions_schlecken`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Beim Schlecken kann ein Spieler nach dem Ablupf bei der Jassart Zwick-Jass die unterste [Karte](./general_card_basics) des [Stocks](./expressions_stock) (Lukas) nehmen.

Vorteil:
• Diese besondere Spielaktion eröffnet zusätzliche taktische Möglichkeiten
• Macht diese [Variante](./general_variants) besonders interessant
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Schlecken beim Jassen?",
    "answer": "Beim Schlecken kann ein Spieler nach dem Ablupf die unterste Karte des Stocks nehmen."
  },
  {
    "question": "Bei welcher Jassvariante gibt es das Schlecken?",
    "answer": "Das Schlecken kommt bei der Jassart Zwick-Jass vor."
  },
  {
    "question": "Was ist der Vorteil des Schleckens?",
    "answer": "Das Schlecken eröffnet zusätzliche taktische Möglichkeiten und macht diese Variante besonders interessant."
  }
]
```

---
id: `expressions_schmieren`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Das Schmieren bedeutet, dass man seinem [Partner](./schieber_taktiken_partner) punktemässig wertvolle [Karten](./general_card_basics) zu seinem [Stich](./expressions_stich) beigibt.

Bedeutung:
• Diese wichtige taktische Spielaktion stärkt die Teamarbeit
• Hilft dabei, möglichst viele [Punkte](./general_scoring_rules) zu sammeln
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Schmieren beim Jassen?",
    "answer": "Schmieren bedeutet, dass man seinem Partner punktemässig wertvolle Karten zu seinem Stich beigibt."
  },
  {
    "question": "Wann sollte man schmieren?",
    "answer": "Man sollte schmieren, wenn der Partner einen Stich macht, um möglichst viele Punkte für das Team zu sammeln."
  },
  {
    "question": "Warum ist Schmieren wichtig?",
    "answer": "Schmieren ist eine wichtige taktische Spielaktion, die die Teamarbeit stärkt und hilft, möglichst viele Punkte zu sammeln."
  }
]
```

---
id: `expressions_untertrumpfen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
[Untertrumpfen](./untertrumpfen) bedeutet, dass man einem bereits laufenden [Stich](./expressions_stich) eine [Trumpfkarte](./general_trump_values) beigibt, die stechmässig niedriger ist als bereits im Stich vorhandene Trumpfkarten.

Vorteil:
• Diese taktische Spielaktion ermöglicht es, den Stich zu gewinnen, ohne dabei die höchsten Trumpfkarten einsetzen zu müssen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Untertrumpfen?",
    "answer": "Untertrumpfen bedeutet, dass man einem Stich eine Trumpfkarte beigibt, die niedriger ist als bereits vorhandene Trumpfkarten."
  },
  {
    "question": "Wann darf man untertrumpfen?",
    "answer": "Man darf untertrumpfen, wenn man die ausgespielte Farbe nicht mehr besitzt und nur noch niedrigere Trumpfkarten hat als bereits im Stich liegen."
  },
  {
    "question": "Was ist der Vorteil vom Untertrumpfen?",
    "answer": "Der Vorteil ist, dass man den Stich gewinnen kann, ohne dabei die höchsten Trumpfkarten einsetzen zu müssen."
  }
]
```

---
id: `expressions_unterzug`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Beim Unterzug spielt man absichtlich eine stechmässig niedrige [Karte](./general_card_basics) aus einer starken und langen Farbe, mit dem Ziel, den [Stich](./expressions_stich) nicht zu gewinnen.

Taktischer Zweck:
• Diese Spielaktion wird eingesetzt, wenn man den Stich lieber dem [Partner](./schieber_taktiken_partner) oder einem Gegner überlassen möchte
• Hohe Karten werden für spätere entscheidende Stiche aufgehoben
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Unterzug beim Jassen?",
    "answer": "Beim Unterzug spielt man absichtlich eine niedrige Karte aus einer starken Farbe, um den Stich nicht zu gewinnen."
  },
  {
    "question": "Warum macht man einen Unterzug?",
    "answer": "Man macht einen Unterzug, wenn man den Stich lieber dem Partner oder einem Gegner überlassen möchte und hohe Karten für später aufheben will."
  },
  {
    "question": "Wann ist ein Unterzug sinnvoll?",
    "answer": "Ein Unterzug ist sinnvoll, wenn man eine starke, lange Farbe hat, aber den Stich strategisch nicht gewinnen möchte."
  }
]
```

---
id: `expressions_verwerfen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Das [Verwerfen](./schieber_taktiken_verwerfen) bezeichnet das Beigeben von [Karten](./general_card_basics) aus einer schwachen Farbe zu einem [Stich](./expressions_stich). Diese Spielaktion signalisiert dem [Partner](./schieber_taktiken_partner), dass man in dieser Farbe keine guten Karten besitzt.

Zweck:
Auf diese Weise kann man wichtige Informationen an den Partner weitergeben und die Teamkoordination verbessern.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Verwerfen beim Jassen?",
    "answer": "Verwerfen bezeichnet das Beigeben von Karten aus einer schwachen Farbe zu einem Stich."
  },
  {
    "question": "Was signalisiert das Verwerfen dem Partner?",
    "answer": "Das Verwerfen signalisiert dem Partner, dass man in dieser Farbe keine guten Karten besitzt."
  },
  {
    "question": "Warum ist Verwerfen wichtig?",
    "answer": "Durch das Verwerfen kann man wichtige Informationen an den Partner weitergeben und die Teamkoordination verbessern."
  }
]
```

---
id: `expressions_bauernpartei`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Die Bauernpartei ist das gegnerische [Team](./expressions_team) des Meistbietenden bei der Jassart [Bieter](./variants_strategic_bieter_vier) (auch Steiger genannt).

Bedeutung:
Diese Spielergruppe übernimmt eine wichtige taktische Rolle im Spielverlauf und muss strategisch gegen das überbietende Team vorgehen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist die Bauernpartei?",
    "answer": "Die Bauernpartei ist das gegnerische Team des Meistbietenden bei der Jassart Bieter."
  },
  {
    "question": "Welche Rolle hat die Bauernpartei?",
    "answer": "Die Bauernpartei muss strategisch gegen das überbietende Team (Königspartei) vorgehen."
  },
  {
    "question": "Bei welcher Jassvariante gibt es die Bauernpartei?",
    "answer": "Die Bauernpartei gibt es bei der Jassart Bieter (auch Steiger genannt)."
  }
]
```

---
id: `expressions_guschti`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Guschti (auch Zwischendurch oder Quer genannt) ist eine [Trumpf](./general_trump_values)-Variante ohne feste Trumpffarbe.

Ablauf:
• Es werden vier [Stiche](./expressions_stich) nach [Obenabe](./expressions_obenabe)-Regeln und fünf Stiche nach [Undenufe](./expressions_undenufe)-Regeln gespielt
• Die Reihenfolge kann auch umgekehrt sein

Charakteristik:
Diese [Variante](./general_variants) bringt Abwechslung ins Spiel.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Guschti?",
    "answer": "Guschti ist eine Trumpf-Variante ohne feste Trumpffarbe, bei der Obenabe und Undenufe kombiniert werden."
  },
  {
    "question": "Wie funktioniert Guschti?",
    "answer": "Bei Guschti werden vier Stiche nach Obenabe-Regeln und fünf Stiche nach Undenufe-Regeln gespielt."
  },
  {
    "question": "Kann man die Reihenfolge bei Guschti ändern?",
    "answer": "Ja, die Reihenfolge (ob zuerst Obenabe oder Undenufe) kann auch umgekehrt sein."
  }
]
```

---
id: `expressions_hindersi`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Hindersi ist eine [Spielvariante](./general_variants) mit umgekehrter Punktezählung.

Spielziel:
Das Ziel ist es, möglichst wenige Kartenpunkte zu erreichen, was eine völlig andere Spielstrategie erfordert als beim normalen Jass. Wer die wenigsten [Punkte](./general_scoring_rules) sammelt, gewinnt diese Variante.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Hindersi?",
    "answer": "Hindersi ist eine Spielvariante mit umgekehrter Punktezählung, bei der das Ziel ist, möglichst wenige Punkte zu erreichen."
  },
  {
    "question": "Wer gewinnt bei Hindersi?",
    "answer": "Bei Hindersi gewinnt, wer die wenigsten Kartenpunkte sammelt."
  },
  {
    "question": "Ist die Strategie bei Hindersi anders?",
    "answer": "Ja, Hindersi erfordert eine völlig andere Spielstrategie als beim normalen Jass, da man wenige statt viele Punkte sammeln möchte."
  }
]
```

---
id: `expressions_joker`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Joker (oder Knecht) ist der fünfte Spieler bei der Jassart Schieber zu fünft.

Charakteristik:
• Diese spezielle Position hat eigene Regeln und bringt eine interessante Dynamik in das sonst vierköpfige [Spiel](./general_game_basics)
• Der Joker kann flexibel eingesetzt werden und muss sich taktisch anpassen
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Joker beim Jassen?",
    "answer": "Der Joker ist der fünfte Spieler bei der Jassart Schieber zu fünft."
  },
  {
    "question": "Welche Besonderheiten hat der Joker?",
    "answer": "Der Joker hat eigene Regeln, kann flexibel eingesetzt werden und muss sich taktisch an die Spielsituation anpassen."
  },
  {
    "question": "Wie nennt man den Joker noch?",
    "answer": "Der Joker wird auch Knecht genannt."
  }
]
```

---
id: `expressions_koenigspartei`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Die Königspartei besteht aus dem Meistbietenden und seinem [Partner](./schieber_taktiken_partner) bei der Jassart [Bieter](./variants_strategic_bieter_vier) (auch Steiger genannt), wenn mit fünf Spielern gespielt wird.

Bedeutung:
Diese strategisch wichtige Spielergruppe muss gemeinsam gegen die [Bauernpartei](./expressions_bauernpartei) antreten und koordiniert vorgehen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist die Königspartei?",
    "answer": "Die Königspartei besteht aus dem Meistbietenden und seinem Partner bei der Jassart Bieter mit fünf Spielern."
  },
  {
    "question": "Gegen wen spielt die Königspartei?",
    "answer": "Die Königspartei spielt gegen die Bauernpartei."
  },
  {
    "question": "Wie wichtig ist die Koordination bei der Königspartei?",
    "answer": "Die Koordination ist sehr wichtig - die beiden Spieler der Königspartei müssen koordiniert gegen die Bauernpartei vorgehen."
  }
]
```

---
id: `expressions_kreuzweis`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Kreuzweis ist eine spezielle [Weisform](./weis_rules_general), bei der zwei Weise vorhanden sind, in denen jeweils die gleiche [Karte](./general_card_basics) vorkommt.

Bedeutung:
Diese besondere Konstellation erfordert eine geschickte Deklaration und kann zu interessanten Spielsituationen führen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist ein Kreuzweis?",
    "answer": "Ein Kreuzweis ist eine spezielle Weisform, bei der zwei Weise vorhanden sind, in denen jeweils die gleiche Karte vorkommt."
  },
  {
    "question": "Was ist das Besondere am Kreuzweis?",
    "answer": "Das Besondere ist, dass dieselbe Karte in beiden Weisen vorkommt, was eine geschickte Deklaration erfordert."
  },
  {
    "question": "Kann ein Kreuzweis zu besonderen Situationen führen?",
    "answer": "Ja, ein Kreuzweis kann zu interessanten Spielsituationen führen."
  }
]
```

---
id: `expressions_misere`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Die Misère ist eine Spezialvariante bei [Pandur](./variants_strategic_pandur) und [Bieter](./variants_strategic_bieter_vier), bei der der Spielübernehmer keinen einzigen [Stich](./expressions_stich) machen darf, was diese Variante besonders herausfordernd macht.

Variation:
Bei manchen Spielgruppen wird Misère auch als Schieber-Variante gespielt, was zusätzliche taktische Möglichkeiten eröffnet.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist eine Misère?",
    "answer": "Die Misère ist eine Spezialvariante, bei der der Spielübernehmer keinen einzigen Stich machen darf."
  },
  {
    "question": "Bei welchen Jassvarianten gibt es die Misère?",
    "answer": "Die Misère gibt es bei Pandur und Bieter, manchmal auch als Schieber-Variante."
  },
  {
    "question": "Warum ist die Misère herausfordernd?",
    "answer": "Die Misère ist besonders herausfordernd, weil man aktiv vermeiden muss, Stiche zu machen, was eine komplett andere Strategie erfordert."
  }
]
```

---
id: `expressions_obenabe`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Obenabe ist eine [Trumpf](./general_trump_values)-Variante ohne feste Trumpffarbe, bei der die stechhöchsten [Karten](./general_card_basics) von oben nach unten zählen. Dies bedeutet, dass die normalerweise höchsten Karten auch in dieser Variante die stärksten sind.

Charakteristik:
Diese Regelung macht die Spielweise besonders interessant.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Obenabe?",
    "answer": "Obenabe ist eine Trumpf-Variante ohne feste Trumpffarbe, bei der die höchsten Karten von oben nach unten zählen."
  },
  {
    "question": "Welche Karten sind bei Obenabe am stärksten?",
    "answer": "Bei Obenabe sind die normalerweise höchsten Karten (Ass, König, etc.) auch die stärksten."
  },
  {
    "question": "Gibt es bei Obenabe eine Trumpffarbe?",
    "answer": "Nein, Obenabe ist eine Variante ohne feste Trumpffarbe."
  }
]
```

---
id: `expressions_slalom`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Slalom (oder Zickzack) ist eine spezielle [Trumpf](./general_trump_values)-Variante ohne feste Trumpffarbe.

Ablauf:
Es wird abwechselnd je ein [Stich](./expressions_stich) nach [Undenufe](./expressions_undenufe)-Regeln und dann nach [Obenabe](./expressions_obenabe)-Regeln gespielt, wobei die Reihenfolge auch umgekehrt sein kann.

Anforderung:
Diese [Variante](./general_variants) erfordert viel Aufmerksamkeit und strategisches Denken.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Slalom beim Jassen?",
    "answer": "Slalom ist eine Trumpf-Variante, bei der abwechselnd nach Undenufe- und Obenabe-Regeln gespielt wird."
  },
  {
    "question": "Wie funktioniert Slalom?",
    "answer": "Bei Slalom wird abwechselnd je ein Stich nach Undenufe-Regeln und dann nach Obenabe-Regeln gespielt."
  },
  {
    "question": "Ist Slalom schwierig zu spielen?",
    "answer": "Ja, Slalom erfordert viel Aufmerksamkeit und strategisches Denken, da man ständig zwischen zwei verschiedenen Regelwerken wechseln muss."
  }
]
```

---
id: `expressions_trio`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Trio (oder 3×3) ist eine komplexe [Trumpf](./general_trump_values)-Variante, bei der drei [Stiche](./expressions_stich) mit Trumpf, drei Stiche nach [Undenufe](./expressions_undenufe)-Regeln und drei Stiche nach [Obenabe](./expressions_obenabe)-Regeln gespielt werden.

Taktische Flexibilität:
Die Reihenfolge dieser drei Spielarten ist frei wählbar, was dem Spieler taktische Flexibilität gibt.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Trio beim Jassen?",
    "answer": "Trio ist eine komplexe Trumpf-Variante, bei der drei Stiche mit Trumpf, drei mit Undenufe und drei mit Obenabe gespielt werden."
  },
  {
    "question": "Kann man bei Trio die Reihenfolge wählen?",
    "answer": "Ja, die Reihenfolge der drei Spielarten ist frei wählbar, was taktische Flexibilität gibt."
  },
  {
    "question": "Wie viele Stiche hat ein Trio-Spiel?",
    "answer": "Ein Trio-Spiel hat wie üblich 9 Stiche, aufgeteilt in 3×3 (3 Trumpf, 3 Undenufe, 3 Obenabe)."
  }
]
```

---
id: `expressions_undenufe`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Undenufe ist eine [Trumpf](./general_trump_values)-Variante ohne feste Trumpffarbe, bei der die stechhöchsten [Karten](./general_card_basics) von unten nach oben zählen. Dies bedeutet, dass die normalerweise niedrigsten Karten in dieser Variante die stärksten sind.

Charakteristik:
Diese Umkehrung macht das [Spiel](./general_game_basics) besonders spannend und strategisch anspruchsvoll.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Undenufe?",
    "answer": "Undenufe ist eine Trumpf-Variante, bei der die normalerweise niedrigsten Karten die stärksten sind."
  },
  {
    "question": "Welche Karten sind bei Undenufe am stärksten?",
    "answer": "Bei Undenufe sind die Sechser die stärksten Karten, gefolgt von Siebner, Achter, etc."
  },
  {
    "question": "Gibt es bei Undenufe eine Trumpffarbe?",
    "answer": "Nein, Undenufe ist eine Variante ohne feste Trumpffarbe."
  }
]
```

---
id: `history_etymology`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Die Etymologie des Wortes «[Jass](./general_introduction)» ist nicht eindeutig geklärt. Es existieren verschiedene Theorien zur Herkunft des Namens.

Theorien zur Wortherkunft:
• **Niederländische Herkunft:** Mögliche Ableitung vom niederländischen Wort «Jas» (Jacke), das auf die [Trumpfkarte](./general_trump_values) Trumpf-Bauer ([Puur](./expressions_trumpf_bauer)) hinweisen könnte
• **Lateinische Wurzeln:** Herleitung vom lateinischen «Iocus» (Spiel, Scherz), was auf die gesellige Natur des [Spiels](./general_game_basics) hindeuten würde
• **Französischer Einfluss:** Verbindung zum französischen «Jasser» (schwatzen, plaudern), was die kommunikative Atmosphäre beim [Jassen](./general_culture) unterstreicht

Linguistische Bedeutung:
Die verschiedenen Theorien spiegeln die vielfältigen kulturellen Einflüsse wider, die das Jassen geprägt haben.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Woher kommt das Wort «Jass»?",
    "answer": "Die Herkunft ist nicht eindeutig geklärt. Es gibt Theorien zur niederländischen Herkunft («Jas»), lateinischen Wurzeln («Iocus») oder französischen Einfluss («Jasser»)."
  },
  {
    "question": "Was bedeutet «Jassen»?",
    "answer": "Je nach Theorie könnte es sich auf die Trumpfkarte (niederländisch «Jas» für Jacke/Bauer), auf Spiel/Scherz (lateinisch «Iocus») oder auf schwatzen/plaudern (französisch «Jasser») beziehen."
  },
  {
    "question": "Welche Theorie zur Wortherkunft ist am wahrscheinlichsten?",
    "answer": "Es gibt keine eindeutige Antwort - alle drei Theorien (niederländisch, lateinisch, französisch) sind möglich und spiegeln die vielfältigen kulturellen Einflüsse wider."
  }
]
```

---
id: `history_etymology_matsch`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Der Begriff «[Matsch](./expressions_matsch)» stammt möglicherweise vom französischen Wort «marche» (gehen, laufen) ab.

Bedeutungszusammenhang:
Diese Herleitung deutet darauf hin, dass beim [Matsch](./kontermatsch) alle [Stiche](./expressions_stich) zu einer Partei «gehen» oder «laufen», was die totale Dominanz einer Seite symbolisiert.

Sprachliche Entwicklung:
Die Transformation von «marche» zu «Matsch» zeigt die typische Anpassung französischer Begriffe an die schweizerdeutsche Aussprache und Schreibweise.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Woher kommt der Begriff «Matsch»?",
    "answer": "Der Begriff stammt möglicherweise vom französischen Wort «marche» (gehen, laufen) ab."
  },
  {
    "question": "Was bedeutet die Herleitung von «marche»?",
    "answer": "Sie deutet darauf hin, dass beim Matsch alle Stiche zu einer Partei «gehen» oder «laufen», also die totale Dominanz einer Seite symbolisiert."
  },
  {
    "question": "Warum wurde aus «marche» der Begriff «Matsch»?",
    "answer": "Dies zeigt die typische Anpassung französischer Begriffe an die schweizerdeutsche Aussprache und Schreibweise."
  }
]
```

---
id: `history_first_mention`
---

**Bereinigter Haupttext:**
```markdown
Historischer Kontext:
Die erste bekannte schriftliche Erwähnung des [Jass](./general_introduction) stammt aus dem Jahr 1796 in der Schweiz.

Bedeutung für die Jassgeschichte:
Dieser frühe Beleg zeigt, dass das [Spiel](./general_game_basics) bereits im 18. Jahrhundert in der Schweiz verbreitet war und sich zu einem wichtigen Teil der [Schweizer Spielkultur](./general_culture) entwickelt hatte.

Dokumentation:
Die Erwähnung markiert einen wichtigen Meilenstein in der dokumentierten Geschichte des Schweizer [Jassens](./general_origin).
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wann wurde der Jass erstmals schriftlich erwähnt?",
    "answer": "Die erste bekannte schriftliche Erwähnung stammt aus dem Jahr 1796 in der Schweiz."
  },
  {
    "question": "Was bedeutet diese frühe Erwähnung?",
    "answer": "Sie zeigt, dass das Spiel bereits im 18. Jahrhundert in der Schweiz verbreitet war und sich zu einem wichtigen Teil der Schweizer Spielkultur entwickelt hatte."
  },
  {
    "question": "Warum ist das Jahr 1796 wichtig für die Jassgeschichte?",
    "answer": "Es markiert den ersten dokumentierten Beleg für das Jassen in der Schweiz und ist somit ein wichtiger Meilenstein in der Geschichte des Spiels."
  }
]
```

---
id: `history_industrialization`
---

**Bereinigter Haupttext:**
```markdown
Historischer Wendepunkt:
Die Industrialisierung im 19. Jahrhundert hatte einen massiven Einfluss auf die Verbreitung des [Jass](./general_introduction) in der Schweiz.

Verbreitungsmechanismen:
• **Urbanisierung:** Die Menschen zogen in die Städte und brachten das [Spiel](./general_game_basics) mit, wodurch es sich über regionale Grenzen hinweg ausbreitete
• **Arbeiterkultur:** In Fabriken und Gasthäusern wurde der Jass zum beliebten Freizeitvergnügen der [Arbeiterklasse](./history_social_significance)
• **Mobilität:** Verbesserte Verkehrswege ermöglichten den Austausch verschiedener [Varianten](./general_variants) zwischen den Regionen

Soziale Bedeutung:
Der Jass entwickelte sich vom regionalen Zeitvertreib zu einem schweizweiten [Kulturgut](./general_culture), das alle Gesellschaftsschichten verband.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie beeinflusste die Industrialisierung den Jass?",
    "answer": "Die Industrialisierung führte zur Urbanisierung, wodurch Menschen das Spiel in die Städte brachten und es sich über regionale Grenzen hinweg ausbreitete."
  },
  {
    "question": "Warum wurde Jass in der Industrialisierung beliebter?",
    "answer": "In Fabriken und Gasthäusern wurde der Jass zum beliebten Freizeitvergnügen der Arbeiterklasse, und verbesserte Verkehrswege ermöglichten den Austausch zwischen Regionen."
  },
  {
    "question": "Welche soziale Bedeutung hatte die Industrialisierung für den Jass?",
    "answer": "Der Jass entwickelte sich vom regionalen Zeitvertreib zu einem schweizweiten Kulturgut, das alle Gesellschaftsschichten verband."
  }
]
```

---
id: `history_linguistics`
---

**Bereinigter Haupttext:**
```markdown
Sprachliche Vielfalt:
Die Terminologie des [Jass](./general_introduction) ist stark durch regionale Dialekte und sprachliche Einflüsse geprägt.

Sprachliche Schichten:
• **Deutsche Basis:** Viele grundlegende [Begriffe](./expressions_basic_terms) stammen aus dem Schweizerdeutschen
• **Französische Einflüsse:** Begriffe wie «[Puur](./expressions_trumpf_bauer)» (Bauer) oder «[Nell](./expressions_nell)» (Neun) zeigen französische Wurzeln
• **Regionale Variationen:** Unterschiedliche Bezeichnungen für dieselben [Karten](./general_card_basics) oder [Spielaktionen](./general_gameplay) in verschiedenen Schweizer Regionen

Kulturelle Bedeutung:
Diese sprachliche Vielfalt spiegelt die mehrsprachige und kulturelle Identität der Schweiz wider und macht den Jass zu einem lebendigen linguistischen [Kulturgut](./general_culture).
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Welche Sprachen haben die Jass-Terminologie beeinflusst?",
    "answer": "Die Jass-Terminologie wurde hauptsächlich von Schweizerdeutsch und Französisch geprägt, mit vielen regionalen Dialektvarianten."
  },
  {
    "question": "Warum gibt es so viele verschiedene Begriffe beim Jassen?",
    "answer": "Die sprachliche Vielfalt spiegelt die verschiedenen Dialekte und Sprachregionen der Schweiz wider, wodurch unterschiedliche Bezeichnungen für dieselben Karten oder Spielaktionen entstanden sind."
  },
  {
    "question": "Was zeigt die sprachliche Vielfalt des Jass?",
    "answer": "Sie spiegelt die mehrsprachige und kulturelle Identität der Schweiz wider und macht den Jass zu einem lebendigen linguistischen Kulturgut."
  }
]
```

---
id: `history_medieval`
---

**Bereinigter Haupttext:**
```markdown
Historische Einordnung:
Die Wurzeln des [Jass](./general_introduction) lassen sich möglicherweise bis ins Mittelalter zurückverfolgen.

Entwicklung der Kartenspiele:
• **Früheste Kartenspiele:** [Kartenspiele](./general_card_systems) tauchten erstmals im 14. Jahrhundert in Europa auf
• **Vorläufer:** Es wird vermutet, dass frühe europäische Kartenspiele die Grundlage für das heutige [Jassen](./general_game_basics) bildeten
• **Regionale Entwicklung:** Im Alpenraum entwickelten sich eigenständige Spieltraditionen

Unsicherheit:
Die genaue Verbindung zwischen mittelalterlichen Kartenspielen und dem modernen Jass bleibt jedoch spekulativ, da es an eindeutigen historischen Belegen fehlt.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Gibt es mittelalterliche Wurzeln des Jass?",
    "answer": "Die Wurzeln lassen sich möglicherweise bis ins Mittelalter zurückverfolgen, aber die genaue Verbindung bleibt spekulativ."
  },
  {
    "question": "Wann tauchten Kartenspiele erstmals in Europa auf?",
    "answer": "Kartenspiele tauchten erstmals im 14. Jahrhundert in Europa auf."
  },
  {
    "question": "Wie entwickelte sich der Jass aus mittelalterlichen Spielen?",
    "answer": "Es wird vermutet, dass frühe europäische Kartenspiele die Grundlage bildeten und sich im Alpenraum eigenständige Spieltraditionen entwickelten, aber eindeutige historische Belege fehlen."
  }
]
```

---
id: `history_origin`
---

**Bereinigter Haupttext:**
```markdown
Geografische Verortung:
Der Ursprung des [Jass](./general_introduction) liegt in den Niederlanden. Von dort aus verbreitete sich das [Spiel](./general_game_basics) zunächst nach Frankreich und gelangte schliesslich in die Schweiz.

Verbreitungsweg:
• **Niederlande (17. Jahrhundert):** Entstehung der ersten Vorläuferformen
• **Frankreich (18. Jahrhundert):** Weiterentwicklung und Anpassung an lokale Spielgewohnheiten
• **Schweiz (spätes 18. Jahrhundert):** Etablierung und Entwicklung zur [Schweizer Nationalspiel](./general_culture)

Kulturelle Transformation:
In der Schweiz entwickelte sich das Spiel zu einer eigenständigen [Tradition](./history_social_significance) mit zahlreichen regionalen [Varianten](./general_variants) und wurde zu einem wichtigen Bestandteil der Schweizer Identität.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wo hat der Jass seinen Ursprung?",
    "answer": "Der Jass hat seinen Ursprung in den Niederlanden und verbreitete sich von dort nach Frankreich und schliesslich in die Schweiz."
  },
  {
    "question": "Wann kam der Jass in die Schweiz?",
    "answer": "Der Jass kam im späten 18. Jahrhundert in die Schweiz."
  },
  {
    "question": "Wie wurde der Jass zum Schweizer Nationalspiel?",
    "answer": "In der Schweiz entwickelte sich das Spiel zu einer eigenständigen Tradition mit zahlreichen regionalen Varianten und wurde zu einem wichtigen Bestandteil der Schweizer Identität."
  }
]
```

---
id: `history_social_significance`
---

**Bereinigter Haupttext:**
```markdown
Gesellschaftliche Rolle:
Der [Jass](./general_introduction) spielt eine zentrale Rolle in der Schweizer Gesellschaft und Kultur.

Soziale Funktionen:
• **Generationenübergreifend:** Das [Spiel](./general_game_basics) verbindet Jung und Alt und wird in Familien von Generation zu Generation weitergegeben
• **Gemeinschaftsfördernd:** Jassen schafft soziale Bindungen und fördert den Austausch in Vereinen, Gasthäusern und privaten Runden
• **Identitätsstiftend:** Der Jass ist ein Symbol der [Schweizer Identität](./general_culture) und wird als Teil des immateriellen [Kulturerbes](./history_unesco) geschätzt

Moderne Bedeutung:
Auch im digitalen Zeitalter behält der Jass seine Relevanz durch [Apps](./jassapps_overview) und Online-Plattformen, die das traditionelle Spiel mit moderner Technologie verbinden.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Welche soziale Bedeutung hat der Jass in der Schweiz?",
    "answer": "Der Jass verbindet Generationen, fördert Gemeinschaft in Vereinen und Gasthäusern und ist ein Symbol der Schweizer Identität."
  },
  {
    "question": "Wird Jass nur von älteren Menschen gespielt?",
    "answer": "Nein, das Spiel ist generationenübergreifend und verbindet Jung und Alt, wird in Familien weitergegeben."
  },
  {
    "question": "Hat der Jass auch im digitalen Zeitalter noch Bedeutung?",
    "answer": "Ja, durch Apps und Online-Plattformen behält der Jass seine Relevanz und verbindet traditionelles Spiel mit moderner Technologie."
  }
]
```

---
id: `history_swiss_production`
---

**Bereinigter Haupttext:**
```markdown
Schweizer Kartenherstellung:
Die Produktion von [Jasskarten](./general_card_basics) hat in der Schweiz eine lange Tradition.

Historische Entwicklung:
• **19. Jahrhundert:** Beginn der industriellen Kartenproduktion in Schweizer Manufakturen
• **Lokale Hersteller:** Etablierung renommierter Schweizer Kartenproduzenten wie AG Müller
• **Standardisierung:** Entwicklung des typischen Schweizer [Kartensystems](./general_card_systems) mit den charakteristischen Schweizer [Farben](./expressions_kartenfarben)

Qualität und Tradition:
Schweizer Jasskarten zeichnen sich durch hochwertige Verarbeitung und traditionelles Design aus, das die regionale [Kultur](./general_culture) widerspiegelt.

Moderne Produktion:
Auch heute werden Jasskarten in der Schweiz produziert und weltweit exportiert, wobei traditionelle Designs mit modernen Drucktechniken kombiniert werden.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wann begann die industrielle Kartenproduktion in der Schweiz?",
    "answer": "Die industrielle Kartenproduktion begann im 19. Jahrhundert in Schweizer Manufakturen."
  },
  {
    "question": "Welche Schweizer Kartenhersteller sind bekannt?",
    "answer": "Zu den renommierten Herstellern gehört AG Müller, die für hochwertige Jasskarten bekannt ist."
  },
  {
    "question": "Was zeichnet Schweizer Jasskarten aus?",
    "answer": "Sie zeichnen sich durch hochwertige Verarbeitung, traditionelles Design und das charakteristische Schweizer Kartensystem mit typischen Schweizer Farben aus."
  }
]
```

---
id: `history_unesco`
---

**Bereinigter Haupttext:**
```markdown
UNESCO-Anerkennung:
Der [Jass](./general_introduction) wurde als immaterielles Kulturerbe der UNESCO in der Schweiz anerkannt.

Bedeutung der Anerkennung:
• **Kulturelles Erbe:** Diese Auszeichnung unterstreicht die [kulturelle Bedeutung](./history_social_significance) des Jassens für die Schweizer Gesellschaft
• **Bewahrung:** Die UNESCO-Anerkennung trägt dazu bei, das [Spiel](./general_game_basics) und seine Traditionen für zukünftige Generationen zu bewahren
• **Internationale Sichtbarkeit:** Der Jass wird als wichtiger Teil der [Schweizer Identität](./general_culture) international anerkannt

Symbolische Wirkung:
Die Anerkennung würdigt den Jass nicht nur als Kartenspiel, sondern als lebendige [Tradition](./general_geography), die soziale Bindungen schafft und kulturelle Werte vermittelt.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Ist der Jass ein UNESCO-Kulturerbe?",
    "answer": "Ja, der Jass wurde als immaterielles Kulturerbe der UNESCO in der Schweiz anerkannt."
  },
  {
    "question": "Was bedeutet die UNESCO-Anerkennung für den Jass?",
    "answer": "Sie unterstreicht die kulturelle Bedeutung des Jassens für die Schweizer Gesellschaft und hilft, das Spiel für zukünftige Generationen zu bewahren."
  },
  {
    "question": "Warum wurde der Jass als Kulturerbe anerkannt?",
    "answer": "Der Jass wurde nicht nur als Kartenspiel, sondern als lebendige Tradition anerkannt, die soziale Bindungen schafft und kulturelle Werte vermittelt."
  }
]
```

---
id: `general_card_systems`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Es existieren verschiedene Kartensysteme für das [Jassen](./general_introduction), die sich in Farben, Symbolen und regionalen Besonderheiten unterscheiden.

Hauptsysteme:
• **Schweizer Karten:** Verwendung der typischen Schweizer [Farben](./expressions_kartenfarben) ([Schellen](./expressions_schelle), [Schilten](./expressions_schilte), [Rosen](./expressions_rose), [Eicheln](./expressions_eichel))
• **Französische Karten:** Alternative mit französischen [Farben](./general_card_basics) (Herz, Karo, Pik, Kreuz)
• **Deutsche Karten:** Weniger verbreitet, aber in einigen Regionen gebräuchlich

Regionale Variationen:
Je nach [geografischer Region](./general_geography_regions) werden unterschiedliche Kartensysteme bevorzugt, wobei die Schweizer Karten am weitesten verbreitet sind.

Kompatibilität:
Trotz unterschiedlicher Symbole folgen alle Systeme denselben grundlegenden [Spielregeln](./general_most_important_rules).
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Welche Kartensysteme gibt es für das Jassen?",
    "answer": "Es gibt hauptsächlich Schweizer Karten (Schellen, Schilten, Rosen, Eicheln), französische Karten (Herz, Karo, Pik, Kreuz) und seltener deutsche Karten."
  },
  {
    "question": "Welches Kartensystem ist am verbreitetsten?",
    "answer": "Die Schweizer Karten mit den typischen Schweizer Farben sind am weitesten verbreitet."
  },
  {
    "question": "Kann man mit verschiedenen Kartensystemen spielen?",
    "answer": "Ja, trotz unterschiedlicher Symbole folgen alle Systeme denselben grundlegenden Spielregeln und sind kompatibel."
  }
]
```

---
id: `general_culture`
---

**Bereinigter Haupttext:**
```markdown
Kulturelle Verankerung:
Der [Jass](./general_introduction) ist tief in der Schweizer Kultur verwurzelt und wird als [Nationalspiel](./history_social_significance) betrachtet.

Gesellschaftliche Dimensionen:
• **Soziale Treffpunkte:** Jassen findet in Gasthäusern, Vereinen, Familien und bei öffentlichen Veranstaltungen statt
• **Brauchtum:** Viele [regionale Traditionen](./general_geography) und Bräuche sind eng mit dem Jassen verbunden
• **Sprachliche Identität:** Die reiche [Jass-Terminologie](./history_linguistics) spiegelt die Schweizer Dialektvielfalt wider

Moderne Entwicklung:
Trotz Digitalisierung bleibt der Jass lebendig, wobei traditionelle Treffen und moderne [Jass-Apps](./jassapps_overview) nebeneinander existieren.

Identitätsstiftung:
Das [Jassen](./general_game_basics) verbindet Menschen über Generationen, Regionen und Sprachgrenzen hinweg und stärkt das Gemeinschaftsgefühl.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Warum ist Jass so wichtig für die Schweizer Kultur?",
    "answer": "Der Jass ist tief in der Schweizer Kultur verwurzelt, wird als Nationalspiel betrachtet und verbindet Menschen über Generationen, Regionen und Sprachgrenzen hinweg."
  },
  {
    "question": "Wo wird in der Schweiz gejasst?",
    "answer": "Jassen findet in Gasthäusern, Vereinen, Familien und bei öffentlichen Veranstaltungen statt."
  },
  {
    "question": "Hat die Digitalisierung den Jass verdrängt?",
    "answer": "Nein, trotz Digitalisierung bleibt der Jass lebendig - traditionelle Treffen und moderne Jass-Apps existieren nebeneinander."
  }
]
```

---
id: `general_european_context`
---

**Bereinigter Haupttext:**
```markdown
Europäische Einbettung:
Der [Jass](./general_introduction) ist Teil einer grösseren Familie europäischer Kartenspiele.

Verwandte Spiele:
• **Belote (Frankreich):** Ähnliche [Spielmechanik](./general_gameplay) und [Trumpfsystem](./general_trump_values)
• **Klaverjas (Niederlande):** Direkter Verwandter des Schweizer Jass, teilt viele [Regeln](./general_most_important_rules)
• **Briscola (Italien):** Verwandtes Stichspiel mit unterschiedlicher Struktur

Gemeinsame Wurzeln:
Diese Spiele teilen historische und spielmechanische Gemeinsamkeiten, entwickelten sich aber in ihren jeweiligen Regionen zu eigenständigen [Traditionen](./history_origin).

Schweizer Besonderheit:
Trotz dieser Verwandtschaft hat der Jass in der Schweiz eine einzigartige [kulturelle Bedeutung](./general_culture) und Vielfalt an [Varianten](./general_variants) entwickelt.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Gibt es ähnliche Spiele wie Jass in anderen Ländern?",
    "answer": "Ja, verwandte Spiele sind Belote in Frankreich, Klaverjas in den Niederlanden und Briscola in Italien."
  },
  {
    "question": "Was haben diese Spiele gemeinsam?",
    "answer": "Sie teilen historische und spielmechanische Gemeinsamkeiten wie ähnliche Trumpfsysteme und Spielmechaniken."
  },
  {
    "question": "Was macht den Schweizer Jass besonders?",
    "answer": "Trotz der Verwandtschaft zu anderen europäischen Kartenspielen hat der Jass in der Schweiz eine einzigartige kulturelle Bedeutung und eine besondere Vielfalt an Varianten entwickelt."
  }
]
```

---
id: `general_game_basics`
---

**Bereinigter Haupttext:**
```markdown
Grundkonzept:
Der [Jass](./general_introduction) ist ein Stichspiel für in der Regel vier Spieler, die in zwei [Teams](./expressions_team) gegeneinander antreten.

Grundelemente:
• **Kartenset:** Gespielt wird mit 36 [Karten](./general_card_basics) in vier verschiedenen [Farben](./expressions_kartenfarben)
• **Spielziel:** Ziel ist es, durch geschicktes Ausspielen möglichst viele [Punkte](./general_scoring_rules) zu erzielen
• **Trumpfsystem:** Eine Farbe oder Sonderregel wird als [Trumpf](./general_trump_values) festgelegt, der besondere Stärke verleiht

Spielablauf:
Nach dem [Austeilen](./general_dealing) der Karten wird der Trumpf bestimmt. Dann spielen die Spieler reihum [Karten aus](./vorspielen), wobei grundsätzlich die [Farbe bekannt](./expressions_farbenhalten) werden muss.

Teamarbeit:
Partner sitzen sich gegenüber und versuchen, durch koordiniertes Spiel gemeinsam [Stiche](./expressions_stich) und Punkte zu gewinnen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie viele Spieler braucht man für Jass?",
    "answer": "Jass wird in der Regel mit vier Spielern gespielt, die in zwei Teams gegeneinander antreten."
  },
  {
    "question": "Mit wie vielen Karten wird Jass gespielt?",
    "answer": "Gespielt wird mit 36 Karten in vier verschiedenen Farben."
  },
  {
    "question": "Was ist das Ziel beim Jassen?",
    "answer": "Das Ziel ist es, durch geschicktes Ausspielen möglichst viele Punkte zu erzielen, wobei eine Farbe oder Sonderregel als Trumpf festgelegt wird."
  }
]
```

---
id: `general_geography`
---

**Bereinigter Haupttext:**
```markdown
Geografische Verbreitung:
Der [Jass](./general_introduction) wird in der gesamten Schweiz gespielt, wobei verschiedene [Regionen](./general_geography_regions) eigene [Varianten](./general_variants) und Spielweisen entwickelt haben.

Regionale Besonderheiten:
• **Deutschschweiz:** Hier ist der Jass am weitesten verbreitet, mit [Varianten](./schieber_taktiken_basics) wie [Schieber](./general_introduction) und [Coiffeur](./variants_family_coiffeur_schieber)
• **Westschweiz:** Französischsprachige Regionen bevorzugen teilweise andere [Spielformen](./general_variants)
• **Alpenregionen:** Traditionelle Hochburgen mit starker [Jass-Kultur](./general_culture)

Internationale Verbreitung:
Über die Schweizer Grenzen hinaus wird Jass auch in angrenzenden Regionen Deutschlands, Österreichs und Frankreichs gespielt.

Kulturelle Zentren:
Bestimmte Ortschaften und Regionen gelten als besondere Jass-Hochburgen mit eigenen [Traditionen](./history_social_significance) und Turnieren.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wo wird Jass in der Schweiz gespielt?",
    "answer": "Jass wird in der gesamten Schweiz gespielt, wobei verschiedene Regionen eigene Varianten entwickelt haben."
  },
  {
    "question": "In welcher Region ist Jass am beliebtesten?",
    "answer": "In der Deutschschweiz ist der Jass am weitesten verbreitet, mit Varianten wie Schieber und Coiffeur."
  },
  {
    "question": "Wird Jass auch ausserhalb der Schweiz gespielt?",
    "answer": "Ja, Jass wird auch in angrenzenden Regionen Deutschlands, Österreichs und Frankreichs gespielt."
  }
]
```

---
id: `general_introduction`
---

**Bereinigter Haupttext:**
```markdown
Was ist Jass?
Der Jass ist das beliebteste [Kartenspiel](./general_game_basics) der Schweiz und gilt als inoffizielles Nationalspiel.

Charakteristik:
• **Stichspiel:** Der Jass gehört zur Familie der [Stichspiele](./expressions_stich), bei denen Karten ausgespielt und gestochen werden
• **Teamspiel:** Meistens spielen vier Personen in zwei [Teams](./expressions_team) gegeneinander
• **Vielfalt:** Es existieren zahlreiche [Varianten](./general_variants) mit unterschiedlichen Regeln und Strategien

Kulturelle Bedeutung:
Der Jass ist mehr als ein Spiel – er ist ein wichtiger Teil der [Schweizer Kultur](./general_culture) und [Identität](./history_social_significance), der Generationen und Regionen verbindet.

Zugänglichkeit:
Dank einfacher Grundregeln ist der Jass leicht zu erlernen, bietet aber durch strategische Tiefe und [Varianten](./general_variants) auch für erfahrene Spieler ständig neue Herausforderungen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Jass?",
    "answer": "Der Jass ist das beliebteste Kartenspiel der Schweiz und gilt als inoffizielles Nationalspiel."
  },
  {
    "question": "Wie viele Personen spielen Jass?",
    "answer": "Meistens spielen vier Personen in zwei Teams gegeneinander."
  },
  {
    "question": "Ist Jass schwierig zu lernen?",
    "answer": "Nein, dank einfacher Grundregeln ist der Jass leicht zu erlernen, bietet aber durch strategische Tiefe auch für erfahrene Spieler ständig neue Herausforderungen."
  }
]
```

---
id: `general_materials`
---

**Bereinigter Haupttext:**
```markdown
Benötigtes Material:
Für das [Jassen](./general_introduction) wird grundsätzlich nur wenig Material benötigt.

Grundausstattung:
• **Jasskarten:** Ein Set von 36 [Karten](./general_card_basics) in vier [Farben](./expressions_kartenfarben), entweder mit Schweizer oder französischen Symbolen
• **Schreibzeug:** Papier und Stift zum Notieren der [Punkte](./general_scoring_rules) (siehe [Schreiben](./schreiben))
• **Optional - Jasstafel:** Traditionelle oder digitale [Tafel](./jassapps_jasstafel) zur Punktenotierung

Moderne Alternativen:
• **Apps:** Digitale [Jass-Apps](./jassapps_overview) ersetzen Karten und Punktetafel
• **Online-Plattformen:** Ermöglichen das Spielen ohne physisches Material

Traditionelle Accessoires:
In manchen Regionen werden zusätzliche traditionelle Elemente wie besondere [Jasstische](./general_culture) oder spezielle Kartenhalter verwendet.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was braucht man zum Jassen?",
    "answer": "Man braucht ein Set von 36 Jasskarten und Schreibzeug zum Notieren der Punkte, optional eine Jasstafel."
  },
  {
    "question": "Kann man auch digital jassen?",
    "answer": "Ja, es gibt zahlreiche Jass-Apps und Online-Plattformen, die Karten und Punktetafel ersetzen."
  },
  {
    "question": "Welche Karten braucht man für Jass?",
    "answer": "Man braucht 36 Karten in vier Farben, entweder mit Schweizer oder französischen Symbolen."
  }
]
```

---
id: `general_most_important_rules`
---

**Bereinigter Haupttext:**
```markdown
Grundregeln:
Diese fundamentalen Regeln gelten für nahezu alle [Jassvarianten](./general_variants) und bilden die Basis des Spiels.

Kernregeln:
• **Farbe bekennen:** Man muss die ausgespielte [Farbe bedienen](./expressions_farbenhalten), wenn man sie besitzt
• **Trumpfpflicht:** Kann man die Farbe nicht bedienen, muss man [Trumpf](./general_trump_values) spielen (falls vorhanden)
• **Übertrumpfen:** Hat ein Mitspieler bereits mit Trumpf gestochen, muss man wenn möglich höher [trumpfen](./expressions_untertrumpfen)
• **Stichfolge:** Wer den [Stich](./expressions_stich) macht, spielt die nächste Karte aus

Ausnahmen:
Diese Grundregeln können je nach [Variante](./general_variants) leicht variieren oder ergänzt werden. Vor dem Spiel sollten die geltenden Regeln geklärt werden.

Regelkonformität:
Die Einhaltung dieser Regeln ist essentiell für ein faires [Spiel](./general_game_basics) und wird bei [Verstössen](./general_playing_errors) entsprechend geahndet.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind die wichtigsten Jass-Regeln?",
    "answer": "Man muss die ausgespielte Farbe bedienen, wenn man sie besitzt. Kann man nicht bedienen, muss man Trumpf spielen. Hat ein Mitspieler bereits gettrumpft, muss man wenn möglich höher trumpfen."
  },
  {
    "question": "Wer spielt die nächste Karte aus?",
    "answer": "Wer den Stich macht, spielt die nächste Karte aus."
  },
  {
    "question": "Gelten diese Regeln für alle Jassvarianten?",
    "answer": "Diese Grundregeln gelten für nahezu alle Jassvarianten, können aber je nach Variante leicht variieren oder ergänzt werden."
  }
]
```

---
id: `general_orientation`
---

**Bereinigter Haupttext:**
```markdown
Einführung ins Jasswiki:
Diese Plattform bietet umfassende Informationen zum [Jass](./general_introduction), von den Grundlagen bis zu fortgeschrittenen Strategien.

Struktur und Navigation:
• **Grundlagen:** Einführung in [Regeln](./general_most_important_rules), [Karten](./general_card_basics) und [Spielablauf](./general_gameplay)
• **Varianten:** Übersicht über die zahlreichen [Jassvarianten](./general_variants)
• **Taktik:** Strategien und Tipps für besseres Spiel (siehe [Schieber-Taktiken](./schieber_taktiken_basics))
• **Kultur:** [Geschichte](./history_origin) und [kulturelle Bedeutung](./general_culture) des Jassens
• **Digital:** Informationen zu [Jass-Apps](./jassapps_overview) und Online-Plattformen

Zielgruppe:
Das Jasswiki richtet sich sowohl an Anfänger, die das [Spiel](./general_game_basics) erlernen möchten, als auch an erfahrene Spieler, die ihr Wissen vertiefen wollen.

Nutzung:
Alle Artikel sind miteinander verlinkt, sodass Sie thematisch verwandte Inhalte leicht finden können.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bietet das Jasswiki?",
    "answer": "Das Jasswiki bietet umfassende Informationen zum Jass, von Grundlagen über Varianten und Taktiken bis zu Kultur und digitalen Apps."
  },
  {
    "question": "Für wen ist das Jasswiki gedacht?",
    "answer": "Das Jasswiki richtet sich sowohl an Anfänger, die das Spiel erlernen möchten, als auch an erfahrene Spieler, die ihr Wissen vertiefen wollen."
  },
  {
    "question": "Wie ist das Jasswiki strukturiert?",
    "answer": "Es ist in Bereiche wie Grundlagen, Varianten, Taktik, Kultur und Digital unterteilt, wobei alle Artikel miteinander verlinkt sind."
  }
]
```

---
id: `general_variants`
---

**Bereinigter Haupttext:**
```markdown
Variantenvielfalt:
Der [Jass](./general_introduction) zeichnet sich durch eine bemerkenswerte Vielfalt an Spielvarianten aus.

Hauptkategorien:
• **Klassische Varianten:** [Schieber](./general_game_basics), [Coiffeur](./variants_family_coiffeur_schieber), [Differenzler](./variants_strategic_differenzler_verdeckt)
• **Strategische Varianten:** [Bieter](./variants_strategic_bieter_vier), [Pandur](./variants_strategic_pandur), [Molotow](./variants_strategic_schafhauser)
• **Spezialvarianten:** [Hindersi](./variants_specialty_hindersi), [Obenabe](./expressions_obenabe), [Undenufe](./expressions_undenufe), [Slalom](./expressions_slalom)
• **Familienvarianten:** [Tschau Sepp](./variants_learning_tschau_sepp), [Guggitaler](./variants_family_guggitaler)

Regionale Unterschiede:
Verschiedene [Regionen](./general_geography) haben eigene bevorzugte Varianten entwickelt, was zur Vielfalt des Spiels beiträgt.

Anpassungsfähigkeit:
Die Vielfalt ermöglicht es, den Jass an unterschiedliche Spieleranzahlen, Erfahrungsstufen und Spielstile anzupassen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Welche Jass-Varianten gibt es?",
    "answer": "Es gibt zahlreiche Varianten wie Schieber, Coiffeur, Differenzler, Bieter, Pandur, Hindersi, Obenabe/Undenufe und viele mehr."
  },
  {
    "question": "Was sind die beliebtesten Jass-Varianten?",
    "answer": "Zu den klassischen und beliebtesten Varianten gehören Schieber, Coiffeur und Differenzler."
  },
  {
    "question": "Gibt es regionale Unterschiede bei Jass-Varianten?",
    "answer": "Ja, verschiedene Regionen haben eigene bevorzugte Varianten entwickelt, was zur Vielfalt des Spiels beiträgt."
  }
]
```

---
id: `jassapps_jass24`
---

**Bereinigter Haupttext:**
```markdown
Plattform-Überblick:
Jass24 ist eine Online-Plattform zum [Jassen](./general_introduction) im Internet.

Hauptmerkmale:
• **Online-Spiel:** Ermöglicht das Spielen gegen andere Spieler oder gegen Computer-Gegner
• **Verschiedene Varianten:** Unterstützt mehrere [Jassvarianten](./general_variants)
• **Community:** Bietet eine aktive Spieler-Community mit Turnieren und Rankings

Zielgruppe:
Die Plattform richtet sich an [Jass](./general_game_basics)-Enthusiasten, die online gegen andere Spieler antreten möchten.

Zugänglichkeit:
Jass24 ist browserbasiert und erfordert keine Installation, wodurch es einfach zugänglich ist.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Jass24?",
    "answer": "Jass24 ist eine Online-Plattform zum Jassen im Internet, die verschiedene Jassvarianten unterstützt."
  },
  {
    "question": "Kann man bei Jass24 gegen echte Spieler spielen?",
    "answer": "Ja, Jass24 ermöglicht das Spielen gegen andere Spieler oder gegen Computer-Gegner."
  },
  {
    "question": "Muss man Jass24 installieren?",
    "answer": "Nein, Jass24 ist browserbasiert und erfordert keine Installation."
  }
]
```

---
id: `jassapps_jassch`
---

**Bereinigter Haupttext:**
```markdown
App-Überblick:
Jassch ist eine mobile [Jass](./general_introduction)-App für iOS und Android.

Hauptfunktionen:
• **Offline-Spiel:** Spielen gegen Computer-Gegner auch ohne Internetverbindung
• **Online-Modus:** Multiplayer-Möglichkeiten gegen echte Spieler
• **Varianten:** Unterstützt gängige [Jassvarianten](./general_variants) wie [Schieber](./general_game_basics) und [Coiffeur](./variants_family_coiffeur_schieber)

Besonderheiten:
Die App bietet eine moderne Benutzeroberfläche und ist sowohl für Anfänger als auch erfahrene Spieler geeignet.

Verfügbarkeit:
Jassch ist in den jeweiligen App-Stores für iOS und Android verfügbar.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Jassch?",
    "answer": "Jassch ist eine mobile Jass-App für iOS und Android, die sowohl Offline- als auch Online-Spiel ermöglicht."
  },
  {
    "question": "Kann man Jassch ohne Internet spielen?",
    "answer": "Ja, Jassch bietet einen Offline-Modus zum Spielen gegen Computer-Gegner."
  },
  {
    "question": "Welche Jassvarianten unterstützt Jassch?",
    "answer": "Jassch unterstützt gängige Jassvarianten wie Schieber und Coiffeur."
  }
]
```

---
id: `jassapps_jassguru`
---

**Bereinigter Haupttext:**
```markdown
App-Überblick:
Jassguru ist eine innovative [Jass](./general_introduction)-App mit integriertem KI-Coach.

Hauptfunktionen:
• **KI-Unterstützung:** Ein intelligenter Assistent hilft beim Erlernen und Verbessern des [Spiels](./general_game_basics)
• **Echtzeit-Tipps:** Während des Spiels werden [taktische Hinweise](./schieber_taktiken_basics) gegeben
• **Lernmodus:** Speziell für Anfänger konzipiert, um die [Regeln](./general_most_important_rules) und Strategien zu verstehen
• **Variantenvielfalt:** Unterstützt verschiedene [Jassvarianten](./general_variants)

Innovation:
Die Kombination aus Spiel und Lernhilfe macht Jassguru zu einer einzigartigen App für [Jass](./general_culture)-Einsteiger und fortgeschrittene Spieler.

Verfügbarkeit:
Jassguru ist für mobile Geräte verfügbar.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist das Besondere an Jassguru?",
    "answer": "Jassguru bietet einen integrierten KI-Coach, der beim Erlernen und Verbessern des Spiels hilft und Echtzeit-Tipps gibt."
  },
  {
    "question": "Ist Jassguru für Anfänger geeignet?",
    "answer": "Ja, Jassguru hat einen speziellen Lernmodus für Anfänger, um Regeln und Strategien zu verstehen."
  },
  {
    "question": "Welche Jassvarianten bietet Jassguru?",
    "answer": "Jassguru unterstützt verschiedene Jassvarianten."
  }
]
```

---
id: `jassapps_jasspro`
---

**Bereinigter Haupttext:**
```markdown
App-Überblick:
JassPro ist eine professionelle [Jass](./general_introduction)-App für anspruchsvolle Spieler.

Hauptmerkmale:
• **Erweiterte Funktionen:** Detaillierte Statistiken und Analysen zum eigenen Spielverhalten
• **Online-Turniere:** Teilnahme an kompetitiven Turnieren mit anderen Spielern
• **Variantenreich:** Unterstützt zahlreiche [Jassvarianten](./general_variants), auch seltene [Spezialvarianten](./expressions_misere)
• **Anpassbar:** Umfangreiche Einstellungsmöglichkeiten für individuelles [Spielerlebnis](./general_game_basics)

Zielgruppe:
JassPro richtet sich an erfahrene [Jass](./general_culture)-Spieler, die eine fortgeschrittene App mit umfangreichen Features suchen.

Verfügbarkeit:
JassPro ist für mobile Plattformen verfügbar.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist JassPro?",
    "answer": "JassPro ist eine professionelle Jass-App für anspruchsvolle Spieler mit erweiterten Funktionen wie Statistiken und Online-Turnieren."
  },
  {
    "question": "Für wen ist JassPro geeignet?",
    "answer": "JassPro richtet sich an erfahrene Jass-Spieler, die eine fortgeschrittene App mit umfangreichen Features suchen."
  },
  {
    "question": "Welche Besonderheiten bietet JassPro?",
    "answer": "JassPro bietet detaillierte Statistiken, Online-Turniere, zahlreiche Jassvarianten (auch Spezialvarianten) und umfangreiche Anpassungsmöglichkeiten."
  }
]
```

---
id: `jassapps_jasstafel`
---

**Bereinigter Haupttext:**
```markdown
App-Überblick:
Jasstafel ist eine digitale App zum [Notieren](./schreiben) der [Punkte](./general_scoring_rules) beim [Jassen](./general_introduction).

Hauptfunktionen:
• **Digitale Punktetafel:** Ersetzt Papier und Stift durch eine übersichtliche digitale Anzeige
• **Automatische Berechnung:** Summiert die [Punkte](./general_scoring_rules) automatisch und zeigt den aktuellen Spielstand
• **Verschiedene Modi:** Unterstützt unterschiedliche [Spielvarianten](./general_variants) und Punktesysteme
• **Übersichtlich:** Klare Darstellung des Spielverlaufs und der Zwischenstände

Praktischer Nutzen:
Die App vereinfacht das [Punkteschreiben](./schreiben) erheblich und reduziert Rechenfehler.

Verfügbarkeit:
Jasstafel ist für mobile Geräte verfügbar.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Jasstafel?",
    "answer": "Jasstafel ist eine digitale App zum Notieren der Punkte beim Jassen, die Papier und Stift ersetzt."
  },
  {
    "question": "Rechnet Jasstafel automatisch?",
    "answer": "Ja, Jasstafel summiert die Punkte automatisch und zeigt den aktuellen Spielstand."
  },
  {
    "question": "Für welche Varianten ist Jasstafel geeignet?",
    "answer": "Jasstafel unterstützt unterschiedliche Spielvarianten und Punktesysteme."
  }
]
```

---
id: `jassapps_jasstafel_pro`
---

**Bereinigter Haupttext:**
```markdown
App-Überblick:
Jasstafel Pro ist die erweiterte Version der [Jasstafel](./jassapps_jasstafel)-App mit zusätzlichen professionellen Funktionen.

Erweiterte Funktionen:
• **Erweiterte Statistiken:** Detaillierte Auswertungen über mehrere Spiele hinweg
• **Match-Historie:** Speicherung und Analyse vergangener [Partien](./expressions_partie)
• **Export-Funktionen:** Möglichkeit, Spielstände und Statistiken zu exportieren
• **Turniermodus:** Spezielle Funktionen für die Verwaltung von Turnieren
• **Anpassungen:** Umfangreiche Personalisierungsoptionen für die [Punkteanzeige](./general_scoring_rules)

Zielgruppe:
Jasstafel Pro richtet sich an ambitionierte Spieler und Turnierorganisatoren, die professionelle Funktionen benötigen.

Verfügbarkeit:
Jasstafel Pro ist als Premium-Version für mobile Geräte verfügbar.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist der Unterschied zwischen Jasstafel und Jasstafel Pro?",
    "answer": "Jasstafel Pro bietet erweiterte Funktionen wie detaillierte Statistiken, Match-Historie, Export-Funktionen und einen Turniermodus."
  },
  {
    "question": "Für wen ist Jasstafel Pro geeignet?",
    "answer": "Jasstafel Pro richtet sich an ambitionierte Spieler und Turnierorganisatoren, die professionelle Funktionen benötigen."
  },
  {
    "question": "Kann man mit Jasstafel Pro Turniere verwalten?",
    "answer": "Ja, Jasstafel Pro hat einen speziellen Turniermodus für die Verwaltung von Turnieren."
  }
]
```

---
id: `jassapps_overview`
---

**Bereinigter Haupttext:**
```markdown
Digitale Jass-Landschaft:
Die Digitalisierung hat zahlreiche Apps und Plattformen zum [Jassen](./general_introduction) hervorgebracht.

Hauptkategorien:
• **Spiel-Apps:** Apps zum aktiven Spielen wie [Jassch](./jassapps_jassch), [Jassguru](./jassapps_jassguru), [JassPro](./jassapps_jasspro) und [Swissjass](./jassapps_swissjass)
• **Notier-Apps:** Digitale Punktetafeln wie [Jasstafel](./jassapps_jasstafel) und [Jasstafel Pro](./jassapps_jasstafel_pro)
• **Online-Plattformen:** Browser-basierte Angebote wie [Jass24](./jassapps_jass24)

Vorteile:
• **Zugänglichkeit:** Jederzeit und überall spielbar
• **Lernhilfe:** Viele Apps bieten Tutorials und [Taktiktipps](./schieber_taktiken_basics)
• **Social Features:** Online-Spiel gegen Freunde oder die [Community](./general_culture)

Moderne Entwicklung:
Die Apps tragen dazu bei, das traditionelle [Spiel](./general_game_basics) für jüngere Generationen attraktiv zu halten und die [Jass-Kultur](./general_culture) zu bewahren.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Welche Arten von Jass-Apps gibt es?",
    "answer": "Es gibt Spiel-Apps zum aktiven Jassen, Notier-Apps für Punktetafeln und Online-Plattformen."
  },
  {
    "question": "Was sind die Vorteile von Jass-Apps?",
    "answer": "Jass-Apps bieten Zugänglichkeit (jederzeit spielbar), Lernhilfen mit Tutorials und Taktiktipps sowie Social Features für Online-Spiel."
  },
  {
    "question": "Helfen Jass-Apps, die Tradition zu bewahren?",
    "answer": "Ja, die Apps tragen dazu bei, das traditionelle Spiel für jüngere Generationen attraktiv zu halten und die Jass-Kultur zu bewahren."
  }
]
```

---
id: `jassapps_swissjass`
---

**Bereinigter Haupttext:**
```markdown
App-Überblick:
Swissjass ist eine beliebte [Jass](./general_introduction)-App mit Fokus auf authentisches Schweizer [Spielerlebnis](./general_game_basics).

Hauptmerkmale:
• **Authentisches Design:** Verwendet traditionelle Schweizer [Karten](./general_card_basics) und Designs
• **Vielfältige Varianten:** Unterstützt zahlreiche [Jassvarianten](./general_variants), einschliesslich regionaler Spezialitäten
• **Online & Offline:** Spielen gegen Computer oder gegen andere Spieler online
• **Benutzerfreundlich:** Intuitive Bedienung für Spieler aller Erfahrungsstufen

Besonderheit:
Swissjass legt besonderen Wert auf die Bewahrung der [Schweizer Jass-Tradition](./general_culture) im digitalen Format.

Verfügbarkeit:
Swissjass ist für mobile Plattformen verfügbar.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Swissjass?",
    "answer": "Swissjass ist eine beliebte Jass-App mit Fokus auf authentisches Schweizer Spielerlebnis und traditionellem Design."
  },
  {
    "question": "Welche Besonderheit hat Swissjass?",
    "answer": "Swissjass legt besonderen Wert auf die Bewahrung der Schweizer Jass-Tradition im digitalen Format mit authentischen Schweizer Karten."
  },
  {
    "question": "Kann man mit Swissjass online spielen?",
    "answer": "Ja, Swissjass bietet sowohl Online-Spiel gegen andere Spieler als auch Offline-Spiel gegen Computer."
  }
]
```

---
id: `references_books`
---

**Bereinigter Haupttext:**
```markdown
Literatur zum Jass:
Es existiert eine Vielzahl an Büchern und Publikationen zum [Jassen](./general_introduction), die sich mit [Regeln](./general_most_important_rules), [Taktiken](./schieber_taktiken_basics) und [Geschichte](./history_origin) beschäftigen.

Themengebiete:
• **Regelwerke:** Offizielle und inoffizielle [Regelsammlungen](./regeln_offizielles_regelwerk) für verschiedene [Varianten](./general_variants)
• **Strategiebücher:** Anleitungen für fortgeschrittene [Spieltechniken](./schieber_taktiken_advanced) und taktisches Vorgehen
• **Kulturgeschichte:** Werke über die [historische Entwicklung](./history_social_significance) und [kulturelle Bedeutung](./general_culture) des Jassens
• **Nachschlagewerke:** Lexika und Enzyklopädien zur [Jass-Terminologie](./history_linguistics)

Bedeutung:
Diese Bücher dienen sowohl als Lernhilfe für Anfänger als auch als Referenz für erfahrene Spieler und tragen zur Dokumentation der [Schweizer Spielkultur](./general_culture) bei.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Gibt es Bücher über Jass?",
    "answer": "Ja, es existiert eine Vielzahl an Büchern über Jass, die Regeln, Taktiken und Geschichte behandeln."
  },
  {
    "question": "Welche Arten von Jass-Büchern gibt es?",
    "answer": "Es gibt Regelwerke, Strategiebücher, kulturgeschichtliche Werke und Nachschlagewerke zur Jass-Terminologie."
  },
  {
    "question": "Für wen sind Jass-Bücher geeignet?",
    "answer": "Jass-Bücher dienen sowohl als Lernhilfe für Anfänger als auch als Referenz für erfahrene Spieler."
  }
]
```

---
id: `references_documents`
---

**Bereinigter Haupttext:**
```markdown
Dokumentation:
Verschiedene Dokumente und Quellen befassen sich mit den [Regeln](./general_most_important_rules) und der [Geschichte](./history_origin) des [Jass](./general_introduction).

Dokumenttypen:
• **Offizielle Regelwerke:** Standardisierte [Regelsammlungen](./regeln_offizielles_regelwerk) von Jassverbänden
• **Historische Quellen:** Archive und [historische Dokumente](./history_first_mention) zur Entwicklung des Spiels
• **Vereinsdokumente:** [Hausregeln](./regeln_tischregel) und Turnierdokumente verschiedener Jassvereine
• **Forschungsarbeiten:** Wissenschaftliche Studien zur [kulturellen Bedeutung](./general_culture) und [Linguistik](./history_linguistics) des Jassens

Zugänglichkeit:
Viele dieser Dokumente sind in Archiven, Bibliotheken oder online verfügbar und dienen als wichtige Referenz für die [Jass-Forschung](./history_social_significance).
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Welche Arten von Jass-Dokumenten gibt es?",
    "answer": "Es gibt offizielle Regelwerke, historische Quellen, Vereinsdokumente mit Hausregeln und wissenschaftliche Forschungsarbeiten."
  },
  {
    "question": "Wo findet man Jass-Dokumente?",
    "answer": "Viele Dokumente sind in Archiven, Bibliotheken oder online verfügbar."
  },
  {
    "question": "Wofür werden Jass-Dokumente verwendet?",
    "answer": "Sie dienen als wichtige Referenz für die Jass-Forschung und dokumentieren Regeln, Geschichte und kulturelle Bedeutung des Spiels."
  }
]
```

---
id: `references_experts`
---

**Bereinigter Haupttext:**
```markdown
Jass-Experten:
Es gibt anerkannte Experten und Persönlichkeiten, die sich intensiv mit dem [Jassen](./general_introduction) beschäftigt haben.

Expertenkategorien:
• **Autoren:** Verfasser von [Büchern](./references_books) und Artikeln über [Jass-Regeln](./general_most_important_rules) und [Strategien](./schieber_taktiken_basics)
• **Turnierspieler:** Erfolgreiche Spieler mit umfassender Erfahrung in verschiedenen [Varianten](./general_variants)
• **Kulturhistoriker:** Forscher, die sich mit der [Geschichte](./history_origin) und [Bedeutung](./history_social_significance) des Jassens beschäftigen
• **Regelexperten:** Spezialisten für [offizielle Regelwerke](./regeln_offizielles_regelwerk) und ihre Interpretation

Beitrag:
Diese Experten tragen massgeblich zur Dokumentation, Standardisierung und Weiterentwicklung der [Jass-Kultur](./general_culture) bei.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Gibt es Jass-Experten?",
    "answer": "Ja, es gibt anerkannte Experten wie Autoren, erfolgreiche Turnierspieler, Kulturhistoriker und Regelexperten."
  },
  {
    "question": "Was machen Jass-Experten?",
    "answer": "Sie schreiben Bücher über Regeln und Strategien, forschen zur Geschichte des Jassens und tragen zur Standardisierung der Regeln bei."
  },
  {
    "question": "Welchen Beitrag leisten Jass-Experten?",
    "answer": "Sie tragen massgeblich zur Dokumentation, Standardisierung und Weiterentwicklung der Jass-Kultur bei."
  }
]
```

---
id: `references_usage`
---

**Bereinigter Haupttext:**
```markdown
Nutzungshinweise:
Dieser Abschnitt erklärt, wie die Referenzen und Quellen im Jasswiki verwendet werden sollten.

Verwendungszwecke:
• **Verifizierung:** Die Referenzen dienen zur Überprüfung von [Regeln](./general_most_important_rules) und historischen Fakten
• **Weiterführende Lektüre:** Verweise auf [Bücher](./references_books) und [Dokumente](./references_documents) für vertiefendes Wissen
• **Quellennachweis:** Transparente Angabe von Quellen für [historische Informationen](./history_origin) und [kulturelle Aspekte](./general_culture)

Kritische Prüfung:
Nutzer sollten beachten, dass verschiedene Quellen unterschiedliche [Hausregeln](./regeln_tischregel) oder Interpretationen enthalten können.

Wissenschaftlicher Anspruch:
Das Jasswiki bemüht sich um eine fundierte Darstellung, die auf verlässlichen Quellen und [Expertenwissen](./references_experts) basiert.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wofür werden die Referenzen im Jasswiki verwendet?",
    "answer": "Die Referenzen dienen zur Verifizierung von Regeln, als weiterführende Lektüre und als Quellennachweis für historische und kulturelle Informationen."
  },
  {
    "question": "Kann man sich auf alle Quellen gleichermaßen verlassen?",
    "answer": "Nutzer sollten beachten, dass verschiedene Quellen unterschiedliche Hausregeln oder Interpretationen enthalten können - kritische Prüfung ist wichtig."
  },
  {
    "question": "Auf welchen Quellen basiert das Jasswiki?",
    "answer": "Das Jasswiki bemüht sich um eine fundierte Darstellung, die auf verlässlichen Quellen und Expertenwissen basiert."
  }
]
```

---
id: `schieber_conventions`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Konventionen sind ungeschriebene, aber weitverbreitete [Verhaltensweisen](./schieber_taktiken_basics) und Signale zwischen [Partnern](./schieber_taktiken_partner) beim [Schieber](./general_introduction).

Wichtige Konventionen:
• **Erste Karte signalisiert:** Die erste ausgespielte [Karte](./general_card_basics) gibt oft Hinweise auf [Stärke](./schieber_taktiken_hoch_tief) oder Schwäche in dieser [Farbe](./expressions_kartenfarben)
• **Verwerfen kommuniziert:** Das [Abwerfen](./schieber_taktiken_verwerfen) bestimmter Karten signalisiert dem Partner Informationen über die eigene Hand
• **Stechentscheidungen:** Ob und wie man [sticht](./expressions_stich), kann als Signal verstanden werden

Wichtigkeit:
Das Verständnis und die Anwendung dieser Konventionen sind entscheidend für erfolgreiche Teamarbeit beim Schieber.

Variabilität:
Konventionen können regional oder innerhalb von Spielgruppen variieren, daher ist es ratsam, sich vor dem Spiel abzustimmen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind Konventionen beim Jassen?",
    "answer": "Konventionen sind ungeschriebene, aber weitverbreitete Verhaltensweisen und Signale zwischen Partnern beim Schieber."
  },
  {
    "question": "Welche Konventionen gibt es beim Schieber?",
    "answer": "Die erste ausgespielte Karte signalisiert Stärke/Schwäche, das Verwerfen kommuniziert Informationen und Stechentscheidungen dienen als Signale."
  },
  {
    "question": "Sind Konventionen überall gleich?",
    "answer": "Nein, Konventionen können regional oder innerhalb von Spielgruppen variieren, daher sollte man sich vor dem Spiel abstimmen."
  }
]
```

---
id: `schieber_taktiken_advanced`
---

**Bereinigter Haupttext:**
```markdown
Fortgeschrittene Strategien:
Diese erweiterten [Taktiken](./schieber_taktiken_basics) richten sich an erfahrene Spieler, die ihr [Spiel](./general_game_basics) verfeinern möchten.

Zentrale Konzepte:
• **Kartenzählen:** Merken, welche [Karten](./general_card_basics) bereits gespielt wurden, um Rückschlüsse auf verbleibende Karten zu ziehen
• **Wahrscheinlichkeitsrechnung:** Einschätzen der Wahrscheinlichkeit bestimmter Kartenverteilungen
• **Timing-Optimierung:** Den perfekten Moment für entscheidende [Spielzüge](./schieber_taktiken_special) wählen
• **Psychologische Aspekte:** Gegner lesen und eigenes Spiel variabel gestalten
• **Komplexe Signale:** Raffinierte [Kommunikation](./schieber_taktiken_partner) mit dem Partner

Übung und Erfahrung:
Diese fortgeschrittenen Techniken erfordern viel Spielpraxis und ein tiefes Verständnis der [Spielmechanik](./general_gameplay).
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind fortgeschrittene Jass-Taktiken?",
    "answer": "Fortgeschrittene Taktiken umfassen Kartenzählen, Wahrscheinlichkeitsrechnung, Timing-Optimierung, psychologische Aspekte und komplexe Signale mit dem Partner."
  },
  {
    "question": "Für wen sind diese Taktiken geeignet?",
    "answer": "Diese erweiterten Taktiken richten sich an erfahrene Spieler, die ihr Spiel verfeinern möchten."
  },
  {
    "question": "Was braucht man für fortgeschrittene Taktiken?",
    "answer": "Man braucht viel Spielpraxis und ein tiefes Verständnis der Spielmechanik."
  }
]
```

---
id: `schieber_taktiken_anziehen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Das [Anziehen](./expressions_anziehen) ist eine wichtige [Taktik](./schieber_taktiken_basics), bei der man eine [Farbe](./expressions_kartenfarben) ausspielt, um die [Trumpfkarten](./general_trump_values) der Gegner zu entfernen.

Strategischer Zweck:
• **Trumpf-Entzug:** Gegner werden gezwungen, ihre wertvollen [Trumpfkarten](./general_trump_values) einzusetzen
• **Vorbereitung:** Schafft Voraussetzungen für spätere erfolgreiche [Stiche](./expressions_stich) in anderen Farben
• **Kontrolle:** Man erhält bessere Kontrolle über den weiteren Spielverlauf

Timing:
Das Anziehen sollte strategisch klug eingesetzt werden - zu früh kann es verschwenderisch sein, zu spät verpufft die Wirkung.

Partnerkoordination:
Ideales [Anziehen](./expressions_anziehen) erfolgt in Absprache mit dem [Partner](./schieber_taktiken_partner), um maximalen Nutzen zu erzielen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Anziehen beim Jassen?",
    "answer": "Anziehen ist eine Taktik, bei der man eine Farbe ausspielt, um die Trumpfkarten der Gegner zu entfernen."
  },
  {
    "question": "Warum ist Anziehen wichtig?",
    "answer": "Anziehen entzieht Gegnern wertvolle Trumpfkarten, bereitet spätere erfolgreiche Stiche vor und verschafft bessere Kontrolle über den Spielverlauf."
  },
  {
    "question": "Wann sollte man anziehen?",
    "answer": "Das Timing ist wichtig - zu früh kann es verschwenderisch sein, zu spät verpufft die Wirkung. Ideales Anziehen erfolgt in Absprache mit dem Partner."
  }
]
```

---
id: `schieber_taktiken_basics`
---

**Bereinigter Haupttext:**
```markdown
Grundkonzept:
Beim [Schieber](./general_introduction) gibt es drei wesentliche taktische Säulen, die über Sieg oder Niederlage entscheiden können.

Kommunikation:
• Die erste ausgespielte [Karte](./general_card_basics) vermittelt häufig Informationen über die eigene Stärke oder Schwäche
• Das [Abwerfen](./schieber_taktiken_verwerfen) gibt dem [Partner](./schieber_taktiken_partner) wichtige Hinweise auf die eigenen Farben
• Auch die Entscheidung, ob gestochen wird oder nicht, dient als Signal

Timing:
• Den richtigen Moment für verschiedene Aktionen finden, wie [Anziehen](./schieber_taktiken_anziehen), [Schmieren](./expressions_schmieren) oder [Stechen](./expressions_stich)
• Früh spielen vs. spät spielen – Karten zum optimalen Zeitpunkt einsetzen

Kartenverwaltung:
• Eigene [Trumpfkarten](./general_trump_values) effizient nutzen
• [Farben](./expressions_kartenfarben) gezielt aufbauen oder schwächen
• [Stiche](./expressions_stich) für den Partner vorbereiten
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind die wichtigsten Taktiken beim Schieber?",
    "answer": "Die drei wesentlichen Säulen sind Kommunikation (durch Kartenspiel), richtiges Timing (wann spielt man welche Karte) und Kartenverwaltung (effiziente Nutzung von Trumpf und Farben)."
  },
  {
    "question": "Wie kommuniziert man mit dem Partner?",
    "answer": "Durch die erste ausgespielte Karte, das Abwerfen bestimmter Karten und die Entscheidung, ob man sticht oder nicht."
  },
  {
    "question": "Was ist wichtig beim Timing?",
    "answer": "Man muss den richtigen Moment finden für Aktionen wie Anziehen, Schmieren oder Stechen - ob man früh oder spät spielt, beeinflusst den Erfolg massgeblich."
  }
]
```

---
id: `schieber_taktiken_hoch_tief`
---

**Bereinigter Haupttext:**
```markdown
Taktisches Konzept:
Die bewusste Entscheidung zwischen hohen und tiefen [Karten](./general_card_basics) ist eine zentrale [Taktik](./schieber_taktiken_basics) beim [Schieber](./general_introduction).

Hoch spielen:
• **Stiche sichern:** Hohe Karten einsetzen, um wichtige [Stiche](./expressions_stich) zu gewinnen
• **Kontrolle übernehmen:** Durch hohe Karten die Führung im [Spiel](./general_game_basics) erlangen
• **Gegner unter Druck setzen:** Zwingt Gegner, ebenfalls hohe Karten einzusetzen

Tief spielen:
• **[Unterzug](./expressions_unterzug):** Bewusst tiefe Karten spielen, um den Stich nicht zu gewinnen
• **Karten sparen:** Hohe Karten für spätere entscheidende Momente aufbewahren
• **[Partner](./schieber_taktiken_partner) einsetzen:** Dem Partner die Möglichkeit geben, den Stich zu machen

Situationsabhängig:
Die Wahl zwischen hoch und tief hängt von der Spielsituation, der eigenen Hand und der [Partnerkoordination](./schieber_taktiken_partner) ab.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wann spielt man hoch und wann tief?",
    "answer": "Hoch spielen um Stiche zu sichern und Kontrolle zu übernehmen, tief spielen für Unterzug, um Karten zu sparen oder dem Partner den Stich zu ermöglichen."
  },
  {
    "question": "Was ist der Vorteil vom Tiefspiel?",
    "answer": "Tiefspiel ermöglicht es, hohe Karten für spätere entscheidende Momente aufzubewahren und dem Partner die Möglichkeit zu geben, den Stich zu machen."
  },
  {
    "question": "Wovon hängt die Entscheidung ab?",
    "answer": "Die Wahl zwischen hoch und tief hängt von der Spielsituation, der eigenen Hand und der Partnerkoordination ab."
  }
]
```

---
id: `schieber_taktiken_partner`
---

**Bereinigter Haupttext:**
```markdown
Partnerschaft:
Die Zusammenarbeit mit dem [Partner](./expressions_team) ist beim [Schieber](./general_introduction) von zentraler Bedeutung.

Kommunikationsformen:
• **Kartensprache:** Durch die Wahl der ausgespielten [Karten](./general_card_basics) Informationen übermitteln
• **[Verwerfen](./schieber_taktiken_verwerfen):** Signalisiert Stärke oder Schwäche in bestimmten [Farben](./expressions_kartenfarben)
• **Stechverhalten:** Zeigt an, ob man in einer Farbe noch Karten hat oder nicht
• **Timing-Signale:** Wann man [Trumpf](./general_trump_values) spielt oder nicht, gibt wichtige Hinweise

Koordinierte Aktionen:
• **[Schmieren](./expressions_schmieren):** Dem Partner wertvolle Karten zu seinem [Stich](./expressions_stich) beigeben
• **[Anziehen](./schieber_taktiken_anziehen):** Gemeinsam die Gegner schwächen
• **Stichvorbereitung:** Dem Partner erfolgreiche Stiche ermöglichen

Vertrauen:
Eine erfolgreiche Partnerschaft basiert auf gegenseitigem Vertrauen und dem Verständnis der [Konventionen](./schieber_conventions).
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Wie kommuniziert man mit dem Partner beim Jassen?",
    "answer": "Durch Kartensprache (Wahl der ausgespielten Karten), Verwerfen (zeigt Stärke/Schwäche), Stechverhalten und Timing-Signale."
  },
  {
    "question": "Was sind koordinierte Aktionen mit dem Partner?",
    "answer": "Schmieren (wertvolle Karten zum Stich des Partners beigeben), Anziehen (gemeinsam Gegner schwächen) und Stichvorbereitung für den Partner."
  },
  {
    "question": "Was ist wichtig für erfolgreiche Partnerschaft?",
    "answer": "Gegenseitiges Vertrauen und das Verständnis der Konventionen sind die Basis für erfolgreiche Partnerschaft beim Schieber."
  }
]
```

---
id: `schieber_taktiken_querverwerfen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Das Querverwerfen ist eine spezielle [Taktik](./schieber_taktiken_basics), bei der man absichtlich eine [Karte](./general_card_basics) einer anderen [Farbe](./expressions_kartenfarben) abwirft als erwartet.

Taktischer Zweck:
• **Signal an Partner:** Zeigt dem [Partner](./schieber_taktiken_partner) besondere Informationen über die eigene Hand
• **Irreführung:** Kann Gegner verwirren oder in die Irre führen
• **Strategische Kommunikation:** Übermittelt komplexe Botschaften über Kartenstärken

Anwendung:
Das Querverwerfen ist eine [fortgeschrittene Technik](./schieber_taktiken_advanced), die ein gutes Verständnis der [Konventionen](./schieber_conventions) und Spielsituation erfordert.

Risiko:
Falsches Querverwerfen kann den Partner verwirren und sollte daher nur bei klaren Absprachen verwendet werden.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Querverwerfen beim Jassen?",
    "answer": "Querverwerfen ist eine spezielle Taktik, bei der man absichtlich eine Karte einer anderen Farbe abwirft als erwartet."
  },
  {
    "question": "Wozu dient Querverwerfen?",
    "answer": "Es dient als Signal an den Partner für besondere Informationen, kann Gegner verwirren und übermittelt komplexe Botschaften über Kartenstärken."
  },
  {
    "question": "Ist Querverwerfen schwierig?",
    "answer": "Ja, es ist eine fortgeschrittene Technik, die ein gutes Verständnis der Konventionen erfordert. Falsches Querverwerfen kann den Partner verwirren."
  }
]
```

---
id: `schieber_taktiken_scoring`
---

**Bereinigter Haupttext:**
```markdown
Punktestrategie:
Die optimale Gestaltung der [Punktevergabe](./general_scoring_rules) ist ein wichtiger strategischer Aspekt beim [Schieber](./general_introduction).

Strategische Überlegungen:
• **Maximierung:** Versuchen, möglichst viele [Punkte](./general_scoring_rules) zu erreichen, besonders bei Aussicht auf [Matsch](./kontermatsch)
• **Schadensbegrenzung:** Bei schlechten Karten versuchen, den Punkteverlust zu minimieren
• **[Match-Situationen](./expressions_partie):** In kritischen Momenten gezielt auf bestimmte Punktzahlen hinarbeiten
• **[Weis](./weis_rules_general)-Kalkulation:** Einbeziehen von [Weis-Punkten](./expressions_weispunkte) in die Gesamtstrategie

Timing der Ansage:
Die Wahl des [Trumpfs](./general_trump_values) sollte auch im Hinblick auf erreichbare Punktzahlen getroffen werden.

Teamkoordination:
Mit dem [Partner](./schieber_taktiken_partner) abgestimmt auf gemeinsame Punkteziele hinarbeiten.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist Punktestrategie beim Schieber?",
    "answer": "Punktestrategie umfasst die optimale Gestaltung der Punktevergabe durch Maximierung, Schadensbegrenzung, Match-Situationen und Weis-Kalkulation."
  },
  {
    "question": "Wann sollte man auf viele Punkte spielen?",
    "answer": "Besonders bei Aussicht auf Matsch sollte man versuchen, möglichst viele Punkte zu erreichen."
  },
  {
    "question": "Was ist bei der Trumpf-Wahl wichtig?",
    "answer": "Die Wahl des Trumpfs sollte auch im Hinblick auf erreichbare Punktzahlen getroffen werden, in Abstimmung mit dem Partner."
  }
]
```

---
id: `schieber_taktiken_special`
---

**Bereinigter Haupttext:**
```markdown
Spezielle Spielsituationen:
Es gibt besondere Situationen beim [Schieber](./general_introduction), die spezielle [Taktiken](./schieber_taktiken_basics) erfordern.

Spezialszenarien:
• **[Matsch](./expressions_matsch)-Situationen:** Wenn ein Team droht, alle [Stiche](./expressions_stich) zu verlieren oder zu gewinnen
• **Kritische Match-Punkte:** Wenn man kurz vor dem Sieg oder der Niederlage steht
• **Ungewöhnliche Kartenverteilungen:** Extrem starke oder schwache Hände
• **[Weis](./weis_rules_general)-Dominanz:** Wenn [Weis-Punkte](./expressions_weispunkte) eine entscheidende Rolle spielen

Anpassungsfähigkeit:
In diesen Situationen müssen Standard-Taktiken an die besonderen Umstände angepasst werden.

Erfahrung:
Das Erkennen und richtige Reagieren auf Spezial situationen kommt mit zunehmender Spielerfahrung.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was sind spezielle Spielsituationen beim Schieber?",
    "answer": "Spezielle Situationen umfassen Matsch-Situationen, kritische Match-Punkte, ungewöhnliche Kartenverteilungen und Weis-Dominanz."
  },
  {
    "question": "Wie geht man mit Spezialsituationen um?",
    "answer": "Man muss Standard-Taktiken an die besonderen Umstände anpassen und flexibel reagieren."
  },
  {
    "question": "Wie lernt man, Spezialsituationen zu erkennen?",
    "answer": "Das Erkennen und richtige Reagieren auf Spezialsituationen kommt mit zunehmender Spielerfahrung."
  }
]
```

---
id: `schieber_taktiken_trump`
---

**Bereinigter Haupttext:**
```markdown
Trumpfstrategie:
Die richtige Wahl und Verwaltung des [Trumpfs](./general_trump_values) ist entscheidend für den Erfolg beim [Schieber](./general_introduction).

Trumpf-Wahl:
• **Kartenstärke:** Die eigene Trumpfstärke einschätzen - wie viele hohe [Trumpfkarten](./general_trump_values) besitzt man?
• **Farbverteilung:** Berücksichtigen der Länge und Stärke anderer [Farben](./expressions_kartenfarben)
• **[Weis](./weis_rules_general)-Potential:** Einbeziehen möglicher [Weis-Punkte](./expressions_weispunkte)
• **Partnerhand:** Einschätzen, was der [Partner](./schieber_taktiken_partner) haben könnte

Trumpfverwaltung:
• **Timing:** Wann setzt man [Trumpf](./general_trump_values) ein - früh oder spät?
• **[Anziehen](./schieber_taktiken_anziehen):** Gegnerische Trumpfkarten gezielt entfernen
• **Trumpfsparen:** Trumpf für entscheidende Momente aufbewahren

Sonderfälle:
Bei [Obenabe](./expressions_obenabe) und [Undenufe](./expressions_undenufe) gelten besondere strategische Überlegungen.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was ist wichtig bei der Trumpf-Wahl?",
    "answer": "Man sollte die eigene Trumpfstärke, Farbverteilung, Weis-Potential und die mögliche Partnerhand einschätzen."
  },
  {
    "question": "Wann sollte man Trumpf spielen?",
    "answer": "Das Timing ist entscheidend - ob man früh oder spät Trumpf einsetzt, hängt von der Spielsituation ab. Man kann auch gegnerische Trumpfkarten durch Anziehen entfernen."
  },
  {
    "question": "Gibt es Besonderheiten bei Obenabe und Undenufe?",
    "answer": "Ja, bei Obenabe und Undenufe gelten besondere strategische Überlegungen, da es keinen klassischen Trumpf gibt."
  }
]
```

---
id: `schieber_taktiken_verwerfen`
---

**Bereinigter Haupttext:**
```markdown
Definition:
Das [Verwerfen](./expressions_verwerfen) ist eine grundlegende [Taktik](./schieber_taktiken_basics), bei der man [Karten](./general_card_basics) aus schwachen [Farben](./expressions_kartenfarben) zu einem [Stich](./expressions_stich) beigibt.

Strategische Aspekte:
• **Kommunikation:** Signalisiert dem [Partner](./schieber_taktiken_partner), dass man in dieser Farbe keine guten Karten besitzt
• **Kartenverwaltung:** Befreit die Hand von unnötigen Karten
• **Prioritäten:** Entscheidung, welche Farbe man als erstes «leerspielt»

Intelligentes Verwerfen:
• **Reihenfolge:** Die Reihenfolge der verworfenen Karten kann zusätzliche Informationen vermitteln
• **Timing:** Wann man welche Karte verwirft, ist strategisch bedeutsam
• **[Querverwerfen](./schieber_taktiken_querverwerfen):** Spezielle Technik für fortgeschrittene Spieler

Koordination:
Das Verwerfen sollte im Einklang mit den [Konventionen](./schieber_conventions) der Spielgruppe erfolgen, um Missverständnisse zu vermeiden.
```

**Strukturierte FAQs:**
```json
[
  {
    "question": "Was bedeutet Verwerfen beim Jassen?",
    "answer": "Verwerfen ist eine Taktik, bei der man Karten aus schwachen Farben zu einem Stich beigibt und damit dem Partner signalisiert, dass man in dieser Farbe keine guten Karten besitzt."
  },
  {
    "question": "Wie verwirft man intelligent?",
    "answer": "Man sollte die Reihenfolge der verworfenen Karten beachten (kann zusätzliche Informationen vermitteln), das richtige Timing wählen und die Konventionen der Spielgruppe beachten."
  },
  {
    "question": "Was ist Querverwerfen?",
    "answer": "Querverwerfen ist eine spezielle, fortgeschrittene Technik, bei der man absichtlich eine unerwartete Farbe verwirft, um komplexe Informationen zu übermitteln."
  }
]
```

---

## ✅ ZUSAMMENFASSUNG

- Verarbeitete Artikel: 242
- Artikel mit FAQs: 242
- Artikel ohne FAQs: 0
- Output-Datei: `jasswiki/batches/STRUCTURED_FAQ_DATA.md`
- Status: ✅ Datenstrukturierung abgeschlossen. `STRUCTURED_FAQ_DATA.md` wurde mit 242 Artikeln erstellt und ist bereit für den finalen Transfer.
