#!/bin/bash
set -e

if [ ! -f Gemfile ]; then
  echo "NOTE: No Gemfile found! Is this even a Jekyll site?"
  exit 1
fi

bundle install --retry 5 --jobs 20

exec "$@"
