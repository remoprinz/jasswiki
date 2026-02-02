/**
 * Sync MCP Server Data
 * 
 * Kopiert jasswiki-corpus.jsonl nach functions/src/data/jasswiki-articles.ndjson
 * damit der öffentliche MCP-Server aktuelle Daten hat.
 * 
 * Aufruf: node sync-mcp-data.mjs
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SOURCE = path.resolve(__dirname, 'public/dataset/jasswiki-corpus.jsonl');
const TARGET = path.resolve(__dirname, 'functions/src/data/jasswiki-articles.ndjson');

async function syncData() {
  console.log('🔄 Synchronisiere MCP-Server Daten...');
  console.log('');

  try {
    // Prüfe ob Quelle existiert
    try {
      await fs.access(SOURCE);
    } catch {
      console.error(`❌ Quelldatei nicht gefunden: ${SOURCE}`);
      console.error('   Führe zuerst "npm run generate:corpus" aus!');
      process.exit(1);
    }

    // Lese Quelle
    const content = await fs.readFile(SOURCE, 'utf-8');
    const lineCount = content.split('\n').filter(l => l.trim()).length;

    // Stelle sicher, dass Zielverzeichnis existiert
    const targetDir = path.dirname(TARGET);
    await fs.mkdir(targetDir, { recursive: true });

    // Schreibe Ziel
    await fs.writeFile(TARGET, content, 'utf-8');

    console.log(`✅ Synchronisation erfolgreich!`);
    console.log(`   Quelle:  ${SOURCE}`);
    console.log(`   Ziel:    ${TARGET}`);
    console.log(`   Artikel: ${lineCount}`);
    console.log('');
    console.log('📝 Nächster Schritt: firebase deploy --only functions');

  } catch (error) {
    console.error('❌ Fehler bei Synchronisation:', error);
    process.exit(1);
  }
}

syncData();
