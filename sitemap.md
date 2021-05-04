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

### CSS/CSS Maps
{% for page in sortedpages %}
  {%- if page.url contains "css" %}
  - [{{ page.url }}]({{ page.url }})
  {% endif -%}
{% endfor %}

### JS/JSON
{% for page in sortedpages %}
  {% if page.url contains "js" %}
  - [{{ page.url }}]({{ page.url }})
  {% endif %}
{% endfor %}
