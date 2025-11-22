# 🟣 PROMPT: Agent 5 - Referenzen (Experten/Autoren präzisieren)

**Agent:** Agent 5  
**Format:** Bulletpoints (IP-sicher, SEO/RAG-optimiert)  
**Artikel:** 4 Referenz-Artikel  
**Output:** `batches/BATCH_01E_REFERENZEN_AGENT5.md`

---

## 📋 IHRE AUFGABE

Sie sind **Agent 5** für die Content-Korrektur des Jasswiki.

### Ihre 4 Artikel:
1. `references_experts` - Experten und Fachleute ⚠️ **KRITISCH: Original ist präziser!**
2. `references_books` - Bücher zum Schweizer Jass
3. `references_documents` - Dokumente und Quellen
4. `references_usage` - Quellenverwendung im Kontext

**⚠️ WICHTIG:** Regel: **Grundsätzlich aus jass-content-v2.json übernehmen, AUSSER die Erwähnung der Experten und Autoren sind im Original präziser!**

---

## 🚨 SPEZIELLES PROBLEM: `references_experts`

### Original (jass-lexikon.json) - PRÄZISER!:
```
Experten und Fachleute:

**Fabian Cadonau**
- Herausgeber von Trumpf As
- Veranstalter von hunderten von Jassturnieren

**Göpf Egg & Albert Hagenbucher**
- Autoren des offiziellen Schweizer Jassreglements
- Autoritäten für Regelauslegungen
- Experten für Turnierjass

**Michael Koller (Historiker und Berufsschullehrer)**
- Expertise in Etymologie des Jass
- Forschung zur Geschichte des "Matsch"-Begriffs

**Dani Müller**
- Autor von "Stöck, Stich, Wys: Der neue Schweizer Jassführer"
- Mitherausgeber mit der SRG
- Experte für moderne Jassregeln

**Remo Prinz**
- Gründer von jassguru.ch und Programmierer der Jassguru App
- Hat mit seinen Jassfreunden (u.a. mit Michael Koller) tausende Jass-Spiele festgehalten unter [jassstatistik.ch](https://jassstatistik.ch)
```

### Aktuell (jass-content-v2.json) - GENERALISIERT:
```
Verschiedene Personen und Institutionen bewahren Wissen über das Jassen.

Regelexperten haben offizielle Reglemente verfasst. Ihre Texte dienen als Grundlage für Turniere und bei Regelauslegungen.

Sprachwissenschaftler erforschen die Herkunft der Jassbegriffe. Sie analysieren historische Dokumente und vergleichen Dialekte, um die Etymologie zu klären.

Turnierorganisatoren verfügen über jahrzehntelange Praxiserfahrung. Sie haben hunderte Wettkämpfe durchgeführt und kennen die Turnierszene im Detail.

Digitale Entwickler haben das Jassen mit Technologie verbunden. Ihre Anwendungen ermöglichen statistische Analysen und langfristige Dokumentationen.

Museen und Kulturinstitutionen sammeln historische Karten und erforschen deren Herstellung. Sie bewahren materielles und immaterielles Wissen...
```

**Problem:** Original enthält **präzise Namen und Rollen**, aktuelle Version ist **generisch** ohne Namen!

**Lösung:** Original-Version übernehmen, aber in Bulletpoint-Format umwandeln!

---

## 🎯 FORMAT: BULLETPOINTS (WICHTIG!)

**⚠️ KRITISCH:** Alle korrigierten Versionen müssen im **Bulletpoint-Format** sein!

### Warum Bulletpoints?
- ✅ **SEO:** Höhere Chance auf Featured Snippets bei Google
- ✅ **RAG:** Bessere strukturierte Daten für ChatGPT-App
- ✅ **IP-Schutz:** Funktioniert trotzdem durch unterschiedliche Formulierungen
- ✅ **Lesbarkeit:** Schnelleres Erfassen der Informationen

### Bulletpoint-Format für Referenz-Artikel:

**⚠️ WICHTIG: Konsistente Reihenfolge!**

Für `references_experts`:
```
• Experten und Fachleute: [Einleitung]
• Fabian Cadonau: [Rolle/Beitrag]
• Göpf Egg & Albert Hagenbucher: [Rolle/Beitrag]
• Michael Koller: [Rolle/Beitrag]
• Dani Müller: [Rolle/Beitrag]
• Remo Prinz: [Rolle/Beitrag]
```

