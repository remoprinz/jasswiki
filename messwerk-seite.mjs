/**
 * DAS MESSWERK — Seitenbudget am Handy (A1, 22.11.2026)
 *
 * Remo: «es kann auch dazu führen, dass wir ein schlamassel anrichten und jasswiki
 * nachher überladen wird». Das Messwerk macht Überladung zur Zahl. Es öffnet eine
 * gebaute Seite in einem echten Browser am Handy-Mass 390×844 (dazu am Computer
 * 1440×900, nur zur Auskunft) und misst die Bausteine der Hülle ([data-baustein]).
 *
 * Gemessen je Seite: ganze Höhe, je Baustein Höhe in Pixeln und Bildschirmen, Summe
 * der Bausteine ausser text und fuss, Anteil von text, Oberkante des ersten Absatzes,
 * Zahl der Fragen, Verweise nach jassguru.ch, Breite gegen scrollWidth.
 * Die Fragen zählen ZUGEKLAPPT (SCHIRI 22.11.2026): Das Messwerk klappt jede offene
 * Frage zu und misst dann. Die Höhe im Auslieferungszustand steht daneben.
 *
 * Budget in seitenbudget.json. Solange dort "hart": false steht, sind Überschreitungen
 * ein Hinweis und der Lauf endet mit Exit 0. Hart wird es mit "hart": true oder --hart.
 * Das Messwerk hängt NICHT in der Build-Kette, es ist ein Werkzeug für die Abnahme.
 *
 *   node messwerk-seite.mjs /begriffe/kartenbezeichnungen/nell/ /varianten/coiffeur/
 *   node messwerk-seite.mjs --live <pfade>     gegen https://jasswiki.ch statt out/
 *   node messwerk-seite.mjs --json <pfade>     Ergebnis als JSON
 *   node messwerk-seite.mjs --hart <pfade>     Exit 1, wenn eine Seite das Budget sprengt
 *   node messwerk-seite.mjs --nur-messen ...   immer Exit 0
 *
 * Browser: MESSWERK_PLAYWRIGHT (Pfad zum Modul playwright-core) und MESSWERK_CHROME
 * (ausführbare Datei). Vorgabe: playwright-core aus jassverband-schweiz und das neueste
 * chromium_headless_shell im Cache von Playwright. Fehlt eines, Exit 2.
 */

