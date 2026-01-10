# 📜 DIE JASS-TAXONOMIE

> Die vollständige Ordnung aller Jass-Begriffe
> 
> **Version: 4.0 – Wikidata-Optimierte Edition** (2026-01-10)
> 
> Autor: Jasswiki.ch / WikiFeeder 3.0
> 
> Wikidata-Referenzen: Q786768 (Jass), Q137732108 (Jass contract)
> 
> **Changelog 3.3:**
> - ✅ Neue Kategorie: Königsspiele (Pandur, Bieter, Aucho)
> - ✅ Blattgröße als Strukturmerkmal (36 vs. 24 Karten)
> - ✅ Destruktionsspiele detailliert (Molotow, Hindersi)
> - ✅ Erweitertes Glossar (25+ neue Begriffe)
> - ✅ Sidi Barrani "Double Jeopardy" Scoring
> 
> **Changelog 3.2:**
> - ✅ Untertrumpf-Verbot detailliert erklärt
> - ✅ Trumpffreiheit ergänzt
> - ✅ Weis-Hierarchie mit Prioritätslogik
> - ✅ Taktische Konzepte (Bock, Schmieren, etc.)

---

## Übersicht

Diese Taxonomie kategorisiert **alle Jass-Begriffe** in neun Hauptkategorien:

1. **Spielarten** (Varianten)
2. **Spielmodi** (Ansagen / Jass-Kontrakte)
3. **Karten** (inkl. Rollen, Schweizer & Französisches Blatt)
4. **Punktesystem**
5. **Spielablauf**
6. **Regeln**
7. **Taktik**
8. **Glossar** (NEU!)
9. **Varianten-Details** (NEU!)

---

## 1. SPIELARTEN (Varianten)

Spielarten definieren das Grundgerüst: Wie viele spielen? In Teams oder alleine? Was ist das Ziel?

> **Strukturelles Merkmal: Blattgröße**
> - **36-Blatt** (Standard): Schieber, Coiffeur, Sidi Barrani, Molotow
> - **24-Blatt** (Reduziert): Pandur, Bieter (6, 7, 8 entfernt)

### A) Partnerspiele (2×2 Teams, symmetrisch)

| Spielart | Spieler | Ansagemechanismus | Besonderheit | Wikidata |
|----------|---------|-------------------|--------------|----------|
| **Schieber** | 4 | Vorhand oder Schieben | Die Standardvariante | Q137727247 |
| **Coiffeur** | 4 | Alle Modi Pflicht | Matrix mit Multiplikatoren | Q137731700 |
| **Sidi Barrani** | 4 | Bieten mit Punktzahl | "Double Jeopardy" Scoring | – |
| **Bolschewik** | 4 | Wie Sidi Barrani | Mit doppeltem Kartendeck (72 Karten!) | – |
| **Kreuzjass** | 4 | Reihum | Partner diagonal | – |

### B) Königsspiele (Asymmetrische Allianzen) ⚔️

> **NEU in 3.3:** Eine eigenständige Kategorie für Spiele mit asymmetrischer Struktur.
> Ein "König" (Solospieler) tritt gegen eine "Bauernpartei" (Allianz) an.

| Spielart | Spieler | Blatt | Ansagemechanismus | Besonderheit |
|----------|---------|-------|-------------------|--------------|
| **Pandur** | 3–4 | **24** | Bieten (streng) | Härteste Variante, sofortiger Verlust bei Fehler |
| **Bieter** | 3–5 | 36 | Bieten (flexibel) | Flexibler als Pandur, geselliger |
| **Aucho** | 3–4 | 36 | Reihum | "Erben"-Prinzip: Geber erhält Partner-Punkte |
| **Schafhauser** | 3 | 36 | Kartenbestimmung | Kein Bieten, Solospieler durch Karten bestimmt |

> **Pandur-Hierarchie (Biet-Stufen):**
> 100–200 (Basis) → Misère ohne Trumpf (Wert 8) → Misère mit Trumpf (Wert 10) → 210–250 → Pandur ohne Trumpf (Wert 15) → Pandur mit Trumpf (Wert 16)

### C) Einzelspiele (Jeder für sich)

| Spielart | Spieler | Ansagemechanismus | Besonderheit | Wikidata |
|----------|---------|-------------------|--------------|----------|
| **Differenzler** | 3–4 | Punkteansage | Differenz zum Ziel zählt negativ | Q137731684 |
| **Mittlere** | 4 | Reihum | Mittlere Punktzahl gewinnt | – |
| **Handjass** | 2–4 | Trumpf ziehen | Karten vom Stapel ziehen | – |

