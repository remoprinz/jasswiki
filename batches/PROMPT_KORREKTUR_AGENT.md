# 🔧 PROMPT: Korrektur-Agent - Typos & Quellenangaben entfernen

**Agent:** Korrektur-Agent  
**Format:** Bulletpoints beibehalten, nur Korrekturen  
**Aufgabe:** Typos korrigieren, Quellenangaben entfernen  
**Output:** Korrigierte `jass-content-v2.json` Datei

---

## 📋 IHRE AUFGABE

Sie sind **Korrektur-Agent** für die finale Content-Korrektur des Jasswiki.

### Ihre Hauptaufgaben:

1. **Typos korrigieren** (Rechtschreibfehler in Bulletpoints)
2. **Groß-/Kleinschreibung korrigieren** (nur am Satzanfang groß, sonst klein)
3. **Quellenangaben entfernen** ("jassguru.ch" aus Strategien/Taktiken entfernen)

**⚠️ WICHTIG:** 
- Nur KORREKTUREN, keine Umformulierungen!
- Bulletpoint-Format BEIBEHALTEN!
- Struktur BEIBEHALTEN!
- Nur offensichtliche Fehler korrigieren!

---

## 🔴 KRITISCHE FEHLER (SOFORT KORRIGIEREN)

### 1. Rechtschreibfehler / Typos

#### Problem-Beispiele:
- ❌ "Tif" → ✅ "tief"
- ❌ "Nächster" (in der Mitte eines Bulletpoints) → ✅ "nächster"
- ❌ Andere offensichtliche Typos

#### Regel:
- **Korrektur nur bei klaren Rechtschreibfehlern**
- **Fachbegriffe NICHT ändern** (z.B. "Nächster" als Fachbegriff bleibt groß!)
- **Nur eindeutige Fehler korrigieren**

---

### 2. Groß-/Kleinschreibung (NICHT bei Fachbegriffen!)

#### Problem-Beispiel:
```
❌ FALSCH:
• Ausnahme Nächster Stich: Wenn ein Spieler vom nicht fehlbaren Team bereits im Stich ist...

✅ RICHTIG:
• Ausnahme nächster Stich: Wenn ein Spieler vom nicht fehlbaren Team bereits im Stich ist...
```

#### Regel:
- **Nach Doppelpunkt:** Normalerweise klein, AUSSER wenn es ein Fachbegriff ist
- **"Nächster Stich" als Fachbegriff:** Kann groß bleiben (prüfen ob fachlich korrekt!)
- **"nächster Stich" als Beschreibung:** Klein schreiben
- **Am Satz-/Bulletpoint-Anfang:** Immer groß
- **In der Mitte eines Satzes:** Normalerweise klein

#### Entscheidungsregel:
- Ist "Nächster Stich" ein **Fachbegriff** (wie "Trumpf", "Stich", "Weis")? → **Groß**
- Ist es eine **Beschreibung** ("der nächste Stich")? → **Klein**

**Im Zweifelsfall:** Klein schreiben (gilt als Beschreibung, nicht als Fachbegriff)

---

### 3. Quellenangaben entfernen (jassguru.ch)

#### Problem:
Quellenangaben wie "jassguru.ch" oder "Bei jassguru.ch" erscheinen in Strategien/Taktiken-Artikeln.

#### Regel:
- **"jassguru.ch" komplett entfernen** aus ALLEN Artikeln
- **"Bei jassguru.ch gelten folgende Vorteile:"** → Entweder komplett entfernen ODER umformulieren zu "Vorteile:"
- **Marketing-Referenzen entfernen** aus Strategie-Inhalten

#### Beispiele:

**BEISPIEL 1: Hoch-tief / Tief-hoch-tief**
```
❌ VORHER:
• Bei jassguru.ch gelten folgende Vorteile:
• Strategie-Tipp von jassguru.ch
• jassguru.ch empfiehlt...

✅ NACHHER:
• Strategie-Tipp:
• Empfehlung:
(oder komplett entfernen wenn nicht nötig)
```

