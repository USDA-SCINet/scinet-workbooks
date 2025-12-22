---
title: "Getting started with SCINet"
description: "Orientation for newcomers and best-practice setups for SCINet supercomputer users"
type: introduction
author: [Aleksandra Badaczewska, The SCINet Office]
index: 1
order: 1

tags: [unix, command line]
terms: [SCINet supercomputers, Supercomputer, HPC, Local Machine, Remote Machine, Open OnDemand, Web Browser, Unix Shell, Command Line Interface, Command]

objectives:
- Introduce the SCINet Initiative and its mission in advancing scientific computing.
- "Highlight resources: SCINet website, user guides, and workbooks with practical tutorials."
- Provide guidance for new users to access the SCINet supercomputers.
- "Establish a functional user and project workspaces."
- "Learn about software options by exploring how to use modules, containers, and virtual environments."

overview: [objectives, terminology]


---


{% include overviews %}

### What is SCINet?

The SCINet initiative is an effort by the USDA [Agricultural Research Service (ARS)](https://www.ars.usda.gov/) to grow USDA’s research capacity by providing scientists with access to high-performance computing clusters, high-speed networking for data transfer, and training in scientific computing.

- [SCINet Website](https://scinet.usda.gov/)
- [SCINet Workbooks]() *(this resource)*
- [SCINet User Guides](https://scinet.usda.gov/guides)
- [SCINet Forum](https://forum.scinet.usda.gov/)


## Accessing SCINet

<div class="process-list" markdown="1">
{% include setup/scinet_access %}

### Start onboarding

Users who are new to the HPC environment may benefit from the [SCINet/Ceres onboarding video](https://www.youtube.com/watch?v=d7oKSL4aitw). 

{% include table caption="HPC Clusters on SCINet" content="| Cluster Name	| Location	| Login Nodes	| Transfer Nodes |
|---------------|-----------|-------------|----------------|
| [Ceres](https://scinet.usda.gov/guides/resources/#scinet-ceres) | Ames, IA | ceres.scinet.usda.gov | ceres-dtn.scinet.usda.gov |
| [Atlas](https://scinet.usda.gov/guides/resources/atlas)	        | Starkville, MS | atlas-login.hpc.msstate.edu | atlas-dtn.hpc.msstate.edu |" %}

User Guide: [Differences between Ceres and Atlas](https://scinet.usda.gov/guides/resources/CeresAtlasDifferences)

{% include setup/scinet_login keep="true" %}


## Next steps

Before moving on to subject-specific tutorials in areas such as [computing skills](/computing-skills/), [data science](/data-science/), 
[bioinformatics](/bioinformatics/), or [geospatial](/geospatial/) analysis, it’s important to first complete the introductory SCINet workbooks tutorials. 
These foundational exercises will help you configure your workspace and project setup, and familiarize you with the available software options on SCINet supsrcomputers.

### Explore interfaces and file system

As a new user, begin by exploring the SCINet interfaces and navigating the core areas of the file system. 
These steps provide concise, practical guidance and will greatly facilitate your work on the system.

* **(selected)** [Accessing interfaces on SCINet](/computing-skills/scinet/interfaces) *(Shell, RStudio, JupyterLab, VS Code)*
* **(required)** [File system on Atlas and Ceres supercomputers](/computing-skills/scinet/file_system)

### Set up user workspace

<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1"> 
SCINet account provides you 30 GB of storage space on Ceres and Atlas in a home directory `/home/<username>/`. 
You can also use collaborative space in `/90daydata/shared`.
</div></div>

With your SCINet account activated, you can quickly configure a **personal workspace** to work through the tutorials provided in this workbook. 
* **(required)** [Setting up your workspace]()
* **(optional)** [Customizing your shell](/computing-skills/command-line/configuration/)

### Set up project workspace

<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1"> 
Users are advised to [request a SCINet project](https://scinet.usda.gov/support/request#project-request) with additional storage space. Requests for new projects must be submitted by a full-time ARS employee. Other users gain access to a project once they are added as members of the project group. SCINet project storage allocations are located in project directories `/project/<project_name>/` on both supercomputers.
</div></div>

With your SCINet project approved, set up the **project workspace** to launch your research tasks.
* **(required)** [Project setup on SCINet’s supercomputers](/computing-skills/scinet/project_setup)

### Set up software environment

<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1"> 
Each SCINet cluster has software preinstalled on it. Some general software is available in the global environment 
but most specialized scientific software is managed by the Module system. Some software packages are available on SCINet as pre-built container images. 
If users need packages that are not available, they can either [request VRSC to add packages](https://scinet.usda.gov/support/request#software-request), 
or they can download and install packages in their `/project` directories. 
</div></div>

With your first computing task underway, set up the **software environment** for efficient workflows.
* **(required)** [Setting up a reproducible environment](/computing-skills/scinet/environment)

</div>


## Where to get help?

* [SCINet FAQs](https://scinet.usda.gov/support/faq#faqs)
* [SCINet user guides](https://scinet.usda.gov/guides/#scinet-guides-list)
* [Contact the VRSC](mailto:scinet_vrsc@iastate.edu)

You're now ready to join SCINet community! 