### D) Destruktionsspiele (Invertierte Ziele) 💣

> **Ziel: Punkte VERMEIDEN!** Das Gegenteil des klassischen Jass.

| Spielart | Spieler | Trumpf-Mechanik | Besonderheit |
|----------|---------|-----------------|--------------|
| **Molotow** | 4–6 | Erster Farbverrat bestimmt Trumpf! | Tischweis (schlecht!) vs. Handweis (gut!) |
| **Hindersi** | 3–4 | Normal | Einfaches Punkteminimierung |

### E) Sondervarianten

| Spielart | Spieler | Besonderheit |
|----------|---------|--------------|
| **Chratze** | 3–6 | Pot-Mechanik, nur 4 Karten |
| **Guggitaler** | 3–4 | Mit Geldeinsatz, Glücksspiel |
| **Tschau Sepp** | 2–6 | Ablegespiel (Mau-Mau-artig), Lernvariante |
| **Zwick-Jass** | 3–6 | Mit "Schlecken" (Karten vom Stapel nehmen) |
| **Zuger** | 3 | Geber pausiert, erhält 10 Punkte pauschal |

---

## 2. SPIELMODI (Ansagen / Jass-Kontrakte)

Der Spielmodus bestimmt, welche Karte sticht. Er wird vor jeder Runde angesagt.

> **Wikidata:** Diese Kategorie entspricht der Klasse "Jass contract" (Q137732108), 
> definiert als Subklasse von "game mechanic" (Q1751513).

### A) Trumpfspiele

Eine der vier Kartenfarben wird zum Trumpf erklärt und sticht alle anderen.

| Modus | Beschreibung | Wikidata |
|-------|--------------|----------|
| **Trumpf** | Konzept: Eine Farbe sticht alle anderen – Puur & Nell werden aktiviert | – |

> **Hinweis:** Welche vier Farben zur Auswahl stehen, hängt vom verwendeten Blatt ab:
> - **Schweizer Blatt:** Schellen, Schilten, Rosen, Eichel
> - **Französisches Blatt:** Herz, Karo, Kreuz, Pik

**Rangfolge im Trumpf:**
```
Puur > Nell > Ass > König > Ober > Under > Banner > 9 > 8 > 7 > 6
```

### B) Richtungsspiele (Kein Trumpf)

| Modus | Rangfolge | Punktebesonderheit |
|-------|-----------|-------------------|
| **Obenabe** | A > K > O > U > 10 > 9 > 8 > 7 > 6 | 8er zählt 8 Punkte | Q137737920 |
| **Undenufe** | 6 > 7 > 8 > 9 > 10 > U > O > K > A | 6er zählt 11 Punkte, Ass = 0 | Q137738279 |

> **Wichtig:** Undenufe ist eine **Rang-Inversion**, nicht nur eine Ziel-Inversion!
> Die 6 ersetzt das Ass als höchste Karte.

### C) Kombinationsmodi

| Modus | Beschreibung | Bestandteile |
|-------|--------------|--------------|
| **Slalom** | Alternierend pro Stich | Obenabe + Undenufe |
| **Guschti / Quer** | Spezielle Stichfolge | Spezialregel |
| **Trio (3×3)** | 3 Stiche pro Modus | Trumpf + Obenabe + Undenufe |
| **Misère** | Minimalpunkte-Modus | Negativspiel innerhalb einer Runde |

---

## 3. KARTEN (36 Karten)

Das Jass-Blatt besteht aus 36 Karten: 4 Farben × 9 Werte.

### A) Sonderkarten = ROLLEN (Trumpf-spezifisch)

> **Ontologischer Hinweis:** Puur und Nell sind keine Karten, sondern **ROLLEN**!
> Der Under wird zum Puur, die 9 wird zum Nell – aber nur in der Trumpffarbe.

| Rolle | Physische Karte | Punkte | Rang | Bedingung |
|-------|-----------------|--------|------|-----------|
| **Puur** | Under/Bube | 20 | Höchster Trumpf | Wenn diese Farbe Trumpf ist |
| **Nell** | 9 | 14 | Zweithöchster Trumpf | Wenn diese Farbe Trumpf ist |

