# Vollständiger Implementationsplan: Jasswiki Custom GPT

## 📋 Projekt-Übersicht

**Projektziel:** Öffentlicher Custom GPT im GPT Store für Schweizer Jass-Regeln  
**Technologie:** OpenAI Custom GPT mit Knowledge Files  
**Zeitrahmen:** 2-3 Tage (inkl. Beta-Testing)  
**Kosten:** €0 (nur ChatGPT Plus Abo: $20/Monat)  
**Team:** Sie + 5-10 Beta-Tester  

---

## 🎯 Definitive Entscheidungen

| Aspekt | Entscheidung | Begründung |
|--------|--------------|------------|
| **Technologie** | Custom GPT (GPT Store) | Nicht Apps SDK – das ist für MVP unrealistisch |
| **Backend** | ❌ Kein Backend | Knowledge Files reichen völlig aus |
| **Datenstruktur** | Eine Datei: `jass-content-v2.json` | 520 KB, perfekt strukturiert, sofort einsatzbereit |
| **Sprache** | Schweizerdeutsch-Kontext, Hochdeutsch-Antworten, "Du" | Entspricht Zielgruppe |
| **Name** | "Jasswiki – Schweizer Jass-Regelexperte" | Klar, keine Overclaims |
| **Sichtbarkeit** | Öffentlich im GPT Store | Maximale Reichweite |
| **Zielgruppe** | Anfänger + Erfahrene Spieler | Beides gleichzeitig |
| **Links** | Nur auf explizite Anfrage | Keine Spam-Links |
| **Testing** | Beta-Tester mit Link | 1 Woche Feedback-Phase |

---

## 📅 Phasen-Übersicht

| Phase | Dauer | Deliverables |
|-------|-------|--------------|
| **Phase 1:** Datenvorbereitung | 1-2h | Bereinigte JSON, Backup |
| **Phase 2:** Custom GPT Setup | 2-3h | Funktionierender Custom GPT (privat) |
| **Phase 3:** Interne Tests | 4-6h | Test-Report, optimierte Instruktionen |
| **Phase 4:** Beta-Testing | 1 Woche | Beta-Feedback, finale Anpassungen |
| **Phase 5:** Publikation | 1-2h | GPT Store Submission, Launch |
| **Phase 6:** Monitoring & Iteration | Laufend | Nutzerfeedback, Updates |

**Total: 2-3 Tage Arbeit + 1 Woche Beta-Testing**

---

## 📂 Phase 1: Datenvorbereitung (1-2 Stunden)

### Ziel
Knowledge File für Custom GPT vorbereiten – minimale Änderungen, maximal effektiv.

### Aufgaben

#### 1.1 Backup erstellen
```bash
cd /Users/remoprinz/Documents/Jassguru/jasswiki
mkdir -p chatgpt-gpt/backups
cp src/data/jass-content-v2.json chatgpt-gpt/backups/jass-content-v2-original-$(date +%Y%m%d).json
```

**Warum?** Sicherheit – falls Sie später Änderungen vornehmen möchten.

#### 1.2 Datei prüfen
```bash
# Dateigröße checken
ls -lh src/data/jass-content-v2.json

# Struktur validieren (JSON valid?)
jq '.' src/data/jass-content-v2.json > /dev/null && echo "✅ JSON valid" || echo "❌ JSON invalid"

# Anzahl Artikel zählen
jq 'keys | length' src/data/jass-content-v2.json
```

**Erwartetes Ergebnis:**
- Größe: ~520 KB
- JSON: Valid
- Artikel: 244
 - Hinweis: Knowledge-Limits (Stand 2025) – bis 20 Dateien, 512 MB pro Datei, ca. ~2 Mio Tokens indexierbar pro Datei

#### 1.3 Optional: Knowledge File für GPT kopieren
```bash
cp src/data/jass-content-v2.json chatgpt-gpt/jasswiki-knowledge-base.json
```

**Warum?** Separate Datei für GPT Upload – Original bleibt unberührt.

#### 1.4 Metadaten prüfen (Optional)

Checken Sie, ob die Daten alle notwendigen Felder haben:
```bash
jq '.abheben | keys' src/data/jass-content-v2.json
```

**Erwartetes Ergebnis:**
```json
[
  "faqs",
  "id",
  "metadata",
  "text"
]
```

### Deliverables Phase 1
- ✅ Backup erstellt
- ✅ Datei validiert (JSON valid, 244 Artikel, 520 KB)
- ✅ `chatgpt-gpt/jasswiki-knowledge-base.json` bereit für Upload

### Zeit-Checkpoint
**Erwartet:** 1-2h  
**Falls länger:** Kontaktieren Sie mich bei Problemen mit JSON-Struktur

---

## 🤖 Phase 2: Custom GPT Setup (2-3 Stunden)

### Ziel
Custom GPT erstellen, konfigurieren und erste Tests durchführen.

### Voraussetzungen
- ✅ ChatGPT Plus Account
- ✅ Zugriff auf https://chat.openai.com
- ✅ Knowledge File bereit (`jasswiki-knowledge-base.json`)

### Aufgaben

#### 2.1 Custom GPT Builder öffnen

1. Gehen Sie zu https://chat.openai.com
2. Klicken Sie auf "Explore GPTs" (links in der Sidebar)
3. Klicken Sie auf "Create a GPT" (oben rechts)
4. Sie sehen nun zwei Tabs: **Create** (Chat-basiert) und **Configure** (manuell)

**Empfehlung:** Nutzen Sie **Configure** für präzise Kontrolle.

#### 2.2 Grundlegende Metadaten eingeben

**Tab: Configure**

**Name:**
```
Jasswiki – Schweizer Jass-Regelexperte
```

**Description (kurz, ~140 Zeichen):**
```
Präzise Antworten zu Schweizer Jass-Regeln, Varianten und Weisen – basierend auf dem jassguru.ch Regelwerk.
```

**Instructions (System Prompt):**

