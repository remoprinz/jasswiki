import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { farbAnzeige, karteAusSlug, type FarbCode, type JassKarte } from './jasskarten';
import { KartenLightbox } from './KartenLightbox';
import { sitzeOrdnen, type SitzBild, type SitzWort, type TischSitz } from './tischMarke';
import {
  kartensystemAusSpeicherHolen,
  kartensystemSetzen,
  useKartensystem,
} from './kartensystem';

const JASSKARTEN_URL = '/grundlagen-kultur/jasskarten/';

/**
 * Der Jasstisch im Artikeltext: vier Plätze, der gelegte Stich, darunter das
 * Blatt des Lesers. Gesetzt wird er im Inhalt über die Marke [[tisch: …]].
 *
 * Warum ein Tisch und keine Reihe: Eine Kartenreihe zeigt vier Karten, aber
 * niemandem gehört eine davon. Erst der Platz sagt, wer sie gelegt hat — und
 * genau daraus rechnet der Leser beim Hoch-tief, wo die übrigen Trümpfe liegen.
 *
 * Quadratischer Filz wie in der Arena (Remo, 19.08.2026): die Trumpfansage
 * steht oben am Rand, die Mitte gehört den vier Karten. Nüchtern bleibt der
 * Tisch dabei — er zeigt, was liegt, und deutet nichts.
 *
 * Zwei Dinge liest das Bild von selbst ab, damit sie nie falsch stehen können:
 * die Reihenfolge (gegen den Uhrzeigersinn ab dem Ausspiel) und der Platz, der
 * als nächster legt.
 *
 * Kartenbilder: schweizerjass.ch (Jens Riedweg). Farbzeichen: JassGuru-Set.
 */

interface Props {
  /** Gelegte Karten; der erste Eintrag hat ausgespielt. */
  sitze: TischSitz[];
  trumpf?: FarbCode;
  /** Wer unten sitzt — aus seiner Sicht ist die Lage erzählt. */
  sicht?: 'ansager' | 'partner';
  /** Aufschrift links oben auf dem Filz, z. B. «1. Stich». */
  titel?: string;
  /** Platz, der als Nächstes legt — sonst rechnet der Tisch ihn aus. */
  zug?: SitzWort;
  /** Das Blatt des unten sitzenden Spielers. */
  blatt?: string[];
  beschriftung?: string;
  /** Umschalter Deutsch/Französisch — einmal je Seite, beim ersten Kartenblock. */
  mitWahl?: boolean;
}

/** Rollen der vier Plätze — der Leser sitzt unten. */
function rollen(sicht: 'ansager' | 'partner'): Record<SitzWort, string> {
  return sicht === 'partner'
    ? { ich: 'Partner', partner: 'Ansager', links: 'Gegner', rechts: 'Gegner' }
    : { ich: 'Ansager', partner: 'Partner', links: 'Gegner', rechts: 'Gegner' };
}

export const JassTisch: React.FC<Props> = ({
  sitze,
  trumpf,
  sicht = 'ansager',
  titel,
  zug,
  blatt,
  beschriftung,
  mitWahl = true,
}) => {
  const system = useKartensystem();
  const [gross, setGross] = useState<JassKarte | null>(null);

  useEffect(() => {
    kartensystemAusSpeicherHolen();
  }, []);

  const plaetze: SitzBild[] = useMemo(() => sitzeOrdnen(sitze, zug), [sitze, zug]);

  const handkarten = useMemo(
    () => (blatt ?? []).map((s) => karteAusSlug(s, system)).filter((k): k is JassKarte => Boolean(k)),
    [blatt, system]
  );

  if (plaetze.every((p) => !p.slug) && handkarten.length === 0) return null;

  const rolle = rollen(sicht);
  const trumpfBild = trumpf ? farbAnzeige(trumpf, system) : null;

  const platzBild = (p: SitzBild) => {
    const karte = p.slug ? karteAusSlug(p.slug, system) : null;

    const platz = karte ? (
      <button
        type="button"
        onClick={() => setGross(karte)}
        aria-label={`${karte.name}, als ${p.nummer}. gelegt — ${rolle[p.sitz]}. Vergrössern`}
        className="jw-tisch-karte"
        data-sitz={p.sitz}
      >
        <img
          src={karte.image}
          alt={karte.alt}
          title={karte.name}
          width={120}
          height={180}
          loading="lazy"
          className="jw-tisch-karte-bild"
        />
        <span className="jw-tisch-nr" aria-hidden>
          {p.nummer}
        </span>
      </button>
    ) : (
      <div className={`jw-tisch-leer${p.amZug ? ' jw-tisch-leer--zug' : ''}`} data-sitz={p.sitz}>
        {p.amZug || p.luecke ? (
          <span className="jw-tisch-nr jw-tisch-nr--offen" aria-hidden>
            {p.nummer}
          </span>
        ) : null}
      </div>
    );

    const notiz = p.notiz ?? (p.amZug ? 'ist am Zug' : p.luecke ? 'hat gelegt' : undefined);

    return (
      <div key={p.sitz} className={`jw-tisch-sitz jw-tisch-sitz--${p.sitz}`}>
        <span
          className={`jw-tisch-name ${
            p.sitz === 'ich'
              ? 'jw-tisch-name--sicht'
              : p.sitz === 'partner'
                ? 'jw-tisch-name--wir'
                : 'jw-tisch-name--sie'
          }`}
        >
          {rolle[p.sitz]}
        </span>
        {platz}
        {notiz ? <span className="jw-tisch-notiz">{notiz}</span> : null}
      </div>
    );
  };

  return (
    <figure className="jw-tisch not-prose">
      <div className="jw-karten-kopf">
        <span className="jw-karten-marke">Jasstisch</span>
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

      <div className="jw-tisch-filz">
        <div className="jw-tisch-rand">
          {titel ? <span className="jw-tisch-titel">{titel}</span> : <span />}
          {trumpfBild ? (
            <span className="jw-tisch-trumpf">
              <img src={trumpfBild.bild} alt="" aria-hidden width={18} height={18} />
              <span className="jw-tisch-trumpf-wort">
                Trumpf <strong>{trumpfBild.name}</strong>
              </span>
            </span>
          ) : null}
        </div>
        {plaetze.map(platzBild)}
      </div>

      {handkarten.length > 0 && (
        <div className="jw-tisch-blatt">
          {handkarten.map((karte, i) => (
            <button
              key={`${karte.slug}-${i}`}
              type="button"
              onClick={() => setGross(karte)}
              aria-label={`${karte.name} vergrössern`}
              className="jw-karte"
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
      )}

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
