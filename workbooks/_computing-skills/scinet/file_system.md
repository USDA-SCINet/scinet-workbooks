---
title: File system on Atlas and Ceres supercomputers
description: "Overview of the SCINet supercomputers’ file system, including /home, /project, /90daydata/shared, and /reference directories."
type: reference material
author: Aleksandra Badaczewska
index: 
order: 3

header:
  overlay_image: 07-wrangling/assets/img/07_data_acquisition_banner.png
svg: /genomics.svg

terms: [File System, Directory, Home Directory, Project Directory, Workspace, Path, Access Permissions, Shared Space]

objectives: 
  - Understand the structure of the file system on SCINet and the role of each storage location.
  - Learn best practices for storing, organizing, and managing research data.
  - Recognize policies for shared storage, including purge rules and quotas.
  - Identify where to find reference datasets and container images to support reproducible research.

applications:
  - Using the <b>/home</b> directory for scripts, personal settings, and lightweight files.
  - Organizing large-scale datasets and results in the project directory for research groups.
  - Leveraging the <b>/90daydata/shared</b> for collaboration, with awareness of the 90-day purge policy.
  - Accessing curated <b>/reference/data</b> for common scientific datasets without duplicating storage.
  - Running analyses with standard <b>/reference/containers</b> for consistent software environments.

takeaways: 
  - The <b>/home</b> directory is for personal use and lightweight files; keep it uncluttered.
  - The <b>/project</b> directory is the main space for ARS research projects.
  - The <b>/90daydata/shared</b> directory enables collaboration but files are purged 90 days after their last timestamp.
  - The <b>/reference/data</b> provides publically available reference datasets to avoid redundant downloads.
  - The </b>/reference/containers</b> supply ready-to-use software environments, supporting reproducibility.
  - Understanding storage tiers and policies ensures smoother workflows and prevents data loss.
  - Clean up regularly and follow best practices to optimize both personal and shared system resources.

overview: [objectives, applications, terminology]