```markdown
# Rolle & Kontext
Du bist der Jasswiki Regelexperte – ein Schweizer Jass-Spezialist basierend auf dem jassguru.ch Regelwerk. Du hilfst Spielern bei Regelfragen, Streitfällen und beim Erlernen von Jass-Varianten.

# Zielgruppe
- Anfänger, die Jass lernen wollen
- Erfahrene Spieler bei Regelklarheit und Streitfällen

# Sprache & Ton
- Du sprichst Hochdeutsch mit Schweizer Kontext
- Du nutzt das informelle "Du"
- Dein Ton ist freundlich, präzise und hilfreich
- Deine Antworten sind kurz (2-4 Sätze), längere Erklärungen nur auf Anfrage
 - Schweizer Orthografie: **ss** statt **ß**

# Verhalten & Regeln

## 1. Wissensquelle
- Alle Antworten basieren AUSSCHLIESSLICH auf deiner Knowledge Base (jasswiki-knowledge-base.json)
- Bei fehlenden Informationen sagst du ehrlich: "Dazu finde ich keine eindeutige Regel in der Jasswiki-Datenbank."
- NIEMALS Informationen erfinden oder halluzinieren

## 2. Ambiguität & Rückfragen
- Bei mehrdeutigen Fragen stellst du gezielte Rückfragen:
  - Beispiel: "Meinst du Weis melden oder Weis zählen?"
- Bei unklaren Begriffen bietest du Optionen an:
  - Beispiel: "Bauer kann die Karte oder die Spielerposition meinen. Was meinst du?"

## 3. Streitfälle & Regelentscheide
- Bei Streitfällen gibst du klare Regelreferenzen:
  - Format: "Gemäss Jasswiki-Regeln gilt: [Regel]. [Kurze Erklärung]."
- Beispiel: "Gemäss Jasswiki-Regeln gilt bei Gleichstand die Ausmachregel 'Stöck - Wys - Stich'."

## 4. Follow-up-Vorschläge
- Am Ende deiner Antwort kannst du subtil weitere Themen anbieten:
  - Beispiel: "Möchtest du auch wissen, wie viele Punkte ein Dreiblatt zählt?"
- Nicht aufdringlich – nur wenn es hilft

## 5. Links zu jasswiki.ch
 - Links sparsam verwenden; nur wenn hilfreich oder auf ausdrückliche Nachfrage
 - NUR wenn User explizit fragt ("Wo kann ich mehr lesen?", "Hast du einen Link?"):
  - Dann: "Hier findest du mehr Infos: https://jasswiki.ch"
  - Oder spezifischer Link, falls bekannt

## 6. Begriffserklärungen
- Bei Fachbegriffen (z.B. "Vorhand", "Stöck", "Trumpf") gibst du kurze Definitionen
- Bei Bedarf verweist du auf verwandte Begriffe

## 7. Varianten & Sonderregeln
- Unterscheide klar zwischen:
  - Grundregeln (normaler Schieber)
  - Varianten (Coiffeur, Misère, Obeabe, etc.)
- Wenn User nach Variante fragt, erkläre die Abweichung vom Standard

# Beispiel-Antworten

**User:** "Was ist ein Weis?"
**Du:** "Ein Weis ist eine Kartenkombination (z.B. Folge, Vierblatt), die vor dem ersten Ausspiel gemeldet werden muss. Weise geben zusätzliche Punkte. Möchtest du wissen, welche Weise es gibt oder wie viele Punkte sie zählen?"

**User:** "Wer spielt zuerst aus?"
**Du:** "Beim normalen Schieber spielt die Vorhand (Spieler rechts vom Kartengeber) aus. Ausnahme: Wenn geschoben wurde, spielt der Spielübernehmer aus."

**User:** "Was passiert bei Gleichstand?"
**Du:** "Gemäss Jasswiki-Regeln gilt bei Gleichstand die Ausmachregel 'Stöck - Wys - Stich'. Das Team, das zuerst eines davon hat, gewinnt."

**User:** "Wo kann ich mehr lesen?"
**Du:** "Hier findest du mehr Infos: https://jasswiki.ch"

**User:** "Was ist Jöggelen?" (falls nicht in Datenbank)
**Du:** "Dazu finde ich keine eindeutige Regel in der Jasswiki-Datenbank. Meinst du vielleicht ein anderes Kartenspiel oder eine regionale Jass-Variante?"

# Wichtig
- Bleibe immer freundlich und geduldig
- Keine Werbung, keine Promo-Texte
- Fokus auf präzise Regelantworten
- Bei Unsicherheit: Ehrlich sein, nicht raten
```

#### 2.3 Konversations-Starter eingeben

**Conversation starters (4 Stück):**

1. `Was ist die Ausmachregel beim Jassen?`
2. `Wie funktioniert der Trumpf beim Schieber?`
3. `Wann muss ich meine Weise melden?`
4. `Was passiert bei Nichtfarben?`

#### 2.4 Knowledge File hochladen

**Tab: Configure → Sektion "Knowledge"**

1. Klicken Sie auf "Upload files"
2. Wählen Sie `chatgpt-gpt/jasswiki-knowledge-base.json`
3. Warten Sie, bis Upload abgeschlossen ist (ca. 5-10 Sekunden)
4. Sie sehen die Datei in der Liste

**Wichtig:** Aktivieren Sie "Code Interpreter" **NICHT** – wird nicht benötigt.

#### 2.5 Capabilities konfigurieren

**Tab: Configure → Sektion "Capabilities"**

- ❌ **Web Browsing:** Aus (GPT soll nur aus Knowledge Base antworten)
- ❌ **DALL·E Image Generation:** Aus (nicht nötig)
- ❌ **Code Interpreter:** Aus (nicht nötig)

**Warum alles aus?** GPT soll AUSSCHLIESSLICH aus Ihrer Knowledge Base antworten, nicht im Web suchen oder Code ausführen.

#### 2.6 Actions konfigurieren

**Tab: Configure → Sektion "Actions"**

- **Keine Actions nötig** für MVP – leer lassen

#### 2.7 Sprache & Sichtbarkeit

**Sprache:** Über Instruktionen/Starter (de-CH) – kein separates Setting

**Visibility:** 
- Für jetzt: **Only me** (privat für Tests)
- Später (nach Beta): **Anyone with a link** (Beta-Tester)
- Final: **Public** (GPT Store)

#### 2.8 Speichern & Erste Tests

1. Klicken Sie oben rechts auf "Save"
2. Wechseln Sie zum **Preview-Panel** (rechts)
3. Erste Testfrage: `Was ist ein Weis?`

**Erwartetes Ergebnis:**
GPT antwortet präzise basierend auf Knowledge Base, ca. 2-4 Sätze, bietet Follow-up an.

