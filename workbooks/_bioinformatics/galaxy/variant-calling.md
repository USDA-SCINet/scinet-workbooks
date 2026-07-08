---
title: Variant calling using Freebayes in Galaxy
description: "Describe the workbook for index and search purposes"
author: [Siva Chudalayandi, Lavida Rogers]

type: interactive tutorial
order: 20

## Data for filters
tags: [Variant calling, Galaxy]

## Information for Overview
### Include as few or as many as needed
objectives: 
  - Short description or list
  - What are the learning objectives?
terms: # use if you want to automatically define terms that are not tags
  - Shell
  - Prompt  
  - term: environment variable 
    definition: A key-value pair used to store system or user-specific settings. Examples include `PATH`, which defines the directories the shell searches for commands.  

applications:
  - Specific applications the skills learned can be used for
  - Does not have to be a list

overview: [objectives, applications, terminology]

intro: bioinformatics/galaxy

### Date information
# published: 2023-09-17    # not required, but useful
# updated: 2023-09-17      # not required, but useful

### Used in Quizzes

questions:
  - question: "Answer 2 is correct"
    qid: 1
    answers: 
      - answer1
      - answer2
      - answer3
    answer: 2  
    solution: "This is printed if the user gets the answer correct. If this is not included, and there is no \"Response\" attribute, the result will just show \"Success!\" instead"

---

## Overview

This is where a short, one or two paragraph introduction to your tutorial can go.  It should broadly get across the idea of what is covered.

{% include overviews %}

## Getting Started


{% include setup/intro %}



You can optionally include the tutorial steps or sections in this section.

### Tutorial Steps:
* **First section** - description
* **Second section** - description

## First section

Each section can have subsections. 

{% include alert class="tip" content="Link related tutorials with a tip, and include the [title name](#).  You can use dot notation for easy linking between tutorials." %}

If I have subsections that aren't in a particular order, I can use an unordered process list.

<div class="process-list ul" markdown="1">

### All h3 headers will be marked

To instead use h4, you can add `h4` to the class.

### Close the div when finished

Close this div to end the process list.

</div>

## Section 2

You can include self-check questions and quizzes as desired.

{% include question qid=1 %}

## Summary

Brief summary of the high points and learning takeaways