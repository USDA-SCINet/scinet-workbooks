---
title: "Formatting Toolkit"
## subtitle: "Welcome to SCINet Workbooks styling guide!"
description: "Formatting toolkit for workbook contributors"
#showdescription: false
parent: 0
order: 1
---

## File Names 

To create clean and user-friendly URLs, we  use `index.html` files as the first page at each [folder level](#index). This approach ensures that the folder name itself (along with its path) serves as the URL. Any other files within the folder will have URLs that append their filenames to the folder path, ensuring a structured and intuitive navigation system.   

For example: 

* Folder: **_geospatial**
  * *index.html* (url: `site/geospatial/`) 
  * Folder: **image-processing** 
    * *index.html* (url: `site/geospatial/image-processing/`) 
    * Folder: **raster-tiles** 
      * *index.html* [introduction] (url: `site/geospatial/image-processing/raster-tiles/`) 
      * *python.md* (url: `site/geospatial/image-processing/raster-tiles/python`) 
      * *r.md* (url: `site/geospatial/image-processing/raster-tiles/r`) 
      

## Including Assets 

Assets and images should be included in an **assets** folder. This can be located in the same folder as the file, or in any of the proceeding folders as appropriate. 

* Images should be stored in `/assets/img/`
* Other files can be stored directly in `/assets/`

To access the files where the `assets` folder is in the same parent folder as the file, use the following code:

```
![Image alt text here](./assets/img/filename.png)
[My linked file text](./assets/filename.ipynb)
```

If the **assets** folder is located in a parent directory, you have two options for referencing files within it:
* Define `file_path` variable at the top of your page and use it dynamically to reference files.
  * *The number assigned to `folder` represents the number of folder levels to traverse upward in the directory structure.*

{% raw %}
```
{% include file_path folder=1 %}

[My linked file text]({{ file_path }}/filename.ipynb)
```
{% endraw %}

* OR, manually navigate up the directory structure to locate the **assets** folder using **dot notation**:

```
![Image alt text here](../assets/filename.png)
```

These two approaches are equivalent and help maintain clean and flexible file references, making it easier to manage assets across different folder levels.

## Front Matter

<div id="note-alerts-1" class="highlighted highlighted--note ">
<div class="highlighted__body" markdown="1">
Front matter is a section at the beginning of a file, typically enclosed in triple dashes (`---`), that contains metadata about the document. It is commonly used in static site generators like Jekyll to define variables such as **title**, **author** and **tags**. This metadata helps control how the content is processed and displayed.
</div>
</div>

When the site is compiled, any file with a YAML frontmatter block is processed by Jeykll.
Using the predefined variables and formatting ensures your contribution will be properly incorporated in the compiled site.

**Automatic:** `subject`

**Required:** `title`, `author`, `description`, `type`, `tags`, *`index`

**Optional:** `shortname`, `wgs`, `terms`, `language`, `packages`, `order`



### ***Example Front Matter***

This is a front matter template that can be copied and pasted into an empty `.md` or `index.html` file to define key metadata for your contribution page. 
Variables without `#` are required, while the commented options can be used if applicable to your case - simply uncomment them and adjust their values as needed.

{% raw %}
```
---
title: "Your Tutorial Title Here"
description: "Describe the workbook for index and search purposes"
author: Your Name
# wgs: geospatial          # if this is associated with a working group
type: interactive tutorial
tags: [R Project, Raster, GeoCDL]

# terms: [Spatial Interpolation, Geostatistics] # use if you want to automatically define terms that are not tags
# language: R              # if workbook is specific to a programming language
# packages: [bioperl, biopython]

## index: 3                # only needed for intro and index pages
## order: 1                # only needed if order of tutorials within a folder is important

# materials:               # if you want to include materials at the top of the page
  - text: Material description
    url: /filename.ext 
    # external: true       # use for any links starting with https://

# published: 2023-09-17    # not required, but useful
# updated: 2023-09-17      # not required, but useful
---
```
{% endraw %}


### Subject 

{:.header-note .t-disabled}
Automatic

This represents the **Subject Area** to which the tutorial belongs. It is automatically assigned based on the folder where the tutorial page is saved. 
Here are the currently available subject areas: 

| Subcect Area | description |
|--            |--           |
| computing-skills | Covers fundamental computing concepts, including command-line and HPC usage, scripting and software development. |
| data-science     | Focuses on data analysis, visualization, machine learning and statistical methods for extracting insights. |
| bioinformatics   | Explores computational techniques for analyzing biological data, including genomics and sequence analysis. |
| geospatial       | Provides tools and techniques for working with earth observation data, image processing, photogrammetry and spatial modeling. | 

If you want your tutorial to be included in multiple Subject Areas, you must manually set the variable and list all applicable subjects:

```
subject: [geospatial, computing-skills]
```


### Title  

{:.header-note .t-success}
Required

Each page should have a concise and descriptive `title` that clearly conveys its content. 
If the title is long, a shorter version (`shortname`) can be included for use in breadcrumbs and side navigation.

```
title: "Command Line"
shortname: "CLI"
```


### Description

{:.header-note .t-success}
Required

All pages must have an informative description. This is used for both internal search as well as external indexing of the website.
Descriptions should be 1-3 sentences, descriptive and contained in quotes. 

```
description: "Describe the workbook for index and search purposes"
```


### Author 

{:.header-note .t-success}
Required 

All pages should have the author name.
  * The author will need to create a corresponding Bio in `_data/authors.yml` 
    * Author Bios include: 
      * name *(required)* 
      * pronouns 
      * bio 
      * avatar 
      * contact 
  * Author name capitalization should match what is listed in `authors.yml` 
  * Multiple authors can be listed using the format: `[First Last, First2 Last2]` 


```
author: [First Last, First2 Last2] 
```

### Working Group 

{:.header-note .t-info}
Optional

***Working group shortnames are case sensitive.***

If you are writing this as a member of a working group, add your working group shorthand with this frontmatter variable. 

```
wgs: omics
```

<div class="usa-accordion accordion-bordered"  markdown="1">

{% include accordion title="List of current Working Groups" class="outline"  controls="wg-list-acc" icon=false %}
<div id="wg-list-acc" class="accordion_content" markdown='1'>
    
{% include collect/tags.html list=site.data.workinggroups fetch='wgs' name='working group' %}
</div>
</div>


### Tutorial Type

{:.header-note .t-warning}
*Required

Pre-defined options include:  
  * **introduction** - Overview of the subject with scope, index and cross-referencing to other modules.
  * **lesson module** - Reusable knowledge explained with prerequisites, applied across various tutorials.
  * **interactive tutorial** - Hands-on learning with real-life examples and practical applications.
  * **reference material** - Quick-access cheatsheets, shortcuts, definitions and templates.

*If your page is a module or submodule home page, you do not need this variable – it will be listed as an Index.  Including it does not hurt, but it is not required. 

```
type: interactive tutorial
```

### Tags *(filter keywords)*

{:.header-note .t-warning}
*Required

***Tags are case sensitive.***

Tags allow users to filter and search for the tutorial using the [workbook finder](/workbooks) and index pages. 
  * If it is a single tag, just write the tag in brackets. 
    * Example: [GUI] 
  * Multiple tags can be listed using the format: [Tag 1, Tag 2] 
    * example: [GUI, RStudio, Open OnDemand]  

```
tags: [command line, separated by commas, contained in brackets]
```

* **Tags automatically apply to child files**, meaning that if a module is tagged "RStudio" all tutorials within that module will also appear under the "RStudio" filter.


**Use existing tags** whenever possible rather than creating new ones.

<div class="usa-accordion accordion-bordered"  markdown="1">

{% include accordion title="List of current Keywords" class="outline"  controls="tag-list-acc" icon=false %}
<div id="tag-list-acc" class="accordion_content" markdown='1'>
    
{% include collect/tags.html fetch='tags' %}
</div>
</div>


#### Insert automated terminology definitions

To define keywords within your page, insert {% raw %}`{% include terms %}`{% endraw %} at the desired location in your markdown file. 
This will automatically use your specified tags to identify terms in the glossary and insert their definitions into your page during rendering. 
* Keyword definitions are stored in the `_data/glossary.yml` file. You can add new terms to this file.


### Terms *(glossary definitions)*

{:.header-note .t-info}
Optional

***Terms are case-sensitive.***

If you want to provide definitions for glossary terms that are not used as filters for your tutorial, use `terms` variable in the front matter. This will override the default use of "tags" for the {% raw %}`{% include terms %}`{% endraw %} component, ensuring only the specified `terms` (but not `tags`) are defined in the page content.

* If more than one term has the same name, it will grab the term definition associated with your workbook's [Subject Area](#subject).
* Multiple terms can be listed using the format: [Term 1, Term 2] 
  * example: [GUI, RStudio, Open OnDemand]  

```
terms: [glossary terms, separated by commas, contained in brackets]
```

**Use existing terms** whenever possible rather than creating new ones.

<a href="/glossary/" class="usa-button usa-button--outline">List of current terms</a>

#### Insert automated terminology definitions

For your selected `terms` to be defined in the text of your page, include {% raw %}`{% include terms %}`{% endraw %} in your file where you would like them defined. 
* Term definitions are stored in the `_data/glossary.yml` file. You can add new terms to this file.


### Language

{:.header-note .t-info}
Optional

***Languages are case-sensitive.***

If your tutorial is focused on the use of a specific programming language, use this variable:

```
language: Python
```
<div class="usa-accordion accordion-bordered"  markdown="1">

{% include accordion title="List of current Coding Languages" class="outline"  controls="lang-list-acc" icon=false %}
<div id="lang-list-acc" class="accordion_content" markdown='1'>
    
{% include collect/tags.html fetch='language' name='language' %}
</div>
</div>

<div class="usa-accordion accordion-bordered"  markdown="1">


### Packages

{:.header-note .t-info}
Optional

***Packages are case sensitive.***

If the tutorial is focused on a specific package, you can use the `packages` variable to allow users to filter by the package. 

  * If it is a single package, just write the package in brackets. [Package 1]
  * If it is multiple packages, use: [Package 1, Package2] 

```
packages: [Package 1, Package2] 
```

#### Insert an automated package definition

To define packages within your text, insert {% raw %}`{% include packages %}`{% endraw %} at the desired location in your file. 
This will automatically add definitions for the specified packages during rendering.
* Package definitions are stored in the `_data/packages.yml` file

<a href="/glossary/packages" class="usa-button usa-button--outline">List of current packages</a>


### Index 

{:.header-note .t-warning}
*Required

This variable **identifies [index files](#file-names)**, which serve as the main entry point for a folder. 
**Each folder should have only one index file**, and it must be named `index.html`. 
If a file is not an *index* or *introduction* type, it should not include the `index` variable.

<div id="note-alerts-1" class="highlighted highlighted--highlighted ">
<div class="highlighted__body" markdown="1">
If your *index* or *introduction* file is not named `index.html`, provide a reason in a comment after the variable (e.g., `index: 2 ## explanation`). This ensures clarity and prevents unintended changes by editors.
</div>
</div>

The `index` value should correspond to the nested level of your file within the folder structure. 
  * Folder: **_geospatial**     *(subject area)* 
    * *index.html* (`index:0`) 
    * Folder: **image-processing** 
      * *index.html* (`index: 1`) 
      * Folder: **raster-tiles** 
        * *index.html* [type: introduction]  (`index:2`) 
        * *python.md* (no `index` variable, optional `order: 1`) 
        * *r.md* (no `index` variable, optional `order: 2`) 


### Order 

{:.header-note .t-info}
Optional

If the order of tutorials within a folder matters, use the `order` variable in the front matter to specify their sequence. 
This ordering applies only to files within the same folder and index level.

```
order: 1
```