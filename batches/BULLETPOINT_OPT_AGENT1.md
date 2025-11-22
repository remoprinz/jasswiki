# 🤖 BULLETPOINT-OPTIMIERUNG AGENT 1

**Bearbeiter:** Agent 1  
**Artikel:** 24 Artikel (Weis-Regeln + Regeln: Ausmachen, Schreiben, Spielende)  
**Status:** ✅ Abgeschlossen  
**Datum:** 2. November 2025

---

## `general_game_end`

### ✅ OPTIMIERT:
```markdown
Regel:
Ein Jass endet unter folgenden Umständen:
• Ein Team hat die Zielpunktzahl erreicht und bedankt
• Beide Teams werfen zusammen (Einigung auf Neustart)
• Das Spiel wird annulliert (z.B. wegen schwerer Regelverstösse)

Nach Spielende:
• Die Punkte werden gezählt und notiert
• Bei Erreichen der Gesamtpunktzahl ist die Partie vorbei
• Ansonsten beginnt eine neue Runde
```

**Änderungen:**
- ✅ "Regel:" als Label hinzugefügt
- ✅ Keine 2x Doppelpunkte hintereinander
- ✅ Struktur in zwei klare Blöcke aufgeteilt

**Inhaltlich:** ✅ Klar

---

## `rest_machen`

### ✅ OPTIMIERT:
```markdown
Definition:
Rest machen ermöglicht es, das Spiel zu verkürzen, wenn man alle restlichen Stiche erzielen kann.

Ablauf:
• Ein Spieler ist der Ansicht, alleine oder mit seinem Partner die restlichen Stiche zu erzielen
• Mit «Rest» oder «Rest machen» kann das Spiel verkürzt werden
• Die restlichen Karten müssen offen auf den Tisch gelegt oder gezeigt werden

Konsequenz bei Fehler:
• Wenn die Voraussetzung nicht erfüllt ist, verliert der fehlbare Spieler sowie sein Partner alle noch nicht gespielten Karten an den Gegner
• Beispiel: Wenn Trumpf-Bauer (Puur), Nell und Trumpf-Sechser offengelegt werden, aber der Trumpf-Siebner beim Gegner noch im Spiel ist, besitzt man nicht alle trumpfhöchsten Karten
• Beim regulären Weiterspielen hätte eine versehentlich gespielte Karte den Stich an den Gegner geben können

Ausnahmen:
• Bei Pandur können die Gegner das Weiterspielen verlangen, bis das zu ersteigernde Ziel erreicht ist
• Bei Auktionsjass und Differenzler muss restliches Spiel ausgejasst werden, wenn der Gegner dies verlangt
```

**Änderungen:**
- ✅ "Definition:" Label hinzugefügt
- ✅ Artikel in logische Blöcke strukturiert (4 Blöcke)
- ✅ Synonym "Puur" für Bauer hinzugefügt
- ✅ Fließtext für Definition statt Bulletpoint
- ✅ Zerrissene Sätze zusammengeführt

**Inhaltlich:** ✅ Klar

---

## `spiel_annullieren`

### ✅ OPTIMIERT:
```markdown
Regel:
Ein Spiel kann annulliert werden, wenn schwere Regelverstösse auftreten.

Gründe für Annullierung:
• Falsche Kartenanzahl pro Spieler
• Schwere Spielfehler (z.B. wiederholtes Nichtfarben)
• Bemerkungen, die das Spiel beeinflussen
• Betrug oder absichtliche Regelverstösse

Ablauf und Konsequenzen:
• Das Spiel wird sofort beendet
• Keine Punkte werden vergeben
• Es wird neu gemischt und ausgeteilt
```

**Änderungen:**
- ✅ "Regel:" Label hinzugefügt mit Fließtext-Einleitung
- ✅ In 3 logische Blöcke strukturiert
- ✅ Zerrissene Bulletpoints ("Grund 1-4", "Konsequenz 1-2") zusammengeführt
- ✅ Synonym "Nichtfarben" beibehalten (bekannter Begriff)

**Inhaltlich:** ✅ Klar

---

## `weis_rules_achtblatt`