Für andere Referenz-Artikel:
```
• Definition/Kategorie: [Was ist es?]
• Punkt 1: [Beschreibung]
• Punkt 2: [Beschreibung]
• ...
```

**⚠️ NICHT:** Fließtext-Format oder willkürliche Reihenfolge  
**✅ JA:** Bulletpoint-Format mit konsistenter Struktur

---

## 🔍 SPEZIELLE PROBLEME IHRER ARTIKEL

Basierend auf der Analyse haben Ihre Artikel folgende Probleme:

### `references_experts` - KRITISCH
- **Problem:** Experten-Namen wurden generalisiert (Original ist präziser!)
- **Lösung:** Original-Version übernehmen, aber in Bulletpoint-Format umwandeln
- **⚠️ WICHTIG:** Alle Namen und Rollen aus Original beibehalten!

### `references_books` - ZU PRÜFEN
- **Problem:** Möglicherweise wurden Autoren-Namen entfernt (-274 Zeichen)
- **Lösung:** Prüfen, ob Original präzisere Autoren-Namen enthält
- **Regel:** Wenn Original präziser → Original übernehmen (Bulletpoint-Format)

### `references_documents` - ERWEITERT
- **Status:** Aktuell erweitert (+381 Zeichen)
- **Lösung:** Prüfen ob Ergänzungen sinnvoll sind, Format optimieren

### `references_usage` - ERWEITERT
- **Status:** Aktuell erweitert (+100 Zeichen)
- **Lösung:** Prüfen ob Ergänzungen sinnvoll sind, Format optimieren

---

## ✅ SINNVOLLE ERGÄNZUNGEN ÜBERNEHMEN

**⚠️ KRITISCH:** 
- **Regel:** Grundsätzlich aus `jass-content-v2.json` übernehmen
- **AUSSER:** Wenn Original **präzisere Experten/Autoren-Namen** enthält → Original bevorzugen!

### Entscheidungskriterien:

**Original bevorzugen wenn:**
- ✅ Enthält konkrete Namen (Personen, Bücher, Institutionen)
- ✅ Enthält präzise Rollen/Beschreibungen
- ✅ Aktuelle Version ist generisch ohne Namen

**Aktuelle Version bevorzugen wenn:**
- ✅ Enthält sinnvolle Ergänzungen
- ✅ Original und aktuell gleich präzise
- ✅ Aktuelle Version ist aktueller/umfangreicher

---

## 🔄 UMFORMULIERUNGS-REGELN FÜR BULLETPOINTS

### IP-Schutz durch Bulletpoints:
1. **Unterschiedliche Formulierungen:**
   - Original: "Herausgeber von Trumpf As"
   - Neu: "• Fabian Cadonau: Herausgeber von Trumpf As"

2. **Strukturierung:**
   - Original: Fließtext mit Namen und Rollen
   - Neu: Bulletpoints pro Person/Buch/Dokument

3. **Reihenfolge:**
   - **KONSISTENTE Struktur:** Einleitung → dann sortiert nach Relevanz
   - **NICHT variieren** für IP-Schutz! (IP-Schutz kommt durch unterschiedliche Formulierungen)

### Erlaubt:
- ✅ Verschiedene Formulierungen pro Bulletpoint
- ✅ Konsistente Struktur (Einleitung → Personen/Bücher/Dokumente)
- ✅ Eigene Formulierungen (aber Namen/Rollen beibehalten!)

### NICHT erlaubt:
- ❌ Gleiche Formulierungen wie Original (wenn übernommen)
- ❌ Namen/Rollen ändern oder weglassen
- ❌ Präzise Informationen generalisieren

---

## 📝 BATCH-FILE-FORMAT

Für jeden Artikel im Format:

