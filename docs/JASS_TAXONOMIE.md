# 📜 DIE JASS-TAXONOMIE

> Die vollständige Ordnung aller Jass-Begriffe
> 
> Version: 1.0 (2026-01-08)
> Autor: Jasswiki.ch / WikiFeeder
> Wikidata-Referenz: Q137732108 (Jass contract)

---

## Übersicht

Diese Taxonomie kategorisiert **alle Jass-Begriffe** in fünf Hauptkategorien:

1. **Spielarten** (Varianten)
2. **Spielmodi** (Ansagen)
3. **Karten**
4. **Punktesystem**
5. **Spielablauf**

---

## 1. SPIELARTEN (Varianten)

Spielarten definieren das Grundgerüst: Wie viele spielen? In Teams oder alleine? Was ist das Ziel?

### A) Partnerspiele (2×2 Teams)

| Spielart | Spieler | Ansagemechanismus | Besonderheit |
|----------|---------|-------------------|--------------|
| **Schieber** | 4 | Vorhand oder Schieben | Die Standardvariante |
| **Coiffeur** | 4 | Alle Modi Pflicht | Matrix mit Multiplikatoren |
| **Bieter** | 4 | Bietrunde | Höchster Bieter wählt |
| **Kreuzjass** | 4 | Reihum | Partner diagonal |

### B) Einzelspiele (Jeder für sich)

| Spielart | Spieler | Ansagemechanismus | Besonderheit |
|----------|---------|-------------------|--------------|
| **Differenzler** | 4 | Punkteansage | Differenz zum Ziel zählt negativ |
| **Molotow** | 4–6 | Reihum | Negativspiel |
| **Pandur** | 3–4 | Vorhand | Minimalpunkte |
| **Mittlere** | 4 | Reihum | Mittlere Punktzahl gewinnt |

### C) Sondervarianten

| Spielart | Spieler | Besonderheit |
|----------|---------|--------------|
| **Chratze** | 3–6 | Ausscheidungsspiel |
| **Guggitaler** | 3–4 | Mit Geldeinsatz |
| **Hindersi** | 3–4 | Negativspiel (wenigste Punkte gewinnt) |
| **Tschau Sepp** | 2–6 | Lernvariante für Anfänger |

---

## 2. SPIELMODI (Ansagen / Jass-Kontrakte)

Der Spielmodus bestimmt, welche Karte sticht. Er wird vor jeder Runde angesagt.

> **Wikidata:** Diese Kategorie entspricht der Klasse "Jass contract" (Q137732108), 
> definiert als Subklasse von "game mechanic" (Q1751513).

### A) Trumpfspiele (Eine Farbe sticht)

| Modus (Deutsch) | Modus (Französisch) | Trumpffarbe |
|-----------------|---------------------|-------------|
| Rosen | Herz ♥ | Rote Farbe 1 |
| Schellen | Karo ♦ | Rote Farbe 2 |
| Eichel | Kreuz ♣ | Schwarze Farbe 1 |
| Schilten | Pik ♠ | Schwarze Farbe 2 |

**Rangfolge im Trumpf:**
```
Puur > Nell > Ass > König > Ober > Under > Banner > 9 > 8 > 7 > 6
```

### B) Richtungsspiele (Kein Trumpf)

| Modus | Rangfolge | Punktebesonderheit |
|-------|-----------|-------------------|
| **Obenabe** | A > K > O > U > B > 9 > 8 > 7 > 6 | 8er zählt 8 Punkte |
| **Undenufe** | 6 > 7 > 8 > 9 > B > U > O > K > A | 6er zählt 11 Punkte |

> **Wichtig:** Undenufe ist eine **Rang-Inversion**, nicht nur eine Ziel-Inversion!
> Die 6 ersetzt das Ass als höchste Karte.

### C) Kombinationsmodi

| Modus | Beschreibung | Bestandteile |
|-------|--------------|--------------|
| **Slalom** | Alternierend pro Stich | Obenabe + Undenufe |
| **Guschti / Quer** | Diagonal durch Stiche | Spezialregel |
| **Misère** | Minimalpunkte-Modus | Negativspiel innerhalb einer Runde |

---

## 3. KARTEN (36 Karten)

Das Jass-Blatt besteht aus 36 Karten: 4 Farben × 9 Werte.

### A) Sonderkarten (Trumpf-spezifisch)

