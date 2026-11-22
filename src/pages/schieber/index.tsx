import React, { useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import Head from 'next/head';
import { SeoHead } from '@/components/layout/SeoHead';
import { GameSchema } from '@/components/seo/GameSchema';
import { JsonLdSchema } from '@/components/seo/JsonLdSchema';
import { FaqJsonLdSchema } from '@/components/seo/FaqJsonLdSchema';
import { InternalLinker } from '@/components/layout/InternalLinker';
import { FaqSection } from '@/components/wissen/FaqSection';
import { JassenZeile } from '@/components/wissen/JassenKarte';
import { UebenBlock } from '@/components/wissen/UebenBlock';
import { JassfreundeSatz } from '@/components/wissen/JassfreundeSatz';
import { LeitartikelVideo } from '@/components/wissen/LeitartikelVideo';
import { krumenFuerArtikel, ortVon } from '@/lib/gliederung';

// /schieber/ ist die Hauptseite zum Schieber (Karte LEUCHTTURM 2 und Karte
// SCHIRI «wiki-vorlagen», Teil B, 22.11.2026): der ganze Artikel
// general_schieber mit Fragen und Article-Daten, darunter die Wege in die
// Gruppen, das Video und der Jassfreunde-Satz. Die alte Artikeladresse
// /schieber/grundlagen/der-schieber/ leitet per 301 hierher (firebase.json).

// Gruppen des Schieber-Hubs nach der Rubrik der Gliederung (Schritt 3, 22.11.2026).
// Jede Gruppe nimmt die Artikel ihrer Rubriken; was in keiner dieser Rubriken
// steht (Jassarten, Jassen digital), führt der Hub nicht.
const rubrikVon = (i: JassContentItem) => ortVon(i.id)?.rubrik?.name;
export const SCHIEBER_GROUPS = [
  { title: 'Regeln & Grundlagen', slug: 'regeln-grundlagen', test: (i: JassContentItem) => ['Regeln', 'Ansagen'].includes(rubrikVon(i) ?? '') },
  { title: 'Taktik',              slug: 'taktik',            test: (i: JassContentItem) => rubrikVon(i) === 'Taktik' },
  { title: 'Wichtige Begriffe',   slug: 'wichtige-begriffe', test: (i: JassContentItem) => rubrikVon(i) === 'Begriffe' },
  { title: 'Kultur & Geschichte', slug: 'kultur-geschichte', test: (i: JassContentItem) => rubrikVon(i) === 'Geschichte und Kultur' },
];

/** Artikel des Hubs: Schieber im Stichwort oder in der Unterrubrik, dazu die ganze Rubrik Taktik (Schieber-Taktik). */
export const schieberArtikel = (items: JassContentItem[]): JassContentItem[] =>
  items.filter((item) => {
    if (item.id === 'general_schieber') return false;
    const keywords = (item.metadata.keywords || []).map((k) => k.toLowerCase());
    return keywords.includes('schieber') || item.metadata.category.sub === 'Schieber' || rubrikVon(item) === 'Taktik';
  });

interface GroupCard {
  title: string;
  slug: string;
  count: number;
}

interface SchieberIndexProps {
  artikel: JassContentItem | null;
  totalCount: number;
  groups: GroupCard[];
}

const STANDARD_TITEL = 'Der Schieber: Regeln, Taktik & Strategie | Jass-Wiki';
const STANDARD_BESCHREIBUNG =
  'Alles über den Schieber: Die beliebteste Jassvariante der Schweiz. Regeln, Taktiken, Trumpfwahl und Teamstrategien einfach erklärt.';

const SchieberIndex: NextPage<SchieberIndexProps> = ({ artikel, totalCount, groups }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';
  const canonicalUrl = `${siteUrl}/schieber/`;
  const titel = artikel?.metadata.seoTitle ?? STANDARD_TITEL;
  const beschreibung = artikel?.metadata.seoDescription ?? STANDARD_BESCHREIBUNG;
  const fragen = artikel?.faqs ?? [];

  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => document.body.classList.remove('lexikon-page');
  }, []);

  // Brotkrumen nach der Gliederung: Jass-Wiki › Jassarten › Kapitel › Schieber.
  const breadcrumbItems = [...krumenFuerArtikel('general_schieber', '/schieber/'), { name: 'Schieber', href: '/schieber/' }];

  return (
    <>
      <SeoHead title={titel} description={beschreibung} canonicalUrl={canonicalUrl} />
      {artikel && (
        <Head>
          <meta property="og:type" content="article" />
          <meta property="article:published_time" content={artikel.metadata.datePublished} />
          <meta property="article:modified_time" content={artikel.metadata.dateModified} />
          <meta property="article:section" content="Schieber" />
          <JsonLdSchema
            articleData={{
              headline: 'Schieber',
              description: beschreibung,
              authorName: 'Jasswiki Redaktion',
              publisherName: 'Jasswiki.ch',
              publisherLogoUrl: 'https://jasswiki.ch/jasswiki-logo-hero-v2.png',
              datePublished: artikel.metadata.datePublished,
              dateModified: artikel.metadata.dateModified,
            }}
            breadcrumbItems={breadcrumbItems}
            canonicalUrl={canonicalUrl}
            siteUrl={siteUrl}
          />
          {fragen.length > 0 && <FaqJsonLdSchema faqs={fragen} />}
        </Head>
      )}
      <GameSchema
        name="Schieber"
        description="Die beliebteste Jassvariante der Schweiz, gespielt zu viert in zwei Teams"
        url={`${siteUrl}/schieber/`}
        wikidataId="Q137727247"
        numberOfPlayers={{ min: 4, max: 4 }}
        difficulty={2}
      />

      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <div className="space-y-6 sm:space-y-8">

          {/* Header – identisch zu [category]/index.tsx */}
          <div>
            <h1 className="font-capita text-[28px] sm:text-[36px] font-bold text-[#ff0000] mb-[8px] leading-[1.14]">
              Schieber
            </h1>
            <JassenZeile schluessel="general_schieber" kategorie="schieber" />
          </div>

          {/* Der ganze Artikel «Der Schieber» */}
          {artikel && (
            <article className="content-formatting max-w-none border-b border-[#f0eee7] pb-[24px]">
              <div className="content-formatting text-black">
                <InternalLinker text={artikel.text} farbwechsel={artikel.metadata.farbwechsel === true} />
              </div>
            </article>
          )}

          {/* Wege in die Gruppen – identisch zur Subkategorie-Ansicht in [category]/index.tsx */}
          <p className="font-inter text-[14px] sm:text-[16px] text-black leading-[1.5] !mb-0">
            {groups.length} Themenbereiche mit insgesamt {totalCount} Artikeln
          </p>
          <div className="grid gap-4 sm:gap-6">
            {groups.map((group) => (
              <Link
                key={group.slug}
                href={`/schieber/${group.slug}/`}
                className="group block"
              >
                <div className="bg-[#f0eee7]/50 border border-[#e8e6df] rounded-[12px] hover:border-[#d5d0c6] hover:bg-[#f0eee7] transition-colors px-[14px] sm:px-[20px] py-[14px] sm:py-[16px]">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-[12px] mb-[6px]">
                        <h3 className="font-capita text-[17px] sm:text-[19px] font-bold text-black group-hover:text-[#ff0000] transition-colors leading-[1.3] pr-2">
                          {group.title}
                        </h3>
                        <span className="jw-count-tag flex-shrink-0 self-start">
                          {group.count} Artikel
                        </span>
                      </div>
                      <p className="font-inter text-[13px] text-[#88816d] leading-[1.5]">
                        Alle Artikel über {group.title} im Detail
                      </p>
                    </div>
                    <div className="ml-4 text-[#88816d] group-hover:text-[#ff0000] group-hover:translate-x-1 transition-all flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <LeitartikelVideo schluessel="schieber_hub" />
          <JassfreundeSatz schluessel="schieber_hub" />

          <UebenBlock articleId="general_schieber" />

          {fragen.length > 0 && <FaqSection faqs={fragen} title="Häufige Fragen zum Schieber" />}

          {/* Zurück */}
          <div className="pt-8 border-t border-[#f0eee7]">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-[#f0eee7] text-black rounded-lg hover:bg-[#e8e6df] transition-colors font-medium border border-[#e8e6df]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück zur Übersicht
            </Link>
          </div>

        </div>
      </LexikonLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const content: JassContentRecord = allContent;
  const items = Object.values(content) as JassContentItem[];

  const mainArticle = items.find(i => i.id === 'general_schieber');

  const relatedItems = schieberArtikel(items);

  const assigned = new Set<string>();
  const groups: GroupCard[] = SCHIEBER_GROUPS
    .map(({ title, slug, test }) => {
      const count = relatedItems.filter(i => !assigned.has(i.id) && test(i)).length;
      relatedItems.filter(i => !assigned.has(i.id) && test(i)).forEach(i => assigned.add(i.id));
      return { title, slug, count };
    })
    .filter(g => g.count > 0);

  return {
    props: { artikel: mainArticle ?? null, totalCount: groups.reduce((n, g) => n + g.count, 0), groups },
  };
};

export default SchieberIndex;