```markdown
## Artikel 1: Experten und Fachleute (ID: references_experts)

### Status & Kategorie
- **ID:** `references_experts`
- **Titel:** Experten und Fachleute
- **Kategorie:** Referenzen
- **Status:** ORIGINAL_PRÄZISER
- **Kritisch:** ⚠️ JA - Original enthält präzise Namen!

### Problem-Beschreibung
Original enthält präzise Experten-Namen und Rollen, aktuelle Version ist generisch ohne Namen. Original-Version muss übernommen werden, aber in Bulletpoint-Format umgewandelt.

### Original-Inhalt (REFERENZ - PRÄZISER!)
```
[Original-Text mit präzisen Namen aus jass-lexikon.json]
```

### Aktueller Inhalt (ZU PRÜFEN)
```
[Generischer Text aus jass-content-v2.json]
```

### ✅ Korrigierte Version (NEU - Original übernommen, Bulletpoint-Format für SEO/RAG)

```
• Experten und Fachleute: [Einleitung]
• Fabian Cadonau: Herausgeber von Trumpf As, Veranstalter von hunderten von Jassturnieren
• Göpf Egg & Albert Hagenbucher: Autoren des offiziellen Schweizer Jassreglements, Autoritäten für Regelauslegungen
• Michael Koller: Historiker und Berufsschullehrer, Expertise in Etymologie des Jass
• Dani Müller: Autor von "Stöck, Stich, Wys: Der neue Schweizer Jassführer", Mitherausgeber mit der SRG
• Remo Prinz: Gründer von jassguru.ch und Programmierer der Jassguru App, tausende Jass-Spiele festgehalten unter jassstatistik.ch
```

### Verwandte Artikel (für spätere Verlinkung)
- `references_books` - Bücher von Experten
- `references_documents` - Dokumente von Experten
- `references_usage` - Quellenverwendung

### Umformulierungs-Techniken verwendet
- [x] Original übernommen (präzisere Namen!)
- [x] Fließtext → Bulletpoints (optimiert für SEO/RAG)
- [x] Strukturiert nach Personen (konsistente Reihenfolge)
- [x] Eigene Formulierungen (aber Namen/Rollen beibehalten!)
```

---

## ✅ CHECKLISTE PRO ARTIKEL

- [ ] Original mit aktueller Version verglichen
- [ ] **Original präziser bei Namen/Rollen?** ⚠️ KRITISCH (bei references_experts)
- [ ] Alle Namen/Rollen aus Original enthalten? (wenn präziser)
- [ ] Inhaltlich korrekt? (Zahlen, Fakten)
- [ ] IP-sicher umformuliert? (unterschiedliche Formulierungen)
- [ ] **Bulletpoint-Format verwendet?** ⚠️ KRITISCH
- [ ] **Konsistente Struktur eingehalten?** ⚠️ WICHTIG
- [ ] Verwandte Artikel identifiziert (2-4 pro Artikel)
- [ ] Umformulierungs-Techniken dokumentiert

---

## 📚 REFERENZ-DOKUMENTE

**MUSS gelesen werden:**
- `CONTENT_VALIDIERUNG_PROMPT.md` - Validierungs-Richtlinien
- `IMPLEMENTATIONSPLAN_CONTENT_KORREKTUR.md` - Haupt-Plan
- `KOORDINATION_3_AGENTS.md` - Koordination
- `batches/PROMPT_AGENT1_BULLETPOINTS.md` - Format-Beispiele

**Datenquellen:**
- `/Users/remoprinz/Documents/Jassguru/jasstafel/src/data/jass-lexikon.json` - Original (NUR lesen, NICHT kopieren!)
- `/Users/remoprinz/Documents/Jassguru/jasswiki/src/data/jass-content-v2.json` - Aktuelle Version (lesen)

---

## 🚀 START

1. **Lies zuerst die Referenz-Dokumente**
2. **Lade Original und aktuelle Version für alle 4 Artikel**
3. **Prüfe für jeden Artikel:** Ist Original präziser (besonders bei Namen)?
4. **Erstelle `batches/BATCH_01E_REFERENZEN_AGENT5.md`**
5. **Verwende für jeden Artikel Bulletpoint-Format**
6. **Bei `references_experts`:** Original übernehmen (präzisere Namen!) aber Bulletpoint-Format

**WICHTIG:** 
- Alle korrigierten Versionen müssen Bulletpoints sein, NICHT Fließtext!
- Original bevorzugen wenn präzisere Experten/Autoren-Namen enthalten sind!
- Konsistente Struktur einhalten!

