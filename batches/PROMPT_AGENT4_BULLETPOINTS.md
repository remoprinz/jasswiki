# 🔴 PROMPT: Agent 4 - Restliche kritische Artikel (Bulletpoint-Format)

**Agent:** Agent 4  
**Format:** Bulletpoints (IP-sicher, SEO/RAG-optimiert)  
**Artikel:** Kritische Artikel die von Agent 1-3 nicht abgedeckt wurden  
**Output:** `batches/BATCH_01D_RESTLICHE_KRITISCH_AGENT4.md`

---

## 📋 IHRE AUFGABE

Sie sind **Agent 4** für die Content-Korrektur des Jasswiki.

### Ihre 2 Artikel:
1. **`vorspielen`** - Vorspielen ⚠️ **KOMPLETT FALSCH - HÖCHSTE PRIORITÄT!**
2. **`karte_faellt_runter`** - Karte fällt runter (NEUER ARTIKEL - Format prüfen)

**⚠️ WICHTIG:** 
- `vorspielen` ist KOMPLETT FALSCH - Original beschreibt Regelverstoß, aktuelle Version beschreibt normale Spielhandlung!
- `karte_faellt_runter` ist ein NEUER Artikel (kein Original vorhanden) - nur Bulletpoint-Format prüfen, NICHT IP-kritisch!

---

## 🚨 SPEZIELLES PROBLEM: `vorspielen`

### Original (jass-lexikon.json) - KORREKT:
```
"Wer vorspielt, also eine Karte zu früh auf den Tisch legt, bevor der links von ihm sitzende Spieler seine Karte gegeben hat, darf die zu früh gespielte Karte nicht mehr zurücknehmen, es sei denn, er hätte nicht gefarbt. In diesem Fall gelten die Regeln des Nichtfarbens, d.h., dieser Stich gehört dem Gegner und die vorgespielte Karte ist mit der eigentlich zu spielenden Karte auszutauschen (siehe Abschnitt «Nichtfarben»).

Die vorgespielte und die nachträglich ausgetauschte Karte verlieren beide den Stechwert, aber nicht den Zählwert (siehe Abschnitt «Stechwert verlieren»).

Zum nächsten Stich spielt der vom fehlbaren Spieler rechts sitzende Jasser aus.

Ausnahme: Beim letzten Stich ist diese Regel hinfällig, d.h., ein Vorspielen hat keine Folgen."
```

### Aktuell (jass-content-v2.json) - FALSCH!:
```
"Vorspielen bedeutet, als Erstes im Stich eine Karte auszuspielen.

Regeln:

• Die Vorhand spielt im ersten Stich vor
• Wer einen Stich gewinnt, spielt im nächsten Stich vor
• Der vorspielende Spieler darf eine beliebige Karte wählen

Strategische Überlegungen:

• Vorspielen ermöglicht es, die Farbe zu bestimmen
• Durch geschicktes Vorspielen kann man die Gegner unter Druck setzen
• Das Vorspielen von Trümpfen zwingt die Gegner, ihre Trümpfe zu zeigen"
```

**Problem:** Original beschreibt einen **Regelverstoß** (Karte zu früh), aktuelle Version beschreibt **normale Spielhandlung**!

---

## 🎯 FORMAT: BULLETPOINTS (WICHTIG!)

**⚠️ KRITISCH:** Alle korrigierten Versionen müssen im **Bulletpoint-Format** sein!

### Warum Bulletpoints?
- ✅ **SEO:** Höhere Chance auf Featured Snippets bei Google
- ✅ **RAG:** Bessere strukturierte Daten für ChatGPT-App
- ✅ **IP-Schutz:** Funktioniert trotzdem durch unterschiedliche Formulierungen
- ✅ **Lesbarkeit:** Schnelleres Erfassen der Informationen

### Bulletpoint-Format für Regelverstoß-Artikel:

**⚠️ WICHTIG: Konsistente Reihenfolge!**

Alle Bulletpoints müssen in dieser **festen Reihenfolge** erscheinen:

```
1. Definition: [Was ist der Regelverstoß?] - IMMER zuoberst!
2. Regel: [Wann tritt er auf?] - Hauptregel
3. Konsequenz 1: [Was passiert?] - Falls vorhanden
4. Konsequenz 2: [Was passiert zusätzlich?] - Falls vorhanden
5. Regel: [Weitere Regelung] - Falls vorhanden
6. Ausnahme: [Wann gilt es nicht?] - Falls vorhanden
7. Wichtig: [Besonderheit] - Falls vorhanden
```

