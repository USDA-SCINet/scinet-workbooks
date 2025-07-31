---
title: "Image Machine Learning"
author:
index: 2
wgs: geospatial
description: (description of contents)
interface: [Jupyter, RStudio]
type: introduction
kernel: true

pythonenv: image-ml-for-python
renv: image-ml-for-r

setup: [mkdir]

conda: [python=3.7 numpy matplotlib imageio scikit-image ipykernel -y]
---

Materials modified from the USDA ARS AI Workshop 2020.

## Getting Started

{% include setup/90daydata %}

### For Python

{% include setups environment=page.pythonenv %}
1. {% include setup/conda %}
1. {% include setup/kernel %}
1. Launch JupyterLab in OoD and open a terminal
  * File > New > Terminal
1. Make sure the tutorial kernel is selected:
  * Kernel > Change Kernel > select `{{ kernel }}` from the drop down menu
1. In the notebook's empty cell paste this:
  ```
  import keras
  print(keras.backend.backend())
  ```
1. Run the cell: 
  * Click Run > Run All Cells or with your cursor inside the cell type Shift+Enter. 
  * The result should tell you you're using TensorFlow backend.

### For R

{% include setups environment=page.renv %}

<!--## Creating an Environment for this Module

The tutorial code uses 90daydata, but you can use your own project directory by substituting `/project/your_project_name/` wherever you see `/90daydata/shared/your_name/`.

Setup for this tutorial assumes you know how to access your HPC of choice and set up a Conda environment.

1. In the shell, request a compute node and make your working directory.
2. Load Conda.
2. Create and load your new Conda environment for this workbook.
    The build may take up to 10 minutes.
    ```bash
    conda env create --prefix /90daydata/shared/your_name/envs/wb_image_ml -f wb_image_ml.yml

    source activate /90daydata/shared/your_name/envs/wb_image_ml
    ```




1. Launch Ceres OoD and open

2) Log into the Ceres OOD and open JupyterLab.
Node Type: short
Number of Cores: 4
Job Duration: 02:00:00
Working Directory: /90daydata/shared/your_name
leave all other fields blank
3) Create or edit the .condarc file in your home directory

open or create .condarc with
  nano .condarc 
Paste the following somewhere near the bottom:
  pkgs_dirs:
    - /90daydata/shared/yourname/envs
This allows you to direct your package installs using --prefix in the next step.

4) Build the workshop Conda environment

If using /90daydata/shared, create a new folder there mkdir /90daydata/shared/yourname, then modify the instructions below by substituting /90daydata/shared/yourname/ wherever you see /project/your_project_name/.

open a terminal in JupyterLab with File > New > Terminal

navigate to your project directory
  cd /project/your_project_name
download the workshop yml file
  wget https://kerriegeil.github.io/NMSU-USDA-ARS-AI-Workshops/aiworkshop.yml
build the environment in your project directory
  source activate
  conda env create --prefix /project/your_project_name/envs/aiworkshop -f aiworkshop.yml
The build may take a while- up to 10 minutes or possibly longer. When the build finishes:

  conda activate /project/your_project_name/envs/aiworkshop
5) Run a test Jupyter Notebook and screen shot your results

launch a new notebook in JupyterLab: File > New > Notebook
make sure the workshop kernel is selected: Kernel > Change Kernel > select aiworkshop from the drop down menu
in the notebook’s empty cell paste this:
import keras
print(keras.backend.backend())

run the cell: click Run > Run All Cells or with your cursor inside the cell type Shift+Enter. The result should tell you you’re using TensorFlow backend.-->