**BEISPIEL 2: Allgemeine Strategie-Artikel**
```
❌ VORHER:
Mit jassguru.ch wird das Schreiben noch schneller...

✅ NACHHER:
Das Schreiben kann durch Apps schneller erledigt werden...
(oder komplett entfernen)
```

**BEISPIEL 3: Kontext-Zwischensätze**
```
❌ VORHER:
Bei jassguru.ch gelten folgende Vorteile:
• App rechnet automatisch
• Fehler werden vermieden

✅ NACHHER:
Vorteile von Apps:
• App rechnet automatisch
• Fehler werden vermieden
(oder komplett entfernen wenn nur Marketing)
```

#### Wann NICHT entfernen:
- ✅ Wenn "jassguru.ch" Teil eines **Beispiels** ist (z.B. "jassguru.ch als Beispiel einer Jassapp")
- ✅ Wenn es in einem **Referenz-Artikel** steht (dort sind Quellen erwünscht)
- ✅ Wenn es Teil der **Fakten** ist (nicht nur Marketing)

#### Wann ENTFERNEN:
- ❌ **Marketing-Text** in Strategie-Artikeln
- ❌ **App-Werbung** in Taktik-Artikeln
- ❌ **Promotion-Text** in Regel-Artikeln
- ❌ **"Bei jassguru.ch gelten folgende Vorteile:"** → Komplett entfernen oder umformulieren

---

## ✅ UMFORMULIERUNGS-REGELN (NUR FÜR QUELLENANGABEN)

### Erlaubt:
- ✅ Quellenangaben entfernen
- ✅ "Bei jassguru.ch gelten folgende Vorteile:" → Entweder entfernen ODER umformulieren zu "Vorteile:" oder "Vorteile von Apps:"
- ✅ Marketing-Text entfernen

### NICHT erlaubt:
- ❌ Bulletpoint-Format ändern
- ❌ Struktur ändern
- ❌ Inhalte umformulieren (außer Quellenangaben)
- ❌ Fachbegriffe ändern

---

## 📝 ARBEITSSCHRITTE

### Schritt 1: Datei laden
1. Öffne `/Users/remoprinz/Documents/Jassguru/jasswiki/src/data/jass-content-v2.json`
2. Lade die Datei in ein JSON-Tool oder Editor

### Schritt 2: Systematische Prüfung

#### A) Typos suchen
```bash
# Suche nach bekannten Typos
grep -i "tif" jass-content-v2.json
grep "Nächster" jass-content-v2.json | grep -v "^[[:space:]]*\"[A-Z]"
```

#### B) Quellenangaben suchen
```bash
# Suche nach jassguru.ch Referenzen
grep -i "jassguru.ch" jass-content-v2.json
```

#### C) Groß-/Kleinschreibung prüfen
```bash
# Suche nach "Nächster" in der Mitte von Bulletpoints
grep "Nächster" jass-content-v2.json
```

### Schritt 3: Korrekturen durchführen

Für jeden gefundenen Fehler:
1. **Artikel-ID notieren**
2. **Fehler-Typ kategorisieren** (Typo / Groß-/Kleinschreibung / Quellenangabe)
3. **Korrektur durchführen**
4. **Prüfen:** Ist die Korrektur korrekt?

### Schritt 4: Validierung

Nach allen Korrekturen:
- [ ] Alle "jassguru.ch" Referenzen entfernt (außer Referenz-Artikeln)
- [ ] Alle Typos korrigiert
- [ ] Groß-/Kleinschreibung korrigiert
- [ ] Bulletpoint-Format beibehalten
- [ ] JSON-Struktur validiert

---

## 📋 KORREKTUR-FORMAT

### Für jede Korrektur dokumentieren:

```markdown
## Korrektur X: [Artikel-ID]

**Fehler-Typ:** [Typo / Groß-/Kleinschreibung / Quellenangabe]

**Vorher:**
```
[Original-Text mit Fehler]
```

**Nachher:**
```
[Korrigierter Text]
```

**Begründung:**
[Warum wurde korrigiert?]
```

---

## ✅ CHECKLISTE PRO KORREKTUR