> **Wikidata-Modellierung:**
> - `Puur (Jass)` → instance of: Card role
> - `Puur (Jass)` → physical card: Under (Jack)
> - `Puur (Jass)` → condition: "When suit is Trump"

### B) Bildkarten

| Karte | Punkte | Wikidata |
|-------|--------|----------|
| König | 4 | Q516114 |
| Ober | 3 (Schweizer/Deutsches Blatt) | Q572267 |
| Dame | 3 (Französisches Blatt) | Q505744 |
| Under | 2 (wird zu Puur bei Trumpf → 20!) | Q510474 |

### C) Zahlkarten

| Karte | Punkte (Normal) | Punkte (Obenabe) | Punkte (Undenufe) | Wikidata |
|-------|-----------------|------------------|-------------------|----------|
| Ass | 11 | 11 | 0 | Q378907 |
| Banner/10 | 10 | 10 | 10 | – |
| 9 | 0 (14 als Nell) | 0 | 0 | – |
| 8 | 0 | 8 | 8 | – |
| 7 | 0 | 0 | 0 | – |
| 6 | 0 | 0 | 11 | – |

### D) SCHWEIZER BLATT (traditionell)

> **Das Schweizer Blatt ist das traditionelle Jass-Blatt.**
> Es hat eine eigene ikonografische und historische Identität!

| Schweizer Farbe | Symbol | Wikidata | Status |
|-----------------|--------|----------|--------|
| **Schellen** | 🔔 | Q2233012 | ✅ Verifiziert |
| **Schilten** | 🛡️ | Q16623777 | ✅ Verifiziert |
| **Rosen** | 🌹 | Q16623784 | ✅ Verifiziert |
| **Eichel** | 🌰 | Q1301333 | ✅ Verifiziert |

> **Quelle:** Q17424109 (Farben beim Schweizer Blatt)

### E) FRANZÖSISCHES BLATT (alternativ)

> Das internationale Kartensystem. Wird auch für Jass verwendet, besonders in der Westschweiz.

| Französische Farbe | Symbol | Wikidata | Status |
|--------------------|--------|----------|--------|
| **Herz ♥** | ♥ | Q3419242 | ✅ Verifiziert |
| **Ecke ♦** | ♦ | Q513847 | ✅ Verifiziert |
| **Kreuz ♣** | ♣ | Q1788166 | ✅ Verifiziert |
| **Schaufel ♠** | ♠ | Q2094951 | ✅ Verifiziert |

> **Quelle:** Q3054813 (Farben beim französischen Blatt)

### F) Mapping: Schweizer ↔ Französisch

> **Nur relevant, wenn mit französischem Blatt gespielt wird!**
> Die Jasstafel-App verwendet folgendes Mapping:

| Schweizer | Französisch | Hinweis |
|-----------|-------------|---------|
| Schellen | Herz ♥ | Funktionales Äquivalent – NICHT identisch! |
| Schilten | Ecke ♦ | Funktionales Äquivalent – NICHT identisch! |
| Rosen | Kreuz ♣ | Funktionales Äquivalent – NICHT identisch! |
| Eichel | Schaufel ♠ | Funktionales Äquivalent – NICHT identisch! |

> **Ontologisch korrekt in Wikidata:**
> Nutze `corresponds to` oder `functional equivalent`, NICHT `same as`!

---

## 4. PUNKTESYSTEM

### A) Stichpunkte (Pro Runde: 157 total)

| Karte | Trumpf | Nicht-Trumpf | Obenabe | Undenufe |
|-------|--------|--------------|---------|----------|
| Puur (Bube) | 20 | 2 | 2 | 2 |
| Nell (9) | 14 | 0 | 0 | 0 |
| Ass | 11 | 11 | 11 | 0 |
| König | 4 | 4 | 4 | 4 |
| Ober/Dame | 3 | 3 | 3 | 3 |
| Under/Bube | 2 | 2 | 2 | 2 |
| Banner/10 | 10 | 10 | 10 | 10 |
| 8 | 0 | 0 | 8 | 8 |
| 7 | 0 | 0 | 0 | 0 |
| 6 | 0 | 0 | 0 | 11 |
| **Summe** | **152** | **152** | **152** | **152** |
| + Letzter Stich | +5 | +5 | +5 | +5 |
| **Total** | **157** | **157** | **157** | **157** |

### B) Weispunkte (Kartenkombinationen)

