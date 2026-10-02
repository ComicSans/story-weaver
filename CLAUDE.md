# Story Weaver

Ein Spielbuchformat in Markdown mit ink-Semantik und einer RPG-Schicht im Stil
der Spielbücher der 80er. `SPEC.md` ist die Sprachdefinition und entscheidet;
der Code folgt ihr, nicht umgekehrt. Weicht der Code ab, ist entweder die Spec
zu ändern oder der Code, aber nie stillschweigend nur eines von beidem.

## Arbeiten in diesem Projekt

```bash
node --test 'test/*.test.js'
node src/cli.js lint examples/thornwood-book/book.yaml --strict
node src/cli.js lint examples/house/book.yaml --strict
node src/cli.js lint examples/nightside/book.yaml --strict
node src/cli.js lint examples/leuchtturm/book.yaml --strict
node src/cli.js lint examples/brueder-dunklen-rufes/book.yaml --strict
node src/cli.js export examples/thornwood-book/book.yaml --out build/play.html
node src/cli.js bundle examples/thornwood-book/book.yaml --out build/native
```

- Keine Abhängigkeiten, kein Build-Schritt, Node 20 oder neuer. Was Node nicht
  mitbringt, wird geschrieben statt installiert (siehe `src/yaml.js`).
- Jede Quelldatei trägt den MPL-2.0-Header. Neue Datei, neuer Header.
- Fehler tragen einen Code aus SPEC 18.3, Warnungen einen aus SPEC 19. Ein
  neuer Prüffall braucht einen Code, einen Eintrag in der Spec und einen Test.
- Die fünf geschriebenen Beispiele müssen `--strict` sauber bleiben; sie sind
  der Abnahmetest. `thornwood-book` und `house` decken die Grundschicht ab,
  `nightside` die 0.7-Schicht aus Fakten, Ereignissen, Orten und Host-Zeit,
  `leuchtturm` die 0.8-Schicht: ein Bild, ein `holds:`-Fakt, `due` und ein
  Einstieg für eine App, die das Buch als Episode spielt.
  `brueder-dunklen-rufes` deckt den gewöhnlichen Fall in voller Länge ab: 69
  Knoten, zwei Kämpfe, eine Verfolgungsschleife, keine Fakten, keine
  Ereignisse, keine Orte - und als einziges Beispiel nur eine Sprache. Das
  Abenteuer ist nach Folge 47 des Podcasts Over the Hills nacherzählt; der
  Quellenhinweis steht im Kopf seiner `book.yaml` und gehört dorthin, nicht
  in eine Fußnote.
- `test/fixtures/thornwood.md` ist kein Beispiel, sondern eine eingefrorene
  Fixture: dieselbe Geschichte als eine einzelne Datei mit Frontmatter, weil
  `test/names.test.js` eine Quelle braucht, in der es per `replace()` Fehler
  einbauen kann. Sie stand bis zum 15.08.2026 als `examples/thornwood.md` im
  Regal und ist dort gelöscht, weil sie dieselbe Geschichte doppelt erzählte.
- Deutsche Texte mit echten Umlauten, auch in Beispielen und Commit-Nachrichten.

## Abweichungen von den Workspace-Standards

**Keine lokalen CI-Hooks.** Die zentrale local-CI ist auf Xcode ausgelegt:
Stage 1 ist der SwiftLint-Gate, Stage 2 baut und testet über den
simulator-broker. Hier gibt es kein Xcode-Target, sondern ein SwiftPM-Package
ohne App-Hülle, und ein Hook, der nichts prüft, ist schlechter als keiner, weil
er Grün meldet. Der Abnahmetest ist deshalb von Hand vor jedem Commit:

```bash
node --test 'test/*.test.js'
node src/cli.js lint examples/thornwood-book/book.yaml --strict   # und house, nightside, leuchtturm, brueder-dunklen-rufes
cd hosts/ios && swift test
cd hosts/ios && xcrun swiftc -typecheck -sdk "$(xcrun --sdk iphonesimulator --show-sdk-path)" \
  -target arm64-apple-ios16.0-simulator Sources/StoryWeaver/*.swift
```

Der letzte Befehl ist kein Build, sondern eine Typprüfung: `swift test` läuft auf
macOS und kompiliert alles hinter `#if canImport(UIKit)` nie. Genau dort saß ein
Fehler - `AccessibilityNotification` gibt es erst ab iOS 17, das Package sagt 16.
Ein echter Build gehört nicht in diese Liste: er braucht ein Xcode-Projekt, und
das hat nur `hosts/demo/`.

