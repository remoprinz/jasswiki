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
import { JassCardGrid } from '@/components/wissen/JassCardGrid';
import { JsonLdSchema } from '@/components/seo/JsonLdSchema';
import Head from 'next/head';
import { RelatedTopics } from '@/components/wissen/RelatedTopics';
import { FaqJsonLdSchema } from '@/components/seo/FaqJsonLdSchema';
import { FaqSection } from '@/components/wissen/FaqSection';
import { ohneKartenMarken } from '@/components/wissen/kartenMarke';


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

// Optionale Einleitungstexte für Subkategorie-Übersichten (gegen Thin-Content + Kontext
// für Nutzer und Crawler). Schlüssel = Anzeigename der Subkategorie.
const SUB_INTROS: Record<string, string[]> = {
  'Fehler & Verstösse': [
    'Beim Jassen geht nicht immer alles glatt. Eine Karte rutscht aus der Hand, jemand spielt aus, obwohl er nicht an der Reihe ist, es wird nicht gefarbt oder am Tisch fällt eine Bemerkung, die dem Partner mehr verrät als erlaubt. Für solche Fälle braucht es klare Regeln, damit eine Partie fair bleibt und nicht in endlosen Diskussionen endet.',
    'Hier sind die häufigsten Fehler und Verstösse gesammelt: vom versehentlichen Missgeschick wie einer heruntergefallenen Karte bis zum bewussten Regelbruch wie dem Spielverrat. Jeder Artikel beschreibt, was gilt, wer entscheidet und was die Konsequenz eines Regelverstosses ist.',
  ],
};

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
      <div className="min-h-screen bg-white text-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#274823] mx-auto mb-4"></div>
          <p className="text-black">Lädt...</p>
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

    // Leitartikel «Jasskarten»: Karten-Raster zwischen Beschreibung und Geschichte
    // einschieben (Split an der Geschichts-Überschrift, kein künstlicher Marker im Text).
    const isKartenfarben = contentItem.id === 'expressions_kartenfarben';
    const GRID_ANCHOR = 'Das abgebildete Kartenbild';
    const [cardTextBefore, cardTextAfter] =
      isKartenfarben && contentItem.text.includes(GRID_ANCHOR)
        ? (() => {
            const i = contentItem.text.indexOf(GRID_ANCHOR);
            return [contentItem.text.slice(0, i), contentItem.text.slice(i)];
          })()
        : [contentItem.text, ''];

    // Sub-Leitartikel (flacher Artikel, dessen Subkategorie weitere Artikel hat):
    // die Geschwister als Karten unter dem Inhalt zeigen (Hub-Charakter wie /ansagen/).
    const siblings = (Object.values(allContent as JassContentRecord) as JassContentItem[])
      .filter(
        (a) =>
          a.id !== contentItem.id &&
          toSlug(a.metadata.category.main) === categorySlug &&
          toSlug(a.metadata.category.sub) === subcategorySlug
      )
      .sort((a, b) => a.metadata.category.topic.localeCompare(b.metadata.category.topic, 'de'));

    // «Jass-Elo»: eigene Autorschaft (Remo Prinz), TechArticle-Typ + Quellen als citation.
    const isJassElo = contentItem.id === 'jass_elo_meta';
    const articleData = {
      headline: subcategory,
      description: metaDescription!,
      authorName: isJassElo ? 'Remo Prinz' : 'Jasswiki Redaktion',
      publisherName: 'Jasswiki.ch',
      publisherLogoUrl: 'https://jasswiki.ch/jasswiki-logo-hero-v2.png',
      datePublished: contentItem.metadata.datePublished,
      dateModified: contentItem.metadata.dateModified,
      ...(isJassElo
        ? {
            articleType: 'TechArticle',
            citations: [
              'Elo-Zahl – Wikipedia',
              'FIDE Handbook: Rating Regulations (2023)',
              'Arpad E. Elo (1978): The Rating of Chessplayers, Past and Present. Arco Publishing.',
              'Mark E. Glickman (1999): Parameter estimation in large dynamic paired comparison experiments. Journal of the Royal Statistical Society, Series C, 48(3), 377–394.',
              'Mark E. Glickman (1995): The Glicko System. Boston University.',
            ],
          }
        : {}),
    };

    const showDifficulty = ['Varianten', 'Schieber', 'Weis-Regeln'].includes(category);
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
            <header className="text-left pb-6 border-b border-[#f0eee7]">
              <div className="jw-article-tags mb-[10px]">
                <span className="jw-article-tag" style={getTagStyle(category, '#00aa2f')}>
                  {category}
                </span>
                {showDifficulty && (
                  <span className="jw-article-tag" style={getTagStyle('difficulty', '#2563eb')}>
                    {difficultyLabel}
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff0000] mb-4 leading-tight">
                {subcategory}
              </h1>
            </header>

            {/* Artikel-Inhalt */}
            <article className="content-formatting max-w-none">
              <div className="content-formatting text-black">
                <InternalLinker text={cardTextBefore} />
              </div>
              {isKartenfarben && <JassCardGrid />}
              {isKartenfarben && cardTextAfter && (
                <div className="content-formatting text-black">
                  <InternalLinker text={cardTextAfter} />
                </div>
              )}
            </article>

            {/* Sub-Leitartikel: Artikel des Bereichs als Karten */}
            {siblings.length > 0 && (
              <section className="border-t border-[#f0eee7] pt-8">
                <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[16px] leading-[1.2]">
                  Artikel in diesem Bereich
                </h2>
                <div className="grid gap-4 sm:gap-5">
                  {siblings.map((article) => {
                    const articleSlug = toSlug(article.metadata.category.topic);
                    const articleUrl = `/${categorySlug}/${subcategorySlug}/${articleSlug}/`;
                    const preview = ohneKartenMarken(article.text).split('\n').slice(0, 2).join(' ').substring(0, 150).trim();
                    return (
                      <Link key={article.id} href={articleUrl} className="group block">
                        <div className="bg-[#f0eee7]/50 border border-[#e8e6df] rounded-[12px] hover:border-[#d5d0c6] hover:bg-[#f0eee7] transition-colors px-[14px] sm:px-[16px] py-[12px] sm:py-[14px]">
                          <div className="flex items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-capita text-[17px] sm:text-[19px] font-bold text-black group-hover:text-[#ff0000] transition-colors leading-[1.3] mb-[6px]">
                                {article.metadata.category.topic}
                              </h3>
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
                    );
                  })}
                </div>
              </section>
            )}

            {/* FAQ-Sektion – sichtbar für User und Crawler */}
            {contentItem.faqs && contentItem.faqs.length > 0 && (
              <FaqSection
                faqs={contentItem.faqs}
                title={`Häufige Fragen zu ${subcategory}`}
              />
            )}

            {/* Chat-Prompt — Penpot: Inter 14px, zentriert, #88816d, Link rot+underline */}
            <div className="text-center py-[16px]">
              <p className="font-inter text-[14px] font-normal text-[#88816d] leading-[1.4286]">
                Hast du weitere Fragen? Nutze unseren{' '}
                <Link href="/gpt/" className="text-[#ff0000] underline">JassWiki Chat</Link>.
              </p>
            </div>

            {/* VERWANDTE THEMEN */}
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
  }

  // LISTE-MODE: Zeige Subkategorie-Übersicht
  const subIntro = SUB_INTROS[subcategory];
  const listPageTitle = `${subcategory} - ${category} | Jass-Wiki`;
  const listPageDescription = subIntro
    ? subIntro[0].slice(0, 155)
    : `Alle Artikel über ${subcategory} beim Jassen. ${sortedArticles.length} ${sortedArticles.length === 1 ? 'Artikel' : 'Artikel'} mit detaillierten Erklärungen und Beispielen.`;

  return (
    <>
      <SeoHead
        title={listPageTitle}
        description={listPageDescription}
      />
      
      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <div className="space-y-6 sm:space-y-8">
          {/* Header */}
          <div>
            <h1 className="font-capita text-[28px] sm:text-[36px] font-bold text-[#ff0000] mb-[8px] leading-[1.14]">
              {subcategory}
            </h1>
            <p className="font-inter text-[14px] sm:text-[16px] text-black leading-[1.5]">
              {sortedArticles.length} {sortedArticles.length === 1 ? 'Artikel' : 'Artikel'} in dieser Kategorie
            </p>
            {subIntro && (
              <div className="mt-4 space-y-3 font-inter text-[14px] sm:text-[16px] text-[#5f5b53] leading-[1.7]">
                {subIntro.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </div>

          {/* Artikel-Liste */}
          <div className="grid gap-4 sm:gap-5">
            {sortedArticles.map((article) => {
              const articleSlug = toSlug(article.metadata.category.topic);
              const articleUrl = `/${categorySlug}/${subcategorySlug}/${articleSlug}/`;
              
              // Extrahiere erste Zeile als Vorschau
              const preview = ohneKartenMarken(article.text)
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
                  <div className="bg-[#f0eee7]/50 border border-[#e8e6df] rounded-[12px] hover:border-[#d5d0c6] hover:bg-[#f0eee7] transition-colors px-[14px] sm:px-[16px] py-[12px] sm:py-[14px]">
                    <div className="flex items-start gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-capita text-[17px] sm:text-[19px] font-bold text-black group-hover:text-[#ff0000] transition-colors leading-[1.3] mb-[6px]">
                          {article.metadata.category.topic}
                        </h3>
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
              );
            })}
          </div>

          {/* Zurück zur Kategorie */}
          <div className="text-center pt-8 border-t border-[#f0eee7]">
            <Link
              href={`/${categorySlug}/`}
              className="inline-flex items-center px-6 py-3 bg-[#f0eee7] text-black rounded-lg hover:bg-[#e8e6df] hover:text-black transition-colors font-medium border border-[#f0eee7]"
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
    
    if (catSlug === 'varianten' || catSlug === 'ansagen') {
      return;
    }
    
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

    // Leitartikel «Jasskarten»: eigener, starker SEO-Titel statt des generischen Schemas.
    if (flatArticle.id === 'expressions_kartenfarben') {
      pageTitle = 'Jasskarten: Schweizer Spielkarten beider Kartensysteme | Jass-Wiki';
      metaDescription =
        'Alle 36 Jasskarten beider Schweizer Kartensysteme: Deutschschweizer (Eichel, Rosen, Schellen, Schilten) und französische (Schaufel, Kreuz, Herz, Ecke). Mit allen Karten in der Übersicht, der Farb-Zuordnung und der Geschichte des Schweizer Kartenbilds.';
    }

    // Leitartikel «Kommunikation & Signale»: die Signalsprache zwischen Partnern.
    if (flatArticle.id === 'schieber_taktiken_advanced') {
      pageTitle = 'Signalsprache beim Jassen: die Konventionen zwischen Partnern | Jass-Wiki';
      metaDescription =
        'Wie sich Jass-Partner ohne Worte verständigen: Anziehen, Verwerfen, Hoch-tief, Nell vor Puur und Nachschmeissen. Die wichtigsten Signale und Konventionen zwischen Partnern, erklärt vom Schweizer Jassverband.';
    }

    // «Jass-Elo»: das Rating-System zur Spielstärke-Messung im Schieber.
    if (flatArticle.id === 'jass_elo_meta') {
      pageTitle = 'Jass-Elo: das Rating-System für die Spielstärke im Schieber | Jass-Wiki';
      metaDescription =
        'Jass-Elo misst die individuelle Spielstärke im Schieber partnerneutral und unabhängig vom Gegner: Erwartungswert, Strichdifferenz, K-Faktor, die vollständigen Formeln und die Rating-Tiers. Entwickelt vom Jassverband Schweiz.';
    }

    // Die Inhaltsdatei hat das letzte Wort: steht dort ein eigener Suchergebnis-Text,
    // gilt er vor der Vorlage dieser Seite.
    if (flatArticle.metadata.seoTitle) {
      pageTitle = flatArticle.metadata.seoTitle;
    }
    if (flatArticle.metadata.seoDescription) {
      metaDescription = flatArticle.metadata.seoDescription;
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