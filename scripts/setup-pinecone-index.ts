#!/usr/bin/env tsx
/**
 * Pinecone Index Setup für JassWiki
 * 
 * Erstellt den Index 'jasswiki' mit:
 * - Serverless (us-east-1)
 * - Cosine Similarity
 * - 768 Dimensionen (Gemini embedding-001)
 * - Namespaces: 'articles', 'faqs'
 */

import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const INDEX_NAME = 'jasswiki';
const DIMENSION = 768;
const METRIC = 'cosine';
const CLOUD = 'aws';
const REGION = 'us-east-1';

async function setupPineconeIndex() {
  if (!PINECONE_API_KEY) {
    throw new Error('❌ PINECONE_API_KEY nicht in .env gefunden!');
  }

  console.log('🚀 Starte Pinecone Index Setup...\n');

  const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });

  try {
    // Prüfe ob Index bereits existiert
    const existingIndexes = await pinecone.listIndexes();
    const indexExists = existingIndexes.indexes?.some(idx => idx.name === INDEX_NAME);

    if (indexExists) {
      console.log(`⚠️  Index '${INDEX_NAME}' existiert bereits.`);
      console.log('   Überspringe Erstellung.\n');
    } else {
      console.log(`📝 Erstelle Index '${INDEX_NAME}'...`);
      
      await pinecone.createIndex({
        name: INDEX_NAME,
        dimension: DIMENSION,
        metric: METRIC,
        spec: {
          serverless: {
            cloud: CLOUD,
            region: REGION
          }
        }
      });

      console.log('✅ Index erfolgreich erstellt!\n');
      
      // Warte auf Index-Initialisierung
      console.log('⏳ Warte auf Index-Initialisierung (kann 30-60s dauern)...');
      let ready = false;
      while (!ready) {
        const description = await pinecone.describeIndex(INDEX_NAME);
        ready = description.status?.ready ?? false;
        if (!ready) {
          await new Promise(resolve => setTimeout(resolve, 5000));
          process.stdout.write('.');
        }
      }
      console.log('\n✅ Index ist bereit!\n');
    }

    // Zeige Index-Details
    const indexDescription = await pinecone.describeIndex(INDEX_NAME);
    console.log('📊 Index-Konfiguration:');
    console.log(`   Name: ${indexDescription.name}`);
    console.log(`   Dimension: ${indexDescription.dimension}`);
    console.log(`   Metric: ${indexDescription.metric}`);
    console.log(`   Status: ${indexDescription.status?.ready ? 'Ready ✅' : 'Not Ready ⏳'}`);
    console.log(`   Host: ${indexDescription.host}\n`);

    // Namespaces Info
    console.log('📁 Geplante Namespaces:');
    console.log('   - articles (für Artikel aus jasswiki-articles.jsonl)');
    console.log('   - faqs (für FAQs aus jasswiki-faqs.jsonl)\n');

    console.log('🎉 Setup abgeschlossen!\n');
    console.log('Nächste Schritte:');
    console.log('  1. npm run convert:articles  # JSONL → Pinecone-Format');
    console.log('  2. npm run convert:faqs      # JSONL → Pinecone-Format');
    console.log('  3. npm run ingest           # Upload zu Pinecone\n');

  } catch (error) {
    console.error('❌ Fehler beim Setup:', error);
    throw error;
  }
}

// Run script
setupPineconeIndex()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

export { setupPineconeIndex };

