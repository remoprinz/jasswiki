import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import { SeoHead } from '@/components/layout/SeoHead';

interface Reference {
  title: string;
  author: string;
  type: string;
  date: string;
  description: string;
  usage: string;
  link?: string;
}

const ReferencesPage: NextPage = () => {
  const breadcrumbItems = [
    { name: 'Jass-Wiki', href: '/' },
    { name: 'Referenzen', href: '/referenzen' }
  ];

  const literatureAndRules: Reference[] = [
    {
      title: 'STÖCK WYS STICH – Der neue Schweizer Jassführer',
      author: 'Dani Müller',
      type: 'Buch',
      date: '2015 (SRF Edition)',
      description: 'Umfassendes Standardwerk für Schweizer Jass-Regeln und -Varianten mit detaillierten Erklärungen zu allen wichtigen Aspekten des Jass-Spiels.',
      usage: 'Hauptquelle für Spielregeln, Weis-Regeln, Schieber und die meisten Jass-Varianten.'
    },
    {
      title: 'PUUR NÄLL ASS – Offizielles Schweizer Jassreglement',
      author: 'Göpf Egg & Albert Hagenbucher',
      type: 'Buch',
      date: '10. Auflage, 2020',
      description: 'Das offizielle Schweizer Jassreglement vom AGM Verlag mit technischen und taktischen Anleitungen für über 70 verschiedene Jassarten.',
      usage: 'Hauptquelle für offizielle Regeln, Spielvarianten und taktische Grundlagen.'
    }
  ];

  const onlineResources: Reference[] = [
    {
      title: 'Lebendige Traditionen der Schweiz: Jassen',
      author: 'Bundesamt für Kultur (BAK)',
      type: 'Online-Ressource',
      date: 'März 2024',
      link: 'https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html',
      description: 'Offizielle Dokumentation des [Bundesamts für Kultur (BAK)](https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html) über Jassen als lebendige Tradition und immaterielles Kulturerbe der Schweiz.',
      usage: 'Quelle für kulturhistorische Hintergründe, regionale Varianten und gesellschaftliche Bedeutung des Jassens.'
    },
    {
      title: 'Schweizer Jassverzeichnis (jassverzeichnis.ch)',
      author: 'Armin & Melanie Muff',
      type: 'Online-Plattform',
      date: 'Seit 2013',
      link: 'https://jassverzeichnis.ch',
      description: 'Umfassende Plattform für Jass-Enthusiasten mit Turnierkalender, Jass-Shop und detaillierten Erklärungen zu Jassarten und Online-Jass-Angeboten. Verfügbar auf [jassverzeichnis.ch](https://jassverzeichnis.ch).',
      usage: 'Referenz für Online-Jass-Plattformen und App-Übersichten.'
    }
  ];

  const expertsAndResearch: Reference[] = [
    {
      title: 'Etymologische Forschung',
      author: 'Michael Koller',
      type: 'Historische Forschung',
      date: 'Laufend',
      description: 'Etymologische Forschung zur Geschichte der Jass-Begriffe durch den Historiker und Berufsschullehrer Michael Koller.',
      usage: 'Referenz für Wortherkunft und historische Herleitungen von Jass-Begriffen.'
    },
    {
      title: 'Jassstatistik.ch',
      author: 'Erich Studerus',
      type: 'Datenbank & Community',
      date: 'Seit 2008',
      link: 'https://jassstatistik.ch',
      description: 'Umfassende Datenbank mit statistischen Auswertungen von Tausenden erfassten Jasspartien. Bietet wertvolle Einblicke in Wahrscheinlichkeiten und Spielverläufe. Verfügbar auf [jassstatistik.ch](https://jassstatistik.ch).',
      usage: 'Referenz für statistische Analysen und datengestützte Erkenntnisse zum Jass-Spiel.'
    },
    {
      title: 'Trumpf-As: Taktiken und Strategien',
      author: 'Fabian Cadonau',
      type: 'Fachberatung',
      date: 'Seit 2020',
      link: 'https://trumpf-as.ch',
      description: 'Experte für Jass-Taktiken und -Strategien. Zusammenarbeit bei der Entwicklung von taktischen Anleitungen und Spielstrategien für Jassguru.ch. Verfügbar auf [trumpf-as.ch](https://trumpf-as.ch).',
      usage: 'Quelle für taktische Grundlagen, Spielstrategien und fortgeschrittene Taktiken.'
    }
  ];

  const ownContributions: Reference[] = [
    {
      title: 'Jassguru.ch – Praktische Erkenntnisse',
      author: 'Remo Prinz',
      type: 'Eigene Entwicklung & Praxis',
      date: 'Seit 2025',
      link: 'https://jassguru.ch',
      description: 'Erkenntnisse aus der Entwicklung und dem Betrieb von jassguru.ch, der ersten vollständigen End-to-End Jass-App für die Schweiz. Praktische Erfahrungen aus über 1500 persönlich erfassten Spielen auf jassstatistik.ch.',
      usage: 'Eigene Beiträge zu praktischen Anleitungen, digitaler Spielerfassung, App-Nutzung im Jasskontext sowie Ergänzungen zu Regeln und Konventionen, die sich in der Praxis bewährt haben.'
    }
  ];

  const modernImpulses: Reference[] = [
    {
      title: 'Schweizer Jass (schweizerjass.ch)',
      author: 'Jens Riedweg',
      type: 'Online-Projekt / Kartenproduktion',
      date: 'Aktuell (laufendes Projekt)',
      link: 'https://schweizerjass.ch',
      description: 'Projekt von Jens Riedweg mit moderner Neuinterpretation des Schweizer Kartenbilds. Besonders hervorzuheben ist das Qualitäts- und Herkunftsmerkmal, dass die Karten gemäss Anbieter in der Schweiz gedruckt und produziert werden. Verfügbar auf [schweizerjass.ch](https://schweizerjass.ch/).',
      usage: 'Referenz für moderne Entwicklungen rund um Schweizer Jasskarten (zeitgemässe Gestaltung, lokale Produktion) als Ergänzung zur historischen Kartenmacher-Tradition.'
    }
  ];

  const renderDescription = (reference: Reference) => {
    if (reference.link === 'https://jassguru.ch') {
      return (
        <>
          Erkenntnisse aus der Entwicklung und dem Betrieb von{' '}
          <a href="https://jassguru.ch" target="_blank" rel="noopener noreferrer" className="text-[#274823] hover:text-[#ff0000] hover:underline">jassguru.ch</a>, der ersten vollständigen End-to-End Jass-App für die Schweiz. Praktische Erfahrungen aus über 1500 persönlich erfassten Spielen auf{' '}
          <a href="https://jassstatistik.ch" target="_blank" rel="noopener noreferrer" className="text-[#274823] hover:text-[#ff0000] hover:underline">jassstatistik.ch</a>.
        </>
      );
    }

    const parts: (string | React.ReactElement)[] = [];
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    let key = 0;

    while ((match = linkRegex.exec(reference.description)) !== null) {
      if (match.index > lastIndex) {
        parts.push(reference.description.substring(lastIndex, match.index));
      }
      parts.push(
        <a
          key={key++}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#274823] hover:text-[#ff0000] hover:underline"
        >
          {match[1]}
        </a>
      );
      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < reference.description.length) {
      parts.push(reference.description.substring(lastIndex));
    }

    return parts.length > 0 ? parts : reference.description;
  };

  const renderReferenceCard = (reference: Reference, index: number) => (
    <div key={index} className="bg-[#f8f7f3] border border-[#e8e6df] rounded-[12px] p-6 sm:p-8">
      <div className="space-y-4">
        <div className="flex items-center">
          <h3 className="text-xl sm:text-2xl font-bold !text-black leading-tight">
            {reference.link ? (
              <a
                href={reference.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#ff0000] transition-colors text-black"
              >
                {reference.title}
              </a>
            ) : (
              reference.title
            )}
          </h3>
        </div>

        <div className="text-sm text-[#5f5b53] space-y-1">
          <p><strong>Autor:</strong> {reference.author}</p>
          <p><strong>Typ:</strong> {reference.type}</p>
          <p><strong>Datum:</strong> {reference.date}</p>
        </div>

        <div>
          <h4 className="font-semibold !text-black mb-2">Beschreibung</h4>
          <p className="text-black leading-relaxed">
            {renderDescription(reference)}
          </p>
        </div>

        <div>
          <h4 className="font-semibold !text-black mb-2">Verwendung bei JassWiki</h4>
          <p className="text-black leading-relaxed">
            {reference.usage}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SeoHead
        title="Referenzen - Jasswiki.ch"
        description="Übersicht aller Quellen, Experten und Referenzen, die für die Inhalte auf Jasswiki.ch verwendet wurden."
      />

      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <div className="space-y-8 sm:space-y-12">
          {/* Header */}
          <div className="text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#ff0000] mb-4">
              Referenzen und Quellen
            </h1>
            <p className="text-lg sm:text-xl text-black leading-relaxed max-w-3xl">
              Die Grundlage für unser Jass-Wiki bilden etablierte Werke, offizielle Institutionen und erfahrene Experten – ergänzt durch praktische Erkenntnisse aus tausenden dokumentierten Spielen seit 2008 (<a href="https://jassstatistik.ch" target="_blank" rel="noopener noreferrer" className="text-[#274823] hover:text-[#2bb752] hover:underline">jassstatistik.ch</a>) und der Entwicklung von <a href="https://jassguru.ch" target="_blank" rel="noopener noreferrer" className="text-[#274823] hover:text-[#2bb752] hover:underline">jassguru.ch</a>.
            </p>
          </div>

          {/* Section 1: Literature and Rules */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold !text-black mb-6 border-b border-[#f0eee7] pb-3">
              Literatur & Regelwerke
            </h2>
            <div className="grid gap-6 sm:gap-8">
              {literatureAndRules.map((ref, idx) => renderReferenceCard(ref, idx))}
            </div>
          </section>

          {/* Section 2: Online Resources */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold !text-black mb-6 border-b border-[#f0eee7] pb-3">
              Online-Ressourcen & Institutionen
            </h2>
            <div className="grid gap-6 sm:gap-8">
              {onlineResources.map((ref, idx) => renderReferenceCard(ref, idx))}
            </div>
          </section>

          {/* Section 3: Experts and Research */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold !text-black mb-6 border-b border-[#f0eee7] pb-3">
              Experten & Forschung
            </h2>
            <div className="grid gap-6 sm:gap-8">
              {expertsAndResearch.map((ref, idx) => renderReferenceCard(ref, idx))}
            </div>
          </section>

          {/* Section 4: Own Contributions */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold !text-black mb-6 border-b border-[#f0eee7] pb-3">
              Eigene Beiträge
            </h2>
            <div className="grid gap-6 sm:gap-8">
              {ownContributions.map((ref, idx) => renderReferenceCard(ref, idx))}
            </div>
          </section>

          {/* Section 5: Modern Impulses & Developments */}
          <section>
            <h2 className="text-2xl sm:text-3xl font-bold !text-black mb-6 border-b border-[#f0eee7] pb-3">
              Moderne Impulse & Entwicklungen
            </h2>
            <div className="grid gap-6 sm:gap-8">
              {modernImpulses.map((ref, idx) => renderReferenceCard(ref, idx))}
            </div>
          </section>

          {/* Additional Info */}
          <div className="bg-[#f0eee7] border border-[#f0eee7] rounded-xl p-6 sm:p-8">
            <h3 className="text-xl font-bold !text-black mb-4">Hinweis zur Quellenverwendung</h3>
            <div className="text-black leading-relaxed space-y-3">
              <p>
                Die Inhalte auf jasswiki.ch basieren auf diesen etablierten Quellen und wurden für eine bessere
                digitale Erfahrung neu strukturiert und formatiert. Dabei haben wir:
              </p>
              <ul className="list-disc list-inside space-y-2 text-black ml-4">
                <li>Komplexe Sachverhalte in übersichtliche Abschnitte gegliedert</li>
                <li>Strukturierte Listen und Tabellen für bessere Lesbarkeit erstellt</li>
                <li>Querverweise zwischen verwandten Themen implementiert</li>
                <li>Lücken im bestehenden Regelwerk ergänzt und praktische Erkenntnisse aus tausenden dokumentierten Spielen eingebracht</li>
                <li>Fortgeschrittene Taktiken und Strategien ergänzt, die in klassischen Regelwerken bisher kaum dokumentiert wurden</li>
              </ul>
              <p className="mt-4 text-black">
                JassWiki.ch ist ein lebendiges Projekt. Gerne ergänzen wir deine Beiträge. Melde dich dazu bei der Redaktion: <a href="mailto:redaktion@jasswiki.ch" className="text-[#274823] hover:text-[#2bb752] hover:underline">redaktion@jasswiki.ch</a>.
              </p>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center pt-8 border-t border-[#f0eee7]">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-[#f0eee7] text-black rounded-lg hover:bg-[#e8e6df] hover:text-black transition-colors font-medium border border-[#f0eee7]"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück zur Startseite
            </Link>
          </div>
        </div>
      </LexikonLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  };
};

export default ReferencesPage;

