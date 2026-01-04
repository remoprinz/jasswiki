# 🌐 Custom Domain Setup: api.jasswiki.ch

Anleitung zur Einrichtung einer Custom Domain für die Cloud Run Function `jasswikiQuery`.

## 📋 Voraussetzungen

- Domain `jasswiki.ch` ist bereits registriert
- Zugriff auf DNS-Verwaltung der Domain
- Google Cloud Projekt: `jasswiki` (oder entsprechend)
- Cloud Run Service: `jasswikiquery` (Region: `us-central1`)

## 🔧 Schritt-für-Schritt Anleitung

### Schritt 1: Domain-Verifizierung in Google Cloud

1. **Google Cloud Console öffnen**
   - Gehe zu: https://console.cloud.google.com/
   - Projekt: `jasswiki` auswählen

2. **Domain-Mapping erstellen**
   - Navigation: **Cloud Run** → **Domain-Mappings**
   - Oder direkt: https://console.cloud.google.com/run/detail/us-central1/jasswikiquery/domains
   - Klicke auf **"Domain hinzufügen"**

3. **Domain eingeben**
   - Domain: `api.jasswiki.ch`
   - Klicke auf **"Weiter"**

4. **Verifizierungsmethode wählen**
   - Google bietet zwei Methoden:
     - **Option A: DNS-Verifizierung** (empfohlen)
     - **Option B: HTML-Datei Upload**
   - Wähle **DNS-Verifizierung**

5. **Verifizierungs-CNAME abrufen**
   - Google zeigt einen CNAME-Eintrag an, z.B.:
     ```
     Name: ghs.googlehosted.com
     Type: CNAME
     Value: [einzigartige-verifizierungs-id].ghs.googlehosted.com
     ```
   - **Wichtig:** Notiere dir diesen Eintrag!

### Schritt 2: DNS-Einträge beim Domain-Provider

1. **Bei deinem Domain-Provider anmelden**
   - (z.B. Namecheap, GoDaddy, Cloudflare, etc.)

2. **CNAME für Verifizierung hinzufügen**
   - Erstelle einen CNAME-Eintrag:
     - **Name/Host:** `api.jasswiki.ch` (oder nur `api` wenn Subdomain-Support)
     - **Type:** CNAME
     - **Value:** Den Wert aus Schritt 1.5 kopieren
     - **TTL:** 3600 (oder Standard)

3. **Warten auf DNS-Propagierung**
   - DNS-Änderungen können 5-30 Minuten dauern
   - Prüfen mit:
     ```bash
     dig api.jasswiki.ch CNAME
     # oder
     nslookup api.jasswiki.ch
     ```

### Schritt 3: Domain-Mapping abschließen

1. **Zurück in Google Cloud Console**
   - Gehe zu **Cloud Run** → **Domain-Mappings**
   - Warte auf **"Verifiziert"** Status

