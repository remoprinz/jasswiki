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
import { SeeAlsoSection } from '@/components/wissen/SeeAlsoSection';
import { FaqJsonLdSchema } from '@/components/seo/FaqJsonLdSchema';
import { FaqSection } from '@/components/wissen/FaqSection';


interface JassWissenPageProps {
  contentItem: JassContentItem;
  category: string;
  categorySlug: string;
  subcategory: string;
  subcategorySlug: string;
  topic: string;
  topicSlug: string;
  pageTitle: string;
  metaDescription: string;
  canonicalPath: string;
}

const JassWissenPage: NextPage<JassWissenPageProps> = ({
  contentItem,
  category,
  categorySlug,
  subcategory,
  subcategorySlug,
  topic,
  pageTitle,
  metaDescription,
  canonicalPath,
}) => {
  const router = useRouter();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';
  const normalizedPath = canonicalPath.endsWith('/') ? canonicalPath : `${canonicalPath}/`;
  const canonicalUrl = `${siteUrl}${normalizedPath}`;
  const defaultPublishedDate = process.env.NEXT_PUBLIC_DEFAULT_PUBLISHED_DATE || '2023-01-01';
  const defaultModifiedDate = process.env.NEXT_PUBLIC_DEFAULT_MODIFIED_DATE || '2025-11-05';

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

  const breadcrumbItems = [
    { name: 'Jass-Wiki', href: '/' },
    { name: category, href: `/${categorySlug}/` },
    { name: subcategory, href: `/${categorySlug}/${subcategorySlug}/` },
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

  // Schwierigkeitsgrad visualisieren (nur bei relevanten Kategorien)
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
          {/* Artikel-Header */}
          <header className="text-left pb-6 border-b border-[#f0eee7]">
            <div className="jw-article-tags mb-[10px]">
              <span className="jw-article-tag" style={getTagStyle(subcategory, '#ff0000')}>
                {subcategory}
              </span>
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
              {topic}
            </h1>
          </header>

          {/* Artikel-Inhalt */}
          <article className="content-formatting max-w-none">
            <div className="content-formatting text-black">
              <InternalLinker text={contentItem.text} />
            </div>
          </article>

          {/* FAQ-Sektion - Sichtbar für User und Crawler */}
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

          {/* SIEHE AUCH - Explizite Empfehlungen */}
          {contentItem.see_also && contentItem.see_also.length > 0 && (
            <SeeAlsoSection 
              seeAlsoIds={contentItem.see_also}
              currentArticleId={contentItem.id}
            />
          )}

          {/* VERWANDTE THEMEN - Automatische Vorschläge */}
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
  
  // Generiere Pfade NUR für echte 3-Ebenen-Artikel (sub !== topic)
  // Flache Artikel (sub === topic) werden von [category]/[subcategory] behandelt
  const paths = (Object.values(content) as JassContentItem[])
    .filter(item => {
      const mainCatSlug = toSlug(item.metadata.category.main);
      const subCatSlug = toSlug(item.metadata.category.sub);
      const topicSlug = toSlug(item.metadata.category.topic);
      
      // Nur Artikel wo sub !== topic (echte 3-Ebenen-Struktur)
      return mainCatSlug !== 'varianten' && subCatSlug !== topicSlug;
    })
    .map((item) => {
      const mainCatSlug = toSlug(item.metadata.category.main);
      const subCatSlug = toSlug(item.metadata.category.sub);
      const topicSlug = toSlug(item.metadata.category.topic);

      return {
        params: {
          category: mainCatSlug,
          subcategory: subCatSlug,
          topic: topicSlug,
        },
      };
    });

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const categorySlug = params?.category as string;
  const subcategorySlug = params?.subcategory as string;
  const topicSlug = params?.topic as string;

  const content: JassContentRecord = allContent;
  
  // SPEZIALFALL: Varianten werden von /varianten/[topic] behandelt
  if (categorySlug === 'varianten') {
    return {
      notFound: true,
    };
  }
  
  // Suche Artikel (nur noch normale 3-Ebenen-Struktur)
  const contentItem = (Object.values(content) as JassContentItem[]).find(
    (item) =>
      toSlug(item.metadata.category.main) === categorySlug &&
      toSlug(item.metadata.category.sub) === subcategorySlug &&
      toSlug(item.metadata.category.topic) === topicSlug
  );

  if (!contentItem) {
    return {
      notFound: true,
    };
  }

  const topic = contentItem.metadata.category.topic;
  const subcategory = contentItem.metadata.category.sub;
  const category = contentItem.metadata.category.main;
  
  // Canonical Path: Immer 3 Ebenen (flache Artikel sind jetzt in [category]/[subcategory])
  const canonicalPath = `/${categorySlug}/${subcategorySlug}/${topicSlug}/`;

  // Dynamische SEO-Titel und -Beschreibungen
  let pageTitle = `${topic} - ${subcategory} | Jass-Wiki`;
  let metaDescription = `Alles über "${topic}" beim Jassen in der Kategorie ${subcategory}. Detailliert erklärt im Jass-Wiki der Schweiz.`;

  switch (category) {
    case 'Regeln':
      pageTitle = `Jassregeln für ${topic}: ${subcategory} im Detail erklärt | Jass-Wiki`;
      metaDescription = `Die offiziellen Jassregeln für "${topic}" (${subcategory}). Alle Details, Ausnahmen und Beispiele verständlich erklärt auf jasswiki.ch.`;
      break;
    case 'Weis-Regeln':
      pageTitle = `${topic}: Die Regeln für Weispunkte, Stöck & Bock | Jass-Wiki`;
      metaDescription = `Alles über den Jass-Weis "${topic}". Erfahre die Regeln, Punktewerte und strategischen Tipps für ${subcategory} im Jass-Wiki.`;
      break;
    case 'Schieber':
      // Spezialfall für den Hauptartikel "Der Schieber"
      if (topic === 'Der Schieber') {
        pageTitle = `Schieber Jass: Regeln, Anleitung & Tipps für die beliebteste Schweizer Jassvariante`;
        metaDescription = `Der Schieber ist die beliebteste Jassvariante der Schweiz. Komplette Anleitung: Regeln, Trumpfwahl, die Philosophie der 18 Karten und Tipps für Anfänger und Profis.`;
      } else {
        pageTitle = `${topic} beim Schieber: Tipps & Strategien | Jass-Wiki`;
        metaDescription = `Alles über "${topic}" beim Schieber-Jass. Taktiken und Strategien für ${subcategory} – erklärt für Anfänger und Profis auf jasswiki.ch.`;
      }
      break;
    case 'Begriffe':
      pageTitle = `Was bedeutet "${topic}" beim Jassen? | Jass-Begriffe A-Z | Jass-Wiki`;
      metaDescription = `Die Definition und Bedeutung des Jass-Begriffs "${topic}". Einfach und verständlich erklärt im grossen Jass-Lexikon der Schweiz.`;
      break;
    case 'Varianten':
      pageTitle = `Anleitung für die Jass-Variante "${topic}" | Jass-Wiki`;
      metaDescription = `Lerne die Jass-Variante "${topic}" (${subcategory}). Spielregeln, Anleitung und Punkte einfach erklärt auf jasswiki.ch.`;
      break;
    case 'Jassapps':
      // Spezielle SEO-Titel für Jassapps
      if (topic.toLowerCase().includes('generelles') || topic.toLowerCase().includes('übersicht')) {
        pageTitle = `Die besten Jassapps für Schweizer Jass 2024 | Vergleich & Test`;
        metaDescription = `Entdecke die besten Jassapps für Schweizer Jass: Digitale Jasstafeln, Online-Jass-Apps und Tools. Kompletter Vergleich mit Vor- und Nachteilen.`;
      } else if (topic.toLowerCase().includes('jassguru')) {
        pageTitle = `jassguru.ch: Die digitale Jasstafel mit Datenbank | Jass-Wiki`;
        metaDescription = `jassguru.ch ist die einzige digitale Jasstafel, die Resultate direkt in eine Datenbank schreibt. Elo-Rating, Statistiken und Echtzeit-Synchronisation.`;
      } else if (topic.toLowerCase().includes('jasspro')) {
        pageTitle = `JassPro App Test: Online-Jass gegen KI und Spieler | Jass-Wiki`;
        metaDescription = `JassPro App im Test: Online-Jass gegen Computer und echte Spieler. Features, Kosten und Verfügbarkeit für iOS, Android und Web.`;
      } else if (topic.toLowerCase().includes('jass24')) {
        pageTitle = `Jass24 App: Online-Jass mit Webcam | Jass-Wiki`;
        metaDescription = `Jass24 App für Online-Jass mit Webcam-Integration. Spielmodi, Features und Verfügbarkeit für iOS und Android im Test.`;
      } else if (topic.toLowerCase().includes('swissjass')) {
        pageTitle = `SwissJass+ App: Online-Jass mit KI | Jass-Wiki`;
        metaDescription = `SwissJass+ App für Online-Jass mit künstlicher Intelligenz. Spielmodi, Features und Verfügbarkeit für iOS und Android.`;
      } else if (topic.toLowerCase().includes('jass.ch')) {
        pageTitle = `Jass.ch App von Swisslos: Online-Jass Test | Jass-Wiki`;
        metaDescription = `Jass.ch App von Swisslos im Test: Online-Jass mit verschiedenen Spielmodi. Features, Kosten und Verfügbarkeit für iOS und Android.`;
      } else if (topic.toLowerCase().includes('jasstafel')) {
        pageTitle = `Jasstafel Apps für Android & iOS: Digitale Punktezählung | Jass-Wiki`;
        metaDescription = `Die besten Jasstafel Apps für Android und iOS. Digitale Punktezählung für Schieber, Coiffeur und andere Jass-Varianten.`;
      } else {
        pageTitle = `${topic}: Die beste Jassapp im Test | Jass-Wiki`;
        metaDescription = `${topic} App im Test: Features, Kosten und Verfügbarkeit für Schweizer Jass. Kompletter Vergleich mit anderen Jassapps.`;
      }
      break;
    default:
      // Fallback bleibt generisch, aber optimiert
      pageTitle = `${topic} - ${category} | Das Schweizer Jass-Wiki`;
      metaDescription = `Alles über "${topic}" beim Jassen. Detailliert erklärt im umfassendsten Jass-Wiki der Schweiz.`;
      break;
  }

  return {
    props: {
      contentItem,
      category: category,
      categorySlug,
      subcategory: subcategory,
      subcategorySlug,
      topic: topic,
      topicSlug,
      pageTitle,
      metaDescription,
      canonicalPath,
    },
  };
};

export default JassWissenPage;