| Weis | Beschreibung | Punkte |
|------|--------------|--------|
| **Weis** | Konzept: Punktebonus für Kartenfolgen | – |
| Dreiblatt | 3 aufeinanderfolgende Karten | 20 |
| Vierblatt | 4 aufeinanderfolgende Karten | 50 |
| Fünfblatt | 5 aufeinanderfolgende Karten | 100 |
| Sechsblatt | 6 aufeinanderfolgende Karten | 150 |
| Sieben-/Acht-/Neunblatt | 7–9 aufeinanderfolgende Karten | 200 |
| Vier Gleiche (9, B, U, O, K) | Vier Karten gleichen Rangs | 100 |
| Vier Gleiche (Nell) | Vier Neuner | 150 |
| Vier Gleiche (Puur) | Vier Buben | 200 |
| **Stöck** | König + Ober in Trumpffarbe | 20 |

#### Weis-Hierarchie und Konfliktlösung

> ⚠️ **Nullsummen-Prinzip:** Nur der Spieler mit dem höchsten Weis zählt! Die Weise der Gegner verfallen komplett.

**Prioritätsreihenfolge bei Gleichstand:**

| Priorität | Kombination | Punkte | Konfliktlösung |
|-----------|-------------|--------|----------------|
| 1 (Höchste) | 4× Puur (Buben) | 200 | Schlägt alles |
| 2 | 4× Nell (Neuner) | 150 | – |
| 3 | 4× Gleiche (A, K, O, 10) | 100 | Bei Gleichstand: Höherer Rang gewinnt |
| 4 | 5+ Blatt (Sequenz) | 100+ | Bei Gleichstand: Höhere Startkarte gewinnt |
| 5 | 4 Blatt | 50 | Bei Gleichstand: Höhere Startkarte gewinnt |
| 6 | 3 Blatt | 20 | Bei Gleichstand: Höhere Startkarte gewinnt |

**Beispiel:** Spieler A hat 4× Könige (100), Spieler B hat 5er-Sequenz ab 8 (100).
→ 4× Gleiche haben **höhere Priorität** als Sequenz → Spieler A gewinnt!

### C) Sonderpunkte

| Ereignis | Punkte | Beschreibung |
|----------|--------|--------------|
| Letzter Stich | +5 | Bonus für den letzten Stich |
| **Matsch** | +100 | Alle 9 Stiche gewonnen (= Grand Slam im Bridge) |
| **Kontermatsch** | +200 | Gegner matschiert zurück |

---

## 5. SPIELABLAUF

### A) Vorbereitung

| Schritt | Beschreibung |
|---------|--------------|
| **Mischen** | Karten durchmischen |
| **Abheben** | Gegner hebt ab |
| **Geben** | 3×3 oder 3+2+4 Karten verteilen |

### B) Ansagephase

| Schritt | Beschreibung |
|---------|--------------|
| **Trumpf wählen** | Vorhand wählt den Modus (Farbe oder Richtung) |
| **Schieben** | Delegation an Partner (nur Schieber) |
| **Weisen** | Kartenkombinationen melden |

### C) Stichphase (9 Stiche pro Runde)

| Schritt | Beschreibung |
|---------|--------------|
| **Ausspielen** | Erste Karte legen |
| **Stechen** | Mit höherer Karte oder Trumpf gewinnen |

### D) Abschluss

| Schritt | Beschreibung |
|---------|--------------|
| **Stöck melden** | Falls König + Ober in Trumpf (beim letzten Stich) |
| **Bedanken** | Bei Erreichen der Zielpunktzahl |
| **Schreiben** | Punkte auf Tafel/App notieren |

### E) Taktische Konzepte (Partnerspiele)

> **Indirekte Kommunikation:** Da Sprechen verboten ist, kommunizieren erfahrene Spieler über die Karten!

| Konzept | Beschreibung | Bedeutung |
|---------|--------------|-----------|
| **Der Bock** | Die höchste noch im Spiel befindliche Karte einer Farbe | Dynamischer Status – wenn Ass fällt, wird König zum Bock |
| **Schmieren** | Dem Partner eine wertvolle Karte (Ass, 10) zugeben | "Ich vertraue dir" / Punkte sichern |
| **Verwerfen** | Bewusst eine Farbe leeren | Signal: "Diese Farbe will ich nicht" |
| **Anzeigen** | Hohe Karte spielen, obwohl nicht nötig | Signal: "Ich habe Stärke in dieser Farbe" |

