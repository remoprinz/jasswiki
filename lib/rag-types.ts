/**
 * Shared Types für JassWiki RAG System
 * 
 * Genutzt von:
 * - Ingestion-Skripten (JSONL → Pinecone)
 * - Firebase Functions (RAG Query Endpoint)
 * - OpenAPI Schema
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// ============================================================================
// JASS DOMAIN TYPES
// ============================================================================

export type JassCategory = 
  | 'Regeln'
  | 'Weis-Regeln'
  | 'Varianten'
  | 'Taktiken und Strategien'
  | 'Grundlagen & Kultur'
  | 'Geschichte'
  | 'Begriffe'
  | 'Jassapps'
  | 'Referenzen';

export type JassSituation =
  | 'LEARNING'
  | 'EXPLAINING'
  | 'SETUP'
  | 'PLAYING'
  | 'SCORING'
  | 'ERROR'
  | 'RESEARCH';

// ============================================================================
// PINECONE DOCUMENT TYPES
// ============================================================================

export interface PineconeMetadata {
  // Core Content
  text: string;
  
  // Category (hierarchisch wie in sitemap.xml)
  category_main: JassCategory;
  category_sub: string;  // z.B. "kartenverteilung", "punktezaehlung"
  
  // Semantic Tags
  keywords: string[];
  situations: JassSituation[];
  
  // Quality Scores
  importance: number;  // 0.0 - 1.0
  difficulty: number;  // 1 (einfach) - 3 (schwer)
  
  // Source & Links
  source: string;
  canonical_url: string;  // z.B. https://jasswiki.ch/regeln/kartenverteilung/abheben/
  
  // Cross-References
  see_also: string[];  // IDs anderer Artikel
  article_id?: string; // Für FAQs: Referenz auf Haupt-Artikel
  
  // Optional
  variant?: string;  // z.B. "Schieber", "Differenzler"
  language: string;  // "de-CH"
  
  // Content Type
  content_type: 'article' | 'faq';
  
  // FAQ-spezifisch
  question?: string;  // Original-Frage (für besseres Retrieval)
}

export interface PineconeDocument {
  id: string;
  values: number[];  // 768D Gemini Embedding
  metadata: PineconeMetadata;
}

// ============================================================================
// JSONL INPUT TYPES
// ============================================================================

export interface ArticleJSONL {
  id: string;
  title: string;
  variant: string | null;
  tags: string[];
  synonyms: string[];
  canonical_url?: string;
  see_also: string[];
  language: string;
  body: string;
}

export interface FAQJSONL {
  id: string;
  article_id: string;
  article_title: string;
  variant: string | null;
  tags: string[];
  synonyms: string[];
  language: string;
  question: string;
  answer: string;
}

// ============================================================================
// RAG QUERY TYPES (für Firebase Function)
// ============================================================================

export interface RAGQueryRequest {
  query: string;
  topK?: number;  // Default: 5
  filters?: {
    category?: JassCategory;
    variant?: string;
    minScore?: number;  // Default: 0.85
  };
}

export interface RAGQueryResult {
  id: string;
  text: string;
  score: number;
  title?: string;
  canonical_url: string;
  category: {
    main: JassCategory;
    sub: string;
  };
  see_also: string[];
  variant?: string;
}

export interface RAGQueryResponse {
  results: RAGQueryResult[];
  metadata: {
    query: string;
    topK: number;
    threshold: number;
    margin: number;
    total_matches: number;
    filtered_count: number;
    rejected_reason?: string;  // Falls alle Treffer unter Threshold
  };
}

// ============================================================================
// CATEGORY MAPPING (Tags → Category Hierarchy)
// ============================================================================

export const CATEGORY_MAPPING: Record<string, JassCategory> = {
  'Regeln': 'Regeln',
  'Weis-Regeln': 'Weis-Regeln',
  'Varianten': 'Varianten',
  'Taktiken und Strategien': 'Taktiken und Strategien',
  'Taktiken': 'Taktiken und Strategien',
  'Strategien': 'Taktiken und Strategien',
  'Grundlagen & Kultur': 'Grundlagen & Kultur',
  'Geschichte': 'Geschichte',
  'Begriffe': 'Begriffe',
  'Jassapps': 'Jassapps',
  'Referenzen': 'Referenzen',
};

export const SUBCATEGORY_MAPPING: Record<string, string> = {
  'Kartenverteilung': 'kartenverteilung',
  'Punktezählung': 'punktezaehlung',
  'Spielablauf': 'spielablauf',
  'Kartenwerte': 'kartenwerte',
  'Fehler & Verstösse': 'fehler-verstoesse',
  'Sonderregeln': 'sonderregeln',
  'Spielende': 'spielende',
  'Spielziele': 'spielziele',
  'Ausmachen': 'ausmachen',
  'Schreiben': 'schreiben',
  'Offizielles Regelwerk': 'offizielles-regelwerk',
  'Tischregel': 'tischregel',
  'Weis-Arten': 'weis-arten',
  'Allgemeines': 'allgemeines',
  'Stöcke': 'stoecke',
  'Grundbegriffe': 'grundbegriffe',
  'Spielaktionen': 'spielaktionen',
  'Kartenbezeichnungen': 'kartenbezeichnungen',
  'Spezialvarianten': 'spezialvarianten',
  'Punktebegriffe': 'punktebegriffe',
  // Varianten-Subkategorien
  'Teamspiel': 'teamspiel',
  'Einzelspiel': 'einzelspiel',
  'Zweiersspiel': 'zweiersspiel',
  'Schreibspiel': 'schreibspiel',
  'Bietspiel': 'bietspiel',
  'Schaetzspiel': 'schaetzspiel',
  // ... weitere nach Bedarf
};

export const SITUATION_MAPPING: Record<string, JassSituation> = {
  'LEARNING': 'LEARNING',
  'EXPLAINING': 'EXPLAINING',
  'SETUP': 'SETUP',
  'PLAYING': 'PLAYING',
  'SCORING': 'SCORING',
  'ERROR': 'ERROR',
  'RESEARCH': 'RESEARCH',
};

// ============================================================================
// PINECONE LIMITS (aus jassguruchat übernommen)
// ============================================================================

export const PINECONE_LIMITS = {
  maxBatchSize: 1000,
  maxRequestSize: 2 * 1024 * 1024,  // 2 MB
  maxMetadataSize: 40 * 1024,       // 40 KB
  maxIdLength: 512,
  dimensions: 768,
} as const;

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export function validatePineconeDocument(doc: PineconeDocument): void {
  if (!doc.id || doc.id.length > PINECONE_LIMITS.maxIdLength) {
    throw new Error(`Invalid ID: ${doc.id}`);
  }
  
  if (doc.values.length !== PINECONE_LIMITS.dimensions) {
    throw new Error(`Invalid embedding dimension: ${doc.values.length}`);
  }
  
  const metadataSize = new TextEncoder().encode(JSON.stringify(doc.metadata)).length;
  if (metadataSize > PINECONE_LIMITS.maxMetadataSize) {
    throw new Error(`Metadata too large: ${metadataSize} bytes`);
  }
  
  const docSize = new TextEncoder().encode(JSON.stringify(doc)).length;
  if (docSize > PINECONE_LIMITS.maxRequestSize) {
    throw new Error(`Document too large: ${docSize} bytes`);
  }
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Entfernt bekannte Präfixe aus article_id für URL-Generierung
 * z.B. "expressions_rose" → "rose", "faq_xyz" → "xyz"
 */