**Beispiel für vorspielen:**
```
• Definition: Vorspielen ist ein Regelverstoß, bei dem eine Karte zu früh abgelegt wird
• Regel: Tritt auf, wenn Karte vor dem links sitzenden Spieler abgelegt wird
• Konsequenz: Karte kann nicht zurückgenommen werden (ausser bei nicht gefarbt)
• Konsequenz: Bei nicht gefarbt gelten Nichtfarben-Regeln (Stich geht an Gegner, Karten werden ausgetauscht)
• Regel: Vorgespielte und ausgetauschte Karte verlieren Stechwert, nicht Zählwert
• Regel: Zum nächsten Stich spielt rechts sitzende Person aus
• Ausnahme: Beim letzten Stich hat Vorspielen keine Folgen
```

**⚠️ NICHT:** Fließtext-Format oder willkürliche Reihenfolge  
**✅ JA:** Bulletpoint-Format mit konsistenter Reihenfolge (Definition immer zuoberst!)

---

## 📋 SPEZIELLES PROBLEM: `karte_faellt_runter`

### Status:
- **NEUER ARTIKEL:** Existiert nicht im Original (`jass-lexikon.json`)
- **NICHT IP-kritisch:** Artikel wurde von Ihnen erstellt, daher keine IP-Probleme
- **Aufgabe:** Nur Bulletpoint-Format sicherstellen und optimieren

### Aktueller Inhalt:
Der Artikel ist bereits teilweise in Bulletpoint-Format, aber noch nicht konsistent strukturiert.

**Aktuelle Struktur:**
- Fließtext am Anfang
- Dann Bulletpoints für Optionen
- Am Ende noch Fließtext

**Ziel:** Komplette Umwandlung in konsistente Bulletpoint-Struktur mit fester Reihenfolge!

### Bulletpoint-Format für `karte_faellt_runter`:
```
• Definition: [Was passiert?]
• Regel: [Wer entscheidet?]
• Option 1: [Weiterspielen]
• Option 2: [Spiel annullieren]
• Option 3: [Stich geht an Gegner]
• Konsequenz: [Stechwert-Verlust]
• Verweis: [Nichtfarben-Analogie]
```

---

## ✅ SINNVOLLE ERGÄNZUNGEN ÜBERNEHMEN

**⚠️ KRITISCH:** 
- Für `vorspielen`: Die aktuelle Version ist KOMPLETT FALSCH - es gibt KEINE sinnvollen Ergänzungen zu übernehmen!
- Für `karte_faellt_runter`: Ist ein NEUER Artikel - der aktuelle Inhalt ist korrekt, nur Format-Optimierung nötig!

**⚠️ WICHTIG:** 
- `vorspielen`: Alle Informationen müssen aus dem Original kommen!
- `karte_faellt_runter`: Aktueller Inhalt ist korrekt, nur Bulletpoint-Format optimieren!

---

## 🔄 UMFORMULIERUNGS-REGELN FÜR BULLETPOINTS

### IP-Schutz durch Bulletpoints:
1. **Unterschiedliche Formulierungen:**
   - Original: "Wer vorspielt, also eine Karte zu früh..."
   - Neu: "• Definition: Vorspielen ist ein Regelverstoß, bei dem eine Karte zu früh abgelegt wird"

2. **Synonyme verwenden** (nur bei allgemeinen Begriffen!):
   - Original: "auf den Tisch legt"
   - Neu: "abgelegt wird"

3. **Reihenfolge:**
   - **FESTE REIHENFOLGE einhalten:** Definition → Regel → Konsequenz → Ausnahme
   - **NICHT variieren** für IP-Schutz! (IP-Schutz kommt durch unterschiedliche Formulierungen)

4. **Aktiv vs. Passiv:**
   - Original: "Wer vorspielt..."
   - Neu: "• Definition: Vorspielen ist ein Regelverstoß..."

5. **Verschiedene Strukturen:**
   - Original: "der links von ihm sitzende Spieler"
   - Neu: "links sitzende Spieler"

**Wichtig für vorspielen:**
- ✅ Original ist bereits sehr detailliert
- ✅ Muss komplett umgeschrieben werden (aktuelle Version ist falsch!)
- ✅ Alle Details aus Original müssen enthalten sein
- ✅ Verweise auf "Nichtfarben" und "Stechwert verlieren" beibehalten

### Erlaubt:
- ✅ Verschiedene Formulierungen pro Bulletpoint
- ✅ Synonyme bei allgemeinen Begriffen
- ✅ Konsistente Reihenfolge (Definition immer zuoberst!)
- ✅ Strukturvariationen (aber in festem Rahmen)

