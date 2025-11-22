# 🔧 Troubleshooting: api.jasswiki.ch funktioniert nicht

## ✅ Was funktioniert

- ✅ DNS-Propagation: `api.jasswiki.ch` → `ghs.googlehosted.com.` (vollständig propagiert)
- ✅ DNS-Auflösung: Domain wird korrekt aufgelöst (142.251.140.211)
- ✅ Verbindung: Server ist erreichbar

## ❌ Problem

- ❌ SSL-Verbindung schlägt fehl (`SSL_ERROR_SYSCALL`)
- ❌ API-Endpoint nicht erreichbar

## 🔍 Ursache

**Wahrscheinlich:** Die Domain-Zuordnung in Google Cloud Console ist noch nicht vollständig verifiziert/aktiviert.

---

## ✅ Lösung: Google Cloud Console prüfen

### Schritt 1: Google Cloud Console öffnen

1. Gehe zu: **https://console.cloud.google.com**
2. Projekt auswählen (wo deine Cloud Run Function läuft)
3. Navigiere zu: **Cloud Run** → **Domain-Zuordnungen**

### Schritt 2: Status prüfen

**Suche nach `api.jasswiki.ch` in der Domain-Zuordnungen-Liste**

**Mögliche Status:**
- ✅ **"Bereit"** (Ready) → Domain ist aktiv, SSL sollte funktionieren
- ⚠️ **"Ausstehend"** (Pending) → DNS wird noch verifiziert
- ❌ **"Fehler"** (Error) → DNS-Eintrag ist falsch oder fehlt

### Schritt 3: Was tun je nach Status?

#### Status: "Ausstehend" (Pending)

**Das bedeutet:** Google prüft noch die DNS-Einträge.

**Was tun:**
1. **Warten:** 5-30 Minuten (manchmal bis 2 Stunden)
2. **DNS nochmal prüfen:**
   - CNAME: `api` → `ghs.googlehosted.com.` (mit Punkt!)
   - TTL: 300 Sekunden oder Standard
3. **In Google Cloud Console:** "Aktualisieren" oder "Neu verifizieren" klicken

#### Status: "Fehler" (Error)

**Das bedeutet:** DNS-Eintrag ist falsch oder fehlt.

**Was tun:**
1. **DNS-Eintrag nochmal prüfen:**
   - Name: `api` (nicht `api.jasswiki.ch`!)
   - Typ: `CNAME`
   - Wert: `ghs.googlehosted.com.` (mit Punkt am Ende!)
2. **Bei Domain-Registrar speichern**
3. **Warten:** 5-10 Minuten
4. **In Google Cloud Console:** "Aktualisieren" klicken

#### Status: "Bereit" (Ready)

**Aber API funktioniert trotzdem nicht?**

**Mögliche Ursachen:**
1. **SSL-Zertifikat wird noch erstellt** (kann 10-30 Minuten dauern)
2. **ChatGPT Action hat falschen Endpoint**
3. **Path fehlt:** `/jasswikiQuery` fehlt in der Action

---

## 🔍 ChatGPT Action prüfen

### Schritt 1: Action öffnen

1. **https://chat.openai.com/gpts/editor**
2. **JassWiki Custom GPT** → **"Configure"** Tab
3. **Actions** → **jasswikiQuery** öffnen

### Schritt 2: Endpoint prüfen

**Prüfe diese Felder:**

#### Option A: Vollständiger Endpoint
```
https://api.jasswiki.ch/jasswikiQuery
```
✅ **Gut:** Vollständiger Endpoint mit Path

#### Option B: Server URL + Path (getrennt)
- **Server URL:** `https://api.jasswiki.ch`
- **Path:** `/jasswikiQuery`
✅ **Gut:** Beide Felder korrekt

#### ❌ Falsch:
- **Nur:** `https://api.jasswiki.ch` (ohne `/jasswikiQuery`)
- **Oder:** `https://jasswikiquery-sktdhifofa-uc.a.run.app` (alte URL)

### Schritt 3: Schema prüfen

**Method:** `POST`
**Request Body:**
```json
{
  "query": "string"
}
```

**Response:** JSON mit `results` Array

---

## 🧪 Test-Script

**Test 1: API direkt testen (mit HTTP statt HTTPS)**
```bash
curl -v http://api.jasswiki.ch 2>&1 | head -20
```
→ Sollte eine Antwort zeigen (auch wenn HTTP)

**Test 2: Alte Domain testen (sollte funktionieren)**
```bash
curl -X POST https://jasswikiquery-sktdhifofa-uc.a.run.app/jasswikiQuery \
  -H "Content-Type: application/json" \
  -d '{"query": "test"}'
```
→ Falls das funktioniert: Neue Domain ist das Problem

**Test 3: Google Cloud Function direkt testen**
```bash
curl -X POST https://jasswikiquery-sktdhifofa-uc.a.run.app/jasswikiQuery \
  -H "Content-Type: application/json" \
  -d '{"query": "Was ist Abheben?"}'
```
→ Sollte JSON zurückgeben

---

## 🎯 Checkliste

- [ ] DNS-Propagation erfolgreich (✅ bereits erledigt)
- [ ] Google Cloud Console: Domain-Zuordnungen geöffnet
- [ ] Status von `api.jasswiki.ch` geprüft ("Bereit", "Ausstehend", "Fehler"?)
- [ ] Falls "Ausstehend": 10-30 Minuten gewartet, dann "Aktualisieren" geklickt
- [ ] Falls "Fehler": DNS-Eintrag nochmal geprüft (CNAME: `api` → `ghs.googlehosted.com.`)
- [ ] ChatGPT Action-Endpoint geprüft (`https://api.jasswiki.ch/jasswikiQuery`)
- [ ] ChatGPT Action-Path geprüft (`/jasswikiQuery` vorhanden?)
- [ ] Alte Domain (`jasswikiquery-sktdhifofa-uc.a.run.app`) funktioniert noch?

---

## 💡 Nächste Schritte

**1. Google Cloud Console prüfen:**
- Status von `api.jasswiki.ch` in Domain-Zuordnungen
- Falls "Ausstehend": Warten und "Aktualisieren" klicken

**2. ChatGPT Action prüfen:**
- Endpoint: `https://api.jasswiki.ch/jasswikiQuery` (vollständig!)
- Oder: Server URL: `https://api.jasswiki.ch` + Path: `/jasswikiQuery`

**3. Falls immer noch nicht funktioniert:**
- Temporär: Alte Domain (`jasswikiquery-sktdhifofa-uc.a.run.app`) in ChatGPT Action verwenden
- Warten bis Google Cloud Domain-Zuordnung "Bereit" ist
- Dann wieder auf `api.jasswiki.ch` umstellen

---

## 🆘 Fallback-Lösung

**Falls `api.jasswiki.ch` noch nicht funktioniert:**

**Temporär in ChatGPT Action verwenden:**
```
https://jasswikiquery-sktdhifofa-uc.a.run.app
```

**Diese Domain funktioniert garantiert!** Später kannst du wieder auf `api.jasswiki.ch` umstellen, sobald Google Cloud die Domain-Zuordnung verifiziert hat.

**Fertig! 🚀**

