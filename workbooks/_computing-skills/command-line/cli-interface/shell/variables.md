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

### Shell environment

The **shell environment** serves as the foundational context for running commands, determining how processes are executed and how the system interacts with your inputs. 
Its primary purpose is to manage operational settings, such as `paths` to executable files and default behavior for commands. 
However, it also offers powerful customization options, allowing users to tailor their experience with tools like `environment variables`, `aliases` and startup scripts (e.g., `.bashrc`). 
On HPC systems, configuring the shell environment is particularly crucial, as it directly impacts the efficiency and correctness of settings for jobs submitted to computing nodes. 
By understanding the environment components and customizing these settings, you can create a streamlined and robust environment for high-performance computing tasks on SCINet clusters.



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


