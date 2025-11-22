#  Strukturdokument: Jass-Inhalt & Bot-Architektur

Dies ist eine bereinigte und strukturierte Version des gesamten bereitgestellten Jass-Inhalts sowie der technischen Konzepte, um eine zentrale Wissensbasis zu schaffen.

---

## ÜBERGEORDNET

### 1. Charakter Jassguru bzw. Jassfee
- Sprüche
- Humor
- Aussprache

### 2. Allgemeines
- Schweizer Jass-Gefografie
- Kartenwerte
- Orientierung
- Spielverteilen
- Spielweise
- Wahl der Variante

### 3. Weisregeln
- Schreibweise
- Weis
- Stöck
- Ausmachen

### 4. Schieber
_(Hauptfokus mit eigenem Inhaltsverzeichnis)_

#### Der Schieber (Grundlagen)
Der Schieber ist die meistgespielte Jassart - und somit teilnehmermässig die Sportart Nr. 1 in der Schweiz. Wichtig ist, dass der Partner nach bestem Wissen und Können orientiert wird. Der Anhang «Taktisches Vorgehen» gibt darüber Auskunft.

**Für 4 Spieler:**
Aus einem verdeckten Kartenspiel ziehen alle Spieler eine Karte. Die beiden Spieler mit den höheren Karten bilden die eine, diejenigen mit den niedrigeren Karten die andere Partei. Die Partner sitzen sich im Kreuz gegenüber.

**Das Spielgeben:**
Alle 4 Spieler ziehen aus einem verdeckten Kartenspiel eine Karte. Derjenige mit der niedrigsten Karte verteilt zum ersten Spiel. Jeder Teilnehmer erhält 9 Karten.

**Der Weis:**
→ Gemäss Weisregeln Seite 37

**Das Trumpfmachen:**
Vorhand kann eine beliebige Farbe als Trumpf bestimmen oder schieben. Schiebt er, muss sein Partner die Trumpffarbe wählen. Vorhand beginnt immer mit dem ersten Ausspiel.

#### Der Schieber mit Bergpreis
Diejenige Partei, die zuerst die Hälfte des Zieles erreicht hat, gewinnt den «Bergpreis». Bei Gleichstand entscheidet die Ausmachregel «Stöck - Wys - Stich».

#### Weitere Varianten (Mittendurch, Slalom, TUO)
- **Mittendurch/ Gusti/Tutti:** vier Stiche Obenabe, fünf Stiche Undenufe oder umgekehrt.
- **Slalom/ Zick-Zack:** abwechslungsweise Undenufe, Obenabe oder umgekehrt.
- **TUO (3x3):** drei Stiche Trumpf, drei Stiche Undenufe, drei Stiche Obenabe.

#### Obenabe-/ Undenufe-Schieber
- **Kartenkonstellationen:** Benötigt viele hohe Stechkarten (Asse/Könige für Obenabe, Sechser/Siebner für Undenufe).
- **Bewertung:**
    - **Obenabe:** Asse 11 Punkte, Achter 8 Punkte.
    - **Undenufe:** Sechser 11 Punkte, Asse 0 Punkte, Achter 8 Punkte.
- **Wichtig:** Eine normale Schieberpartie (alle Varianten einfach bewertet) geht auf 1'000 Punkte.

### 5. Weitere Jass-Varianten
- Tschau-Sepp
- Jasskenntnisse
- Spiel zu viert
- Dr Ufgleit
- Kreuz-Jass
- Palette-Jass
- Hand-Jass / Butzer / Sack-Jass / Schläger
- Pandur
- Zuger
- Stopp-Jass
- Bieter / Steiger
- Schnelle Steiger
- Schafhauser
- Differenzler
- Schmaus
- Aucho
- Cinq Cents
- Viehändler
- Schellen-Jass
- Schaufe-Dame-Jass
- Shilten-Ober-Jass
- Guggitaler
- Molotiv
- Mittlere
- Sidi-Barrani
- Boschweik
- Zwicke-Jass
- Hindersi-Jass
- Ramset
- Schagg-Haas
- Bettel
- Zuger Tapp
- Nidwaldner Kaiserspiel
- Rumba
- Hosenabe-Jass

### 6. Preisjassen
- **Allgemeines:** Eine Passe à 12 Spiele mit zugelostem Partner. Jedes Spiel zählt 157 Punkte, keine Weis- und Stöckpunkte.
- Reglement Differenzler
- Spiel zu viert mit Bodentrumpf

### 7. Jasstipps (Taktik & Strategien)
- **Taktik Schieberspiel:** Gekonntes Zusammenspiel ist äusserst wichtig. Durch richtiges Vorgehen in der Spielweise seine Karten «aufdecken».
- **Konventionen (Quelle: jassguru.ch):** Regeln, an die sich alle halten sollten, um sich „blind“ zu verstehen.
- **Anziehen und Verwerfen:** Die wichtigsten Mittel, um mit seinen Karten zu kommunizieren.

### 8. Jass-Ausdrücke
- Hier der komplette Glossar

### 9. Websites
- jassverzeichnis.ch

