import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { JassKarte } from './jasskarten';

interface Props {
  karte: JassKarte;
  onClose: () => void;
}

/**
 * Grossansicht einer einzelnen Jasskarte (Portal über der Seite).
 * Esc und Klick daneben schliessen, die Seite dahinter steht still.
 * Gemeinsame Grundlage für das Karten-Raster (JassCardGrid) und die
 * Kartenreihen im Artikeltext (JassKartenReihe).
 */
export const KartenLightbox: React.FC<Props> = ({ karte, onClose }) => {
  // Die Grossansicht öffnet erst auf einen Klick oder einen Anker; beim Rendern
  // steht der Browser also immer zur Verfügung.
  const schliessen = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    const beiTaste = (e: KeyboardEvent) => {
      if (e.key === 'Escape') schliessen();
    };
    document.addEventListener('keydown', beiTaste);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', beiTaste);
      document.body.style.overflow = '';
    };
  }, [schliessen]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={karte.name}
      onClick={schliessen}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
    >
      <div className="relative flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={schliessen}
          aria-label="Schliessen"
          className="absolute -top-9 right-0 text-3xl leading-none text-white/80 hover:text-white"
        >
          ×
        </button>
        <img
          src={karte.image}
          alt={karte.alt}
          className="max-h-[78vh] w-auto rounded-xl bg-white shadow-2xl"
        />
        <div className="mt-3 text-center text-white">
          <div className="text-lg font-bold text-white">{karte.name}</div>
          <div className="text-sm text-white/70">{karte.desc}</div>
          <p className="mt-3 text-sm italic text-white">
            Design:{' '}
            <a
              href="https://schweizerjass.ch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline decoration-white/60 underline-offset-2 transition-colors hover:decoration-white"
            >
              schweizerjass.ch
            </a>
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};
