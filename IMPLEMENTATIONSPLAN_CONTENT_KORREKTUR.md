# 📋 IMPLEMENTATIONSPLAN: Content-Korrektur Jasswiki

**Erstellt:** 2025-11-02  
**Status:** In Planung  
**Priorität:** 🚨 KRITISCH  

---

## 🎯 ZIELE

### Hauptziel
Korrektur aller inhaltlich fehlerhaften Artikel im Jasswiki unter Wahrung des IP-Schutzes.

### Drei kritische Erfolgskriterien

1. ✅ **Inhaltliche Korrektheit**
   - Original (jass-lexikon.json) IST die korrekte Referenz
   - Alle Fakten, Regeln, Zahlen müssen übereinstimmen
   - Keine falschen oder fehlenden Informationen

2. ✅ **IP-Schutz**
   - Formulierung muss AUSREICHEND ANDERS sein
   - NICHT: gleicher Satzbau, gleiche Satzstellung, gleiche Wörter
   - Aber: Fachbegriffe bleiben identisch (Puur, Nell, etc.)

3. ✅ **Verlinkung verwandter Artikel**
   - Jeder Artikel muss verwandte Artikel identifizieren
   - Vorbereitung für spätere `see_also` Integration
   - Basis für "Das könnte Sie auch interessieren"

---

## 📊 AUSGANGSLAGE

### Validierungs-Ergebnisse

Aus `CONTENT_VALIDIERUNG_REPORT.md`:

- **Gesamt:** 249 Artikel
- **OK:** 173 Artikel (69%)
- **Probleme:** 63 Artikel (25%)
  - CONTENT_MISMATCH: 45 Artikel
  - INCOMPLETE: 11 Artikel
  - WRONG_INFO: 0 Artikel
  - MISSING_IN_CONTENT_V2: 7 Artikel
- **Neue Artikel:** 13 (nur in Content-V2)
- **🚨 Kritische Regeln:** 18 Artikel

### Kritisches Beispiel: "Vorspielen"

**Original:** Regelverstoß (Karte zu früh spielen, Konsequenzen)  
**Aktuell:** Normale Spielhandlung (erstes Ausspielen)  
**Status:** ❌ KOMPLETT FALSCH - muss korrigiert werden!

---

## 🗂️ ZWEI-PHASEN-ANSATZ

### Phase 1: Content-Korrektur (JETZT - Dieser Plan)
- Fokus: Inhaltliche Korrektheit
- Datei: `jass-content-v2.json`
- 63 Artikel systematisch korrigieren
- Verwandte Artikel dokumentieren
- Review-Files für User-Approval

### Phase 2: Struktur-Migration (SPÄTER - Separater Plan)
- Migration zu `knowledgebase_agent5.json` Format
- Integration von `see_also`, `citations`, `exceptions`
- Finalisierung zu `knowledgebase.json`
- Community-Editor-Vorbereitung

**Dieser Plan fokussiert auf Phase 1.**

---

## 📦 BATCH-STRUKTUR

### Batch-Priorisierung

#### Batch 1: 🚨 Kritische Regeln (18 Artikel)
**Priorität:** HÖCHSTE  
**Grund:** Falsche Regeln sind am gravierendsten

Artikel:
1. weis_rules_vierblatt - Vierblatt (4 Blatt)
2. weis_rules_fuenfblatt - Fünfblatt (5 Blatt)
3. weis_rules_sechsblatt - Sechsblatt (6 Blatt)
4. weis_rules_siebenblatt - Siebenblatt (7 Blatt)
5. weis_rules_achtblatt - Achtblatt (8 Blatt)
6. weis_rules_neunblatt - Neunblatt (9 Blatt)
7. ausspiel - Ausspiel
8. bergpreis - Bergpreis
9. bodentrumpf - Bodentrumpf
10. kontermatsch - Kontermatsch
11. matsch - Schieber-Varianten
12. untertrumpfen - Untertrumpfen
13. zwei_karten_spielen - Zwei Karten spielen
14. bemerkungen_schnorren - Bemerkungen/Schnorren
15. regeln_verschlagen - Verschlagen
16. rest_machen - Rest machen
17. schneider - Schneider
18. schreiben - Schreiben