### ✅ OPTIMIERT:
```markdown
Definition:
• Acht aufeinanderfolgende Karten derselben Farbe bilden ein Achtblatt (8 Blatt)
• Wert: 250 Weispunkte
• Aussergewöhnliche Weis-Kombination

Gültigkeit:
• Gültig für alle Jassarten mit Weisen
• Funktioniert unabhängig davon, ob Trumpf, Undenufe oder Obenabe gespielt wird

Beispiel:
• Ass, König, Dame (Ober), Under (Puur), Zehn (Banner), Neun (Nell), Acht, Sieben in einer Farbe

Voraussetzung:
• Die Meldung vor dem ersten Ausspiel ist zwingend erforderlich, andernfalls verliert der Weis seine Gültigkeit
```

**Änderungen:**
- ✅ "Definition:" Label hinzugefügt
- ✅ "(8 Blatt)" als Synonym ergänzt
- ✅ In 4 logische Blöcke strukturiert
- ✅ Beispiel-Block hinzugefügt mit Synonymen (Dame/Ober, Under/Puur, Zehn/Banner, Neun/Nell)
- ✅ Letzter Bulletpoint als einzelner Punkt, da er zusammengehört

**Inhaltlich:** ✅ Klar

---

## `weis_rules_ausmachen_basics`

### ✅ OPTIMIERT:
```markdown
Grundregel:
Beim Ausmachen entscheidet die Reihenfolge «Stöck - Wys - Stich».

Sondervereinbarung:
• Andere Abfolge (z.B. «Stöck - Stich - Wys») muss vor dem ersten Spiel vereinbart werden

Gültigkeit der Stöcke:
• Stöcke zählen ausschliesslich bei Trumpffarben
• Stöcke zählen nicht bei Undenufe oder Obenabe

Hintergrund dieser Regelung:
Die Ausmachregel orientiert sich am Aufwand verschiedener Kombinationen:
• Stöcke benötigen nur zwei spezifische Karten: König und Ober (oder Dame)
• Für einen gültigen Weis braucht es mindestens drei aufeinanderfolgende Karten
• Ein einzelner Stich kann bereits aus einer einzigen Karte bestehen
```

**Änderungen:**
- ✅ "Grundregel:" als Label mit Fließtext-Einleitung
- ✅ Keine 2x Doppelpunkte hintereinander
- ✅ In 4 logische Blöcke strukturiert
- ✅ "Wichtig zu wissen:" entfernt (redundant)
- ✅ "Diese Regelung orientiert sich..." als kontextuelle Einleitung mit Fließtext

**Inhaltlich:** ✅ Klar

---

## `weis_rules_ausmachen_early_thanking`

### ✅ OPTIMIERT:
```markdown
Grundregel:
Spieler, der sich bedankt, obwohl er das Ziel nicht erreicht hat, verliert automatisch die Partie.

Erlaubtes Bedanken:
• Spieler legt eine Karte und die Punkte aus allen bereits in diesem Stich gelegten Karten (inklusive seiner eigenen) reichen zum Sieg aus
• Der Spieler kann sich sofort bedanken

Verbotenes Verhalten:
• Während eines laufenden Spiels Karten zählen, um herauszufinden, ob die Punkte zum Sieg ausreichen
• Wer dies tut und sich bedankt, verliert die Partie, falls sich herausstellt, dass das Ziel nicht erreicht wurde

Zweck dieser Regel:
• Verhindert, dass während des Spiels gezählt wird
• Verhindert die Suche nach zusätzlichen Bockkarten

Sonderfall – Falsch gespielte Karte:
• Falls sich ein Team bedankt und dabei Punkte einer versehentlich falsch gespielten Karte des Gegners mitzählt, wird das Bedanken als ungültig gewertet
• Dies gilt nur, wenn nach korrigierter Kartenverteilung die erforderliche Punktzahl nicht mehr erreicht wird
```

**Änderungen:**
- ✅ "Grundregel:" als Label mit Fließtext
- ✅ In 5 logische Blöcke aufgeteilt (5+ Bulletpoints-Regel)
- ✅ Zerrissene Sätze zusammengeführt ("Bedingungen für erlaubtes Bedanken")
- ✅ Redundante Wiederholungen entfernt
- ✅ Klarere Überschriften für bessere Scannbarkeit

**Inhaltlich:** ✅ Klar

---

## `weis_rules_ausmachen_order`

