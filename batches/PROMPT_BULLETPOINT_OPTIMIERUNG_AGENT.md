# 🤖 PROMPT: Bulletpoint-Optimierung für alle Jasswiki-Artikel

## Deine Aufgabe

Du bist ein Experte für die Optimierung von Jass-Artikeln. Deine Aufgabe ist es, **alle 243 Artikel** aus `jass-content-v2.json` zu optimieren.

---

## KRITISCHE OPTIMIERUNGSREGELN

### 1. GRAMMATIK & HOCHDEUTSCH ⚠️ HÖCHSTE PRIORITÄT

**❌ FALSCH:**
- "Vorhand ansagt Trumpf:" (Substantivierung ohne Artikel)
- "Nachhand spielt aus" (als Überschrift)
- "Partner bedankt" (als Überschrift)

**✅ RICHTIG:**
- "Vorhand sagt Trumpf an:" (Verb korrekt konjugiert)
- "Nachhand spielt aus:" (Verb korrekt)
- "Der Partner bedankt sich:" (mit Artikel)

**REGEL:**
- Überschriften mit Verb → Verb IMMER korrekt konjugieren!
- Prüfe JEDE Überschrift auf korrektes Hochdeutsch
- Keine substantivierten Verben ohne Artikel

---

### 2. KEINE 2X DOPPELPUNKTE HINTEREINANDER

**❌ FALSCH:**
```
Gemeinsame Grundlagen:
Was überall gleich bleibt:
• ...
```

**✅ RICHTIG:**
```
Was überall gleich bleibt:
• ...
```

**ODER mit Leerzeile:**
```
Gemeinsame Grundlagen:

Was überall gleich bleibt:
• ...
```

---

### 3. ZERRISSENE SÄTZE ZUSAMMENFÜHREN

**❌ FALSCH:**
```
• Falls vor Spielbeginn keine Vereinbarung getroffen wurde
• Und auch keine lokale Gewohnheit bekannt ist
• Gilt standardmässig immer die Reihenfolge...
```

**✅ RICHTIG:**
```
• Falls vor Spielbeginn keine Vereinbarung getroffen wurde und auch keine lokale Gewohnheit bekannt ist, gilt standardmässig immer die Reihenfolge...
```

**REGEL:**
- Bulletpoint beginnt mit "Und", "Oder", "Aber", "Falls", "Wenn" → zusammenführen
- Bulletpoint beginnt mit Kleinbuchstaben → zusammenführen
- Logisch zusammenhängend (wenn-dann, entweder-oder) → zusammenführen

---

### 4. EINLEITUNGEN MIT LABELS

**❌ OHNE LABEL:**
```
• Drei aufeinanderfolgende Karten...
```

**✅ MIT LABEL:**
```
Definition:
• Drei aufeinanderfolgende Karten...
```

**LABELS:**
- "Definition:" → für Begriffsklärungen
- "Regel:" / "Grundregel:" → für Spielregeln
- "Beispiel:" → für konkrete Beispiele
- "Ablauf:" → für Schritt-für-Schritt
- "Voraussetzung:" → für Bedingungen
- "Übersicht:" / "Grundkonzept:" → für Zusammenfassungen

---

### 5. STRUKTUR BEI 5+ BULLETPOINTS

**❌ UNSTRUKTURIERT:**
```
• Punkt 1
• Punkt 2
• Punkt 3
• Punkt 4
• Punkt 5
• Punkt 6
• Punkt 7
```

**✅ STRUKTURIERT:**
```
Block A:
• Punkt 1
• Punkt 2
• Punkt 3

Block B:
• Punkt 4
• Punkt 5

Block C:
• Punkt 6
• Punkt 7
```

**REGEL:**
- Ab 5 Bulletpoints → in logische Blöcke aufteilen
- Jeder Block: aussagekräftige Überschrift mit Doppelpunkt
- Max 5 Bulletpoints pro Block

---

### 6. KEYWORDS AM ANFANG (SEO)

**❌ SUBOPTIMAL:**
```
• Beim Schieber gibt es drei taktische Säulen
```

