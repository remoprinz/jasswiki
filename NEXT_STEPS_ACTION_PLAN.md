# 🎯 Nächste Schritte: Content-Synchronisation & Strukturierung

**Erstellt:** 2025-12-06  
**Status:** Ready for Implementation

---

## 📋 PRIORISIERTE AKTIONEN

### ✅ PHASE 1: Sync-Script entwickeln (KRITISCH)

**Ziel:** Automatische Synchronisation von `jass-content-v2.json` → `jasswiki-articles.jsonl`

**Warum kritisch:**
- Aktuell müssen beide Dateien manuell synchronisiert werden
- Risiko von Inkonsistenzen
- JSON ist die Hauptquelle, JSONL sollte automatisch generiert werden

**Anforderungen:**
1. **Input:** `src/data/jass-content-v2.json`
2. **Output:** `chatgpt-gpt/jasswiki-articles.jsonl`
3. **Funktionalität:**
   - Konvertiert JSON-Struktur → JSONL-Format
   - Extrahiert `variant` aus Keywords/Metadata (z.B. wenn "schieber" in keywords)
   - Generiert `canonical_url` aus Metadata-Kategorien (nutzt bestehende URL-Mapping-Logik)
   - Konvertiert `text` → `body` (normalisiert Format)
   - Extrahiert `title` aus `metadata.category.topic`
   - Konvertiert `metadata.keywords` → `tags` Array
   - Behält `see_also` Links bei
   - Setzt `language: "de-CH"` standardmäßig

**Technische Details:**
- Nutzt bestehende `buildCanonicalURL` Funktion aus `lib/rag-types.ts`
- Nutzt `lib/url-mapping.json` für URL-Generierung
- Script: `scripts/sync-json-to-jsonl.mjs`

**Zeitaufwand:** ~2-3 Stunden

---

### 🔧 PHASE 2: Schieber-Strukturierung klären (WICHTIG)

**Problem:** Schieber wird überall referenziert, aber nicht als Kategorie/Variante strukturiert

**Optionen evaluieren:**

#### Option A: Schieber als Hauptkategorie
- **Pro:** Klare Struktur, eigene Route `/schieber/`
- **Contra:** Schieber ist eigentlich eine Variante, keine Kategorie
- **Aufwand:** Mittel (neue Kategorie-Struktur, Routing anpassen)

#### Option B: Schieber als Variante in Varianten-Kategorie
- **Pro:** Semantisch korrekt (Schieber IST eine Variante)
- **Contra:** Schieber ist die Standard-Variante, könnte verwirrend sein
- **Aufwand:** Niedrig (nur Content-Struktur anpassen)

#### Option C: Schieber-Artikel mit `variant: "Schieber"` Metadata
- **Pro:** Minimal invasiv, nutzt bestehende Struktur
- **Contra:** Keine eigene Route `/schieber/`
- **Aufwand:** Sehr niedrig (nur Metadata ergänzen)

**Empfehlung:** Option C + Option B Kombination
- Schieber-Artikel bekommen `variant: "Schieber"` in Metadata
- Schieber wird als Variante in Varianten-Kategorie aufgelistet
- Falls gewünscht: Redirect `/schieber/` → `/varianten/schieber/` oder `/taktiken-und-strategien/`

**Zeitaufwand:** ~1-2 Stunden (je nach Option)

---

### 📝 PHASE 3: Workflow dokumentieren (WICHTIG)

**Ziel:** Klare Dokumentation des Content-Workflows

**Dokumentation erstellen:**
1. **`CONTENT_WORKFLOW.md`**
   - Wie werden neue Artikel hinzugefügt?
   - Wie werden Artikel aktualisiert?
   - Welche Datei ist die Quelle der Wahrheit?
   - Wie funktioniert die Synchronisation?

2. **`CONTENT_STRUCTURE.md`**
   - Erklärt JSON-Struktur
   - Erklärt JSONL-Struktur
   - Mapping zwischen beiden Formaten
   - Best Practices für Content-Erstellung

**Zeitaufwand:** ~1 Stunde

---

### 🤖 PHASE 4: Automatisierung einrichten (OPTIONAL)

**Ziel:** Automatische Synchronisation bei Änderungen

**Optionen:**

#### Option A: Pre-Commit Hook
- Führt Sync-Script automatisch vor jedem Commit aus
- Stellt sicher, dass JSONL immer aktuell ist
- **Nachteil:** Kann Commits verlangsamen

#### Option B: GitHub Actions / CI/CD
- Führt Sync-Script bei jedem Push aus
- Committed automatisch aktualisierte JSONL-Datei
- **Nachteil:** Erfordert CI/CD Setup

