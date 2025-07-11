---
title: Overview
description: The Overview component provides a standardized format for the beginning of your tutorial or lesson.

objectives-manual: 
  - Understand what the Overview component is and how to implement it.
  - Show alternative code that will accomplish the same formatting but allow further flexibility.
  - Objectives should describe the goals this tutorial or workshop is trying to accomplish.

tags: [IDE]
packages: [GeoCDL]
code: filename.Rmd

overview: [applications, terminology, datasets-packages, materials]

applications:
  - Creating your own tutorial
  - Matching existing formatting easily
materials:
  - "**Download Jupyter Notebook:** [pygcdl_tutorial.ipynb](./assets/pygcdl_tutorial.ipynb)"
  - "[This is a pdf](./assets/demofile.pdf)"
  - Just some text
datasets: [PRISM]


overview2:
  concepts:
    - "**Objectives**: Main learning goals the tutorial is aiming to accomplish. Limit to 3 or 4."
    - "**Concepts**: Specific high level concepts that are included in the tutorial"
    - "**Technologies**: Different tools/technologies used in the tutorial."
    - "**Applications**: Applications for the knowledge learned in the tutorial"
    - "**Terminology**: Terms and definitions"
    - "**Materials**: Files, pdfs, etc used in the tutorial."
  technologies:
    - "**Tech:** Description"
  applications:
    - Creating your own tutorial
    - Matching existing formatting easily
  terminology: terms
  materials:
    - "**Download Jupyter Notebook:** [pygcdl_tutorial.ipynb](./assets/pygcdl_tutorial.ipynb)"
    - "[This is a pdf](./assets/demofile.pdf)"
    - Just some text


custom-terms:
  - term: Custom
    Key-difference: "You can add the definition manually if you do not want to include it in the glossary for some reason." 
    definition: "This definition was added manually using the 'definition' variable" 
    Section-titles: "Section titles are automatically derived from the variable names"
  - term: Terminal
    link: "/computing-skills/command-line/cli-interface/terminal/"
    Key-difference: "This definition was automatically generated from the glossary." 
    Examples: "GNOME Terminal, Windows Terminal, iTerm2"
---

*  **When to use the overview component**
    * At the beginning of tutorials and lessons, after your introduction

*  **When to consider something else**
    * Exceptions?

## Component Examples

### Standard Options

You only need to include the overview sections applicable to your project.  For the standard overview component, you can add and remove sections by editing the page's frontmatter.

<div class="usa-accordion" >

{% include accordion title="Component Preview" class="primary" controls="component-preview" %}
<div id="component-preview" class="accordion_content" markdown="1" hidden> 

#### Overview

Introduce your tutorial or lesson with a short paragraph to give the reader context to what they are looking at.  Then provide the overview component.

<div class="usa-summary-box margin-bottom-2">
<div class="usa-summary-box__body">
<h3 class="usa-summary-box__heading rm-a">
Learning Objectives
</h3>
<div class="usa-summary-box__text" markdown="1">

  * Understand what the Overview component is and how to implement it.
  * Show alternative code that will accomplish the same formatting but allow further flexibility.
  * Objectives should describe the goals this tutorial or workshop is trying to accomplish.

</div>
</div>
</div>

{% include overviews %}

</div>



{% include accordion title="Component Code" class="outline" controls="component-codes" %}
<div id="component-codes" class="accordion_content" markdown="1" hidden> 

<ul class="usa-content-list">
<li markdown='1'>

#### Standard Implementation

```
{% raw %}---
title: Overview
## other frontmatter variables here
## everything below is used in the overview component

objectives: 
  - Understand what the Overview component is and how to implement it.
  - Show alternative code that will accomplish the same formatting but allow further flexibility.
  - Objectives should describe the goals this tutorial or workshop is trying to accomplish.

tags: [IDE]
packages: [GeoCDL]
code: filename.Rmd
datasets: [PRISM]

overview: [objectives, applications, terminology, datasets-packages, materials]

applications:
  - Creating your own tutorial
  - Matching existing formatting easily
materials:
  - "[This is a pdf](./assets/demofile.pdf)"
  - Just some text
---

## Overview

Introduce your tutorial or lesson with a short paragraph to give the reader context to what they are looking at.  Then provide the overview component.

{% include overviews %}{% endraw %}

```

