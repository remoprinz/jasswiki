/**
 * Firebase Functions für JassWiki RAG
 * 
 * Endpoints:
 * - POST /jasswikiQuery: RAG Query mit Scoring Policy
 */

import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import { Pinecone } from '@pinecone-database/pinecone';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as admin from 'firebase-admin';
import type {
  RAGQueryResponse,
  RAGQueryResult,
} from './types';
import { normalizeQuery } from './utils/query-normalization';

// Initialize Firebase Admin (für Rate Limiting)
if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

// Define secrets
const pinconeApiKey = defineSecret('PINECONE_API_KEY');
const geminiApiKey = defineSecret('GEMINI_API_KEY');
const jasswikiApiKey = defineSecret('JASSWIKI_API_KEY');

// ============================================================================
// CONFIGURATION
// ============================================================================

const INDEX_NAME = 'jasswiki';
const DEFAULT_TOP_K = 5;
const DEFAULT_MIN_SCORE = 0.65; // Sehr niedrig für maximalen Recall → GPT filtert anhand Score
const MARGIN_THRESHOLD = 0.01; // Minimal für alle Kombinationen
const EMBEDDING_MODEL = 'embedding-001';

// ✅ SICHERHEIT: Rate Limiting Konfiguration
const RATE_LIMIT_REQUESTS = 100; // Max Requests pro Zeitfenster
const RATE_LIMIT_WINDOW_SECONDS = 3600; // 1 Stunde
const ALLOWED_ORIGINS = [
  'https://jasswiki.ch',
  'https://www.jasswiki.ch',
  'http://localhost:3000',
  'http://localhost:3001'
];

// ✅ SICHERHEIT: Rate Limiting Helper
async function checkRateLimit(ip: string, functionName: string): Promise<{ allowed: boolean; message?: string }> {
  const rateLimitKey = `rateLimit_${functionName}_${ip}`;
  const now = admin.firestore.Timestamp.now();
  const windowStart = new admin.firestore.Timestamp(now.seconds - RATE_LIMIT_WINDOW_SECONDS, now.nanoseconds);
  
  try {
    const rateLimitRef = db.collection('rateLimits').doc(rateLimitKey);
    const rateLimitDoc = await rateLimitRef.get();
    
    if (rateLimitDoc.exists) {
      const data = rateLimitDoc.data();
      const requestCount = data?.count || 0;
      const firstRequest = data?.firstRequest;
      
      // Prüfe ob Zeitfenster abgelaufen ist
      if (firstRequest && firstRequest.seconds < windowStart.seconds) {
        // Zeitfenster abgelaufen, reset
        await rateLimitRef.set({
          count: 1,
          firstRequest: now,
          lastRequest: now
        });
        return { allowed: true };
      }
      
      // Prüfe ob Limit erreicht
      if (requestCount >= RATE_LIMIT_REQUESTS) {
        return {
          allowed: false,
          message: `Rate limit exceeded. Max ${RATE_LIMIT_REQUESTS} requests per hour.`
        };
      }
      
      // Erhöhe Counter
      await rateLimitRef.update({
        count: admin.firestore.FieldValue.increment(1),
        lastRequest: now
      });
    } else {
      // Erste Request in diesem Zeitfenster
      await rateLimitRef.set({
        count: 1,
        firstRequest: now,
        lastRequest: now
      });
    }
    
    return { allowed: true };
  } catch (error) {
    console.error('Rate limit check error:', error);
    // Bei Fehler: Erlaube Request (Fail-Open Strategie)
    return { allowed: true };
  }
}

// ✅ SICHERHEIT: CORS Helper
function checkCORS(origin: string | undefined): boolean {
  if (!origin) return false;
  return ALLOWED_ORIGINS.some(allowed => origin.startsWith(allowed));
}

// ✅ SICHERHEIT: API Key Validation
function validateApiKey(req: any, expectedKey: string): boolean {
  const providedKey = req.get('x-api-key') || req.get('X-API-Key') || req.headers['x-api-key'];
  // Trim both values to handle potential whitespace/newlines in secrets
  return providedKey?.trim() === expectedKey?.trim();
}

// ============================================================================
// SERVICES (Lazy Init)
// ============================================================================

