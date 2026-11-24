import React, { useEffect, useRef, useState } from 'react';
import { JDT_TEXTE, JDT_LINKS } from '@/data/jass-des-tages-texte';

/**
 * JDT-VIDEO (GEO/SEO P2/P3, KELLE 25.10.2026): das Lösungsvideo eines Jass des
 * Tages. Bis zum Klick steht allein das Deckbild (kein YouTube-Skript, keine
 * Cookies, keine Last). Der Klick spielt den eigenen Film; meldet er einen
 * Fehler, übernimmt die Einbettung von youtube-nocookie (Remo 22.11.2026). Das VideoObject reist mit:
 * Google liest es auch aus dem Body.
 *
 * Die Felder kommen fertig von aussen (gestern.json oder die P2-Liste von
 * LEUCHTTURM), der Baustein rät nichts.
 */
export interface JdtVideoDaten {
  datum: string; // JJJJ-MM-TT
  aufgabe: string;
  titel?: string;
  mp4: string | null; // Film am Speicher; null, wenn allein YouTube trägt
  poster: string | null; // ganze Adresse oder lokaler Pfad (/bilder/jdt/…)
  dauer: string | null; // ISO 8601, etwa PT42S
  youtube: string | null;
  /** Lehrfilm des Wikis (ein Lehrblatt, kein Tagesblatt, KELLE 24.11.2026):
   *  Beschriftung ohne Datum, eigener Satz, eigene Kennung im Schema. `datum`
   *  ist dann der Tag des Renders. */
  lehrfilm?: { kennung: string; satz: string } | null;
}

/** Die Beschriftung unter dem Film: Tagesblatt mit Datum, Lehrfilm ohne. */
export function beschriftungFuer(d: JdtVideoDaten): string {
  const aufgabe = aufgabeKurz(d.aufgabe || d.titel || '');
  if (d.lehrfilm) return JDT_TEXTE.lehrfilmBeschriftung.replace('{aufgabe}', aufgabe);
  return JDT_TEXTE.videoBeschriftung.replace('{datum}', datumLang(d.datum)).replace('{aufgabe}', aufgabe);
}

const MONATE = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

export function datumLang(iso: string): string {
  const [j, m, t] = iso.split('-').map(Number);
  return `${t}. ${MONATE[m - 1]} ${j}`;
}

/** Die Video-Kennung aus shorts/ID, watch?v=ID, youtu.be/ID oder embed/ID. */
export function youtubeKennung(url: string | null): string | null {
  if (!url) return null;
  const m = /(?:youtu\.be\/|\/shorts\/|\/embed\/|[?&]v=)([A-Za-z0-9_-]{6,20})/.exec(url);
  return m ? m[1] : null;
}

/** Die Aufgabe ohne Schlusspunkt, damit sie nach dem Doppelpunkt sauber steht. */
function aufgabeKurz(s: string): string {
  return s.trim().replace(/[.\s]+$/, '');
}

/** Ganze Adresse für das Schema: ein lokaler Pfad bekommt die Wiki-Adresse davor. */
function ganzeAdresse(pfad: string): string {
  return pfad.startsWith('/') ? `https://jasswiki.ch${pfad}` : pfad;
}

/** Hat der Eintrag etwas zum Abspielen (Film oder YouTube)? */
export function hatFilm(d: Partial<JdtVideoDaten> | null | undefined): boolean {
  return !!d && !!d.datum && (!!d.mp4 || !!youtubeKennung(d.youtube ?? null));
}

// Der eigene Film ist die Quelle (Remo 22.11.2026: «Der Film bleibt bei uns,
// YouTube bleibt der Verteilkanal»): contentUrl zeigt auf den eigenen Film,
// embedUrl steht dazu, wo eine YouTube-Kennung da ist.
export function videoObjekt(d: JdtVideoDaten, satz: string = JDT_TEXTE.videoSatz) {
  const kennung = youtubeKennung(d.youtube);
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    '@id': d.lehrfilm
      ? `https://jasswiki.ch/#lehrfilm-${d.lehrfilm.kennung}`
      : `https://jassguru.ch/jass-des-tages/${d.datum}/#video`,
    name: d.lehrfilm
      ? beschriftungFuer(d)
      : `Jass des Tages vom ${datumLang(d.datum)}: ${aufgabeKurz(d.aufgabe || d.titel || '')}`,
    description: satz,
    ...(d.poster ? { thumbnailUrl: ganzeAdresse(d.poster) } : {}),
    ...(d.mp4 ? { contentUrl: d.mp4 } : {}),
    ...(kennung ? { embedUrl: `https://www.youtube.com/embed/${kennung}` } : {}),
    uploadDate: d.datum,
    ...(d.dauer ? { duration: d.dauer } : {}),
    inLanguage: 'de-CH',
    isFamilyFriendly: true,
    publisher: { '@id': 'https://jassguru.ch/#organization' },
    author: { '@id': 'https://jassguru.ch/#remo-prinz' },
  };
}

