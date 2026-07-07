---
title: Conda Environments
description: "Package management using Conda"
type: interactive tutorial
author: [Aleksandra Badaczewska]
index: 
order: 10

objectives: 
  - "Create environments that support sharing, re-use, and long-term maintenance of research pipelines."
  - "Understand the importance of reproducibility in computational research."

applications:
  - "Reproduce results across systems (e.g., from HPC to local machine)."
  - "Share environments with collaborators using consistent setup instructions or exported configs."

tags: [Conda, environment]
terms: [environment file, virtual environment, Conda]

overview: [objectives, applications, terminology]

kernel:
  name: example_kernel
---

## Overview

Many workbook tutorials (and research pipelines) use [Conda](https://scinet.usda.gov/guides/software/conda), 
which allows you to create reproducible computing environments. This approach is flexible, 
since Conda can manage packages across different programming languages (not just Python), 
so you can bring together the tools you need.

{% include alert class="warning" title="It is not reccomended to use /home directory for Conda" content="Software installs that require a lot of space, such as Conda virtual environments, can quickly max out your quota.  It is reccomended to use `/90daydata` or `/project` instead. If you want to persist the Conda env for later use, [modify the workflow to use a /project directory](/computing-skills/scinet/user_workspace#modify-workflows-to-use-project-space) to set up the environment." %}

If the tutorial uses a Conda environment, it will specify how to create or load it. 
- **CLI shell:** You can create it in a shell session, often around the same time you're setting up dedicated workspace, but this step is independent. 
- **IDE:** If the tutorial is designed to be run in an IDE (e.g., Jupyter, RStudio), you can also create and activate the environment through the IDE's console.

{% include overviews %}

## Getting started

Log in through **Open OnDemand (OOD)** and use the shell to access SCINet file system locations.
{% include setup/ood/accord shell=true %}

{% include setup/workdir %}

<div class="process-list ul" markdown="1">

## Example Conda workflow

<ol>
<li markdown="1">
Open the Shell &emsp; *([see guide if needed](#getting-started))*
</li>

<li markdown="1">Request a compute node &emsp; *([see guide if needed](/computing-skills/scinet/user_workspace#always-request-a-compute-node))*
```bash
# replace <project_name> with your project_name; "sandbox" for new users without a project
srun -A <project_name> -t 02:00:00 --pty bash
```
{% include segment/find_projects %}
</li>

<li markdown="1">Load Conda module.  
- Atlas: `module load miniconda3`
- Ceres: `module load miniconda`
</li>

<li markdown="1">Create your environment with `--prefix` option.
{% assign env="example" %}  
{% include alert class="basic" title="The prefix sets the directory where the env will be stored." content="Tutorials often place envs under `/90daydata/` path, which is temporary. For persistence, you can save the environment under `/project/`, even if you continue running your calculations in 90daydata or other scratch spaces." %}
* If you are using an environment yml file:
    * Download the environment yml file:  
      ```bash
      mkdir -p /90daydata/shared/$USER/envs   # create your workspace for environments
      cd /90daydata/shared/$USER/envs
      wget {{ site.url }}{{ file_path }}/{{ env }}.yml
      ```
    * Create and activate your new Conda environment:  
      ```bash
      conda env create --prefix /90daydata/shared/$USER/envs/{{ env }} -f {{ env }}.yml
      source activate /90daydata/shared/$USER/envs/{{ env }}
      ```  
* If you are creating your environment from scratch:  
  ```bash
  conda create --prefix /90daydata/shared/$USER/envs/{{ env }}  # create env
  source activate /90daydata/shared/$USER/envs/{{ env }}        # activate env
  conda install nodejs ruby=3.4.4 compilers                     # install packages
  ```  
* If you are using an existing environment, you just need to load it:  
  ```bash
  source activate /90daydata/shared/$USER/envs/{{ env }}
  ```
</li>

<li markdown="1">If you plan to use this environment in Jupyter IDE interface:  
1.  {% include setup/kernel %}
1.  In JupyterLab, make sure the tutorial kernel is selected:
    * Kernel > Change Kernel > select "{{ kernel }}" from the drop down menu
</li>

<li markdown="1">Document the environment in your pipeline README:  
<div class="highlighted highlighted--question"><div class="highlighted__body" markdown="1">
<h4 class="highlighted__heading">You Try! &nbsp; Document for Reproducibility</h4>
1. Navigate to your pipeline/tutorial workspace. *([see guide if needed](/computing-skills/scinet/project_setup#pipeline-workspace))*
1. Locate the README.md file, or create one. *([see guide if needed](/computing-skills/scinet/project_setup#readme))* 
1. Find/Add the **Environment** section and include the following details:
```text
## Environment
- Environment type: Conda  
- Environment path: /90daydata/shared/$USER/envs/example (or /project/...)  
- Creation source: environment YAML file or list of installed packages  
- Key command:  
$ conda env create --prefix /project/$USER/envs/example -f example.yml
```
</div></div>
</li>
</ol>

To learn more, explore SCINet User Guide: [User-Installed Software with Conda](https://scinet.usda.gov/guides/software/conda#user-installed-software-with-conda).

</div>