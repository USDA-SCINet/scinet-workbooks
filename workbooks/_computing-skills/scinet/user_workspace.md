---
title: Setting up your workspace
description: "Create and configure a user workspace on SCINet for hands-on training, practice, and workflow testing."
type: interactive tutorial
author: [Aleksandra Badaczewska, The SCINet Office]
index: 
order: 4

header:
  overlay_image: 07-wrangling/assets/img/07_data_acquisition_banner.png
svg: /genomics.svg

terms: [File System, Workspace, Shared Space, Project Directory, Access Permissions, Purge Policy, Storage, Quota]

objectives: 
  - "Learn where and how to set up a personal workspace for tutorials and training on SCINet clusters."
  - "Understand the storage options available for temporary, shared, and persistent data during practice and research. Know when to use `/90daydata/shared`, `/90daydata/<project_name>`, and `/project/<project_name>` directories for workspace setup."
  - "Practice organizing a training or research workspace that aligns with system policies and best practices for data retention and performance."

applications:
  - "Separating practice environments from production directories to avoid clutter and confusion."
  - "Creating a personal workspace under `/90daydata/shared/$USER` for tutorials, hands-on practice, or workflow experimentation."
  - "Setting up workspaces in `/90daydata/<project_name>` directory for project-specific testing, pipeline optimization, or large short-term jobs exceeding `/project` quota."
  - "Managing data dynamically by using the `/90daydata` space for large short-term storage and moving important files to persistent storage in a `/project` before they are purged."

takeaways: 
  - "The /home directory is not intended for tutorials, job runs, or data storage beyond configuration files. Avoid using it for practice or testing."
  - "/90day/shared/$USER is ideal for training and tutorial practice: it's user-specific, accessible system-wide, and offers enough space for short-term learning activities."
  - "Files in /90daydata are subject to automatic deletion if not accessed for 90 days. Always copy important outputs back to /project or long-term storage."
  - "For project-related tests, use /90daydata/project_name/ with a pipeline-dedicated subdirectory to simulate workflows or handle larger datasets temporarily."
  - When adapting tutorials to your research, modify them to run in /project/project_name for persistent results, access protection and better data organization.

overview: [objectives, applications, terminology]


---


