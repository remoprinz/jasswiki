# JassWiki RAG Setup & Betrieb

Komplette Dokumentation für das JassWiki Retrieval-Augmented Generation (RAG) System.

---

## 📋 Übersicht

Das JassWiki RAG System ermöglicht semantische Suche über die gesamte Jass-Wissensdatenbank mit:

- **Embeddings**: Google Gemini `embedding-001` (768 Dimensionen)
- **Vector DB**: Pinecone (Serverless, Cosine Similarity)
- **Quality Policy**: Strikte Scoring-Schwellen (minScore=0.85, margin≥0.03)
- **API**: Firebase Functions (CORS-enabled, OpenAPI-kompatibel)
- **Integration**: ChatGPT Actions (kein Knowledge Upload!)

---

## 🚀 Erstmalige Einrichtung

### 1. Prerequisites

```bash
# Node.js 18+
node --version

# Firebase CLI
npm install -g firebase-tools
firebase login

# Dependencies installieren
cd /Users/remoprinz/Documents/Jassguru/jasswiki
npm install
cd functions && npm install && cd ..
```

### 2. Environment Variables

Erstelle `.env` im Root:

```bash
cp env.example .env
```

Fülle aus:

```bash
PINECONE_API_KEY=pc-xxx...
GEMINI_API_KEY=AIza...
FIREBASE_PROJECT_ID=jasswiki
BASE_URL=https://jasswiki.ch
```

**Wichtig**: Auch in Firebase Functions Secrets hinterlegen (siehe Schritt 6).

### 3. Pinecone Index erstellen

```bash
npm run rag:setup
```

Das erstellt:
- Index `jasswiki` (768D, cosine, serverless us-east-1)
- Namespaces: `articles`, `faqs`

### 4. JSONL-Daten ingestieren

```bash
npm run rag:ingest
```

Das lädt:
- `chatgpt-gpt/jasswiki-articles.jsonl` → Namespace `articles`
- `chatgpt-gpt/jasswiki-faqs.jsonl` → Namespace `faqs`

Prozess:
1. JSONL parsen
2. Mapping (Tags → Categories, Body-Normalisierung, etc.)
3. Embedding-Generierung (Gemini 768D)
4. Validierung (Pinecone Limits)
5. Batch-Upload (100er Batches)

**Dauer**: Ca. 5-10 Minuten für ~2000 Dokumente.

### 5. Test lokal

```bash
npm run rag:test
```

Führt Test-Queries gegen Pinecone aus und zeigt Scores, Filtering, etc.

### 6. Firebase Functions deployen

```bash
# Secrets konfigurieren
firebase functions:secrets:set PINECONE_API_KEY
firebase functions:secrets:set GEMINI_API_KEY

# Functions deployen
cd functions
npm run deploy
cd ..
```

**URL**: `https://us-central1-jasswiki.cloudfunctions.net/jasswikiQuery`

### 7. ChatGPT Action konfigurieren

1. Gehe zu ChatGPT → Create GPT → Actions
2. Importiere `openapi-schema.yaml`
3. Server-URL: `https://us-central1-jasswiki.cloudfunctions.net`
4. Authentication: Keine (CORS-enabled, public)
5. **Instructions** (Beispiel):

```
Du bist JassWiki-Experte. Nutze die jasswikiQuery Action für alle Jass-Fragen.

WICHTIG:
- Wenn "rejected_reason" in Response → Nutzer um Präzisierung bitten
- IMMER canonical_url in Antwort zitieren (als Quelle)
- Bei "siehe auch" → Follow-up Fragen vorschlagen
- Gib NIEMALS eigenes Wissen aus, nur API-Antworten!

Beispiel:
User: "Was bedeutet Abheben?"
1. Call jasswikiQuery({"query": "Was bedeutet Abheben beim Jassen?"})
2. Antwort: "Abheben bedeutet... [Text aus result]. Quelle: [canonical_url]"
3. Siehe auch: "Möchten Sie mehr über [see_also] erfahren?"
```

---

## 📊 Datenstruktur

