/**
 * Die internen Verweise des Bestands: (siehe Begriff "kennung").
 *
 * Eine Stelle für alle Ausspielwege im Browser — Fliesstext (InternalLinker),
 * FAQ-Antworten (FaqSection) und das FAQPage-Schema (FaqJsonLdSchema).
 * Gegenstück für die maschinenlesbaren Ausgaben: resolve-markers.mjs.
 *
 * DIE KENNUNG ENTSCHEIDET DAS ZIEL. Das Wortverzeichnis wird aus Topic UND
 * allen Keywords jedes Artikels gebaut; 820 seiner 1919 Schlüssel sind doppelt
 * belegt, und dort gewinnt der zuletzt eingelesene Artikel. Solange das Wort
 * die Kennung schlug, erbte «Schieber» das Ziel von jass_elo_meta und jeder
 * neue Artikel mit einem gängigen Stichwort verbog stumm bestehende Links.
 * Darum greift das Wortverzeichnis nur noch dort, wo die Kennung im Bestand
 * fehlt.
 */
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord } from '@/types/jass-lexikon';
import { buildArticleUrl } from '@/lib/url-utils';

/** Wort (Topic oder Keyword, klein) → Artikelpfad. Rückfall. */
const wortZiele = new Map<string, string>();
/** Kennung (Artikel-ID, klein) → Artikelpfad. Massgeblich. */
const kennungZiele = new Map<string, string>();
/** Kennung (Artikel-ID, klein) → Artikeltitel. */
const kennungTitel = new Map<string, string>();

Object.values(allContent as JassContentRecord).forEach((item) => {
  const path = buildArticleUrl(item.metadata.category);
  const kennung = item.id.toLowerCase();

  kennungZiele.set(kennung, path);
  kennungTitel.set(kennung, item.metadata.category.topic);

  wortZiele.set(item.metadata.category.topic.toLowerCase(), path);
  item.metadata.keywords.forEach((keyword) => {
    wortZiele.set(keyword.toLowerCase(), path);
  });
});

/** Ziel einer Kennung; `null`, wenn der Bestand sie nicht führt. */
export function zielDerKennung(refId: string): string | null {
  return kennungZiele.get(refId.toLowerCase()) ?? null;
}

/** Ziel eines Wortes; `null`, wenn kein Artikel es als Topic/Keyword führt. */
export function zielDesWortes(wort: string): string | null {
  return wortZiele.get(wort.toLowerCase()) ?? null;
}

/** Titel zu einem Artikelpfad — für Verweise ohne eigenen Anzeigetext. */
function titelZumPfad(path: string): string | null {
  for (const [name, p] of wortZiele) if (p === path) return name;
  return null;
}

/**
 * Wandelt alle (siehe Begriff "kennung")-Marker in Markdown-Links.
 *
 * Drei Fälle:
 *  1. «Zitierter Text» (siehe Begriff "kennung")  → [Zitierter Text](/pfad/)
 *  2. Wort (siehe Begriff "kennung")              → [Wort](/pfad/)
 *  3. (siehe Begriff "kennung") allein            → [Artikeltitel](/pfad/)
 *
 * In allen drei Fällen bestimmt die Kennung das Ziel.
 */
export function verweiseZuLinks(text: string): string {
  if (typeof text !== 'string') return text;

  // Spezifischer Content-Fix: alte Klammer-Referenz -> direkter externer Link
  text = text.replace(
    /Jassguru\.ch ist eine digitale Jasstafel\s*\(siehe Begriff\s+"jassapps_jasstafel_pro"\)/gi,
    '[Jassguru.ch](https://jassguru.ch) ist eine digitale Jasstafel'
  );

  // Fallback: Domain immer klickbar machen (wenn noch als Plain-Text vorhanden)
  text = text.replace(/(?<!\[)Jassguru\.ch(?!\]\()/g, '[Jassguru.ch](https://jassguru.ch)');

  // 1. «Guillemet-Text» oder "Anführungstext" (siehe Begriff "kennung")
  //
  // Der zitierte Text bleibt bewusst eng gefasst: ohne Zeilenumbruch, ohne
  // Klammern, höchstens 80 Zeichen. Grund: die Kennungen stehen selbst in
  // Anführungszeichen, ein weit gefasster Ausdruck startet darum an einem
  // früheren `"` und läuft über halbe Absätze — im Sidi-Barrani stand deshalb
  // sichtbar «fort](/begriffe/spielaktionen/fort/) statt eines Links.
  text = text.replace(
    /[«"]([^»"\n()]{1,80})[»"]\s*\(siehe Begriff\s+"([^"]+)"\)/gi,
    (_, display: string, refId: string) => {
      const path = zielDerKennung(refId) ?? zielDesWortes(display);
      return path ? `[${display}](${path})` : `"${display}"`;
    }
  );

  // 1b. **Fetter Text** (siehe Begriff "kennung") → **[Fetter Text](pfad)**
  // (SCHIEDSRICHTER, 18.08.2026): Ohne diese Stufe brach der Fettdruck den
  // Treffer von Stufe 2, und Stufe 3 setzte «mehr» oder ein Stichwort hinter
  // das Wort — auf der Jasskarten-Seite stand «einen Schild jasskarten».
  text = text.replace(
    /\*\*([^*\n]{1,80})\*\*\s*\(siehe Begriff\s+"([^"]+)"\)/gi,
    (_, display: string, refId: string) => {
      const path = zielDerKennung(refId) ?? zielDesWortes(display);
      return path ? `**[${display}](${path})**` : `**${display}**`;
    }
  );

  // 2. Deutsches Wort (inkl. Umlaute, Bindestrich) vor (siehe Begriff "kennung")
  text = text.replace(
    /([a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß\w-]*)\s*\(siehe Begriff\s+"([^"]+)"\)/gi,
    (_, term: string, refId: string) => {
      const path = zielDerKennung(refId) ?? zielDesWortes(term);
      return path ? `[${term}](${path})` : term;
    }
  );

  // 3. Verbleibende (siehe Begriff "kennung") ohne vorherigen Link-Text
  text = text.replace(
    /\(siehe Begriff\s+"([^"]+)"\)/gi,
    (_, refId: string) => {
      const path = zielDerKennung(refId);
      if (!path) return '';
      const title = titelZumPfad(path);
      return title ? `[${title}](${path})` : `[mehr](${path})`;
    }
  );

  return text;
}

/**
 * Löst dieselben Marker in reinen Text auf — für maschinenlesbare Ausgaben
 * (FAQPage-Schema). Spiegelt resolveMarkers in resolve-markers.mjs.
 */
export function verweiseZuText(text: string): string {
  if (typeof text !== 'string') return text;

  text = text.replace(
    /[«"]([^»"\n()]{1,80})[»"]\s*\(siehe Begriff\s+"([^"]+)"\)/gi,
    (_, display: string) => display
  );

  text = text.replace(
    /([a-zA-ZäöüÄÖÜß][a-zA-ZäöüÄÖÜß\w-]*)\s*\(siehe Begriff\s+"([^"]+)"\)/gi,
    (_, term: string) => term
  );

  text = text.replace(/\s*\(siehe Begriff\s+"([^"]+)"\)/gi, (_, refId: string) => {
    const titel = kennungTitel.get(refId.toLowerCase());
    return titel ? ` (siehe ${titel})` : '';
  });

  return text;
}
