/**
 * DER SEITENPRÜFER — Riegel an der fertigen Seite (A1, 22.11.2026)
 *
 * Der Sprachwächter liest die Inhaltsdatei. Was der Leser wirklich sieht, entsteht
 * aber erst im Bau: Vorlagen, Übersichten, aufgelöste Verweise, Medien. Und was
 * Google und die Sprachmodelle lesen (Korpus, llms-Dateien, JSON-LD), entsteht in
 * eigenen Skripten daneben. Von 31 belegten Fehlern seit August fand kein Riegel
 * einen als Erster: «Siehe auch» zeigte 273 von 894 Mal ein anderes Ziel, Legenden
 * fielen still weg, «Verifiziert durch das BAK» stand zwei Monate im Korpus, vier
 * Videos waren tot, Gedankenstriche standen auf der Startseite.
 *
 * Darum liest dieses Skript nach `next build` den Ordner `out/` und prüft die Seite
 * so, wie sie hinausgeht:
 *
 *   A  Sichtbarer Text   A1 Gedankenstrich (auch « - » zwischen Wörtern) · A2 Fremdwort
 *                        und Wendung · A3 rohe Marke. Gelesen werden Seitentext,
 *                        Seitentitel, meta description, aria-label, alt und title.
 *   B  Verweise          B1 interner Link ins Leere · B2 «Siehe auch» gegen see_also
 *   C  Medien            C1 lokale Datei fehlt · C2 fremde Adresse antwortet nicht
 *   D  Nebenkanäle       gesperrte Behauptung in Korpus, llms-Dateien, JSON-LD, Text
 *
 * SPERRKLINKE wie beim Sprachwächter: Der Bestand steht in
 * `pruefe-seite-altlasten.json` und ist eingefroren. JEDER NEUE Fund hält den Bau an.
 * Gezählt wird je Seite, Prüfung und Fundwort: Ein vierter Gedankenstrich auf einer
 * Seite mit drei eingefrorenen ist neu, ein umformulierter Nachbarsatz ist es nicht.
 * Die Liste schrumpft und wächst nie.
 *
 *   node pruefe-seite.mjs                 prüfen (Exit 1 bei neuem Fund)
 *   node pruefe-seite.mjs --ohne-netz     ohne Abruf fremder Medien (C2 ruht)
 *   node pruefe-seite.mjs --netz-hart     ein neuer C2-Fund hält an (sonst meldet C2 nur)
 *   node pruefe-seite.mjs --alle          jeden Fund zeigen, auch die eingefrorenen
 *   node pruefe-seite.mjs --altlast-neu   Bestand neu einfrieren, nach getaner Säuberung
 */

import { readFile, writeFile, readdir } from 'fs/promises';
import { existsSync, statSync } from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { FREMDWOERTER, WENDUNGEN } from './sprachlisten.mjs';

const WURZEL = path.dirname(fileURLToPath(import.meta.url));

// --- D: gesperrte Behauptungen ------------------------------------------------
// Diese Liste führt SCHIRI. Jede Zeile ist eine Aussage, die jasswiki über sich
// selbst nicht macht. Verglichen wird ohne Rücksicht auf Gross- und Kleinschreibung.
export const GESPERRTE_BEHAUPTUNGEN = [
  'offiziell anerkannt',
  'government-verified',
  'verifiziert durch',
  'staatlich anerkannt',
];

// --- A1: Gedankenstrich auf der Seite ------------------------------------------
// Dieselbe Regel wie im Sprachwächter (sprachlisten.mjs): der Geviertstrich immer,
// der Halbgeviertstrich, wenn er als Gedankenstrich steht. Auf der Seite zählt dazu
// auch der Strich am Zeilenanfang oder -ende, wo der Bau das Leerzeichen schluckt.
// «1940–1945» bleibt erlaubt.
const GEDANKENSTRICH_SEITE = /—|(?<=^|\s)–(?=\s|$)/gm;

