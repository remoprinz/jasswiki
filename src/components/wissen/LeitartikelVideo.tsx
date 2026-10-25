import React from 'react';
import leitartikel from '@/data/leitartikel.json';
import { JdtVideo, type JdtVideoDaten } from '@/components/wissen/JdtVideo';

// Lösungsvideo auf den Leitartikeln (GEO/SEO P2 Teil C, KELLE 25.10.2026).
// Die Auswahl lebt allein in src/data/leitartikel.json (Redaktion SCHIRI):
// artikel[<schlüssel>].jdt = {datum, satz, aufgabe, mp4, poster, dauer, youtube}.
// Fehlt der Eintrag, jdt oder mp4, rendert nichts. Der Verweis zur Tür steht
// im Jassfreunde-Satz direkt darunter, darum mitTuer={false}.

type Eintrag = { jdt: (Partial<JdtVideoDaten> & { satz?: string }) | null };

export function jdtFuer(schluessel: string): { daten: JdtVideoDaten; satz: string } | null {
  const artikel = (leitartikel as unknown as { artikel: Record<string, Eintrag> }).artikel;
  const jdt = artikel[schluessel]?.jdt;
  if (!jdt || !jdt.datum || !jdt.mp4 || !jdt.aufgabe || !jdt.satz) return null;
  return {
    daten: {
      datum: jdt.datum,
      aufgabe: jdt.aufgabe,
      mp4: jdt.mp4,
      poster: jdt.poster ?? null,
      dauer: jdt.dauer ?? null,
      youtube: jdt.youtube ?? null,
    },
    satz: jdt.satz,
  };
}

export const LeitartikelVideo: React.FC<{ schluessel: string }> = ({ schluessel }) => {
  const eintrag = jdtFuer(schluessel);
  if (!eintrag) return null;
  return <JdtVideo daten={eintrag.daten} satz={eintrag.satz} mitTuer={false} />;
};

export default LeitartikelVideo;
