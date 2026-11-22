import React, { useEffect } from 'react';
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
import { UebenBlock } from '@/components/wissen/UebenBlock';
import { JassfreundeSatz } from '@/components/wissen/JassfreundeSatz';
import { JassenKarte } from '@/components/wissen/JassenKarte';
import { LeitartikelVideo } from '@/components/wissen/LeitartikelVideo';
import { TextMitBildern, hatArtikelBilder } from '@/components/wissen/ArtikelBilder';
import { festerPfad, artikelAdresse, adressSegmente, artikelAnAdresse } from '@/lib/url-utils';
import { gliederungsSeiten, kapitelAnAdresse, krumenFuerArtikel, seitenName, stelleVon, type Krume } from '@/lib/gliederung';
import { ArtikelKarten, artikelStub, type ArtikelStub } from '@/components/wissen/ArtikelKarten';
import { rubrikSeite } from '@/components/wissen/rubriken';
import { RubrikFragen } from '@/components/wissen/RubrikFragen';
import { ArtikelHuelle, huelleGilt } from '@/components/wissen/ArtikelHuelle';
import { seitenTitel, themaVorSatz } from '@/components/seo/seitenTitel';


// Helper: Artikel einer bisherigen Unterrubrik, die in der Gliederung kein
// Kapitel ist (z. B. /regeln/sonderregeln/). Reihenfolge nach der Gliederung.
function getArticlesForSubcategory(
  content: JassContentRecord,
  categorySlug: string,
  subcategorySlug: string
): JassContentItem[] {
  return (Object.values(content) as JassContentItem[])
    .filter(item =>
      toSlug(item.metadata.category.main) === categorySlug &&
      toSlug(item.metadata.category.sub) === subcategorySlug &&
      !festerPfad(item.metadata.category)
    )
    .sort((a, b) => stelleVon(a.id) - stelleVon(b.id));
}

