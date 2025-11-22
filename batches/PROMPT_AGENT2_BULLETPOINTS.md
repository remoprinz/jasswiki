# 🔵 PROMPT: Agent 2 - Regel-Verstösse Teil 1 (Bulletpoint-Format)

**Agent:** Agent 2  
**Format:** Bulletpoints (IP-sicher, SEO/RAG-optimiert)  
**Artikel:** 6 Regel-Verstösse  
**Output:** `batches/BATCH_01B_REGELN_TEIL1_AGENT2.md`

---

## 📋 IHRE AUFGABE

Sie sind **Agent 2** für die Content-Korrektur des Jasswiki.

### Ihre 6 Artikel:
1. `ausspiel` - Ausspiel
2. `bergpreis` - Bergpreis
3. `bodentrumpf` - Bodentrumpf
4. `kontermatsch` - Kontermatsch
5. `untertrumpfen` - Untertrumpfen
6. `zwei_karten_spielen` - Zwei Karten spielen

---

## 🎯 FORMAT: BULLETPOINTS (WICHTIG!)

**⚠️ KRITISCH:** Alle korrigierten Versionen müssen im **Bulletpoint-Format** sein!

### Warum Bulletpoints?
- ✅ **SEO:** Höhere Chance auf Featured Snippets bei Google
- ✅ **RAG:** Bessere strukturierte Daten für ChatGPT-App
- ✅ **IP-Schutz:** Funktioniert trotzdem durch unterschiedliche Formulierungen
- ✅ **Lesbarkeit:** Schnelleres Erfassen der Informationen

### Bulletpoint-Format für Regel-Artikel:

**⚠️ WICHTIG: Konsistente Reihenfolge!**

Alle Bulletpoints müssen in dieser **festen Reihenfolge** erscheinen:

```
1. Definition: [Was ist es?] - IMMER zuoberst!
2. Voraussetzung: [Was muss erfüllt sein?] - Falls vorhanden
3. Regel: [Wie funktioniert es?] - Hauptregel
4. Ausnahme: [Besonderheiten/Sonderfälle] - Falls vorhanden
5. Sonderregel: [Weitere Sonderfälle] - Falls vorhanden
6. Konsequenz: [Was passiert?] - Falls vorhanden
7. Wertung: [Punkte/Bewertung] - Falls vorhanden
8. Beispiel: [Konkretes Beispiel] - Falls vorhanden
```

**NICHT verwendete Kategorien einfach weglassen!**

**Beispiele:**

**Definition + Regel + Ausnahme:**
```
• Definition: [Was ist es?]
• Regel: [Wie funktioniert es?]
• Ausnahme: [Besonderheit]
```

**Definition + Voraussetzung + Regel + Konsequenz:**
```
• Definition: [Was ist es?]
• Voraussetzung: [Was muss erfüllt sein?]
• Regel: [Wie funktioniert es?]
• Konsequenz: [Was passiert?]
```

**⚠️ NICHT:** Fließtext-Format oder willkürliche Reihenfolge  
**✅ JA:** Bulletpoint-Format mit konsistenter Reihenfolge (Definition immer zuoberst!)

---

## 🔍 SPEZIELLE PROBLEME IHRER ARTIKEL

Basierend auf dem Validierungs-Report haben Ihre Artikel folgende Probleme:

### `ausspiel` - INCOMPLETE
- **Problem:** Fehlt wichtiger Begriff: "trumpf"
- **Lösung:** Stelle sicher, dass Trumpf-Kontext erwähnt wird

### `bergpreis` - INCOMPLETE
- **Problem:** Fehlt wichtiger Begriff: "stich"
- **Lösung:** Stelle sicher, dass Stich-Kontext erwähnt wird

### `bodentrumpf` - INCOMPLETE
- **Problem:** Fehlen wichtige Begriffe: "vorhand", "stich"
- **Lösung:** Stelle sicher, dass beide Konzepte erwähnt werden

### `kontermatsch` - INCOMPLETE
- **Problem:** Fehlt wichtiger Begriff: "trumpf"
- **Lösung:** Stelle sicher, dass Trumpf-Kontext erwähnt wird

### `untertrumpfen` - INCOMPLETE
- **Problem:** Fehlt wichtiger Begriff: "stich"
- **Lösung:** Stelle sicher, dass Stich-Kontext erwähnt wird

### `zwei_karten_spielen` - INCOMPLETE
- **Problem:** Fehlt wichtiger Begriff: "stich"
- **Lösung:** Stelle sicher, dass Stich-Kontext erwähnt wird

