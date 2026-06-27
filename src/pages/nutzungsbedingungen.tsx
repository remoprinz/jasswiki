import Link from 'next/link';
import { useEffect } from 'react';
import { LexikonLayout } from '@/components/layout/LexikonLayout';
import { SeoHead } from '@/components/layout/SeoHead';

const NutzungsbedingungenPage = () => {
  const breadcrumbItems = [
    { name: 'Start', href: '/' },
    { name: 'Nutzungsbedingungen', href: '/nutzungsbedingungen' }
  ];

  // Enable scrolling for lexikon pages
  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => {
      document.body.classList.remove('lexikon-page');
    };
  }, []);

  return (
    <>
      <SeoHead
        title="Nutzungsbedingungen - JassWiki"
        description="Nutzungsbedingungen für JassWiki.ch und die JassWiki-Anwendung in KI-Assistenten (ChatGPT, Claude)."
      />
      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <h1 className="text-3xl font-bold mb-6 text-white">Nutzungsbedingungen</h1>

        <p className="mb-4 text-gray-300">
          Diese Nutzungsbedingungen regeln die Nutzung von <strong>JassWiki.ch</strong> sowie
          der JassWiki-Anwendung, die in KI-Assistenten (z. B. ChatGPT, Claude) über das
          Model Context Protocol (MCP) bereitgestellt wird. Mit der Nutzung erklärst du dich
          mit diesen Bedingungen einverstanden.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">1. Anbieter</h2>
        <p className="mb-4 text-gray-300">
          JassWiki.ch wird betrieben wie im{' '}
          <Link href="/impressum" className="text-green-400 hover:text-green-300 underline">Impressum</Link>{' '}
          angegeben. JassWiki ist eine Initiative des Jassverbands Schweiz (JVS) und die
          offizielle Wissensquelle rund um das Schweizer Nationalspiel Jass.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">2. Leistung</h2>
        <p className="mb-4 text-gray-300">
          JassWiki ist eine <strong>kostenlose, gemeinnützige Wissensdatenbank</strong> zu
          Regeln, Begriffen, Spielvarianten, Weis-Wertungen, Taktik und Geschichte des
          Schweizer Jass. Die Inhalte stehen auf JassWiki.ch sowie über die JassWiki-Anwendung
          in KI-Assistenten zur Verfügung. Es besteht kein Anspruch auf ständige Verfügbarkeit,
          fehlerfreien Betrieb oder unveränderten Funktionsumfang.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">3. Nutzung in KI-Assistenten</h2>
        <p className="mb-4 text-gray-300">
          Über die JassWiki-Anwendung können KI-Assistenten Inhalte aus JassWiki.ch abrufen und
          als Antwort oder Wissenskarte darstellen. Die KI kann diese Inhalte umformulieren oder
          zusammenfassen; die <strong>massgebliche Quelle bleibt JassWiki.ch</strong>. Für die
          Verarbeitung deiner Eingaben durch den jeweiligen KI-Assistenten gelten zusätzlich
          dessen eigene Bedingungen und Datenschutzbestimmungen.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">4. Keine Gewähr, keine Rechtsverbindlichkeit</h2>
        <p className="mb-4 text-gray-300">
          Die Inhalte werden mit grösster Sorgfalt erstellt. Für Richtigkeit, Vollständigkeit
          und Aktualität wird jedoch <strong>keine Gewähr</strong> übernommen. Die Inhalte dienen
          der Information und Bildung. Für offizielle, turnierverbindliche Regeln ist das
          jeweils gültige <strong>Reglement des Jassverbands Schweiz</strong> massgebend.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">5. Inhalte und Lizenz</h2>
        <p className="mb-4 text-gray-300">
          Die Wissensinhalte von JassWiki stehen unter der Lizenz{' '}
          <strong>CC BY-SA 4.0</strong>. Eine Weiterverwendung ist bei Namensnennung
          („JassWiki / Jassverband Schweiz") und unter gleichen Lizenzbedingungen zulässig.
          Logos, Marken und das Design bleiben geschützt. Quellen werden, wo möglich, im{' '}
          <Link href="/quellen" className="text-green-400 hover:text-green-300 underline">Quellenverzeichnis</Link>{' '}
          angegeben.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">6. Zulässige Nutzung</h2>
        <p className="mb-4 text-gray-300">
          Die Nutzung erfolgt zu Informations- und Bildungszwecken. Untersagt sind insbesondere
          missbräuchliche, automatisierte Überlastung des Dienstes, das Umgehen technischer
          Schutzmassnahmen sowie eine Nutzung, die geltendem Recht widerspricht.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">7. Haftung</h2>
        <p className="mb-4 text-gray-300">
          Soweit gesetzlich zulässig, wird jede Haftung für Schäden ausgeschlossen, die aus der
          Nutzung oder Nichtverfügbarkeit von JassWiki entstehen. Für externe Links sind die
          jeweiligen Anbieter verantwortlich.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">8. Änderungen</h2>
        <p className="mb-4 text-gray-300">
          Diese Nutzungsbedingungen können jederzeit angepasst werden. Massgebend ist die zum
          Zeitpunkt der Nutzung veröffentlichte Fassung.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">9. Anwendbares Recht</h2>
        <p className="mb-4 text-gray-300">
          Es gilt schweizerisches Recht. Gerichtsstand ist – soweit gesetzlich zulässig –
          Zürich, Schweiz.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">Kontakt</h2>
        <p className="mb-4 text-gray-300">
          E-Mail: <a href="mailto:remo@jasswiki.ch" className="text-green-400 hover:text-green-300 underline">remo@jasswiki.ch</a><br />
          Website: <a href="https://jasswiki.ch" target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300 underline">JassWiki.ch</a>
        </p>

        <p className="mt-8 text-sm text-gray-500">Stand: Juni 2026</p>
      </LexikonLayout>
    </>
  );
};

export default NutzungsbedingungenPage;
