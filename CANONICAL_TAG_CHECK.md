# 🔍 Canonical Tag Überprüfung – JassWiki.ch
## Datum: 31. Dezember 2025

---

## 🎯 **ZWECK**

Dieses Dokument hilft bei der Überprüfung der **Canonical Tags** für die 9 Seiten, die Google als Duplikate markiert hat.

---

## 📋 **BETROFFENE SEITEN**

### **1. Varianten-Seiten (4 Seiten)**
1. `https://jasswiki.ch/varianten/bodentrumpf-4-spieler/`
2. `https://jasswiki.ch/varianten/bolschewik-4-spieler/`
3. `https://jasswiki.ch/varianten/strategiespiel/schmaus/`
4. `https://jasswiki.ch/varianten/koenigsspiel/bieter/`

### **2. Weitere Seiten (5 Seiten - bitte in Google Search Console nachsehen)**
- (Liste wird nach Überprüfung in Google Search Console ergänzt)

---

## 🔧 **ÜBERPRÜFUNG: SCHRITT FÜR SCHRITT**

### **Schritt 1: Canonical Tag im HTML-Code prüfen**

#### **Methode 1: Browser (einfach)**
1. Öffne die Seite im Browser (z.B. `https://jasswiki.ch/varianten/bodentrumpf-4-spieler/`)
2. Rechtsklick → "Seitenquelltext anzeigen"
3. Suche nach `<link rel="canonical"`
4. Überprüfe, ob die URL korrekt ist

#### **Methode 2: Terminal (schnell)**
```bash
# Beispiel: bodentrumpf-4-spieler
curl -s https://jasswiki.ch/varianten/bodentrumpf-4-spieler/ | grep -i canonical

# Erwartetes Ergebnis (✅ KORREKT):
# <link rel="canonical" href="https://jasswiki.ch/varianten/bodentrumpf-4-spieler/"/>

# Falsches Ergebnis (❌ FEHLER):
# <link rel="canonical" href="https://jasswiki.ch/varianten/lernspiel/bodentrumpf-4-spieler/"/>
```

---

## 📊 **CHECKLISTE: ALLE 9 SEITEN**

### **Seite 1: bodentrumpf-4-spieler**
- [ ] Canonical Tag überprüft
- [ ] URL korrekt: `https://jasswiki.ch/varianten/bodentrumpf-4-spieler/`
- [ ] Keine Duplikate gefunden
- [ ] Status: ⏳ AUSSTEHEND

**Befehl:**
```bash
curl -s https://jasswiki.ch/varianten/bodentrumpf-4-spieler/ | grep -i canonical
```

---

### **Seite 2: bolschewik-4-spieler**
- [ ] Canonical Tag überprüft
- [ ] URL korrekt: `https://jasswiki.ch/varianten/bolschewik-4-spieler/`
- [ ] Keine Duplikate gefunden
- [ ] Status: ⏳ AUSSTEHEND

**Befehl:**
```bash
curl -s https://jasswiki.ch/varianten/bolschewik-4-spieler/ | grep -i canonical
```

---

### **Seite 3: schmaus**
- [ ] Canonical Tag überprüft
- [ ] URL korrekt: `https://jasswiki.ch/varianten/strategiespiel/schmaus/`
- [ ] Keine Duplikate gefunden
- [ ] Status: ⏳ AUSSTEHEND

**Befehl:**
```bash
curl -s https://jasswiki.ch/varianten/strategiespiel/schmaus/ | grep -i canonical
```

---

### **Seite 4: bieter**
- [ ] Canonical Tag überprüft
- [ ] URL korrekt: `https://jasswiki.ch/varianten/koenigsspiel/bieter/`
- [ ] Keine Duplikate gefunden
- [ ] Status: ⏳ AUSSTEHEND

**Befehl:**
```bash
curl -s https://jasswiki.ch/varianten/koenigsspiel/bieter/ | grep -i canonical
```

---

### **Seiten 5-9: (Bitte in Google Search Console nachsehen)**
- [ ] URLs aus Google Search Console kopiert
- [ ] Canonical Tags überprüft
- [ ] Status: ⏳ AUSSTEHEND

---

## 🔍 **MÖGLICHE PROBLEME & LÖSUNGEN**

### **Problem 1: Canonical verweist auf andere URL**

**Beispiel:**
```html
<!-- Aktuelle URL: https://jasswiki.ch/varianten/bodentrumpf-4-spieler/ -->
<!-- ❌ FALSCH: Canonical verweist auf andere URL -->
<link rel="canonical" href="https://jasswiki.ch/varianten/lernspiel/bodentrumpf-4-spieler/"/>
```

**Ursache:**
- Fehler in der URL-Generierung
- Falsche Kategorie-Zuordnung im Content

**Lösung:**
1. Überprüfe die Datei `src/pages/_document.tsx` oder `src/pages/[category]/[subcategory]/[topic]/index.tsx`
2. Suche nach der Canonical-Tag-Generierung
3. Korrigiere die URL-Logik

---

### **Problem 2: Mehrere URLs führen zur selben Seite**

**Beispiel:**
```
https://jasswiki.ch/varianten/bieter/
https://jasswiki.ch/varianten/koenigsspiel/bieter/
```

**Ursache:**
- Zwei verschiedene Routen generieren die gleiche Seite
- Fehler in `getStaticPaths`

**Lösung:**
1. Überprüfe `src/pages/varianten/[topic]/index.tsx`
2. Überprüfe `src/pages/[category]/[subcategory]/[topic]/index.tsx`
3. Stelle sicher, dass nur EINE Route pro Seite existiert

---

### **Problem 3: Content-Duplikate**

**Beispiel:**
- Zwei Seiten haben identischen Text
- Google wählt eine als "Original"

**Ursache:**
- Fehler beim Content-Import
- Kopierte Inhalte

**Lösung:**
1. Überprüfe die JSON-Datei `src/data/jass-content-v2.json`
2. Suche nach doppelten Einträgen
3. Entferne oder merge Duplikate

---

## 🛠️ **CANONICAL TAG GENERIERUNG ÜBERPRÜFEN**

### **Wo werden Canonical Tags gesetzt?**

#### **1. In `_document.tsx`**
```typescript
// Suche nach:
<link rel="canonical" href={...} />
```

#### **2. In den Page-Komponenten**
```typescript
// Beispiel: [category]/[subcategory]/[topic]/index.tsx
<Head>
  <link rel="canonical" href={canonicalUrl} />
</Head>
```

### **Überprüfung:**
```bash
# Suche nach Canonical-Tag-Generierung im Code
cd /Users/remoprinz/Documents/Jassguru/jasswiki
grep -r "rel=\"canonical\"" src/
```

---

## 📈 **NACH DER KORREKTUR**

### **1. Build & Deployment**
```bash
npm run build
firebase deploy --only hosting:jasswiki
```

### **2. Google Search Console**
1. Öffne Google Search Console
2. Gehe zu den 9 betroffenen Seiten
3. Klicke auf "Indexierung beantragen"
4. Warte 1-2 Wochen

### **3. Monitoring**
- Überprüfe wöchentlich, ob die Duplikate verschwinden
- Erwartete Zeitspanne: 2-4 Wochen

---

## 📞 **KONTAKT BEI PROBLEMEN**

Falls du bei der Überprüfung Probleme hast:
- **E-Mail:** remo@jassguru.ch
- **Telefon:** +41 79 237 52 08

---

**Stand:** 31. Dezember 2025  
**Status:** ⏳ Überprüfung ausstehend

