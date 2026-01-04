# 🔒 Security Audit: JassWiki

**Datum:** 2025-12-02  
**Status:** ✅ Überwiegend sicher, einige Verbesserungen empfohlen

---

## ✅ Was bereits sicher ist

### 1. Secrets Management
- ✅ API Keys (Pinecone, Gemini) werden als Firebase Secrets gespeichert
- ✅ Keine hardcodierten Keys im Code
- ✅ `.env` Dateien sind in `.gitignore`

### 2. Architektur
- ✅ Statisches Next.js Projekt (kein Firebase Client SDK im Frontend)
- ✅ Kein Firestore im Frontend → Keine Firestore Rules nötig
- ✅ Backend-Logik in Firebase Functions (serverseitig)

### 3. CORS
- ✅ CORS ist aktiviert für die Functions
- ⚠️ Aber: Keine Domain-Beschränkung (siehe Risiken)

---

## ⚠️ Risiken und Empfehlungen

### 🔴 HOCH: Rate Limiting für Firebase Functions

**Problem:**
- Functions `jasswikiQuery` und `ragitQuery` sind öffentlich aufrufbar
- Kein Rate Limiting → Jeder kann unbegrenzt Anfragen stellen
- **Kosten-Risiko:** Massive Function-Invocations + Gemini API Calls

**Aktueller Code:**
```typescript
export const jasswikiQuery = onRequest(
  {
    cors: true,
    region: 'europe-west1',
  },
  async (request, response) => {
    // Kein Rate Limiting!
  }
);
```

**Lösung:**
1. **Firebase App Check** für Functions (empfohlen)
2. **Rate Limiting in Function** (IP-basiert)
3. **Quotas in Google Cloud** (Fallback)

---

### 🟡 MITTEL: CORS Domain-Beschränkung

**Problem:**
- CORS erlaubt Anfragen von überall (`cors: true`)
- Jeder kann die Functions von jeder Domain aufrufen

**Aktueller Code:**
```typescript
cors: true,  // Erlaubt alle Domains
```

**Lösung:**
```typescript
cors: [
  'https://jasswiki.ch',
  'https://www.jasswiki.ch',
  'http://localhost:3000'
],
```

---

### 🟡 MITTEL: Function Authentication (Optional)

**Problem:**
- Functions sind komplett öffentlich
- Keine Authentifizierung nötig

**Lösung:**
- **Option 1:** App Check (verhindert Bots)
- **Option 2:** API Key in Request Header (einfach)
- **Option 3:** Firebase Auth Token (komplexer)

---

## 🛡️ Empfohlene Fixes

### Priorität 1: Rate Limiting

**Option A: Firebase App Check (Empfohlen)**
- Verhindert Bot-Angriffe
- Einfach zu implementieren
- Kostenlos

**Option B: IP-basiertes Rate Limiting**
- In Function implementieren
- Speichere IP + Timestamp in Firestore/Memory
- Blockiere bei zu vielen Requests

**Option C: Google Cloud Quotas**
- Setze Function Invocation Limits
- Verhindert Kosten-Explosion komplett

---

### Priorität 2: CORS Beschränkung

```typescript
export const jasswikiQuery = onRequest(
  {
    cors: [
      'https://jasswiki.ch',
      'https://www.jasswiki.ch',
      'http://localhost:3000'
    ],
    region: 'europe-west1',
  },
  // ...
);
```

---

### Priorität 3: Billing Alerts

- Google Cloud Console → Billing → Budgets & alerts
- Budget erstellen (z.B. 50 CHF/Monat)
- Alerts bei 50%, 90%, 100%

---

## 📊 Vergleich mit Kigate

| Feature | Kigate | JassWiki | Status |
|---------|--------|----------|--------|
| **Firestore im Frontend** | ✅ Ja | ❌ Nein | JassWiki sicherer |
| **App Check** | ✅ Aktiv | ❌ Nicht nötig | - |
| **API Key Restrictions** | ✅ Gesetzt | ❌ Nicht nötig | - |
| **Rate Limiting** | ⚠️ App Check | ❌ Fehlt | **JassWiki braucht Fix** |
| **CORS Beschränkung** | - | ❌ Fehlt | **JassWiki braucht Fix** |
| **Secrets Management** | ✅ Gut | ✅ Gut | Beide gut |

---

## 🎯 Action Items

### Sofort (Diese Woche):
- [ ] **Rate Limiting für Functions** implementieren (App Check oder IP-basiert)
- [ ] **CORS auf Domains beschränken**

### Später (Optional):
- [ ] Billing Alerts einrichten
- [ ] Function Quotas setzen
- [ ] Monitoring für Function-Invocations

---

## 💰 Kosten-Risiko

**Aktuell:**
- Functions: ~€0.40 pro 1 Million Invocations
- Gemini API: ~€0.001 pro Query
- **Risiko:** Bot könnte Millionen Queries auslösen → hohe Kosten

**Mit Fixes:**
- App Check stoppt 90% der Bot-Angriffe
- Quotas stoppen Kosten-Explosion komplett
- **Risiko:** Minimal

---

**Letzte Aktualisierung:** 2025-12-02