### ✅ OPTIMIERT:
```markdown
Grundregel:
Nach Beendigung des ersten Stichs kann die Ausmachregel greifen. Haben beide Teams das Ziel erreicht, gilt die feste Wertungsreihenfolge:
• Zuerst werden Stöcke gewertet (sofern ausreichend oder in Kombination)
• Danach folgt der Weis
• Anschliessend der Stich

Zeitpunkt der Berufung:
• Die Möglichkeit, sich auf diese Regel zu berufen, endet erst, wenn der Spieler seine Karte zum zweiten Stich beigibt
• Bei Anwendung spielt die Reihenfolge des Bedankens keine Rolle

Besonders relevant im letzten Spiel:
• Haben alle ihre erste Karte gespielt und erreicht ein Team mit Weispunkten, das andere mit Kartenpunkten das Ziel, entscheidet die Ausmachregel über den Sieg

Standardregelung:
• Falls vor Spielbeginn keine Vereinbarung getroffen wurde und auch keine lokale Gewohnheit bekannt ist, gilt standardmässig immer die Reihenfolge «Stöck - Wys - Stich»
```

**Änderungen:**
- ✅ "Grundregel:" als Label mit kontextuellem Fließtext
- ✅ In 4 logische Blöcke strukturiert
- ✅ Zerrissene Sätze zusammengeführt (Standardregelung war 3 Bulletpoints)
- ✅ Klarere Überschriften

**Inhaltlich:** ✅ Klar

---

## `weis_rules_ausmachen_schneider`

### ✅ OPTIMIERT:
```markdown
Besondere Situation:
Im ersten Stich erreicht ein Team das Gesamtziel, während das andere Team sich noch im Schneider befindet. Ein Team nutzt Weispunkte, das andere Kartenpunkte zum Ausmachen. Hier greift ebenfalls die Ausmachregel: Entweder «Stöck - Wys - Stich» oder, falls vereinbart, «Stöck - Stich - Wys».

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

**Änderungen:**
- ✅ "Besondere Situation:" als Label mit kontextuellem Fließtext
- ✅ In 3 logische Blöcke strukturiert
- ✅ Beispiele klar getrennt mit aussagekräftigen Überschriften
- ✅ Zerrissene Sätze zusammengeführt
- ✅ Klarere Struktur für bessere Verständlichkeit

**Inhaltlich:** ✅ Klar

---

## `weis_rules_ausmachen_thanking`

### ✅ OPTIMIERT:
```markdown
Grundregel:
Während des Spielverlaufs oder beim Spielende steht es jedem Team frei, sich jederzeit zu bedanken. Ob die Partei gerade am Zug ist oder nicht, spielt keine Rolle. Entscheidend ist: Das Team, das sich zuerst bedankt und über ausreichend Punkte verfügt, gewinnt die Partie.

Verbindlichkeit der Erklärung:
• Verschiedene Formulierungen sind gleichwertig und alle rechtsverbindlich
• Beispiele für gleichwertige Formulierungen: «Wir sind fertig», «Wir haben genug», «Mir sind dusse» oder andere Art der Siegesmeldung
• Alle haben den gleichen Stellenwert wie «Wir bedanken uns»
• Wenn ein Spieler sich bedankt, bindet dies automatisch auch seinen Partner
• Gilt unabhängig davon, wer aktuell als Schreiber fungiert
```

**Änderungen:**
- ✅ "Grundregel:" als Label mit kontextuellem Fließtext
- ✅ Keine 2x Doppelpunkte hintereinander
- ✅ Zerrissene Bulletpoints zusammengeführt (Beispiele in einen Bulletpoint)
- ✅ Struktur in 2 klare Blöcke

**Inhaltlich:** ✅ Klar

---

## `weis_rules_dreiblatt`

### ✅ OPTIMIERT:
```markdown
Definition:
• Drei aufeinanderfolgende Karten derselben Farbe bilden ein Dreiblatt (3 Blatt)
• Wert: 20 Weispunkte

Gültigkeit:
• Gilt für sämtliche Jassvarianten, bei denen Weisen erlaubt sind
• Kann bei Spielen mit Trumpffarbe gewiesen werden
• Kann bei Undenufe gewiesen werden
• Kann bei Obenabe gewiesen werden