// Optionale Einleitungstexte für Übersichten (gegen Thin-Content + Kontext
// für Nutzer und Crawler). Schlüssel = Pfad der Seite ohne Schrägstriche am Rand.
const SUB_INTROS: Record<string, string[]> = {
  'jassapps/online-jass': [
    'Online jassen heisst: Schieber und andere Jassarten im Browser oder in einer App spielen, gegen die KI oder mit Jassern aus der ganzen Schweiz.',
    'Zuerst steht JassGuru, das Angebot des Jassverbands Schweiz. Der Verband gibt auch dieses Wiki heraus. Die übrigen Angebote folgen alphabetisch.',
  ],
  'regeln/fehler-verstoesse': [
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
  /** Name der bisherigen Unterrubrik für Suchergebnis-Texte (bleiben bis Schritt 4). */
  seoName?: string;
  /** Listenseite: die Artikel in der Reihenfolge der Gliederung. */
  liste?: ArtikelStub[];
  /** Artikelseite, die zugleich Kapitelseite ist: die übrigen Artikel des Kapitels. */
  bereich?: ArtikelStub[];
  /** Brotkrumen über der Seite (die Seite selbst hängt die Vorlage an). */
  krumen: Krume[];
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
  liste = [],
  seoName,
  bereich: bereichListe = [],
  krumen,
  isArticle = false,
  pageTitle,
  metaDescription,
  canonicalPath
}) => {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';

  // Brotkrumen nach der Gliederung: Jass-Wiki › Rubrik › Kapitel › Seite.
  const breadcrumbItems = [...krumen, { name: subcategory, href: `/${categorySlug}/${subcategorySlug}/` }];

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

    // Kapitelseite als Artikel (die Adresse des Kapitels ist die seines ersten
    // Artikels): die übrigen Artikel des Kapitels als Karten unter dem Inhalt.
    const siblings = bereichListe;

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

    // Sub-Leitartikel: die Artikel des Bereichs als Karten (Teil des Bausteins «text»).
    const bereich = siblings.length > 0 && (
      <section className="border-t border-[#f0eee7] pt-8 mt-6 sm:mt-8">
        <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[16px] leading-[1.2]">
          Artikel in diesem Bereich
        </h2>
        <ArtikelKarten artikel={siblings} />
      </section>
    );

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
        {huelleGilt(contentItem.id) ? (
          <ArtikelHuelle
            contentItem={contentItem}
            breadcrumbItems={breadcrumbItems}
            titel={subcategory}
            fragenName={subcategory}
            kategorie={categorySlug}
            text={
              <>
                <div className="content-formatting text-black">
                  {hatArtikelBilder(contentItem.id) ? (
                    <TextMitBildern schluessel={contentItem.id} text={cardTextBefore} farbwechsel={farbwechsel} />
                  ) : (
                    <InternalLinker text={cardTextBefore} farbwechsel={farbwechsel} />
                  )}
                </div>
                {isKartenfarben && <JassCardGrid />}
                {isKartenfarben && cardTextAfter && (
                  <div className="content-formatting text-black">
                    <InternalLinker text={cardTextAfter} farbwechsel={farbwechsel} />
                  </div>
                )}
              </>
            }
            nachText={bereich}
            rohText={isKartenfarben ? undefined : contentItem.text}
            zeichne={(stueck) => (
              <div className="content-formatting text-black">
                {hatArtikelBilder(contentItem.id) ? (
                  <TextMitBildern schluessel={contentItem.id} text={stueck} farbwechsel={farbwechsel} />
                ) : (
                  <InternalLinker text={stueck} farbwechsel={farbwechsel} />
                )}
              </div>
            )}
          />
        ) : (
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
            <article className="content-formatting max-w-none" data-artikel-seite={contentItem.id}>
              <div className="content-formatting text-black">
                {hatArtikelBilder(contentItem.id) ? (
                  <TextMitBildern schluessel={contentItem.id} text={cardTextBefore} farbwechsel={farbwechsel} />
                ) : (
                  <InternalLinker text={cardTextBefore} farbwechsel={farbwechsel} />
                )}
              </div>
              {isKartenfarben && <JassCardGrid />}
              {isKartenfarben && cardTextAfter && (
                <div className="content-formatting text-black">
                  <InternalLinker text={cardTextAfter} farbwechsel={farbwechsel} />
                </div>
              )}
            </article>

            {/* Sub-Leitartikel: Artikel des Bereichs als Karten */}
            {siblings.length > 0 && (
              <section className="border-t border-[#f0eee7] pt-8">
                <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[16px] leading-[1.2]">
                  Artikel in diesem Bereich
                </h2>
                <ArtikelKarten artikel={siblings} />
              </section>
            )}

            <LeitartikelVideo schluessel={contentItem.id} />
            <JassfreundeSatz schluessel={contentItem.id} />

            {/* ÜBEN: Aufgaben im Jass des Tages zu diesem Thema */}
            <UebenBlock articleId={contentItem.id} />

            <JassenKarte schluessel={contentItem.id} kategorie={categorySlug} ort="artikel" />

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
        )}
      </>
    );
  }

  // LISTE-MODE: Zeige Subkategorie-Übersicht
  // Texte aus src/data/rubriken.json (Karte SCHIRI «wiki-vorlagen», Teil C).
  // Steht dort eine Einleitung, ersetzt sie SUB_INTROS.
  const rubrik = rubrikSeite(`${categorySlug}/${subcategorySlug}`);
  const subIntro = rubrik.einleitung ? undefined : SUB_INTROS[`${categorySlug}/${subcategorySlug}`];
  const listPageTitle = rubrik.seoTitle ?? seitenTitel(seoName ?? subcategory, category);
  const listPageDescription = rubrik.seoDescription ?? (subIntro
    ? subIntro[0].slice(0, 155)
    : `Alle Artikel über ${seoName ?? subcategory} beim Jassen. ${liste.length} ${liste.length === 1 ? 'Artikel' : 'Artikel'} mit detaillierten Erklärungen und Beispielen.`);

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
              {rubrik.h1 ?? subcategory}
            </h1>
            <p className="font-inter text-[14px] sm:text-[16px] text-black leading-[1.5]">
              {liste.length} {liste.length === 1 ? 'Artikel' : 'Artikel'} in dieser Kategorie
            </p>
            {rubrik.einleitung && (
              <div className="mt-4 content-formatting text-black">
                <InternalLinker text={rubrik.einleitung} />
              </div>
            )}
            {subIntro && (
              <div className="mt-4 space-y-3 font-inter text-[14px] sm:text-[16px] text-[#5f5b53] leading-[1.7]">
                {subIntro.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
          </div>

          {/* Artikel-Liste */}
          <ArtikelKarten artikel={liste} />

          {/* Fragen aus rubriken.json, sichtbar und als FAQPage */}
          <RubrikFragen fragen={rubrik.faqs} />

          {/* Zurück zur Kategorie */}
          <div className="text-center pt-8 border-t border-[#f0eee7]">
            <Link
              href={`/${categorySlug}/`}
              className="inline-flex items-center px-6 py-3 bg-[#f0eee7] text-black rounded-lg hover:bg-[#e8e6df] hover:text-black transition-colors font-medium border border-[#f0eee7]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück zu {krumen[krumen.length - 1].name}
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

    // Artikel mit festem Pfad (/schieber/, /jassen-lernen/) tragen ihre eigene
    // Seite; ihre Unterrubrik entsteht nur, wenn sie weitere Artikel hat.
    if (festerPfad(item.metadata.category)) {
      return;
    }

    combinations.add(`${catSlug}/${subSlug}`);
  });

  // Flache Artikel an ihrer festen Adresse (zwei Segmente, ausser den
  // eigenen Routen /ansagen/ und /varianten/).
  items.forEach((item) => {
    const s = adressSegmente(artikelAdresse(item));
    if (s.length === 2 && s[0] !== 'ansagen' && s[0] !== 'varianten') combinations.add(`${s[0]}/${s[1]}`);
  });
  
  // Kapitelseiten der Gliederung mit zwei Segmenten (z. B. /regeln/karten-und-werte/).
  gliederungsSeiten().forEach((adresse) => {
    const s = adressSegmente(adresse);
    if (s.length === 2) combinations.add(`${s[0]}/${s[1]}`);
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
  const flatArticle = artikelAnAdresse(content, `/${categorySlug}/${subcategorySlug}/`);
  
  if (flatArticle) {
    // ARTIKEL-MODE: Zeige einzelnen Artikel
    const category = flatArticle.metadata.category.main;
    const topic = flatArticle.metadata.category.topic;
    const canonicalPath = `/${categorySlug}/${subcategorySlug}/`;
    
    // Dynamische SEO-Titel
    let pageTitle = seitenTitel(topic, category);
    let metaDescription = `Alles über "${topic}" beim Jassen. Detailliert erklärt im Jass-Wiki der Schweiz.`;
    
    if (category === 'Geschichte') {
      pageTitle = seitenTitel(topic, 'Geschichte des Schweizer Jass');
      metaDescription = themaVorSatz(topic, `Die faszinierende Geschichte des Schweizer Nationalspiel Jass. Historische Fakten und kulturelle Hintergründe auf jasswiki.ch.`);
    } else if (category === 'Grundlagen & Kultur') {
      pageTitle = seitenTitel(topic, 'Jassen lernen & verstehen');
      metaDescription = themaVorSatz(topic, `Grundlagen und kulturelle Aspekte des Schweizer Jass. Alles Wichtige für Anfänger und Fortgeschrittene auf jasswiki.ch.`);
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
        krumen: krumenFuerArtikel(flatArticle.id, canonicalPath),
        bereich: (kapitelAnAdresse(canonicalPath)?.kapitel.eintraege ?? []).flatMap((e) => {
          const a = content[e.id];
          return a && a.id !== flatArticle.id ? [artikelStub(a)] : [];
        }),
        isArticle: true,
        pageTitle,
        metaDescription,
        canonicalPath
      }
    };
  }
  
  // LISTEN-MODE: Zeige alle Artikel einer Subkategorie
  // KAPITEL-MODE: Kapitelseite der Gliederung, Ort und Reihenfolge aus gliederung.json.
  const adresse = `/${categorySlug}/${subcategorySlug}/`;
  const kapitel = kapitelAnAdresse(adresse);
  const bisherige = getArticlesForSubcategory(content, categorySlug, subcategorySlug);
  if (kapitel) {
    return {
      props: {
        category: bisherige[0]?.metadata.category.main ?? kapitel.rubrik.name,
        categorySlug,
        subcategory: kapitel.kapitel.name,
        subcategorySlug,
        seoName: bisherige[0]?.metadata.category.sub ?? kapitel.kapitel.name,
        articles: [],
        liste: kapitel.kapitel.eintraege.flatMap((e) => {
          const a = content[e.id];
          return a ? [artikelStub(a)] : [];
        }),
        krumen: [{ name: 'Jass-Wiki', href: '/' }, { name: kapitel.rubrik.name, href: kapitel.rubrik.adresse }],
        isArticle: false
      }
    };
  }

  // LISTEN-MODE: bisherige Unterrubrik ohne Kapitel in der Gliederung
  // (z. B. /regeln/sonderregeln/). Bleibt erreichbar, Reihenfolge nach der Gliederung.
  const articles = bisherige;
  
  if (articles.length === 0) {
    return { notFound: true };
  }
  
  const firstArticle = articles[0];
  const category = firstArticle.metadata.category.main;
  const subcategory = firstArticle.metadata.category.sub;
  const oben = `/${categorySlug}/`;
  
  return {
    props: {
      category,
      categorySlug,
      subcategory,
      subcategorySlug,
      seoName: subcategory,
      articles: [],
      liste: articles.map(artikelStub),
      krumen: [{ name: 'Jass-Wiki', href: '/' }, { name: seitenName(oben) ?? category, href: oben }],
      isArticle: false
    }
  };
};

export default SubcategoryPage;
