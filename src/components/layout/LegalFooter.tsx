import Link from 'next/link';
import Image from 'next/image';

export const LegalFooter = () => {
  return (
    <footer className="mt-8 pt-6 pb-6 border-t border-gray-700">
      <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 text-sm text-gray-400 mb-2">
        <Link 
          href="/datenschutz"
          className="hover:text-green-400 transition-colors underline"
        >
          Datenschutz
        </Link>
        <span className="text-gray-600 hidden sm:inline">•</span>
        <Link 
          href="/impressum"
          className="hover:text-green-400 transition-colors underline"
        >
          Impressum
        </Link>
      </div>
      
      {/* Lebendige Traditionen & Experten */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <div className="text-xs text-gray-500 text-center max-w-2xl px-4 space-y-2">
          <p>
            JassWiki.ch wird betrieben von <a href="https://www.linkedin.com/in/remoprinz/" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 underline">Remo Prinz</a> (<a href="https://jassguru.ch" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 underline">JassGuru.ch</a>) 
            und <a href="https://trumpf-as.ch" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 underline">Fabian Cadonau</a> (<a href="https://trumpf-as.ch" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 underline">Trumpf-As.ch</a>).
          </p>
          <p>
            Offiziell anerkannt als Teil der <a href="https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 underline">Lebendigen Traditionen der Schweiz</a> (BAK).
        </p>
        </div>
        <a
          href="https://www.lebendige-traditionen.ch/tradition/de/home/traditionen/jassen.html"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:opacity-80 transition-opacity w-full max-w-[240px] sm:max-w-[320px] mt-2"
          aria-label="Lebendige Traditionen - Bundesamt für Kultur"
        >
          <Image
            src="/logo_lebendige_traditionen_hellgrau.png"
            alt="Jass ist als Lebendige Tradition der Schweiz anerkannt"
            width={320}
            height={160}
            className="w-full h-auto"
          />
        </a>
      </div>
      
      <p className="text-xs text-gray-500 text-center mt-4">
        &copy; {new Date().getFullYear()} jasswiki.ch - Alle Rechte vorbehalten
      </p>
    </footer>
  );
};