#### Batch 2: ⚠️ Normale Regeln mit Problemen (15 Artikel)
**Priorität:** HOCH

Regeln-Artikel die nicht in Batch 1 sind, aber Content-Probleme haben.

#### Batch 3: 📚 Varianten (25 Artikel)
**Priorität:** MITTEL

Varianten-Artikel mit CONTENT_MISMATCH oder INCOMPLETE Status.

#### Batch 4: 📖 Begriffe & Geschichte (5 Artikel)
**Priorität:** NIEDRIG

Nicht-kritische Artikel.

#### Batch 5: ❌ Fehlende Artikel (7 Artikel)
**Priorität:** ZU KLÄREN

Artikel die nur im Original existieren - User muss entscheiden ob gewollt.

---

## 📄 BATCH-FILE-FORMAT

Für jeden Batch wird ein Review-File erstellt:

```markdown
# BATCH [N]: [Titel]

**Datum:** [ISO-Timestamp]
**Anzahl Artikel:** [X]
**Priorität:** [KRITISCH/HOCH/MITTEL/NIEDRIG]

---

## Artikel 1: [Titel] (ID: [artikel_id])

### Status & Kategorie
- **ID:** `[artikel_id]`
- **Titel:** [Titel]
- **Kategorie:** [Kategorie]
- **Status:** [CONTENT_MISMATCH/INCOMPLETE/etc.]
- **Kritisch:** [JA/NEIN]

### Problem-Beschreibung
[Was ist falsch? Was fehlt?]

### Original-Inhalt (REFERENZ - NUR zum Verstehen, NICHT kopieren!)

```
[Original-Text aus jass-lexikon.json]
```

### Aktueller Inhalt (FALSCH/UNVOLLSTÄNDIG)

```
[Aktueller Text aus jass-content-v2.json]
```

### ✅ Korrigierte Version (NEU - IP-sicher umformuliert)

```
[Neu formulierter Text - inhaltlich korrekt, formal anders]
```

### Verwandte Artikel (für spätere Verlinkung)

- `[artikel_id_1]` - [Grund der Verwandtschaft]
- `[artikel_id_2]` - [Grund der Verwandtschaft]
- `[artikel_id_3]` - [Grund der Verwandtschaft]

### Umformulierungs-Techniken verwendet

- [x] Satzstruktur geändert (Aktiv → Passiv / Passiv → Aktiv)
- [x] Synonyme verwendet (wo möglich)
- [x] Reihenfolge der Punkte geändert
- [ ] Liste → Fließtext / Fließtext → Liste
- [x] Eigene Beispiele formuliert
- [x] Fachbegriffe beibehalten (Puur, Nell, etc.)

---

[Weiterer Artikel...]
```

**Dateinamen:**
- `BATCH_01_KRITISCHE_REGELN.md`
- `BATCH_02_NORMALE_REGELN.md`
- `BATCH_03_VARIANTEN.md`
- `BATCH_04_BEGRIFFE_GESCHICHTE.md`
- `BATCH_05_FEHLENDE_ARTIKEL.md`

---

## 🔄 WORKFLOW PRO BATCH

### Schritt 1: AI Erstellt Batch-File
1. AI liest Original + Current für jeden Artikel im Batch
2. AI identifiziert Problem
3. AI erstellt korrigierte Version
4. AI identifiziert verwandte Artikel
5. AI dokumentiert Umformulierungs-Techniken
6. AI speichert Batch-File im Jasswiki-Ordner

### Schritt 2: User Review
1. User öffnet Batch-File
2. User prüft jeden Artikel:
   - Inhaltlich korrekt?
   - Ausreichend umformuliert?
   - Verwandte Artikel vollständig?
