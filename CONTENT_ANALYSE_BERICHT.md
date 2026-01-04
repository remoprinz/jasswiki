# 📊 Content-Analyse: jass-content-v2.json vs jasswiki-articles.jsonl

**Datum:** 2025-12-06  
**Analysiert von:** Automatisierte Analyse-Script

---

## 🎯 EXECUTIVE SUMMARY

### Status Quo
- **jass-content-v2.json**: 256 Artikel (Hauptdatenbank für Website)
- **jasswiki-articles.jsonl**: 257 Artikel (Export für ChatGPT GPT)
- **Überschneidung**: 256 Artikel existieren in beiden Dateien
- **Unterschied**: Nur 1 Artikel (`references_main`) existiert nur in JSONL

### Fazit
Die beiden Dateien sind **nahezu identisch** in Bezug auf Artikel-Anzahl und IDs. Die Hauptunterschiede liegen in der **Struktur** und **Metadaten-Formatierung**, nicht im Content selbst.

---

## 📊 DETAILLIERTE STATISTIKEN

### Artikel-Vergleich

| Metrik | JSON | JSONL | Status |
|--------|------|-------|--------|
| **Gesamt-Artikel** | 256 | 257 | ✅ Fast identisch |
| **Nur in JSON** | 0 | - | ✅ Keine |
| **Nur in JSONL** | - | 1 | ⚠️ `references_main` |
| **In beiden** | 256 | 256 | ✅ 99.6% Übereinstimmung |

### Struktur-Unterschiede (Sample: 50 gemeinsame Artikel)

| Feature | JSON | JSONL | Unterschied |
|---------|------|-------|-------------|
| **Metadata-Struktur** | ✅ 50/50 | ❌ Keine | JSON hat strukturierte Metadata |
| **Variant-Feld** | ❌ Keine | ✅ 3/50 | JSONL hat `variant` Feld |
| **Canonical URLs** | ❌ Keine | ✅ 50/50 | JSONL hat explizite URLs |
| **FAQs** | ✅ 50/50 | ❌ Keine | JSON hat strukturierte FAQs |
| **See-Also Links** | ✅ 46/50 | ✅ 46/50 | Beide haben Crosslinks |

---

## 🔍 STRUKTUR-ANALYSE

### jass-content-v2.json (JSON-Format)

**Struktur:**
```json
{
  "article_id": {
    "id": "article_id",
    "text": "Vollständiger Artikel-Text mit Crosslinks",
    "metadata": {
      "category": {
        "main": "Regeln",
        "sub": "Kartenverteilung",
        "topic": "Artikel-Titel"
      },
      "keywords": ["keyword1", "keyword2"],
      "situations": ["LEARNING"],
      "importance": 1,
      "difficulty": 2
    },
    "faqs": [
      {"question": "...", "answer": "..."}
    ],
    "see_also": ["related_id1", "related_id2"]
  }
}
```

**Vorteile:**
- ✅ Strukturierte Metadata (Kategorien, Keywords, Difficulty)
- ✅ Integrierte FAQs
- ✅ Wird direkt von Next.js Website verwendet
- ✅ Einfach zu durchsuchen/queryen

**Nachteile:**
- ❌ Kein `variant` Feld
- ❌ Keine expliziten `canonical_url` Felder

### jasswiki-articles.jsonl (JSONL-Format)

**Struktur:**
```json
{
  "id": "article_id",
  "title": "Artikel-Titel",
  "variant": "Schieber" | null,
  "tags": ["Regeln", "Kategorie", "Keyword1", "LEARNING"],
  "synonyms": [],
  "see_also": ["related_id1"],
  "language": "de-CH",
  "body": "Vollständiger Artikel-Text",
  "canonical_url": "https://jasswiki.ch/..."
}
```

**Vorteile:**
- ✅ `variant` Feld für Spielvarianten
- ✅ Explizite `canonical_url` Felder
- ✅ Einfach zu streamen (eine Zeile pro Artikel)
- ✅ Wird von ChatGPT GPT verwendet

**Nachteile:**
- ❌ Keine strukturierte Metadata (nur Tags)
- ❌ Keine integrierten FAQs (separate Datei)
- ❌ Kategorien müssen aus Tags abgeleitet werden

---

## 📋 KATEGORIE-VERGLEICH

### JSON Kategorien (8)
1. Regeln
2. Begriffe
3. Weis-Regeln
4. Taktiken und Strategien
5. Varianten
6. Grundlagen & Kultur
7. Geschichte
8. Jassapps

