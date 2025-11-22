# 🎯 Intelligente Bulletpoint-Struktur-Optimierung

## Problem-Analyse

### 1. Aktuelle Probleme
- ❌ **Zerrissene Sätze:** Ein Satz über mehrere Bulletpoints verteilt
- ❌ **Fehlende Einleitungen:** Direkt Bulletpoints ohne Kontext
- ❌ **Überflüssige Bulletpoints:** Einzelne Sätze, die keinen Bulletpoint brauchen
- ❌ **Schlechte Hierarchie:** Keine klare Struktur (Hauptpunkte vs. Details)

### 2. Beispiele

#### ❌ SCHLECHT: Zerrissener Satz
```
Standardregelung:
• Falls vor Spielbeginn keine Vereinbarung getroffen wurde
• Und auch keine lokale Gewohnheit bekannt ist
• Gilt standardmässig immer die Reihenfolge «Stöck - Wys - Stich»
```

#### ✅ GUT: Zusammenhängender Satz
```
Standardregelung:
• Falls vor Spielbeginn keine Vereinbarung getroffen wurde und auch keine lokale Gewohnheit bekannt ist, gilt standardmässig immer die Reihenfolge «Stöck - Wys - Stich»
```

#### ❌ SCHLECHT: Fehlende Einleitung
```
• Drei aufeinanderfolgende Karten derselben Farbe bilden ein Dreiblatt
• Wert: 20 Weispunkte
• Gilt für sämtliche Jassvarianten
```

#### ✅ GUT: Mit Einleitung
```
Definition:
• Drei aufeinanderfolgende Karten derselben Farbe bilden ein Dreiblatt
• Wert: 20 Weispunkte

Gültigkeit:
• Gilt für sämtliche Jassvarianten, bei denen Weisen erlaubt sind
```

---

## 🧠 Intelligente Optimierungs-Regeln

### Regel 1: Wann KEIN Bulletpoint?
- Einzelne Aussage → normaler Absatz
- Einleitungssatz → ohne Bulletpoint, mit Doppelpunkt

### Regel 2: Wann Bulletpoints zusammenführen?
- Bulletpoint beginnt mit: "Und", "Oder", "Aber", "Falls", "Wenn dann"
- Bulletpoint beginnt mit Kleinbuchstaben
- Bulletpoint ist Satzmitte (kein Verb am Anfang)
- Logisch zusammenhängend (wenn-dann, entweder-oder)

### Regel 3: Wann Einleitungssatz mit Doppelpunkt?
- **Definition:** Wenn erklärt wird, WAS etwas ist
- **Beispiel:** Wenn konkrete Beispiele folgen
- **Regel:** Wenn mehrere Regeln aufgelistet werden
- **Ablauf:** Wenn Schritte folgen
- **Voraussetzung:** Wenn Bedingungen folgen

### Regel 4: Wann Sub-Überschriften?
- Bei Artikeln mit 3+ verschiedenen Themen
- Klare thematische Trennung
- Bessere Scanbarkeit

---

## 📊 SEO & RAG Optimierung

### SEO (Featured Snippets)
✅ **Google bevorzugt:**
- Klare Struktur mit Überschriften
- Bulletpoints für Listen/Aufzählungen
- Kurze, prägnante Sätze
- Antworten auf konkrete Fragen

### RAG (Jassguru Chat)
✅ **Embedding-Modelle bevorzugen:**
- Semantische Einheiten (zusammenhängende Gedanken)
- Klare Kontexte (Einleitungen helfen!)
- Nicht zu fragmentiert
- Keywords in Nähe zueinander

### Lesbarkeit
✅ **Menschen bevorzugen:**
- Scanbarkeit (Überschriften, Bulletpoints)
- Logischer Fluss
- Keine zerrissenen Sätze
- Klare Hierarchie

---

## 🤖 Agent-Strategie

### Phase 1: Testlauf (5-10 Artikel)
1. **Agent analysiert** mit klaren Regeln
2. **Schlägt Optimierungen vor**
3. **User prüft & genehmigt**
4. **Agent lernt** aus Feedback

### Phase 2: Batch-Verarbeitung
1. **Agent optimiert** alle Artikel nach bewährten Regeln
2. **Erstellt Batch-Files** zur Überprüfung
3. **User genehmigt** pro Batch
4. **Script transferiert** zu JSON

---

## 🎯 Konkrete Optimierungs-Kriterien

### 1. Struktur-Check
- [ ] Sind Sätze über mehrere Bulletpoints verteilt? → Zusammenführen
- [ ] Fehlen Einleitungen? → Hinzufügen
- [ ] Gibt es einzelne Bulletpoints? → Zu Absatz umwandeln
- [ ] Sind Themen vermischt? → Sub-Überschriften einfügen

### 2. SEO-Check
- [ ] Beginnt mit klarer Definition?
- [ ] Sind Listen als Bulletpoints formatiert?
- [ ] Sind Schritte nummeriert?
- [ ] Sind Überschriften aussagekräftig?

### 3. RAG-Check
- [ ] Sind Keywords in Nähe zueinander?
- [ ] Sind Kontexte klar?
- [ ] Sind Einheiten semantisch zusammenhängend?
- [ ] Sind Synonyme erwähnt?

### 4. Lesbarkeits-Check
- [ ] Kann man den Text scannen?
- [ ] Ist die Hierarchie klar?
- [ ] Sind Sätze verständlich?
- [ ] Ist der Fluss logisch?

---

## ✅ Empfohlenes Vorgehen

### Schritt 1: Testlauf
Wähle 10 repräsentative Artikel aus verschiedenen Kategorien:
- 2 × Weis-Regeln (z.B. Dreiblatt, Ausmach-Reihenfolge)
- 2 × Varianten (z.B. Schieber, Differenzler)
- 2 × Begriffe (z.B. Stich, Trumpf)
- 2 × Regeln (z.B. Falscher Spieler, Schreiben)
- 2 × Geschichte/Grundlagen

### Schritt 2: Agent-Prompt erstellen
Mit klaren Richtlinien für:
- Struktur-Optimierung
- SEO-Optimierung
- RAG-Optimierung
- Lesbarkeits-Optimierung

### Schritt 3: User-Feedback
User prüft Testlauf und gibt Feedback:
- Was ist gut?
- Was ist zu aggressiv?
- Was fehlt?

### Schritt 4: Refinement
Agent-Prompt verfeinern basierend auf Feedback

### Schritt 5: Batch-Verarbeitung
Alle 242 Artikel in 5-10 Batches aufteilen

---

## 🚀 Nächster Schritt

**Soll ich beginnen mit:**
1. ✅ Testlauf mit 10 Artikeln?
2. ✅ Agent-Prompt erstellen?
3. ✅ Erste Optimierungen vorschlagen?

**Oder** möchten Sie erst die Optimierungs-Kriterien anpassen?

