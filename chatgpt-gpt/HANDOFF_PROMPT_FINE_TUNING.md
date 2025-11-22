# 🤝 Handoff-Prompt für Fine-Tuning Phase

## 📍 Aktueller Stand (November 2024)

### ✅ Was bereits erledigt ist:

1. **Pinecone Vector Database Setup**
   - Index `jasswiki` erstellt (768 Dimensionen, Cosine Similarity)
   - Namespaces: `articles` (244 Dokumente) und `faqs` (814 Dokumente)
   - Alle Daten erfolgreich hochgeladen (1058 Embeddings)
   - Script: `npm run rag:ingest` (lädt JSONL → Pinecone)

2. **Firebase Function (jasswikiQuery)**
   - **Location:** `/Users/remoprinz/Documents/Jassguru/jasswiki/functions/src/index.ts`
   - **Deployed:** ✅ Live auf `https://jasswikiquery-sktdhifofa-uc.a.run.app`
   - **Wichtigste Änderung:** Gibt jetzt nur noch **1 Result** zurück (Top-Result mit höchstem Score)
   - **Response Format:**
     ```typescript
     {
       results: [{
         id: string,
         text: string,  // ← VOLLSTÄNDIGER Artikel-Text
         score: number,
         title: string,
         canonical_url: string,
         category: { main, sub },
         see_also: string[],
         variant?: string
       }],
       metadata: { topK: 1, ... }
     }
     ```
   - **Key Code Location:** Zeilen 284-316 in `functions/src/index.ts`
   - **Deployment:** `cd functions && npm run deploy`

3. **ChatGPT Custom GPT Setup**
   - **Instructions Datei:** `/Users/remoprinz/Documents/Jassguru/jasswiki/chatgpt-gpt/API_SYSTEM_PROMPT.md`
   - **Kritische Anforderung:** ChatGPT muss den **KOMPLETTEN Artikel-Text** zitieren, nicht zusammenfassen
   - **Prompt-Key-Points:**
     - Verwendet `results[0].text` (vollständiger Artikel-Text)
     - Anweisung: "ZITIERE ALLES - kein Inhalt darf fehlen"
     - Du kannst in eigenen Worten strukturieren, aber **KEIN INHALT darf fehlen**
     - Verbot: Zusammenfassen, Inhalte weglassen

4. **Knowledge Base Files**
   - **Articles:** `chatgpt-gpt/jasswiki-articles.jsonl` (244 Artikel, 311K)
   - **FAQs:** `chatgpt-gpt/jasswiki-faqs.jsonl` (814 FAQs, 410K)
   - **WICHTIG:** Nur die **NICHT-refactored** Versionen verwenden! (Nicht `.refactored.jsonl`)
   - **Upload-Checkliste:** `chatgpt-gpt/upload-checklist.md`

5. **Neustart-Anleitung**
   - `chatgpt-gpt/NEUSTART-ANLEITUNG.md` - Komplette Anleitung für neuen GPT-Setup

---

## 🎯 Nächste Phase: Fine-Tuning

### Ziel:
Die ChatGPT-Antworten sollen **optimal** werden. Aktuell gibt ChatGPT zwar den vollständigen Artikel-Text zurück, aber es gibt noch Verbesserungspotential:

1. **Strukturierung:** Wie kann ChatGPT den langen Artikel-Text besser strukturieren?
2. **Priorisierung:** Welche Teile sind für die spezifische Frage am relevantesten?
3. **Tonalität:** Schweizerdeutsche Begriffe, "du"-Form, etc.
4. **Follow-ups:** Wie können `see_also` Links besser integriert werden?

### Mögliche Fine-Tuning Ansätze:

#### Option A: Prompt-Engineering (Erstmal versuchen!)
- **Location:** `chatgpt-gpt/API_SYSTEM_PROMPT.md`
- **Ziel:** Prompt so optimieren, dass ChatGPT den vollständigen Text besser strukturiert
- **Mögliche Verbesserungen:**
  - Strukturierungs-Hinweise: "Gruppiere ähnliche Informationen zusammen"
  - Priorisierung: "Beginne mit der direkten Antwort, dann Details"
  - Formatierung: "Verwende Absätze für bessere Lesbarkeit"
  - Beispiel-Outputs zeigen, wie die Antwort aussehen soll

