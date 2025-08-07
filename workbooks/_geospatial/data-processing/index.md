---

title: Geospatial Data Processing
description: "(Page description here)"
type: introduction

tags: 
packages: 
level: 
author: 
index: 1
---

## Setting up for the Python tutorials

Below are commands to run to create a new Conda environment named `geoenv` that contains the packages 
used in this tutorial series. 

1.  {% include setup/workdir %}
1.  Load Conda.  {% include components/setup/load-miniconda %}    
1.  Check to see if you have the environment already created by running:
    ```bash
    conda env list
    ```
    * If you see `geoenv` in the list, you can skip ahead to your tutorial!
1.  If you do not see `geoenv`, create and load your new Conda environment:  
    ```bash
    conda create --name geoenv
    source activate geoenv
    conda install geopandas rioxarray rasterstats plotnine ipykernel ipython dask dask-jobqueue -c conda-forge
    ```
1.  Some of these tutorials use Jupyter, so to have JupyterLab use this conda environment, we will make a kernel.
    ```bash
    ipython kernel install --user --name=geoenv_kernel
    ```
