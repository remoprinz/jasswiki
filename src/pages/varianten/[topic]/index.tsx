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
import { useRouter } from 'next/router';
import Head from 'next/head';
import { RelatedTopics } from '@/components/wissen/RelatedTopics';
import { FaqJsonLdSchema } from '@/components/seo/FaqJsonLdSchema';

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
  const defaultPublishedDate = process.env.NEXT_PUBLIC_DEFAULT_PUBLISHED_DATE || '2023-01-01';
  const defaultModifiedDate = process.env.NEXT_PUBLIC_DEFAULT_MODIFIED_DATE || '2025-11-05';

  if (router.isFallback) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Lädt...</p>
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
    publisherLogoUrl: 'https://jasswiki.ch/jasswiki-logo-hero.png',
    datePublished: defaultPublishedDate,
    dateModified: defaultModifiedDate,
  };

  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => {
      document.body.classList.remove('lexikon-page');
    };
  }, []);

  const showDifficulty = true;
  const difficultyLabel = {
    1: 'Einfach',
    2: 'Mittel',
    3: 'Fortgeschritten',
    4: 'Anspruchsvoll',
    5: 'Experte'
  }[contentItem.metadata.difficulty] || 'Mittel';

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
        {contentItem.faqs && contentItem.faqs.length > 0 && (
          <FaqJsonLdSchema faqs={contentItem.faqs} />
        )}
      </Head>
      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <div className="space-y-6 sm:space-y-8">
          <header className="text-center pb-6 border-b border-gray-600">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {topic}
            </h1>
            <div className="flex items-center justify-center gap-4 text-sm sm:text-base text-gray-300 flex-wrap">
              <span className="px-3 py-1 bg-green-600 text-white rounded-full font-medium">
                {category}
              </span>
              {subcategory && (
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full font-medium">
                  {subcategory}
                </span>
              )}
              {showDifficulty && (
                <span className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full font-medium">
                  {difficultyLabel}
                </span>
              )}
            </div>
          </header>

          <article className="prose prose-lg sm:prose-xl max-w-none prose-invert">
            <div className="content-formatting text-gray-200">
              <InternalLinker text={contentItem.text} />
            </div>
          </article>

          {contentItem.metadata.source && (
            <div className="pt-4 text-sm text-gray-400 italic">
              Quelle: {contentItem.metadata.source}
            </div>
          )}

          <footer className="pt-8 border-t border-gray-600">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <a 
                href="/varianten/"
                className="inline-flex items-center px-4 py-2 text-gray-300 hover:text-green-400 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Zurück zu Varianten
              </a>
              
              <a 
                href="/gpt/"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-yellow-600 text-white rounded-lg hover:from-green-700 hover:to-yellow-700 transition-all font-medium text-center shadow-lg"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.456L3 21l2.456-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                </svg>
                Frage den JassWiki Chat
              </a>
            </div>
          </footer>

          <RelatedTopics
            currentArticleId={contentItem.id}
            currentCategory={contentItem.metadata.category.main}
            currentKeywords={contentItem.metadata.keywords}
            maxResults={4}
          />

          <div className="mt-10 pt-6 border-t border-gray-700">
            <div className="bg-gray-800/50 rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white mb-2">Quelle</h3>
                  <p className="text-gray-300 text-sm mb-3">
                    <strong>Basierend auf:</strong> {contentItem.metadata.source}
                  </p>
                  <Link 
                    href="/referenzen/"
                    className="inline-flex items-center text-green-400 hover:text-green-300 text-sm font-medium"
                  >
                    Alle Referenzen anzeigen
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-600">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-6 sm:p-8 text-center">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                Bereit zum Jassen?
              </h3>
              <p className="text-green-100 mb-6 text-base sm:text-lg">
                Nutze dein Wissen in der digitalen Jasstafel! Spiele mit Freunden und führe Statistiken.
              </p>
              <div className="flex justify-center">
                <a 
                  href="https://jassguru.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-bold text-lg sm:text-xl min-h-[56px] shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Jetzt Jassgruppe gründen
                </a>
              </div>
            </div>
          </div>
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

  const pageTitle = `Anleitung für die Jass-Variante "${topic}" | Jass-Wiki`;
  const metaDescription = `Lerne die Jass-Variante "${topic}". Spielregeln, Anleitung und Punkte einfach erklärt auf jasswiki.ch.`;

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

