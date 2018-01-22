[![Gymnasium Logo](https://cdn.rawgit.com/gymnasium/gymnasium.github.io/master/assets/GYM-logo.svg)](http://thegymnasium.com)

# static-site-content
This repo serves as cms for some of the static content on our Open EdX site.  Content is stored as raw HTML, and included serverside, inline with pages on the site as needed.

## Contents
- `upcoming-courses.html` Right hand column content for the [courses page](https://thegymnasium.com/courses).
- `nps-survey` NPS survey for courses . Directory includes: `nps-survey.html` (HTML snippet) that references external CSS `nps-survey.css` and JS _(courtesy of [Survey Monkey](https://www.surveymonkey.com))_.
- `raw-html-css` External stylesheet to override inherited Raw HTML XBlock styles: `<link rel="stylesheet" href="https://gymnasium.github.io/static-site-content/raw-html-css/raw-html.css">`. Directory includes: `raw-html.css` with sample markup `raw-html.html`.
- `faq.html` static page content to appear on [faq page](https://thegymnasium.com/faq).
- `about.html` static page content to appear on [about page](https://thegymnasium.com/about).
- `static-pages-sidebar-content.html` appears on the right hand side of faq/about pages on thegymnasium.com.
- `privacy-policy.html` content which appears on the [privacy policy](https://thegymnasium.com/privacy) page on thegymnasium.com.
- `final-exam-modal.html` content which appears when the exam score is calculated.
