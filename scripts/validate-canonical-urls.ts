#!/usr/bin/env tsx
/**
 * Validierungsskript: Prüft, ob alle Artikel korrekte canonical URLs haben
 * - In jasswiki-articles.jsonl
 * - In Pinecone
 * - Vergleich zwischen beiden
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { Pinecone } from '@pinecone-database/pinecone';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const INDEX_NAME = 'jasswiki';

interface Article {
  id: string;
  title: string;
  canonical_url?: string;
}

async function main() {
  console.log('🔍 Validiere canonical URLs...\n');

  // 1. Lade alle Artikel aus JSONL
  const articlesPath = join(__dirname, '../chatgpt-gpt/jasswiki-articles.jsonl');
  const lines = readFileSync(articlesPath, 'utf-8')
    .split('\n')
    .filter(Boolean);
  
  const articles: Article[] = lines.map(l => JSON.parse(l));
  console.log(`📄 Artikel in JSONL: ${articles.length}`);

  // 2. Prüfe JSONL
  const withoutUrl = articles.filter(a => !a.canonical_url);
  const invalidUrls = articles.filter(a => 
    a.canonical_url && !a.canonical_url.startsWith('https://jasswiki.ch/')
  );
  const suspiciousUrls = articles.filter(a => 
    a.canonical_url && (
      a.canonical_url.includes('expressions_') ||
      a.canonical_url.includes('_') && !a.canonical_url.match(/\/[a-z-]+\/$/)
    )
  );

  console.log(`\n✅ JSONL Validierung:`);
  console.log(`   Mit URL: ${articles.length - withoutUrl.length}`);
  console.log(`   Ohne URL: ${withoutUrl.length}`);
  console.log(`   Ungültige URLs: ${invalidUrls.length}`);
  console.log(`   Verdächtige URLs: ${suspiciousUrls.length}`);

  if (withoutUrl.length > 0) {
    console.log(`\n❌ Artikel OHNE URL:`);
    withoutUrl.forEach(a => console.log(`   - ${a.id}: ${a.title}`));
  }

  if (invalidUrls.length > 0) {
    console.log(`\n❌ Artikel mit UNGÜLTIGER URL:`);
    invalidUrls.forEach(a => console.log(`   - ${a.id}: ${a.canonical_url}`));
  }

  if (suspiciousUrls.length > 0 && suspiciousUrls.length <= 20) {
    console.log(`\n⚠️  Verdächtige URLs (erste 20):`);
    suspiciousUrls.slice(0, 20).forEach(a => 
      console.log(`   - ${a.id}: ${a.canonical_url}`)
    );
  }

  // 3. Prüfe Pinecone (ALLE Artikel)
  const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
  if (!PINECONE_API_KEY) {
    console.log('\n⚠️  PINECONE_API_KEY nicht gefunden → überspringe Pinecone-Validierung');
    return;
  }

  console.log(`\n🔍 Pinecone Validierung (ALLE Artikel)...`);

  const pinecone = new Pinecone({ apiKey: PINECONE_API_KEY });
  const index = pinecone.Index(INDEX_NAME);

  const allPineconeIds = articles.map(a => `article_${a.id}`);
  const batchSize = 100;
  
  let totalChecked = 0;
  let totalMatches = 0;
  let totalMismatches = 0;
  let totalMissing = 0;
  const mismatchDetails: Array<{id: string, jsonl: string, pinecone: string}> = [];
  const missingDetails: string[] = [];

  try {
    // Prüfe in Batches (Pinecone hat Limits)
    for (let i = 0; i < allPineconeIds.length; i += batchSize) {
      const batch = allPineconeIds.slice(i, i + batchSize);
      const fetchResult = await index.namespace('articles').fetch(batch);
      
      for (const id of batch) {
        const articleId = id.replace('article_', '');
        const article = articles.find(a => a.id === articleId);
        
        if (!article) continue;
        
        const record = fetchResult.records?.[id];
        
        if (!record) {
          totalMissing++;
          if (totalMissing <= 10) {
            missingDetails.push(articleId);
          }
          continue;
        }

        const jsonlUrl = article.canonical_url || '';
        const pineconeUrl = record.metadata?.canonical_url || '';

        totalChecked++;

        if (jsonlUrl === pineconeUrl) {
          totalMatches++;
        } else {
          totalMismatches++;
          if (totalMismatches <= 20) {
            mismatchDetails.push({
              id: articleId,
              jsonl: jsonlUrl,
              pinecone: pineconeUrl,
            });
          }
        }
      }
      
      // Progress indicator
      if ((i + batchSize) % 100 === 0 || i + batchSize >= allPineconeIds.length) {
        process.stdout.write(`\r   Fortschritt: ${Math.min(i + batchSize, allPineconeIds.length)}/${allPineconeIds.length}`);
      }
    }
    
    console.log(`\n\n✅ Pinecone Validierung (ALLE Artikel):`);
    console.log(`   Geprüft: ${totalChecked}`);
    console.log(`   Übereinstimmungen: ${totalMatches}`);
    console.log(`   Abweichungen: ${totalMismatches}`);
    console.log(`   Fehlend in Pinecone: ${totalMissing}`);

    if (totalMissing > 0 && totalMissing <= 20) {
      console.log(`\n⚠️  Artikel NICHT in Pinecone gefunden:`);
      missingDetails.forEach(id => console.log(`   - ${id}`));
    }

    if (totalMismatches > 0) {
      console.log(`\n❌ URL-Abweichungen zwischen JSONL und Pinecone (erste 20):`);
      mismatchDetails.forEach(d => {
        console.log(`   - ${d.id}:`);
        console.log(`     JSONL:     ${d.jsonl}`);
        console.log(`     Pinecone:  ${d.pinecone}`);
      });
      if (totalMismatches > 20) {
        console.log(`   ... und ${totalMismatches - 20} weitere`);
      }
    }

  } catch (error) {
    console.error(`\n❌ Fehler beim Abrufen aus Pinecone:`, error);
  }

  // 4. Zusammenfassung
  console.log(`\n${'='.repeat(60)}`);
  const allGood = 
    withoutUrl.length === 0 && 
    invalidUrls.length === 0 && 
    suspiciousUrls.length === 0 &&
    totalMismatches === 0 &&
    totalMissing === 0;
  
  if (allGood) {
    console.log('✅ ALLE Artikel haben korrekte canonical URLs!');
    console.log(`   ✅ JSONL: ${articles.length} Artikel mit korrekten URLs`);
    console.log(`   ✅ Pinecone: ${totalMatches} Artikel mit identischen URLs`);
  } else {
    console.log('⚠️  Es wurden Probleme gefunden (siehe oben)');
    if (totalMismatches > 0 || totalMissing > 0) {
      console.log(`\n💡 Lösung: Führe 'npm run rag:ingest' aus, um Pinecone zu aktualisieren`);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

