# 🤝 KOORDINATIONSPLAN: 3 Agents parallel

**Ziel:** 3x schneller durch parallele Bearbeitung  
**Datum:** 2025-11-02  
**Status:** Bereit für Start

---

## 📊 ARTIKEL-VERTEILUNG

### Batch 1: Kritische Regeln (18 Artikel) → Aufgeteilt auf 3 Agents

#### 🟢 Agent 1: Weis-Regeln (6 Artikel)
1. weis_rules_vierblatt - Vierblatt (4 Blatt)
2. weis_rules_fuenfblatt - Fünfblatt (5 Blatt)
3. weis_rules_sechsblatt - Sechsblatt (6 Blatt)
4. weis_rules_siebenblatt - Siebenblatt (7 Blatt)
5. weis_rules_achtblatt - Achtblatt (8 Blatt)
6. weis_rules_neunblatt - Neunblatt (9 Blatt)

**Datei:** `BATCH_01A_WEIS_REGELN_AGENT1.md`

#### 🔵 Agent 2: Regel-Verstösse Teil 1 (6 Artikel)
7. ausspiel - Ausspiel
8. bergpreis - Bergpreis
9. bodentrumpf - Bodentrumpf
10. kontermatsch - Kontermatsch
11. untertrumpfen - Untertrumpfen
12. zwei_karten_spielen - Zwei Karten spielen

**Datei:** `BATCH_01B_REGELN_TEIL1_AGENT2.md`

#### 🟡 Agent 3: Regel-Verstösse Teil 2 (6 Artikel)
13. matsch - Schieber-Varianten
14. bemerkungen_schnorren - Bemerkungen/Schnorren
15. regeln_verschlagen - Verschlagen
16. rest_machen - Rest machen
17. schneider - Schneider
18. schreiben - Schreiben

**Datei:** `BATCH_01C_REGELN_TEIL2_AGENT3.md`

---

## 🗂️ DATEI-STRUKTUR

### Für jeden Agent ein eigenes Batch-File:

```
jasswiki/
├── batches/
│   ├── BATCH_01A_WEIS_REGELN_AGENT1.md
│   ├── BATCH_01B_REGELN_TEIL1_AGENT2.md
│   └── BATCH_01C_REGELN_TEIL2_AGENT3.md
├── coordination/
│   ├── KOORDINATION_STATUS.md (Tracking)
│   └── APPROVED_ARTICLES.md (Nach Approval)
└── scripts/
    └── merge-batches.ts (Für Finalisierung)
```

---

## 🔄 WORKFLOW PRO AGENT

### Schritt 1: Agent erstellt Batch-File
Jeder Agent:
1. Liest Original + Current für seine 6 Artikel
2. Erstellt Korrektur-Vorschläge
3. Identifiziert verwandte Artikel
4. Speichert in seinem eigenen Batch-File

**⚠️ WICHTIG:** Jeder Agent arbeitet NUR an seinen zugewiesenen Artikeln!

### Schritt 2: Parallel Review durch User
User kann:
- Alle 3 Batch-Files parallel öffnen
- Jeden Agent unabhängig reviewen
- Pro Agent Feedback geben (✅/🔄/❌)

### Schritt 3: Iteration (parallel möglich)
- Agent 1 überarbeitet nur seine 6 Artikel
- Agent 2 überarbeitet nur seine 6 Artikel  
- Agent 3 überarbeitet nur seine 6 Artikel
- Keine Konflikte, da verschiedene Artikel

### Schritt 4: Finalisierung (sequentiell)
- NACH allen Approvals: Merge aller 3 Batches
- Ein Skript fügt alle approved Articles in `jass-content-v2.json` ein
- Re-Validierung einmal für alle

---

## 📋 KOORDINATIONS-FILE: `KOORDINATION_STATUS.md`

**Wird von allen Agents aktualisiert:**