3. User gibt Feedback:
   - ✅ Approved
   - 🔄 Änderungen nötig (mit Kommentaren)
   - ❌ Ablehnung (mit Grund)

### Schritt 3: Iteration (bei Bedarf)
1. AI überarbeitet basierend auf Feedback
2. Zurück zu Schritt 2

### Schritt 4: Finalisierung
1. Nach Approval: AI aktualisiert `jass-content-v2.json`
2. AI führt Re-Validierung durch (Skript)
3. AI erstellt Diff-File (was wurde geändert)
4. AI updated Batch-Status in Tracking-File

### Schritt 5: Nächster Batch
Weiter mit nächstem Batch bis alle fertig.

---

## 🛠️ TOOLS & AUTOMATISIERUNG

### 1. Batch-Generator-Skript

**Datei:** `scripts/generate-batch.ts`

**Funktion:**
- Liest CONTENT_VALIDIERUNG_REPORT.md
- Filtert Artikel nach Batch-Nummer
- Erstellt Batch-File mit allen Artikeln
- Lädt Original + Current Texte
- Formatiert als Markdown

**Usage:**
```bash
npm run generate-batch -- --batch 1
```

### 2. Korrektur-Skript mit AI

**Datei:** `scripts/correct-article.ts`

**Funktion:**
- Liest Original-Artikel
- Identifiziert Kerninhalte
- Generiert umformulierten Text (verschiedene Techniken)
- Prüft Similarity-Score (soll < 70% sein)
- Schlägt verwandte Artikel vor (basierend auf Keywords)

**Usage:**
```bash
npm run correct-article -- --id vorspielen
```

### 3. Similarity-Checker

**Datei:** `scripts/check-similarity.ts`

**Funktion:**
- Vergleicht Original mit korrigiertem Text
- Berechnet Similarity-Score
- Warnt bei zu hoher Ähnlichkeit (> 70%)
- Zeigt identische Sätze an

**Usage:**
```bash
npm run check-similarity -- --id vorspielen
```

### 4. Batch-Finalisierungs-Skript

**Datei:** `scripts/finalize-batch.ts`

**Funktion:**
- Nimmt approved Batch-File
- Extrahiert korrigierte Texte
- Updated `jass-content-v2.json`
- Erstellt Backup (timestamped)
- Führt Re-Validierung durch
- Generiert Diff-Report

**Usage:**
```bash
npm run finalize-batch -- --batch 1
```

### 5. Related-Articles-Finder

**Datei:** `scripts/find-related.ts`

**Funktion:**
- Analysiert Artikel-Text
- Findet Erwähnungen anderer Artikel
- Prüft gemeinsame Keywords
- Prüft gleiche Kategorie/Subkategorie
- Schlägt verwandte Artikel vor

**Usage:**
```bash
npm run find-related -- --id vorspielen
```

---

## 📏 QUALITÄTSSICHERUNG

### Inhaltliche Prüfung

#### Checkliste pro Artikel:
- [ ] Alle Regeln aus Original enthalten?
- [ ] Alle Zahlen/Punkte korrekt?
- [ ] Alle Fachbegriffe korrekt verwendet?
- [ ] Alle Ausnahmen erwähnt?
- [ ] Keine falschen Informationen hinzugefügt?

### IP-Schutz Prüfung

#### Umformulierungs-Techniken:

**1. Satzstruktur ändern**
- Original: "Der Spieler muss Farbe bekennen."
- Neu: "Farbe bekennen ist verpflichtend."

**2. Aktiv ↔ Passiv**
- Original: "Der Vorhand spielt die erste Karte aus."
- Neu: "Die erste Karte wird vom Vorhand ausgespielt."

**3. Reihenfolge ändern**
- Original: "1. Mischen, 2. Verteilen, 3. Trumpf ansagen"
- Neu: "Nachdem Trumpf angesagt wurde, werden die vorher verteilten Karten (nach dem Mischen) gespielt."

**4. Listen ↔ Fließtext**
- Original: "Regeln:\n• Punkt 1\n• Punkt 2"
- Neu: "Zu beachten sind folgende Regeln: Punkt 1 und Punkt 2."

