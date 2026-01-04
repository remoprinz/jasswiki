# 🔍 PROMPT: Content-Validierungs-Agent für Jasswiki

**Ziel:** Systematische Prüfung aller Artikel auf inhaltliche Korrektheit  
**Referenz:** `jass-lexikon.json` (Original vom offiziellen Regelbuch)  
**Zu prüfen:** `jass-content-v2.json` (Aktuelle Version - wurde umformuliert für IP-Schutz)  
**Datum:** 2025-11-02  

---

## 🎯 MISSION

Du bist ein **Content-Validierungs-Agent** für das Jasswiki-Projekt. Deine Aufgabe ist es, **alle Artikel** systematisch zu prüfen und sicherzustellen, dass der **inhaltliche Gehalt** korrekt ist.

**WICHTIG:** Du prüfst **NICHT** ob die Formulierung identisch ist (darf/sollte unterschiedlich sein für IP-Schutz), sondern ob die **fachlichen Informationen** übereinstimmen.

---

## 📋 AUFGABE

### 1. Daten laden

**Original-Referenz:**
```
/Users/remoprinz/Documents/Jassguru/jasstafel/src/data/jass-lexikon.json
```
- Dieses File enthält die **URARTIKEL** vom offiziellen Regelbuch
- **WARNUNG:** Diese Datei ist eine Kopie des Regelbuchs - enthält IP-geschützten Content
- **Zweck:** Nur als Referenz für INHALT-Vergleich, nicht kopieren!

**Aktuelle Version zu prüfen:**
```
/Users/remoprinz/Documents/Jassguru/jasswiki/src/data/jass-content-v2.json
```
- Dieses File enthält die **umformulierten Artikel** (IP-sicher)
- **Status:** Muss auf inhaltliche Korrektheit geprüft werden

---

### 2. Vergleichsmethode

Für jeden Artikel führe folgende Prüfung durch:

#### Schritt 1: Artikel finden
1. Suche in `jass-lexikon.json` nach Artikel mit **gleicher ID**
2. Falls Artikel in `jass-content-v2.json` existiert → weiter zu Schritt 2
3. Falls Artikel **NUR in lexikon** existiert → Flag als `MISSING_IN_CONTENT_V2`
4. Falls Artikel **NUR in content-v2** existiert → Flag als `NEW_ARTICLE` (kein Original)

#### Schritt 2: Inhaltliche Prüfung (NUR bei gemeinsamen Artikeln)

**Prüfe die folgenden Aspekte:**

**A) Kerninformationen**
- ✅ Enthält der aktuelle Artikel die **gleichen fachlichen Fakten**?
- ✅ Sind **Regeln, Verfahren, Definitionen** identisch?
- ✅ Gibt es **Fehler oder Abweichungen** in den Informationen?
- ❌ **IGNORIERE:** Wortwahl, Satzstellung, Formulierung, Struktur

**B) Vollständigkeit**
- ✅ Sind **alle wichtigen Aspekte** des Original-Artikels abgedeckt?
- ✅ Fehlen **wichtige Details** die im Original stehen?
- ✅ Gibt es **zusätzliche falsche Informationen** die nicht im Original stehen?

**C) Konkrete Beispiele**
- ✅ Sind **Beispiele, Zahlen, Fakten** korrekt?
- ✅ Sind **Spielabläufe, Regeln, Ausnahmen** identisch?
- ❌ **IGNORIERE:** Art der Darstellung, sprachliche Varianten

**D) Terminologie (NUR bei Fachbegriffen)**
- ✅ Sind **offizielle Begriffe** (z.B. "Puur", "Banner", "Trumpf") korrekt verwendet?
- ✅ Werden **Spielregel-Begriffe** korrekt definiert?
- ❌ **IGNORIERE:** Umschreibungen für allgemeine Begriffe

---

### 3. Flagging-System

Für jeden Artikel setze einen **Status-Flag**:

| Flag | Bedeutung | Aktion erforderlich |
|------|-----------|---------------------|
| ✅ `OK` | Inhalt korrekt, Formulierung unterschiedlich (erwartet) | Keine |
| ⚠️ `CONTENT_MISMATCH` | **Inhalt weicht ab** - wichtige Fakten fehlen oder sind falsch | **KORREKTUR NÖTIG** |
| ⚠️ `INCOMPLETE` | Artikel enthält nicht alle wichtigen Informationen vom Original | **ERWEITERN** |
| ⚠️ `WRONG_INFO` | Artikel enthält falsche Informationen die nicht im Original stehen | **KORREKTUR NÖTIG** |
| ⚠️ `MISSING_IN_CONTENT_V2` | Artikel existiert nur im Original (nicht in content-v2) | **PRÜFEN ob gewollt** |
| ✅ `NEW_ARTICLE` | Artikel nur in content-v2 (neuer Content, kein Original) | **KEIN PROBLEM** |

