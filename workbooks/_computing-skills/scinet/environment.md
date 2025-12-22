---
title: Setting up a reproducible environment
description: "Set up a flexible software environment on SCINet using Conda, modules, or containers, and enhance efficiency with shell customization"
type: interactive tutorial
author: [Aleksandra Badaczewska]
index: 
order: 6

header:
  overlay_image: 07-wrangling/assets/img/07_data_acquisition_banner.png
svg: /genomics.svg

objectives: 
  - "Simplify your shell work with aliases and environment variables."
  - "Learn how to use software management tools like modules, containers, and virtual environments."
  - "Create environments that support sharing, re-use, and long-term maintenance of research pipelines."
  - "Understand the importance of reproducibility in computational research."

applications:
  - "Reproduce results across systems (e.g., from HPC to local machine)."
  - "Share environments with collaborators using consistent setup instructions or exported configs."
  - "Simplify training and onboarding for students or new team members."
  - "Track and preserve the software stack used in publications or long-term projects."


terms: [Command Line Interface, Command, Alias, Module System, Container, Environment File, Virtual Environment, Conda]

takeaways: 
  - "Use system modules and containers when possible to reduce setup effort and dependency issues."
  - "Create virtual environments (with Conda or venv) for projects that need specific versions or packages."
  - "Define common paths and commands using environment variables and aliases to improve efficiency."
  - "Document your environment setup in a `README` or an `.env`/`.yml` file for reproducibility."
  - "Combine built-in variables (like $USER or $HOSTNAME) with your own custom variables (e.g., $PROJDIR) to simplify navigation and reuse common paths or settings."
  - "Name aliases and functions clearly so they remain easy to remember and avoid conflicts with commands."
  - "Organize your startup script (~/.bashrc, ~/.zshrc) by grouping variables, aliases, and functions, and add comments so future you (or collaborators) understand the setup."
  - "Avoid relying on the login environment. Instead, activate your reproducible environment explicitly at the start of each session."

overview: [objectives, applications, terminology]

kernel:
  name: example_kernel
---


<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1">
An active SCINet account with access to shared and project directories is required to complete this tutorial. 
Basic familiarity with the [SCINet File System](/computing-skills/scinet/file_system) and [Shell interface](/computing-skills/scinet/interfaces) for [navigating directories](/computing-skills/command-line/#navigating-the-unix-file-system) and [managing files](/computing-skills/command-line/#file-management-in-the-shell) is also expected.
</div></div>


## Overview

Explore how to create efficient and reproducible software ecosystems for your research on SCINet supercomputers by combining pre-installed tools, containers, and virtual environments. Learn how environment configuration supports consistency, collaboration, and long-term project sustainability.

{% include overviews %}



## Getting started

First, you will log in through **Open OnDemand (OOD)** and use the shell to access SCINet file system locations.

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="<h3 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>Access the shell via SCINet OOD</h3><span style='font-weight: 300;'>(required) used for accessing supercomputers</span>" class="primary" controls="access-scinet" icon=false %}
<div id="access-scinet" class="accordion_content" markdown='1' hidden> 
{% include setup/scinet_login %}
{% include setup/ood_shell %}
</div>
</div>

The goal is to introduce the environment options available on SCINet supercomputers and show how they can be combined flexibly to support efficient, portable, and reproducible research. You’ll explore tools like modules, containers, and virtual environments (Conda, venv), along with shell features like aliases and environment variables, to streamline your workflows and ensure consistency across systems.

Before completing this section, it is recommended that you first go through the following tutorials:
- [File system on Atlas and Ceres supercomputers](/computing-skills/scinet/file_system)
- [Setting up a project and managing storage](/computing-skills/scinet/project_setup)
- [Shell customization](/computing-skills/command-line/configuration/) module in the *Computing skills* workbook

<div class="process-list ul" markdown="1">

### Creating a Conda environment

