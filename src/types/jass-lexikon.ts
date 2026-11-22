export interface JassApp {
  name?: string;
  anbieter?: string;
  plattformen?: string[];
  zweck?: string;
  url?: string;
  sameAs?: string[];
  /** true: der Artikel beschreibt mehrere Apps. Karte ja, SoftwareApplication nein. */
  liste?: boolean;
}

export interface JassContentMetadata {
  id: string;
  category: {
    main: string;
    sub: string;
    topic: string;
  };
  /**
   * Feste Adresse der Artikelseite, z. B. "/regeln/kartenverteilung/abheben-der-karten/".
   * Gesetzt mit `node adressen-einfrieren.mjs` (Gliederung Schritt 1, 22.11.2026).
   * Titel und Zugehörigkeit ändern sie nicht mehr.
   */
  adresse: string;
  keywords: string[];
  situations: string[];
  importance: number;
  difficulty: number;
  /** Erstes Datum, an dem der Artikel in der Inhaltsdatei stand (YYYY-MM-DD). */
  datePublished: string;
  /** Jüngstes Datum, an dem sich `text` oder `faqs` geändert haben (YYYY-MM-DD). */
  dateModified: string;
  /**
   * Überschrift auf der Seite. Solange das Feld fehlt, steht dort `category.topic`.
   * Das Feld trennt die sichtbare Überschrift von der Adresse: `topic` bestimmt die
   * URL und bleibt kurz, `titel` darf ein ganzer Satz sein (Remo, 19.08.2026).
   */
  titel?: string;
  /** Titel für das Suchergebnis. Solange das Feld fehlt, greift die Vorlage der Seite. */
  seoTitle?: string;
  /** Beschreibung für das Suchergebnis. Solange das Feld fehlt, greift die Vorlage der Seite. */
  seoDescription?: string;
  /**
   * Der Artikel lässt den Wortwechsel aufs französische Blatt zu: schaltet der
   * Leser die Karten auf «Französisch», wechseln im sichtbaren Text auch die
   * Farb- und Kartenwörter (Rosen → Herz, Under → Bube …). Fehlt das Feld,
   * bleibt der Text wie geschrieben.
   */
  farbwechsel?: boolean;
  /**
   * Steckbrief einer Jass-App (Redaktion SCHIRI). Trägt die Karte auf /jassapps/
   * und das SoftwareApplication-Schema der App-Seite. Fehlt es, entfällt beides.
   */
  app?: JassApp;
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