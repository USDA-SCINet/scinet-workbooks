---
title: Alerts
description: "An alert keeps users informed of important and sometimes time-sensitive changes."

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


Additional guidance can be found on the [USWDS component page](https://designsystem.digital.gov/components/alert/)