**✅ BESSER:**
```
• Schieber-Taktiken basieren auf drei wesentlichen Säulen
```

**REGEL:**
- Haupt-Keyword im ersten Satz/Bulletpoint
- Aber nur, wenn es natürlich klingt!
- Kein erzwungenes Keyword-Stuffing

---

### 7. SYNONYME ERWÄHNEN (RAG)

**✅ GUT:**
```
• König und Ober (oder Dame)...
• Stöcke (Stock)...
• Under (Puur)...
```

**REGEL:**
- Synonyme in Klammern erwähnen
- Dialekt-Begriffe in Klammern
- Hilft bei SEO/RAG-Optimierung

---

### 8. KONTEXTUELLE EINLEITUNGEN

**❌ UNVOLLSTÄNDIG:**
```
Grundkonzept:
Trumpfansagen sind wichtige Konventionen für die Kommunikation mit dem Partner.
```

**✅ VOLLSTÄNDIG:**
```
Grundkonzept:
Beim Schieber ist es wichtig, in welcher Reihenfolge man seine Trümpfe spielt, um seinem Partner zu signalisieren, welche Trümpfe man in der Hand hält.
```

**REGEL:**
- Einleitung muss den KONTEXT liefern
- Nicht nur allgemein, sondern SPEZIFISCH für diesen Artikel
- Warum ist dieses Thema wichtig?

---

### 9. FLIESSTEXT VS. BULLETPOINTS

**Fließtext OHNE Bulletpoint:**
- Einleitungen (1-2 Sätze)
- Kontextuelle Erklärungen
- Übergänge zwischen Blöcken

**Bulletpoints:**
- Listen/Aufzählungen
- Regeln
- Fakten
- Beispiele

**REGEL:**
- Einzelne Aussage ohne Listen-Charakter → Fließtext
- Mehrere zusammenhängende Punkte → Bulletpoints

---

### 10. BLOCK-OPTIMIERUNG

**Ideale Block-Länge:**
- 2-5 Bulletpoints pro Block
- 1-2 Zeilen pro Bulletpoint
- Max 150 Zeichen pro Bulletpoint (wenn möglich)

**Zu lang?**
- >150 Zeichen UND logisch teilbar → splitten
- <150 Zeichen ODER untrennbar → zusammenhalten

---

## ARBEITSABLAUF

### Schritt 1: Artikel verstehen
- Lese den Artikel sorgfältig
- Verstehe den Inhalt
- **Falls unklar:** Flagge den Artikel für manuelle Prüfung

### Schritt 2: Probleme identifizieren
- Zerrissene Sätze?
- Fehlende Einleitungen?
- Schlechte Struktur (5+ Bulletpoints ohne Überschriften)?
- Grammatikfehler in Überschriften?
- 2x Doppelpunkte hintereinander?

### Schritt 3: Optimieren
- Wende alle 10 Optimierungsregeln an
- Prüfe jede Überschrift auf Grammatik
- Strukturiere logisch
- Keywords am Anfang (wenn natürlich)

### Schritt 4: Qualitätskontrolle
- Ist der Text scannbar?
- Sind Überschriften aussagekräftig?
- Ist die Grammatik korrekt?
- Sind Synonyme erwähnt?
- Ist der Kontext klar?

---

## OUTPUT-FORMAT

Für jeden optimierten Artikel:

```
## `artikel_id`

### ✅ OPTIMIERT:
```markdown
[Optimierter Text hier]
```

**Änderungen:**
- ✅ [Liste der Änderungen]
- ✅ [...]

**Inhaltlich:** ✅ Klar / ⚠️ UNKLAR (Grund: ...)
```

---

## CHECKLISTE PRO ARTIKEL

### Grammatik
- [ ] Alle Überschriften auf korrektes Hochdeutsch geprüft?
- [ ] Verben korrekt konjugiert?
- [ ] Keine substantivierten Verben ohne Artikel?

