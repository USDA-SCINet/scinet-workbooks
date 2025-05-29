---
title: Buttons
description: "A button draws attention to important actions with a large selectable surface."

components:
  name: button
  sections:
    - title: Button Options
      options:
        - label: Basic Buttons
          liquid: true
          sections:
            - class: default
              href: "#"
              txt: "Default Link"
            - class: secondary
              href: "#"
              txt: "Secondary Link"
            - class: base
              href: "#"
              txt: "Base Link"
            - class: outline
              href: "#"
              txt: "Outlined Button"
        # - label: Additional Flexibility
        #   liquid: true
        #   sections:
        #     - class: default
        #       href: "#"
        #       txt: "Default Link"
        #     - class: secondary
        #       href: "#"
        #       txt: "Secondary Link"
        #     - class: base
        #       txt: Alternative Attributes
        #       attr: "included details"
        #       sections: "custom information"
    - title: Button Groups
      unexpanded: true
      unstyledlist: true
      description: "If you have multiple buttons to list together, consider a button group. The default button group arranges each button as a separate element with a gap between them. On mobile devices, the buttons are arranged vertically."
      options:
        - label: Button Group
          sections:
            - class: default
              href: "#"
              txt: "Default Link"
            - class: secondary
              href: "#"
              txt: "Secondary Link"
            - class: base
              href: "#"
              txt: "Base Link"
            - class: outline
              href: "#"
              txt: "Outlined Button"
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
              href: "#"
              txt: "Base Link"
            - class: outline
              href: "#"
              txt: "Outlined Button"
              # attr: "included details"
              # sections: "custom information"

published: false   
---

Additional guidance can be found on the [USWDS component page](https://designsystem.digital.gov/components/button/)