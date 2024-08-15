---
title: Buttons
description: "A button draws attention to important actions with a large selectable surface."

components:
  name: button
  sections:
    - title: Button Options
      no-comp-list: true
      options:
        - class: default
        - class: secondary
        - class: base
        - class: outline
        - class: big
        - label: Additional Flexibility
          liquid: true
          break: true
          sections:
            - class: default
              href: "#"
              txt: "Default Link"
            - class: secondary
              href: "#"
              txt: "Secondary Link"
            - class: base
              txt: Alternative Attributes
              attr: "included details"
              sections: "custom information"
    - title: Button Groups
      unexpanded: true
      unstyledlist: true
      description: "If you have multiple buttons to list together, consider a button group. The default button group arranges each button as a separate element with a gap between them. On mobile devices, the buttons are arranged vertically."
      options:
        - label: Button Group
        - label: Button Group - Liquid
          liquid: true
          no-comp-display: true
          sections:
            - class: default
              href: "#"
              txt: "Default Link"
            - class: secondary
              href: "#"
              txt: "Secondary Link"
            - class: base
              txt: Alternative Attributes
              attr: "included details"
              sections: "custom information"
    
---

Additional guidance can be found on the [USWDS component page](https://designsystem.digital.gov/components/button/)