#### Option C: npm Script
- `npm run sync:jsonl` - manuell ausführbar
- Einfach zu integrieren in bestehende Workflows
- **Nachteil:** Manuell, nicht automatisch

**Empfehlung:** Option C (npm Script) + Option A (Pre-Commit Hook) als Option

**Zeitaufwand:** ~1-2 Stunden

---

## 🚀 SOFORT-IMPLEMENTIERUNG (Quick Wins)

### 1. Sync-Script erstellen
**Datei:** `scripts/sync-json-to-jsonl.mjs`

**Basis-Struktur:**
```javascript
#!/usr/bin/env node
import fs from 'fs';
import { buildCanonicalURL } from '../lib/rag-types.js';

// 1. Lade JSON
// 2. Für jeden Artikel:
//    - Konvertiere zu JSONL-Format
//    - Generiere canonical_url
//    - Extrahiere variant aus keywords
//    - Konvertiere text → body
// 3. Schreibe JSONL-Datei
```

### 2. npm Script hinzufügen
**In `package.json`:**
```json
{
  "scripts": {
    "sync:jsonl": "node scripts/sync-json-to-jsonl.mjs"
  }
}
```

### 3. Test durchführen
- Sync-Script ausführen
- JSONL-Datei prüfen
- Mit bestehender JSONL vergleichen
- Unterschiede dokumentieren

---

## 📊 ERFOLGS-METRIKEN

Nach Implementierung sollten folgende Metriken erfüllt sein:

- ✅ Sync-Script läuft fehlerfrei
- ✅ JSONL-Datei wird automatisch aus JSON generiert
- ✅ Alle 256 Artikel werden korrekt konvertiert
- ✅ Canonical URLs sind korrekt
- ✅ Variant-Feld wird korrekt extrahiert
- ✅ Workflow ist dokumentiert
- ✅ Schieber-Problem ist gelöst (oder klar dokumentiert)

---

## 🔄 ROLLOUT-PLAN

### Schritt 1: Sync-Script entwickeln & testen
- Script erstellen
- Lokal testen
- Unterschiede zur bestehenden JSONL analysieren
- Anpassungen vornehmen

### Schritt 2: Schieber-Strukturierung entscheiden
- Optionen mit Stakeholder besprechen
- Entscheidung treffen
- Implementierung

### Schritt 3: Dokumentation erstellen
- Workflow dokumentieren
- Struktur dokumentieren
- Best Practices dokumentieren

### Schritt 4: Automatisierung (optional)
- npm Script hinzufügen
- Pre-Commit Hook einrichten (optional)
- CI/CD Integration (optional)

---

## ⚠️ RISIKEN & MITIGATION

### Risiko 1: URL-Generierung fehlerhaft
**Mitigation:** Nutze bestehende `buildCanonicalURL` Funktion und `url-mapping.json`

### Risiko 2: Variant-Extraktion ungenau
**Mitigation:** Klare Heuristik definieren (z.B. wenn "schieber" in keywords → variant: "Schieber")

### Risiko 3: Content-Verlust bei Konvertierung
**Mitigation:** Backup vor Sync, Vergleich mit bestehender JSONL, Validierung

### Risiko 4: Breaking Changes in bestehender JSONL
**Mitigation:** Incremental Rollout, Vergleich vor/after, Backup

---

## 📅 ZEITPLAN (Schätzung)

| Phase | Aufgabe | Zeitaufwand | Priorität |
|-------|---------|-------------|-----------|
| 1 | Sync-Script entwickeln | 2-3h | 🔴 KRITISCH |
| 2 | Schieber-Strukturierung | 1-2h | 🟡 WICHTIG |
| 3 | Workflow dokumentieren | 1h | 🟡 WICHTIG |
| 4 | Automatisierung | 1-2h | 🟢 OPTIONAL |
| **TOTAL** | | **5-8h** | |

---

## ✅ CHECKLISTE

- [ ] Sync-Script entwickelt
- [ ] Sync-Script getestet
- [ ] npm Script hinzugefügt
- [ ] Schieber-Strukturierung entschieden
- [ ] Schieber-Strukturierung implementiert
- [ ] Workflow dokumentiert
- [ ] Automatisierung eingerichtet (optional)
- [ ] Erfolgs-Metriken erfüllt

---

## 📞 NÄCHSTE AKTIONEN

**Sofort:**
1. Sync-Script entwickeln (`scripts/sync-json-to-jsonl.mjs`)
2. Test durchführen
3. Unterschiede analysieren

**Diese Woche:**
1. Schieber-Strukturierung klären
2. Workflow dokumentieren

**Optional:**
1. Automatisierung einrichten
2. CI/CD Integration

