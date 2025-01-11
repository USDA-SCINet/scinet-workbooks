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

Shell configuration involves managing the behavior and settings of a command-line session. In practice involves defining and managing environment variables, setting aliases and adjusting shell settings to control how the command-line interface behaves. 
This section will guide you through hands-on steps for configuring shell components to effectively control and personalize your command-line environment.

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
**Shell environment is managed using variables**, which can be categorized mainly into `environment variables` and `shell variables`. 
The primary difference lies in scope and persistence. Environment variables affect both the current shell and its child processes, while shell variables are limited to the current shell unless exported. Understanding the distinction between them is essential for effective system configuration, scripting and working on high-performance computing (HPC) systems.
</div>
</div>


|              | Environment Variables | Shell Variables |
|--------------|-----------------------|-----------------|
| definition   | Variables that store **system-wide** or user-specific settings and configurations. | Variables specific to the **current shell**, often used in shell scripts or interactive sessions. |
| scope        | **Global** to the shell and inherited by child processes. | **Local** to the current shell session and not automatically passed to child processes. |
| purpose      | Used to control the behavior of the operating system or applications. | Useful for temporary data storage or shell scripting logic. |
| usage        | system-wide or app settings | shell-specific purposes |
| examples     | `PATH`, `HOME`, `USER`, `LANG` | `PS1` (the shell prompt) and custom variables defined by the user. |
| registration | Declared with `export` to make them available to child processes. <br>`export MY_VAR="Hello"` | No Export: If not exported, shell variables are not accessible by child processes. <br>`my_var="Hello"` |
| retrival     | `echo $PATH` *(returns something like: `/usr/bin:/bin:/usr/local/bin`)* <br>*`PATH` variable shows directories where the shell searches for executable files.* | `echo $my_var` *(returns a value assigned to the variable)* |
| persistence  | Added in `~/.bashrc` or `~/.bash_profile`. | Added in the same config files but not exported. |


Configuring the shell environment effectively involves managing various variables that control the behavior of your shell session and the system. The process revolves around defining, modifying and exporting variables that influence both the user experience and the behavior of applications and system utilities.

*In the following sections, we will explore how to work with environment variables, shell variables and HPC-specific configurations to optimize your shell experience.*


