---

title: Using environment and shell variables
description: "Key principles of defining, accessing and usage scenarios of environment and shell variables in SCINet CLI"
type: interactive tutorial
order: 2
tags: [UNIX]
packages: 
level: 
author: 

---


## Overview

This interactive tutorial focuses on teaching you how to distinguish and effectively use the built-in environment and shell variables in command-line environments. 
You will also learn how to declare, modify and persist new variables to customize the behavior of your shell and applications when working on SCINet HPC clusters.
<br>

<div id="info-alerts-1" class="highlighted highlighted--info ">
    <div class="highlighted__body">
        <h4 class="highlighted__heading">Main Objectives</h4>
        <ul>
            <li>Understand the difference between environment and shell variables and their roles in shell configuration.</li>
            <li>Provide the reference list with built-in variables on SCINet HPC.</li>
            <li>Demonstrate how to define, export and persist variables across sessions, including practical applications.</li>
            <li>Explore debugging techniques to diagnose and resolve issues related to environment variables.</li>
        </ul>

    </div>
</div>

<div id="success-alerts-1" class="highlighted highlighted--success ">
    <div class="highlighted__body">
        <h4 class="highlighted__heading">Goals</h4>
        <p>By the end of this tutorial, you will:</p>
        <ul>
            <li>Acquire knowledge of how to access and manipulate variables in Bash shell.</li>
            <li>Gain confidence in using effectively the built-in variables cross-platform, including HPC systems.</li>
            <li>Get started with setting project-specific custom variables for optimal performance on SCINet clusters.</li>
        </ul>
    </div>
</div>


### Tutorial scope

This user guide offers a reference list of built-in environment and shell variables available on Atlas and Ceres HPC clusters, 
essential for maximizing the effective use of SCINet computing resources. The interactive tutorial component demonstrates how to modify existing variables 
and define custom ones, enabling you to establish a robust configuration for job submissions and optimize computational efficiency in your projects.

<div class="usa-accordion">

{% include accordion title="Key concepts" class="primary " controls="scope-concepts" %}
<div id="scope-concepts" class="accordion_content" markdown="1">
* **Environment variables:** Key-value pairs that define system-wide settings and influence the behavior of processes.
* **Shell variables:** Local variables used within the shell session for temporary configurations and scripting purposes.
* **Variable persistence:** Techniques to save variables across sessions by editing configuration files like `.bashrc`.
</div>

{% include accordion title="Tools/Technologies" class="primary " controls="scope-tools" %} 
<div id="scope-tools" class="accordion_content" markdown="1">
* **Bash shell:** A popular shell environment (command interpreter) available on most Unix-like and HPC systems.
* **Configuration file:** Text file like `.bashrc` or `.bash_profile` that define environment variables and other shell settings.
</div>

{% include accordion title="Applications" class="primary " controls="scope-apps" %} 
<div id="scope-apps" class="accordion_content" markdown="1">    
* **Using built-in variables:** Understanding and utilizing global pre-defined variables such as `PATH`, `HOME`, `USER` and SCINet-specific variables.
* **Customization:** Setting custom variables (local or global) to configure project-specific settings, such as tool versions or data paths.
* **Troubleshooting:** Identifying and resolving job errors caused by dependencies conflicts due to misconfigured or undefined variables.
</div>
</div>


----

## CLI environment

