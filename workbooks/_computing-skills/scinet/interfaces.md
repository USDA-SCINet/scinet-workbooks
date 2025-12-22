---
title: Accessing interfaces on SCINet
description: "Learn how to access and launch key user interfaces: Shell, RStudio, JupyterLab, and VS Code"
type: reference material
author: The SCINet Office
index: 
order: 2

header:
  overlay_image: 
svg: /genomics.svg

terms: [SCINet supercomputers, Local Machine, Open OnDemand, Web Browser, Unix Shell, Development environment, IDE]

objectives: 
  - Understand the different interfaces available on SCINet for interacting with the system.
  - Learn when and why to use Shell, RStudio, JupyterLab, or VS Code depending on research needs.
  - Learn how graphical and command-line interfaces complement each other in scientific computing.
  - Select the most effective interface for different stages of a project.

applications:
  - Logging into the Shell for command-line tasks such as file management or job submission.
  - Using RStudio for statistical analysis, data visualization, and R-based research pipelines.
  - Running JupyterLab for interactive Python development, notebook-based workflows, data exploration.
  - Leveraging VS Code for advanced code editing, debugging, and multi-language project development.

takeaways:
    - All interfaces connect to the same underlying resources on SCINet, ensuring a consistent computing environment.
    - Choosing the right interface saves time and improves productivity. Use Shell for system operations, notebooks for exploratory work, and IDEs for structured development.
    - Shell provides essential control over the system and is often the starting point for HPC tasks.
    - RStudio, JupyterLab, and VS Code make it easier to develop, visualize, and debug code in familiar environments.
    - Mastering multiple interfaces allows for flexibility in workflows and smoother collaboration with colleagues.

overview: [objectives, applications, terminology]


---


<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1">
An activated SCINet account with confirmed login access is required before using any interface.  
If you need a SCINet account, please refer to [Getting started with SCINet](/computing-skills/scinet/) for instructions.  
</div></div>

## Overview

{% include overviews %}


## Getting started

First, you will log in through **Open OnDemand (OOD)** in your web browser and explore the available interfaces.

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="<h3 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>Access SCINet via OOD</h3><span style='font-weight: 300;'>(required) used for accessing supercomputers</span>" class="primary" controls="access-scinet" icon=false %}
<div id="access-scinet" class="accordion_content" markdown='1' hidden> 
{% include setup/scinet_login keep="true" %}
</div>
</div>

### Choose an interface

There are multiple different interfaces available on SCINet.  In this section, we provide template instructions for launching these interfaces and provide an overview of each input parameter.

- [Launch the Shell](#launch-the-shell)
- [Launch RStudio](#launch-rstudio)
- [Launching JupyterLab](#launch-jupyterlab)
- [Launching VS Code](#launch-vs-code-only-available-on-ceres) *(only available on Ceres)*

<div class="highlighted highlighted--highlighted"><div class="highlighted__body" markdown="1"> 
Note: Each tutorial may have specific inputs depending on the resource needs and objectives of the tutorial.  Use the parameters specified by the tutorial if they differ from these demo instructions.
</div></div>

<div class="process-list ul" markdown="1">

{% include setup/ood_shell %}

From here, your tutorial may have specific instructions for you to execute.  One of the first steps is often to request a compute note and create a working directory in `/90daydata`, as explained in the [Setting up your workspace](/computing-skills/scinet/user_workspace) tutorial.

Requesting a compute node keeps all the intense computation off the login nodes, so that login nodes can have all the resources necessary for managing the cluster. **Please do not run your applications on the login nodes**.   For more information, see our [SLURM guide](https://scinet.usda.gov/guides/use/slurm). 

### Launch RStudio 
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

### Launch JupyterLab
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


### Launch VS Code (only available on Ceres)
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



{% if page.takeaways %}
## Lesson takeaways

<ul>
  {% for takeaway in page.takeaways %}
    <li>{{ takeaway }}</li>
  {% endfor %}
</ul>

{% endif %}