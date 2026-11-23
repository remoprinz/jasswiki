import React, { useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import { SeoHead } from '@/components/layout/SeoHead';
import { GameSchema } from '@/components/seo/GameSchema';
import { FaqJsonLdSchema } from '@/components/seo/FaqJsonLdSchema';
import { FARBEN_ZUORDNUNG } from '@/config/farbenZuordnung';
import { InternalLinker } from '@/components/layout/InternalLinker';
import { jassenSeiteAbsatz } from '@/components/wissen/rubriken';

const jassenAbsatz = jassenSeiteAbsatz();

const SITE_URL = 'https://jasswiki.ch';

const FAQS = [
  // 1. Was ist es?
  {
    question: 'Was ist Jassen?',
    answer: 'Jassen ist das beliebteste Kartenspiel der Schweiz, gespielt mit 36 Karten in über 40 Varianten.',
  },
  // 1a. Das Wort: «der Jass» und «das Jassen» stimmen beide, «ein Jass» ist auch eine Partie (Remo 22.11.2026).
  {
    question: 'Heisst es Jass oder Jassen?',
    answer: 'Beides ist richtig. Der Jass bezeichnet eher das Spiel, jassen eher die Tätigkeit. Auch «das Jassen» steht für das Spiel. Ein Jass ist zudem eine Partie: Man klopft einen Jass.',
  },
  // 1b. Grundablauf — wie wird gespielt?
  {
    question: 'Wie geht Jassen?',
    answer: 'Vier Personen bilden zwei Teams (die Partner sitzen sich gegenüber) und erhalten je 9 der 36 Karten. Eine Farbe wird zum Trumpf bestimmt. Der Reihe nach spielt jede Person eine Karte. Wer die ausgespielte Farbe hat, muss sie spielen. Mit einem Trumpf darf man jederzeit abstechen. Den Stich gewinnt die höchste Trumpfkarte. Liegt kein Trumpf im Stich, gewinnt die höchste Karte der ausgespielten Farbe. Wer den Stich macht, spielt die nächste Karte aus. Gezählt werden die Kartenpunkte der gewonnenen Stiche, 157 pro Runde. Die häufigste Variante ist der Schieber.',
  },
  // 2. Wie funktioniert die beliebteste Variante?
  {
    question: 'Wie geht Schieber?',
    answer: 'Vier Spieler, zwei Teams, 9 Karten pro Person. Ein Spieler wählt Trumpf oder schiebt die Wahl an den Partner. Ziel: möglichst viele der 157 Punkte pro Runde.',
  },
  // 3. Die wichtigsten Regeln
  {
    question: 'Was sind die wichtigsten Jassregeln?',
    answer: 'Wer die ausgespielte Farbe hat, muss sie spielen. Mit einem Trumpf darf man jederzeit abstechen. Tiefer trumpfen darf, wer nur noch Trumpfkarten hat. Wer den Stich macht, spielt die nächste Karte aus. Eine Runde hat immer 157 Punkte (152 Kartenpunkte + 5 für den letzten Stich).',
  },
  // 4. Punkte
  {
    question: 'Wie viele Punkte hat eine Jassrunde?',
    answer: 'Jede Runde hat exakt 157 Punkte: 152 Kartenpunkte plus 5 Bonuspunkte für den letzten Stich.',
  },
  // 5. Weis
  {
    question: 'Was ist ein Weis beim Jassen?',
    answer: 'Ein Weis ist eine Kartenkombination (z.B. drei oder mehr aufeinanderfolgende Karten gleicher Farbe), die Bonuspunkte bringt. Gemeldet wird er mit der ersten Karte, die man ausspielt. Ein Dreiblatt gibt 20 Punkte, ein Vierblatt 50, ein Fünfblatt 100.',
  },
  // 6. Stöck-Weis-Stich
  {
    question: 'Was bedeutet Stöck-Weis-Stich?',
    answer: 'Stöck-Weis-Stich ist eine Ausmachregel. Erreichen beide Teams im ersten Stich gleichzeitig das Ziel, entscheidet, womit sie es erreichen: Stöck (König und Ober der Trumpffarbe, 20 Punkte) vor Weis, Weis vor Stich. Ist nichts anderes abgemacht, gilt Stöck-Weis-Stich.',
  },
  // 7. Matsch
  {
    question: 'Was ist ein Matsch beim Jassen?',
    answer: 'Ein Matsch bedeutet, dass ein Team alle 9 Stiche einer Runde gewonnen hat. Das gibt 100 Bonuspunkte zusätzlich zu den regulären 157 Punkten.',
  },
  // 8. Puur
  {
    question: 'Was ist ein Puur?',
    answer: 'Der Under (Bauer) der Trumpffarbe: die höchste und wertvollste Karte im Trumpfspiel, 20 Punkte.',
  },
  // 9. Obenabe/Undenufe
  {
    question: 'Was ist der Unterschied zwischen Obenabe und Undenufe?',
    answer: 'Bei Obenabe sticht die höchste Karte (Ass), bei Undenufe die niedrigste (6). Beide werden ohne Trumpf gespielt.',
  },
  // 10. Varianten
  {
    question: 'Welche Jass-Varianten gibt es?',
    answer: 'Über 40: Schieber (die beliebteste), Coiffeur, Differenzler (bekannt vom Samschtig-Jass), Molotow, Pandur, Sidi Barrani, Tschau Sepp und viele mehr.',
  },
  // 11. Coiffeur
  {
    question: 'Wie geht Coiffeur?',
    answer: 'Beim Coiffeur muss jede Ansage (Trumpf in allen vier Farben, Obenabe, Undenufe, Slalom etc.) genau einmal gespielt werden. Die Punkte werden je nach Ansage unterschiedlich multipliziert.',
  },
  // 12. Herkunft
  {
    question: 'Woher kommt das Jassen?',
    answer: 'Der Ursprung liegt in den Niederlanden. Über Frankreich gelangte das Spiel im späten 18. Jahrhundert in die Schweiz. Die erste bekannte Erwähnung stammt von 1796 aus Schaffhausen.',
  },
  // 13. Kulturgut
  {
    question: 'Ist Jassen ein offizielles Kulturgut?',
    answer: 'Ja, das Bundesamt für Kultur (BAK) führt Jassen als lebendige Tradition der Schweiz.',
  },
];

const JassenPage: NextPage = () => {
  const canonicalUrl = `${SITE_URL}/jassen/`;

  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => document.body.classList.remove('lexikon-page');
  }, []);

  const breadcrumbItems = [
    { name: 'Jass-Wiki', href: '/' },
    { name: 'Jassen', href: '/jassen/' },
  ];

  return (
    <>
      <SeoHead
        title="Jassen: Schweizer Jass mit Regeln und Varianten | Jass-Wiki"
        description="Jassen ist das beliebteste Kartenspiel der Schweiz. Alles für deinen nächsten Jass: Regeln, Varianten, Karten, Geschichte und Kultur."
        canonicalUrl={canonicalUrl}
      />
      <GameSchema
        name="Jassen"
        description="Das beliebteste Kartenspiel der Schweiz, gespielt mit 36 Karten in über 40 Varianten. Vom Schieber über Coiffeur bis Differenzler."
        url={canonicalUrl}
        wikidataId="Q786768"
        numberOfPlayers={{ min: 2, max: 6 }}
        difficulty={2}
      />
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: 'Jassen: Schweizer Jass mit Regeln und Varianten',
              description: 'Jassen ist das beliebteste Kartenspiel der Schweiz. Alles für deinen nächsten Jass: Regeln, Varianten, Karten, Geschichte und Kultur.',
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
              sameAs: 'https://www.wikidata.org/wiki/Q786768',
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
              Jassen
            </h1>
            {/* Untertitel: Remos Wortlaut (22.11.2026). */}
            <p className="font-capita text-[18px] sm:text-[20px] font-bold text-black leading-[1.3] mb-[12px]">
              Wenn du einen Jass klopfen willst, bist du hier genau richtig.
            </p>
            <p className="font-inter text-[15px] sm:text-[16px] text-[#5f5b53] leading-[1.7]">
              Jassen ist das beliebteste Kartenspiel der Schweiz. Wer jasst, spielt einen Jass. In Stuben, Beizen und auf digitalen Plattformen wird seit über 200 Jahren gejasst: allein gegen den Computer, zu zweit, zu dritt oder im Team. Vom einfachen{' '}
              <Link href="/varianten/tschau-sepp/" className="text-[#ff0000] hover:underline">Tschau Sepp</Link>{' '}
              bis zum taktisch anspruchsvollen{' '}
              <Link href="/schieber/" className="text-[#ff0000] hover:underline">Schieber</Link>{' '}
              oder{' '}
              <Link href="/varianten/sidi-barrani/" className="text-[#ff0000] hover:underline">Sidi Barrani</Link>{' '}
              kennt das Jassen über{' '}
              <Link href="/varianten/" className="text-[#ff0000] hover:underline">40 Varianten</Link>.{' '}
              Das Bundesamt für Kultur (BAK) führt Jassen als{' '}
              <Link href="/geschichte/kulturelle-bedeutung/verbreitung-und-gesellschaftliche-bedeutung/" className="text-[#ff0000] hover:underline">lebendige Tradition</Link>{' '}
              im nationalen Inventar.
            </p>
            {/* Wege zu Lernen, Jass-KI und Jass-Apps (rubriken.json, verweise.jassen_seite) */}
            {jassenAbsatz && (
              <div className="mt-[12px] content-formatting text-black" data-jassen-wege>
                <InternalLinker text={jassenAbsatz} />
              </div>
            )}
          </header>

          {/* Der Schieber */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Der Schieber: die beliebteste Variante
            </h2>
            <div className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-4">
              <p>
                Der{' '}
                <Link href="/schieber/" className="text-[#ff0000] hover:underline">Schieber</Link>{' '}
                ist die meistgespielte Jass-Variante der Schweiz. Vier Spieler bilden zwei Teams. Die Partner sitzen sich gegenüber. Jeder erhält 9 Karten. Ziel ist es, durch Stiche möglichst viele der{' '}
                <Link href="/regeln/" className="text-[#ff0000] hover:underline">157 Punkte</Link>{' '}
                pro Runde zu sammeln. Gespielt wird auf eine abgemachte Punktzahl, etwa 1000, 2000 oder 2500. Der{' '}
                <Link href="/begriffe/punktebegriffe/matsch/" className="text-[#ff0000] hover:underline">Matsch</Link>{' '}
                gibt 100 Bonuspunkte.
              </p>
              <p>
                Was den Schieber besonders macht: Vorhand kann die Trumpfwahl dem Partner «<Link href="/begriffe/spielaktionen/schieben/" className="text-[#ff0000] hover:underline">schieben</Link>». Daher kommt der Name.
              </p>
              <p>
                <strong>Besonderheit:</strong> In der Schweiz wird gegen den Uhrzeigersinn gegeben und gespielt, «immer der Ohrfeige nach», wie es heisst. In den meisten anderen Ländern geht es im Uhrzeigersinn.
              </p>
              <p>
                <Link href="/schieber/" className="inline-flex items-center text-[#ff0000] font-medium hover:underline">
                  Alles zum Schieber: Regeln, Taktik &amp; Strategie →
                </Link>
              </p>
            </div>
          </section>

          {/* Varianten */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Jass-Varianten
            </h2>
            <p className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] mb-6">
              Das Jassen kennt über 40 dokumentierte Varianten, von der Königsdisziplin bis zum schnellen Gesellschaftsspiel.
            </p>

            {/* Partnerspiele */}
            <h3 className="font-capita text-[17px] sm:text-[19px] font-bold text-black mb-3">Partnerspiele (im Team)</h3>
            <ul className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-2 mb-6 list-disc pl-5">
              <li><Link href="/schieber/" className="text-[#ff0000] hover:underline font-medium">Schieber</Link>: 4 Spieler, 2 Teams. Die Standardvariante.</li>
              <li><Link href="/varianten/coiffeur/" className="text-[#ff0000] hover:underline font-medium">Coiffeur</Link>: Jedes Team spielt jede Ansage genau einmal.</li>
              <li><Link href="/varianten/sidi-barrani/" className="text-[#ff0000] hover:underline font-medium">Sidi Barrani</Link>: Ein Bietspiel. Wer das höchste Gebot abgibt, bestimmt den Trumpf und muss die angesagte Punktzahl erreichen.</li>
              <li><Link href="/varianten/bolschewik-4-spieler/" className="text-[#ff0000] hover:underline font-medium">Bolschewik</Link>: Partnerspiel mit einem Doppelkart ohne Sechser, Siebner und Achter, 48 Karten.</li>
            </ul>

            {/* Einzelspiele */}
            <h3 className="font-capita text-[17px] sm:text-[19px] font-bold text-black mb-3">Einzelspiele (jeder gegen jeden)</h3>
            <ul className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-2 mb-6 list-disc pl-5">
              <li><Link href="/varianten/differenzler/" className="text-[#ff0000] hover:underline font-medium">Differenzler</Link>: Jede Person schätzt ihre Kartenpunkte. Geschrieben wird die Differenz zur Ansage, das kleinste Differenz-Total gewinnt. Die Jassart des Samschtig-Jass auf SRF.</li>
              <li><Link href="/varianten/molotow/" className="text-[#ff0000] hover:underline font-medium">Molotow</Link>: Ein Vermeidungsspiel. Es gewinnt, wer am wenigsten Punkte sammelt. Den Trumpf bestimmt, wer als Erster nicht bedienen kann.</li>
              <li><Link href="/varianten/handjass/" className="text-[#ff0000] hover:underline font-medium">Handjass</Link>: Jeder spielt für sich. Die unterste Karte des Stapels bestimmt den Trumpf.</li>
            </ul>

            {/* Königsspiele */}
            <h3 className="font-capita text-[17px] sm:text-[19px] font-bold text-black mb-3">Königsspiele (einer gegen alle)</h3>
            <ul className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-2 mb-6 list-disc pl-5">
              <li><Link href="/varianten/pandur/" className="text-[#ff0000] hover:underline font-medium">Pandur</Link>: Wer am höchsten bietet, spielt allein gegen die beiden anderen. 24 Karten, gespielt wird streng nach Regeln.</li>
              <li><Link href="/varianten/bieter/" className="text-[#ff0000] hover:underline font-medium">Bieter</Link>: Ein Bietspiel wie der Pandur, mit 36 Karten.</li>
            </ul>

            {/* Gesellschaftsspiele */}
            <h3 className="font-capita text-[17px] sm:text-[19px] font-bold text-black mb-3">Gesellschafts- und Lernspiele</h3>
            <ul className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-2 mb-6 list-disc pl-5">
              <li><Link href="/varianten/tschau-sepp/" className="text-[#ff0000] hover:underline font-medium">Tschau Sepp</Link>: Das Schweizer Mau-Mau mit Jasskarten. Ideal zum Einstieg.</li>
              <li><Link href="/varianten/chratze/" className="text-[#ff0000] hover:underline font-medium">Chratze</Link>: Schnelles Topfspiel mit 4 Karten je Spieler.</li>
              <li><Link href="/varianten/guggitaler/" className="text-[#ff0000] hover:underline font-medium">Guggitaler</Link>: Serienjass ohne Trumpf. Fünf Spiele, in jedem gilt ein anderes Ziel.</li>
            </ul>

            <p>
              <Link href="/varianten/" className="inline-flex items-center text-[#ff0000] font-medium hover:underline">
                Alle 40+ Varianten im Überblick →
              </Link>
            </p>
          </section>

          {/* Die Karten */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Die Karten
            </h2>
            <div className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-4">
              <p>
                In der Schweiz wird mit 36 Karten gespielt: 4 Farben mit je 9 Karten (6, 7, 8, 9, 10, Under, Ober, König, Ass).
              </p>
              <p>Zwei Kartensysteme sind verbreitet:</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e8e6df]">
                      <th className="py-2 pr-4 font-capita font-bold text-black">Schweizer Blatt</th>
                      <th className="py-2 font-capita font-bold text-black">Französisches Blatt</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#5f5b53]">
                    {FARBEN_ZUORDNUNG.map((p, i) => (
                      <tr key={p.code} className={i < FARBEN_ZUORDNUNG.length - 1 ? 'border-b border-[#f0eee7]' : undefined}>
                        <td className="py-2 pr-4">{p.de}</td>
                        <td className="py-2">{p.fr} {p.zeichen}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p>
                Welches Blatt auf den Tisch kommt, hängt von der Region ab. Die Grenze verläuft entlang der Brünig-Napf-Reuss-Linie. Westlich davon, in der Romandie, in Bern, Solothurn, beiden Basel, im Wallis und im westlichen Aargau, liegen französische Karten auf dem Tisch. Östlich davon, in der Zentralschweiz, in Zürich und in der Ostschweiz, liegen Deutschschweizer Karten mit Schellen, Schilten, Rosen und Eichel. Französische Karten liegen zudem im Tessin, in Teilen Graubündens und nach Walter Haas auch im Thurgau auf dem Tisch.
              </p>
              <p>
                <strong>Jasskarten-Design:</strong> Die Figuren der Deutschschweizer Karten gehen auf{' '}
                <Link href="/geschichte/schweizer-kartenmacher/" className="text-[#ff0000] hover:underline">Jakob Peyer</Link>{' '}
                und den Kartenhersteller A. Bühlmann in Hasle zurück. Das heutige doppelköpfige Bild druckte J. Müller in Schaffhausen ab den 1920er-Jahren.
              </p>
              <p>
                In jüngster Zeit erlebt das Jasskarten-Design eine Renaissance: Unabhängige Schweizer Designer wie{' '}
                <a href="https://schweizerjass.ch" target="_blank" rel="noopener noreferrer" className="text-[#ff0000] hover:underline">schweizerjass.ch</a>{' '}
                interpretieren die historischen, gemeinfreien Ursprungsmotive neu, mit zeitgemässer Gestaltung und eigenständiger Produktion in der Schweiz.
              </p>
              <p><strong>Besondere Karten im Trumpf:</strong></p>
              <ul className="list-disc pl-5 space-y-1">
                <li><Link href="/begriffe/kartenbezeichnungen/trumpf-bauer/" className="text-[#ff0000] hover:underline font-medium">Puur</Link> (Under der Trumpffarbe): höchste Karte im Trumpfspiel, 20 Punkte</li>
                <li><Link href="/begriffe/kartenbezeichnungen/nell/" className="text-[#ff0000] hover:underline font-medium">Nell</Link> (9 der Trumpffarbe): zweithöchste Karte, 14 Punkte</li>
              </ul>
              <p>
                <Link href="/regeln/" className="inline-flex items-center text-[#ff0000] font-medium hover:underline">
                  Kartenwerte, Farben und Rangfolge →
                </Link>
              </p>
            </div>
          </section>

          {/* Spielmodi */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Spielmodi (Ansagen)
            </h2>
            <div className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-4">
              <p>
                Im{' '}
                <Link href="/schieber/" className="text-[#ff0000] hover:underline">Schieber</Link>{' '}
                und{' '}
                <Link href="/varianten/coiffeur/" className="text-[#ff0000] hover:underline">Coiffeur</Link>{' '}
                wählt ein Spieler zu Beginn jeder Runde den Spielmodus. Neben den vier Trumpffarben gibt es weitere Ansagen:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Trumpf</strong>: Eine der vier Farben wird Trumpf. <Link href="/begriffe/kartenbezeichnungen/trumpf-bauer/" className="text-[#ff0000] hover:underline">Puur</Link> und <Link href="/begriffe/kartenbezeichnungen/nell/" className="text-[#ff0000] hover:underline">Nell</Link> dominieren.</li>
                <li><Link href="/ansagen/obenabe/" className="text-[#ff0000] hover:underline font-medium">Obenabe</Link>: Ohne Trumpf. Die höchste Karte sticht, das Ass ist die stärkste.</li>
                <li><Link href="/ansagen/undenufe/" className="text-[#ff0000] hover:underline font-medium">Undenufe</Link>: Ohne Trumpf. Die tiefste Karte sticht, die 6 ist die stärkste.</li>
                <li><Link href="/ansagen/slalom-zickzack/" className="text-[#ff0000] hover:underline font-medium">Slalom</Link>: Von Stich zu Stich abwechselnd Obenabe und Undenufe.</li>
                <li><Link href="/ansagen/quer/" className="text-[#ff0000] hover:underline font-medium">Quer</Link>: Die neun Stiche werden geteilt, ein Teil nach Obenabe, der andere nach Undenufe. Feste Formen sind Guschti und Mary.</li>
                <li><Link href="/ansagen/trio-3-3/" className="text-[#ff0000] hover:underline font-medium">Trio</Link>: 3 Stiche Trumpf, 3 Stiche Obenabe, 3 Stiche Undenufe. Die Reihenfolge ist frei wählbar.</li>
                <li><Link href="/ansagen/misere/" className="text-[#ff0000] hover:underline font-medium">Misère</Link>: Ziel ist, möglichst jeden Stich abzugeben.</li>
              </ul>
              <p>
                <Link href="/ansagen/" className="inline-flex items-center text-[#ff0000] font-medium hover:underline">
                  Alle Spielmodi erklärt →
                </Link>
              </p>
            </div>
          </section>

          {/* Weis und Stöck */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Weis und Stöck
            </h2>
            <div className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-4">
              <p>
                Ein{' '}
                <Link href="/weis-regeln/weispunkte/" className="text-[#ff0000] hover:underline">Weis</Link>{' '}
                ist eine Kartenkombination, die Bonuspunkte bringt. Gemeldet wird er mit der ersten Karte, die man ausspielt.
              </p>

              <p><strong>Folgen (gleiche Farbe, aufeinanderfolgende Werte):</strong></p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e8e6df]">
                      <th className="py-2 pr-4 font-capita font-bold text-black">Weis</th>
                      <th className="py-2 pr-4 font-capita font-bold text-black">Karten</th>
                      <th className="py-2 font-capita font-bold text-black text-right">Punkte</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#5f5b53]">
                    <tr className="border-b border-[#f0eee7]"><td className="py-2 pr-4"><Link href="/weis-regeln/weispunkte/" className="text-[#ff0000] hover:underline">Dreiblatt</Link></td><td className="py-2 pr-4">3 aufeinanderfolgende</td><td className="py-2 text-right">20</td></tr>
                    <tr className="border-b border-[#f0eee7]"><td className="py-2 pr-4"><Link href="/weis-regeln/weispunkte/" className="text-[#ff0000] hover:underline">Vierblatt</Link></td><td className="py-2 pr-4">4 aufeinanderfolgende</td><td className="py-2 text-right">50</td></tr>
                    <tr className="border-b border-[#f0eee7]"><td className="py-2 pr-4"><Link href="/weis-regeln/weispunkte/" className="text-[#ff0000] hover:underline">Fünfblatt</Link></td><td className="py-2 pr-4">5 aufeinanderfolgende</td><td className="py-2 text-right">100</td></tr>
                    <tr><td className="py-2 pr-4"><Link href="/weis-regeln/weispunkte/" className="text-[#ff0000] hover:underline">Sechsblatt</Link></td><td className="py-2 pr-4">6 aufeinanderfolgende</td><td className="py-2 text-right">150</td></tr>
                  </tbody>
                </table>
              </div>

              <p><strong>Vier Gleiche:</strong></p>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#e8e6df]">
                      <th className="py-2 pr-4 font-capita font-bold text-black">Karten</th>
                      <th className="py-2 font-capita font-bold text-black text-right">Punkte</th>
                    </tr>
                  </thead>
                  <tbody className="text-[#5f5b53]">
                    <tr className="border-b border-[#f0eee7]"><td className="py-2 pr-4"><Link href="/weis-regeln/weispunkte/" className="text-[#ff0000] hover:underline">Vier gleiche</Link> (6, 7, 8, Banner, Ober, König, Ass)</td><td className="py-2 text-right">100</td></tr>
                    <tr className="border-b border-[#f0eee7]"><td className="py-2 pr-4">Vier Nell (9er)</td><td className="py-2 text-right">150</td></tr>
                    <tr><td className="py-2 pr-4">Vier Puur (Under)</td><td className="py-2 text-right">200</td></tr>
                  </tbody>
                </table>
              </div>

              <p>
                <Link href="/weis-regeln/stoeck/" className="text-[#ff0000] hover:underline font-medium">Stöck</Link>: Wer König und Ober (oder Dame) der Trumpffarbe hält, meldet Stöck = 20 Punkte.
              </p>
              <p>
                <Link href="/weis-regeln/" className="inline-flex items-center text-[#ff0000] font-medium hover:underline">
                  Weis-Regeln im Detail →
                </Link>
              </p>
            </div>
          </section>

          {/* Geschichte */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Geschichte
            </h2>
            <div className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-4">
              <p>
                Der Ursprung des Jass liegt in den Niederlanden. Über Frankreich gelangte das Spiel im späten 18. Jahrhundert in die Schweiz. Die älteste bekannte Erwähnung stammt von 1796 aus Schaffhausen: Zwei Pfarrer verklagten zwei Bauern, die um ein Glas Wein ein Spiel spielten, «welches man das Jassen nenne».
              </p>
              <p>
                Im 19. Jahrhundert verbreitete sich das Jassen mit der Industrialisierung. Die Menschen zogen in die Städte und brachten das Spiel mit. In Fabriken und Gasthäusern wurde es zum beliebten Freizeitvergnügen. Im März 1895 erschien das «Ramstein-Reglement», das älteste bekannte Jassreglement der Schweiz, verfasst von J.N. Ramstein und Leo Philipona in Freiburg.
              </p>
              <p>
                Den «Samschtig-Jass» von SRF gibt es seit 1967. Am Fernsehtisch wird die{' '}
                <Link href="/varianten/differenzler/" className="text-[#ff0000] hover:underline">Differenzler-Variante</Link>{' '}
                gejasst.
              </p>
              <p>
                Heute steht das Jassen auf der Liste der lebendigen Traditionen in der Schweiz und wird vom{' '}
                <a href="https://jassverband.ch" target="_blank" rel="noopener noreferrer" className="text-[#ff0000] hover:underline">Jassverband Schweiz (JVS)</a>{' '}
                als strategischer Denksport gefördert.
              </p>
              <p>
                <Link href="/geschichte/" className="inline-flex items-center text-[#ff0000] font-medium hover:underline">
                  Zur vollständigen Geschichte des Jassens →
                </Link>
              </p>
            </div>
          </section>

          {/* Jass-Begriffe */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Jass-Begriffe
            </h2>
            <div className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-4">
              <p>
                Das Jassen hat ein reiches Vokabular, von{' '}
                <Link href="/begriffe/punktebegriffe/matsch/" className="text-[#ff0000] hover:underline">Matsch</Link>{' '}
                über{' '}
                <Link href="/regeln/punktezaehlung/schneider/" className="text-[#ff0000] hover:underline">Schneider</Link>{' '}
                bis{' '}
                <Link href="/regeln/ausmachregel/" className="text-[#ff0000] hover:underline">Stöck-Weis-Stich</Link>.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><Link href="/begriffe/punktebegriffe/matsch/" className="text-[#ff0000] hover:underline font-medium">Matsch</Link>: Ein Team macht alle 9 Stiche. Das gibt 100 Bonuspunkte.</li>
                <li><Link href="/regeln/punktezaehlung/schneider/" className="text-[#ff0000] hover:underline font-medium">Schneider</Link>: Ein Team bleibt bis Spielende unter der Hälfte des Spielziels, während der Gegner gewinnt. Der Sieger schreibt zwei Striche.</li>
                <li><Link href="/begriffe/spielaktionen/schmieren/" className="text-[#ff0000] hover:underline font-medium">Schmieren</Link>: Dem Partner wertvolle Karten in seinen Stich spielen.</li>
                <li><Link href="/regeln/ausmachregel/" className="text-[#ff0000] hover:underline font-medium">Stöck-Weis-Stich</Link>: Eine Ausmachregel. Erreichen beide Teams im ersten Stich gleichzeitig das Ziel, gilt Stöck vor Weis vor Stich.</li>
                <li><Link href="/begriffe/kartenbezeichnungen/bock/" className="text-[#ff0000] hover:underline font-medium">Bock</Link>: Die höchste Karte einer Farbe, die noch im Spiel ist. Stechen kann sie nur ein Trumpf.</li>
              </ul>
              <p>
                <Link href="/begriffe/" className="inline-flex items-center text-[#ff0000] font-medium hover:underline">
                  Das Jass-Glossar mit allen Begriffen →
                </Link>
              </p>
            </div>
          </section>

          {/* Kulturgut */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Jassen als Kulturgut
            </h2>
            <div className="font-inter text-[15px] text-[#5f5b53] leading-[1.7] space-y-4">
              <p>
                Das Bundesamt für Kultur (BAK) führt Jassen in der{' '}
                <a href="https://www.lebendige-traditionen.ch/de/jassen" target="_blank" rel="noopener noreferrer" className="text-[#ff0000] hover:underline">
                  Liste der lebendigen Traditionen der Schweiz
                </a>.{' '}
                Der{' '}
                <a href="https://jassverband.ch" target="_blank" rel="noopener noreferrer" className="text-[#ff0000] hover:underline">
                  Jassverband Schweiz (JVS)
                </a>{' '}
                organisiert die erste nationale Team-Schweizermeisterschaft und betreibt mit{' '}
                <a href="https://jassguru.ch" target="_blank" rel="noopener noreferrer" className="text-[#ff0000] hover:underline">JassGuru</a>{' '}
                die Jass-App und mit JassWiki die Wissensplattform zum Jassen.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/geschichte/kulturelle-bedeutung/verbreitung-und-gesellschaftliche-bedeutung/" className="inline-flex items-center text-[#ff0000] font-medium hover:underline">
                  Jassen als Kulturgut →
                </Link>
                <Link href="/taxonomie/" className="inline-flex items-center text-[#ff0000] font-medium hover:underline">
                  Taxonomie des Jassens →
                </Link>
              </div>
            </div>
          </section>

          {/* FAQs */}
          <section className="border-t border-[#f0eee7] pt-8">
            <h2 className="font-capita text-[22px] sm:text-[26px] font-bold text-black mb-[8px] leading-[1.2]">
              Häufige Fragen zum Jassen
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

export default JassenPage;
