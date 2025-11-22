# 🚀 Firebase Functions Deployment - Schritt für Schritt

## ✅ Bereits erledigt:
- ✅ Pinecone Index erstellt (`jasswiki`)
- ✅ Daten ingestiert (244 Artikel + 814 FAQs)
- ✅ Tests erfolgreich
- ✅ Functions Dependencies installiert

---

## Schritt 1: Firebase Secrets setzen

**Führen Sie diese Befehle aus** (Sie werden nach dem Wert gefragt):

```bash
# Secret 1: PINECONE_API_KEY
firebase functions:secrets:set PINECONE_API_KEY

# Wenn gefragt: Den Wert aus .env kopieren:
# ***REMOVED_PINECONE_KEY***

# Secret 2: GEMINI_API_KEY
firebase functions:secrets:set GEMINI_API_KEY

# Wenn gefragt: Den Wert aus .env kopieren:
# ***REMOVED_GEMINI_KEY***
```

**Alternative (wenn Sie die Keys direkt einfügen möchten):**

```bash
# Öffnen Sie die .env Datei und kopieren Sie die Werte
cat .env | grep PINECONE_API_KEY
cat .env | grep GEMINI_API_KEY
```

---

## Schritt 2: Functions bauen & deployen

```bash
cd functions
npm run build
npm run deploy
cd ..
```

**Erwartete Ausgabe:**
```
✔  functions[jasswikiQuery(us-central1)] Successful create operation.
Function URL: https://us-central1-jasswiki.cloudfunctions.net/jasswikiQuery
```

---

## Schritt 3: Endpoint testen

```bash
curl -X POST \
  https://us-central1-jasswiki.cloudfunctions.net/jasswikiQuery \
  -H "Content-Type: application/json" \
  -d '{"query":"Was bedeutet Abheben beim Jassen?"}'
```

**Erwartete Response:**
```json
{
  "results": [...],
  "metadata": {...}
}
```

---

## ✅ Nächster Schritt nach Deployment

1. **OpenAPI Schema importieren** in ChatGPT
2. **GPT Instructions** einfügen (aus `GPT_INSTRUCTIONS.md`)
3. **E2E-Tests** mit GPT durchführen

Siehe: `DEPLOYMENT_CHECKLIST.md` (Punkt 7-10)

---

**Bereit? Starten Sie mit Schritt 1! 🚀**