let pineconeClient: Pinecone | null = null;
let embeddingModel: any = null;

function initializePinecone(apiKey: string): Pinecone {
  if (!pineconeClient) {
    pineconeClient = new Pinecone({ apiKey });
  }
  return pineconeClient;
}

function initializeEmbedding(apiKey: string): any {
  if (!embeddingModel) {
    const genAI = new GoogleGenerativeAI(apiKey);
    embeddingModel = genAI.getGenerativeModel({ model: EMBEDDING_MODEL });
  }
  return embeddingModel;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

async function generateEmbedding(text: string, model: any): Promise<number[]> {
  const result = await model.embedContent(text.trim().toLowerCase());
  return result.embedding.values;
}

function applyMarginFilter(
  matches: any[],
  minScore: number,
  margin: number
): { filtered: any[]; rejected_reason?: string } {
  // Schritt 1: Filter nach minScore
  const aboveThreshold = matches.filter(m => m.score >= minScore);

  if (aboveThreshold.length === 0) {
    return {
      filtered: [],
      rejected_reason: `Keine Treffer über Schwellwert (${minScore})`,
    };
  }

  // Schritt 2: Check Margin zwischen Top-Treffer und Rest
  // Bei sehr ähnlichen Scores (< margin) → Top-Result trotzdem verwenden
  // (Häufig bei Kombinationsanfragen wie "Stöck-Wys-Stich")
  const topScore = aboveThreshold[0].score;
  const secondScore = aboveThreshold[1]?.score || 0;

  if (topScore - secondScore < margin && aboveThreshold.length > 1) {
    console.log(`⚠️  Geringe Margin (${(topScore - secondScore).toFixed(3)}), verwende Top-Result`);
    // Trotzdem nur das beste Result zurückgeben (höchster Score)
    return { filtered: [aboveThreshold[0]] };
  }

  // Schritt 3: Varianten-Konsistenz (falls mehrere Treffer)
  if (aboveThreshold.length > 1) {
    const variants = aboveThreshold.map(m => m.metadata?.variant).filter(Boolean);
    const uniqueVariants = new Set(variants);

    if (uniqueVariants.size > 1) {
      return {
        filtered: [],
        rejected_reason: `Inkonsistente Varianten gefunden: ${Array.from(uniqueVariants).join(', ')}`,
      };
    }
  }

  return { filtered: aboveThreshold };
}

// ============================================================================
// QUERY-NORMALISIERUNG
// ============================================================================
// Alte Token-Expansion wurde entfernt und durch utils/query-normalization.ts ersetzt

// ----------------------------------------------------------------------------
// ARTICLE TEXT AUGMENTATION FOR STEPWISE DELIVERY
// ----------------------------------------------------------------------------

function extractHeadingsFromArticleText(text: string): string[] {
  const lines = text.split('\n');
  const headings: string[] = [];
  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;
    // Recognize headings that are stand-alone lines ending with a colon
    const match = line.match(/^([^:\n]{2,100}):\s*$/);
    if (!match) continue;
    const title = match[1].trim();
    // Exclude meta headings that should not count as content sections
    if (/^(titel|kurzdefinition)$/i.test(title)) continue;
    if (/kurzdefinition/i.test(title)) continue; // guard for lines like "Kurzdefinition: Grundregel:"
    headings.push(title);
  }
  return headings;
}

function augmentArticleTextForStepwiseDelivery(text: string): string {
  try {
    const headings = extractHeadingsFromArticleText(text);
    const total = headings.length;
    if (total === 0) return text;

    const outline = `Abschnittsübersicht (${total}): ` + headings.map((h, i) => `${i + 1}) ${h}`).join('; ');

    const lines = text.split('\n');
    const out: string[] = [];
    let sectionIndex = 0;
    for (const rawLine of lines) {
      const line = rawLine.trimEnd();
      const match = line.trim().match(/^([^:\n]{2,100}):\s*$/);
      if (match) {
        const title = match[1].trim();
        if (!/^(titel|kurzdefinition)$/i.test(title) && !/kurzdefinition/i.test(title)) {
          sectionIndex += 1;
          out.push(`## [${sectionIndex}/${total}] ${title}`);
          continue; // replace original heading line with marker
        }
      }
      out.push(line);
    }

    return `${outline}\n\n${out.join('\n')}\n\nENDE [${total}/${total}]`;
  } catch {
    return text; // fail-safe
  }
}