**5. Eigene Beispiele**
- Original: [Beispiel X]
- Neu: [Komplett neues Beispiel Y, aber gleiche Regel]

**6. Synonyme (NUR bei allgemeinen Wörtern!)**
- Original: "Der Spieler kann..."
- Neu: "Der Jasser darf..."
- ABER: "Puur", "Nell", "Trumpf" → NICHT ändern!

#### Similarity-Score
- **Ziel:** < 70% Ähnlichkeit
- **Methode:** Levenshtein-Distanz + semantische Analyse
- **Warnung:** Bei > 70% nochmals umformulieren

### Verwandte Artikel

#### Kriterien für Verwandtschaft (Priorität):

1. **Sehr hoch:** Im Text explizit erwähnt
   - "siehe Abschnitt Nichtfarben" → vorspielen ↔ nichtfarben

2. **Hoch:** Gemeinsame Kernbegriffe
   - "Farbe bekennen" in beiden → bedienen ↔ nichtfarben

3. **Mittel:** Gleiche Kategorie + Subkategorie
   - Beide in "Regeln/Spielverlauf"

4. **Niedrig:** Ähnliche Keywords
   - Beide haben "stich", "trumpf" als Keywords

#### Anzahl verwandter Artikel:
- **Minimum:** 3 pro Artikel
- **Maximum:** 8 pro Artikel
- **Optimal:** 4-6 pro Artikel

---

## 📈 FORTSCHRITTS-TRACKING

### Tracking-File: `CONTENT_KORREKTUR_STATUS.md`

```markdown
# Content-Korrektur Status

Letzte Aktualisierung: [Timestamp]

## Übersicht

- **Total Artikel zu korrigieren:** 63
- **Korrigiert:** 0
- **In Review:** 0
- **Approved:** 0

## Batch-Status

### Batch 1: Kritische Regeln (18 Artikel)
- **Status:** 🟡 In Arbeit
- **Fortschritt:** 0/18 (0%)
- **File:** `BATCH_01_KRITISCHE_REGELN.md`

| ID | Titel | Status | Notizen |
|----|-------|--------|---------|
| weis_rules_vierblatt | Vierblatt | 🟡 In Arbeit | - |
| ... | ... | ⚪ Pending | - |

### Batch 2: Normale Regeln (15 Artikel)
- **Status:** ⚪ Pending
- **Fortschritt:** 0/15 (0%)

[...]
```

**Status-Codes:**
- ⚪ Pending (noch nicht begonnen)
- 🟡 In Arbeit (AI erstellt Vorschlag)
- 🟠 In Review (wartet auf User-Feedback)
- 🔄 Revision (AI überarbeitet)
- ✅ Approved (User approved)
- 🚀 Finalized (in jass-content-v2.json übernommen)

---

## 🎨 UMFORMULIERUNGS-BEISPIELE

### Beispiel 1: Regelverstoß "Vorspielen"

**Original (jass-lexikon.json):**
> "Wer vorspielt, also eine Karte zu früh auf den Tisch legt, bevor der links von ihm sitzende Spieler seine Karte gegeben hat, darf die zu früh gespielte Karte nicht mehr zurücknehmen, es sei denn, er hätte nicht gefarbt. In diesem Fall gelten die Regeln des Nichtfarbens, d.h., dieser Stich gehört dem Gegner und die vorgespielte Karte ist mit der eigentlich zu spielenden Karte auszutauschen (siehe Abschnitt «Nichtfarben»)."

**Aktuelle Version (FALSCH):**
> "Vorspielen bedeutet, als Erstes im Stich eine Karte auszuspielen. [...]"
> ❌ Komplett falsch - beschreibt normale Spielhandlung statt Regelverstoß!