// Der Bindestrich mit Leerraum rundum zwischen zwei Wörtern steht für einen
// Gedankenstrich (SCHIRI, 22.11.2026): «Jasswiki - Nell». Erlaubt bleiben der
// Zahlenbereich «1 - 3» und das Aufzählungszeichen am Zeilenanfang «- Punkt».
const BINDESTRICH_ALS_STRICH = /(?<=\S) - (?=\S)/g;

/** Alle Gedankenstriche eines Textes, als Treffer mit index und wort. */
export const gedankenstriche = (text) => {
  const treffer = alleTreffer(text, GEDANKENSTRICH_SEITE).map((m) => ({ index: m.index, laenge: m[0].length, wort: `«${m[0]}»` }));
  for (const m of alleTreffer(text, BINDESTRICH_ALS_STRICH)) {
    const vor = text[m.index - 1];
    const nach = text[m.index + m[0].length];
    if (/\d/.test(vor) && /\d/.test(nach)) continue; // Zahlenbereich
    treffer.push({ index: m.index, laenge: m[0].length, wort: '« - »' });
  }
  return treffer.sort((a, b) => a.index - b.index);
};

// --- A: Quellen des sichtbaren Textes ------------------------------------------
// Ausser dem Seitentext liest der Leser (und der Vorleser, und die Suchmaschine)
// den Seitentitel, die Beschreibung und die Attribute aria-label, alt und title.
const TEXT_ATTRIBUTE = ['aria-label', 'alt', 'title'];

// --- A3: rohe Marken ------------------------------------------------------------
// Was der Renderer hätte auflösen sollen und als Text stehen liess.
const ROHE_MARKEN = ['[[', '(siehe Begriff', '](/', '(ID:'];

const PRUEFUNG = {
  A1: 'A1 Gedankenstrich',
  A2W: 'A2 Fremdwort',
  A2F: 'A2 Wendung',
  A3: 'A3 rohe Marke',
  B1: 'B1 Verweis ins Leere',
  B2: 'B2 Siehe auch',
  C1: 'C1 Medium fehlt',
  C2: 'C2 Medium antwortet nicht',
  D: 'D gesperrte Behauptung',
};

const BLOCK_TAGS = new Set([
  'address', 'article', 'aside', 'blockquote', 'br', 'button', 'caption', 'dd', 'details',
  'dialog', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer', 'form',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'li', 'main', 'nav', 'ol', 'option',
  'p', 'pre', 'section', 'summary', 'table', 'tbody', 'td', 'tfoot', 'th', 'thead',
  'title', 'tr', 'ul', 'body', 'head', 'html', 'label', 'select', 'textarea',
]);

const ENTITAETEN = {
  amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', shy: '',
  mdash: '—', ndash: '–', hellip: '…', laquo: '«', raquo: '»', rsquo: '’', lsquo: '‘',
  ldquo: '“', rdquo: '”', bdquo: '„', middot: '·', times: '×', copy: '©',
  auml: 'ä', ouml: 'ö', uuml: 'ü', Auml: 'Ä', Ouml: 'Ö', Uuml: 'Ü', szlig: 'ß',
  eacute: 'é', egrave: 'è', agrave: 'à',
};

export const entschluessle = (s) =>
  s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (ganz, e) => {
    if (e[0] === '#') {
      const code = e[1] === 'x' || e[1] === 'X' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : ganz;
    }
    return ENTITAETEN[e] ?? ganz;
  });

/**
 * Entfernt script, style, noscript, template und Kommentare, dazu die TeX-Quelle
 * einer Formel (<annotation> in KaTeX): Sie ist unsichtbar, und ihr « - » ist ein Minus.
 */
const ohneSkripte = (html) =>
  html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style|noscript|template|annotation)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');

/** Der Text, den der Leser sieht: ohne script, style, noscript und JSON-LD. */
export const sichtbarerText = (html) => {
  const roh = ohneSkripte(html).replace(/<\/?([a-zA-Z][a-zA-Z0-9-]*)\b[^>]*>/g, (_, tag) =>
    BLOCK_TAGS.has(tag.toLowerCase()) ? '\n' : '',
  );
  return entschluessle(roh)
    .split('\n')
    .map((z) => z.replace(/[ \t  \r]+/g, ' ').trim())
    .filter(Boolean)
    .join('\n');
};