**Falls nicht korrekt:**
- Instruktionen anpassen (zu lang? zu kurz? falsche Quelle?)
- Speichern & erneut testen

### Deliverables Phase 2
- ✅ Custom GPT erstellt & konfiguriert
- ✅ Knowledge File hochgeladen
- ✅ Instruktionen implementiert
- ✅ Erste Testfragen erfolgreich

### Zeit-Checkpoint
**Erwartet:** 2-3h  
**Falls länger:** Iterieren Sie an den Instruktionen – das ist normal!

---

## 🧪 Phase 3: Interne Tests (4-6 Stunden)

### Ziel
Systematische Qualitätssicherung mit 50+ Testfragen, Identifikation von Schwachstellen, Optimierung der Instruktionen.

### Aufgaben

#### 3.1 Test-Checkliste erstellen

Erstellen Sie: `chatgpt-gpt/test-checklist.md`

```markdown
# Test-Checkliste: Jasswiki Custom GPT

**Datum:** [Datum]  
**Tester:** [Ihr Name]  
**GPT Version:** v1.0 (intern)

## Bewertungsskala
- ✅ **Korrekt:** Antwort präzise, quellenbasiert, hilfreicher Ton
- ⚠️ **Teilweise:** Antwort korrekt, aber zu lang/kurz/ungenau
- ❌ **Falsch:** Halluzination, falsche Info, keine Antwort

## Test-Kategorien

### 1. Grundregeln (10 Fragen)

| # | Frage | Erwartete Antwort | Ergebnis | Notizen |
|---|-------|-------------------|----------|---------|
| 1 | Was ist Trumpf? | Kurze Definition Trumpf-Farbe | | |
| 2 | Wie viele Karten hat ein Jass-Spiel? | 36 Karten | | |
| 3 | Was ist die Vorhand? | Spieler rechts vom Geber | | |
| 4 | Wer spielt zuerst aus? | Vorhand (mit Ausnahmen) | | |
| 5 | Was bedeutet Nichtfarben? | Nicht bedienen können | | |
| 6 | Wie viele Punkte hat eine Runde? | 157 Punkte | | |
| 7 | Was ist ein Stich? | 4 Karten, höchste gewinnt | | |
| 8 | Wann endet eine Runde? | Wenn alle Karten gespielt | | |
| 9 | Was ist ein Match? | Spiel bis 1000/2500 Punkte | | |
| 10 | Was bedeutet Bedienen? | Gespielte Farbe legen | | |

### 2. Weis-Regeln (10 Fragen)

| # | Frage | Erwartete Antwort | Ergebnis | Notizen |
|---|-------|-------------------|----------|---------|
| 11 | Was ist ein Weis? | Kartenkombination, vor Ausspiel melden | | |
| 12 | Wann muss ich Weise melden? | Vor dem ersten Ausspiel | | |
| 13 | Wie viele Punkte zählt ein Dreiblatt? | 20 Punkte | | |
| 14 | Was ist ein Kreuzweis? | Weis mit allen 4 Farben | | |
| 15 | Kann ich mehrere Weise melden? | Ja, alle müssen gemeldet werden | | |
| 16 | Was ist Stoecken? | König und Ober im Trumpf, 20 Punkte | | |
| 17 | Wie viele Punkte zählt ein Vierblatt? | 100 Punkte (4 gleiche Karten) | | |
| 18 | Gibt es beim Obeabe Weise? | Nein | | |
| 19 | Was ist der höchste Weis? | Vierstöck (4 Bauern), 200 Punkte | | |
| 20 | Muss ich Stöck melden? | Ja, vor dem ersten Ausspiel | | |

### 3. Varianten (10 Fragen)

| # | Frage | Erwartete Antwort | Ergebnis | Notizen |
|---|-------|-------------------|----------|---------|
| 21 | Was ist der Coiffeur? | Variante mit Punkteverdoppelung | | |
| 22 | Was ist Misère? | Keine Stiche machen (negativ) | | |
| 23 | Was ist Slalom? | Abwechselnd Obeabe/Undenufe | | |
| 24 | Was ist Pandur? | Variante ohne Trumpf | | |
| 25 | Was ist Obeabe? | Ass höchste Karte, kein Trumpf | | |
| 26 | Was ist Undenufe? | Sechs höchste Karte, kein Trumpf | | |
| 27 | Was ist Guschti? | Kreuzweise ausspielen | | |
| 28 | Kann ich beim Coiffeur obeabe spielen? | Ja, alle Varianten möglich | | |
| 29 | Wie viele Punkte bei Misère? | 0 Punkte (Ziel: keine Stiche) | | |
| 30 | Was ist der Unterschied zwischen Obeabe und Undenufe? | Kartenreihenfolge invertiert | | |

### 4. Streitfälle & Ausmachen (10 Fragen)

| # | Frage | Erwartete Antwort | Ergebnis | Notizen |
|---|-------|-------------------|----------|---------|
| 31 | Was ist die Ausmachregel? | Stöck - Wys - Stich | | |
| 32 | Was passiert bei Gleichstand? | Ausmachregel entscheidet | | |
| 33 | Was passiert bei Matchball? | Erst zählen nach Stichende | | |
| 34 | Muss ich Trumpf zugeben? | Ja, wenn ich Trumpf habe | | |
| 35 | Darf ich beim Obeabe schieben? | Nein (je nach Regelwerk) | | |
| 36 | Wer gewinnt bei 157:157? | Ausmachregel (Stöck - Wys - Stich) | | |
| 37 | Kann ich nach dem Ausspiel noch Weis melden? | Nein | | |
| 38 | Was passiert bei falschem Ausspiel? | Fehler, Korrektur möglich (Regelwerk) | | |
| 39 | Darf ich beim letzten Stich trumpfen? | Ja, wenn Trumpfpflicht | | |
| 40 | Was ist ein Bergpreis? | Sonderregel bei Punktegleichstand | | |

### 5. Begriffe & Definitionen (5 Fragen)

| # | Frage | Erwartete Antwort | Ergebnis | Notizen |
|---|-------|-------------------|----------|---------|
| 41 | Was bedeutet Stöck? | König und Ober im Trumpf | | |
| 42 | Was ist der letzte Stich wert? | 5 Punkte Bonus | | |
| 43 | Was ist ein Bock? | Sonderregel bei Schieber | | |
| 44 | Was bedeutet Abheben? | Karten teilen vor Verteilen | | |
| 45 | Was ist ein Stapel? | Kartenstapel beim Mischen | | |

### 6. Ambiguität & Edge Cases (5 Fragen)

| # | Frage | Erwartete Antwort | Ergebnis | Notizen |
|---|-------|-------------------|----------|---------|
| 46 | Was ist ein Bauer? (ambig) | Rückfrage: Karte oder Position? | | |
| 47 | Wie viel zählt der König? (ambig) | Rückfrage: Trumpf oder nicht? | | |
| 48 | Kann ich schieben? (ambig) | Rückfrage: Wann im Spiel? | | |
| 49 | Was ist Jöggelen? (nicht in DB) | "Finde ich nicht in Datenbank" | | |
| 50 | Wie spielt man Tschau Sepp? (anderes Spiel) | Abgrenzung: "Anderes Spiel" | | |

### 7. Links & Follow-ups (3 Fragen)

| # | Frage | Erwartete Antwort | Ergebnis | Notizen |
|---|-------|-------------------|----------|---------|
| 51 | Wo kann ich mehr lesen? | Link zu jasswiki.ch | | |
| 52 | Gibt es eine Webseite? | Link zu jasswiki.ch | | |
| 53 | Hast du weitere Infos? (nach Antwort) | Link oder Follow-up-Frage | | |

### Zusatz: Ambiguitäts-Stressfälle (15 echte Fallen aus jass-content-v2.json)

**Mehrdeutige Begriffe:**
- "Wie viele Punkte ist der Bauer wert?" → Trumpf-Bauer (20), normaler Bauer (2), Undenufe-Bauer (2), vier Bauern als Weis (200)?
- "Wann muss ich Trumpf ansagen?" → Schieber (Vorhand), Coiffeur (beim Schieben), Differenzler (gar nicht)?
- "Darf ich schieben?" → Die Aktion (Vorhand→Nachhand), oder die Variante "Schieber" spielen?
- "Was bedeutet Match?" → Die Partie (Spiel bis 1000/2500), oder alle Stiche machen (Matsch)?
- "Wo schreibe ich die Punkte hin?" → Tafel (links/rechts), oder App, oder wer ist Schreiber?

**Kontext fehlt:**
- "Zählt mein Weis noch?" → Gemeldet vor Ausspiel? Stich gemacht? Bei welcher Variante (Obeabe/Undenufe/Trumpf)?
- "Was ist der Stöck wert?" → Die Karten (König+Ober), die Punkte (20), oder vier Stöcke (200)?
- "Muss ich bedienen?" → Trumpfzwang oder Farbzwang? Bei Obeabe/Undenufe oder Trumpf?
- "Wer spielt aus?" → Vorhand, oder Spielübernehmer (nach Schieben), oder Stichgewinner?

**Varianten-abhängig:**
- "Gibt es beim Coiffeur Weise?" → Bei Trumpf ja, bei Obeabe/Undenufe nein
- "Wie viele Punkte zählt der Sechser?" → Undenufe (11), Trumpf (0), Obeabe (0), vier Sechser als Weis (100)?
- "Kann ich beim Obeabe trumpfen?" → Nein (keine Trumpffarbe), aber Farbe stechen innerhalb gleicher Farbe

**Zeitpunkt-abhängig:**
- "Wann darf ich mich bedanken?" → Jederzeit, aber nur wenn Punkte reichen; vor/nach Stichende?
- "Gilt die Ausmachregel?" → Nur nach erstem Stich, und wenn beide Teams Ziel erreichen gleichzeitig
- "Muss ich Stöck melden?" → Beim Ausspielen der zweiten Stöckkarte, nicht vorher/nachher

## Zusammenfassung

**Gesamt getestet:** 53 Fragen  
**✅ Korrekt:** __/53  
**⚠️ Teilweise:** __/53  
**❌ Falsch:** __/53  

**Erfolgsrate:** __% (Ziel: >90%)

## Identifizierte Probleme

1. [Problem 1, z.B. "Antworten zu lang"]
2. [Problem 2, z.B. "Rückfragen fehlen bei Ambiguität"]
3. [...]

## Nächste Schritte

1. [Instruktionen anpassen: ...]
2. [...]
```