<div id="note-alerts-1" class="highlighted highlighted--note ">
<div class="highlighted__body" markdown="1">
CLI environment refers to the broader system where users interact with the operating system or software through text-based commands.
It consists of:
- The [terminal](/glossary/#terminal) emulator or console window where commands are typed in. *(<a href="/computing-skills/command-line/cli-interface/terminal/" target="_blank">see tutorial</a>)*
- The [shell](/glossary/#unix-shell) (command interpreter) like `Bash`, that takes input commands from the user, interprets them and executes the corresponding actions. *(<a href="/computing-skills/command-line/cli-interface/shell/" target="_blank">see tutorial</a>)*
  - The **Shell environment**, which sets the context for command execution and allows customization through configurations to improve usability.
- Additional tools and utilities accessible within the CLI interface, such as `grep`, `awk` or custom installations.
</div>
</div>

### Shell environment (components)

The **shell environment** serves as the foundational context for running commands, determining how processes are executed and how the system interacts with your inputs. 
Its primary purpose is to manage operational settings, such as `paths` to executable files and default behavior for commands. 
However, it also offers powerful customization options, allowing users to tailor their experience with tools like `environment variables`, `aliases` and startup scripts (e.g., `.bashrc`). 
On HPC systems, configuring the shell environment is particularly crucial, as it directly impacts the efficiency and correctness of settings for jobs submitted to computing nodes. 
By understanding the environment components and customizing these settings, you can create a streamlined and robust environment for high-performance computing tasks on SCINet clusters.

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
Understanding the **components** and **configuration options** of the shell environment is essential for ensuring efficient and error-free workflows in the command-line interface, particularly in high-performance computing (HPC) environments where setting additional variables is often required to successfully submit tasks to compute nodes.
</div>
</div>

Here is a table outlining the significant components of a shell environment.

| component                 | description | example | is customizable? | where to set/find it? |
|---------------------------|-------------|---------|------------------|------------------|
| shell prompt              | The command line interface displayed for user interaction, which can be customized. | `PS1="[\u@\h \W]\$ "` | yes | in a startup script, e.g., `.bashrc` |
| history                   | A record of previously executed commands for reuse or reference. | `history` command or `.bash_history` file | N/A | `history` command or `.bash_history` file |
| startup scripts           | Configuration files executed when a shell session starts, defining default settings. | `.bashrc`, `.bash_profile`, `.zshrc` | yes | in a Home directory: `cd ~` |
| **environment variables** | Global variables that store **system-wide** settings, paths and configurations. | `PATH`, `HOME`, `USER`, `LD_LIBRARY_PATH` | some | in a startup script, e.g., `.bashrc` |
| **shell variables**       | Local variables specific to the **current shell**, often used in shell scripts or interactive sessions. | `my_variable=anything` | yes | in a shell or in a script file |
| aliases                   | Shortcuts or alternative names for longer or more complex commands. | `alias ll='ls -la'` | yes | in a startup script, e.g., `.bashrc` |
| functions                 | User-defined scripts or commands stored in memory for quick execution. | `function greet() { echo "Hello"; }` | yes | in a startup script, e.g., `.bashrc` |
| modules (on HPC)          | Dynamic adjustment of environment settings for software management on HPC systems. | `module load python` | no | on SCINet: `/apps/spack-managed/modulefiles/` |

### Examples of practical applications

By actively utilizing these components, work in the CLI, particularly on HPC systems, becomes more efficient and streamlined 
because they allow you to save time and reduce errors by reusing commands, automating routine setups and simplifying access to essential tools and configurations.

<div class="usa-accordion">

{% include accordion title="reusing past commands" class="outline " controls="shell_env-1" %} 
<div id="shell_env-1" class="accordion_content" markdown="1">
Quickly rerun or adapt previously executed complex command pipelines using the command history, saving time and effort instead of retyping them.

*Instead of retyping a long command like:*
```
grep -r 'error' /var/logs/ | sort | uniq > error_report.txt
```
*You can press the up arrow to select it from history or click `Ctrl+R` followed by a keyword (e.g., grep) to browse only relevant commands.*
</div>

{% include accordion title="streamlining access to long paths" class="outline " controls="shell_env-2" %}
<div id="shell_env-2" class="accordion_content" markdown="1">
Set and use environment variables to store often-used paths or configurations, allowing them to be accessed with a single word rather than typing long, repetitive paths.

*Instead of typing a full directory path each time:*
```
cd /project/$USER/myproject/data/analysis/
```
*You can set it as a variable:*
```
DATA_PATH="/project/$USER/myproject/data/analysis/"
cd $DATA_PATH
```
</div>

{% include accordion title="simplifying frequent commands with aliases" class="outline " controls="shell_env-3" %}
<div id="shell_env-3" class="accordion_content" markdown="1">
Use aliases to simplify frequently used commands, such as turning `ls -la` into `ll`, improving speed and reducing typing errors.

*Replace repetitive typing:*
```
ls -la --color=auto
```
*With an alias:*
```
alias ll='ls -la --color=auto'
```
*Now, simply type:*
```
ll
```
</div>

{% include accordion title="loading tools pre-installed on HPC" class="outline " controls="shell_env-4" %}
<div id="shell_env-4" class="accordion_content" markdown="1">
Load necessary software and libraries in seconds using HPC modules (`module load python`), avoiding the lengthy process of manual installation or compilation.

*Instead of manually installing software, quickly load it with a module command:*
```
module load python
```
*This provides immediate access to preinstalled python programming language, saving time and avoiding installation errors.*
</div>

{% include accordion title="customizing the prompt for improved user's experience" class="outline " controls="shell_env-5" %}
<div id="shell_env-5" class="accordion_content" markdown="1">
Adjust the shell prompt to display useful information, such as the current directory or HPC node name:
```
PS1="[\u@\h \W]\$ "
```
Results in a prompt like: `[user@hpc-node ~]$`, keeping you aware of your context.
</div>

</div>


## Configuration

Manages the configuration of the session via environment variables, aliases, and other settings.

|              | Environment Variables | Shell Variables |
|--------------|-----------------------|-----------------|
| definition   | Variables that store **system-wide** or user-specific settings and configurations. | Variables specific to the **current shell**, often used in shell scripts or interactive sessions. |
| scope        | **Global** to the shell and inherited by child processes. | **Local** to the current shell session and not automatically passed to child processes. |
| purpose      | Used to control the behavior of the operating system or applications. | Useful for temporary data storage or shell scripting logic. |
| usage        | system-wide or app settings | shell-specific purposes |
| examples     | `PATH`, `HOME`, `USER`, `LANG` | `PS1` (the shell prompt) and custom variables defined by the user. |
| registration | Declared with `export` to make them available to child processes. <br>`export MY_VAR="Hello"` | No Export: If not exported, shell variables are not accessible by child processes. <br>`my_var="Hello"` |
| retrival     | `echo $PATH` *(returns something like: `/usr/bin:/bin:/usr/local/bin`)* <br>*`PATH` variable shows directories where the shell searches for executable files.* | `echo $my_var` *(returns a value assigned to the variable)* |




### Environment Variables

| variable            | definition | notes |
|---------------------|------------|-------|
| `PATH`                | List of directories to search for executables. | Ensure it includes critical paths like `/usr/bin` and `/bin`. Add custom paths using <br>`export PATH=$PATH:/new/path`. |
| `HOME`                | Path to the user's home directory. | Use for referencing user files and configurations (`cd $HOME`). |
| `USER`                | Current logged-in username. | Useful in scripts to personalize behavior or logs. | 
| `SHELL`               | Path to the user's default shell. | Example: `/bin/bash` or `/bin/zsh`. <span class="warning">Avoid overriding this variable.</span> |
| `LANG`                | System locale setting. | Modify for language or encoding needs (e.g., `LANG=en_US.UTF-8`). |
| `PWD`                 | Current working directory. | Automatically set by the shell; used in scripts for referencing relative paths. |
| `EDITOR`              | Default text editor for command-line programs. | Common values: `vim`, `nano` or `emacs`. Set it to your preferred editor. |
| `TERM`                | Type of terminal in use. | Important for determining terminal capabilities (e.g., `xterm`, `screen`). |
| `DISPLAY`             | Used for GUI programs to connect to the X server. | Common on systems with graphical interfaces (e.g., `DISPLAY=:0`). |
| `LD_LIBRARY_PATH`     | Paths for dynamic library loading. | Use cautiously to avoid breaking system library dependencies. |
| `TMPDIR`              | Directory for temporary files. | Modify to redirect temporary files to faster or larger storage areas. |
| `OMP_NUM_THREADS`     | Number of threads for OpenMP applications. | HPC-specific; optimize based on available cores. |
|`CUDA_VISIBLE_DEVICES` | GPU devices visible to CUDA programs. | HPC-specific; use to control which GPUs a job can access. |
| `SLURM_JOB_ID`        | Job ID assigned by SLURM scheduler. | Common in HPC environments for job tracking and debugging. |
| `SLURM_NTASKS`        | Number of tasks in a SLURM job. | Essential for distributed computing setups. |

### Shell Variables


| variable            | definition | notes |
|---------------------|------------|-------|
| `PS1`                 | Primary command prompt string. | Customize your shell prompt (e.g., `export PS1="[\u@\h \W]$ "` for a detailed prompt). |
| `PS2`                 | Secondary prompt string (for multiline commands). | Default is `>`. Can be customized for clarity in complex scripts. |
| `HISTSIZE`            | Number of commands stored in history. | Increase for better command recall, e.g., export `HISTSIZE=1000`. |
| `HISTFILE`            | File where command history is stored. | Typically `.bash_history`; useful for long-term recall of commands. |
| `BASH_VERSION`        | Version of Bash shell. | Useful in scripts to check for compatibility. |
| `RANDOM`              | Generates a random number. | Use in scripts for simple randomness (e.g., `echo $RANDOM`). |
| `SECONDS`             | Counts seconds since shell started. | Handy for timing tasks (e.g., `echo $SECONDS`). |
| `_`                   | Last command's last argument. | Useful for quick re-usage (e.g., `ls somefile && cat $_`). |

### HPC-Specific Environment Variables


| variable            | definition | notes |
|---------------------|------------|-------|
| `SLURM_JOB_ID`        | Job ID assigned by SLURM. | Used for tracking jobs in SLURM-managed systems. |
| `SLURM_SUBMIT_DIR`    | Directory where the job was submitted. | Use to ensure output is directed to the right place. |
| `SLURM_CPUS_PER_TASK` | Number of CPUs per task. | Optimize parallel jobs by setting this appropriately. |
| `SLURM_NODELIST`      | List of nodes assigned to the job. | Useful for advanced job configurations or debugging. |
| `MPI_RANK`            | Rank of the process in MPI programs. | Essential for MPI-based parallel computing. |
| `SCRATCH`             | Path to a fast scratch storage area. | Use for I/O-heavy computations to reduce bottlenecks. |
| `JOBID`	              | Alternative to SLURM_JOB_ID in non-SLURM systems. | Identify and debug jobs across different schedulers. |


