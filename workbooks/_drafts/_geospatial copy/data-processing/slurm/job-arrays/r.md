---

title: SLURM Job Arrays for Many Data Input Files - R
description: "(Page description here)"
type: interactive tutorial
language: R

tags: [SLURM]

author: Heather Savoy
updated: 2022-10-07 

overview:
  materials:
    - code: GRWG22_JobPerDataFile.Rmd
  terminology: tags

---



## Overview

This tutorial covers how to use an R script to list many input files and submit
a SLURM job script to apply another R script to the input files. No actual 
geospatial analyses are applied in this example as it was a generic request
during the 10th session of the Geospatial Research Working Group Workshop 2022. 

If you prefer to have a single SLURM submission script iterate over your data 
inputs, see [this tutorial](https://geospatial.101workbook.org/ExampleGeoWorkflows/GRWG22_ZonalStats_wSLURM_R).

{% include overviews %}

## Getting Started

The instructions below will be mostly the same for both Ceres and Atlas. Choose
either cluster to work on for the tutorial. There is one line you will need to
modify in this tutorial and your options depend on which cluster you are currently
using.

## Tutorial Steps

* Write and save a serial R script that accepts command line arguments 
* Write and save a SLURM job submission script template
* Write and save a serial R script that lists files and submits jobs
* Execute the R script for submitting many jobs

<div class="process-list" markdown='1'>  

### Write and save a serial R script that accepts command line arguments

Save the code chunk below as `JobPerDataFile_calculate.R`. This is a fake 
'calculation'. The script will print the filename it was passed and wait for two 
minutes just so we can see the job associated with it in the queue. The intent
of this example R script is to represent a generic R script that accepts one
command line argument, e.g. the filename of a data input file that you would
like to process in R, and a calculation, e.g. the code associated with that 
processing you want to do to each data input file.

```r
## You could put any R code here, with or without parallel packages like 
## `parallel` or `doParallel`. If you do have parallel packages, you would need 
## to requests more tasks in the submission script, e.g. --ntasks-per-node=16
## for 16 cores.

# Read in the input filename
args <- commandArgs(trailingOnly=TRUE)
my_file <- args[1]

# Do the 'calculation'
cat("Processing:", my_file)
Sys.sleep(120)
```

 

### Write and save a SLURM job submission script template

Save the code chunk below as `JobPerDataFile_template.sh`. We will use these 
lines as a job submission script template and replace the `<THE_DATA_FILE_TRIM>` 
and `<THE_DATA_FILE>` strings with each of our filenames we want to pass to 
*JobPerDataFile_calculate.R*. Note that the one thing you will need to change in
this tutorial is the account name in this script template.

```bash
#!/bin/bash

#SBATCH --time=00:05:00       # walltime limit (HH:MM:SS)
#SBATCH --nodes=1             # number of nodes
#SBATCH --ntasks-per-node=2   # 1 processor core(s) per node X 2 threads per core
#SBATCH --job-name=<THE_DATA_FILE_TRIM>
#SBATCH --output=slurm_%x.out
#SBATCH --account=yourProjectName  # REPLACE

# LOAD MODULES, INSERT CODE, AND RUN YOUR PROGRAMS HERE
module load r

Rscript --vanilla JobPerDataFile_calculate.R <THE_DATA_FILE>

```

The meaning of our parameter choices:

* `time=00:05:00`: Our tasks will take up to 5 minutes to run. 
* `nodes=1`: We only need one node. If you are just getting started with parallel
processing, you will likely only need one node. 
* `ntasks-per-node=2`: We want two logical cores on our one node, i.e. each task
will use one physical core. Our individual tasks are serial and only need one core. 
* `job-name=<THE_DATA_FILE_TRIM>`: We want to assign a job name ourselves instead
of relying on a JOBID assigned by SLURM for identifying our job on the queue. We will
be overwriting `<THE_DATA_FILE_TRIM>` with trimmed filenames in the next step.
* `--output=slurm_%x.out`: Save any output from R (e.g. printed messages,
warnings, and errors) to a file with a filename in the format of 
*output_JOBNAME.out*.
* `--account=yourProjectName`: Atlas requires an account name but Ceres does not. 
If you are on Atlas, you will need to replace `yourProjectName` with the name of
one of your projects. If you do not know your available projects, you can
run
```
   sacctmgr show associations where user=$USER format=account%20
```
on either cluster to list the names. On Ceres, you have option to replace 
`yourProjectName` with the name of one of your projects, or delete the whole 
line from the script.

Note: there are additional SLURM parameters you may use, including how to specify
your own job ID or setting memory requirements. Check out the 
[Ceres](https://scinet.usda.gov/support/ceres-job-script) or 
[Atlas (scroll down to 'Atlas Job Script Generator' section)](https://www.hpc.msstate.edu/computing/atlas/)
job script generator to see more examples on how to populate job submission scripts on Ceres.

 

### List files and submit jobs

Save the code chunk below as `JobPerDataFile_submit.R`. It will: 

1. Read in the job template we defined above
2. List data files with a certain pattern in a chosen directory (in this example,
all ending in 'R' or 'sh' in our working directory, including sub-directories)
3. For each data file found, overwrite placeholders in template and submit the
job to SLURM.

```r
# Objective: This R script will generate SLURM jobs to apply
# another R script to each data file in nested directories. 

# 1. Read in SLURM submission template
job_template_f <- 'JobPerDataFile_template.sh'
job_template <- readLines(job_template_f)

# 2. List data files in directories
dir_to_start <- getwd() # wherever your data files begin
file_pattern <- 'R$|sh$' # only find certain filename patterns
data_files <- list.files(path = dir_to_start, 
                         pattern = file_pattern,  # optional
                         recursive = TRUE) # search in sub-directories

# 3. For each data file, write a submission script and submit
# Note, the submission script it being over-written for each
# data file. 
job_script_f <- 'JobPerDataFile.sh'
for(d_f in data_files){
  # Write data file into slurm job template
  slurm_instructions <- gsub('<THE_DATA_FILE>',
                             d_f, 
                             job_template)
  # Remove file extension and use the basename
  # as your job ID and name
  d_f_trimmed <- tools::file_path_sans_ext(d_f)
  slurm_instructions <- gsub('<THE_DATA_FILE_TRIM>',
                             d_f_trimmed, 
                             slurm_instructions)
  
  # Save instructions to batch script
  writeLines(slurm_instructions,
             job_script_f)
  
  # Submit the job
  system(paste('sbatch',job_script_f))
}

```

 

### Execute the R script for submitting many jobs

Now that we have our calculation script (*JobPerDataFile_calculate.R*), our job
script template (*JobPerDataFile_template.sh*), and a script for updating that template
with our input files and then submitting it as a job (*JobPerDataFile_submit.R*), we
can execute that last script to submit a job for each of our input files. The
line below executed in the shell with run our *JobPerDataFile_submit.R* script. 


```bash
module load r
Rscript --vanilla JobPerDataFile_submit.R
```

You will see a message from SLURM about a submitted job for each input file your 
R script found:
```
Submitted batch job 8145023
Submitted batch job 8145024
Submitted batch job 8145025
```

 

### Check results

To see the status of your job, you can view the SLURM queue. The queue lists all
of the jobs currently submitted, who submitted them, the job status, and what
nodes are allocated to the job. Since this can be a very long list, it is easiest
to find your jobs if you filter the queue to only the jobs you submitted. The 
command to view the queue is `squeue` and you can filter it to a specific user
with the `-u` parameter followed by their SCINet account name.

```bash
squeue -u firstname.lastname
```

```
       JOBID PARTITION     NAME     USER ST       TIME  NODES NODELIST(REASON)
     8145023     short JobPerDa heather.  R       0:04      1 ceres20-compute-3
     8145024     short JobPerDa heather.  R       0:04      1 ceres20-compute-3
     8145025     short JobPerDa heather.  R       0:04      1 ceres20-compute-3
```

If you see jobs listed in the queue: you have jobs currently in the queue and the 
status column will indicate if that job is pending, running, or completing. Since 
our 'calculation' takes two minutes, you should see these jobs (one for each 
data input file) with the status 'R' for running for approximately two minutes.
If you do NOT see jobs listed in the queue: you do not have jobs currently in the
queue. If you submitted jobs but they are not listed, then they completed - either
successfully or unsuccessfully. 


To determine if the job executed successfully, 
you may check if your anticipated output was created. In our case, we would expect
to see a *slurm_THE_DATA_FILE_TRIM.out* file for each .R or .sh file in our 
current directory. At a minimum, you will have *JobPerDataFile_calculate.R*,
*JobPerDataFile_template.sh*, and *JobPerDataFile_submit.R* from this example as input files.
Inside each, there should be a message for each data file, for example:

> Processing: JobPerDataFile_calculate.R

</div>