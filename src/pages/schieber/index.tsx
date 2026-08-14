import React, { useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import { SeoHead } from '@/components/layout/SeoHead';
import { GameSchema } from '@/components/seo/GameSchema';
import { ohneKartenMarken } from '@/components/wissen/kartenMarke';

export const SCHIEBER_GROUPS = [
  { title: 'Regeln & Grundlagen', slug: 'regeln-grundlagen', test: (i: JassContentItem) => i.metadata.category.main === 'Regeln' },
  { title: 'Wichtige Begriffe',   slug: 'wichtige-begriffe', test: (i: JassContentItem) => i.metadata.category.main === 'Begriffe' },
  { title: 'Kultur & Geschichte', slug: 'kultur-geschichte', test: () => true },
];

interface GroupCard {
  title: string;
  slug: string;
  count: number;
}

interface SchieberIndexProps {
  intro: string;
  totalCount: number;
  groups: GroupCard[];
}

const SchieberIndex: NextPage<SchieberIndexProps> = ({ intro, totalCount, groups }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';

  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => document.body.classList.remove('lexikon-page');
  }, []);

  const breadcrumbItems = [
    { name: 'Jass-Wiki', href: '/' },
    { name: 'Schieber', href: '/schieber/' },
  ];

  return (
    <>
      <SeoHead
        title="Der Schieber: Regeln, Taktik & Strategie | JassWiki"
        description="Alles über den Schieber: Die beliebteste Jassvariante der Schweiz. Regeln, Taktiken, Trumpfwahl und Teamstrategien einfach erklärt."
        canonicalUrl={`${siteUrl}/schieber/`}
      />
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
            <p className="font-inter text-[14px] sm:text-[16px] text-black leading-[1.5]">
              {groups.length} Themenbereiche mit insgesamt {totalCount} Artikeln
            </p>
          </div>

          {/* Kurzer Intro-Text */}
          <div className="font-inter text-[14px] sm:text-[15px] text-[#5f5b53] leading-[1.65] border-b border-[#f0eee7] pb-[24px]">
            {intro}
          </div>

          {/* Gruppen-Karten – identisch zur Subkategorie-Ansicht in [category]/index.tsx */}
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

  const relatedItems = items.filter(item => {
    if (item.id === 'general_schieber') return false;
    const keywords = (item.metadata.keywords || []).map(k => k.toLowerCase());
    return keywords.includes('schieber') || item.metadata.category.sub === 'Schieber';
  });

  const assigned = new Set<string>();
  const groups: GroupCard[] = SCHIEBER_GROUPS
    .map(({ title, slug, test }) => {
      const count = relatedItems.filter(i => !assigned.has(i.id) && test(i)).length;
      relatedItems.filter(i => !assigned.has(i.id) && test(i)).forEach(i => assigned.add(i.id));
      return { title, slug, count };
    })
    .filter(g => g.count > 0);

  const intro = mainArticle
    ? ohneKartenMarken(mainArticle.text).split('\n').slice(0, 2).join(' ').substring(0, 280) + '…'
    : '';

  return {
    props: { intro, totalCount: relatedItems.length, groups },
  };
};

export default SchieberIndex;