> **Ontologischer Hinweis:** Der "Bock" ist ein **dynamischer Spielzustand** (DynamicState), 
> keine statische Karteneigenschaft. Er verändert sich mit jedem Stich!

---

## 6. REGELN

Regeln definieren die Constraints und Pflichten während des Spiels.

### A) Farbzwang (Bedienpflicht)

| Regel | Beschreibung |
|-------|--------------|
| **Farbe bekennen** | Wer die angespielte Farbe hat, MUSS diese spielen |
| **Trumpffreiheit** | Man darf JEDERZEIT trumpfen, auch wenn man die Farbe hätte! |
| **Kein Stichzwang** | Man muss NICHT stechen (außer bei Trumpf) |

### B) Untertrumpf-Verbot (Kritisch!)

> ⚠️ **Das Untertrumpf-Verbot ist eine der komplexesten Jass-Regeln!**

| Regel | Beschreibung |
|-------|--------------|
| **Untertrumpf-Verbot** | Man darf KEINEN niedrigeren Trumpf spielen, wenn bereits ein höherer Trumpf liegt |
| **Ausnahme** | Erlaubt NUR, wenn die Hand nur noch aus Trümpfen besteht |
| **Variante "Strikt"** | Verbot gilt immer (Standard im Schieber) |
| **Variante "Permissiv"** | Verbot aufgehoben (in einigen Negativspielen wie Molotow) |

**Beispiel:** Gegner spielt Nell (zweithöchster Trumpf). Du hast keine Farbe, aber den Puur. Du MUSST den Puur spielen – du darfst NICHT einen niedrigeren Trumpf "verschenken".

### C) Zählregeln

| Regel | Beschreibung |
|-------|--------------|
| **Stöck-Weis-Stich** | Zählreihenfolge beim Ausmachen: 1) Stöck, 2) Weis, 3) Stiche |
| **157-Regel** | Pro Runde werden immer 157 Punkte verteilt (152 Karten + 5 letzter Stich) |
| **257-Irrtum** | 257 ist KEIN Standard! Nur bei Match (alle Stiche) = 157 + 100 Bonus |

### D) Trumpfregeln

| Regel | Beschreibung |
|-------|--------------|
| **Überstechen** | Höherer Trumpf schlägt niedrigeren |
| **Puur-Privileg** | Puur ist immer der höchste Trumpf (auch über Ass) |
| **Nell-Regel** | Nell ist immer der zweithöchste Trumpf |
| **Trumpf sticht** | Jeder Trumpf schlägt jede Nicht-Trumpf-Karte |

---

## Rang vs. Wert (Kritische Unterscheidung!)

> **Ontologischer Hinweis:** Rang (Stärke) ≠ Wert (Punkte)!

### Obenabe-Beispiel:

| Karte | Rang (Stärke) | Wert (Punkte) | Bemerkung |
|-------|---------------|---------------|-----------|
| Ass | 1 (höchster) | 11 | Stark UND wertvoll |
| König | 2 | 4 | |
| Ober | 3 | 3 | |
| Under | 4 | 2 | |
| **10** | **5** | **10** | ⚠️ Rang niedrig, aber hoher Punktwert! |
| 9 | 6 | 0 | |
| 8 | 7 | 8 | Nur im Obenabe 8 Punkte |
| 7 | 8 | 0 | |
| 6 | 9 (niedrigster) | 0 | |

### Undenufe-Beispiel:

| Karte | Rang (Stärke) | Wert (Punkte) | Bemerkung |
|-------|---------------|---------------|-----------|
| **6** | **1 (höchster)** | **11** | ⚠️ Die 6 ersetzt das Ass! |
| 7 | 2 | 0 | |
| 8 | 3 | 8 | |
| 9 | 4 | 0 | |
| 10 | 5 | 10 | |
| Under | 6 | 2 | |
| Ober | 7 | 3 | |
| König | 8 | 4 | |
| **Ass** | **9 (niedrigster)** | **0** | ⚠️ Das Ass ist wertlos! |

---

## 8. GLOSSAR (Enzyklopädisches Fachvokabular)

> **NEU in 3.3:** Vollständiges Nachschlagewerk aller Jass-Fachbegriffe.
> Basierend auf 91 Begriffen aus jasswiki.ch/begriffe/

### A) Spielaktionen (Taktische Handlungen)

