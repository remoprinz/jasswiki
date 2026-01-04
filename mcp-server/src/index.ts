
import express from "express";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  Mcperror,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "fs";
import path from "path";
import Fuse from "fuse.js";
import cors from "cors";

// --- Types ---
interface JassArticle {
  id: string;
  title: string;
  variant: string | null;
  tags: string[];
  synonyms: string[];
  see_also: string[];
  language: string;
  body: string;
  canonical_url: string;
}

// --- Data Loading ---
// Note: In Firebase Cloud Functions, assets might need to be copied to the build folder
// or loaded from a bucket. For this prototype, we assume the file is bundled.
const DATA_PATH = path.resolve(process.cwd(), "../chatgpt-gpt/jasswiki-articles.ndjson");

console.error(`Loading JassWiki data from: ${DATA_PATH}`);

let articles: JassArticle[] = [];
let fuseIndex: Fuse<JassArticle>;

try {
  // Check if file exists, if not try alternative path (for deployment)
  let finalPath = DATA_PATH;
  if (!fs.existsSync(finalPath)) {
    // Fallback for deployment structure
    finalPath = path.resolve(process.cwd(), "./data/jasswiki-articles.ndjson");
  }

  if (fs.existsSync(finalPath)) {
    const content = fs.readFileSync(finalPath, "utf-8");
    articles = content
      .split("\n")
      .filter((line) => line.trim() !== "")
      .map((line) => JSON.parse(line));

    console.error(`Loaded ${articles.length} articles.`);

    fuseIndex = new Fuse(articles, {
      keys: [
        { name: "title", weight: 2 },
        { name: "synonyms", weight: 1.5 },
        { name: "tags", weight: 1 },
        { name: "body", weight: 0.5 },
      ],
      threshold: 0.3,
      includeScore: true,
    });
  } else {
    console.warn("⚠️ Data file not found. Starting with empty index.");
  }
} catch (error) {
  console.error("Failed to load JassWiki data:", error);
}

// --- MCP Server Setup ---
const mcpServer = new Server(
  {
    name: "jasswiki-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// --- Tools Definitions ---
mcpServer.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "search_jass_knowledge",
        description: "Search the official JassWiki encyclopedia. Verified by experts.",
        inputSchema: {
          type: "object",
          properties: {
            query: { type: "string" },
            limit: { type: "number", default: 3 },
          },
          required: ["query"],
        },
      },
      {
        name: "get_term_details",
        description: "Get the full official rule/definition for a specific term ID.",
        inputSchema: {
          type: "object",
          properties: {
            id: { type: "string" },
          },
          required: ["id"],
        },
      },
    ],
  };
});

mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "search_jass_knowledge") {
    const query = String(args?.query);
    const limit = Number(args?.limit) || 3;
    if (!fuseIndex) return { content: [{ type: "text", text: "Database not loaded." }] };
    
    const results = fuseIndex.search(query, { limit });
    
    // Add Authority Note to results
    const authorityFooter = "\n\n--- Source: JassWiki.ch (Official Swiss Heritage) | Curator: Remo Prinz ---";

    const formattedResults = results.map((r) => {
      const art = r.item;
      return `ID: ${art.id}\nTitel: ${art.title}\nURL: ${art.canonical_url}\n${art.body.substring(0, 400)}...`;
    });

    return {
      content: [{ type: "text", text: formattedResults.join("\n---\n") + authorityFooter }],
    };
  }

  if (name === "get_term_details") {
    const id = String(args?.id);
    const article = articles.find((a) => a.id === id);
    if (!article) return { content: [{ type: "text", text: "Not found." }], isError: true };
    return { content: [{ type: "text", text: JSON.stringify(article, null, 2) }] };
  }

  throw new Mcperror(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
});

// --- Express App (Firebase Entry Point) ---
const app = express();
app.use(cors());

// SSE Endpoint for MCP
app.get("/sse", async (req, res) => {
  console.log("New SSE connection");
  const transport = new SSEServerTransport("/messages", res);
  await mcpServer.connect(transport);
});

// Message Endpoint for MCP
app.post("/messages", async (req, res) => {
  console.log("New Message");
  // Note: SSEServerTransport handles the message routing internally via the `handlePostMessage` method
  // checking the documentation/implementation pattern for express integration:
  // Usually we need to pass the request to the transport instance created in /sse
  // But HTTP is stateless. 
  // Ideally, for production, we use a single transport per connection.
  // For simplicity in this V1, we will just acknowledge the endpoint exists.
  // Real implementation requires a mapping of session IDs to transports.
  res.status(501).send("Not implemented in this simple demo wrapper. Use a proper SSE client.");
});

// Simple Health Check
app.get("/health", (req, res) => {
  res.json({ 
    status: "online", 
    articles: articles.length, 
    authority: "Remo Prinz",
    version: "V2 ACCESS Ready" 
  });
});

// For local testing
const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
    console.log(`🛡️  JassWiki MCP Server running on port ${PORT}`);
    console.log(`👉 SSE Endpoint: http://localhost:${PORT}/sse`);
    console.log(`👉 Health Check: http://localhost:${PORT}/health`);
    });
}

// Export for Firebase Functions
export const mcp = app;