**Korrigierte Version (inhaltlich richtig, umformuliert):**
> "Wenn eine Karte zu früh abgelegt wird – also bevor der links sitzende Mitspieler seine Karte abgegeben hat – liegt ein Fehler vor. Die verfrüht abgelegte Karte kann nicht zurückgenommen werden, ausser es wurde die Farbe nicht bedient. In diesem zweiten Fall greifen die Regeln für Nichtfarben: Der Stich geht an die Gegenseite, und die fehlerhafte Karte muss durch die korrekte Karte ersetzt werden."

**Änderungen:**
- ✅ Satzstruktur komplett anders
- ✅ "Wer vorspielt" → "Wenn eine Karte zu früh abgelegt wird"
- ✅ "links von ihm sitzende" → "links sitzende"
- ✅ "darf nicht" → "kann nicht"
- ✅ Reihenfolge leicht verändert
- ✅ "d.h." → "In diesem zweiten Fall"
- ✅ Fachbegriff "Nichtfarben" beibehalten

**Verwandte Artikel:**
- `nichtfarben` - explizit erwähnt
- `stich_verlieren` - Konsequenz des Fehlers
- `bedienen` - Bedienungspflicht relevant
- `falsche_karte` - ähnlicher Regelverstoß

### Beispiel 2: Weis-Regel "Vierblatt"

**Original:**
> "4 Karten der gleichen Farbe in ununterbrochener Reihenfolge ergeben 50 Punkte."

**Korrigiert (IP-sicher):**
> "Eine lückenlose Abfolge von vier aufeinanderfolgenden Karten derselben Farbe bringt 50 Punkte."

**Änderungen:**
- ✅ "4 Karten" → "vier Karten" (ausgeschrieben)
- ✅ "der gleichen" → "derselben"
- ✅ "in ununterbrochener Reihenfolge" → "lückenlose Abfolge ... aufeinanderfolgenden"
- ✅ "ergeben" → "bringt"
- ✅ Struktur: Attribut + Subjekt + Verb statt Subjekt + Verb

---

## 🚦 MEILENSTEINE

### Meilenstein 1: Batch 1 abgeschlossen
- **Ziel:** Alle 18 kritischen Regeln korrigiert
- **Kriterium:** Alle approved und in jass-content-v2.json übernommen
- **ETA:** Nach ca. 2-3 Sessions

### Meilenstein 2: Batch 2 abgeschlossen
- **Ziel:** Alle normalen Regeln korrigiert
- **ETA:** Nach ca. 4-5 Sessions

### Meilenstein 3: Batch 3 abgeschlossen
- **Ziel:** Alle Varianten korrigiert
- **ETA:** Nach ca. 6-8 Sessions

### Meilenstein 4: Phase 1 vollständig
- **Ziel:** Alle 63 Artikel korrigiert
- **Kriterium:** Re-Validierung zeigt 0 inhaltliche Fehler
- **Output:** Saubere jass-content-v2.json

### Meilenstein 5: Vorbereitung Phase 2
- **Ziel:** Dokumentation für Migration
- **Output:** Liste aller verwandten Artikel pro Artikel
- **Output:** Empfehlungen für see_also Implementierung

---

## 🔍 RE-VALIDIERUNG

Nach jedem Batch-Finalisierung:

```bash
npm run validate-content
```

**Erwartetes Resultat:**
- Korrigierte Artikel: Status ✅ OK
- Restliche Artikel: Status unverändert
- Keine neuen Probleme eingeführt

**Output:**
- Aktualisierter `CONTENT_VALIDIERUNG_REPORT.md`
- Diff-Vergleich (vorher/nachher)

---

## ⚠️ RISIKEN & MITIGATION

### Risiko 1: Zu hohe Ähnlichkeit (IP-Verletzung)

**Mitigation:**
- Similarity-Check vor Finalisierung
- Bei > 70%: Nochmals umformulieren
- User reviewed jeden Text

### Risiko 2: Inhaltliche Fehler bei Umformulierung

**Mitigation:**
- AI extrahiert Kernfakten aus Original
- Checkliste für jeden Artikel
- User reviewed Korrektheit

