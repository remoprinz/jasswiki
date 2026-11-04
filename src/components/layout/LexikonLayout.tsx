import React, { useState, useEffect, useRef, useCallback } from 'react';
import { LexikonSidebar } from './LexikonSidebar';
import { Breadcrumbs } from './Breadcrumbs';
import { ShareButton } from './ShareButton';
import { LegalFooter } from './LegalFooter';
import { useRouter } from 'next/router';
import { JassWikiLogo } from './JassWikiLogo';
import { KopfDesktop, KopfMenueOffen, KopfTelefon } from './JassWikiKopf';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface LexikonLayoutProps {
  children: React.ReactNode;
  breadcrumbItems: BreadcrumbItem[]; 
}

/** Die zuletzt gezeigte Seite, über Seitenwechsel hinweg (das Layout baut sich
 *  je Seitentyp neu auf). null = erste Seite: dort bleibt der Fokus, wo er ist. */
let zuletztGesehen: string | null = null;

/** Rollt eine Leiste so, dass die aktive Seite sichtbar ist, und nur die Leiste:
 *  die Seite selbst bleibt stehen. */
const leisteAufAktiv = (leiste: HTMLElement, aktiv: HTMLElement) => {
  const l = leiste.getBoundingClientRect();
  const a = aktiv.getBoundingClientRect();
  if (a.top >= l.top && a.bottom <= l.bottom) return;
  leiste.scrollTop += a.top - l.top - leiste.clientHeight / 3;
};

export const LexikonLayout: React.FC<LexikonLayoutProps> = ({ children, breadcrumbItems }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const mainPanelRef = useRef<HTMLDivElement | null>(null);
  const desktopLeisteRef = useRef<HTMLDivElement | null>(null);
  const schubladeRef = useRef<HTMLDivElement | null>(null);
  const menuKnopfRef = useRef<HTMLButtonElement | null>(null);
  
  const [desktopSidebarHeight, setDesktopSidebarHeight] = useState<number | null>(null);

  useEffect(() => {
    document.body.classList.add('lexikon-page');
    return () => document.body.classList.remove('lexikon-page');
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

  // ── Schublade am Handy: Esc schliesst, Fokus auf die aktive Seite ──
  const schubladeZu = useCallback(() => {
    setSidebarOpen(false);
    menuKnopfRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    if (!sidebarOpen) return;
    const taste = (e: KeyboardEvent) => {
      if (e.key === 'Escape') schubladeZu();
    };
    window.addEventListener('keydown', taste);
    const aktiv =
      schubladeRef.current?.querySelector<HTMLElement>('[aria-current="page"]') ??
      schubladeRef.current?.querySelector<HTMLElement>('a');
    if (aktiv && schubladeRef.current) {
      aktiv.focus({ preventScroll: true });
      leisteAufAktiv(schubladeRef.current, aktiv);
    }
    return () => window.removeEventListener('keydown', taste);
  }, [sidebarOpen, schubladeZu]);

  // Ein Tipp auf eine Seite in der Schublade schliesst sie.
  useEffect(() => {
    const zu = () => setSidebarOpen(false);
    router.events.on('routeChangeStart', zu);
    return () => router.events.off('routeChangeStart', zu);
  }, [router.events]);

  // ── Nach einem Seitenwechsel: Fokus auf den Inhalt (ohne Rahmen), die
  // Leiste rollt die aktive Seite ins Bild ──
  const seite = router.asPath.split(/[?#]/)[0];
  useEffect(() => {
    const leiste = desktopLeisteRef.current;
    const aktiv = leiste?.querySelector<HTMLElement>('[aria-current="page"]');
    if (leiste && aktiv) leisteAufAktiv(leiste, aktiv);

    if (zuletztGesehen === null) {
      zuletztGesehen = seite;
      return;
    }
    if (zuletztGesehen === seite) return;
    zuletztGesehen = seite;
    mainPanelRef.current?.focus({ preventScroll: true });
  }, [seite]);

  return (
    <div className="min-h-screen bg-wiki-green">
      {/* ── Kopf · JassWiki, Figma 2280:2000 ── */}
      <div className="lg:hidden sticky top-0 z-40">
        <KopfTelefon ref={menuKnopfRef} menueOffen={sidebarOpen} onMenue={() => setSidebarOpen(true)} />
      </div>
      <div className="hidden lg:block relative z-40">
        <KopfDesktop />
      </div>

      {/* ── Menü offen · Mobil 390, Figma 2299:3361: ganze Fläche, Kopf 60 fest,
           die Liste rollt bis zum letzten Eintrag. Esc schliesst, beim Öffnen
           steht der Fokus auf der aktiven Seite. ── */}
      {sidebarOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Themen"
          className="lg:hidden fixed inset-0 z-[60] flex flex-col bg-[#011304]"
        >
          <div className="flex-none bg-white pt-[env(safe-area-inset-top)]">
            <KopfMenueOffen onSchliessen={schubladeZu} />
          </div>
          <div ref={schubladeRef} className="jw-menue-telefon flex-1 min-h-0 overflow-y-auto overscroll-contain">
            <LexikonSidebar />
          </div>
        </div>
      )}

      {/* ── Hauptteil, Figma 2299:2934: 1200 ab x 120, Leiste 300, Inhalt 900,
           Abstand zum Kopf 28, Ecken 12 aussen. ── */}
      <div className="lg:max-w-[1200px] lg:w-[calc(100%-48px)] lg:mx-auto lg:pt-[28px]">
        <div className="lg:relative lg:flex lg:items-stretch">
          {/* Desktop-only Sidebar */}
          <aside
            className="hidden lg:block w-[300px] flex-shrink-0 self-start"
            style={desktopSidebarHeight ? { height: `${desktopSidebarHeight}px` } : undefined}
          >
            <div
              ref={desktopLeisteRef}
              className="bg-[#011304] rounded-l-[12px] px-[16px] py-[24px] h-full overflow-y-auto"
            >
              <LexikonSidebar />
            </div>
          </aside>

          {/* Main Content Panel — Mobile-Card-Style + Desktop-Panel-Style responsiv */}
          <main className="lg:flex-1 lg:min-w-0">
            <div
              ref={mainPanelRef}
              id="inhalt"
              tabIndex={-1}
              className="bg-white mx-4 mt-3 mb-3 rounded-[12px] min-h-[60vh] lg:mx-0 lg:mt-0 lg:mb-0 lg:rounded-tr-[12px] lg:rounded-br-[12px] lg:rounded-tl-none lg:rounded-bl-none lg:min-h-[800px]"
            >
              <div className="px-[16px] pt-[14px] pb-[4px] lg:px-[24px] lg:pt-[24px]">
                <div className="flex items-center justify-between gap-3">
                  <Breadcrumbs items={breadcrumbItems} />
                  <ShareButton />
                </div>
              </div>
              <div className="px-[16px] pt-[14px] pb-[24px] lg:px-[24px] lg:pt-[18px] lg:pb-[48px]">
                <div className="content-formatting max-w-none">{children}</div>
              </div>
            </div>
          </main>
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