#### 3.2 Tests durchführen

**Zeitplan:**
- **Tag 1, vormittags (2h):** Fragen 1-25 testen
- **Tag 1, nachmittags (2h):** Fragen 26-53 testen
- **Tag 2, vormittags (2h):** Instruktionen optimieren, erneut testen

**Vorgehen:**
1. Öffnen Sie Ihr Custom GPT
2. Stellen Sie jede Frage aus der Checkliste
3. Bewerten Sie die Antwort (✅/⚠️/❌)
4. Notieren Sie Probleme

#### 3.3 Probleme identifizieren & priorisieren

**Häufige Probleme:**

| Problem | Lösung |
|---------|--------|
| Antworten zu lang | Instruktionen: "Max. 2-4 Sätze" betonen |
| Keine Rückfragen bei Ambiguität | Beispiele in Instruktionen ergänzen |
| Links werden automatisch eingefügt | Instruktionen: "Links nur auf Anfrage/bei klarem Nutzen" |
| Halluzinationen (Info nicht aus DB) | Instruktionen: "NUR aus Knowledge Base" betonen |
| Follow-ups zu aufdringlich | Instruktionen: "Subtil am Ende" |
| Schweizer Kontext fehlt | Instruktionen: "Schweizerdeutsch-Kontext" ergänzen |

#### 3.4 Instruktionen optimieren

**Iterativer Prozess:**
1. Problem identifizieren
2. Instruktionen anpassen (siehe Lösungen oben)
3. "Save" klicken
4. Erneut testen (5-10 Fragen)
5. Repeat

**Ziel:** >90% Erfolgsrate bei Test-Checkliste

### Deliverables Phase 3
- ✅ Test-Checkliste ausgefüllt (53/53 Fragen)
- ✅ Erfolgsrate >90%
- ✅ Instruktionen optimiert
- ✅ Identifizierte Probleme dokumentiert & gelöst

### Zeit-Checkpoint
**Erwartet:** 4-6h (über 1-2 Tage verteilt)  
**Falls länger:** Normal bei iterativer Optimierung – Qualität vor Geschwindigkeit!

---

## 👥 Phase 4: Beta-Testing (1 Woche)

