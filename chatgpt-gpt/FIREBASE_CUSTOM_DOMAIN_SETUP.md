# 🔒 Firebase Custom Domain Setup für gpt.jasswiki.ch

## ✅ Schritt-für-Schritt Anleitung

### Schritt 1: Firebase Console öffnen

1. Gehe zu: **https://console.firebase.google.com/project/jassguru/hosting**
2. Stelle sicher, dass die **Site "jasswiki"** ausgewählt ist

### Schritt 2: Custom Domain hinzufügen

1. Klicke auf **"Add custom domain"** oder **"Custom domain hinzufügen"**
2. Gib ein: **`gpt.jasswiki.ch`**
3. Klicke auf **"Continue"** oder **"Weiter"**

### Schritt 3: Verification-Record bei Hostpoint hinzufügen

Firebase zeigt dir einen **Verification-Record** (meist TXT, manchmal A).

**Beispiel:** Firebase zeigt dir etwas wie:
```
TXT Record:
Name: gpt
Value: firebase=abc123xyz456...
```

**Bei Hostpoint:**
1. **Hostpoint Control Panel** → **DNS-Verwaltung**
2. **Neuen Record hinzufügen:**
   - **Typ:** `TXT` (oder `A`, wie von Firebase angegeben)
   - **Name:** `gpt` (oder `gpt.jasswiki.ch`)
   - **Wert:** Der Wert, den Firebase dir gibt
   - **TTL:** `300`
3. **Speichern**

**⚠️ WICHTIG:** 
- Der **CNAME-Record** auf `jasswiki.ch` **bleibt bestehen**!
- Der **Verification-Record (TXT/A)** ist **zusätzlich**!

### Schritt 4: Warten auf SSL-Provisioning

1. **Firebase Console:** Status prüfen
   - Der Status sollte von **"Pending"** → **"Provisioning"** → **"Ready"** wechseln
   - **Dauer:** 5-30 Minuten (manchmal länger, bis zu 2 Stunden)

2. **Während des Wartens:**
   - Beide DNS-Records müssen bestehen bleiben:
     - ✅ CNAME: `gpt` → `jasswiki.ch`
     - ✅ TXT/A: `gpt` → (Firebase Verification Value)

### Schritt 5: Testen

Nach erfolgreicher SSL-Bereitstellung:

1. **Warte 5-30 Minuten** (manchmal länger)
2. **Teste:** `https://gpt.jasswiki.ch`
3. **Erwartung:**
   - ✅ Grünes Schloss-Symbol
   - ✅ Kein Zertifikatsfehler (`ERR_CERT_COMMON_NAME_INVALID` ist weg)
   - ✅ Automatische Weiterleitung zu ChatGPT

---

## 📋 Checkliste

- [ ] Firebase Console geöffnet
- [ ] Custom Domain `gpt.jasswiki.ch` hinzugefügt
- [ ] Verification-Record (TXT/A) bei Hostpoint hinzugefügt
- [ ] CNAME-Record auf `jasswiki.ch` bleibt bestehen
- [ ] Status in Firebase Console: "Ready"
- [ ] Getestet: `https://gpt.jasswiki.ch` funktioniert ohne Fehler

---

## 🐛 Troubleshooting

### Problem: "Certificate provisioning failed"

**Lösung:**
- Prüfe, ob der Verification-Record (TXT/A) korrekt bei Hostpoint gesetzt ist
- Prüfe, ob der CNAME-Record auf `jasswiki.ch` zeigt
- Warte länger (manchmal braucht es 1-2 Stunden)
- Prüfe in Firebase Console: **Hosting** → **Custom domains** → Status

### Problem: "Domain verification failed"

**Lösung:**
- Prüfe, ob beide DNS-Records korrekt sind
- Warte 10-15 Minuten nach dem Hinzufügen der Records
- Prüfe in Firebase Console: **Hosting** → **Custom domains** → Status
- Löschen und neu hinzufügen, falls nötig

### Problem: SSL funktioniert, aber Weiterleitung nicht

**Lösung:**
- Prüfe, ob die Seite `/gpt` korrekt deployed ist
- Teste: `https://jasswiki.ch/gpt` (sollte funktionieren)
- Falls `/gpt` funktioniert, sollte `gpt.jasswiki.ch` auch funktionieren

---

## 🎯 Zusammenfassung

**Ziel:** SSL-Zertifikat für `gpt.jasswiki.ch` bekommen

**Schritte:**
1. Custom Domain in Firebase hinzufügen
2. Verification-Record bei Hostpoint hinzufügen
3. Warten auf SSL-Provisioning (5-30 Minuten)

**Ergebnis:** `https://gpt.jasswiki.ch` funktioniert mit SSL und leitet zu ChatGPT weiter!

---

**Viel Erfolg! 🚀**

