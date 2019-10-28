# Take 5 Authoring

To create a new Take 5 tutorial, several files and assets need to be created and placed in specific directories in the gymcms repository.

## Authoring Steps

1. Create the tutorial data file in `_data/take5/`
2. Create the stub files in `take5/` and `take5/meta/`
3. Add image assets to `img/take5/posters/` and `img/take5/og/`

---

## 1. Create the Tutorial Data File

This YAML file defines the key paramters for a Take 5.

- `_data/take5/GYM-5000.yml`

<details>
<summary>View Annotated Sample</summary>

```yaml
---
course_ID: GYM-5001                         # Unique course ID
title: "Making a CSS Parallax Effect"       # MUST be quoted
date: 2019-10-28T00:00:00-04:00             # Publish date — MUST be in this format
course_type: take5                          # This is required
url: /static/take5/GYM-5001/                # Only change the course ID!
poster_art: /img/take5/posters/gym-5001.jpg # Path to poster image (may be deprecated)
live: true                                  # Only set to live when ready to publish!
instructor: "Jeremy Osborn"                 # MUST be quoted
topic: "Web Design & Development"           # MUST be quoted
video_ID: zRNUPU2dujU                       # YouTube video ID
video_duration: "4:59"                      # Must be quoted
featured: true                              # Toggle for display in catalog and hero
short_description: "Learn how to create a scrolling background effect using CSS in this hands-on tutorial with Jeremy Osborn, Academic Director of Aquent Gymnasium."
project_file_source: Codepen                # Required if there are project files
project_files:
- label: "Starting Project"
  url: "https://codepen.io/josborn/pen/BebXer"
- label: "Completed Project"
  url: "https://codepen.io/josborn/pen/joNmyO"
related_content:
- label: "Can I Use: Background Attachment"
  url: "https://caniuse.com/#feat=background-attachment"
- label: "Stack Overflow: Background size on iOS"
  url: "https://stackoverflow.com/questions/21476380/background-size-on-ios"
- label: "MDN web docs: Viewport concepts"
  url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts"
---

```
</details>

### About Project Files

- Project files _must_ have a file source specified (e.g. Codepen)
- Each project file has a label (the link text) and a URL
- Links to pages (like Codepen) open in a new browser window/tab
- Links to zip files (like on GitHub) download without creating a new window/tab
- There is no limit to the number of Project Files

Example Usage:

```yaml
project_file_source: Codepen
project_files:
- label: "Starting Project"
  url: "https://codepen.io/josborn/pen/BebXer"
- label: "Completed Project"
  url: "https://codepen.io/josborn/pen/joNmyO"
```

```yaml
project_file_source: GitHub
project_files:
- label: "Lesson Files"
  url: "https://gymnasium.github.io/take5/gym-5011.zip"
```

### About Related Content

- Each in the Related Content list has a label (the link text) and a URL
- Links to items hosted on Gymnasium open the same browser window
- Links to items outside of the Gymnasium open in a new window/tab
- There is no limit to the number of Related Content items

Example Usage:

```yaml
related_content:
- label: "Can I Use: Background Attachment"
  url: "https://caniuse.com/#feat=background-attachment"
- label: "Stack Overflow: Background size on iOS"
  url: "https://stackoverflow.com/questions/21476380/background-size-on-ios"
```

## 2. Create the Stub Files

Stub files are additional files that Jekyll uses to generate the tutorial page as well as the partial header include with specific meta tags.

### Take 5 Page

- `take5/gym-5000.md`

The Take 5 stub page contains frontmatter and the full text from the video transcript as `{{ content }}`

```yaml
---
layout: take5-raw
course_ID: GYM-5001
permalink: /static/take5/gym-5001
---

In today’s Take 5, you’re going to make a scrolling background image effect [as seen here](https://codepen.io/josborn/pen/joNmyO){: target="_blank" rel="noopener"}. This effect is similar to the parallax effect that can be found on many places across the web, such as this one.
```

### Take 5 Meta Include

- `take5/meta/gym-5000-meta.md`

The meta include stub file only contains frontmatter.

```yaml
---
layout: take5-meta                              # Important!
course_ID: GYM-5001
permalink: /static/take5/meta/gym-5001-meta/    # Pay attention: Lots of "metas"
---
```

## 3. Add Image Assets

### OG Image

- `img/take5/og/gym-5000-og.png`
<details>
<summary>View Sample</summary>

![img/take5/og/gym-5001-og.png](img/take5/og/gym-5001-og.png)
</details>

### Video Poster Image

- `img/take5/posters/gym-5000.jpg`
  - This is the poster frame image that is used in the following contexts:
    - Featured tutorial on the Take 5 catalog page
    - Thumbnails for other "Recent" Take 5s on the Take 5 catalog page
    - Thumbnails for related Take 5s in the recommended content module on Take 5 tutorial "detail" pages
    - Thumbnails in the Gymnasium (all courses) catalog page module for Take 5 tutorials

<details>
<summary>View Sample</summary>

![img/take5/posters/gym-5001.png](img/take5/posters/gym-5001.jpg)
</details>

### Hero Poster Image

- `img/take5/posters/gym-5000-hero.jpg`
  - This is the hero-sized version of the video poster image that is used when the specific tutorial is featured in the homepage hero component

<details>
<summary>View Sample</summary>

![img/take5/posters/gym-5001-hero.png](img/take5/posters/gym-5001-hero.jpg)
</details>
