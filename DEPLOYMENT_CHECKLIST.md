# JassWiki RAG Deployment Checkliste

Schritt-für-Schritt Guide für den Production-Rollout.

---

## ✅ Pre-Deployment

### 1. Environment Setup

- [ ] `.env` Datei erstellt (von `env.example`)
- [ ] `PINECONE_API_KEY` gesetzt
- [ ] `GEMINI_API_KEY` gesetzt
- [ ] `FIREBASE_PROJECT_ID` korrekt
- [ ] Dependencies installiert (`npm install` + `cd functions && npm install`)

### 2. Pinecone Index

- [ ] Index `jasswiki` erstellt (`npm run rag:setup`)
- [ ] Index Status: Ready ✅
- [ ] Namespaces: `articles`, `faqs`

### 3. Data Ingestion

- [ ] JSONL-Dateien vorhanden:
  - [ ] `chatgpt-gpt/jasswiki-articles.jsonl`
  - [ ] `chatgpt-gpt/jasswiki-faqs.jsonl`
- [ ] Ingestion durchgeführt (`npm run rag:ingest`)
- [ ] Alle Artikel hochgeladen (check logs)
- [ ] Alle FAQs hochgeladen (check logs)
- [ ] Keine kritischen Fehler in Stats

### 4. Local Tests

- [ ] RAG Tests durchgeführt (`npm run rag:test`)
- [ ] Mindestens 3/5 Test-Queries erfolgreich
- [ ] Scoring Policy funktioniert (rejected bei unklaren Queries)
- [ ] Canonical URLs korrekt generiert

---

## 🚀 Deployment

### 5. Firebase Functions

- [ ] Firebase CLI installiert (`firebase --version`)
- [ ] Firebase Login (`firebase login`)
- [ ] Secrets konfiguriert:
  ```bash
  firebase functions:secrets:set PINECONE_API_KEY
  firebase functions:secrets:set GEMINI_API_KEY
  ```
- [ ] Functions gebaut (`cd functions && npm run build`)
- [ ] Functions deployed (`npm run deploy`)
- [ ] Deployment erfolgreich (check URL)

### 6. Endpoint Validation

- [ ] Function URL verfügbar: `https://us-central1-jasswiki.cloudfunctions.net/jasswikiQuery`
- [ ] Test-Request funktioniert:
  ```bash
  curl -X POST https://us-central1-jasswiki.cloudfunctions.net/jasswikiQuery \
    -H "Content-Type: application/json" \
    -d '{"query":"Was bedeutet Abheben beim Jassen?"}'
  ```
- [ ] Response enthält `results` und `metadata`
- [ ] Canonical URLs korrekt

---

## 🤖 ChatGPT Integration

### 7. GPT Action Setup

- [ ] ChatGPT → Create GPT
- [ ] Name: "JassWiki Experte" (oder ähnlich)
- [ ] Actions → Import `openapi-schema.yaml`
- [ ] Server URL: `https://us-central1-jasswiki.cloudfunctions.net`
- [ ] Authentication: None (CORS enabled)
- [ ] Schema validiert (keine Errors)

### 8. GPT Instructions

Kopiere folgende Instructions:

```
Du bist der offizielle JassWiki-Experte. Deine Aufgabe ist es, Nutzern präzise und verlässliche Informationen über das Schweizer Kartenspiel Jass zu geben.

WICHTIGSTE REGELN:
1. Nutze IMMER die jasswikiQuery Action für ALLE Jass-Fragen
2. NIEMALS eigenes Wissen verwenden – nur API-Antworten!
3. IMMER die canonical_url als Quelle zitieren
4. Bei "rejected_reason" → Nutzer um Präzisierung bitten

WORKFLOW:
1. User stellt Frage
2. Call jasswikiQuery mit natürlichsprachiger Query
3. Wenn results.length > 0:
   - Antwort basierend auf result.text formulieren
   - Quelle angeben: "Quelle: [canonical_url]"
   - Bei see_also: Follow-up vorschlagen
4. Wenn results.length === 0 UND rejected_reason vorhanden:
   - "Ihre Frage ist nicht eindeutig genug. [rejected_reason]"
   - Konkrete Rückfrage stellen
   
BEISPIEL-INTERAKTION:
User: "Was bedeutet Abheben?"
1. jasswikiQuery({"query": "Was bedeutet Abheben beim Jassen?"})
2. Response: { results: [{ text: "...", canonical_url: "..." }] }
3. Antwort: "Abheben (oder Ablupfen) bedeutet, dass der Spieler rechts vom Kartengeber die Karten teilen kann. Dies ist optional. Wenn abgehoben wird, wird der untere Stapel auf den oberen gelegt. Quelle: https://jasswiki.ch/regeln/kartenverteilung/abheben/"

REJECTED REASON HANDLING:
- "Keine Treffer über Schwellwert" → "Ihre Frage ist zu unspezifisch. Können Sie sie präzisieren? Zum Beispiel: Geht es um Regeln, Taktiken oder einen bestimmten Begriff?"
- "Top-Treffer nicht eindeutig" → "Es gibt mehrere mögliche Antworten. Meinen Sie...?"
- "Inkonsistente Varianten" → "Für welche Jass-Variante möchten Sie die Regel wissen? (z.B. Schieber, Differenzler, Coiffeur)"

TONALITÄT:
- Freundlich, klar, präzise
- Schweizerdeutsche Begriffe verwenden (wie in API)
- Bei Unsicherheit: Nachfragen statt raten
```

