#!/usr/bin/env tsx
/**
 * RAG Query Test-Skript
 * 
 * Testet den Firebase Functions Endpoint lokal oder remote
 */

import dotenv from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';
import { getEmbeddingService } from '../lib/embedding-service';

dotenv.config();

const INDEX_NAME = 'jasswiki';

interface TestQuery {
  name: string;
  query: string;
  expectedMatch?: string;
  category?: string;
  variant?: string;
}

const TEST_QUERIES: TestQuery[] = [
  {
    name: 'Einfache Begriffsfrage',
    query: 'Was bedeutet Abheben beim Jassen?',
    expectedMatch: 'abheben',
  },
  {
    name: 'Regelabfrage',
    query: 'Wie funktioniert die Kartenverteilung?',
    category: 'Regeln',
  },
  {
    name: 'Varianten-spezifisch',
    query: 'Wie spielt man Schieber?',
    variant: 'Schieber',
  },
  {
    name: 'Taktikfrage',
    query: 'Welche Strategie ist am besten beim Weis?',
  },
  {
    name: 'Unklare Frage (sollte rejected werden)',
    query: 'xyz abc',
  },
];

const MIN_SCORE = 0.85;
const MARGIN = 0.03;

async function testQuery(
  testCase: TestQuery,
  embeddingService: Awaited<ReturnType<typeof getEmbeddingService>>,
  index: ReturnType<Pinecone['Index']>
): Promise<void> {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`TEST: ${testCase.name}`);
  console.log(`Query: "${testCase.query}"`);
  console.log('-'.repeat(60));

  try {
    // 1. Generiere Embedding
    const queryEmbedding = await embeddingService.generateEmbedding(testCase.query);
    console.log(`✅ Embedding generiert (768D)`);

    // 2. Query Pinecone
    const [articlesResults, faqsResults] = await Promise.all([
      index.namespace('articles').query({
        vector: queryEmbedding,
        topK: 10,
        includeMetadata: true,
      }),
      index.namespace('faqs').query({
        vector: queryEmbedding,
        topK: 10,
        includeMetadata: true,
      }),
    ]);

    const allMatches = [
      ...(articlesResults.matches || []),
      ...(faqsResults.matches || []),
    ].sort((a, b) => (b.score || 0) - (a.score || 0));

    console.log(`📊 Pinecone Matches: ${allMatches.length}`);

    // 3. Scoring Policy
    const aboveThreshold = allMatches.filter(m => (m.score || 0) >= MIN_SCORE);
    console.log(`   Über Threshold (${MIN_SCORE}): ${aboveThreshold.length}`);

    if (aboveThreshold.length === 0) {
      console.log(`⚠️  REJECTED: Keine Treffer über Schwellwert`);
      return;
    }

    const topScore = aboveThreshold[0].score || 0;
    const secondScore = aboveThreshold[1]?.score || 0;
    const margin = topScore - secondScore;

    console.log(`   Top Score: ${topScore.toFixed(4)}`);
    console.log(`   2nd Score: ${secondScore.toFixed(4)}`);
    console.log(`   Margin: ${margin.toFixed(4)} (required: ${MARGIN})`);

    if (margin < MARGIN && aboveThreshold.length > 1) {
      console.log(`⚠️  REJECTED: Margin zu gering (nicht eindeutig)`);
      return;
    }

    // 4. Filter (optional)
    let filtered = aboveThreshold;
    if (testCase.category) {
      filtered = filtered.filter(m => m.metadata?.category_main === testCase.category);
      console.log(`   Category-Filter (${testCase.category}): ${filtered.length}`);
    }
    if (testCase.variant) {
      filtered = filtered.filter(
        m => m.metadata?.variant === testCase.variant || !m.metadata?.variant
      );
      console.log(`   Variant-Filter (${testCase.variant}): ${filtered.length}`);
    }

    // 5. Top Results
    const topResults = filtered.slice(0, 5);
    console.log(`\n✅ TOP RESULTS: ${topResults.length}\n`);

    topResults.forEach((result, i) => {
      console.log(`${i + 1}. [${result.score?.toFixed(4)}] ${result.id}`);
      console.log(`   Titel: ${result.metadata?.source}`);
      console.log(`   Category: ${result.metadata?.category_main} › ${result.metadata?.category_sub}`);
      console.log(`   URL: ${result.metadata?.canonical_url}`);
      if (result.metadata?.variant) {
        console.log(`   Variant: ${result.metadata.variant}`);
      }
      console.log(`   Text: ${(result.metadata?.text as string || '').slice(0, 100)}...`);
      console.log();
    });

    // 6. Validierung
    if (testCase.expectedMatch) {
      const found = topResults.some(r => r.id.includes(testCase.expectedMatch!));
      if (found) {
        console.log(`✅ PASS: Expected match "${testCase.expectedMatch}" gefunden`);
      } else {
        console.log(`❌ FAIL: Expected match "${testCase.expectedMatch}" NICHT gefunden`);
      }
    }
  } catch (error) {
    console.error(`❌ ERROR: ${error}`);
  }
}

async function main() {
  console.log('🚀 Starte RAG Query Tests\n');

  try {
    // Init Services
    const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
    if (!PINECONE_API_KEY) {
      throw new Error('❌ PINECONE_API_KEY nicht in .env gefunden!');
    }

    const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
    const index = pinecone.Index(INDEX_NAME);
    const embeddingService = await getEmbeddingService();

    console.log('✅ Services initialisiert\n');

    // Run Tests
    for (const testCase of TEST_QUERIES) {
      await testQuery(testCase, embeddingService, index);
      await new Promise(resolve => setTimeout(resolve, 500)); // Rate limit
    }

    console.log('\n' + '='.repeat(60));
    console.log('✅ ALLE TESTS ABGESCHLOSSEN\n');
  } catch (error) {
    console.error('❌ Fataler Fehler:', error);
    process.exit(1);
  }
}

// Run
main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

export { main as testRAGQuery };

