---
title: Table
description: "A table displays information in columns and rows."

components:
  title: Generating tables from data
  name: jstable
  intro: "This code will import and format data from a json file.  Data loaded this way is rendered for the user on page load, so if you would like to share large datasets consider a download option instead."
  sections: 
    - title: Table options
      unexpanded: true
      options:
        - label: Auto Striped Table
          data:
            file: /data/table.json
            title: Striped json table
            classes: striped
        - label: Auto Borderless Table
          data:
            file: /data/table.json
            title: Borderless json table
            classes: borderless
        - label: Auto Mixed Display Table
          data:
            file: /data/table.json
            title: Mixed display json table
            classes: striped borderless compact
        - label: Unsticky Table
          data:
            file: /data/table.json
            title: Unsticky json table
            unsticky: true
        - label: Scrolling Table
          data:
            file: /data/table.json
            title: Scrolling json table
            fixed: scrollable
        - label: Fixed Table
          data:
            file: /data/table.json
            title: Fixed json table
            fixed: true
        # - label: Sorted Table
        #   data:
        #     file: /data/table.json
        #     title: Sorted json table
        #     classes: striped
        #     sortable: true


---

{% capture tablecode %}{% include contribute/components/codeblock/custom/table %}{% endcapture %}
{% capture mdtablecode %}{% include contribute/components/codeblock/custom/mdtable %}{% endcapture %}

Tables are useful for displaying and organizing information, making it easier to understand complex content.

*  **When to use a table component:**
    *  Displaying tabular data such as statistical data
    *  Displaying lists of resources with similarly structured content
    *  Detail parameters or arguments for functions or commands

*  **When to consider other options:**
    *  Do not use in place of a layout grid
    *  Long-form content.  Table data should be brief and easy to scan.
        *  If you find yourself using multiple bullet points or paragraphs in a cell, consider:
            *  Traditional page headers
            *  Accordions
            *  Cards
    *  Complex data visualizations*
        *  Consider graphics such as a bar chart or infographic
        *  *A table can be used to make graphics more accessible
    *  Non-tabular data

