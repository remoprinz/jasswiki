import React, { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import { artikelAdresse, adressSegmente, artikelAnAdresse } from '@/lib/url-utils';
import { krumenFuerArtikel, type Krume } from '@/lib/gliederung';
import { InternalLinker } from '@/components/layout/InternalLinker';
import { TrumpffarbenGrid } from '@/components/wissen/TrumpffarbenGrid';
import { TrumpffarbenSymbole } from '@/components/wissen/TrumpffarbenSymbole';
import { SeoHead } from '@/components/layout/SeoHead';
import { JsonLdSchema } from '@/components/seo/JsonLdSchema';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { RelatedTopics } from '@/components/wissen/RelatedTopics';
import { FaqJsonLdSchema } from '@/components/seo/FaqJsonLdSchema';
import { FaqSection } from '@/components/wissen/FaqSection';
import { JassenKarte, JassenZeile } from '@/components/wissen/JassenKarte';
import { UebenBlock } from '@/components/wissen/UebenBlock';
import { ArtikelHuelle, huelleGilt } from '@/components/wissen/ArtikelHuelle';

interface AnsagenPageProps {
  contentItem: JassContentItem;
  topic: string;
  topicSlug: string;
  pageTitle: string;
  metaDescription: string;
  canonicalPath: string;
  krumen: Krume[];
}

const AnsagenPage: NextPage<AnsagenPageProps> = ({
  contentItem,
  topic,
  topicSlug,
  pageTitle,
  metaDescription,
  canonicalPath,
  krumen,
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

  const category = 'Ansagen';
  const categorySlug = 'ansagen';
  const subcategory = contentItem.metadata.category.sub;

  // Brotkrumen nach der Gliederung: Jass-Wiki › Rubrik › Kapitel › Artikel.
  const breadcrumbItems = [...krumen, { name: topic, href: normalizedPath }];

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
    return { borderColor: fallbackColor, color: fallbackColor };
  };

  // «Trumpffarbe»: zwei Bild-Blöcke einschieben – die Farb-Symbole unter «Die vier
  // Farben» und das Puur/Nell-Raster nach der Rangordnung. Split an natürlichen
  // Textstellen (keine künstlichen Marker im Text, damit Korpus sauber bleibt).
  const farbwechsel = contentItem.metadata.farbwechsel === true;
  const isTrumpffarbe = contentItem.id === 'expressions_trumpffarbe';
  const A_SYMBOLE = 'Welche Farbe als Trumpf angesagt wird';
  const A_GRID = '## Wo wird die Trumpffarbe angesagt';
  let tfSeg1 = contentItem.text;
  let tfSeg2 = '';
  let tfSeg3 = '';
  if (isTrumpffarbe) {
    const i1 = contentItem.text.indexOf(A_SYMBOLE);
    const i2 = contentItem.text.indexOf(A_GRID);
    if (i1 >= 0 && i2 > i1) {
      tfSeg1 = contentItem.text.slice(0, i1);
      tfSeg2 = contentItem.text.slice(i1, i2);
      tfSeg3 = contentItem.text.slice(i2);
    }
  }

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
      {huelleGilt(contentItem.id) ? (
        <ArtikelHuelle
          contentItem={contentItem}
          breadcrumbItems={breadcrumbItems}
          titel={topic}
          fragenName={topic}
          kategorie={categorySlug}
          rohText={isTrumpffarbe ? undefined : contentItem.text}
          zeichne={(stueck) => (
            <div className="content-formatting text-black">
              <InternalLinker text={stueck} farbwechsel={farbwechsel} />
            </div>
          )}
          text={
            <>
              <div className="content-formatting text-black">
                <InternalLinker text={tfSeg1} farbwechsel={farbwechsel} />
              </div>
              {isTrumpffarbe && <TrumpffarbenSymbole />}
              {isTrumpffarbe && tfSeg2 && (
                <div className="content-formatting text-black">
                  <InternalLinker text={tfSeg2} farbwechsel={farbwechsel} />
                </div>
              )}
              {isTrumpffarbe && <TrumpffarbenGrid />}
              {isTrumpffarbe && tfSeg3 && (
                <div className="content-formatting text-black">
                  <InternalLinker text={tfSeg3} farbwechsel={farbwechsel} />
                </div>
              )}
            </>
          }
        />
      ) : (
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
            <JassenZeile schluessel={contentItem.id} kategorie="ansagen" />
          </header>

          <article className="content-formatting max-w-none" data-artikel-seite={contentItem.id}>
            <div className="content-formatting text-black">
              <InternalLinker text={tfSeg1} farbwechsel={farbwechsel} />
            </div>
            {isTrumpffarbe && <TrumpffarbenSymbole />}
            {isTrumpffarbe && tfSeg2 && (
              <div className="content-formatting text-black">
                <InternalLinker text={tfSeg2} farbwechsel={farbwechsel} />
              </div>
            )}
            {isTrumpffarbe && <TrumpffarbenGrid />}
            {isTrumpffarbe && tfSeg3 && (
              <div className="content-formatting text-black">
                <InternalLinker text={tfSeg3} farbwechsel={farbwechsel} />
              </div>
            )}
          </article>

          <UebenBlock articleId={contentItem.id} />

          <JassenKarte schluessel={contentItem.id} kategorie="ansagen" ort="artikel" />

          {/* FAQ-Sektion - sichtbar für User und Crawler */}
          {contentItem.faqs && contentItem.faqs.length > 0 && (
            <FaqSection
              faqs={contentItem.faqs}
              title={`Häufige Fragen zu ${topic}`}
            />
          )}

          {/* Chat-Prompt */}
          <div className="text-center py-[16px]">
            <p className="font-inter text-[14px] font-normal text-[#88816d] leading-[1.4286]">
              Hast du weitere Fragen? Nutze unseren{' '}
              <Link href="/gpt/" className="text-[#ff0000] underline">JassWiki Chat</Link>.
            </p>
          </div>

          {/* Zurück zur Ansagen-Übersicht */}
          <div className="pt-2">
            <Link href="/ansagen/" className="inline-flex items-center text-[#ff0000] font-medium hover:underline">
              &larr; Alle Ansagen im Überblick
            </Link>
          </div>

          <RelatedTopics
            currentArticleId={contentItem.id}
            currentCategory={contentItem.metadata.category.main}
            currentKeywords={contentItem.metadata.keywords}
            maxResults={4}
          />
        </div>
      </LexikonLayout>
      )}
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const content: JassContentRecord = allContent;
  const paths = (Object.values(content) as JassContentItem[])
    .map((item) => adressSegmente(artikelAdresse(item)))
    .filter((s) => s.length === 2 && s[0] === 'ansagen')
    .map((s) => ({
      params: {
        topic: s[1],
      },
    }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const topicSlug = params?.topic as string;

  const content: JassContentRecord = allContent;
  const contentItem = artikelAnAdresse(content, `/ansagen/${topicSlug}/`);

  if (!contentItem) {
    return {
      notFound: true,
    };
  }

  const topic = contentItem.metadata.category.topic;
  const canonicalPath = `/ansagen/${topicSlug}/`;

  // Die Inhaltsdatei hat das letzte Wort: steht dort ein eigener Suchergebnis-Text,
  // gilt er vor der Vorlage dieser Seite.
  const pageTitle =
    contentItem.metadata.seoTitle || `${topic} beim Jassen: Regeln und Punkte erklärt | Jass-Wiki`;
  const metaDescription =
    contentItem.metadata.seoDescription ||
    `Die Jass-Ansage "${topic}": Spielweise, Stechordnung und Punkte einfach erklärt auf jasswiki.ch.`;

  return {
    props: {
      contentItem,
      topic: topic,
      topicSlug,
      pageTitle,
      metaDescription,
      canonicalPath,
      krumen: krumenFuerArtikel(contentItem.id, canonicalPath),
    },
  };
};

export default AnsagenPage;
