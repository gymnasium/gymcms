---
---
{%comment%}
Here, we are combining all of our JS files to reduce requests
TODO: audit these to figure out which we need to load, and where. For example, the prism.js file is only used on quiz/exam pages. Maybe we create an auth.js file, which loads the resources needed for logged in users? Alternately, we pass that file back to the theme.
{%endcomment%}

{% include js/gymnasium.js %}
{%comment%}
  Temporarily commented out (until we update the theme)
  {% include js/vendor/openedx/header.js %}
{%endcomment%}
{% include js/vendor/bootstrap.min.js %}
{% include js/vendor/jquery.validate.min.js %}
{%comment%}
  Temporarily commented out (until we update the theme)
  {% include js/vendor/openedx/navigation.js %}
{%endcomment%}
{% include js/jobs.js %}
{% include_relative vendor/prism.min.js %}
