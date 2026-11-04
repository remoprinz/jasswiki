import React from 'react';

/* Figma zeichnet diese Zeichen als Schrift ⌕ ☰ ✕ ⌄. Sie fehlen in Inter und fielen
   je Gerät anders aus, darum als Pfade in der Grösse des Knotens. */

export const ZeichenSuchen: React.FC<{ groesse: number }> = ({ groesse }) => (
  <svg aria-hidden width={groesse} height={groesse} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <circle cx="7.3" cy="4.7" r="3.7" />
    <path d="M4.6 7.4 1.2 10.8" />
  </svg>
);

export const ZeichenMenue = () => (
  <svg aria-hidden width="17" height="14" viewBox="0 0 17 14" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1.5 2h14M1.5 7h14M1.5 12h14" />
  </svg>
);

export const ZeichenSchliessen = () => (
  <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
    <path d="M2 2l12 12M14 2 2 14" />
  </svg>
);

export const ZeichenAuf = () => (
  <svg aria-hidden width="8" height="20" viewBox="0 0 8 20" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.5 9.5 4 12.5l2.5-3" />
  </svg>
);
