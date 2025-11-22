/**
 * Embedding Service für JassWiki
 * 
 * Nutzt Google Gemini embedding-001 (768 Dimensionen)
 * Portiert aus jassguruchat/src/services/embeddingService.ts
 */

import { GoogleGenerativeAI } from '@google/generative-ai';
import { PINECONE_LIMITS } from './rag-types';

export class EmbeddingService {
  private static instance: EmbeddingService | null = null;
  private genAI: GoogleGenerativeAI | null = null;
  private embeddingModel: any;
  private initialized = false;
  private readonly modelName = 'embedding-001';
  private readonly dimensions = PINECONE_LIMITS.dimensions;
  private embeddingCache: Map<string, number[]> = new Map();

  private constructor() {}

  public static async getInstance(): Promise<EmbeddingService> {
    if (!EmbeddingService.instance) {
      EmbeddingService.instance = new EmbeddingService();
      await EmbeddingService.instance.initializeInternal();
    }
    return EmbeddingService.instance;
  }

  private async initializeInternal(): Promise<void> {
    if (this.initialized) return;

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      throw new Error('❌ GEMINI_API_KEY nicht in .env gefunden!');
    }

    this.genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    this.embeddingModel = this.genAI.getGenerativeModel({ model: this.modelName });
    this.initialized = true;

    console.log('✅ Gemini Embedding Service initialisiert');
  }

  /**
   * Generiere Embedding für Text mit Retry-Logik für temporäre Fehler
   */
  public async generateEmbedding(text: string, retries = 3): Promise<number[]> {
    const normalizedText = text.trim().toLowerCase();

    // Cache-Lookup
    const cachedEmbedding = this.embeddingCache.get(normalizedText);
    if (cachedEmbedding) {
      return cachedEmbedding;
    }

    if (!this.embeddingModel) {
      await this.initializeInternal();
      if (!this.embeddingModel) {
        throw new Error('❌ Embedding Model konnte nicht initialisiert werden');
      }
    }

    let lastError: any;
    
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const result = await this.embeddingModel.embedContent(normalizedText);
        const embedding = result.embedding.values;

        this.validateEmbedding(embedding);
        this.embeddingCache.set(normalizedText, embedding);

        if (attempt > 1) {
          console.log(`✅ Embedding erfolgreich nach ${attempt}. Versuch`);
        }

        return embedding;
      } catch (error: any) {
        lastError = error;
        
        // Prüfe ob es ein temporärer Fehler ist (500, 503, 429)
        const isTemporaryError = 
          error?.message?.includes('500') ||
          error?.message?.includes('503') ||
          error?.message?.includes('429') ||
          error?.status === 500 ||
          error?.status === 503 ||
          error?.status === 429;

        if (isTemporaryError && attempt < retries) {
          // Exponentielles Backoff: 1s, 2s, 4s
          const delayMs = Math.pow(2, attempt - 1) * 1000;
          console.log(
            `⚠️  Temporärer API-Fehler (Versuch ${attempt}/${retries}), warte ${delayMs}ms...`
          );
          await new Promise(resolve => setTimeout(resolve, delayMs));
          continue;
        }

        // Nicht-temporärer Fehler oder letzter Versuch fehlgeschlagen
        break;
      }
    }

    // Alle Versuche fehlgeschlagen
    console.error('❌ Fehler bei Embedding-Generierung nach allen Versuchen:', lastError);
    throw lastError;
  }

  /**
   * Batch-Embedding mit Rate Limiting
   */
  public async generateEmbeddingsBatch(
    texts: string[],
    options?: { batchSize?: number; delayMs?: number }
  ): Promise<number[][]> {
    const { batchSize = 10, delayMs = 200 } = options || {};
    const embeddings: number[][] = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      const batchEmbeddings = await Promise.all(
        batch.map(text => this.generateEmbedding(text))
      );
      embeddings.push(...batchEmbeddings);

      // Rate Limiting
      if (i + batchSize < texts.length) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }

      console.log(`📊 Embeddings generiert: ${embeddings.length}/${texts.length}`);
    }

    return embeddings;
  }

  /**
   * Validiere Embedding-Dimension
   */
  private validateEmbedding(embedding: number[]): void {
    if (embedding.length !== this.dimensions) {
      throw new Error(
        `❌ Ungültige Embedding-Dimension: ${embedding.length} (erwartet: ${this.dimensions})`
      );
    }
  }

  /**
   * Cache leeren
   */
  public clearCache(): void {
    this.embeddingCache.clear();
    console.log('🧹 Embedding-Cache geleert');
  }

  /**
   * Cache-Statistiken
   */
  public getCacheStats(): { size: number; hitRate: number } {
    return {
      size: this.embeddingCache.size,
      hitRate: 0, // TODO: Tracking implementieren falls nötig
    };
  }
}

// Export Singleton-Factory
export const getEmbeddingService = () => EmbeddingService.getInstance();

