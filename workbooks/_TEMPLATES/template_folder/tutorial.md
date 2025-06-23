---

title: Tutorial Title
description: Short and informative description of your tutorial
type: interactive tutorial # is this an interactive tutorial, reference material, or lesson module?

tags: [Raster, Vector, CRS] 
## tags allow for users to filter for terms

# terms: [GeoCDL, Raster, Vector, CRS] 
## For if you want defined terms that are not your tags 
## only referred to by the include overviews function

# language: Python 
## uncomment if workbook uses use a coding language 

packages: pygcdl 
## if you use packages/libraries - allows users to filter

# wgs: geospatial 
## uncomment if this was made with a working group

datasets: [dataset name]  
## make sure dataset is defined in the datasets.yml

author: Moe Richert 
## author name

updated: 2024-09-19 
## last date updated - not required but useful

objectives: "You can write out your objectives in markdown, or put them in a list.
overview: [objectives, nomenclature, datasets-packages]
---

## Overview

Introduction to your tutorial and what the tutorial aims to accomplish.

{% include overviews %}

## Getting Started

Any assumptions, OOD input field values, links to pages the use may have needed to already have read.

Including code download, as needed.
{% include setup/code %}
<!--{% comment %} 
Also works with:  
{% include setup/code code=page.custom-code-variable %}  
Or:
{% include getting-started %} if the getting-started varible in the frontmatter includes "download"
{% endcomment %}-->


## Tutorial Steps:
1. Step 1 title
1. Step 2 title
1. Step 3 title
1. Download the data
1. Visualize the results

<div class="process-list" markdown="1">

<!--{% comment %} 
You can include multiple process lists, 
but the top-level headings within the process list MUST be h3 for it to work.
{% endcomment %}-->

### Step Title 1

Step contents

### Step Title 2

Step contents

### Step Title 3

Step contents

</div>

## Wrapup Title

Any further wrapup/comments/etc