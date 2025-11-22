# 🎨 LAYOUT-WIEDERHERSTELLUNG PLAN

**Projekt:** Jasswiki.ch  
**Ziel:** Layout exakt wie vor der Migration wiederherstellen  
**Status:** In Analyse  
**Erstellt:** 2025-11-02  

---

## 🎯 ZIEL

Das Layout von `jasswiki.ch` soll **EXAKT** so aussehen wie vorher unter `jassguru.ch/wissen/`.

---

## 📊 AKTUELLER STATUS

### Was funktioniert bereits ✅

Nach dem Audit haben wir festgestellt:

1. ✅ **HTML-Struktur:** Korrekt (LexikonLayout wird gerendert)
2. ✅ **Komponenten:** Alle vorhanden (Sidebar, Breadcrumbs, SearchBar)
3. ✅ **Build:** Erfolgreich (319 Seiten, 0 Fehler)
4. ✅ **_app.tsx:** Minimal und korrekt (7 Zeilen)
5. ✅ **Tailwind CSS:** Geladen
6. ✅ **Navigation:** Links funktionieren

### Was könnte das Problem sein ⚠️

Mögliche Ursachen für Layout-Unterschiede:

1. **_document.tsx:** Enthält noch PWA-spezifischen Code
2. **CSS-Spezifitäten:** Möglicherweise fehlende/überschriebene Styles
3. **Missing CSS-Classes:** Tailwind-Klassen nicht kompiliert
4. **globals.css:** Möglicherweise PWA-spezifische Styles die fehlen/stören
5. **Font-Loading:** Fonts werden nicht korrekt geladen
6. **Viewport-Settings:** Meta-Tags für Mobile sind anders

---

## 🔍 DIAGNOSE-STRATEGIE

### Schritt 1: Visueller Vergleich

**Öffne beide Seiten nebeneinander:**
- **Vorher:** `jassguru.ch/wissen/` (falls noch erreichbar)
- **Nachher:** `http://localhost:3002` (lokaler jasswiki)

**Prüfe systematisch:**

| Element | Vorher | Nachher | Unterschied? |
|---------|--------|---------|--------------|
| **Header (Mobile)** | ? | ? | ? |
| **Sidebar (Desktop)** | ? | ? | ? |
| **Breadcrumbs** | ? | ? | ? |
| **SearchBar** | ? | ? | ? |
| **Content-Bereich** | ? | ? | ? |
| **Kategorien-Grid** | ? | ? | ? |
| **Farben** | ? | ? | ? |
| **Schriftarten** | ? | ? | ? |
| **Spacing** | ? | ? | ? |
| **Hover-Effekte** | ? | ? | ? |

### Schritt 2: Developer Tools Inspektion

**Chrome DevTools öffnen (F12):**

1. **Console:** Prüfe auf Fehler
   ```
   Erwartung: Keine Fehler
   ```

2. **Network:** Prüfe ob alle Assets geladen werden
   ```
   - CSS-Dateien geladen? ✓/✗
   - Fonts geladen? ✓/✗
   - JavaScript geladen? ✓/✗
   ```

3. **Elements:** Inspiziere HTML-Struktur
   ```
   - Sind alle Tailwind-Klassen vorhanden?
   - Werden Klassen überschrieben?
   - Fehlen Klassen?
   ```

4. **Computed Styles:** Prüfe angewandte Styles
   ```
   - Farben korrekt?
   - Schriftgrößen korrekt?
   - Margins/Paddings korrekt?
   ```

### Schritt 3: Screenshot-Vergleich

**Erstelle Screenshots:**
- `vorher_desktop.png` (jassguru.ch/wissen/)
- `nachher_desktop.png` (localhost:3002)
- `vorher_mobile.png`
- `nachher_mobile.png`

**Vergleiche Pixel für Pixel:**
- Online-Tool: https://www.diffchecker.com/image-diff/
- Oder manuell Side-by-Side

---

## 🛠️ LÖSUNGSANSÄTZE

### Problem 1: Farben sind anders

**Mögliche Ursachen:**
- Tailwind-Config unterschiedlich
- Theme-Variable fehlen
- CSS wird überschrieben

**Lösung:**
1. Vergleiche `tailwind.config.js` von jasstafel und jasswiki
2. Prüfe `globals.css` auf Custom-Colors
3. Stelle sicher dass Tailwind-Theme identisch ist

### Problem 2: Schriftarten sind anders

**Mögliche Ursachen:**
- Font-Files fehlen
- Font-Loading in _document.tsx fehlt
- CSS font-family unterschiedlich