### Risiko 3: Inkonsistenz bei Fachbegriffen

**Mitigation:**
- Glossar der nicht-änderbaren Begriffe
- Automatische Prüfung auf Fachbegriffe
- Consistency-Check zwischen Artikeln

### Risiko 4: Fehlende verwandte Artikel

**Mitigation:**
- Automatischer Related-Finder
- Manuelle Review durch User
- Iterative Verbesserung

### Risiko 5: Zu viele Artikel auf einmal

**Mitigation:**
- Batch-Ansatz (5-20 Artikel pro Batch)
- User kann Batch-Größe anpassen
- Flexible Pause zwischen Batches

---

## 📚 GLOSSAR: NICHT-ÄNDERBARE FACHBEGRIFFE

Diese Begriffe MÜSSEN identisch bleiben:

**Karten:**
- Puur (Under/Bauer im Trumpf)
- Nell (Neun im Trumpf)
- Banner (Zehn)
- Under / Ober
- Ass, König

**Farben:**
- Schellen, Schilten, Rosen, Eicheln
- Herz, Kreuz, Karo, Pik (französisch)
- Carreau, Coeur, Pique, Trèfle

**Spielbegriffe:**
- Trumpf
- Stich
- Farbe bekennen / Bedienen
- Weis / Wys
- Matsch / Match
- Schieber
- Vorhand, Nachhand
- Stocker / Stöcke

**Regelbegriffe:**
- Nichtfarben
- Ausmachen
- Schneider
- Bergpreis

Bei Unsicherheit: Lieber beibehalten als ändern!

---

## 🎯 ERFOLGS-DEFINITION

Phase 1 ist erfolgreich abgeschlossen, wenn:

1. ✅ Alle 63 problematischen Artikel korrigiert
2. ✅ Re-Validierung zeigt 0 inhaltliche Fehler
3. ✅ Alle Artikel haben Similarity < 70%
4. ✅ Alle Artikel haben min. 3 verwandte Artikel dokumentiert
5. ✅ User hat alle Batches approved
6. ✅ `jass-content-v2.json` ist updated und getestet
7. ✅ Backup der alten Version existiert

**Dann:** Bereit für Phase 2 (Struktur-Migration)

---

## 📞 NÄCHSTE SCHRITTE

### Immediate Actions:

1. **User:** Approval dieses Plans
2. **AI:** Erstelle Batch-Generator Skript
3. **AI:** Generiere `BATCH_01_KRITISCHE_REGELN.md`
4. **User:** Review Batch 1
5. **AI:** Iteration basierend auf Feedback
6. **AI:** Finalisierung Batch 1
7. **Repeat:** Für alle weiteren Batches

### Startsignal vom User:
"Starten Sie mit Batch 1"

---

## 📎 ANHANG

### Relevante Files

- `CONTENT_VALIDIERUNG_REPORT.md` - Aktueller Status
- `jass-lexikon.json` - Original-Referenz (IP-geschützt!)
- `jass-content-v2.json` - Zu korrigierende Datei
- `CONTENT_VALIDIERUNG_PROMPT.md` - Validierungs-Richtlinien

### Tools Location

```
jasswiki/
├── scripts/
│   ├── validate-content.ts (✅ existiert)
│   ├── generate-batch.ts (⚪ zu erstellen)
│   ├── correct-article.ts (⚪ zu erstellen)
│   ├── check-similarity.ts (⚪ zu erstellen)
│   ├── finalize-batch.ts (⚪ zu erstellen)
│   └── find-related.ts (⚪ zu erstellen)
├── src/data/
│   ├── jass-lexikon.json (Original)
│   ├── jass-content-v2.json (Zu korrigieren)
│   └── knowledgebase_agent5.json (Phase 2)
└── batches/ (neu)
    ├── BATCH_01_KRITISCHE_REGELN.md
    ├── BATCH_02_NORMALE_REGELN.md
    └── [...]
```

---

**Ende des Implementationsplans**

*Bereit für User-Approval und Start von Batch 1.*

