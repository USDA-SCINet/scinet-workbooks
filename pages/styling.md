---
title: "Styling Toolkit for DSW Contributors"
layout: single
subtitle: "Welcome to SCINet Workbooks styling guide!"
---

# How It Works & Getting Started


# Types of content

## Article

## Interactive Tutorial

Interactive tutorials walk the user through a practical example.  This is the preferred format.

## Lesson Module

Lesson modules cover information in a textbook-style format.

## Learning Pathway

## Glossary Term


# Front Matter

## Example Front Matter

{:.copy-code}
```
{%- raw %}
---
title: "Your Tutorial Title Here"
author: Your Name
# org: 3 # only needed for intro and index pages
# ordered: 1 # only needed if order of tutorials within a folder is important

type: interactive tutorial
level: basics # relative to module

tags: R-Project raster geocdl
packages: [bioperl, biopython]
# wgs: geospatial # if this is associated with a working group

description: Describe the workbook for index and search purposes
---

{% include images_path folder=-1 %}

---{% endraw %}
```

## Title

title: "Command Line"

## Description

description: Describe the workbook for index and search purposes

This should be conscise but descriptive - what you would want shown in the filter and search engine results.

## Tutorial Type

type: interactive tutorial

Choose between "interactive tutorial", "lesson module", "introduction", and "reference materials".
Lesson modules cover information in a textbook-style format, where interactive tutorials walk the user through a practical example.  **type is sensitive**

## Keywords

tags: command-line separated-by-spaces use-dashes-for-spaces-in-tags

These are used for Keyword filtering. **Tags are case sensitive**

Tags use Jekyll's native tagging system.
Separate your tags by spaces and use dashes in place of spaces within the tag.
Reference existing tags and use those where possible instead of creating new ones.

If applicable, please include a GUI, web-based, or command-line tag.

Tags are inherited from the parent indexes.
If you include "Python" as a tag in the index file, all of the children of that folder will be filterable by the "Python" keyword.

{% include collect/tags.html fetch='tags' %}

## Packages

packages: [packages of note, separated by commas, use brackets for multiple]

If using more than one term, place terms in brackets and separate with commas. **Packages are case sensitive**

{% include collect/tags.html fetch='packages' %}

## Workbook Category

wbs: computing-skills

This is automatically compiled for existing workbooks.

{% include collect/tags.html fetch='wbs' name='workbook' %}

## Working Group

wgs: omics

If you are writing this as a member of a working group, add your working group shorthand with this frontmatter variable.  **Working group shortnames are case sensitive**
{% include collect/tags.html list=site.data.workinggroups fetch='wgs' name='working group' %}

## Author

author: Aleksandra Badaczewska

For multiple authors, place the names in brackets and separate with commas.
author: [Author 1, Author 2, etc]

**Author names are case sensitive**

If you have not added your information to authors.yml, you will need to do so for it to show up on the page.

## Organization Level

org: 1

This is only needed for Intro and Index pages.
The org level should be one higher than the index in the parent folder.

## Order within a level

ordered: 1

## Including Assets

Assets and images should be included in an "Assets" folder.  This can be located in the same folder as the file, or in any of the proceeding folders as appropriate.

* Images should be stored in /assets/img/
* Other files can be stored in /assets/


The folder variable indicates where your assets file is relative to your markdown file.
  * If the assets folder is in the same folder as your markdown file, do not include the folder variable.
  * If it is in your parent folder, use 'folder=-1'
  * If it is in the grandparent folder, use 'folder=-2'


To access the files, use the following code:

{:.copy-code}
```
{%- raw %}
![Image alt text here]({{ images_path }}/filename.png)
[My linked file text]({{ file_path }}/filename.ipynb){% endraw %}
```
