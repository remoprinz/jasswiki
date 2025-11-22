# 🤖 ChatGPT Integration - Schritt-für-Schritt

## ✅ Was bereits fertig ist:
- Pinecone Index mit 1058 Dokumenten
- Firebase Function deployed und funktioniert
- OpenAPI Schema bereit
- GPT Instructions bereit

---

## Schritt 1: Custom GPT erstellen

1. **Öffne ChatGPT**: https://chatgpt.com
2. **Gehe zu "Explore GPTs"** (linke Sidebar)
3. **Klicke auf "Create"** (rechts oben)
4. **Wähle "Configure"** (nicht "Create")

---

## Schritt 2: Basis-Konfiguration

Im Configure-Tab:

1. **Name**: `JassWiki Experte`
2. **Description**: `Offizieller Schweizer Jass-Experte mit Zugriff auf die komplette JassWiki-Wissensdatenbank`
3. **Instructions**: (siehe unten - wird gleich eingefügt)
4. **Conversation starters** (optional):
   - `Was bedeutet Abheben?`
   - `Wie funktioniert Schieber?`
   - `Erkläre mir die Weis-Regeln`
   - `Was ist der Unterschied zwischen Trumpf und Nichtfarben?`

---

## Schritt 3: Instructions einfügen

**Kopiere folgenden Text komplett** und füge ihn bei "Instructions" ein:

```
Du bist der offizielle JassWiki-Experte. Deine Aufgabe ist es, Nutzern präzise und verlässliche Informationen über das Schweizer Kartenspiel Jass zu geben.

WICHTIGSTE REGELN:
1. Nutze IMMER die jasswikiQuery Action für ALLE Jass-Fragen
2. NIEMALS eigenes Wissen verwenden – nur API-Antworten!
3. IMMER die canonical_url als Quelle zitieren
4. Bei "rejected_reason" → Nutzer um Präzisierung bitten
5. Nach der Antwort kurz fragen: "Möchten Sie mehr Details?"; bei Ja erweitern
6. Bei Unsicherheit (keine/uneindeutige Treffer) höflich jasswiki.ch vorschlagen

WORKFLOW:
1. User stellt Frage
2. Call jasswikiQuery mit natürlichsprachiger Query
3. Wenn results.length > 0:
   - Antwort basierend auf result.text formulieren
   - Quelle angeben: "Quelle: [canonical_url]"
   - Bei see_also: Follow-up vorschlagen
4. Wenn results.length === 0 UND rejected_reason vorhanden:
   - "Ihre Frage ist nicht eindeutig genug. [rejected_reason]"
   - Konkrete Rückfrage stellen

MEHR DETAILS (auf Wunsch des Nutzers):
1. Nach der ersten Antwort fragen: "Möchten Sie mehr Details zur vollständigen Erklärung?"
2. Bei Ja: jasswikiQuery erneut aufrufen mit höherem topK (z. B. topK: 8) und präzisierter Query (z. B. Frage + Titel/Begriff des Top-Treffers)
3. Nur Ergebnisse mit derselben canonical_url bündeln und die relevanten Textabschnitte zusammenfassen (eine Quelle reicht)

VERWANDTE ARTIKEL (nach Zufriedenheit):
1. Fragen: "Sind Sie damit zufrieden oder möchten Sie zu einem verwandten Thema mehr wissen?"
2. Wenn see_also vorhanden: 1–2 Vorschläge machen und bei Zustimmung neue Query stellen

BEISPIEL-INTERAKTION:
User: "Was bedeutet Abheben?"
1. jasswikiQuery({"query": "Was bedeutet Abheben beim Jassen?"})
2. Response: { results: [{ text: "...", canonical_url: "..." }] }
3. Antwort: "Abheben (oder Ablupfen) bedeutet, dass der Spieler rechts vom Kartengeber die Karten teilen kann. Dies ist optional. Wenn abgehoben wird, wird der untere Stapel auf den oberen gelegt. Quelle: https://jasswiki.ch/regeln/kartenverteilung/abheben/"

FOLLOW-UP-BEISPIELE:
- Nach Details: "Möchten Sie eine ausführlichere Erklärung zu Abheben?"
- Verwandte Themen: "Soll ich Ihnen mehr zu Ablupf oder Stapel zeigen?"

REJECTED REASON HANDLING:
- "Keine Treffer über Schwellwert" → "Ihre Frage ist zu unspezifisch. Können Sie sie präzisieren? Zum Beispiel: Geht es um Regeln, Taktiken oder einen bestimmten Begriff?"
- "Top-Treffer nicht eindeutig" → "Es gibt mehrere mögliche Antworten. Meinen Sie...?"
- "Inkonsistente Varianten" → "Für welche Jass-Variante möchten Sie die Regel wissen? (z.B. Schieber, Differenzler, Coiffeur)"

UNSICHERHEIT / FALLBACK:
- Wenn trotz Rückfragen keine eindeutige Antwort möglich ist oder alle Treffer unter dem Schwellwert liegen: "Ich bin mir nicht sicher genug. Möchten Sie direkt auf jasswiki.ch nachsehen oder die Frage präzisieren?"

TONALITÄT:
- Freundlich, klar, präzise
- Schweizerdeutsche Begriffe verwenden (wie in API)
- Bei Unsicherheit: Nachfragen statt raten
```

---

## Schritt 4: Action hinzufügen

