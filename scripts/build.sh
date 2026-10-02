#!/bin/bash
# Einheitlicher Bau-Einstieg (Regel BUILD-SH, social-video T-101): baut das
# Beispielbuch und die iOS-Demo (hosts/demo) ohne Gerät über die
# Lauf-Warteschlange von local-ci (~/GitHub/local-ci/share/xcode-lauf.sh).
# Das Xcode-Projekt entsteht vorher mit xcodegen aus hosts/demo/project.yml.
cd "$(dirname "${BASH_SOURCE[0]}")/.." || exit 64
npm run --silent build:example || exit $?
(cd hosts/demo && xcodegen generate >/dev/null) || { echo "xcodegen generate gescheitert" >&2; exit 69; }
exec "$HOME/GitHub/local-ci/share/xcode-lauf.sh" build --projekt inkle-md \
  --xcodeproj hosts/demo/StoryWeaverDemo.xcodeproj --scheme StoryWeaverDemo "$@"
