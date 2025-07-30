---
title: 'Dropdown or Accordion'
description: "An accordion is a list of headers that hide or reveal additional content when selected"

components:
  name: accordion
  sections:
    - title: Accordion Options
      unexpanded: true
      noborder: true
      code: accordion
      options: 
        - label: Multiselectable Accordion
          attr: 'data-allow-multiple'
        - label: Standard Accordion
    - title: Accordion Header Colors
      unexpanded: true
      no-code-list: true
      options:
        - label: Header Button Color Options
          titles: Header Color
          sections:
            - title: Basic Header
            - class: info
            - class: warning
            - class: success
            - class: error
            - class: emergency
            - class: primary
            - class: secondary
            - class: outline
        - label: Header Button Icon Options
          titles: Header Icon
          icon: true
          sections:
            - title: Basic - important
              icon: star
            - title: Basic - flagged
              icon: flag
            - class: info
            - class: tip
            - class: note
            - class: warning     
            - class: highlighted
            - class: question
            - class: success
            - class: error
            - class: emergency
            - title: Primary - important
              class: primary
              icon: star
            - title: Primary - flagged
              class: primary
              icon: flag
            - title: Outline - important
              class: outline
              icon: star
            - title: Outline - flagged
              class: outline
              icon: flag

              
---

*  **When to use the accordion component**
    * If users will only need a few specific pieces of content within a page.
    * If you have only a small space to display a lot of content.
    * For hiding code chunks or answers to questions

*  **When to consider something else**
    * If users need to see most or all of the information on a page.
    * If there is not enough content to warrant condensing.  Accordions increase interaction cost for users.

Additional guidance can be found on the [USWDS component page](https://designsystem.digital.gov/components/accordion/)

## Using the accordion component

*  **Use meaningful titles**:
    *  Accordion labels should be informative, such as "Additional information about GeoCDL Implimentation" rather than vague like “Click here.”
*  **Multiselectable accordions**:
    *  Add the data-allow-multiple attribute to any usa-accordion to create a multiselectable accordion group.
*  **Default an accordion button to open**: 
    *  Add *expanded="true"* to the accordion include statement to have that section open by default at page load.