**⚠️ WICHTIG:** Prüfe für jeden Artikel, ob die fehlenden Begriffe im Original vorhanden sind und füge sie in der korrigierten Version hinzu!

---

## ✅ SINNVOLLE ERGÄNZUNGEN ÜBERNEHMEN

**⚠️ KRITISCH:** Prüfe die aktuelle Version (`jass-content-v2.json`) auf **sinnvolle Ergänzungen**, die NICHT gelöscht werden sollten!

**⚠️ WICHTIG:** Viele Ergänzungen am Ende sind KI-generierte Fluff-Texte ohne Mehrwert!

### 🎯 PRÜF-CHECKLISTE: Ist die Ergänzung sinnvoll?

Eine Ergänzung ist **NUR dann sinnvoll**, wenn **ALLE** Fragen mit "JA" beantwortet werden:

1. **Ist es SPEZIFISCH für diese Regel?** (nicht generisch/universell anwendbar)
2. **Führt es zu besserem VERSTÄNDNIS der Regel?** (nicht nur offensichtliche Tipps)
3. **Ist es RELEVANT für die Regel?** (bezieht sich direkt auf die Regel, nicht allgemeine Spieltipps)
4. **Fügt es WIRKLICH Information hinzu?** (nicht selbstverständlich wie "Karten einzeln spielen")
5. **Ist es KEIN KI-Fluff?** (keine vagen Strategie-Hinweise ohne Regelbezug)

### ✅ SINNVOLLE Ergänzungen (BEHALTEN):

**Kriterien:**
- Erklärt den **KONTEXT** einer Regel (Was passiert danach? Was passiert wenn...?)
- Erklärt **SPEZIFISCHE Konsequenzen** dieser Regel (nicht generisch)
- Fügt **RELEVANTE Information** hinzu (nicht offensichtlich)

**Beispiele:**
- ✅ **ausspiel:** "Grundprinzip Bedienung" - erklärt WAS nach dem Ausspiel passiert (spezifisch!)
- ✅ **bodentrumpf:** "Konsequenzen bei Nichtbeachtung" - erklärt spezifische Konsequenz dieser Regel

### ❌ ÜBERFLÜSSIGE Ergänzungen (NICHT übernehmen):

**Kriterien:**
- Selbstverständliche Tipps (offensichtlich für jeden)
- Generische Ratschläge (gelten für viele Regeln)
- KI-generierte Fluff-Texte (vage, ohne Mehrwert)
- Strategische Interpretationen ohne Regelbezug

**Beispiele:**
- ❌ **zwei_karten_spielen:** "Prävention: Karten einzeln spielen" - **OFFENSICHTLICH, generisch!**
- ❌ **bergpreis:** "Motiviert zu dynamischeren Spielstrategien" - **vage, kein Regelinhalt!**
- ❌ **bergpreis:** "Strategischer Aspekt: Teams müssen entscheiden..." - **KI-Fluff, nicht im Regelwerk!**

### 🔍 Vorgehen zur Prüfung:

1. **Vergleiche Original** (`jass-lexikon.json`) mit **aktueller Version** (`jass-content-v2.json`)
2. **Identifiziere Ergänzungen** die nur in der aktuellen Version stehen
3. **Prüfe mit Checkliste oben:** Beantworte alle 5 Fragen
4. **NUR wenn ALLE 5 Fragen "JA":** Übernehme in korrigierte Version
5. **Bei Unsicherheit:** **NICHT übernehmen!** (Lieber zu streng als zu lasch)

---

## 🔄 UMFORMULIERUNGS-REGELN FÜR BULLETPOINTS

### IP-Schutz durch Bulletpoints:
1. **Unterschiedliche Formulierungen:**
   - Original: "Der Spieler spielt eine Karte aus"
   - Neu: "• Ausspiel: Spieler legt erste Karte ab"

2. **Synonyme verwenden** (nur bei allgemeinen Begriffen!):
   - Original: "kann"
   - Neu: "darf" oder "ist erlaubt"

3. **Reihenfolge:**
   - **FESTE REIHENFOLGE einhalten:** Definition → Voraussetzung → Regel → Ausnahme → etc.
   - **NICHT variieren** für IP-Schutz! (IP-Schutz kommt durch unterschiedliche Formulierungen)

4. **Aktiv vs. Passiv:**
   - Original: "Der Vorhand spielt aus"
   - Neu: "• Ausspiel erfolgt durch Vorhand"

5. **Verschiedene Strukturen:**
   - Original: "Muss vor dem ersten Ausspiel gemeldet werden"
   - Neu: "• Meldung erforderlich: vor erstem Ausspiel"

