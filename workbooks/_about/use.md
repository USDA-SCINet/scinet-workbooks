---
title: Getting Started with the SCINet Workbooks
description: A guide to using the SCINet Workbook
order: 1
author: The SCINet Office
updated: 2025-06-24 

objective: "objective of this tutorial"
overview: [objectives]

mkdir: getting-started_dir
survey: true
---


## Overview

Introduction to your tutorial and what the tutorial aims to accomplish.

{% include overviews %}

### Tutorial Steps:
* **Accessing SCINet**
    1. Request a SCINet account
    1. Log in to SCINet
* **Setting up your workspace**
    * Making your workspace directory in /90daydata
    * Creating a Conda environment
    * Modifying workflows to use /project
* **Accessing interfaces on SCINet**
    * Using the Shell
    * RStudio
    * JupyterLab
    * VS Code
* **Request compute resources and submit jobs on SCINet**

## Accessing SCINet

<div class="process-list" markdown="1">

### Request a SCINet account

A SCINet account is required to access SCINet. You can [request a SCINet account by visiting here](https://scinet.usda.gov/about/signup#sign-up-for-a-scinet-account).
A SCINet account provides access to two high performance computing clusters - Ceres and Atlas - as well as the long-term storage device, Juno. For more information on our compute resources, see our [Computing Resources guide](https://scinet.usda.gov/guides/resources/#scinet-computing-resources).

### Log in to SCINet

Once your SCINet account has been approved, you will be able to login to SCINet and gain access to our computing resources. If you encounter issues with your account, please email scinet_vrsc@usda.gov.
You can log in to SCINet via our web-based Open OnDemand interface or via ssh. Most of the tutorials are designed for Open OnDemand, and unless otherwise specified you do not need to use a direct SSH connection to SCINet clusters. 
* Log in to [Ceres Open OnDemand](http://ceres-ood.scinet.usda.gov/). 
* Log in to [Atlas Open OnDemand](https://atlas-ood.hpc.msstate.edu/).  

For more information on login procedures for SCINet access, including our SSH access instructions, see the [SCINet access user guide](https://scinet.usda.gov/guides/access/). 

</div>

## Setting up your workspace

You will need to decide where files will be stored for the tutorials.  Most tutorials default to using `/90daydata/shared/$USER/tutorial_subdirectory` for consistancy; however, with a SCINet account you have access to multiple options: 
* **Home directory:** small storage quota and recommended for configuration and login files.  
* **Project space:** large workspace recommended for installs, research data, and analysis results. [Click here to request a project directory](https://scinet.usda.gov/guides/data/storage#project-directories)  
* **90daydata:** temporary workspace for large, short-term data where files will be deleted after 90 days. `/90daydata/shared` is a space where data can be shared among users or teams, but each user still has a dedicated folder. Read our [Storage Guides](https://scinet.usda.gov/guides/data/storage#large-short-term-storage) for more information on 90daydata.  


<div class="process-list ul" markdown="1">

### Making your workspace directory in /90daydata 

If you are beginning a tutorial for the first time, or haven't used your directory in 90 days, you will need to create a new working directory for the tutorial.

To create a working directory:
1.  Open the Shell - if you are not sure how, see the below [instructions on how to launch the shell](using-the-shell).
1.  Request a compute node, replacing `<project_name>` with the name of a project you have access to:
    ```
    srun -A <project_name> -t 01:00:00 --pty bash
    ```
1.  {% include setup/mkdir %}

### Creating a Conda environment

Many tutorials use [Conda](https://scinet.usda.gov/guides/software/conda), which allows SCINet users to create reproducible scientific software environments.

If your tutorial uses a Conda environment, it will specify how to load it. You can either create it in the shell when you create your working directory, or if your tutorial is using a specific IDE you can execute the code in your IDE's terminal.

Most tutorials that use Conda environments default to creating the environment in `/90daydata`.  If you would like to save the virtual environment for later use, you can modify the workflow to [set up the environment in your /project directory](#modifying-workflows-to-use-project).  

{% include alert class="warning" title="It is not reccomended to use your Home directory for Conda" content="Software installs that require a lot of space, such as Conda virtual environments, can quickly max out your quota.  It is reccomended to use `/project` or `/90daydata` instead." %}

#### Example Conda workflow
1.  Load Conda.
    * Atlas: `module load miniconda3`
    * Ceres: `module load miniconda`
1.  Create your environment:
    * If you are using an environment yml file:
        * Download the environment yml file:  
          ```bash
          wget {{ site.url }}{{ file_path }}/{{ environment }}.yml
          ```
        * Create and load your new Conda environment:  
          ```bash
          conda env create --prefix /90daydata/shared/$USER/envs/{{ environment }} -f {{ environment }}.yml
          source activate /90daydata/shared/$USER/envs/{{ environment }}
          ```  
    * If you are creating your environment from scratch:  
      ```bash
      conda env create --prefix /90daydata/scinet/$USER/envs/{{ environment }}
      source activate /90daydata/scinet/$USER/envs/{{ environment }}
      conda install nodejs ruby=3.4.4 compilers
      ```  
    * If you are using an existing environment, you just need to load it:  
      ```bash
      source activate /90daydata/scinet/$USER/envs/{{ environment }}
      ```
1.  If you are using Jupyter:
    1.  {% include setup/kernel %}
    1.  In JupyterLab, make sure the tutorial kernel is selected:
        * Kernel > Change Kernel > select "{{ kernel }}" from the drop down menu


### Modifying workflows to use /project

If you would like to use your project space instead of `/90daydata`, you can modify the tutorial instructions by substituting `/project/your_project_name/` wherever you see `/90daydata/shared/$USER/`.

For example, to modify the instructions above for creating a directory and Conda environment in a project named "your_project_name", you would:
1.  Open the Shell
1.  Request a compute node:
    ```
    srun -A your_project_name -t 01:00:00 --pty bash
    ```
1.  Create your wookbook directory and navigate to it:
    ```
    mkdir -p /project/your_project_name/{{ environment }}
    cd /project/your_project_name/{{ environment }}
    ```
1.  Load Conda.
    * Atlas: `module load miniconda3`
    * Ceres: `module load miniconda`
1.  Create your environment from a yml file
    * Download the environment yml file:  
      ```bash
      wget {{ site.url }}{{ file_path }}/{{ environment }}.yml
      ```
    * Create and load your new Conda environment:  
      ```bash
      conda env create --prefix /project/your_project_name/envs/{{ environment }} -f {{ environment }}.yml
      source activate /project/your_project_name/envs/{{ environment }}
      ```  

</div>

## Accessing interfaces on SCINet

There are multiple different interfaces available on SCINet.  In this section, we provide template instructions for launching these interfaces and provide an overview of each input parameter.

Note: Each tutorial may have specific inputs depending on the resource needs and objectives of the tutorial.  Use the parameters specified by the tutorial if they differ from these demo instructions.

<div class="process-list" markdown="1">

### Using the Shell

Most of the tutorials can be completed using the [Open OnDemand interface (OOD)](https://scinet.usda.gov/guides/use/open-ondemand).  
* Log in to [Ceres Open OnDemand](http://ceres-ood.scinet.usda.gov/). 
* Log in to [Atlas Open OnDemand](https://atlas-ood.hpc.msstate.edu/).  

After logging in to SCINet via OOD, you will be directed to the OOD homepage associated with the cluster (Ceres or Atlas) you are accessing: 

[placeholder for image]

While on the home page of your cluster, you can open a command-line session by clicking on "Clusters" -> "Ceres/Atlas Shell Access" on the top menu. This will open a new tab with a command-line session on Ceres'/Atlas' login node.  

From here, your tutorial may have specific instructions for you to execute.  One of the first steps is often to [request a compute note and create a working directory in /90daydata](#making-your-workspace-directory-in-90daydata), as explained above.

Requesting a compute node keeps all the intense computation off the login nodes, so that login nodes can have all the resources necessary for managing the cluster. **Please do not run your applications on the login nodes**.   For more information, see our [SLURM guide](https://scinet.usda.gov/guides/use/slurm). 

### Launching RStudio: 
Back on the main Atlas/Ceres OOD tab, click on the top or side navigation bar: "Interactive Apps" > "RStudio Server".
Fill the input fields with the following: 
* If using Ceres
    * Account: your_project_name (replace with your project account name)
    * Queue: ceres
    * QOS: 400thread
    * R Version: 4.4.1
    * Number of hours: 1
    * Number of cores: 1
    * Memory required: 8GB
    * Optional Slurm Arguments: (leave empty for demo purposes)

* If using Atlas:
    * R Version: 4.4.0
    * Account name: your_project_name (replace with your project account name)
    * Partition:atlas 
    * QOS:normal
    * Number of hours: 1
    * Number of nodes: 1
    * Number of tasks: 1
    * Additional Slurm parameters: (leave empty for demo purposes)

* Click the "Launch" button.
* Wait a moment for the job card to update from "Queued" to "Running".
* Click on the "Connect to RStudio Server" button to open a new tab with the RStudio Server interface.

### Launching JupyterLab:
Back on the main Atlas/Ceres OOD tab, click on the top or side navigation bar: “Interactive Apps” > “JupyterLab Server”.
Fill the input fields with the following:
* If using Ceres:
    * Account: your_project_name (replace with your project account name)
    * Queue: ceres
    * QOS: 400 thread
    * Number of hours: 1
    * Number of cores: 1
    * Memory required: 8GB
    * Optional Slurm Arguments: (leave empty for demo purposes)
    * JupyterNotebook vs Lab: Lab
    * Working Directory defaults to $HOME

* If using Atlas: 
    * Account: your_project_name (replace with your project account name)
    * Partition: atlas
    * QOS: normal
    * Number of hours: 1
    * Number of nodes: 1
    * Number of tasks: 1
    * Additional Slurm Parameters: (leave empty for demo purposes)
    * Working Directory defaults to $HOME

* Click the “Launch” button.
* Wait a moment for the job card to update from “Queued” to “Running”.
* Click on the “Connect to JupyterLab Server” button to open a new tab with the JupyterLab Server interface.


### Launching VS Code (Only available on Ceres)
Back on the main Ceres OOD tab, click on the top or side navigation bar: “Interactive Apps” > “VSCode Server”.

Fill the input fields with the following:

* Account: your_project_name (replace with your project account name)
* Queue: ceres
* QOS: 400 thread
* Number of cores: 1
* Memory required: 8GB
* Number of hours: 1
* Optional Slurm Arguments: (leave empty for demo purposes)
* Working Directory: defaults to $HOME
* Codeserver Version: 4.17 
* Click the “Launch” button.
* Wait a moment for the job card to update from “Queued” to “Running”.
* Click on the “Connect to VSCode Server” button to open a new tab with the VSCode Server interface.


</div>

## Where to get help?

* [SCINet FAQs](https://scinet.usda.gov/support/faq#faqs)
* [SCINet user guides](https://scinet.usda.gov/guides/#scinet-guides-list)
* [Contact the VRSC](mailto:scinet_vrsc@iastate.edu)

You're now ready to tackle our workbooks! 