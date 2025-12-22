---
title: Setting up a project and managing storage
description: "Set up and organize the /project directory on SCINet, manage storage, and optimize pipeline workspaces for reproducible research"
type: interactive tutorial
author: Aleksandra Badaczewska
index: 
order: 5

header:
  overlay_image: 07-wrangling/assets/img/07_data_acquisition_banner.png
svg: /genomics.svg

objectives: 
  - Learn how to structure and organize a research project on SCINet using best practices.
  - Understand the role of project directory trees, pipeline workspaces, and working directories.
  - Learn how $TMPDIR works as scratch space on a compute node and when to use it.
  - Practice creating documentation (README files) for clarity, reproducibility, and collaboration. 

applications:
  - Creating a <b>/project</b> directory tree with clear separation of raw data, software and pipeline versions. 
  - Building pipeline workspaces for different analysis versions or variant that include nested subdirectories for analysis steps.
  - Defining a working directory for active job execution within the project directory, large short-term storage, or scratch space on compute node.
  - Using <b>$TMPDIR</b> for temporary scratch storage during runtime, while ensuring results are copied back to persistent storage.
  - Writing <b>README</b> files at the project and workspace levels to document workflows and decision points.
  - Ensuring reproducibility and collaboration by maintaining organized structures and consistent documentation.

terms: [File System, Directory Tree, Project Directory, Access Permissions, Storage, Quota, Workspace, Working Directory, Scratch Space, Raw Data, Documentation, README, Reproducibility]

takeaways: 
  - A well-structured directory tree (project setup) is the foundation of efficient and reproducible research. 
  - Pipeline workspaces with nested subfolders make it easier to manage multiple analysis versions or variants.
  - <b>README</b> files act as living documentation, helping both current and future collaborators understand the project layout, workflow choices, and data handling. Create one per level in your project directory tree.
  - The working directory determines where jobs are executed and files saved. Choose <b>/project</b>, <b>/90daydata</b>, or <b>$TMPDIR</b> based on performance and retention needs.
  - <b>$TMPDIR</b> provides high-performance scratch storage but must be used carefully. Copy outputs back to permanent storage before job finishes (or before you exit the allocated compute node). 

overview: [objectives, applications, terminology]


