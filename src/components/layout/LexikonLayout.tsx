import React, { useState, useEffect } from 'react';
import { LexikonSidebar } from './LexikonSidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { LegalFooter } from './LegalFooter';
import { SearchBar } from '@/components/wissen/SearchBar';
import { Menu, X, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface LexikonLayoutProps {
  children: React.ReactNode;
  breadcrumbItems: BreadcrumbItem[]; 
}

export const LexikonLayout: React.FC<LexikonLayoutProps> = ({ children, breadcrumbItems }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  
  // Prüfe ob wir in der PWA sind für spezifisches Styling
  const [isPWA, setIsPWA] = useState(false);
  
  // Prüfe ob wir auf jasswiki.ch sind und auf der Hauptseite
  const [isWikiHomepage, setIsWikiHomepage] = useState(false);
  
  useEffect(() => {
    const checkPWA = () => {
      // Sicherheitsprüfung für Browser-APIs
      if (typeof window === 'undefined') return;
      
      const pwaCheck = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone === true ||
                      document.referrer.includes('android-app://');
      setIsPWA(pwaCheck);
    };
    
    const checkWikiHomepage = () => {
      // Sicherheitsprüfung für Browser-APIs
      if (typeof window === 'undefined') return;
      
      // Prüfe ob wir auf jasswiki.ch sind UND auf der Hauptseite (/)
      const isWikiDomain = window.location.hostname === 'jasswiki.ch';
      const isHomepage = router.pathname === '/';
      
      setIsWikiHomepage(isWikiDomain && isHomepage);
    };

    // Add lexikon-page class to body for scrolling
    if (typeof document !== 'undefined') {
      document.body.classList.add('lexikon-page');
    }
    
    checkPWA();
    checkWikiHomepage();
    
    // Prüfe auch bei Resize (falls sich der Modus ändert)
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkPWA);
      return () => {
        window.removeEventListener('resize', checkPWA);
        document.body.classList.remove('lexikon-page');
      };
    }
  }, [router.pathname]);

  // Elegante Zurück-Navigation mit Browser-History
  const handleBackClick = () => {
    // Sicherheitsprüfung für Browser-APIs
    if (typeof window === 'undefined') return;
    
    // Prüfe ob wir in der PWA sind (Standalone-Modus)
    const isPWACheck = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone === true ||
                      document.referrer.includes('android-app://');
    
    // Wenn wir uns auf der Wiki-Hauptseite befinden
    if (router.pathname === '/') {
      // Kein Zurück mehr möglich, bleibe auf Homepage
      return;
    }
    
    // Für alle anderen Wiki-Seiten: Browser-History verwenden
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback falls keine History vorhanden
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile Header */}
      <div 
        className={`lg:hidden bg-gray-800 border-b border-gray-700 sticky top-0 z-40 ${
          isPWA ? 'lexikon-header-pwa' : 'py-4'
        }`}
      >
        <div className="flex items-center justify-between px-4">
          {/* Zeige Zurück-Button nur wenn NICHT auf jasswiki.ch Hauptseite */}
          {!isWikiHomepage && (
            <button 
              onClick={handleBackClick}
              className="flex items-center text-green-400 hover:text-green-300 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="font-medium">Zurück</span>
            </button>
          )}
          
          {/* Wenn auf jasswiki.ch Hauptseite, zeige leeren Platz für Alignment */}
          {isWikiHomepage && <div className="w-20"></div>}
          
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors"
            aria-label="Navigation öffnen"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-black bg-opacity-75" onClick={() => setSidebarOpen(false)}>
          <div className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-gray-800 shadow-xl border-l border-gray-700 z-[61]" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-lg font-semibold text-white">Navigation</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <X className="w-5 h-5 text-gray-300" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <LexikonSidebar />
            </div>
          </div>
        </div>
      )}

      {/* Responsive Layout - Content wird nur EINMAL gerendert */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        
        {/* Search Bar - Responsive */}
        <div className="lg:flex lg:flex-row lg:gap-8">
          {/* Empty space for left container alignment (Desktop only) */}
          <div className="hidden lg:block lg:w-1/4"></div>
          
          {/* Search Bar */}
          <div className="w-full lg:w-3/4 mb-4 lg:mb-6">
            <SearchBar />
          </div>
        </div>

        {/* Breadcrumbs - Responsive */}
        <div className="lg:flex lg:flex-row lg:gap-8">
          {/* Empty space for left container alignment (Desktop only) */}
          <div className="hidden lg:block lg:w-1/4"></div>
          
          {/* Breadcrumbs */}
          <div className="w-full lg:w-3/4 mb-4 sm:mb-6">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        {/* Main Layout - Responsive */}
        <div className="lg:flex lg:flex-row lg:gap-8">
          {/* Desktop Sidebar (hidden on mobile) */}
          <aside className="hidden lg:block lg:w-1/4 lg:sticky lg:top-4 lg:self-start">
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <LexikonSidebar />
            </div>
          </aside>
          
          {/* Main content - EINZIGE Instanz */}
          <main className="w-full lg:w-3/4">
            <article className="bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 border border-gray-700 mb-4">
              {/* Padding oben für Homepage */}
              {router.pathname === '/' && (
                <div className="pt-6 sm:pt-8 mb-4 lg:mb-8 not-prose"></div>
              )}
              <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                {children}
              </div>
            </article>
            <LegalFooter />
          </main>
        </div>
      </div>
    </div>
  );
}; 