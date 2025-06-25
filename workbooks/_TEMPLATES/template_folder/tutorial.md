---

title: Tutorial Title
description: Short and informative description of your tutorial
type: interactive tutorial # is this an interactive tutorial, reference material, or lesson module?

tags: [Raster, Vector, CRS] # tags allow for users to filter for terms
## can also be used in the include terms function if no separate terms list provided

# terms: [GeoCDL, Raster, Vector, CRS] # For if you want defined terms that are not your tags 
## only referred to by the include terms function

# language: Python # uncomment if workbook uses use a coding language 

packages: pygcdl # if you use packages/libraries - allows users to filter
## Also optional to include packages function in text to display table and links

# wgs: geospatial # uncomment if this was made with a working group

author: Moe Richert # author name

updated: 2024-09-19 # last date updated - not required but useful
---



## Overview

Introduction to your tutorial and what the tutorial aims to accomplish.

### Materials

* **Download Jupyter Notebook**: [filename.Rmd](./assets/filename.ipynb)

{% include overview/packages %}

### Terminology

{% include overview/terms %}

### Data Details

* **Dataset: Data Name**
  * Link: [https://doi.org/](https://doi.org/)
  * Details: Dataset description

* **Dataset: Data Name**
  * Link: [https://doi.org/](https://doi.org/)
  * Details: Dataset description


## Tutorial Steps:
1. Step 1 title
1. Step 2 title
1. Step 3 title
1. Download the data
1. Visualize the results

<ol class="usa-process-list">
  <li class="usa-process-list__item"  markdown='1'>  

### Step Title 1

Step contents

  </li>
  <li class="usa-process-list__item"  markdown='1'>  

### Step Title 2

Step contents

  </li>
  <li class="usa-process-list__item"  markdown='1'>  

### Step Title 3

Step contents

  </li>
</ol>

## Wrapup Title

Any further wrapup/comments/etc