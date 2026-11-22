import React from 'react';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import { JassContentItem } from '@/types/jass-lexikon';
import leitartikel from '@/data/leitartikel.json';
import { JassenZeile } from '@/components/wissen/JassenKarte';
import { JassfreundeSatz } from '@/components/wissen/JassfreundeSatz';
import { LeitartikelVideo, jdtFuer } from '@/components/wissen/LeitartikelVideo';
import { UebenBlock, hatUeben } from '@/components/wissen/UebenBlock';
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
}

export const ArtikelHuelle: React.FC<ArtikelHuelleProps> = ({
  contentItem,
  breadcrumbItems,
  titel,
  fragenName,
  kategorie,
  text,
  nachText,
}) => {
  const kennung = contentItem.id;
  const leit = istLeitartikel(kennung);
  // Eine Tür: Leitartikel tragen den Jassfreunde-Satz, alle anderen die Zeile.
  const kopf = (
    <header className="text-left pb-6 border-b border-[#f0eee7]">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff0000] mb-4 leading-tight">{titel}</h1>
      {!leit && <JassenZeile schluessel={kennung} kategorie={kategorie} />}
    </header>
  );

  const ueben = jdtFuer(kennung) !== null || hatUeben(kennung);
  const fragen = contentItem.faqs && contentItem.faqs.length > 0;
  const seeAlso = contentItem.see_also && contentItem.see_also.length > 0;

  return (
    <LexikonLayout breadcrumbItems={breadcrumbItems} kopf={kopf}>
      <div className="space-y-6 sm:space-y-8">
        <div data-baustein="text">
          <article className="content-formatting max-w-none" data-artikel-seite={kennung}>
            {text}
          </article>
          {nachText}
          <JassfreundeSatz schluessel={kennung} />
        </div>

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
          <RueckmeldungZeile artikel={titel} />
        </div>
      </div>
    </LexikonLayout>
  );
};

export default ArtikelHuelle;