2. **Domain-Mapping aktivieren**
   - Sobald verifiziert, klicke auf **"Domain-Mapping erstellen"**
   - Google erstellt automatisch:
     - SSL-Zertifikat (Let's Encrypt)
     - Load Balancer
     - DNS-Einträge für die Subdomain

3. **Routing konfigurieren**
   - Wähle den Cloud Run Service: `jasswikiquery`
   - Region: `us-central1`
   - Klicke auf **"Speichern"**

### Schritt 4: DNS-Einträge für Production (automatisch)

Google Cloud erstellt automatisch die notwendigen DNS-Einträge:

1. **A/AAAA Records** (für IPv4/IPv6)
   - Werden automatisch von Google verwaltet
   - Du musst nur die **CNAME für Verifizierung** setzen

2. **Automatische SSL-Zertifikate**
   - Google verwaltet SSL automatisch
   - Zertifikat wird innerhalb von 24 Stunden aktiviert

### Schritt 5: Funktion testen

Nach 10-30 Minuten sollte die Domain funktionieren:

```bash
# Test mit neuer Domain
curl -X POST https://api.jasswiki.ch \
  -H "Content-Type: application/json" \
  -d '{"query":"Was bedeutet Abheben beim Jassen?"}'
```

### Schritt 6: ChatGPT Custom GPT aktualisieren

1. **OpenAPI Schema aktualisieren**
   - Datei: `openapi-schema.yaml`
   - Ändere Server-URL:
     ```yaml
     servers:
       - url: https://api.jasswiki.ch
         description: Production API
     ```

2. **ChatGPT Custom GPT aktualisieren**
   - Gehe zu ChatGPT Custom GPT Editor
   - **Actions** → **Import from URL**
   - URL: `https://api.jasswiki.ch/openapi-schema.yaml` (falls du die Datei hostest)
   - Oder: Datei manuell hochladen mit neuer URL

3. **System Prompt prüfen**
   - Die URL in `API_SYSTEM_PROMPT.md` sollte automatisch korrekt sein
   - (ChatGPT verwendet die URL aus dem OpenAPI Schema)

## 🔍 Troubleshooting

### Problem: Domain wird nicht verifiziert

**Lösung:**
- Prüfe DNS-Einträge: `dig api.jasswiki.ch CNAME`
- Stelle sicher, dass der CNAME-Eintrag korrekt ist
- Warte 30-60 Minuten auf DNS-Propagierung
- Prüfe in Google Cloud Console → Domain-Mappings → Status

### Problem: SSL-Zertifikat fehlt

**Lösung:**
- SSL wird automatisch von Google verwaltet
- Kann 24-48 Stunden dauern
- Prüfe Status in Cloud Console → Domain-Mappings

### Problem: 404 Not Found

**Lösung:**
- Stelle sicher, dass der Cloud Run Service `jasswikiquery` läuft
- Prüfe Routing in Domain-Mapping Konfiguration
- Stelle sicher, dass die Region `us-central1` korrekt ist

### Problem: CORS-Fehler

**Lösung:**
- Die Funktion hat bereits `cors: true` in der Konfiguration
- Prüfe CORS-Headers in `functions/src/index.ts`
- Stelle sicher, dass `Access-Control-Allow-Origin: *` gesetzt ist

## 📝 Notizen

### Aktuelle Konfiguration

- **Cloud Run Service:** `jasswikiquery`
- **Region:** `us-central1`
- **Aktuelle URL:** `https://jasswikiquery-sktdhifofa-uc.a.run.app`
- **Neue URL:** `https://api.jasswiki.ch`
- **Firebase Function:** `jasswikiQuery`

### Wichtige URLs

- **Cloud Run Console:** https://console.cloud.google.com/run
- **Domain-Mappings:** https://console.cloud.google.com/run/domains
- **Function Logs:** `firebase functions:log --only jasswikiQuery`

## ✅ Checkliste

- [ ] Domain-Verifizierung in Google Cloud gestartet
- [ ] CNAME-Eintrag beim Domain-Provider gesetzt
- [ ] DNS-Verifizierung erfolgreich (Status: "Verifiziert")
- [ ] Domain-Mapping erstellt (Status: "Aktiv")
- [ ] SSL-Zertifikat aktiv (kann 24h dauern)
- [ ] Test mit `curl` erfolgreich
- [ ] OpenAPI Schema aktualisiert
- [ ] ChatGPT Custom GPT mit neuer URL aktualisiert
- [ ] Funktion funktioniert über neue Domain

## 🎯 Nach erfolgreichem Setup

1. **Alte URL wird weiterhin funktionieren** (keine Breaking Changes)
2. **Neue URL:** `https://api.jasswiki.ch` ist die primäre URL
3. **ChatGPT Custom GPT** zeigt jetzt die elegante URL statt der langen Cloud Run URL
4. **Bestätigung-Dialog** bleibt, aber die URL ist jetzt schöner

---

**Erstellt:** $(date)
**Status:** ⏳ Zu implementieren








