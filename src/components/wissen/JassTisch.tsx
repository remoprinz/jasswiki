import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  blattOrdnen,
  farbAnzeige,
  karteAusSlug,
  type FarbCode,
  type JassKarte,
} from './jasskarten';
import { KartenLightbox } from './KartenLightbox';
import {
  schirmPlatz,
  sitzeOrdnen,
  type Sicht,
  type SitzBild,
  type SitzWort,
  type TischSitz,
} from './tischMarke';
import {
  kartensystemAusSpeicherHolen,
  kartensystemSetzen,
  useKartensystem,
} from './kartensystem';

const JASSKARTEN_URL = '/grundlagen-kultur/jasskarten/';

/**
 * Der Jasstisch im Artikeltext: vier Plätze, der gelegte Stich, darunter das
 * Blatt dessen, der erzählt. Gesetzt wird er im Inhalt über die Marke
 * [[tisch: …]].
 *
 * Warum ein Tisch und keine Reihe: Eine Kartenreihe zeigt vier Karten, aber
 * niemandem gehört eine davon. Erst der Platz sagt, wer sie gelegt hat — und
 * genau daraus rechnet der Leser beim Hoch-tief, wo die übrigen Trümpfe liegen.
 *
 * Quadratischer Filz wie in der Arena (Remo, 19.08.2026): die Trumpfansage
 * steht oben am Rand, die Mitte gehört den vier Karten. Nüchtern bleibt der
 * Tisch dabei — er zeigt, was liegt, und deutet nichts.
 *
 * Drei Dinge liest das Bild von selbst ab, damit sie nie falsch stehen können:
 * die Reihenfolge im Stich (gegen den Uhrzeigersinn ab dem Ausspiel), der Platz,
 * der als nächster legt, und die Ordnung der Handkarten — tiefste Karte links,
 * höchste rechts (Remo, 20.08.2026, regelauskunft/KARTENBILD.md). Die vier
 * Karten IM Stich bleiben davon unberührt: sie stehen auf ihren Plätzen.
 *
 * PERSPEKTIVE (Remo, 19.08.2026: «aus welcher perspektive?»): Die Sitze stehen
 * im Text immer am Ansager. `sicht` dreht den Filz auf die erzählende Seite, statt
 * die Sitze umzudeuten — derselbe Stich aus zwei Blickwinkeln zeigt darum
 * zwingend dieselben Karten. Wer erzählt, steht als Wort über dem Filz und sitzt
 * unten, sein Blatt liegt direkt darunter — beschriftet mit «Mein Blatt», damit
 * der Kasten als Hand nach dem Ausspielen gelesen wird (KELLE, 23.08.2026).
 *
 * EINE KARTE IM BLATT TRITT HERVOR, wenn die Marke sie mit einem Ausrufezeichen
 * nennt («blatt eichel-6!, …»): Sie steigt aus der Hand und trägt Ring und
 * Schein, so wie die angetippte Karte in der Arena. Gemeint ist die Karte, die
 * gespielt werden soll — im Hoch-tief der tiefste Trumpf des Partners
 * (Remo, 23.08.2026).
 *
 * Kartenbilder: schweizerjass.ch (Jens Riedweg). Farbzeichen: JassGuru-Set.
 */

interface Props {
  /** Gelegte Karten; der erste Eintrag hat ausgespielt. */
  sitze: TischSitz[];
  trumpf?: FarbCode;
  /** Wer unten sitzt — aus seinen Augen ist die Lage erzählt. */
  sicht?: Sicht;
  /** Aufschrift links oben auf dem Filz, z. B. «1. Stich». */
  titel?: string;
  /** Platz, der als Nächstes legt — sonst rechnet der Tisch ihn aus. */
  zug?: SitzWort;
  /** Das Blatt dessen, der unten sitzt. */
  blatt?: string[];
  /**
   * Karten des Blatts, die hervortreten — in der Marke «eichel-9!». Gemeint ist
   * die Karte, um die es geht: im Hoch-tief der tiefste Trumpf, den der Partner
   * legen soll. Sie hebt sich aus der Hand wie die angetippte Karte in der
   * Arena (Remo, 23.08.2026).
   */
  blattHervor?: string[];
  /**
   * Aufschrift über dem Blatt, aus der Marke («blatt-aufschrift …»).
   * Vorgabe: «Mein Blatt» — dasselbe Wort tragen die Kartenreihen daneben.
   */
  blattAufschrift?: string;
  beschriftung?: string;
  /** Umschalter Deutsch/Französisch — einmal je Seite, beim ersten Kartenblock. */
  mitWahl?: boolean;
  /** Sprungziel der Abbildung, gebildet aus der Aufschrift (InternalLinker). */
  anker?: string;
}

/** Aufschrift über dem Blatt unter dem Filz, wenn die Marke keine nennt. */
const BLATT_AUFSCHRIFT = 'Mein Blatt';