import { createServer } from 'http';
import { readFile, readdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import { createRequire } from 'module';
import os from 'os';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const WURZEL = path.dirname(fileURLToPath(import.meta.url));
const LIVE = 'https://jasswiki.ch';

export const VORGABE_PLAYWRIGHT = '/Users/remoprinz/Documents/jassverband-schweiz/node_modules/playwright-core';
const CACHE = path.join(os.homedir(), 'Library/Caches/ms-playwright');

// --- Auswertung: aus gemessenen Zahlen wird ein Urteil (ohne Browser) ----------------

const runde = (x, stellen = 2) => Math.round(x * 10 ** stellen) / 10 ** stellen;

/**
 * Urteil über eine Messung am Handy.
 * messung: { seitenHoehe, bildschirm, breite, scrollBreite, bausteine: [{ name, hoehe }],
 *            ersterAbsatzOben, ohneBausteine }
 * Gibt { kennzahlen, verstoesse, hinweise } zurück. Ein Verstoss ist ein Satz.
 */
export const urteile = (messung, budget) => {
  const bildschirm = messung.bildschirm || budget.handy.hoehe;
  const ausser = new Set(budget.ausserBudget || ['text', 'fuss']);
  const bausteine = (messung.bausteine || []).map((b) => ({ ...b, bildschirme: runde(b.hoehe / bildschirm) }));
  const imBudget = bausteine.filter((b) => !ausser.has(b.name));
  const summe = imBudget.reduce((s, b) => s + b.hoehe, 0);
  const textHoehe = bausteine.filter((b) => b.name === 'text').reduce((s, b) => s + b.hoehe, 0);
  const kennzahlen = {
    seitenHoehe: messung.seitenHoehe,
    seitenBildschirme: runde(messung.seitenHoehe / bildschirm),
    bausteine,
    summeBildschirme: runde(summe / bildschirm),
    textAnteil: messung.seitenHoehe > 0 && bausteine.length > 0 ? runde(textHoehe / messung.seitenHoehe) : null,
    ersterAbsatzOben: messung.ersterAbsatzOben,
    ersterSatzImErstenBildschirm: messung.ersterAbsatzOben == null ? null : messung.ersterAbsatzOben < bildschirm,
    waagrecht: messung.scrollBreite > messung.breite,
  };

  const verstoesse = [];
  const hinweise = [];
  if (messung.ohneBausteine) hinweise.push('ohne Bausteinmerkmale: Bausteinbudget nicht messbar');
  if (!messung.ohneBausteine) {
    if (kennzahlen.summeBildschirme > budget.bausteineZusammenHoechstens) {
      verstoesse.push(`Bausteine ausser ${[...ausser].join(' und ')} zusammen ${kennzahlen.summeBildschirme} Bildschirme (höchstens ${budget.bausteineZusammenHoechstens})`);
    }
    for (const b of imBudget) {
      if (b.bildschirme > budget.einzelnerBausteinHoechstens) {
        verstoesse.push(`Baustein «${b.name}» ${b.bildschirme} Bildschirme (höchstens ${budget.einzelnerBausteinHoechstens})`);
      }
    }
  }
  if (budget.ersterSatzImErstenBildschirm) {
    if (messung.ersterAbsatzOben == null) verstoesse.push('kein erster Absatz gefunden');
    else if (!kennzahlen.ersterSatzImErstenBildschirm) {
      verstoesse.push(`erster Absatz beginnt bei ${Math.round(messung.ersterAbsatzOben)} px, unter dem ersten Bildschirm (${bildschirm})`);
    }
  }
  if (budget.waagrechtesScrollen === false && kennzahlen.waagrecht) {
    verstoesse.push(`waagrechtes Scrollen: ${messung.scrollBreite} px Inhalt auf ${messung.breite} px`);
  }
  return { kennzahlen, verstoesse, hinweise };
};

/** Exit-Code aus den Urteilen: 1 allein, wenn hart und eine Seite das Budget sprengt. */
export const exitCode = (urteile, { hart = false, nurMessen = false } = {}) => {
  if (nurMessen || !hart) return 0;
  return urteile.some((u) => u.verstoesse.length > 0) ? 1 : 0;
};

// --- Browser finden ---------------------------------------------------------------

export const findeChrome = async (env = process.env, cache = CACHE) => {
  if (env.MESSWERK_CHROME) return existsSync(env.MESSWERK_CHROME) ? env.MESSWERK_CHROME : null;
  if (!existsSync(cache)) return null;
  const ordner = (await readdir(cache))
    .filter((n) => n.startsWith('chromium_headless_shell-'))
    .sort((a, b) => Number(b.split('-').pop()) - Number(a.split('-').pop()));
  for (const o of ordner) {
    for (const unter of ['chrome-headless-shell-mac-arm64', 'chrome-headless-shell-mac-x64', 'chrome-headless-shell-linux64']) {
      const datei = path.join(cache, o, unter, 'chrome-headless-shell');
      if (existsSync(datei)) return datei;
    }
  }
  return null;
};

export const ladePlaywright = (env = process.env) => {
  const modul = env.MESSWERK_PLAYWRIGHT || VORGABE_PLAYWRIGHT;
  if (!existsSync(path.join(modul, 'package.json'))) return null;
  try {
    return createRequire(import.meta.url)(modul);
  } catch {
    return null;
  }
};

// --- kleiner Dateiserver für out/ ---------------------------------------------------

const ARTEN = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.avif': 'image/avif', '.gif': 'image/gif', '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.ttf': 'font/ttf', '.otf': 'font/otf', '.mp4': 'video/mp4', '.webm': 'video/webm', '.txt': 'text/plain; charset=utf-8',
};

const istDatei = async (p) => {
  try {
    return (await stat(p)).isFile();
  } catch {
    return false;
  }
};

export const starteServer = (outDir) =>
  new Promise((aufgeloest, abgelehnt) => {
    const server = createServer(async (anfrage, antwort) => {
      let rel;
      try {
        rel = decodeURIComponent(new URL(anfrage.url, 'http://x').pathname);
      } catch {
        rel = '/';
      }
      const basis = path.join(outDir, path.normalize(rel).replace(/^(\.\.[/\\])+/, ''));
      const kandidaten = rel.endsWith('/') ? [path.join(basis, 'index.html')] : [basis, `${basis}.html`, path.join(basis, 'index.html')];
      for (const k of kandidaten) {
        if (k.startsWith(outDir) && (await istDatei(k))) {
          antwort.writeHead(200, { 'Content-Type': ARTEN[path.extname(k).toLowerCase()] || 'application/octet-stream' });
          antwort.end(await readFile(k));
          return;
        }
      }
      antwort.writeHead(404, { 'Content-Type': 'text/plain' });
      antwort.end('nicht gefunden');
    });
    server.on('error', abgelehnt);
    server.listen(0, '127.0.0.1', () => aufgeloest(server));
  });

// --- Messung im Browser ---------------------------------------------------------------