| Begriff | Definition | Taktische Relevanz |
|---------|------------|-------------------|
| **Bock / Bockkarte** | Höchste noch im Spiel befindliche Karte einer Farbe | Garantiert einen Stich (wenn nicht getrumpft). TABU: Darf nicht laut ausgesprochen werden! |
| **Schmieren** | Wertvolle Karte (Ass, 10) dem Partner zugeben | Punktemaximierung bei sicherem Stich |
| **Verwerfen** | Wertlose Karte in verlorenen Stich abgeben | Sich einer Farbe entledigen ("farbenfrei" machen) |
| **Klemmen** | Hohe Karte zurückhalten, obwohl spielbar | Täuschungsmanöver: Gegner glaubt, Karte sitzt woanders |
| **Nachschmeissen** | Starke Karte opfern für Partner | Partner freimachen für dessen Bockkarte |
| **Anziehen** | Hohe Karte spielen, um Stich zu gewinnen | Kontrolle über Spielfluss |
| **Ablupf** | Letzte Karte einer Farbe ausspielen | Erzwingt Trumpf oder Verwerfen |

### B) Regelgebundene Aktionen

| Begriff | Definition | Konsequenz |
|---------|------------|------------|
| **Leih halten** | Synonym für Farbzwang (Farbe bedienen) | Pflicht bei allen Varianten |
| **Untertrumpfen** | Niedrigeren Trumpf spielen, obwohl höherer liegt | VERBOTEN (außer nur noch Trumpf auf Hand) |
| **Erben** | Passiver Punktgewinn beim Pandur/Aucho | Geber erhält Punkte, wenn Partner gewinnt |
| **Schlecken** | Karten vom Stapel/Tisch nehmen | Spezifisch für Zwick-Jass |

### C) Weis-Terminologie

| Begriff | Definition | Punkte |
|---------|------------|--------|
| **Handweis** | Kartenkombinationen auf der Hand | Standard-Weis (20–200 Punkte) |
| **Tischweis** | Kombinationen im Stich (nur Molotow!) | Zählt POSITIV = schlecht beim Molotow! |
| **Kreuzweis** | Spezialweis: Eine Karte zählt für zwei verschiedene Weise | Beide Weise müssen für sich gültig sein |
| **Weisdeklaration** | Ankündigung des Weis vor erstem Stich | Pflicht in den meisten Varianten |

### D) Parteien und Rollen

| Begriff | Definition |
|---------|------------|
| **Königspartei** | Der Solospieler bei Königsspielen (Pandur, Bieter) |
| **Bauernpartei** | Die Allianz gegen den König |
| **Vorhand** | Spieler links vom Geber, spielt zuerst |
| **Am Drücker** | Spieler, der den aktuellen Stich kontrolliert |

### E) Punktebegriffe

| Begriff | Definition |
|---------|------------|
| **Bergpreis** | Bonuspunkte für Zwischenziele (Turniere) |
| **Schneider** | Gegner hat weniger als Hälfte der Punkte |
| **Nuller** | Eine Runde mit 0 Punkten (katastrophal!) |
| **Matschprämie** | Bonus für Match (alle 9 Stiche) |
| **Kontermatsch** | Gegner matschiert nach eigenem Matsch zurück (+200) |

---

## 9. VARIANTEN-DETAILS (Erweiterte Beschreibungen)

### Sidi Barrani: Das "Double Jeopardy" Scoring

> **Herkunft:** Benannt nach dem libyschen Ort Sidi Barrani (2. Weltkrieg).
> Kombiniert Schieber-Teamspiel mit Poker-artigem Bieten.

**Mechanik:**
1. Teams bieten Punktzahlen (z.B. "120")
2. Höchstes Gebot bestimmt Trumpf-Team

**Scoring (Double Jeopardy):**
| Ergebnis | Scoring |
|----------|---------|
| Gebot ERREICHT | Eigene Kartenpunkte + Gebot = Bonifikation |
| Gebot VERFEHLT | Gegner erhält Kartenpunkte + Gebot = Strafe! |

> ⚠️ **Risiko:** Überbietung führt zu massiven Strafpunkten!

---

### Molotow: Die Handgranaten-Mechanik

> **Herkunft:** Wjatscheslaw Molotow / "Molotow-Cocktails" – explosive Natur!

**Trumpf-Dynamik:**
1. Runde startet als **Obenabe** (kein Trumpf)
2. Erster Spieler, der nicht farben kann = **Farbverrat**
3. Die verworfene Karte bestimmt Trumpffarbe für Rest der Runde

