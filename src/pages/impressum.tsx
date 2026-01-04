import Head from 'next/head';
import { useEffect } from 'react';
import { LexikonLayout } from '@/components/layout/LexikonLayout';

const ImpressumPage = () => {
  const breadcrumbItems = [
    { name: 'Start', href: '/' },
    { name: 'Impressum', href: '/impressum' }
  ];

  // Enable scrolling for lexikon pages
  useEffect(() => {
    // Add class to enable scrolling
    document.body.classList.add('lexikon-page');
    
    // Cleanup: Remove class when component unmounts
    return () => {
      document.body.classList.remove('lexikon-page');
    };
  }, []);

  return (
    <>
      <Head>
        <title>Impressum - JassWiki</title>
        <meta name="description" content="Impressum und Kontaktinformationen von JassWiki" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <h1 className="text-3xl font-bold mb-6 text-white">Impressum</h1>
        
        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">Betreiber</h2>
        <p className="mb-4 text-gray-300">
          <strong>JassWiki.ch</strong> wird betrieben von:
        </p>
        <p className="mb-4 text-gray-300">
          <strong>Remo Prinz</strong><br />
          Zürich, Schweiz
        </p>
        <p className="mb-4 text-gray-300">
          E-Mail: <a href="mailto:remo@jasswiki.ch" className="text-green-400 hover:text-green-300 underline">remo@jasswiki.ch</a><br />
          Website: <a href="https://jasswiki.ch" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">JassWiki.ch</a>
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">Inhaltliche Verantwortung</h2>
        <p className="mb-4 text-gray-300">
          Die Inhalte von JassWiki.ch werden gemeinsam erstellt und gepflegt von:
        </p>
        <ul className="list-disc list-inside mb-4 text-gray-300 space-y-2">
          <li>
            <strong>Remo Prinz</strong> – Betreiber von <a href="https://jassguru.ch" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">JassGuru.ch</a>
          </li>
          <li>
            <strong>Fabian Cadonau</strong> – Betreiber von <a href="https://trumpf-as.ch" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">Trumpf-As.ch</a>
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">Anerkennung</h2>
        <p className="mb-4 text-gray-300">
          JassWiki.ch ist offiziell anerkannt als Teil der{' '}
          <a href="https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">
            Lebendigen Traditionen der Schweiz
          </a>{' '}
          durch das Bundesamt für Kultur (BAK).
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">Haftungsausschluss</h2>
        <p className="mb-4 text-gray-300">
          <strong>Inhalt:</strong> Die Inhalte dieser Webseite wurden mit grösster Sorgfalt erstellt. 
          Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
        </p>
        <p className="mb-4 text-gray-300">
          <strong>Links:</strong> Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. 
          Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">Urheberrecht und Quellen</h2>
        <p className="mb-4 text-gray-300">
          JassWiki.ch ist eine <strong>gemeinnützige Wissensdatenbank</strong> zum Schweizer Jass. 
          Die Inhalte basieren auf verschiedenen öffentlichen Quellen, Regelbüchern, historischen Dokumenten und Expertenwissen.
        </p>
        <p className="mb-4 text-gray-300">
          Wo immer möglich, werden Quellen angegeben (siehe <a href="/quellen" className="text-green-400 hover:text-green-300 underline">Quellenverzeichnis</a>). 
          Die redaktionelle Zusammenstellung, Strukturierung und Aufbereitung der Inhalte auf JassWiki.ch ist urheberrechtlich geschützt.
        </p>
        <p className="mb-4 text-gray-300">
          Die Inhalte von JassWiki.ch dienen der Dokumentation und Weitergabe von Jass-Wissen als Teil des kulturellen Erbes der Schweiz. 
          Eine nichtkommerzielle Nutzung zu Bildungszwecken ist ausdrücklich erwünscht.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">Kontakt</h2>
        <p className="mb-4 text-gray-300">
          Bei Fragen, Anregungen oder Korrekturen zu den Inhalten von JassWiki.ch können Sie uns gerne kontaktieren:
        </p>
        <p className="mb-4 text-gray-300">
          E-Mail: <a href="mailto:remo@jasswiki.ch" className="text-green-400 hover:text-green-300 underline">remo@jasswiki.ch</a><br />
          Website: <a href="https://jasswiki.ch" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">JassWiki.ch</a>
        </p>

        <p className="mt-8 text-sm text-gray-500">Stand: Dezember 2025</p>
      </LexikonLayout>
    </>
  );
};

export default ImpressumPage;