/** Läuft in der Seite. Misst, was ohne und mit Bausteinmerkmalen messbar ist. */
const MESSUNG_IM_BROWSER = () => {
  const oben = (el) => el.getBoundingClientRect().top + window.scrollY;
  const bausteinElemente = [...document.querySelectorAll('[data-baustein]')];
  const fragenBlock = document.querySelector('[data-baustein="fragen"]') || document.querySelector('section[aria-labelledby="faq-heading"]');
  const textBlock = document.querySelector('[data-baustein="text"]') || document.querySelector('article') || document.querySelector('main');
  const ersterAbsatz = textBlock ? [...textBlock.querySelectorAll('p')].find((p) => p.textContent.trim().length > 0) : null;
  const fragen = fragenBlock ? fragenBlock.querySelectorAll('button[aria-controls], details > summary').length : 0;
  return {
    seitenHoehe: Math.max(document.documentElement.scrollHeight, document.body?.scrollHeight || 0),
    breite: document.documentElement.clientWidth,
    scrollBreite: document.documentElement.scrollWidth,
    bausteine: bausteinElemente.map((el) => ({ name: el.getAttribute('data-baustein'), hoehe: Math.round(el.getBoundingClientRect().height) })),
    ohneBausteine: bausteinElemente.length === 0,
    ersterAbsatzOben: ersterAbsatz ? Math.round(oben(ersterAbsatz)) : null,
    fragen,
    fragenHoehe: fragenBlock ? Math.round(fragenBlock.getBoundingClientRect().height) : null,
    jassguruVerweise: [...document.querySelectorAll('a[href]')].filter((a) => /(^|\.|\/\/)jassguru\.ch/i.test(a.href)).length,
  };
};

/** Klappt jede offene Frage zu. Gibt die Zahl der zugeklappten zurück. */
const KLAPPE_FRAGEN_ZU = () => {
  const block = document.querySelector('[data-baustein="fragen"]') || document.querySelector('section[aria-labelledby="faq-heading"]');
  if (!block) return 0;
  let n = 0;
  for (const knopf of block.querySelectorAll('button[aria-expanded="true"]')) {
    knopf.click();
    n++;
  }
  for (const d of block.querySelectorAll('details[open]')) {
    d.open = false;
    n++;
  }
  return n;
};

const messeSeite = async (browser, url, ansicht) => {
  const kontext = await browser.newContext({
    viewport: { width: ansicht.breite, height: ansicht.hoehe },
    deviceScaleFactor: ansicht.breite < 800 ? 3 : 1,
    isMobile: ansicht.breite < 800,
    hasTouch: ansicht.breite < 800,
    locale: 'de-CH',
  });
  const seite = await kontext.newPage();
  try {
    const antwort = await seite.goto(url, { waitUntil: 'load', timeout: 60_000 });
    if (!antwort || antwort.status() >= 400) throw new Error(`${url} antwortet ${antwort ? antwort.status() : 'nicht'}`);
    await seite.waitForLoadState('networkidle', { timeout: 15_000 }).catch(() => {});
    await seite.evaluate(() => document.fonts?.ready);
    const auslieferung = await seite.evaluate(MESSUNG_IM_BROWSER);
    const zugeklappt = await seite.evaluate(KLAPPE_FRAGEN_ZU);
    if (zugeklappt > 0) await seite.waitForTimeout(800); // Übergang 500 ms
    const messung = await seite.evaluate(MESSUNG_IM_BROWSER);
    return {
      ...messung,
      bildschirm: ansicht.hoehe,
      zugeklappt,
      auslieferung: {
        seitenHoehe: auslieferung.seitenHoehe,
        fragenHoehe: auslieferung.fragenHoehe,
        bausteine: auslieferung.bausteine,
      },
    };
  } finally {
    await kontext.close();
  }
};

// --- Ausgabe -------------------------------------------------------------------------

const zahl = (x) => (x == null ? '–' : String(x));

