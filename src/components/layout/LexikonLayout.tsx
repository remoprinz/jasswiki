import React, { useState, useEffect, useRef } from 'react';
import { LexikonSidebar } from './LexikonSidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { LegalFooter } from './LegalFooter';
import { SearchBar } from '@/components/wissen/SearchBar';
import { Menu, X, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import { JassWikiLogo } from './JassWikiLogo';

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
  const mainPanelRef = useRef<HTMLDivElement | null>(null);
  
  const [isPWA, setIsPWA] = useState(false);
  const [isWikiHomepage, setIsWikiHomepage] = useState(false);
  const [desktopSidebarHeight, setDesktopSidebarHeight] = useState<number | null>(null);
  
  useEffect(() => {
    const checkPWA = () => {
      if (typeof window === 'undefined') return;
      const pwaCheck = window.matchMedia('(display-mode: standalone)').matches || 
                      (window.navigator as any).standalone === true ||
                      document.referrer.includes('android-app://');
      setIsPWA(pwaCheck);
    };
    
    const checkWikiHomepage = () => {
      if (typeof window === 'undefined') return;
      const isWikiDomain = window.location.hostname === 'jasswiki.ch';
      const isHomepage = router.pathname === '/';
      setIsWikiHomepage(isWikiDomain && isHomepage);
    };

    if (typeof document !== 'undefined') {
      document.body.classList.add('lexikon-page');
    }
    
    checkPWA();
    checkWikiHomepage();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', checkPWA);
      return () => {
        window.removeEventListener('resize', checkPWA);
        document.body.classList.remove('lexikon-page');
      };
    }
  }, [router.pathname]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateSidebarHeight = () => {
      if (window.innerWidth < 1024) {
        setDesktopSidebarHeight(null);
        return;
      }

      if (!mainPanelRef.current) return;
      setDesktopSidebarHeight(mainPanelRef.current.offsetHeight);
    };

    updateSidebarHeight();
    const rafId = window.requestAnimationFrame(updateSidebarHeight);

    let resizeObserver: ResizeObserver | null = null;
    if (mainPanelRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(updateSidebarHeight);
      resizeObserver.observe(mainPanelRef.current);
    }

    window.addEventListener('resize', updateSidebarHeight);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateSidebarHeight);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [router.asPath]);

  const handleBackClick = () => {
    if (typeof window === 'undefined') return;
    if (router.pathname === '/') return;
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-wiki-green">
      {/* ── Mobile Header ── */}
      <div 
        className={`lg:hidden bg-white sticky top-0 z-40 ${
          isPWA ? 'lexikon-header-pwa' : 'py-3'
        }`}
      >
        <div className="flex items-center justify-between px-4">
          {!isWikiHomepage && (
            <button 
              onClick={handleBackClick}
              className="flex items-center text-wiki-green hover:text-wiki-green-light transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              <span className="font-inter font-medium text-sm">Zurück</span>
            </button>
          )}
          
          {isWikiHomepage && (
            <JassWikiLogo className="h-7" />
          )}
          
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-xl bg-wiki-cream hover:bg-wiki-sand transition-colors"
            aria-label="Navigation öffnen"
          >
            <Menu className="w-5 h-5 text-black" />
          </button>
        </div>

        {/* Mobile Search */}
        <div className="px-4 pt-3">
          <SearchBar />
        </div>
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-[60] bg-black/60" onClick={() => setSidebarOpen(false)}>
          <div 
            className="fixed right-0 top-0 h-full w-80 max-w-[90vw] bg-black shadow-xl z-[61]" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <h2 className="text-lg font-capita font-bold text-white">Navigation</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto h-[calc(100%-65px)]">
              <LexikonSidebar />
            </div>
          </div>
        </div>
      )}

      {/* ── Mobile Content ── */}
      <div className="lg:hidden">
        <div className="bg-white mx-4 mt-3 mb-3 rounded-[12px] min-h-[60vh]">
          <div className="px-[16px] pt-[14px] pb-[4px]">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
          <div className="px-[16px] pt-[14px] pb-[24px]">
            <div className="content-formatting max-w-none">{children}</div>
          </div>
        </div>
      </div>

      {/* ── Desktop Layout ── */}
      <div className="hidden lg:block">
        <div className="relative w-[1440px] mx-auto">
          {/* Header Bar: x=140, y=15, w=1160, h=80 */}
          <div className="jw-desktop-header-bar absolute left-[140px] top-[15px] w-[1160px] h-[80px] rounded-[12px] bg-white z-30" />

          {/* Logo: x=164, y=37, w=178, h=40 */}
          <div className="jw-desktop-header-logo absolute left-[164px] top-[37px] w-[178px] h-[40px] z-40">
            <JassWikiLogo className="w-[178px] h-[40px]" />
          </div>

          {/* Search: x=445, y=33, w=831, h=42 */}
          <div className="jw-desktop-header-search absolute left-[445px] top-[33px] w-[831px] z-40">
            <SearchBar />
          </div>

          {/* Main block starts at y=107 */}
          <div className="jw-desktop-content pt-[107px] pb-0">
            <div className="relative flex items-stretch">
              {/* Sidebar: x=138, w=307 */}
              <aside
                className="w-[307px] ml-[138px] flex-shrink-0 self-start"
                style={desktopSidebarHeight ? { height: `${desktopSidebarHeight}px` } : undefined}
              >
                <div className="bg-black/60 rounded-[12px] p-[24px] h-full overflow-y-auto">
                  <LexikonSidebar />
                </div>
              </aside>

              {/* Content panel: x=435, w=865 */}
              <main className="w-[865px] -ml-[10px] flex-shrink-0">
                <div ref={mainPanelRef} className="bg-white rounded-tr-[12px] rounded-br-[12px] rounded-tl-none rounded-bl-none min-h-[800px]">
                  <div className="px-[28px] pt-[20px]">
                    <Breadcrumbs items={breadcrumbItems} />
                  </div>
                  <div className="px-[28px] pt-[18px] pb-[32px]">
                    <div className="content-formatting max-w-none">{children}</div>
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>

      {/* Footer — Penpot: gap zwischen Content-Ende (y=8266) und Footer-Start (y=8320) = 54px */}
      <div className="jw-desktop-footer mt-[54px]">
        <LegalFooter />
      </div>
    </div>
  );
};

export { JassWikiLogo };