### JSONL-Input

**Articles** (`jasswiki-articles.jsonl`):
```json
{
  "id": "abheben",
  "title": "Abheben",
  "variant": null,
  "tags": ["Regeln", "Kartenverteilung", "Abheben"],
  "synonyms": ["Ablupfen"],
  "see_also": ["ablupf", "stapel"],
  "language": "de-CH",
  "body": "Titel: Abheben\nDefinition:\n..."
}
```

**FAQs** (`jasswiki-faqs.jsonl`):
```json
{
  "id": "faq_abheben_1",
  "article_id": "abheben",
  "article_title": "Abheben",
  "tags": ["Regeln", "Kartenverteilung"],
  "language": "de-CH",
  "question": "Was bedeutet Abheben beim Jassen?",
  "answer": "Abheben bedeutet..."
}
```

### Pinecone Metadata

```typescript
{
  text: string;                    // Normalized body
  category_main: JassCategory;     // z.B. "Regeln"
  category_sub: string;            // z.B. "kartenverteilung"
  keywords: string[];              // Tags ohne Categories
  situations: JassSituation[];     // z.B. ["LEARNING", "PLAYING"]
  importance: number;              // 0.0-1.0
  difficulty: number;              // 1-3
  source: string;                  // Titel
  canonical_url: string;           // https://jasswiki.ch/...
  see_also: string[];              // Cross-References
  article_id?: string;             // Nur für FAQs
  variant?: string;                // z.B. "Schieber"
  language: string;                // "de-CH"
  content_type: 'article' | 'faq';
  question?: string;               // Nur für FAQs
}
```

---

## 🔍 API Usage

### Request

```bash
curl -X POST \
  https://us-central1-jasswiki.cloudfunctions.net/jasswikiQuery \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Was bedeutet Abheben beim Jassen?",
    "topK": 5,
    "filters": {
      "category": "Regeln",
      "minScore": 0.85
    }
  }'
```

### Response (Success)

```json
{
  "results": [
    {
      "id": "article_abheben",
      "text": "Der Spieler rechts vom Kartengeber kann...",
      "score": 0.92,
      "title": "Abheben",
      "canonical_url": "https://jasswiki.ch/regeln/kartenverteilung/abheben/",
      "category": {
        "main": "Regeln",
        "sub": "kartenverteilung"
      },
      "see_also": ["ablupf", "stapel"]
    }
  ],
  "metadata": {
    "query": "Was bedeutet Abheben beim Jassen?",
    "topK": 5,
    "threshold": 0.85,
    "margin": 0.03,
    "total_matches": 12,
    "filtered_count": 3
  }
}
```

### Response (Rejected)

```json
{
  "results": [],
  "metadata": {
    "query": "xyz",
    "topK": 5,
    "threshold": 0.85,
    "margin": 0.03,
    "total_matches": 50,
    "filtered_count": 0,
    "rejected_reason": "Keine Treffer über Schwellwert (0.85)"
  }
}
```

---

## 🎯 Scoring Policy

### 1. minScore Threshold

- **Default**: 0.85
- **Bedeutung**: Nur Treffer mit Score ≥ 0.85 werden berücksichtigt
- **Rationale**: Verhindert irrelevante Ergebnisse und Halluzinationen

### 2. Margin Check

- **Threshold**: 0.03
- **Bedeutung**: Top-Treffer muss ≥0.03 besser sein als zweiter Treffer
- **Rationale**: Verhindert Antworten bei uneindeutigen Matches

### 3. Varianten-Konsistenz

- **Check**: Alle Top-Treffer müssen gleiche Variante haben (oder `null`)
- **Rationale**: Keine widersprüchlichen Regel-Antworten

### 4. Rejected Reasons

Wenn `rejected_reason` gesetzt → GPT soll Nutzer um Präzisierung bitten:

- **"Keine Treffer über Schwellwert"** → "Ihre Frage ist zu unspezifisch, können Sie sie präzisieren?"
- **"Top-Treffer nicht eindeutig"** → "Es gibt mehrere mögliche Antworten. Meinen Sie [A] oder [B]?"
- **"Inkonsistente Varianten"** → "Für welche Variante möchten Sie die Regel wissen? (Schieber, Differenzler, ...)"

