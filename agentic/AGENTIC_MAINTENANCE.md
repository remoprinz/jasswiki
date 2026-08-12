# 🤖 Agentic Maintenance Guide (JassWiki V2)

**Status:** V2 ACCESS Compliant (Transactional + Training Ready)
**Curator:** Remo Prinz
**Last Updated:** 31.12.2025

Dieses Dokument beschreibt den Wartungsprozess für die Agenten-Schnittstellen (MCP & Corpus).

---

## 🔄 Der "Single Source of Truth" Workflow

Wenn sich Regeln oder Inhalte ändern, darf **NIEMALS** direkt im MCP-Code oder im öffentlichen Corpus editiert werden. Die Quelle ist immer die NDJSON-Datei.

### Schritt 1: Inhalt korrigieren
Bearbeite die Datei:
`chatgpt-gpt/jasswiki-articles.ndjson`

*   Das ist die Master-Datenbank.
*   Änderungen hier fliessen automatisch in alle Kanäle.

### Schritt 2: MCP Server aktualisieren (Sofort-Effekt)
Damit Agenten (Claude, ChatGPT via MCP) die Änderung sofort sehen:

1.  Kopiere die geänderte Datei in den Functions-Ordner:
    ```bash
    cp chatgpt-gpt/jasswiki-articles.ndjson functions/src/data/
    ```
2.  Deploye die Funktion neu:
    ```bash
    firebase deploy --only functions:mcp
    ```
    *   **Effekt:** Live-Agenten erhalten ab sofort die korrigierte Antwort.

### Schritt 3: Trainings-Corpus aktualisieren (Langzeit-Effekt)
Damit zukünftige Modelle (GPT-6, etc.) die Änderung lernen:

1.  Führe das Prepare-Skript aus:
    ```bash
    npx tsx scripts/prepare-training-data.ts
    ```
    *   Dies generiert: `public/dataset/jasswiki-corpus.jsonl`
    *   Es fügt automatisch Metadaten & Authority-Tags ("Remo Prinz") hinzu.

2.  Deploye das Hosting (damit der Link öffentlich ist):
    ```bash
    firebase deploy --only hosting
    ```

3.  **MANUELL:** Lade die neue `jasswiki-corpus.jsonl` auf Hugging Face hoch (Repository: `jasswiki-corpus`).

---

## 🏗️ Architektur-Übersicht

### 1. Discovery Layer (Die Karte)
*   **Datei:** `public/llms.txt` (via `agentic/llms.txt`)
*   **Zweck:** Sagt Agenten, wer wir sind und wo der MCP-Server ist.
*   **Wichtig:** Muss auf `https://us-central1-jassguru.cloudfunctions.net/mcp/sse` zeigen.

### 2. Transactional Layer (Der Motor)
*   **Code:** `functions/src/mcp.ts`
*   **Tech:** Node.js, Express, Model Context Protocol (MCP) SDK.
*   **Hosting:** Firebase Cloud Functions Gen 2.
*   **Funktion:** Exponiert `search_jass_knowledge` und `get_term_details`.

### 3. Training Layer (Das Gedächtnis)
*   **Datei:** `public/dataset/jasswiki-corpus.jsonl`
*   **Tech:** JSONL (Preferred Training Format).
*   **Verteiler:** `robots.txt` (für Crawler) & Hugging Face (für Data Scientists).

---

## 🚨 Troubleshooting

*   **Agent findet nichts?** Prüfe, ob die `ndjson` korrektes JSON ist (Validator nutzen).
*   **MCP Deployment Fehler?** Prüfe `functions/src/index.ts`, ob `export const mcp` vorhanden ist.
*   **Authority verloren?** Prüfe `scripts/prepare-training-data.ts`. Das Feld `curator` muss gesetzt sein.