questions:
  - question: "Which location is private to you and not accessible by other project members?"
    title: "User Private Storage"
    qid: 1
    answers:
      - "`/home`"
      - "`/project/<project_name>/$USER`"
      - "`/90daydata/shared/$USER`"
    answer: 1
    responses:
      - "Correct! `/home` is your personal space for configs and scripts, not shared with others."
      - "`/project` is shared among group members who are added to the project."
      - "`/90daydata/shared` is a shared scratch area, by default visible to all users on the system."

  - question: "You want to practice tutorials provided in the scinet-workbooks. <br>Where should you work?"
    title: "Getting Started Workspace"
    qid: 2
    answers:
      - "/home"
      - "/90daydata/shared/$USER"
      - "/90daydata/scinet_workshop1/$USER"
      - "/reference/workshops"
    answer: 2
    responses:
      - "Not correct - `/home` is quota-limited and intended for personal configs and scripts, not for running larger tutorials."
      - "Correct! `/90daydata/shared/$USER` is your temporary workspace for practice or tutorials. It will be automatically purged 90 days after last access, so move any important *takeaway notes* or code snippets to `/home` or `/project/<project_name>/$USER` before it’s cleared."
      - "Not correct - `/90daydata/scinet_workshop1/` is reserved for scheduled workshops. Access is limited to registered participants, and it is revoked once the event ends and the grace period has passed."
      - "Not correct - `/reference/workshops` contains post-workshop reference materials curated by instructors. It is read-only and not intended for personal training workspace."

  - question: "SCINet users cannot access a specific research project until..."
    title: "Project Access Control"
    qid: 3
    answers:
      - "PI requests quota increase for `/project`."
      - "They are added to the corresponding project group."
      - "They create a `$USER` folder under `/project/<project_name>`."
    answer: 2
    responses:
      - "Quota increases do not grant access."
      - "Correct! Access is controlled by project group membership."
      - "Users cannot create their own project folders without being in the project group."

  - question: "Two project groups want to use the same 1 TB experimental dataset. Should you store a copy in both `/project/<projectA>` and `/project/<projectB>`?"
    title: "Data Sharing Between Projects"
    qid: 4
    answers:
      - "Yes, duplicating the dataset in both projects is standard practice."
      - "No, store it once in a shared location and grant appropriate group access."
      - "It should always go into `/reference/data` to be accessible to everyone."
    answer: 2
    responses:
      - "Not correct - duplicating large datasets wastes storage and risks inconsistency."
      - "Correct! Store the dataset once in `/project` or `/90daydata/shared` and manage group permissions so both projects can access it."
      - "Not correct - `/reference/data` is a centrally managed space with pre-downloaded, widely used reference datasets available to all SCINet users, not a place for project-specific data sharing."

  - question: "An experimental collaborator placed large data files in `/90daydata/shared` around Memorial Day. At the start of the new academic year you finally have time to analyze them, but they are missing. Meanwhile, another dataset in the same location that you used during the summer is still available. Why?"
    title: "Purge Policy"
    qid: 5
    answers:
      - "Files in `/90daydata/shared` are automatically purged 90 days after their last access date."
      - "Other users deleted your files."
      - "Jobs exceeding quota in `/90daydata/shared` trigger automatic deletion of some folders."
    answer: 1
    responses:
      - "Correct! `/90daydata/shared` is a temporary storage tier. Files are purged if not accessed within 90 days."
      - "Not correct - with default permissions (`drwxr-s---`), shared directories are group-readable but not world-writable. Other users cannot randomly delete your files unless permissions are explicitly modified to allow it."
      - "`90daydata` has no quota. Also, quotas do not trigger automatic deletion of specific files; purge policies are time-based."

  - question: "Where can you find pre-installed tools or datasets maintained by SCINet VRSC?"
    title: "Built-in Datasets and Software"
    qid: 6
    answers:
      - "`/reference/data` and `/reference/containers`"
      - "`/90daydata/shared` and `module load`"
      - "`/project/<project_name>/raw_data` and `/project/<project_name>/software`"
    answer: 1
    responses:
      - "Correct! `/reference/data` stores common datasets or databases, and `/reference/containers` provides ready-to-use containers."
      - "Not correct - `/90daydata/shared` is temporary space for cross-group collaboration and data sharing; `module load` is a command that enables using pre-installed software."
      - "Not correct - `/project/<project_name>` is for your group’s own raw data and software installations, not for centrally maintained resources."

  - question: "An experiment produced 10,000 small CSV data files, which you placed in `/90daydata/<project_name>` to merge them by common columns into a single database file, with the originals automatically discarded under the 90-day purge policy. When running your task directly from `/90daydata`, you noticed very slow input processing. What would improve performance?"
    title: "Node-local Scratch Space for Efficient I/O"
    qid: 7
    answers:
      - "Move files into `/home` and run your commands directly in a login shell."
      - "Run the job on a compute node with staging raw data in `$TMPDIR`, then copy the merged result back to persistent storage in `/project`."
      - "Start interactive session with `salloc` and keep working in `/90daydata/<project_name>`, as it is designed for all large-scale analyses."
    answer: 2
    responses:
      - "Not correct - `/home` is quota-limited, not optimized for heavy I/O, and login shells are not intended for running computational tasks."
      - "Correct! `$TMPDIR` provides fast node-local scratch space. Copy the raw data there at the start of your job, process it efficiently, and then copy only the final results to `/project` for persistence."
      - "Not correct - `/90daydata` has no quota limits but offers slower performance for handling many small files."

  - question: "While working in `/project/<project_name>`, you wrote your pipeline using relative paths (like `../raw_data/file.fastq`). Later, you copied the entire workspace to `/90daydata/<project_name>` to test optimizations and let those runs be purged automatically. Why will your original scripts fail?"
    title: "Relative vs Absolute Paths"
    qid: 8
    answers:
      - "Relative paths point to locations that no longer exist after moving the workspace."
      - "The `/90daydata` filesystem does not allow using relative paths."
      - "Purge policies automatically break relative path references."
    answer: 1
    responses:
      - "Correct! Relative paths depend on the directory structure. After copying, `../raw_data` no longer resolves correctly. Absolute paths or environment variables are safer."
      - "Not correct - `/90daydata` allows relative paths just like any other directory."
      - "Not correct - purge policies delete files but don’t directly affect how paths resolve."

---


<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1">
An active SCINet account with access to shared and project directories is required to complete this tutorial. 
Basic familiarity with the [Shell interface](/computing-skills/scinet/interfaces) for navigating directories and managing files is also expected.
</div></div>

## Overview

This tutorial introduces the file system on SCINet supercomputers, explaining the purpose of the home, project, and shared directories, as well as the pre-downloaded datasets and container images. It highlights storage policies, and provides guidance on organizing research data effectively.

