# 🌐 Custom Domain für ChatGPT Custom GPT: gpt.jasswiki.ch

## Problem

OpenAI unterstützt **keine direkten Custom Domains** für Custom GPT Links. Die Lösung ist eine **DNS-Weiterleitung** (301 Redirect).

## ✅ Schritt 1: Prüfen, ob Hostpoint Redirect-Funktion hat

### Wo finde ich Redirects in Hostpoint?

1. **Hostpoint Control Panel** öffnen
2. **Suche nach:**
   - **"Weiterleitungen"**
   - **"Redirects"**
   - **"Domain-Weiterleitungen"**
   - **"URL-Weiterleitungen"**
   - Oder in den **DNS-Einstellungen** → **"Weiterleitungen"** Tab

**Falls gefunden:** → **Option A** (empfohlen, siehe unten)

**Falls NICHT gefunden:** → **Option B** (Alternative über Firebase)

---

## ✅ Alternative: HTML-Weiterleitung auf jasswiki.ch

Falls Hostpoint keine DNS-Weiterleitung unterstützt, können wir eine HTML-Seite erstellen, die weiterleitet.

### Schritt 1: Weiterleitungs-Seite erstellen

Erstelle eine Datei: `public/gpt-redirect.html` (oder ähnlich)

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Weiterleitung zu JassWiki GPT...</title>
  <meta http-equiv="refresh" content="0; url=https://chatgpt.com/g/g-690883c82ffc8191a063266aab280617">
  <script>
    window.location.href = "https://chatgpt.com/g/g-690883c82ffc8191a063266aab280617";
  </script>
</head>
<body>
  <p>Weiterleitung zu JassWiki GPT...</p>
  <p>Falls die Weiterleitung nicht funktioniert, <a href="https://chatgpt.com/g/g-690883c82ffc8191a063266aab280617">klicken Sie hier</a>.</p>
</body>
</html>
```

### Schritt 2: Next.js Route erstellen

Erstelle: `src/pages/gpt.tsx`

```typescript
import { useEffect } from 'react';
import Head from 'next/head';

export default function GPTRedirect() {
  useEffect(() => {
    // Sofortige Weiterleitung
    window.location.href = 'https://chatgpt.com/g/g-690883c82ffc8191a063266aab280617';
  }, []);

  return (
    <>
      <Head>
        <title>Weiterleitung zu JassWiki GPT...</title>
        <meta httpEquiv="refresh" content="0; url=https://chatgpt.com/g/g-690883c82ffc8191a063266aab280617" />
      </Head>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        backgroundColor: '#111827',
        color: '#fff'
      }}>
        <p>Weiterleitung zu JassWiki GPT...</p>
      </div>
    </>
  );
}
```

Dann: `gpt.jasswiki.ch` → `jasswiki.ch/gpt` weiterleiten

---

## ✅ BESTE Lösung: Hostpoint Redirect-Funktion (wenn verfügbar)

**Falls Hostpoint eine Redirect-Funktion hat (am besten für SSL!):**

1. **Hostpoint Control Panel** → Suche nach **"Weiterleitungen"** oder **"Redirects"**
2. **Neue Weiterleitung erstellen:**
   - **Von:** `gpt.jasswiki.ch` (oder `gpt`)
   - **Zu:** `https://chatgpt.com/g/g-690883c82ffc8191a063266aab280617`
   - **Typ:** `301 Permanent Redirect`
3. **Speichern**

**Vorteile:**
- ✅ Automatisches SSL-Zertifikat von Hostpoint
- ✅ Kein Firebase nötig
- ✅ Server-seitige Weiterleitung (schneller, SEO-freundlich)
- ✅ Keine Sicherheitswarnung

**Falls Hostpoint KEINE Redirect-Funktion hat:** Siehe Option 2 unten.

---

## ✅ Alternative: HTML-Weiterleitung über Firebase (falls Hostpoint kein Redirect hat)

**Falls Hostpoint keine Redirect-Funktion hat, müssen wir über Firebase gehen:**

### Schritt 1: CNAME-Record löschen/ändern

1. **Hostpoint Control Panel** → **DNS-Verwaltung**
2. **CNAME-Record für `gpt` löschen** (falls er existiert)
3. **ODER:** CNAME-Record auf `jasswiki.ch` belassen (für Firebase)

### Schritt 2: Custom Domain in Firebase Hosting hinzufügen

1. **Firebase Console:** https://console.firebase.google.com/project/jassguru/hosting
2. **"Add custom domain"** → `gpt.jasswiki.ch`
3. **Verification-Record** bei Hostpoint hinzufügen (TXT oder A)
4. **Warten auf SSL-Provisioning** (5-30 Minuten)

**Dann:** `gpt.jasswiki.ch` zeigt auf `jasswiki.ch/gpt` (Weiterleitungsseite)

**Siehe:** `FIREBASE_CUSTOM_DOMAIN_GPT.md` für Details.

---

## 🔍 Prüfen, welche Option Hostpoint bietet

**Option 1: DNS-Verwaltung prüfen**
- Gibt es ein "Weiterleitungen" oder "Redirects" Menü?
- Falls ja → Direkt verwenden!

**Option 2: Support kontaktieren**
- Hostpoint Support fragen: "Wie kann ich eine Subdomain-Weiterleitung einrichten?"
- Sie können dir sagen, ob es eine Redirect-Funktion gibt

**Option 3: HTML-Weiterleitung (immer möglich)**
- Falls keine DNS-Weiterleitung möglich ist
- HTML-Seite erstellen (siehe oben)

---

## ✅ Deployment

Nachdem die DNS-Einstellungen gespeichert sind:

```bash
npm run build
firebase deploy --only hosting:jasswiki
```

## ✅ Testen

Nach dem Deployment:

1. **Warte 5-10 Minuten** (DNS-Propagierung)
2. **Browser öffnen**
3. **Gehe zu:** `https://gpt.jasswiki.ch`
4. **Erwartung:** Automatische Weiterleitung zu ChatGPT Custom GPT (`https://chatgpt.com/g/g-690883c82ffc8191a063266aab280617`)

---

## 📋 Checkliste

- [x] Subdomain `gpt.jasswiki.ch` erstellt und aktiv
- [ ] DNS-Record konfiguriert: `gpt` → CNAME auf `jasswiki.ch`
- [x] Weiterleitungsseite `/gpt` erstellt
- [ ] Deployment durchgeführt: `npm run build && firebase deploy --only hosting:jasswiki`
- [ ] Getestet: `https://gpt.jasswiki.ch` funktioniert und leitet weiter

---

## 🎯 Zusammenfassung

**Ziel:** `gpt.jasswiki.ch` → `https://chatgpt.com/g/g-690883c82ffc8191a063266aab280617`

**Lösung:** 
1. DNS: `gpt.jasswiki.ch` → CNAME auf `jasswiki.ch`
2. Weiterleitung: `/gpt` Seite leitet automatisch zu ChatGPT weiter

**Status:** ✅ Weiterleitungsseite erstellt, bereit für Deployment

---

**Viel Erfolg! 🚀**

