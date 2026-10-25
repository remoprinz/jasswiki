import React from 'react';
import leitartikel from '@/data/leitartikel.json';

// Schlusssatz der Leitartikel (Karte LEUCHTTURM P2, Remos Entscheid 25.10.2026):
// führt vom Lesen zum Jassen mit anderen. Welche Artikel ihn tragen, steht in
// src/data/leitartikel.json (Redaktion SCHIRI, Satz WELLE, gefeilt von FEILE).
// Steht ausserhalb des Artikeltexts, damit Korpus, llms und MCP-Karten die
// Regel tragen und der Verweis allein auf der Seite steht.

export const JassfreundeSatz: React.FC<{ schluessel: string }> = ({ schluessel }) => {
  const daten = leitartikel as { tuer: string; artikel: Record<string, unknown> };
  if (!(schluessel in daten.artikel)) return null;

  return (
    <p className="mt-[24px] pt-[24px] border-t border-[#f0eee7] font-inter text-[15px] leading-[1.6] text-black">
      Am Tisch versteht man das Jassen am schnellsten.{' '}
      <a href={daten.tuer} className="text-[#ff0000] underline">
        Online jassen
      </a>{' '}
      geht auch mit den eigenen Jassfreunden: Man ruft sie per Link an den Tisch und spielt die Partie zusammen.
    </p>
  );
};

export default JassfreundeSatz;