### NICHT erlaubt:
- ❌ Gleiche Formulierungen wie Original
- ❌ Fachbegriffe ändern (Nichtfarben, Stechwert, etc.)
- ❌ Inhalt ändern (Regeln müssen identisch bleiben)
- ❌ Informationen weglassen, die im Original stehen

---

## 📝 BATCH-FILE-FORMAT

Für jeden Artikel im Format:

```markdown
## Artikel 1: Vorspielen (ID: vorspielen)

### Status & Kategorie
- **ID:** `vorspielen`
- **Titel:** Vorspielen
- **Kategorie:** Regeln / Regelverstoß
- **Status:** KOMPLETT_FALSCH
- **Kritisch:** 🚨 JA - HÖCHSTE PRIORITÄT!

### Problem-Beschreibung
KOMPLETT FALSCH: Original beschreibt einen Regelverstoß (Karte zu früh spielen), aktuelle Version beschreibt normale Spielhandlung. Artikel muss komplett neu geschrieben werden.

### Original-Inhalt (REFERENZ - NUR zum Verstehen, NICHT kopieren!)
```
[Original-Text aus jass-lexikon.json]
```

### Aktueller Inhalt (FALSCH!)

```
[Falscher Text aus jass-content-v2.json]
```

### ✅ Korrigierte Version (NEU - IP-sicher umformuliert, Bulletpoint-Format für SEO/RAG)

```
• Definition: [Was ist Vorspielen als Regelverstoß?]
• Regel: [Wann tritt der Fehler auf?]
• Konsequenz 1: [Was passiert bei nicht gefarbt?]
• Konsequenz 2: [Was passiert mit Stechwert/Zählwert?]
• Regel: [Wer spielt nächsten Stich aus?]
• Ausnahme: [Letzter Stich]
```

### Verwandte Artikel (für spätere Verlinkung)
- `nichtfarben` - Explizit erwähnt im Original
- `stechwert_verlieren` - Explizit erwähnt im Original (falls existiert)
- `letzter_stich` - Ausnahme erwähnt
- `ausspiel` - Ähnliches Konzept (normale Spielhandlung)
- `karte_zu_frueh` - Ähnlicher Regelverstoß

### Umformulierungs-Techniken verwendet
- [x] Liste → Bulletpoints (IP-sicher umformuliert, optimiert für SEO/RAG)
- [x] Komplett neu geschrieben (aktuelle Version war falsch)
- [x] Synonyme verwendet ("...")
- [x] Konsistente Reihenfolge eingehalten (Definition zuoberst!)
- [x] Eigene Formulierungen verwendet ("...")
- [x] Fachbegriffe beibehalten (Nichtfarben, Stechwert, etc.)
```

---

## ✅ CHECKLISTE PRO ARTIKEL

- [ ] Original mit aktueller Version verglichen
- [ ] **Komplett falscher Inhalt identifiziert?** ⚠️ KRITISCH
- [ ] Alle Informationen aus Original enthalten?
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
- `CONTENT_VALIDIERUNG_REPORT.md` - Problem-Beschreibungen
- `batches/PROMPT_AGENT1_BULLETPOINTS.md` - Format-Beispiele

**Datenquellen:**
- `/Users/remoprinz/Documents/Jassguru/jasstafel/src/data/jass-lexikon.json` - Original (NUR lesen, NICHT kopieren!)
- `/Users/remoprinz/Documents/Jassguru/jasswiki/src/data/jass-content-v2.json` - Aktuelle Version (lesen)

---

## 🚀 START

1. **Lies zuerst die Referenz-Dokumente**
2. **Lade Original und aktuelle Version für beide Artikel**
3. **Für `vorspielen`:** Erkenne: Aktuelle Version ist KOMPLETT FALSCH!
4. **Für `karte_faellt_runter`:** Prüfe Bulletpoint-Format (kein Original vorhanden)
5. **Erstelle `batches/BATCH_01D_RESTLICHE_KRITISCH_AGENT4.md`**
6. **Schreibe beide Artikel im Bulletpoint-Format**
7. **Für `vorspielen`:** Alle Details aus Original müssen enthalten sein!
8. **Für `karte_faellt_runter`:** Aktueller Inhalt optimieren, Format konsistent machen!
9. **Verwende konsistente Reihenfolge (Definition zuoberst!)**

**WICHTIG:** 
- Alle korrigierten Versionen müssen Bulletpoints sein, NICHT Fließtext!
- `vorspielen` muss KOMPLETT neu geschrieben werden - aktuelle Version ist falsch!
- `karte_faellt_runter` ist NICHT IP-kritisch - nur Format optimieren!
- Alle Details aus Original müssen enthalten sein (bei vorspielen)!
- Konsistente Reihenfolge einhalten (Definition immer zuoberst!)