**Invertiertes Weis-System:**
| Weis-Typ | Punkte | Gut oder schlecht? |
|----------|--------|-------------------|
| Handweis | Minus | ✅ GUT (Punkte abziehen) |
| Tischweis | Plus | ❌ SCHLECHT (Punkte addieren) |
| Stöck | Minus | ✅ GUT |

---

### Pandur: Die Disziplin der Strenge

> **Das härteste Jass-Spiel überhaupt!**

**Strikte Regeln:**
- Gespielt mit **24 Karten** (6, 7, 8 entfernt)
- **Sofortiger Verlust** bei:
  - Kommentaren am Tisch
  - Falscher Weis-Meldung
  - Unzulässigem Ausspielen
  - Umdrehen gekehrter Stiche

**Biet-Hierarchie (vereinfacht):**
```
100 → 110 → ... → 200 → Misère (8) → Misère+Trumpf (10) → 210 → ... → 250 → Pandur (15) → Pandur+Trumpf (16) → 300
```

---

## Wikidata-Referenzen (Alle verifiziert mit WikiFeeder 3.0!)

Diese Taxonomie ist mit folgenden Wikidata-Entities verknüpft:

### Jass-Konzepte

| Konzept | Wikidata ID | Beziehung | Status |
|---------|-------------|-----------|--------|
| Jass | Q786768 | instance of: card game | ✅ Verifiziert |
| Schieber | Q137727247 | subclass of: Jass | ✅ Selbst erstellt |
| Differenzler | Q137731684 | subclass of: Jass | ✅ Selbst erstellt |
| Coiffeur | Q137731700 | subclass of: Jass | ✅ Selbst erstellt |
| Jass contract (Klasse) | Q137732108 | subclass of: game mechanic | ✅ Selbst erstellt |
| Obenabe | Q137737920 | instance of: Jass contract | ✅ Selbst erstellt |
| Undenufe | Q137738279 | instance of: Jass contract | ✅ Selbst erstellt |
| Slalom (Jass) | Q137738723 | instance of: Jass contract | ✅ Selbst erstellt |
| Weis (Klasse) | Q137738455 | subclass of: game mechanic | ✅ Selbst erstellt |
| Stöck | Q137738329 | instance of: Weis | ✅ Selbst erstellt |
| Dreiblatt | Q137738727 | instance of: Weis | ✅ Selbst erstellt |
| Vierblatt | Q137738728 | instance of: Weis | ✅ Selbst erstellt |
| Vier Gleiche | Q137738729 | instance of: Weis | ✅ Selbst erstellt |
| Puur (Rolle) | Q137738724 | instance of: game mechanic | ✅ Selbst erstellt |
| Nell (Rolle) | Q137738725 | instance of: game mechanic | ✅ Selbst erstellt |
| Pandur | Q137738834 | subclass of: Jass | ✅ Selbst erstellt |
| Bieter | Q137738835 | subclass of: Jass | ✅ Selbst erstellt |
| Chratze | Q137738836 | subclass of: Jass | ✅ Selbst erstellt |
| Molotow | Q137738837 | subclass of: Jass | ✅ Selbst erstellt |
| Hindersi | Q137738838 | subclass of: Jass | ✅ Selbst erstellt |
| Mittlere | Q137738839 | subclass of: Jass | ✅ Selbst erstellt |
| Tschau Sepp | Q137738840 | subclass of: Jass | ✅ Selbst erstellt |
| Schafhauser | Q137738841 | subclass of: Jass | ✅ Selbst erstellt |
| Zuger | Q137738842 | subclass of: Jass | ✅ Selbst erstellt |
| Sidi Barrani | Q137738898 | subclass of: Jass | ✅ Selbst erstellt |
| Kreuzjass | Q137738899 | subclass of: Jass | ✅ Selbst erstellt |
| Handjass | Q137738900 | subclass of: Jass | ✅ Selbst erstellt |
| Stich-Differenzler | Q137738901 | subclass of: Jass | ✅ Selbst erstellt |
| Guggitaler | Q137738902 | subclass of: Jass | ✅ Selbst erstellt |
| Zwick-Jass | Q137738903 | subclass of: Jass | ✅ Selbst erstellt |
| Kreuzweis | Q137738904 | instance of: Weis | ✅ Selbst erstellt |
| Matsch | Q137738726 | instance of: game mechanic | ✅ Selbst erstellt |
| Aucho | Q137739254 | subclass of: Jass | ✅ Selbst erstellt |
| Quer (Guschti) | Q137739255 | instance of: Jass contract | ✅ Selbst erstellt |
| Trio (3x3) | Q137739256 | instance of: Jass contract | ✅ Selbst erstellt |
| Misère (Jass) | Q137739257 | instance of: Jass contract | ✅ Selbst erstellt |
| Bergpreis | Q137739565 | instance of: game mechanic | ✅ Selbst erstellt |
| Kontermatsch | Q137739566 | instance of: game mechanic | ✅ Selbst erstellt |
| Stöck-Weis-Stich | Q137739567 | instance of: game mechanic | ✅ Selbst erstellt |
| Untertrumpf-Verbot | Q137739568 | instance of: game mechanic | ✅ Selbst erstellt |
| Fünfblatt | Q137739569 | instance of: Weis | ✅ Selbst erstellt |
| Sechsblatt | Q137739570 | instance of: Weis | ✅ Selbst erstellt |
| Siebenblatt | Q137739571 | instance of: Weis | ✅ Selbst erstellt |
| Achtblatt | Q137739572 | instance of: Weis | ✅ Selbst erstellt |
| Neunblatt | Q137739573 | instance of: Weis | ✅ Selbst erstellt |