### JSONL Kategorien (7)
1. Regeln
2. Begriffe
3. Grundlagen & Kultur
4. Geschichte
5. Jassapps
6. Varianten
7. Weis-Regeln

**Unterschied:** JSONL hat keine explizite "Taktiken und Strategien" Kategorie (wird vermutlich als Tag verwendet)

---

## 🎯 SCHIEBER-SPEZIFISCHE ANALYSE

### Artikel mit "Schieber"-Referenz

**JSON:** 40 Artikel erwähnen "Schieber"
- Hauptsächlich in: Regeln, Taktiken und Strategien
- Beispiele: `ausspiel`, `schieber_conventions`, `schieber_taktiken_*`

**JSONL:** 57 Artikel erwähnen "Schieber"
- Mehr Artikel wegen `variant: "Schieber"` Feld
- Beispiele: `ausspiel` (variant: Schieber), `expressions_misere` (variant: Schieber)

**Unterschied:** JSONL hat explizites `variant` Feld, das Schieber-Referenzen besser kategorisiert.

---

## 🔧 BESTEHENDE TRANSFER-SCRIPTS

### ✅ Vorhandene Scripts

1. **`scripts/mappers/article-mapper.ts`**
   - **Zweck:** JSONL → Pinecone (für RAG/Vector DB)
   - **Funktion:** Konvertiert JSONL-Artikel zu Pinecone-Dokumenten
   - **Nicht relevant:** Für JSON ↔ JSONL Konvertierung

2. **`scripts/phase2-transfer.mjs`**
   - **Zweck:** Markdown → JSON
   - **Funktion:** Transferiert optimierte Artikel aus Markdown in JSON
   - **Nicht relevant:** Für JSON ↔ JSONL Konvertierung

3. **`scripts/transfer-optimized-to-json.mjs`**
   - **Zweck:** Markdown → JSON
   - **Funktion:** Wie phase2-transfer.mjs
   - **Nicht relevant:** Für JSON ↔ JSONL Konvertierung

4. **`scripts/convert-references-to-urls.ts`**
   - **Zweck:** JSONL-Interne Links → URLs
   - **Funktion:** Konvertiert interne Referenzen zu vollständigen URLs
   - **Nicht relevant:** Für JSON ↔ JSONL Konvertierung

### ❌ FEHLENDE Scripts

**Kein Script existiert für:**
- ❌ JSON → JSONL Konvertierung
- ❌ JSONL → JSON Konvertierung
- ❌ Bidirektionales Sync zwischen beiden Formaten

---

## 💡 EMPFEHLUNGEN

### 1. Hauptquelle definieren: `jass-content-v2.json`

**Begründung:**
- ✅ Wird direkt von der Website verwendet (Next.js)
- ✅ Strukturierte Metadata (besser für Kategorisierung)
- ✅ Integrierte FAQs
- ✅ Bereits etabliert als Hauptdatenbank

### 2. JSONL als abgeleitete Quelle

**Workflow:**
```
jass-content-v2.json (Master)
    ↓
[Neues Sync-Script]
    ↓
jasswiki-articles.jsonl (Export für GPT)
```

### 3. Neues Sync-Script erstellen

**Funktionalität:**
- Konvertiert JSON → JSONL Format
- Extrahiert `variant` Information aus Metadata/Keywords
- Generiert `canonical_url` aus Metadata-Kategorien
- Konvertiert FAQs zu separater JSONL-Datei (falls benötigt)
- Behält `see_also` Links bei

### 4. Schieber-Problem lösen

**Optionen:**
- **Option A:** Schieber als Hauptkategorie in JSON hinzufügen
- **Option B:** Schieber als Variante in Varianten-Kategorie strukturieren
- **Option C:** Schieber-Artikel mit `variant: "Schieber"` Metadata versehen

---

## 📝 NÄCHSTE SCHRITTE

1. ✅ **Analyse abgeschlossen** (dieses Dokument)
2. ⏳ **Sync-Script entwickeln** (JSON → JSONL)
3. ⏳ **Schieber-Strukturierung klären**
4. ⏳ **Workflow dokumentieren**
5. ⏳ **Automatisierung einrichten** (z.B. Pre-Commit Hook)

---

## 📄 ANHANG

### Detaillierte Analyse-Datei
Siehe: `CONTENT_DIFF_ANALYSIS.json` für vollständige Liste aller Artikel-IDs und Unterschiede.

### Script-Location
- Analyse-Script: `scripts/analyze-content-differences.mjs`
- Kann jederzeit neu ausgeführt werden für aktuelle Analyse

