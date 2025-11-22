import Head from 'next/head';
import { useEffect } from 'react';
import { LexikonLayout } from '@/components/layout/LexikonLayout';

const DatenschutzPage = () => {
  const breadcrumbItems = [
    { name: 'Start', href: '/' },
    { name: 'Datenschutz', href: '/datenschutz' }
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
        <title>Datenschutz - JassWiki</title>
        <meta name="description" content="Datenschutzerklärung von JassWiki" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <LexikonLayout breadcrumbItems={breadcrumbItems}>
        <h1 className="text-3xl font-bold mb-6 text-white">Datenschutzerklärung</h1>
        
        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">1. Verantwortliche Stelle</h2>
        <p className="mb-4 text-gray-300">
          Verantwortlich für die Datenerhebung und -verarbeitung auf dieser Webseite ist:
          <br />
          <strong>Remo Prinz</strong>
          <br />
          E-Mail: <a href="mailto:remo@jassguru.ch" className="text-green-400 hover:text-green-300 underline">remo@jassguru.ch</a>
          <br />
          Telefon: <a href="tel:+41792375208" className="text-green-400 hover:text-green-300 underline">+41 79 237 52 08</a>
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">2. Datenerfassung</h2>
        <p className="mb-4 text-gray-300">
          <strong>JassWiki erfasst keine personenbezogenen Daten.</strong> Dies ist eine reine Wissensdatenbank ohne Registrierung, 
          ohne Tracking und ohne Analyse-Tools. Die Nutzung der Webseite ist vollständig anonym.
        </p>
        <p className="mb-4 text-gray-300">
          <strong>Technische Server-Logs:</strong> Unser Hosting-Provider (Hostpoint) kann technisch notwendige Server-Logs erstellen 
          (z.B. für Fehlerbehebung). Diese werden nicht von uns analysiert oder gespeichert. 
          Wir haben keinen Zugriff auf diese Logs.
        </p>
        
        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">3. Externe Services</h2>
        <p className="mb-4 text-gray-300">
          <strong>JassWiki Chat (GPT):</strong> Falls Sie JassWiki als ChatGPT nutzen (jasswiki.ch/gpt), 
          gelten die Datenschutzbestimmungen von OpenAI/ChatGPT. JassWiki hat keinen Einfluss darauf und erfasst keine Daten aus diesen Chats.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">4. Server-Standort und Drittanbieter</h2>
        <p className="mb-4 text-gray-300">
          <strong>Website-Hosting:</strong> Die JassWiki Webseite wird auf Servern von <strong>Hostpoint</strong> in der <strong>Schweiz</strong> gehostet.
        </p>
        <p className="mb-4 text-gray-300">
          <strong>Backend-Services (optional):</strong> Falls Sie die Suchfunktion nutzen, werden Suchanfragen über 
          <strong>Google Firebase</strong> (Region Belgien/EU) und <strong>Pinecone</strong> (USA) verarbeitet. 
          Diese Anfragen werden nicht mit Ihrer IP-Adresse oder anderen Identifikationsmerkmalen verknüpft und nicht dauerhaft gespeichert.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">5. Cookies</h2>
        <p className="mb-4 text-gray-300">
          JassWiki verwendet <strong>keine Cookies</strong> – weder für Tracking noch für Analyse noch für andere Zwecke.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">6. Ihre Rechte</h2>
        <p className="mb-4 text-gray-300">
          Da JassWiki keine personenbezogenen Daten erfasst, gibt es keine Daten, die angefragt, berichtigt oder gelöscht werden können.
        </p>
        <p className="mb-4 text-gray-300">
          Bei Fragen zum Datenschutz können Sie sich jederzeit per E-Mail an <a href="mailto:remo@jassguru.ch" className="text-green-400 hover:text-green-300 underline">remo@jassguru.ch</a> 
          oder telefonisch unter <a href="tel:+41792375208" className="text-green-400 hover:text-green-300 underline">+41 79 237 52 08</a> wenden.
        </p>

        <h2 className="text-2xl font-semibold mb-3 text-white mt-8">7. Änderungen dieser Datenschutzerklärung</h2>
        <p className="mb-4 text-gray-300">
          Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht 
          oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. 
          Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
        </p>

        <p className="mt-8 text-sm text-gray-500">Stand: November 2025</p>
      </LexikonLayout>
    </>
  );
};

export default DatenschutzPage;

