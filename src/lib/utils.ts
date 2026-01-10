import {clsx, type ClassValue} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Converts a string to a URL-friendly slug.
 * @param str The string to convert.
 * @returns The slugified string.
 */
export const toSlug = (str: string): string => {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/à|á|â|ã|å|è|é|ê|ë|ì|í|î|ï|ò|ó|ô|õ|ù|ú|û|ü|ý|ÿ/g, (match) => {
      // Französische und andere Akzente zu Basis-Buchstaben
      const map: Record<string, string> = {
        'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'å': 'a',
        'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e',
        'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i',
        'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o',
        'ù': 'u', 'ú': 'u', 'û': 'u',
        'ý': 'y', 'ÿ': 'y'
      };
      return map[match] || match;
    })
    .replace(/[^a-z0-9_]+/g, '-')
    .replace(/(^-|-$)+/g, '');
};