const tabelle = (ergebnisse, ausgabe, budget) => {
  for (const e of ergebnisse) {
    const h = e.handy;
    const k = e.urteil.kennzahlen;
    ausgabe(`\n📏 ${e.pfad}  (${e.url})`);
    ausgabe(`   Handy ${budget.handy.breite}×${budget.handy.hoehe}: Seite ${h.seitenHoehe} px = ${k.seitenBildschirme} Bildschirme` +
      (h.zugeklappt > 0 ? ` (ausgeliefert ${h.auslieferung.seitenHoehe} px, ${h.zugeklappt} Frage(n) zugeklappt)` : ''));
    if (h.ohneBausteine) ausgabe('   ohne Bausteinmerkmale (data-baustein fehlt): Bausteine nicht messbar');
    else {
      ausgabe('   Baustein        px     Bildschirme');
      for (const b of k.bausteine) ausgabe(`   ${b.name.padEnd(14)} ${String(b.hoehe).padStart(6)}   ${b.bildschirme}`);
      ausgabe(`   Summe ohne ${(budget.ausserBudget || []).join('/')}: ${k.summeBildschirme} Bildschirme · Anteil text ${zahl(k.textAnteil)}`);
    }
    ausgabe(`   erster Absatz oben bei ${zahl(h.ersterAbsatzOben)} px (${k.ersterSatzImErstenBildschirm ? 'im' : 'unter dem'} ersten Bildschirm)`);
    ausgabe(`   Fragen ${h.fragen} · Höhe Fragen ${zahl(h.fragenHoehe)} px zugeklappt, ${zahl(h.auslieferung.fragenHoehe)} px ausgeliefert`);
    ausgabe(`   Verweise nach jassguru.ch ${h.jassguruVerweise} · Breite ${h.breite} / scrollWidth ${h.scrollBreite}`);
    if (e.computer) ausgabe(`   Computer ${budget.computer.breite}×${budget.computer.hoehe} (Auskunft): Seite ${e.computer.seitenHoehe} px = ${runde(e.computer.seitenHoehe / budget.computer.hoehe)} Bildschirme, erster Absatz bei ${zahl(e.computer.ersterAbsatzOben)} px`);
    for (const hw of e.urteil.hinweise) ausgabe(`   ℹ️  ${hw}`);
    for (const v of e.urteil.verstoesse) ausgabe(`   ⚠️  ${v}`);
    if (e.urteil.verstoesse.length === 0) ausgabe(h.ohneBausteine ? '   ✅ im Budget, soweit ohne Bausteine messbar' : '   ✅ im Budget');
  }
};

// --- Lauf von der Kommandozeile -------------------------------------------------------

export const lauf = async (argv = process.argv.slice(2), optionen = {}) => {
  const ausgabe = optionen.ausgabe || console.log;
  const wurzel = optionen.wurzel || WURZEL;
  const env = optionen.env || process.env;
  const live = argv.includes('--live');
  const alsJson = argv.includes('--json');
  const nurMessen = argv.includes('--nur-messen');
  const pfade = argv.filter((a) => !a.startsWith('--'));
  if (pfade.length === 0) {
    ausgabe('Aufruf: node messwerk-seite.mjs [--live] [--json] [--hart] [--nur-messen] /pfad/der/seite/ …');
    return 2;
  }
  const budget = JSON.parse(await readFile(optionen.budgetDatei || path.join(wurzel, 'seitenbudget.json'), 'utf-8'));
  const hart = argv.includes('--hart') || budget.hart === true;

  const playwright = ladePlaywright(env);
  const chrome = await findeChrome(env);
  if (!playwright || !chrome) {
    ausgabe('❌ Messwerk: kein Browser.');
    if (!playwright) ausgabe(`   playwright-core fehlt unter ${env.MESSWERK_PLAYWRIGHT || VORGABE_PLAYWRIGHT} (MESSWERK_PLAYWRIGHT setzen).`);
    if (!chrome) ausgabe(`   Chromium fehlt (MESSWERK_CHROME setzen oder chromium_headless_shell in ${CACHE}).`);
    return 2;
  }

  let server = null;
  let basis = LIVE;
  if (!live) {
    const outDir = path.join(wurzel, 'out');
    if (!existsSync(outDir)) {
      ausgabe(`❌ Kein gebauter Ordner: ${outDir}. Zuerst «npm run build» oder --live.`);
      return 2;
    }
    server = await starteServer(outDir);
    basis = `http://127.0.0.1:${server.address().port}`;
  }

  const browser = await playwright.chromium.launch({ executablePath: chrome, headless: true });
  const ergebnisse = [];
  try {
    for (const pfad of pfade) {
      const url = `${basis}${pfad.startsWith('/') ? pfad : `/${pfad}`}`;
      const handy = await messeSeite(browser, url, budget.handy);
      const computer = await messeSeite(browser, url, budget.computer);
      ergebnisse.push({ pfad, url, handy, computer, urteil: urteile(handy, budget) });
    }
  } finally {
    await browser.close();
    if (server) await new Promise((r) => server.close(r));
  }

  if (alsJson) ausgabe(JSON.stringify({ budget, hart, ergebnisse }, null, 2));
  else {
    ausgabe(`🔬 Messwerk · ${live ? LIVE : 'out/'} · Budget ${hart ? 'hart' : 'als Hinweis (hart: false)'}`);
    tabelle(ergebnisse, ausgabe, budget);
  }
  const code = exitCode(ergebnisse.map((e) => e.urteil), { hart, nurMessen });
  if (!alsJson && code === 1) ausgabe('\n❌ Mindestens eine Seite sprengt das Budget.');
  return code;
};

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  lauf()
    .then((code) => process.exit(code))
    .catch((err) => {
      console.error('❌ Messwerk konnte nicht laufen:', err);
      process.exit(1);
    });
}
