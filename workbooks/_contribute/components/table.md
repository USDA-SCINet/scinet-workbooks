---
title: Table
description: "A table displays information in columns and rows."

components:
  name: table
  code: table
  sections:
    - title: Standard Tables
      options:
        - label: Standard Sticky Table
          class: sticky
        - label: Standard Nonsticky Table
          class: ''
    - title: Striped Tables
      unexpanded: true
      options: 
        - label: Striped Sticky Table
          class: striped sticky
        - label: Striped Nonsticky Table
          class: ''
    - title: Borderless Tables
      unexpanded: true
      options: 
        - label: Borderless Table
          class: borderless
    - title: Scrollable tables
      unexpanded: true
      options:
        - label: Scrollable Table
          class: scrollable-table
        - label: Scrollable Striped Table
          class: scrollable-table striped
    - title: Sortable Tables
      unexpanded: true
      description: "Please note that the markdown example only works for very basic tables.  If you would like more complex sorting, use HTML code."
      options:
        - label: Sorted Table - Markdown
          code: tablemd
          class: striped simple-sorted-table
        - label: Sorted Table - HTML
          code: tablehtml    
          class: striped simple-sorted-table

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