# 📊 Analyse: Weis-Struktur

## Aktueller Status

### Gefundene Artikel unter "Weis-Regeln" (19 total)

#### ✅ Richtig platziert - gehören zu WEISEN (11 Artikel):
1. `weis_rules_stock` - Stöcke
2. `weis_rules_dreiblatt` - Dreiblatt (3 Blatt)
3. `weis_rules_vierblatt` - Vierblatt (4 Blatt)
4. `weis_rules_fuenfblatt` - Fünfblatt (5 Blatt)
5. `weis_rules_sechsblatt` - Sechsblatt (6 Blatt)
6. `weis_rules_siebenblatt` - Siebenblatt (7 Blatt)
7. `weis_rules_achtblatt` - Achtblatt (8 Blatt)
8. `weis_rules_neunblatt` - Neunblatt (9 Blatt)
9. `weis_rules_vier_gleiche` - Vier gleiche Karten
10. `weis_rules_kreuzweis` - Kreuzweis
11. `weis_rules_general` - Allgemeine Weis ⚠️ **Titel muss korrigiert werden!**

#### ❌ FALSCH platziert - gehören zu REGELN (8 Artikel):

**Notation-Artikel (3)** → sollten zu "Regeln" > "Notation"
1. `weis_rules_notation_basics` - Schreibweise
2. `weis_rules_notation_numbers` - Rechte Tafelseite
3. `weis_rules_notation_correction` - Korrekturregeln

**Ausmachen-Artikel (5)** → sollten zu "Regeln" > "Ausmachen"
4. `weis_rules_ausmachen_basics` - Das Ausmachen
5. `weis_rules_ausmachen_order` - Ausmach-Reihenfolge
6. `weis_rules_ausmachen_thanking` - Bedanken beendet Partie
7. `weis_rules_ausmachen_schneider` - Ausmachregel bei Schneider
8. `weis_rules_ausmachen_early_thanking` - Frühzeitiges Bedanken

---

## 🔧 Erforderliche Korrekturen

### 1. Hauptkategorie umbenennen
- **Von:** `"main": "Weis-Regeln"`
- **Nach:** `"main": "Weisen"`
- **Betrifft:** Alle 11 richtig platzierten Artikel

### 2. Titel korrigieren
- **Artikel:** `weis_rules_general`
- **Von:** "Allgemeine Weis" (❌ schlechtes Deutsch!)
- **Nach:** "Weisen allgemein"

### 3. Grammatikfehler korrigieren
- **Problem:** "Alle Weisen" im Text
- **Korrekt:** "Alle Weise" (es ist "Der Weis", nicht "Die Weise")
- **Betrifft:** Vermutlich mehrere Artikel mit dem Text "Alle Weisen müssen..."

### 4. Artikel verschieben
- **8 Artikel** von "Weisen" nach "Regeln" verschieben
- **3 Notation-Artikel** → `"main": "Regeln"`, `"sub": "Notation"`
- **5 Ausmachen-Artikel** → `"main": "Regeln"`, `"sub": "Ausmachen"`

### 5. Neuen Artikel erstellen
**ID:** `weis_rules_stock_hindersi`
**Titel:** Stöcke bei Hindersi-Varianten
**Kategorie:** 
- `"main": "Weisen"`
- `"sub": "Stöcke"`
- `"topic": "Stöcke bei Hindersi-Varianten"`

**Inhalt (sinngemäss):**
```
• Bei Jass-Varianten, wo möglichst wenig Punkte erzielt werden sollen, hat das gegnerische Team die Stöcke zu weisen
• Beispiel: Hindersi-Varianten
• Das Team, das die Stöcke hält, weist sie NICHT
• Stattdessen weist das andere Team die Stöcke für die Gegner
```

### 6. Sub-Kategorie anpassen
- **Artikel:** `weis_rules_general` (Weisen allgemein)
- **Von:** `"sub": "Weis-Arten"`
- **Nach:** `"sub": "Allgemeines"`
- **Grund:** "Weisen allgemein" ist keine Art von Weis, sondern allgemeine Regeln

---

## 📋 Zusammenfassung

**Artikel bleiben bei "Weisen":** 11 (+ 1 neuer = 12 total)
**Artikel werden verschoben zu "Regeln":** 8
**Titel-Korrekturen:** 1
**Grammatik-Korrekturen:** mehrere ("Alle Weisen" → "Alle Weise")
**Neue Artikel:** 1 (Stöcke bei Hindersi-Varianten)

---

## ⚠️ Wichtiger Hinweis

**Problem:** Alle Artikel haben derzeit `"sub": "Weis-Arten"`, auch "Schreibweise" und "Ausmachen"!

**Das ist falsch!** Die Sub-Kategorie sollte thematisch passen:
- Weis-Blätter (3-9 Blatt) → `"sub": "Weis-Arten"` ✅
- Vier gleiche, Kreuzweis → `"sub": "Weis-Arten"` ✅
- Stöcke → `"sub": "Stöcke"` ✅
- Weisen allgemein → `"sub": "Allgemeines"` ✅
- Notation → `"sub": "Notation"` (in "Regeln")
- Ausmachen → `"sub": "Ausmachen"` (in "Regeln")

---

**Nächster Schritt:** Korrekturen durchführen?

