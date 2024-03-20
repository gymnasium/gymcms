[![Gymnasium Logo](https://cdn.rawgit.com/gymnasium/gymnasium.github.io/master/assets/GYM-logo.svg)](https://thegymnasium.com)

# GYM CMS Static Site Content

This repo serves as CMS for some of the static content on our Open EdX site. Content is stored as raw HTML, and included serverside, inline with pages on the site as needed.

[![Netlify Status](https://api.netlify.com/api/v1/badges/897026f2-f0c0-43fa-a6d4-3bf1d3eefc2d/deploy-status)](https://app.netlify.com/sites/gymcms/deploys)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v1.4%20adopted-ff69b4.svg)](./CODE_OF_CONDUCT.md)

## Getting started

1. Clone this repo
2. Build the Docker image [^1]
   - run `docker build -t jekyll-serve .`
3. Start Jekyll
     - Either:
        - run `docker compose up` 
        - _or_ run `docker run -p 4000:4000 -v $(pwd):/site jekyll-serve`
4. Get busy making beautiful things!

### Notes

1. The resulting Docker image is configured specifically for local development of this repo. 
2. Special thanks to Bret Fisher for his [workaround](https://github.com/BretFisher/jekyll-serve) to address issues with the official Jekyll images  that are ostensibly unmaintained.


## Static Content Site Map
- [http://localhost:4000/sitemap](http://localhost:4000/sitemap)



[^1]: You don't need to build the Docker image _every_ time you work. However  rebuilding assures that the gems are current.
