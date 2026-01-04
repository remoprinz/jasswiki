# 📊 CONTENT-AUDIT: JSON-Files Übersicht

**Datum:** 2025-11-02  
**Zweck:** Prüfung welche Content-Files wo sind und ob Original-Content noch in jasstafel existiert

---

## 📂 JSON-FILES IN JASSTAFEL

### Aktive Files (vermutlich genutzt)

| Datei | Größe | Zeilen | Zweck | Status |
|-------|-------|--------|-------|--------|
| `jass-content-v2.json` | 297 KB | 6,211 | **Haupt-Content-File** | ✅ Aktuell |
| `knowledgebase_agent5.json` | 57 KB | 1,104 | **Aktive Knowledgebase** | ✅ Aktuell |

### Backup/Archive Files

| Datei | Größe | Zeilen | Zweck | Status |
|-------|-------|--------|-------|--------|
| `jass-content-v2-backup.json` | 311 KB | 8,038 | Backup | 📦 Archiv |
| `jass-content-v2.backup.json` | 308 KB | 8,038 | Backup | 📦 Archiv |
| `jass-content-v2 copy.json` | 284 KB | 6,464 | Kopie | 📦 Archiv |

### Alternative/Historische Files

| Datei | Größe | Zeilen | Zweck | Status |
|-------|-------|--------|-------|--------|
| `jass-lexikon.json` | 316 KB | 8,133 | **Möglicherweise ORIGINAL?** | ⚠️ Zu prüfen |
| `knowledgebase.json` | 395 KB | 10,129 | **GRÖSSTE - möglicherweise VOLLSTÄNDIG?** | ⚠️ Zu prüfen |
| `knowledgebase_agent1.json` | 68 KB | 2,027 | Agent1 Version | 📦 Historisch |
| `knowledgebase_agent2.json` | 46 KB | 1,284 | Agent2 Version | 📦 Historisch |
| `knowledgebase_agent3.json` | 137 KB | 2,466 | Agent3 Version | 📦 Historisch |
| `knowledgebase_agent4.json` | 101 KB | 3,356 | Agent4 Version | 📦 Historisch |

**Total:** 11 JSON-Dateien

---

## 📂 JSON-FILES IN JASSWIKI

### Aktive Files

| Datei | Größe | Zeilen | Zweck | Status |
|-------|-------|--------|-------|--------|
| `jass-content-v2.json` | 297 KB | 6,211 | **Haupt-Content-File** | ✅ Aktuell |
| `knowledgebase_agent5.json` | 57 KB | 1,104 | **Aktive Knowledgebase** | ✅ Aktuell |

**Total:** 2 JSON-Dateien

---

## 🔍 VERGLEICH

### jass-content-v2.json

**Status:** ✅ Beide Projekte haben die GLEICHE Datei

| Projekt | Größe | Zeilen | SHA256 Hash |
|---------|-------|--------|-------------|
| **jasstafel** | 297 KB | 6,211 | `2efc2bc0a1d2bdf3...` |
| **jasswiki** | 297 KB | 6,211 | `52ce7cc01ebde676...` |

**Unterschied:** 
- ❌ **NICHT identisch** (verschiedene Hashes!)
- ✅ Einziger Unterschied: URLs (`/wissen/` vs `/`)
- ✅ Content ist vermutlich gleich, nur URLs angepasst

### knowledgebase_agent5.json

**Status:** ⚠️ Beide Projekte haben die Datei, aber verschiedene Hashes

| Projekt | Größe | Zeilen | SHA256 Hash |
|---------|-------|--------|-------------|
| **jasstafel** | 57 KB | 1,104 | `f54d20c5b98612c0...` |
| **jasswiki** | 57 KB | 1,104 | `86ac70b072d4c9a8...` |

**Unterschied:**
- ❌ **NICHT identisch** (verschiedene Hashes!)
- ⚠️ Vermutlich URLs angepasst oder Content-Updates

---

## 🚨 WICHTIGE ERKENNTNISSE

### 1. Mögliche Originale in jasstafel

#### `jass-lexikon.json` (316 KB, 8,133 Zeilen)
- ⚠️ **GRÖSSER als jass-content-v2.json!**
- ⚠️ Beginnt mit "Willkommen in der faszinierenden Welt von jassguru.ch!"
- ⚠️ Könnte der **ORIGINALE, vollständigere Content** sein!
- ⚠️ **MUSS GEPRÜFT WERDEN!**

#### `knowledgebase.json` (395 KB, 10,129 Zeilen)
- ⚠️ **GRÖSSTE Datei!**
- ⚠️ Könnte die **VOLLSTÄNDIGSTE Version** sein!
- ⚠️ **MUSS GEPRÜFT WERDEN!**

### 2. Content könnte unvollständig sein

**Problem:**
- `jass-content-v2.json` hat nur 6,211 Zeilen
- `jass-lexikon.json` hat 8,133 Zeilen (+31% mehr!)
- `knowledgebase.json` hat 10,129 Zeilen (+63% mehr!)

**Vermutung:**
- ❓ Wurde bei der Migration nur `jass-content-v2.json` kopiert?
- ❓ Ist `jass-lexikon.json` oder `knowledgebase.json` die vollständigere Version?
- ❓ Wurden Artikel gelöscht/vereinfacht?

---

## 🔍 NÄCHSTE SCHRITTE

### Sofort prüfen:

1. **Artikel-Anzahl vergleichen:**
   ```bash
   # Zähle Artikel in verschiedenen Files
   ```

2. **Stichprobe nehmen:**
   - Vergleich: Welche Artikel sind in `jass-lexikon.json` aber NICHT in `jass-content-v2.json`?
   - Vergleich: Welche Artikel sind in `knowledgebase.json` aber NICHT in `jass-content-v2.json`?

3. **Content-Qualität prüfen:**
   - Gibt es Artikel mit "bullshit" oder Placeholder-Texten?
   - Sind Artikel vollständig oder nur Ausschnitte?
   - Gibt es Duplikate?

---

## 📋 EMPFOHLENE AKTIONEN

### Option A: Vollständigen Content von jasstafel holen

Wenn `jass-lexikon.json` oder `knowledgebase.json` vollständiger sind:

1. ✅ Backup von aktuellen jasswiki Files erstellen
2. ✅ Vollständigere Datei nach jasswiki kopieren
3. ✅ URLs anpassen (`/wissen/` → `/`)
4. ✅ Build & Deploy
5. ✅ Content prüfen

### Option B: Content-Validierung durchführen

Wenn `jass-content-v2.json` die richtige ist:

1. ✅ Artikel durchgehen und "Bullshit"-Content identifizieren
2. ✅ Mit Originalen vergleichen (falls verfügbar)
3. ✅ Korrekturen vornehmen
4. ✅ Build & Deploy

---

## ⚠️ KRITISCH

**Der Nutzer sagt: "aktuell steht da teilweise bullshit drin"**

Das bedeutet:
- ❌ Es gibt fehlerhaften Content in jasswiki
- ❌ Content muss bereinigt werden
- ❌ Möglicherweise wurde falscher Content kopiert

**Nächste Schritte:**
1. Prüfe welche Artikel "Bullshit" enthalten
2. Finde die korrekten Originale
3. Ersetze fehlerhaften Content

---

**Status:** ⚠️ Content-Problem identifiziert - Detaillierte Prüfung nötig








