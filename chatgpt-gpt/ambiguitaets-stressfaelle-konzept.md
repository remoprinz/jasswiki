# Ambiguitäts-Stressfälle: Konzept & Verbesserungen

## ✅ Was jetzt vorhanden ist (15 Stressfälle)

Kategorisiert nach Ambiguitäts-Typen:
- **Mehrdeutige Begriffe** (5): Bauer, Trumpf ansagen, schieben, Match, Punkte schreiben
- **Kontext fehlt** (4): Weis zählt, Stöck wert, bedienen, ausspielen
- **Varianten-abhängig** (3): Weise beim Coiffeur, Sechser-Punkte, Obeabe trumpfen
- **Zeitpunkt-abhängig** (3): Bedanken, Ausmachregel, Stöck melden

## 🎯 Zweck dieser Tests

1. **GPT-Rückfragen erzwingen:** Bei mehrdeutigen Fragen soll das GPT **nicht raten**, sondern gezielt nachfragen.
2. **Kontextverständnis prüfen:** Erkennt das GPT, welche Information fehlt?
3. **Varianten-Differenzierung:** Unterscheidet das GPT korrekt zwischen Schieber/Coiffeur/Obeabe/Undenufe?
4. **Anti-Halluzination:** Verhindert, dass das GPT bei Unsicherheit eine Antwort erfindet.

## 💡 Verbesserungsvorschläge

### 1) Erweiterte Kategorisierung

**Zusätzliche Ambiguitäts-Typen:**

**A) Team vs. Spieler:**
- "Wer bekommt die Punkte?" → Team oder einzelner Spieler (bei Molotow/Differenzler)?
- "Wer muss melden?" → Ich persönlich, oder mein Team (Partner darf Weis auch melden)?

**B) Regel vs. Tischregel:**
- "Darf ich die Karten anschauen?" → Grundregel (nein), aber Tischregeln variieren
- "Muss ich Farbe bekennen?" → Grundregel (ja), aber bei Trumpfzwang Ausnahmen

**C) Synonyme verwechseln:**
- "Was ist ein Puur?" → Trumpf-Bauer (Nell ist Trumpf-Neuner)
- "Was ist ein Nuller?" → Minusstrich (auch: Sack, Härdöpfel)

### 2) Erwartete GPT-Antworten dokumentieren

Für jeden Stressfall die **ideale Rückfrage** definieren:

| Frage | Erwartete GPT-Rückfrage | Wenn GPT korrekt rät, ist es… |
|-------|-------------------------|-------------------------------|
| "Wie viele Punkte ist der Bauer wert?" | "Meinst du den Trumpf-Bauer (20 Punkte), den Bauer in einer anderen Farbe (2 Punkte) oder vier Bauern als Weis (200 Punkte)?" | ✅ OK, wenn alle Optionen genannt |
| "Darf ich schieben?" | "Meinst du die Spielart Schieber oder die Aktion, den Trumpf an deinen Partner weiterzugeben?" | ✅ OK, wenn beide Bedeutungen abgefragt |
| "Zählt mein Weis noch?" | "Hast du den Weis vor dem ersten Ausspiel gemeldet? Hast du mindestens einen Stich gemacht? Bei welcher Variante spielst du (Trumpf, Obeabe, Undenufe)?" | ⚠️ Zu viele Rückfragen → reduzieren auf 1-2 |

### 3) Gewichtung nach Schwierigkeit

**Level 1 (Anfänger-Ambiguität):**
- Einfache Begriffsverwechslungen (Bauer, Match, schieben)
- Erwartung: GPT fragt nach, Nutzer versteht schnell

**Level 2 (Fortgeschritten):**
- Varianten-Unterschiede (Weise bei Obeabe vs. Trumpf)
- Erwartung: GPT erklärt Unterschied kurz, dann fragt nach Kontext

**Level 3 (Experten-Ambiguität):**
- Komplexe Regelkombinationen (Ausmachregel + Schneider + Stöck)
- Erwartung: GPT klärt schrittweise ab (nicht alles auf einmal)

### 4) Negativ-Tests (was GPT NICHT tun soll)

**Falsche Verhaltensweisen identifizieren:**

| Frage | ❌ Falsche GPT-Antwort | ✅ Korrekte GPT-Antwort |
|-------|------------------------|-------------------------|
| "Wie viele Punkte ist der Bauer wert?" | "Der Bauer ist 20 Punkte wert." (rät Trumpf-Bauer) | "Meinst du den Trumpf-Bauer, einen Bauer in einer anderen Farbe oder vier Bauern als Weis?" |
| "Zählt mein Weis noch?" | "Ja, der Weis zählt immer." (falsch!) | "Hast du den Weis vor dem ersten Ausspiel gemeldet und mindestens einen Stich gemacht?" |
| "Darf ich schieben?" | "Ja, beim Schieber darfst du schieben." (unklar welche Bedeutung) | "Meinst du die Spielart oder die Aktion, den Trumpf weiterzugeben?" |

### 5) Erweiterte Stressfälle (zusätzlich zu den 15)

**Weitere knifflige Fälle aus jass-content-v2.json:**

**Synonyme/Dialekt:**
- "Was ist der Nell wert?" → Nell = Trumpf-Neuner (14 Punkte), nicht verwechseln mit "Nuller" (Minusstrich)
- "Was bedeutet Stoecken?" → Verb (Stöck melden) vs. Nomen (die Stöcke selbst)

