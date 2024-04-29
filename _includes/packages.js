{%- if include.sect == "workbooks" %}
{%- assign docs = site.documents | where: 'variety', 'workbook' -%}
{%- else %}
{%- assign docs = site['pathways'] -%}
{%- endif %}
{%- assign vals = site.data.filter['vals'] %}
{%- assign subdocs = docs | where_exp: "item", "item.ext == '.md' and item.id != '/specialization'" %}

    {%- for p in subdocs %}{
        "ref": "{{ p.id }}",
        {%- assign postslug = p.slug | append: p.ext %}
        {%- capture postpath %}{{ p.path | remove: postslug | remove_first: "specialization/" | remove_first: "_" }}{%- endcapture %}
        {%- assign pagesubset = "" | split: "" %}
        {%- assign splitpath = postpath | split: "/" -%}
        {%- assign path_base = "" %}
        "keeps": [
            {%- for _path in splitpath %}
            {%- assign path_base = path_base | append: "/" | append: _path %}"{{ path_base }}/index",
            {%- if forloop.last %}"{{ p.id }}",
            {% endif -%}{%- endfor %}
        ],
        {%- if p.org %}
            {%- assign depthcount = p.org | plus: 1 %}
            {%- assign mypagesubset = docs | where_exp: "item", "item.path contains postpath" %}
            {%- for _sets in mypagesubset %}
                {%- unless _sets.path == p.path %}
                    {%- assign sslug = _sets.slug | append: _sets.ext %}
                    {%- capture setpath %}{{ _sets.path | remove: sslug }}{% endcapture %}
                    {%- if setpath == postpath or _sets.org == depthcount %}
                        {% assign pagesubset = pagesubset | push: _sets %}
                    {%- endif %}
                {%- endunless %}
            {%- endfor %}
            {%- assign pagesubset = pagesubset | sort: ordered %}
        {%- endif %}
        {%- if pagesubset == "" %}
        {%- for val in vals %}
            {%- if p['val'].size > 1 %}
            "{{ val }}": [
                {%- for v in p['val'] %}"{{ v }}",
                {%- if forloop.last %}""
                {% endif -%}{% endfor %}
            ]{%- else %}"{{ val }}": "{{ p['val'] }}"{%- endif %}{%- unless forloop.last %},
            {% endunless -%}
        {%- endfor %}
        {%- else %}
            {%- for val in vals %}
            {%- assign vset = mypagesubset | map: val | uniq %}
            {%- if vset.size > 1 %}
            "{{ val }}": [
                {%- for v in vset %}"{{ v }}"{%- unless forloop.last %},
                {% endunless -%}{% endfor %}
            ]{%- else %}"{{ val }}": "{{ vset }}"{%- endif %}{%- unless forloop.last %},
            {% endunless -%}{%- endfor %}
        {%- endif %}

    } {%- unless forloop.last %},
    {% endunless -%}{%- endfor %}
