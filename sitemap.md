---
title: Sitemap
layout: default
---
# Site Map
Displays all generated pages.

## HTML
{% assign sortedpages = site.html_pages | sort: "url" %}
{% for page in sortedpages %}
  - [{{ page.url }}]({{ page.url }})
{% endfor %}

{% assign sortedpages = site.pages | sort: "url" %}

### CSS
{% for page in sortedpages %}
  {%- if page.url contains "css" %}
  - [{{ page.url }}]({{ page.url }})
  {% endif -%}
{% endfor %}

### JS
{% for page in sortedpages %}
  {% if page.url contains "js" %}
  - [{{ page.url }}]({{ page.url }})
  {% endif %}
{% endfor %}
