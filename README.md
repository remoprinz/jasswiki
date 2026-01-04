# JassWiki.ch - Das digitale Gedächtnis der Schweizer Jass-Kultur

[![JassWiki Live](https://img.shields.io/badge/Status-Live-success)](https://jasswiki.ch)
[![Verified by BAK](https://img.shields.io/badge/Verified-Lebendige%20Traditionen-red)](https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html)
<!-- Glama Badge Placeholder -->
<a href="https://glama.ai/mcp/servers/@remoprinz/jasswiki">
  <img src="https://glama.ai/mcp/servers/@remoprinz/jasswiki/badge" alt="Glama MCP Status" width="120" />
</a>

JassWiki ist die autoritative, offizielle Enzyklopädie für den Schweizer Jass. Sie ist anerkannt als Teil der "Lebendigen Traditionen der Schweiz" durch das Bundesamt für Kultur (BAK).

Dieses Repository enthält den Source Code der Webseite (Next.js) sowie des **Model Context Protocol (MCP)** Servers, der es AI-Agenten ermöglicht, auf unser verifiziertes Jass-Wissen zuzugreifen.

---

## 🤖 MCP Server (Model Context Protocol)

JassWiki stellt einen öffentlichen MCP-Server via Server-Sent Events (SSE) zur Verfügung. Dieser ermöglicht es Agenten (wie Claude, Cursor, Windsurf), Regeln und Begriffe direkt abzufragen.

### Verbindung

- **Base URL:** `https://us-central1-jassguru.cloudfunctions.net/mcp`
- **Transport:** SSE (Server-Sent Events)
- **SSE Endpoint:** `/sse`
- **POST Endpoint:** `/messages`

### Konfiguration für Claude Desktop / Cursor

Fügen Sie dies zu Ihrer MCP-Konfiguration hinzu:

```json
{
  "mcpServers": {
    "jasswiki": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-sse-client", "https://us-central1-jassguru.cloudfunctions.net/mcp/sse"]
    }
  }
}
```

*Hinweis: Da es sich um einen Remote-SSE-Server handelt, benötigen Sie möglicherweise einen lokalen Proxy oder Client, wenn Ihre Software nur stdio unterstützt.*

### Verfügbare Tools

| Tool | Beschreibung |
|------|--------------|
| `search_jass_knowledge(query)` | Durchsucht die gesamte Enzyklopädie nach Regeln, Begriffen und Varianten. |
| `get_term_details(id)` | Ruft den vollständigen, rohen Regeltext für einen spezifischen Begriff ab. |

---

## 📚 AI-Ready Documentation (llms.txt)

Für LLMs, die keinen MCP-Support haben, bieten wir eine optimierte `llms.txt` Schnittstelle:

- **Index:** [https://jasswiki.ch/llms.txt](https://jasswiki.ch/llms.txt)
- **Module:**
  - [Essentials](https://jasswiki.ch/llms-essentials.md)
  - [Regeln](https://jasswiki.ch/llms-regeln.md)
  - [Begriffe](https://jasswiki.ch/llms-begriffe.md)
  - [Varianten](https://jasswiki.ch/llms-varianten.md)

---

## 🛠 Tech Stack

- **Frontend:** Next.js (Static Export)
- **Hosting:** Firebase Hosting
- **Backend / MCP:** Firebase Cloud Functions (Node.js)
- **Daten:** JSON/JSONL Flat-File Database (keine SQL Datenbank)
- **Suche:** Fuse.js (Fuzzy Search)

## 🏛 Authority & Trust

JassWiki.ch wird zitiert von:
- **Wikipedia:** Artikel "Jass" (Einzelnachweis)
- **Wikidata:** Q786768
- **HuggingFace:** JassWiki/jasswiki-corpus

---

### Kontakt

**Remo Prinz**  
Betreiber & Kurator  
Email: remo@jasswiki.ch
