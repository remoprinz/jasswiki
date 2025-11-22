# 🟡 PROMPT: Agent 3 - Regel-Verstösse Teil 2 (Bulletpoint-Format)

**Agent:** Agent 3  
**Format:** Bulletpoints (IP-sicher, SEO/RAG-optimiert)  
**Artikel:** 6 Regel-Verstösse  
**Output:** `batches/BATCH_01C_REGELN_TEIL2_AGENT3.md`

---

## 📋 IHRE AUFGABE

Sie sind **Agent 3** für die Content-Korrektur des Jasswiki.

### Ihre 6 Artikel:
1. `matsch` - Schieber-Varianten
2. `bemerkungen_schnorren` - Bemerkungen/Schnorren
3. `regeln_verschlagen` - Verschlagen
4. `rest_machen` - Rest machen
5. `schneider` - Schneider
6. `schreiben` - Schreiben

---

## 🎯 FORMAT: BULLETPOINTS (WICHTIG!)

**⚠️ KRITISCH:** Alle korrigierten Versionen müssen im **Bulletpoint-Format** sein!

### Warum Bulletpoints?
- ✅ **SEO:** Höhere Chance auf Featured Snippets bei Google
- ✅ **RAG:** Bessere strukturierte Daten für ChatGPT-App
- ✅ **IP-Schutz:** Funktioniert trotzdem durch unterschiedliche Formulierungen
- ✅ **Lesbarkeit:** Schnelleres Erfassen der Informationen

### Bulletpoint-Format für Regel-Artikel:

**Bei Punkte/Werte-Artikeln (wie `matsch`):**
```
• Definition: [Was ist es?]
• Wert: [Zahl] Punkte
• Bedingung 1: [Wann gilt dieser Wert?]
• Wert: [Zahl] Punkte
• Bedingung 2: [Wann gilt dieser Wert?]
• Regel: [Zusätzliche Regelung]
```

**Bei komplexen Regeln:**
```
• Definition: [Was ist es?]
• Regel: [Wie funktioniert es?]
• Punkte/Werte: [Wenn relevant]
• Konsequenz: [Was passiert?]
• Ausnahme: [Gibt es Ausnahmen?]
```

**Bei Prozeduren:**
```
• Schritt 1: [Beschreibung]
• Schritt 2: [Beschreibung]
• Voraussetzung: [Was muss erfüllt sein?]
• Wichtig: [Besonderheit]
```

**⚠️ NICHT:** Fließtext-Format  
**✅ JA:** Bulletpoint-Format

---

## 🔍 SPEZIELLE PROBLEME IHRER ARTIKEL

Basierend auf dem Validierungs-Report haben Ihre Artikel folgende Probleme:

### `matsch` - CONTENT_MISMATCH
- **Problem:** Punkte/Werte fehlen oder sind falsch. Original enthält: 157 Punkte, 257 Punkte, ...
- **Lösung:** Stelle sicher, dass ALLE Punktewerte aus dem Original enthalten sind
- **⚠️ KRITISCH:** Dies ist ein Punkte-Artikel - Zahlen müssen 100% korrekt sein!

### `bemerkungen_schnorren` - INCOMPLETE
- **Problem:** Fehlt wichtiger Begriff: "punkte"
- **Lösung:** Stelle sicher, dass Punkte-Kontext erwähnt wird

### `regeln_verschlagen` - INCOMPLETE
- **Problem:** Fehlt wichtiger Begriff: "stich"
- **Lösung:** Stelle sicher, dass Stich-Kontext erwähnt wird

### `rest_machen` - INCOMPLETE
- **Problem:** Artikel ist deutlich kürzer als Original (59%). Möglicherweise fehlen Informationen
- **Lösung:** Prüfe Original gründlich und ergänze alle fehlenden Informationen
- **⚠️ WICHTIG:** Komplette Vollständigkeit sicherstellen!

### `schneider` - INCOMPLETE
- **Problem:** Artikel ist deutlich kürzer als Original (54%). Möglicherweise fehlen Informationen
- **Lösung:** Prüfe Original gründlich und ergänze alle fehlenden Informationen
- **⚠️ WICHTIG:** Komplette Vollständigkeit sicherstellen!

