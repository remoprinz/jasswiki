# 🔧 ChatGPT Custom GPT Action auf api.jasswiki.ch umstellen

## 📍 Wo ändern?

### Schritt 1: ChatGPT Custom GPT öffnen

1. Gehe zu: **https://chat.openai.com/gpts/editor**
2. Wähle dein **JassWiki Custom GPT** aus (oder öffne es)
3. Klicke auf **"Configure"** Tab (oben im Editor)

---

### Schritt 2: Actions-Bereich finden

1. Scrolle nach unten im "Configure" Tab
2. Suche nach dem Abschnitt **"Actions"** (oder "Aktionen")
3. Du solltest eine Action sehen: **"jasswikiQuery"** (oder ähnlicher Name)

---

### Schritt 3: Action bearbeiten

1. **Klicke auf die Action** "jasswikiQuery" (oder auf den Bearbeiten-Button)
2. Es öffnet sich ein Dialog/Formular für die Action-Konfiguration

---

### Schritt 4: Endpoint ändern

**Suche nach diesen Feldern:**

#### Option A: "Server URL" oder "Base URL"
- **Aktueller Wert:** `https://jasswikiquery-sktdhifofa-uc.a.run.app`
- **Neuer Wert:** `https://api.jasswiki.ch`
- **Ändern:** Ersetze die komplette URL

#### Option B: "Endpoint" oder "URL"
- **Aktueller Wert:** `https://jasswikiquery-sktdhifofa-uc.a.run.app/jasswikiQuery`
- **Neuer Wert:** `https://api.jasswiki.ch/jasswikiQuery`
- **ODER:** Wenn getrennt:
  - **Server URL:** `https://api.jasswiki.ch`
  - **Path:** `/jasswikiQuery`

---

### Schritt 5: Schema prüfen (wichtig!)

**Stelle sicher, dass folgendes gleich bleibt:**

1. **Method:** `POST`
2. **Request Body Schema:**
   ```json
   {
     "query": "string"
   }
   ```
3. **Response Schema:**
   ```json
   {
     "results": [
       {
         "text": "string",
         "score": "number",
         "canonical_url": "string",
         "see_also": ["string"]
       }
     ]
   }
   ```

**⚠️ Wichtig:** Nur die URL ändern, nicht das Schema!

---

### Schritt 6: Speichern

1. **Klicke auf "Save"** oder "Speichern" (unten rechts)
2. **Warte auf Bestätigung:** "Action saved" oder ähnlich

---

## ✅ Testen

### Test 1: In ChatGPT

1. Öffne dein **JassWiki Custom GPT** (Chat-Interface)
2. Stelle eine Test-Frage:
   ```
   Was ist Abheben?
   ```
3. **Prüfe:**
   - ✅ API wird aufgerufen (sieht man im Chat)
   - ✅ Antwort kommt von JassWiki
   - ✅ Keine Fehler

### Test 2: API direkt testen (optional)

**Terminal:**
```bash
curl -X POST https://api.jasswiki.ch/jasswikiQuery \
  -H "Content-Type: application/json" \
  -d '{"query": "Was ist Abheben?"}'
```

**Sollte JSON zurückgeben:**
```json
{
  "results": [{
    "text": "...",
    "score": 0.92,
    ...
  }]
}
```

---

## 🔍 Troubleshooting

### Problem: "Action nicht gefunden"

**Lösung:**
- Prüfe, ob du im **"Configure"** Tab bist (nicht "Create")
- Actions sind manchmal ganz unten im Tab
- Falls nicht vorhanden: Action neu erstellen (siehe unten)

### Problem: "Endpoint-Feld nicht sichtbar"

**Lösung:**
- Klicke auf die Action, um sie zu erweitern/bearbeiten
- Manchmal muss man auf "Edit" oder den Namen klicken
- Es gibt verschiedene UI-Varianten je nach ChatGPT-Version

### Problem: "Action schlägt fehl nach Änderung"

**Lösung:**
1. Prüfe: Ist `https://api.jasswiki.ch` erreichbar? (Browser öffnen)
2. Prüfe: DNS-Propagation abgeschlossen? (kann 5-30 Min dauern)
3. Prüfe: URL korrekt geschrieben? (`https://api.jasswiki.ch` mit https!)
4. Prüfe: Path korrekt? (`/jasswikiQuery` am Ende, falls nötig)

### Problem: "Schema fehlt"

**Lösung:**
- Falls das Schema/OpenAPI-Schema fehlt, muss es neu eingegeben werden
- Oder: Action komplett neu erstellen (siehe unten)

---

## 🆕 Falls Action neu erstellt werden muss

### Schritt 1: Action hinzufügen

1. Im "Configure" Tab
2. Scrolle zu **"Actions"**
3. Klicke **"Add Action"** oder **"Create Action"**

### Schritt 2: OpenAPI Schema eingeben

**Falls ChatGPT ein Schema-Feld hat, füge ein:**

```yaml
openapi: 3.0.0
info:
  title: JassWiki Query API
  version: 1.0.0
servers:
  - url: https://api.jasswiki.ch
paths:
  /jasswikiQuery:
    post:
      summary: Query JassWiki
      operationId: jasswikiQuery
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                query:
                  type: string
                  description: The search query
      responses:
        '200':
          description: Successful response
          content:
            application/json:
              schema:
                type: object
                properties:
                  results:
                    type: array
                    items:
                      type: object
                      properties:
                        text:
                          type: string
                        score:
                          type: number
                        canonical_url:
                          type: string
                        see_also:
                          type: array
                          items:
                            type: string
```

**Oder:** Falls ChatGPT ein einfacheres Formular hat:
- **Server URL:** `https://api.jasswiki.ch`
- **Path:** `/jasswikiQuery`
- **Method:** `POST`
- **Request:** `{"query": "string"}`
- **Response:** JSON mit `results` Array

---

## 📋 Checkliste

- [ ] ChatGPT Custom GPT geöffnet (https://chat.openai.com/gpts/editor)
- [ ] "Configure" Tab geöffnet
- [ ] Actions-Bereich gefunden
- [ ] Action "jasswikiQuery" gefunden/geöffnet
- [ ] Endpoint geändert: `https://jasswikiquery-sktdhifofa-uc.a.run.app` → `https://api.jasswiki.ch`
- [ ] Path geprüft: `/jasswikiQuery` (falls getrennt)
- [ ] Schema unverändert (Method: POST, Request/Response gleich)
- [ ] Gespeichert
- [ ] Test-Frage in ChatGPT gestellt (funktioniert!)

---

## 🎯 Zusammenfassung

**Alter Endpoint:**
```
https://jasswikiquery-sktdhifofa-uc.a.run.app
```

**Neuer Endpoint:**
```
https://api.jasswiki.ch
```

**Wo ändern:**
- ChatGPT Custom GPT → Configure Tab → Actions → jasswikiQuery → Endpoint/URL-Feld

**Fertig! 🚀**

