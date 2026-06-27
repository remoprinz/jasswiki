import React, { useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import { SeoHead } from '@/components/layout/SeoHead';
import { FaqJsonLdSchema } from '@/components/seo/FaqJsonLdSchema';

const SITE_URL = 'https://jasswiki.ch';

const FAQS = [
  {
    question: 'Was kann man beim Jassen ansagen?',
    answer: 'Man sagt entweder eine Trumpffarbe an oder einen Spielmodus ohne feste Trumpffarbe wie Obenabe, Undenufe, Slalom, Quer, Trio, Mitte, Tutti oder Misère.',
  },
  {
    question: 'Was sind die Standard-Ansagen beim Schieber?',
    answer: 'In der Regel die vier Trumpffarben sowie Obenabe und Undenufe. Slalom, Quer, Trio und weitere Ansagen werden je nach Jassgruppe gespielt.',
  },
  {
    question: 'Was bedeutet Obenabe und Undenufe?',
    answer: 'Bei Obenabe sticht die höchste Karte (Ass), bei Undenufe die niedrigste (6). Beide werden ohne Trumpf gespielt.',
  },
  {
    question: 'Was ist beim Coiffeur eine Ansage?',
    answer: 'Beim Coiffeur muss jede mögliche Ansage im Verlauf der Partie genau einmal gespielt und damit «abgehakt» werden.',
  },
];

const AnsagenLeitartikel: NextPage = () => {
  const canonicalUrl = `${SITE_URL}/ansagen/`;

  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => document.body.classList.remove('lexikon-page');
  }, []);

  const breadcrumbItems = [
    { name: 'Jass-Wiki', href: '/' },
    { name: 'Ansagen', href: '/ansagen/' },
  ];

  return (
    <>
      <SeoHead
        title="Jass-Ansagen: Obenabe, Undenufe, Tutti & mehr erklärt | JassWiki"
        description="Alle Ansagen beim Jassen im Überblick: Trumpffarben, Obenabe, Undenufe, Slalom, Quer, Trio, Tutti und Misère. Regeln und Punkte einfach erklärt."
        canonicalUrl={canonicalUrl}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: 'Ansagen beim Jassen',
              description: 'Alle Ansagen beim Jassen: Trumpffarben, Obenabe, Undenufe, Slalom, Quer, Trio, Tutti und Misère.',
              author: { '@type': 'Organization', name: 'JassWiki', url: SITE_URL },
              publisher: { '@type': 'Organization', name: 'Jassverband Schweiz', url: 'https://jassverband.ch' },
              mainEntityOfPage: canonicalUrl,
              about: { '@type': 'Thing', name: 'Jass', sameAs: 'https://www.wikidata.org/wiki/Q786768' },
              inLanguage: 'de',
            }),
          }}
        />
      </Head>
      <FaqJsonLdSchema faqs={FAQS} />

      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <article className="space-y-8 sm:space-y-10">

          {/* H1 + Einleitung */}
          <header>
            <h1 className="font-capita text-[32px] sm:text-[42px] font-bold text-[#ff0000] mb-[12px] leading-[1.1]">
              Ansagen
            </h1>
            <div className="font-inter text-[15px] sm:text-[16px] text-[#5f5b53] leading-[1.7] space-y-4">
              <p>
                Die Wahl der richtigen Ansage ist der vielleicht wichtigste Aspekt beim Jassen. Beim{' '}
                <Link href="/schieber/" className="text-[#ff0000] hover:underline">Schieber</Link>{' '}
                gehören in der Regel die Trumpffarben, Obenabe und Undenufe zu den Standard-Ansagen. Aber auch Slalom, Quer, Trio und weitere werden je nach Jassgruppe gespielt.
              </p>
              <p>
                Beim{' '}
                <Link href="/varianten/coiffeur/" className="text-[#ff0000] hover:underline">Coiffeur</Link>{' '}
                ist es normal, dass die meisten Ansagen im Verlauf einer Partie «abgehakt» werden, also jede genau einmal gespielt wird. Hier lernst du alle Ansagen kennen, was sie bedeuten und wie sie gezählt werden.
              </p>
            </div>
          </header>

          {/* Die drei Achsen einer Ansage */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Die drei Achsen einer Ansage
            </h2>
            <p className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] mb-6">
              Jede Ansage setzt sich aus drei Prinzipien zusammen: Was ist Trumpf bzw. die Ansage selber? Was ist die Reihenfolge beim Stechwert? Und ist das Ziel, möglichst viele oder möglichst wenige Punkte zu erzielen?
            </p>
            <div className="font-inter text-[15px] text-[#5f5b53] leading-[1.7]">
              <div className="border-t border-[#e8e6df] py-3 sm:flex sm:gap-6">
                <div className="font-capita font-bold text-black mb-1 sm:mb-0 sm:w-52 sm:flex-shrink-0">Ansage</div>
                <p className="m-0">
                  eine{' '}
                  <Link href="/ansagen/trumpffarbe/" className="text-[#ff0000] hover:underline">Trumpffarbe</Link>{' '}
                  (Rosen, Schellen, Eichel, Schilten bzw. Herz, Ecke, Kreuz, Schaufel), kein Trumpf (Obenabe, Undenufe, Slalom …) oder alle Farben Trumpf (
                  <Link href="/ansagen/tutti/" className="text-[#ff0000] hover:underline">Tutti</Link>)
                </p>
              </div>
              <div className="border-t border-[#f0eee7] py-3 sm:flex sm:gap-6">
                <div className="font-capita font-bold text-black mb-1 sm:mb-0 sm:w-52 sm:flex-shrink-0">Reihenfolge (Stechwert)</div>
                <p className="m-0">
                  <Link href="/ansagen/obenabe/" className="text-[#ff0000] hover:underline">Obenabe</Link>,{' '}
                  <Link href="/ansagen/undenufe/" className="text-[#ff0000] hover:underline">Undenufe</Link>,{' '}
                  <Link href="/ansagen/slalom-zickzack/" className="text-[#ff0000] hover:underline">Slalom</Link>,{' '}
                  <Link href="/ansagen/quer/" className="text-[#ff0000] hover:underline">Quer</Link>,{' '}
                  <Link href="/ansagen/trio-3-3/" className="text-[#ff0000] hover:underline">Trio</Link>,{' '}
                  <Link href="/ansagen/mitte/" className="text-[#ff0000] hover:underline">Mitte</Link>
                </p>
              </div>
              <div className="border-t border-b border-[#f0eee7] py-3 sm:flex sm:gap-6">
                <div className="font-capita font-bold text-black mb-1 sm:mb-0 sm:w-52 sm:flex-shrink-0">Ziel</div>
                <p className="m-0">
                  möglichst viele Punkte (Vorwärts) oder möglichst wenige (
                  <Link href="/begriffe/grundbegriffe/hindersi/" className="text-[#ff0000] hover:underline">Hindersi</Link>)
                </p>
              </div>
            </div>
          </section>

          {/* Alle Ansagen im Überblick */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Alle Ansagen im Überblick
            </h2>
            <div className="grid gap-4 sm:gap-5">
              {[
                { slug: 'obenabe', name: 'Obenabe', desc: 'ohne Trumpf, die höchste Karte (Ass) sticht.' },
                { slug: 'undenufe', name: 'Undenufe', desc: 'ohne Trumpf, die tiefste Karte (6) sticht.' },
                { slug: 'slalom-zickzack', name: 'Slalom (Zickzack)', desc: 'abwechselnd Obenabe und Undenufe pro Stich.' },
                { slug: 'quer', name: 'Quer', desc: 'ein Teil der Stiche Obenabe, der andere Undenufe.' },
                { slug: 'trio-3-3', name: 'Trio (3×3)', desc: 'je drei Stiche Trumpf, Obenabe und Undenufe.' },
                { slug: 'mitte', name: 'Mitte (Tännli)', desc: 'ohne Trumpf, das Banner (Zehner) ist die höchste Karte.' },
                { slug: 'tutti', name: 'Tutti', desc: 'vor allem beim Coiffeur, alle Farben sind Trumpf.' },
                { slug: 'misere', name: 'Misère', desc: 'Ziel ist, möglichst keine Punkte zu machen.' },
              ].map((m) => (
                <Link key={m.slug} href={`/ansagen/${m.slug}/`} className="group block">
                  <div className="bg-[#f0eee7]/50 border border-[#e8e6df] rounded-[12px] hover:border-[#d5d0c6] hover:bg-[#f0eee7] transition-colors px-[14px] sm:px-[20px] py-[14px] sm:py-[16px]">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-capita text-[17px] sm:text-[19px] font-bold text-black group-hover:text-[#ff0000] transition-colors mb-[6px] leading-[1.3]">{m.name}</h3>
                        <p className="font-inter text-[13px] text-[#88816d] leading-[1.5]">{m.desc}</p>
                      </div>
                      <div className="text-[#88816d] group-hover:text-[#ff0000] group-hover:translate-x-1 transition-all flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Häufige Fragen zu den Ansagen
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <details key={idx} className="group border border-[#e8e6df] rounded-[12px] overflow-hidden">
                  <summary className="font-inter text-[15px] font-medium text-black cursor-pointer px-[14px] sm:px-[20px] py-[12px] sm:py-[14px] hover:bg-[#f0eee7]/50 transition-colors list-none flex items-center justify-between">
                    {faq.question}
                    <svg className="w-4 h-4 text-[#88816d] group-open:rotate-180 transition-transform flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="font-inter text-[14px] text-[#5f5b53] leading-[1.65] px-[14px] sm:px-[20px] pb-[14px]">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Zurück */}
          <div className="pt-8 border-t border-[#f0eee7]">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-[#f0eee7] text-black rounded-lg hover:bg-[#e8e6df] transition-colors font-medium border border-[#e8e6df]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück zur Übersicht
            </Link>
          </div>

        </article>
      </LexikonLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return { props: {} };
};

export default AnsagenLeitartikel;
