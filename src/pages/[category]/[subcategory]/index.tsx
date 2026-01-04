import React, { useEffect, useMemo } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import { SeoHead } from '@/components/layout/SeoHead';
import Link from 'next/link';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import { toSlug } from '@/lib/utils';
import { BookOpen } from 'lucide-react';
import { InternalLinker } from '@/components/layout/InternalLinker';
import { JsonLdSchema } from '@/components/seo/JsonLdSchema';
import Head from 'next/head';
import { RelatedTopics } from '@/components/wissen/RelatedTopics';
import { FaqJsonLdSchema } from '@/components/seo/FaqJsonLdSchema';

// Helper: Holt alle Artikel einer Unterkategorie
function getArticlesForSubcategory(
  content: JassContentRecord,
  categorySlug: string,
  subcategorySlug: string
): JassContentItem[] {
  return (Object.values(content) as JassContentItem[])
    .filter(item => 
      toSlug(item.metadata.category.main) === categorySlug &&
      toSlug(item.metadata.category.sub) === subcategorySlug
    )
    .sort((a, b) => {
      // Sortiere alphabetisch (nicht nach Wichtigkeit)
      return a.metadata.category.topic.localeCompare(b.metadata.category.topic, 'de');
    });
}

interface SubcategoryPageProps {
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  articles: JassContentItem[];
  isArticle?: boolean; // Wenn true, ist es ein flacher Artikel (sub === topic)
  pageTitle?: string;
  metaDescription?: string;
  canonicalPath?: string;
}

