---
title: Getting Started with the SCINet Workbooks
description: A guide to using the SCINet Workbook
order: 1
author: The SCINet Office
updated: 2025-06-24 

objectives: "You can write out your objectives in markdown, or put them in a list."
overview: [objectives]
survey: true
---


## Overview

Introduction to your tutorial and what the tutorial aims to accomplish.

{% include overviews %}


## Tutorial Steps:
1. Request a SCINet account
1. Log in to SCINet
1. Decide on your workspace for the tutorials
1. Launch the Shell on SCINet
1. Request compute resources and submit jobs on SCINet
1. Access GUI interfaces on SCINet


<div class="process-list" markdown="1">

### Request a SCINet account

A SCINet account is required to access SCINet. You can [request a SCINet account by visiting here](https://scinet.usda.gov/about/signup#sign-up-for-a-scinet-account).
A SCINet account provides access to two high performance computing clusters, Ceres and Atlas and long-term storage device, Juno. For more information on our compute resources, see our [Computing Resources guide](https://scinet.usda.gov/guides/resources/#scinet-computing-resources).

### Log in to SCINet

Once your SCINet account has been approved, you will be able to login to SCINet and gain access to our computing resources. If you encounter issues with your account, please email scinet_vrsc@usda.gov.
You can log in to SCINet via our web-based Open OnDemand interface or via ssh. Most of the tutorials are designed for Open OnDemand, and unless otherwise specified you do not need to use a direct SSH connection to SCINet clusters. 
* Log in to [Ceres Open OnDemand](http://ceres-ood.scinet.usda.gov/). 
* Log in to [Atlas Open OnDemand](https://atlas-ood.hpc.msstate.edu/) 
For more information on login procedures for web-based SCINet access, see the [SCINet access user guide](https://scinet.usda.gov/guides/access/web-based-login). 


### Decide on your workspace for the tutorials

You will need to decide where you'll work and store your files for the tutorials. With a SCINet account, you have access to a: 
* Home directory: small storage quota and recommended for configuration and login files

* Project space: large workspace recommended for installs, research data and analysis results. [Click here to request a project directory](https://scinet.usda.gov/guides/data/storage#project-directories)

* 90daydata: temporary workspace for large, short-term data where files will be deleted after 90 days. 90daydata/shared, is a space where data can be shared among users or teams, but each user still has a dedicated folder. Read our [Storage Guides](https://scinet.usda.gov/guides/data/storage#large-short-term-storage) for more information on 90daydata. 

We recommend not using your home directory since you will quickly run out of space due to the small storage quota. Instead, we recommend either using /90daydata/shared/$USER/whatever_subdirectory, or a /project/project_group_name/whatever_subdirectory directory if you have one. Once you determine what directory you would like to work in for these tutorials, each tutorial will provide specific details on how to create a directory for the tutorial and transfer the needed files to this directory. 

### Launch the Shell on SCINet
After logging in to SCINet via Open OnDemand, you will be directed to the Open OnDemand homepage associated with the cluster (Ceres or Atlas) you are accessing: 

[placeholder for image]

While on the home page of your cluster, you can open a command-line session by clicking on "Clusters" -> "Ceres/Atlas Shell Access" on the top menu. This will open a new tab with a command-line session on Ceres'/Atlas' login node.  


### Accessing GUI interfaces on SCINet
SCINet has GUI interfaces available through Open OnDemand including RStudio, JupyterNotebook, and VSCode. In this section, we provide template instructions for launching these GUI interfaces and provide an overview each input parameter. 
Note: Each tutorial that uses one of our GUI interfaces will have specific inputs depending on the resource needs and objectives of the tutorial.   

#### Demo for launching RStudio: 
Back on the main Atlas/Ceres OOD tab, click on the top or side navigation bar: "Interactive Apps" > "RStudio Server".
Fill the input fields with the following: 
* If using Ceres
    * Account: scinet_workshop2 (replace with your project account name)
    * Queue: ceres
    * QOS: 400thread
    * R Version: 4.4.1
    * Number of hours: 1
    *Number of cores: 1
    * Memory required: 8GB
    * Optional Slurm Arguments: (leave empty for demo purposes)

* If using Atlas:
    * R Version: 4.4.0
    * Account name: scinet_workshop2 (replace with your project account name)
    * Partition:atlas 
    * QOS:normal
    * Number of hours: 1
    * Number of nodes: 1
    * Number of tasks: 1
    * Additional Slurm parameters: (leave empty for demo purposes)

* Click the "Launch" button.
* Wait a moment for the job card to update from "Queued" to "Running".
* Click on the "Connect to RStudio Server" button to open a new tab with the RStudio Server interface.

#### Demo for launching JupyterLab:
Back on the main Atlas/Ceres OOD tab, click on the top or side navigation bar: “Interactive Apps” > “JupyterLab Server”.
Fill the input fields with the following:
* If using Ceres:
    * Account: scinet_workshop2 (replace with your project account name)
    * Queue: ceres
    * QOS: 400 thread
    * Number of hours: 1
    * Number of cores: 1
    * Memory required: 8GB
    * Optional Slurm Arguments: (leave empty for demo purposes)
    * JupyterNotebook vs Lab: Lab
    * Working Directory defaults to $HOME

* If using Atlas: 
    * Account: scinet_workshop2 (replace with your project account name)
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


#### Demo for Launching VS Code (Only available on Ceres)
Back on the main Ceres OOD tab, click on the top or side navigation bar: “Interactive Apps” > “VSCode Server”.

Fill the input fields with the following:

* Account: scinet_workshop2 (replace with your project account name)
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

[SCINet FAQs](https://scinet.usda.gov/support/faq#faqs)
[SCINet user guides](https://scinet.usda.gov/guides/#scinet-guides-list)
[Contact the VRSC](mailto:scinet_vrsc@iastate.edu)

You're now ready to tackle our workbooks! 