---
title: Workspace setup for bioinformatics
description: "Set up a productive bioinformatics workspace with organized storage, documented workflows, version control, and tested pipelines"
svg: /genomics.svg
author: Aleksandra Badaczewska

header:
  overlay_image: 07-wrangling/assets/img/07_data_acquisition_banner.png
index: 
order: 5
wg: Bioinformatics
description: ""
type: interactive tutorial

objectives: 
  - Understand the key components of setting up a bioinformatics pipeline on an HPC environment.
  - Learn best practices for organizing project files, managing storage, and documenting workflows.
  - Recognize HPC-specific storage structures, usage policies, and quota limitations.
  - Become familiar with effective strategies for collaboration and data sharing in HPC settings.

applications:
  - Structuring a workspace directory for different types of bioinformatics analyses (e.g., RNA-seq).
  - Managing data and metadata across home, scratch, long-term storage, and shared workspaces.
  - Configuring and documenting software environments using module systems or Conda.
  - Using reproducible project templates for consistent pipeline setup and configuration.
  - Integrating GitHub repositories for version control, collaboration, and workflow transparency.

terms: [HPC, File System, Quota, Scratch Space, Project Directory, Metadata, Module System, Container, Environment File, Conda, Git Repository, Reproducibility]

takeaways: 
  - "Start with a clear directory tree structure: separate raw data, processed results, scripts, and logs."
  - "Use README.md, environment files, and changelogs to document workflows and project decisions."
  - "Understand the purpose and limitations of different storage tiers (e.g., scratch vs. home vs. archive) and clean up intermediate files regularly."
  - "Monitor your quota usage and be aware of retention or purge policies on shared resources."
  - "Use version-controlled repositories (e.g., GitHub) to manage pipeline templates, analysis scripts, and documentation."
  - "Document software versions and module configurations to ensure reproducibility."
  - "Always test pipelines with small data subset before scaling up."
  - "Preserve critical results in backed-up long-term storage on Juno."

overview: [objectives, applications, terminology]

