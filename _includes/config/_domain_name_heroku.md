{%- comment -%}
This include generates the `domain_name_heroku` variable
Example usage:
  {%- include config/_domain_name_heroku.md -%}
{%- endcomment -%}
{%- assign domain_name = "https://gym-jobs-microservice-staging.herokuapp.com" -%}
{%- case jekyll.environment -%}
  {%- when "production" -%}
    {%- assign domain_name = "https://gym-jobs-microservice-prod.herokuapp.com" -%}
{%- endcase -%}
