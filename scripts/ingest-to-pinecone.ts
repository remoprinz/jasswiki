#!/usr/bin/env tsx
/**
 * Ingestion Workflow: JSONL → Pinecone
 * 
 * Prozess:
 * 1. Lade JSONL-Dateien (articles)
 * 2. Mappe zu Pinecone-Dokumenten (via Mapper)
 * 3. Generiere Embeddings (Gemini 768D)
 * 4. Validiere Limits
 * 5. Upsert zu Pinecone (batch-weise)
 * 6. Logging & Stats
 */

import { Pinecone } from '@pinecone-database/pinecone';
import type { RecordMetadata } from '@pinecone-database/pinecone';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import type { ArticleJSONL, PineconeDocument } from '../lib/rag-types';
import { validatePineconeDocument, PINECONE_LIMITS } from '../lib/rag-types';
import { articleMapper } from './mappers/article-mapper';
import { getEmbeddingService } from '../lib/embedding-service';

dotenv.config();

// ES Module __dirname replacement
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const INDEX_NAME = 'jasswiki';
const ARTICLES_PATH = join(__dirname, '../chatgpt-gpt/jasswiki-articles.jsonl');
const BATCH_SIZE = 100; // Pinecone Upsert Batch-Size

interface Stats {
  articlesProcessed: number;
  totalEmbeddings: number;
  totalUploadedArticles: number;
  errors: string[];
  startTime: number;
  endTime?: number;
}

async function loadJSONL<T>(filePath: string): Promise<T[]> {
  console.log(`📂 Lade ${filePath}...`);
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.trim().split('\n');
  const items: T[] = lines.map(line => JSON.parse(line));
  console.log(`✅ ${items.length} Einträge geladen\n`);
  return items;
}

async function ingestArticles(
  articles: ArticleJSONL[],
  embeddingService: Awaited<ReturnType<typeof getEmbeddingService>>,
  index: ReturnType<Pinecone['Index']>,
  stats: Stats
): Promise<void> {
  console.log('📝 Verarbeite Artikel...\n');

  const documents: PineconeDocument[] = [];

  for (const article of articles) {
    try {
      // 1. Mappe zu Pinecone-Format
      const mapped = articleMapper.mapArticle(article);

      // 2. Generiere Embedding
      const embedding = await embeddingService.generateEmbedding(mapped.embeddingText);

      // 3. Baue finales Document
      const doc: PineconeDocument = {
        id: mapped.id,
        values: embedding,
        metadata: mapped.metadata,
      };

      // 4. Validiere
      validatePineconeDocument(doc);

      documents.push(doc);
      stats.articlesProcessed++;
      stats.totalEmbeddings++;

      if (stats.articlesProcessed % 10 === 0) {
        console.log(`   Verarbeitet: ${stats.articlesProcessed}/${articles.length}`);
      }
    } catch (error) {
      const errorMsg = `Fehler bei Artikel ${article.id}: ${error}`;
      console.error(`❌ ${errorMsg}`);
      stats.errors.push(errorMsg);
    }
  }

  console.log(`\n✅ ${documents.length} Artikel bereit für Upload\n`);

  // Upload in Batches zu Pinecone (Namespace: articles)
  await uploadBatch(documents, index, 'articles', stats);
}

async function uploadBatch(
  documents: PineconeDocument[],
  index: ReturnType<Pinecone['Index']>,
  namespace: string,
  stats: Stats
): Promise<void> {
  console.log(`📤 Upload zu Pinecone (Namespace: ${namespace})...\n`);

  for (let i = 0; i < documents.length; i += BATCH_SIZE) {
    const batch = documents.slice(i, i + BATCH_SIZE);

    try {
      // Convert to Pinecone format (with RecordMetadata compatibility)
      const pineconeRecords = batch.map(doc => ({
        id: doc.id,
        values: doc.values,
        metadata: doc.metadata as unknown as RecordMetadata,
      }));
      
      await index.namespace(namespace).upsert(pineconeRecords);

      stats.totalUploadedArticles += batch.length;

      console.log(
        `   Uploaded: ${Math.min(i + BATCH_SIZE, documents.length)}/${documents.length}`
      );
    } catch (error) {
      const errorMsg = `Fehler beim Upload Batch ${i}-${i + batch.length}: ${error}`;
      console.error(`❌ ${errorMsg}`);
      stats.errors.push(errorMsg);
    }
  }

  console.log(`\n✅ Upload abgeschlossen\n`);
}

async function main() {
  const stats: Stats = {
    articlesProcessed: 0,
    totalEmbeddings: 0,
    totalUploadedArticles: 0,
    errors: [],
    startTime: Date.now(),
  };

  console.log('🚀 Starte Ingestion-Workflow\n');
  console.log('=' .repeat(60) + '\n');

  try {
    // 1. Init Services
    const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
    if (!PINECONE_API_KEY) {
      throw new Error('❌ PINECONE_API_KEY nicht in .env gefunden!');
    }

    const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
    const index = pinecone.Index(INDEX_NAME);
    const embeddingService = await getEmbeddingService();

    console.log('✅ Services initialisiert\n');

    // 2. Lade JSONL
    const articles = await loadJSONL<ArticleJSONL>(ARTICLES_PATH);

    // 3. Ingest Articles
    await ingestArticles(articles, embeddingService, index, stats);

    stats.endTime = Date.now();

    // 5. Final Stats
    console.log('=' .repeat(60));
    console.log('\n📊 INGESTION ABGESCHLOSSEN\n');
    console.log(`✅ Artikel verarbeitet: ${stats.articlesProcessed}/${articles.length}`);
    console.log(`✅ Embeddings generiert: ${stats.totalEmbeddings}`);
    console.log(`✅ Artikel hochgeladen: ${stats.totalUploadedArticles}`);
    console.log(
      `⏱️  Dauer: ${((stats.endTime - stats.startTime) / 1000).toFixed(2)}s`
    );

    if (stats.errors.length > 0) {
      console.log(`\n⚠️  Fehler: ${stats.errors.length}`);
      stats.errors.slice(0, 5).forEach(err => console.log(`   - ${err}`));
      if (stats.errors.length > 5) {
        console.log(`   ... und ${stats.errors.length - 5} weitere`);
      }
    }

    console.log('\n' + '=' .repeat(60) + '\n');
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

export { main as ingestToPinecone };

