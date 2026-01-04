import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import Link from 'next/link';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import { toSlug } from '@/lib/utils';
import { SeoHead } from '@/components/layout/SeoHead';

// Funktion zur schönen Formatierung von Topic-Namen
const formatTopicName = (name: string): string => {
  return name
    .replace(/ACHTBLATT/g, 'Achtblatt')
    .replace(/NEUNBLATT/g, 'Neunblatt')
    .replace(/DREIBLATT/g, 'Dreiblatt')
    .replace(/VIERBLATT/g, 'Vierblatt')
    .replace(/FUENFBLATT/g, 'Fünfblatt')
    .replace(/SECHSBLATT/g, 'Sechsblatt')
    .replace(/SIEBENBLATT/g, 'Siebenblatt')
    .replace(/VIER_GLEICHE/g, 'Vier gleiche')
    .replace(/GRUNDREGELN/g, 'Grundregeln')
    .replace(/REIHENFOLGE/g, 'Reihenfolge')
    .replace(/SCHNEIDER/g, 'Schneider')
    .replace(/KORREKTUREN/g, 'Korrekturen')
    .replace(/ZAHLENDARSTELLUNG/g, 'Zahlendarstellung')
    .replace(/FRUEHZEITIGES_BEDANKEN/g, 'Frühzeitiges Bedanken')
    .replace(/BEDANKEN/g, 'Bedanken')
    .replace(/STOECK/g, 'Stöck');
};

// Helper to get subcategories for a specific category
const getSubcategoriesForCategory = (content: JassContentRecord, categorySlug: string): Array<{name: string, slug: string, count: number}> => {
  const subcategories = new Map<string, number>();
  
  (Object.values(content) as JassContentItem[]).forEach(item => {
    if (toSlug(item.metadata.category.main) === categorySlug) {
      const subName = item.metadata.category.sub;
      subcategories.set(subName, (subcategories.get(subName) || 0) + 1);
    }
  });
  
  return Array.from(subcategories.entries())
    .map(([name, count]) => ({
      name,
      slug: toSlug(name),
      count
    }))
    .sort((a, b) => a.name.localeCompare(b.name, 'de'));
};

// Helper to get all articles for a category (for flat structure like Varianten)
const getArticlesForCategory = (content: JassContentRecord, categorySlug: string): JassContentItem[] => {
  return (Object.values(content) as JassContentItem[])
    .filter(item => toSlug(item.metadata.category.main) === categorySlug)
    .sort((a, b) => a.metadata.category.topic.localeCompare(b.metadata.category.topic, 'de'));
};

// Helper to deslugify
const deslugify = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