| Karte | Deutsch | Französisch | Punkte (Trumpf) | Funktion |
|-------|---------|-------------|-----------------|----------|
| **Puur** | Bube | Bube (J) | 20 | Höchster Trumpf |
| **Nell** | 9 | 9 | 14 | Zweithöchster Trumpf |

> **Achtung:** Der Puur ist der Bube der **Trumpffarbe**. 
> Der Under/Bube einer anderen Farbe ist kein Puur!

### B) Bildkarten

| Karte | Deutsch | Französisch | Punkte |
|-------|---------|-------------|--------|
| König | König | Roi (K) | 4 |
| Ober | Ober | Dame (Q) | 3 |
| Under | Under | Bube (J) | 2 |

### C) Zahlkarten

| Karte | Punkte (Normal) | Punkte (Obenabe) | Punkte (Undenufe) |
|-------|-----------------|------------------|-------------------|
| Ass | 11 | 11 | 0 |
| Banner/10 | 10 | 10 | 10 |
| 9 | 0 | 0 | 0 |
| 8 | 0 | 8 | 8 |
| 7 | 0 | 0 | 0 |
| 6 | 0 | 0 | 11 |

### D) Farbäquivalenzen

| Deutsch | Französisch | Symbol | Farbe |
|---------|-------------|--------|-------|
| Rosen | Herz | ♥ | Rot |
| Schellen | Karo | ♦ | Rot |
| Eichel | Kreuz | ♣ | Schwarz |
| Schilten | Pik | ♠ | Schwarz |

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
| Dreiblatt | 3 aufeinanderfolgende Karten | 20 |
| Vierblatt | 4 aufeinanderfolgende Karten | 50 |
| Fünfblatt | 5 aufeinanderfolgende Karten | 100 |
| Sechsblatt | 6 aufeinanderfolgende Karten | 150 |
| Sieben-/Acht-/Neunblatt | 7–9 aufeinanderfolgende Karten | 200 |
| Vier Gleiche (9, B, U, O, K) | Vier Karten gleichen Rangs | 100 |
| Vier Gleiche (Nell) | Vier Neuner | 150 |
| Vier Gleiche (Puur) | Vier Buben | 200 |
| **Stöck** | König + Ober in Trumpffarbe | 20 |

### C) Sonderpunkte

| Ereignis | Punkte | Beschreibung |
|----------|--------|--------------|
| Letzter Stich | +5 | Bonus für den letzten Stich |
| Match | +100 | Alle 9 Stiche gewonnen |
| Kontermatch | +200 | Gegner matschiert zurück |

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
| **Trumpf wählen** | Vorhand wählt den Modus |
| **Schieben** | Delegation an Partner (nur Schieber) |
| **Weisen** | Kartenkombinationen melden |

### C) Stichphase (9 Stiche pro Runde)

| Schritt | Beschreibung |
|---------|--------------|
| **Ausspielen** | Erste Karte legen |
| **Farbe bekennen** | Farbzwang (wenn möglich) |
| **Stechen** | Mit Trumpf überstechen |
| **Untertrumpfen** | Nur wenn keine Farbe vorhanden |

### D) Abschluss

| Schritt | Beschreibung |
|---------|--------------|
| **Stöck melden** | Falls König + Ober in Trumpf |
| **Bedanken** | Bei 157 Punkten (alle Stiche) |
| **Schreiben** | Punkte auf Tafel/App notieren |

---

## Wikidata-Referenzen

Diese Taxonomie ist mit folgenden Wikidata-Entities verknüpft:

| Konzept | Wikidata ID | Status |
|---------|-------------|--------|
| Jass | Q786768 | ✅ Vorhanden |
| Schieber | Q137727247 | ✅ Vorhanden |
| Differenzler | Q137731684 | ✅ Vorhanden |
| Coiffeur | Q137731700 | ✅ Vorhanden |
| Jass contract (Klasse) | Q137732108 | ✅ Erstellt |
| Obenabe | – | ⏳ Geplant |
| Undenufe | – | ⏳ Geplant |
| Slalom (Jass) | – | ⏳ Geplant |

---

## Quellen

- Schweizerisches Idiotikon, Band III, Sp. 69 f.
- Wikipedia: Jass (https://de.wikipedia.org/wiki/Jass)
- Jasswiki.ch (https://jasswiki.ch)
- Lebendige Traditionen der Schweiz (BAK)

---

*Diese Taxonomie wurde im Rahmen des "Semantic Land Grabbing"-Projekts erstellt, 
um die Schweizer Jass-Kultur strukturiert im Semantic Web abzubilden.*
