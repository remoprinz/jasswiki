# 🔒 SSL-Fehler beheben: ERR_CERT_COMMON_NAME_INVALID

## Problem

`gpt.jasswiki.ch` zeigt den Fehler **`ERR_CERT_COMMON_NAME_INVALID`**, weil:
- Der CNAME-Record zeigt auf `jasswiki.ch` (Firebase Hosting)
- Aber Firebase Hosting hat kein SSL-Zertifikat für `gpt.jasswiki.ch`
- Die Subdomain ist nicht als Custom Domain in Firebase registriert

---

## ✅ Lösung 1: Hostpoint Redirect verwenden (BESTE OPTION)

**Falls Hostpoint eine Redirect-Funktion hat:**

### Schritt 1: CNAME-Record löschen

1. **Hostpoint Control Panel** → **DNS-Verwaltung**
2. **CNAME-Record für `gpt` löschen**
3. **Speichern**

### Schritt 2: Hostpoint Redirect erstellen

1. **Hostpoint Control Panel** → **"Weiterleitungen"** oder **"Redirects"**
2. **Neue Weiterleitung:**
   - **Von:** `gpt.jasswiki.ch`
   - **Zu:** `https://chatgpt.com/g/g-690883c82ffc8191a063266aab280617`
   - **Typ:** `301 Permanent Redirect`
3. **Speichern**

**Vorteile:**
- ✅ Automatisches SSL-Zertifikat von Hostpoint
- ✅ Kein Firebase nötig
- ✅ Server-seitige Weiterleitung (schneller)
- ✅ Keine Zertifikatsfehler mehr

---

## ✅ Lösung 2: Custom Domain in Firebase registrieren (falls Hostpoint kein Redirect hat)

**Falls Hostpoint KEINE Redirect-Funktion hat:**

### Schritt 1: Custom Domain in Firebase hinzufügen

1. **Firebase Console:** https://console.firebase.google.com/project/jassguru/hosting
2. **Site auswählen:** `jasswiki`
3. **"Add custom domain"** klicken
4. **Domain eingeben:** `gpt.jasswiki.ch`
5. **"Continue"** klicken

### Schritt 2: Verification-Record bei Hostpoint hinzufügen

Firebase zeigt dir einen **Verification-Record** (TXT oder A).

1. **Hostpoint Control Panel** → **DNS-Verwaltung**
2. **Neuen Record hinzufügen:**
   - **Typ:** `TXT` oder `A` (wie von Firebase angegeben)
   - **Name:** `gpt`
   - **Wert:** Der Wert, den Firebase dir gibt
   - **TTL:** `300`
3. **Speichern**

**WICHTIG:** Der CNAME-Record auf `jasswiki.ch` bleibt bestehen!

### Schritt 3: Warten auf SSL-Provisioning

1. **Firebase Console:** Status prüfen
   - Status sollte von **"Pending"** → **"Provisioning"** → **"Ready"** wechseln
   - **Dauer:** 5-30 Minuten (manchmal länger)

2. **Während des Wartens:**
   - CNAME-Record bleibt bestehen
   - Verification-Record (TXT/A) bleibt bestehen

### Schritt 4: Testen

Nach erfolgreicher SSL-Bereitstellung:

1. **Warte 5-30 Minuten**
2. **Teste:** `https://gpt.jasswiki.ch`
3. **Erwartung:**
   - ✅ Grünes Schloss-Symbol
   - ✅ Kein Zertifikatsfehler
   - ✅ Automatische Weiterleitung zu ChatGPT

---

## ⚠️ WICHTIG: DNS-Records

**Bei Lösung 2 (Firebase) müssen BEIDE Records existieren:**

1. **CNAME-Record:** `gpt` → `jasswiki.ch` (für die Weiterleitung)
2. **TXT/A-Record:** `gpt` → (Firebase Verification Value) (für SSL-Zertifikat)

**Beide müssen gleichzeitig bestehen!**

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

## 📋 Checkliste für Lösung 1 (Hostpoint Redirect)

- [ ] CNAME-Record für `gpt` gelöscht
- [ ] Hostpoint Redirect-Funktion gefunden
- [ ] Redirect erstellt: `gpt.jasswiki.ch` → ChatGPT Link
- [ ] Typ: 301 Permanent Redirect
- [ ] Getestet: `https://gpt.jasswiki.ch` funktioniert ohne Fehler

---

## 📋 Checkliste für Lösung 2 (Firebase)

- [ ] Firebase Console geöffnet
- [ ] Custom Domain `gpt.jasswiki.ch` hinzugefügt
- [ ] Verification-Record (TXT/A) bei Hostpoint hinzugefügt
- [ ] CNAME-Record auf `jasswiki.ch` bleibt bestehen
- [ ] Status in Firebase Console: "Ready"
- [ ] Getestet: `https://gpt.jasswiki.ch` funktioniert ohne Fehler

---

## 🎯 Empfehlung

**Versuche zuerst Lösung 1 (Hostpoint Redirect):**
- Einfacher
- Kein Firebase nötig
- Automatisches SSL
- Schneller

**Falls nicht verfügbar:** Verwende Lösung 2 (Firebase).

---

**Viel Erfolg! 🚀**

