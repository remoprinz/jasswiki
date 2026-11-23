import React from 'react';
import rueckmeldung from '@/data/rueckmeldung.json';
import { ortVon } from '@/lib/gliederung';

// Zeile für Rückmeldungen am Schluss jedes Artikels (A1 Etappe 1.7, Karte SCHIRI
// «wiki-huelle» Teil D, KELLE 22.11.2026). Ein Satz und ein Knopf, der Knopf
// öffnet eine Mail; Formular und Fenster gibt es bewusst keines. Der Wortlaut
// lebt allein in src/data/rueckmeldung.json (FEILE gesiegelt), {artikel} trägt
// den Artikeltitel in Betreff und Vorlage.
//
// Ausbau 23.11.2026 (Remo bei FEILE: «rückmeldezeile ja», SCHIRI): Der Satz
// richtet sich nach der Rubrik des Artikels in der Gliederung, die Mail trägt
// eine Vorlage. Seiten ohne Rubrik-Satz behalten den allgemeinen Satz.
// Einsendungen kommen erst nach SCHIRIs Prüfung ins Wiki, unter «Praxis»,
// mit der Dankeszeile aus rueckmeldung.json (dank).

const saetze = rueckmeldung.saetzeJeRubrik as Record<string, string>;

export const rueckmeldungSatz = (kennung?: string): string => {
  const rubrik = kennung ? ortVon(kennung)?.rubrik?.name : undefined;
  return (rubrik && saetze[rubrik]) || rueckmeldung.satz;
};

export const rueckmeldungMailto = (artikel: string): string => {
  const betreff = rueckmeldung.betreff.replace('{artikel}', artikel);
  const vorlage = rueckmeldung.vorlage.map((z) => z.replace('{artikel}', artikel)).join('\r\n');
  return `mailto:${rueckmeldung.an}?subject=${encodeURIComponent(betreff)}&body=${encodeURIComponent(vorlage)}`;
};

export const RueckmeldungZeile: React.FC<{ artikel: string; kennung?: string }> = ({ artikel, kennung }) => (
  <div className="not-prose flex flex-wrap items-center justify-center gap-x-[12px] gap-y-[8px] py-[16px] text-center">
    <p className="!m-0 font-inter text-[14px] font-normal text-[#88816d] leading-[1.4286]">{rueckmeldungSatz(kennung)}</p>
    <a
      href={rueckmeldungMailto(artikel)}
      className="inline-flex items-center min-h-[36px] px-[16px] py-[6px] rounded-[999px] border border-[#ff0000] !text-[#ff0000] !no-underline font-inter text-[14px] font-bold leading-[1.3] hover:bg-[#fff1f1] transition-colors"
    >
      {rueckmeldung.knopf}
    </a>
  </div>
);

export default RueckmeldungZeile;