### Shell Variables

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
Shell variables are created and used only in the current shell session, meaning they exist independently in each shell instance. When you open a new terminal window or start a new shell session, a fresh set of built-in shell variables is created. They are not shared between different shells unless explicitly exported as [environment variables](#environment-variables).
</div>
</div>

| variable            | definition | notes |
|---------------------|------------|-------|
| `PWD`               | Current working directory. | Automatically set by the shell; used in scripts for referencing relative paths. |
| `BASH_VERSION`      | Version of Bash shell. | Useful in scripts to check for compatibility. |
| `SECONDS`           | Counts seconds since shell started. | Handy for timing tasks (e.g., `echo $SECONDS`). |
| `RANDOM`            | Generates a random number. | Use in scripts for simple randomness (e.g., `echo $RANDOM`). |
| `HISTFILE`          | File where command history is stored. | Typically `.bash_history`; useful for long-term recall of commands. |
| `HISTSIZE`          | Number of commands stored in history. | Increase for better command recall, e.g., export `HISTSIZE=1000`. |
| `PS1`               | Primary command prompt string. | Customize your shell prompt (e.g., `export PS1="[\u@\h \W]$ "` for a detailed prompt). |
| `PS2`               | Secondary prompt string (for multiline commands). | Default is `>`. Can be customized for clarity in complex scripts. |
| `_`                 | Last command's last argument. | Useful for quick re-usage (e.g., `ls somefile && cat $_`). |

Shell variables are local, session-specific variables used within a shell instance to store information such as **system state**, **user preferences** and **temporary data**. Some built-in variables hold values like the current working directory (`PWD`), the name and version of the shell (`BASH_VERSION`) or the number of seconds since the shell started (`SECONDS`).
* Variables can hold a fixed value, a command result or reflect system changes automatically.
* Some variables are static (like `USER`) while others are dynamic (like `SECONDS` or `PWD`).
  * Dynamic values change automatically, while static ones require manual reassignment.
  * Built-in dynamic variables are often used for unique tags when creating temporary files or logs, e.g., `touch "log_$RANDOM.txt"`.

**Users can create their own variables to store custom data**, such as `filenames`, commonly used `paths`, `counters` or configuration options for scripts, making it easier to automate tasks and customize the shell experience. These variables help control how commands run, manage data flow and simplify repetitive tasks.
* Custom shell variables themselves do not auto-refresh after creation.
* To achieve dynamic behavior, user-defined variables can include commands like `date` or inherently dynamic variables like `$SECONDS` and `$RANDOM` that generate a different value each time.


<div class="usa-accordion">
<h4>Examples of practical applications</h4>

{% include accordion title="Check the built-in shell variables on SCINet" class="outline" controls="shell-var1" %}
<div id="shell-var1" class="accordion_content" markdown="1">
**Login to the SCINet HPC cluster** using the [Open OnDemand (OOD)](/computing-skills/command-line/cli-interface/concepts/cli-scinet-hpc#accessing-the-cli-on-the-scinet-hpc) service through your web browser. This provides a terminal interface for easy access to the shell environment. <br>
**Check built-in Shell Variables:** Use the `echo` command followed by the variable name with a `$` prefix to display its current value (e.g., `echo $PWD`). 
![shell_variables_scinet](../assets/img/shell_variables_scinet.png)
* *How do the values of built-in variables like `$USER` or `$PWD` differ between your session and example results?*
* *Did you tried a few times variables that change over time or with user activity, such as `$SECONDS` or `$RANDOM`?*
* *What happens if you try to display a variable that hasn't been set? (`echo $UNDEFINED_VAR`)?*
</div>

{% include accordion title="Static vs. Dynamic value" class="outline" controls="shell-var2" %} 
<div id="shell-var2" class="accordion_content" markdown="1">    
Shell variables can be categorized as either static or dynamic based on how their values behave.

**Static Shell Variables** - Hold a fixed value assigned by the user or the system until explicitly changed.
```bash
USER="john_doe"          # (built-in)  The current username, typically static for the session.
my_lucky_number=5        # (custom)    A user defined variable with a custom name and constant value.   
```
**Dynamic Shell Variables** - Automatically update based on system activity or commands, without manual reassignment.
Some dynamic variables can monitor the system state (like `SECONDS`) or track user behavior (like `PWD` reflecting the current working directory).
```bash
echo $SECONDS            # (built-in)  Continuously increases as the shell session progresses.
echo $PWD                # (built-in)  Updates whenever you change directories using cd.
```
Dynamic values update automatically in real-time, showing a different value each time they are accessed, making them useful for continuous monitoring:
```bash
while true; do echo "Uptime: $SECONDS seconds"; sleep 1; done
```
![](../assets/img/variable_dynamic_value.png)
</div>

{% include accordion title="Define a custom variable" class="outline" controls="shell-var3" %} 
<div id="shell-var3" class="accordion_content" markdown="1">
Assigning a **simple text or numeric value** for basic/temporary information storage:
```bash
my_name="Alice"          # Stores a static string value (any temporary data)
my_age=30                # Stores a numeric value (no quotes needed)
echo $my_name $my_age
```
*Use simple variables to store user data, counters or status messages for easy reference in scripts and commands.*

---

Storing a **File Path** for quick access to directories and tools:
```bash
project_dir="/home/user/projects"  # Stores a custom path in a file system
echo $project_dir
cd $project_dir
```
*Save commonly used paths to simplify navigation and file management in the shell.*

---

Command Substitution, i.e., capturing and storing **command result** for later use:
```bash
my_files=$(ls | wc -l)   # (custom)    Counts the number of files in the current directory; value assigned once
echo "Number of files: $my_files"
```
*Assign the output of a command to a variable for use in calculations, summaries or conditional logic.*

<div id="note-alerts-1" class="highlighted highlighted--warning ">
<div class="highlighted__body" markdown="1">
Note that shell variables themselves do not update continuously. The value assigned reflects the result of the command at the moment the variable was defined and will not change unless the variable is reassigned.
![variable as command result](../assets/img/variable_command_result.png)
</div>
</div>

---

Capturing Date and Time for creating unique **timestamps** for file naming and logging:
```bash
current_date=$(date +"%Y-%m-%d_%H-%M-%S")  # Stores the current date and time
echo "Current Date: $current_date"
touch file_$current_date
```
*Use timestamps to create unique identifiers for files, logs, or backups, preventing overwrites.*
![variable_timestamp](../assets/img/variable_timestamp.png)

---

Creating **custom dynamic variables** (unique tag) that have a different value each time it is used:
```bash
for i in {1..5}; do
    unique_tag="sample_$RANDOM"  # Random number as part of the variable; reassigned in every loop iteration
    echo $unique_tag             # Displays a new value each time
done    
```
*Combine static variables with dynamic components like `date`, `$RANDOM` or `$SECONDS` to create dynamic tags for temporary files or random identifiers.*
![variable_unique_tag](../assets/img/variable_unique_tag.png)

<div id="note-alerts-1" class="highlighted highlighted--warning ">
<div class="highlighted__body" markdown="1">
Note that shell variables store a value at the time they are defined. To generate a new value on each use, the variable must be re-evaluated using a reassigned dynamic component like `$RANDOM` or `date`. A `for` loop is useful for iterative updates.
</div>
</div>

</div>
</div>


### Environment Variables

*(Created and available for the current shell session and any child processes like scripts or subshells.)*

| variable            | definition | notes |
|---------------------|------------|-------|
| `PATH`                | List of directories to search for executables. | Ensure it includes critical paths like `/usr/bin` and `/bin`. Add custom paths using <br>`export PATH=$PATH:/new/path`. |
| `HOME`                | Path to the user's home directory. | Use for referencing user files and configurations (`cd $HOME`). |
| `USER`                | Current logged-in username. | Useful in scripts to personalize behavior or logs. | 
| `SHELL`               | Path to the user's default shell. | Example: `/bin/bash` or `/bin/zsh`. <span class="warning">Avoid overriding this variable.</span> |
| `LANG`                | System locale setting. | Modify for language or encoding needs (e.g., `LANG=en_US.UTF-8`). |
| `EDITOR`              | Default text editor for command-line programs. | Common values: `vim`, `nano` or `emacs`. Set it to your preferred editor. |
| `TERM`                | Type of terminal in use. | Important for determining terminal capabilities (e.g., `xterm`, `screen`). |
| `DISPLAY`             | Used for GUI programs to connect to the X server. | Common on systems with graphical interfaces (e.g., `DISPLAY=:0`). |
| `LD_LIBRARY_PATH`     | Paths for dynamic library loading. | Use cautiously to avoid breaking system library dependencies. |
| `TMPDIR`              | Directory for temporary files. | Modify to redirect temporary files to faster or larger storage areas. |
| `OMP_NUM_THREADS`     | Number of threads for OpenMP applications. | HPC-specific; optimize based on available cores. |
|`CUDA_VISIBLE_DEVICES` | GPU devices visible to CUDA programs. | HPC-specific; use to control which GPUs a job can access. |
| `SLURM_JOB_ID`        | Job ID assigned by SLURM scheduler. | Common in HPC environments for job tracking and debugging. |
| `SLURM_NTASKS`        | Number of tasks in a SLURM job. | Essential for distributed computing setups. |


Listing all environment variables:
```
printenv
```


### HPC-Specific Environment Variables

*(Variables for optimized resource management and job scheduling on multi-user computing infrastructure.)*

In High-Performance Computing (HPC) environments, specialized environment variables are essential for efficient resource management and job scheduling on shared, multi-user systems. These variables help the job scheduler (e.g., **SLURM**) and system software coordinate how resources like CPU cores, memory and nodes are allocated to different users' jobs.

There are many HPC-specific environment variables available outside the job scheduler that can be useful for regular users in the login/interactive shell. These variables help manage software environments, resource paths and session state, even when not running a job. Specifically, these variables can be useful for module management, software execution and system information in HPC environments.


<div class="usa-accordion">

{% include accordion title="SLURM variables" class="primary " controls="hpc-variables-1" %}
<div id="hpc-variables-1" class="accordion_content" markdown="1">

| variable              | definition | notes |
|-----------------------|------------|-------|
| `SLURM_JOB_ID`        | Job ID assigned by SLURM. | Used for tracking jobs in SLURM-managed systems. |
| `SLURM_SUBMIT_DIR`    | Directory where the job was submitted. | Use to ensure output is directed to the right place. |
| `SLURM_CPUS_PER_TASK` | Number of CPUs per task. | Optimize parallel jobs by setting this appropriately. |
| `SLURM_NODELIST`      | List of nodes assigned to the job. | Useful for advanced job configurations or debugging. |
| `MPI_RANK`            | Rank of the process in MPI programs. | Essential for MPI-based parallel computing. |
| `SCRATCH`             | Path to a fast scratch storage area. | Use for I/O-heavy computations to reduce bottlenecks. |
| `JOBID`	            | Alternative to SLURM_JOB_ID in non-SLURM systems. | Identify and debug jobs across different schedulers. |

**SLURM-specific variables are typically available only during job execution on the compute nodes.** <br>

Knowing `JOBID` you can monitor live resource consumption for optimization and troubleshooting.
```bash
sstat -j <JOBID> --format=JobID   # Running Jobs Only
sacct -j <JOBID> --format=JobID   # After Job Completion
```
where the avaialable fields include: `JobID` `MaxVMSize` `MaxVMSizeNode` `MaxVMSizeTask` `AveVMSize` `MaxRSS MaxRSSNode MaxRSSTask`     `AveRSS` `MaxPages` `MaxPagesNode`   `MaxPagesTask`   `AvePages`     `MinCPU` `MinCPUNode` `MinCPUTask`     `AveCPU`   `NTasks` `AveCPUFreq` `ReqCPUFreqMin` `ReqCPUFreqMax` `ReqCPUFreqGov` `ConsumedEnergy`  `MaxDiskRead` `MaxDiskReadNode` `MaxDiskReadTask`  `AveDiskRead` `MaxDiskWrite` `MaxDiskWriteNode` `MaxDiskWriteTask` `AveDiskWrite` `TRESUsageInAve` `TRESUsageInMax` `TRESUsageInMaxNode` `TRESUsageInMaxTask` `TRESUsageInMin` `TRESUsageInMinNode` `TRESUsageInMinTask` `TRESUsageInTot` `TRESUsageOutAve` `TRESUsageOutMax` `TRESUsageOutMaxNode` `TRESUsageOutMaxTask` `TRESUsageOutMin` `TRESUsageOutMinNode` `TRESUsageOutMinTask` `TRESUsageOutTot`

</div>

{% include accordion title="Libraries, Software and Module Management" class="primary " controls="hpc-variables-2" %} 
<div id="hpc-variables-2" class="accordion_content" markdown="1">

| variable           | definition | notes |
|--------------------|------------|-------|
| `MODULEPATH`       | Directories where software modules are stored.   | Navigate to this path to check the most up-to-date list of available modules. |
| `LMOD_CMD`         | Path to the `lmod` command for managing modules. | Run `echo $LMOD_CMD` to verify the location of the `lmod` binary.     |
| `MODULESHOME`      | Base directory where the module system is installed. | Useful for debugging if modules fail to load.                      |
| `MODULEPATH_ROOT`  | Root directory for module paths.                 | Helpful for locating core software modules available on the system.  |
| `LD_LIBRARY_PATH`  | Directories where the system searches for shared libraries. | Extend this path carefully when working with custom libraries to avoid conflicts with system libraries. |

These variables control how software modules are managed and loaded on the HPC system. They are essential for accessing pre-installed software packages using the `module` or `lmod` system. **Regular users typically do not need to modify these variables** as they are predefined by system administrators to ensure a standardized software environment.

The `LD_LIBRARY_PATH` variable specifies directories where the dynamic linker searches for shared libraries when running executables. It ensures the system can locate necessary libraries for both pre-installed and user-compiled software. This variable is often predefined by system administrators for standard software libraries but can be modified by regular users when working with custom software builds or locally installed libraries.

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
Avoid overwriting the entire path (`LD_LIBRARY_PATH=/path/to/lib`) and instead extend it using `LD_LIBRARY_PATH=/custom/path:$LD_LIBRARY_PATH`. This prevents breaking essential system tools while ensuring your custom libraries are available.
</div>
</div>

</div>

{% include accordion title="Temporary Storage and Containers" class="primary " controls="hpc-variables-3" %} 
<div id="hpc-variables-3" class="accordion_content" markdown="1">    

| variable           | definition | notes |
|--------------------|------------|-------|
| `APPTAINER_TMPDIR`   | Directory for temporary files used by Apptainer containers. | Customize to prevent temporary storage issues during large container runs. |
| `APPTAINER_CACHEDIR` | Directory where Apptainer caches container images.  | Clear this directory periodically to free up disk space if needed.    |

These variables manage storage for Apptainer (formerly Singularity) containers, which are often used for reproducible, portable environments on HPC systems. Adjusting `APPTAINER_TMPDIR` or `APPTAINER_CACHEDIR` can be useful when working with large datasets or if the default locations run out of space. **Regular users can modify these variables if they need to direct temporary storage to another location.** *([review SCINet User Guide](https://scinet.usda.gov/guides/software/singularity#docker-images))*

</div>

{% include accordion title="Platform Architecture, System and Session Information" class="primary " controls="hpc-variables-4" %} 
<div id="hpc-variables-4" class="accordion_content" markdown="1">    

| variable           | definition | notes |
|--------------------|------------|-------|
| `LMOD_sys` | Identifies the system architecture for optimized software. | Useful for verifying compatibility with architecture-specific modules.|
| `HOSTNAME`     | The name of the current login or compute node. | Run `echo $HOSTNAME` to identify which node you're connected to.       |
| `SSH_CLIENT`   | IP and port information of the current SSH connection. | Useful for auditing and identifying remote connections.                |
| `USER`         | Current logged-in user.                      | Often used in scripts for user-specific configurations or logs.        |

These variables provide details about the platform architecture, current session, such as the node you're connected to and user information. **These variables are automatically set by the system and cannot be modified by regular users**, but they can be `echo`ed or logged for session tracking purposes.

</div>

{% include accordion title="Manual Pages and Documentation" class="primary " controls="hpc-variables-5" %} 
<div id="hpc-variables-5" class="accordion_content" markdown="1">    

| variable           | definition | notes |
|--------------------|------------|-------|
| `MANPATH`  | Directories where manual pages are stored. | Run `man <command>` to check the manual for any installed software.  |

`$MANPATH` defines where manual pages for installed tools and commands are stored. It ensures you can access documentation using man <command>. **This variable is predefined by system administrators.**

</div>
</div>



##  Viewing variables

Display a value of the selected variable:
```
echo $HOME
echo $my_var
```

List all variables accessible in current session:
```
set
```

Unset a custom variable (remove it from the environment):
```
unset MY_VAR
```

## Exporting variables for subprocesses

Shell variables normally exist only within the current shell session where they are defined, and they do not carry over to scripts or subprocesses started from that shell. 

<div id="note-alerts-1" class="highlighted highlighted--info">
<div class="highlighted__body" markdown="1">
<h4 class="highlighted__heading">How scripts and subprocesses are related to the current Shell?</h4>
* A **script** is a file containing a sequence of shell commands that can be executed in a shell session. When you run a script (e.g., `bash my_script.sh`), a new subshell is created, separate from the current shell.
* A **subprocess** is any command or program started from the current shell, including scripts. Running a command like `ls | grep "file"`, both `ls` and `grep` run in their own subprocesses created from the current shell.

**Subprocesses and scripts** start as separate shells from the parent shell (the one you are working in), and they **do not inherit variables** from the parent unless explicitly exported.
</div>
</div>

To make a variable available in child processes, it must be registered as an environment variable using the `export` command. Exporting a variable to environment (`export VAR="value"`) makes it accessible to subprocesses but **still limited to the lifetime of the current shell session** — once the session ends, the variable is cleared unless [persisted in a shell configuration file](#persisting-variables-in-config-files).

If you want a custom variable to persist in scripts or subprocesses executed in current shell session, it must be exported to the environment *(run it in a terminal)*:
```bash
my_var="Hello World"
export my_var
```
or
```bash
export my_var="Hello World"
```

Then you can use it in any script file (e.g., `my_script.sh`) like this:
```bash
#!/bin/bash
echo "The variable is: $my_var"
```

### Passing shell variables to SLURM jobs on SCINet HPC

In **job schedulers like SLURM**, when you submit a job (e.g., `sbatch my_job.sh`), the job runs in a completely separate shell environment on a compute node. Variables from your interactive shell will not be available inside the SLURM job unless explicitly exported:
```bash
export my_var="Hello SLURM"
sbatch --export=ALL my_job.sh
```
**WARNING:** *This exports all variables from the current environment, which may lead to unintended behavior if irrelevant or conflicting variables are included.*

**Export specific variables only:**
```bash
sbatch --export=VAR1=value1,VAR2=value2 my_job.sh
```

<div id="note-alerts-1" class="highlighted highlighted--highlighted">
<div class="highlighted__body" markdown="1">
<h4 class="highlighted__heading">Define or Export variable directly within the script <i>(recommended)</i></h4> 
To ensure a variable is always set when the script runs (even if not defined in the submitting shell), you can define it inside the script itself:
```bash
#!/bin/bash
VAR1="default_value"                # Ensuring the variable is defined
echo "Running with VAR1=$VAR1"
```
<br>
If the variable needs to be available to subprocesses within the script, you should export it inside the script:
```bash
#!/bin/bash
export VAR2="passed_value"          # Exporting ensures availability to child processes
echo "Running with VAR2=$VAR2"
```
</div>
</div>


## Persisting variables (in Config Files)

To make variable definitions permanent across sessions, they need to be added to shell configuration files. These files are read and executed when a shell starts.

| Bash Shell        | Zsh Shell | description |
| --                | --        | --          |
| `~/.bashrc`       | `~/.zshrc`| For interactive non-login shells and customizing the prompt or aliases. |
| `~/.bash_profile` | `~/.zprofile` | For login shells (e.g., SSH sessions). |

Example: 
To permanently add a custom path for executables, add an `export` statemnt to a selected configuraion file and save changes:
```
# (write it at the end of your .bashrc file)
export PATH=$PATH:/opt/myapp/bin
```
or write it down directly to a file from the command line:
```bash
echo 'export PATH=$PATH:/opt/myapp/bin' >> ~/.bashrc
```
and refresh the current shell session by applying changes from the configuration file:
```
source ~/.bashrc
```