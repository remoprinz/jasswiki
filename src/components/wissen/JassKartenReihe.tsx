import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { JassKarte, karteAusSlug } from './jasskarten';
import { KartenLightbox } from './KartenLightbox';
import {
  kartensystemAusSpeicherHolen,
  kartensystemSetzen,
  useKartensystem,
} from './kartensystem';

const JASSKARTEN_URL = '/grundlagen-kultur/jasskarten/';

/**
 * Ab so vielen Karten gilt die Reihe als volles Blatt: die Karten teilen sich
 * ab Tablet-Breite die Artikelbreite, damit alle ohne Rollen sichtbar sind
 * (Stil .jw-karten-band--voll in globals.css). Kürzere Reihen bleiben unverändert.
 */
const VOLLES_BLATT_AB = 7;

/**
 * Lage des Bandes im Fenster: Steht alles im Bild («nein») oder geht es nach
 * rechts, nach links oder nach beiden Seiten weiter? Der Wert steht als
 * `data-roll` am Band, den Verlauf an der Kante malt globals.css.
 */
type Rollstand = 'nein' | 'rechts' | 'beide' | 'links';

/** Spielraum in Pixeln, unter dem eine Rollstrecke als «keine» gilt. */
const ROLL_SPIEL = 2;

interface Props {
  /** Karten-Slugs aus der Marke, z. B. ['eichel-under', 'eichel-ass']. */
  slugs: string[];
  /** Beschriftung unter der Reihe (optional). */
  beschriftung?: string;
  /**
   * Karten, die in dieser Reihe hervortreten — geschrieben als «slug!» in der
   * Marke. Verglichen wird der geschriebene Slug, darum trägt die Karte ihre
   * Hervorhebung in beiden Kartensystemen.
   */
  hervor?: string[];
  /**
   * Aufschrift über der Reihe, dritter Teil der Marke — z. B. «Mein Blatt»,
   * «Der Stich», «Weis». Fehlt sie, steht dort «Jasskarten».
   */
  aufschrift?: string;
  /**
   * Zeigt den Umschalter Deutsch/Französisch über der Reihe. Der Renderer
   * setzt ihn nur bei der ersten Kartenreihe eines Artikels (Remo, 17.08.2026);
   * die Wahl gilt für alle Reihen der Seite.
   */
  mitWahl?: boolean;
  /**
   * Sprungziel der Abbildung, aus der Aufschrift gebildet (InternalLinker).
   * Damit lässt sich «#bild-fuenfblatt» anspringen und zitieren.
   */
  anker?: string;
}

/**
 * Eine Reihe echter Jasskarten im Artikeltext.
 * Gesetzt wird sie im Inhalt über die Marke
 * [[karten: slug, slug | Beschriftung | Aufschrift]]; der Renderer
 * (InternalLinker) löst sie auf. Das Kartensystem folgt der Wahl des Lesers,
 * Vorgabe ist das Deutschschweizer Blatt.
 *
 * Die Aufschrift sagt, WAS die Reihe zeigt (SCHIEDSRICHTER, 20.08.2026): Zwei
 * Bänder untereinander sahen bis dahin gleich aus, obwohl das eine eine Hand
 * zeigte und das andere die Karten eines Stichs — genau daran blieb Remo am
 * 20.08. hängen. Fehlt der dritte Teil, steht dort «Jasskarten» wie bisher.
 *
 * Ein Band, das breiter ist als das Fenster, läuft an der Kante aus (`data-roll`,
 * Verlauf in globals.css). Am Handy zeigten sonst 22 von 63 Reihen genau vier
 * Karten hinter einer geraden Kante und sahen dabei fertig aus — das Neunblatt
 * wie ein Vierblatt (gemessen 23.08.2026).
 *
 * Die Abbildung trägt ein Sprungziel aus ihrer Aufschrift (`anker`) und nennt
 * sich über `aria-labelledby` bei diesem Namen.
 *
 * Eine einzelne Karte tritt hervor, wenn sie in der Marke ein Ausrufezeichen
 * trägt («rosen-koenig!»): Beim Kreuzweis gehört der Rosen-König zu beiden
 * Weisen, und das Bild zeigt es (Remo, 20.08.2026). Das Kartenmass und die
 * Abstände bleiben dabei, wie sie sind — es wechselt die Farbe des Rahmens.
 *
 * Kartenbilder: schweizerjass.ch (Jens Riedweg).
 */
