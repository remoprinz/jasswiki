# Prompt: Agent für ChatGPT-App Entwicklung (Jasswiki)

## Ihre Rolle

Sie sind ein spezialisierter Full-Stack-Entwickler, der eine ChatGPT-App (GPT-Store-App) für **Jasswiki** erstellt. Ihre Aufgabe ist es, eine vollständig funktionierende, OpenAI-konforme App zu entwickeln, die Jass-Regeln und Varianten über ChatGPT zugänglich macht.

---

## Status Quo: Wo wir heute stehen

### ✅ Bereits vorhanden

**1. Inhalte & Datenstruktur:**
- **Datenquelle:** `jasswiki/src/data/jass-content-v2.json` (244 Artikel, ~9'900 Zeilen)
- **Struktur:** Jeder Artikel enthält:
  - `id`: Eindeutige ID
  - `text`: Vollständiger Markdown-Text (bereinigt, ohne FAQs)
  - `metadata`: Kategorien, Keywords, Schwierigkeit, Wichtigkeit
  - `faqs`: Array von Frage-Antwort-Paaren (strukturiert für JSON-LD)
- **Qualität:** Hochwertiger, kuratierter Wissensbestand zu Jass-Regeln, Varianten, Weis-Regeln, Streitfällen, Begriffe
- **Sprache:** Deutsch (Schweizer Jass)

**2. Backend-Infrastruktur:**
- **Firebase Functions:** Bereits vorhanden, einsatzbereit für HTTP-Tools
- **Deployment:** Firebase Hosting für jasswiki.ch bereits konfiguriert

**3. SEO & Web:**
- **JSON-LD Structured Data:** FAQs bereits als strukturierte Daten implementiert
- **Sitemap:** Aktuell, vollständig (330 URLs)
- **Web-Interface:** Vollständig funktional unter jasswiki.ch

**4. Konzeption:**
- **Zwei Modi geplant:**
  - **Regel-Modus (Schiedsrichter):** Schnelle, präzise Antworten zu Regeln
  - **Guide-Modus:** Optional, für später

---

## Ziel: Was Sie bauen sollen

Eine **ChatGPT-App (GPT-Store-App)**, die:

1. **Nutzern über ChatGPT präzise Jass-Regeln liefert**
2. **OpenAI Design- und Developer-Guidelines strikt einhält**
3. **Die vorhandenen Inhalte intelligent nutzt**
4. **Schnell, konversational und entscheidungsorientiert ist**

---

## OpenAI-Spezifikationen & Best Practices (KRITISCH)

### Design-Guidelines (von OpenAI)

**UI-Prinzipien:**
- ✅ **Inline-Cards statt langer Texte:** Antworten visuell knapp halten (max. 1–2 Primär-Aktionen pro Card)
- ✅ **Carousel nur bei mehreren Treffern:** 3–8 Items, je Item 1 CTA ("Öffnen")
- ✅ **Kein Werbe-/Promo-Spam:** Neutrale, hilfreiche Darstellung, keine Anzeigen
- ✅ **Apps „leben in ChatGPT":** Inline/Carousel/Fullscreen/PiP, ChatGPT bleibt Host
- ❌ **Kein verschachteltes Scrolling:** Keine Tabs/Deep-Nav in einer Card
- ❌ **Keine langen Textwände:** Lange Texte nur in Fullscreen auf Nutzerwunsch

**Performance:**
- **Latenzziel:** < 2–3 Sekunden für Tool-Antworten
- **Antworten kurz halten:** Lange Regeltexte nur auf explizite Aufforderung ("Mehr anzeigen")

**Links & Outbound:**
- ❌ **Standard:** Keine Links in Standard-Regelantworten
- ✅ **Auf explizite Bitte:** Sauberer Outlink zu jasswiki.ch (entsprechender Artikel)
- ❌ **Kein "chatgpt://…" Eigenformat:** Offizielle "Connect from ChatGPT"-Flows nutzen

**Metadaten & Naming:**
- ❌ **Vermeide "offiziell":** Solange kein rechtlich belastbarer Verband vorhanden
- ✅ **Vorschlag Name:** "Jasswiki – Regeln & Varianten nach jassguru.ch"
- ✅ **Beschreibung:** Kurz, nutzenorientiert; keine Superlative, keine Preis-/Geld-Claims

**Knowledge Center:**
- ✅ **Wissenszentrum nutzen:** Sauberer Korpus als "Wissenszentrum" publizieren (kuratiert, versioniert, mit FAQ-Snippets)

**Copyright & Legal:**
- ✅ **Paraphrasen statt 1:1-Übernahmen:** Eigene Formulierungen + Quellenhinweis
- ✅ **Wörtliche Zitate nur kurz:** Sauber gekennzeichnet
- ✅ **Geld/Glücksspiel:** Keine Preisgeld-Claims; neutrale, regelbezogene Inhalte

**Konversationsführung:**
- ✅ **Ambiguitäts-Klärung:** Bei Confidence < Schwelle: gezielte Rückfrage ("Meinen Sie Weis melden oder Weis zählen?")
- ✅ **Follow-ups:** Tool liefert `follow_up_suggestions` (3 Chips) für Kontextführung

**Quellen (alle Spezifikationen basieren auf):**
- developers.openai.com (Design Guidelines)
- platform.openai.com (Knowledge Center)
- community.openai.com (Connect Flows)

---

## Technische Anforderungen

### 1. Daten-Transformation & Schema

**Aktuelles Problem:**
- `jass-content-v2.json` ist ein Monolith (~10k Zeilen)
- OpenAI empfiehlt atomare, klar geschnittene Einträge

**Ihre Aufgabe:**
1. **Daten aufsplitten:** Jeden Artikel in atomare Einträge transformieren (1 Regel/Variante/Streitfall je Objekt)
2. **Schema erweitern:** Finales Schema mit folgenden Feldern:

```typescript
{
  id: string,              // Bereits vorhanden
  title: string,          // Aus metadata.category.topic
  category: {
    main: string,          // Bereits vorhanden
    sub: string,           // Bereits vorhanden
    topic: string          // Bereits vorhanden
  },
  type: "rule" | "variant" | "weis" | "term" | "dispute",
  official: boolean,       // NEU: Basierend auf Quelle/Validierung
  language: "de-CH",       // NEU
  version: string,         // NEU: "1.0"
  text_snippet: string,    // NEU: <= 600–800 Zeichen (für Inline-Cards)
  text_full: string,       // Bereits vorhanden (text)
  faq: Array<{             // Bereits vorhanden
    question: string,
    answer: string
  }>,
  see_also: string[],      // NEU: IDs verwandter Artikel
  updated_at: string,      // NEU: ISO-Datum
  synonyms: string[],      // NEU: Alternative Begriffe
  difficulty: number,      // Bereits vorhanden
  importance: number,      // Bereits vorhanden
  keywords: string[]       // Bereits vorhanden
}
```

3. **Knowledge Center Format:** Kuratierte Sammlung für OpenAI Knowledge Center vorbereiten

### 2. Tools (Apps SDK)

**Tool 1: `searchWiki`** (HTTP oder MCP)
- **Input:** `{ q: string }` (Suchanfrage)
- **Output:** Top-3 Treffer im folgenden Format:

```json
{
  "results": [
    {
      "id": "weis_rules_general",
      "title": "Weis – Grundregeln",
      "category": "Weis-Regeln",
      "official": true,
      "summary": "Alle Weise vor dem ersten Ausspiel melden …",
      "confidence": 0.82,
      "actions": [
        {"label": "Volltext öffnen", "action": "open", "id": "weis_rules_general"}
      ],
      "related": ["weis_rules_kreuzweis", "weis_rules_vierblatt"]
    }
  ],
  "follow_up_suggestions": [
    "Was ist ein Kreuzweis?",
    "Wie viele Punkte zählt ein Dreiblatt?",
    "Wann muss ich meine Weisen melden?"
  ]
}
```

**Ranking-Logik:**
- Titel/Slug-Boost > Keywords/Metadaten > Body
- Feste Keyword-Maps (z.B. "weis", "schneider", "matsch")
- Confidence-Score basierend auf Match-Qualität

**Tool 2: `getEntry`** (Detail-Ansicht)
- **Input:** `{ id: string }`
- **Output:** Volltext + FAQ + "see also" für Fullscreen-Ansicht

**Optional Tool 3: `getGuide`**
- Erst nach MVP implementieren

**Implementierung:**
- **HTTP-Tools:** Firebase Functions (europe-west1)
- **Alternative:** MCP-Server (zukunftssicherer, Standard-Protokoll)

### 3. UI-Komponenten (Design-konform)

**Inline-Card für Trefferliste:**
- Max. 3 Treffer
- Jede Card: Titel, Kategorie-Badge, Kurzentscheid (1–2 Sätze), "Offiziell gewertet: Ja/Nein"
- Max. 2 Actions: "Volltext zeigen" (Fullscreen) | "Verwandte Themen"

**Carousel:**
- Nur wenn 3–8 Treffer
- Je Item 1 CTA ("Öffnen")

**Fullscreen-Ansicht:**
- Für Volltext auf Nutzerwunsch
- Enthält: Volltext, FAQs, "Siehe auch"

**Fehler-States:**
- Keine Treffer → Inline-Card mit 2 verwandten Themen + Rückfrage ("Meinen Sie X oder Y?")

### 4. Index & Performance

**Leichtgewicht-Index:**
- Prebuilt JSON (nicht dynamisch)
- Normalisierung, Synonymlisten, Keyword-Maps
- Caching: 1 Stunde für häufige Queries
- Index im RAM für schnelle Antworten

**Latenz-Optimierung:**
- < 2–3 Sekunden für Tool-Antworten
- Index-lookup primär, Body-Scan nur bei Bedarf

### 5. App-Metadaten

**Name:** `Jasswiki – Regeln & Varianten nach jassguru.ch`

**Beschreibung:** Kurz, nutzenorientiert, keine Superlative

**Sprache:** `de-CH`

**Badges:** Keine Preis-/Geld-Claims

### 6. App-Connect & Deployment

**Connect from ChatGPT:**
- Offizielle "Connect"-Flows befolgen
- Kein eigenes Schema

**Testen & Review:**
- Offizielles "Test your integration" durchführen
- "Deploy your app" Vorgehen einhalten

---

## Minimaler Umsetzungsfahrplan (MVP – nur Regel-Modus)

### Phase 1: Daten-Vorbereitung (2–3 Tage)
1. ✅ Schema finalisieren & Daten kuratieren (atomar, mit `text_snippet`, `faq[]`)
2. ✅ Transformation-Skript erstellen: `jass-content-v2.json` → atomare Einträge
3. ✅ Knowledge Center Format vorbereiten
4. ✅ Synonymlisten & Keyword-Maps erstellen

### Phase 2: Backend & Tools (3–4 Tage)
1. ✅ Leichtgewicht-Index erstellen (prebuilt JSON, Normalisierung)
2. ✅ `searchWiki` Tool implementieren (Firebase Functions oder MCP)
3. ✅ `getEntry` Tool implementieren
4. ✅ Ranking-Logik & Confidence-Scoring
5. ✅ Caching implementieren

### Phase 3: UI & Integration (2–3 Tage)
1. ✅ Inline-Card & Fullscreen-Ansichten gemäß Design-Guidelines
2. ✅ Carousel für mehrere Treffer
3. ✅ Fehler-States & Ambiguitäts-Klärung
4. ✅ Follow-up-Suggestions

### Phase 4: Metadaten & Deployment (1–2 Tage)
1. ✅ App-Metadaten (de-CH) vorbereiten
2. ✅ Knowledge Center anhängen
3. ✅ Connect/Test/Deploy über offizielle Flows

**Gesamt: ~8–12 Tage für MVP**

---

## Konkrete Antworten auf kritische Fragen

### "Ist die 10k-Zeilen Datei okay?"
**Antwort:** Inhaltlich ja, strukturell bitte in atomare Einträge splitten. Besser für UX, schneller, konform mit "keine langen Textwände".

### "Warum URLs im Datensatz?"
**Antwort:** Für optionale Outlinks auf explizite Nachfrage; im Card-UI selbst nicht standardmäßig verwenden.

### "Knowledge Center – was genau?"
**Antwort:** Ein kuratiertes, versioniertes Wissenspaket, das deine App im Chat nutzbar macht (eigenständige Wissensquelle mit gepflegten Artikeln/FAQs).

---

## Risiken & Gegenmaßnahmen

| Risiko | Gegenmaßnahme |
|--------|---------------|
| Overclaim "offiziell" | Neutrales Naming, Belege als "Regeln nach jassguru.ch, basierend auf anerkannten Quellen" |
| Zu viel Text im Chat | Cards kurz, Fullscreen bei Bedarf |
| Urheberrecht | Paraphrasen + Quellenangaben, keine langen 1:1-Übernahmen |
| Drift/Inkonsistenz | Versionierung (`version`, `updated_at`), "Quelle: Jasswiki-Reglement v1.0" im Datensatz |
| Langsame Antworten | Index im RAM, Caching, prebuilt JSON |

---

## Dateien & Verzeichnisse

**Datenquelle:**
- `jasswiki/src/data/jass-content-v2.json` (244 Artikel, aktuelle Version)

**Ihre Ausgabe:**
- `jasswiki/chatgpt-app/` (neues Verzeichnis für App-Code)
- `jasswiki/chatgpt-app/data/` (transformierte, atomare Einträge)
- `jasswiki/chatgpt-app/tools/` (Firebase Functions oder MCP-Server)
- `jasswiki/chatgpt-app/knowledge-center/` (Knowledge Center Format)

---

## Wichtige Regeln

1. **OpenAI-Guidelines strikt einhalten:** Keine Abkürzungen, Design-Principles respektieren
2. **Datenqualität:** Alle Transformationen müssen reversibel sein, Backups erstellen
3. **Performance:** Latenz-Ziele einhalten (< 2–3 Sekunden)
4. **Fehlerbehandlung:** Graceful Degradation, nie leere Antworten ohne Alternative
5. **Versionierung:** Jede Änderung an Daten wird versioniert
6. **Testing:** Alle Tools müssen getestet sein, bevor sie deployed werden

---

## Erwartetes Endresultat

Eine vollständig funktionierende ChatGPT-App, die:

✅ Präzise Jass-Regeln über ChatGPT liefert  
✅ OpenAI Design- und Developer-Guidelines einhält  
✅ Schnell und konversational ist  
✅ Die vorhandenen Inhalte intelligent nutzt  
✅ Im GPT-Store erfolgreich deployed ist  

---

**Startdatum:** Sofort  
**Priorität:** Hoch  
**Erwartete Dauer MVP:** 8–12 Arbeitstage  

**Starten Sie mit Phase 1: Daten-Vorbereitung.**