### `schreiben` - INCOMPLETE
- **Problem:** Fehlt wichtiger Begriff: "stich"
- **Lösung:** Stelle sicher, dass Stich-Kontext erwähnt wird

**⚠️ WICHTIG:** 
- Prüfe für jeden Artikel, ob ALLE Informationen aus dem Original enthalten sind
- Besonders bei `matsch`, `rest_machen`, `schneider`: Vollständigkeit ist kritisch!

---

## 🔄 UMFORMULIERUNGS-REGELN FÜR BULLETPOINTS

### IP-Schutz durch Bulletpoints:
1. **Unterschiedliche Formulierungen:**
   - Original: "Gibt 157 Punkte"
   - Neu: "• Wert: 157 Punkte"
   - Oder: "• Punktezahl: 157"

2. **Synonyme verwenden** (nur bei allgemeinen Begriffen!):
   - Original: "kann"
   - Neu: "darf" oder "ist erlaubt"

3. **Reihenfolge variieren:**
   - Original: Definition → Punkte → Regel
   - Neu: Definition → Regel → Punkte → Bedingung

4. **Aktiv vs. Passiv:**
   - Original: "Der Spieler macht Rest"
   - Neu: "• Rest machen: Spieler muss alle Stiche gewinnen"

5. **Verschiedene Strukturen:**
   - Original: "Muss vor dem ersten Ausspiel gemeldet werden"
   - Neu: "• Meldung erforderlich: vor erstem Ausspiel"

### Erlaubt:
- ✅ Verschiedene Formulierungen pro Bulletpoint
- ✅ Synonyme bei allgemeinen Begriffen
- ✅ Reihenfolge-Änderungen
- ✅ Strukturvariationen

### NICHT erlaubt:
- ❌ Gleiche Formulierungen wie Original
- ❌ Fachbegriffe ändern (Trumpf, Stich, Schneider, etc.)
- ❌ Inhalt ändern (Zahlen, Regeln müssen identisch bleiben)
- ❌ Informationen weglassen, die im Original stehen

---

## 📝 BATCH-FILE-FORMAT

Für jeden Artikel im Format:

```markdown
## Artikel 1: Matsch (ID: matsch)

### Status & Kategorie
- **ID:** `matsch`
- **Titel:** Schieber-Varianten
- **Kategorie:** Regeln
- **Status:** CONTENT_MISMATCH
- **Kritisch:** 🚨 JA

### Problem-Beschreibung
Punkte/Werte fehlen oder sind falsch. Original enthält: 157 Punkte, 257 Punkte, ... Alle Punktewerte müssen enthalten sein.

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
• Definition: [Was ist Matsch?]
• Wert: 157 Punkte
• Bedingung: [Wann gilt dieser Wert?]
• Wert: 257 Punkte
• Bedingung: [Wann gilt dieser Wert?]
• Regel: [Zusätzliche Regelung]
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
- [x] Fachbegriffe beibehalten (Schneider, Stich, etc.)
- [x] Fehlende Informationen ergänzt
```

---

## ✅ CHECKLISTE PRO ARTIKEL

- [ ] Original mit aktueller Version verglichen
- [ ] **Alle Informationen aus Original enthalten?** ⚠️ KRITISCH (besonders bei matsch, rest_machen, schneider)
- [ ] **Punkte/Werte korrekt?** ⚠️ KRITISCH (bei matsch)
- [ ] Fehlende Begriffe identifiziert und ergänzt?
- [ ] Inhaltlich korrekt? (Zahlen, Regeln, Fakten)
- [ ] IP-sicher umformuliert? (unterschiedliche Formulierungen)
- [ ] **Bulletpoint-Format verwendet?** ⚠️ KRITISCH
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
3. **Erstelle `batches/BATCH_01C_REGELN_TEIL2_AGENT3.md`**
4. **Verwende für jeden Artikel Bulletpoint-Format**
5. **Stelle sicher, dass ALLE Informationen aus Original enthalten sind**
6. **Besonders bei `matsch`: Alle Punktewerte müssen korrekt sein!**

**WICHTIG:** 
- Alle korrigierten Versionen müssen Bulletpoints sein, NICHT Fließtext!
- Vollständigkeit ist kritisch - besonders bei matsch, rest_machen, schneider!
- Alle Punktewerte müssen 100% korrekt sein!
