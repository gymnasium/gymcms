{%- comment -%}
This include generates the `domain_name` variable
Example usage:
  {% include config/_domain_name.md %}
{%- endcomment -%}
{%- assign domain_name = site.stagurl -%}
{%- case jekyll.environment -%}
  {%- when "production" -%}
    {%- assign domain_name = site.produrl -%}
{%- endcase -%}