**Lösung:**
1. Prüfe ob Fonts im `public/` Ordner sind
2. Füge Font-Preload in _document.tsx hinzu
3. Prüfe `globals.css` auf font-family Definitionen

### Problem 3: Spacing ist anders

**Mögliche Ursachen:**
- Tailwind-Spacing-Scale unterschiedlich
- Container-Widths anders
- Padding/Margin-Klassen fehlen

**Lösung:**
1. Vergleiche Tailwind-Config
2. Prüfe Container-Komponenten
3. Stelle sicher dass Spacing-Klassen identisch sind

### Problem 4: Layout ist "kaputt"

**Mögliche Ursachen:**
- Flexbox/Grid fehlt
- Width-Constraints fehlen
- z-index Konflikte

**Lösung:**
1. Prüfe ob alle Layout-Klassen vorhanden sind
2. Inspiziere mit DevTools die Computed Layout
3. Vergleiche HTML-Struktur Element für Element

### Problem 5: Mobile-View ist anders

**Mögliche Ursachen:**
- Viewport-Meta-Tag unterschiedlich
- Responsive-Klassen fehlen
- Safe-Area-Insets fehlen

**Lösung:**
1. Prüfe _document.tsx Meta-Tags
2. Stelle sicher dass `lg:hidden` und `lg:block` Klassen korrekt sind
3. Teste auf echtem Mobile-Device

---

## 📋 IMPLEMENTATIONSPLAN

### Phase 1: Diagnose (AKTUELL)

#### ✅ Step 1.1: Audit erstellt
- [x] Vollständiger Audit durchgeführt
- [x] Build-Status geprüft
- [x] HTML-Struktur analysiert
- [x] Komponenten-Status geprüft

#### ⏳ Step 1.2: Visueller Test
- [ ] Öffne `http://localhost:3002` im Browser
- [ ] Mache Screenshots (Desktop + Mobile)
- [ ] Vergleiche mit Original (falls erreichbar)
- [ ] Liste spezifische Unterschiede auf

#### ⏳ Step 1.3: Developer Tools Analyse
- [ ] Console auf Fehler prüfen
- [ ] Network-Tab auf fehlende Assets prüfen
- [ ] Elements-Tab auf fehlende Klassen prüfen
- [ ] Computed Styles prüfen

### Phase 2: _document.tsx bereinigen

#### Step 2.1: Backup erstellen
```bash
cd /Users/remoprinz/Documents/Jassguru/jasswiki
mv src/pages/_document.tsx src/pages/_document.tsx.backup
```

#### Step 2.2: Neue _document.tsx erstellen

