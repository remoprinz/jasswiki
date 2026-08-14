// Die Kartensystem-Wahl des Lesers: Deutschschweizer oder französische Karten.
// Vorgabe ist 'de'. Die Wahl gilt für alle Kartenreihen einer Seite gleichzeitig
// und überlebt den Seitenwechsel im Speicher des Browsers.
//
// Bewusst ein winziger Modul-Speicher statt eines React-Context: der Artikeltext
// wird an vielen Stellen gerendert (InternalLinker), ein Provider müsste in jede
// Seite eingehängt werden. Server und erster Client-Render liefern beide 'de';
// die gespeicherte Wahl wird erst nach dem Einhängen übernommen — so entsteht
// kein Unterschied zwischen Server-HTML und erstem Render.

import { useSyncExternalStore } from 'react';
import type { System } from './jasskarten';

const SPEICHER_SCHLUESSEL = 'jw-kartensystem';

let aktuell: System = 'de';
let ausSpeicherGeholt = false;
const hoerer = new Set<() => void>();

function melden() {
  hoerer.forEach((f) => f());
}

/** Holt die gespeicherte Wahl einmalig nach dem Einhängen (Client). */
export function kartensystemAusSpeicherHolen(): void {
  if (ausSpeicherGeholt || typeof window === 'undefined') return;
  ausSpeicherGeholt = true;
  try {
    const gespeichert = window.localStorage.getItem(SPEICHER_SCHLUESSEL);
    if (gespeichert === 'de' || gespeichert === 'fr') {
      if (gespeichert !== aktuell) {
        aktuell = gespeichert;
        melden();
      }
    }
  } catch {
    /* privater Modus ohne Speicher: Vorgabe bleibt */
  }
}

export function kartensystemSetzen(system: System): void {
  if (system === aktuell) return;
  aktuell = system;
  try {
    window.localStorage.setItem(SPEICHER_SCHLUESSEL, system);
  } catch {
    /* Wahl gilt dann nur für diese Sitzung */
  }
  melden();
}

function anmelden(f: () => void): () => void {
  hoerer.add(f);
  return () => hoerer.delete(f);
}

export function useKartensystem(): System {
  return useSyncExternalStore(
    anmelden,
    () => aktuell,
    () => 'de'
  );
}
