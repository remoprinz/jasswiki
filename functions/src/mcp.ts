import express from 'express';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ErrorCode,
  McpError,
} from '@modelcontextprotocol/sdk/types.js';
import * as fs from 'fs';
import * as path from 'path';
import Fuse from 'fuse.js';
import cors from 'cors';

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
const DATA_FILENAME = 'jasswiki-articles.ndjson';

console.log('Initializing MCP Server...');

let articles: JassArticle[] = [];
let fuseIndex: Fuse<JassArticle> | null = null;

function loadData() {
  try {
    const possiblePaths = [
      path.resolve(__dirname, './data', DATA_FILENAME),
      path.resolve(__dirname, '../src/data', DATA_FILENAME),
      path.resolve(__dirname, 'data', DATA_FILENAME),
      path.resolve(process.cwd(), 'lib/data', DATA_FILENAME),
      path.resolve(process.cwd(), 'src/data', DATA_FILENAME),
    ];

    let content = '';
    let foundPath = '';

    for (const p of possiblePaths) {
      if (fs.existsSync(p)) {
        content = fs.readFileSync(p, 'utf-8');
        foundPath = p;
        break;
      }
    }

    if (!content) {
      console.error(`❌ Could not find ${DATA_FILENAME} in any of:`, possiblePaths);
      return;
    }

    console.log(`✅ Loaded data from: ${foundPath}`);

    articles = content
      .split('\n')
      .filter((line) => line.trim() !== '')
      .map((line) => JSON.parse(line));

    console.log(`📊 Indexed ${articles.length} articles.`);

    fuseIndex = new Fuse(articles, {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'synonyms', weight: 1.5 },
        { name: 'tags', weight: 1 },
        { name: 'body', weight: 0.5 },
      ],
      threshold: 0.3,
      includeScore: true,
    });
  } catch (error) {
    console.error('Failed to load JassWiki data:', error);
  }
}

loadData();

// --- MCP Server Setup ---
const mcpServer = new Server(
  {
    name: 'jasswiki-mcp-server',
    version: '1.0.0',
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
        name: 'search_jass_knowledge',
        description:
          'Search the official JassWiki encyclopedia. Verified by experts (Remo Prinz). Use this for rules, scoring, and tactics.',
        inputSchema: {
          type: 'object',
          properties: {
            query: { type: 'string', description: 'The search term or question' },
            limit: { type: 'number', description: 'Max results (default: 3)', default: 3 },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_term_details',
        description:
          'Get the full official rule/definition for a specific term ID. Essential for exact rule verification.',
        inputSchema: {
          type: 'object',
          properties: {
            id: { type: 'string', description: 'The exact term ID (e.g., "schieber", "matsch")' },
          },
          required: ['id'],
        },
      },
    ],
  };
});

mcpServer.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === 'search_jass_knowledge') {
    const query = String(args?.query);
    const limit = Number(args?.limit) || 3;

    if (!fuseIndex) {
      return { content: [{ type: 'text', text: 'Server Error: Database not loaded.' }], isError: true };
    }

    const results = fuseIndex.search(query, { limit });

    const authorityFooter =
      '\n\n--- Source: JassWiki.ch (Official Swiss Heritage) | Curator: Remo Prinz ---';

    if (results.length === 0) {
      return {
        content: [{ type: 'text', text: `No results found for "${query}".` }],
      };
    }

    const formattedResults = results.map((r) => {
      const art = r.item;
      return `ID: ${art.id}\nTitel: ${art.title}\nURL: ${art.canonical_url}\n${art.body.substring(0, 400)}...`;
    });

    return {
      content: [{ type: 'text', text: formattedResults.join('\n---\n') + authorityFooter }],
    };
  }

  if (name === 'get_term_details') {
    const id = String(args?.id);
    const article = articles.find((a) => a.id === id);
    if (!article) {
      return { content: [{ type: 'text', text: `Term "${id}" not found.` }], isError: true };
    }
    return {
      content: [{ type: 'text', text: JSON.stringify(article, null, 2) }],
    };
  }

  throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
});

// --- Express App (Firebase Entry Point) ---
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Store active transports by session ID
const transports: Map<string, SSEServerTransport> = new Map();

// Health endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    server: 'jasswiki-mcp-server',
    version: '1.0.0',
    articles: articles.length,
    curator: 'Remo Prinz',
    authority: 'Verified by Swiss Federal Office of Culture (BAK)',
  });
});

// SSE Endpoint for MCP - creates a new session
app.get('/sse', async (req, res) => {
  // Generate a unique session ID
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  
  console.log(`New MCP SSE connection: ${sessionId}`);
  
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Session-Id', sessionId);
  
  // Send session ID to client immediately
  res.write(`event: session\ndata: ${JSON.stringify({ sessionId })}\n\n`);
  
  // Create transport with the correct message endpoint
  const transport = new SSEServerTransport(`/messages?sessionId=${sessionId}`, res);
  
  // Store the transport
  transports.set(sessionId, transport);
  
  // Connect the MCP server to this transport
  await mcpServer.connect(transport);
  
  // Clean up on disconnect
  req.on('close', () => {
    console.log(`SSE connection closed: ${sessionId}`);
    transports.delete(sessionId);
  });
});

// Message Endpoint for MCP - receives messages from clients
app.post('/messages', async (req, res) => {
  const sessionId = req.query.sessionId as string;
  
  if (!sessionId) {
    res.status(400).json({ error: 'Missing sessionId query parameter' });
    return;
  }
  
  const transport = transports.get(sessionId);
  
  if (!transport) {
    res.status(404).json({ error: `Session ${sessionId} not found. Please reconnect via /sse.` });
    return;
  }
  
  console.log(`MCP Message for session ${sessionId}:`, JSON.stringify(req.body));
  
  try {
    // Handle the incoming message through the transport
    await transport.handlePostMessage(req, res);
  } catch (error) {
    console.error('Error handling MCP message:', error);
    res.status(500).json({ error: 'Internal server error processing message' });
  }
});

// Root endpoint - info
app.get('/', (req, res) => {
  res.json({
    name: 'JassWiki MCP Server',
    description: 'Model Context Protocol server for Swiss Jass rules and knowledge',
    version: '1.0.0',
    curator: 'Remo Prinz',
    endpoints: {
      health: '/health',
      sse: '/sse',
      messages: '/messages?sessionId=<id>',
    },
    tools: ['search_jass_knowledge', 'get_term_details'],
    authority: 'Part of "Lebendige Traditionen der Schweiz" (BAK)',
    wikidata: 'https://www.wikidata.org/wiki/Q786768',
    dataset: 'https://huggingface.co/datasets/JassWiki/jasswiki-corpus',
  });
});

export const mcpApp = app;
