---
title: Demo File 1 - Introduction to file structure
description: This is a demo structure example

author: Moe Richert
tags: [Artificial Intelligence]
packages: sf
language: R
description: This is a demo - demo number 1
order: 1
type: lesson module
---

## Overview

This is a demo file structure.  While the title is "introduction", note that the frontmatter variable "type" is not.
You can have standalone introductions to topics that do not contain other tutorials.  These should be marked with "type: lesson module"
The variable "type: introduction" should be reserved for index files that collect tutorials that are very similar or do not function correctly on their own.

Overview of tutorial: provide a brief description of tutorial's content and purpose 
 * Main Objectives  
 * Goals:  By the end of this tutorial, you will be able to? 

Module scope (100-150 words):discuss main areas of focus and important concepts readers will learn 
 * Key topics/concepts 
 * Tools/technologies 
 * Applications 

### Materials (optional)

{% include layout/setup/rmd file='demo.Rmd' %}

{% include packages %}

### Nomenclature (optional)

{% include terms %}

### Data Details (optional)

* **Dataset: NAME**
  * Link: LINK
  * Details: Short description of dataset

## Tutorial Steps:
1. Step 1 title
1. Step 2 title 
1. Step 3 title 
1. Etc

<ol class="usa-process-list">
<li class="usa-process-list__item"  markdown='1'>  

### Step 1 title

Details

</li>
<li class="usa-process-list__item"  markdown='1'>  

### Step 2 title 

Details

#### Can include substeps

Details

</li>
<li class="usa-process-list__item"  markdown='1'>  

### Step 3 title 

Details

</li>
<li class="usa-process-list__item"  markdown='1'>  

### Etc

Details

</li>
</ol>