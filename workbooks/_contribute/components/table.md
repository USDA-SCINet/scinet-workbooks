---
title: Table
description: "A table displays information in columns and rows."

components:
  title: Markdown Component Formatting
  name: table
  code: table
  intro: "These examples use code to format markdown tables."
  sections:
    - title: Markdown Table Appearance
      unexpanded: true
      options: 
        - label: Striped Table
          class: striped sticky
        - label: Borderless Table
          class: borderless
        - label: Compact Table
          class: striped compact
    - title: Markdown Table Flex Options
      intro: Basic markdown tables do not allow for the code needed for stacking tables, but do allow for scrollable tables and sticky headers.
      unexpanded: true
      options:
        - label: Sticky Table
          class: sticky
        - label: Scrollable Striped Table
          class: scrollable-table striped
    - title: Markdown Sortable Tables
      unexpanded: true
      description: "Please note that the markdown example only works for very basic tables.  If you would like more complex sorting, use HTML code."
      options:
        - label: Sorted Table - Markdown
          code: tablemd
          caption: Table Caption Required
          class: striped simple-sorted-table
        - label: Sorted Table - HTML
          code: tablehtml    
          class: striped simple-sorted-table


importing-information:
  title: Generating tables from data
  name: jstable
  intro: "This code will import and format data from a json file.  Data loaded this way is rendered for the user on page load, so if you would like to share large datasets consider a download option instead."
  sections: 
    - title: Table appearance
      unexpanded: true
      options:
        - label: Auto Striped Table
          data:
            file: /data/table.json
            title: Striped json table
            classes: striped
            sticky: true
        - label: Auto Borderless Table
          data:
            file: /data/table.json
            title: Borderless json table
            classes: borderless
            sticky: true
        - label: Auto Mixed Display Table
          data:
            file: /data/table.json
            title: Mixed display json table
            classes: striped borderless compact
    - title: Table flex options
      unexpanded: true
      options:
        - label: Auto Sticky Table
          data:
            file: /data/table.json
            title: Sticky json table
            sticky: true
        - label: Scrolling Table
          data:
            file: /data/table.json
            title: Scrolling json table
            scroll: true
            fixed: true
        - label: Fixed Table
          data:
            file: /data/table.json
            title: Fixed json table
            fixed: true
#    - title: Sortable Tables
#      unexpanded: true
#      options:
#        - label: Sorted Table
#          data:
#            file: /data/table.json
#            title: Striped json table
#            classes: striped
#            sticky: true
#            sortable: true


---

Tables are useful for displaying and organizing information, making it easier to understand complex content.

*  **When to use a table component:**
    *  Displaying tabular data such as statistical data
    *  Displaying lists of resources with similarly structured content
    *  Detail parameters or arguments for functions or commands

*  **When to consider other options:**
    *  Do not use in place of a layout grid
    *  Long-form content.  Table data should be brief and easy to scan.
        *  If you find yourself using multiple bullet points or paragraphs in a cell, consider:
            *  Traditional page headers
            *  Accordions
            *  Cards
    *  Complex data visualizations*
        *  Consider graphics such as a bar chart or infographic
        *  *A table can be used to make graphics more accessible
    *  Non-tabular data

Additional guidance can be found on the [USWDS component page](https://designsystem.digital.gov/components/table/)

{% include contribute/sections section='importing-information' %}