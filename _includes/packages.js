{%- if include.sect == "workbooks" %}
{%- assign docs = site.documents | where: 'variety', 'workbook' -%}
{%- else %}
{%- assign docs = site['pathways'] -%}
{%- endif %}
{%- assign vals = site.data.filter['vals'] %}
{%- assign outer = docs | where_exp: "item", "item.ext == '.md' and item.id != '/specialization'" %}
{%- assign keepid = "" | split: "" %}


{%- assign postpath1 = "" %}
{%- assign subset1 = "" | split: "" %}
{%- for o in outer %}
    {%- assign postslug = o.slug | append: o.ext %}
    {%- capture postpath %}{{ o.path | remove: postslug | remove_first: "specialization/" | remove_first: "_" }}{%- endcapture %}
    {%- unless postpath == postpath1 %}
        {%- assign subset1 = "" | split: "" %}
        {%- assign postpath1 = postpath %}
        {%- assign innersubset = site[o.collection] %}
        {%- for _sets in innersubset %}
            {%- unless _sets.path == mpost.path %}
                {%- assign sslug = _sets.slug | append: _sets.ext %}
                {%- capture setpath %}{{ _sets.path | remove: sslug | remove_first: "specialization/" | remove_first: "_" }}{% endcapture %}
                {%- if postpath contains setpath and _sets.org %}
                    {% assign subset1 = subset1 | push: _sets %}
                {%- endif %}
            {%- endunless %}
        {%- endfor %}
    {%- endunless %}

    {%- assign subset = subset1 | push: o | sort: ordered %}
{
    "ref": "{{ o.id }}",
    "path": "{{ postpath }}",
    {%- for val in vals %}
    {%- assign vset = subset | map: val | uniq | compact %}
    {%- if vset.size > 1 %}
    "{{ val }}": [ " ",
        {%- for v in vset %}"{{ v }}"{%- unless forloop.last %},
        {% endunless -%}{% endfor %}
    ]{%- else %}
    "{{ val }}": [ "{{ vset }}" ]{%- endif %}{%- unless forloop.last %},{% endunless -%}{%- endfor %},
    "keeps": [
        {%- for s in subset %}"{{ s.id }}"{%- unless forloop.last %},
        {% endunless -%}
        {%- endfor %}
    ]
}{%- unless forloop.last %},
{% endunless -%}{% endfor %}
