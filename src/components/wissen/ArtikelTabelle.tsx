import React, { useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  /** Anzahl Spalten – bestimmt die Mindestbreite auf schmalen Geräten. */
  spalten: number;
  children: React.ReactNode;
}

/**
 * Rahmen um eine Artikeltabelle.
 *
 * Auf schmalen Geräten bekommt die Tabelle eine Mindestbreite je Spalte und
 * rollt innerhalb ihres eigenen Rahmens waagrecht; die Seite selbst steht still.
 * Ist die Tabelle breiter als der Rahmen, zeigt eine Kante rechts, dass dort
 * weitergeht — sie verschwindet am Ende des Wegs.
 */
export const ArtikelTabelle: React.FC<Props> = ({ spalten, children }) => {
  const rahmen = useRef<HTMLDivElement>(null);
  const [rollt, setRollt] = useState(false);
  const [rechtsWeiter, setRechtsWeiter] = useState(false);
  const [linksWeiter, setLinksWeiter] = useState(false);

  const messen = useCallback(() => {
    const el = rahmen.current;
    if (!el) return;
    const kannRollen = el.scrollWidth > el.clientWidth + 1;
    setRollt(kannRollen);
    setRechtsWeiter(kannRollen && el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    setLinksWeiter(kannRollen && el.scrollLeft > 2);
  }, []);

  useEffect(() => {
    const el = rahmen.current;
    if (!el) return;
    messen();
    const beobachter = new ResizeObserver(messen);
    beobachter.observe(el);
    el.addEventListener('scroll', messen, { passive: true });
    return () => {
      beobachter.disconnect();
      el.removeEventListener('scroll', messen);
    };
  }, [messen]);

  return (
    <div
      className="jw-table-outer"
      data-rollt={rechtsWeiter ? 'true' : 'false'}
      data-rollt-links={linksWeiter ? 'true' : 'false'}
    >
      <div
        ref={rahmen}
        className="jw-table-wrap"
        tabIndex={rollt ? 0 : undefined}
        role={rollt ? 'region' : undefined}
        aria-label={rollt ? 'Tabelle, seitlich rollbar' : undefined}
      >
        <table
          className="jw-table"
          style={{ ['--jw-cols' as string]: String(spalten) } as React.CSSProperties}
        >
          {children}
        </table>
      </div>
    </div>
  );
};