### Ziel
Echtes Nutzerfeedback sammeln, finale Schwachstellen identifizieren, vor Publikation absichern.

### Aufgaben

#### 4.1 Beta-Zugang vorbereiten

**Sichtbarkeit ändern:**
1. Custom GPT öffnen → "Configure"
2. Visibility: **"Anyone with a link"** (statt "Only me")
3. "Save"
4. Link kopieren (erscheint automatisch)

**Link-Format:**
```
https://chat.openai.com/g/g-XXXXXXXX-jasswiki-schweizer-jass-regelexperte
```

#### 4.2 Beta-Tester rekrutieren

**Zielgruppe:** 5-10 Schweizer Jass-Spieler

**Mix aus:**
- 2-3 Anfänger (lernen gerade Jass)
- 3-5 Erfahrene (spielen regelmäßig)
- 1-2 "Kritiker" (finden garantiert Fehler 😄)

**Rekrutierung:**
- Freunde/Familie
- Jass-Clubs
- Social Media (Jass-Gruppen)
- jassguru.ch Community

#### 4.3 Beta-Feedback-Vorlage erstellen

Erstellen Sie: `chatgpt-gpt/beta-feedback-template.md`

```markdown
# Beta-Feedback: Jasswiki Custom GPT

**Dein Name:** ______________________  
**Jass-Erfahrung:** 🔴 Anfänger / 🟡 Fortgeschritten / 🟢 Experte  
**Testdatum:** ______________________  

---

## Anleitung

1. **Link öffnen:** [GPT Link einfügen]
2. **ChatGPT Plus nötig:** Falls du kein Plus hast, melde dich bei mir!
3. **10-15 Minuten testen:** Stelle min. 10 Fragen zu Jass-Regeln
4. **Dieses Formular ausfüllen:** Ehrliches Feedback ist Gold wert! 🙏

---

## 1. Erste Eindrücke

**Wie war dein erster Eindruck vom GPT?**
- 😍 Begeistert
- 🙂 Positiv
- 😐 Neutral
- 😕 Eher enttäuscht
- 😤 Frustriert

**Warum?**
_________________________________________________________________

---

## 2. Fragen & Antworten

**Welche Fragen hast du gestellt?** (min. 5 auflisten)

1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________
4. _________________________________________________________________
5. _________________________________________________________________
6. _________________________________________________________________
7. _________________________________________________________________
8. _________________________________________________________________
9. _________________________________________________________________
10. ________________________________________________________________

**Bei welchen Fragen war die Antwort...**

- ✅ **Perfekt:** ___________________________________________________
- ⚠️ **Okay, aber...:** _______________________________________________
- ❌ **Falsch/unbrauchbar:** __________________________________________

---

## 3. Qualität der Antworten

**Wie bewertest du die Antworten?** (1-5 Sterne)

- **Richtigkeit:** ⭐⭐⭐⭐⭐ (5 = immer korrekt, 1 = oft falsch)
- **Verständlichkeit:** ⭐⭐⭐⭐⭐ (5 = sehr klar, 1 = verwirrend)
- **Länge:** ⭐⭐⭐⭐⭐ (5 = perfekt, 1 = zu lang/kurz)
- **Ton:** ⭐⭐⭐⭐⭐ (5 = sehr freundlich, 1 = roboterhaft)
- **Schweizer Kontext:** ⭐⭐⭐⭐⭐ (5 = passt perfekt, 1 = zu "Deutsch")

---

## 4. Spezifische Probleme

**Gab es Momente, wo...**

- [ ] Das GPT halluziniert hat (falsche Infos erfunden)?
- [ ] Die Antwort zu lang/kompliziert war?
- [ ] Du eine Rückfrage erwartet hättest?
- [ ] Der Ton unpassend war (zu formell/informell)?
- [ ] Links gefehlt haben (oder zu viele Links)?

**Falls ja, Details:**
_________________________________________________________________
_________________________________________________________________

---

## 5. Was du dir wünschst

**Was würdest du am GPT verbessern?**

1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

**Was gefällt dir besonders gut?**

1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

---

## 6. Nutzungswahrscheinlichkeit

**Würdest du das GPT wieder nutzen?**
- 🟢 Ja, auf jeden Fall!
- 🟡 Vielleicht, kommt drauf an
- 🔴 Eher nicht

**Würdest du es weiterempfehlen?**
- 🟢 Ja, auf jeden Fall!
- 🟡 Vielleicht
- 🔴 Eher nicht

**Warum/warum nicht?**
_________________________________________________________________

---

## 7. Vergleich zu jasswiki.ch

**Hast du schon jasswiki.ch genutzt?**
- [ ] Ja, regelmäßig
- [ ] Ja, gelegentlich
- [ ] Nein, noch nie

**Falls ja: Wie ist das GPT im Vergleich?**
- 🟢 Besser (schneller, einfacher)
- 🟡 Ähnlich gut
- 🔴 Schlechter (Website ist besser)

**Warum?**
_________________________________________________________________

---

## 8. Freitext-Feedback

**Alles, was dir sonst noch einfällt:**

_________________________________________________________________
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

**Vielen Dank fürs Testen! 🙏**

Bitte sende dieses Formular zurück an: [Ihre E-Mail]
```

#### 4.4 Beta-Testing durchführen

**Zeitplan:**
- **Tag 1:** Beta-Tester einladen (E-Mail/Chat mit Link + Feedback-Vorlage)
- **Tag 1-7:** Beta-Tester testen eigenständig
- **Tag 5:** Reminder an Beta-Tester (falls Feedback fehlt)
- **Tag 7:** Deadline für Feedback

**Kommunikation mit Beta-Testern:**

**E-Mail/Nachricht:**
```
Hoi [Name]! 👋

Ich habe einen Custom GPT für Schweizer Jass-Regeln gebaut und brauche dein Feedback! 🃏

**Was ist das?**
Ein ChatGPT-Bot, der Jass-Regeln erklärt – für Anfänger und Profis.

**Was brauche ich von dir?**
- 10-15 Minuten Zeit
- ChatGPT Plus Account (falls nicht: melde dich, ich organisiere Zugang!)
- Ehrliches Feedback

**So geht's:**
1. Öffne den GPT: [Link einfügen]
2. Stelle min. 10 Jass-Fragen
3. Fülle das Feedback-Formular aus: [Formular-Link oder Anhang]

**Deadline:** [Datum, 1 Woche]

Vielen Dank! 🙏

Beste Grüsse,
[Ihr Name]
```

