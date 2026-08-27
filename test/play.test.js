/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright 2026 Tobias Reithmeier
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { stdout } from 'node:process';
import { dirname, join } from 'node:path';

import { compileFile } from '../src/compile.js';
import { play, simulate } from '../src/play.js';
import { compile } from './helpers.js';

const here = dirname(fileURLToPath(import.meta.url));
const house = () => compileFile(join(here, '..', 'examples', 'house', 'book.yaml')).story;

test('a script of moves replays the same way twice', async () => {
  const moves = ['1', '1', 'a', 'a', 'a'];
  const a = await play(house(), { seed: 42, script: moves, quiet: true });
  const b = await play(house(), { seed: 42, script: moves, quiet: true });

  assert.equal(a.node, b.node);
  assert.deepEqual(a.text, b.text);
  assert.equal(a.rolls, b.rolls);
  assert.equal(a.seed, 42);
});

test('a move that does not apply stops the script and says so', async () => {
  const result = await play(house(), { seed: 1, script: ['9'], quiet: true });
  assert.equal(result.log.length, 1);
  assert.equal(result.log[0].ok, false);
  assert.equal(result.node, 'arrival.road', 'nothing moved');
});

test('the script reports the state a tool needs', async () => {
  const result = await play(house(), { seed: 5, script: ['1'], quiet: true });
  assert.ok(result.choices.every((c) => typeof c.key === 'number' && c.label));
  assert.ok('fear' in result.stats);
  assert.ok(Array.isArray(result.inventory));
  assert.equal(typeof result.rolls, 'number');
});

/** Fängt ab, was `play` in das Terminal schreibt. */
async function gedruckt(options) {
  const schrieb = stdout.write;
  const stuecke = [];
  stdout.write = (text) => { stuecke.push(text); return true; };
  try {
    await play(options.story, { seed: 1, script: [], ...options });
  } finally {
    stdout.write = schrieb;
  }
  return stuecke.join('');
}

test('der Charakterbogen im Terminal lässt namenlose Werte weg', async () => {
  // SPEC 7: ein Stat ohne `name:` ist intern - er treibt die Geschichte, und
  // kein Leser liest ihn. `view.js` filtert im Browser danach, `play` tat es
  // nicht. Sichtbar wurde es an `examples/intercept`, das 43 importierte
  // Zähler trägt und keinen einzigen Wert, den ein Leser lesen soll.
  const { story } = compile('# A {#a}\n\nText.\n\n-> END\n', {
    frontmatter: '---\ntitle: Test\nstats:\n  mut: { name: Mut, start: 3 }\n  zaehler: { start: 7 }\n---\n',
  });

  const seite = await gedruckt({ story });
  assert.match(seite, /Mut 3/);
  assert.doesNotMatch(seite, /zaehler/, 'der interne Zähler steht nicht auf dem Bogen');

  const fuerWerkzeuge = await play(story, { seed: 1, script: [], quiet: true });
  assert.equal(fuerWerkzeuge.stats.zaehler, 7, 'ein Werkzeug bekommt ihn weiterhin');
});

test('ein Buch ohne einen einzigen benannten Wert bekommt keine leere Bogenzeile', async () => {
  // Das minimale Frontmatter der Testhelfer trägt nur `gold: { start: 1 }`,
  // also ohne `name:`. Ein Filter allein liefe hier auf eine Zeile aus
  // Leerzeichen hinaus, und die sieht im Terminal wie ein Darstellungsfehler
  // aus.
  const { story } = compile('# A {#a}\n\nText.\n\n-> END\n');
  const seite = await gedruckt({ story });
  assert.doesNotMatch(seite, /\n\n\n/, 'keine Leerzeile, wo der Bogen stünde');
  assert.doesNotMatch(seite, /gold/);
});

test('simulate finds every ending and no dead end', () => {
  const report = simulate(house(), { runs: 100 });
  assert.equal(report.deadEnds.length, 0);
  assert.equal(report.unfinished, 0);
  assert.ok(Object.keys(report.endings).length >= 2);
  assert.ok(report.averageSteps > 1);
});

test('simulate --coverage meldet, was nie auf der Seite stand', () => {
  // `endings` beantwortet nicht, ob jemand alles zu sehen bekommt: ein Buch
  // kann jedes Ende erreichen und trotzdem Absaetze tragen, die keine Partie
  // je zeigt. Die zweite Wahl hier steht hinter einer Bedingung, die nichts
  // je wahr macht.
  const { story } = compile(`# A {#a}

+ [Weiter](#b)
+ {gold > 99} [Der teure Weg](#b)

# B {#b}

-> END
`);
  const r = simulate(story, { runs: 20, coverage: true });
  assert.equal(r.coverage.choices, 2);
  assert.equal(r.coverage.seen, 1);
  assert.deepEqual(r.coverage.unseen.map((u) => u.label), ['Der teure Weg']);
  assert.equal(r.coverage.unseen[0].conditional, true);
});

test('ohne --coverage lenkt nichts den Leser, damit die Enden vergleichbar bleiben', () => {
  // Die Abdeckungsmessung bevorzugt ueber Partien hinweg das Ungesehene. Das
  // verschiebt die Verteilung der Enden, an der ein Buch ausbalanciert wird,
  // also bleibt es aus, solange niemand danach fragt.
  const buch = house();
  assert.deepEqual(simulate(buch, { runs: 30 }).endings,
    simulate(buch, { runs: 30 }).endings);
  assert.equal(simulate(buch, { runs: 30 }).coverage, undefined);
});