**Regel-Ausnahmen:**
- "Muss ich immer bedienen?" → Grundregel ja, aber Ausnahme bei "kann nicht bedienen" → Trumpf/andere Farbe spielen
- "Zählen Stöck auch bei Hindersi?" → Nein, Stöck zählen bei Hindersi NICHT (umgekehrte Regel!)

**Spielphase-abhängig:**
- "Kann ich noch Weis melden?" → Vor erstem Ausspiel ja, danach nein
- "Darf ich die Punkte korrigieren?" → Während nächstem Spiel ja, danach nur bei Beweis

**Partner-Koordination:**
- "Wer meldet den Weis?" → Jeder Spieler darf für sein Team melden
- "Darf ich meinen Partner auf Stöck hinweisen?" → NEIN, verboten!

### 6) Test-Metriken definieren

**Bewertungsskala für GPT-Antworten:**

| Kriterium | Bewertung | Beschreibung |
|-----------|-----------|--------------|
| **Rückfrage-Präzision** | 1-5 | Fragt das GPT genau die richtigen 1-2 Optionen ab? |
| **Keine Halluzination** | Ja/Nein | Erfindet das GPT eine Antwort oder gibt es ehrlich Unsicherheit zu? |
| **Kontext-Erkennung** | 1-5 | Erkennt das GPT, welche Info fehlt (Variante, Zeitpunkt, etc.)? |
| **Antwortlänge** | 1-5 | Bleibt die Rückfrage kurz (2-3 Sätze) oder zu lang? |
| **Follow-up** | Ja/Nein | Bietet das GPT nach Klärung eine hilfreiche Antwort? |

**Ziel-Benchmarks:**
- Rückfrage-Präzision: Ø >4.0 (von 5)
- Keine Halluzination: 100% (kritisch!)
- Kontext-Erkennung: Ø >4.0
- Antwortlänge: Ø >4.0 (kurz & prägnant)
- Follow-up: >80% (nach Klärung weiterhilfe)

### 7) Integration in Test-Workflow

**Wann diese Tests durchführen:**

1. **Phase 3 (Interne Tests):**
   - Alle 15 Ambiguitäts-Stressfälle systematisch durchgehen
   - Jede Antwort mit Bewertungsskala bewerten
   - Instruktionen anpassen, falls Rückfragen fehlen

2. **Phase 4 (Beta-Testing):**
   - Beta-Tester gezielt mit 3-5 ambigen Fragen konfrontieren
   - Prüfen, ob echte Nutzer die Rückfragen verstehen und beantworten

3. **Phase 6 (Monitoring):**
   - Nach Launch: Nutzer-Feedback zu "verwirrenden Antworten" sammeln
   - Neue Ambiguitäts-Fälle identifizieren und in Tests aufnehmen

### 8) Instruktionen-Optimierung basierend auf Stressfällen

**Ergänzungen für `instructions.md`:**

```markdown
## Ambiguität-Handling (Erweitert)

### Mehrdeutige Begriffe:
Wenn Nutzer Begriffe wie "Bauer", "Match", "schieben", "Trumpf" verwenden, prüfe:
- Welche Bedeutung ist gemeint? (z.B. Bauer als Karte, Position, oder Weis)
- Frage mit 2-3 klaren Optionen zurück, nicht mehr

Beispiel:
User: "Wie viele Punkte ist der Bauer wert?"
Du: "Meinst du den Trumpf-Bauer (20 Punkte), einen Bauer in einer anderen Farbe (2 Punkte) oder vier Bauern als Weis (200 Punkte)?"

### Varianten-Abhängigkeit:
Wenn die Antwort von der Variante abhängt (Schieber/Coiffeur/Obeabe/Undenufe), frage explizit:
- "Bei welcher Variante spielst du?"

### Zeitpunkt-Abhängigkeit:
Wenn die Regel vom Spielablauf abhängt, frage:
- "Vor oder nach dem ersten Ausspiel?"
- "Während des Stichs oder nach Stichende?"

### Maximal 2-3 Rückfragen pro Ambiguität
Nicht mehr als 2-3 Optionen auf einmal nennen, sonst Überforderung.
```

## 🚀 Zusammenfassung: Was macht die Tests jetzt besser?

### Vorher (alte Version):
- Zu generisch ("Darf ich im 9. Stich…")
- Keine echte Ambiguität (Antwort meist eindeutig)
- Keine Kategorisierung

### Jetzt (neue Version):
- ✅ 15 **echte** Ambiguitäts-Fälle aus `jass-content-v2.json`
- ✅ 4 **Kategorien** (mehrdeutige Begriffe, Kontext fehlt, Varianten, Zeitpunkt)
- ✅ Mit **erwarteten Antworten** (Pfeile zeigen, was GPT klären muss)

### Mit Verbesserungen:
- ✅ Erweitert auf **25+ Stressfälle** (inkl. Synonyme, Team vs. Spieler, Regel vs. Tischregel)
- ✅ **Test-Metriken** definiert (Rückfrage-Präzision, Halluzination, etc.)
- ✅ **Gewichtung** nach Schwierigkeit (Level 1-3)
- ✅ **Negativ-Tests** (was GPT NICHT tun soll)
- ✅ **Instruktionen-Ergänzungen** ready

## 📝 Nächster Schritt

Entscheiden Sie:
1. **Minimal:** 15 Stressfälle wie jetzt (reicht für MVP)
2. **Erweitert:** 25+ Stressfälle + Test-Metriken (gründlicher)
3. **Instruktionen anpassen:** Ambiguität-Handling explizit in `instructions.md` ergänzen

**Empfehlung:** Minimal (1) für MVP, später (2) + (3) nach Beta-Feedback.