**Option A: Absolutes Minimum**
```typescript
import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="de-CH">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

**Option B: Mit Basic Meta-Tags (falls nötig)**
```typescript
import Document, {Html, Head, Main, NextScript} from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="de-CH">
        <Head>
          {/* Viewport */}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          {/* Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

#### Step 2.3: Rebuild & Test
```bash
npm run build
npx serve out -l 3002
```

Öffne Browser und prüfe:
- [ ] Sieht besser aus?
- [ ] Sieht gleich aus?
- [ ] Sieht schlechter aus?

### Phase 3: CSS-Debugging (falls nötig)

#### Step 3.1: Tailwind-Config vergleichen
```bash
# jasstafel
cat /Users/remoprinz/Documents/Jassguru/jasstafel/tailwind.config.js

# jasswiki
cat /Users/remoprinz/Documents/Jassguru/jasswiki/tailwind.config.js

# Unterschiede?
diff /Users/remoprinz/Documents/Jassguru/jasstafel/tailwind.config.js \
     /Users/remoprinz/Documents/Jassguru/jasswiki/tailwind.config.js
```

#### Step 3.2: globals.css vergleichen
```bash
# jasstafel
cat /Users/remoprinz/Documents/Jassguru/jasstafel/src/styles/globals.css

# jasswiki
cat /Users/remoprinz/Documents/Jassguru/jasswiki/src/styles/globals.css

# Unterschiede?
diff /Users/remoprinz/Documents/Jassguru/jasstafel/src/styles/globals.css \
     /Users/remoprinz/Documents/Jassguru/jasswiki/src/styles/globals.css
```

#### Step 3.3: Fehlende CSS hinzufügen

Falls Unterschiede gefunden:
1. Relevante Teile aus jasstafel/globals.css kopieren
2. In jasswiki/globals.css einfügen
3. Rebuild & Test

### Phase 4: Komponenten-Debugging (falls nötig)

#### Step 4.1: LexikonLayout prüfen
```bash
# Vergleiche
diff /Users/remoprinz/Documents/Jassguru/jasstafel/src/components/layout/LexikonLayout.tsx \
     /Users/remoprinz/Documents/Jassguru/jasswiki/src/components/layout/LexikonLayout.tsx
```

Falls Unterschiede:
- Relevante Änderungen übernehmen
- Rebuild & Test

#### Step 4.2: LexikonSidebar prüfen
```bash
diff /Users/remoprinz/Documents/Jassguru/jasstafel/src/components/layout/LexikonSidebar.tsx \
     /Users/remoprinz/Documents/Jassguru/jasswiki/src/components/layout/LexikonSidebar.tsx
```

#### Step 4.3: SearchBar prüfen
```bash
diff /Users/remoprinz/Documents/Jassguru/jasstafel/src/components/wissen/SearchBar.tsx \
     /Users/remoprinz/Documents/Jassguru/jasswiki/src/components/wissen/SearchBar.tsx
```

### Phase 5: Final Polishing

#### Step 5.1: Alle Seiten testen
- [ ] Homepage (`/`)
- [ ] Kategorie-Seite (`/regeln`)
- [ ] Subkategorie-Seite (`/regeln/spielablauf`)
- [ ] Artikel-Seite (`/regeln/spielablauf/spielbeginn`)

#### Step 5.2: Responsive Testing
- [ ] Desktop (1920x1080)
- [ ] Laptop (1440x900)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

#### Step 5.3: Browser Testing
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Mobile Safari
- [ ] Chrome Mobile

### Phase 6: Deployment

#### Step 6.1: Final Build
```bash
cd /Users/remoprinz/Documents/Jassguru/jasswiki
rm -rf .next out
npm run build
```

#### Step 6.2: Deploy
```bash
bash scripts/deploy.sh
```

#### Step 6.3: Live Test
- [ ] Öffne `https://jasswiki.ch/`
- [ ] Hard Refresh (Cmd+Shift+R)
- [ ] Teste alle Funktionen
- [ ] Vergleiche mit lokalem Server
- [ ] Bestätige dass alles identisch ist

---

## 🎨 SPEZIFISCHE LAYOUT-ELEMENTE

### Header (Mobile)

**Erwartetes Layout:**
```
┌─────────────────────────────────────┐
│  ← Zurück              ☰ Menu       │
└─────────────────────────────────────┘
```

**Farben:**
- Background: `bg-gray-800`
- Border: `border-gray-700`
- Zurück-Button: `text-green-400`

### Sidebar (Desktop)

**Erwartetes Layout:**
```
┌────────────────────┐
│  Jass-Wiki         │
│                    │
│  • Regeln          │
│  • Weis-Regeln     │
│  • Geschichte      │
│  • ...             │
└────────────────────┘
```

**Farben:**
- Background: `bg-gray-800`
- Border: `border-gray-700`
- Links: `text-gray-300`
- Hover: `text-green-400`

### Content-Bereich

**Erwartetes Layout:**
```
┌──────────────────────────────────────┐
│  [SearchBar]                         │
│                                      │
│  Home > Jass-Wiki                   │
│                                      │
│  ┌────────────────────────────────┐ │
│  │  Artikel-Content               │ │
│  │                                │ │
│  └────────────────────────────────┘ │
└──────────────────────────────────────┘
```

**Farben:**
- Background: `bg-gray-900`
- Content-Box: `bg-gray-800`
- Border: `border-gray-700`
- Text: `text-white`

### Kategorien-Grid (Homepage)

**Erwartetes Layout:**
```
┌─────────────────────────────────────────┐
│  ┌───────────────────────────────────┐  │
│  │  [Icon] Regeln                    │  │
│  │  Beschreibung...                  │  │
│  └───────────────────────────────────┘  │
│                                         │
│  ┌───────────────────────────────────┐  │
│  │  [Icon] Weis-Regeln               │  │
│  │  Beschreibung...                  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

**Farben:**
- Regeln: `bg-red-500` (Icon)
- Weis-Regeln: `bg-orange-500` (Icon)
- Geschichte: `bg-amber-500` (Icon)
- Grundlagen: `bg-green-500` (Icon)
- Hover: `hover:border-gray-600`, `hover:scale-[1.02]`

---

## 🔍 DEBUGGING-CHECKLISTE

Wenn das Layout nicht stimmt, prüfe systematisch:

### CSS-Checkliste
- [ ] Tailwind CSS wird geladen
- [ ] Keine CSS-Fehler in Console
- [ ] Alle verwendeten Klassen sind in Tailwind-Config
- [ ] Keine Klassen-Konflikte (Specificity)
- [ ] Custom CSS in globals.css ist korrekt

### HTML-Checkliste
- [ ] Alle Komponenten werden gerendert
- [ ] Keine fehlenden Wrapper-Divs
- [ ] Korrekte Verschachtelung
- [ ] Tailwind-Klassen sind korrekt geschrieben
- [ ] Keine Tippfehler in Klassen-Namen

### Komponenten-Checkliste
- [ ] LexikonLayout wird verwendet
- [ ] LexikonSidebar zeigt alle Kategorien
- [ ] Breadcrumbs zeigen korrekten Pfad
- [ ] SearchBar wird angezeigt
- [ ] Icons werden geladen (lucide-react)

### Responsive-Checkliste
- [ ] `lg:hidden` und `lg:block` funktionieren
- [ ] Mobile Header wird auf Mobile angezeigt
- [ ] Desktop Sidebar wird auf Desktop angezeigt
- [ ] Grid-Layout ist responsiv
- [ ] Text-Größen passen sich an

---

## 📸 SCREENSHOTS VERGLEICH

### Desktop-Layout

**Vorher (jassguru.ch/wissen/):**
```
[Screenshot hier einfügen]
```

**Nachher (jasswiki.ch/):**
```
[Screenshot hier einfügen]
```

**Unterschiede:**
- [ ] Liste spezifische Unterschiede hier auf

### Mobile-Layout

**Vorher:**
```
[Screenshot hier einfügen]
```

**Nachher:**
```
[Screenshot hier einfügen]
```

**Unterschiede:**
- [ ] Liste spezifische Unterschiede hier auf

---

## ✅ ERFOLGS-KRITERIEN

Das Layout ist wiederhergestellt wenn:

1. ✅ **Visuelle Identität:** Aussehen ist 100% identisch mit Original
2. ✅ **Farben:** Alle Farben sind korrekt (Gray-900, Green-400, etc.)
3. ✅ **Spacing:** Margins & Paddings sind identisch
4. ✅ **Typography:** Schriftarten & -größen sind identisch
5. ✅ **Responsiveness:** Mobile & Desktop Layouts funktionieren
6. ✅ **Navigation:** Alle Links funktionieren
7. ✅ **Hover-Effekte:** Interaktivität ist identisch
8. ✅ **Icons:** Alle Icons werden korrekt angezeigt

---

## 🚨 WENN NICHTS HILFT

### Backup-Plan: Kompletter Komponenten-Transfer

Wenn trotz aller Bemühungen das Layout nicht stimmt:

1. **Komplett neue Kopie der Komponenten:**
   ```bash
   # Sichere aktuelle
   mv src/components src/components.backup
   
   # Kopiere frisch von jasstafel
   cp -r /Users/remoprinz/Documents/Jassguru/jasstafel/src/components/layout src/components/
   cp -r /Users/remoprinz/Documents/Jassguru/jasstafel/src/components/wissen src/components/
   cp -r /Users/remoprinz/Documents/Jassguru/jasstafel/src/components/seo src/components/
   ```

2. **Komplette neue Kopie der Styles:**
   ```bash
   cp /Users/remoprinz/Documents/Jassguru/jasstafel/src/styles/globals.css src/styles/
   cp /Users/remoprinz/Documents/Jassguru/jasstafel/tailwind.config.js .
   ```

3. **Rebuild:**
   ```bash
   rm -rf .next out node_modules
   npm install
   npm run build
   ```

---

## 📝 NOTIZEN

### Wichtige Erkenntnisse aus dem Audit

1. **Build funktioniert:** Keine Fehler, 319 Seiten generiert ✅
2. **HTML-Struktur ist korrekt:** LexikonLayout wird gerendert ✅
3. **_app.tsx ist minimal:** Nur 7 Zeilen, perfekt ✅
4. **_document.tsx ist problematisch:** Noch PWA-Code drin ⚠️

### Vermutungen

**Wahrscheinlichste Ursache für Layout-Probleme:**
1. _document.tsx PWA-Code (60% Wahrscheinlichkeit)
2. Fehlende/falsche CSS-Klassen (30% Wahrscheinlichkeit)
3. Komponenten-Unterschiede (10% Wahrscheinlichkeit)

**Nächster Schritt:**
- Visueller Test im Browser
- Screenshots vergleichen
- Spezifische Probleme identifizieren

---

**Ende Plan**

*Erstellt: 2025-11-02*
*Status: Bereit für Implementierung*

