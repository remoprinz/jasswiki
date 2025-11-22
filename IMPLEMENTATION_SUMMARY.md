# JassWiki RAG Implementation – Summary

Vollständige Übersicht der implementierten RAG-Lösung für JassWiki ChatGPT Integration.

---

## 🎯 Ziel

**Reine ChatGPT App** für JassWiki mit:
- ✅ **Keine Halluzinationen** (strikte Scoring Policy)
- ✅ **Qualitäts-RAG** mit Quellenangaben
- ✅ **OpenAI GPT Actions** (kein Knowledge Upload)
- ✅ **Firebase Hosting** (produktionsreif)
- ✅ **Gemini Embeddings** (768D, kosteneffizient)
- ✅ **Pinecone Vector DB** (serverless, skalierbar)

---

## 📁 Projektstruktur

```
jasswiki/
├── lib/
│   ├── rag-types.ts              # Shared Types (Pinecone, RAG, JSONL)
│   └── embedding-service.ts       # Gemini Embedding Service
├── scripts/
│   ├── setup-pinecone-index.ts   # Pinecone Index Setup
│   ├── ingest-to-pinecone.ts     # Hauptingestion (JSONL → Pinecone)
│   ├── test-rag-query.ts         # Test-Script für Queries
│   ├── quickstart.sh             # Automatisiertes Setup
│   └── mappers/
│       ├── article-mapper.ts     # JSONL → Artikel Transformation
│       └── faq-mapper.ts         # JSONL → FAQ Transformation
├── functions/
│   ├── package.json              # Firebase Functions Dependencies
│   ├── tsconfig.json             # TS Config für Functions
│   └── src/
│       ├── index.ts              # Firebase Function: jasswikiQuery
│       └── types.ts              # Function Types
├── chatgpt-gpt/
│   ├── jasswiki-articles.jsonl   # Artikel-Daten (~1800)
│   └── jasswiki-faqs.jsonl       # FAQ-Daten (~200)
├── openapi-schema.yaml           # OpenAPI Schema für ChatGPT Action
├── firebase.json                 # Firebase Config
├── package.json                  # Root Dependencies + Scripts
├── env.example                   # Environment Template
├── RAG_SETUP.md                  # Setup & Betriebsdoku
├── DEPLOYMENT_CHECKLIST.md       # Deployment Guide
├── GPT_INSTRUCTIONS.md           # ChatGPT Instructions
└── IMPLEMENTATION_SUMMARY.md     # Diese Datei
```

---

## 🏗️ Architektur

```
┌─────────────┐
│   User      │
└─────┬───────┘
      │
      v
┌─────────────────────────────────────┐
│   ChatGPT (Custom GPT)              │
│   - Instructions: GPT_INSTRUCTIONS  │
│   - Action: jasswikiQuery           │
└─────┬───────────────────────────────┘
      │ HTTPS POST
      v
┌─────────────────────────────────────┐
│   Firebase Function                 │
│   - jasswikiQuery Endpoint          │
│   - Scoring Policy (0.85, margin)   │
└─────┬───────────────────────────────┘
      │ Embedding (Gemini 768D)
      v
┌─────────────────────────────────────┐
│   Pinecone Vector DB                │
│   - Index: jasswiki                 │
│   - Namespaces: articles, faqs      │
│   - Dimension: 768                  │
│   - Metric: Cosine                  │
└─────────────────────────────────────┘
```

---

## 🔄 Datenfluss

### 1. Ingestion (Einmalig / bei Updates)

```
JSONL Files
  ↓
Article/FAQ Mapper
  ├─ Tags → Keywords + Categories
  ├─ Body → Text (normalisiert)
  └─ ID → Canonical URL
  ↓
Embedding Service (Gemini)
  ↓
Validation (Pinecone Limits)
  ↓
Pinecone Upsert (Batch)
```

### 2. Query (User Request)

```
User Question → ChatGPT
  ↓
jasswikiQuery(query, filters?)
  ↓
Embedding (Gemini 768D)
  ↓
Pinecone Query (articles + faqs)
  ↓
Scoring Policy:
  ├─ minScore ≥ 0.85
  ├─ margin ≥ 0.03
  └─ Varianten-Konsistenz
  ↓
Filter (Category, Variant)
  ↓
Response (results + metadata)
  ↓
ChatGPT formatiert Antwort mit Quelle
```

---

## 🔑 Kern-Komponenten

### 1. JSONL Mapper

**Artikel** (`article-mapper.ts`):
- Body-Normalisierung (Header-Präfixe entfernen)
- Tags → Keywords + Category-Hierarchie
- Importance & Difficulty (heuristisch)
- Canonical URL-Generierung

**FAQs** (`faq-mapper.ts`):
- Question + Answer → ein Chunk
- Referenz zu Haupt-Artikel (`article_id`)
- Question in Metadata (besseres Matching)

