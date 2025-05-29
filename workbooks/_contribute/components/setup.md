---
title: Setup
description: A standardized format for the Tutorial Setup Instructions of your tutorial or lesson.

components:
  name: setup
  intro: You can customize the setup component using the page's frontmatter.
  sections:
    - title: Basic Command Line
      unexpanded: true
      no-comp-list: true
      options:
        - label: Command Line
          hpc: Ceres
          access: OOD
          setup:
            srun: "srun --reservation=workshop_reservation_name -p ceres -t 05:00:00 -n 1 -N 2 --pty Bash"
    - title: JupyterLab
      unexpanded: true
      no-comp-list: true
      options:
        - label: JupyterLab
          access: OOD
          setup:
            shell: true
            notebook: demo.ipynb
            conda:
              env: demo_env
              install:
                - geopandas 
                - rioxarray 
                - rasterstats
            jupyterlab:
              kernel: demo_kernel
    - title: RStudio
      unexpanded: true
      no-comp-list: true
      options:
        - label: RStudio
          access: OOD
          setup:
            shell: true
            rstudio: true
published: false
---

---

*  **When to use the setup component**
    * At the beginning of tutorials and lessons, after your introduction and overview component

*  **When to consider something else**
    * Exceptions?