Entschieden mit Tobias am 11.08.2026, um den iOS-Host erweitert am 14.08.2026.

**Die Demo baut und installiert der `simulator-broker`, nie `xcodebuild`.** Das
Xcode-Projekt ist nicht eingecheckt, also steht `xcodegen` davor; die Bücher
kompiliert ein Pre-Build-Schritt aus `examples/`, sodass jeder Bau die aktuellen
Fassungen mitnimmt:

```bash
cd hosts/demo && xcodegen generate
```

Danach über die Broker-Werkzeuge: `sim_acquire` auf `build` und das Gerät
(`device:iphone` für den Simulator, `device:hw-iphone` für iPhone Tobias), dann
`sim_build` und `sim_install` mit `project: hosts/demo`, `scheme:
StoryWeaverDemo` und `target: simulator` oder `hardware` - `device:` heißt dort
in beiden Fällen `iphone`. Am Ende `sim_release`. Screenshots gibt es nur vom
Simulator; auf dem Gerät ist der Rückgabewert von `sim_install` der Beleg.
Signiert wird automatisch gegen Team `9DNN6V58J9`; scheitert das, ist es eine
Sache des Developer-Portals und nicht der Projektdatei.

Am 15.08.2026 so auf iPhone Tobias installiert.

**Der iOS-Host lebt in `hosts/ios/`.** Entschieden mit Tobias am 14.08.2026,
gegen ein eigenes Repo: Protokoll und Host ändern sich im selben Commit. Damit
gilt hier nicht mehr "kein Swift im Projekt", und zwei Annahmen ziehe ich
daraus, bis Tobias widerspricht:

- **SwiftLint bleibt aus.** Der Workspace-Standard führt ihn als Stage 1 der
  local-CI, und die läuft hier nicht. Ein Package ohne Xcode-Target hat kein
  Schema, das sie aufrufen könnte.
- **Der iOS-Simulator ist nicht Teil des Abnahmetests.** `swift test` läuft auf
  macOS gegen dasselbe JavaScriptCore und beweist, was hier zu beweisen ist:
  dass die Runtime in JSC dieselbe Geschichte spielt wie in Node. Die
  Typprüfung oben schließt die Lücke, die das lässt. Ein echter Bau für
  Simulator oder Gerät läuft über `hosts/demo/` und den `simulator-broker`
  (siehe oben), nicht über dieses Package: dem Broker genügt ein
  SwiftPM-Package nicht, er braucht ein Xcode-Projekt.

**`examples/intercept/` ist importiert, nicht geschrieben.** Es entsteht aus
`story-weaver import` über inkles ink-Quelle von *The Intercept* und trägt deren
MIT-Vermerk in der `book.yaml` statt des MPL-Headers - fremder Text bleibt unter
fremder Lizenz. Es ist als einziges Beispiel nicht `--strict` sauber: L012 meldet
wiederholte Wahltexte, die im Original so stehen. Geprüft wird es mit `lint` ohne
`--strict` und mit `simulate`. Wer den englischen Text ändern will, ändert den
Importer und importiert neu; der Import schreibt eine Einzeldatei, deren
Frontmatter danach wieder in die `book.yaml` gehoben wird.

Englisch ist die Standardsprache und bleibt der importierte Wortlaut. Am
15.08.2026 hat Tobias eine deutsche Fassung angeordnet, gegen die Entscheidung
vom 12.08.2026; sie liegt als Katalog in `de/` und kann die Struktur nicht
anfassen, also bleibt der Nachweis, was er war.

Eine Abweichung vom Original gibt es: Gedankenstriche jeder Breite werden beim
Import zum einfachen Bindestrich. Das Original setzt sie auch mitten im Wort
("gun-metal"), und die Beispiele hier kennen nur den Bindestrich. Der Importer
macht das selbst und meldet die Anzahl, damit ein Neuimport dieselbe Datei
ergibt.

**Die VS-Code-Erweiterung liegt in `tools/vscode/`.** Installiert wird sie
über `node tools/vscode/pack.mjs` und `code --install-extension`; ein Symlink
nach `~/.vscode/extensions` genügt seit VS Code 1.74 nicht mehr, der Ordner
wird nicht mehr gescannt. `pack.mjs` schreibt die .vsix selbst - ein Zip mit
Manifest -, damit `vsce` und ein Paketmanager draußen bleiben. Im Paket liegt
`vendor/src` als Kopie; ein Checkout über der Erweiterung gewinnt darüber
(`sourceDir`), sodass hier eine Änderung an `src/` sofort im Panel wirkt. `extension.js` ist CommonJS, weil VS Code `main` mit `require`
lädt; alles ohne `vscode`-API steht in `book.mjs` und `document.mjs` und wird
von `test/vscode.test.js` mitgeprüft. Der Abnahmetest für die Erweiterung ist
`node --test` plus F5 von Hand - ein Editor lässt sich hier nicht skripten.
Angenommen am 15.08.2026, bis Tobias widerspricht.