### 2. Embedding Service

- **Model**: Google Gemini `embedding-001`
- **Dimension**: 768
- **Cache**: In-Memory für Performance
- **Rate Limiting**: 10/Batch, 200ms Delay

### 3. Firebase Function

**Endpoint**: `POST /jasswikiQuery`

**Features**:
- ✅ CORS-enabled (public)
- ✅ Dual-Namespace Query (articles + faqs)
- ✅ Scoring Policy (minScore, margin, Varianten)
- ✅ Category/Variant Filtering
- ✅ Rejected Reasons (für GPT-Rückfragen)

**Konfiguration**:
- Memory: 512MiB
- Timeout: 60s
- Secrets: PINECONE_API_KEY, GEMINI_API_KEY

### 4. Scoring Policy

**Ziel**: Null Halluzinationen

**Strategie**:
1. **minScore = 0.85**: Nur hochrelevante Treffer
2. **margin ≥ 0.03**: Top-Treffer muss eindeutig sein
3. **Varianten-Konsistenz**: Keine widersprüchlichen Regeln
4. **Rejected Reasons**: GPT fragt nach bei niedrigem Confidence

**Effekt**:
- Bei unklaren Queries → GPT bittet um Präzisierung
- Verhindert falsche/erfundene Antworten

---

## 📊 Daten

### Input (JSONL)

| File | Einträge | Durchschnitt | Typ |
|------|----------|--------------|-----|
| `jasswiki-articles.jsonl` | ~1800 | ~500 chars | Artikel |
| `jasswiki-faqs.jsonl` | ~200 | ~300 chars | Q&A |

### Pinecone

| Namespace | Vectors | Dimension | Metadata |
|-----------|---------|-----------|----------|
| articles | ~1800 | 768 | ~2-5 KB |
| faqs | ~200 | 768 | ~1-3 KB |

### Metadata-Felder

- **Core**: text, source, canonical_url
- **Categories**: category_main, category_sub
- **Semantic**: keywords, situations
- **Quality**: importance, difficulty
- **Cross-Refs**: see_also, article_id
- **Optional**: variant, question

---

## 🚀 Setup & Betrieb

### Quick-Start (automatisiert)

```bash
# 1. Erstelle .env (von env.example)
# 2. Fülle PINECONE_API_KEY und GEMINI_API_KEY aus
# 3. Run:
./scripts/quickstart.sh
```

**Manuelle Schritte**:

```bash
# 1. Dependencies
npm install
cd functions && npm install && cd ..

# 2. Pinecone Index
npm run rag:setup

# 3. Ingestion
npm run rag:ingest

# 4. Tests
npm run rag:test

# 5. Deploy Functions
cd functions && npm run deploy && cd ..

# 6. ChatGPT Action konfigurieren
# → siehe DEPLOYMENT_CHECKLIST.md
```

---

## 🎯 Entscheidungen & Rationale

### 1. Gemini Embeddings (statt OpenAI)

**Pro**:
- ✅ Kompatibel mit existierendem jassguruchat
- ✅ 768D (vs. 1536D/3072D) → weniger Storage-Kosten
- ✅ Gute Qualität für deutschsprachige Texte
- ✅ Google-Ökosystem (falls später Vertex AI)

**Contra**:
- ⚠️ Vendor-Lock-in (aber migrierbar)

**Entscheidung**: Gemini 768D ✅

### 2. GPT Actions (statt Knowledge Upload)

**Pro**:
- ✅ Volle Kontrolle über Chunking & Retrieval
- ✅ Strikte Scoring Policy möglich
- ✅ Custom Filtering (Category, Variant)
- ✅ Rejected Reasons → Bessere UX

**Contra**:
- ⚠️ Aufwändiger Setup
- ⚠️ Externe Dependencies (Pinecone, Firebase)

**Entscheidung**: Actions ✅ (Qualität > Convenience)

### 3. Firebase Functions (statt Next.js API Routes)

**Pro**:
- ✅ Unabhängig von Next.js Deployment
- ✅ Secrets Management out-of-the-box
- ✅ Konfigurierbare Timeouts & Memory
- ✅ Bewährt in jassguruchat

**Contra**:
- ⚠️ Cold Start (~3-5s)

**Entscheidung**: Firebase Functions ✅

### 4. Namespace-Strategie (articles + faqs)

**Pro**:
- ✅ Logische Trennung (Content-Types)
- ✅ Getrennte Updates möglich
- ✅ Query beide Namespaces parallel

**Contra**:
- ⚠️ Komplexität (minimal)

**Entscheidung**: Dual-Namespace ✅

### 5. Chunking-Strategie

**Artikel**:
- Kurz (<800 chars) → 1 Chunk
- Lang (≥800 chars) → Paragraph-Split (geplant, aktuell 1 Chunk)

**FAQs**:
- Question + Answer → 1 Chunk

