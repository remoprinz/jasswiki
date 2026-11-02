import React, { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import { InternalLinker } from '@/components/layout/InternalLinker';
import { SeoHead } from '@/components/layout/SeoHead';
import { FaqJsonLdSchema } from '@/components/seo/FaqJsonLdSchema';
import { FaqSection } from '@/components/wissen/FaqSection';
import { verweiseZuLinks } from '@/components/wissen/verweise';
import allContent from '@/data/jass-content-v2.json';
import { JassContentRecord } from '@/types/jass-lexikon';
import { deutscherPfad, fassungDa, kennungenDer, kennungZumPfad, linksInSprache, Sprache, SPRACH_TEXTE, sprachPfad } from '@/lib/sprachen';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://jasswiki.ch';

/** Eine Fassung, wie DOLMETSCHER sie in src/data/i18n/{sprache}.json legt. */
interface Uebersetzung {
  id: string;
  text: string;
  faqs?: { question: string; answer: string }[];
  metadata?: { titel?: string; seoTitle?: string; seoDescription?: string };
}

interface SeiteProps {
  sprache: Sprache;
  titel: string;
  seoTitel: string;
  seoBeschreibung: string;
  text: string;
  faqs: { question: string; answer: string }[];
  siehAuch: { titel: string; href: string }[];
  pfad: string;
}

/** Der Titel: metadata.titel, sonst der Anfang des SEO-Titels. */
function titelVon(f: Uebersetzung, ersatz: string): string {
  if (f.metadata?.titel) return f.metadata.titel;
  const seo = f.metadata?.seoTitle?.split(' | ')[0].split(/\s*:\s/)[0].trim();
  return seo || ersatz;
}

export function pfadeDer(sprache: Sprache, datei: Record<string, Uebersetzung>) {
  return kennungenDer(sprache)
    .filter((id) => datei[id])
    .map((id) => ({ params: { pfad: deutscherPfad(id).split('/').filter(Boolean) } }));
}

export function propsDer(sprache: Sprache, datei: Record<string, Uebersetzung>, teile: string[]): { props: SeiteProps } | { notFound: true } {
  const pfad = `/${teile.join('/')}/`;
  const id = kennungZumPfad(pfad);
  const f = id ? datei[id] : null;
  if (!id || !f || !fassungDa(id, sprache)) return { notFound: true };
  const de = (allContent as JassContentRecord)[id];
  const titel = titelVon(f, de.metadata.category.topic);
  const siehAuch = (de.see_also ?? [])
    .filter((k) => fassungDa(k, sprache) && datei[k])
    .map((k) => ({ titel: titelVon(datei[k], k), href: sprachPfad(deutscherPfad(k), sprache) }));
  return {
    props: {
      sprache,
      titel,
      seoTitel: f.metadata?.seoTitle ?? `${titel} | Jass-Wiki`,
      seoBeschreibung: f.metadata?.seoDescription ?? '',
      text: f.text,
      faqs: f.faqs ?? [],
      siehAuch,
      pfad,
    },
  };
}

export const UebersetzteSeite: React.FC<SeiteProps> = ({ sprache, titel, seoTitel, seoBeschreibung, text, faqs, siehAuch, pfad }) => {
  const worte = SPRACH_TEXTE[sprache];
  const hier = sprachPfad(pfad, sprache);

  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => document.body.classList.remove('lexikon-page');
  }, []);

  return (
    <>
      <SeoHead title={seoTitel} description={seoBeschreibung} canonicalUrl={`${SITE_URL}${hier}`} />
      {faqs.length > 0 ? (
        <Head>
          <FaqJsonLdSchema faqs={faqs} />
        </Head>
      ) : null}
      <LexikonLayout breadcrumbItems={[{ name: 'Jass-Wiki', href: '/' }, { name: titel, href: hier }]}>
        <div className="space-y-6 sm:space-y-8" data-uebersetzung={sprache}>
          <header className="text-left pb-6 border-b border-[#f0eee7]">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff0000] mb-4 leading-tight">{titel}</h1>
          </header>
          <article className="content-formatting max-w-none">
            <div className="content-formatting text-black">
              <InternalLinker text={linksInSprache(verweiseZuLinks(text), sprache)} />
            </div>
          </article>
          {faqs.length > 0 ? (
            <FaqSection
              title={worte.faq}
              faqs={faqs.map((q) => ({ question: q.question, answer: linksInSprache(verweiseZuLinks(q.answer), sprache) }))}
            />
          ) : null}
          {siehAuch.length > 0 ? (
            <section>
              <h2 className="font-capita text-[20px] font-normal !text-black">{worte.siehAuch}</h2>
              <ul className="mt-2 space-y-1">
                {siehAuch.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="text-[#274823] underline hover:text-[#2bb752]">{s.titel}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </LexikonLayout>
    </>
  );
};
