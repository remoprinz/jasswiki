import React, { useEffect, useRef, useState } from 'react';
import artikelfilme from '@/data/artikelfilme.json';

/**
 * FILM IM ARTIKEL (KELLE 25.11.2026, Karte SCHIRI «jass-ki-film»): ein stummer
 * Film zuoberst im Artikel, direkt unter dem ersten Absatz. Er spielt von
 * selbst in der Schleife, ohne Steuerleiste. Wer weniger Bewegung wünscht
 * (prefers-reduced-motion), sieht allein das Standbild.
 *
 * Die Daten leben allein in src/data/artikelfilme.json (Redaktion SCHIRI):
 * artikel[<kennung>] = {mp4, poster, bildzeile, quelle, name, beschreibung,
 * dauer, datum, breite, hoehe}. Fehlt der Eintrag oder mp4, rendert nichts.
 * Der Film liegt unter public/filme/ und gehört damit jasswiki.ch selbst.
 */
export interface ArtikelFilmDaten {
  mp4: string;
  poster?: string;
  bildzeile: string;
  quelle?: string;
  name?: string;
  beschreibung?: string;
  dauer?: string;
  datum?: string;
  breite?: number;
  hoehe?: number;
  /** Ersteller, wie er im Schema steht; ohne Angabe die FHNW. */
  ersteller?: string;
}

export function filmFuer(kennung: string): ArtikelFilmDaten | null {
  const artikel = (artikelfilme as unknown as { artikel: Record<string, Partial<ArtikelFilmDaten>> }).artikel;
  const f = artikel?.[kennung];
  if (!f || !f.mp4 || !f.bildzeile) return null;
  return f as ArtikelFilmDaten;
}

const ganzeAdresse = (pfad: string) => (pfad.startsWith('/') ? `https://jasswiki.ch${pfad}` : pfad);

export function filmObjekt(kennung: string, f: ArtikelFilmDaten) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': `https://jasswiki.ch/#film-${kennung}`,
    name: f.name ?? f.bildzeile,
    description: f.beschreibung ?? f.bildzeile,
    contentUrl: ganzeAdresse(f.mp4),
    ...(f.poster ? { thumbnailUrl: ganzeAdresse(f.poster) } : {}),
    ...(f.dauer ? { duration: f.dauer } : {}),
    ...(f.datum ? { uploadDate: f.datum } : {}),
    ...(f.breite ? { width: f.breite } : {}),
    ...(f.hoehe ? { height: f.hoehe } : {}),
    inLanguage: 'de-CH',
    isFamilyFriendly: true,
    creator: {
      '@type': 'CollegeOrUniversity',
      name: f.ersteller ?? 'Fachhochschule Nordwestschweiz FHNW',
      url: 'https://www.fhnw.ch/',
    },
  };
}

export const ArtikelFilm: React.FC<{ kennung: string }> = ({ kennung }) => {
  const f = filmFuer(kennung);
  const film = useRef<HTMLVideoElement>(null);
  /* DER FILM STEHT SCHON IM STATISCHEN HTML (LEUCHTTURM 25.11.2026): Google erkennt ein Video sicherer,
     wenn das video-Element mit src und poster im ausgelieferten HTML steht und zum VideoObject passt. Ohne
     Script zeigt es das Standbild und lädt nichts (preload none). Nach dem Einhängen spielt es stumm in der
     Schleife, ausser bei der Bitte um weniger Bewegung: Dann bleibt das Standbild stehen. */
  const [kaputt, setKaputt] = useState(false);

  useEffect(() => {
    const v = film.current;
    if (!v) return;
    const frage = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const setze = () => {
      if (frage?.matches) {
        v.pause();
        return;
      }
      v.preload = 'auto';
      // Manche Browser starten stumme Filme erst auf ausdrücklichen Ruf.
      v.play().catch(() => undefined);
    };
    setze();
    frage?.addEventListener?.('change', setze);
    return () => frage?.removeEventListener?.('change', setze);
  }, []);

  if (!f) return null;
  const breite = f.breite ?? 1920;
  const hoehe = f.hoehe ?? 1080;

  return (
    <figure className="not-prose !my-[20px]" data-artikel-film={kennung}>
      <div
        className="relative w-full overflow-hidden rounded-[12px] border border-[#e6e2d6] bg-black"
        style={{ aspectRatio: `${breite} / ${hoehe}` }}
      >
        {!kaputt ? (
          <video
            ref={film}
            className="absolute inset-0 h-full w-full object-cover"
            src={f.mp4}
            poster={f.poster}
            width={breite}
            height={hoehe}
            muted
            loop
            playsInline
            preload="none"
            aria-label={f.name ?? f.bildzeile}
            onError={() => setKaputt(true)}
          />
        ) : f.poster ? (
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={f.poster}
            alt={f.name ?? f.bildzeile}
            width={breite}
            height={hoehe}
            decoding="async"
          />
        ) : null}
      </div>
      <figcaption className="mt-[8px] font-inter text-[13px] leading-[1.45] text-[#88816d]">
        {f.bildzeile}
        {f.quelle && <span className="ml-[6px] whitespace-nowrap">{f.quelle}</span>}
      </figcaption>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(filmObjekt(kennung, f)) }}
      />
    </figure>
  );
};

export default ArtikelFilm;
