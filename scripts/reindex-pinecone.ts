#!/usr/bin/env tsx
/**
 * Reindex: jasswiki-articles.jsonl → Pinecone (Namespace 'articles')
 *
 * WARUM ES DIESES SKRIPT GIBT
 * ---------------------------
 * `ingest-to-pinecone.ts` bettet mit `embedding-001` über `@google/generative-ai` ein.
 * Google hat dieses Modell abgekündigt (404 auf /v1/…:embedContent), und die LAUFENDE
 * Cloud-Funktion (`functions/src/mcp.ts`) benutzt längst `gemini-embedding-001` mit
 * 768 Dimensionen. Index und Abfrage müssen aus DEMSELBEN Modell stammen, sonst zeigen
 * die Vektoren in verschiedene Richtungen und die Suche liefert Unsinn.
 *
 * Dieses Skript spricht die Gemini-REST-Schnittstelle direkt an (global `fetch`, Node 18+)
 * und braucht deshalb `@google/genai` NICHT — das Paket fehlt im Baum, und ein
 * `npm install` würde den iCloud-Symlink von node_modules überschreiben (dokumentierte
 * Falle in CLAUDE.md).
 *
 * ABLAUF
 *   1. jasswiki-articles.jsonl lesen (vorher `node scripts/sync-json-to-jsonl.mjs` laufen
 *      lassen — sonst indexiert man einen alten Stand)
 *   2. je Artikel einbetten (gemini-embedding-001, outputDimensionality 768)
 *   3. in Stapeln zu Pinecone hochladen
 *   4. verwaiste Vektoren löschen: was im Index liegt und in der JSONL fehlt
 *
 * AUFRUF   npx tsx scripts/reindex-pinecone.ts
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { Pinecone } from '@pinecone-database/pinecone';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const JSONL_PATH = join(__dirname, '../chatgpt-gpt/jasswiki-articles.jsonl');

// Muss Zeichen für Zeichen zu functions/src/mcp.ts passen:
const PINECONE_INDEX = 'jasswiki';
const PINECONE_NAMESPACE = 'articles';
const EMBEDDING_MODEL = 'gemini-embedding-001';
const EMBEDDING_DIMENSIONS = 768;

const UPSERT_BATCH = 50;
const EMBED_PARALLEL = 5;

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const PINECONE_API_KEY = process.env.PINECONE_API_KEY;

interface Artikel {
  id: string;
  title?: string;
  body?: string;
  text?: string;
  canonical_url?: string;
  variant?: string;
  language?: string;
  tags?: string[];
}

async function einbetten(text: string): Promise<number[]> {
  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/${EMBEDDING_MODEL}:embedContent` +
    `?key=${GEMINI_API_KEY}`;
  const antwort = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: `models/${EMBEDDING_MODEL}`,
      content: { parts: [{ text }] },
      outputDimensionality: EMBEDDING_DIMENSIONS,
    }),
  });
  if (!antwort.ok) {
    throw new Error(`Gemini ${antwort.status}: ${(await antwort.text()).slice(0, 200)}`);
  }
  const daten = (await antwort.json()) as { embedding?: { values?: number[] } };
  const vektor = daten.embedding?.values;
  if (!vektor?.length) throw new Error('leere Einbettung');
  if (vektor.length !== EMBEDDING_DIMENSIONS) {
    throw new Error(`${vektor.length} Dimensionen statt ${EMBEDDING_DIMENSIONS}`);
  }
  return vektor;
}

async function main() {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY fehlt in .env');
  if (!PINECONE_API_KEY) throw new Error('PINECONE_API_KEY fehlt in .env');

  const zeilen = readFileSync(JSONL_PATH, 'utf-8').split('\n').filter((z) => z.trim());
  const artikel: Artikel[] = zeilen.map((z) => JSON.parse(z));
  console.log(`Gelesen: ${artikel.length} Artikel aus ${JSONL_PATH}`);

  const pc = new Pinecone({ apiKey: PINECONE_API_KEY });
  const index = pc.Index(PINECONE_INDEX).namespace(PINECONE_NAMESPACE);

  const datensaetze: {
    id: string;
    values: number[];
    metadata: Record<string, string | number | boolean | string[]>;
  }[] = [];
  const fehler: string[] = [];

  for (let i = 0; i < artikel.length; i += EMBED_PARALLEL) {
    const teil = artikel.slice(i, i + EMBED_PARALLEL);
    const ergebnisse = await Promise.allSettled(
      teil.map(async (a) => {
        const inhalt = a.body || a.text || '';
        const volltext = `${a.title || a.id}\n\n${inhalt}`.trim();
        const values = await einbetten(volltext);
        // Die Feldnamen sind VORGEGEBEN von functions/src/mcp.ts (Zeilen 249–251):
        // dort wird `source` als Titel, `canonical_url` als Adresse und `text` als
        // Inhalt gelesen. Andere Namen kommen beim Leser als leere Felder an.
        const metadata: Record<string, string | number | boolean | string[]> = {
          source: a.title || a.id,
          text: inhalt.slice(0, 20000),
        };
        if (a.canonical_url) metadata.canonical_url = a.canonical_url;
        if (a.variant) metadata.variant = a.variant;
        if (a.language) metadata.language = a.language;
        if (a.tags?.length) metadata.tags = a.tags.slice(0, 30);
        return { id: a.id, values, metadata };
      })
    );
    ergebnisse.forEach((e, k) => {
      if (e.status === 'fulfilled') datensaetze.push(e.value);
      else fehler.push(`${teil[k].id}: ${e.reason}`);
    });
    process.stdout.write(`\rEingebettet: ${datensaetze.length}/${artikel.length}`);
  }
  console.log('');

  if (fehler.length) {
    console.log(`\nFEHLER bei ${fehler.length} Artikeln:`);
    fehler.slice(0, 5).forEach((f) => console.log(`  - ${f}`));
    if (datensaetze.length === 0) throw new Error('Nichts eingebettet — Abbruch vor dem Upload');
  }

  for (let i = 0; i < datensaetze.length; i += UPSERT_BATCH) {
    await index.upsert(datensaetze.slice(i, i + UPSERT_BATCH));
    process.stdout.write(`\rHochgeladen: ${Math.min(i + UPSERT_BATCH, datensaetze.length)}/${datensaetze.length}`);
  }
  console.log('');

  // Verwaiste Vektoren entfernen: im Index vorhanden, im Bestand verschwunden.
  const gueltig = new Set(artikel.map((a) => a.id));
  const verwaist: string[] = [];
  let seite = await index.listPaginated({ limit: 100 });
  while (true) {
    (seite.vectors || []).forEach((v) => {
      if (v.id && !gueltig.has(v.id)) verwaist.push(v.id);
    });
    if (!seite.pagination?.next) break;
    seite = await index.listPaginated({ limit: 100, paginationToken: seite.pagination.next });
  }
  if (verwaist.length) {
    await index.deleteMany(verwaist);
    console.log(`Verwaiste Vektoren entfernt: ${verwaist.length}`);
    verwaist.slice(0, 10).forEach((v) => console.log(`  - ${v}`));
  } else {
    console.log('Verwaiste Vektoren: keine');
  }

  const stand = await pc.Index(PINECONE_INDEX).describeIndexStats();
  console.log(`\nFERTIG. Index '${PINECONE_INDEX}', Namespace '${PINECONE_NAMESPACE}': ` +
    `${stand.namespaces?.[PINECONE_NAMESPACE]?.recordCount ?? '?'} Datensätze`);
}

main().catch((e) => {
  console.error('ABBRUCH:', e.message);
  process.exit(1);
});