/**
 * Alle Texte einer Seite, die Prüfung A liest, je mit ihrer Quelle:
 * «Text» (sichtbarer Text ohne Kopf), «Seitentitel», «meta description» und
 * die Attribute aria-label, alt und title.
 */
export const textQuellen = (html) => {
  const ohne = ohneSkripte(html);
  const kopf = /<head\b[^>]*>([\s\S]*?)<\/head\s*>/i.exec(ohne)?.[1] ?? '';
  const rumpf = kopf ? ohne.replace(/<head\b[^>]*>[\s\S]*?<\/head\s*>/i, '') : ohne;
  const quellen = [{ quelle: 'Text', text: sichtbarerText(rumpf) }];
  const titel = /<title\b[^>]*>([\s\S]*?)<\/title\s*>/i.exec(kopf)?.[1];
  if (titel !== undefined) quellen.push({ quelle: 'Seitentitel', text: sichtbarerText(titel) });
  for (const { attr } of tags(kopf, ['meta'])) {
    if ((attr.name || '').toLowerCase() === 'description' && attr.content) {
      quellen.push({ quelle: 'meta description', text: attr.content.replace(/\s+/g, ' ').trim() });
    }
  }
  for (const { tag, attr } of tags(rumpf, ['[a-zA-Z][a-zA-Z0-9-]*'])) {
    for (const name of TEXT_ATTRIBUTE) {
      const wert = attr[name]?.replace(/\s+/g, ' ').trim();
      if (wert) quellen.push({ quelle: `${name} an <${tag}>`, text: wert });
    }
  }
  return quellen;
};