const SubcategoryPage: React.FC<SubcategoryPageProps> = ({
  category,
  categorySlug,
  subcategory,
  subcategorySlug,
  articles = [],
  isArticle = false,
  pageTitle,
  metaDescription,
  canonicalPath
}) => {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';
  const defaultPublishedDate = process.env.NEXT_PUBLIC_DEFAULT_PUBLISHED_DATE || '2023-01-01';
  const defaultModifiedDate = process.env.NEXT_PUBLIC_DEFAULT_MODIFIED_DATE || '2025-11-05';
  
  // Breadcrumbs: 2 Ebenen für Artikel, 3 Ebenen für Subkategorien
  const breadcrumbItems = isArticle
    ? [
        { name: 'Jass-Wiki', href: '/' },
        { name: category, href: `/${categorySlug}/` },
        { name: subcategory, href: `/${categorySlug}/${subcategorySlug}/` }
      ]
    : [
        { name: 'Jass-Wiki', href: '/' },
        { name: category, href: `/${categorySlug}/` },
        { name: subcategory, href: `/${categorySlug}/${subcategorySlug}/` }
      ];

  // 🔥 KRITISCH: sortedArticles MUSS VOR den useEffects definiert werden
  // useMemo verhindert unnötige Neu-Berechnungen
  const sortedArticles = useMemo(() => {
    if (!articles || articles.length === 0) return [];
    
    const sorted = [...articles];
    
    // Spezielle Sortierung für Weis-Regeln
    if (categorySlug === 'weis-regeln' && subcategorySlug === 'weis-arten') {
      sorted.sort((a, b) => {
        const getWeisOrderIndex = (name: string) => {
          const lowerName = name.toLowerCase();
          
          // Spezielle Mappings für die verschiedenen Artikel-Titel
          if (lowerName.includes('dreiblatt') || lowerName.includes('3 blatt')) return 1;
          if (lowerName.includes('vierblatt') || lowerName.includes('4 blatt')) return 2;
          if (lowerName.includes('fünfblatt') || lowerName.includes('5 blatt')) return 3;
          if (lowerName.includes('sechsblatt') || lowerName.includes('6 blatt')) return 4;
          if (lowerName.includes('siebenblatt') || lowerName.includes('7 blatt')) return 5;
          if (lowerName.includes('achtblatt') || lowerName.includes('8 blatt')) return 6;
          if (lowerName.includes('neunblatt') || lowerName.includes('9 blatt')) return 7;
          if (lowerName.includes('vier gleiche')) return 8;
          if (lowerName.includes('stöck')) return 9;
          if (lowerName.includes('reihenfolge')) return 10;
          if (lowerName.includes('schneider')) return 11;
          if (lowerName.includes('korrekturen')) return 12;
          if (lowerName.includes('zahlendarstellung')) return 13;
          if (lowerName.includes('frühzeitiges bedanken')) return 14;
          if (lowerName.includes('bedanken')) return 15;
          if (lowerName.includes('allgemeine weis') || lowerName.includes('grundregeln')) return 0;
          if (lowerName.includes('ausmachen')) return 16;
          
          // Fallback für unbekannte Artikel
          return 999;
        };

        const indexA = getWeisOrderIndex(a.metadata.category.topic);
        const indexB = getWeisOrderIndex(b.metadata.category.topic);

        // Sortiere nach Index
        if (indexA !== indexB) {
          return indexA - indexB;
        }
        
        // Falls gleicher Index, alphabetisch sortieren
        return a.metadata.category.topic.localeCompare(b.metadata.category.topic);
      });
    }
    
    return sorted;
  }, [articles, categorySlug, subcategorySlug]);

  // Scrolling für Wissensseiten aktivieren
  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => {
      document.body.classList.remove('lexikon-page');
    };
  }, []);

  // Loading State
  if (router.isFallback || !category || !subcategory) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-gray-300">Lädt...</p>
        </div>
      </div>
    );
  }

  // DUAL MODE: Artikel oder Subkategorie-Liste?
  if (isArticle && articles.length === 1) {
    // Rendere Artikel-View
    const contentItem = articles[0];
    const normalizedPath = canonicalPath!.endsWith('/') ? canonicalPath : `${canonicalPath}/`;
    const canonicalUrl = `${siteUrl}${normalizedPath}`;
    
    const articleData = {
      headline: subcategory,
      description: metaDescription!,
      authorName: 'Jasswiki Redaktion',
      publisherName: 'Jasswiki.ch',
      publisherLogoUrl: 'https://jasswiki.ch/jasswiki-logo-hero.png',
      datePublished: defaultPublishedDate,
      dateModified: defaultModifiedDate,
    };

    const showDifficulty = ['Varianten', 'Schieber', 'Weis-Regeln'].includes(category);
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
          title={pageTitle!}
          description={metaDescription!}
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
            {/* Artikel-Header */}
            <header className="text-center pb-6 border-b border-gray-600">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {subcategory}
              </h1>
              <div className="flex items-center justify-center gap-4 text-sm sm:text-base text-gray-300 flex-wrap">
                <span className="px-3 py-1 bg-green-600 text-white rounded-full font-medium">
                  {category}
                </span>
                {showDifficulty && (
                  <span className="px-3 py-1 bg-gray-700 text-gray-200 rounded-full font-medium">
                    {difficultyLabel}
                  </span>
                )}
              </div>
            </header>

            {/* Artikel-Inhalt */}
            <article className="prose prose-lg sm:prose-xl max-w-none prose-invert">
              <div className="content-formatting text-gray-200">
                <InternalLinker text={contentItem.text} />
              </div>
            </article>

            {/* Quelle */}
            {contentItem.metadata.source && (
              <div className="pt-4 text-sm text-gray-400 italic">
                Quelle: {contentItem.metadata.source}
              </div>
            )}

            {/* Navigation Footer */}
            <footer className="pt-8 border-t border-gray-600">
              <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <a 
                  href={`/${categorySlug}/`}
                  className="inline-flex items-center px-4 py-2 text-gray-300 hover:text-green-400 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Zurück zu {category}
                </a>
                
                <a 
                  href="/gpt"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-yellow-600 text-white rounded-lg hover:from-green-700 hover:to-yellow-700 transition-all font-medium text-center shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.456L3 21l2.456-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                  </svg>
                  Frage den JassWiki Chat
                </a>
              </div>
            </footer>

            {/* VERWANDTE THEMEN */}
            <RelatedTopics
              currentArticleId={contentItem.id}
              currentCategory={contentItem.metadata.category.main}
              currentKeywords={contentItem.metadata.keywords}
              maxResults={4}
            />

            {/* QUELLEN SEKTION */}
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
                      href="/referenzen"
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

            {/* APP-CTA SEKTION */}
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
  }

  // LISTE-MODE: Zeige Subkategorie-Übersicht
  const listPageTitle = `${subcategory} - ${category} | Jassguru.ch`;
  const listPageDescription = `Alle Artikel über ${subcategory} beim Jassen. ${sortedArticles.length} ${sortedArticles.length === 1 ? 'Artikel' : 'Artikel'} mit detaillierten Erklärungen und Beispielen.`;

  return (
    <>
      <SeoHead
        title={listPageTitle}
        description={listPageDescription}
      />
      
      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {subcategory}
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-2">
              {sortedArticles.length} {sortedArticles.length === 1 ? 'Artikel' : 'Artikel'} in dieser Kategorie
            </p>
            <p className="text-base text-gray-400 max-w-xl mx-auto">
              Wähle einen Artikel aus, um mehr zu erfahren
            </p>
          </div>

          {/* Artikel-Liste */}
          <div className="grid gap-4 sm:gap-5">
            {sortedArticles.map((article) => {
              const articleSlug = toSlug(article.metadata.category.topic);
              const articleUrl = `/${categorySlug}/${subcategorySlug}/${articleSlug}/`;
              
              // Extrahiere erste Zeile als Vorschau
              const preview = article.text
                .split('\n')
                .slice(0, 2)
                .join(' ')
                .substring(0, 150)
                .trim();

              return (
                <Link
                  key={article.id}
                  href={articleUrl}
                  className="group block"
                >
                  <div className="bg-gray-800 border border-gray-700 rounded-xl hover:border-green-500 hover:shadow-xl transition-all duration-300 p-5 sm:p-6 hover:scale-[1.01]">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Titel */}
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-green-400 transition-colors mb-2">
                          {article.metadata.category.topic}
                        </h3>
                        
                        {/* Vorschau */}
                        <p className="text-base text-gray-300 line-clamp-2">
                          {preview}...
                        </p>
                      </div>
                      
                      {/* Arrow */}
                      <div className="flex-shrink-0 text-green-400 group-hover:translate-x-1 transition-transform">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Zurück zur Kategorie */}
          <div className="text-center pt-8 border-t border-gray-700">
            <Link
              href={`/${categorySlug}/`}
              className="inline-flex items-center px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-600"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück zu {category}
            </Link>
          </div>
        </div>
      </LexikonLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const content: JassContentRecord = allContent;
  const items = Object.values(content) as JassContentItem[];
  
  // Sammle ZWEI Arten von Pfaden:
  // 1. Normale Subkategorien (sub !== topic)
  // 2. Flache Artikel (sub === topic) 
  const combinations = new Set<string>();
  items.forEach(item => {
    const catSlug = toSlug(item.metadata.category.main);
    const subSlug = toSlug(item.metadata.category.sub);
    const topicSlug = toSlug(item.metadata.category.topic);
    
    // Varianten überspringen (haben eigene Route /varianten/[topic])
    if (catSlug === 'varianten') {
      return;
    }
    
    // Füge ALLE Kombinationen hinzu (auch flache Artikel)
    combinations.add(`${catSlug}/${subSlug}`);
  });
  
  const paths = Array.from(combinations).map(combo => {
    const [category, subcategory] = combo.split('/');
    return {
      params: { category, subcategory }
    };
  });
  
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<SubcategoryPageProps> = async ({ params }) => {
  const categorySlug = params?.category as string;
  const subcategorySlug = params?.subcategory as string;
  
  // SPEZIALFALL: Varianten haben keine Subkategorie-Seiten mehr
  if (categorySlug === 'varianten') {
    return {
      redirect: {
        destination: '/varianten/',
        permanent: true,
      },
    };
  }
  
  const content: JassContentRecord = allContent;
  
  // Prüfe: Ist das ein flacher Artikel (sub === topic)?
  const flatArticle = (Object.values(content) as JassContentItem[]).find(
    item =>
      toSlug(item.metadata.category.main) === categorySlug &&
      toSlug(item.metadata.category.sub) === subcategorySlug &&
      toSlug(item.metadata.category.topic) === subcategorySlug
  );
  
  if (flatArticle) {
    // ARTIKEL-MODE: Zeige einzelnen Artikel
    const category = flatArticle.metadata.category.main;
    const topic = flatArticle.metadata.category.topic;
    const canonicalPath = `/${categorySlug}/${subcategorySlug}/`;
    
    // Dynamische SEO-Titel
    let pageTitle = `${topic} - ${category} | Jass-Wiki`;
    let metaDescription = `Alles über "${topic}" beim Jassen. Detailliert erklärt im Jass-Wiki der Schweiz.`;
    
    if (category === 'Geschichte') {
      pageTitle = `${topic}: Geschichte des Schweizer Jass | Jass-Wiki`;
      metaDescription = `${topic} - Die faszinierende Geschichte des Schweizer Nationalspiel Jass. Historische Fakten und kulturelle Hintergründe auf jasswiki.ch.`;
    } else if (category === 'Grundlagen & Kultur') {
      pageTitle = `${topic}: Jassen lernen & verstehen | Jass-Wiki`;
      metaDescription = `${topic} - Grundlagen und kulturelle Aspekte des Schweizer Jass. Alles Wichtige für Anfänger und Fortgeschrittene auf jasswiki.ch.`;
    }
    
    return {
      props: {
        category,
        categorySlug,
        subcategory: topic,
        subcategorySlug,
        articles: [flatArticle],
        isArticle: true,
        pageTitle,
        metaDescription,
        canonicalPath
      }
    };
  }
  
  // LISTEN-MODE: Zeige alle Artikel einer Subkategorie
  const articles = getArticlesForSubcategory(content, categorySlug, subcategorySlug);
  
  if (articles.length === 0) {
    return { notFound: true };
  }
  
  const firstArticle = articles[0];
  const category = firstArticle.metadata.category.main;
  const subcategory = firstArticle.metadata.category.sub;
  
  return {
    props: {
      category,
      categorySlug,
      subcategory,
      subcategorySlug,
      articles: articles.map(article => ({
        id: article.id,
        text: article.text.substring(0, 200),
        metadata: article.metadata
      })),
      isArticle: false
    }
  };
};

export default SubcategoryPage;