### Erlaubt:
- ✅ Verschiedene Formulierungen pro Bulletpoint
- ✅ Synonyme bei allgemeinen Begriffen
- ✅ Konsistente Reihenfolge (Definition immer zuoberst!)
- ✅ Strukturvariationen (aber in festem Rahmen)

### NICHT erlaubt:
- ❌ Gleiche Formulierungen wie Original
- ❌ Fachbegriffe ändern (Trumpf, Stich, Vorhand, etc.)
- ❌ Inhalt ändern (Regeln müssen identisch bleiben)
- ❌ Begriffe weglassen, die im Original stehen

---

## 📝 BATCH-FILE-FORMAT

Für jeden Artikel im Format:

```markdown
## Artikel 1: Ausspiel (ID: ausspiel)

### Status & Kategorie
- **ID:** `ausspiel`
- **Titel:** Ausspiel
- **Kategorie:** Regeln
- **Status:** INCOMPLETE
- **Kritisch:** 🚨 JA

### Problem-Beschreibung
Fehlt wichtiger Begriff: "trumpf". Original enthält diesen Begriff, aktuelle Version nicht.

### Original-Inhalt (REFERENZ - NUR zum Verstehen, NICHT kopieren!)
```
[Original-Text aus jass-lexikon.json]
```

### Aktueller Inhalt (ZU PRÜFEN)
```
[Aktueller Text aus jass-content-v2.json]
```

### ✅ Korrigierte Version (NEU - IP-sicher umformuliert, Bulletpoint-Format für SEO/RAG)

```
• Definition: [Was ist Ausspiel?]
• Regel: [Wie funktioniert es?]
• Trumpf-Kontext: [Wie bezieht sich Trumpf?]
• Wichtig: [Besonderheit]
```

### Verwandte Artikel (für spätere Verlinkung)
- `artikel_id_1` - [Grund]
- `artikel_id_2` - [Grund]
- ...

### Umformulierungs-Techniken verwendet
- [x] Liste → Bulletpoints (IP-sicher umformuliert, optimiert für SEO/RAG)
- [x] Synonyme verwendet ("...")
- [x] Reihenfolge geändert
- [x] Eigene Formulierungen verwendet ("...")
- [x] Fachbegriffe beibehalten (Trumpf, Stich, etc.)
- [x] Fehlende Begriffe ergänzt
```

---

## ✅ CHECKLISTE PRO ARTIKEL

- [ ] Original mit aktueller Version verglichen
- [ ] **Fehlende Begriffe identifiziert und ergänzt?** ⚠️ WICHTIG
- [ ] **Sinnvolle Ergänzungen aus aktueller Version übernommen?** ⚠️ WICHTIG
- [ ] Inhaltlich korrekt? (Zahlen, Regeln, Fakten)
- [ ] IP-sicher umformuliert? (unterschiedliche Formulierungen)
- [ ] **Bulletpoint-Format verwendet?** ⚠️ KRITISCH
- [ ] **Konsistente Reihenfolge eingehalten? (Definition zuoberst!)** ⚠️ WICHTIG
- [ ] Verwandte Artikel identifiziert (4-6 pro Artikel)
- [ ] Umformulierungs-Techniken dokumentiert

---

## 📚 REFERENZ-DOKUMENTE

**MUSS gelesen werden:**
- `CONTENT_VALIDIERUNG_PROMPT.md` - Validierungs-Richtlinien
- `IMPLEMENTATIONSPLAN_CONTENT_KORREKTUR.md` - Haupt-Plan
- `KOORDINATION_3_AGENTS.md` - Koordination
- `CONTENT_VALIDIERUNG_REPORT.md` - Detaillierte Problem-Beschreibungen für Ihre 6 Artikel

**Datenquellen:**
- `/Users/remoprinz/Documents/Jassguru/jasstafel/src/data/jass-lexikon.json` - Original (NUR lesen!)
- `/Users/remoprinz/Documents/Jassguru/jasswiki/src/data/jass-content-v2.json` - Aktuelle Version (lesen)

---

## 🚀 START

1. **Lies zuerst die Referenz-Dokumente**
2. **Lade Original und aktuelle Version für alle 6 Artikel**
3. **Erstelle `batches/BATCH_01B_REGELN_TEIL1_AGENT2.md`**
4. **Verwende für jeden Artikel Bulletpoint-Format**
5. **Stelle sicher, dass fehlende Begriffe ergänzt werden**

**WICHTIG:** 
- Alle korrigierten Versionen müssen Bulletpoints sein, NICHT Fließtext!
- Fehlende Begriffe aus dem Original müssen ergänzt werden!
- Sinnvolle Ergänzungen aus der aktuellen Version müssen übernommen werden!