**Keine swift-contracts.** Sie prüfen Regeln für App-Code; `hosts/ios/` ist ein
Package aus einer Bridge und einer Ansicht, kein App-Target.

`tokensave` ist eingerichtet und indiziert nach jedem Commit über den globalen
post-commit-Hook.

**Kein Produktmanager, kein Reviewer-Agent als Pflicht.** `collab.default-agents`
gilt hier nicht: eine einzelne Session reicht für die gesamte Arbeit, ohne
Anmeldung bei einem Produktmanager- oder Reviewer-Agenten und ohne dessen
Verdikt vor einem Commit. Entschieden mit Tobias am 24.08.2026, ebenso für
website (tobiasreithmeier.de). Andere Teile der Workspace-Standards -
etwa `learning.review-before-done` - gelten unverändert weiter.

<!-- msc:standards:start -->

## Workspace standards

Generated from `standards.json` (mcp-server) - change it there and reinstall,
never inside the markers. `project_standards` serves the incident behind a rule
(`rule: "<id>"`, ask before weakening one) and the setup rules not printed here;
they bind the same.

### Working with the user

- **Be critical, and say so in one sentence** - Name contradictions, mistakes and missing information in one sentence rather than working around them, and say what nobody has thought to ask yet. Never guess: ask while Tobias is reachable, decide autonomously offline and present the assumption later. `collab.not-a-yes-man`
- **Finish the task, ask only when genuinely stuck** - What the task covers and how an instruction is meant is settled before the work starts, not in the middle of it: unclear scope or an instruction open to more than one reading is asked about up front, in one bundled question. From then on the task is carried to the end in one pass. Everything that does not depend on an open point is finished first, routine judgement calls are made rather than handed back, and an ambiguity that a stated assumption can carry is carried with that assumption named in the reply. A question that stops the running work is only justified when no assumption would keep the result safe or useful. A part that is genuinely blocked does not stop the rest: finish everything around it, then name what was left out and why. This is the timing of `collab.not-a-yes-man`, not an exception to it: what is unclear is still never guessed silently - it is asked at the start or carried as a named assumption. `collab.finish-the-job`
- **Hand subtasks to a fitting agent, and review the code they return** - A subtask that a specialised agent covers is handed to that agent instead of being done in the main session - search and exploration, planning, review, and any skill written for the domain. Code that comes back from an agent is reviewed before it is used or reported, in fresh context and against the task it was given; the exemption for trivial edits in `learning.review-before-done` does not apply to agent output. What the review finds is fixed or handed back, never adopted unread. `collab.delegate-and-review`
- **Assume several sessions run in the same workspace** - Never assume a clean working tree or exclusive access to a device, a build or a file. Be frugal with memory and compute. `collab.parallel-sessions`
- **Neutral, gender-inclusive language and accessibility throughout** - Gender-inclusive wording and accessibility are requirements in every change, not a later pass. `collab.language`
- **Match the model to the job** - Agents run on Opus or Sonnet, whichever does the work reliably, and text deliverables - store texts, documentation, marketing copy - are written by Fable. An advisor always uses the stronger model available - Fable or Opus. `collab.models`

### Learning from mistakes and successes

- **Every mistake goes into the project's MISTAKES.md** - A mistake that cost time - a wrong assumption, a broken build, a fix that made it worse, a rejected approach - is written to `MISTAKES.md` at the project root before the task is reported as done, as one entry with date, what happened, what triggered it and what solved it. One entry per mistake, newest on top, no entry without a trigger and a solution. `learning.mistakes-log`
- **MISTAKES.md is read before the work, not after** - Read the project's `MISTAKES.md` before planning or changing anything in that project and treat its entries as binding as this block. An entry that turns out wrong or obsolete is corrected or deleted with a note, never left to rot. `learning.mistakes-read`
- **A way of working that paid off goes into SUCCESSES.md** - `SUCCESSES.md` at the project root is the positive counterpart to `MISTAKES.md`: an approach, a tool call or a sequence that saved time or beat the previous solution is written there before the task is reported as done, as one entry with date, what was done, what it replaced and what it saved. Same format as the error log - one `###` entry, newest on top - and the same standing: read before the work, because the session start hook prints its titles too. Only what a later session can reuse belongs there; a one-off result is not a way of working. `learning.successes-log`
- **SUCCESSES.md stays lean** - An entry that a later one supersedes, contradicts or would have been written differently is deleted, not stacked on top of. Whoever writes a new entry checks the file for what it replaces and removes that in the same commit. The file is a working set, not a history - the history is in the Git log. `learning.successes-lean`
- **A change is reviewed in fresh context before it counts as done** - Before a non-trivial change is reported as done, a reviewer with fresh context - a subagent or the bundled /code-review - checks the diff against the task, and only gaps that affect correctness or the stated requirements block; style findings are optional. Trivial edits that one sentence fully describes are exempt. `learning.review-before-done`

