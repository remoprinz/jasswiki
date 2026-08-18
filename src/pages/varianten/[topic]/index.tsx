import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import { toSlug } from '@/lib/utils';
import { InternalLinker } from '@/components/layout/InternalLinker';
import { SeoHead } from '@/components/layout/SeoHead';
import { JsonLdSchema } from '@/components/seo/JsonLdSchema';
import { GameSchema } from '@/components/seo/GameSchema';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { RelatedTopics } from '@/components/wissen/RelatedTopics';
import { FaqJsonLdSchema } from '@/components/seo/FaqJsonLdSchema';
import { FaqSection } from '@/components/wissen/FaqSection';
import { getVariantMetadata } from '@/data/variant-wikidata-mapping';


interface VariantenPageProps {
  contentItem: JassContentItem;
  topic: string;
  topicSlug: string;
  pageTitle: string;
  metaDescription: string;
  canonicalPath: string;
}

const VariantenPage: NextPage<VariantenPageProps> = ({
  contentItem,
  topic,
  topicSlug,
  pageTitle,
  metaDescription,
  canonicalPath,
}) => {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';
  const normalizedPath = canonicalPath.endsWith('/') ? canonicalPath : `${canonicalPath}/`;
  const canonicalUrl = `${siteUrl}${normalizedPath}`;

  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => {
      document.body.classList.remove('lexikon-page');
    };
  }, []);

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#274823] mx-auto mb-4"></div>
          <p className="text-black">Lädt...</p>
        </div>
      </div>
    );
  }

  if (!contentItem) {
    return <div>Artikel nicht gefunden.</div>;
  }

  const category = 'Varianten';
  const categorySlug = 'varianten';
  const subcategory = contentItem.metadata.category.sub;
  
  const breadcrumbItems = [
    { name: 'Jass-Wiki', href: '/' },
    { name: category, href: `/${categorySlug}/` },
    { name: topic, href: normalizedPath },
  ];

  const articleData = {
    headline: topic,
    description: metaDescription,
    authorName: 'Jasswiki Redaktion',
    publisherName: 'Jasswiki.ch',
    publisherLogoUrl: 'https://jasswiki.ch/jasswiki-logo-hero-v2.png',
    datePublished: contentItem.metadata.datePublished,
    dateModified: contentItem.metadata.dateModified,
  };

  const showDifficulty = true;
  const difficultyLabel = {
    1: 'Einfach',
    2: 'Mittel',
    3: 'Fortgeschritten',
    4: 'Anspruchsvoll',
    5: 'Experte'
  }[contentItem.metadata.difficulty] || 'Mittel';

  const getTagStyle = (label: string, fallbackColor: string = '#ff0000') => {
    const slug = toSlug(label);
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
    const color = colors[slug] || fallbackColor;
    return { borderColor: color, color };
  };

  // Get Wikidata metadata for this variant
  const variantMetadata = getVariantMetadata(topicSlug);

  return (
    <>
      <SeoHead
        title={pageTitle}
        description={metaDescription}
        canonicalUrl={canonicalUrl}
      />
      <Head>
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={articleData.datePublished} />
        <meta property="article:modified_time" content={articleData.dateModified} />
        <meta property="article:author" content={articleData.authorName} />
        <meta property="article:section" content={category} />
        <JsonLdSchema
          articleData={articleData}
          breadcrumbItems={breadcrumbItems}
          canonicalUrl={canonicalUrl}
          siteUrl={siteUrl}
        />
        {variantMetadata && (
          <GameSchema
            name={topic}
            description={metaDescription}
            url={canonicalUrl}
            wikidataId={variantMetadata.wikidataId}
            numberOfPlayers={variantMetadata.numberOfPlayers}
            difficulty={variantMetadata.difficulty}
          />
        )}
        {contentItem.faqs && contentItem.faqs.length > 0 && (
          <FaqJsonLdSchema faqs={contentItem.faqs} />
        )}
      </Head>
      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <div className="space-y-6 sm:space-y-8">
          <header className="text-left pb-6 border-b border-[#f0eee7]">
            <div className="jw-article-tags mb-[10px]">
              <span className="jw-article-tag" style={getTagStyle(category, '#00aa2f')}>
                {category}
              </span>
              {subcategory && (
                <span className="jw-article-tag" style={getTagStyle(subcategory, '#ff0000')}>
                  {subcategory}
                </span>
              )}
              {showDifficulty && (
                <span className="jw-article-tag" style={getTagStyle('difficulty', '#2563eb')}>
                  {difficultyLabel}
                </span>
              )}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff0000] mb-4 leading-tight">
              {topic}
            </h1>
          </header>

          <article className="content-formatting max-w-none">
            <div className="content-formatting text-black">
              <InternalLinker text={contentItem.text} farbwechsel={contentItem.metadata.farbwechsel === true} />
            </div>
          </article>

          {/* FAQ-Sektion - sichtbar für User und Crawler */}
          {contentItem.faqs && contentItem.faqs.length > 0 && (
            <FaqSection
              faqs={contentItem.faqs}
              title={`Häufige Fragen zu ${topic}`}
            />
          )}

          {/* Chat-Prompt — Penpot: Inter 14px, zentriert, #88816d, Link rot+underline */}
          <div className="text-center py-[16px]">
            <p className="font-inter text-[14px] font-normal text-[#88816d] leading-[1.4286]">
              Hast du weitere Fragen? Nutze unseren{' '}
              <Link href="/gpt/" className="text-[#ff0000] underline">JassWiki Chat</Link>.
            </p>
          </div>

          {/* Siehe auch — Penpot: Trennlinie + Capita 20px #88816d + 2x2 Info-Cards */}
          <RelatedTopics
            currentArticleId={contentItem.id}
            currentCategory={contentItem.metadata.category.main}
            currentKeywords={contentItem.metadata.keywords}
            maxResults={4}
          />
        </div>
      </LexikonLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const content: JassContentRecord = allContent;
  const paths = (Object.values(content) as JassContentItem[])
    .filter(item => toSlug(item.metadata.category.main) === 'varianten')
    .map((item) => ({
      params: {
        topic: toSlug(item.metadata.category.topic),
      },
    }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const topicSlug = params?.topic as string;

  const content: JassContentRecord = allContent;
  const contentItem = (Object.values(content) as JassContentItem[]).find(
    (item) =>
      toSlug(item.metadata.category.main) === 'varianten' &&
      toSlug(item.metadata.category.topic) === topicSlug
  );

  if (!contentItem) {
    return {
      notFound: true,
    };
  }

  const topic = contentItem.metadata.category.topic;
  const canonicalPath = `/varianten/${topicSlug}/`;

  // Die Inhaltsdatei hat das letzte Wort: steht dort ein eigener Suchergebnis-Text,
  // gilt er vor der Vorlage dieser Seite.
  const pageTitle =
    contentItem.metadata.seoTitle || `${topic} Jass: Regeln, Ablauf und Punkte | Jass-Wiki`;
  const metaDescription =
    contentItem.metadata.seoDescription ||
    `So wird ${topic} gejasst: Spieler, Karten, Ablauf, Wertung und was Runden anders abmachen. Aus dem Jass-Wiki des Jassverbands Schweiz.`;

  return {
    props: {
      contentItem,
      topic: topic,
      topicSlug,
      pageTitle,
      metaDescription,
      canonicalPath,
    },
  };
};

export default VariantenPage;

