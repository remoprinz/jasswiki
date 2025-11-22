/**
 * Artikel-Mapper: JSONL → Pinecone Document
 * 
 * Transformation:
 * - Tags → keywords + category mapping
 * - Body → text (normalisiert: Header-Präfixe entfernt)
 * - ID + Category → canonical_url
 * - see_also → Cross-References
 */

import type {
  ArticleJSONL,
  PineconeMetadata,
  JassCategory,
  JassSituation,
} from '../../lib/rag-types';
import {
  CATEGORY_MAPPING,
  SUBCATEGORY_MAPPING,
  SITUATION_MAPPING,
  buildCanonicalURL,
  slugify,
} from '../../lib/rag-types';
import { buildEmbeddingText, expandKeywords } from '../utils/keyword-variants';

export class ArticleMapper {
  private baseURL: string;

  constructor(baseURL = 'https://jasswiki.ch') {
    this.baseURL = baseURL;
  }

  /**
   * Haupt-Mapping-Funktion
   */
  public mapArticle(article: ArticleJSONL): {
    id: string;
    embeddingText: string;
    metadata: PineconeMetadata;
  } {
    // 1. Text normalisieren
    const normalizedText = this.normalizeBody(article.body);

    // 2. Category-Hierarchie ableiten
    const { categoryMain, categorySub } = this.extractCategories(article.tags);

    // 3. Keywords extrahieren (ohne Category-Tags)
    const keywords = this.extractKeywords(article.tags, article.synonyms);

    // 4. Situations ableiten
    const situations = this.extractSituations(article.tags);

    // 5. Importance & Difficulty heuristisch bestimmen
    const importance = this.calculateImportance(article);
    const difficulty = this.calculateDifficulty(article);

    // 6. Canonical URL bestimmen (Direktwert bevorzugen, sonst Fallback)
    const canonical_url = article.canonical_url
      ? article.canonical_url
      : buildCanonicalURL(
          categoryMain,
          categorySub,
          article.id,
          this.baseURL
        );

    // 7. Metadata zusammenstellen
    const metadata: PineconeMetadata = {
      text: normalizedText,
      category_main: categoryMain,
      category_sub: categorySub,
      keywords,
      situations,
      importance,
      difficulty,
      source: article.title,
      canonical_url,
      see_also: article.see_also || [],
      variant: article.variant || undefined,
      language: article.language || 'de-CH',
      content_type: 'article',
    };

    const embeddingText = buildEmbeddingText(normalizedText, keywords);

    return {
      id: `article_${article.id}`,
      embeddingText,
      metadata,
    };
  }

  /**
   * Body-Normalisierung: Entferne Header-Präfixe
   */
  private normalizeBody(body: string): string {
    // Entferne "Titel:", "Kurzdefinition:", "Definition:", etc.
    const prefixes = [
      /^Titel:\s*/gm,
      /^Kurzdefinition:\s*/gm,
      /^Definition:\s*/gm,
      /^Regeln?:\s*/gm,
      /^Grundregel:\s*/gm,
      /^Hinweis:\s*/gm,
      /^Übersicht:\s*/gm,
      /^Siehe auch:\s*/gm,
    ];

    let normalized = body;
    for (const prefix of prefixes) {
      normalized = normalized.replace(prefix, '');
    }

    // Entferne doppelte Leerzeilen
    normalized = normalized.replace(/\n{3,}/g, '\n\n');

    // Trim
    return normalized.trim();
  }

  /**
   * Category-Hierarchie aus Tags ableiten
   */
  private extractCategories(tags: string[]): {
    categoryMain: JassCategory;
    categorySub: string;
  } {
    // Finde Hauptkategorie
    let categoryMain: JassCategory = 'Grundlagen & Kultur'; // Default
    for (const tag of tags) {
      if (tag in CATEGORY_MAPPING) {
        categoryMain = CATEGORY_MAPPING[tag];
        break;
      }
    }

    // Finde Subkategorie (zweiter relevanter Tag)
    let categorySub = 'allgemeines'; // Default
    for (const tag of tags) {
      if (tag in SUBCATEGORY_MAPPING) {
        categorySub = SUBCATEGORY_MAPPING[tag];
        break;
      }
      // Falls nicht in Mapping: direkt slugifyen
      if (!(tag in CATEGORY_MAPPING) && tag !== tags[0]) {
        categorySub = slugify(tag);
        break;
      }
    }

    return { categoryMain, categorySub };
  }

  /**
   * Keywords extrahieren (ohne Category/Sub-Tags)
   */
  private extractKeywords(tags: string[], synonyms: string[]): string[] {
    const categoryKeys = new Set(Object.keys(CATEGORY_MAPPING));
    const subcategoryKeys = new Set(Object.keys(SUBCATEGORY_MAPPING));
    const situationKeys = new Set(Object.keys(SITUATION_MAPPING));

    const keywords = [
      ...tags.filter(
        tag =>
          !categoryKeys.has(tag) &&
          !subcategoryKeys.has(tag) &&
          !situationKeys.has(tag)
      ),
      ...synonyms,
    ];

    const normalized = keywords
      .map(tag => tag?.toLowerCase().trim())
      .filter((tag): tag is string => Boolean(tag && tag.length));

    return expandKeywords(normalized);
  }

  /**
   * Situations extrahieren
   */
  private extractSituations(tags: string[]): JassSituation[] {
    const situations: JassSituation[] = [];

    for (const tag of tags) {
      if (tag in SITUATION_MAPPING) {
        situations.push(SITUATION_MAPPING[tag]);
      }
    }

    // Default: LEARNING
    if (situations.length === 0) {
      situations.push('LEARNING');
    }

    return [...new Set(situations)]; // Dedupliziere
  }

  /**
   * Importance heuristisch berechnen
   */
  private calculateImportance(article: ArticleJSONL): number {
    let score = 0.5; // Base

    // Boost für "Regeln"
    if (article.tags.includes('Regeln')) score += 0.2;

    // Boost für häufige Cross-References
    if (article.see_also && article.see_also.length > 3) score += 0.1;

    // Boost für längere Artikel (mehr Content)
    if (article.body.length > 1000) score += 0.1;

    // Cap at 1.0
    return Math.min(1.0, score);
  }

  /**
   * Difficulty heuristisch berechnen
   */
  private calculateDifficulty(article: ArticleJSONL): number {
    // Einfach (1): Grundbegriffe, kurze Artikel
    if (article.tags.includes('Grundbegriffe') || article.body.length < 300) {
      return 1;
    }

    // Schwer (3): Taktiken, Strategien, lange Artikel
    if (
      article.tags.includes('Taktiken') ||
      article.tags.includes('Strategien') ||
      article.body.length > 1500
    ) {
      return 3;
    }

    // Mittel (2): Rest
    return 2;
  }
}

// Export Singleton
export const articleMapper = new ArticleMapper();

