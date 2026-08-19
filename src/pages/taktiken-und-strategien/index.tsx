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
    question: 'Was sind die wichtigsten Jass-Taktiken?',
    answer: 'Verwerfen, Anziehen, die Trumpfkonvention Hoch-tief, Nell vor Puur und Nachschmeissen. Sie alle regeln, wie sich Partner beim Schieber über die Wahl und Reihenfolge ihrer Karten verständigen.',
  },
  {
    question: 'Was bedeutet «Nell vor Puur»?',
    answer: 'Wer Puur und Nell zugleich hält, spielt im ersten Stich zuerst das Nell. Der Partner liest daraus eine feste Aussage: Wer mit dem Nell eröffnet, hat auch den Puur. Wer den Puur nicht hält, eröffnet nie mit dem Nell.',
  },
  {
    question: 'Wie funktioniert die Hoch-tief-Konvention?',
    answer: 'Der Partner zeigt mit der Reihenfolge seiner Trümpfe, wie viele er hält: mit genau zwei Trümpfen spielt er zuerst den höheren, mit drei oder mehr zuerst den tiefsten. Nell und Puur sind davon ausgenommen.',
  },
  {
    question: 'Was ist Nachschmeissen?',
    answer: 'Nur im ersten Stich bei Obenabe, Undenufe, Quer, Slalom und Trio: Spielt der Ausspieler ein Ass, schmeisst der Partner den König derselben Farbe nach. Bei Undenufe folgt auf den Sechser der Siebner.',
  },
  {
    question: 'Was ist der Unterschied zwischen Anziehen und Verwerfen?',
    answer: 'Anziehen zeigt dem Partner eine starke Farbe an («das will ich»), Verwerfen eine schwache Farbe («das brauche ich nicht»).',
  },
];

