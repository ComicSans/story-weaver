/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright 2026 Tobias Reithmeier
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { compile, expectError, firstBody, nodesOf } from './helpers.js';

test('a choice splits into button, follow-on text and target', () => {
  const ops = firstBody('# A {#a}\n\n* [Open the door](#a) You press the latch.\n');
  const [choice] = ops[0].items;
  assert.equal(choice.sticky, undefined);   // once-only is the default, so it is not emitted
  assert.deepEqual(choice.label, ['Open the door']);
  assert.equal(choice.target, 'a');
  assert.deepEqual(choice.body[0].parts, ['You press the latch.']);
});

test('an empty link means stay here and fall through to the gather', () => {
  const ops = firstBody('# A {#a}\n\n* [Ask]() He nods.\n  * [Again]() Silence.\n  ---\n  You leave.\n-> END\n');
  const [outer] = ops[0].items;
  assert.equal(outer.target, undefined);
  assert.equal(outer.body[1].op, 'choices');
  // The gather belongs to the nested run, so its prose follows inside the
  // outer choice's body rather than in the node's container.
  assert.equal(outer.body[2].op, 'text');
  assert.deepEqual(outer.body[2].parts, ['You leave.']);
  assert.equal(ops[1].op, 'divert');
});

test('a choice without a link is an error', () => {
  expectError('# A {#a}\n\n* Just text\n', 'E100');
});

test('nesting stops at three levels', () => {
  expectError([
    '# A {#a}', '',
    '* [1]()',
    '  * [2]()',
    '    * [3]()',
    '      * [4](#a)',
  ].join('\n'), 'E121');
});

test('conditions, alternatives and prints parse into inline parts', () => {
  const ops = firstBody('# A {#a}\n\n{&Krachen|Stille} und {gold} Gold, {has("x"): ja|nein}.\n-> END\n');
  const parts = ops[0].parts;
  assert.equal(parts[0].t, 'alt');
  assert.equal(parts[0].kind, 'cycle');
  assert.equal(parts[2].t, 'print');
  assert.equal(parts[4].t, 'cond');
});

test('a paragraph runs to the next blank line', () => {
  const ops = firstBody([
    '# A {#a}', '',
    'Erste Zeile,', 'zweite Zeile,', 'dritte Zeile.', '',
    'Ein zweiter Absatz.', '',
    '-> END', '',
  ].join('\n'));

  assert.equal(ops.length, 3);
  assert.deepEqual(ops[0].parts, ['Erste Zeile, zweite Zeile, dritte Zeile.']);
  assert.deepEqual(ops[1].parts, ['Ein zweiter Absatz.']);
});

test('the space after a colon stays when the brace sits against a word', () => {
  // ink keeps it, and the imported Intercept depends on that: "My voice
  // shakes{forceful > 0: with anger|; ...}" read "shakeswith anger".
  const cond = (line) => firstBody(`# A {#a}\n\n${line}\n-> END\n`)[0].parts.find((p) => p.t === 'cond');
  assert.deepEqual(cond('Er zittert{gold > 0: vor Wut|; still}.').then, [' vor Wut']);
  assert.deepEqual(cond('Er zittert{gold > 0: vor Wut|; still}.').else, ['; still']);
  // Against a word, but the arm opens with punctuation of its own.
  assert.deepEqual(cond('So{gold > 0: , und mehr}.').then, [', und mehr']);
  // Not against a word: the space is only formatting.
  assert.deepEqual(cond('"{gold > 0: Bitte|Also}."').then, ['Bitte']);
  assert.deepEqual(cond('Er sagt {gold > 0: ja|nein}.').then, ['ja']);
});

test('a trailing class is lifted off the text', () => {
  const ops = firstBody('# A {#a}\n\nThe letter. {.letter}\n-> END\n');
  assert.equal(ops[0].class, 'letter');
  assert.deepEqual(ops[0].parts, ['The letter. ']);
});

test('branches collect their conditions and an else', () => {
  const ops = firstBody([
    '# A {#a}', '',
    '{ gold >= 10 }', '  Rich.', '  -> END',
    '{ else }', '  Poor.', '  -> END',
  ].join('\n'));
  assert.equal(ops[0].op, 'branch');
  assert.equal(ops[0].branches.length, 1);
  assert.equal(ops[0].else.length, 2);
});

test('a blank line ends a chain of branches, but an else stays with the one above', () => {
  // nightside wrote a visit counter and then, a blank line further down,
  // blocks about the suit and the filter. As one chain the counter always
  // won and the blocks below it never printed; house lost its sleeping
  // cultist on the first visit to the wine cellar the same way.
  const ops = firstBody([
    '# A {#a}', '',
    '{ visits(a) == 1 }', '  First.',
    '{ visits(a) >= 2 }', '  Again.',
    '',
    '{ gold >= 0 }', '  Always.',
    '',
    '{ else }', '  Never.',
    '-> END',
  ].join('\n'));
  assert.deepEqual(ops.map((op) => op.op), ['branch', 'branch', 'divert']);
  assert.equal(ops[0].branches.length, 2);
  assert.ok(!ops[0].else, 'the first chain has no else of its own');
  assert.equal(ops[1].branches.length, 1);
  assert.equal(ops[1].else.length, 1);
});

test('combat exits accept both the plain and the choice form', () => {
  const frontmatter = `---
title: T
stats:
  skill: { start: 1 }
combat:
  attack: "skill + roll(2,6)"
  damage: 2
enemies:
  goblin: { name: Goblin, skill: 5, stamina: 6, flee_after: 3 }
---
`;
  const ops = firstBody([
    '# A {#a}', '',
    '!combat goblin',
    '  win  -> a',
    '  lose -> END',
    '  flee [Run](#a) You drop your shield.',
  ].join('\n'), { frontmatter });
  assert.deepEqual(ops[0].enemies, ['goblin']);
  assert.equal(ops[0].exits.win.target, 'a');
  assert.equal(ops[0].exits.lose.target, 'END');
  assert.deepEqual(ops[0].exits.flee.label, ['Run']);
  assert.equal(ops[0].exits.flee.text[0], 'You drop your shield.');
});

test('a directive body takes exits and nothing else', () => {
  expectError('# A {#a}\n\n!combat goblin\n  Some prose.\n', 'E152');
  expectError('# A {#a}\n\n!combat goblin\n  lose -> END\n', 'E151');
});

test('ids are slugged without dots when a heading declares none', () => {
  const { story } = compile('# The Crypt, Pt. 2\n\n-> END\n');
  assert.ok(Object.keys(nodesOf(story)).includes('the-crypt-pt-2'));
});