</li>
<li markdown='1'>

#### Nested Implementation
Nesting the yml allows for more customized sourcing of data within your frontmatter

```
{% raw %}---
title: Overview
## other frontmatter variables here
## everything below is used in the overview component

objectives: 
  - Understand what the Overview component is and how to implement it.
  - Show alternative code that will accomplish the same formatting but allow further flexibility.
  - Objectives should describe the goals this tutorial or workshop is trying to accomplish.

tags: [IDE]
code: filename.Rmd
packages: [GeoCDL]

overview:
  applications:
    - Creating your own tutorial
    - Matching existing formatting easily
  terminology: terms
  materials:
    - "[This is a pdf](./assets/demofile.pdf)"
    - Just some text
---

## Overview

Introduce your tutorial or lesson with a short paragraph to give the reader context to what they are looking at.  Then provide the overview component.

{% include overviews %}{% endraw %}

```

</li>
</ul>

</div>
</div>

### Alternative Formatting Options

You can choose to place the individual overview components separately to allow for additional flexibility. If you choose this option, you will need to manually wrap each component other than the "Learning Objectives" in an [accordion](/contribute/components/accordion).

<div class="usa-accordion" >

{% include accordion title="Alternative Options - Component Preview" class="primary" controls="subcomponent-options-preview" %}
<div id="subcomponent-options-preview" class="accordion_content" markdown="1" hidden> 

<div class="usa-summary-box margin-bottom-2">
<div class="usa-summary-box__body">
<h3 class="usa-summary-box__heading rm-a">
Learning Objectives
</h3>
<div class="usa-summary-box__text" markdown="1">

  * Understand what the Overview component is and how to implement it.
  * Show alternative code that will accomplish the same formatting but allow further flexibility.
  * Objectives should describe the goals this tutorial or workshop is trying to accomplish.

</div>
</div>
</div>

<div class="usa-accordion" >

{% include accordion title="Including a custom list" class="secondary" controls="list-components" rm-a=true %}
<div id="list-components" class="accordion_content" markdown="1" hidden> 

  *  **Objectives**: Main learning goals the tutorial is aiming to accomplish. Limit to 3 or 4.
  *  **Applications**: Applications for the knowledge learned in the tutorial
  *  **Terminology**: Terms and definitions
  *  **Materials**: Files, pdfs, etc used in the tutorial.

</div>



{% include accordion title="Terminology Options" class="secondary" controls="terms-options" rm-a=true %}
<div id="terms-options" class="accordion_content" hidden> 
<ul class="usa-content-list">
<li markdown='1'>

#### Basic terms component

{% include overview/terms %}

</li>
<li markdown='1'>

#### Custom terms component using variable names as column names.

<ul class="usa-collection collection" markdown='1'>

  {% include overview/terms terms="custom-terms" %}

</ul>

</li>
</ul>
</div>

{% include accordion title="Materials Options" class="secondary" controls="mat-components" rm-a=true %}
<div id="mat-components" class="accordion_content" hidden> 
<ul class="usa-content-list">
<li markdown='1'>

#### Basic list

* [File name](filepath.pdf)
* **Download Jupyter Notebook**: [pygcdl_tutorial.ipynb](./assets/pygcdl_tutorial.ipynb)

</li>
<li markdown='1'>

#### R markdown file

{% include setup/rmd file='GRWG22_GeoCDL.Rmd' %}

</li>
<li markdown='1'>

#### Materials Function

<ul class="usa-list" markdown="1">

{% for _m in page.overview.materials %}
{% include overview/materials material=_m size=0 %}
{% endfor %}

</ul>

</li>
<li markdown='1'>

#### Packages component

{% include overview/packages %}

</li>
</ul>
</div>

</div>
</div>

