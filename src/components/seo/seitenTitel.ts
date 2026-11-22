/**
 * Seitentitel aus Thema und Zusatz (SCHIRI 22.11.2026): «Thema: Zusatz | Jass-Wiki».
 * Endet das Thema auf «?» oder «!», steht es allein: «Woher kommt das Wort Jass? | Jass-Wiki».
 */
export const endetMitZeichen = (thema: string): boolean => /[?!]\s*$/.test(thema);

export const seitenTitel = (thema: string, zusatz: string): string =>
  endetMitZeichen(thema) ? `${thema} | Jass-Wiki` : `${thema}: ${zusatz} | Jass-Wiki`;

/** Thema vor einem Satz der Beschreibung: «Thema: Satz», nach «?» oder «!» ein Leerschlag. */
export const themaVorSatz = (thema: string, satz: string): string =>
  endetMitZeichen(thema) ? `${thema} ${satz}` : `${thema}: ${satz}`;