#### Option B: Response-Format ändern (API-Seite)
- **Location:** `functions/src/index.ts`
- **Möglichkeit:** Strukturiertere Response zurückgeben
  - Beispiel: `{ summary: "...", details: "...", examples: "..." }`
  - Aber: ChatGPT soll ja den **kompletten Text** bekommen, nicht vorgefertigte Strukturen

#### Option C: Few-Shot Examples im Prompt
- **Location:** `chatgpt-gpt/API_SYSTEM_PROMPT.md`
- **Ziel:** Konkrete Beispiel-Inputs und Outputs zeigen
- **Beispiele für:**
  - Kurze Fragen → Komplette Antwort
  - Komplexe Fragen → Strukturierte Antwort mit allen Details
  - Mehrdeutige Fragen → Alles relevante zitieren

#### Option D: Post-Processing (nach API-Response)
- Nicht empfohlen, da ChatGPT den kompletten Text haben soll

---

## 📂 Wichtige Dateien & Locations

### Firebase Functions
```
/Users/remoprinz/Documents/Jassguru/jasswiki/functions/
├── src/
│   ├── index.ts          # ← Haupt-API (jasswikiQuery)
│   └── types.ts          # TypeScript Types
└── package.json
```

### ChatGPT Custom GPT
```
/Users/remoprinz/Documents/Jassguru/jasswiki/chatgpt-gpt/
├── API_SYSTEM_PROMPT.md       # ← System-Prompt für ChatGPT (wichtig!)
├── instructions.md             # Alte Instructions (Knowledge-Base basiert)
├── upload-checklist.md         # Upload-Anleitung
├── NEUSTART-ANLEITUNG.md       # Kompletter Neustart
├── jasswiki-articles.jsonl     # Articles (NICHT .refactored!)
└── jasswiki-faqs.jsonl         # FAQs (NICHT .refactored!)
```

### Pinecone & RAG
```
/Users/remoprinz/Documents/Jassguru/jasswiki/
├── scripts/
│   ├── ingest-to-pinecone.ts  # JSONL → Pinecone Upload
│   └── setup-pinecone-index.ts
├── lib/
│   └── rag-types.ts            # Shared Types
└── package.json                # Scripts: rag:ingest, rag:setup
```

---

## 🔧 Technische Details

### API Response Format (aktuell)
```typescript
interface RAGQueryResponse {
  results: [{
    id: string;
    text: string;              // ← VOLLSTÄNDIGER Artikel (komplett!)
    score: number;             // 0.0 - 1.0
    title?: string;
    canonical_url: string;
    category: { main, sub };
    see_also: string[];
    variant?: string;
  }];
  metadata: {
    topK: 1;                   // ← Immer 1!
    threshold: number;
    total_matches: number;
    ...
  };
}
```

### System-Prompt Key Points (aktuell)
- **Zugriff:** `results[0].text` (immer nur 1 Result)
- **Anweisung:** "ZITIERE ALLES - kein Inhalt darf fehlen"
- **Erlaubt:** In eigenen Worten strukturieren/anordnen
- **Verbot:** Zusammenfassen, Inhalte weglassen

### Score-Basierte Logik
- Score ≥ 0.80: Hochrelevant, kompletter Text zitieren
- Score 0.65-0.79: Relevant, kompletter Text mit Score-Hinweis
- Score < 0.65: Keine passende Antwort

---

## 🎯 Fine-Tuning Aufgaben

### 1. Prompt-Optimierung (Priorität: Hoch)
**Datei:** `chatgpt-gpt/API_SYSTEM_PROMPT.md`

**Ziel:** ChatGPT soll den vollständigen Text besser strukturieren, ohne Inhalte wegzulassen.

**Mögliche Verbesserungen:**
- Strukturierungs-Anweisungen hinzufügen
- Beispiel-Outputs zeigen (wie soll die Antwort aussehen?)
- Formatierungs-Hinweise (Absätze, Listen, etc.)
- Priorisierung: "Beginne mit der direkten Antwort, dann Details"

**Vorgehen:**
1. Aktuelle Probleme identifizieren (z.B. zu lange Antworten, schlechte Struktur)
2. Konkrete Beispiele sammeln (Input → gewünschter Output)
3. Prompt anpassen mit Beispielen und klaren Anweisungen
4. Testen in ChatGPT Custom GPT
5. Iterieren

### 2. Few-Shot Examples (Priorität: Mittel)
**Datei:** `chatgpt-gpt/API_SYSTEM_PROMPT.md`

