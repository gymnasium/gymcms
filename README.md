[![Gymnasium Logo](https://cdn.rawgit.com/gymnasium/gymnasium.github.io/master/assets/GYM-logo.svg)](https://thegymnasium.com)

# GYM CMS Static Site Content

This repo serves as CMS for some of the static content on our Open EdX site. Content is stored as raw HTML, and included serverside, inline with pages on the site as needed.

[![Netlify Status](https://api.netlify.com/api/v1/badges/897026f2-f0c0-43fa-a6d4-3bf1d3eefc2d/deploy-status)](https://app.netlify.com/sites/gymcms/deploys)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](./CODE_OF_CONDUCT.md)

## Getting started

1. Build the Docker image
 - `docker build -t jekyll . --no-cache`
2. Start Jekyll
 - `docker compose up --force-recreate`

## Static Content Site Map
- [http://localhost:4000/sitemap](http://localhost:4000/sitemap)
