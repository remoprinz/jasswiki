import React from 'react';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import { JassContentItem } from '@/types/jass-lexikon';
import leitartikel from '@/data/leitartikel.json';
import tueren from '@/data/tueren.json';
import { JassenKarte, JassenZeile, zeileSatz } from '@/components/wissen/JassenKarte';
import { JassfreundeSatz } from '@/components/wissen/JassfreundeSatz';
import { LeitartikelVideo, jdtFuer } from '@/components/wissen/LeitartikelVideo';
import { UebenBlock, hatUeben } from '@/components/wissen/UebenBlock';
import { ArtikelFilm, filmFuer } from '@/components/wissen/ArtikelFilm';
import { FaqSection } from '@/components/wissen/FaqSection';
import { SeeAlsoSection } from '@/components/wissen/SeeAlsoSection';
import { RelatedTopics } from '@/components/wissen/RelatedTopics';
import { RueckmeldungZeile } from '@/components/wissen/RueckmeldungZeile';

/**
 * DIE ARTIKELHÜLLE (A1 Etappe 1.1, Karte SCHIRI «wiki-huelle» Teil A, KELLE 22.11.2026)
 *
 * Die vier Artikelvorlagen ([topic], flache Artikel in [subcategory], varianten/[topic],
 * ansagen/[topic]) zeichnen dieselbe Hülle: ein geschlossener Satz Bausteine in fester
 * Reihenfolge, jeder mit data-baustein, gemessen vom Messwerk (messwerk-seite.mjs):
 *
 *   kopf          Brotkrumen, Titel, die eine Tür zum Spielen als Zeile
 *   text          der Artikel mit Karten- und Tischbildern
 *   tuer          die grüne Karte nach dem Einstieg, allein wo src/data/tueren.json
 *                 den Artikel führt; der Text teilt sich dann in zwei Bausteine text
 *   ueben         Film des Leitartikels oder Block «Üben» (entfällt ohne Inhalt)
 *   fragen        alle Fragen zugeklappt
 *   verweise      EINE Liste: «Siehe auch», wo see_also steht, sonst die errechnete
 *   rueckmeldung  ein Satz und ein Knopf (Mail)
 *   fuss          der Fuss der Seite (LexikonLayout)
 *
 * Weggenommen gegenüber den alten Vorlagen: Rubrik-Pillen im Kopf, die grüne Karte
 * «Jetzt online jassen.» am Schluss, die Chat-Zeile, die zweite Verweisliste, der
 * Rückweg «Alle Ansagen im Überblick» (die Brotkrumen tragen ihn).
 *
 * SCHALTER: NEUE_HUELLE. true = alle Artikel; eine Liste von Kennungen = allein diese.
 * Für alle anderen zeichnet jede Vorlage ihren alten Stand.
 */
export const NEUE_HUELLE = true as true | ReadonlySet<string>;

export const huelleGilt = (kennung: string): boolean =>
  NEUE_HUELLE === true || (NEUE_HUELLE as ReadonlySet<string>).has(kennung);

const istLeitartikel = (kennung: string): boolean =>
  kennung in (leitartikel as { artikel: Record<string, unknown> }).artikel;

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface ArtikelHuelleProps {
  contentItem: JassContentItem;
  breadcrumbItems: BreadcrumbItem[];
  /** Titel der Seite (h1) und Name des Artikels im Betreff der Rückmeldung. */
  titel: string;
  /** Name in «Häufige Fragen zu …», wie die Vorlage ihn bisher setzte. */
  fragenName: string;
  /** Kategorie-Slug, nach dem die Zeile zum Spielen ihren Satz wählt. */
  kategorie: string;
  /** Der Artikelinhalt, wie die Vorlage ihn zusammensetzt (Bilder, Raster). */
  text: React.ReactNode;
  /** Was zum Text gehört und unter ihm steht (Artikel eines Bereichs). */
  nachText?: React.ReactNode;
  /** Roher Artikeltext und wie die Vorlage ein Stück davon zeichnet. Beides
   *  braucht die Tür als Karte (tueren.json), die den Text nach dem Einstieg teilt. */
  rohText?: string;
  zeichne?: (stueck: string) => React.ReactNode;
}

interface Tuer {
  titel: string;
  knopf: string;
  pfad: string;
  ort: string;
}

/** Die Tür als Karte, wo src/data/tueren.json den Artikel führt (SCHIRI 22.11.2026). */
export const tuerFuer = (kennung: string): Tuer | null =>
  (tueren as { artikel: Record<string, Tuer> }).artikel[kennung] ?? null;