export const JassKartenReihe: React.FC<Props> = ({
  slugs,
  beschriftung,
  hervor,
  aufschrift,
  mitWahl = true,
  anker,
}) => {
  const system = useKartensystem();
  const [gross, setGross] = useState<JassKarte | null>(null);
  const bandRef = useRef<HTMLDivElement>(null);
  const [roll, setRoll] = useState<Rollstand>('nein');

  useEffect(() => {
    kartensystemAusSpeicherHolen();
  }, []);

  // Die Hervorhebung hängt am geschriebenen Slug, die Karte am gewählten
  // System — darum bleiben beide zusammen, statt sich über den Index zu
  // suchen: Ein unbekannter Slug fällt aus der Reihe und würde jeden Index
  // danach verschieben.
  const karten = useMemo(() => {
    const markiert = new Set(hervor ?? []);
    return slugs
      .map((s) => ({ karte: karteAusSlug(s, system), hervor: markiert.has(s) }))
      .filter((e): e is { karte: JassKarte; hervor: boolean } => Boolean(e.karte));
  }, [slugs, system, hervor]);

  // Rollt das Band, und wohin? Gemessen am Band selbst, darum stimmt der Wert
  // bei jeder Fensterbreite und nach jedem Wischen — und er bleibt «nein»,
  // solange alle Karten im Bild stehen. Der Beobachter hängt am Band und wird
  // mit ihm abgeräumt; setzt der Zustand denselben Wert, rendert React nichts
  // neu.
  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;

    const messen = () => {
      const strecke = band.scrollWidth - band.clientWidth;
      if (strecke <= ROLL_SPIEL) {
        setRoll('nein');
        return;
      }
      const vorne = band.scrollLeft > ROLL_SPIEL;
      const hinten = band.scrollLeft < strecke - ROLL_SPIEL;
      setRoll(vorne && hinten ? 'beide' : vorne ? 'links' : 'rechts');
    };

    messen();
    const beobachter = new ResizeObserver(messen);
    beobachter.observe(band);
    band.addEventListener('scroll', messen, { passive: true });
    return () => {
      beobachter.disconnect();
      band.removeEventListener('scroll', messen);
    };
  }, [karten.length, system]);

  if (karten.length === 0) return null;

  return (
    <figure
      className="jw-karten-reihe not-prose scroll-mt-24"
      id={anker}
      aria-labelledby={anker ? `${anker}-marke` : undefined}
    >
      <div className="jw-karten-kopf">
        <span className="jw-karten-marke" id={anker ? `${anker}-marke` : undefined}>
          {aufschrift?.trim() || 'Jasskarten'}
        </span>
        {mitWahl && (
          <div className="jw-karten-wahl" role="group" aria-label="Kartensystem wählen">
            <button
              type="button"
              onClick={() => kartensystemSetzen('de')}
              aria-pressed={system === 'de'}
              className="jw-karten-wahl-knopf"
            >
              Deutsch
            </button>
            <button
              type="button"
              onClick={() => kartensystemSetzen('fr')}
              aria-pressed={system === 'fr'}
              className="jw-karten-wahl-knopf"
            >
              Französisch
            </button>
          </div>
        )}
      </div>

      <div className="jw-karten-fenster">
        <div
          ref={bandRef}
          className={
            karten.length >= VOLLES_BLATT_AB
              ? 'jw-karten-band jw-karten-band--voll'
              : 'jw-karten-band'
          }
          data-karten={karten.length}
          data-roll={roll}
        >
          {karten.map(({ karte, hervor: trittHervor }, i) => (
            <button
              key={`${karte.slug}-${i}`}
              type="button"
              onClick={() => setGross(karte)}
              aria-label={
                trittHervor
                  ? `${karte.name}, hervorgehoben, vergrössern`
                  : `${karte.name} vergrössern`
              }
              className={trittHervor ? 'jw-karte jw-karte--hervor' : 'jw-karte'}
            >
              <img
                src={karte.image}
                alt={karte.alt}
                title={karte.name}
                width={120}
                height={180}
                loading="lazy"
                className="jw-karte-bild"
              />
              <span className="jw-karte-name">{karte.name}</span>
            </button>
          ))}
        </div>
        {(roll === 'rechts' || roll === 'beide') && (
          <span className="jw-karten-weiter" aria-hidden>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden>
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>

      <figcaption className="jw-karten-fuss">
        {beschriftung ? <span className="jw-karten-text">{beschriftung}</span> : null}
        <Link href={JASSKARTEN_URL} className="jw-karten-link">
          Alle Jasskarten
        </Link>
      </figcaption>

      {gross && <KartenLightbox karte={gross} onClose={() => setGross(null)} />}
    </figure>
  );
};
