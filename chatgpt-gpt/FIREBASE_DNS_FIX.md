# 🔧 Firebase DNS-Fix: Alten CNAME löschen

## Problem

Firebase kann die Domain nicht verifizieren, weil **zwei CNAME-Records** existieren oder der **alte Record noch aktiv** ist.

**Fehlermeldung:** "Mindestens eine der HTTP-GET-Anfragen von Hosting für die ACME-Abfrage ist fehlgeschlagen"

---

## ✅ Lösung: Alten CNAME löschen

### Schritt 1: Hostpoint DNS-Verwaltung öffnen

1. **Hostpoint Control Panel** → **DNS-Verwaltung**
2. Suche nach **allen** CNAME-Records für `gpt`

### Schritt 2: Alten CNAME löschen

**Du musst finden und löschen:**
- ❌ **CNAME:** `gpt` → `jasswiki.ch` (ALTER RECORD - LÖSCHEN!)

**Behalten:**
- ✅ **CNAME:** `gpt` → `jasswiki.web.app` (NEUER RECORD - BLEIBT!)

### Schritt 3: Prüfen, ob nur ein CNAME existiert

**Nach dem Löschen sollte nur noch EIN CNAME-Record existieren:**
- ✅ `gpt` → `jasswiki.web.app`

**Falls mehrere CNAME-Records für `gpt` existieren:**
- Alle löschen, die auf `jasswiki.ch` zeigen
- Nur der Record auf `jasswiki.web.app` bleibt

---

## ⚠️ WICHTIG: DNS-Propagierung

Nach dem Löschen des alten Records:

1. **Warte 5-10 Minuten** (DNS-Propagierung)
2. **Firebase Console:** Status prüfen
3. **Erwartung:** Status sollte von "Pending" → "Provisioning" → "Ready" wechseln

---

## 🔍 Prüfen, ob es funktioniert

### Option 1: DNS-Check online

1. Gehe zu: https://mxtoolbox.com/CNAME.aspx
2. Gib ein: `gpt.jasswiki.ch`
3. **Erwartung:** Sollte nur `jasswiki.web.app` zeigen (nicht `jasswiki.ch`!)

### Option 2: Terminal

```bash
dig gpt.jasswiki.ch CNAME
```

**Erwartung:** Sollte nur `jasswiki.web.app` zeigen

---

## 📋 Checkliste

- [ ] Alten CNAME-Record gefunden: `gpt` → `jasswiki.ch`
- [ ] Alten CNAME-Record gelöscht
- [ ] Nur noch ein CNAME-Record: `gpt` → `jasswiki.web.app`
- [ ] 5-10 Minuten gewartet (DNS-Propagierung)
- [ ] Firebase Console: Status prüfen
- [ ] Status: "Ready" (SSL-Zertifikat bereitgestellt)

---

## 🎯 Zusammenfassung

**Problem:** Zwei CNAME-Records oder alter Record noch aktiv

**Lösung:** 
1. Alten CNAME auf `jasswiki.ch` löschen
2. Nur CNAME auf `jasswiki.web.app` behalten
3. Warten auf DNS-Propagierung
4. Firebase wird dann SSL-Zertifikat bereitstellen

---

**Viel Erfolg! 🚀**

