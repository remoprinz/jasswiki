/**
 * DER SPRACHBEHÄLTER (KELLE 02.11.2026, Auftrag POLIER, Charta DOLMETSCHER).
 *
 * Die Übersetzungen liegen in src/data/i18n/{fr,it}.json, die Buchführung in
 * manifest.json. Eine Fassung erscheint, sobald das Manifest sie führt und sie
 * nicht als neu zu übersetzen markiert ist. Die URL ist der deutsche Pfad mit
 * der Sprache davor: /fr/weis-regeln/weispunkte/.
 *
 * Diese Datei liest allein das Manifest und den deutschen Bestand. Die Texte
 * selbst lädt nur die Sprachseite, damit deutsche Seiten nichts mittragen und
 * Korpus, llms und Sitemap nichts Fremdsprachiges einsaugen.
 */
import allContent from '@/data/jass-content-v2.json';
import manifest from '@/data/i18n/manifest.json';
import { JassContentRecord } from '@/types/jass-lexikon';
import { buildArticleUrl } from '@/lib/url-utils';

export type Sprache = 'fr' | 'it';
export const SPRACHEN: Sprache[] = ['fr', 'it'];

/** Die Oberflächenwörter der Sprachseite. DOLMETSCHER führt sie. */
export const SPRACH_TEXTE: Record<Sprache, { vermerk: string; faq: string; siehAuch: string; htmlLang: string }> = {
  fr: { vermerk: 'Traduction en relecture', faq: 'Questions fréquentes', siehAuch: 'Voir aussi', htmlLang: 'fr-CH' },
  it: { vermerk: 'Traduzione in revisione', faq: 'Domande frequenti', siehAuch: 'Vedi anche', htmlLang: 'it-CH' },
};

interface Fassung {
  lektorat?: string;
  neu?: boolean;
}

const buch = manifest as unknown as Record<string, Partial<Record<Sprache, Fassung>>>;
const bestand = allContent as JassContentRecord;

export function fassungDa(id: string, sprache: Sprache): boolean {
  const f = buch[id]?.[sprache];
  return !!f && !f.neu && !!bestand[id];
}

/** Bis zur menschlichen Freigabe trägt die Seite den Vermerk. */
export function lektoratOffen(id: string, sprache: Sprache): boolean {
  return buch[id]?.[sprache]?.lektorat !== 'freigegeben';
}

export function deutscherPfad(id: string): string {
  return buildArticleUrl(bestand[id].metadata.category);
}

export function sprachPfad(pfad: string, sprache: Sprache): string {
  return `/${sprache}${pfad}`;
}

/** Deutscher Pfad → Kennung, für jede Kennung im Manifest. */
const pfadZuKennung = new Map<string, string>();
for (const id of Object.keys(buch)) {
  if (bestand[id]) pfadZuKennung.set(deutscherPfad(id), id);
}

export function kennungZumPfad(pfad: string): string | null {
  return pfadZuKennung.get(pfad) ?? null;
}

export function kennungenDer(sprache: Sprache): string[] {
  return Object.keys(buch).filter((id) => fassungDa(id, sprache));
}

/** Teilt eine Adresse in Sprache und deutschen Pfad, ohne Abfrage und Anker. */
export function adresseLesen(asPath: string): { sprache: Sprache | null; pfad: string } {
  const roh = asPath.split('?')[0].split('#')[0];
  const mitStrich = roh.endsWith('/') ? roh : `${roh}/`;
  for (const s of SPRACHEN) {
    if (mitStrich.startsWith(`/${s}/`)) return { sprache: s, pfad: mitStrich.slice(s.length + 1) };
  }
  return { sprache: null, pfad: mitStrich };
}

/** Innere Links einer Übersetzung zeigen auf deren Fassung, wo es sie gibt, sonst auf Deutsch. */
export function linksInSprache(markdown: string, sprache: Sprache): string {
  return markdown.replace(/\]\((\/[^)\s]*)\)/g, (ganz, ziel: string) => {
    const [pfad, anker] = ziel.split('#');
    const id = kennungZumPfad(pfad);
    if (!id || !fassungDa(id, sprache)) return ganz;
    return `](${sprachPfad(pfad, sprache)}${anker ? `#${anker}` : ''})`;
  });
}