/** Alle Tags eines Namens mit ihren Attributen (ausserhalb von Skripten). */
const tags = (html, namen) => {
  const muster = new RegExp(`<(${namen.join('|')})\\b([^>]*)>`, 'gi');
  const ergebnis = [];
  for (const m of html.matchAll(muster)) {
    const attr = {};
    for (const a of m[2].matchAll(/([a-zA-Z_:][-a-zA-Z0-9_:.]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/g)) {
      attr[a[1].toLowerCase()] = entschluessle(a[3] ?? a[4] ?? a[5] ?? '');
    }
    ergebnis.push({ tag: m[1].toLowerCase(), attr });
  }
  return ergebnis;
};

const jsonLdBloecke = (html) =>
  [...html.matchAll(/<script\b[^>]*type=["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script\s*>/gi)].map(
    (m) => m[1],
  );

/** JSON als Text, mit aufgelösten \u-Folgen, damit die Suche Umlaute trifft. */
const jsonAlsText = (roh) => {
  try {
    return JSON.stringify(JSON.parse(roh));
  } catch {
    return roh;
  }
};

const ausschnitt = (text, index, laenge, rand = 30) => {
  const von = Math.max(0, index - rand);
  const bis = Math.min(text.length, index + laenge + rand);
  return `${von > 0 ? '…' : ''}${text.slice(von, bis).replace(/\s+/g, ' ').trim()}${bis < text.length ? '…' : ''}`;
};

const alleTreffer = (text, muster) => {
  const flags = muster.flags.includes('g') ? muster.flags : `${muster.flags}g`;
  return [...text.matchAll(new RegExp(muster.source, flags))];
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Firebase-Muster (Glob mit ** und *, Platzhalter :name und :name*) als RegExp. */
export const firebaseMuster = (quelle) => {
  let r = '';
  for (let i = 0; i < quelle.length; ) {
    if (quelle.startsWith('**', i)) { r += '.*'; i += 2; continue; }
    if (quelle[i] === '*') { r += '[^/]*'; i += 1; continue; }
    const p = /^:[A-Za-z_][A-Za-z0-9_]*(\*)?/.exec(quelle.slice(i));
    if (p) { r += p[1] ? '.*' : '[^/]+'; i += p[0].length; continue; }
    r += escapeRegex(quelle[i]);
    i += 1;
  }
  return new RegExp(`^${r}$`);
};

const lies = async (datei) => readFile(datei, 'utf-8');

const dateienIn = async (ordner, basis = ordner) => {
  const liste = [];
  for (const e of await readdir(ordner, { withFileTypes: true })) {
    const voll = path.join(ordner, e.name);
    if (e.isDirectory()) liste.push(...(await dateienIn(voll, basis)));
    else liste.push(path.relative(basis, voll).split(path.sep).join('/'));
  }
  return liste;
};

const seitenPfad = (rel) => {
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
};

const SITE = /^https?:\/\/(www\.)?jasswiki\.ch(?=\/|$)/i;

/** Lokale Adresse (Pfad ab Wurzel) oder null, wenn sie fremd ist. */
const lokalerPfad = (url, seite) => {
  if (!url || /^(data|blob|mailto|tel|javascript):/i.test(url)) return null;
  if (url.startsWith('//')) return SITE.test(`https:${url}`) ? url.replace(/^\/\/(www\.)?jasswiki\.ch/i, '') || '/' : null;
  if (SITE.test(url)) return url.replace(SITE, '') || '/';
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return null;
  if (url.startsWith('#') || url.startsWith('?')) return null;
  if (url.startsWith('/')) return url;
  return path.posix.join(seite.endsWith('/') ? seite : path.posix.dirname(seite), url);
};

const fremd = (url) => {
  if (!url) return null;
  if (url.startsWith('//')) url = `https:${url}`;
  if (/^https?:\/\//i.test(url) && !SITE.test(url)) return url;
  return null;
};

const ohneAnker = (p) => {
  const ohne = p.split('#')[0].split('?')[0];
  try {
    return decodeURI(ohne);
  } catch {
    return ohne;
  }
};

/**
 * Der Abruf einer fremden Medienadresse: Range 0-50, 10 s Frist, zwei Wiederholungen.
 * Ein Netzfehler nach den Wiederholungen heisst «nicht erreichbar».
 */
const pruefeAdresse = async (url, abruf) => {
  let letzter = 'nicht erreichbar';
  for (let versuch = 0; versuch < 3; versuch++) {
    try {
      const antwort = await abruf(url, {
        method: 'GET',
        headers: { Range: 'bytes=0-50', 'User-Agent': 'jasswiki-seitenpruefer' },
        redirect: 'follow',
        signal: AbortSignal.timeout(10_000),
      });
      try { await antwort.body?.cancel?.(); } catch { /* egal */ }
      if (antwort.status === 200 || antwort.status === 206) return null;
      letzter = `antwortet ${antwort.status}`;
      if (antwort.status < 500 && antwort.status !== 429) return letzter;
    } catch {
      letzter = 'nicht erreichbar';
    }
  }
  return letzter;
};

const nebenlaeufig = async (eintraege, anzahl, arbeit) => {
  const ergebnis = new Map();
  let i = 0;
  const arbeiter = async () => {
    while (i < eintraege.length) {
      const e = eintraege[i++];
      ergebnis.set(e, await arbeit(e));
    }
  };
  await Promise.all(Array.from({ length: Math.min(anzahl, eintraege.length) }, arbeiter));
  return ergebnis;
};

/**
 * Der eigentliche Lauf. Gibt die Funde zurück, ohne Sperrklinke.
 * Ein Fund: { pfad, pruefung, wort, stelle }. `wort` ist das, was gezählt wird.
 */
export const pruefe = async ({
  wurzel = WURZEL,
  outDir = path.join(wurzel, 'out'),
  inhaltDatei = path.join(wurzel, 'src/data/jass-content-v2.json'),
  firebaseDatei = path.join(wurzel, 'firebase.json'),
  mitNetz = true,
  abruf = globalThis.fetch,
} = {}) => {
  if (!existsSync(outDir)) throw new Error(`Kein gebauter Ordner: ${outDir}. Zuerst «next build».`);

  const funde = [];
  const fund = (pfad, pruefung, wort, stelle) => funde.push({ pfad, pruefung, wort, stelle });

  const dateien = await dateienIn(outDir);
  const vorhanden = new Set(dateien);
  const seiten = dateien.filter((d) => d.endsWith('.html') && !d.startsWith('_next/')).sort();

  const inhalt = existsSync(inhaltDatei) ? JSON.parse(await lies(inhaltDatei)) : {};
  const firebase = existsSync(firebaseDatei) ? JSON.parse(await lies(firebaseDatei)) : {};
  const hosting = [].concat(firebase.hosting || []);
  const weiterleitungen = hosting.flatMap((h) => [...(h.redirects || []), ...(h.rewrites || [])]);
  const exakt = new Set();
  const muster = [];
  for (const w of weiterleitungen) {
    if (w.regex) muster.push(new RegExp(w.regex));
    else if (w.source && /[*:]/.test(w.source)) muster.push(firebaseMuster(w.source));
    else if (w.source) exakt.add(w.source);
  }
  const istWeiterleitung = (p) => exakt.has(p) || muster.some((m) => m.test(p));

  const istGebaut = (p) => {
    const rel = p.replace(/^\/+/, '');
    if (rel === '') return vorhanden.has('index.html');
    if (vorhanden.has(rel)) return true;
    const ohneStrich = rel.replace(/\/+$/, '');
    return vorhanden.has(`${ohneStrich}/index.html`) || vorhanden.has(`${ohneStrich}.html`);
  };

  const fremdeMedien = new Map(); // url → Set(seitenpfad)
  const merkeFremd = (url, pfad) => {
    if (!fremdeMedien.has(url)) fremdeMedien.set(url, new Set());
    fremdeMedien.get(url).add(pfad);
  };
  let artikelseiten = 0;

  const pruefeBehauptungen = (pfad, text, quelle) => {
    const klein = text.toLowerCase();
    for (const satz of GESPERRTE_BEHAUPTUNGEN) {
      const s = satz.toLowerCase();
      let i = klein.indexOf(s);
      while (i >= 0) {
        fund(pfad, PRUEFUNG.D, `«${satz}» in ${quelle}`, ausschnitt(text, i, s.length));
        i = klein.indexOf(s, i + s.length);
      }
    }
  };

  for (const rel of seiten) {
    const pfad = seitenPfad(rel);
    const html = await lies(path.join(outDir, rel));
    const text = sichtbarerText(html);

    // A liest jede Quelle: Seitentext, Seitentitel, meta description, aria-label, alt, title.
    // Die Fundstelle nennt die Quelle, das gezählte Wort bleibt dasselbe.
    for (const { quelle, text: q } of textQuellen(html)) {
      const stelle = (i, laenge) => `${quelle}: ${ausschnitt(q, i, laenge)}`;
      // A1 Gedankenstrich
      for (const t of gedankenstriche(q)) fund(pfad, PRUEFUNG.A1, t.wort, stelle(t.index, t.laenge));
      // A2 Fremdwörter (wie Sprachwächter B) und Wendungen (wie Sprachwächter F)
      const klein = q.toLowerCase();
      for (const wort of FREMDWOERTER) {
        const w = wort.toLowerCase();
        let i = klein.indexOf(w);
        while (i >= 0) {
          fund(pfad, PRUEFUNG.A2W, `«${wort.trim()}»`, stelle(i, w.length));
          i = klein.indexOf(w, i + w.length);
        }
      }
      for (const [regel] of WENDUNGEN) {
        for (const m of alleTreffer(q, regel)) fund(pfad, PRUEFUNG.A2F, `«${m[0]}»`, stelle(m.index, m[0].length));
      }
      // A3 rohe Marken
      for (const marke of ROHE_MARKEN) {
        let i = q.indexOf(marke);
        while (i >= 0) {
          fund(pfad, PRUEFUNG.A3, `«${marke}»`, stelle(i, marke.length));
          i = q.indexOf(marke, i + marke.length);
        }
      }
    }

    // D im sichtbaren Text und im JSON-LD
    pruefeBehauptungen(pfad, text, 'Text');
    const jsonLd = jsonLdBloecke(html).map(jsonAlsText);
    for (const block of jsonLd) pruefeBehauptungen(pfad, block, 'JSON-LD');

    const ohne = ohneSkripte(html);

    // B1 interne Verweise
    const gesehen = new Set();
    for (const { attr } of tags(ohne, ['a', 'link', 'area'])) {
      const lokal = lokalerPfad(attr.href, pfad);
      if (lokal === null) continue;
      const ziel = ohneAnker(lokal);
      if (ziel === '' || gesehen.has(ziel)) continue;
      gesehen.add(ziel);
      if (istGebaut(ziel) || istWeiterleitung(ziel)) continue;
      fund(pfad, PRUEFUNG.B1, ziel, `href="${attr.href}"`);
    }

    // C Medien: img src/srcset, source src/srcset, video src/poster, Deckbild der Seite
    const medien = [];
    for (const { tag, attr } of tags(ohne, ['img', 'source', 'video', 'audio', 'meta'])) {
      if (tag === 'meta') {
        const art = (attr.property || attr.name || '').toLowerCase();
        if (['og:image', 'twitter:image', 'og:video'].includes(art)) medien.push(attr.content);
        continue;
      }
      if (attr.src) medien.push(attr.src);
      if (attr.poster) medien.push(attr.poster);
      if (attr.srcset) {
        for (const teil of attr.srcset.split(',')) medien.push(teil.trim().split(/\s+/)[0]);
      }
    }
    // Filme und Deckbilder, die das JSON-LD ankündigt (VideoObject)
    for (const block of jsonLd) {
      for (const m of block.matchAll(/"(contentUrl|thumbnailUrl)":"([^"]+)"/g)) medien.push(m[2]);
    }
    const medienGesehen = new Set();
    for (const url of medien) {
      if (!url || medienGesehen.has(url)) continue;
      medienGesehen.add(url);
      const extern = fremd(url);
      if (extern) {
        merkeFremd(extern, pfad);
        continue;
      }
      const lokal = lokalerPfad(url, pfad);
      if (lokal === null) continue;
      const ziel = ohneAnker(lokal);
      if (!istGebaut(ziel)) fund(pfad, PRUEFUNG.C1, ziel, url);
    }

    // B2 «Siehe auch» gegen see_also, Kennung für Kennung
    const eigene = /\sdata-artikel-seite="([^"]+)"/.exec(ohne)?.[1];
    if (eigene) {
      artikelseiten++;
      const artikel = inhalt[eigene] ?? Object.values(inhalt).find((a) => a.id === eigene);
      const soll = [...new Set((artikel?.see_also || []).filter((id) => id !== eigene))];
      const ist = [...ohne.matchAll(/\sdata-artikel="([^"]+)"/g)].map((m) => entschluessle(m[1]));
      for (const id of soll) if (!ist.includes(id)) fund(pfad, PRUEFUNG.B2, `fehlt «${id}»`, `see_also von ${eigene}`);
      for (const id of ist) if (!soll.includes(id)) fund(pfad, PRUEFUNG.B2, `zu viel «${id}»`, `see_also von ${eigene}`);
      const sollGemeinsam = soll.filter((id) => ist.includes(id));
      const istGemeinsam = ist.filter((id) => soll.includes(id));
      if (sollGemeinsam.join(',') !== istGemeinsam.join(',')) {
        fund(pfad, PRUEFUNG.B2, 'Reihenfolge', `soll ${sollGemeinsam.join(', ')} · ist ${istGemeinsam.join(', ')}`);
      }
    }
  }

  if (artikelseiten === 0 && Object.keys(inhalt).length > 0) {
    fund('/', PRUEFUNG.B2, 'keine Artikelseite erkannt', 'Kein data-artikel-seite in out/. Die Vorlagen tragen das Merkmal nicht mehr.');
  }

  // D in Korpus und llms-Dateien
  const nebenkanaele = dateien.filter(
    (d) => d === 'dataset/jasswiki-corpus.jsonl' || /(^|\/)llms[^/]*$/.test(d) || d.startsWith('llms/'),
  );
  for (const rel of nebenkanaele.sort()) {
    const roh = await lies(path.join(outDir, rel));
    const text = rel.endsWith('.jsonl')
      ? roh.split('\n').map(jsonAlsText).join('\n')
      : rel.endsWith('.json') ? jsonAlsText(roh) : roh;
    pruefeBehauptungen(`/${rel}`, text, 'Nebenkanal');
  }

  // C2 fremde Medien, jede Adresse einmal je Lauf
  let abgerufen = 0;
  if (mitNetz && fremdeMedien.size > 0) {
    const adressen = [...fremdeMedien.keys()].sort();
    const antworten = await nebenlaeufig(adressen, 8, (url) => pruefeAdresse(url, abruf));
    abgerufen = adressen.length;
    for (const url of adressen) {
      const fehler = antworten.get(url);
      if (!fehler) continue;
      for (const pfad of [...fremdeMedien.get(url)].sort()) fund(pfad, PRUEFUNG.C2, `${url} · ${fehler}`, url);
    }
  }

  return {
    funde,
    seiten: seiten.length,
    artikelseiten,
    nebenkanaele: nebenkanaele.length,
    fremdeMedien: fremdeMedien.size,
    abgerufen,
  };
};

// --- Sperrklinke --------------------------------------------------------------
const schluessel = (f) => `${f.pfad} | ${f.pruefung} | ${f.wort}`;

/** Bestand als Zeilen «pfad | prüfung | wort» mit «×n», wenn es mehr als eins sind. */
export const altlastZeilen = (funde) => {
  const zaehler = new Map();
  for (const f of funde) zaehler.set(schluessel(f), (zaehler.get(schluessel(f)) || 0) + 1);
  return [...zaehler].map(([k, n]) => (n > 1 ? `${k} ×${n}` : k)).sort();
};

export const leseAltlast = (zeilen) => {
  const karte = new Map();
  for (const z of zeilen) {
    const m = / ×(\d+)$/.exec(z);
    const k = m ? z.slice(0, m.index) : z;
    karte.set(k, (karte.get(k) || 0) + (m ? Number(m[1]) : 1));
  }
  return karte;
};

/**
 * Vergleicht die Funde mit dem eingefrorenen Bestand. Neu ist, was über die
 * eingefrorene Zahl hinausgeht. Ohne Netz bleibt der C2-Bestand unberührt.
 */
export const vergleiche = (funde, altlastListe, { ohneNetz = false } = {}) => {
  const altlast = leseAltlast(altlastListe);
  const gruppen = new Map();
  for (const f of funde) {
    const k = schluessel(f);
    if (!gruppen.has(k)) gruppen.set(k, []);
    gruppen.get(k).push(f);
  }
  const neue = [];
  for (const [k, liste] of gruppen) {
    const erlaubt = altlast.get(k) || 0;
    if (liste.length > erlaubt) neue.push(...(erlaubt === 0 ? liste : liste.map((f) => ({ ...f, mehr: liste.length - erlaubt }))));
  }
  const behoben = [];
  for (const [k, n] of altlast) {
    if (ohneNetz && k.includes(` | ${PRUEFUNG.C2} | `)) continue;
    const jetzt = gruppen.get(k)?.length || 0;
    if (jetzt < n) behoben.push(`${k} (${n} → ${jetzt})`);
  }
  return { neue, behoben };
};

const kennung = (pruefung) => pruefung.split(' ')[0];

// --- Lauf von der Kommandozeile -------------------------------------------------
export const lauf = async (argv = process.argv.slice(2), optionen = {}) => {
  const ausgabe = optionen.ausgabe || console.log;
  const wurzel = optionen.wurzel || WURZEL;
  const altlastDatei = optionen.altlastDatei || path.join(wurzel, 'pruefe-seite-altlasten.json');
  const ohneNetz = argv.includes('--ohne-netz');
  const start = Date.now();

  const ergebnis = await pruefe({ ...optionen, wurzel, mitNetz: !ohneNetz });
  const { funde } = ergebnis;
  const sekunden = ((Date.now() - start) / 1000).toFixed(1);

  let altlast = [];
  if (existsSync(altlastDatei)) altlast = JSON.parse(await lies(altlastDatei));

  if (argv.includes('--altlast-neu')) {
    let zeilen = altlastZeilen(funde);
    if (ohneNetz) zeilen = [...zeilen, ...altlast.filter((z) => z.includes(` | ${PRUEFUNG.C2} | `))].sort();
    await writeFile(altlastDatei, `${JSON.stringify(zeilen, null, 2)}\n`);
    ausgabe(`✍️  Altlast neu geschrieben: ${funde.length} Fund(e) in ${zeilen.length} Zeile(n).`);
    return 0;
  }

  if (altlast.length === 0) ausgabe('ℹ️  Keine Altlast-Liste gefunden, jeder Fund zählt als neu.');
  const { neue, behoben } = vergleiche(funde, altlast, { ohneNetz });

  ausgabe('🔎 Seitenprüfer');
  ausgabe(`   ${ergebnis.seiten} Seiten, davon ${ergebnis.artikelseiten} Artikelseiten, ${ergebnis.nebenkanaele} Nebenkanäle, ${sekunden} s`);
  ausgabe(
    ohneNetz
      ? `   ${ergebnis.fremdeMedien} fremde Medienadressen, ohne Netz (C2 ruht)`
      : `   ${ergebnis.abgerufen} fremde Medienadressen abgerufen`,
  );
  const alleKennungen = Object.values(PRUEFUNG).map(kennung).filter((k, i, a) => a.indexOf(k) === i);
  for (const k of alleKennungen) {
    const gesamt = funde.filter((f) => kennung(f.pruefung) === k).length;
    const neu = neue.filter((f) => kennung(f.pruefung) === k).length;
    const name = Object.values(PRUEFUNG).filter((p) => kennung(p) === k).map((p) => p.slice(k.length + 1)).join(' / ');
    ausgabe(`   ${k.padEnd(3)} ${name.padEnd(28)} ${String(gesamt).padStart(5)} Fund(e), ${neu} neu`);
  }

  if (argv.includes('--alle')) {
    ausgabe('\n📋 Alle Funde:');
    for (const f of funde) ausgabe(`   ${f.pfad} | ${f.pruefung} | ${f.wort} | ${f.stelle}`);
  }

  if (behoben.length > 0) {
    ausgabe(`\n   ✨ ${behoben.length} Altlast-Zeile(n) kleiner geworden. Liste kürzen mit --altlast-neu:`);
    for (const b of behoben.slice(0, 20)) ausgabe(`      ${b}`);
    if (behoben.length > 20) ausgabe(`      … und ${behoben.length - 20} weitere`);
  }

  // C2 MELDET IM BAU (SCHIRI, 22.11.2026): Ein fremder Host darf einen Deploy
  // nicht anhalten, der mit ihm nichts zu tun hat. Hart prüft die tägliche
  // Wache von aussen (jass-server, server/wikiwache.py). `--netz-hart` hält
  // auch hier an, z. B. vor einem Deploy, der Medien neu einbaut.
  const netzHart = argv.includes('--netz-hart');
  const gemeldet = netzHart ? [] : neue.filter((f) => f.pruefung === PRUEFUNG.C2);
  const harte = netzHart ? neue : neue.filter((f) => f.pruefung !== PRUEFUNG.C2);

  if (gemeldet.length > 0) {
    ausgabe(`\n⚠️  ${gemeldet.length} fremde Medienadresse(n) antworten nicht (C2 meldet, der Bau läuft weiter):\n`);
    for (const f of gemeldet) {
      ausgabe(`   ${f.pfad}`);
      ausgabe(`   ${f.wort}\n`);
    }
  }

  if (harte.length > 0) {
    ausgabe(`\n❌ ${harte.length} NEUE(R) Fund(e), der Bau hält an:\n`);
    for (const f of harte) {
      ausgabe(`   ${f.pfad}`);
      ausgabe(`   ${f.pruefung}: ${f.wort}${f.mehr ? ` (${f.mehr} mehr als eingefroren)` : ''}`);
      ausgabe(`   ${f.stelle}\n`);
    }
    ausgabe('   Beheben an der Quelle (Inhaltsdatei, Vorlage, Erzeuger-Skript).');
    return 1;
  }

  ausgabe('✅ Seitenprüfer: nichts Neues.');
  return 0;
};

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  lauf()
    .then((code) => process.exit(code))
    .catch((err) => {
      console.error('❌ Seitenprüfer konnte nicht laufen:', err);
      process.exit(1);
    });
}
