import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import Link from 'next/link';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import { toSlug } from '@/lib/utils';
import { buildArticleUrl } from '@/lib/url-utils';
import { ohneKartenMarken } from '@/components/wissen/kartenMarke';
import { SeoHead } from '@/components/layout/SeoHead';

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

// Bereinigt Artikel-Text zu einer kurzen, maschinenlesbaren Definition (löst
// (siehe Begriff "id")-Marker auf, entfernt Bullets/Labels, kürzt sauber).
function cleanGlossaryDescription(text: string): string {
  let t = ohneKartenMarken(String(text || ''));
  // Eng gefasst (ohne Zeilenumbruch, ohne Klammern, höchstens 80 Zeichen):
  // die Artikel-IDs stehen selbst in Anführungszeichen, ein weiter Ausdruck
  // verschluckt sonst halbe Absätze.
  t = t.replace(/[«"]([^»"\n()]{1,80})[»"]\s*\(siehe Begriff\s+"[^"]+"\)/gi, '$1');
  t = t.replace(/([A-Za-zÄÖÜäöüß][\wÄÖÜäöüß-]*)\s*\(siehe Begriff\s+"[^"]+"\)/gi, '$1');
  t = t.replace(/\s*\(siehe Begriff\s+"[^"]+"\)/gi, '');
  t = t.replace(/\b(Definition|Synonyme|Entstehung|Verwendung|Bedeutung|Beispiel|Beispiele)\s*:/gi, ' ');
  t = t.replace(/[••]/g, ' ').replace(/\s+/g, ' ').trim();
  if (t.length > 260) t = t.slice(0, 260).replace(/\s+\S*$/, '') + '…';
  return t;
}

// schema.org DefinedTermSet — maschinenlesbares Jass-Glossar, nur auf /begriffe/.
function buildDefinedTermSet(content: JassContentRecord, categorySlug: string) {
  if (categorySlug !== 'begriffe') return null;
  const SITE = 'https://jasswiki.ch';
  const terms = (Object.values(content) as JassContentItem[])
    .filter((item) => toSlug(item.metadata.category.main) === 'begriffe')
    .sort((a, b) => a.metadata.category.topic.localeCompare(b.metadata.category.topic, 'de'));
  return {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    '@id': `${SITE}/begriffe/`,
    name: 'JassWiki Glossar: Schweizer Jass-Fachbegriffe',
    description:
      'Maschinenlesbares Glossar der Schweizer Jass-Fachbegriffe, herausgegeben vom Jassverband Schweiz (JVS).',
    inLanguage: 'de-CH',
    hasDefinedTerm: terms.map((item) => {
      const url = `${SITE}${buildArticleUrl(item.metadata.category)}`;
      return {
        '@type': 'DefinedTerm',
        '@id': url,
        name: item.metadata.category.topic,
        description: cleanGlossaryDescription(item.text),
        url,
        inDefinedTermSet: `${SITE}/begriffe/`,
      };
    }),
  };
}

// Natürliche Einstiegsfragen pro Kategorie-Landing — sichtbar + als FAQPage-Schema.
// Erdet die häufigsten Suchanfragen ("jassregeln", "weis", "varianten") auf den
// top-zitierten Übersichtsseiten, die bisher kein FAQ hatten. Alle Antworten sind
// in den bestehenden Artikeln verankert (keine neuen Mechaniken).
const CATEGORY_FAQS: Record<string, { question: string; answer: string }[]> = {
  regeln: [
    { question: 'Was sind die Jassregeln?', answer: 'Gespielt wird mit 36 Karten. Man muss die angespielte Farbe bedienen; hat man sie nicht, darf man trumpfen oder eine beliebige Karte abwerfen. Den Stich gewinnt die höchste Trumpfkarte – ohne Trumpf die höchste Karte der angespielten Farbe –, und wer gewinnt, spielt zum nächsten Stich aus. Pro Runde sind 157 Punkte zu vergeben: 152 Kartenpunkte und 5 für den letzten Stich.' },
    { question: 'Wie viele Punkte hat eine Jassrunde?', answer: 'Genau 157 Punkte: 152 aus den Karten plus 5 Bonuspunkte für den letzten Stich.' },
    { question: 'Muss man beim Jassen Farbe bedienen?', answer: 'Ja. Wer die angespielte Farbe auf der Hand hat, muss sie spielen. Nur wer sie nicht hat, darf trumpfen oder eine andere Karte abwerfen.' },
    { question: 'Was sind die Kartenwerte beim Jassen?', answer: 'Ohne Trumpf: Ass 11, Banner (Zehner) 10, König 4, Ober 3, Under 2 Punkte; Sechser bis Neuner zählen null. In der Trumpffarbe wird der Under zum Puur (20 Punkte) und der Neuner zum Nell (14 Punkte).' },
  ],
  'weis-regeln': [
    { question: 'Was ist ein Weis beim Jassen?', answer: 'Ein Weis ist eine Kartenkombination – mindestens drei aufeinanderfolgende Karten gleicher Farbe oder vier gleiche Karten –, die vor dem ersten Stich angesagt wird und Bonuspunkte bringt.' },
    { question: 'Wie viele Punkte gibt ein Weis?', answer: 'Ein Dreiblatt gibt 20 Punkte, ein Vierblatt 50, ein Fünfblatt 100. Vier gleiche Karten zählen 100 bis 200 Punkte. Die Stöck (König und Ober der Trumpffarbe) zählen 20 Punkte.' },
    { question: 'Wer darf den Weis schreiben?', answer: 'Es zählt nur der höchste Weis am Tisch: Das Team mit dem höchsten Weis darf alle seine Weise schreiben, das gegnerische Team keine.' },
  ],
  varianten: [
    { question: 'Welche Jass-Varianten gibt es?', answer: 'Über 40, darunter Schieber (die beliebteste), Coiffeur, Differenzler, Molotow, Pandur, Sidi Barrani, Bieter, Guggitaler und Tschau Sepp.' },
    { question: 'Was ist die beliebteste Jass-Variante?', answer: 'Der Schieber – vier Personen in zwei Teams, bei dem man die Trumpffarbe wählt oder die Wahl an den Partner schiebt.' },
  ],
  geschichte: [
    { question: 'Woher kommt das Jassen?', answer: 'Das Jassen gelangte Ende des 18. Jahrhunderts aus den Niederlanden über Söldner in die Schweiz; die erste Erwähnung stammt von 1796. Im 20. Jahrhundert wurde es – unter anderem durch den Samschtig-Jass – zum Nationalspiel.' },
  ],
  'grundlagen-kultur': [
    { question: 'Wie geht Jassen?', answer: 'Vier Personen bilden zwei Teams und erhalten je 9 der 36 Karten. Eine Farbe wird zum Trumpf bestimmt. Reihum spielt jede Person eine Karte aus und muss die angespielte Farbe bedienen. Den Stich gewinnt die höchste Trumpfkarte – ohne Trumpf die höchste Karte der angespielten Farbe. Gezählt werden die Kartenpunkte der gewonnenen Stiche, 157 pro Runde.' },
    { question: 'Ist Jassen ein Schweizer Kulturgut?', answer: 'Ja, das Bundesamt für Kultur (BAK) führt das Jassen als lebendige Tradition der Schweiz.' },
  ],
};

function buildCategoryFaqJsonLd(faqs: { question: string; answer: string }[] | null) {
  if (!faqs || faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

interface CategoryPageProps {
  category: string;
  categorySlug: string;
  subcategories: Array<{name: string, slug: string, count: number}>;
  articles?: JassContentItem[]; // For flat structure (Varianten)
  isFlat?: boolean; // True for Varianten
  definedTermSet?: Record<string, unknown> | null; // schema.org DefinedTermSet (nur /begriffe/)
  categoryFaqs?: { question: string; answer: string }[] | null; // Kategorie-FAQ (sichtbar + FAQPage)
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, categorySlug, subcategories = [], articles = [], isFlat = false, definedTermSet = null, categoryFaqs = null }) => {
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
      {definedTermSet && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermSet) }}
        />
      )}
      {categoryFaqs && categoryFaqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildCategoryFaqJsonLd(categoryFaqs)) }}
        />
      )}
      <div className="space-y-6 sm:space-y-8">
        {/* Category Header */}
        <div>
          <h1 className="font-capita text-[28px] sm:text-[36px] font-bold text-[#ff0000] mb-[8px] leading-[1.14]">
            {categorySlug === 'regeln' ? 'Jassregeln' : category}
          </h1>
          <p className="font-inter text-[14px] sm:text-[16px] text-black leading-[1.5]">
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
                  className="px-3 py-1 bg-[#f0eee7] text-[#88816d] rounded-lg hover:bg-[#e8e6df] hover:text-black transition-colors text-sm font-medium"
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
                
                const preview = ohneKartenMarken(article.text)
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
                      <h2 id={`letter-${firstLetter}`} className="text-2xl font-bold text-[#ff0000] mt-6 mb-2 pt-4 border-t border-[#f0eee7]">
                        {firstLetter}
                      </h2>
                    )}
                    <Link href={articleUrl} className="group block">
                      <div className="bg-[#f0eee7]/50 border border-[#e8e6df] rounded-[12px] hover:border-[#d5d0c6] hover:bg-[#f0eee7] transition-colors p-[14px] sm:p-[16px]">
                        <div className="flex items-start gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-[6px]">
                              <h3 className="font-capita text-[17px] sm:text-[19px] font-bold text-black group-hover:text-[#ff0000] transition-colors leading-[1.3]">
                                {article.metadata.category.topic}
                              </h3>
                              {subcategoryTag && (
                                <span className="px-2 py-[2px] bg-[#274823]/10 text-[#274823] text-[11px] font-inter font-medium tracking-wide uppercase rounded-full flex-shrink-0">
                                  {subcategoryTag}
                                </span>
                              )}
                            </div>
                            <p className="font-inter text-[13px] text-[#88816d] line-clamp-2 leading-[1.5]">
                              {preview}...
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
                <div className="bg-[#f0eee7]/50 border border-[#e8e6df] rounded-[12px] hover:border-[#d5d0c6] hover:bg-[#f0eee7] transition-colors px-[14px] sm:px-[20px] py-[14px] sm:py-[16px]">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-[12px] mb-[6px]">
                        <h3 className="font-capita text-[17px] sm:text-[19px] font-bold text-black group-hover:text-[#ff0000] transition-colors leading-[1.3] pr-2">
                          {subcategory.name}
                        </h3>
                        <span className="jw-count-tag flex-shrink-0 self-start">
                          {subcategory.count} Artikel
                        </span>
                      </div>
                      <p className="font-inter text-[13px] text-[#88816d] leading-[1.5]">
                        Alle Artikel über {subcategory.name} im Detail
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
        )}

        {/* Häufige Fragen (FAQ) — sichtbar, ergänzt das FAQPage-Schema */}
        {categoryFaqs && categoryFaqs.length > 0 && (
          <div className="pt-8 border-t border-[#f0eee7]">
            <h2 className="font-capita text-[22px] sm:text-[28px] font-bold text-black mb-[16px] leading-[1.2]">
              Häufige Fragen
            </h2>
            <div className="space-y-[16px]">
              {categoryFaqs.map((faq, i) => (
                <div key={i}>
                  <h3 className="font-capita text-[16px] sm:text-[18px] font-bold text-black mb-[4px] leading-[1.3]">
                    {faq.question}
                  </h3>
                  <p className="font-inter text-[14px] sm:text-[16px] text-[#88816d] leading-[1.5]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Overview Link */}
        <div className="text-center pt-8 border-t border-[#f0eee7]">
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#f0eee7] text-black rounded-lg hover:bg-[#e8e6df] hover:text-black transition-colors font-medium border border-[#f0eee7]"
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
  
  // Filter out 'referenzen', 'schieber' and 'taktiken-und-strategien' because they have their own static pages
  const paths = Array.from(categories)
    .filter(category => category !== 'referenzen' && category !== 'schieber' && category !== 'taktiken-und-strategien' && category !== 'ansagen')
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
  
  const categoryFaqs = CATEGORY_FAQS[categorySlug] || null;

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
        isFlat: true,
        categoryFaqs
      }
    };
  }
  
  const subcategories = getSubcategoriesForCategory(allContent, categorySlug);
  const definedTermSet = buildDefinedTermSet(allContent, categorySlug);

  return {
    props: {
      category: categoryName,
      categorySlug,
      subcategories,
      isFlat: false,
      definedTermSet,
      categoryFaqs
    }
  };
};

export default CategoryPage; 