/** Rollen der vier Plätze. Sie hängen am Sitz, nicht am Blickwinkel. */
const ROLLE: Record<SitzWort, string> = {
  ansager: 'Ansager',
  partner: 'Partner',
  links: 'Gegner',
  rechts: 'Gegner',
};

const SICHT_WORT: Record<Sicht, string> = {
  ansager: 'Sicht des Ansagers',
  partner: 'Sicht des Partners',
};

export const JassTisch: React.FC<Props> = ({
  sitze,
  trumpf,
  sicht = 'ansager',
  titel,
  zug,
  blatt,
  blattHervor,
  blattAufschrift,
  beschriftung,
  mitWahl = true,
  anker,
}) => {
  const system = useKartensystem();
  const [gross, setGross] = useState<JassKarte | null>(null);

  useEffect(() => {
    kartensystemAusSpeicherHolen();
  }, []);

  const plaetze: SitzBild[] = useMemo(() => sitzeOrdnen(sitze, zug), [sitze, zug]);

  // Die Hand liegt in der Ordnung des Blatts: tiefste Karte links, höchste
  // rechts, Trumpffarbe voran. Der Tisch sortiert selbst — eine Hand kann damit
  // gar nicht in der Ordnung eines Stichs erscheinen.
  // Die Hervorhebung hängt am geschriebenen Slug, die Karte am gewählten
  // System — darum reisen beide zusammen. Über den Platz in der Hand liesse
  // sie sich nicht finden: der Tisch ordnet das Blatt selbst.
  const handkarten = useMemo(() => {
    const markiert = new Set(blattHervor ?? []);
    return blattOrdnen(blatt ?? [], trumpf)
      .map((s) => ({ karte: karteAusSlug(s, system), hervor: markiert.has(s) }))
      .filter((e): e is { karte: JassKarte; hervor: boolean } => Boolean(e.karte));
  }, [blatt, blattHervor, trumpf, system]);

  if (plaetze.every((p) => !p.slug) && handkarten.length === 0) return null;

  const hebtHand = handkarten.some((k) => k.hervor);

  const trumpfBild = trumpf ? farbAnzeige(trumpf, system) : null;
  const erzaehler: SitzWort = sicht === 'partner' ? 'partner' : 'ansager';
  const mitspieler: SitzWort = sicht === 'partner' ? 'ansager' : 'partner';

  const platzBild = (p: SitzBild) => {
    const karte = p.slug ? karteAusSlug(p.slug, system) : null;
    const platzWort = schirmPlatz(p.sitz, sicht);

    const notiz = p.notiz ?? (p.amZug ? 'ist am Zug' : p.luecke ? 'hat gelegt' : undefined);

    // Ein leerer Platz trägt seine Bemerkung IM Umriss: dort ist Raum, während
    // die Mitte des Filzes den Nummern der gelegten Karten gehört (gemessen
    // 20.08.2026 — «ist am Zug» lag zuvor auf der Nummer des Ausspiels).
    const platz = karte ? (
      <button
        type="button"
        onClick={() => setGross(karte)}
        aria-label={`${karte.name}, als ${p.nummer}. gelegt — ${ROLLE[p.sitz]}. Vergrössern`}
        className="jw-tisch-karte"
        data-platz={platzWort}
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
      <div className={`jw-tisch-leer${p.amZug ? ' jw-tisch-leer--zug' : ''}`}>
        {p.amZug || p.luecke ? (
          <span className="jw-tisch-nr jw-tisch-nr--offen" aria-hidden>
            {p.nummer}
          </span>
        ) : null}
        {notiz ? <span className="jw-tisch-notiz jw-tisch-notiz--innen">{notiz}</span> : null}
      </div>
    );

    return (
      <div key={p.sitz} className={`jw-tisch-sitz jw-tisch-sitz--${platzWort}`}>
        <span
          className={`jw-tisch-name ${
            p.sitz === erzaehler
              ? 'jw-tisch-name--sicht'
              : p.sitz === mitspieler
                ? 'jw-tisch-name--wir'
                : 'jw-tisch-name--sie'
          }`}
        >
          {ROLLE[p.sitz]}
        </span>
        {platz}
        {karte && notiz ? <span className="jw-tisch-notiz">{notiz}</span> : null}
      </div>
    );
  };

  return (
    <figure
      className={`jw-tisch not-prose scroll-mt-24${hebtHand ? ' jw-tisch--hebt' : ''}`}
      id={anker}
      aria-labelledby={anker ? `${anker}-marke` : undefined}
    >
      <div className="jw-karten-kopf">
        <span className="jw-tisch-kopf-links">
          <span className="jw-karten-marke" id={anker ? `${anker}-marke` : undefined}>
            Jasstisch
          </span>
          <span className="jw-tisch-sicht">{SICHT_WORT[sicht]}</span>
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
          <span className="jw-karten-marke jw-tisch-blatt-marke">
            {blattAufschrift?.trim() || BLATT_AUFSCHRIFT}
          </span>
          {handkarten.map(({ karte, hervor: trittHervor }, i) => (
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