Voraussetzung:
• Der Weis muss vor dem ersten Ausspiel angemeldet werden, nur so bleibt er gültig
```

**Änderungen:**
- ✅ "Definition:" Label hinzugefügt
- ✅ "(3 Blatt)" als Synonym ergänzt
- ✅ Zerrissene Sätze in "Voraussetzung" zusammengeführt
- ✅ Struktur in 3 klare Blöcke

**Inhaltlich:** ✅ Klar

---

## `weis_rules_fuenfblatt`

### ✅ OPTIMIERT:
```markdown
Definition:
• Fünf aufeinanderfolgende Karten derselben Farbe ergeben ein Fünfblatt (5 Blatt)
• Wert: 100 Weispunkte

Gültigkeit:
• Gültig für alle Jassarten mit Weisen
• Funktioniert bei Trumpffarbe, Undenufe und Obenabe gleichermassen
• Bei gleichem Punktwert schlägt Fünfblatt vier gleiche Karten

Beispiel:
• Ass, König, Dame (Ober), Under (Puur), Zehn (Banner) in einer Farbe

Voraussetzung:
• Meldung vor dem ersten Ausspiel erforderlich, andernfalls ungültig
```

**Änderungen:**
- ✅ "Definition:" Label hinzugefügt
- ✅ "(5 Blatt)" als Synonym ergänzt
- ✅ "Beispiel:" Block hinzugefügt mit Synonymen in Klammern
- ✅ Struktur in 4 logische Blöcke
- ✅ Zerrissene Sätze zusammengeführt

**Inhaltlich:** ✅ Klar

---

## `weis_rules_general`

### ✅ OPTIMIERT:
```markdown
Grundsätzliche Regel:
Alle Weise müssen vor dem ersten Ausspiel gemeldet werden.

Ausnahme:
• Der letzte Spieler darf noch weisen, bis der Stich zusammengenommen wurde

Korrektur falscher Meldung:
• Falls ein Spieler versehentlich eine falsche Punktezahl meldet (z.B. 20 statt 50), kann dies nur korrigiert werden, solange die entsprechende Karte noch nicht gedeckt wurde

Bei gleichwertigen Weisen:
• Der zweite Melder hat nur die Möglichkeit, mit «gut» zu antworten
• «Vorhand» zu sagen ist nicht gestattet
• Der wertvollste Weis wird grundsätzlich zuerst genannt
• Danach können weitere gleichwertige oder niedrigere Weise nachgemeldet werden

Zweite Weise und Nachfragen:
• Zweite Weise müssen spätestens bis zum zweiten Stich deklariert werden
• Falls jemand einen Weis überhört hat, kann er bis zum zweiten Stich nachfragen

Verboten:
• Unnötige Weismeldungen sind nicht erlaubt
• Karten, die zu ungültigen Weisen verraten wurden, verlieren ihren Stechwert
```

**Änderungen:**
- ✅ "Grundsätzliche Regel:" als Label mit Fließtext
- ✅ In 6 logische Blöcke strukturiert (ursprünglich 5+ Bulletpoints ohne Struktur)
- ✅ "Zweite Weise" und "Nachfrage" zusammengeführt (logisch verwandt)
- ✅ Keine 2x Doppelpunkte hintereinander

**Inhaltlich:** ✅ Klar

---

## `weis_rules_kreuzweis`

### ✅ OPTIMIERT:
```markdown
Definition:
Diese Regel ermöglicht es, eine einzelne Karte für zwei verschiedene Weismeldungen zu verwenden.

Beispiel:
• Ein Vierblatt (4 Blatt) beginnend beim Ass in Schilten kombiniert mit vier Königen ergibt zusammen 150 Punkte
• Die verwendeten Karten dürfen sich durchaus überschneiden

Gültigkeit:
• Kreuzweise sind bei allen Spielarten erlaubt, die Weisen zulassen

Wichtige Regel:
• Der wertvollere Weis muss vor dem ersten Ausspiel gemeldet werden
• Der weniger wertvolle darf erst dann angesagt werden, wenn der höhere Weis erfolgreich war

Grundvoraussetzung:
• Beide Weise müssen für sich genommen gültig sein
```

**Änderungen:**
- ✅ "Definition:" als Fließtext (keine Bulletpoint, da einzelne Aussage)
- ✅ Synonym "(4 Blatt)" bei Vierblatt ergänzt
- ✅ Struktur in 5 klare Blöcke
- ✅ Keine 2x Doppelpunkte hintereinander

**Inhaltlich:** ✅ Klar

---

## `weis_rules_neunblatt`

### ✅ OPTIMIERT:
```markdown
Definition:
• Neun aufeinanderfolgende Karten derselben Farbe ergeben ein Neunblatt (9 Blatt)
• Wert: 300 Weispunkte
• Höchste Weis beim Jassen