### Spielkartenfarben – Französisches Blatt

| Farbe | Wikidata ID | Status |
|-------|-------------|--------|
| Herz ♥ | Q3419242 | ✅ Verifiziert |
| Ecke ♦ | Q513847 | ✅ Verifiziert |
| Kreuz ♣ | Q1788166 | ✅ Verifiziert |
| Schaufel ♠ | Q2094951 | ✅ Verifiziert |
| (Container) | Q3054813 | ✅ Verifiziert |

### Spielkartenfarben – Schweizer Blatt

| Farbe | Wikidata ID | Status |
|-------|-------------|--------|
| Schellen 🔔 | Q2233012 | ✅ Verifiziert |
| Schilten 🛡️ | Q16623777 | ✅ Verifiziert |
| Rosen 🌹 | Q16623784 | ✅ Verifiziert |
| Eichel 🌰 | Q1301333 | ✅ Verifiziert |
| (Container) | Q17424109 | ✅ Verifiziert |

### Kartenspiel-Konzepte (Allgemein)

| Konzept | Wikidata ID | Status |
|---------|-------------|--------|
| Suit (Farbe) | Q27905 | ✅ Verifiziert |
| Swiss playing cards | Q3660887 | ✅ Verifiziert |
| French playing cards | Q111635220 | ✅ Verifiziert |
| Game mechanic | Q1751513 | ✅ Verifiziert |

---

## Quellen

### Primärquellen
- Schweizerisches Idiotikon, Band III, Sp. 69 f.
- Offizielles Jass-Reglement "Puur-Näll-As"
- Lebendige Traditionen der Schweiz (BAK)

### Digitale Datenbanken
- Jasswiki.ch (https://jasswiki.ch) – 257 Artikel
- Jassverzeichnis.ch (https://jassverzeichnis.ch)
- Swisslos Jass-Regeln
- Pagat.com (internationale Kartenspiel-Datenbank)

### Wissenschaftliche Berichte
- Expertenbericht 1: "Jass-Ontologie & Gap-Analyse" (2026)
- Expertenbericht 2: "Enzyklopädische Taxonomie und Morphologie des Schweizer Jass" (2026)
- Wikipedia: Jass (https://de.wikipedia.org/wiki/Jass)

---

*Diese Taxonomie wurde im Rahmen des "Semantic Land Grabbing"-Projekts erstellt, 
um die Schweizer Jass-Kultur strukturiert im Semantic Web abzubilden.*

**Version 3.3 – Enzyklopädische Weltklasse-Edition**

> ⚠️ **Alle Wikidata-IDs wurden mit dem `verify_wikidata_id` Tool des WikiFeeder 3.0 MCP-Servers verifiziert!**
> Keine halluzierten IDs mehr möglich.

> 📚 **Basierend auf zwei Expertenberichten:**
> 1. "Evaluation und ontologische Erweiterung der Schweizer Jass-Taxonomie"
> 2. "Enzyklopädische Taxonomie und Morphologie des Schweizer Jass"
> 
> Mit über 100 Forschungsquellen (Pagat, Swisslos, Jassverzeichnis, u.a.)

> 📖 **Integriert 257 Artikel aus jasswiki.ch** inkl. aller Varianten und Begriffe
