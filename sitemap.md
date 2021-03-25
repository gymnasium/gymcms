---
title: Sitemap
layout: default
---
# Site Map
{% for page in site.pages %}{% if page.exclude != true %}
  * [{{site.canonical_domain}}{{site.baseurl}}{{ page.url }}]({{ page.url }})
{% endif %}{% endfor %}
