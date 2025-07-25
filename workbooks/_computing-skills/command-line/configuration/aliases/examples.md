---

title: "Shell alias examples"
description: "Examples of practical aliases you may wish to use in your scripts."
type: reference material
order: 3
tags: [unix, customization]
author: Aleksandra Badaczewska

---

{% include file_path folder=1 %}

These practical aliases are crafted to reduce repetitive typing and help you navigate, manage data and monitor jobs efficiently in SCINet HPC environments.

<div class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">

<h4 class="highlighted__heading">Boost your productivity by creating project-specific aliases tailored to your workflows!</h4>

These aliases allow you to navigate project directories, run commands, and simplify daily tasks with just a few keystrokes. 
With flexible nature of aliases, you can quickly update or remove them as your project evolves, ensuring your development environment stays clean and efficient. 

</div></div>



## Shortcuts for frequently used commands

<div class="usa-accordion">

{% include accordion title="Directory Navigation" class="overview " controls="alias-set1-1" %}
<div id="alias-set1-1" class="accordion_content" markdown="1" hidden> 
These shortcuts save time when moving between directories in deep folder hierarchies.
```bash
alias ..='cd ..'                               # Move up one directory
alias ...='cd ../..'                           # Move up two directories
alias to_project='cd /project/my_project'      # Navigate to project directory quickly
```
![aliases for quick navigation]({{ images_path }}/alias/alias_quick_navigation.png)

</div>

{% include accordion title="File Transfers" class="overview " controls="alias-set1-2" %} 
<div id="alias-set1-2" class="accordion_content" markdown="1" hidden> 

Aliases for quick and consistent file transfers using `rsync` or `scp`. 
Useful for transferring large files or datasets between local machines and remote SCINet clusters. 

***NOTE:*** *Below are examples of aliases to be defined on your local machine!*
* **send to Ceres:**
  ```bash
  alias send_proj='rsync --avz --no-p --no-g <dir_name> <SCINetID>@ceres-dtn.scinet.usda.gov:/project/<project_name>'     
  # usage: send_proj
  ```
  This will recursively transfer all new and updated files in the directory `dir_name` on the local machine into directory `/project/project_name/dir_name` on Ceres.
* **get from Atlas:**
  ```bash
  alias get_proj='scp <SCINetID>@atlas-dtn.hpc.msstate.edu:/project/<project_name>/file.ext  <local_path_to_file/>dest.ext' 
  # usage: get_proj
  ```
  This download the `file.ext` file  from`/project/project_name/` on Atlas to the specified path on your local machine.

<div class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">

