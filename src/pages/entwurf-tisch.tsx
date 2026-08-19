// ENTWURFSSEITE für die Abnahme des Jasstischs [[tisch: …]] — sie zeigt die
// Lagen des Hoch-tief-Artikels durch den echten Weg: Marke → Renderer → Bild.
// Der Artikeltext selbst bleibt unangetastet; diese Seite fällt weg, sobald der
// Tisch abgenommen ist.
import React from 'react';
import Head from 'next/head';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import { InternalLinker } from '@/components/layout/InternalLinker';

const LAGEN: { titel: string; text: string }[] = [
  {
    titel: '1 · Der Partner legt tief: aufhören',
    text: [
      'Der Ansager spielt das Nell, sein Partner antwortet mit der tiefsten Karte.',
      '',
      '[[tisch: trumpf eichel | stich 1 | ich eichel-9 | rechts eichel-ass | partner eichel-6 | links eichel-8 | blatt eichel-under, eichel-koenig, eichel-7 | Der Partner legt die Sechs, also hält er drei oder mehr Trümpfe. Die zwei übrigen liegen bei ihm]]',
      '',
      'Der Ansager rechnet: Gefallen sind vier, in seiner Hand liegen drei, übrig bleiben zwei.',
    ].join('\n'),
  },
  {
    titel: '2 · Der Partner legt hoch: nochmals ziehen',
    text: '[[tisch: trumpf eichel | stich 1 | ich eichel-9 | rechts eichel-ober | partner eichel-ass | links eichel-banner | blatt eichel-under, eichel-koenig, eichel-7 | Derselbe Stich mit einer anderen Antwort: Der Partner legt das Ass und zeigt damit genau zwei]]',
  },
  {
    titel: '3 · Einer verwirft',
    text: '[[tisch: trumpf eichel | stich 1 | ich eichel-9 | rechts eichel-8 | partner eichel-6 | links rosen-7 | blatt eichel-under, eichel-koenig, eichel-7 | Der Gegner zur Linken wirft ein Brättli ab und hat damit keinen Trumpf mehr]]',
  },
  {
    titel: '4 · Der zweite Stich',
    text: '[[tisch: trumpf eichel | stich 2 | ich eichel-under | rechts eichel-ass | partner eichel-banner | links rosen-8 | blatt eichel-koenig, eichel-7 | Jetzt sind sechs Trümpfe gefallen, übrig bleibt einer — und der gehört dem Partner]]',
  },
  {
    titel: '5 · Perspektivwechsel: der Leser ist der Partner',
    text: '[[tisch: trumpf eichel | sicht partner | partner eichel-under | zug ich | blatt eichel-9, eichel-koenig | Der Ansager spielt den Puur. Ich halte Nell und König und lege den König]]',
  },
  {
    titel: '6 · Der blutte Puur',
    text: '[[tisch: trumpf eichel | sicht partner | partner eichel-9 | ich rosen-7 | blatt eichel-under | Statt des Puurs verwerfe ich ein Brättli — das vereinbarte Zeichen: Ich habe den Puur]]',
  },
];

export default function EntwurfTisch() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Entwurf: Jasstisch</title>
      </Head>
      <LexikonLayout breadcrumbItems={[{ name: 'Entwurf', href: '/entwurf-tisch/' }]}>
        <div className="space-y-6 sm:space-y-8">
          <header className="text-left pb-6 border-b border-[#f0eee7]">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff0000] mb-4 leading-tight">
              Entwurf: der Jasstisch
            </h1>
          </header>
          <article className="content-formatting max-w-none">
            {LAGEN.map((lage) => (
              <section key={lage.titel} data-lage={lage.titel}>
                <h2>{lage.titel}</h2>
                <div className="content-formatting text-black">
                  <InternalLinker text={lage.text} farbwechsel />
                </div>
              </section>
            ))}
          </article>
        </div>
      </LexikonLayout>
    </>
  );
}
