# 🔍 FEHLER-ANALYSE: Gefundene Probleme

**Datum:** 2. November 2025  
**Status:** Vorläufige Analyse ✅

---

## 📊 GEFUNDENE FEHLER

### 1. Typos: "Tif" statt "Tief"
**Anzahl:** 2 Vorkommen

**Fundstellen:**
- `Hoch-tief / Tif-hoch-tief` (Strategie-Artikel)
- Text enthält "Tif-hoch-tief" statt "Tief-hoch-tief"

**Korrektur nötig:**
- ✅ "Tif" → "Tief" (klar erkennbarer Rechtschreibfehler)

---

### 2. Quellenangaben: "jassguru.ch"
**Anzahl:** 7 Vorkommen

**Fundstellen:**
1. `weis_rules_notation_basics` - "Bei jassguru.ch gelten folgende Vorteile:"
2. `weis_rules_notation_numbers` - "Bei jassguru.ch gelten folgende Vorteile:"
3. `Hoch-tief / Tif-hoch-tief` - Vermutlich auch enthalten
4. Weitere Strategie/Taktik-Artikel

**Korrektur nötig:**
- ✅ "Bei jassguru.ch gelten folgende Vorteile:" → Entweder entfernen ODER umformulieren zu "Vorteile von Apps:"
- ✅ Alle Marketing-Referenzen aus Strategien entfernen

---

### 3. Groß-/Kleinschreibung: "Nächster Stich"
**Anzahl:** 2 Vorkommen (potentiell falsch)

**Fundstellen:**
- `falscher_spieler` - "Ausnahme Nächster Stich: ..."
- `nichtfarben` - "Nächster Stich: ..."

**Korrektur nötig:**
- ✅ "Nächster Stich" → "nächster Stich" (wenn es eine Beschreibung ist, nicht Fachbegriff)
- ⚠️ Prüfen: Ist "Nächster Stich" ein Fachbegriff? → Dann groß lassen
- ⚠️ Im Zweifelsfall: Klein schreiben (gilt als Beschreibung)

---

## ✅ ERSTELLTE DOKUMENTE

1. **`PROMPT_KORREKTUR_AGENT.md`** - Vollständiger Prompt mit:
   - Detaillierte Aufgaben-Beschreibung
   - Beispiele für alle 3 Fehler-Typen
   - Entscheidungsregeln
   - Checklisten
   - Arbeitsanweisungen

2. **`START_PROMPT_KORREKTUR_AGENT.txt`** - Copy-paste-ready Start-Text für Agent

---

## 🚀 NÄCHSTE SCHRITTE

1. **Agent starten** mit START_PROMPT_KORREKTUR_AGENT.txt
2. **Korrekturen durchführen** nach PROMPT_KORREKTUR_AGENT.md
3. **Validierung** nach Abschluss
4. **Erneutes Deploy** nach Korrekturen

---

**Geschätzte Anzahl Korrekturen:** ~11 Fehler (2 Typos + 7 Quellenangaben + 2 Groß-/Kleinschreibung)

