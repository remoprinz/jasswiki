import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SearchBar } from '@/components/wissen/SearchBar';
import { JassWikiMarke } from './JassWikiMarke';
import { ZeichenAuf, ZeichenMenue, ZeichenSchliessen, ZeichenSuchen } from './JassWikiZeichen';
import { hauptbereiche, pfadVon } from './LexikonSidebar';

/* ---------------------------------------------------------------------------
   KOPF · JassWiki (Figma Komponentensatz 2280:2000, Jens, Update 1.5)

   Art:   Desktop 1440 × 72, Telefon 390 × 60, Menü offen mit dem Knopf zum
          Schliessen. Alle Masse und Farben stehen als .jw-kopf-* in globals.css.
   Aktiv: Keiner, Thema, Begriffe A bis Z, Jass des Tages. Der Zustand entsteht
          aus dem Pfad, steht also schon im statischen HTML.
   --------------------------------------------------------------------------- */

export type KopfAktiv = 'keiner' | 'thema' | 'begriffe' | 'jass-des-tages';

const STANDARD_THEMA = 'Themen';

/** Aktiver Bereich und Beschriftung des Themen-Knopfs (Figma «Thema#2647:7»). */
export const kopfZustand = (asPath: string): { aktiv: KopfAktiv; thema: string } => {
  const erstes = pfadVon(asPath).split('/')[1] ?? '';
  if (erstes === 'jass-des-tages') return { aktiv: 'jass-des-tages', thema: STANDARD_THEMA };
  if (erstes === 'begriffe') return { aktiv: 'begriffe', thema: STANDARD_THEMA };
  const bereich = hauptbereiche().find((b) => b.href === `/${erstes}/`);
  return bereich ? { aktiv: 'thema', thema: bereich.name } : { aktiv: 'keiner', thema: STANDARD_THEMA };
};

const ThemenWahl: React.FC<{ aktiv: boolean; thema: string; pfad: string }> = ({ aktiv, thema, pfad }) => {
  const [offen, setOffen] = useState(false);
  const huelle = useRef<HTMLDivElement | null>(null);

  useEffect(() => setOffen(false), [pfad]);

  useEffect(() => {
    if (!offen) return;
    const daneben = (e: MouseEvent) => {
      if (!huelle.current?.contains(e.target as Node)) setOffen(false);
    };
    const taste = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOffen(false);
    };
    document.addEventListener('mousedown', daneben);
    document.addEventListener('keydown', taste);
    return () => {
      document.removeEventListener('mousedown', daneben);
      document.removeEventListener('keydown', taste);
    };
  }, [offen]);

  return (
    <div ref={huelle} className="jw-kopf-themen">
      <button
        type="button"
        className={`jw-kopf-nav${aktiv ? ' ist-aktiv' : ''}`}
        aria-expanded={offen}
        aria-haspopup="true"
        aria-current={aktiv ? 'true' : undefined}
        onClick={() => setOffen((alt) => !alt)}
      >
        <span>{thema}</span>
        <span className="jw-kopf-nav-zeichen">
          <ZeichenAuf />
        </span>
      </button>
      {offen && (
        <div className="jw-kopf-themen-liste jw-nav">
          {hauptbereiche().map((b) => (
            <Link
              key={b.href}
              href={b.href}
              className="jw-nav-haupt"
              aria-current={pfad.startsWith(b.href) ? 'true' : undefined}
              onClick={() => setOffen(false)}
            >
              {b.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

/** Kopf Desktop, Figma 2280:1955 und Varianten: 72 hoch, Inhalt 1200 ab x 120. */
export const KopfDesktop: React.FC = () => {
  const router = useRouter();
  const { aktiv, thema } = kopfZustand(router.asPath);
  const pfad = pfadVon(router.asPath);

  return (
    <header className="jw-kopf jw-kopf-desktop">
      <JassWikiMarke />
      <nav className="jw-kopf-navigation" aria-label="Bereiche">
        <ThemenWahl aktiv={aktiv === 'thema'} thema={thema} pfad={pfad} />
        <Link
          href="/begriffe/"
          className={`jw-kopf-nav${aktiv === 'begriffe' ? ' ist-aktiv' : ''}`}
          aria-current={aktiv === 'begriffe' ? 'true' : undefined}
        >
          Begriffe A bis Z
        </Link>
        <Link
          href="/jass-des-tages/"
          className={`jw-kopf-nav${aktiv === 'jass-des-tages' ? ' ist-aktiv' : ''}`}
          aria-current={aktiv === 'jass-des-tages' ? 'true' : undefined}
        >
          Jass des Tages
        </Link>
      </nav>
      <div className="jw-kopf-platz" />
      <div className="jw-kopf-suche">
        <SearchBar variante="kopf" />
      </div>
      <a href="https://jassguru.ch/" target="_blank" rel="noopener noreferrer" className="jw-kopf-online">
        Online jassen ↗
      </a>
    </header>
  );
};

/** Kopf Telefon, Figma 2299:3341: Zeile 60 mit Knöpfen 44, darunter Suche 44. */
export const KopfTelefon = React.forwardRef<
  HTMLButtonElement,
  { menueOffen: boolean; onMenue: () => void }
>(({ menueOffen, onMenue }, menueKnopf) => {
  const suchfeld = useRef<HTMLInputElement | null>(null);
  return (
    <header className="jw-kopf-telefon">
      <div className="jw-kopf jw-kopf-zeile">
        <JassWikiMarke />
        <div className="jw-kopf-platz" />
        <button
          type="button"
          className="jw-kopf-knopf"
          aria-label="Suchen"
          onClick={() => suchfeld.current?.focus()}
        >
          <ZeichenSuchen groesse={12} />
        </button>
        <button
          ref={menueKnopf}
          type="button"
          className="jw-kopf-knopf"
          aria-label="Navigation öffnen"
          aria-expanded={menueOffen}
          onClick={onMenue}
        >
          <ZeichenMenue />
        </button>
      </div>
      <div className="jw-kopf-telefon-suche">
        <SearchBar variante="telefon" eingabeRef={suchfeld} />
      </div>
    </header>
  );
});
KopfTelefon.displayName = 'KopfTelefon';

/** Kopf im offenen Menü, Figma 2280:1990: Logo und Knopf zum Schliessen. */
export const KopfMenueOffen: React.FC<{ onSchliessen: () => void }> = ({ onSchliessen }) => (
  <div className="jw-kopf jw-kopf-zeile">
    <JassWikiMarke />
    <div className="jw-kopf-platz" />
    <button type="button" className="jw-kopf-knopf" aria-label="Themen schliessen" onClick={onSchliessen}>
      <ZeichenSchliessen />
    </button>
  </div>
);
