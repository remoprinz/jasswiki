import { ohneKartenMarken } from '@/components/wissen/kartenMarke';
import { verweiseZuText } from '@/components/wissen/verweise';

/**
 * Vorschau eines Artikeltexts für Karten und Listen (SCHIRI 22.11.2026, A3 gleich 0).
 *
 * Reihenfolge zählt: zuerst Marken und Verweise auflösen, dann Markdown glätten,
 * erst danach kürzen. Wer vorher kürzt, schneidet «(siehe Begriff …» mitten
 * durch, und der Rest steht roh auf der Seite. Gezeigt werden wie bisher die
 * ersten zwei Zeilen des Texts.
 */
export function vorschauText(text: string, laenge = 150): string {
  const aufgeloest = verweiseZuText(ohneKartenMarken(String(text || '')))
    .replace(/[ \t]*\(ID:\s*[^)\n]+\)/g, '') // interne Kennung im Fliesstext
    .replace(/^[ \t]*\|?[ \t]*:?-{2,}[-:| \t]*$/gm, ''); // Trennzeile einer Tabelle
  let t = aufgeloest
    .split('\n')
    .slice(0, 2)
    .map((zeile) =>
      zeile
        .replace(/^[ \t]*#{1,6}[ \t]+/, '') // Überschrift
        .replace(/^[ \t]*(?:[-*+•]|\d+[.)])[ \t]+/, '') // Listenzeichen
        .replace(/\[([^\]\n]+)\]\([^)\n]+\)/g, '$1') // Markdown-Link
        .replace(/\*\*|__/g, '') // fett
        .replace(/(^|[\s(«])[*_]([^*_\n]+)[*_](?=[\s).,;:!?»]|$)/g, '$1$2') // kursiv
        .replace(/[|`]/g, ' '),
    )
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (t.length > laenge) t = t.slice(0, laenge).replace(/\s+\S*$/, '');
  return t;
}
