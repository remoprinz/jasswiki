#!/usr/bin/env node
/**
 * STAND DER ÜBERSETZUNGEN (DOLMETSCHER, Spezifikation Charta).
 * Liest src/data/i18n/manifest.json und vergleicht den Hash jedes Artikels mit dem
 * heutigen deutschen Text. Eine Zeile für den Deployer, mit --liste jeder Artikel.
 * Ende 0: nur Bericht. Mit --streng Ende 1, sobald etwas fehlt oder veraltet ist.
 */
import crypto from "node:crypto";
import fs from "node:fs";

const de = JSON.parse(fs.readFileSync("src/data/jass-content-v2.json", "utf8"));
const manifest = JSON.parse(fs.readFileSync("src/data/i18n/manifest.json", "utf8"));
const hash = (id) =>
  crypto.createHash("sha256").update(`${JSON.stringify({ text: de[id].text, faqs: de[id].faqs })}\n`).digest("hex");

const zeilen = [];
const zaehler = { fr: { veraltet: 0, fehlt: 0 }, it: { veraltet: 0, fehlt: 0 } };
for (const id of Object.keys(de)) {
  const eintrag = manifest[id];
  for (const sprache of ["fr", "it"]) {
    if (!eintrag?.[sprache]) {
      zaehler[sprache].fehlt += 1;
      zeilen.push(`${sprache} fehlt ${id}`);
    } else if (eintrag.deHash !== hash(id) || eintrag[sprache].neu) {
      zaehler[sprache].veraltet += 1;
      zeilen.push(`${sprache} veraltet ${id}`);
    }
  }
}
const { fr, it } = zaehler;
console.log(`FR: ${fr.veraltet} veraltet, ${fr.fehlt} ohne Übersetzung · IT: ${it.veraltet} veraltet, ${it.fehlt} ohne Übersetzung · ${Object.keys(de).length} Artikel`);
if (process.argv.includes("--liste")) for (const z of zeilen) console.log(z);
if (process.argv.includes("--streng") && zeilen.length > 0) process.exit(1);