interface CategoryPageProps {
  category: string;
  categorySlug: string;
  subcategories: Array<{name: string, slug: string, count: number}>;
  articles?: JassContentItem[]; // For flat structure (Varianten)
  isFlat?: boolean; // True for Varianten
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, categorySlug, subcategories = [], articles = [], isFlat = false }) => {
  const router = useRouter();
  const breadcrumbItems = [
    { name: 'Jass-Wiki', href: '/' },
    { name: category, href: `/${categorySlug}/` }
  ];

  // Enable scrolling for knowledge pages
  useEffect(() => {
    // Add class to enable scrolling
    document.body.classList.add('lexikon-page');
    
    // Cleanup: Remove class when component unmounts
    return () => {
      document.body.classList.remove('lexikon-page');
    };
  }, []);

  // If router is not ready yet or no data
  if (router.isFallback || !category || (!isFlat && subcategories.length === 0) || (isFlat && articles.length === 0)) {
    return <div>Lade...</div>;
  }

  // SEO-optimierte Descriptions pro Kategorie
  const categoryDescriptions: Record<string, string> = {
    'Geschichte': 'Entdecke die faszinierende Geschichte des Schweizer Jass: Von mittelalterlichen Ursprüngen bis zur modernen Kulturikone. Erfahre alles über die Entwicklung des Nationalspiel.',
    'Grundlagen & Kultur': 'Lerne die Grundlagen des Jassens: Kartenwerte, Spielablauf, Verteilmethoden und die kulturelle Bedeutung des Schweizer Nationalspiel.',
    'Weis-Regeln': 'Meistere die Weis-Regeln: Dreiblatt, Vierblatt, Stöck und mehr. Alle offiziellen Weis-Kategorien und Punktewertungen verständlich erklärt.',
    'Schieber': 'Werde zum Schieber-Profi: Taktiken, Konventionen und Strategien für die beliebteste Jassvariante der Schweiz.',
    'Begriffe': 'Das komplette Jass-ABC: Von Ablupf bis Weis - alle Fachbegriffe des Schweizer Jass verständlich erklärt.',
    'Varianten': 'Entdecke die Vielfalt: Coiffeur, Differenzler, Molotov und über 40 weitere Jass-Varianten im Detail erklärt.',
    'Regeln': 'Alle offiziellen Jass-Regeln: Bergpreis, Matsch, Ausmacharegel und Sonderregeln - klar strukturiert und verständlich.',
    'Referenzen': 'Quellen, Literatur und Expertenwissen: Die wissenschaftliche Grundlage unseres Jass-Portals.'
  };

  const categoryTitles: Record<string, string> = {
    'Regeln': 'Alle Jassregeln im Detail: Offizielles Regelwerk & Sonderfälle | Jass-Wiki',
    'Weis-Regeln': 'Jassregeln zum Weisen: Alle Weispunkte, Stöck & Bock erklärt | Jass-Wiki',
    'Schieber': 'Jassregeln für Schieber: Taktiken & Strategien erklärt | Jass-Wiki',
  };
  const seoTitle = categoryTitles[category] || `${category} | Das Schweizer Jass-Wiki`;
  const seoDescription = categoryDescriptions[category] || `Alle Jass-Artikel in der Kategorie ${category} im Jass-Wiki. Entdecke Regeln, Begriffe und Varianten.`;

  return (
    <LexikonLayout breadcrumbItems={breadcrumbItems}>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
      />
      <div className="space-y-6 sm:space-y-8">
        {/* Category Header */}
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {categorySlug === 'regeln' ? 'Jassregeln' : category}
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {isFlat 
              ? `${articles.length} ${articles.length === 1 ? 'Variante' : 'Varianten'} alphabetisch sortiert`
              : `${subcategories.length} ${subcategories.length === 1 ? 'Themenbereich' : 'Themenbereiche'} mit insgesamt ${subcategories.reduce((sum, sub) => sum + sub.count, 0)} Artikeln`
            }
          </p>
        </div>
        
        {/* FLAT STRUCTURE: Direkt alle Artikel (für Varianten) */}
        {isFlat && articles.length > 0 && (
          <>
            {/* Alphabetische Sprungmarken */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {Array.from(new Set(articles.map(a => a.metadata.category.topic.charAt(0).toUpperCase()))).sort().map(letter => (
                <a
                  key={letter}
                  href={`#letter-${letter}`}
                  className="px-3 py-1 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 hover:text-white transition-colors text-sm font-medium"
                >
                  {letter}
                </a>
              ))}
            </div>

            {/* Artikel-Liste alphabetisch */}
            <div className="grid gap-4 sm:gap-5">
              {articles.map((article, index) => {
                const articleSlug = toSlug(article.metadata.category.topic);
                const articleUrl = `/${categorySlug}/${articleSlug}/`;
                const firstLetter = article.metadata.category.topic.charAt(0).toUpperCase();
                const showLetter = index === 0 || articles[index - 1].metadata.category.topic.charAt(0).toUpperCase() !== firstLetter;
                
                const preview = article.text
                  .split('\n')
                  .slice(0, 2)
                  .join(' ')
                  .substring(0, 150)
                  .trim();

                // Extrahiere Subkategorie als Tag
                const subcategoryTag = article.metadata.category.sub;

                return (
                  <React.Fragment key={article.id}>
                    {showLetter && (
                      <h2 id={`letter-${firstLetter}`} className="text-2xl font-bold text-white mt-6 mb-2 pt-4 border-t border-gray-700">
                        {firstLetter}
                      </h2>
                    )}
                    <Link href={articleUrl} className="group block">
                      <div className="bg-gray-800 border border-gray-700 rounded-xl hover:border-green-500 hover:shadow-xl transition-all duration-300 p-5 sm:p-6 hover:scale-[1.01]">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                                {article.metadata.category.topic}
                              </h3>
                              {subcategoryTag && (
                                <span className="px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
                                  {subcategoryTag}
                                </span>
                              )}
                            </div>
                            <p className="text-base text-gray-300 line-clamp-2">
                              {preview}...
                            </p>
                          </div>
                          <div className="flex-shrink-0 text-green-400 group-hover:translate-x-1 transition-transform">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </React.Fragment>
                );
              })}
            </div>
          </>
        )}

        {/* NORMAL STRUCTURE: Subkategorien (für andere Kategorien) */}
        {!isFlat && subcategories.length > 0 && (
          <div className="grid gap-4 sm:gap-6">
            {subcategories.map((subcategory) => (
              <Link 
                key={subcategory.slug}
                href={`/${categorySlug}/${subcategory.slug}/`}
                className="group block"
              >
                <div className="bg-gray-800 border border-gray-700 rounded-xl hover:border-green-500 hover:shadow-xl transition-all duration-300 p-6 sm:p-8 hover:scale-[1.02]">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                          {subcategory.name}
                        </h3>
                        <span className="px-2 py-1 bg-green-600 text-white rounded-full text-xs font-medium">
                          {subcategory.count} {subcategory.count === 1 ? 'Artikel' : 'Artikel'}
                        </span>
                      </div>
                      <p className="text-base sm:text-lg text-gray-300">
                        Alle Artikel über {subcategory.name} im Detail
                      </p>
                    </div>
                    <div className="ml-4 text-green-400 group-hover:translate-x-1 transition-transform">
                      <svg className="w-6 h-6 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Back to Overview Link */}
        <div className="text-center pt-8 border-t border-gray-700">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-700 text-gray-200 rounded-lg hover:bg-gray-600 hover:text-white transition-colors font-medium border border-gray-600"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück zur Übersicht
          </Link>
        </div>
      </div>
    </LexikonLayout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories = new Set<string>();
  
  (Object.values(allContent) as JassContentItem[]).forEach(item => {
    categories.add(toSlug(item.metadata.category.main));
  });
  
  // Filter out 'referenzen' and 'schieber' because they have their own static pages
  const paths = Array.from(categories)
    .filter(category => category !== 'referenzen' && category !== 'schieber')
    .map(category => ({
      params: { category }
    }));
  
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<CategoryPageProps> = async ({ params }) => {
  const categorySlug = params?.category as string;
  
  // Find the actual category name from the content
  let categoryName = '';
  (Object.values(allContent) as JassContentItem[]).some(item => {
    if (toSlug(item.metadata.category.main) === categorySlug) {
      categoryName = item.metadata.category.main;
      return true;
    }
    return false;
  });
  
  if (!categoryName) {
    return { notFound: true };
  }
  
  // Spezialfall: Varianten haben flache Struktur (keine Subkategorien)
  const isVarianten = categorySlug === 'varianten';
  
  if (isVarianten) {
    const articles = getArticlesForCategory(allContent, categorySlug);
    return {
      props: {
        category: categoryName,
        categorySlug,
        subcategories: [],
        articles: articles.map(article => ({
          id: article.id,
          text: article.text.substring(0, 200),
          metadata: article.metadata
        })),
        isFlat: true
      }
    };
  }
  
  const subcategories = getSubcategoriesForCategory(allContent, categorySlug);
  
  return {
    props: {
      category: categoryName,
      categorySlug,
      subcategories,
      isFlat: false
    }
  };
};

export default CategoryPage; 