// ============================================================================
// SECTION EXTRACTION & RENDERING (für robustes Multi-Turn)
// ============================================================================

function extractSections(text: string): Array<{heading: string, content: string}> {
  const sections: Array<{heading: string, content: string}> = [];
  const lines = text.split('\n');
  let currentHeading = '';
  let currentContent: string[] = [];
  
  for (const line of lines) {
    // Erkenne ## [i/Y] Überschriften (vom augmentArticleTextForStepwiseDelivery)
    const headerMatch = line.match(/^## \[\d+\/\d+\] (.+)$/);
    if (headerMatch) {
      // Vorherigen Abschnitt speichern
      if (currentHeading) {
        sections.push({
          heading: currentHeading,
          content: currentContent.join('\n').trim()
        });
      }
      currentHeading = headerMatch[1];
      currentContent = [];
    } else if (!line.startsWith('Abschnittsübersicht') && 
               !line.startsWith('ENDE [')) {
      // Content sammeln (außer Metazeilen)
      currentContent.push(line);
    }
  }
  
  // Letzten Abschnitt speichern
  if (currentHeading && currentContent.length > 0) {
    sections.push({
      heading: currentHeading,
      content: currentContent.join('\n').trim()
    });
  }
  
  return sections;
}

function renderFullArticle(
  title: string, 
  sections: Array<{heading: string, content: string}>, 
  url: string
): string {
  // Keine fixe Einleitung mehr - der Prompt macht das je nach Kontext
  let output = '';
  
  for (const section of sections) {
    output += `**${section.heading}**\n${section.content}\n\n`;
  }
  
  output += `Quelle: ${title} (${url})\n\n`;
  output += `Interessieren dich **verwandte Themen**?`;
  return output;
}

function detectRuleIntent(query: string): boolean {
  const ruleKeywords = /konsequenz|strafe|regel|regelverstoss|verstoss|verstöss|fehler|sanktion|folge|ahndung|was passiert|wie wird geahndet|bestraft/i;
  return ruleKeywords.test(query);
}

/**
 * Generiert "Did you mean?" Vorschlag aus Query-Varianten
 * Zeigt die Variante, die am meisten vom Original abweicht
 */
function generateDidYouMeanSuggestion(originalQuery: string, variants: string[]): string | null {
  if (!variants || variants.length <= 1) return null;
  
  const original = originalQuery.toLowerCase().trim();
  
  // Finde die Variante, die am meisten vom Original abweicht
  // (aber nicht zu viel - max. 3 Zeichen Unterschied)
  const candidates = variants
    .filter(v => v !== original)
    .filter(v => Math.abs(v.length - original.length) <= 3)
    .filter(v => {
      // Mindestens 1 Zeichen unterschiedlich
      return v !== original;
    });
  
  if (candidates.length === 0) return null;
  
  // Bevorzuge Varianten mit Umlauten → normale Buchstaben
  const withUmlautReplacement = candidates.find(v => 
    v.includes('a') && !original.includes('a') && original.includes('ä') ||
    v.includes('o') && !original.includes('o') && original.includes('ö') ||
    v.includes('u') && !original.includes('u') && original.includes('ü') ||
    v.includes('e') && original.includes('é')
  );
  
  if (withUmlautReplacement) return withUmlautReplacement;
  
  // Sonst: Erste Variante die anders ist
  return candidates[0] || null;
}

async function enrichSeeAlsoWithUrls(
  seeAlsoIds: string[],
  index: any
): Promise<Array<{title: string, url: string}>> {
  if (!seeAlsoIds || seeAlsoIds.length === 0) return [];
  
  const enriched: Array<{title: string, url: string}> = [];
  
  // WICHTIG: IDs mit "article_" prefixen, da Pinecone-IDs so gespeichert sind
  const pineconeIds = seeAlsoIds.map(id => `article_${id}`);
  
  // Versuche alle IDs in einem Batch abzurufen
  try {
    const fetchResult = await index.namespace('articles').fetch(pineconeIds);
    
    for (let i = 0; i < seeAlsoIds.length; i++) {
      const originalId = seeAlsoIds[i];
      const pineconeId = pineconeIds[i];
      
      if (fetchResult.records && fetchResult.records[pineconeId]) {
        const record = fetchResult.records[pineconeId];
        enriched.push({
          title: record.metadata?.source || originalId,
          url: record.metadata?.canonical_url || 'https://jasswiki.ch',
        });
      } else {
        // Fallback: Nur die ID als Titel (sollte nicht mehr vorkommen)
        console.warn(`⚠️  see_also ID nicht gefunden: ${originalId} (Pinecone: ${pineconeId})`);
        enriched.push({
          title: originalId.replace(/_/g, ' '),
          url: 'https://jasswiki.ch',
        });
      }
    }
  } catch (err) {
    console.warn('Could not fetch see_also entries:', err);
    // Fallback: IDs als Titel verwenden
    for (const id of seeAlsoIds) {
      enriched.push({
        title: id.replace(/_/g, ' '),
        url: 'https://jasswiki.ch',
      });
    }
  }
  
  return enriched;
}

// ============================================================================
// MAIN QUERY FUNCTION
// ============================================================================

// HTTP Endpoint für ChatGPT Actions (OpenAPI)
// ============================================================================
// RAGIT QUERY (Multi-Tenant)
// ============================================================================

export const ragitQuery = onRequest(
  {
    cors: ALLOWED_ORIGINS,
    secrets: [pinconeApiKey, geminiApiKey, jasswikiApiKey],
    memory: '512MiB',
    timeoutSeconds: 60,
    region: 'us-central1',
  },
  async (req, res) => {
    // ✅ SICHERHEIT: CORS Prüfung
    const origin = req.get('origin') || req.get('referer');
    const allowedOrigin = checkCORS(origin) ? origin : ALLOWED_ORIGINS[0];
    
    res.set('Access-Control-Allow-Origin', allowedOrigin);
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-api-key');

    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    // ✅ SICHERHEIT: API Key Validation
    const expectedKey = jasswikiApiKey.value();
    if (!validateApiKey(req, expectedKey)) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or missing API key'
      });
      return;
    }

    // ✅ SICHERHEIT: Rate Limiting
    const clientIP = req.ip || req.get('x-forwarded-for') || req.get('x-real-ip') || 'unknown';
    const rateLimitCheck = await checkRateLimit(clientIP, 'ragitQuery');
    
    if (!rateLimitCheck.allowed) {
      res.status(429).json({
        error: 'Rate limit exceeded',
        message: rateLimitCheck.message
      });
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { query, namespace, topK = 3, filters } = req.body || {};

    if (!query || !namespace) {
      res.status(400).json({ error: 'Query und Namespace sind erforderlich.' });
      return;
    }

    try {
      // Initialize Services with Secrets
      let pineconeKey: string;
      let geminiKeyValue: string;

      try {
        pineconeKey = pinconeApiKey.value();
        geminiKeyValue = geminiApiKey.value();
      } catch (error) {
        console.error('Error accessing secrets:', error);
        res.status(500).json({ error: 'Configuration error' });
        return;
      }

      if (!pineconeKey || !geminiKeyValue) {
        console.error('Missing API keys');
        res.status(500).json({ error: 'Missing API keys' });
        return;
      }

      const pinecone = initializePinecone(pineconeKey);
      const embeddingService = initializeEmbedding(geminiKeyValue);

      // Use ragit-core index
      const index = pinecone.Index('ragit-core');

      // Generate embedding
      const result = await embeddingService.embedContent(query);
      const vector = result.embedding.values;

      // Query Pinecone
      const queryResponse = await index.namespace(namespace).query({
        vector,
        topK: topK * 2,
        includeMetadata: true,
      });

      const matches = queryResponse.matches || [];
      const minScore = filters?.minScore || 0.75;

      // Filter by score
      const aboveThreshold = matches.filter(m => (m.score || 0) >= minScore);

      if (aboveThreshold.length === 0) {
        const bestScore = matches[0]?.score || 0;
        res.status(200).json({
          results: [],
          metadata: {
            query,
            namespace,
            topK,
            threshold: minScore,
            total_matches: matches.length,
            rejected_reason: `Keine Treffer über Schwellwert (${minScore}). Bester Score: ${bestScore.toFixed(3)}`
          }
        });
        return;
      }

      // Format results
      const results = aboveThreshold.slice(0, topK).map(m => ({
        id: m.id,
        text: m.metadata?.text as string || '',
        score: m.score || 0,
        metadata: m.metadata || {},
      }));

      res.status(200).json({
        results,
        metadata: {
          query,
          namespace,
          topK,
          threshold: minScore,
          total_matches: matches.length
        }
      });

    } catch (error: any) {
      console.error('Error in ragitQuery:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        message: error.message
      });
    }
  }
);