---

### 4. Ausgabe-Format

Erstelle eine **detaillierte Liste** im folgenden Format:

```markdown
# 📊 CONTENT-VALIDIERUNG REPORT

**Datum:** [ISO-Timestamp]  
**Geprüfte Artikel:** [Anzahl]  
**Probleme gefunden:** [Anzahl]  

## ✅ Artikel ohne Probleme

| ID | Titel (Original) | Status | Notizen |
|----|-----------------|--------|---------|
| abheben | Abheben | ✅ OK | Inhalt korrekt, Formulierung abweichend |
| ... | ... | ✅ OK | ... |

## ⚠️ Artikel mit Problemen

| ID | Titel (Original) | Status | Problem | Original-Auszug | Content-V2-Auszug |
|----|-----------------|--------|---------|-----------------|-------------------|
| vorspielen | Vorspielen | ⚠️ CONTENT_MISMATCH | Regel-Fehler: Original sagt "Spieler A muss...", Content-V2 sagt "Spieler B kann..." | "...der Vorhand muss..." | "...der Vorhand kann..." |
| ... | ... | ... | ... | ... | ... |

## 📋 Statistiken

- **Gesamt Artikel:** [Anzahl]
- **Gemeinsame Artikel:** [Anzahl]
- **Nur in Original:** [Anzahl]
- **Nur in Content-V2:** [Anzahl]
- **✅ OK:** [Anzahl]
- **⚠️ Probleme:** [Anzahl]
  - CONTENT_MISMATCH: [Anzahl]
  - INCOMPLETE: [Anzahl]
  - WRONG_INFO: [Anzahl]
  - MISSING_IN_CONTENT_V2: [Anzahl]
```

---

## 🎯 FOKUS-BEREICHE

### Was ist WICHTIG (prüfen):

1. **Regeln:** Sind die Spielregeln identisch?
   - Beispiel: "Der Vorhand muss..." vs "Der Vorhand kann..." → FLAG!

2. **Prozeduren:** Sind Abläufe korrekt?
   - Beispiel: "Kartenverteilung: erst X, dann Y" → muss übereinstimmen

3. **Definitionen:** Sind Begriffe korrekt definiert?
   - Beispiel: "Puur = Trumpf-Bauer" → muss übereinstimmen

4. **Zahlen/Fakten:** Sind Zahlen, Punkte, Werte korrekt?
   - Beispiel: "Ass = 11 Punkte" → muss identisch sein

5. **Beispiele:** Sind Beispiele fachlich korrekt?
   - Beispiel: Spiel-Szenarien → müssen regelkonform sein

### Was ist UNWICHTIG (ignorieren):

1. ❌ **Wortwahl:** "können" vs "dürfen" vs "sollen" (wenn Bedeutung gleich)
2. ❌ **Satzstellung:** Aktive vs Passive Formulierungen
3. ❌ **Struktur:** Reihenfolge der Absätze kann unterschiedlich sein
4. ❌ **Länge:** Kürzere/längere Erklärungen sind OK wenn Inhalt gleich
5. ❌ **Stil:** Formell vs. umgangssprachlich ist OK

---

## 🔍 VORGEHEN

### Phase 1: Systematische Analyse

1. **Lade beide JSON-Files**
2. **Extrahiere alle Artikel-IDs** aus beiden Files
3. **Erstelle Mapping:**
   - Gemeinsame Artikel (gleiche ID)
   - Nur in Original
   - Nur in Content-V2

### Phase 2: Artikel-für-Artikel Prüfung

Für jeden **gemeinsamen Artikel:**

1. **Lese Original-Text** (jass-lexikon.json)
2. **Lese Current-Text** (jass-content-v2.json)
3. **Extrahiere Kerninformationen** aus beiden:
   - Was ist die Hauptregel/Definition?
   - Welche Details werden erwähnt?
   - Welche Beispiele werden gegeben?
   - Welche Ausnahmen/Grenzfälle werden beschrieben?
4. **Vergleiche semantisch:**
   - Sind die Kerninformationen identisch?
   - Fehlen wichtige Details?
   - Gibt es falsche Informationen?