```markdown
# Koordinations-Status: 3 Agents parallel

**Letzte Aktualisierung:** [Timestamp]
**Phase:** Batch 1 - Kritische Regeln

## Agent-Übersicht

| Agent | Datei | Artikel | Status | Fortschritt |
|-------|-------|--------|--------|-------------|
| 🟢 Agent 1 | BATCH_01A... | 6 Weis-Regeln | 🟡 In Arbeit | 3/6 |
| 🔵 Agent 2 | BATCH_01B... | 6 Regel-Verstösse 1 | 🟡 In Arbeit | 2/6 |
| 🟡 Agent 3 | BATCH_01C... | 6 Regel-Verstösse 2 | ⚪ Pending | 0/6 |

## Artikel-Zuweisung

### ✅ Completed & Approved

| Artikel-ID | Titel | Agent | Status |
|------------|-------|-------|--------|
| weis_rules_vierblatt | Vierblatt | Agent 1 | ✅ Approved |

### 🟡 In Review

| Artikel-ID | Titel | Agent | Status |
|------------|-------|-------|--------|
| weis_rules_fuenfblatt | Fünfblatt | Agent 1 | 🟠 Review |

### ⚪ Pending

| Artikel-ID | Titel | Agent | Status |
|------------|-------|-------|--------|
| weis_rules_sechsblatt | Sechsblatt | Agent 1 | ⚪ Pending |
| ... | ... | ... | ... |

## Regeln & Koordination

### ✅ DO's
- Jeder Agent arbeitet NUR an zugewiesenen Artikeln
- Jeder Agent aktualisiert KOORDINATION_STATUS.md nach Fertigstellung
- Alle Batch-Files im `batches/` Ordner
- Format identisch für alle Agents

### ❌ DON'Ts
- Kein Agent bearbeitet Artikel eines anderen Agents
- Kein direktes Update von `jass-content-v2.json` (nur nach Merge)
- Keine Änderungen an Artikeln die bereits approved sind
```

---

## 📝 AGENT-BRIEFINGS

Jeder Agent erhält identische Instruktionen, aber unterschiedliche Artikel-Listen:

### Briefing Template:

```markdown
# AGENT BRIEFING: [Agent Name]

## Deine Aufgabe

Du bist einer von 3 parallel arbeitenden Agents für die Content-Korrektur des Jasswiki.

### Deine Artikel (6 Stück):

1. [artikel_id_1] - [Titel]
2. [artikel_id_2] - [Titel]
3. ...
6. [artikel_id_6] - [Titel]

### Dein Output-File

`batches/BATCH_01[X]_[NAME]_[AGENT].md`

### WICHTIG:

✅ Du arbeitest NUR an deinen 6 Artikeln
✅ Du folgst dem Format aus IMPLEMENTATIONSPLAN_CONTENT_KORREKTUR.md
✅ Du aktualisierst KOORDINATION_STATUS.md nach Fertigstellung
❌ Du bearbeitest KEINE Artikel anderer Agents
❌ Du updated NICHT direkt jass-content-v2.json

### Referenz-Dokumente

- IMPLEMENTATIONSPLAN_CONTENT_KORREKTUR.md - Haupt-Plan
- CONTENT_VALIDIERUNG_REPORT.md - Problem-Beschreibungen
- jass-lexikon.json - Original-Referenz (NUR lesen!)
- jass-content-v2.json - Aktuelle Version (lesen)

### Umformulierungs-Richtlinien

[Gleiche für alle Agents - aus Implementationsplan]

### Start Signal

"Agent [X], starte mit deinen 6 Artikeln"
```

---

## 🛠️ MERGE-SKRIPT

Nach allen Approvals: Alle 3 Batch-Files zusammenführen

**Datei:** `scripts/merge-batches.ts`