questions:
  - question: "Why is it recommended to create a dedicated workspace for each pipeline instead of keeping all files directly in `/project`?"
    title: "Workspace Purpose"
    qid: 1
    answers:
      - "to make quota monitoring easier in `/home`"
      - "to keep analysis steps organized and reproducible"
      - "to speed up I/O operations on compute nodes"
    answer: 2
    responses:
      - "Incorrect. Quota management is not the main reason for workspaces."
      - "Correct! A dedicated workspace organizes pipeline steps, improves reproducibility, and avoids mixing multiple analyses."
      - "Not quite. Storage tier choice affects I/O speed, not just having a workspace."

  - question: "Which of the following is the safest place to store a virtual environment or container shared across multiple pipelines or users?"
    title: "Shared Environments"
    qid: 2
    answers:
      - "Ii your `/home` directory"
      - "inside each workspace separately"
      - "in `/project/<project_id>/software`"
    answer: 3
    responses:
      - "Incorrect. `/home` has a small quota and is not meant for software installs."
      - "Not ideal. This duplicates environments and wastes storage."
      - "Correct! The shared software folder in `/project` makes environments reusable."

  - question: "You want to create a DESeq2 environment in a way that your teammates can use it too, without everyone duplicating installs in their own `~/.conda/`. What’s the best way to do this?"
    title: "Sharing Conda Environments"
    qid: 5
    answers:
      - "Use `conda create -n deseq2_env` so everyone has the same env name."
      - "Create the env in a group-shared location by using `conda create -p /project/<project_name>/software/envs/deseq2_env`"
      - "Install DESeq2 directly in the base Conda environment and tell teammates to use `conda activate base`."
      - "Export the env to YAML with `conda env export > deseq2_env.yml` and email it to teammates."
    answer: 2
    responses:
      - "Creating in your personal `~/.conda` only makes it available to you, not your group."
      - "Correct! Using `-p` places the env in the specified (shared) location, from where it can be activated by all teammates."
      - "Installing in `base` is discouraged; it can break dependencies and is not shareable across users."
      - "Exporting YAML is useful for reproducibility but doesn’t create a shared ready-to-use env on the cluster."

  - question: "Previously, you built a single large Conda environment that included FastQC, Trimmomatic, HISAT2, DESeq2, and various plotting libraries. Now you want to try alignment-free quantification with Salmon, so you started creating another all-in-one environment (this time without HISAT2). What would have been a better strategy?"
    title: "Creating Environments Efficiently"
    qid: 6
    answers:
      - "First check if some tools are available as modules or containers, and install only if your required version is not provided."
      - "Build separate, smaller environments for each tool or task (e.g., one for QC, one for alignment, one for DGE) to enable flexible reuse."
      - "Reuse group-shared environments in `/project/<project_name>/software` instead of duplicating installs."
      - "All of the above."
      - "Always install everything into a new Conda environment to keep things simple in one all-in-one env for the entire pipeline."
    answer: 4
    responses:
      - "Correct - but not the only correct choice. <br>Always check for existing modules or containers before creating a new environment."
      - "Correct - but not the only correct choice. <br>Smaller, task-specific environments are easier to maintain, avoid conflicts, and can be reused across pipelines."
      - "Correct - but not the only correct choice. <br>Group-shared environments prevent duplication and save space in quota-limited `/home`."
      - "Correct! The best approach combines all these strategies: check for existing tools first, keep environments small and modular, and place them in shared project space."
      - "Incorrect. Large all-in-one environments are inefficient, prone to version conflicts, and often duplicate the installation of a tool available elsewhere."

  - question: "You want to reuse the same reference genome across multiple pipeline versions. Which is the most efficient way to include it in your workspace?"
    title: "Referencing Raw Data"
    qid: 3
    answers:
      - "Copy the genome FASTA into each workspace separately"
      - "Create a symlink from your workspace to the shared reference location or use an absolute path to the reference genome in your script"
      - "Download the genome anew for each pipeline"
    answer: 2
    responses:
      - "Not efficient - this duplicates large files and wastes storage."
      - "Correct! Symlinks let you reuse shared data without duplication."
      - "Incorrect - downloading each time is unnecessary and slow."
      - "Correct! Using absolute paths ensures scripts point reliably to the shared reference, making workflows reproducible and avoiding ambiguity."

  - question: "You and three teammates each created your own workspace inside `/project` to test different tools for step 05_DGE in the RNA-seq pipeline. Everyone referenced inputs from the shared `raw_data/` folder and created environments individually. Now your `/project/<project_name>` has exceeded its quota. Which best practices would have helped prevent this issue?"
    title: "Collaboration in Project Space"
    qid: 4
    answers:
      - "Use smaller test datasets before scaling up to full inputs"
      - "Share software environments for common steps instead of duplicating installs"
      - "Precompute steps 1–4 once and share the results as input for multiple DGE variant testing"
      - "All answers are correct."
    answer: 4
    responses:
      - "Correct - but not the only correct choice. <br>Testing with subsets minimizes data usage and speeds up trial runs."
      - "Correct - but not the only correct choice. <br>Sharing environments at the project level avoids redundant installs and saves space."
      - "Correct - but not the only correct choice. <br>Precomputing early steps once and reusing outputs prevents unnecessary duplication of large intermediate files."
      - "All answers are correct." 

  - question: "You suddenly hit 'No space left on device' errors in your `/home` directory, even though you only store a few scripts there. What is the most likely cause and best practice fix?"
    title: "Quota Troubleshooting"
    qid: 7
    answers:
      - "Hidden caches and environments (e.g., `.conda`, `.cache`) are consuming space; move them to `/project/<project_name>/software/` and link back."
      - "Large raw datasets should always be stored in `/home`; compress them to free up space."
      - "Logs from recent jobs filled up `/home`; delete `/var/log` entries to clear them."
      - "The quota applies cluster-wide; request an increase to fix the error."
    answer: 1
    responses:
      - "Correct! Hidden directories like `.conda` or `.cache` often consume most of the quota. Move them into project storage and create symlinks back to `/home`."
      - "`/home` is not meant for raw data. Storing datasets there will quickly exceed quota and is discouraged."
      - "System logs are not stored in your `/home`; deleting `/var/log` entries is unsafe and won’t fix the issue."
      - "Quota for `/home` is fixed to 30GB per user on SCINet supercomputers. The standard solution is to clean up or relocate large files."

  - question: "You want to test RNAseq pipeline with a new tool. Which is the best approach?"
    title: "Test Before Scaling Up"
    qid: 8
    answers:
      - "Run the full dataset in `/project` to be safe"
      - "Downsample your FASTQ files and test pipeline in `/90daydata` or `$TMPDIR`"
      - "Copy all raw data into `/home` for faster access"
    answer: 2
    responses:
      - "Not efficient. Full runs waste time and resources when testing."
      - "Correct! Testing with small datasets in temporary storage helps optimize scripts before scaling up."
      - "Wrong. `/home` is not for large data and will hit quota limits quickly."

  - question: "Which storage location is backed up and safest for long-term preservation of key data or results?"
    title: "Backed up Storage"
    qid: 9
    answers:
      - /home
      - /90daydata
      - /project
      - /LTS/project
    answer: 4
    responses:
      - "`/home` is quota-limited and not backed up. Available on Atlas and Ceres supercomputers."  
      - "`/90daydata` is automatically purged and unsuitable for long-term storage. Available on Atlas and Ceres supercomputers."  
      - "`/project` is persistent but not backed up. Available on both supercomputers but content is not synced."  
      - "Correct! LTS is the only backed-up storage, designed for long term storage of data that cannot be easily reproduced. Available on Juno."  

  - question: "You rerun a workflow 6 months later using the same raw data inputs and pipeline steps, but get slightly different results. Which practice would most likely have prevented this?"
    title: "Reproducibility"
    qid: 10
    answers:
      - "Documenting which software modules and versions were loaded"
      - "Using relative paths for input and output"
      - "Saving intermediate files in `/90daydata`"
      - "Organizing results in separate workspaces"
    answer: 1
    responses:
      - "Correct! Recording software versions is key for reproducibility. Many tools are available in multiple module versions, and the default (e.g., `module load fastqc`) can change over time. Best practice is to load a specific version, such as `module load fastqc/0.12.1`."
      - "Relative paths make scripts fragile and harder to reuse. Always prefer absolute paths to ensure inputs and outputs are found consistently."
      - "The storage location does not affect the calculation results. However, spaces like `/90daydata` are purged and cannot be relied on for long-term reproducibility."
      - "Organized workspaces improve navigation and clarity, but they do not prevent differences in the actual results."  

---


