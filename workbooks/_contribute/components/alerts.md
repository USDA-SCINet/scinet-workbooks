---
title: Alerts
description: "An alert keeps users informed of important information and changes."

components:
  name: alert
  sections:
    - title: Alert Color
      no-comp-list: true
      pluralize: true
      options:
        - class: info
        - class: warning
        - class: success
        - class: error
        - class: emergency
    - title: Alert Option
      no-comp-list: true
      pluralize: true
      unexpanded: true
      options:
        - class: basic
        - class: success
        - class: info
        - class: tip
        - class: note
        - class: download
        - class: warning
        - class: highlighted
        - class: question
        - class: error
        - class: emergency
    - title: Alternative Alert Code
      description: "If you do not have complex markdown in your alert, you can alternatively use the liquid component instead of HTML"
      no-comp-list: true
      liquid: true
      no-preview: true
      options:
        - class: basic
        - class: success
        - class: info
        - class: tip
        - class: note
        - class: download
        - class: warning
        - class: highlighted
        - class: question
        - class: error
        - class: emergency
    
---

Alerts allow for emphasis of important information and context.

*  **When to use the alert component**
    * Short, important callouts of information.
    * Warnings or error messages

*  **When to consider something else**
    * Your content is a standard continuation of the lesson.  Consider paragraph or list formatting instead.
    * The content is long.  Important long-form content should have its own section.
    * The alert content is longer, but only applies to a subset of users.  Consider an [accordion](./accordion) with an appropriate icon. 

{% include alert class="error" title="Do not overuse!" content="Overuse of alerts, highlighting, and font decoration leads to attention fatigue.  This results in decreased attention and comprehension of the tutorial's content rather than the desired emphasis." %}

Additional guidance can be found on the [USWDS component page](https://designsystem.digital.gov/components/alert/)