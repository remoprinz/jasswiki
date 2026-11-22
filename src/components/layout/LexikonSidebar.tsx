import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ChevronRight } from 'lucide-react';
import { artikelAdresse } from '@/lib/url-utils';
import { artikel, einstieg, rubriken, type GEintrag } from '@/lib/gliederung';

/* ---------------------------------------------------------------------------
   SEITENNAVIGATION (Jens, Bauhütte 203, 30.10.2026)

   Ein Baum aus drei Ebenen: Hauptbereich › Unterbereich › Seite. Verhalten:
   - Offen ist allein der Hauptbereich der aktuellen Seite, mit seinem Pfad bis
     zur Seite. Wer direkt kommt oder neu lädt, sieht diesen Pfad schon offen:
     Der Zustand entsteht aus dem Pfad, also schon im statischen HTML.
   - Der Text öffnet die Seite, der Pfeil rechts ist ein eigener Knopf
     (aria-expanded) und klappt nur. Öffnet er einen Hauptbereich, schliessen
     sich die anderen: Es bleibt ein Bereich offen.
   - Die aktive Seite trägt aria-current="page", ihre Eltern stehen fett.
   Die Farben stehen als feste Töne in globals.css (.jw-nav-*), ohne Deckkraft
   auf dem Text.
   --------------------------------------------------------------------------- */

interface Knoten {
  key: string;
  name: string;
  href: string;
  ebene: 1 | 2 | 3;
  kinder: Knoten[];
}


const META_SEITEN = [
  { name: 'Referenzen und Quellen', href: '/referenzen/' },
  { name: 'Taxonomie des Jassens', href: '/taxonomie/' },
];

/**
 * Der Baum folgt src/data/gliederung.json (Schritt 3, 22.11.2026): Einstieg,
 * dann die Rubriken in ihrer Reihenfolge, darin lose Artikel und Kapitel in
 * ihrer Reihenfolge. Ein Verweis steht als Seite im Baum und führt zum Artikel
 * an seinem eigenen Ort; die Kette der Seite findet zuerst diesen Ort.
 */
const blatt = (e: GEintrag, ebene: 2 | 3, eltern: string): Knoten[] => {
  const a = artikel(e.id);
  if (!a) return [];
  const href = artikelAdresse(a);
  return [{ key: e.art === 'verweis' ? `${eltern}>${href}` : href, name: a.metadata.category.topic, href, ebene, kinder: [] }];
};

const baumBauen = (): Knoten[] => {
  const baum: Knoten[] = [
    { key: '/jassen/', name: 'Jassen', href: '/jassen/', ebene: 1, kinder: [] },
    { key: einstieg.adresse, name: einstieg.name, href: einstieg.adresse, ebene: 1, kinder: [] },
  ];
  rubriken.forEach((r) => {
    const kinder: Knoten[] = r.teile.flatMap((t) =>
      t.art === 'eintrag'
        ? blatt(t.eintrag, 2, r.adresse)
        : [
            {
              key: t.kapitel.href,
              name: t.kapitel.name,
              href: t.kapitel.href,
              ebene: 2 as const,
              kinder: t.kapitel.eintraege.flatMap((e) => blatt(e, 3, t.kapitel.href)),
            },
          ],
    );
    if (r.darstellung === 'alphabet') kinder.sort((a, b) => a.name.localeCompare(b.name, 'de'));
    baum.push({ key: r.adresse, name: r.name, href: r.adresse, ebene: 1, kinder });
  });
  return baum;
};

let baumEinmal: Knoten[] | null = null;
const derBaum = (): Knoten[] => {
  baumEinmal ??= baumBauen();
  return baumEinmal;
};

/** Die Hauptbereiche in der Reihenfolge der Leiste, auch für den Kopf. */
export const hauptbereiche = (): { name: string; href: string }[] =>
  derBaum().map(({ name, href }) => ({ name, href }));

