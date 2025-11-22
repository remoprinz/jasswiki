/**
 * Types für Firebase Functions
 * Shared zwischen Client & Server
 */

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

export interface RAGQueryRequest {
  query: string;
  topK?: number;
  filters?: {
    category?: JassCategory;
    variant?: string;
    minScore?: number;
  };
}

export interface ArticleSection {
  heading: string;
  content: string;
}

export interface SeeAlsoItem {
  title: string;
  url: string;
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
  see_also: SeeAlsoItem[];
  variant?: string;
  
  // NEU: Für robustes Multi-Turn Rendering
  isRuleQuestion: boolean;
  renderedFullAnswer?: string;
  sections: ArticleSection[];
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
    rejected_reason?: string;
  };
}