/** Teilt den Text nach dem Einstieg: vor der ersten «## », sonst nach dem ersten Absatz. */
export const teileAmEinstieg = (text: string): [string, string] => {
  const ueberschrift = text.search(/\n## /);
  if (ueberschrift > 0) return [text.slice(0, ueberschrift), text.slice(ueberschrift + 1)];
  const absatz = text.search(/\n\s*\n/);
  if (absatz > 0) return [text.slice(0, absatz), text.slice(absatz).replace(/^\s+/, '')];
  return [text, ''];
};

export const ArtikelHuelle: React.FC<ArtikelHuelleProps> = ({
  contentItem,
  breadcrumbItems,
  titel,
  fragenName,
  kategorie,
  text,
  nachText,
  rohText,
  zeichne,
}) => {
  const kennung = contentItem.id;
  const leit = istLeitartikel(kennung);
  // Die Karte braucht den rohen Text; Vorlagen mit eigenem Aufbau (Raster,
  // Symbole) geben ihn nicht und behalten die Zeile.
  const tuer = rohText !== undefined && zeichne ? tuerFuer(kennung) : null;
  const [vorTuer, nachTuer] = tuer ? teileAmEinstieg(rohText!) : ['', ''];
  // Film aus src/data/artikelfilme.json: zuoberst, nach dem Einstieg (vor der
  // Karte, wo eine steht). Braucht wie die Karte den rohen Text.
  const film = rohText !== undefined && zeichne ? filmFuer(kennung) : null;
  const [vorFilm, nachFilm] = film && !tuer ? teileAmEinstieg(rohText!) : ['', ''];
  // Eine Tür: Leitartikel tragen den Jassfreunde-Satz, Artikel mit Karte die
  // Karte, alle anderen die Zeile.
  const mitZeile = !leit && !tuer && zeileSatz(kennung, kategorie) !== null;
  const kopf = (
    // Ohne Zeile steht die Trennlinie so weit unter dem Titel wie der Text unter ihr
    // (24, ab sm 32, wie der Abstand im LexikonLayout).
    <header className={`text-left border-b border-[#f0eee7] ${mitZeile ? 'pb-6' : 'pb-6 sm:pb-8'}`}>
      <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff0000] leading-tight ${mitZeile ? 'mb-4' : '!mb-0'}`}>{titel}</h1>
      {mitZeile && <JassenZeile schluessel={kennung} kategorie={kategorie} />}
    </header>
  );

  const ueben = jdtFuer(kennung) !== null || hatUeben(kennung);
  const fragen = contentItem.faqs && contentItem.faqs.length > 0;
  const seeAlso = contentItem.see_also && contentItem.see_also.length > 0;

  return (
    <LexikonLayout breadcrumbItems={breadcrumbItems} kopf={kopf}>
      <div className="space-y-6 sm:space-y-8">
        {tuer ? (
          <>
            <div data-baustein="text">
              <article className="content-formatting max-w-none" data-artikel-seite={kennung}>
                {zeichne!(vorTuer)}
                {film && <ArtikelFilm kennung={kennung} />}
              </article>
            </div>
            <div data-baustein="tuer">
              <JassenKarte
                schluessel={kennung}
                kategorie={kategorie}
                ort={tuer.ort}
                abstand=""
                titel={tuer.titel}
                knopf={tuer.knopf}
                pfad={tuer.pfad}
              />
            </div>
            <div data-baustein="text">
              {nachTuer && <div className="content-formatting max-w-none">{zeichne!(nachTuer)}</div>}
              {nachText}
              <JassfreundeSatz schluessel={kennung} />
            </div>
          </>
        ) : (
          <div data-baustein="text">
            <article className="content-formatting max-w-none" data-artikel-seite={kennung}>
              {film ? (
                <>
                  {zeichne!(vorFilm)}
                  <ArtikelFilm kennung={kennung} />
                  {nachFilm && zeichne!(nachFilm)}
                </>
              ) : (
                text
              )}
            </article>
            {nachText}
            <JassfreundeSatz schluessel={kennung} />
          </div>
        )}

        {ueben && (
          <div data-baustein="ueben">
            <LeitartikelVideo schluessel={kennung} />
            <UebenBlock articleId={kennung} />
          </div>
        )}

        {fragen && (
          <div data-baustein="fragen">
            <FaqSection faqs={contentItem.faqs ?? []} title={`Häufige Fragen zu ${fragenName}`} ersteOffen={false} />
          </div>
        )}

        <div data-baustein="verweise">
          {seeAlso ? (
            <SeeAlsoSection seeAlsoIds={contentItem.see_also ?? []} currentArticleId={kennung} />
          ) : (
            <RelatedTopics
              currentArticleId={kennung}
              currentCategory={contentItem.metadata.category.main}
              currentKeywords={contentItem.metadata.keywords}
              maxResults={4}
            />
          )}
        </div>

        <div data-baustein="rueckmeldung" className="border-t border-[#f0eee7]">
          <RueckmeldungZeile artikel={titel} kennung={contentItem.id} />
        </div>
      </div>
    </LexikonLayout>
  );
};

export default ArtikelHuelle;