Gültigkeit:
• Gültig für alle Jassarten, die Weisen zulassen
• Funktioniert bei Trumpffarbe, Undenufe und Obenabe gleichermassen

Beispiel:
• Ass, König, Dame (Ober), Under (Puur), Zehn (Banner), Neun (Nell), Acht, Sieben, Sechs in einer Farbe

Voraussetzung:
• Meldung vor dem ersten Ausspiel ist zwingend, damit der Weis rechtsgültig bleibt
```

**Änderungen:**
- ✅ "Definition:" Label hinzugefügt
- ✅ "(9 Blatt)" als Synonym ergänzt
- ✅ "Beispiel:" Block hinzugefügt mit Synonymen (Dame/Ober, Under/Puur, Zehn/Banner, Neun/Nell)
- ✅ Struktur in 4 logische Blöcke

**Inhaltlich:** ✅ Klar

---

## `weis_rules_notation_basics`

### ✅ OPTIMIERT:
```markdown
Grundregel:
Das erzielte Resultat eines Spieles (Kartenpunkte) wird nach Beendigung sofort notiert. Schreiben ist erlaubt bis zum ersten Stich des neuen Spieles. Der Schreiber muss die Punkte jederzeit übersichtlich notieren.

Schreibweise auf der Tafelseite:
• Striche für 100 Punkte: Oben von links nach rechts
• Striche für 50 Punkte: Mitte der Tafelseite
• Striche für 20 Punkte: Unten von links nach rechts

Vorteile von Apps:
• Schreiben wird schneller und präziser erledigt
• App rechnet automatisch für beide Teams
• Vermeidet Fehler bei Punkteberechnung
• Mehr Zeit zum Jassen bleibt
```

**Änderungen:**
- ✅ "Grundregel:" als Label mit Fließtext (3 Bulletpoints zusammengeführt)
- ✅ "=" vor den Bulletpoints entfernt (unnötig)
- ✅ Struktur in 3 klare Blöcke
- ✅ Keine 2x Doppelpunkte hintereinander

**Inhaltlich:** ✅ Klar

---

## `weis_rules_notation_correction`

### ✅ OPTIMIERT:
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

**Änderungen:**
- ✅ "Regel bei nur einem Schreiber:" als Label mit Fließtext
- ✅ In 3 logische Blöcke strukturiert (5+ Bulletpoints aufgeteilt)
- ✅ Zerrissene Sätze zusammengeführt
- ✅ Klarere Überschriften

**Inhaltlich:** ✅ Klar

---

## `weis_rules_notation_numbers`

### ✅ OPTIMIERT:
```markdown
Grundregel:
Die rechte Seite der Jass-Tafel ist ausschliesslich für eine einzige Zahl reserviert. Die Zahl kann positiv oder negativ sein (z.B. 8 oder -12).

Nach Eintragung durch beide Schreiber:
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

**Änderungen:**
- ✅ "Grundregel:" als Label mit Fließtext (2 Bulletpoints zusammengeführt)
- ✅ Keine 2x Doppelpunkte hintereinander
- ✅ Struktur in 3 klare Blöcke

**Inhaltlich:** ✅ Klar

---

## `weis_rules_sechsblatt`

### ✅ OPTIMIERT:
```markdown
Definition:
• Sechs aufeinanderfolgende Karten derselben Farbe bilden ein Sechsblatt (6 Blatt)
• Wert: 150 Weispunkte

Gültigkeit:
• Gültig für alle Jassarten mit Weisen
• Funktioniert unabhängig von der Spielart (Trumpf, Undenufe oder Obenabe)

Beispiel:
• Ass, König, Dame (Ober), Under (Puur), Zehn (Banner), Neun (Nell) in einer Farbe

Voraussetzung:
• Meldung vor dem ersten Ausspiel ist zwingend, sonst verliert der Weis seine Gültigkeit
```

**Änderungen:**
- ✅ "Definition:" Label hinzugefügt
- ✅ "(6 Blatt)" als Synonym ergänzt
- ✅ "Beispiel:" Block hinzugefügt mit Synonymen
- ✅ Struktur in 4 logische Blöcke

**Inhaltlich:** ✅ Klar

