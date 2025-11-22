/**
 * Script zum Löschen des Pinecone Index
 */

import { Pinecone } from '@pinecone-database/pinecone';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '../.env') });

const INDEX_NAME = 'jasswiki';

async function deleteIndex() {
  const apiKey = process.env.PINECONE_API_KEY;
  
  if (!apiKey) {
    throw new Error('PINECONE_API_KEY nicht in .env gefunden!');
  }

  console.log('🚀 Starte Löschung des Pinecone Index...\n');
  console.log(`📊 Index-Name: ${INDEX_NAME}\n`);

  const pinecone = new Pinecone({ apiKey });

  try {
    // Prüfe ob Index existiert
    const indexes = await pinecone.listIndexes();
    const indexExists = indexes.indexes?.some(idx => idx.name === INDEX_NAME);
    
    if (!indexExists) {
      console.log(`⚠️  Index '${INDEX_NAME}' existiert nicht.`);
      return;
    }

    console.log(`🗑️  Lösche Index '${INDEX_NAME}'...`);
    await pinecone.deleteIndex(INDEX_NAME);
    
    console.log(`\n✅ Index '${INDEX_NAME}' erfolgreich gelöscht!`);
    console.log(`\n⏱️  Warte 10 Sekunden, bevor wir den Index neu erstellen können...`);
    
  } catch (error: any) {
    console.error(`❌ Fehler beim Löschen: ${error.message}`);
    throw error;
  }
}

deleteIndex().catch(console.error);