### Struktur
- [ ] Hat Einleitung mit Label (Definition:/Regel:/etc.)?
- [ ] Keine 2x Doppelpunkte hintereinander?
- [ ] Bei 5+ Bulletpoints: In Blöcke aufgeteilt?

### Inhalt
- [ ] Keywords im ersten Satz?
- [ ] Synonyme erwähnt?
- [ ] Kontext in Einleitung?

### Bulletpoints
- [ ] Zerrissene Sätze zusammengeführt?
- [ ] Max 150 Zeichen (wenn möglich)?
- [ ] Logisch gruppiert?

### Lesbarkeit
- [ ] Klare Hierarchie?
- [ ] Scannbar?
- [ ] Fließtext wo sinnvoll?

---

## BEISPIELE

### Beispiel 1: weis_rules_dreiblatt

**❌ VORHER:**
```
• Drei aufeinanderfolgende Karten derselben Farbe bilden ein Dreiblatt
• Wert: 20 Weispunkte

Gültigkeit:
• Gilt für sämtliche Jassvarianten, bei denen Weisen erlaubt sind
• Kann bei Spielen mit Trumpffarbe gewiesen werden
• Kann bei Undenufe gewiesen werden
• Kann bei Obenabe gewiesen werden

Voraussetzung:
• Der Weis muss vor dem ersten Ausspiel angemeldet werden
• Nur so bleibt er gültig
```

**✅ NACHHER:**
```
Definition:
• Drei aufeinanderfolgende Karten derselben Farbe bilden ein Dreiblatt (3 Blatt)
• Wert: 20 Weispunkte

Gültigkeit:
• Gilt für sämtliche Jassvarianten, bei denen Weisen erlaubt sind
• Kann bei Spielen mit Trumpffarbe gewiesen werden
• Kann bei Undenufe gewiesen werden
• Kann bei Obenabe gewiesen werden

Voraussetzung:
• Der Weis muss vor dem ersten Ausspiel angemeldet werden, nur so bleibt er gültig
```

**Änderungen:**
- ✅ "Definition:" hinzugefügt
- ✅ "(3 Blatt)" als Synonym ergänzt
- ✅ Zerrissenen Satz in "Voraussetzung" zusammengeführt

---

### Beispiel 2: schieber_taktiken_trump

**❌ VORHER:**
```
• Grundkonzept: Trumpfansagen sind wichtige Konventionen für die Kommunikation mit dem Partner
• Vorhand ansagt Trumpf: Wer Puur und Nell hält, spielt zuerst Nell...
```

**✅ NACHHER:**
```
Grundkonzept:
Beim Schieber ist es wichtig, in welcher Reihenfolge man seine Trümpfe spielt, um seinem Partner zu signalisieren, welche Trümpfe man in der Hand hält.

Vorhand sagt Trumpf an:
• Wer Puur und Nell hält, spielt zuerst Nell...
```

**Änderungen:**
- ✅ "Vorhand ansagt" → "Vorhand sagt an" (korrekte Grammatik!)
- ✅ Kontextuelle Einleitung hinzugefügt
- ✅ Strukturiert

---

## STARTE JETZT!

Beginne mit BATCH 1 (20 Artikel):
1. weis_rules_achtblatt
2. weis_rules_ausmachen_basics
3. weis_rules_ausmachen_early_thanking
4. weis_rules_ausmachen_order
5. weis_rules_ausmachen_schneider
6. weis_rules_ausmachen_thanking
7. weis_rules_dreiblatt
8. weis_rules_fuenfblatt
9. weis_rules_general
10. weis_rules_kreuzweis
11. weis_rules_neunblatt
12. weis_rules_notation_basics
13. weis_rules_notation_correction
14. weis_rules_notation_numbers
15. weis_rules_sechsblatt
16. weis_rules_siebenblatt
17. weis_rules_stock
18. weis_rules_stock_hindersi
19. weis_rules_vier_gleiche
20. weis_rules_vierblatt

Verarbeite jeden Artikel sorgfältig und erstelle ein Output-File:
`BULLETPOINT_OPTIMIERUNG_BATCH01_FINAL.md`

