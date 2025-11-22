# 📊 Plan: jass-content-v2.json → Google Spreadsheet Export

## 📋 Datenanalyse

**Aktuelle Struktur:**
- **258 Artikel** mit vollständigen Informationen
- **896 FAQs** (Frage-Antwort-Paare)
- **Struktur pro Artikel:**
  - `id`: Eindeutige Artikel-ID
  - `text`: Vollständiger Artikeltext (Markdown-formatierter Text)
  - `metadata`: 
    - `category.main`: Hauptkategorie (z.B. "Regeln")
    - `category.sub`: Unterkategorie (z.B. "Kartenverteilung")
    - `category.topic`: Thema (z.B. "Abheben der Karten")
    - `keywords`: Array von Suchbegriffen
    - `situations`: Array von Situationen (z.B. ["LEARNING"])
    - `importance`: Zahl (1-3)
    - `difficulty`: Zahl (1-3)
  - `faqs`: Array von FAQ-Objekten (question, answer)
  - `see_also`: Array von verwandten Artikel-IDs

---

## 🎯 Export-Strategie

### Option 1: Zwei separate Sheets (EMPFOHLEN)
**Vorteile:**
- Klare Trennung zwischen Artikeln und FAQs
- Einfache Navigation
- FAQs können als separate Tabelle für SEO/Strukturierte Daten genutzt werden

**Sheet 1: "Artikel"**
- Eine Zeile pro Artikel
- Spalten: ID, Text, Kategorie (Main), Kategorie (Sub), Kategorie (Topic), Keywords (komma-getrennt), Situations (komma-getrennt), Importance, Difficulty, See Also (komma-getrennt), FAQ-Anzahl

**Sheet 2: "FAQs"**
- Eine Zeile pro FAQ
- Spalten: FAQ-ID (auto-generiert), Artikel-ID, Frage, Antwort

### Option 2: Ein Sheet mit verschachtelten Daten
**Vorteile:**
- Alles an einem Ort
- Einfache Filterung

**Nachteile:**
- Sehr breite Spalten (Text kann sehr lang sein)
- FAQs müssen als JSON-String oder mehrfache Zeilen gespeichert werden

### Option 3: Drei Sheets (Artikel, FAQs, Metadaten)
**Vorteile:**
- Maximale Normalisierung
- Beste für Datenanalyse

**Nachteile:**
- Komplexer zu navigieren

---

## ✅ EMPFOHLENE LÖSUNG: Option 1 (Zwei Sheets)

### Sheet 1: "Artikel"
| Spalte | Beschreibung | Beispiel |
|--------|--------------|----------|
| A: ID | Artikel-ID | `abheben` |
| B: Text | Vollständiger Artikeltext | `Definition:\nBeim Abheben...` |
| C: Kategorie (Main) | Hauptkategorie | `Regeln` |
| D: Kategorie (Sub) | Unterkategorie | `Kartenverteilung` |
| E: Kategorie (Topic) | Thema | `Abheben der Karten` |
| F: Keywords | Komma-getrennte Keywords | `abheben, ablupfen, mischen` |
| G: Situations | Komma-getrennte Situations | `LEARNING` |
| H: Importance | Wichtigkeit (1-3) | `1` |
| I: Difficulty | Schwierigkeit (1-3) | `2` |
| J: See Also | Komma-getrennte IDs | `mischen, expressions_ablupf` |
| K: FAQ-Anzahl | Anzahl FAQs | `5` |

### Sheet 2: "FAQs"
| Spalte | Beschreibung | Beispiel |
|--------|--------------|----------|
| A: FAQ-ID | Auto-generierte ID | `abheben_faq_1` |
| B: Artikel-ID | Verweis auf Artikel | `abheben` |
| C: Frage | FAQ-Frage | `Was bedeutet Abheben beim Jassen?` |
| D: Antwort | FAQ-Antwort | `Abheben (auch Ablupfen genannt)...` |

---

## 🛠️ Implementierung

### Schritt 1: Script erstellen
- Neues Script: `functions/scripts/exportJassContentToSpreadsheet.ts`
- Liest `jass-content-v2.json`
- Verwendet Google Sheets API (wie `handleSessionUpdate`)
- Erstellt zwei Sheets oder nutzt bestehendes Spreadsheet

### Schritt 2: Spreadsheet-Konfiguration
- **Option A:** Neues Spreadsheet erstellen
- **Option B:** Bestehendes Spreadsheet nutzen (gleiche ID wie Session-Export)
- **Option C:** Neues Tab im bestehenden Spreadsheet

### Schritt 3: Export-Funktion
- Firebase Function oder einmaliges Script
- Batch-Export (alle Daten auf einmal)
- Oder: Incremental Export (nur neue/geänderte Artikel)

---

## 📝 Fragen zur Klärung

1. **Welches Spreadsheet?**
   - Neues Spreadsheet erstellen?
   - Oder neues Tab im bestehenden Spreadsheet (`1wffL-mZRMVoXjVL3WPMiRJ_AsC5ALZXn1Jx6GYxKqKA`)?

2. **Einmalig oder regelmäßig?**
   - Einmaliger Export?
   - Oder automatischer Export bei Änderungen?

3. **Text-Formatierung?**
   - Soll der Text mit Zeilenumbrüchen (`\n`) bleiben?
   - Oder als einzelne Zeilen formatiert werden?

4. **Keywords/Situations Format?**
   - Komma-getrennt in einer Zelle?
   - Oder separate Spalten pro Keyword?

---

## 🚀 Nächste Schritte

1. ✅ Plan bestätigen
2. 🔧 Script entwickeln
3. 📊 Spreadsheet-Struktur erstellen
4. 🧪 Test-Export durchführen
5. ✅ Vollständigen Export ausführen