/** Pfad ohne Abfrage und Sprungziel, immer mit Schrägstrich am Ende. */
export const pfadVon = (asPath: string): string => {
  const roh = asPath.split(/[?#]/)[0] || '/';
  return roh.endsWith('/') ? roh : `${roh}/`;
};

/**
 * Die Kette vom Hauptbereich bis zur Seite. Trifft kein Knoten genau, gilt der
 * tiefste, dessen Adresse den Pfad beginnt (etwa ein Hauptbereich mit eigener
 * Unterseite, die nicht im Baum steht): Er öffnet sich, ist aber nicht aktiv.
 */
const ketteZu = (baum: Knoten[], pfad: string): { kette: Knoten[]; genau: boolean } => {
  let beste: Knoten[] = [];
  const gehen = (knoten: Knoten[], bisher: Knoten[]): Knoten[] | null => {
    for (const k of knoten) {
      const kette = [...bisher, k];
      if (k.href === pfad) return kette;
      if (pfad.startsWith(k.href) && kette.length > beste.length) beste = kette;
      const tiefer = gehen(k.kinder, kette);
      if (tiefer) return tiefer;
    }
    return null;
  };
  const genau = gehen(baum, []);
  return genau ? { kette: genau, genau: true } : { kette: beste, genau: false };
};

/** Hauptbereich einer Seite nach der Gliederung (für den Themen-Knopf im Kopf). */
export const bereichFuer = (pfad: string): { name: string; href: string } | undefined => {
  const erster = ketteZu(derBaum(), pfad).kette[0];
  return erster ? { name: erster.name, href: erster.href } : undefined;
};

const offenAus = (kette: Knoten[]): Set<string> =>
  new Set(kette.filter((k) => k.kinder.length > 0).map((k) => k.key));

const Pfeil: React.FC<{ offen: boolean; name: string; ziel: string; onClick: () => void }> = ({
  offen,
  name,
  ziel,
  onClick,
}) => (
  <button
    type="button"
    className="jw-nav-pfeil"
    aria-expanded={offen}
    aria-controls={ziel}
    aria-label={offen ? `${name} zuklappen` : `${name} aufklappen`}
    onClick={onClick}
  >
    <ChevronRight aria-hidden className="jw-nav-pfeil-zeichen" width={14} height={14} strokeWidth={2} />
  </button>
);

/** Zeile ohne Unterseiten: Das Zeichen zeigt den Weg, geklickt wird der Text (Figma 2299:3375). */
const Wegweiser = () => (
  <span className="jw-nav-wegweiser" aria-hidden>
    <ChevronRight width={14} height={14} strokeWidth={2} />
  </span>
);

const idVon = (key: string) => `nav${key.replace(/[^a-z0-9]+/gi, '-')}`.replace(/-$/, '');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LexikonSidebar = (_props: { telefon?: boolean }) => {
  const router = useRouter();
  const baum = derBaum();
  const pfad = pfadVon(router.asPath);
  const { kette, genau } = useMemo(() => ketteZu(baum, pfad), [baum, pfad]);
  const aktivKey = genau ? kette[kette.length - 1]?.key : undefined;
  const imPfad = useMemo(() => new Set(kette.map((k) => k.key)), [kette]);

  // Der offene Zustand folgt dem Pfad: Bei jedem Seitenwechsel steht wieder
  // allein der Pfad der neuen Seite offen. Gesetzt während des Renderns, damit
  // kein Bild mit dem alten Baum dazwischen steht.
  const [offen, setOffen] = useState<Set<string>>(() => offenAus(kette));
  const [offenFuer, setOffenFuer] = useState(pfad);
  if (offenFuer !== pfad) {
    setOffenFuer(pfad);
    setOffen(offenAus(kette));
  }

  const umschalten = (k: Knoten) => {
    setOffen((alt) => {
      const neu = new Set(alt);
      if (neu.has(k.key)) {
        neu.delete(k.key);
        return neu;
      }
      if (k.ebene === 1) {
        // Ein Hauptbereich bleibt offen: die anderen schliessen.
        baum.forEach((b) => b.key !== k.key && neu.delete(b.key));
      }
      neu.add(k.key);
      return neu;
    });
  };

  const verweis = (k: Knoten, klasse: string) => {
    const aktiv = k.key === aktivKey;
    const eltern = !aktiv && imPfad.has(k.key);
    return (
      <Link
        href={k.href}
        className={`${klasse}${aktiv ? ' ist-aktiv' : ''}${eltern ? ' ist-eltern' : ''}`}
        aria-current={aktiv ? 'page' : undefined}
      >
        {k.name}
      </Link>
    );
  };

  const zweig = (k: Knoten): React.ReactNode => {
    const hatKinder = k.kinder.length > 0;
    const istOffen = hatKinder && offen.has(k.key);
    const ziel = idVon(k.key);

    if (k.ebene === 1) {
      return (
        <li key={k.key} className={`jw-nav-bereich${istOffen ? ' ist-offen' : ''}`}>
          <div className={`jw-nav-zeile${k.key === aktivKey ? ' ist-aktiv' : ''}`}>
            {verweis(k, 'jw-nav-haupt')}
            {hatKinder ? <Pfeil offen={istOffen} name={k.name} ziel={ziel} onClick={() => umschalten(k)} /> : <Wegweiser />}
          </div>
          {istOffen && (
            <ul id={ziel} className="jw-nav-liste2">
              {k.kinder.map(zweig)}
            </ul>
          )}
        </li>
      );
    }

    if (k.ebene === 2) {
      return (
        <li key={k.key}>
          <div className={`jw-nav-zeile${k.key === aktivKey ? ' ist-aktiv' : ''}`}>
            {verweis(k, 'jw-nav-unter')}
            {hatKinder ? <Pfeil offen={istOffen} name={k.name} ziel={ziel} onClick={() => umschalten(k)} /> : <Wegweiser />}
          </div>
          {istOffen && (
            <ul id={ziel} className="jw-nav-liste3">
              {k.kinder.map(zweig)}
            </ul>
          )}
        </li>
      );
    }

    return <li key={k.key}>{verweis(k, 'jw-nav-seite')}</li>;
  };

  return (
    <nav className="jw-nav" aria-label="Themen">
      <p className="jw-nav-titel">Themen</p>
      <ul className="jw-nav-liste1">{baum.map(zweig)}</ul>
      <ul className="jw-nav-meta">
        {META_SEITEN.map((m) => {
          const aktiv = pfad === m.href;
          return (
            <li key={m.href}>
              <Link
                href={m.href}
                className={`jw-nav-meta-link${aktiv ? ' ist-aktiv' : ''}`}
                aria-current={aktiv ? 'page' : undefined}
              >
                {m.name}
              </Link>
            </li>
          );
        })}
        {/* Telefon: «Online jassen» steht seit 07.11.2026 fest über der Liste (LexikonLayout). */}
      </ul>
    </nav>
  );
};
