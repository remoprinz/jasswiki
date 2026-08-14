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

interface Props {
  /** Karten-Slugs aus der Marke, z. B. ['eichel-under', 'eichel-ass']. */
  slugs: string[];
  /** Beschriftung unter der Reihe (optional). */
  beschriftung?: string;
}

/**
 * Eine Reihe echter Jasskarten im Artikeltext.
 * Gesetzt wird sie im Inhalt über die Marke [[karten: slug, slug | Beschriftung]];
 * der Renderer (InternalLinker) löst sie auf. Das Kartensystem folgt der Wahl
 * des Lesers, Vorgabe ist das Deutschschweizer Blatt.
 *
 * Kartenbilder: schweizerjass.ch (Jens Riedweg).
 */
export const JassKartenReihe: React.FC<Props> = ({ slugs, beschriftung }) => {
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
      </div>

      <div className="jw-karten-band">
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