const TaktikenStrategienPage: NextPage = () => {
  const canonicalUrl = `${SITE_URL}/taktiken-und-strategien/`;

  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => document.body.classList.remove('lexikon-page');
  }, []);

  const breadcrumbItems = [
    { name: 'Jass-Wiki', href: '/' },
    { name: 'Taktiken und Strategien', href: '/taktiken-und-strategien/' },
  ];

  return (
    <>
      <SeoHead
        title="Jass-Taktik & Strategie: Verwerfen, Anziehen, Trumpfkonventionen | Jass-Wiki"
        description="Die wichtigsten Jass-Taktiken und Strategien: Verwerfen, Anziehen, Hoch-tief, Nell vor Puur und Nachschmeissen. Wie sich Partner beim Schieber über ihre Karten verständigen."
        canonicalUrl={canonicalUrl}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: 'Jass-Taktik und Strategie',
              description: 'Die wichtigsten Taktiken und Strategien beim Schweizer Jass: wie sich Partner über die Wahl und Reihenfolge ihrer Karten verständigen.',
              author: {
                '@type': 'Organization',
                name: 'JassWiki',
                url: SITE_URL,
              },
              publisher: {
                '@type': 'Organization',
                name: 'Jassverband Schweiz',
                url: 'https://jassverband.ch',
              },
              mainEntityOfPage: canonicalUrl,
              about: {
                '@type': 'Thing',
                name: 'Jass',
                sameAs: 'https://www.wikidata.org/wiki/Q786768',
              },
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
              Jass-Taktik und Strategie
            </h1>
            <div className="font-inter text-[15px] sm:text-[16px] text-[#5f5b53] leading-[1.7] space-y-4">
              <p>
                Beim Jassen entscheidet selten das bessere Blatt allein. Gerade beim{' '}
                <Link href="/schieber/" className="text-[#ff0000] hover:underline">Schieber</Link>{' '}
                und{' '}
                <Link href="/varianten/coiffeur/" className="text-[#ff0000] hover:underline">Coiffeur</Link>{' '}
                ist entscheidend, wie man mit seinem Partner zusammenspielt. Der Grundsatz lautet: Man spielt mit 18 Karten und nicht mit neun.
              </p>
              <p>
                Dabei ist von zentraler Bedeutung, wie man sich mit seinem Partner über die Wahl der Karte und die Reihenfolge, in der man sie spielt, verständigt, natürlich ohne ein Wort dabei zu sagen. Hier lernst du die wichtigsten Konventionen, Taktiken und Strategien kennen, wie du mit deinem Partner durch die Wahl der Karten kommunizierst.
              </p>
              <p>
                Wer neu einsteigt, beginnt am besten bei der{' '}
                <Link href="/taktiken-und-strategien/kommunikation-signale/" className="text-[#ff0000] hover:underline">Signalsprache zwischen Partnern</Link>{' '}
                mit Konventionen wie{' '}
                <Link href="/taktiken-und-strategien/kommunikation-signale/verwerfen/" className="text-[#ff0000] hover:underline">Verwerfen</Link>{' '}
                oder{' '}
                <Link href="/taktiken-und-strategien/kommunikation-signale/anziehen/" className="text-[#ff0000] hover:underline">Anziehen</Link>. Die übrigen Artikel vertiefen einzelne Konventionen, beispielsweise wie man beim{' '}
                <Link href="/taktiken-und-strategien/kommunikation-signale/verwerfen-beim-slalom/" className="text-[#ff0000] hover:underline">Slalom</Link>{' '}
                anzeigt, ob der Partner hoch oder tief übergeben soll.
              </p>
            </div>
          </header>

          {/* Themenbereiche — Cards */}
          <section className="not-prose">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[16px] leading-[1.2]">
              Themenbereiche
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] sm:gap-[16px]">
              {[
                {
                  slug: 'kommunikation-signale',
                  name: 'Kommunikation & Signale',
                  desc: 'Wie sich Partner über die Wahl und Reihenfolge ihrer Karten verständigen, ganz ohne Worte.',
                  label: '8 Artikel',
                },
                {
                  slug: 'punktetaktiken',
                  name: 'Punktetaktiken',
                  desc: 'Punkte, Multiplikatoren, Berg und Schneider im Blick behalten, statt nur aufs Blatt zu schauen.',
                  label: 'Strategie-Artikel',
                },
              ].map((c) => (
                <Link
                  key={c.slug}
                  href={`/taktiken-und-strategien/${c.slug}/`}
                  className="group block"
                >
                  <div className="h-full bg-[#f0eee7]/50 border border-[#e8e6df] rounded-[12px] px-[16px] sm:px-[20px] py-[16px] sm:py-[18px] hover:border-[#d5d0c6] hover:bg-[#f0eee7] transition-colors flex flex-col">
                    <div className="flex items-center justify-between mb-[6px]">
                      <h3 className="font-capita text-[17px] sm:text-[19px] font-bold !text-black leading-[1.25] group-hover:!text-[#ff0000] transition-colors">
                        {c.name}
                      </h3>
                      <svg className="w-5 h-5 text-[#88816d] flex-shrink-0 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    <p className="font-inter text-[13px] sm:text-[14px] text-[#88816d] leading-[1.5] flex-grow">
                      {c.desc}
                    </p>
                    <span className="font-inter text-[12px] sm:text-[13px] font-medium text-[#2bb752] mt-[10px]">
                      {c.label}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Die wichtigsten Taktiken */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Die wichtigsten Taktiken
            </h2>
            <p className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] mb-6">
              Fünf Konventionen tauchen in fast jeder Partie auf. Wer sie kennt, versteht, was der Partner mit seinen Karten sagt.
            </p>
            <ul className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-3 list-disc pl-5">
              <li>
                <Link href="/taktiken-und-strategien/kommunikation-signale/verwerfen/" className="text-[#ff0000] hover:underline font-medium">Verwerfen</Link>:
                {' '}Schwache Farben gezielt abwerfen und dem Partner zeigen, was man nicht braucht.
              </li>
              <li>
                <Link href="/taktiken-und-strategien/kommunikation-signale/anziehen/" className="text-[#ff0000] hover:underline font-medium">Anziehen</Link>:
                {' '}Eine Farbe ausspielen, in der man stark ist, und den Partner zum Nachspielen auffordern.
              </li>
              <li>
                <Link href="/taktiken-und-strategien/kommunikation-signale/austrumpfen-hoch-oder-tief/" className="text-[#ff0000] hover:underline font-medium">Hoch-tief / Tief-hoch</Link>:
                {' '}An der Reihenfolge der Trümpfe ablesen, wie viele der Partner hält.
              </li>
              <li>
                <Link href="/taktiken-und-strategien/kommunikation-signale/nell-vor-puur/" className="text-[#ff0000] hover:underline font-medium">Nell vor Puur</Link>:
                {' '}Wer mit dem Nell eröffnet, signalisiert dem Partner, dass er auch den Puur hält.
              </li>
              <li>
                <Link href="/taktiken-und-strategien/kommunikation-signale/nachschmeissen/" className="text-[#ff0000] hover:underline font-medium">Nachschmeissen</Link>:
                {' '}Nur im ersten Stich bei Obenabe und Undenufe. Auf das Ass des Partners wirft man den König derselben Farbe nach (bei Undenufe auf den Sechser den Siebner).
              </li>
            </ul>
          </section>

          {/* Kommunikation und Signale */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Kommunikation und Signale
            </h2>
            <div className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-4">
              <p>
                In einem eingespielten Team verständigen sich die Partner über ihre Karten. Mit der Wahl und der Reihenfolge gibt man Auskunft darüber, was man hält, und liest dieselben Zeichen aus dem Spiel des Partners zurück. Die{' '}
                <Link href="/taktiken-und-strategien/kommunikation-signale/" className="text-[#ff0000] hover:underline">Signalsprache zwischen Partnern</Link>{' '}
                fasst diese Konventionen zusammen.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><Link href="/taktiken-und-strategien/kommunikation-signale/anziehen/" className="text-[#ff0000] hover:underline font-medium">Anziehen</Link>: eine starke Farbe anzeigen.</li>
                <li><Link href="/taktiken-und-strategien/kommunikation-signale/verwerfen/" className="text-[#ff0000] hover:underline font-medium">Verwerfen</Link>: eine schwache Farbe abwerfen und damit informieren.</li>
                <li><Link href="/taktiken-und-strategien/kommunikation-signale/austrumpfen-hoch-oder-tief/" className="text-[#ff0000] hover:underline font-medium">Hoch-tief / Tief-hoch</Link>: die Anzahl Trümpfe anzeigen.</li>
                <li><Link href="/taktiken-und-strategien/kommunikation-signale/nell-vor-puur/" className="text-[#ff0000] hover:underline font-medium">Nell vor Puur</Link>: den Besitz vom Puur signalisieren.</li>
                <li><Link href="/taktiken-und-strategien/kommunikation-signale/querverwerfen/" className="text-[#ff0000] hover:underline font-medium">Querverwerfen</Link>: gezielt eine andere Farbe abwerfen.</li>
                <li><Link href="/taktiken-und-strategien/kommunikation-signale/nachschmeissen/" className="text-[#ff0000] hover:underline font-medium">Nachschmeissen</Link>: dem Partner im ersten Stich nachwerfen.</li>
              </ul>
              <p>
                <Link href="/taktiken-und-strategien/kommunikation-signale/" className="inline-flex items-center text-[#ff0000] font-medium hover:underline">
                  Alle Artikel zu Kommunikation und Signale &rarr;
                </Link>
              </p>
            </div>
          </section>

          {/* Punkte im Blick */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Punkte im Blick behalten
            </h2>
            <div className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-4">
              <p>
                Über die Signale hinaus entscheidet auch, wie man die Punkte führt. Wer nur auf das eigene Blatt schaut und den Punktestand ignoriert, sagt schnell einen hohen Multiplikator an, der dem Gegner den Sieg schenkt. Wann sich ein hoher Multiplikator lohnt und wann nicht, zeigen die{' '}
                <Link href="/taktiken-und-strategien/punktetaktiken/" className="text-[#ff0000] hover:underline">Punktetaktiken</Link>.
              </p>
            </div>
          </section>

          {/* FAQs */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Häufige Fragen zur Jass-Taktik
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

export default TaktikenStrategienPage;