export const jasswikiQuery = onRequest(
  {
    cors: ALLOWED_ORIGINS,
    secrets: [pinconeApiKey, geminiApiKey, jasswikiApiKey],
    memory: '512MiB',
    timeoutSeconds: 60,
    region: 'us-central1',
  },
  async (req, res) => {
    // ✅ SICHERHEIT: CORS Prüfung
    const origin = req.get('origin') || req.get('referer');
    const allowedOrigin = checkCORS(origin) ? origin : ALLOWED_ORIGINS[0];
    
    res.set('Access-Control-Allow-Origin', allowedOrigin);
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type, X-API-Key');

    if (req.method === 'OPTIONS') {
      res.status(204).send('');
      return;
    }

    // ✅ SICHERHEIT: API Key Validation
    const expectedKey = jasswikiApiKey.value();
    if (!validateApiKey(req, expectedKey)) {
      res.status(401).json({
        error: 'Unauthorized',
        message: 'Invalid or missing API key'
      });
      return;
    }

    // ✅ SICHERHEIT: Rate Limiting
    const clientIP = req.ip || req.get('x-forwarded-for') || req.get('x-real-ip') || 'unknown';
    const rateLimitCheck = await checkRateLimit(clientIP, 'jasswikiQuery');
    
    if (!rateLimitCheck.allowed) {
      res.status(429).json({
        error: 'Rate limit exceeded',
        message: rateLimitCheck.message
      });
      return;
    }

    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { query, topK = DEFAULT_TOP_K, filters } = req.body || {};

    if (!query || query.trim().length === 0) {
      res.status(400).json({ error: 'Query darf nicht leer sein' });
      return;
    }

    console.log(`🔍 Query: "${query}"`);
    console.log(`   TopK: ${topK}, MinScore: ${filters?.minScore || DEFAULT_MIN_SCORE}`);

    try {
      // Initialize Services with Secrets
      let pineconeKey: string;
      let geminiKeyValue: string;
      
      try {
        pineconeKey = pinconeApiKey.value();
        geminiKeyValue = geminiApiKey.value();
        console.log(`🔑 Secrets geladen: PINECONE=${pineconeKey?.substring(0, 10)}..., GEMINI=${geminiKeyValue?.substring(0, 10)}...`);
      } catch (secretError: any) {
        console.error('❌ Secret-Ladefehler:', secretError);
        res.status(500).json({
          error: 'Secret-Ladefehler',
          message: secretError.message || 'Secrets konnten nicht geladen werden'
        });
        return;
      }
      
      if (!geminiKeyValue || geminiKeyValue.length === 0) {
        console.error('❌ GEMINI_API_KEY ist leer oder undefined');
        res.status(500).json({
          error: 'GEMINI_API_KEY fehlt',
          message: 'Gemini API Key wurde nicht geladen'
        });
        return;
      }
      
      const pinecone = initializePinecone(pineconeKey);
      const embeddingService = initializeEmbedding(geminiKeyValue);
      
      // 1. Basissuche + Query-Normalisierung
      const index = pinecone.Index(INDEX_NAME);
      const queryVariants = normalizeQuery(query);
      console.log(`🧠 Query-Varianten: ${queryVariants.map(q => '"' + q + '"').join(' | ')}`);

      const queryEmbeddings = await Promise.all(
        queryVariants.map(q => generateEmbedding(q, embeddingService))
      );
      console.log(`✅ Embeddings generiert: ${queryEmbeddings.length}× (768D)`);

      // Nur Articles Namespace abfragen (FAQs entfernt)
      const namespaceNames = ['articles'] as const;
      const namespaceQueries = [] as Promise<any>[];
      for (const vector of queryEmbeddings) {
        for (const ns of namespaceNames) {
          namespaceQueries.push(
            index.namespace(ns).query({
              vector,
              topK: topK * 2,
              includeMetadata: true,
            })
          );
        }
      }

      const namespaceResults = await Promise.all(namespaceQueries);

      // 3. Kombiniere mit Namespace-Markierung
      const allMatches: Array<any & { _namespace: string }> = [];
      for (let queryIdx = 0; queryIdx < queryEmbeddings.length; queryIdx++) {
        for (let nsIdx = 0; nsIdx < namespaceNames.length; nsIdx++) {
          const resultIdx = queryIdx * namespaceNames.length + nsIdx;
          const namespace = namespaceNames[nsIdx];
          const matches = namespaceResults[resultIdx]?.matches || [];
          for (const match of matches) {
            allMatches.push({
              ...match,
              _namespace: namespace,
            });
          }
        }
      }
      allMatches.sort((a, b) => (b.score || 0) - (a.score || 0));

      console.log(`📊 Pinecone Matches: ${allMatches.length}`);

      // 4. Scoring Policy anwenden
      const minScore = filters?.minScore || DEFAULT_MIN_SCORE;
      const { filtered, rejected_reason } = applyMarginFilter(
        allMatches,
        minScore,
        MARGIN_THRESHOLD
      );

      console.log(`✅ Nach Filtering: ${filtered.length} Treffer`);

      // Regel-Intent früh erkennen (für Category-Filter-Fallback)
      const isRuleQuestion = detectRuleIntent(query);

      // 5. Optional: Category-Filter
      let finalResults = filtered;
      if (filters?.category) {
        const beforeCount = finalResults.length;
        finalResults = filtered.filter(
          m => m.metadata?.category_main === filters.category
        );
        console.log(`   Category-Filter (${filters.category}): ${beforeCount} → ${finalResults.length}`);
        
        // FALLBACK: Wenn nach Category-Filter nichts gefunden → ohne Filter weitermachen
        if (finalResults.length === 0) {
          console.log(`⚠️  Category-Filter zu strikt → Fallback ohne Category-Filter`);
          finalResults = filtered; // Zurück zum vorherigen State
        }
      }

      // 6. Optional: Varianten-Filter
      if (filters?.variant) {
        finalResults = finalResults.filter(
          m => m.metadata?.variant === filters.variant || !m.metadata?.variant
        );
        console.log(`   Varianten-Filter (${filters.variant}): ${finalResults.length}`);
      }

      // 7. Strict selection: Prefer articles namespace OR content_type='article' ALWAYS
      // (isRuleQuestion wurde bereits oben erkannt)
      
      // Priorität: 1) Namespace 'articles', 2) content_type='article', 3) Fallback
      // (FAQs werden nicht mehr durchsucht, daher kein Filter nötig)
      let articlesFromNamespace = finalResults.filter(m => m._namespace === 'articles');
      let articlesByContentType = finalResults.filter(m => m.metadata?.content_type === 'article');
      
      // Kombiniere beide (priorisiere Namespace)
      const articlesOnly = [
        ...articlesFromNamespace,
        ...articlesByContentType.filter(a => !articlesFromNamespace.find(n => n.id === a.id))
      ];
      articlesOnly.sort((a, b) => (b.score || 0) - (a.score || 0));
      const topOverall = finalResults.sort((a, b) => (b.score || 0) - (a.score || 0))[0];
      
      console.log(`📚 Artikel aus Namespace: ${articlesFromNamespace.length}, Nach content_type: ${articlesByContentType.length}, Kombiniert: ${articlesOnly.length}`);
      console.log(`📋 Top Overall: ${topOverall?.id} (Score: ${topOverall?.score?.toFixed(3)}, Namespace: ${topOverall?._namespace || 'unknown'}, Type: ${topOverall?.metadata?.content_type || 'unknown'})`);
      
      let topResult = articlesOnly[0] || topOverall;
      
      // (FAQs werden nicht mehr durchsucht, daher kein Fallback nötig)
      
      if (topResult) {
        if (articlesOnly.length > 0) {
          console.log(`✅ Verwende Artikel: ${topResult.id} (Score: ${topResult.score?.toFixed(3)}, Namespace: ${topResult._namespace})`);
        } else {
          console.log(`⚠️  Kein Artikel gefunden, verwende Top-Overall: ${topResult.id}`);
        }
      } else {
        console.log(`⚠️  Kein Top-Result gefunden (articlesOnly: ${articlesOnly.length}, topOverall: ${topOverall ? 'exists' : 'undefined'})`);
      }
      
      // WICHTIG: NIEMALS 404 zurückgeben, sonst sieht ChatGPT "Verbindungsfehler"
      // Stattdessen: 200 OK mit rejected_reason + leeren results
      if (!topResult) {
        console.log(`⚠️  Keine Treffer gefunden für Query: "${query}"`);
        
        // Versuche "Did you mean?" Suggestion zu generieren
        const suggestion = generateDidYouMeanSuggestion(query, queryVariants);
        
        res.status(200).json({
          results: [],
          metadata: {
            query,
            topK,
            threshold: minScore,
            margin: MARGIN_THRESHOLD,
            total_matches: allMatches.length,
            filtered_count: filtered.length,
            rejected_reason: suggestion 
              ? `Kein Artikel zu "${query}" gefunden. Meinten Sie: ${suggestion}?`
              : `Kein passender Artikel zu "${query}" gefunden.`,
          }
        });
        return;
      }

      // 9. Response bauen - nur Top-Result mit vollständigem Artikel
      const originalText = topResult.metadata?.text || '';
      const augmentedText = augmentArticleTextForStepwiseDelivery(originalText);

      // Sections extrahieren (isRuleQuestion wurde bereits oben erkannt)
      const sections = extractSections(augmentedText);
      
      // NEU: Bei Regel-Intent vollständigen Artikel rendern
      let renderedFullAnswer: string | undefined = undefined;
      if (isRuleQuestion && sections.length > 0) {
        const title = topResult.metadata?.source || 'Regelartikel';
        const url = topResult.metadata?.canonical_url || '';
        renderedFullAnswer = renderFullArticle(title, sections, url);
        console.log(`🎯 Regel-Intent erkannt → renderedFullAnswer mit ${sections.length} Abschnitten`);
      }

      // OPTIONAL: "Gürtel+Hosenträger"-Fix
      // Falls ChatGPT neue Felder ignoriert, überschreibe text mit renderedFullAnswer
      const finalText = (isRuleQuestion && renderedFullAnswer) 
        ? renderedFullAnswer 
        : augmentedText;

      // see_also mit URLs anreichern
      const seeAlsoIds = topResult.metadata?.see_also || [];
      const seeAlsoWithUrls = await enrichSeeAlsoWithUrls(seeAlsoIds, index);

      const result: RAGQueryResult = {
        id: topResult.id || '',
        text: finalText, // Bei Regel-Fragen: renderedFullAnswer; sonst: augmentedText
        score: topResult.score || 0,
        title: topResult.metadata?.source || undefined,
        canonical_url: topResult.metadata?.canonical_url || '',
        category: {
          main: topResult.metadata?.category_main || 'Grundlagen & Kultur',
          sub: topResult.metadata?.category_sub || '',
        },
        see_also: seeAlsoWithUrls,
        variant: topResult.metadata?.variant || undefined,
        // NEU: Multi-Turn Support
        isRuleQuestion,
        renderedFullAnswer,
        sections,
      };

      const results: RAGQueryResult[] = [result];

      const response: RAGQueryResponse = {
        results,
        metadata: {
          query,
          topK: 1, // Immer nur Top-Result
          threshold: minScore,
          margin: MARGIN_THRESHOLD,
          total_matches: allMatches.length,
          filtered_count: filtered.length,
          rejected_reason,
        },
      };

      console.log(`✅ Response: Top-Result mit Score ${result.score.toFixed(3)} (${result.id})`);
      res.status(200).json(response);
    } catch (error: any) {
      console.error('❌ Fehler bei Query:', error);
      res.status(500).json({
        error: 'Query fehlgeschlagen',
        message: error.message || 'Internal server error'
      });
    }
  }
);

import { mcpApp } from './mcp';

export const mcp = onRequest(
  {
    memory: '512MiB',
    timeoutSeconds: 60,
    region: 'us-central1',
    cors: true,
  },
  mcpApp
);