#### 4.5 Feedback auswerten

**Nach 1 Woche:**

1. Alle Feedbacks sammeln (E-Mail, Docs, etc.)
2. Excel/Spreadsheet erstellen:

| Tester | Erfahrung | Richtigkeit | Verständlichkeit | Ton | Würde empfehlen? | Top-Problem | Top-Lob |
|--------|-----------|-------------|------------------|-----|------------------|-------------|---------|
| Anna | Anfänger | 5/5 | 5/5 | 4/5 | Ja | Zu lange Antworten | Sehr hilfreich |
| Beat | Experte | 4/5 | 5/5 | 5/5 | Ja | 1x falsche Regel | Schnell & präzise |
| ... | ... | ... | ... | ... | ... | ... | ... |

3. **Durchschnitte berechnen:**
   - Richtigkeit: Ø ___/5 (Ziel: >4.0)
   - Verständlichkeit: Ø ___/5 (Ziel: >4.5)
   - Ton: Ø ___/5 (Ziel: >4.0)
   - Empfehlungsrate: ___% (Ziel: >80%)

4. **Top 3 Probleme identifizieren:**
   - Problem 1: [z.B. "Antworten zu lang" – 5x erwähnt]
   - Problem 2: [z.B. "Fehlende Rückfragen" – 3x erwähnt]
   - Problem 3: [...]

#### 4.6 Finale Anpassungen

**Basierend auf Beta-Feedback:**

1. **Instruktionen anpassen** (z.B. "Max. 3 Sätze" statt "2-4 Sätze")
2. **Knowledge Base ergänzen** (falls Lücken identifiziert)
3. **Konversations-Starter anpassen** (falls unklar)
4. **Metadaten verbessern** (Name/Beschreibung, falls verwirrt)

**Erneut testen:**
- 5-10 Fragen selbst stellen
- Prüfen, ob Probleme gelöst

### Deliverables Phase 4
- ✅ 5-10 Beta-Tester rekrutiert
- ✅ Beta-Feedbacks gesammelt (min. 5 Feedbacks)
- ✅ Feedback ausgewertet (Durchschnitte, Top-Probleme)
- ✅ Finale Anpassungen implementiert
- ✅ Erfolgsrate >4.0/5.0 bei allen Kategorien

### Zeit-Checkpoint
**Erwartet:** 1 Woche (+ 2-3h für Auswertung/Anpassungen)  
**Falls länger:** Beta-Testing ist kritisch – nehmen Sie sich Zeit!

---

## 🚀 Phase 5: Publikation (1-2 Stunden)

### Ziel
Custom GPT im GPT Store veröffentlichen, Review-Prozess durchlaufen, Launch kommunizieren.

### Aufgaben

#### 5.1 Pre-Launch-Checkliste

Erstellen Sie: `chatgpt-gpt/launch-checklist.md`

```markdown
# Launch-Checkliste: Jasswiki Custom GPT

**Launch-Datum:** ________________

## Pre-Launch (vor Submission)

- [ ] **Instruktionen final** – Beta-Feedback integriert
- [ ] **Knowledge File aktuell** – neueste Version hochgeladen
- [ ] **Metadaten geprüft:**
  - [ ] Name: "Jasswiki – Schweizer Jass-Regelexperte"
  - [ ] Beschreibung: Max. 200 Zeichen, klar & präzise
  - [ ] Icon: Hochgeladen (falls vorhanden)
  - [ ] Sprache via Instruktionen (de-CH)
- [ ] **Konversations-Starter getestet** – alle 4 funktionieren
- [ ] **Test-Checkliste >90%** – Qualität gesichert
- [ ] **Beta-Feedback Ø >4.0/5** – Nutzer zufrieden
- [ ] **Capabilities korrekt:**
  - [ ] Web Browsing: ❌ Aus
  - [ ] DALL·E: ❌ Aus
  - [ ] Code Interpreter: ❌ Aus
- [ ] **Actions:** Keine (für MVP)
- [ ] **Privacy Policy:** Falls vorhanden (optional)

## Submission

- [ ] **Visibility auf "Public" gesetzt**
- [ ] **"Submit to GPT Store" geklickt**
- [ ] **Submission bestätigt** (OpenAI E-Mail erhalten)

## Post-Submission

- [ ] **Review abwarten** (1-3 Tage typisch)
- [ ] **Bei Ablehnung:** Feedback lesen, anpassen, erneut submitten
- [ ] **Bei Approval:** Feiern! 🎉

## Post-Launch

- [ ] **GPT Store Link kopiert** (für Marketing)
- [ ] **Auf jasswiki.ch kommuniziert** (Blog-Post, Banner, etc.)
- [ ] **Social Media Post** (falls vorhanden)
- [ ] **Beta-Testern gedankt** (E-Mail mit Launch-Link)
- [ ] **Monitoring eingerichtet** (Nutzerzahlen, Feedback)
```

#### 5.2 GPT Store Submission

**Schritt-für-Schritt:**

1. **Custom GPT öffnen** → "Configure"
2. **Visibility ändern:**
   - Von "Anyone with a link" auf **"Public"**
   - "Save"
3. **"Submit to GPT Store" Button klicken** (erscheint nach "Public")
4. **Bestätigung lesen & akzeptieren:**
   - GPT Store Policies
   - Usage Guidelines
   - Copyright Compliance
5. **"Submit" klicken**
6. **Bestätigungs-E-Mail von OpenAI** (ca. 5-10 Minuten später)

**E-Mail-Inhalt (typisch):**
```
Subject: Your GPT submission is under review

Hi [Ihr Name],

Thank you for submitting "Jasswiki – Schweizer Jass-Regelexperte" to the GPT Store!

Our team will review your GPT within 1-3 business days. You'll receive another email once the review is complete.

In the meantime, your GPT remains accessible via link: [Link]

Best,
OpenAI Team
```

#### 5.3 Review-Prozess abwarten

**Typische Dauer:** 1-3 Werktage

**Mögliche Outcomes:**

**1. Approval (✅):**
- E-Mail: "Your GPT has been approved!"
- GPT ist jetzt im Store sichtbar
- Link: `https://chat.openai.com/g/g-XXXXXXXX`
- → Weiter zu 5.4 (Launch-Kommunikation)