questions:
  - question: "You have just activated your SCINet account but are not yet a member of any project. You can practice and complete some tutorials. Where should you work?"
    title: "First Steps Without a Project"
    qid: 1
    answers:
      - "In your `/home` directory, since it is private and available immediately."  
      - "In `90daydata/<project_name>`, even without membership, because it is shared among users."  
      - "In `/90daydata/shared`, since it is open to everyone and does not require project membership."  
      - "In `$TMPDIR`, because it is created automatically for each job."  
    answer: 3
    responses:
      - "`/home` is private, but it is not intended for storing or running research or tutorial data beyond lightweight configs."  
      - "`90daydata/project` requires membership the same way `/project` does. You cannot write there without being part of a project."  
      - "Correct! `/90daydata/shared` is accessible without project membership and is suitable for practicing tutorials, though files are purged after 90 days."  
      - "`$TMPDIR` is temporary job-local storage and not a suitable location for working through tutorials. Also, to run jobs on compute nodes of either cluster, the jobs need to be associated with a <b>slurm account</b>, which has the same name as the project directory. The slurm account for users without access to project directories is called `sandbox`. In your very first SLURM scripts use `#SBATCH -A sandbox`."  

  - question: "Which location is most appropriate for installing group-shared software?"
    title: "Software Shared Among Project Members"
    qid: 2
    solution: "The **/project** directory is the main persistent location for group-level tasks. Software useful to project contributors should be installed in a dedicated subfolder, e.g., `/project/<project_name>/software/tool_X/`.  <br>Before adding a new tool, always check if it is already available as a module (`module avail <tool>`) or as a container (`ls /reference/containers`). Be sure to set access permissions so that your project members can use the installed tools/environments. <br>
    ```chmod -R g+rwx /project/<project_name>/software/<tool_name>```"
 
  - question: "What is the main purpose of defining a working directory in your job script?"
    title: "The Role of Working Directory"
    qid: 3
    solution: "The working directory is the location where jobs run and where output files are written by default. By default, this is the current directory from which the script is executed. To perform calculations in a different location, enter it explicitly at the start of your script (e.g., with cd) or assign an absolute path to a `WORKDIR` variable and reference it for saving outputs."

  - question: "Why is it unsafe to leave the results in a workspace created under /90daydata?"
    title: "90daydata Storage Risk"
    qid: 4
    solution: "Files in `/90daydata` are automatically purged 90 days after last access. Critical outputs should be copied to `/project` for safe keeping."

  - question: "Which storage location provides the fastest I/O on a compute node?"
    title: "Processing Multiple Small Files"
    qid: 5
    answers:
      - /home
      - $TMPDIR
      - /90daydata/shared
    answer: 2
    responses: 
      - "`/home` is intended for personal scripts and configurations. Running intensive I/O tasks here can lead to poor performance and is discouraged."  
      - "Correct! `$TMPDIR` is local scratch space on a compute node (only!) designed for intensive input/output operations during job execution."
      - "`/90daydata/shared` offers large temporary storage without quota but it does not provide the fastest I/O on a compute node."

  - question: "A user tries to run a job referencing data stored on another cluster’s filesystem. <br>Why will this fail?"
    title: "Cross-Cluster Data Synchronization"
    qid: 6
    solution: "Data must first be transferred to the supercomputer before jobs can use it. 
      The two SCINet clusters have separate project file systems, but they share the same directory structure. This means that paths will look the same across clusters (e.g., `/project/<project_name>`), but the contents are not synchronized. File systems cannot be mounted across clusters by users. <br>Always ensure you are developing and running pipelines on the same cluster where your raw data is stored. To confirm what is available, list your project directory with: <br>
      ```ls /project/<project_name>```"

  - question: "If a job fails due to missing input files while using `$TMPDIR` as the working directory, what is the most likely cause?"
    title: "Inputs Location for $TMPDIR"
    qid: 7
    answers:
      - The files were placed in `$TMPDIR`, which is removed after the job ends.
      - The input files are stored in `/project`, which cannot be used by compute nodes.
      - The directory tree is too deeply nested for the scheduler to access.
      - The inputs were not copied to `$TMPDIR`. 
    answer: 4
    responses:
      - "`$TMPDIR` is temporary, but storage clean-up happens after the job ends, not during execution."  
      - "`/project` is fully accessible to compute nodes."  
      - Deep nesting does not prevent access as long as correct paths are used.  
      - "Correct! When using `$TMPDIR` as the working directory, inputs must either be copied into `$TMPDIR` before tool/command execution, or a shell variable (e.g., `INPUTS`) should be set with the absolute path to the original input files. <br>define input path: `INPUTS=/project/<project_name>/raw_data` <br>A) copy inputs: <br>`cp ${INPUTS}/* $TMPDIR` <br>`cd $TMPDIR` <br> `<tool> <input_file> ` <br>B) or reference inputs location: <br> `cd $TMPDIR` <br> `<tool> ${INPUTS}/input_file` <br>See section [Manage storage: $TMPDIR](/computing-skills/scinet/project_setup#tmpdir) for an example script. "

  - question: "A job script developed in `/project/<project_name>/RNASEQ_pipeline` sets `WORKDIR=$PWD`. The user submits a job from `/home` with the command <br>`sbatch /project/<project_name>/RNASEQ_pipeline/run_job.sh` <br>Will they find results in their project directory? What is the most likely issue?"
    title: "Using Environment Variables in Job Scripts"
    qid: 8
    answers:
      - "`$PWD` expands to the submission directory (`/home/user`), not the project pipeline directory."  
      - "`/project/<project_name>/RNASEQ_pipeline` is not accessible from compute nodes."  
      - "`$PWD` points to `$TMPDIR` during job execution."  
      - "The results exceeded the quota in `/project/<project_name>` and were deleted."  
    answer: 1
    responses:
      - "Correct! Using `$PWD` ties the working directory to the submission location (`/home/user`). To ensure results go to the project directory, in your script define `WORKDIR=/project/<project_name>/results` with an absolute path and enter it using `cd $WORKDIR`."  
      - "`/project` is fully accessible from compute nodes."  
      - "`$PWD` does not automatically point to `$TMPDIR`. It reflects the directory where the job was submitted."  
      - "Quotas in `/project` do not cause automatic deletion of files."  

  - question: "A user sets inside their job script: <br>`WORKDIR=results` <br>`mkdir -p $WORKDIR && cd $WORKDIR` <br>and submits the job from `/project/<project_name>/scripts`. They expected the outputs to appear in `/project/<project_name>/results`. Where will the outputs actually be written, and why?"
    title: "Using Relative vs. Absolute Paths"
    qid: 9
    answers:
      - Outputs will be in `/project/<project_name>/results` because the system resolves relative paths to the project root.  
      - Outputs will be in `/project/<project_name>j/scripts/results` because `results` is created relative to the submission directory.  
      - Outputs will be in `/home/results` because relative paths default to $HOME directory.  
      - The job will fail because `mkdir` cannot be used with relative paths.  
    answer: 2
    responses:
      - "Incorrect. The scheduler does not automatically map relative paths to `/project/<project_name>/results`."  
      - "Correct! Since `results` is a relative path, it is created under the submission directory (`/project/<project_name>/scripts`). Always use absolute paths (e.g., `WORKDIR=/project/<project_name>/results`) to avoid this mistake."  
      - "Relative paths do not point to your /home directory by default. `$HOME` or `~` must be explicitly referenced."  
      - "The command itself is not the problem, `mkdir` fully supports relative paths."  

  - question: "For the past 9 months, you’ve been working daily using Ceres, and this week you finally started creating the figures for your publication. This morning, you log in to Jupiter interface via OOD excited to continue, only to learn the supercomputer has suffered a major failure causing complete data loss. Which of the following practices would have saved your results?"
    title: "Data Lifecycle and Backup Awareness"
    qid: 10
    answers:
      - "Keeping important datasets and results in `/home`."  
      - "Regularly transferring key data to the backed-up LTS storage on Juno using Globus."  
      - "Using `$TMPDIR` for storing final outputs, since it is fast."  
      - "Relying on `/project` for long-term storage, since it is permanent."  
    answer: 2
    responses:
      - "`/home` is private but not backed up, and not suitable for storing research data."  
      - "Correct! Only LTS storage is backed up! Transferring critical datasets and results there with Globus ensures they are preserved even if supercomputer storage fails."  
      - "`$TMPDIR` is erased at the end of each job - it cannot be used for storing final results."  
      - "`/project` is permanent in terms of allocation, but not backed up - data can still be lost in case of hardware failure."  


  - question: "Create a new pipeline workspace in your <b>`/90daydata/shared/<user>`</b> directory with subdirectories for numbered steps (e.g., `01_data_prep`, `02_analysis`, `03_final_report`). Add a `README.md` file at the top level that describes the purpose of each subdirectory. What commands would you use?"
    title: "You Try! Create Your First Workspace"
    qid: 13
    solution: |
      Example solution:  
      ```bash
      mkdir -p /90daydata/shared/$USER   
      ```
      ```bash
      cd /90daydata/shared/$USER 
      ```
      ```bash 
      mkdir -p pipeline_workspace/{01_data_prep,02_analysis,03_final_report}  
      ```
      ```bash
      cd pipeline_workspace  
      ```
      ```bash
      nano README.md   # or use your preferred editor  
      ```
      *README.md content (example):*
      <div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="0" icon="false">
      # Pipeline Workspace <br>
      - Goal: Create a simple template for well-organized project structure <br>
      - location: @Ceres:/90daydata/shared/alex.badacz/pipeline_workspace <br>
      - created: Oct 2025 <br><br>
      ## Directory Tree <br> 
      - **01_data_prep/**: preparing raw input files: file integrity, format validation, initial pre-processing <br>
      - **02_analysis/**: main analysis steps, exploratory data analysis <br>
      - **03_final_report/**: selected final results, summary tables, plots, notes on key insights <br>
      </div></div>
      This structure keeps project data organized and makes workflows easier to reproduce.

---


<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1">
An active SCINet account with access to shared and project directories is required to complete this tutorial. 
Basic familiarity with the [SCINet File System](/computing-skills/scinet/file_system) and [Shell interface](/computing-skills/scinet/interfaces) for [navigating directories](/computing-skills/command-line/#navigating-the-unix-file-system) and [managing files](/computing-skills/command-line/#file-management-in-the-shell) is also expected.
</div></div>


## Overview

This tutorial introduces best practices for setting up research projects on SCINet supercomputers, covering directory structures, pipeline workspaces, working directories, scratch space usage, and documentation with README files to ensure clarity and reproducibility.

{% include overviews %}


## Getting started

First, you will log in through **Open OnDemand (OOD)** and use the shell to access SCINet file system locations.

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="<h3 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>Access the shell via SCINet OOD</h3><span style='font-weight: 300;'>(required) used for accessing supercomputers</span>" class="primary" controls="access-scinet" icon=false %}
<div id="access-scinet" class="accordion_content" markdown='1' hidden> 
{% include setup/scinet_access %}
{% include setup/scinet_login %}
{% include setup/ood_shell %}
</div>
</div>

The goal is to help you manage research projects efficiently by choosing the right location for your pipeline workspace and structuring it wisely, making effective use of temporary storage within system limits, and maintaining clear documentation for reproducibility and collaboration.

Before completing this section, it is recommended that you first go through the [File system on Atlas and Ceres supercomputers](/computing-skills/scinet/file_system) tutorial.


## Manage project structure

Once you have access to the specific [ARS Research Project](/computing-skills/scinet/file_system#project-directory) (i.e., `<project_name>`), you can create your own nested directories under the locations assigned to that project:
- **/project/**`<project_name>` on supercomputers (Atlas, Ceres) - base space for your project with quota
- **/90daydata/**`<project_name>` on supercomputers (Atlas, Ceres) - large short-term storage
- **/LTS/project/**`<project_name>` on archive storage (Juno) - long-term storage, periodically backed up

The number of nested workspaces is not limited, but it is important to structure them consistently to keep the project manageable and reproducible.

<div class="process-list ul" markdown="1">

### Directory Tree

A well-organized **directory tree** for your ARS research project, makes it easier to manage data, scripts, and results, while keeping personal and shared resources clearly separated. Below is an example structure you can adapt:
```bash
/project/<project_name>/
├── user1/                    # personal configs, installations, project-related notes
├── user2/
├── software/                 # group-shared tools or container recipes
├── scripts/                  # group-shared scripts or workflows
├── raw_data/                 # group-shared input data for analyses
├── research/                 # container for computations and analysis
│ ├── pipeline_X_v1_date/     # e.g. RNASEQ_deseq_05_25
│ ├── pipeline_X_v2_date/     # e.g. RNASEQ_svm_07_25
│ ├── analysis_Y_v2_date/     # e.g. compare_deseq_svm_09_25
│ ├── ...
│ └── README.md               # top-level description of the project structure and decision points
└── README.md                 # description of the project aims     
```
A good practice is to start with a **personal folder** for each user in the group, where they keep their own configurations, installations, or notes. 
Create separate **software/** and **scripts/** folders for tools, shared code, and configuration files that everyone in the group can use. 
For research activities:
  - maintain a **raw_data/** directory shared between group members,
  - create a top-level **research/** or **analysis/** directory as a parent for all computations, and
  - a separate [workspace](#pipeline-workspace) for each **pipeline iteration** or **analysis variant**. 

*This makes it easy to track changes, repeat analyses, and identify which results came from which run.*

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1"> 
<details markdown="1"><summary>A similar structure can also be mirrored within each user’s personal workspace.</summary> 

```bash
/project/<project_name>/
├── user1/
│ ├── software/              # user-installed tools
│   ├── envs/                # virtual environments (e.g., conda, venv)
│ ├── scripts/               # user scripts or workflows
│ ├── workdir-analysis-1     # e.g. RNASEQ_ref_genome_X
│ ├── workdir-tool-test      # e.g. diff_expression_deseq
│ └── README.md              # brief description of pipeline_v1 contents
...
```

This allows individual users to test tools or develop pipelines independently, while still following the same organizational pattern used by the group. Keeping personal workspaces consistent with the shared project structure makes it easier to move analyses between private and collaborative areas when needed. 
</details>
</div></div>

### Pipeline Workspace

<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1"> 
A **workspace** is a [directory tree](#directory-tree) created by a user to organize input data, scripts, intermediate files, and results for a specific analysis, pipeline, or computational task. A **[working directory](#working-directory)** is the active location (usually within a workspace) where computations are executed and outputs are written during a run.
</div></div>

A workspace should be created for each pipeline run, analysis variant, or other substantial computational task that involves managing files and commands in an organized way. Such a folder provides a structured layout to keep inputs, intermediate files, and results organized step by step. 

```bash
/project/<project_name>/
├── pipeline_X_v1_date/     # pipeline iteration, e.g., RNASEQ_deseq_05_25
│ ├── 01_step/              # e.g. 01_quality_control
│ ├── 02_step/              # e.g. 02_alignment
│ ├── 03_step/              # e.g. 03_quantification
│ ├── 04_step/              # e.g. 04_dge
│ ├── final_report/         # summary statistics, final tables, selected plots and figures, etc.
│ └── README.md             # order of steps and description of inputs and requirements
...
```

Each numbered subfolder corresponds to a sequential stage in the analysis, while parallel steps can be distinguished with letters. A [README.md](#readme) file at the pipeline root should record the order of steps, required inputs, special parameters, and the reasoning behind key decisions. This structure and documentation makes the analysis easier to reproduce and to share with collaborators.  

<div class="highlighted highlighted--highlighted"><div class="highlighted__body" markdown="1"> 
In the **/90daydata/** location, only create workspaces for selected pipelines or analyses that require large data loads or heavy computations with large intermediate files exceeding the project quota.   
- Scripts and tools can be called directly from their original location in **/project/** (with proper permissions). The [working directory](#working-directory) and output paths should be set to the **/90daydata/** location within your job submission script.  
- Once computations are completed, move the key outputs to **/project/** or archive them on Juno.
</div></div>

### README

Each layer *(analysis step)* in the [pipeline workspace](#pipeline-workspace) should ideally include a **README** file. These files act as lightweight documentation that explain the folder’s purpose, contents, and how it fits into the overall workflow. A clear and consistent `README` makes it easier for group members (and your future self) to understand what has been done, reproduce results, and continue work without confusion.  

Even short notes on inputs, outputs, and tool versions can prevent mistakes and save time. It is good practice to revisit and update the `README` each time you interact with the workspace (e.g., when checking the run status, troubleshooting issues, or reviewing and analyzing outputs), so that the documentation stays current and reflects what was actually done.  

<div class="highlighted highlighted--note"><div class="highlighted__body" markdown="1"> 
<details markdown="1"><summary>See a template for a well-structured README for a pipeline workspace</summary>
This format keeps each pipeline run transparent, reproducible, and easy to hand off to collaborators.
```markdown
# Pipeline Workspace: <pipeline_name> 
- version/variant: [...] 
- date: [...]
- location: e.g., Ceres:/project/<project_name>/path_to/<pipeline_workspace>

## Purpose
Briefly describe the analysis or pipeline variant this workspace represents.

## Data
- **Inputs:** list input files and their source (e.g., `/project/.../raw_data/sample_R1.fastq.gz`)
- **Outputs:** summarize expected outputs from this pipeline run
- **Intermediate files:** note which are safe to delete after completion

## Steps
1. **01_quality_control/**  
   Tool: FastQC v0.12.1  
   Parameters: default  
   Inputs: `sample_R1.fastq.gz`, `sample_R2.fastq.gz`  
   Outputs: `sample_R1_fastqc.html`, `sample_R2_fastqc.html`  

2. **02_alignment/**  
   Tool: BWA v0.7.17  
   Parameters: `-M`  
   Inputs: FastQC-checked FASTQs  
   Outputs: `aligned_reads.sam`  

3. **03_variant_calling/**  
   Tool: GATK v4.4.0.0  
   Parameters: `HaplotypeCaller` defaults  
   Inputs: aligned BAM  
   Outputs: VCF file with variants  

## Environment
- Modules loaded: `fastqc/0.12.1`, `bwa/0.7.17`, `gatk/4.4.0.0`
- Conda environment file: `/project/<project_name>/software/envs/pipeline_env.yml`

## Notes
- Special parameters or decisions (e.g., why a specific version was chosen)
- Known issues or limitations
- Suggestions for next iteration
```
</details>
</div></div>

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1"> 
<details markdown="1"><summary>A README can be created as either a plain text (.txt) or a Markdown (.md) file. </summary>
Both formats can be written and edited with simple command-line editors such as `nano` or `vim`, making them lightweight and easy to maintain on an HPC system. Using the `.md` extension allows you to take advantage of **Markdown syntax** (e.g., headings, bullet lists, code blocks). This is optional but highly recommended, because Markdown files are automatically rendered into a clean, human-readable format on GitHub and in modern editors with a graphical interface (such as Visual Studio Code). This makes the documentation easier to read and more accessible to collaborators. 
</details>
</div></div>

</div>

{% include question qid="13" %}

## Manage storage

In this section, you will learn how to manage storage effectively on SCINet by understanding quotas, making use of large temporary spaces, and planning for long-term data archiving. These practices will help you balance performance, avoid quota issues, and follow good data-lifecycle management on the supercomputer.

Before completing this section, it is recommended that you first go through the [File system on Atlas and Ceres supercomputers](/computing-skills/scinet/file_system) tutorial and [Manage project structure](/computing-skills/scinet/project_setup#manage-project-structure) section in this guide.

<div class="process-list ul" markdown="1">

### Storage types on SCINet

{% include setup/storage_types %}

### Check Your Quota

<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1">
A quota is a fixed limit on the amount of storage space (or number of files) that a user or project group can consume in a given file system. On HPC systems, quotas prevent individuals or projects from using excessive resources and ensure fair access for all users. Exceeding a quota may block new writes, cause job failures, or generate “no space left on device” errors.
</div></div>

All project directories exist on both clusters, however they may have different quotas. Data in the /project and /home directories is not automatically synced between the clusters.

```
# Check quota on Ceres 
my_quotas                                  # /home and /project
# Check quota on Atlas
quota -s                                   # /home directory
/apps/bin/reportFSUsage -p <project_name>  # /project directory
```


### Data Lifecycle

The data lifecycle in HPC describes how research data moves between different storage types depending on its purpose or performance needs. **Not all storage is equal.** Each location is designed for a specific stage of work.  

1. On SCINet supercomputers (Atlas, Ceres):
- **/home** is not intended for storing research data but rather for lightweight scripts and config files. 
- The **/project** directory is the main location for research data, software installs, computations. 
- For large short-term storage needs or broader collaboration, researchers can use **/90daydata**. 
- **$TMPDIR** is node-local scratch space useful for input-output (I/O) intensive computations but storage is cleared once you exit the allocated compute node. 