---

## `weis_rules_siebenblatt`

### ✅ OPTIMIERT:
```markdown
Definition:
• Sieben aufeinanderfolgende Karten derselben Farbe ergeben ein Siebenblatt (7 Blatt)
• Wert: 200 Weispunkte
• Seltene und sehr wertvolle Weis-Kombination

Gültigkeit:
• Gültig für alle Jassarten, die Weisen zulassen
• Funktioniert bei Trumpffarbe, Undenufe und Obenabe gleichermassen

Beispiel:
• Ass, König, Dame (Ober), Under (Puur), Zehn (Banner), Neun (Nell), Acht in einer Farbe

Voraussetzung:
• Meldung vor dem ersten Ausspiel erforderlich, damit der Weis gültig bleibt
```

**Änderungen:**
- ✅ "Definition:" Label hinzugefügt
- ✅ "(7 Blatt)" als Synonym ergänzt
- ✅ "Beispiel:" Block hinzugefügt mit Synonymen
- ✅ Struktur in 4 logische Blöcke

**Inhaltlich:** ✅ Klar

---

## `weis_rules_stock`

### ✅ OPTIMIERT:
```markdown
Definition:
König und Ober (oder Dame) der Trumpffarbe ergeben zusammen die Stöcke. Diese Kombination bringt 20 Punkte ein und hat einen besonderen Status im Spiel.

Zeitpunkt des Weisens:
• Die Stöcke werden in dem Moment gewiesen, in dem der Spieler seine zweite Stöckkarte ausspielt
• Nachdem diese Karte gedeckt wurde, ist es nicht mehr möglich, die Stöcke zu melden
• Wichtig: Der Partner darf seinen Mitspieler nicht auf vorhandene Stöcke hinweisen

Eintragung der Punkte:
• Punkte müssen unmittelbar oder spätestens bis zum folgenden Stich in die Tafel eingetragen werden

Besonderheit:
• Ein Weis mit Stöcken bleibt unter allen Umständen gültig
• Gilt selbst wenn kein Stich gemacht wird
• Gilt auch wenn ein Match angenommen wurde

Beim Ausmachen:
• Stöcke können zu jedem Zeitpunkt vorgewiesen werden, vorausgesetzt die 20 Punkte reichen zum Erreichen des Ziels aus
• Gleiches gilt auch bei der Wertung für den Bergpreis
```

**Änderungen:**
- ✅ "Definition:" als Fließtext (3 Bulletpoints zusammengeführt)
- ✅ In 5 logische Blöcke strukturiert (5+ Bulletpoints aufgeteilt)
- ✅ Keine 2x Doppelpunkte hintereinander ("Definition:" hatte ursprünglich Bulletpoint)
- ✅ Zerrissene Sätze zusammengeführt

**Inhaltlich:** ✅ Klar

---

## `weis_rules_stock_hindersi`

### ✅ OPTIMIERT:
```markdown
Besondere Regelung:
Bei Jass-Varianten mit Hindersi-Charakter gelten andere Regeln (z.B. Hindersi für 4 Spieler, Hindersi für 3 Spieler). Das Ziel ist, möglichst wenige Punkte zu erzielen.

Wer weist die Stöcke:
• Das gegnerische Team muss die Stöcke für die Gegner weisen
• Nicht das Team, das die Stöcke hält

Grund:
• Bei Hindersi-Varianten sind Punkte negativ
• Stöcke bringen 20 unerwünschte Punkte
• Daher werden sie vom anderen Team gewiesen

Beispiele:
• Hindersi (Ziel: Möglichst wenige Punkte)
• Andere Varianten mit Minuspunkt-Charakter
```

**Änderungen:**
- ✅ "Besondere Regelung:" als Label mit kontextuellem Fließtext (2 Bulletpoints zusammengeführt)
- ✅ Keine 2x Doppelpunkte hintereinander
- ✅ Struktur in 4 klare Blöcke
- ✅ Klarere Hierarchie

**Inhaltlich:** ✅ Klar

---

## `weis_rules_vier_gleiche`

