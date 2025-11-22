# 🔑 Google Cloud API Key Setup

## Warum Google Cloud API Key statt Maker Suite?

- ✅ **Bessere Integration** mit Firebase/Google Cloud
- ✅ **Service Account** Support möglich
- ✅ **Mehr Kontrolle** über Permissions
- ✅ **Production-ready** für Firebase Functions

---

## Schritt 1: API Key in Google Cloud Console erstellen

1. **Google Cloud Console öffnen**:
   - https://console.cloud.google.com
   - Projekt: `jassguru` (oder Ihr Firebase-Projekt)

2. **Navigate zu APIs & Services → Credentials**:
   - Link: https://console.cloud.google.com/apis/credentials

3. **Create Credentials → API Key**:
   - Klicken Sie auf "CREATE CREDENTIALS" → "API key"
   - Ein neuer API Key wird erstellt

4. **API Key einschränken** (EMPFOHLEN):
   - Klicken Sie auf den erstellten API Key
   - Unter "API restrictions":
     - ✅ "Restrict key" auswählen
     - ✅ "Generative Language API" auswählen
   - Unter "Application restrictions" (optional):
     - "HTTP referrers" für Firebase Functions URL

5. **API Key kopieren**

---

## Schritt 2: Secret in Firebase setzen

```bash
firebase functions:secrets:set GEMINI_API_KEY

# Wenn gefragt, den neuen Google Cloud API Key einfügen
```

---

## Schritt 3: Function neu deployen

```bash
cd functions
npm run deploy
```

---

## Alternative: Service Account (für Production)

Falls Sie noch mehr Kontrolle möchten:

1. **Service Account erstellen**:
   - Google Cloud Console → IAM & Admin → Service Accounts
   - Erstellen Sie einen neuen Service Account für "Vertex AI"

2. **Vertex AI User Role** zuweisen:
   - Role: `roles/aiplatform.user`

3. **Service Account Key** herunterladen:
   - Als JSON

4. **Als Firebase Secret** setzen:
   ```bash
   firebase functions:secrets:set VERTEX_AI_SERVICE_ACCOUNT_KEY
   # JSON-Inhalt einfügen
   ```

5. **Code anpassen** für Vertex AI statt Generative AI

---

## Aktuelle Konfiguration

Die Function verwendet bereits `defineSecret('GEMINI_API_KEY')` - Sie müssen nur den Secret neu setzen mit einem Google Cloud API Key.

**Test nach Setup**:
```bash
curl -X POST https://jasswikiquery-sktdhifofa-uc.a.run.app \
  -H "Content-Type: application/json" \
  -d '{"query":"Test"}'
```

