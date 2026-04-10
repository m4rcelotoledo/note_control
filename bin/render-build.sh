#!/usr/bin/env bash
# Render native runtime: do not use apt-get here (read-only filesystem for package manager).
set -e

corepack enable
corepack prepare yarn@4.13.0 --activate

gem cleanup psych 2>/dev/null || true

BUNDLE_JOBS=1 bundle install

yarn install --immutable
yarn build
yarn build:css

RAILS_ENV=production bundle exec rails assets:precompile
RAILS_ENV=production bundle exec rails db:migrate || true