### ✅ OPTIMIERT:
```markdown
Definition:
Vier identische Karten ergeben einen wertvollen Weis.

Werte verschiedener vier gleicher Karten:
• Vier identische Karten (z.B. vier Sechser oder vier Könige): 100 Punkte
• Vier Neuner: 150 Weispunkte
• Vier Under (Bauer, Puur): 200 Weispunkte

Gültigkeit:
• Diese Kombinationen gelten bei Trumpffarben, Undenufe und Obenabe gleichermassen
• Vier gleiche Karten können immer gemeldet werden, ungeachtet der gewählten Spielart

Beispiele:
• Vier Sechser können bei Undenufe, Trumpf oder Obenabe gewiesen werden
• Vier Kinder (auch Asse) gelten bei Undenufe als Hunderterweis

Voraussetzung:
• Die Meldung muss vor dem ersten Ausspiel erfolgen
```

**Änderungen:**
- ✅ "Definition:" als Fließtext hinzugefügt
- ✅ Synonym "(Bauer, Puur)" für Under ergänzt
- ✅ In 5 logische Blöcke strukturiert (5+ Bulletpoints)
- ✅ Zerrissene Beispiel-Bulletpoints zusammengeführt
- ✅ Keine 2x Doppelpunkte hintereinander

**Inhaltlich:** ✅ Klar

---

## `weis_rules_vierblatt`

### ✅ OPTIMIERT:
```markdown
Definition:
• Vier aufeinanderfolgende Karten derselben Farbe bilden ein Vierblatt (4 Blatt)
• Wert: 50 Weispunkte

Gültigkeit:
• Gültig für alle Jassarten, die Weisen zulassen
• Funktioniert sowohl mit Trumpf als auch bei Undenufe oder Obenabe

Beispiel:
• Ass, König, Dame (Ober), Under (Puur) in einer Farbe

Voraussetzung:
• Meldung muss vor dem ersten Ausspiel erfolgen, sonst ungültig
```

**Änderungen:**
- ✅ "Definition:" Label hinzugefügt
- ✅ "(4 Blatt)" als Synonym ergänzt
- ✅ "Beispiel:" Block hinzugefügt mit Synonymen (Dame/Ober, Under/Puur)
- ✅ Struktur in 4 logische Blöcke
- ✅ Zerrissene Sätze zusammengeführt

**Inhaltlich:** ✅ Klar

---

## `zusammenwerfen`

### ✅ OPTIMIERT:
```markdown
Definition:
Zusammenwerfen bedeutet, dass sich beide Teams darauf einigen, das aktuelle Spiel abzubrechen und neu zu beginnen.

Gründe für Zusammenwerfen:
• Fehler beim Verteilen
• Einigung, dass die Karten ungünstig verteilt sind
• Wunsch nach Neustart

Voraussetzung und Ablauf:
• Beide Teams müssen zustimmen
• Keine Punkte werden vergeben
• Es wird neu gemischt und verteilt
```

**Änderungen:**
- ✅ "Definition:" als Fließtext (kein Bulletpoint, da einzelne Aussage)
- ✅ In 3 logische Blöcke strukturiert
- ✅ Zerrissene Bulletpoints zusammengeführt ("Grund 1-3", "Regel, Konsequenz, Ablauf")
- ✅ Klarere Überschriften

**Inhaltlich:** ✅ Klar

---

## 📊 ZUSAMMENFASSUNG

**Bearbeitete Artikel:** 24  
**Status:** ✅ Alle optimiert  
**Unklar geflaggt:** 0

### Häufigste Optimierungen:
1. ✅ Labels hinzugefügt (Definition:/Regel:/Grundregel:)
2. ✅ Zerrissene Sätze zusammengeführt
3. ✅ Struktur bei 5+ Bulletpoints in Blöcke aufgeteilt
4. ✅ Synonyme ergänzt (Puur/Bauer/Under, Dame/Ober, Banner/Zehn, Nell/Neun)
5. ✅ Fließtext für Einleitungen statt Bulletpoints
6. ✅ Keine 2x Doppelpunkte hintereinander
7. ✅ Kontextuelle Einleitungen hinzugefügt
8. ✅ Beispiel-Blöcke für Blatt-Artikel ergänzt

### Qualitätsmerkmale:
- ✅ Alle Überschriften auf korrektes Hochdeutsch geprüft
- ✅ Klare Hierarchie und Scannbarkeit
- ✅ Keywords am Anfang (wo natürlich)
- ✅ Synonyme für RAG/SEO optimiert
- ✅ Logische Gruppierung der Inhalte

---

**Ende Agent 1 – Bereit für Review** ✅