- [ ] Fehler eindeutig identifiziert?
- [ ] Korrektur ist klar (nicht subjektiv)?
- [ ] Bulletpoint-Format beibehalten?
- [ ] Struktur nicht geändert?
- [ ] Fachbegriffe nicht geändert?
- [ ] JSON-Struktur validiert?

---

## 🎯 BEISPIELE

### Beispiel 1: Typo korrigieren

**Artikel:** `[artikel_id]`

**Vorher:**
```
• Tif-Hoch-Tief-Strategie: Variante der Hoch-Tief-Strategie
```

**Nachher:**
```
• Tief-Hoch-Tief-Strategie: Variante der Hoch-Tief-Strategie
```

**Begründung:** Klarer Rechtschreibfehler "Tif" → "Tief"

---

### Beispiel 2: Groß-/Kleinschreibung

**Artikel:** `falscher_spieler`

**Vorher:**
```
• Ausnahme Nächster Stich: Wenn ein Spieler vom nicht fehlbaren Team bereits im Stich ist...
```

**Nachher:**
```
• Ausnahme nächster Stich: Wenn ein Spieler vom nicht fehlbaren Team bereits im Stich ist...
```

**Begründung:** "nächster Stich" ist eine Beschreibung, nicht ein Fachbegriff. Nach Doppelpunkt klein schreiben.

---

### Beispiel 3: Quellenangabe entfernen

**Artikel:** `[strategie_artikel]`

**Vorher:**
```
• Bei jassguru.ch gelten folgende Vorteile:
• App rechnet automatisch
• Fehler werden vermieden
```

**Nachher Option A (entfernen):**
```
• App rechnet automatisch
• Fehler werden vermieden
```

**Nachher Option B (umformulieren):**
```
• Vorteile von Apps:
• App rechnet automatisch
• Fehler werden vermieden
```

**Begründung:** Marketing-Referenz entfernt, da nicht strategisch relevant.

---

## 📚 REFERENZ-DOKUMENTE

**Hauptquelle:**
- `/Users/remoprinz/Documents/Jassguru/jasswiki/src/data/jass-content-v2.json`

**Suchbefehle:**
```bash
# Typos finden
grep -i "tif" src/data/jass-content-v2.json

# Quellenangaben finden
grep -i "jassguru.ch" src/data/jass-content-v2.json

# Groß-/Kleinschreibung prüfen
grep "Nächster" src/data/jass-content-v2.json | grep -v "^[[:space:]]*\"[A-Z]"
```

---

## 🚀 START

1. **Lade jass-content-v2.json**
2. **Suche systematisch nach:**
   - Typos (z.B. "Tif")
   - Quellenangaben ("jassguru.ch")
   - Groß-/Kleinschreibung ("Nächster" in der Mitte)
3. **Korrigiere alle gefundenen Fehler**
4. **Validiere JSON-Struktur**
5. **Speichere korrigierte Datei**
6. **Erstelle Backup**

---

## ⚠️ WICHTIGE HINWEISE

### Was Sie KORRIGIEREN sollen:
- ✅ Klare Rechtschreibfehler (Tif → Tief)
- ✅ Groß-/Kleinschreibung nach Doppelpunkt (Nächster → nächster, wenn Beschreibung)
- ✅ Quellenangaben ("jassguru.ch") aus Strategien entfernen

### Was Sie NICHT ändern sollen:
- ❌ Bulletpoint-Format (bleibt gleich!)
- ❌ Struktur (bleibt gleich!)
- ❌ Fachbegriffe (z.B. "Trumpf" bleibt groß!)
- ❌ Inhaltliche Formulierungen (außer Quellenangaben entfernen)

### Zweifelsfall?
- Bei Unsicherheit: **KORREKTUR UNTERLASSEN**
- Bei Fachbegriffen: **IM ZWEIFEL GROSS LASSEN**
- Bei Quellenangaben: **IM ZWEIFEL ENTFERNEN** (wenn in Strategie/Taktik-Artikel)

---

**WICHTIG:** 
- Nur KORREKTUREN, keine Umformulierungen!
- Bulletpoint-Format BEIBEHALTEN!
- Struktur BEIBEHALTEN!

**Viel Erfolg!** 🚀

