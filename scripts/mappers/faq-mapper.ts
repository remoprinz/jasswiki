/**
 * FAQ-Mapper: JSONL → Pinecone Document
 * 
 * Transformation:
 * - Question + Answer → ein zusammenhängender Text-Chunk
 * - Tags → keywords + category mapping
 * - article_id → Cross-Reference
 * - Question zusätzlich in Metadata (für besseres Matching)
 */

import type {
  FAQJSONL,
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

export class FAQMapper {
  private baseURL: string;

  constructor(baseURL = 'https://jasswiki.ch') {
    this.baseURL = baseURL;
  }

  /**
   * Haupt-Mapping-Funktion
   */
  public mapFAQ(faq: FAQJSONL): {
    id: string;
    text: string;
    embeddingText: string;
    metadata: PineconeMetadata;
  } {
    // 1. Kombiniere Question + Answer zu einem Text-Chunk
    const text = `${faq.question}\n\n${faq.answer}`;

    // 2. Category-Hierarchie ableiten
    const { categoryMain, categorySub } = this.extractCategories(faq.tags);

    // 3. Keywords extrahieren
    const keywords = this.extractKeywords(faq.tags, faq.synonyms);

    // 4. Situations ableiten
    const situations = this.extractSituations(faq.tags);

    // 5. Importance & Difficulty (FAQs sind meist niedrig-mittel)
    const importance = 0.6; // FAQs sind "nice-to-have", aber nützlich
    const difficulty = 1;   // FAQs sind meist einfach formuliert

    // 6. Canonical URL basierend auf article_id
    // WICHTIG: FAQs haben keine eigene URL, verweisen auf Artikel
    const canonical_url = buildCanonicalURL(
      categoryMain,
      categorySub,
      faq.article_id,  // Artikel-ID, nicht FAQ-ID
      this.baseURL
    );

    // 7. Metadata zusammenstellen
    const metadata: PineconeMetadata = {
      text,
      category_main: categoryMain,
      category_sub: categorySub,
      keywords,
      situations,
      importance,
      difficulty,
      source: faq.article_title,
      canonical_url,
      see_also: [],  // FAQs haben keine eigenen see_also
      article_id: faq.article_id,  // Referenz zum Haupt-Artikel
      variant: faq.variant || undefined,
      language: faq.language || 'de-CH',
      content_type: 'faq',
      question: faq.question,  // Original-Frage für besseres Matching
    };

    // 8. Embedding-Text mit Keywords anreichern
    const embeddingText = buildEmbeddingText(text, keywords, faq.article_title);

    return {
      id: `faq_${faq.id}`,
      text,
      embeddingText,
      metadata,
    };
  }

  /**
   * Category-Hierarchie aus Tags ableiten
   */
  private extractCategories(tags: string[]): {
    categoryMain: JassCategory;
    categorySub: string;
  } {
    let categoryMain: JassCategory = 'Grundlagen & Kultur';
    for (const tag of tags) {
      if (tag in CATEGORY_MAPPING) {
        categoryMain = CATEGORY_MAPPING[tag];
        break;
      }
    }

    let categorySub = 'allgemeines';
    for (const tag of tags) {
      if (tag in SUBCATEGORY_MAPPING) {
        categorySub = SUBCATEGORY_MAPPING[tag];
        break;
      }
      if (!(tag in CATEGORY_MAPPING) && tag !== tags[0]) {
        categorySub = slugify(tag);
        break;
      }
    }

    return { categoryMain, categorySub };
  }

  /**
   * Keywords extrahieren
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

    if (situations.length === 0) {
      situations.push('LEARNING');
    }

    return [...new Set(situations)];
  }
}

// Export Singleton
export const faqMapper = new FAQMapper();