function cleanArticleIdForURL(id: string): string {
  // Bekannte Präfixe die entfernt werden sollen
  const prefixes = [
    /^expressions_/i,
    /^faq_/i,
    /^general_/i,
  ];
  
  let cleaned = id;
  for (const prefix of prefixes) {
    cleaned = cleaned.replace(prefix, '');
  }
  
  return cleaned;
}

// URL-Mapping aus Sitemap (wird zur Build-Zeit generiert)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let urlMapping: Record<string, string> | null = null;

function loadUrlMapping(): Record<string, string> {
  if (urlMapping === null) {
    try {
      const mappingPath = join(__dirname, 'url-mapping.json');
      const mappingContent = readFileSync(mappingPath, 'utf-8');
      urlMapping = JSON.parse(mappingContent) as Record<string, string>;
    } catch (e) {
      // Fallback: Leeres Mapping
      console.warn('⚠️  URL mapping nicht gefunden, verwende Fallback');
      urlMapping = {};
    }
  }
  return urlMapping;
}

export function buildCanonicalURL(
  categoryMain: JassCategory,
  categorySub: string,
  id: string,
  baseURL = 'https://jasswiki.ch'
): string {
  // WICHTIG: Nur URLs aus der Sitemap verwenden! Keine automatische Generierung!
  const mapping = loadUrlMapping();
  
  // 1. Direktes Mapping
  if (mapping[id]) {
    return mapping[id];
  }
  
  // 2. Clean ID und nochmal versuchen
  const cleanedId = cleanArticleIdForURL(id);
  if (mapping[cleanedId]) {
    return mapping[cleanedId];
  }
  
  // 3. Versuche Präfix-Entfernung (general_, expressions_, etc.)
  const withoutPrefix = id
    .replace(/^general_/, '')
    .replace(/^expressions_/, '')
    .replace(/^faq_/, '')
    .replace(/_/g, '-');
  
  if (mapping[withoutPrefix]) {
    return mapping[withoutPrefix];
  }
  
  // 4. KEIN FALLBACK auf Unterkategorien! Nur Top-Level Kategorien erlaubt
  // Verhindert "leere" Links wie /begriffe/spielaktionen/ die nicht hilfreich sind
  const mainSlug = slugify(categoryMain);
  
  // Liste der erlaubten Top-Level Kategorien (existieren garantiert)
  const topLevelCategories = [
    'begriffe',
    'regeln',
    'weis-regeln',
    'varianten',
    'taktiken-und-strategien',
    'grundlagen-kultur',
    'geschichte',
  ];
  
  // Nur Top-Level Kategorie als Fallback (keine Unterkategorien!)
  const mainCategoryUrl = `${baseURL}/${mainSlug}/`;
  if (topLevelCategories.includes(mainSlug)) {
    console.warn(`⚠️  URL für ID "${id}" nicht gefunden, verwende Top-Level Kategorie: ${mainCategoryUrl}`);
    return mainCategoryUrl;
  }
  
  // KRITISCH: Kein Match gefunden und keine passende Top-Level Kategorie
  console.error(`❌ KRITISCH: URL für ID "${id}" nicht in Sitemap gefunden!`);
  console.error(`   Kategorie: ${categoryMain}`);
  console.error(`   → Bitte Mapping in build-url-mapping.ts hinzufügen!`);
  
  // Fallback: Hauptseite (immer vorhanden)
  return `${baseURL}/`;
}