**Rationale**: 
- FAQs sind semantisch atomic
- Artikel sind meist kurz genug
- Bei Bedarf: Paragraph-Split in article-mapper aktivieren

---

## 📈 Performance & Kosten

### Latenz

| Phase | Warm | Cold |
|-------|------|------|
| Embedding | ~200ms | ~500ms |
| Pinecone Query | ~300ms | ~300ms |
| Function Total | ~500ms | ~3-5s |

### Kosten (Schätzung, 1K Queries/Monat)

| Service | Kosten |
|---------|--------|
| Gemini Embeddings | ~$0.10 |
| Pinecone (Serverless) | ~$0.50 |
| Firebase Functions | Free Tier |
| **Total** | **~$1-2/Monat** |

Bei 10K Queries/Monat: ~$5-10/Monat

---

## ✅ Tests & Validierung

### Automatisierte Tests

1. **Pinecone Setup** (`npm run rag:setup`)
   - Index-Erstellung
   - Namespace-Verfügbarkeit

2. **Ingestion** (`npm run rag:ingest`)
   - JSONL-Parsing
   - Embedding-Generierung
   - Validation (Limits)
   - Batch-Upload

3. **Query Tests** (`npm run rag:test`)
   - 5 Test-Queries (einfach → komplex)
   - Scoring Policy
   - Margin-Check
   - Rejection-Handling

### Manuelle E2E-Tests (mit GPT)

**Checkliste** (siehe `DEPLOYMENT_CHECKLIST.md`):
- [ ] Einfache Begriffsfrage
- [ ] Komplexe Regelabfrage
- [ ] Unklare Frage (Rejection)
- [ ] Varianten-spezifisch
- [ ] Follow-up (siehe auch)

---

## 🔧 Wartung

### Content-Updates

```bash
# 1. JSONL aktualisieren (chatgpt-gpt/*.jsonl)
# 2. Re-Ingest
npm run rag:ingest
```

**Hinweis**: Upsert überschreibt existierende IDs automatisch.

### Index-Rebuild (Breaking Changes)

```bash
# 1. Index löschen (Pinecone Console)
# 2. Neu erstellen
npm run rag:setup
npm run rag:ingest
```

### Monitoring

```bash
# Logs
firebase functions:log --only jasswikiQuery

# Pinecone Stats
# → https://app.pinecone.io
```

---

## 🐛 Known Issues & Future Work

### Current Limitations

1. **Chunking**: Lange Artikel (>2000 chars) werden als 1 Chunk gespeichert
   - **Fix**: Paragraph-Split in article-mapper aktivieren

2. **Cross-References**: IDs (z.B. `"expressions_stapel"`) werden nicht aufgelöst
   - **Workaround**: GPT schlägt Follow-ups vor

3. **Cold Start**: ~3-5s bei ersten Request
   - **Mitigation**: Keep-Warm Cron-Job (optional)

### Future Enhancements

- [ ] **Paragraph-Chunking** für lange Artikel
- [ ] **Hybrid Search** (Keyword + Semantic)
- [ ] **User-Feedback Loop** (Thumbs up/down)
- [ ] **Analytics Dashboard** (Query-Patterns, Top-Fragen)
- [ ] **Multi-Language** (en, fr, it) – falls gewünscht
- [ ] **Streaming Responses** (für lange Antworten)

---

## 📚 Dokumentation

| Datei | Zweck |
|-------|-------|
| `RAG_SETUP.md` | Setup, Betrieb, Troubleshooting |
| `DEPLOYMENT_CHECKLIST.md` | Deployment Guide |
| `GPT_INSTRUCTIONS.md` | ChatGPT Instructions |
| `IMPLEMENTATION_SUMMARY.md` | Diese Übersicht |
| `openapi-schema.yaml` | API-Schema für GPT Action |

---

## 🎉 Zusammenfassung

**Status**: ✅ **Implementation Complete**

**Deliverables**:
1. ✅ Pinecone Index Setup Script
2. ✅ JSONL → Pinecone Mapper (Articles + FAQs)
3. ✅ Ingestion Workflow mit Gemini Embeddings
4. ✅ Firebase Function RAG Endpoint
5. ✅ Scoring Policy (minScore=0.85, margin≥0.03)
6. ✅ OpenAPI Schema für GPT Action
7. ✅ Test Scripts & Quick-Start
8. ✅ Vollständige Dokumentation

**Nächste Schritte**:
1. Secrets konfigurieren (`firebase functions:secrets:set`)
2. Functions deployen (`cd functions && npm run deploy`)
3. ChatGPT Action einrichten (siehe `DEPLOYMENT_CHECKLIST.md`)
4. E2E-Tests durchführen
5. Go-Live! 🚀

---

**Erstellt**: November 2025  
**Version**: 1.0.0  
**Maintainer**: JassWiki Team

