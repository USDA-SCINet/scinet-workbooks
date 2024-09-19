---
title: "Formatting Toolkit"
## subtitle: "Welcome to SCINet Workbooks styling guide!"
description: "Formatting toolkit for workbook contributors"
#showdescription: false
parent: 0
---

## Front Matter

When the site is compiled, any file with a YAML frontmatter block is processed by Jeykll.
Using the predefined variables and formatting ensures your contribution will be properly incorporated in the compiled site.

### Example Front Matter

```
{%- raw %}
---
title: "Your Tutorial Title Here"
author: Your Name
## index: 3 ## only needed for intro and index pages
## order: 1 ## only needed if order of tutorials within a folder is important

type: interactive tutorial

tags: [R Project, raster, GeoCDL]
packages: [bioperl, biopython]
## wgs: geospatial ## if this is associated with a working group

description: "Describe the workbook for index and search purposes"
---
{% endraw %}
```


### Title  

{:.header-note .t-success}
Required

All pages should have a short, descriptive title.
If the title is long, pages may include a shortname for breadcrumb and side navigation use. 

```
title: "Command Line"
shortname: "CLI"
```

### Subject 

{:.header-note .t-disabled}
Automatic

This indicates the Subject Area the tutorial belongs to.  It is automatically applied to tutorials when they are saved into a subject area folder 
  * If you would like your tutorial to be applied to multiple subject areas, you will need to apply the variable and write both. 
    * [Subject Area 1, Subject Area 2] 

```
subject: [geospatial, computing-skills]
```

### Author 

{:.header-note .t-success}
Required 

All pages should have the author name.
  * The author will need to create a corresponding Bio in _data/authors.yml 
    * Author Bios include: 
      * name (required) 
      * pronouns 
      * bio 
      * avatar 
      * contact 
  * Multiple authors can be listed using the format [First Last, First2 Last2] 
  * Author name capitalization should match what is listed in authors.yml 

```
author: [First Last, First2 Last2] 
```

### Working Group 

{:.header-note .t-info}
Optional

If you are writing this as a member of a working group, add your working group shorthand with this frontmatter variable.  **Working group shortnames are case sensitive**

```
wgs: omics
```


<div class="usa-accordion accordion-bordered"  markdown="1">

{% include accordion title="List of current Working Groups" class="outline"  controls="wg-list-acc" icon=false %}
<div id="wg-list-acc" class="accordion_content" markdown='1'>
    
{% include collect/tags.html list=site.data.workinggroups fetch='wgs' name='working group' %}
</div>
</div>




### Description

{:.header-note .t-success}
Required

All pages must have an informative description. This is used for both internal search as well as external indexing of the website
Descriptions should be 1-3 sentences, descriptive, and contained in quotes. 

```
description: "Describe the workbook for index and search purposes"
```


### Tutorial Type

{:.header-note .t-warning}
*Required

Options:  
  * interactive tutorial 
  * lesson module 
  * reference material 
  * introduction 

*If your page is a module or submodule home page, you do not need this variable – it will be listed as an Index.  Including it does not hurt, but it is not required. 

```
type: interactive tutorial
```

### Keywords

{:.header-note .t-warning}
*Required

Tags allow users to filter and search for the tutorial using the workbook finder and index pages. **Tags are case sensitive**
  * If it is a single tag, just write the tag in brackets. 
    * Example: [GUI] 
  * Multiple tags can be listed using the format: [Tag 1, Tag 2] 
    * example: [GUI, RStudio, Open OnDemand]  
  * Reference existing tags and use those where possible instead of creating new ones. 

*Tags are inherited by child files, so if your module is tagged RStudio, all tutorials within the module will be filterable by RStudio. 

```
tags:[command line, separated by commas, contained in brackets]
```

<div class="usa-accordion accordion-bordered"  markdown="1">

{% include accordion title="List of current Keywords" class="outline"  controls="tag-list-acc" icon=false %}
<div id="tag-list-acc" class="accordion_content" markdown='1'>
    
{% include collect/tags.html fetch='tags' %}
</div>
</div>


### Packages

{:.header-note .t-info}
Optional

If the tutorial is focused on a specific package, you can use the “packages” variable to allow users to filter by the package. 
  * Packages are case sensitive. 
  * If it is a single package, just write the package in brackets. [Package 1]
  * If it is multiple packages, use: [Package 1, Package2] 

```
packages: [Package 1, Package2] 
```

<div class="usa-accordion accordion-bordered"  markdown="1">

{% include accordion title="List of current packages" class="outline"  controls="pkg-list-acc" icon=false %}
<div id="pkg-list-acc" class="accordion_content" markdown='1'>
    
{% include collect/tags.html fetch='packages' %}
</div>
</div>


### Order 

{:.header-note .t-info}
Optional

If order of tutorials matters within the folder, you can use the “order” variable in the frontmatter to order your files.
This order is only relative to the files within the same folder and index level.

```
order: 1
```

### Index 

{:.header-note .t-warning}
*Required

This variable indicates your index files.  There should only be one per folder, and the file should be named index.html. 
If your file is not an Index or Introduction, it should not have an index variable.

If your “index” or “introduction” file is not named index.html', please note your reasoning for not using “index.html” after the variable using a comment, i.e. “index: 2 ## explanation”, so that it is not altered by an editor.

Index should equal the nested value of your file: 
  * Folder: geospatial 
    * Index.html (index:0) 
    * Folder: image-processing 
      * Index.html (index: 1) 
      * Folder: raster-tiles 
        * Index.html [introduction]  (index:2) 
        * python.md (no index variable) 
        * r.md (no index variable) 







## Including Assets 

Assets and images should be included in an "Assets" folder.  This can be located in the same folder as the file, or in any of the proceeding folders as appropriate. 

* Images should be stored in /assets/img/
* Other files can be stored in /assets/

To access the files where the assets folder is in the same folder as the file, use the following code:

```
{%- raw %}
![Image alt text here](./assets/img/filename.png)
[My linked file text](./assets/filename.ipynb){% endraw %}
```

If the assets folder is in a parent folder, you may either include 'file_path' at the top of your page and use that variable, or use dot notation.

```
{%- raw %}
{% include file_path folder=1 %}
<!-- the following will be the same -->

![Image alt text here](../assets/filename.png)
[My linked file text]({{ file_path }}/filename.ipynb){% endraw %}
```


## File Names 

For ease of site navigation, we are using index.html files for all index pages.  These cause the page url to use the folder path as the url without any additional text and makes for a more user-friendly experience.   

For an example: 

* Folder: geospatial 
  * Index.html (url: site/geospatial/) 
  * Folder: image-processing 
    * Index.html (url: site/geospatial/image-processing/) 
    * Folder: raster-tiles 
      * Index.html [introduction] (url: site/geospatial/image-processing/raster-tiles/) 
      * python.md (url: site/geospatial/image-processing/raster-tiles/python) 
      * r.md (url: site/geospatial/image-processing/raster-tiles/r) 