2. Finally, critical outputs and long-term datasets should be migrated to the Juno storage device (**/LTS/project/**), where data is preserved and backed up. No further computations there.

### Persistent vs. Temporary

The data storage location is not always the same as the active location where calculations are performed or where temporary files and outputs are written by default. Depending on quota limits, the intensity of I/O operations, and specific tool requirements, it is often more efficient to separate these locations: 
- (`$INPUTS`) one for persistent input data, 
- (`$WORKDIR` or `$TMPDIR`) another for active work or temporary files, 
- (`$OUTPUTS`) and another for final persistent outputs.  

On HPC, this is typically managed by setting **[shell variables](/computing-skills/command-line/configuration/variables)** with absolute paths that point to the chosen locations, which are then referenced in execution commands or job scripts. This approach ensures that computations run efficiently while keeping key results safe in the appropriate long-term storage, and prevents project spaces from being cluttered with temporary/intermediate files or excessive logs.

<div class="highlighted highlighted--highlighted"><div class="highlighted__body" markdown="1">
Input, tmp, output locations must be assigned within the same file system. Data should be transferred to the supercomputer first. Paths from other clusters or archive storage cannot be directly used during computation. User-managed file system mounts are not supported, so all referenced paths must exist locally.
</div></div>


### Working Directory

A working directory is the active location where computations are executed and where intermediate or temporary files are written by default. In many cases, this is the same location as the [pipeline workspace](#pipeline-workspace) in the **/project/** location. You can run commands directly from the working directory or submit SLURM scripts while inside it.  

The best practice is to define the working directory variable (`WORKDIR`) inside the submission script and reference it in the code (`$WORKDIR`). Absolute paths will always point to the same location, no matter where the submission script is located or from where it is submitted. 

```bash
# define working directory (absolute path) and move into it
WORKDIR=/project/<project_name>/pipeline_v1_date/01_step
mkdir -p $WORKDIR
cd $WORKDIR
```

<div class="highlighted highlighted--note"><div class="highlighted__body" markdown="1"> 
<details markdown="1"><summary>See an example of a complete submission script with WORKDIR setup</summary>
```bash
#!/bin/bash
#SBATCH --job-name="blastp"   # name of this job
#SBATCH -p short              # name of the partition (queue) you are submitting to
#SBATCH -N 1                  # number of nodes in this job
#SBATCH -n 40                 # number of cores/tasks in this job, you get all 20 physical cores with 2 threads per core with hyper-threading
#SBATCH -t 01:00:00           # time allocated for this job hours:mins:seconds
#SBATCH --mail-user=emailAddress   # enter your email address to receive emails
#SBATCH --mail-type=BEGIN,END,FAIL # will receive an email when job starts, ends or fails
#SBATCH -A slurm_account_name # name of the slurm account - same as the SCINet project name
#SBATCH -o "stdout.%j.%N"     # standard output, %j adds job number to output file name and %N adds the node name
#SBATCH -e "stderr.%j.%N"     # optional, prints our standard error

# define an absolute path to working directory and move into it
WORKDIR=/project/<project_name>/pipeline_v1_date/01_step
mkdir -p $WORKDIR
cd $WORKDIR

# load required modules, if applicable
module load fastqc/0.12.1

# run the tool, writing outputs into the working directory
INPUTS=/project/<project_name>/raw_data   # absolute path to raw inputs
date                                      # optional, prints out timestamp at the start of the job in stdout file
fastqc ${INPUTS}/sample_R1.fastq.gz ${INPUTS}/sample_R2.fastq.gz \
       --outdir $WORKDIR
date                                      # optional, prints out timestamp when the job ends
```
</details>
</div></div>

For tasks that generate large data loads and heavy intermediate files exceeding the project quota, the **/90daydata/** location on SCINet supercomputers is optimized for this purpose. When submitting jobs, set the working directory and output paths to `/90daydata/` so that temporary files are handled efficiently. 
```bash
# define working directory (absolute path) and move into it
WORKDIR=/90daydata/<project_name>/pipeline_v1_date/01_step
mkdir -p $WORKDIR
cd $WORKDIR
```
Be sure to copy important results to permanent storage in **/project/**, since files in `/90daydata/` are automatically deleted 30 days after their last access.

<div class="highlighted highlighted--highlighted"><div class="highlighted__body" markdown="1"> 
Scripts, tools, and reference data should remain in their permanent locations under **/project/**, while only runtime files and outputs are written into the working directory.
</div></div>

### $TMPDIR

As an additional option for tasks with large storage requirements, each **compute node** (only!) provides temporary local space in `$TMPDIR` (~1.5TB) that can be used as a [working directory](#working-directory). This storage is useful for I/O-intensive workflows that extensively use disk space reading and writing multiple small files. It is usable only while the job runs in the interactive session or in batch-mode. Be sure to copy final results to permanent storage before the job ends, as `$TMPDIR` is automatically cleared when the job concludes. 

<div class="highlighted highlighted--note"><div class="highlighted__body" markdown="1"> 
<details markdown="1"><summary>See an example of a complete submission script with $TMPDIR setup</summary>
```bash
#!/bin/bash
#SBATCH --job-name="fastqc_tmp"   # name of this job
#SBATCH -p short                  # partition (queue)
#SBATCH -N 1                      # number of nodes
#SBATCH -n 4                      # number of cores (adjust for tool)
#SBATCH -t 01:00:00               # time limit
#SBATCH --mail-user=emailAddress
#SBATCH --mail-type=BEGIN,END,FAIL
#SBATCH -A slurm_account_name     # SCINet project name
#SBATCH -o "stdout.%j.%N"         # standard output
#SBATCH -e "stderr.%j.%N"         # standard error

# define aboslute paths for permanent storage locations
INPUTS=/project/<project_name>/raw_data
RESULTS=/project/<project_name>/pipeline_v1_date/01_step
mkdir -p $RESULTS

# load module
module load fastqc/0.12.1

date      # optional: print timestamp for job start
# OPTIONAL: copy inputs into $TMPDIR (local node storage, faster I/O)
cp ${INPUTS}/sample_R1.fastq.gz ${INPUTS}/sample_R2.fastq.gz $TMPDIR

# move into $TMPDIR and run tool there
cd $TMPDIR
fastqc sample_R1.fastq.gz sample_R2.fastq.gz --outdir $TMPDIR

# copy $TMPDIR/<final_results> back to permanent storage
cp $TMPDIR/*fastqc* $RESULTS
date      # optional: print timestamp for job end
```
</details>
[Temporary Local Node Storage](https://scinet.usda.gov/guides/data/storage#temporary-local-node-storage) (SCINet User Guide) provides detailed instructions on staging data in and out of `$TMPDIR`. 
</div></div>

### Backed up LTS

For long-term preservation, copy key datasets and results to the backed-up LTS (Long-Term Storage) device (Juno). The recommended tool for reliable transfers is Globus, which supports checkpointing and restart to handle large files and bulk data efficiently. For up-to-date, detailed instructions on transferring data to LTS using Globus, please refer to the [Data and Storage SOP](https://scinet.usda.gov/guides/data/data-management#data-and-storage-sop) SCINet User Guide.

</div>


## Practical guidance

The choice of storage location depends on what kind of work you are doing. Knowing whether you need a private space, group-shared project data, temporary scratch for computations, or backed-up long-term storage helps you place files correctly, avoid quota or purge issues, and keep your research safe and reproducible.

<div class="usa-accordion " >
{% include accordion title="Quick Quiz: Check your understanding" controls="quiz-formats" expanded=false class="question" icon=true %}
<div id="quiz-formats" class="accordion_content" markdown='1'>
Now that you’ve explored how storage spaces differ in purpose, performance, and policies, try this quiz to test your knowledge of where to place files and how to keep your data safe through the full lifecycle.

{% include question qid="1,2,3,4,5,6,7,8,9,10" %}
</div>
</div>

<div class="process-list ul" markdown="1">
### Use in real projects
<br>
If you need...

<div class="usa-accordion" data-allow-multiple>

{% include accordion title="completing tutorials from this workbook (with/without project membership)" controls="dp1" expanded=false class="outline" icon=false %}
<div id="dp1" class="accordion_content" markdown="1">

- with or without project membership: use `/90daydata/shared` (accessible to all users).  
```bash
# create a personal workspace
mkdir -p /90daydata/shared/$USER/tutorials
cd /90daydata/shared/$USER/tutorials 
```
- With project membership, you can also create a tutorial workspace in `/90daydata/<project_name>`
```bash
mkdir -p /90daydata/<project_name>/tutorials/
```  

*(see section [Manage storage](#manage-storage) for details)*  
</div>

{% include accordion title="checking your current quota usage" controls="dp2" expanded=false class="outline" icon=false %}
<div id="dp2" class="accordion_content" markdown="1">
All project directories exist on both clusters, however they may have different quotas. 
Data in the `/project` and `/home` directories is not automatically synced between the clusters. 

```bash
# Check quota on Ceres 
my_quotas                                  # /home and /project
# Check quota on Atlas
quota -s                                   # /home directory
/apps/bin/reportFSUsage -p <project_name>  # /project directory
```
*(see sections [Storage types on SCINet](#storage-types-on-scinet) and [Check Your Quota](#check-your-quota))*
</div>

{% include accordion title="decluttering /home to resolve quota errors ('no space left on device')" controls="dp3" expanded=false class="outline" icon=false %}
<div id="dp3" class="accordion_content" markdown="1">
- Remove old logs, cached files, and conda environments.  
- Always store research data in `/project` or `/90daydata`.  
- Keep only lightweight configs and scripts.  

Check usage and hidden files (`~` is a shortcut to `/home`): 
```bash
ls -lha ~                         # show all files including hidden configs and caches
du -h --max-depth=1 ~ | sort -h   # check what takes the most space
```
Typical storage clutter: `.conda`, `.local`, `.cache`, and large log files.

Move `.conda` and `.apptainer` directories to `/project` and create symlinks back into `/home`:
```bash
mv ~/.conda /project/<project_name>/software/conda
ln -s /project/<project_name>/software/conda ~/.conda
```
</div>

{% include accordion title="decluttering /project to free space" controls="dp4" expanded=false class="outline" icon=false %}
<div id="dp4" class="accordion_content" markdown="1">
- Archive old results to LTS on Juno. See [detailed instructions, using Globus (preferred)](https://scinet.usda.gov/guides/data/data-management#detailed-instructions-using-globus-preferred).
- Remove duplicates or move temporary outputs to `/90daydata`.  
- Compress intermediate or currently unused files: 
```bash
tar -czf archive.tar.gz folder/
```  
</div>

{% include accordion title="installing group-shared software | installing with Conda" controls="dp5" expanded=false class="outline" icon=false %}
<div id="dp5" class="accordion_content" markdown="1">
First, check if a tool ia already avaialble on a supercomputer:  
```bash
module avail <tool>
ls /reference/containers
```

Install more software packages in `/project/<project_id>/software/`.  

Since `/home` directories on both clusters have small quotas, it’s recommended to save Conda installations to a `/project` directory. Move the miniconda/Conda to a project directory and create a symbolic link to the new location in the home directory.

- To build a Conda environment load miniconda module:
```
module load miniconda   # on Ceres
module load miniconda3  # on Atlas
```
```bash
mv ~/.conda /project/<project_name>/software/.
ln -s /project/<project_name>/software/.conda ~/.
```

*(see User Guide: [User-Installed Software with Conda](https://scinet.usda.gov/guides/software/conda#user-installed-software-with-conda))*

If you’re not sure whether you should install software yourself or if you need help, **[contact SCINet VRSC](https://scinet.usda.gov/support/request#software-request)**. 
</div>

{% include accordion title="getting access to data in a specific /project" controls="dp6" expanded=false class="outline" icon=false %}
<div id="dp6" class="accordion_content" markdown="1">
[Project directories](https://scinet.usda.gov/guides/data/storage#project-directories) are usually shared between group members working on the same project. Each project directory has a manager who 
can give and revoke access to the project directory.

Check your current membership in groups:
```bash
id $USER | grep "proj"  # check group membership
```
Ask the PI or project lead to add you to the project group:  
```bash
ipa group-add-member proj-<project_name> --users=<scinet_username>
ipa group-remove-member proj-<project_name> --users=<scinet_username>
```
After being added to the `proj-` project group, users will be able to access `/project/` and `/90daydata/` both on Ceres and Atlas, as well as `/LTS/project/` on Juno.

Alternatively, you can ask a collaborator to move the (non-sensitive data) dataset to `/90daydata/shared/` with appropriate access permissions:
```bash
chmod -R u+rwx /90daydata/shared/<dir_name>
```
`r` - read; `w` - write; `x` - execute

</div>

{% include accordion title="sharing project data securely with users without project membership" controls="dp7" expanded=false class="outline" icon=false %}
<div id="dp7" class="accordion_content" markdown="1">

- Use `/90daydata/shared` for temporary, non-sensitive data.  

*(see [File system on Atlas and Ceres supercomputers: /90daydata/shared](/computing-skills/scinet/file_system#daydatashared))*  
</div>

{% include accordion title="flexible path management in job scripts" controls="dp8" expanded=false class="outline" icon=false %}
<div id="dp8" class="accordion_content" markdown="1">
Define shell variables storing absolute paths to INPUTS, OUTPUTS and working directory:  
```bash
INPUTS=/project/<project_id>/raw_data/<dataset_X>
OUTPUTS=/project/<project_id>/<pipleine_X>/results

WORKDIR=$OUTPUTS          # or /90daydata/<project_name> or $TMPDIR or different absolute path
mkdir -p $WORKDIR
cd $WORKDIR
```
Use absolute paths to prevent path resolution issues. Avoid using `$PWD`, as it always expands to your current working directory and changes whenever you move within the file system.  
*(see section [Working Directory](#working-directory))*
</div>

{% include accordion title="processing (either reading or writing) hundreds files (I/O intensive computations)" controls="dp9" expanded=false class="outline" icon=false %}
<div id="dp9" class="accordion_content" markdown="1">
Use a compute node to complete this task. Start interactive session or submit a job to SLURM queue. In your script:

- stage input data in `$TMPDIR`: 
```bash
cp /project/<project_name>/raw_data/*.fastq $TMPDIR/
```

- enter the scratch space on a compute node:
```bash
cd $TMPDIR/ 
```

- execute commands using transferred inputs: 
```bash
command <options> <inputs> <outputs>
```

- by default results should also be saved in $TMPDIR, so copy them back to `/project` before exiting a compute node:
```bash
cp $TMPDIR/<outputs> /project/<project_name>/<pipeline_x>/<results> 
```

*(see section [$TMDIR](#tmpdir) for details on node-local scratch space)*
</div>

{% include accordion title="copying results out of $TMPDIR before job completion" controls="dp10" expanded=false class="outline" icon=false %}
<div id="dp10" class="accordion_content" markdown="1">

Always copy outputs to persistent location at the end of your job script:  
```bash
cp $TMPDIR/* /project/<project_id>/results/
```
When you exit a compute node, the scratch space in `$TMPDIR` is automatically and permanently deleted.
*(see section [Working directory](/computing-skills/scinet/project_setup#working-directory))*
</div>

{% include accordion title="backing up important results" controls="dp11" expanded=false class="outline" icon=false %}
<div id="dp11" class="accordion_content" markdown="1">

Transfer to LTS on Juno using Globus.
- [Detailed instructions, using Globus (preferred)](https://scinet.usda.gov/guides/data/data-management#detailed-instructions-using-globus-preferred)
- [Alternative instructions, using` scp` or `rsync` CLI commands](https://scinet.usda.gov/guides/data/data-management#alternative-instructions-not-using-globus)
</div>

{% include accordion title="requesting more storage space in /project or for long term storage (LTS)" controls="dp12" expanded=false class="outline" icon=false %}
<div id="dp12" class="accordion_content" markdown="1">

Submit a [Resources Request](https://scinet.usda.gov/support/request#request-resources) to the SCINet VRSC.  
- [To Request a New SCINet Project](https://scinet.usda.gov/support/request#to-request-a-new-scinet-project)
- [To Modify an Existing SCINet Project](https://scinet.usda.gov/support/request#to-modify-an-existing-scinet-project)
- [To Request a Quota Increase for an Existing SCINet Project](https://scinet.usda.gov/support/request#to-request-a-quota-increase-for-an-existing-scinet-project)

</div>

</div>
</div>

{% if page.takeaways %}
## Best Practices

<ul>
  {% for takeaway in page.takeaways %}
    <li>{{ takeaway }}</li>
  {% endfor %}
</ul>
{% endif %}