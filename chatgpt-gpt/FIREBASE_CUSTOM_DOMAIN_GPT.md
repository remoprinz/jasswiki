# 🔒 SSL-Zertifikat für gpt.jasswiki.ch einrichten

## Problem

`gpt.jasswiki.ch` zeigt die Fehlermeldung **"Diese Verbindung ist nicht privat"**, weil Firebase Hosting noch kein SSL-Zertifikat für diese Subdomain bereitgestellt hat.

## ✅ Lösung: Custom Domain in Firebase Hosting hinzufügen

Firebase Hosting muss wissen, dass `gpt.jasswiki.ch` als Custom Domain verwendet wird. Dann stellt es automatisch ein SSL-Zertifikat bereit.

---

## Schritt-für-Schritt Anleitung

### Schritt 1: Firebase Console öffnen

1. Gehe zu: https://console.firebase.google.com/project/jassguru/hosting
2. Wähle das **Hosting**-Projekt aus

### Schritt 2: Custom Domain hinzufügen

1. Im Firebase Hosting Dashboard:
   - Klicke auf **"Add custom domain"** oder **"Custom domain hinzufügen"**
   - Falls du mehrere Hosting-Sites hast, wähle **"jasswiki"** aus

2. **Domain eingeben:**
   - Domain: `gpt.jasswiki.ch`
   - Klicke auf **"Continue"** oder **"Weiter"**

3. **DNS-Verification:**
   - Firebase zeigt dir einen **TXT-Record** oder **A-Record**, den du hinzufügen musst
   - **WICHTIG:** Du musst diesen Record bei Hostpoint hinzufügen

### Schritt 3: Verification Record bei Hostpoint hinzufügen

1. **Hostpoint Control Panel** → **DNS-Verwaltung**
2. **Neuen Record hinzufügen:**
   - **Typ:** `TXT` oder `A` (wie von Firebase angegeben)
   - **Name:** `gpt` (oder `gpt.jasswiki.ch`)
   - **Wert:** Der Wert, den Firebase dir gibt
   - **TTL:** `300`
3. **Speichern**

### Schritt 4: Warten auf SSL-Zertifikat

1. **Firebase Console:** Status prüfen
   - Der Status sollte von **"Pending"** → **"Provisioning"** → **"Ready"** wechseln
   - **Dauer:** 5-30 Minuten (manchmal länger)

2. **Während des Wartens:**
   - Der CNAME-Record auf `jasswiki.ch` bleibt bestehen
   - Der Verification-Record (TXT/A) muss auch bestehen bleiben

---

## ⚠️ WICHTIG: DNS-Konfiguration

Du hast **zwei DNS-Records** für `gpt.jasswiki.ch`:

1. **CNAME-Record:** `gpt` → `jasswiki.ch` (für die Weiterleitung)
2. **TXT/A-Record:** `gpt` → (Firebase Verification Value) (für SSL-Zertifikat)

**Beide müssen gleichzeitig existieren!**

---

## 🔄 Alternative: Ohne SSL (nicht empfohlen)

Falls du **kein SSL** willst (nicht empfohlen!):

1. **HTTP-Weiterleitung** verwenden (nicht HTTPS)
2. Browser-Warnungen werden weiterhin erscheinen

**Empfehlung:** Warte auf das SSL-Zertifikat von Firebase!

---

## ✅ Testen

Nach erfolgreicher SSL-Bereitstellung:

1. **Warte 5-30 Minuten** (SSL-Provisioning)
2. **Teste:** `https://gpt.jasswiki.ch`
3. **Erwartung:** 
   - ✅ Grünes Schloss-Symbol
   - ✅ Automatische Weiterleitung zu ChatGPT
   - ✅ Keine Sicherheitswarnung

---

## 🐛 Troubleshooting

### Problem: "Certificate provisioning failed"

**Lösung:**
- Prüfe, ob der Verification-Record (TXT/A) korrekt bei Hostpoint gesetzt ist
- Prüfe, ob der CNAME-Record auf `jasswiki.ch` zeigt
- Warte länger (manchmal braucht es 1-2 Stunden)

### Problem: "Domain verification failed"

**Lösung:**
- Prüfe, ob beide DNS-Records korrekt sind
- Warte 10-15 Minuten nach dem Hinzufügen der Records
- Prüfe in Firebase Console: **Hosting** → **Custom domains** → Status

### Problem: SSL funktioniert, aber Weiterleitung nicht

**Lösung:**
- Prüfe, ob die Seite `/gpt` korrekt deployed ist
- Teste: `https://jasswiki.ch/gpt` (sollte funktionieren)
- Falls `/gpt` funktioniert, sollte `gpt.jasswiki.ch` auch funktionieren

---

## 📋 Checkliste

- [ ] Firebase Console geöffnet
- [ ] Custom Domain `gpt.jasswiki.ch` hinzugefügt
- [ ] Verification-Record (TXT/A) bei Hostpoint hinzugefügt
- [ ] CNAME-Record auf `jasswiki.ch` bleibt bestehen
- [ ] Status in Firebase Console: "Ready"
- [ ] Getestet: `https://gpt.jasswiki.ch` funktioniert ohne Warnung

---

## 🎯 Zusammenfassung

**Problem:** Kein SSL-Zertifikat für `gpt.jasswiki.ch`

**Lösung:** 
1. Custom Domain in Firebase Hosting hinzufügen
2. Verification-Record bei Hostpoint hinzufügen
3. Warten auf SSL-Provisioning (5-30 Minuten)

**Ergebnis:** SSL-Zertifikat wird automatisch von Firebase bereitgestellt!

---

**Viel Erfolg! 🚀**