Learn more about transferring files on SCINet from the [SCINet File Transfer guide](https://scinet.usda.gov/guides/data/datatransfer#scinet-file-transfer) on the SCINet website.
</div></div>
</div>

{% include accordion title="Interactive Session Request"  class="overview" icon="flag"  controls="alias-set1-3" %} 
<div id="alias-set1-3" class="accordion_content" markdown="1" hidden> 

Alias to easily request a 1-hour interactive session on a compute node: 

***NOTE:*** *Remember to specify your `scinet-account` to use for resource allocation!*
```bash
alias get_interactive='salloc -N1 -n1 -t 1:00:00 -A <scinet-account>'
# usage: get_interactive
```
Requests an interactive session with 1 node and 1 core for 1 hour under your specified account, without the need to remember or manually input all the flags.
![alias get_interactive]({{ images_path }}/alias/alias_get_interactive.png)


This alias is particularly useful if your interactive session requirements and account remain consistent across tasks. When you need to preview the exact syntax of your standard request or change options temporarily, you can use:
```bash
type -a get_interactive
```
This reveals the full command behind the alias, allowing you to adjust parameters without needing to look them up in your notes or SLURM guides.


</div>
</div>

## Aliases for commands with options and flags

<div class="usa-accordion">

{% include accordion title="Colorized grep for easier output reading" class="overview " controls="alias-set3-1" %}
<div id="alias-set3-1" class="accordion_content" markdown="1" hidden> 

Enhance your aliases by using ANSI escape codes to colorize outputs and highlight important information like errors or warnings. 
For a deeper dive, check out tutorials on [shell text coloring](../styling) with `echo`, `grep`, `awk` and other commands.

For example:
1. Alias to automatically enable colored output with grep:
  ```bash
  alias grep='grep --color=auto'        
  # usage: grep "pattern" file
  ```
  Makes it easier to spot matches in command-line outputs, especially when filtering large log files.
1. Create an alias to quickly filter and colorize log files:
  ```bash
  # Add this to your .bashrc file to make settings persistent
  alias logcheck='grep -E "ERROR|WARNING" | awk '\''/ERROR/ {print "\033[31m" $0 "\033[0m"} /WARNING/ {print "\033[33m" $0 "\033[0m"}'\'''
  # usage: cat job_output.log | logcheck
  ```
  Your custom `logcheck` command will instantly highlight errors (red) and warnings (yellow) without retyping the full command.
1. Create an alias to catch errors in log files in real time:
  ```bash
  # Add this to your .bashrc file to make settings persistent
  alias tailgrep='tail -f | grep --color=always -E "ERROR|WARNING"'
  # usage: tailgrep slurm-16364729.out
  ```
  This highlights errors and warnings in real-time while continuously monitoring new information added to a log file.

</div>

{% include accordion title="Human-readable ls output with file properties listed" class="overview " controls="alias-set3-2" %} 
<div id="alias-set3-2" class="accordion_content" markdown="1" hidden> 

* Alias to use long-format listing with human-readable file properties:
  ```bash
  alias ll='ls -lh'
  # usage: ll
  ```
  Displays file sizes, permissions, owner, modification date and softlink source path, making it easier to learn file properties.
* Assign a new settings to `LS_COLORS` variable.
  ```bash
  # Add this to your .bashrc file to make settings persistent
  export LS_COLORS='di=01;34:ln=01;36:so=01;35:*.sh=01;32:*.log=01;33'
  alias ls='ls --color=auto'
  ```
  This highlights file types and attributes using colors specified in `LS_COLORS` variable: directories in bold blue (di=01;34), 
  symbolic links in bold cyan (ln=01;36), sockets in bold magenta (so=01;35), shell scripts in bold green (*.sh=01;32) and log files in bold yellow (*.log=01;33).


<div class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">

For a deeper dive, check out tutorials on [shell text coloring](../styling) with `ls` commands.
</div></div>

</div>

</div>

## Combining multiple independent commands

<div class="usa-accordion">

{% include accordion title="Load module and check module list" class="overview " controls="alias-set2-1" %}
<div id="alias-set2-1" class="accordion_content" markdown="1" hidden> 

When you frequently work with specific software (e.g., Python-based projects) on HPC, loading the correct module is a common first step. This alias simplifies the process by combining the loading and verification steps, reducing errors caused by missing dependencies.
```bash
alias load_python='module load python_3 && module list'
# usage: load_python
```
This loads the user-selected `python_3` module and immediately verifies that it has been successfully loaded by listing all currently loaded modules.
![alias to load and list module]({{ images_path }}/alias/alias_load_list_module.png)

<div class="highlighted highlighted--highlighted ">
<div class="highlighted__body" markdown="1">

When working on the SCInet HPC system, remember that modules should only be loaded on compute nodes, either through a SLURM script or when using an interactive session.  

For any development, testing or debugging tasks, always request an interactive session using:
```bash
salloc -N1 -n1 -t 1:00:00 -A <scinet-account>
```
</div></div>

</div>

{% include accordion title="Navigate and list files" class="overview " controls="alias-set2-2" %} 
<div id="alias-set2-2" class="accordion_content" markdown="1" hidden> 

For users working on multiple projects with deep directory structures, navigating to a project and checking its contents is a daily task. This alias makes it easier by combining navigation with an informative directory listing.
```bash
alias start_projectX='cd /project/project_X && ls -lah'
# usage: start_projectX
```
This changes to the `project_X` directory and immediately lists its contents in long format, displaying file details such as size, permissions and modification dates.
![alias navigate and list content]({{ images_path }}/alias/alias_navigate_and_list.png)
</div>

</div>


## Dynamic aliases using command substitution and shell variables

<div class="usa-accordion">

{% include accordion title="Dynamic backup with current date timestamp" class="overview " controls="alias-set4-1" %}
<div id="alias-set4-1" class="accordion_content" markdown="1" hidden> 

Alias to create timestamped backups of important files (e.g., `~/.bashrc`):
```bash
alias backup_config='cp ~/.bashrc ~/backups/bashrc_$(date +%Y%m%d_%H%M%S).copy'
# usage: backup_config
```
This automatically appends the current date and time to the backup filename, making it easy to track multiple versions.
</div>

{% include accordion title="Dynamic archival of selected folder" class="overview " controls="alias-set4-2" %} 
<div id="alias-set4-2" class="accordion_content" markdown="1" hidden> 

Alias to archive a selected folder (e.g., `logs`) based on the name of current directory:
```bash
alias archive_logs='tar -czvf logs_$(basename "$PWD")_$(date +%Y%m%d).tar.gz logs/'
# usage: archive_logs
```
This creates an archive of logs with the current directory name and date, useful for organizing project and reducing storage use.
</div>

</div>


## Configuring aliases for job submission and resource monitoring

<div class="usa-accordion">

{% include accordion title="Check names of available partitions" class="overview" controls="alias-set5-0"  icon="flag" %}
<div id="alias-set5-0" class="accordion_content" markdown="1" hidden> 

Alias to display partitions available on each SCINet cluster:
```bash
alias show_partitions='scontrol show partitions | grep "PartitionName"'
# usage: show_partitions
```
This alias quickly extracts and displays the available partitions, making it easy to see the key details without navigating through lengthy output. It's particularly useful when selecting the correct partition for job submissions.

![alias show partitions]({{ images_path }}/alias/alias_show_partitions.png)

<div class="highlighted highlighted--highlighted ">
<div class="highlighted__body" markdown="1">

To use this alias consistently on both clusters, you need to define it separately in each cluster’s configuration file (e.g., add it to `~/.bashrc` to make it permanent). Once set, you only need to remember the alias name `show_partitions` to get partition details, regardless of which cluster you're on.
</div></div>



For more detailed partition information, you can preview the full command using:
```bash
type -a show_partitions
```
![alias reveal command]({{ images_path }}/alias/alias_reveal_command.png)  
This reveals the real command behind the alias, allowing you to skip the `grep` part and see the complete partition details without searching through notes or user guides.  
![partition details]({{ images_path }}/partition_details.png)


</div>

{% include accordion title="Check job status just after submission" class="overview " controls="alias-set5-1" %}
<div id="alias-set5-1" class="accordion_content" markdown="1" hidden> 

Alias to submit jobs using sbatch and immediately confirm job status:
```bash
alias submit_job='sbatch job_slurm.sh && squeue -u $USER'
# usage: submit_job
```
This submits the job and checks its status right away, ensuring that the submission was successful. It streamlines job submission and status checking in a single command, saving you time and effort.

![alias_submit and check]({{ images_path }}/alias/alias_submit_and_check.png)


This alias is truly useful as a permanent alias if all your SLURM submission scripts are consistently named the same, such as `job_slurm.sh`. 
Even if a compute node hasn't been assigned yet, you can immediately review details such as the correctness of the selected partition, 
job priority or potential errors in the submission. This ensures that any issues can be addressed quickly.

</div>

{% include accordion title="Monitor resource usage on a current node" class="overview " controls="alias-set5-2" %} 
<div id="alias-set5-2" class="accordion_content" markdown="1" hidden> 

Alias to monitor memory and CPU usage on the current node:
- **When the login node feels laggy:** Check for users consuming excessive resources.
- **During an interactive session on a compute node:** Monitor your task’s memory and CPU usage in real-time.  


```bash
alias node_usage='top -b -n1 | head -n 20'
# usage: node_usage
```
This provides a quick snapshot of the most resource-intensive processes without keeping the terminal locked on the `top` command. This can help you diagnose and respond to performance issues efficiently.
![node resource usage]({{ images_path }}/alias/node_resource_usage.png)
</div>

{% include accordion title="Quick disk space check" class="overview " controls="alias-set5-3" %} 
<div id="alias-set5-3" class="accordion_content" markdown="1" hidden> 

Alias to quickly show disk usage in human-readable format for your home directory:
```bash
alias disk_check='du -h --max-depth=1 ~ | sort -h'
# usage: disk_check
```
This displays a sorted list of directories (including hidden folders) and their respective disk usage, helping you quickly identify which folders are consuming the most space.

![alias disk check]({{ images_path }}/alias/alias_disk_check.png)

<div class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">

This alias is particularly useful when troubleshooting or cleaning up large datasets during interactive HPC sessions.
</div></div>

</div>
</div>