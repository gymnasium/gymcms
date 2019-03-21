[![Gymnasium Logo](https://cdn.rawgit.com/gymnasium/gymnasium.github.io/master/assets/GYM-logo.svg)](http://thegymnasium.com)

# static-site-content
This repo serves as cms for some of the static content on our Open EdX site.  Content is stored as raw HTML, and included serverside, inline with pages on the site as needed.

[![Netlify Status](https://api.netlify.com/api/v1/badges/897026f2-f0c0-43fa-a6d4-3bf1d3eefc2d/deploy-status)](https://app.netlify.com/sites/gymcms/deploys)

## Contents
- `upcoming-courses.html` Right hand column content for the [courses page](https://thegymnasium.com/courses).
- `nps-survey` NPS survey for courses . Directory includes: `nps-survey.html` (HTML snippet) that references external CSS `nps-survey.css` and JS _(courtesy of [Survey Monkey](https://www.surveymonkey.com))_.
- `raw-html-css` External stylesheet to override inherited Raw HTML XBlock styles: `<link rel="stylesheet" href="https://gymnasium.github.io/static-site-content/raw-html-css/raw-html.css">`. Directory includes: `raw-html.css` with sample markup `raw-html.html`.
- `faq.html` static page content to appear on [faq page](https://thegymnasium.com/faq).
- `about.html` static page content to appear on [about page](https://thegymnasium.com/about).
- `static-pages-sidebar-content.html` appears on the right hand side of faq/about pages on thegymnasium.com.
- `privacy-policy.html` content which appears on the [privacy policy](https://thegymnasium.com/privacy) page on thegymnasium.com.
- `final-exam-modal.html` content which appears when the exam score is calculated.


### Courses Page
- `courses/full-courses-description.html` is shown on the `/courses` page as the title and description used for the full courses subheader
- `courses/gym-shorts-description.html` is shown on the `/courses` page as the title and description used for the Gym Shorts subheader
