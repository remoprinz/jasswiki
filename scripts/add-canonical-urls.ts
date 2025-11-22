#!/usr/bin/env tsx
/**
 * Ergänzt alle Artikel in jasswiki-articles.jsonl um das Feld `canonical_url`.
 * Die URL wird aus `lib/url-mapping.json` entnommen. Falls für eine ID
 * keine URL gefunden wird, bricht das Skript mit einem Fehler ab.
 */

import { readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const articlesPath = join(__dirname, '../chatgpt-gpt/jasswiki-articles.jsonl');
const urlMappingPath = join(__dirname, '../lib/url-mapping.json');

const rawLines = readFileSync(articlesPath, 'utf-8')
  .split('\n')
  .filter(Boolean);

const urlMapping = JSON.parse(readFileSync(urlMappingPath, 'utf-8')) as Record<string, string>;

const updatedLines: string[] = [];
const missingIds: string[] = [];

for (const line of rawLines) {
  const article = JSON.parse(line) as Record<string, unknown>;
  const articleId = article.id as string | undefined;

  if (!articleId) {
    throw new Error('Artikel ohne `id` gefunden.');
  }

  let canonicalUrl = article.canonical_url as string | undefined;

  if (!canonicalUrl) {
    canonicalUrl = urlMapping[articleId];
  }

  if (!canonicalUrl) {
    missingIds.push(articleId);
    continue;
  }

  article.canonical_url = canonicalUrl;
  updatedLines.push(JSON.stringify(article));
}

if (missingIds.length > 0) {
  throw new Error(
    `Für folgende IDs konnte keine canonical_url bestimmt werden:\n${missingIds.join('\n')}`
  );
}

writeFileSync(articlesPath, updatedLines.join('\n') + '\n', 'utf-8');

console.log(`✅ canonical_url für ${updatedLines.length} Artikel gesetzt.`);
