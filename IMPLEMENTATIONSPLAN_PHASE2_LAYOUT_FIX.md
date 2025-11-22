# 🛠️ IMPLEMENTATIONSPLAN PHASE 2: Layout-Problem beheben

**Projekt:** Jasswiki.ch - Vollständige Entkopplung von Jassguru.ch  
**Phase:** 2 - Layout-Problem beheben  
**Erstellt:** 2025-11-02  
**Status:** Bereit zur Implementierung  

---

## 📋 INHALTSVERZEICHNIS

1. [Problem-Analyse](#problem-analyse)
2. [Ziel](#ziel)
3. [Strategie](#strategie)
4. [Schritt-für-Schritt Implementierung](#schritt-für-schritt-implementierung)
5. [Risiken & Mitigation](#risiken--mitigation)
6. [Testing-Strategie](#testing-strategie)
7. [Rollback-Plan](#rollback-plan)

---

## 🔍 PROBLEM-ANALYSE

### Was ist das Problem?

Die `_app.tsx` Datei im jasswiki-Projekt wurde **vollständig von jasstafel kopiert** und enthält:

```
jasswiki/src/pages/_app.tsx (355 Zeilen)
├── ❌ PWA-spezifische Imports (AuthProvider, UserProvider, useTournamentStore)
├── ❌ Firebase Auth Logic
├── ❌ Service Worker Handling  
├── ❌ App-spezifische Context Provider
├── ❌ Wake Lock Hooks
├── ❌ Background Optimization
├── ❌ Offline Sync Engine
├── ❌ Firestore Sync Provider
└── ❌ IndexedDB Helper
```

### Warum ist das ein Problem?

1. **Build-Fehler:** Alle diese Dependencies existieren NICHT im jasswiki-Projekt
2. **Unnötiger Ballast:** Ein statisches Wiki braucht keine PWA-Features
3. **Komplexität:** 355 Zeilen Code für eine Aufgabe, die 10 Zeilen benötigt
4. **Performance:** Langsame Ladezeiten durch unnötige Imports

### Root Cause

Der vorherige Agent hat **blind die gesamte `_app.tsx`** kopiert, ohne zu verstehen, dass:
- `jasstafel` = PWA/App mit Auth, Stores, Offline-Sync
- `jasswiki` = Statische Website mit null Interaktivität

---

## 🎯 ZIEL

### Primärziel
Ersetze die PWA-lastige `_app.tsx` durch eine **schlanke, wiki-spezifische Version**.

### Erfolgskriterien
✅ Build läuft ohne Fehler durch  
✅ Layout wird korrekt angezeigt  
✅ Navigation funktioniert  
✅ Keine unnötigen Dependencies  
✅ Performance-Verbesserung messbar  

---

## 🧠 STRATEGIE

### Option A: Minimal (EMPFOHLEN)
Komplett neue `_app.tsx` mit nur dem absoluten Minimum:
- `globals.css` Import
- Component Rendering
- Fertig!

**Vorteile:**
- ✅ Einfachste Lösung
- ✅ Keine Dependencies
- ✅ Schnellste Performance
- ✅ Minimales Fehlerrisiko

**Nachteile:**
- ⚠️ Keine SEO-Optimierungen
- ⚠️ Keine Custom Head-Tags

### Option B: Wiki-optimiert (ALTERNATIVE)
Erweiterte Version mit Wiki-spezifischen Features:
- SEO Head-Tags
- Canonical Link Handling
- Structured Data (JSON-LD)

**Vorteile:**
- ✅ Bessere SEO
- ✅ Canonical URLs korrekt
- ✅ Structured Data für Google

**Nachteile:**
- ⚠️ Komplexer
- ⚠️ Mehr Fehlerquellen
- ⚠️ Abhängigkeit von Komponenten

### 🏆 ENTSCHEIDUNG: Option A (Minimal)

**Begründung:**
1. Die SEO-Features sind bereits in den einzelnen Pages implementiert
2. `LexikonLayout` übernimmt bereits das Hauptlayout
3. Jede Page hat bereits `<SeoHead />` eingebaut
4. Weniger Code = weniger Fehler = schnellere Umsetzung

---

## 🚀 SCHRITT-FÜR-SCHRITT IMPLEMENTIERUNG

### Phase 2.1: Backup & Vorbereitung

#### Schritt 1: Alte _app.tsx sichern
```bash
cd /Users/remoprinz/Documents/Jassguru/jasswiki
mv src/pages/_app.tsx src/pages/_app.tsx.backup
```

**Grund:** Sicherheitsnetz falls etwas schief geht

---

### Phase 2.2: Neue _app.tsx erstellen

#### Schritt 2: Minimale _app.tsx schreiben

**Datei:** `src/pages/_app.tsx`

```typescript
import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
```

**Das war's!** 🎉

**Erklärung:**
- `globals.css` → Lädt Tailwind CSS
- `Component` → Die aktuelle Page (z.B. `index.tsx`, `[category]/index.tsx`)
- `pageProps` → Props für die Page (von `getStaticProps`)

**Warum so minimal?**
- Alle Pages nutzen bereits `LexikonLayout` für das Layout
- Alle Pages haben bereits `<SeoHead />` für SEO
- Keine Auth benötigt → Keine Provider
- Keine Interaktivität → Keine Stores
- Statische Seite → Kein Service Worker

---

### Phase 2.3: Build testen

#### Schritt 3: Clean Build
```bash
cd /Users/remoprinz/Documents/Jassguru/jasswiki
rm -rf .next out
npm run build
```

**Erwartetes Ergebnis:**
```
✓ Compiled successfully
✓ Linting and checking validity of types    
✓ Collecting page data    
✓ Generating static pages (X/X)
✓ Finalizing page optimization    

Route (pages)                              Size     First Load JS
┌ ○ /                                      X kB          XX kB
├   /_app                                  0 B           XX kB
├ ○ /404                                   X kB          XX kB
└ ○ /[category]                            X kB          XX kB
    └ ○ /[category]/[subcategory]          X kB          XX kB
        └ ○ /[category]/[subcategory]/[topic]  X kB      XX kB
```

**Bei Fehlern:**
- Prüfe Imports in Pages
- Prüfe ob alle Komponenten existieren
- Siehe [Troubleshooting](#troubleshooting)

---

### Phase 2.4: Lokaler Test

#### Schritt 4: Lokal starten
```bash
npx serve out -l 3000
```

**Öffne:** `http://localhost:3000`

**Checkliste:**
- [ ] Homepage lädt (`/`)
- [ ] Navigation funktioniert (Sidebar)
- [ ] Kategorie-Seiten laden (`/regeln`)
- [ ] Subkategorie-Seiten laden (`/regeln/spielablauf`)
- [ ] Artikel laden (`/regeln/spielablauf/spielbeginn`)
- [ ] Breadcrumbs funktionieren
- [ ] Zurück-Button funktioniert (Mobile)
- [ ] Search Bar wird angezeigt
- [ ] Layout sieht korrekt aus (Desktop + Mobile)

---

### Phase 2.5: Optional - _document.tsx prüfen

#### Schritt 5: _document.tsx reviewen

**Prüfe:** `src/pages/_document.tsx`

**Fragen:**
1. Enthält es PWA-spezifische Meta-Tags? → Entfernen
2. Enthält es Manifest-Links? → Entfernen (außer nötig)
3. Enthält es Service Worker Scripts? → Entfernen

**Minimale _document.tsx für Wiki:**

```typescript
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de-CH">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

**Hinweis:** Nur durchführen falls Build-Probleme auftreten.

---

### Phase 2.6: Deployment

#### Schritt 6: Deploy auf Firebase

```bash
cd /Users/remoprinz/Documents/Jassguru/jasswiki
bash scripts/deploy.sh
```

**Erwartung:**
```
✓ Building...
✓ Deploying to Firebase...
✓ Deploy complete!

✅ Jasswiki live: https://jasswiki.ch
```

---

### Phase 2.7: Production Test

#### Schritt 7: Live-Test durchführen

**URL:** `https://jasswiki.ch/`

**Checkliste:**
- [ ] Homepage lädt ohne Fehler
- [ ] Keine 404 Fehler in Console
- [ ] Navigation funktioniert
- [ ] Mobile-Layout korrekt
- [ ] Desktop-Layout korrekt
- [ ] Performance gut (Lighthouse > 90)
- [ ] SEO-Tags korrekt (View Source)

**Tools:**
- Chrome DevTools → Console (keine Fehler)
- Chrome DevTools → Network (keine 404s)
- Lighthouse → Performance Check
- View Source → SEO Check

---

## 🧪 TESTING-STRATEGIE

### 1. Unit-Level Testing

**Build Test:**
```bash
npm run build
```
✅ Muss ohne Fehler durchlaufen

### 2. Integration Testing

**Lokaler Server:**
```bash
npx serve out -l 3001
```

**Test-Cases:**

| Test Case | Route | Erwartet |
|-----------|-------|----------|
| Homepage | `/` | Lädt, zeigt Kategorien |
| Kategorie | `/regeln` | Lädt, zeigt Subkategorien |
| Subkategorie | `/regeln/spielablauf` | Lädt, zeigt Artikel |
| Artikel | `/regeln/spielablauf/spielbeginn` | Lädt, zeigt Content |
| 404 | `/nonexistent` | Zeigt 404 Page |
| Quellen | `/quellen` | Lädt, zeigt Quellenverzeichnis |

### 3. E2E Testing (Manuell)

**User Journey 1: Neuer Besucher**
1. Öffne `https://jasswiki.ch/`
2. Klicke auf Kategorie "Regeln"
3. Klicke auf Subkategorie "Spielablauf"
4. Klicke auf Artikel "Spielbeginn"
5. Nutze Breadcrumbs zur Navigation zurück
6. Teste Sidebar-Navigation

**User Journey 2: Mobile User**
1. Öffne `https://jasswiki.ch/` auf Mobile
2. Öffne Sidebar (Menu-Button)
3. Navigiere zu Artikel
4. Nutze Zurück-Button
5. Teste Search Bar

### 4. Performance Testing

**Lighthouse Audit:**
```
Performance: > 90
Accessibility: > 95
Best Practices: > 95
SEO: > 95
```

**Vorher (mit PWA _app.tsx):**
- First Load JS: ~XXX kB
- Time to Interactive: X.Xs

**Nachher (mit Minimal _app.tsx):**
- First Load JS: ~XXX kB (sollte kleiner sein)
- Time to Interactive: X.Xs (sollte schneller sein)

---

## ⚠️ RISIKEN & MITIGATION

### Risiko 1: Layout bricht
**Wahrscheinlichkeit:** Niedrig  
**Impact:** Hoch

**Mitigation:**
- Backup von `_app.tsx` erstellt
- Lokaler Test vor Deploy
- Schnelles Rollback möglich

**Rollback:**
```bash
mv src/pages/_app.tsx.backup src/pages/_app.tsx
npm run build
bash scripts/deploy.sh
```

### Risiko 2: SEO-Tags fehlen
**Wahrscheinlichkeit:** Sehr niedrig  
**Impact:** Mittel

**Mitigation:**
- SEO-Tags sind in Pages implementiert, nicht in `_app.tsx`
- `<SeoHead />` in jeder Page vorhanden
- Canonical Links in Komponenten

**Validation:**
```bash
# View Source jeder Page
# Prüfe auf:
# - <title>
# - <meta name="description">
# - <link rel="canonical">
```

### Risiko 3: Styling fehlt
**Wahrscheinlichkeit:** Sehr niedrig  
**Impact:** Hoch

**Mitigation:**
- `globals.css` wird korrekt importiert
- Tailwind CSS wird geladen
- Lokaler Test bestätigt Styling

**Validation:**
- Visueller Test aller Pages
- Prüfe Browser DevTools → Styles sind geladen

---

## 🔄 ROLLBACK-PLAN

### Wenn alles schief geht...

#### Schneller Rollback (< 5 Minuten)

```bash
cd /Users/remoprinz/Documents/Jassguru/jasswiki

# 1. Alte _app.tsx wiederherstellen
mv src/pages/_app.tsx src/pages/_app.tsx.broken
mv src/pages/_app.tsx.backup src/pages/_app.tsx

# 2. Rebuild
rm -rf .next out
npm run build

# 3. Deploy
bash scripts/deploy.sh
```

#### Kompletter Rollback zu jasstafel-Integration

Falls die komplette Entkopplung rückgängig gemacht werden muss:

```bash
# 1. Wechsel zu jasstafel
cd /Users/remoprinz/Documents/Jassguru/jasstafel

# 2. Deploy jasstafel mit /wissen Routes
firebase deploy --only hosting:jasswiki
```

**Hinweis:** Dies sollte nur im absoluten Notfall verwendet werden.

---

## 📊 ERFOLGS-METRIKEN

### Technische Metriken

| Metrik | Vor Phase 2 | Nach Phase 2 | Ziel |
|--------|-------------|--------------|------|
| Build-Fehler | ❓ Vermutlich viele | 0 | 0 |
| `_app.tsx` Zeilen | 355 | ~8 | < 20 |
| Dependencies | PWA-lastig | Minimal | Nur Wiki |
| First Load JS | XXX kB | XXX kB | < aktuell |
| Lighthouse Score | ❓ | > 90 | > 90 |

### Funktionale Metriken

- ✅ Homepage lädt
- ✅ Navigation funktioniert
- ✅ Layout korrekt
- ✅ Mobile responsiv
- ✅ SEO-Tags vorhanden

---

## 🎯 NÄCHSTE SCHRITTE NACH PHASE 2

### Phase 3: jasstafel bereinigen

Nachdem jasswiki funktioniert:
1. Entferne alle Wiki-Verweise aus jasstafel
2. Aktualisiere `BottomNavigation.tsx` (bereits erledigt)
3. Entferne alte `/wissen` Routes (bereits erledigt)
4. Deploy jasstafel neu

### Phase 4: SEO-Optimierung

Jasswiki final optimieren:
1. Canonical URLs prüfen
2. Sitemap generieren
3. robots.txt anpassen
4. Google Search Console aktualisieren

### Phase 5: Monitoring

Jasswiki überwachen:
1. Analytics einrichten
2. Error Monitoring (Sentry?)
3. Performance Monitoring
4. User Feedback sammeln

---

## 🔧 TROUBLESHOOTING

### Problem: Build schlägt fehl mit "Cannot find module 'X'"

**Lösung:**
```bash
# 1. Prüfe Imports in allen Pages
grep -r "import.*from.*X" src/

# 2. Entferne fehlerhafte Imports
# 3. Rebuild
npm run build
```

### Problem: Layout wird nicht angezeigt

**Lösung:**
1. Prüfe ob `globals.css` geladen wird
2. Prüfe Browser Console auf CSS-Fehler
3. Prüfe ob `LexikonLayout` korrekt importiert ist

### Problem: Navigation funktioniert nicht

**Lösung:**
1. Prüfe `LexikonSidebar` Komponente
2. Prüfe Links auf korrekte Paths
3. Prüfe Next.js Router

### Problem: 404 Errors auf Production

**Lösung:**
1. Prüfe Firebase Hosting Config (`firebase.json`)
2. Prüfe ob alle Routes generiert wurden (`out/` Verzeichnis)
3. Prüfe Rewrites/Redirects

---

## 📝 CHECKLISTE FÜR AGENT

Vor Start:
- [ ] Backup von `_app.tsx` erstellen
- [ ] Verstehen was minimale `_app.tsx` tut

Implementierung:
- [ ] Alte `_app.tsx` sichern
- [ ] Neue `_app.tsx` schreiben (8 Zeilen!)
- [ ] Build durchführen
- [ ] Lokaler Test
- [ ] Optional: `_document.tsx` reviewen

Testing:
- [ ] Alle Routes testen
- [ ] Mobile + Desktop
- [ ] Performance messen
- [ ] SEO validieren

Deployment:
- [ ] Deploy auf Firebase
- [ ] Live-Test durchführen
- [ ] Monitoring prüfen

Abschluss:
- [ ] Backup löschen (nach erfolgreicher Validierung)
- [ ] Dokumentation aktualisieren
- [ ] User informieren

---

## 🎉 ERWARTETES ERGEBNIS

Nach erfolgreicher Phase 2:

```
jasswiki/
├── src/
│   ├── pages/
│   │   ├── _app.tsx           ← ✅ SAUBER! (8 Zeilen)
│   │   ├── _document.tsx      ← ✅ Minimal
│   │   ├── index.tsx          ← ✅ Homepage
│   │   └── [category]/...     ← ✅ Wiki-Routes
│   ├── components/
│   │   └── layout/
│   │       └── LexikonLayout.tsx  ← ✅ Hauptlayout
│   └── styles/
│       └── globals.css        ← ✅ Tailwind
└── out/                       ← ✅ Build Output

jasswiki.ch/
├── / (Homepage)               ← ✅ Lädt
├── /regeln                    ← ✅ Kategorie
├── /regeln/spielablauf        ← ✅ Subkategorie
└── /regeln/spielablauf/...    ← ✅ Artikel
```

**Status:** 🟢 Produktionsreif

---

## 📞 SUPPORT

Bei Fragen oder Problemen:
1. Prüfe [Troubleshooting](#troubleshooting)
2. Prüfe [Rollback-Plan](#rollback-plan)
3. Konsultiere `JASSWIKI_ENTKOPPLUNG_MASTERPROMPT.md`

---

**Ende Implementationsplan Phase 2**

*Viel Erfolg! 🚀*

