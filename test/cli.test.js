/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 *
 * Copyright 2026 Tobias Reithmeier
 */

import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const cli = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'cli.js');
const run = (...args) => spawnSync(process.execPath, [cli, ...args], { encoding: 'utf8' });

test('--help after a command prints the usage instead of compiling a file called --help', () => {
  const r = run('simulate', '--help');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /^usage:/);
  assert.equal(r.stderr, '');
});

test('mcp --help prints the usage instead of starting the server', () => {
  const r = run('mcp', '--help');
  assert.equal(r.status, 0);
  assert.match(r.stdout, /^usage:/);
});

test('the usage names every command, import included', () => {
  const r = run('--help');
  for (const command of ['build', 'lint', 'export', 'bundle', 'play', 'simulate', 'import', 'mcp']) {
    assert.match(r.stdout, new RegExp(`story-weaver ${command}\\b`));
  }
});

test('a command without an entry is a usage error', () => {
  assert.equal(run('lint').status, 1);
});
