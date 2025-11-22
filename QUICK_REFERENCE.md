# JassWiki RAG – Quick Reference

Schnell-Referenz für häufige Kommandos und Workflows.

---

## 🚀 Setup (Erstmalig)

```bash
# 1. Environment konfigurieren
cp env.example .env
# → PINECONE_API_KEY & GEMINI_API_KEY eintragen

# 2. Dependencies installieren
npm install
cd functions && npm install && cd ..

# 3. Automatisches Setup (Index + Ingestion + Tests)
./scripts/quickstart.sh

# ODER manuell:
npm run rag:setup     # Pinecone Index erstellen
npm run rag:ingest    # JSONL hochladen
npm run rag:test      # Tests durchführen
```

---

## 📊 Ingestion (Content-Updates)

```bash
# JSONL-Dateien aktualisieren:
# - chatgpt-gpt/jasswiki-articles.jsonl
# - chatgpt-gpt/jasswiki-faqs.jsonl

# Dann re-ingest:
npm run rag:ingest

# (Überschreibt automatisch existierende IDs)
```

---

## 🔧 Firebase Functions

```bash
# Secrets konfigurieren (einmalig)
firebase functions:secrets:set PINECONE_API_KEY
firebase functions:secrets:set GEMINI_API_KEY

# Functions bauen & deployen
cd functions
npm run build
npm run deploy
cd ..

# Logs anzeigen
firebase functions:log --only jasswikiQuery
firebase functions:log --only jasswikiQuery --limit 100
```

---

## 🧪 Tests

```bash
# RAG Query Tests (lokal gegen Pinecone)
npm run rag:test

# Einzelner Test (Custom Query)
npx tsx scripts/test-rag-query.ts
# → Skript anpassen für custom queries
```

---

## 🤖 ChatGPT Integration

### 1. GPT erstellen

1. ChatGPT → **Create GPT**
2. Name: **JassWiki Experte**
3. Description: *Schweizer Jass-Experte mit offizieller JassWiki-Wissensdatenbank*

### 2. Action konfigurieren

1. Actions → **Import from URL or paste**
2. File: `openapi-schema.yaml` (lokal öffnen & copy-paste)
3. Server: `https://us-central1-jasswiki.cloudfunctions.net`
4. Authentication: **None**

### 3. Instructions einfügen

Copy-Paste aus: `GPT_INSTRUCTIONS.md`

### 4. Testen

Test-Queries:
- "Was bedeutet Abheben?"
- "Wie funktioniert Schieber?"
- "xyz" (sollte Rückfrage stellen)

---

## 📁 Wichtige Dateien

| Datei | Zweck |
|-------|-------|
| `RAG_SETUP.md` | Vollständige Setup-Dokumentation |
| `DEPLOYMENT_CHECKLIST.md` | Pre-Deployment & Go-Live Checks |
| `GPT_INSTRUCTIONS.md` | ChatGPT Instructions (copy-paste) |
| `IMPLEMENTATION_SUMMARY.md` | Technische Übersicht & Architektur |
| `openapi-schema.yaml` | OpenAPI Schema für GPT Action |
| `env.example` | Environment Template |

---

## 🔍 Debugging

### Problem: "PINECONE_API_KEY nicht konfiguriert"

```bash
# Lokal
echo "PINECONE_API_KEY=pc-xxx" >> .env

# Firebase
firebase functions:secrets:set PINECONE_API_KEY
```

### Problem: "Index 'jasswiki' nicht gefunden"

```bash
npm run rag:setup
```

### Problem: "No matches over threshold"

```bash
# Check ob Daten ingestiert wurden
npm run rag:test

# Falls nein → re-ingest
npm run rag:ingest
```

### Problem: Firebase Function Fehler

```bash
# Logs checken
firebase functions:log --only jasswikiQuery

# Neu deployen
cd functions
npm run build
npm run deploy
cd ..
```

---

## 📊 Monitoring

### Firebase Console

URL: https://console.firebase.google.com/project/jasswiki/functions

Metrics:
- Request Count
- Error Rate
- Execution Time
- Memory Usage

### Pinecone Console

URL: https://app.pinecone.io

Metrics:
- Vector Count (sollte ~2000 sein)
- Query Latency
- Storage Size

---

## 💰 Kosten-Tracking

### Schätzung (1K Queries/Monat)

| Service | Kosten |
|---------|--------|
| Gemini Embeddings | $0.10 |
| Pinecone Serverless | $0.50 |
| Firebase Functions | Free |
| **Total** | **~$1/Monat** |

Bei 10K Queries: ~$5-10/Monat

### Monitoring

```bash
# Firebase Billing
firebase projects:list
# → Console → Billing

# Pinecone Billing
# → https://app.pinecone.io → Billing
```

---

## 🆘 Support

### Probleme?

1. **Check Logs**: `firebase functions:log`
2. **Check Pinecone**: https://app.pinecone.io
3. **Local Tests**: `npm run rag:test`
4. **Dokumentation**: `RAG_SETUP.md` → Troubleshooting

### Kontakt

- **Dokumentation**: Siehe `*.md` Dateien
- **Code**: `lib/`, `scripts/`, `functions/src/`

---

## 🔄 Workflow-Diagramm

```
┌─────────────────────────────────────────────────┐
│  CONTENT UPDATE                                 │
├─────────────────────────────────────────────────┤
│  1. Edit JSONL files                            │
│  2. npm run rag:ingest                          │
│  3. npm run rag:test (verify)                   │
│  4. Done ✅                                      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  FUNCTION UPDATE                                │
├─────────────────────────────────────────────────┤
│  1. Edit functions/src/index.ts                 │
│  2. cd functions && npm run build               │
│  3. npm run deploy                              │
│  4. Test with curl or GPT                       │
│  5. Done ✅                                      │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  GPT UPDATE                                     │
├─────────────────────────────────────────────────┤
│  1. Edit GPT_INSTRUCTIONS.md                    │
│  2. Copy-paste to ChatGPT → Configure → Instr. │
│  3. Save & Test                                 │
│  4. Done ✅                                      │
└─────────────────────────────────────────────────┘
```

---

## ✅ Pre-Production Checklist

- [ ] `.env` konfiguriert (PINECONE_API_KEY, GEMINI_API_KEY)
- [ ] Pinecone Index erstellt (`npm run rag:setup`)
- [ ] Daten ingestiert (`npm run rag:ingest`)
- [ ] Tests erfolgreich (`npm run rag:test`)
- [ ] Firebase Secrets gesetzt
- [ ] Functions deployed
- [ ] Endpoint erreichbar (curl test)
- [ ] ChatGPT Action konfiguriert
- [ ] GPT Instructions eingefügt
- [ ] E2E-Tests mit GPT durchgeführt
- [ ] Keine Halluzinationen festgestellt
- [ ] Monitoring aktiv

---

**Version**: 1.0.0  
**Letzte Aktualisierung**: November 2025