### 9. E2E Tests mit GPT

Test-Fragen für Qualitätssicherung:

- [ ] **Einfache Begriffsfrage**: "Was bedeutet Abheben?"
  - Erwartung: Klare Antwort mit Quelle
- [ ] **Komplexe Regel**: "Wie funktioniert die Punktezählung beim Schieber?"
  - Erwartung: Detaillierte Antwort, eventuell mehrere Treffer
- [ ] **Unklare Frage**: "Jass"
  - Erwartung: Rückfrage zur Präzisierung
- [ ] **Varianten-spezifisch**: "Wie spielt man Coiffeur?"
  - Erwartung: Varianten-spezifische Antwort
- [ ] **Follow-up**: "Siehe auch" wird erwähnt → "Was ist [Begriff]?"
  - Erwartung: GPT schlägt Follow-up vor und kann ihn beantworten

### 10. Quality Checks

- [ ] Keine Halluzinationen (GPT erfindet keine Regeln)
- [ ] Alle Antworten haben Quellenangabe
- [ ] Rejected Reasons führen zu Rückfragen
- [ ] Follow-ups funktionieren
- [ ] Tonalität passt (Schweizerdeutsche Begriffe)

---

## 📊 Monitoring

### 11. Firebase Console

- [ ] Logs funktionieren: `firebase functions:log --only jasswikiQuery`
- [ ] Keine Errors in letzten 10 Requests
- [ ] Response Times < 2s (Warm)

### 12. Pinecone Console

- [ ] Index Statistics: ~2000 Vectors
- [ ] Namespaces: articles (~1800), faqs (~200)
- [ ] Query Latency < 500ms

### 13. Alerts (Optional)

- [ ] Firebase Alert bei >5% Error Rate
- [ ] Pinecone Alert bei hoher Latenz
- [ ] Email-Benachrichtigungen konfiguriert

---

## 🎉 Go-Live

### 14. Final Checks

- [ ] Alle obigen Punkte ✅
- [ ] GPT funktioniert in Test-Konversationen
- [ ] Dokumentation aktuell (`RAG_SETUP.md`)
- [ ] Team informiert

### 15. Rollout

- [ ] GPT auf "Public" setzen (oder "Anyone with link")
- [ ] Link teilen: `https://chat.openai.com/g/...`
- [ ] Erste User-Feedbacks sammeln
- [ ] Monitoring aktiv (erste 24h)

---

## 🔧 Post-Deployment

### 16. Iteration

- [ ] User-Feedback auswerten
- [ ] Problematische Queries identifizieren
- [ ] JSONL erweitern (falls nötig)
- [ ] Re-Ingest: `npm run rag:ingest`
- [ ] GPT Instructions verfeinern

### 17. Maintenance

- [ ] Wöchentliches Log-Review
- [ ] Monatliche Kosten-Prüfung
- [ ] Quarterly: Index-Cleanup (alte Versionen)

---

## 📞 Support

Bei Problemen:
1. Check Firebase Logs: `firebase functions:log`
2. Check Pinecone Console: https://app.pinecone.io
3. Local Tests: `npm run rag:test`
4. Siehe `RAG_SETUP.md` → Troubleshooting

---

**Status**: ⏳ Pending  
**Deployment Date**: TBD  
**Deployed by**: [Name]