Additional guidance can be found on the [USWDS component page](https://designsystem.digital.gov/components/table/)

## Markdown Tables

{:.site-text-intro}
Markdown tables wrapped in the Table component wrapper are formatted to be accessible and automatically flex on small screens by default. They can handle basic markdown and html formatting within the cells.  

For these tables to work properly:
* Inline quotation marks within the table must be escaped: `\"`
* There can be no trailing spaces after the last bar `|` per row.
* There can be no spaces prior to the first bar `|` per row.
* There must be at least one space between each bar `|` and any table cell content.

### Accessible markdown tables

<div class="usa-accordion " >

{% include accordion title="Component Preview" class="primary" controls="md-t1-component-preview" %}
<div id="md-t1-component-preview" class="accordion_content usa-prose"  markdown='1' hidden>

<ul class="usa-content-list">
<li markdown='1'>

#### Basic Table

Basic tables using this component are automatically sticky.  They also flex on resize.

{% include table caption="Basic table" content=mdtablecode %}

</li>
<li markdown='1'>

#### Nonsticky Table

You can make a table nonsticky by adding `nonsticky=true`

{% include table caption="Nonsticky table" nonsticky=true content=mdtablecode %}

</li>
<li markdown='1'>

#### Table classes

You can add table classes to make your table striped, compact, borderless, or any combination.

{% include table caption="Table with classes included" classes="striped compact borderless" content=mdtablecode %}

</li>
<li markdown='1'>

#### Fixed Table

You can make a table fixed by adding `fixed=true`, but be aware that this may make your table inaccessible on small screens. 
To address this, you can add `fixed="scrollable"` to make the table scrollable.

{% include table caption="Fixed table with scroll" fixed="scrollable" content=mdtablecode %}

</li>
<li markdown='1'>

#### Sortable table

Make your table sortable with `sortable=true`.

{% include table caption="Sortable table" sortable=true content=mdtablecode %}

</li>
<li markdown='1'>

#### Grouped row headers

You can group row headers in your table by adding `grouped=true` to the component and `!rowspan<#>` to the table cell, where `<#>` equals the numbers of rows you want your row header to span.

This formatting does not work with flexible or sortable tables.

{% include table caption="Table with grouped row headers" grouped=true content="| Attribute | Example | Behavior |
| -- | -- | -- |
| Default           | Default component              | Default flex table with sticky headers. |
| unsticky          | `unsticky=true`                | Default table without sticky headers. |
| classes !rowspan4 | `classes='striped'`            | Striped table |
|                   | `classes='borderless'`         | Borderless table |
|                   | `classes='compact'`            | Compact table    |
|                   | `classes='borderless compact'` | Classes separated by spaces will both apply |
| fixed !rowspan2   | `fixed=true`                   | Table does not flex. |
|                   | `fixed='scrollable'`           | Fixed table scrolls. |
| sortable          | `sortable=true`                | Sortable Table |
| grouped !rowspan2 | `grouped=true`                 | Allows for merged Row Headers |
|                   | `!rowspan<#>`                  | Indicates span of the group when applied to the first cell of a row |" %}


</li>
<li markdown='1'>

#### No row labels

Row headers are an accessibility component and give the reader more context.  Before removing the row headers, consider your table arrangement.

{% include table caption="No row labels" no-row-labels=true content=mdtablecode %}


</li>
</ul>

</div>
{% include accordion title="Component Code" class="outline" controls="md-t1-component-codes" %}
<div id="md-t1-component-codes" class="accordion_content" markdown='1' hidden>

<ul class="usa-content-list">
<li markdown='1'>

#### Basic Table

```
{% raw %}{%{% endraw %} include table caption="Basic table" content="{{ mdtablecode }}" {% raw %}%}{% endraw %}
```

</li>
<li markdown='1'>

#### Nonsticky Table

```
{% raw %}{%{% endraw %} include table caption="Nonsticky table" nonsticky=true content="{{ mdtablecode }}" {% raw %}%}{% endraw %}
```

</li>
<li markdown='1'>

#### Table classes

```
{% raw %}{%{% endraw %} include table caption="Table with classes included" classes="striped compact borderless" content="{{ mdtablecode }}" {% raw %}%}{% endraw %}
```

</li>
<li markdown='1'>

#### Fixed Table

```
{% raw %}{%{% endraw %} include table caption="Fixed table with scroll" classes="scrollable" fixed=true content="{{ mdtablecode }}" {% raw %}%}{% endraw %}
```

</li>
<li markdown='1'>

#### Sortable table

```
{% raw %}{%{% endraw %} include table caption="Sortable table" sortable=true content="{{ mdtablecode }}" {% raw %}%}{% endraw %}
```

</li>
<li markdown='1'>

#### Grouped row headers

```
{% raw %}{%{% endraw %} include table caption="Table with grouped row headers" grouped=true content="| Attribute | Example | Behavior |
| Default          | Default component                                    | Default flex table with sticky headers. |
| unsticky         | `unsticky=true`                                      | Default table without sticky headers. |
| classes!rowspan5 | `classes='striped'`                                  | Striped table |
|                  | `classes='borderless'`                               | Borderless table |
|                  | `classes='compact'`                                  | Compact table    |
|                  | `classes='scrollable'`                               | Scrollable table - best used in tandem with `fixed=true` |
|                  | `classes='borderless compact'`                       | Classes separated by spaces will both apply |
| fixed            | `fixed=true` (and `classes='scrollable'` if desired) | Table does not flex. |
| sortable         | `sortable=true`                                      | Sortable Table |
| grouped!rowspan2 | `grouped=true`                                       | Allows for merged Row Headers |
|                  | `!rowspan<#>`                                        | Indicates span of the group when applied to the first cell of a row |" {% raw %}%}{% endraw %}
```


</li>
<li markdown='1'>

#### No row labels

```
{% raw %}{%{% endraw %} include table caption="No row labels" no-row-labels=true content="{{ mdtablecode }}" {% raw %}%}{% endraw %}
```

</li>
</ul>

</div>
</div>




### Less accessible markdown tables

{:.site-text-intro}
The default markdown tables do not support row headers or data-labels.  
If for some reason you cannot use the above components to create accessible tables, you can use the following as a placeholder.  

<div class="usa-accordion " >

{% include accordion title="Component Preview" class="outline" controls="problem-table-code" %}
<div id="problem-table-code" class="accordion_content usa-prose"  markdown='1' hidden>

<ul class="usa-content-list">
<li markdown='1'>

#### Basic Table

```
{{ tablecode }}
```

</li>
<li markdown='1'>

#### Striped Table

```
<div class='striped sticky' markdown='1'>

{{ tablecode }}

</div>
```

</li>
<li markdown='1'>

#### Borderless Table

```
<div class='borderless' markdown='1'>  

{{ tablecode }}

</div>
```

</li>
<li markdown='1'>

#### Compact Table

```
<div class='striped compact' markdown='1'> 

{{ tablecode }}

</div>
```

</li>
</ul>

</div>

</div>

