export interface JassContentMetadata {
  id: string;
  category: {
    main: string;
    sub: string;
    topic: string;
  };
  keywords: string[];
  situations: string[];
  importance: number;
  difficulty: number;
  /** Erstes Datum, an dem der Artikel in der Inhaltsdatei stand (YYYY-MM-DD). */
  datePublished: string;
  /** Jüngstes Datum, an dem sich `text` oder `faqs` geändert haben (YYYY-MM-DD). */
  dateModified: string;
  /** Titel für das Suchergebnis. Solange das Feld fehlt, greift die Vorlage der Seite. */
  seoTitle?: string;
  /** Beschreibung für das Suchergebnis. Solange das Feld fehlt, greift die Vorlage der Seite. */
  seoDescription?: string;
  source?: string;
  chunkInfo?: {
    isPartOfSequence: boolean;
    sequenceId: string | null;
    index: number | null;
    total: number | null;
    previousChunkId: string | null;
    nextChunkId: string | null;
  };
  relatedRules?: string[];
  references?: {
    ruleId: string;
    type: string;
    description: string;
  }[];
}

export interface JassContentItem {
  id: string;
  text: string;
  metadata: JassContentMetadata;
  faqs?: {
    question: string;
    answer: string;
  }[];
  see_also?: string[];
  sources?: {
    title: string;
    url: string;
    type?: string;
    accessed?: string;
  }[];
}

export type JassContentRecord = Record<string, JassContentItem>; 