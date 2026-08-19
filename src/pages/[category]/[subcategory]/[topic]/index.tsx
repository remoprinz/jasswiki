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
import { JassCardGrid } from '@/components/wissen/JassCardGrid';
import { FarbeKopf } from '@/components/wissen/FarbeKopf';

// Symbol-Köpfe der vier Farb-Begriffe (Deutschschweizer + französisches Symbol).
// Symbol-Köpfe: 8 separate Farb-Artikel. Jeder zeigt nur sein eigenes Symbol;
// das Pendant steht verlinkt im Text.
const FARB_KOEPFE: Record<string, { name: string; img: string; system: string }> = {
  color_eichel: { name: 'Eichel', img: '/suits/eichel.png', system: 'Deutschschweizer Karten' },
  color_kreuz: { name: 'Kreuz', img: '/suits/kreuz.png', system: 'Französische Karten' },
  color_rosen: { name: 'Rosen', img: '/suits/rosen.png', system: 'Deutschschweizer Karten' },
  color_herz: { name: 'Herz', img: '/suits/herz.png', system: 'Französische Karten' },
  color_schellen: { name: 'Schellen', img: '/suits/schellen.png', system: 'Deutschschweizer Karten' },
  color_ecke: { name: 'Ecke', img: '/suits/ecke.png', system: 'Französische Karten' },
  color_schilten: { name: 'Schilten', img: '/suits/schilten.png', system: 'Deutschschweizer Karten' },
  color_schaufel: { name: 'Schaufel', img: '/suits/schaufel.png', system: 'Französische Karten' },
};


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
    publisherLogoUrl: 'https://jasswiki.ch/jasswiki-logo-hero-v2.png',
    datePublished: contentItem.metadata.datePublished,
    dateModified: contentItem.metadata.dateModified,
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

  // Leitartikel «Kartenfarben»: Karten-Raster zwischen Beschreibung und Geschichte
  // einschieben. Gesplittet wird an der Geschichts-Überschrift (kein künstlicher
  // Marker im Text, damit Korpus und __NEXT_DATA__ sauber bleiben).
  const farbwechsel = contentItem.metadata.farbwechsel === true;
  const isKartenfarben = contentItem.id === 'expressions_kartenfarben';
  const GRID_ANCHOR = 'Das abgebildete Kartenbild';
  const [cardTextBefore, cardTextAfter] =
    isKartenfarben && contentItem.text.includes(GRID_ANCHOR)
      ? (() => {
          const i = contentItem.text.indexOf(GRID_ANCHOR);
          return [contentItem.text.slice(0, i), contentItem.text.slice(i)];
        })()
      : [contentItem.text, ''];

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
              {contentItem.metadata.titel || topic}
            </h1>
          </header>

          {/* Artikel-Inhalt */}
          <article className="content-formatting max-w-none">
            {FARB_KOEPFE[contentItem.id] && <FarbeKopf {...FARB_KOEPFE[contentItem.id]} />}
            <div className="content-formatting text-black">
              <InternalLinker text={cardTextBefore} farbwechsel={farbwechsel} />
            </div>
            {isKartenfarben && <JassCardGrid />}
            {isKartenfarben && cardTextAfter && (
              <div className="content-formatting text-black">
                <InternalLinker text={cardTextAfter} farbwechsel={farbwechsel} />
              </div>
            )}
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
      return mainCatSlug !== 'varianten' && mainCatSlug !== 'ansagen' && subCatSlug !== topicSlug;
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
      pageTitle = `${topic} beim Jassen: die Regel, mit Beispiel | Jass-Wiki`;
      metaDescription = `Die Jassregel «${topic}» (${subcategory}): was gilt, wo Runden abweichen, mit Beispiel. Aus dem Jass-Wiki des Jassverbands Schweiz.`;
      break;
    case 'Weis-Regeln':
      pageTitle = `${topic} beim Jassen: Weisregel und Punkte | Jass-Wiki`;
      metaDescription = `Die Weisregel «${topic}»: was zählt, wann gemeldet wird, mit Beispiel. Aus dem Jass-Wiki des Jassverbands Schweiz.`;
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
      pageTitle = `${topic} beim Jassen: Bedeutung und Regel | Jass-Wiki`;
      metaDescription = `Was «${topic}» beim Jassen heisst und wann es gilt, kurz erklärt. Aus dem Jass-Wiki des Jassverbands Schweiz.`;
      break;
    case 'Varianten':
      pageTitle = `${topic} Jass: Regeln, Ablauf und Punkte | Jass-Wiki`;
      metaDescription = `So wird ${topic} gejasst: Spieler, Karten, Ablauf, Wertung und was Runden anders abmachen. Aus dem Jass-Wiki des Jassverbands Schweiz.`;
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
      pageTitle = `${topic} - ${category} | Jass-Wiki`;
      metaDescription = `Alles über "${topic}" beim Jassen. Detailliert erklärt im umfassendsten Jass-Wiki der Schweiz.`;
      break;
  }

  // Leitartikel «Jasskarten»: eigener, starker SEO-Titel statt des generischen Begriffe-Schemas.
  if (contentItem.id === 'expressions_kartenfarben') {
    pageTitle = 'Jasskarten: Schweizer Spielkarten beider Kartensysteme | Jass-Wiki';
    metaDescription =
      'Alle 36 Jasskarten beider Schweizer Kartensysteme: Deutschschweizer (Eichel, Rosen, Schellen, Schilten) und französische (Schaufel, Kreuz, Herz, Ecke). Mit allen Karten in der Übersicht, der Farb-Zuordnung und der Geschichte des Schweizer Kartenbilds.';
  }

  // Leitartikel «Jass-Taktik»: eigener, starker SEO-Titel für die wichtigste Taktik-Frage.
  if (contentItem.id === 'schieber_taktiken_advanced') {
    pageTitle = 'Jass-Taktik: die wichtigsten Konventionen zwischen Partnern | Jass-Wiki';
    metaDescription =
      'Die fortgeschrittenen Partner-Konventionen beim Jassen: Nell vor Puur, die Anzahl Trümpfe anzeigen (Hoch-Tief), der blutte Puur, Nachschmeissen und Verwerfen beim Slalom. Die Signalsprache zwischen Partnern, erklärt vom Schweizer Jassverband.';
  }

  // Die Inhaltsdatei hat das letzte Wort: steht dort ein eigener Suchergebnis-Text,
  // gilt er vor der Vorlage dieser Seite.
  if (contentItem.metadata.seoTitle) {
    pageTitle = contentItem.metadata.seoTitle;
  }
  if (contentItem.metadata.seoDescription) {
    metaDescription = contentItem.metadata.seoDescription;
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