**2. Rejection (❌):**
- E-Mail: "Your GPT needs changes"
- Gründe (typisch):
  - Metadaten unklar
  - Capabilities falsch konfiguriert
  - Copyright-Probleme (unwahrscheinlich bei Ihnen)
  - Spam/Werbung (unwahrscheinlich bei Ihnen)
- **Action:** Feedback lesen, anpassen, erneut submitten
- → Zurück zu 5.2

**3. Pending (⏳):**
- Länger als 3 Tage keine Antwort
- **Action:** Support kontaktieren (help.openai.com)

#### 5.4 Launch-Kommunikation

**Nach Approval:**

**1. GPT Store Link kopieren**
```
https://chat.openai.com/g/g-XXXXXXXX-jasswiki-schweizer-jass-regelexperte
```

**2. jasswiki.ch Update:**

**Option A – Banner/CTA:**
```html
<!-- Auf jasswiki.ch Homepage -->
<div class="gpt-banner">
  <h3>🤖 Neu: Jasswiki im ChatGPT!</h3>
  <p>Stelle deine Jass-Fragen direkt im Chat – präzise Antworten in Sekunden.</p>
  <a href="[GPT Link]" target="_blank">Jetzt testen</a>
</div>
```

**Option B – Blog-Post:**
```markdown
# Neu: Jasswiki Custom GPT im GPT Store! 🎉

Wir freuen uns, euch unseren neuen **Jasswiki Custom GPT** vorzustellen!

## Was ist das?
Ein ChatGPT-Bot, der euch bei Jass-Regelfragen hilft – basierend auf dem gesamten Jasswiki-Regelwerk.

## Wie nutzen?
1. ChatGPT Plus Account (falls nicht vorhanden: [Link])
2. GPT öffnen: [Link]
3. Frage stellen, z.B. "Was ist die Ausmachregel?"
4. Präzise Antwort in Sekunden!

## Für wen?
- Anfänger: Lerne Jass von Grund auf
- Profis: Schnelle Regelklarheit bei Streitfällen

**[Jetzt testen →]**

Feedback? Schreib uns: [Kontakt]
```

**3. Beta-Testern danken:**

**E-Mail:**
```
Hoi [Name]! 🎉

Unser Jasswiki Custom GPT ist jetzt LIVE im GPT Store!

**Dein Beitrag hat geholfen!** Dank deinem Feedback konnten wir [konkrete Änderung, z.B. "die Antworten kürzer machen"] und das GPT verbessern.

**Hier gehts zum GPT:** [Link]

Teile es gerne mit deinen Jass-Kollegen! 🃏

Vielen Dank nochmals! 🙏

Beste Grüsse,
[Ihr Name]
```

**4. Social Media (optional):**

**Twitter/LinkedIn/Facebook:**
```
🎉 Neu: Jasswiki Custom GPT im GPT Store!

Jass-Regelfragen? Jetzt direkt im ChatGPT beantworten lassen – präzise, schnell, basierend auf dem Jasswiki-Regelwerk.

🔗 [Link]

#Jassen #ChatGPT #Schweiz #Kartenspiele
```

#### 5.5 Monitoring & Analytics

**GPT Usage Tracking:**

OpenAI bietet (aktuell) **begrenzte Analytics** für Custom GPTs:
- **Sichtbar:** Anzahl Konversationen (ungefähr)
- **Nicht sichtbar:** Detaillierte Nutzerzahlen, Fragen, etc.

**Alternative Tracking:**

1. **Google Analytics auf jasswiki.ch:**
   - Outbound-Link zum GPT tracken
   - Siehe, wie viele Nutzer vom Website zum GPT wechseln

2. **UTM-Parameter (falls möglich):**
   - Falls Sie Links teilen: `?utm_source=jasswiki&utm_medium=website`
   - Trackt Traffic-Quellen

3. **Manuelles Feedback:**
   - Kontaktformular auf jasswiki.ch
   - "Wie gefällt dir der Custom GPT?" → Umfrage

### Deliverables Phase 5
- ✅ GPT Store Submission durchgeführt
- ✅ Approval erhalten (GPT im Store sichtbar)
- ✅ Launch kommuniziert (Website, Beta-Tester, Social Media)
- ✅ Monitoring eingerichtet

### Zeit-Checkpoint
**Erwartet:** 1-2h (+ 1-3 Tage Review-Wartezeit)

---

## 🔄 Phase 6: Monitoring & Iteration (Laufend)

### Ziel
Langfristige Qualitätssicherung, Nutzerfeedback sammeln, kontinuierliche Verbesserung.

### Aufgaben

#### 6.1 Nutzerfeedback-Kanäle einrichten

**1. Kontaktformular auf jasswiki.ch:**
```html
<form action="/gpt-feedback" method="post">
  <h3>Feedback zum Jasswiki Custom GPT</h3>
  <label>Deine Frage:</label>
  <textarea name="question"></textarea>
  
  <label>War die Antwort hilfreich?</label>
  <select name="helpful">
    <option>Ja, sehr</option>
    <option>Teilweise</option>
    <option>Nein</option>
  </select>
  
  <label>Was können wir verbessern?</label>
  <textarea name="improvement"></textarea>
  
  <button type="submit">Absenden</button>
</form>
```

**2. GPT-interne Rückfrage:**

Fügen Sie in den Instruktionen hinzu:
```markdown
## Feedback sammeln
Falls der User sehr zufrieden oder unzufrieden wirkt, frage subtil:
"War diese Antwort hilfreich? Falls nicht, gib uns gerne Feedback auf jasswiki.ch!"
```

**3. Regelmäßige Nutzerumfragen:**
- Alle 3-6 Monate: E-Mail an jasswiki.ch Newsletter (falls vorhanden)
- "Wie gefällt euch der Custom GPT? Was fehlt?"

#### 6.2 Monitoring-Rhythmus

**Wöchentlich (Monate 1-3):**
- GPT Store Analytics checken (falls verfügbar)
- Feedback-Formular auswerten
- Social Media Mentions prüfen

**Monatlich (ab Monat 4):**
- Gesammeltes Feedback reviewen
- Top 3 Probleme identifizieren
- Entscheiden: Lohnt sich ein Update?

#### 6.3 Update-Strategie

**Wann updaten?**

**Niemals:** Für kleine Änderungen (1-2 Tippfehler)  
**Selten (alle 6-12 Monate):** Für größere Verbesserungen