1. **Scrolle nach unten zu "Actions"**
2. **Klicke auf "Create new action"**
3. **Authentication**: Wähle "None" (API ist öffentlich)
4. **Schema**: 
   - Klicke auf "Import from URL"
   - ODER: Klicke auf das Textfeld und füge das komplette Schema ein (siehe unten)

---

## Schritt 5: OpenAPI Schema einfügen

**Kopiere folgenden kompletten Text** und füge ihn im Schema-Feld ein:

```yaml
openapi: 3.1.0
info:
  title: JassWiki RAG API
  description: |
    Retrieval-Augmented Generation (RAG) API für JassWiki.
    
    Diese API ermöglicht semantische Suche über das JassWiki-Wissen mit:
    - Hochqualitative Embeddings (Gemini 768D)
    - Pinecone Vector Search
    - Strikte Scoring Policy (minScore=0.85, margin≥0.03)
    - Kanonische URLs für Quellenangaben
    
    **Wichtig für GPT:**
    - Bei `rejected_reason` in Response → Nutzer um Präzisierung bitten
    - Immer canonical_url in Antwort zitieren
    - Bei "Siehe auch" → Follow-up vorschlagen
  version: 1.0.0

servers:
  - url: https://jasswikiquery-sktdhifofa-uc.a.run.app
    description: Production Firebase Functions

paths:
  /:
    post:
      operationId: queryJassWiki
      summary: Semantische Suche im JassWiki
      description: |
        Führt eine RAG-Query durch und gibt Top-K Ergebnisse mit Quellen zurück.
        
        **Scoring Policy:**
        - minScore: 0.85 (default) → Nur hochrelevante Treffer
        - margin: 0.03 → Top-Treffer muss eindeutig sein
        
        **Bei rejected_reason:**
        - "Keine Treffer über Schwellwert" → Nutzer um Präzisierung bitten
        - "Top-Treffer nicht eindeutig" → Nutzer um Kontext bitten
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - query
              properties:
                query:
                  type: string
                  description: Die Suchanfrage des Nutzers (natürlichsprachig)
                  example: "Was bedeutet Abheben beim Jassen?"
                topK:
                  type: integer
                  description: Maximale Anzahl Ergebnisse (default: 5)
                  default: 5
                  minimum: 1
                  maximum: 10
                filters:
                  type: object
                  properties:
                    category:
                      type: string
                      enum:
                        - Regeln
                        - Weis-Regeln
                        - Varianten
                        - Taktiken und Strategien
                        - Grundlagen & Kultur
                    variant:
                      type: string
                      example: "Schieber"
                    minScore:
                      type: number
                      default: 0.85
      responses:
        '200':
          description: Erfolgreiche Query
          content:
            application/json:
              schema:
                type: object
                properties:
                  results:
                    type: array
                    items:
                      type: object
                      properties:
                        id:
                          type: string
                        text:
                          type: string
                        score:
                          type: number
                        title:
                          type: string
                        canonical_url:
                          type: string
                        category:
                          type: object
                          properties:
                            main:
                              type: string
                            sub:
                              type: string
                        see_also:
                          type: array
                          items:
                            type: string
                  metadata:
                    type: object
                    properties:
                      query:
                        type: string
                      rejected_reason:
                        type: string
```

---

## Schritt 6: Testen

1. **Klicke auf "Test"** (rechts oben im Action-Bereich)
2. **Test-Query**: `{"query": "Was bedeutet Abheben beim Jassen?"}`
3. **Erwartetes Ergebnis**: JSON mit results oder rejected_reason

Wenn der Test erfolgreich ist: ✅

---

## Schritt 7: Speichern & Veröffentlichen

1. **Klicke auf "Update"** oder "Save" (rechts oben)
2. **Privacy**: 
   - "Only me" (für Tests)
   - ODER "Anyone with a link" (zum Teilen)
3. **Klicke auf "Publish"** oder "Create"

---

## Schritt 8: Ersten Test durchführen

**Test-Fragen** (im Chat mit dem GPT):

1. **Einfach**: `Was bedeutet Abheben?`
   - Erwartung: Klare Antwort mit Quelle-URL

2. **Unklare Frage**: `Jass`
   - Erwartung: Rückfrage zur Präzisierung

3. **Varianten**: `Wie spielt man Schieber?`
   - Erwartung: Varianten-spezifische Antwort

4. **Follow-up**: Nach "Siehe auch" fragen
   - Erwartung: GPT schlägt weitere Begriffe vor

---

## ✅ Erfolgskriterien

- [ ] GPT ruft die Action auf (sichtbar im Chat)
- [ ] Antworten enthalten Quellen-URLs
- [ ] Bei unklaren Fragen: GPT fragt nach
- [ ] Keine Halluzinationen (nur API-Antworten)
- [ ] Follow-ups werden vorgeschlagen

---

## 🐛 Troubleshooting

**Problem: "Action failed"**
→ Schema nochmal prüfen, Server-URL korrekt?

**Problem: "No results"**
→ Normal bei strengem Scoring. GPT sollte nachfragen.

**Problem: GPT erfindet Antworten**
→ Instructions nochmal prüfen, "NIEMALS eigenes Wissen" betonen

---

## 📞 Bei Fragen

Alle Details stehen in:
- `GPT_INSTRUCTIONS.md` (komplette Instructions)
- `openapi-schema.yaml` (komplettes Schema)
- `DEPLOYMENT_CHECKLIST.md` (vollständige Checkliste)

---

**Sie sind jetzt bereit! Viel Erfolg! 🚀**