**Ziel:** Konkrete Beispiel-Interaktionen zeigen.

**Beispiele erstellen für:**
- Kurze Definitionen (z.B. "Was ist Abheben?")
- Komplexe Regeln (z.B. "Wie funktioniert die Ausmachregel?")
- Varianten-Unterschiede (z.B. "Unterschied Schieber vs. Differenzler")
- Mehrdeutige Fragen (z.B. "Was bedeutet Weis?")

**Format:**
```
BEISPIEL-INTERAKTION:
User: "Was ist Abheben?"
API Response: results[0].text = "[kompletter Artikel...]"
Du: [Ideale ChatGPT-Antwort mit komplettem Text, gut strukturiert]
```

### 3. Tonalität & Sprache (Priorität: Mittel)
**Aktuell:** "Schweizerdeutsche Begriffe, 'du'-Form"
**Fine-Tuning:** Konkretere Beispiele für:
- Welche Begriffe sind schweizerdeutsch? (z.B. "Wys" vs "Weis")
- Wann "du", wann "Sie"?
- Formulierungen (z.B. "Gemäss JassWiki" vs "Laut JassWiki")

### 4. Follow-up Integration (Priorität: Niedrig)
**Aktuell:** `see_also` wird erwähnt
**Fine-Tuning:** Wie können `see_also` Links besser integriert werden?
- Automatisch verwandte Themen vorschlagen?
- "Weitere Informationen zu..." Links?

---

## 🧪 Test-Strategie

### Test-Fragen (sollten alle funktionieren):
1. **Einfach:** "Was ist Abheben?"
2. **Mittel:** "Wie funktioniert die Ausmachregel?"
3. **Komplex:** "Was ist der Unterschied zwischen Schieber und Differenzler?"
4. **Mehrdeutig:** "Was bedeutet Weis?"
5. **Varianten:** "Welche Regeln gelten beim Aucho?"

### Erfolgs-Kriterien:
- ✅ Kompletter Artikel-Text wird zitiert (nichts fehlt)
- ✅ Antwort ist gut strukturiert (nicht nur Text-Wall)
- ✅ Relevante Teile werden hervorgehoben
- ✅ Schweizerdeutsche Begriffe korrekt
- ✅ Quelle wird angegeben
- ✅ Follow-ups bei `see_also`

---

## 🔄 Workflow für Fine-Tuning

1. **Problem identifizieren**
   - Test-Fragen stellen
   - Aktuelle Antworten analysieren
   - Was funktioniert nicht gut?

2. **Prompt anpassen**
   - Datei: `chatgpt-gpt/API_SYSTEM_PROMPT.md`
   - Konkrete Anweisungen/Beispiele hinzufügen
   - In ChatGPT Custom GPT einfügen

3. **Testen**
   - Test-Fragen stellen
   - Antworten prüfen
   - Iterieren

4. **Dokumentieren**
   - Was funktioniert?
   - Was nicht?
   - Nächste Schritte

---

## 📝 Wichtige Hinweise

### ⚠️ Kritische Regeln:
1. **NIEMALS** Inhalte weglassen oder zusammenfassen
2. **IMMER** den kompletten Artikel-Text aus `results[0].text` verwenden
3. **NIEMALS** eigenes Wissen einbringen (nur API)

### 🔧 Technische Constraints:
- API gibt immer nur 1 Result zurück (Top-Result)
- `results[0].text` enthält den vollständigen Artikel-Text
- Response ist immer ein Array mit 1 Element

### 📚 Ressourcen:
- **Neustart-Anleitung:** `chatgpt-gpt/NEUSTART-ANLEITUNG.md`
- **Upload-Checkliste:** `chatgpt-gpt/upload-checklist.md`
- **Alte Instructions:** `chatgpt-gpt/instructions.md` (Knowledge-Base basiert, nicht mehr verwendet)

---

## 🚀 Startpunkt für Fine-Tuning

**Aktueller Stand:** ChatGPT zitiert den vollständigen Text, aber:
- Struktur könnte besser sein
- Formatierung könnte optimiert werden
- Priorisierung könnte klarer sein

**Nächster Schritt:** 
1. Konkrete Test-Fragen stellen
2. Aktuelle Antworten analysieren
3. Prompt mit Beispielen und Strukturierungs-Hinweisen erweitern
4. Testen und iterieren