{% include accordion title="Alternative Components - Code" class="outline" controls="alt-codes" %}
<div id="alt-codes" class="accordion_content" hidden> 
<ul class="usa-content-list">
<li markdown='1'>

#### Objectives

```{% raw %}
{% include objectives content="  * Understand what the Overview component is and how to implement it.
  * Show alternative code that will accomplish the same formatting but allow further flexibility.
  * Objectives should describe the goals this tutorial or workshop is trying to accomplish." %}{% endraw %}
```

</li>
<li markdown='1'>

#### Including a custom list

```{% raw %}
  *  **Objectives**: Main learning goals the tutorial is aiming to accomplish. Limit to 3 or 4.
  *  **Applications**: Applications for the knowledge learned in the tutorial
  *  **Terminology**: Terms and definitions
  *  **Materials**: Files, pdfs, etc used in the tutorial."
{% endraw %}
```

</li>
<li markdown='1'>

#### Terminology

<ul class="usa-list">
<li markdown='1'>

Basic terms component referencing "tags"

```{% raw %}
---
## frontmatter
tags: [IDE]
---
{% include overview/terms %}{% endraw %}
```

</li>
<li markdown='1'>

Basic terms component referencing "terms"

```{% raw %}
---
tags: [IDE]
terms: [IDE, Artificial Intelligence] #including terms variable makes it the default term source
---
{% include overview/terms %}{% endraw %}
```

</li>
<li markdown='1'>

Basic terms component referencing a custom variable

```{% raw %}
---
## frontmatter
specified-frontmatter:
  - term: Custom
    Key-difference: "You can add the definition manually if you do not want to include it in the glossary for some reason." 
    definition: "This definition was added manually using the 'definition' variable" 
    Section-titles: "Section titles are automatically derived from the variable names"
  - term: Terminal
    link: "/computing-skills/command-line/cli-interface/terminal/"
    Key-difference: "This definition was automatically generated from the glossary." 
    Examples: "GNOME Terminal, Windows Terminal, iTerm2"
---

{% include overview/terms terms=specified-frontmatter taglinks="true" %}{% endraw %}
```

</li>
<li markdown='1'>

Custom terms component using variable names as column names.

```{% raw %}
<ul class="usa-collection collection" markdown='1'>

    {% include term term="Custom" Key-difference="You can add the definition manually if you do not want to include it in the glossary for some reason." definition="This definition was added manually using the 'definition' variable" section-titles="Section titles are automatically derived from the variable names" %}
    {% include term term="Terminal" link="/computing-skills/command-line/cli-interface/terminal/" Key-difference="This definition was automatically generated from the glossary." Examples="GNOME Terminal, Windows Terminal, iTerm2" %}

</ul>{% endraw %}
```

</li>
</ul>
</li>
<li markdown='1'>

#### Materials

<ul class="usa-list">
<li markdown='1'>

Basic list

```{% raw %}
* [File name](/assets/filepath.pdf)
* **Download Jupyter Notebook**: [pygcdl_tutorial.ipynb](./assets/pygcdl_tutorial.ipynb)
{% endraw %}```

</li>
<li markdown='1'>

Rmd file

```{% raw %}
{% include setup/rmd file='GRWG22_GeoCDL.Rmd' %}
{% endraw %}```

</li>
<li markdown='1'>

Materials component

```{% raw %}
---
## frontmatter
materials:
  - rmd: filename.Rmd
  - "**Download Jupyter Notebook:** [pygcdl_tutorial.ipynb](./assets/pygcdl_tutorial.ipynb)"
  - "[This is a pdf](./assets/demofile.pdf)"
  - Just some text
---

<ul class="usa-list" markdown="1">

{% for _m in page.materials %}
{% include overview/materials material=_m size=0 %}
{% endfor %}

</ul>
{% endraw %}```

</li>
<li markdown='1'>

Packages component

```{% raw %}
---
## frontmatter
packages: [GeoCDL]
---
{% include overview/packages %}
{% endraw %}```

</li>
</ul>
</li>
</ul>
</div>
</div>