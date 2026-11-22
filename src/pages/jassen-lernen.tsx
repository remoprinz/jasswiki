import React, { useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import allContent from '@/data/jass-content-v2.json';
import leitartikel from '@/data/leitartikel.json';
import { JassContentRecord, JassContentItem } from '@/types/jass-lexikon';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import { SeoHead } from '@/components/layout/SeoHead';
import { InternalLinker } from '@/components/layout/InternalLinker';
import { JsonLdSchema } from '@/components/seo/JsonLdSchema';
import { FaqJsonLdSchema } from '@/components/seo/FaqJsonLdSchema';
import { FaqSection } from '@/components/wissen/FaqSection';
import { JassfreundeSatz } from '@/components/wissen/JassfreundeSatz';
import { JdtVideo, type JdtVideoDaten } from '@/components/wissen/JdtVideo';

// /jassen-lernen/ (Karte SCHIRI «wiki-vorlagen», Teil D, 22.11.2026): der
// Artikel jassen_lernen auf eigener Adresse. Die allgemeinen Routen bauen ihn
// nicht (FESTE_PFADE in url-utils). Videos stehen in leitartikel.json unter
// artikel.jassen_lernen.videos = [{ nach: "<Überschrift ohne ##>", jdt }]; je
// Eintrag steht JdtVideo am Ende des Abschnitts mit dieser Überschrift, mit dem
// Satz aus jdt.satz. Ein Eintrag ohne passende Überschrift oder ohne mp4
// fällt weg.

const SCHLUESSEL = 'jassen_lernen';
const PFAD = '/jassen-lernen/';

interface Stueck {
  text: string;
  video: { daten: JdtVideoDaten; satz: string } | null;
}

interface Props {
  artikel: JassContentItem;
  stuecke: Stueck[];
}

type VideoEintrag = { nach?: string; jdt?: (Partial<JdtVideoDaten> & { satz?: string }) | null };

function videoDaten(jdt: VideoEintrag['jdt']): Stueck['video'] {
  // Film oder YouTube genügt (SCHIRI 22.11.2026: der Film am Speicher lebt höchstens 30 Tage).
  if (!jdt || !jdt.datum || !(jdt.mp4 || jdt.youtube) || !jdt.aufgabe || !jdt.satz) return null;
  return {
    daten: {
      datum: jdt.datum,
      aufgabe: jdt.aufgabe,
      mp4: jdt.mp4 ?? null,
      poster: jdt.poster ?? null,
      dauer: jdt.dauer ?? null,
      youtube: jdt.youtube ?? null,
    },
    satz: jdt.satz,
  };
}

/** Teilt den Text an den Abschnittsenden, nach denen ein Video steht. */
function textInStuecke(text: string, videos: VideoEintrag[]): Stueck[] {
  const zeilen = text.split('\n');
  // Index der Überschriften zweiter Ebene
  const ueberschriften = zeilen
    .map((z, i) => ({ i, wort: /^##\s+(.+?)\s*$/.exec(z)?.[1] }))
    .filter((u): u is { i: number; wort: string } => !!u.wort && !/^###/.test(zeilen[u.i]));
  // Schnitt = Zeile vor der nächsten Überschrift nach «nach», sonst Textende
  const schnitte: { ende: number; video: NonNullable<Stueck['video']> }[] = [];
  for (const v of videos) {
    const video = videoDaten(v.jdt);
    if (!video || !v.nach) continue;
    const treffer = ueberschriften.findIndex((u) => u.wort === v.nach!.replace(/^##\s*/, '').trim());
    if (treffer < 0) continue;
    const ende = ueberschriften[treffer + 1]?.i ?? zeilen.length;
    schnitte.push({ ende, video });
  }
  schnitte.sort((a, b) => a.ende - b.ende);
  const stuecke: Stueck[] = [];
  let start = 0;
  for (const s of schnitte) {
    stuecke.push({ text: zeilen.slice(start, s.ende).join('\n'), video: s.video });
    start = s.ende;
  }
  stuecke.push({ text: zeilen.slice(start).join('\n'), video: null });
  return stuecke.filter((s) => s.text.trim() || s.video);
}

const JassenLernenSeite: NextPage<Props> = ({ artikel, stuecke }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';
  const canonicalUrl = `${siteUrl}${PFAD}`;
  const titelSeite = artikel.metadata.titel || artikel.metadata.category.topic;
  const seoTitel = artikel.metadata.seoTitle ?? `${titelSeite} | Jass-Wiki`;
  // Ohne seoDescription greift die Vorgabe von SeoHead.
  const beschreibung = artikel.metadata.seoDescription;
  const fragen = artikel.faqs ?? [];
  const farbwechsel = artikel.metadata.farbwechsel === true;

  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => document.body.classList.remove('lexikon-page');
  }, []);

  const breadcrumbItems = [
    { name: 'Jass-Wiki', href: '/' },
    { name: titelSeite, href: PFAD },
  ];

  return (
    <>
      <SeoHead title={seoTitel} description={beschreibung} canonicalUrl={canonicalUrl} />
      <Head>
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={artikel.metadata.datePublished} />
        <meta property="article:modified_time" content={artikel.metadata.dateModified} />
        <meta property="article:section" content={artikel.metadata.category.main} />
        <JsonLdSchema
          articleData={{
            headline: titelSeite,
            description: beschreibung ?? titelSeite,
            authorName: 'Jasswiki Redaktion',
            publisherName: 'Jasswiki.ch',
            publisherLogoUrl: 'https://jasswiki.ch/jasswiki-logo-hero-v2.png',
            datePublished: artikel.metadata.datePublished,
            dateModified: artikel.metadata.dateModified,
          }}
          breadcrumbItems={breadcrumbItems}
          canonicalUrl={canonicalUrl}
          siteUrl={siteUrl}
        />
        {fragen.length > 0 && <FaqJsonLdSchema faqs={fragen} />}
      </Head>
      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <div className="space-y-6 sm:space-y-8">
          <header className="text-left pb-6 border-b border-[#f0eee7]">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff0000] mb-4 leading-tight">
              {titelSeite}
            </h1>
          </header>

          <article className="content-formatting max-w-none">
            {stuecke.map((s, i) => (
              <React.Fragment key={i}>
                {s.text.trim() && (
                  <div className="content-formatting text-black">
                    <InternalLinker text={s.text} farbwechsel={farbwechsel} />
                  </div>
                )}
                {s.video && <JdtVideo daten={s.video.daten} satz={s.video.satz} mitTuer={false} />}
              </React.Fragment>
            ))}
          </article>

          <JassfreundeSatz schluessel={SCHLUESSEL} />

          {fragen.length > 0 && <FaqSection faqs={fragen} title={`Häufige Fragen zu ${titelSeite}`} />}

          <div className="text-center py-[16px]">
            <p className="font-inter text-[14px] font-normal text-[#88816d] leading-[1.4286]">
              Hast du weitere Fragen? Nutze unseren{' '}
              <Link href="/gpt/" className="text-[#ff0000] underline">JassWiki Chat</Link>.
            </p>
          </div>
        </div>
      </LexikonLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const artikel = (allContent as JassContentRecord)[SCHLUESSEL] as JassContentItem | undefined;
  if (!artikel) return { notFound: true };
  const eintrag = (leitartikel as unknown as { artikel: Record<string, { videos?: VideoEintrag[] }> }).artikel[SCHLUESSEL];
  const stuecke = textInStuecke(artikel.text, Array.isArray(eintrag?.videos) ? eintrag!.videos! : []);
  return { props: { artikel, stuecke } };
};

export default JassenLernenSeite;
