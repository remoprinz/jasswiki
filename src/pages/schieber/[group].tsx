import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import { SeoHead } from '@/components/layout/SeoHead';
import { toSlug } from '@/lib/utils';
import { buildArticleUrl } from '@/lib/url-utils';
import { SCHIEBER_GROUPS } from './index';

interface SchieberGroupPageProps {
  groupTitle: string;
  groupSlug: string;
  items: JassContentItem[];
}

const SchieberGroupPage: NextPage<SchieberGroupPageProps> = ({ groupTitle, groupSlug, items }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';
  const getTagStyle = (category: string) => {
    const slug = toSlug(category);
    const colors: Record<string, string> = {
      'regeln': '#ff0000',
      'weis-regeln': '#ff7a1a',
      'geschichte': '#f6b21a',
      'grundlagen-kultur': '#2bb752',
      'schieber': '#3b82f6',
      'begriffe': '#6366f1',
      'varianten': '#a855f7',
      'jassapps': '#06b6d4',
      'referenzen': '#6b7280',
    };
    const color = colors[slug] || '#274823';
    return { borderColor: color, color };
  };

  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => document.body.classList.remove('lexikon-page');
  }, []);

  const breadcrumbItems = [
    { name: 'Jass-Wiki', href: '/' },
    { name: 'Schieber', href: '/schieber/' },
    { name: groupTitle, href: `/schieber/${groupSlug}/` },
  ];

  return (
    <>
      <SeoHead
        title={`${groupTitle} – Schieber | JassWiki`}
        description={`Alle Artikel über ${groupTitle} rund um den Schieber im JassWiki.`}
        canonicalUrl={`${siteUrl}/schieber/${groupSlug}/`}
      />

      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <div className="space-y-6 sm:space-y-8">

          {/* Header */}
          <div>
            <h1 className="font-capita text-[28px] sm:text-[36px] font-bold text-[#ff0000] mb-[8px] leading-[1.14]">
              {groupTitle}
            </h1>
            <p className="font-inter text-[14px] sm:text-[16px] text-black leading-[1.5]">
              {items.length} {items.length === 1 ? 'Artikel' : 'Artikel'} zum Schieber
            </p>
          </div>

          {/* Artikel-Karten – identisch zu [category]/[subcategory]/index.tsx */}
          <div className="grid gap-4 sm:gap-5">
            {items.map((item) => {
              // buildArticleUrl beachtet die flache Struktur (Ansagen/Varianten, sub===topic).
              const href = buildArticleUrl(item.metadata.category);

              const preview = item.text
                .split('\n')
                .slice(0, 2)
                .join(' ')
                .substring(0, 150)
                .trim();

              return (
                <Link key={item.id} href={href} className="group block">
                  <div className="bg-[#f0eee7]/50 border border-[#e8e6df] rounded-[12px] hover:border-[#d5d0c6] hover:bg-[#f0eee7] transition-colors p-[14px] sm:p-[16px]">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-[12px] mb-[6px]">
                            <h3 className="font-capita text-[17px] sm:text-[19px] font-bold !text-black group-hover:!text-[#ff0000] transition-colors leading-[1.3]">
                                {item.metadata.category.topic}
                              </h3>
                          <span className="jw-article-tag flex-shrink-0 self-start" style={getTagStyle(item.metadata.category.main)}>
                            {item.metadata.category.main}
                          </span>
                        </div>
                        <p className="font-inter text-[13px] text-[#88816d] line-clamp-2 leading-[1.5]">
                          {preview}…
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-[#88816d] group-hover:text-[#ff0000] group-hover:translate-x-1 transition-all">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Zurück */}
          <div className="pt-8 border-t border-[#f0eee7]">
            <Link
              href="/schieber/"
              className="inline-flex items-center px-6 py-3 bg-[#f0eee7] text-black rounded-lg hover:bg-[#e8e6df] transition-colors font-medium border border-[#e8e6df]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück zum Schieber
            </Link>
          </div>

        </div>
      </LexikonLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: SCHIEBER_GROUPS.map(g => ({ params: { group: g.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const groupSlug = params?.group as string;
  const groupDef = SCHIEBER_GROUPS.find(g => g.slug === groupSlug);

  if (!groupDef) return { notFound: true };

  const content: JassContentRecord = allContent;
  const items = Object.values(content) as JassContentItem[];

  const relatedItems = items.filter(item => {
    if (item.id === 'general_schieber') return false;
    const keywords = (item.metadata.keywords || []).map(k => k.toLowerCase());
    return keywords.includes('schieber') || item.metadata.category.sub === 'Schieber';
  });

  // Assign to groups in order so "catch-all" (Kultur & Geschichte) gets the rest
  const assigned = new Set<string>();
  let groupItems: JassContentItem[] = [];

  for (const g of SCHIEBER_GROUPS) {
    const matched = relatedItems.filter(i => !assigned.has(i.id) && g.test(i));
    matched.forEach(i => assigned.add(i.id));
    if (g.slug === groupSlug) {
      groupItems = matched;
      break;
    }
  }

  const sorted = groupItems
    .sort((a, b) => (b.metadata.importance || 0) - (a.metadata.importance || 0))
    .map(i => ({ id: i.id, text: i.text.substring(0, 200), metadata: i.metadata }));

  return {
    props: {
      groupTitle: groupDef.title,
      groupSlug,
      items: sorted,
    },
  };
};

export default SchieberGroupPage;