---
---

## Anhang: Technisches Konzept & Bot-Architektur

### 1. Aktuelle Struktur & Herausforderungen
- Daten sind in verschiedenen Dateien (general.ts, stock.ts etc.) segmentiert.
- Jeder Content-Block hat Metadaten (category, dialect, confidence etc.).
- Embeddings werden für Chunks erstellt und in Pinecone gespeichert.
- Einfache Vektor-Ähnlichkeitssuche für Antworten.

### 2. Optimierungspotenziale
- **A. Semantische Strukturierung:** Hierarchische Kategorisierung, Schwierigkeitsgrade, kontextuelle Verbindungen.
- **B. Kontextuelle Intelligenz:** Gesprächskontext-Tracking, User-Profiling, Situationserkennung.
- **C. Function Calling Integration:** Spezialisierte Funktionen wie `explainRule()`, `translateToDialect()`.

### 3. Vorgeschlagenes Konzept
- **Phase 1: Intelligente Datenorganisation:** Feinere Segmentierung, Verknüpfungslogik, Gewichtung der Regeln.
- **Phase 2: Kontextuelle Verarbeitung:** Input-Analyse, Intentionserkennung, Komplexitätsbewertung.
- **Phase 3: Function Calling Integration:** Spezialisierte Handler (Regelerklärer, Situationsberater, etc.).

### 4. Vorteile dieser Architektur
- Präzisere, kontextbewusste und personalisierte Antworten.
- Bessere Regelpriorisierung und natürlichere Dialoge.
- Modulare Struktur, einfache Erweiterbarkeit und bessere Testbarkeit.

### 5. Implementierungsvorschlag
- **Datenebene:** Feinere Content-Segmentierung, erweiterte Metadaten.
- **Verarbeitungsebene:** Kontextmanager, Funktionsrouter, Antwortgenerator.
- **Interaktionsebene:** Dialogmanager, Personalisierungsengine, Feedbackschleife.

### 6. Nächste Schritte
- Bestehende Daten nach neuem Schema reorganisieren.
- Function Calling Framework implementieren.
- Kontextmanagement aufbauen und Testfälle entwickeln.

### 7. Grundstruktur der Daten (Beispiel)
```typescript
interface JassContent {
  id: string;
  text: string;
  metadata: {
    category: {
      main: 'RULES' | 'TACTICS' | 'CULTURE' | 'BASICS';
      sub: string;
      topic: string;
    };
    keywords: string[];
    situations: ('LEARNING' | 'PLAYING' | 'DISPUTE' | 'TOURNAMENT')[];
    importance: number;  // 0-1
    difficulty: number;  // 1-3
  }
}
```

### 8. Workflow-Beispiel (Systematischer Ablauf)
1.  **Content-Verarbeitung:** `general.ts` -> `contentUploader.ts` -> `createMemoryEntry()`
    - Embedding wird generiert.
    - `ChunkService` verarbeitet den Text und bereitet ihn als Memory-Eintrag vor.
2.  **Initialisierung & Upload:** `initializeContent.ts` startet den Upload-Prozess nach Pinecone.
3.  **Anfrageverarbeitung (App.tsx):**
    - `handleUserQuestion()` generiert Embedding für die Nutzerfrage.
    - `searchService.search()` sucht ähnliche Chunks in Pinecone.
    - Die Ergebnisse werden als Kontext an den Chat-Bot weitergegeben.

### 9. Code-Schnipsel & Prompts (Zu prüfen)

#### System-Prompt
Soll dieser Prompt wieder eingefügt werden?
```
WICHTIG: 
1. Du bist ein Jassexperte. Nutze NUR den gegebenen Kontext für deine Antworten.
2. Wenn die Frage unklar ist oder du sie nicht verstehst:
   - Antworte mit "Entschuldigung, ich verstehe deine Frage nicht ganz. Meinst du..."
   - Füge konkrete Rückfragen hinzu
   - KEINE allgemeinen Jass-Informationen geben
3. Bei klaren Fragen:
   - Antworte präzise mit den Regeln
   - Keine zusätzlichen Erklärungen oder Floskeln
Relevante Jassregeln:
${context}
```

#### History-Kombination
Soll dieser Code beibehalten werden?
```javascript
const history = [
  { role: 'model', parts: enhancedPrompt },
  ...messages.map(msg => ({
    role: msg.isUser ? 'user' : 'model',
    parts: msg.text
  }))
];
```

#### Feinheiten im Code
Sollen Details wie die ß->ss Ersetzung oder die erweiterte Satzextraktion beibehalten werden?
```javascript
// Nur ß -> ss Ersetzung
text: validateResponse(fullResponse),

// Erweiterte Liste von Abkürzungen
const abbreviations = ['St', 'Dr', 'z.B', 'usw'];
```

---
### INHALTSVERZEICHNIS SCHIEBER (Beispiel)
- Schieber (Für 4, 2, 6 Spieler)
- Differenz-Schieber
- Schieber mit Bergpreis
- Coiffeur-Schieber
- Obenabe-/ Undenufe-Schieber
... etc.