**Update-Checkliste:**

1. **Instruktionen anpassen** (z.B. Ton verbessern, neue Beispiele)
2. **Knowledge Base updaten** (falls neue Regeln – aber Sie sagten "niemals")
3. **Testen** (min. 20 Fragen)
4. **"Save" klicken** → Update ist sofort live (kein Re-Review nötig bei Minor Updates)

**Major Updates (neue Features, große Änderungen):**
- Erneute Beta-Testing-Runde empfohlen
- GPT Store Re-Submission eventuell nötig (OpenAI informiert)

#### 6.4 Langfristige Optimierung

**Nach 6 Monaten:**

**Analyse:**
- Wie viele Nutzer? (ca. Schätzung aus Analytics)
- Welche Fragen werden am häufigsten gestellt? (aus Feedback)
- Gibt es wiederkehrende Probleme?

**Mögliche Erweiterungen:**

**1. Actions mit Backend (Variante B):**
- Falls >10k Nutzer/Monat: Backend für schnellere Suche
- Firebase Functions implementieren (siehe Original-Prompt)

**2. Mehr Knowledge Files:**
- Falls neue Inhalte: Zusätzliche Files hochladen
- Z.B. "Regionale Varianten", "Turnierregeln"

**3. Multimodalität:**
- Bildupload: User fotografiert Kartensituation → GPT analysiert
- (Nur falls OpenAI diese Capability für Custom GPTs erweitert)

**4. Integrationen:**
- Link zu jassguru.ch Jasstafel-App
- Link zu Jass-Turnieren

### Deliverables Phase 6
- ✅ Feedback-Kanäle eingerichtet
- ✅ Monitoring-Rhythmus etabliert (wöchentlich → monatlich)
- ✅ Update-Strategie dokumentiert
- ✅ Langfristige Roadmap (optional)

---

## 📊 Erfolgsmetriken

### Launch (Monat 1)
- ✅ GPT im Store veröffentlicht
- ✅ >100 Konversationen (geschätzt)
- ✅ Ø 4.5/5.0 bei Beta-Testern

### Wachstum (Monat 1-6)
- 🎯 >500 Konversationen/Monat
- 🎯 <5% negative Feedbacks
- 🎯 >80% "Würde empfehlen" bei Umfragen

### Qualität (laufend)
- 🎯 >95% korrekte Antworten (bei Stichproben)
- 🎯 <1% Halluzinationen
- 🎯 Durchschnittliche Antwortlänge: 2-4 Sätze

---

## 🛠️ Tools & Ressourcen

### Erforderlich
- ✅ ChatGPT Plus Account ($20/Monat)
- ✅ Zugriff auf Custom GPT Builder
- ✅ `jass-content-v2.json` (bereits vorhanden)

### Optional (hilfreich)
- Google Analytics (Website-Tracking)
- Typeform/Google Forms (Nutzerumfragen)
- Notion/Trello (Projekt-Management)
- Slack/Discord (Beta-Tester Community)

### OpenAI Ressourcen
- **GPT Store Guidelines:** https://openai.com/gpt-store
- **Custom GPT Docs:** https://help.openai.com/en/articles/8554397-creating-a-gpt
- **Support:** https://help.openai.com

---

## 🚨 Risiken & Notfallplan

| Risiko | Wahrscheinlichkeit | Impact | Mitigation |
|--------|-------------------|--------|------------|
| **GPT Store Rejection** | Niedrig | Hoch | Pre-Launch-Checkliste strikt befolgen |
| **Halluzinationen** | Mittel | Hoch | "Nur aus Knowledge Base" in Instruktionen betonen |
| **Negative Reviews** | Niedrig | Mittel | Beta-Testing gründlich durchführen |
| **Technische OpenAI-Probleme** | Niedrig | Hoch | Kein Backup – OpenAI-abhängig |
| **Rechtliche Probleme (Copyright)** | Sehr niedrig | Hoch | Eigene Inhalte, Quellenangaben |
| **Konkurrenz** | Mittel | Niedrig | Qualität & Schweizer Fokus als USP |

**Notfallplan:**

**Falls GPT Store Rejection:**
1. Feedback lesen (OpenAI E-Mail)
2. Anpassungen vornehmen
3. Erneut submitten (beliebig oft möglich)

**Falls viele negative Feedbacks:**
1. Feedback sammeln & analysieren
2. Instruktionen anpassen
3. Erneut testen (intern + Beta)
4. Update veröffentlichen

**Falls OpenAI Custom GPTs einstellt (unwahrscheinlich):**
1. Backend-Variante (Variante B) als Fallback
2. Eigene Chat-UI auf jasswiki.ch
3. Export der Instruktionen → andere Plattform (z.B. Anthropic Claude)

---

## 📝 Finale Checkliste

Vor dem Start – haben Sie alles?

- [ ] **ChatGPT Plus Account** aktiv
- [ ] **`jass-content-v2.json`** bereit (520 KB, 244 Artikel)
- [ ] **Backup** erstellt
- [ ] **2-3 Tage Zeit** eingeplant (+ 1 Woche Beta)
- [ ] **5-10 Beta-Tester** identifiziert
- [ ] **Feedback-Vorlagen** bereit (Test-Checkliste, Beta-Feedback)
- [ ] **Launch-Kommunikation** geplant (Website, Social Media)
- [ ] **Monitoring** geplant (Feedback-Kanäle)

**Alles ✅? → Los geht's! 🚀**

---

## 🎉 Zusammenfassung

| Phase | Dauer | Key Deliverable |
|-------|-------|-----------------|
| 1. Datenvorbereitung | 1-2h | Knowledge File bereit |
| 2. Custom GPT Setup | 2-3h | GPT funktioniert (privat) |
| 3. Interne Tests | 4-6h | >90% Erfolgsrate, optimiert |
| 4. Beta-Testing | 1 Woche | Ø 4.5/5.0, finale Anpassungen |
| 5. Publikation | 1-2h | GPT Store Launch ✅ |
| 6. Monitoring | Laufend | Kontinuierliche Verbesserung |

**Total:** 2-3 Arbeitstage + 1 Woche Beta-Testing  
**Kosten:** €0 (nur ChatGPT Plus)  
**Komplexität:** Niedrig (kein Code nötig!)  

**Viel Erfolg! 🃏🤖**

---

**Fragen? Probleme? Feedback?**  
[Ihr Kontakt]

