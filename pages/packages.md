---
title: Referenced Packages and Libraries
description: A table of listed packages and libraries
permalink: /glossary/packages
layout: single

style: single
beforeTOC:
  - title: Glossary
    url: /glossary
---

{% assign inner = site.documents | where: 'variety', 'workbook' %}
{% assign valued = inner | map: 'packages' | uniq | compact %}
{% include packages packages=valued sortable=true title='Packages and Libraries' %}