---

## 🔧 Wartung & Updates

### Content-Updates (JSONL geändert)

```bash
# 1. JSONL-Dateien aktualisieren (chatgpt-gpt/*.jsonl)
# 2. Re-Ingest
npm run rag:ingest
```

**Wichtig**: Pinecone Upsert überschreibt existierende IDs automatisch.

### Index neu erstellen (Breaking Changes)

```bash
# 1. Index löschen (Pinecone Console)
# 2. Neu erstellen
npm run rag:setup
npm run rag:ingest
```

### Functions neu deployen

```bash
cd functions
npm run build
npm run deploy
cd ..
```

### Monitoring

```bash
# Logs anzeigen
firebase functions:log --only jasswikiQuery

# Limit: 100 Einträge
firebase functions:log --only jasswikiQuery --limit 100
```

**Produktiv**: Firebase Console → Functions → jasswikiQuery → Logs

---

## 📈 Performance

### Ingestion

- **Dauer**: ~5-10 Min für 2000 Dokumente
- **Rate Limiting**: 10 Embeddings/Batch, 200ms Delay
- **Batch Size**: 100 Dokumente pro Pinecone Upsert

### Query

- **Cold Start**: ~3-5s (erster Request nach Deploy)
- **Warm**: ~500-800ms
- **Timeout**: 60s (konfiguriert)

### Kosten (Schätzung)

**Gemini Embeddings**:
- 2000 Dokumente @ $0.00002/1K chars ≈ $0.10
- Queries: ~$0.0001/Query

**Pinecone (Serverless)**:
- Storage: 2000 vecs @ 768D ≈ 6MB ≈ $0.30/Monat
- Queries: ~$0.001/1000 Queries

**Firebase Functions**:
- 10K Requests/Monat: Free Tier
- Darüber: $0.40/Million

**Total**: ~$1-5/Monat (niedriger Traffic)

---

## 🐛 Troubleshooting

### "PINECONE_API_KEY nicht konfiguriert"

```bash
# Lokal
echo "PINECONE_API_KEY=..." >> .env

# Firebase Functions
firebase functions:secrets:set PINECONE_API_KEY
```

### "Embedding Model konnte nicht initialisiert werden"

```bash
# Prüfe GEMINI_API_KEY
echo $GEMINI_API_KEY

# Neu setzen
export GEMINI_API_KEY=AIza...
```

### "Index 'jasswiki' nicht gefunden"

```bash
# Index erstellen
npm run rag:setup
```

### "Metadata too large"

→ Artikel-Body zu lang (>40KB nach JSON)

**Fix**: Chunking aktivieren (in `article-mapper.ts`)

### "No matches over threshold"

→ Query zu unspezifisch oder Daten nicht ingestiert

**Debug**:
```bash
npm run rag:test  # Zeigt Top-Scores
```

---

## 📚 Weitere Ressourcen

- **Pinecone Docs**: https://docs.pinecone.io/
- **Gemini Embeddings**: https://ai.google.dev/tutorials/embeddings
- **Firebase Functions**: https://firebase.google.com/docs/functions
- **OpenAI GPT Actions**: https://platform.openai.com/docs/actions

---

## 🎯 Nächste Schritte nach Setup

1. ✅ **Pinecone Index erstellt** → `npm run rag:setup`
2. ✅ **JSONL ingestiert** → `npm run rag:ingest`
3. ✅ **Tests durchgeführt** → `npm run rag:test`
4. ✅ **Functions deployed** → `cd functions && npm run deploy`
5. ⏳ **ChatGPT Action konfiguriert** → siehe Schritt 7
6. ⏳ **E2E-Tests mit GPT** → Test-Konversationen führen
7. ⏳ **Monitoring aufsetzen** → Firebase Console Alerts

---

**Erstellt**: November 2025  
**Maintainer**: JassWiki Team  
**Version**: 1.0.0