**Funktion:**
```typescript
// 1. Liest alle approved Batch-Files
const batch1 = readFile('BATCH_01A_WEIS_REGELN_AGENT1.md');
const batch2 = readFile('BATCH_01B_REGELN_TEIL1_AGENT2.md');
const batch3 = readFile('BATCH_01C_REGELN_TEIL2_AGENT3.md');

// 2. Extrahiert nur approved Articles
const approvedArticles = extractApproved([batch1, batch2, batch3]);

// 3. Updated jass-content-v2.json
updateContentFile(approvedArticles);

// 4. Re-Validierung
runValidation();
```

**Usage:**
```bash
npm run merge-batches -- --batches 01A,01B,01C
```

---

## ⚠️ KONFLIKT-VERMEIDUNG

### Regel 1: Disjunkte Artikel-Zuweisung
- ✅ Jeder Artikel gehört zu genau EINEM Agent
- ✅ Keine Überschneidungen
- ✅ Keine Konflikte möglich

### Regel 2: Separate Files
- ✅ Jeder Agent hat eigenes Batch-File
- ✅ Keine Datei-Konflikte
- ✅ User kann parallel reviewen

### Regel 3: Kein direktes JSON-Update
- ✅ Agents schreiben NUR in Batch-Files
- ✅ JSON-Update nur nach Merge
- ✅ Sequentiell, kein Race-Condition

### Regel 4: Status-Tracking
- ✅ KOORDINATION_STATUS.md zeigt Fortschritt
- ✅ Klar wer was macht
- ✅ Transparent für User

---

## 📈 ERWARTETE ZEITERSparnis

### Sequentiell (1 Agent):
- 18 Artikel × 15 Min = 270 Min = **4.5 Stunden**

### Parallel (3 Agents):
- 6 Artikel × 15 Min = 90 Min = **1.5 Stunden**
- **3x schneller!** ⚡

---

## 🚦 START-SEQUENZ

### Schritt 1: User gibt Startsignal

**Option A: Alle 3 gleichzeitig**
```
"Agent 1, starte mit Weis-Regeln (Artikel 1-6)"
"Agent 2, starte mit Regel-Verstösse Teil 1 (Artikel 7-12)"
"Agent 3, starte mit Regel-Verstösse Teil 2 (Artikel 13-18)"
```

**Option B: Nacheinander starten (falls User lieber gestaffelt reviewt)**
```
"Agent 1, starte mit Weis-Regeln"
# ... nach Review ...
"Agent 2, starte mit Regel-Verstösse Teil 1"
# ... nach Review ...
"Agent 3, starte mit Regel-Verstösse Teil 2"
```

### Schritt 2: Agents arbeiten parallel
- Jeder Agent liest seine Artikel
- Jeder Agent erstellt sein Batch-File
- Keine Abhängigkeiten → parallel möglich

### Schritt 3: User Review
- User öffnet alle 3 Batch-Files
- Kann in beliebiger Reihenfolge reviewen
- Gibt Feedback pro Agent

### Schritt 4: Merge & Finalisierung
- Nach allen Approvals
- Merge-Skript führt alles zusammen
- Einmalige Re-Validierung

---

## 📋 CHECKLISTE PRO AGENT

Jeder Agent sollte prüfen:

- [ ] Habe ich NUR meine 6 Artikel bearbeitet?
- [ ] Habe ich das korrekte Format verwendet?
- [ ] Habe ich alle verwandten Artikel identifiziert?
- [ ] Habe ich Umformulierungs-Techniken dokumentiert?
- [ ] Habe ich KOORDINATION_STATUS.md aktualisiert?
- [ ] Ist Similarity-Score < 70%?
- [ ] Ist Inhalt vollständig korrekt?

---

## 🔄 NÄCHSTE BATCHES

Nach Batch 1 können wir das gleiche System für:
- Batch 2: Normale Regeln (15 → 3 Agents: 5+5+5)
- Batch 3: Varianten (25 → 3 Agents: 8+8+9)
- etc.

---

**Bereit für Parallel-Start!**