export const JdtVideo: React.FC<{ daten: JdtVideoDaten; mitTuer?: boolean; satz?: string }> = ({
  daten,
  mitTuer = true,
  satz = JDT_TEXTE.videoSatz,
}) => {
  // Was nach dem Klick spielt: zuerst der eigene Film, YouTube allein als
  // Ersatz (Remo 22.11.2026, Anlass: YouTubes Anmeldewand beim Abspielen).
  const [quelle, setQuelle] = useState<'film' | 'youtube' | null>(null);
  const laeuft = quelle !== null;
  // weg: Film und YouTube fehlen, oder der Film meldet einen Fehler und es gibt
  // kein YouTube. Dann verschwindet der ganze Baustein (im Block «Üben» bleiben
  // die Blätter).
  const [weg, setWeg] = useState(false);
  const [deckbildKaputt, setDeckbildKaputt] = useState(false);
  const deckbild = useRef<HTMLImageElement>(null);
  const kennung = youtubeKennung(daten.youtube);

  // Ein fehlendes Deckbild nimmt nur das Bild weg; der Kasten mit dem
  // Abspielknopf bleibt, solange Film oder YouTube da sind.
  const deckbildFehlt = () => {
    if (daten.mp4 || kennung) setDeckbildKaputt(true);
    else setWeg(true);
  };

  const abspielen = () => setQuelle(daten.mp4 ? 'film' : kennung ? 'youtube' : null);
  const filmFehlt = () => {
    if (kennung) setQuelle('youtube');
    else setWeg(true);
  };

  // Ein Fehler beim Laden kann vor der Hydration passieren; dann kam onError
  // nie an. Darum einmal nach dem Einhängen nachsehen.
  useEffect(() => {
    const bild = deckbild.current;
    if (bild && bild.complete && bild.naturalWidth === 0) deckbildFehlt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (weg || (!kennung && !daten.mp4)) return null;
  const beschriftung = beschriftungFuer(daten);
  const text = daten.lehrfilm?.satz ?? satz;

  return (
    <figure
      className="not-prose my-[20px]"
      data-jdt-video={daten.datum}
      data-lehrfilm={daten.lehrfilm?.kennung}
    >
      {/* Hochformat wie der Short: 9 zu 16, höchstens 320 breit. */}
      <div className="relative mx-auto w-full max-w-[320px] aspect-[9/16] overflow-hidden rounded-[12px] border-[1.74px] border-black bg-black">
        {quelle === 'youtube' && kennung ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${kennung}?autoplay=1&playsinline=1&rel=0`}
            title={beschriftung}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : laeuft ? (
          <video
            className="absolute inset-0 h-full w-full"
            src={daten.mp4 ?? undefined}
            poster={!deckbildKaputt ? (daten.poster ?? undefined) : undefined}
            onError={filmFehlt}
            controls
            autoPlay
            playsInline
          />
        ) : (
          <button
            type="button"
            onClick={abspielen}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={daten.lehrfilm ? beschriftung : `${JDT_TEXTE.videoAbspielen}: ${beschriftung}`}
          >
            {daten.poster && !deckbildKaputt && (
              <img
                ref={deckbild}
                onError={deckbildFehlt}
                src={daten.poster}
                alt=""
                loading="lazy"
                decoding="async"
                width={360}
                height={640}
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            <span className="absolute left-1/2 top-1/2 flex h-[64px] w-[64px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#ff0101] shadow-lg transition-transform group-hover:scale-110">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                <path d="M8 5v14l11-7z" fill="#fff" />
              </svg>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mx-auto mt-[12px] max-w-[480px] text-center">
        <span className="block font-capita text-[17px] font-bold leading-[1.35] text-black">{beschriftung}</span>
        <span className="mt-[4px] block font-inter text-[15px] leading-[1.6] text-black">
          {text}
        </span>
        {mitTuer && (
          <a href={JDT_LINKS.tuer} className="mt-[6px] inline-block font-inter text-[15px] font-bold text-[#ff0000] underline">
            {JDT_TEXTE.videoTuer}
          </a>
        )}
      </figcaption>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoObjekt(daten, text)) }}
      />
    </figure>
  );
};

export default JdtVideo;