### Git

- **Work happens on `main`** - No feature branches. Commit to `main` directly, in small steps that keep it green. `git.trunk`
- **Commit only your own files** - Rebase before pushing, never force-push `main`. Stage by name - `git add <path>`, never `git add -A`, never `git add .`, never `git commit -a`. What you did not change is not yours to commit. `git.parallel`
- **Never point a git command at the whole tree** - `git reset`, `git checkout -- .`, `git stash` without paths, `git clean` and `git restore .` hit every session working in that checkout, not just yours. Name paths, or do not run it. Needing a clean tree for a measurement is not an exception - use `git worktree add` and measure there. `git.no-sweeping-commands`
- **In a shared tree, commit as soon as it is green** - Do not carry a large uncommitted change set through a long measurement or a wait. Commit the part that builds and passes, keep working from there. A commit is cheap to revert; uncommitted work in a shared checkout is a bet on nobody else touching it. `git.commit-when-green`

### Tooling

- **Code exploration goes through tokensave** - Its MCP tools, not file reads and not Explore agents; a PreToolUse hook enforces this. `tooling.tokensave`
- **iOS builds, tests, simulators and devices go through `simulator-broker`** - Never `xcodebuild`, `simctl` or `devicectl` directly - scripts and physical devices go through `simulator-broker/src/cli.mjs run --project <name> -- <command>`, and stage 2 of the local CI calls `simulator-broker test` or `build` the same way. The single exemption is input and orientation - taps, swipes, text entry, rotation - through the editor's simulator tools while holding a broker lease for that device; building, installing, launching, screenshots and test runs stay the broker's. `tooling.builds`
- **Throwaway work goes in the session scratchpad, named so housekeeping finds it** - Working copies, build output and coverage runs go in the session scratchpad, never in a repository or loose in `/tmp`; name build output `build/`, `Build/` or `DerivedData/`. `tooling.scratch`
- **Task state lives in Storybloq** - Never in `todo.md` or another markdown file. Writing a read-only export is fine; reading state back out of it is not. `tooling.state`
- **Questions for Tobias go straight to him** - Ask in the chat, set apart at the start of the message, and repeat it until he answers. Never park a decision in a backlog. `tooling.entscheidungen-tobias`
- **Writing agents get their own worktree while a run needs a stable tree** - A build or test run reads the working tree for minutes; an agent editing during that window makes the result meaningless. Give concurrently writing agents `isolation: "worktree"`, then apply their diffs with `git apply -3` once the run is done. Only bundle agents into the shared tree when nothing is measuring. `tooling.worktree-for-parallel-writes`
- **Announce anything that reaches another session before you do it** - Check who else is running (`ListAgents`) and send a message (`SendMessage`) naming the files, the window and the concrete effect before you take a device or build lease for longer than a few minutes, start a run that needs a stable tree, edit or delete files another session may hold, touch shared state such as `standards.json`, `CLAUDE.md`, `.mcp.json`, branch or queue state, delete artifacts, result bundles or DerivedData, or restart a server. Wait for an objection where one would change what you do. `tooling.announce-before-impact`
- **Say it to the other session, not only about it** - When you find that another session broke something, damaged your work or is about to, send it a `SendMessage` message naming the files, the rule and the concrete next step - and claim your files in the same breath. A finding that only reaches the human arrives after the next collision. `tooling.tell-the-other-session`
- **An unattended run gets a hard done-gate, per run** - A run that is meant to finish without Tobias watching carries a check the harness enforces - a /goal condition or a Stop hook that runs the project's verification - set for that run, never installed globally. Without such a gate, "looks done" is the stop signal and every miss waits for a human. `tooling.unattended-gate`

<!-- msc:standards:end -->
