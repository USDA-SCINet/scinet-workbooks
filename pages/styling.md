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

## Title

title: "Command Line"

## Description

description: Describe the workbook for index and search purposes

This should be conscise but descriptive - what you would want shown in the filter and search engine results.

## Tutorial Type

type: interactive tutorial

Choose between "interactive tutorial", "lesson module", "introduction", and "reference materials".
Lesson modules cover information in a textbook-style format, where interactive tutorials walk the user through a practical example.

## Keywords

tags: command-line separated-by-spaces use-dashes-for-spaces-in-tags

These are used for Keyword filtering.

Tags use Jekyll's native tagging system.
Separate your tags by spaces and use dashes in place of spaces within the tag.
Reference existing tags and use those where possible instead of creating new ones.

If applicable, please include a GUI, web-based, or command-line tag.

{% include collect/tags.html fetch='tags' %}

## Packages

packages: [packages of note, separated by commas, use brackets for multiple]

If using more than one term, place terms in brackets and separate with commas.

{% include collect/tags.html fetch='packages' %}

## Workbook Category

wbs: computing-skills

This is automatically compiled for existing workbooks.

{% include collect/tags.html fetch='wbs' name='workbook' %}

## Working Group

wgs: omics

If you are writing this as a member of a working group, add your working group shorthand with this frontmatter variable.
{% include collect/tags.html list=site.data.workinggroups fetch='wgs' name='working group' %}

## Author

author: Aleksandra Badaczewska

For multiple authors, place the names in brackets and separate with commas.
author: [Author 1, Author 2, etc]

If you have not added your information to authors.yml, you will need to do so for it to show up on the page.

## Layout

layout: single

## Organization Level

org: 1

This is only needed for Intro and Index pages.

## Order within a level

ordered: 1