**Datei zum Bearbeiten:** `chatgpt-gpt/API_SYSTEM_PROMPT.md`

---

## ✅ NEUE STRATEGIE IMPLEMENTIERT (November 2024)

### 🎯 3-Stufen-Dialog-System

**Problem gelöst:** ChatGPT fasste zusammen, anstatt den Artikel vollständig wiederzugeben. ABER: Der ganze Artikel auf einmal war auch nicht ideal.

**Neue Lösung:** Interaktiver, mehrstufiger Dialog

#### Stufe 1: Fokussierte Initiale Antwort
- Beantworte **nur** die spezifische Frage (2-6 Sätze)
- Quelle angeben
- Follow-up anbieten: "Möchten Sie mehr Details erfahren?"

#### Stufe 2: Vertiefung zum aktuellen Thema
- Wenn Nutzer "Ja" → Weitere Details aus dem gleichen Artikel
- Strukturiert in Abschnitten
- Enden mit: "Interessieren Sie verwandte Themen?"

#### Stufe 3: Verwandte Themen (see_also)
- `see_also` Artikel auflisten
- Nutzer wählt Thema → NEUER API-CALL
- Zurück zu Stufe 1 für das neue Thema

### Vorteile des neuen Systems:
✅ Keine Informations-Überlastung
✅ Nutzer kontrolliert die Tiefe der Antwort
✅ Natürlicher Dialog-Fluss
✅ `see_also` wird sinnvoll integriert
✅ Fokussiert auf die tatsächliche Frage

### Datei:
`chatgpt-gpt/API_SYSTEM_PROMPT.md` - Komplett überarbeitet mit:
- 3-Stufen-Dialog-System
- Vollständigen Beispielen für jede Stufe
- Klaren Anweisungen für ChatGPT
- Workflow-Übersicht
- Checkliste

### Nächste Schritte:
1. **Testen im ChatGPT Custom GPT:**
   - Neuen Prompt in ChatGPT Instructions einfügen
   - Test-Fragen durchspielen (siehe unten)
   - Überprüfen, ob 3-Stufen-Dialog funktioniert

2. **Test-Szenarien:**
   ```
   Test 1: Einfache Frage
   User: "Was ist Abheben?"
   → Erwartung: Kurze Antwort (2-3 Sätze) + Follow-up-Angebot
   
   Test 2: Vertiefung
   User: "Was ist Abheben?" → "Ja, mehr Details"
   → Erwartung: Detaillierte Antwort mit Struktur + Verwandte Themen Angebot
   
   Test 3: Verwandte Themen
   User: "Was ist Abheben?" → "Ja, mehr Details" → "Ja, verwandte Themen"
   → Erwartung: see_also aufgelistet, Nutzer kann wählen
   
   Test 4: Komplexe Frage
   User: "Wie funktioniert die Ausmachregel?"
   → Erwartung: Fokussierte Antwort, nicht der ganze Artikel
   ```

3. **Iterative Verbesserung:**
   - Falls ChatGPT immer noch zu viel/wenig gibt → Prompt anpassen
   - Beispiele hinzufügen/anpassen
   - Tonalität verfeinern

### Optional: Multi-Result (Später)
Falls das 3-Stufen-Modell funktioniert, aber manchmal mehrere Artikel nötig sind:
- API auf Top 3 Results ändern (statt nur 1)
- ChatGPT kann logische Verbindungen zwischen Artikeln herstellen
- Prompt anpassen für Multi-Result-Logic

**Code-Änderung:** `functions/src/index.ts`, Zeile 283-316
```typescript
// Aktuell: const topResult = finalResults[0];
// Neu: const topResults = finalResults.slice(0, 3);
```

---

## 💡 Tipps für Fine-Tuning

1. **Beispiele sind wichtig:** Zeige ChatGPT konkrete Input/Output-Beispiele
2. **Iterativ vorgehen:** Kleine Änderungen, testen, verbessern
3. **Strukturierung:** ChatGPT kann den Text strukturieren, ohne Inhalte wegzulassen
4. **Formatierung:** Absätze, Listen, Hervorhebungen können helfen
5. **Priorisierung:** "Beginne mit der direkten Antwort, dann Details"
6. **Dialog-Fluss:** Nutzer sollte die Kontrolle über die Tiefe der Antwort haben

---

**Viel Erfolg beim Fine-Tuning! 🎯**

