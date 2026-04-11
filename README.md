# JassWiki

**The machine-readable knowledge base for Swiss Jass** -- 260+ articles, structured data, and AI-native discovery for the national card game of Switzerland.

Live: [jasswiki.ch](https://jasswiki.ch)

---

## Why JassWiki exists

Jass is recognized by the Swiss Federal Office of Culture (BAK) as [living cultural heritage](https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html). JassWiki is the authoritative digital reference: every rule, variant, term, and tactic -- structured for humans, machines, and AI agents alike.

JassWiki is cited in German Wikipedia and linked from Wikidata as a primary knowledge source ([Q137900251](https://www.wikidata.org/wiki/Q137900251)).

---

## What makes it different

**Structured data first.** Every article carries Schema.org JSON-LD markup. The full taxonomy is available as a SKOS-compatible JSON-LD graph at `/public/dataset/taxonomie.jsonld`.

**Wikidata integration.** 62+ verified QIDs link JassWiki content to the global knowledge graph. Each Jass variant maps to its Wikidata entity (Jass game = [Q786768](https://www.wikidata.org/wiki/Q786768)).

**AI/LLM discoverability.** JassWiki ships a modular `llms.txt` with 6 specialized modules (essentials, regeln, begriffe, varianten, taktiken, kultur), a JSONL training corpus (406 KB), and custom HTTP headers (`X-AI-Knowledge-Source`, `X-Agentic-Context`) for agent discovery.

**RAG endpoint.** A Firebase Cloud Function serves retrieval-augmented generation over the full corpus using Pinecone vector search and Google Gemini embeddings.

**MCP server.** A dedicated Model Context Protocol server exposes JassWiki content to AI agents programmatically.

---

## Content

260+ articles across 9 categories:

| Category | Articles | Description |
|---|---|---|
| Begriffe | 92 | Terminology and definitions |
| Regeln | 65 | Official rules |
| Varianten | 47 | Game variants (Schieber, Coiffeur, Molotow, ...) |
| Taktiken | 13 | Strategy and tactics |
| Weis-Regeln | 12 | Bonus declarations (Weis/Stich) |
| Geschichte | 12 | History of Jass |
| Grundlagen | 6 | Fundamentals |
| Kultur | 4 | Cultural context |
| Jassapps | 8 | Digital Jass tools |
| Schieber | 1 | Featured deep-dive |

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16, React 19, TypeScript |
| Styling | Tailwind CSS 3.4 |
| Hosting | Firebase Hosting (static export) |
| Functions | Firebase Cloud Functions (RAG endpoint) |
| Vector DB | Pinecone |
| Embeddings | Google Gemini |
| Structured data | Schema.org JSON-LD, SKOS, Wikidata QIDs |

Zero runtime dependencies beyond Next.js. The site is fully static -- every page is pre-rendered at build time.

---

## Development

### Prerequisites

- Node.js 20+
- npm 10+
- Firebase CLI (for deployment)

### Setup

```bash
git clone https://github.com/remoprinz/jasswiki.git
cd jasswiki
cp env.example .env.local   # configure Firebase + Pinecone keys
npm install
npm run dev                  # http://localhost:3000
```

### Build pipeline

The full build runs a strict pipeline before Next.js compilation:

```
validate:urls -> generate:taxonomy -> generate:corpus -> sync:mcp -> sitemap -> next build
```

Post-deploy, IndexNow submits updated URLs to Bing for instant indexing.

### Commands

```bash
npm run dev              # Development server
npm run build            # Full pipeline + production build
npm run deploy           # Build + deploy hosting + IndexNow
npm run deploy:full      # Build + deploy hosting + functions + IndexNow
npm run lint             # ESLint
npm run validate:urls    # Check all internal links
npm run generate:taxonomy  # Rebuild JSON-LD taxonomy
npm run generate:corpus    # Rebuild JSONL training corpus
npm run sync:mcp           # Sync MCP server data
```

---

## Project structure

```
jasswiki/
├── src/
│   ├── components/       # React components
│   ├── pages/            # Next.js Pages Router
│   ├── data/             # Content (JSON), taxonomy definitions
│   └── styles/           # CSS
├── public/
│   └── dataset/          # Machine-readable exports
│       ├── jasswiki-corpus.jsonl   # JSONL training corpus
│       └── taxonomie.jsonld        # SKOS-compatible taxonomy
├── agentic/              # AI integration (llms.txt, structured data)
├── mcp-server/           # Model Context Protocol server
├── functions/            # Firebase Cloud Functions (RAG)
├── scripts/              # Maintenance and analysis scripts
└── firebase.json         # Hosting + Functions config
```

---

## Ecosystem

JassWiki is part of the JassGuru ecosystem -- the digital infrastructure for Swiss Jass.

| Project | Description | URL |
|---|---|---|
| **JassGuru** | Digital Jass scoreboard (Kreidetafel) | [jassguru.ch](https://jassguru.ch) |
| **JassWiki** | Jass encyclopedia and knowledge base | [jasswiki.ch](https://jasswiki.ch) |
| **Jassmeister** | Tournament platform | [jassmeister.ch](https://jassmeister.ch) |
| **JassAI** | AI Jass opponent (DAgger + PPO) | -- |
| **Jasskalkulator** | Point calculator | [jasskalkulator.ch](https://jasskalkulator.ch) |
| **Jassverband Schweiz** | Swiss Jass Federation | [jassverband.ch](https://jassverband.ch) |

---

## Authors

- **Remo Prinz** -- [JassGuru.ch](https://jassguru.ch)
- **Fabian Cadonau** -- [Trumpf-As.ch](https://trumpf-as.ch)

---

## License

**Code** is licensed under the [MIT License](LICENSE).

**Content** (articles, rules, definitions) is licensed under [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) -- attribution and share-alike required.