<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1">
An active SCINet account with access to shared and project directories is required to complete this tutorial. 
Basic familiarity with the [SCINet File System](/computing-skills/scinet/file_system) and [Shell interface](/computing-skills/scinet/interfaces) for [navigating directories](/computing-skills/command-line/#navigating-the-unix-file-system) and [managing files](/computing-skills/command-line/#file-management-in-the-shell) is also expected.
</div></div>


## Overview

Learn where to build temporary spaces for training and how to shift to persistent pipeline workspaces used with your research data. Balancing these needs ensures efficient, reproducible, and policy-compliant computing.  

{% include overviews %}

<div class="process-list ul" markdown="1">
### Storage types on SCINet

{% include setup/storage_types %}

### Decide on workspace location

**Your user workspace** is the starting point for learning and practicing on SCINet supercomputers. You will need to decide where files will be stored for the tutorials. 
The **/90daydata/shared/** is the location in the SCINet file system, where you have access with a SCINet account, even before you gain access to a project space. 
For consistancy, most tutorials default to using this location: `/90daydata/shared/$USER/<tutorial_subdirectory>`

| /90daydata/shared/`$USER`  | /project/`<project_name>` |
|----------------------------|---------------------------|
| access with SCINet account | access with project membership |
| Use to complete tutorials, test workflows, and <br>build skills in a temporary but flexible environment. | Use as persistent storage for <br>project-specific research work. | 
| recommended for **user workspace** | recomended for **research&nbsp;workspace**|

With access to SCINet infrastructure you have multiple options for storing your files: 
* **Home directory:** small storage quota and recommended for [shell configuration](/computing-skills/command-line/configuration/) and login files.  
* **Project space:** large workspace recommended for installs, research data, and analysis results.  
[Click here to request a project directory](https://scinet.usda.gov/guides/data/storage#project-directories)  
* **90daydata:** temporary workspace for large, short-term data where files will be deleted after 90 days. **/90daydata/shared** is a sub-space where data can be shared among users or teams, but each user still can create a dedicated folder. Read our [Storage Guides](https://scinet.usda.gov/guides/data/storage#large-short-term-storage) for more information on `/90daydata`.  

</div>

## Getting started

First, you will log in through **Open OnDemand (OOD)** and use the shell to access SCINet file system locations.

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="<h3 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>Access the shell via SCINet OOD</h3><span style='font-weight: 300;'>(required) used for accessing supercomputers</span>" class="primary" controls="access-scinet" icon=false %}
<div id="access-scinet" class="accordion_content" markdown='1' hidden> 
{% include setup/scinet_login %}
{% include setup/ood_shell %}
</div>
</div>

The goal is to help you get started with SCINet high-performance computing by creating well-structured workspaces in a temporary location with no quota for practicing tutorials. You’ll learn where and how to build these spaces within system policies, preparing you for more advanced workflows and persistent research projects.

Before completing this section, it is recommended that you first go through the [File system on Atlas and Ceres supercomputers](/computing-skills/scinet/file_system) tutorial.

<div class="process-list" markdown="1">

### Always request a compute node

<div class="highlighted highlighted--highlighted"><div class="highlighted__body" markdown="1">
To avoid accidentally running intensive tasks on the shared login node, always request a compute node right after connecting to a shell. It’s a simple step that protects SCINet system performance for all users.
</div></div>

1.  Open the Shell - if you are not sure how, start with [Getting started](#getting-started) section above.

2.  Request a 1-hour interactive session on a compute node, replacing `<project_name>` with the name of a project you have access to.
   ```bash
   srun -A <project_name> -t 01:00:00 --pty bash
   ```
   *For example, the VRSC members use `isu_gif_vrsc` slurm account in this command:*  
   &emsp; `srun -A isu_gif_vrsc -t 01:00:00 --pty bash`   

{% include setup/find_projects keep = "true" %}



### Make your workspace in /90daydata/shared 

If you're starting a tutorial for the first time or your workspace at this location hasn't been used in 90 days, you'll need to create a new one.

To create a working directory:
1.  Open the Shell &emsp; *([see guide if needed](#getting-started))*

2.  Request a compute node &emsp; *([see guide if needed](#always-request-a-compute-node))*

1.  {% include setup/mkdir dir="workbooks" %}


### Modify workflows to use /project space

If you prefer to use a `/project` space instead of `/90daydata`, modify the tutorial steps by replacing `/90daydata/shared/$USER` with **`/project/<project_name>/$USER`**. Be sure to substitute `<project_name>` with your actual project name. 
*If you're unsure which projects you're a member of, [Check your projects](#proj-check).*

For example, to modify the instructions for creating a working directory for a tutorial in a project named **`your_project_name`**, you would:
1.  Open the Shell &emsp; *([see guide if needed](#getting-started))*

2.  Request a compute node &emsp; *([see guide if needed](#always-request-a-compute-node))*

1.  Create a working directory under `/project` and navigate to it:
    ```
    mkdir -p /project/your_project_name/$USER/workbooks
    cd /project/your_project_name/$USER/workbooks
    ```
Creating a personal `$USER` subfolder within your group-shared project space helps keep your workspace organized and separate from others. For collaborative or shared research efforts, consider creating a dedicated [pipeline workspace](#create-a-pipeline-workspace-for-research) directly under `/project/<project_name>/` instead.

## Next steps

### Create a pipeline workspace for research

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1">
When you begin applying tutorial steps to your own research data, the work transitions from practice to active research. 
At that point, it's a good idea to shift your workflow to the `/project` directory (or `/90daydata/<project_name>`). 
This ensures your data is accessible only to project members, and that any key results you generate are stored in a persistent location
</div></div>

**For a detailed guide on organizing your research workspace**, see the [Setting up a project and managing storage](/computing-skills/scinet/project_setup) tutorial. It introduces best practices for structuring research projects on SCINet supercomputers, including how to organize directories, create pipeline workspaces, use scratch storage effectively, and document your work with README files to support clarity and reproducibility.

| [Manage project structure](/computing-skills/scinet/project_setup#manage-project-structure) | [Manage storage](/computing-skills/scinet/project_setup#manage-storage) |
|------------------|--------------|
| [Directory Tree](/computing-skills/scinet/project_setup#directory-tree)         | [Check Your Quota](/computing-skills/scinet/project_setup#check-your-quota) |
| [Pipeline Workspace](/computing-skills/scinet/project_setup#pipeline-workspace) | [Data Lifecycle in HPC](/computing-skills/scinet/project_setup#data-lifecycle) |
| [README](/computing-skills/scinet/project_setup#readme) | [Working Directory](/computing-skills/scinet/project_setup#working-directory) |
| | [$TMPDIR on a compute node](/computing-skills/scinet/project_setup#tmpdir) |
| | [Backed up LTS device](/computing-skills/scinet/project_setup#backed-up-lts) |

### Consider environment options

**For guidance on customizing your research environment**, see the [Setting up a reproducible environment]() tutorial. It covers making your shell more efficient with aliases and environment variables for frequently used commands and paths, using pre-installed software through modules and containers, and creating flexible, reproducible environments with tools like Conda or `venv`.

</div>



{% if page.takeaways %}
## Best Practices

<ul>
  {% for takeaway in page.takeaways %}
    <li>{{ takeaway }}</li>
  {% endfor %}
</ul>
{% endif %}