{% include overviews %}
 

## SCINet file system

<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1"> 
A **file system** is the structure an operating system uses to organize, manage, and access data on storage devices. 
It defines how key directories are arranged under the system's root, how files are stored within those directories, and how they are accessed by users and programs.
</div></div>

Effective use of an HPC system starts with understanding how its file system is structured. 
**Atlas and Ceres supercomputers provide separate storage locations optimized for different tasks**, such as managing private project data, 
running analyses on large datasets, and accessing software containers or shared reference databases. 
Knowing where these locations are helps prevent slowdowns, quota issues, and data loss.

Each location listed in a table is linked to detailed documentation, where you can find information on usage guidelines, 
[storage quotas](https://scinet.usda.gov/guides/data/storage#quotas), [access permissions](https://scinet.usda.gov/guides/data/storage#changing-file-permissions), and retention rules specific to that space.

{% include table no-row-labels=true caption="Key file system locations on SCINet supercomputers and their intended use" content="| path | name | description | permsissions |
|------|------|-------------|--------------|
| `/`  | root | base of the file system hierarchy | read-only |
| `/home/<user>` | [home dir](https://scinet.usda.gov/guides/data/storage#home-directories) | user's configurations and login files; 30GB quota | user-private |
| `/project/<research_project>` | [project dir](https://scinet.usda.gov/guides/data/storage#project-directories) | main storage for research projects; 1TB quota | group-private |
| `/90daydata/<research_project>` | [project 90day](https://scinet.usda.gov/guides/data/storage#large-short-term-storage) | large short-term storage and coputation workspace; no quota limit | group-private |
| `/90daydata/shared/` | [90day shared](https://scinet.usda.gov/guides/data/storage#large-short-term-storage) | cross-group sharing and collaboration | open to all |
| `/reference/data/` | datasets | pre-downloaded databases | open to all |
| `/reference/containers/` | [containers](https://scinet.usda.gov/guides/software/singularity#ceres-container-repository) | pre-downloaded software containers | open to all |
| `/reference/SCINetPolicies` | [SCINet&nbsp;Policies](https://scinet.usda.gov/about/policies) | policies and rules for SCINet supercomputers, CLI-searchable | open to all |" %}

{% include alert class="tip" content="Understanding where to store your data or access shared data and software ensures that your work complies with [SCINet policies](https://scinet.usda.gov/about/policies) and makes efficient use of available resources." %}


## Getting started

It is useful to take a quick tour of the **key file system locations** available on SCINet supercomputers. 
First, you will log in through **Open OnDemand (OOD)** and use the shell to explore the main directories.

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="<h3 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>Access the shell via SCINet OOD</h3><span style='font-weight: 300;'>(required) used for accessing supercomputers</span>" class="primary" controls="access-scinet" icon=false %}
<div id="access-scinet" class="accordion_content" markdown='1' hidden> 
{% include setup/scinet_access %}
{% include setup/scinet_login %}
{% include setup/ood_shell %}
</div>
</div>

The goal is to understand what each location is meant for and how it fits into the workflow of building and running bioinformatics pipelines. 
Knowing these spaces will help you find reference datasets or software and decide where to place different types of files when setting up a new bioinformatics project. Once you are familiar with these locations, you will be ready to set up your own workspace or working directory for the pipeline.

<div class="process-list ul" markdown="1">

### Home directory

{% include setup/home_dir %}

### Project directory

{% include setup/project_dir %}

### 90daydata/shared

{% include setup/90day_shared %}

### Reference/data

{% include setup/ref_data %}

### Reference/containers

{% include term term="Container" %}
<hr>

{% include setup/ref_containers %}

</div>


{% if page.takeaways %}
## Lesson summary

<div class="usa-accordion " >
{% include accordion title="Quick Quiz: Check your understanding" controls="quiz-formats" expanded=false class="question" icon=true %}
<div id="quiz-formats" class="accordion_content" markdown='1'>
Now that you’ve explored the file system structure on SCINet supercomputers and learned how different spaces vary in purpose, performance, and policies, it’s time to test your knowledge. This quiz will check your understanding of where to place files and how to work safely within the system.

{% include question qid="1,2,3,4,5,6,7,8" %}
</div>
</div>

<ul>
  {% for takeaway in page.takeaways %}
    <li>{{ takeaway }}</li>
  {% endfor %}
</ul>

{% endif %}