Many workbook tutorials (and research pipelines) use [Conda](https://scinet.usda.gov/guides/software/conda), 
which allows you to create reproducible computing environments. This approach is flexible, 
since Conda can manage packages across different programming languages (not just Python), 
so you can bring together the tools you need.

{% include alert class="warning" title="It is not reccomended to use /home directory for Conda" content="Software installs that require a lot of space, such as Conda virtual environments, can quickly max out your quota.  It is reccomended to use `/90daydata` or `/project` instead. If you want to persist the Conda env for later use, [modify the workflow to use a /project directory](/computing-skills/scinet/user_workspace#modify-workflows-to-use-project-space) to set up the environment." %}

If the tutorial uses a Conda environment, it will specify how to create or load it. 
- **CLI shell:** You can create it in a shell session, often around the same time you're setting up dedicated workspace, but this step is independent. 
- **IDE:** If the tutorial is designed to be run in an IDE (e.g., Jupyter, RStudio), you can also create and activate the environment through the IDE's console.


#### Example Conda workflow

<ol>
<li markdown="1">
Open the Shell &emsp; *([see guide if needed](#getting-started))*
</li>

<li markdown="1">Request a compute node &emsp; *([see guide if needed](/computing-skills/scinet/user_workspace#always-request-a-compute-node))*
```bash
# replace <project_name> with your project_name; "sandbox" for new users without a project
srun -A <project_name> -t 02:00:00 --pty bash
```
{% include setup/find_projects %}
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


### Using pre-installed software

On SCINet supercomputers, many common tools and libraries are already available in two main ways:
- **Modules**: software installed and managed by SCINet VRSC, which you can load using a command.
- **Containers**: ready-to-use software environments packaged as Docker/Apptainer images. These are stored under `/reference/containers/` and must be executed with the apptainer command.

This saves time and space compared to building your own environment, but you’ll need to know how to check what’s available and how to load it properly. 
If the tutorial uses a Modules or Containers environment, it will specify how to use it.

{% include alert class="warning" title="Run modules and containers on compute nodes" content="Software should be loaded and executed from a compute node, either in an interactive session with `srun` in a shell or inside a batch script submitted to the SLURM queue. Avoid running jobs on login nodes." %}


<div class="process-list" markdown="1">

### Modules

Modules provide flexible access to installed software without needing custom builds. Tutorials will usually tell you which module(s) to load and how.
- Use `module avail` to see all available modules.
- Use `module spider <tool_name>` to search for a specific package or version.
- Load the software with `module load <tool_name>`.

#### Example Module workflow

<ol> 
<li markdown="1"> Open the Shell &emsp; *([see guide if needed](#getting-started))* 
</li> 

<li markdown="1">Request a compute node &emsp; *([see guide if needed](/computing-skills/scinet/user_workspace#always-request-a-compute-node))* 
```bash 
srun -A <project_name> -t 01:00:00 --pty bash 
``` 
</li> 

<li markdown="1">Check which modules are available and load the one you need: 
```bash 
module avail python
# python_3/3.9.18    python_3/3.11.1 (D)    python_3/3.13.7   Where: D - Default Module
module load python_3/3.13.7
``` 
</li> 

<li markdown="1">Run your software: 
```bash 
python3 --version
# Python 3.13.7
``` 
</li> 

<li markdown="1">Document the environment in your pipeline README: 
<div class="highlighted highlighted--question"><div class="highlighted__body" markdown="1">
<h4 class="highlighted__heading">You Try! &nbsp; Document for Reproducibility</h4>
1. Navigate to your pipeline/tutorial workspace. *([see guide if needed](/computing-skills/scinet/project_setup#pipeline-workspace))*
1. Locate the README.md file, or create one. *([see guide if needed](/computing-skills/scinet/project_setup#readme))* 
1. Find/Add the **Environment** section and include the following details: 
```text
- Environment type: Module system  
- Modules loaded: e.g., `R/4.3.0`, `gcc/12.2.0`  
- Location: SCINet supercomputer (Atlas or Ceres)  
- Key command(s):
$ module load R/4.3.0
$ module load gcc/12.2.0
```
</div></div>
</li>
</ol>

To learn more, explore SCINet User Guide: [Environment Modules](https://scinet.usda.gov/guides/software/modules#environment-modules).

### Containers

If a tool is not installed as a module, you can often run it as a container image. 
Pre-installed images can be found under **/reference/containers/** and require to be run with Apptainer. 
If you need a different version, you can pull a custom image and convert it for Apptainer. 

{% include alert class="basic" title="Persistent vs temporary storage for containers" content="Images in `/reference/containers/` are read-only. If you pull your own container image, store it under `/project/` for persistence or `/90daydata/` if you only need it temporarily." %}

#### Example Container workflow

<ol> 
<li markdown="1">Open the Shell &emsp; *([see guide if needed](#getting-started))* 
</li> 

<li markdown="1">Request a compute node &emsp; *([see guide if needed](/computing-skills/scinet/user_workspace#always-request-a-compute-node))* 
```bash 
srun -A <project_name> -t 01:00:00 --pty bash 
``` 
</li> 

<li markdown="1">Find the required tool version:
<ul>
<li markdown="1">Check if the software is already available as a module (simpler option): 
```bash 
module avail salmon               # salmon/1.10.0
module load salmon/1.10.0
salmon --version                  # salmon 1.10.0
``` 
</li> 

<li markdown="1">If module not provided or you need a diferent version, check for available containers:
```bash
ls /reference/containers/         # display all
ls /reference/containers/ | grep "salmon"   # search for a specific tool
ls /reference/containers/salmon   # list tool variants/versions
# 0.10.0  0.10.1  0.9.1
```
</li>

<li markdown="1">If a different version is needed, pull it from [DockerHub](https://hub.docker.com/) or [another registry](https://scinet.usda.gov/guides/software/singularity#container-images): 
```bash 
cd /90daydata/shared/$USER/envs 
apptainer pull salmon-1.10.3.sif docker://combinelab/salmon:1.10.3
ls      # salmon-1.10.3.sif
``` 
</li> 
</ul>
</li>

<li markdown="1">Load Apptainer module first:
```bash
module load apptainer
```
and run the selected container image from any location, specifying its path.

- run a container directly from `/reference/containers/`: 
```bash 
apptainer exec /reference/containers/salmon/0.10.1/salmon-0.10.1.simg salmon --version
# salmon 0.10.1
``` 
- run a custom container downloaded to your workspace:
```bash
# while in /90daydata/shared/$USER/envs  
apptainer exec salmon-1.10.3.sif salmon --version
# salmon 1.10.3
```
```bash
# provide absolute path when in different location
apptainer exec /90daydata/shared/$USER/envs/salmon-1.10.3.sif salmon --help
```
</li> 

<li markdown="1">Document the environment in your pipeline README:  
<div class="highlighted highlighted--question"><div class="highlighted__body" markdown="1">
<h4 class="highlighted__heading">You Try! &nbsp; Document for Reproducibility</h4>
1. Navigate to your pipeline/tutorial workspace. *([see guide if needed](/computing-skills/scinet/project_setup#pipeline-workspace))*
1. Locate the README.md file, or create one. *([see guide if needed](/computing-skills/scinet/project_setup#readme))* 
1. Find/Add the **Environment** section and include the following details:
```text
- Environment type: Container (Apptainer)  
- Image source: /reference/containers/salmon/1.10.1/salmon-1.10.1.sif
    (or pulled from DockerHub: docker://combinelab/salmon:1.10.3)  
- Version: salmon 1.10.1 (or whichever was used)  
- Key command(s):  
$ apptainer exec /reference/containers/salmon/1.10.1/salmon-1.10.1.sif salmon --version
```
</div></div>
</li>
</ol>

To learn more, explore SCINet User Guide: [Singularity/Apptainer Containers](https://scinet.usda.gov/guides/software/singularity#singularity-apptainer-containers).

</div>
</div>

## Next steps (optional)

You can make your work in the shell faster and more consistent by taking advantage of customization features. Defining [shell variables](#store-reusable-paths-in-shell-variables) helps you reuse important values such as system paths or your own commonly used directories. [Aliases](#create-shortcuts-for-commands-with-aliases) let you create short forms of commands you run often, especially when they require specific options. For more complex routines, [shell functions]() allow you to group commands into reusable workflows. To ensure these improvements are always available, you can persist your configuration by adding them to a [startup script]() that loads each time you open a shell session.

Select what you need to simplify your daily routine in the HPC system and learn from the practical tutorials highlighted in the sections below.

<div class="process-list" markdown="1">

### Store reusable paths in Shell Variables

Shell variables let you store values such as directory paths, usernames, or configuration details so you can reuse them without retyping each time. 
They simplify navigation and command execution.

For example, you can define a variable storing the path to your workspace in `/project`:
```bash
export PROJDIR=/project/project_name/$USER/     # remember to update your project_name
cd $PROJDIR                                     # use a new variable as a shortcut
pwd         # check, that you've been redirected to your workspace
```

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1">
The shell on SCINet supercomputers already provides useful built-in variables such as `$USER` (your username), `$PWD` (current working directory), and `$HOSTNAME` (the machine you’re on), `$PATH` (search path for executable commands/tools), etc. 
```bash
echo "$USER on $HOSTNAME in $PWD" 
# user.name on ceres.ceres.scinet.usda.gov in /home/user.name
```
To see the full list of environment variables in your shell session, run **`env`** command.
</div></div>


See the [Using environment and shell variables](/computing-skills/command-line/configuration/variables) tutorial for more examples and ready-made snippets.


### Create shortcuts for commands with Aliases

Aliases create quick shortcuts for commands you run often, especially with fixed options. 

For example, to request an interactive session on a compute node:
```bash
alias get_interactive='srun -N1 -n1 -t 1:00:00 -A project_name'   # remember to update your project_name
get_interactive       # run a new alias as a command
# starts an interactive job allocation
```

Check the tutorial: [Alias definition and usage](/computing-skills/command-line/configuration/aliases/) for more alias ideas and efficiency tips.


### Automate routine tasks with Shell Functions

Functions allow you to combine multiple commands into a single reusable routine. 

For example, a simple function to create and enter a new directory:
```bash
mkcd () { mkdir -p "$1" && cd "$1"; }     # this function expects one argument ($1)
mkcd results    # use a function to create & enter the new "results" directory
pwd             # you've been redirected to ./results
```

The [Shell Functions](/computing-skills/command-line/configuration/functions/) tutorial introduces examples with detailed explanation while [Shell Function examples](/computing-skills/command-line/configuration/functions/examples) provides ready-made functions useful for HPC workflows.


### Make customizations persistent in your Startup Script

Startup scripts like `~/.bashrc` or `~/.zshrc` ensure your variables, aliases, and functions persist, i.e., are loaded in every new shell session automatically, so you can use them immediately without re-definition. 

For example, add your `alias get_interactive=...` line to `~/.bashrc` so it’s always available.
```bash
cd ~              # navigate tou your Home directory where the .bashrc exists
nano .bashrc      # edit the startup script
# copy-paste your permanent shell variables, aliases and shell functions
# save changes and close file edition
source ~/.bashrc  # reload the startup script to activate changes in a current shell
```

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1">
You can quickly add an alias or variable permanently to your startup script by appending it on-the-fly with a command like:
```bash
echo "export PROJDIR=/project/project_name/$USER/" >> ~/.bashrc 
echo "alias get_interactive='srun -N1 -n1 -t 1:00:00 -A <project_name>'" >> ~/.bashrc
```
This writes the line to the end of your startup script so it loads automatically in future sessions.
</div></div>

The [Shell configuration persistence](/computing-skills/command-line/configuration/persistence/) tutorial explains where to place configurations and how to organize them for long-term efficiency. The example content for [startup scripts
](/computing-skills/command-line/configuration/persistence/startup-scripts) is provided as reference material.

</div>


{% if page.takeaways %}
## Best Practices

<ul>
  {% for takeaway in page.takeaways %}
    <li>{{ takeaway }}</li>
  {% endfor %}
</ul>
{% endif %}