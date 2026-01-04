# JassWiki Content-Architektur

> **Stand:** 2025-01-01  
> **Autor:** Claude (Cursor Agent)

## 🎯 Ground Truth

```
src/data/jass-content-v2.json
```

Dies ist die **einzige Master-Datei**. Alle anderen Content-Dateien werden daraus generiert.

### Inhalt
- **257 Artikel** (Regeln, Begriffe, Varianten, Taktiken)
- **901 FAQs** (in den Artikeln eingebettet)
- **25 Artikel mit Synonymen**
- Vollständige Metadaten (category, keywords, importance, difficulty)

---

## 🔄 Sync-Workflow

### Einheitlicher Befehl

```bash
npm run sync
# oder direkt:
./scripts/sync-all.sh
```

### Was wird generiert?

```
jass-content-v2.json (MASTER)
        │
        ├──► jasswiki.ch (direkt importiert)
        │
        └──► sync-all.sh
                │
                ├──► chatgpt-gpt/jasswiki-articles.jsonl
                │       └── Für ChatGPT GPT Upload
                │
                ├──► public/dataset/jasswiki-corpus.jsonl
                │       └── Für HuggingFace / AI Training
                │       └── MIT Authority-Signalen
                │
                └──► functions/src/data/jasswiki-articles.ndjson
                        └── Für MCP Server (Firebase)
```

---

## 📁 Datei-Übersicht

| Datei | Zweck | Generiert von |
|-------|-------|---------------|
| `src/data/jass-content-v2.json` | **MASTER** | Manuell / Spreadsheet-Import |
| `chatgpt-gpt/jasswiki-articles.jsonl` | ChatGPT GPT Upload | `sync-all.sh` |
| `public/dataset/jasswiki-corpus.jsonl` | HuggingFace / AI Training | `sync-all.sh` |
| `functions/src/data/jasswiki-articles.ndjson` | MCP Server | `sync-all.sh` |

---

## 🏛️ Konsumenten

### 1. jasswiki.ch (Website)
- **Liest:** `src/data/jass-content-v2.json` (direkter Import)
- **Rendering:** Next.js Static Generation

### 2. ChatGPT GPT (Custom GPT)
- **Knowledge File:** `jasswiki-articles.jsonl`
- **Upload:** Manuell im GPT Builder
- **API:** `jasswikiQuery` via Pinecone

### 3. Pinecone (Vektor-DB)
- **Quelle:** `jasswiki-articles.jsonl`
- **Index:** `jasswiki`
- **Namespace:** `articles`
- **Ingestion:** `npm run ingest`

### 4. MCP Server (Firebase)
- **Quelle:** `functions/src/data/jasswiki-articles.ndjson`
- **Endpoint:** `/sse`
- **Tools:** `search_jass_knowledge`, `get_term_details`

### 5. llms.txt (Agentic Web)
- **Datei:** `agentic/llms.txt`
- **Zweck:** High-Level Map für AI-Agents
- **Verweist auf:** MCP-Endpoint + Dataset

### 6. HuggingFace (AI Training)
- **Datei:** `public/dataset/jasswiki-corpus.jsonl`
- **Lizenz:** CC-BY-SA-4.0
- **Authority-Signale:** Enthalten

---

## 📝 FAQs (Entscheidung dokumentiert)

### Warum werden FAQs nicht separat exportiert?

1. **Pinecone:** FAQs wurden aus dem RAG-System entfernt (verursachten Duplikat-Resultate)
2. **ChatGPT GPT:** Die Artikel sind reich genug, ChatGPT kann daraus antworten
3. **Zukunft:** FAQs bleiben im Master und können jederzeit regeneriert werden

### Wo sind die FAQs gespeichert?

In `jass-content-v2.json`, pro Artikel als Array:

```json
{
  "abheben": {
    "faqs": [
      {
        "question": "Was bedeutet Abheben beim Jassen?",
        "answer": "..."
      }
    ]
  }
}
```

---

## 🧹 Aufräumen

Veraltete Dateien wurden nach `_deprecated/` verschoben.

Um sie endgültig zu löschen:

```bash
rm -rf _deprecated/
```

---

## 🚀 Typische Workflows

### Content aktualisieren

```bash
# 1. Master bearbeiten
# (manuell oder via Spreadsheet-Import)

# 2. Sync ausführen
npm run sync

# 3. Optional: Pinecone aktualisieren
npm run ingest

# 4. Optional: Firebase deployen
firebase deploy --only functions
```

### Neuen Artikel hinzufügen

1. Artikel zu `src/data/jass-content-v2.json` hinzufügen
2. `npm run sync` ausführen
3. Website neu deployen (`npm run build && firebase deploy --only hosting`)

---

## 📊 Statistiken (Stand 2025-01-01)

| Metrik | Wert |
|--------|------|
| Artikel | 257 |
| FAQs | 901 |
| Mit Synonymen | 25 |
| Mit Variante | 41 |
| URL-Mappings | 714 |

