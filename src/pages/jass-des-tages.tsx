import React, { useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import { SeoHead } from '@/components/layout/SeoHead';
import { FaqJsonLdSchema } from '@/components/seo/FaqJsonLdSchema';
import { FaqSection } from '@/components/wissen/FaqSection';
import { BlattVonGestern, GesternDaten, gesternGueltig } from '@/components/wissen/BlattVonGestern';
import { JDT_TEXTE, JDT_LINKS } from '@/data/jass-des-tages-texte';

/**
 * /jass-des-tages/ (GEO/SEO P3, KELLE 25.10.2026). Oben der Erklärtext und
 * die fünf Fragen, statisch im HTML; darunter das Blatt von gestern aus
 * gestern.json, beim Bau ins HTML gelegt und im Browser nachgefragt.
 */
interface Props {
  gebaut: GesternDaten | null;
  gebautAm: string;
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';
const KANONISCH = `${SITE}/jass-des-tages/`;

const JassDesTagesSeite: NextPage<Props> = ({ gebaut, gebautAm }) => {
  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => document.body.classList.remove('lexikon-page');
  }, []);

  const breadcrumbItems = [
    { name: 'Jass-Wiki', href: '/' },
    { name: JDT_TEXTE.titel, href: '/jass-des-tages/' },
  ];

  const anzahl = gebaut?.nummer ?? null;
  const einleitung = JDT_TEXTE.einleitung.map((s, i) =>
    i === 1 ? (anzahl ? s.replace('{anzahl}', String(anzahl)) : JDT_TEXTE.einleitungOhneZahl) : s,
  );

  const artikel = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${KANONISCH}#artikel`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': KANONISCH },
    headline: JDT_TEXTE.titel,
    description: JDT_TEXTE.seitenBeschreibung,
    inLanguage: 'de-CH',
    author: { '@id': 'https://jassguru.ch/#remo-prinz' },
    publisher: { '@id': 'https://jasswiki.ch/#organization' },
    about: { '@id': 'https://jassguru.ch/jass-des-tages/#serie' },
    datePublished: '2026-10-25',
    dateModified: gebautAm,
  };
  const pfad = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: new URL(b.href, SITE).toString(),
    })),
  };

  return (
    <>
      <SeoHead
        title={JDT_TEXTE.seitenTitel}
        description={JDT_TEXTE.seitenBeschreibung}
        canonicalUrl={KANONISCH}
      />
      <Head>
        <meta property="og:type" content="article" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artikel) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pfad) }} />
        <FaqJsonLdSchema faqs={[...JDT_TEXTE.faqs]} />
      </Head>
      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <div className="space-y-6 sm:space-y-8">
          <header className="text-left pb-6 border-b border-[#f0eee7]">
            <p className="font-inter text-[12px] sm:text-[13px] font-semibold uppercase tracking-wide text-[#274823] mb-[10px]">
              {JDT_TEXTE.kicker}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff0000] mb-4 leading-tight">
              {JDT_TEXTE.titel}
            </h1>
            <div className="space-y-[12px]">
              {einleitung.map((s) => (
                <p key={s} className="font-inter text-[16px] sm:text-[17px] leading-[1.6] text-black">{s}</p>
              ))}
            </div>
            <div className="mt-[16px] flex flex-wrap items-center gap-[12px]">
              <a
                href={JDT_LINKS.heute}
                className="inline-flex items-center justify-center rounded-[999px] bg-[#ff0101] px-[20px] py-[10px] font-inter text-[16px] font-bold text-white !no-underline hover:brightness-110"
              >
                {JDT_TEXTE.knopfSpielen}
              </a>
              <a href={JDT_LINKS.kanal} className="font-inter text-[16px] font-bold text-[#ff0000] underline" rel="noopener">
                {JDT_TEXTE.kanalWort}
              </a>
            </div>
          </header>

          <BlattVonGestern gebaut={gebaut} />

          <FaqSection faqs={[...JDT_TEXTE.faqs]} title={JDT_TEXTE.faqTitel} />
        </div>
      </LexikonLayout>
    </>
  );
};

/** Der Bau holt gestern.json einmal; schweigt die Function, baut die Seite ohne Blatt. */
export const getStaticProps: GetStaticProps<Props> = async () => {
  let gebaut: GesternDaten | null = null;
  try {
    const ab = new AbortController();
    const uhr = setTimeout(() => ab.abort(), 10000);
    const r = await fetch(JDT_LINKS.gestern, { signal: ab.signal, headers: { Origin: 'https://jasswiki.ch' } });
    clearTimeout(uhr);
    if (r.ok) {
      const j: unknown = await r.json();
      if (gesternGueltig(j)) gebaut = j;
    }
    console.log(`jass-des-tages: gestern.json ${gebaut ? gebaut.datum : 'ohne Blatt'}`);
  } catch (e) {
    console.warn('jass-des-tages: gestern.json nicht erreichbar, Seite ohne Blatt', e instanceof Error ? e.message : e);
  }
  return { props: { gebaut, gebautAm: new Date().toISOString().split('T')[0] } };
};

export default JassDesTagesSeite;
