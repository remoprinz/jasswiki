import Link from 'next/link';

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
      <p className="text-xs text-gray-500 text-center">
        &copy; {new Date().getFullYear()} jasswiki.ch - Alle Rechte vorbehalten
      </p>
    </footer>
  );
};