5. **Setze Flag** basierend auf Ergebnissen

### Phase 3: Report generieren

1. **Gruppiere nach Status**
2. **Erstelle detaillierte Tabelle** für problematische Artikel
3. **Füge Beispiel-Zitate** hinzu (Original vs Current)
4. **Statistiken berechnen**

---

## 📝 BEISPIEL-VERGLEICH

### Artikel "vorspielen"

**Original (jass-lexikon.json):**
```
"text": "Beim Vorspielen legt der Vorhand-Spieler die erste Karte aus. Er MUSS dabei Farbe bekennen, wenn er kann."
```

**Current (jass-content-v2.json):**
```
"text": "Der Vorhand beginnt mit dem Ausspiel. Er KANN eine beliebige Karte spielen."
```

**Analyse:**
- ❌ **PROBLEM:** Original sagt "MUSS Farbe bekennen", Current sagt "KANN beliebige"
- ❌ **CONTENT_MISMATCH:** Regel ist falsch wiedergegeben
- ✅ **Flag:** `⚠️ CONTENT_MISMATCH`

**Korrektur-Note:**
"Artikel enthält falsche Regel. Original: 'MUSS Farbe bekennen wenn möglich'. Current: 'KANN beliebige Karte'. Das ist ein Regel-Fehler der korrigiert werden muss."

---

## 🚨 WICHTIGE HINWEISE

### IP-Schutz

- ✅ **DO:** Vergleiche nur INHALT, nicht Formulierung
- ❌ **DON'T:** Kopiere Text direkt aus lexikon
- ✅ **DO:** Stelle sicher dass Content-V2 IP-sicher ist (umformuliert)
- ⚠️ **WARNUNG:** Lexikon enthält IP-geschützten Content - nicht kopieren!

### Präzision

- ✅ Prüfe **akribisch genau** - auch kleine Regelabweichungen sind wichtig
- ✅ **Beispiele:** Wenn ein Beispiel im Original falsch wäre, wäre das ein Problem
- ✅ **Kontext:** Berücksichtige den Kontext - gleiche Information anders formuliert = OK

### Systematik

- ✅ Gehe **jeden Artikel durch** - keine Überspringen
- ✅ **Dokumentiere** jeden Vergleich
- ✅ Bei Unsicherheit: **Flag setzen** und Notiz schreiben

---

## 📊 ERWARTETE OUTPUTS

### Haupt-Output

**Datei:** `CONTENT_VALIDIERUNG_REPORT.md`

**Inhalt:**
1. ✅ Übersicht aller Artikel mit Status
2. ⚠️ Liste aller problematischen Artikel
3. 📊 Statistiken
4. 💡 Empfehlungen für Korrekturen

### Zusätzliche Outputs (optional)

1. **JSON-Report:** `content_validation_results.json`
   ```json
   {
     "summary": {
       "total_articles": 242,
       "ok": 200,
       "problems": 42
     },
     "articles": [
       {
         "id": "vorspielen",
         "title": "Vorspielen",
         "status": "CONTENT_MISMATCH",
         "problem": "...",
         "original_excerpt": "...",
         "current_excerpt": "..."
       }
     ]
   }
   ```

2. **Filterbare Liste:** Nur problematische Artikel für schnelles Review

---

## ✅ ERFOLGS-KRITERIEN

Der Report ist erfolgreich wenn:

1. ✅ **Alle Artikel geprüft:** 100% Coverage
2. ✅ **Probleme identifiziert:** Alle inhaltlichen Abweichungen gefunden
3. ✅ **Klar dokumentiert:** Jedes Problem hat:
   - Klaren Status-Flag
   - Beschreibung des Problems
   - Beispiel-Zitate (Original vs Current)
   - Empfehlung für Korrektur
4. ✅ **Aktionsfähig:** Liste kann direkt für Content-Korrekturen verwendet werden

---

## 🎯 NÄCHSTE SCHRITTE NACH VALIDIERUNG

Nach Erstellung des Reports:

1. **Review durch User:** User prüft Liste der problematischen Artikel
2. **Priorisierung:** Welche Artikel sind kritisch? Welche weniger wichtig?
3. **Korrektur-Phase:** Artikel systematisch korrigieren basierend auf Report
4. **Re-Validierung:** Nach Korrekturen erneut prüfen

---

**STARTE MIT DER VALIDIERUNG!**

Verwende diesen Prompt als vollständige Anleitung und erstelle den detaillierten Report.








