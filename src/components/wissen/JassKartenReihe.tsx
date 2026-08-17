import React, { useEffect, useMemo, useState } from 'react';
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

interface Props {
  /** Karten-Slugs aus der Marke, z. B. ['eichel-under', 'eichel-ass']. */
  slugs: string[];
  /** Beschriftung unter der Reihe (optional). */
  beschriftung?: string;
  /**
   * Zeigt den Umschalter Deutsch/Französisch über der Reihe. Der Renderer
   * setzt ihn nur bei der ersten Kartenreihe eines Artikels (Remo, 17.08.2026);
   * die Wahl gilt für alle Reihen der Seite.
   */
  mitWahl?: boolean;
}

/**
 * Eine Reihe echter Jasskarten im Artikeltext.
 * Gesetzt wird sie im Inhalt über die Marke [[karten: slug, slug | Beschriftung]];
 * der Renderer (InternalLinker) löst sie auf. Das Kartensystem folgt der Wahl
 * des Lesers, Vorgabe ist das Deutschschweizer Blatt.
 *
 * Kartenbilder: schweizerjass.ch (Jens Riedweg).
 */
export const JassKartenReihe: React.FC<Props> = ({ slugs, beschriftung, mitWahl = true }) => {
  const system = useKartensystem();
  const [gross, setGross] = useState<JassKarte | null>(null);

  useEffect(() => {
    kartensystemAusSpeicherHolen();
  }, []);

  const karten = useMemo(
    () => slugs.map((s) => karteAusSlug(s, system)).filter((k): k is JassKarte => Boolean(k)),
    [slugs, system]
  );

  if (karten.length === 0) return null;

  return (
    <figure className="jw-karten-reihe not-prose">
      <div className="jw-karten-kopf">
        <span className="jw-karten-marke">Jasskarten</span>
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

      <div
        className={
          karten.length >= VOLLES_BLATT_AB ? 'jw-karten-band jw-karten-band--voll' : 'jw-karten-band'
        }
        data-karten={karten.length}
      >
        {karten.map((karte, i) => (
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