<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1"> 
An active SCINet account with access to shared and project directories is required to complete this tutorial. 
Basic familiarity with the [SCINet File System](/computing-skills/scinet/file_system) and [Shell interface](/computing-skills/scinet/interfaces) for [navigating directories](/computing-skills/command-line/#navigating-the-unix-file-system) and [managing files](/computing-skills/command-line/#file-management-in-the-shell) is also expected. No prior experience with bioinformatics pipeline development is required. 
</div></div>


## Overview

SCINet HPC environments provide the resources and computing power needed for large-scale bioinformatics analyses. 
To use these systems effectively, projects should be set up in a way that is well-organized, easy to maintain, 
efficient in storage usage, and aligned with best practices for shared multi-user workspace.

This tutorial will guide you through practical strategies for structuring bioinformatics projects on HPC systems. 
You’ll learn how to manage files across different storage locations, document your work clearly, and apply reusable templates that support reproducibility and collaboration.

{% include overviews %}


### Reproducibility, compliance, and collaboration needs

A well-structured workspace setup is more than a matter of convenience on a shared supercomputer:
- It ensures **reproducibility**, by keeping data, code, and environments organized and documented in a way that others (and your future self) can follow.  
- It supports **compliance**, by aligning with storage policies, quotas, and security rules that govern shared HPC resources.  
- It enables **collaboration**, by making projects easier to share, extend, and maintain within research groups.  

### Why project structure matters in bioinformatics?

Project structure matters in bioinformatics because it directly affects efficiency, reproducibility, and resource usage. Placing inputs and outputs in the right storage tier can speed up calculations and prevent quota or purge issues, while organizing scripts and results makes workflows easier to share and repeat. Many datasets (e.g., reference genomes) and tools are pre-downloaded on HPC systems, so knowing where to find them can save hours of unnecessary setup.

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1">
**Structure your project, and your research will structure itself!**
</div></div>

## Getting started

Before starting, make sure you are familiar with:  
- [Accessing interfaces on SCINet](/computing-skills/scinet/interfaces)
- [File system on Atlas and Ceres supercomputers](/computing-skills/scinet/file_system)  
- [Creating Project Structure](/computing-skills/scinet/project_setup#manage-project-structure)  
- [Managing Storage](/computing-skills/scinet/project_setup#manage-storage)  

First, you will log in through **Open OnDemand (OOD)** and use the shell to access SCINet file system locations.

<div class="usa-accordion" style="margin-top: 1em;">

{% include accordion title="<h3 style='margin: 0; border-bottom: none; font-size: 1.1em; display: inline;'>Access the shell via SCINet OOD</h3><span style='font-weight: 300;'>(required) used for accessing supercomputers</span>" class="primary" controls="access-scinet" icon=false %}
<div id="access-scinet" class="accordion_content" markdown='1' hidden> 
{% include setup/scinet_access %}
{% include setup/scinet_login %}
{% include setup/ood_shell %}
</div>
</div>

The goal is to help you set up and organize a well-structured **workspace for bioinformatics workflows** by creating a clear directory structure, using the appropriate storage tiers for inputs, temporary files, and results, and documenting your pipeline for reproducibility and collaboration.

<div class="process-list" markdown="1">

### Create a workspace

*Organize your analysis with a clear directory structure for inputs, intermediate files, and results.*

A **workspace** is your main directory for organizing bioinformatics analysis. 
It lives inside your project space (`/project/<project_name>/` or `/90daydata/<project_name>/`) and keeps inputs, intermediate files, and results clearly separated. 
A well-structured workspace makes your work easier to navigate, reproducible, and shareable with collaborators.

In this tutorial we will use **RNAseq pipeline** as a working example, but you can find template structures for other common workflows in the section [Templates for Bioinformatics Pipelines](#templates-for-bioinformatics-pipelines).

<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1"> 
**Naming your workspace**  
- Avoid overly generic names like `RNAseq_pipeline`. Instead, make the workspace name specific and informative by including details such as the organism, experimental condition, or analysis variant. 
- Even if you expect only a single iteration, add a default version marker or a timestamp (e.g., `RNAseq_mouse_devbrain_v1`). 
- Long, descriptive names are good practice: with tab completion and easy path copying in the CLI, length is not an obstacle but clarity is a benefit. 
**Examples:**  
`RNAseq_human_BRCA_2025_03`, `RNAseq_yeast_glucose_vs_ethanol_2025`, `RNAseq_arabidopsis_saltstress_Mar2025`
</div></div>

1. Navigate to your project space
```bash
cd /project/<project_name>
```

2. Create a new workspace for your analysis
```bash
mkdir RNAseq_thaliana_v1_Oct_2025
cd RNAseq_thaliana_v1_Oct_2025
```

3. Add subdirectories for each step of your pipeline
```bash
mkdir workflow 
cd workflow 
mkdir 00_raw_data 01_read_qc 02_trimming 03_alignment 04_quantification 05_dge final_report
mkdir -p 03_alignment/ref_assembly 03_alignment/hisat2 05_dge/0-config 05_dge/1_analysis 05_dge/2_downstream 05_dge/3_plots 
```

By creating a **root folder** for your computational steps (i.e., `workflow`) and then adding subdirectories for each step, you build a clear map of your analysis. This structure:  
- **shows the scope of the project** - each numbered step (00–05) reflects a stage in your pipeline, from raw data to final report.  
- **reveals required tools and resources** - nested directories (e.g., `03_alignment/hisat2`, `05_dge/1_analysis`) indicate what software and analyses will be needed.  
- **enables tracking progress** - completed steps can be checked quickly by looking at the relevant folder.  
- **facilitates navigation** - with consistent numbering, you can easily find your way through the workflow in the CLI.  
- **supports searching and reproducibility** - organized directories make it simple to locate intermediate files, repeat analyses, or share the project with collaborators.  

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1"> 
Numbered prefixes (`00_raw_data`, `01_read_qc`, etc.) ensure that steps appear in logical order when listed with `ls` or `tree`, which is especially useful when revisiting the workflow in the future.
</div></div>

### Document from the start

*Keep notes in README file alongside your work so that others (and your future self) can follow every step.*

Good documentation is the backbone of a reproducible workflow. Every workspace should have a **main `README.md` file** at its root. This file acts as the first entry point for you and your collaborators to understand what the workspace contains and how to use it.

<div class="highlighted highlighted--basic"><div class="highlighted__body" markdown="1"> 
README acts as lightweight documentation that explain the folder’s purpose, contents, and how it fits into the overall workflow. A clear and consistent `README` makes it easier for group members to understand what has been done, reproduce results, and continue work without confusion.  
</div></div>

<ol>
<li><div markdown="1">Create the main `README` in the root of the pipeline wrokspace:
```bash
cd /project/<project_name>/RNAseq_thaliana_v1_Oct_2025 
touch README.md
```
</div></li>
<li><div markdown="1">Add pipeline metadata  
Open the file in your preferred CLI text editor:
```bash
nano README.md 
```

Start with basic metadata that uniquely identifies the pipeline:  
   ```text
# Pipeline Workspace: RNA-seq analysis with DEG for A. thaliana 
- version/variant: v1
- date: Oct 2025
- location: @Ceres:/project/<project_name>/RNAseq_thaliana_v1_Oct_2025

## Purpose
Briefly describe the analysis or pipeline variant this workspace represents. For example: 
This workspace contains the first iteration of the RNA-seq differential expression pipeline for *Arabidopsis thaliana* wild type vs. mutant samples.  
```

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1"> 
Always record why you created this workspace (purpose, dataset, condition, or experiment). Even if you remember now, your collaborators (or your future self) will thank you later.
</div></div>
</div></li>

<li><div markdown="1">Document the workspace structure in a README  
Besides pipeline metadata, your `README.md` should also capture the **directory structure** of your workspace. 
This makes it easy to understand what goes where.  
Generate a tree of your workflow directory (limit depth to 3 levels to keep it readable):  
```bash
tree -L 3 workflow/
```
Then copy the displayed folder structure and paste it into your `README.md`:
```bash
workflow/                         # root folder for your RNA-Seq project; customize it
├── 00_raw_data/                  # raw FASTQ files, md5 checksums
├── 01_read_qc/                   # fastqc reports, multiqc summary
├── 02_trimming/                  # trimmed FASTQs, trimming logs (optional)
├── 03_alignment/                 # bam/cram alignments, indexes (optional)
│   ├── ref_assembly/             # reference genome or transcriptome (downloaded or assembled de novo)
│   └── {align_tool}              # e.g, star, hisat2, minimap2 for the alignment step
├── 04_quantification/            # count matrices or quant.sf files
├── 05_dge/                       # differential expression analysis
│   ├── 0-config/                 # contrasts, covariates, sample groups
│   ├── 1_analysis/               # DE testing (deseq2/edger/limma)
│   ├── 2_downstream/             # functional/enrichment analyses (GO, KEGG, pathways, networks)
│   └── 3_plots/                  # pca, ma-plots, volcano, heatmaps
└── final_report/                 # compiled report, EDA, figures/tables for manuscript
```
</div></li>
</ol>

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1"> 
Regenerate and update this directory tree whenever your workflow structure changes - it acts as a live map of your workspace. 
Each layer *(analysis step)* in the pipeline workspace should ideally include a **README** file.
</div></div>


### Manage data storage dynamically

*Place files in the right storage tier, migrate data as needed for a task, clean up temporary files, and compress or archive results to stay within quotas.*

Efficient storage management means placing data in the right location at the right time. By separating raw inputs, staging heavy computations in temporary spaces, cleaning up unneeded files, and archiving results to backed-up storage, you can keep your workflows fast, organized, and within quota limits.

<div class="usa-accordion" data-allow-multiple>
{% include accordion title="Raw data inputs" controls="data-1" expanded=false class="outline" icon=false %}
<div id="data-1" class="accordion_content" markdown='1'>
Raw sequencing data are usually large, so efficient handling is essential.  

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1"> 
-&nbsp;**Keep original raw data read-only** and safe from accidental modification.  
-&nbsp;Prevent unnecessary data duplication, which is critical given the size of bioinformatics datasets.  
-&nbsp;Keep workspaces lightweight and focused only on what the pipeline needs for analysis.  
</div></div>

Follow these best practices:  

1. Store raw data centrally in your project space  
   Keep all original raw data files in a dedicated folder directly in your research project `/project/<project_name>/raw_data/`. Organize different datasets in uniquely and descriptively named subdirectories (e.g., by experiment, organism, or date).  
   ```bash
   mkdir -p /project/<project_name>/raw_data/arabidopsis_rnaseq_oct2025
   # Use Globus to move data to the supercomputer
   chmod -R a-w /project/<project_name>/raw_data/arabidopsis_rnaseq_oct2025   # set read-only permissions
   ```

2. In your workspace, only reference raw data *(never duplicate it)*  
   Do not copy large input files into each analysis workspace. Instead, either:
   - create symlinks inside **00_raw_data/** (or **00_inputs/**) of your pipeline workspace:
     ```bash
     cd /project/<project_name>/RNAseq_thaliana_v1_Oct_2025/00_raw_data
     ln -s /project/<project_name>/raw_data/arabidopsis_rnaseq_oct2025/*.fastq.gz .
     ```
   - or, create a text file listing the absolute paths to your input files:
     ```bash
     cd /project/<project_name>/RNAseq_thaliana_v1_Oct_2025/00_raw_data
     ls /project/<project_name>/raw_data/arabidopsis_rnaseq_oct2025/*.fastq.gz > inputs.txt
     ```

3. Handle simple preprocessing in the workspace  
   If basic preparation is required (e.g., renaming, combining runs, or reformatting), perform this in the **00_raw_data/** workspace directory. This ensures the original raw files remain unchanged and intact, while your pipeline can operate on (temporary) prepared versions.
   ```bash
   cd 00_raw_data
   zcat sample_R1.fastq.gz sample_R2.fastq.gz | gzip > sample_merged.fastq.gz
   ```
</div>

{% include accordion title="Use temporary storage for heavy computations" controls="data-2" expanded=false class="outline" icon=false %}
<div id="data-2" class="accordion_content" markdown='1'>
Some steps in bioinformatics (e.g., read alignment, variant calling, large matrix generation) are **I/O-intensive** and run faster in temporary storage:  
- **`/90daydata/<project_name>`** - large temporary storage for data that doesn’t need to be permanent; files are automatically purged 90 days after last access.  
- **`$TMPDIR`** - local scratch space on a compute node, very fast but wiped clean once the job finishes or you exit the node.  

Follow these best practices:  
- Stage large intermediate files to `/90daydata/` or `$TMPDIR` during computation.  
- Copy only the essential results back to `/project`.  

```bash
# Inside your job script
cp /project/<project_name>/RNAseq_thaliana_v1_Oct_2025/00_raw_data/*.fastq.gz $TMPDIR
cd $TMPDIR
hisat2 -x ref_index -U sample.fastq.gz -S sample.sam
cp sample.sam /project/<project_name>/RNAseq_thaliana_v1_Oct_2025/03_alignment/
```
</div>

{% include accordion title="Clean up temporary files" controls="data-3" expanded=false class="outline" icon=false %}
<div id="data-3" class="accordion_content" markdown='1'>
Temporary files (e.g., intermediate BAMs, logs, caches) can quickly consume your quota. Remove or compress files you no longer need.

Examples:
```bash
# Remove intermediate BAMs after converting to CRAM
rm *.bam

# Compress logs
gzip *.log
```
</div>

{% include accordion title="Archive and backup key results" controls="data-4" expanded=false class="outline" icon=false %}
<div id="data-4" class="accordion_content" markdown='1'>
Only the Long-Term Storage (LTS) device on Juno is backed up.  
For important datasets and final results:
- Transfer them to LTS using Globus.
- Keep project space tidy by archiving and migrating large outputs.

```bash
# Archive results before transfer
tar -czf thaliana_dge_results_Oct2025.tar.gz RNAseq_thaliana_v1_Oct_2025/

# Start a Globus transfer to LTS
```
</div>

</div>

<div class="highlighted highlighted--highlighted"><div class="highlighted__body" markdown="1"> 
SCINet supercomputers provide [multiple storage tiers](#storage-types-on-scinet), each designed for a specific purpose. These tiers differ in performance, persistence, and access policies. Misusing them (for example, storing large datasets in your **/home** directory or relying on scratch spaces (**/90daydata**, **$TMPDIR**) for long-term storage) can lead to performance issues, quota errors, or permanent data loss.  
</div></div>

Follow best practices:  
- `/home` - personal configs and scripts  
- `/project` - main datasets, software, shared group work  
- `/90daydata` - temporary data, auto-purged after 90 days  
- `$TMPDIR` - local scratch on a compute node, deleted when the job ends  
- `/LTS/project` - backed up device for long term storage (Juno) 


### Build a reproducible environment

*Use modules, containers, or package managers to ensure your tools and dependencies can be recreated.*

A reproducible environment ensures that your analysis can be repeated later and shared with collaborators. 
On SCINet supercomputers you have multiple options for managing environments:  
- **Modules**: load pre-installed software with `module load`.  
- **Containers**: use ready-to-run images from `/reference/containers` (e.g., salmon).  
- **Virtual environments**: create Conda or Python `venv` environments in your `/project/<project_id>/software/` directory for group use.  

In a bioinformatics pipeline you often need multiple tools, and some of them must be kept in compatible versions. 
Creating an environment for your analysis can mean combining different approaches: loading some tools as modules, running others from containers, or installing your own in a virtual environment.  
Managing environments for a pipeline means grouping tools with their dependencies so that each step works reliably. Sometimes this requires maintaining separate environments for different tasks and switching between them dynamically depending on the stage of analysis.  

<div class="highlighted highlighted--question"><div class="highlighted__body" markdown="1"> 
**Example:** You might run `FastQC` and `Trimmomatic` as modules, use a containerized `Salmon` aligner from `/reference/containers`, and finish with a `DESeq2` Conda environment for differential expression analysis.
```bash
# load modules on Ceres
module load fastqc/0.12.1
module load trimmomatic/0.39

# use container with apptainer
module load apptainer
apptainer exec /reference/containers/salmon/0.10.1/salmon-0.10.1.simg  salmon --help

# create and use Conda env
module load miniconda/24.7.1-2
conda create -n deseq2_env bioconductor-deseq2 r-base r-essentials
conda activate deseq2_env
```

</div></div>

#### Organize environments in your project

<div class="highlighted highlighted--highlighted"><div class="highlighted__body" markdown="1"> 
If you need the same tools across several pipelines, create and store Conda or other virtual environments in a **group-shared software folder** (e.g., `/project/<project_name>/software/`) and reference them from there.  
</div></div>

Installing a new Conda environment for each workflow often leads to **duplicate copies of the same tools**, which wastes space. A better strategy is to maintain smaller, tool-specific environments rather than building large, all-in-one environments with many overlapping dependencies. A modular approach makes environments lighter, easier to maintain, and reusable across projects. It’s often helpful to keep environments in clearly named subfolders:
```bash
/project/<project_name>/          # root folder for a research project
├── software/                     # parent folder for all group-shared custom user installations
│   ├── envs/                     # ready-made virtual environments (Conda, venv)
│       ├── plot_py_env/          # environment for python-based plotting
│       ├── ...
│       └── bio_dge_env/          # e.g, Conda env for R + DESeq2
```

#### Reference environments in your workspace

It’s often helpful to keep information about environments for different pipeline steps in clearly named subfolders in your pipleine workspace. 
This makes it easy to activate the right environment, inform collaborators, and avoid repeated installations.
```bash
cd /project/<project_name>/RNAseq_thaliana_v1_Oct2025
mkdir -p envs
```

```bash
RNAseq_thaliana_v1_Oct2025/       # root folder for your RNA-Seq project; customize it
├── workflow/                     # parent folder for all computatoional steps in a pipeline
├── envs/                         # documentation for environments used in a pipeline
│   ├── qc_env/                   # module_list.txt including FastQC and Trimmomatic
│   ├── quant_env/                # container config or container_list.txt for Salmon
│   ├── dge_env/                  # e.g, environment.yml for Conda env with R + DESeq2; absolute path to env
│   └── README.md                 # documentation on switching and using environments
```
Each environment folder can store:  
- **Environment definition files** (e.g., `environment.yml`, `requirements.txt`, `module_list.txt`)  
- **Activation notes** or small README explaining how to load/run the tools  
- Optional **symlinks** to group-shared containers or software installs in `/project/<project_id>/software/`  

At minimum, record instructions for activating each environment in a dedicated `envs/README.md`.  
For example:  
```bash
# 01_read_qc/ and 02_trimming/
module load fastqc/0.12.1
module load trimmomatic/0.39

# 03_alignment/ - skipped, due to using (alignment-free) quasi-mapping

# 04_quantification/
module load apptainer
apptainer exec /reference/containers/salmon/0.10.1/salmon-0.10.1.simg  salmon --help

# 05_dge/
conda activate /project/<project_name>/software/envs/dge_env
```

#### Environment cleanup

Tool-generated caches can quickly fill your **/home** space and trigger quota errors. 
Common examples include `.conda`, `.cache`, `.nextflow`, and other hidden directories.  

To prevent issues, either delete unused caches or relocate them to your project space, e.g.:  
`/project/<project_name>/<user>/software/`  

```bash
# Check how much space the directory uses
du -sh ~/.conda

# Move .conda directory out of /home
mv ~/.conda /project/<project_name>/<user>/software/

# Create a symlink so tools can still find it
ln -s /project/<project_name>/<user>/software/.conda ~/
```


### Use version control daily

*Track code and scripts with Git to capture changes, collaborate safely, and roll back when needed.*

Version control helps you track changes to scripts, configs, and documentation, making your work reproducible and collaboration safe. 
**Git** is the standard tool for this and works seamlessly in HPC project. 
```bash
git --help
```
Large raw data and result files should never be tracked in Git; they belong in HPC storage, 
while Git should focus on the lightweight code and metadata that define your workflow.

<div class="highlighted highlighted--highlighted"><div class="highlighted__body" markdown="1"> 
Remember that Git is not GitHub - Git is the version control system you run locally, while GitHub (or similar platforms) is an optional remote service for project sharing.
</div></div>

#### Version Control with Git 

<div class="highlighted highlighted--question"><div class="highlighted__body" markdown="1"> 
**Exercise**

1. Navigate to your pipeline workspace:
   ```bash
   cd /project/<project_name>/RNAseq_thaliana_v1_Oct2025/
   ```

2. Initialize Git, track the structure and commit changes made in README file:
   ```bash
   git init
   git add README.md
   git add -A
   git commit -m "Initial commit: workspace structure and README"
   ```
   Make sure to commit only scripts, configs, documentation, and lightweight metadata - keep large datasets in `/project` but outside of Git.

3. A `.gitignore` file tells Git which files or folders not to track. 
   This is critical for avoiding large or temporary files (e.g., FASTQs, logs) in your repository.
   ```bash
   ## example .gitignore file content
   # Ignore raw data
   00_raw_data/
   # Ignore large/binary files
   *.bam
   *.fastq
   *.fq.gz
   # Ignore temporary files
   *.tmp
   *.log
   ```

   Create `.gitignore` and add it to Git:
   ```bash
   nano .gitignore
   # copy-paste or manually list files and folders excluded from tracking; save changes and close editor
   git add .gitignore
   git commit -m "Add gitignore to exclude raw data and temporary files"
   ```

4. (optional) Link with an existing GitHub repository:
   ```bash
   git remote add origin git@github.com:username/repo.git
   ```
   Push changes to GitHub:
   ```bash
   git push -u origin main
   ```

</div></div>

Version-controlling your workflow ensures that changes are transparent, recoverable, and easy to share across systems and collaborators. 
Following a few simple habits makes Git much more effective:  
- **Commit and push regularly** to keep your work synchronized, provide transparency for collaborators, and maintain a clear history of changes.  
- **Pull updates when switching between laptop and HPC** so you always work with the latest version and avoid conflicts.  
- **Write meaningful commit messages** (e.g., “Add QC step” instead of “fix stuff”) to make the history useful for you and your collaborators.  


### Test pipelines with small data

*Validate workflows quickly with small datasets before scaling up to full research data.*

Before running a full analysis, it is best practice to validate your workflow on a small dataset. 
This helps catch mistakes in file paths, environment setup, or resource requests early, saving time and compute quota.  

1. Stage a small dataset in `/90daydata` or `$TMPDIR` to keep tests lightweight and temporary.  
2. Run a trial workflow step to verify that commands, environments, and file locations work as expected. 
  - e.g., FastQC on a few reads or a subset of RNA-seq samples  
3. Record run settings and outputs in your `README.md` or a log file for reproducibility and troubleshooting.  
4. Adjust paths and resources (memory, cores, walltime) until the pipeline runs smoothly.  
5. Scale up gradually - once the test passes, extend it to a full dataset on the proper storage tier.  

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1"> 
Many bioinformatics tools provide built-in sample data or allow downsampling (e.g., `seqtk sample`) - use these to create quick, efficient test cases. 
</div></div>

<div class="highlighted highlighted--question"><div class="highlighted__body" markdown="1"> 
**Exercise: downsampling FASTQ files with seqtk**

Load the `seqtk/1.3` module on Ceres:
```bash
module load seqtk/1.3
```
Keep 1% of reads from a large FASTQ file for testing:
```bash
seqtk sample -s100 large_sample_R1.fastq.gz 0.01 > test_R1.fastq.gz
seqtk sample -s100 large_sample_R2.fastq.gz 0.01 > test_R2.fastq.gz
```
*This produces a small paired dataset (test_R1.fastq.gz, test_R2.fastq.gz) suitable for quick trial runs.*
</div></div>

</div>

## Practical guidance

The way you organize your workspace determines how easily you and others can follow, reuse, and extend your analyses. 
Choosing a clear structure, creating reproducible environments, documenting from the start, 
and managing storage responsibly helps you avoid confusion, save space, and make your workflows efficient.

<div class="usa-accordion ">
{% include accordion title="Quick Quiz: Check your understanding" controls="quiz-workspace" expanded=false class="question" icon=true %}
<div id="quiz-workspace" class="accordion_content" markdown='1'>
Now that you’ve explored best practices for setting up a workspace, from directory structure and environment management to storage choices and reproducibility. 
Try this quiz to test your understanding and check for common pitfalls.

{% include question qid="1,2,3,4,5,6,7,8,9,10" %}
</div>
</div>


<div class="process-list ul" markdown="1">

### Use in real projects
<br>
If your bioinformatics pipeline or a workspace requires...

<div class="usa-accordion" data-allow-multiple>

{% include accordion title="environment that could be shared across project members" controls="bw1" expanded=false class="outline" icon=false %}
<div id="bw1" class="accordion_content" markdown="1">
Create Conda or virtual environments in the group-shared `/project/<project_name>/software` folder instead of your personal `.conda`. Use the `-p <absolute_path>/<env_name>` option (instead of `-n <env_name>`) to place the environment in a group-accessible location. This prevents quota issues in `/home` and ensures that all project members can use the same tool installation.

```bash
# Create environment in shared project space
conda create -p /project/<project_name>/software/envs/deseq2_env bioconductor-deseq2
# Adjust permissions so group members can use it
chmod -R g+rx /project/<project_name>/software/envs/deseq2_env
# Activate by absolute path
conda activate /project/<project_name>/software/envs/deseq2_env
```

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1"> 
By default, Conda only shows environments in your personal `.conda` space. To use shared envs, either activate them by absolute path or add the shared folder to your Conda search path.
```bash
export CONDA_ENVS_DIRS=/project/<project_name>/software/envs:$CONDA_ENVS_DIRS
conda config --show envs_dirs   # display paths tracked by Conda
conda env list                  # list available environments
```
</div></div>
</div>

{% include accordion title="testing multiple tool variants or different settings" controls="bw2" expanded=false class="outline" icon=false %}
<div id="bw2" class="accordion_content" markdown="1">

Keep **separate workspaces** for each pipeline iteration within your project space. Use numbered directories for steps and an `envs/` folder for environment documenattion. This keeps analyses cleanly separated, easy to archive, and reproducible.  

Example:  
- `/project/<project_name>/RNAseq_soybean_deseq2_03-2025/`
- `/project/<project_name>/RNAseq_soybean_svm_linear_04-2025/`
- `/project/<project_name>/RNAseq_soybean_svm_radial_04-2025/`

Workspace directory tree:
```bash
RNAseq_thaliana_v1_Oct2025/       # root folder for your RNA-Seq project; customize it
├── workflow/                     # parent folder for all computatoional steps in a pipeline
├── envs/                         # documentation for environments used in a pipeline 
└── README.md                     # main README with the purpose of the workspace and outline of the pipeline
```
</div>

{% include accordion title="SLURM optimization before running with huge dataset" controls="bw3" expanded=false class="outline" icon=false %}
<div id="bw3" class="accordion_content" markdown="1">

Run trial workflows with **small datasets** staged in `/90daydata` or `$TMPDIR`.  

Example: downsample FASTQ reads with `seqtk`:  
```bash
cd /project/<project_name>/raw_data/rnaseq_arabidopsis_Oct-25
seqtk sample -s100 large_R1.fastq.gz 0.01 > /90daydata/<project_name>/workspace_rnaseq_arabidopsis_Oct-25_optimization/00_rawdata/test_R1.fastq.gz
seqtk sample -s100 large_R2.fastq.gz 0.01 > /90daydata/<project_name>/workspace_rnaseq_arabidopsis_Oct-25_optimization/00_rawdata/test_R2.fastq.gz
```
Log run settings and adjust resource requests (memory, cores, walltime) until the workflow runs smoothly. Then scale up on full data.
</div>

{% include accordion title="fixing the 'No space left on device' or different quota error" controls="bw4" expanded=false class="outline" icon=false %}
<div id="bw4" class="accordion_content" markdown="1">

Tools like Conda, Nextflow, or Snakemake often create hidden folders (`.conda`, `.cache`, `.nextflow`) in `/home`, which can trigger quota errors.  

Relocate them to project space and symlink back:  
```bash
mv ~/.conda /project/<project_name>/<user>/software
ln -s /project/<project_name>/<user>/software/.conda ~/
```
Regularly check disk usage to spot large hidden folders:
```bash
du -sh ~/* .??*                                 # /home
du -sh /project/<project_name>/<workspace>/*    # selected workspace
du -sh /project/<project_name>/software/*       # shared software or environments
```
</div>

{% include accordion title="using large raw datasets" controls="bw5" expanded=false class="outline" icon=false %}
<div id="bw5" class="accordion_content" markdown="1">

Store original raw data in a centralized, read-only folder: `/project/<project_name>/raw_data/` 
Then link to it in your workspace:  
```bash
cd /project/<project_name>/workspace_rnaseq_arabidopsis_Oct-25    # navigate to a workspace
mkdir -p 00_rawdata/ 
ln -s /project/<project_name>/raw_data/rnaseq_arabidopsis_Oct-25/*.fastq.gz 00_rawdata/   # link raw data
```
This prevents duplication and ensures consistency across all pipelines.

<div class="highlighted highlighted--tip"><div class="highlighted__body" markdown="1"> 
If your tool cannot handle symlinks, reference the raw data directly with **absolute paths**, i.e., starting from the file system root `/` (e.g., `/project/<project_name>/raw_data/sample1.fastq.gz`) instead of copying files.
</div></div>

</div>

{% include accordion title="reproducibility over long time periods" controls="bw6" expanded=false class="outline" icon=false %}
<div id="bw6" class="accordion_content" markdown="1">

Reproducibility is critical when results may need to be revisited months or even years later. On an HPC system, this means keeping data, environments, and documentation stable while ensuring they can be shared and understood by collaborators.

Follow these best practices:
- **Protect raw data:** Keep original raw datasets in a dedicated **read-only project folder** to prevent accidental edits.  
- **Back up critical files:** Store copies of raw data, intermediate results, and final outputs in backed-up long-term storage (LTS) on Juno.  
- **Version control scripts:** Track all analysis scripts in Git and push to a remote (e.g., GitHub, GitLab). This provides history, collaboration, and recovery if files are lost locally.  
- **Document environments:** Record all loaded modules and Conda/virtual environments in `README.md`. Include full module load commands with version included (e.g., `module load fastqc/0.12.1`) and environment YAML files.  
- **Share group-wide environments:** Place shared Conda/virtual envs in `/project/<project_name>/software/envs/` to avoid duplication and ensure consistent access for collaborators.  
Optional:
- **Capture checkpoints:** Enhance your scripts to save logs, print statistics and QC summaries at each major pipeline step. This facilitates troubleshooting and allows partial re-runs.  
- **Keep troubleshooting notes:** Record common errors and fixes in project documentation to support future iterations or team members.  
- **Use containers for longevity:** If the workflow depends on tools that update frequently, or if you need a *frozen snapshot* of optimized settings, package the environment into a container (Apptainer). Containers preserve exact versions and settings across systems and time.  
</div>

</div>


<!--
### Templates for Bioinformatics Pipelines

section under construction; will be cross-linked to learning pathways or pipeline templates

-->
</div>

{% if page.takeaways %}
## Best Practices

<ul>
  {% for takeaway in page.takeaways %}
    <li>{{ takeaway }}</li>
  {% endfor %}
</ul>
{% endif %}


