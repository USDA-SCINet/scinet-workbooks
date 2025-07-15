---

title: Using environment and shell variables
description: "An in-depth guide to environment and shell variables in SCINet CLI"
type: interactive tutorial
order: 2
language: Bash
packages: 
level: 
author: Aleksandra Badaczewska 


objectives:
  - Acquire knowledge of how to access and manipulate variables in Bash shell.
  - Gain confidence in using effectively the built-in variables cross-platform, including HPC systems.
  - Get started with setting project-specific custom variables for optimal performance on SCINet clusters.

terms:
  - Shell
  - term: Environment variables
    definition: Key-value pairs that define system-wide settings and influence the behavior of processes.
  - term: Shell variables
    definition: Local variables used within the shell session for temporary configurations and scripting purposes.
  - term: Variable persistence
    definition: Techniques to save variables across sessions by editing configuration files like `.bashrc`.
  - term: Configuration file
    definition: Text file like `.bashrc` or `.bash_profile` that define environment variables and other shell settings.

applications: 
  - "**Using built-in variables:** Understanding and utilizing global pre-defined variables such as `PATH`, `HOME`, `USER` and SCINet-specific variables."
  - "**Customization:** Setting custom variables (local or global) to configure project-specific settings, such as tool versions or data paths."
  - "**Troubleshooting:** Identifying and resolving job errors caused by dependencies conflicts due to misconfigured or undefined variables."

overview: [objectives, applications, terminology]

questions:
  - question: How do the values of built-in variables like `$USER` or `$PWD` differ between your session and example results?
    qid: 1
    solution: The user and pwd variable reflect your specific SCINet username and current working directory.
  - question: Try a few variables that change over time or with user activity, such as `$SECONDS` or `$RANDOM`.
    qid: 2
  - question: "What does the shell do when a variable has not been defined?  Observe what happens when you run `echo $variable_notset`"
    qid: 3    
    answer: 3
    answers: 
      - An error message saying the variable is not defined
      - Prints the variable name, `$variable_notset`
      - An empty line (no output)
      - Prints null    
  - question: What is the difference between static and dynamic shell variables?
    qid: 4
    solution: "* **Static Shell Variables** - Hold a fixed value assigned by the user or the system until explicitly changed.    
    * **Dynamic Shell Variables** - Automatically update based on system activity or commands, without manual reassignment."
  - question: "Run:  \n
      <code class='copy'>
      my_saved_path=$PWD <br />
      echo $my_saved_path
      </code>  \n
      Then go up a folder and look at your `my_saved_path` variable again.  \n
      <code class='copy'>
      cd ..  <br />
      echo $my_saved_path
      </code>  \n
      **Does the  `my_saved_path` variable change when your folder changes?**  "
    qid: 5  
    answers:
      - "No, it still returns the path of the previous folder as that is what it was assigned."
      - "Yes, it dynamically updates every time it is called."
    answer: 1
    solution: "It still returns the path of the previous folder.  This can be useful for saving directory paths that you would like to return to regularly.
    
    <code class='copy'>cd $my_saved_path</code>"
---


## Overview

This interactive tutorial focuses on teaching you how to distinguish and effectively use the built-in environment and shell variables in command-line environments. You will also learn how to declare, modify and persist new variables to customize the behavior of your shell and applications when working on SCINet HPC clusters.

{% include overviews %}

## Getting Started
To complete this tutorial, you will need to launch the shell on SCINet. If you are unsure how to do this, please refer to [Getting Started with SCINet Workbooks](/about/use#using-the-shell) for instructions.  


## Configuring your shell environment

Shell configuration involves managing the behavior and settings of a command-line session. In practice, it involves defining and managing environment variables, setting aliases, and adjusting shell settings to control how the command-line interface behaves. 

On HPC systems, configuring the shell environment is particularly crucial, as it directly impacts the efficiency and correctness of settings for jobs submitted to computing nodes. 
By understanding the environment components and customizing these settings, you can create a streamlined and robust environment for high-performance computing tasks on SCINet clusters.

Your shell environment is managed using variables, which can be categorized mainly into `environment variables` and `shell variables`. 
The primary difference lies in scope and persistence. Environment variables affect both the current shell and its child processes, while shell variables are limited to the current shell unless exported. 

{% include table caption="Differences between environment and shell variables" content="|              | Environment Variables | Shell Variables |
|--------------|-----------------------|-----------------|
| definition   | Variables that store system-wide or user-specific settings and configurations. | Variables specific to the current shell, often used in shell scripts or interactive sessions. |
| scope        | **Global** to the shell and inherited by child processes. | **Local** to the current shell session and not automatically passed to child processes. |
| purpose      | Used to control the behavior of the operating system or applications. | Useful for temporary data storage or shell scripting logic. |
| usage        | system-wide or app settings | shell-specific purposes |
| examples     | `PATH`, `HOME`, `USER`, `LANG` | `PS1` (the shell prompt) and custom variables defined by the user. |
| registration | Declared with `export` to make them available to child processes. <br>`export MY_VAR=\"Hello\"` | No Export. Shell variables are not accessible by child processes. <br>`my_var=\"Hello\"` |
| persistence  | Added in `~/.bashrc` or `~/.bash_profile`. | Added in the same config files but not exported. |" %}


Configuring the shell environment effectively involves managing various variables that control the behavior of your shell session and the system. The process revolves around defining, modifying and exporting variables that influence both the user experience and the behavior of applications and system utilities.


## Shell Variables

Shell variables are created and used only in the current shell session, meaning they exist independently in each shell instance. When you open a new terminal window or start a new shell session, a fresh set of built-in shell variables is created. They are not shared between different shells unless explicitly exported as environment variables.

<div class="usa-accordion">

{% include accordion title="Shell variable examples" class="outline" controls="shell-variables-1" %}
<div id="shell-variables-1" class="accordion_content" hidden markdown="1">

{% include table caption="Shell variable examples" content="| variable            | definition | notes |
|---------------------|------------|-------|
| `PWD`               | Current working directory. | Automatically set by the shell; used in scripts for referencing relative paths. |
| `BASH_VERSION`      | Version of Bash shell. | Useful in scripts to check for compatibility. |
| `SECONDS`           | Counts seconds since shell started. | Handy for timing tasks (e.g., `echo $SECONDS`). |
| `RANDOM`            | Generates a random number. | Use in scripts for simple randomness (e.g., `echo $RANDOM`). |
| `HISTFILE`          | File where command history is stored. | Typically `.bash_history`; useful for long-term recall of commands. |
| `HISTSIZE`          | Number of commands stored in history. | Increase for better command recall, e.g., export `HISTSIZE=1000`. |
| `PS1`               | Primary command prompt string. | Customize your shell prompt (e.g., `export PS1=\"[\u@\h \W]$ \"` for a detailed prompt). |
| `PS2`               | Secondary prompt string (for multiline commands). | Default is `>`. Can be customized for clarity in complex scripts. |
| `_`                 | Last command's last argument. | Useful for quick re-usage (e.g., `ls somefile && cat $_`). |" %}

</div>
</div>

Shell variables are local, session-specific variables used within a shell instance to store information such as system state, user preferences, and temporary data.  Use the `echo` command followed by the variable name with a `$` prefix to display its current value (e.g., `echo $PWD`).  
```
echo $USER
```

### Static vs. Dynamic value

These shell variables can be categorized as either static or dynamic based on how their values behave:

* **Static Shell Variables** - Hold a fixed value assigned by the user or the system until explicitly changed.
  ```bash
  echo $USER               # (built-in)  The current username, typically static for the session.
  ```
* **Dynamic Shell Variables** - Automatically update based on system activity or commands, without manual reassignment.
  Some dynamic variables can monitor the system state (like `SECONDS`) or track user behavior (like `PWD` reflecting the current working directory).
  ```bash
  echo $SECONDS            # (built-in)  Continuously increases as the shell session progresses.
  echo $PWD                # (built-in)  Updates whenever you change directories using cd.
  ```
  * Dynamic values update automatically in real-time, showing a different value each time they are accessed, making them useful for continuous monitoring:
    ```bash
    while true; do echo "Uptime: $SECONDS seconds"; sleep 1; done
    ```

### Define a custom variable

**Users can create their own variables to store custom data**, such as `filenames`, commonly used `paths`, `counters`, or configuration options for scripts, making it easier to automate tasks and customize the shell experience. These variables help control how commands run, manage data flow and simplify repetitive tasks.
```bash
my_name="Alice"          # Stores a static string value (any temporary data)
my_age=30                # Stores a numeric value (no quotes needed)
echo $my_name $my_age
```
* Custom shell variables themselves do not auto-refresh after creation.
* To achieve dynamic behavior, user-defined variables can include commands like `date` or inherently dynamic variables like `$SECONDS` and `$RANDOM` that generate a different value each time.
  ```bash
  for i in {1..5}; do
      unique_tag="sample_$RANDOM"  # Random number as part of the variable; reassigned in every loop iteration
      echo $unique_tag             # Displays a new value each time
  done    
  ```

<div class="highlighted highlighted--warning ">
<div class="highlighted__body" markdown="1">
<h4 class="highlighted__heading">Shell variables themselves do not update continuously</h4>

The value assigned reflects the result of the command at the moment the variable was defined and will not change unless the variable is reassigned.  
<br>  

For example, using the `unique_tag="sample_$RANDOM"` demonstration above:  
If you create the variable `unique_tag` outside of the for loop and then call it, the result will be the same each time it is used.  If you assign and run it within the for loop, you will get a different result for each loop.  
  
![variable as command result]({{ images_path }}/variable_unique_tag.png)
</div>
</div>  

### Unset a custom variable

You can unset a custom variable and remove it from the environment by running `unset`:
```
unset my_var
```

{% include alert class="note" content="`unset` only affects the current session." %}

### Applications of shell variables

<div class="process-list h4 ul" markdown="1">

#### Check the built-in shell variables on SCINet

Use the `echo` command followed by the variable name with a `$` prefix to display its current value (e.g., `echo $PWD`). 

![using echo to display variables]({{ images_path }}/shell_variables_scinet.png)

{% include question qid="1,2,3" %}


#### Static vs. Dynamic value

Shell variables can be categorized as either static or dynamic based on how their values behave.

{% include question qid="4" %}

#### Define a custom variable

* Assigning a simple text or numeric value for basic/temporary information storage:
  ```bash
  my_name="Alice"          # Stores a static string value (any temporary data)
  my_age=30                # Stores a numeric value (no quotes needed)
  echo $my_name $my_age
  ```
* Storing a File Path for quick access to directories and tools:
  ```bash
  project_dir="/home/user/projects"  # Stores a custom path in a file system
  echo $project_dir
  cd $project_dir
  ```
* Command Substitution, i.e., capturing and storing command result for later use:
  ```bash
  my_files=$(ls | wc -l)   # (custom)    Counts the number of files in the current directory; value assigned once
  echo "Number of files: $my_files"
  ```

{% include question qid="5" %}

#### Timestamps

You can use timestamps to create unique identifiers for files, logs, or backups and prevent overwrites.

Capturing Date and Time for creating unique timestamps for file naming and logging:
```bash
current_date=$(date +"%Y-%m-%d_%H-%M-%S")  # Stores the current date and time
echo "Current Date: $current_date"
touch file_$current_date
```

![variable_timestamp]({{ images_path }}/variable_timestamp.png)

</div>


## Environment Variables


Environment variables are a special type of shell variables that are globally accessible for any processes and shared across different shell instances.
They are used to pass configuration information from the shell to applications or scripts that are executed within that environment. 

These variables are created by exporting shell variables using the `export` command, and their values persist as long as the shell session (or its child processes) 
remains active. Adding an export statement to a config file (e.g., `.bashrc`) persists an environment variable for all future shell sessions. 

<div class="usa-accordion">

{% include accordion title="Common environment variables" class="outline" controls="env-variables-1" %}
<div id="env-variables-1" class="accordion_content" hidden markdown="1">

{% include table caption="Common environment variables" content="| variable            | definition | notes |
| --------------------- | ------------ | ------- |
| `USER`                | Current logged-in username. | Useful in scripts to personalize behavior or logs. |
| `HOME`                | Path to the user's home directory. | Use for referencing user files and configurations (`cd $HOME`). |
| `PATH`                | List of directories to search for executables. | Ensure it includes critical paths like `/usr/bin` and `/bin`. Add custom paths using <br>`export PATH=$PATH:/new/path`. |
| `FPATH`               | Path for shell function lookup | Useful when adding custom shell functions for specialized tools. |
| `LANG`                | System locale setting. | Modify for language or encoding needs (e.g., `LANG=en_US.UTF-8`). |
| `SHELL`               | Path to the user's default shell. | Example: `/bin/bash` or `/bin/zsh`. **Avoid overriding this variable.** |
| `TERM`                | Type of terminal in use. | Important for determining terminal capabilities (e.g., `xterm`, `screen`). |
| `MAIL`                | Path to user's mail spool. | Can be used for job notifications if configured properly. |
| `EDITOR`              | Default text editor for command-line programs. | Common values: `vim`, `nano` or `emacs`. Set it to your preferred editor. |
| `DISPLAY`             | Used for GUI programs to connect to the X server. | Common on systems with graphical interfaces (e.g., `DISPLAY=:0`). |
| `SSH_CONNECTION`      | IP and port of the current SSH session. | Useful for logging and tracking SSH activity. |" %}

</div>
</div>

Environment variables are global, system-wide variables, storing information such as system settings, user preferences, and executable file paths. 
There are many built-in variables. For example, `HOME` defines the user's home directory, `LANG` specifies language settings and 
`PATH` lists directories for command lookups. Other commonly used variables configure tools and manage system behavior, 
like setting `EDITOR` for a preferred text editor or `LD_LIBRARY_PATH` for dynamic library loading.  

These variables simplify automation, ensure consistent behavior across sessions and help control program execution.
* Environment variables persist across subshells but not between sessions unless defined in startup files like `.bashrc` or `.bash_profile`.
* Environment variables can differ between `login` and `compute` nodes, with login nodes typically focusing on user interaction and job submission, while compute nodes are optimized for running jobs and may have a more restricted or customized environment.
* Users can modify some built-in environment variables (e.g., extend `PATH` variable) or create custom environment variables by adding `export` statment to configuration files.  

### List all environment variables

1. **Check built-in Environment Variables on a login node:** Use the `printenv` command to display all variables along with their values available on SCINet cluster. 
  ```bash
  printenv
  ```  
1. **Check built-in Environment Variables on a compute node:** Start an interactive session on a compute node and print environment variables again:
  ```bash
  salloc -N1 -n1 -t 1:00:00 -A <scinet-account>   # request an interactive session
  printenv
  ```

{% include alert class="question" content="* Are there differences in the values for variables such as `PATH`, `LD_LIBRARY_PATH` or `MODULEPATH`?  
* Do you notice variables set for temporary directories (`TMPDIR`) or cache directories (`CACHEDIR`) that are commonly used for job isolation on compute nodes?  
* Are there any SLURM-specific variables present, such as `SLURM_JOBID` or `SLURM_NTASKS` that indicate a job is running on a compute node?" %}



### Applications of environment variables

<div class="process-list h4 ul" markdown="1">


#### Practical uses of $USER and $HOME

* `$HOME` is a shortcut for moving to your home space from any location in the cluster's file system without typing the full path.  
  Navigate to your home directory quickly:  
  ```bash
  cd $HOME
  ```
* To edit or source your `.bashrc` configuration file:
  ```bash
  nano $HOME/.bashrc          # to make changes
  source $HOME/.bashrc        # to apply recent changes
  ```
* Check your running jobs in the queue:
  ```bash
  squeue -u $USER
  ```
* Find files in your home directory that end with a specific extension - such as `.log`:
  ```bash
  find $HOME -name "*.log"
  ```
* Copy or soft-link files to or from your home directory:
  ```bash
  cp $HOME/myscript.sh /project/<your-scinet-project>/$USER/
  ln -s /project/<your-scinet-project>/$USER/my_script.sh $HOME/
  ```
    * Useful for collaboration or to physically store large files in a project while having them accessible directly from home.


#### Modify $PATH for custom software

You can add a custom software directory to your `PATH` using the `export` statement, ensuring executables in that directory can be run directly from any location in the file system.
* **Temporary** for the current session (expires when the session ends):
  ```bash
  export PATH="/custom/software/bin:$PATH"
  ```
* **Persisted** for all future sessions (by adding it to a configuration file):
  ```bash
  echo "export PATH="/custom/software/bin:$PATH" >> ~/.bashrc
  source ~/.bashrc
  ```
  * This ensures the change is permanent across future shell sessions. The use of `echo` combined with appending (`>>`) and immediately sourcing the `.bashrc` is a common and effective approach.


#### Check or change a default $SHELL

* First, check which shells are available on an HPC system before changing the default:
  ```bash
  cat /etc/shells
  ```
  * On Ceres you should see: 

    {:.no-copy}
       /bin/sh, /bin/bash, /usr/bin/sh, /usr/bin/bash, /usr/bin/tmux, /bin/tmux, /usr/bin/zsh, /bin/zsh, /bin/csh, /bin/tcsh, /usr/bin/csh, /usr/bin/tcsh, /bin/ksh, /bin/rksh, /usr/bin/ksh, /usr/bin/rksh

* Verify your current shell using:
  ```bash
  echo $SHELL             # current shell
  echo $0                 # active shell
  ```
* Run a desired shell interactively to test it:
  ```bash
  /bin/sh                 # Exit with `exit` to return to your default shell.
  ```


</div>



## HPC-specific Environment Variables

{:.text-page-intro}
Environment variables for optimized resource management and job scheduling on multi-user computing infrastructure.

In High-Performance Computing (HPC) environments, specialized environment variables are essential for efficient resource management and job scheduling on shared, multi-user systems. These variables help the job scheduler (e.g., SLURM) and system software coordinate how resources like CPU cores, memory and nodes are allocated to different users' jobs.

There are many HPC-specific environment variables available outside the job scheduler that can be useful for regular users in the interactive shell on a computing node. These variables help manage software environments, resource paths and session state, even when not running a job. Specifically, these variables can be useful for module management, software execution, temporary file storage and system information in HPC environments.


### SLURM variables and applications

**SLURM-specific variables are typically available only during job execution on the compute nodes.**  

<div class="usa-accordion">

{% include accordion title="SLURM variables" class="outline" controls="hpc-variables-1" %}
<div id="hpc-variables-1" class="accordion_content" hidden markdown="1">

{% include table caption="SLURM variables" content="| variable              | definition | notes |
| ----------------------- | ------------ | ------- |
| `SLURM_JOB_ID` , `SLURM_JOBID` |  Unique identifier for the job assigned by SLURM. | Used for tracking jobs in SLURM-managed systems. |
| `SLURM_JOB_NAME`      | Name of the submitted job. | Helpful for identifying jobs in job queues. |
| `SLURM_JOB_GID`       | Group (numerical) ID associated with the job. | Useful for permission management and job accounting. |
| `SLURM_JOB_UID`       | User (numerical) ID associated with the job. | Useful for permission management and logging. |
| `SLURM_JOB_USER`      | Username associated with the job submission. | Identifies the user who submitted the job (e.g., `alex.badacz`), helpful for shared environments. |
| `SLURM_JOB_ACCOUNT`   | Account charged for the job. | Important for billing and resource usage tracking. |
| `SLURM_JOB_PARTITION` | Partition where the job was submitted. | Important for resource selection and job scheduling policies, e.g., `short`. |
| `SLURM_JOB_NODELIST`  | List of nodes allocated to the job. | Useful for multi-node jobs and task distribution. |
| `SLURM_JOB_CPUS_PER_NODE` | Number of CPUs requested per node. | Essential for defining CPU resources per node. |
| `SLURM_JOB_START_TIME`| Job start time (epoch format). | Useful for performance analysis and logging job durations. |
| `SLURM_JOB_END_TIME`  | Job end time (epoch format). | Helps in tracking resource usage and calculating job duration. |
| `SLURM_CPUS_ON_NODE`  | Number of CPUs available on a node. | Important for CPU-based job configuration. |
| `SLURM_CPUS_PER_TASK` | Number of CPUs per task. | Optimize parallel jobs by setting this appropriately. |
| `SLURM_STEP_NUM_TASKS`| Number of tasks in the current step. | Helpful for multi-step jobs. |
| `SLURM_NTASKS`        | Total number of tasks requested. | Critical for defining parallelism.  |
| `SLURM_PROCID`        | MPI process ID for the current task. | Useful for MPI-based parallel jobs. |
| `SLURM_TASK_PID`      | Process ID for the task . | Useful for process management and debugging within a job. |
| `SLURM_CLUSTER_NAME`  | Name of the SLURM cluster. | Helps identify the cluster in multi-cluster environments, e.g., `ceres`. |
| `SLURM_SUBMIT_HOST`   | Hostname of the system where the job was submitted, e.g., `ceres.scinet.usda.gov`. | Useful for identifying where the job originated, especially in multi-cluster environments. |
| `SLURM_SUBMIT_DIR`    | Directory where the job was submitted. | Use to ensure output is directed to the right place. |
| `SLURMD_NODENAME`     | Node name in the SLURM setup. | Indicates the compute node where the job is running, e.g., `ceres19-compute-85`. |" %}

</div>
</div>


Knowing `JOBID` you can monitor live resource consumption for optimization and troubleshooting.
```bash
sstat -j <SLURM_JOB_ID> --format=JobID   # Running Jobs Only
sacct -j <SLURM_JOB_ID> --format=JobID   # After Job Completion
```

### Other applications of HPC-specific environment variables

Most users will not need to modify any of these variables, but may benefit from knowing how they function.

<div class="usa-accordion">

{% include accordion title="Libraries, Software and Module Management" class="outline" controls="hpc-variables-2" %} 
<div id="hpc-variables-2" class="accordion_content" markdown="1">

{% include table caption="Library and module variables" content="| variable           | definition | notes |
| -------------------- | ------------ | ------- |
| `MODULEPATH`       | Directories where software modules are stored.   | Navigate to this path to check the most up-to-date list of available modules. |
| `LMOD_CMD`         | Path to the `lmod` command for managing modules. | Run `echo $LMOD_CMD` to verify the location of the `lmod` binary.     |
| `MODULESHOME`      | Base directory where the module system is installed. | Useful for debugging if modules fail to load.                      |
| `MODULEPATH_ROOT`  | Root directory for module paths.                 | Helpful for locating core software modules available on the system.  |
| `LD_LIBRARY_PATH`  | Directories where the system searches for shared libraries. | Modify when using custom software with non-standard library locations. Extend this path carefully when working with custom libraries to avoid conflicts with system libraries. |" %}

These variables control how software modules are managed and loaded on the HPC system. They are essential for accessing pre-installed software packages using the `module` or `lmod` system. **Regular users typically do not need to modify these variables** as they are predefined by system administrators to ensure a standardized software environment.

The `LD_LIBRARY_PATH` variable specifies directories where the dynamic linker searches for shared libraries when running executables. It ensures the system can locate necessary libraries for both pre-installed and user-compiled software. This variable is often predefined by system administrators for standard software libraries but can be modified by regular users when working with custom software builds or locally installed libraries.

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
Avoid overwriting the entire path (`LD_LIBRARY_PATH=/path/to/lib`) and instead extend it using `LD_LIBRARY_PATH=/custom/path:$LD_LIBRARY_PATH`. This prevents breaking essential system tools while ensuring your custom libraries are available.
</div>
</div>

</div>

{% include accordion title="Temporary Storage and Containers" class="outline" controls="hpc-variables-3" %} 
<div id="hpc-variables-3" class="accordion_content" markdown="1">    

{% include table caption="Storage and container variables" content="| variable             | definition | notes |
| ---------------------- | ------------ | ------- |
| `TMPDIR`             | Temporary directory for job-specific data.  | Critical for managing temporary job files. Can be modified for large data jobs. Default: `/local/bgfs/$USER/`|
| `SINGULARITY_TMPDIR` | Temporary directory for Singularity images. | Adjust for container usage with large datasets. |
| `APPTAINER_TMPDIR`   | Directory for temporary files used by Apptainer containers. | Customize to prevent temporary storage issues during large container runs. |
| `APPTAINER_CACHEDIR` | Directory where Apptainer caches container images.  | Clear this directory periodically to free up disk space if needed.    |" %}

These variables manage storage for Apptainer (formerly Singularity) containers, which are often used for reproducible, portable environments on HPC systems. Adjusting `APPTAINER_TMPDIR` or `APPTAINER_CACHEDIR` can be useful when working with large datasets or if the default locations run out of space.   

**Regular users can modify these variables if they need to direct temporary storage to another location.** 
For more information, [review the SCINet User Guide](https://scinet.usda.gov/guides/software/singularity#docker-images)).

</div>

{% include accordion title="Platform Architecture, System, and Session Information" class="outline" controls="hpc-variables-4" %} 
<div id="hpc-variables-4" class="accordion_content" markdown="1">    

{% include table caption="Architecture and session variables" content="| variable       | definition | notes |
| ---------------- | ------------ | ------- |
| `HOSTNAME`     | Name of the remote system in use, e.g., `ceres.scinet.usda.gov`. | Useful for SSH login or documenting SCINet clusters usage. |
| `LMOD_sys`     | Identifies the system architecture for optimized software. | Useful for verifying compatibility with architecture-specific modules. |
| `SSH_CLIENT`   | IP and port information of the current SSH connection. | Useful for auditing and identifying remote connections. |
| `SSH_TTY`      | Current SSH terminal. | Useful for determining if the session is remote. |
| `LOGNAME`      | Current user's login name. | Often used for personalizing job scripts or identifying user-specific processes. |
| `BASH_ENV`     | Path to a script sourced in non-interactive shells. | Useful for loading environment settings in batch jobs. |
| `TMOUT`        | Timeout for shell inactivity (in seconds). | Can be used to auto-logout inactive sessions for security purposes. |
| `OLDPWD`       | Previous working directory. | Allows easy navigation back to the last directory with `cd -`. |" %}

These variables provide details about the platform architecture, current session, such as the cluster you're connected to and user information. 

**These variables are automatically set by the system and cannot be modified by regular users**, but they can be `echo`ed or logged for session tracking purposes.

</div>

</div>



## Exporting variables for subprocesses

Shell variables normally exist only within the current shell session where they are defined, and they do not carry over to scripts or subprocesses started from that shell. 

To make a variable available in child processes, it must be registered as an environment variable using the `export` command. Exporting a variable to environment (`export VAR="value"`) makes it accessible to subprocesses but still limited to the lifetime of the current shell session — once the session ends, the variable is cleared unless persisted in a shell configuration file.

<div id="note-alerts-1" class="highlighted highlighted--note">
<div class="highlighted__body" markdown="1">
<h4 class="highlighted__heading">How are scripts and subprocesses related to the current Shell?</h4>
* A **script** is a file containing a sequence of shell commands that can be executed in a shell session. When you run a script (e.g., `bash my_script.sh`), a new subshell is created, separate from the current shell.
* A **subprocess** is any command or program started from the current shell, including scripts. Running a command like `ls | grep "file"`, both `ls` and `grep` run in their own subprocesses created from the current shell.

Subprocesses and scripts start as separate shells from the parent shell (the one you are working in), and they do not inherit variables from the parent unless explicitly exported.
</div>
</div>

### Exporting within your current session

If you want a custom variable to persist in scripts or subprocesses executed in current shell session, it must be exported to the environment:
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

{% include alert class="note" content="If you export variables this way, you will need to redefine and export the variable every time you want to run the script in a new environment." %}

### Define and export variables within your scripts

To avoid having to redefine and export your variables, it is reccomended that you define and export variables directly within the script itself.  This ensures the variable is always set when the script runs.  

```bash
#!/bin/bash
export VAR2="passed_value"          # Exporting ensures availability to child processes
echo "Running with VAR2=$VAR2"
```


## Persisting variables in Config Files

To make variable definitions permanent across sessions, they need to be added to shell configuration files. These files are read and executed when a shell starts.

{% include table caption="Config Files" content="| Bash Shell | Zsh Shell | description |
| --                | --        | --          |
| `~/.bashrc`       | `~/.zshrc` | For interactive non-login shells and customizing the prompt or aliases. |
| `~/.bash_profile` | `~/.zprofile` | For login shells (e.g., SSH sessions). |" %}

Example: 
To permanently add a custom path for executables, add an `export` statement to a selected configuration file and save changes:
```bash
# (write it at the end of your .bashrc file)
export PATH=$PATH:/path-to/my-custom-tool/bin
```
or write it down directly to a file from the command line:
```bash
echo 'export PATH=$PATH:/path-to/my-custom-tool/bin' >> ~/.bashrc
```
and refresh the current shell session by applying changes from the configuration file:
```
source ~/.bashrc
```

## Troubleshooting common issues

When working on HPC clusters, issues related to environment variables can lead to software errors, missing executables, or misconfigured jobs. This section explores common problems reported by users on SCINet clusters and provides practical debugging techniques to diagnose and resolve them effectively.

<div class="usa-accordion">

{% include accordion title="Empty variable or not such variable" class="outline" controls="var-debug-1" %}
<div id="var-debug-1" class="accordion_content" hidden markdown="1">
**SYMPTOMS:** Running a command or referencing a variable results in errors like `command not found` or an empty output when using `echo $VAR`.
```bash
echo $TMPDIR        # outputs an empty line
```
![empty-variable](../assets/img/empty-variable.png)

**SOLUTIONS:** <br>
**A.** Some variables (e.g., `TMPDIR`) are set on a **compute node** but not on a **login node**. Check the hostname to confirm your working environment. Also, review the list of [HPC-specific environment variables](#hpc-specific-env-variables).
```bash
hostname
```
![check_hostname](../assets/img/check_hostname.png)

**B.** Ensure your custom variable is defined and exported:
```bash
export MY_VAR="my_value"
echo $MY_VAR        # should return 'my_value'
```
</div>

{% include accordion title="Command not found due to incorrect $PATH or missing executables" class="outline" controls="var-debug-2" %} 
<div id="var-debug-2" class="accordion_content" hidden markdown="1">
**SYMPTOMS:** Custom commands or software fail with `command not found` error.
```bash
my_executable
#ERROR: bash: command not found
```
First, ensure that your executable file exist and find its location in the file system.
![missing_executable_path](../assets/img/missing_executable_path.png)
**Common Cause:** If the executable file exists, the `PATH` variable may not include the directory where the executable resides.
```bash
echo $PATH        # tool's path not present among listed locations
```
![missing_executable_path](../assets/img/missing_executable_path2.png)

**SOLUTIONS:** <br>
Extend the `PATH` variable by adding a path to a directory with your executable:
```bash
export PATH=/custom-path/bin:$PATH      # replace /custom-path/bin with an absolute path to your tool
```

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
By adding a tool's directory to the `PATH` variable, the shell automatically searches that location when a command is called, allowing the tool to be launched without specifying its full path. This provides a convenient way to run executables by its name from any working directory.
</div>
</div>
![custom_path_included](../assets/img/custom_path_included.png)
</div>

{% include accordion title="Error while loading shared libraries: $LD_LIBRARY_PATH" class="outline" controls="var-debug-3" %} 
<div id="var-debug-3" class="accordion_content" hidden markdown="1">    
**SYMPTOMS:** Errors such as `error while loading shared libraries` or `unable to load shared object` often indicate 
library path issues caused by missing (or not linked) required libraries in the specified search paths. 
Typically, the concern is a missing `.so` (shared object) file, which should first be located on the system, 
and its directory path checked for inclusion in the `LD_LIBRARY_PATH` variable.
![missing_shared_library](../assets/img/missing_shared_library.png)

**SOLUTIONS:** <br>
Locate the missing library:
```bash
find /usr -name "lib_my_lib.so"
```
Verify the current `LD_LIBRARY_PATH`:
```bash
echo $LD_LIBRARY_PATH
```
Fix the issue *(for the session only)* by adding library path to a `LD_LIBRARY_PATH` variable:
```bash
export LD_LIBRARY_PATH=/path/to/lib:$LD_LIBRARY_PATH        # replace /path/to/lib with an absolute path of missing library
```
</div>

{% include accordion title="Multiple logfiles when using dynamic variables: $SECONDS, $RANDOM" class="outline" controls="var-debug-4" %} 
<div id="var-debug-4" class="accordion_content" hidden markdown="1">    
**SYMPTOMS:** Multiple log files being generated unintentionally when using dynamic variables like `$SECONDS` and `$RANDOM` to create temporary files. 
The typical cause is that built-in dynamic variables generate a new value each time they are referenced, resulting in different filenames on every call. As a result, when log file creation is misplaced (e.g., inside a loop where logs should be written continuously), a new file is generated on each iteration.
![dynamic_variables_usage](../assets/img/dynamic_variables_usage.png)

**SOLUTIONS:** <br>
Capture the dynamic value once and store it in a static variable before using it repeatedly:
```bash
LOGFILE="log_$RANDOM.txt"
touch "$LOGFILE"
for i in `seq 10`; do
  echo "Current analysis step: "$i >> $LOGFILE; 
done
```
![dynamic_variable_tag]({{ images_path }}/dynamic_variable_tag.png)
</div>

{% include accordion title="Variable works interactively but fails in batch jobs or scripts" class="outline" controls="var-debug-5" %} 
<div id="var-debug-5" class="accordion_content" hidden markdown="1">    
**SYMPTOMS:** A variable works correctly when defined in an interactive session in the command line but fails to persist in batch jobs or scripts, 
often leading to errors like `variable not defined` or unexpected empty values during execution. <br>
**CAUSE:** This occurs when the variable is defined locally in the shell but not exported to the environment, 
preventing it from being inherited by subshells or child processes.

**SOLUTIONS:** <br>
Use `export` to make a variable available to child processes:

**A.** Passed to all subshells, including scripts executed in a current shell: *(learn more: [Exporting variables for subprocesses](#exporting-variables-for-subprocesses))*
```bash
MY_VAR="my_value"             # only visible in the current shell
export MY_VAR="my_value"      # available to all subshells, including child processes and scripts executed from a current shell
```

**B.** Persisted for all future shell sessions and scheduled SLURM jobs: *(learn more: [Persisting variables in Config Files](#persisting-variables-in-config-files))*
```bash
echo "export MY_VAR='my_value' >> ~/.bashrc"
source ~/.bashrc
```
</div>

{% include accordion title="Variables not persisting across sessions" class="outline" controls="var-debug-6" %} 
<div id="var-debug-6" class="accordion_content" hidden markdown="1">    
**SYMPTOMS:** Custom variables work as expected during a shell session but need to be redefined after logging out or 
starting a new terminal session, causing repeated manual configuration. <br>
**CAUSE:** This happens because variables set in the current shell are temporary and not saved in the user's startup files, 
preventing them from being automatically available in new sessions.

**SOLUTIONS:** <br>
Add the `export` statement to your shell startup file (`~/.bashrc`) to perist a variable for future shell sessions:
```bash
echo "export MY_VAR='my_value' >> ~/.bashrc"
source ~/.bashrc
```
*(learn more: [Persisting variables in Config Files](#persisting-variables-in-config-files))*
</div>

{% include accordion title="Standard commands stop working after modifying $PATH or $LD_LIBRARY_PATH" class="outline" controls="var-debug-7" %} 
<div id="var-debug-7" class="accordion_content" hidden markdown="1">    
**SYMPTOMS:** Standard commands like `ls`, `grep` or `python` fail with errors such as `command not found` or 
behave unexpectedly after modifying the `PATH` or `LD_LIBRARY_PATH` variables. This issue occurs when the original system paths 
are overwritten instead of extended, causing essential system directories to be excluded from the search path.

| <span style="color: red">Incorrect Example</span> | Correct Approach |
| --                | --               |
| overwriting the value | extending the value | 
| `export PATH=/custom/bin` | `export PATH=/custom/bin:$PATH` |
| `export LD_LIBRARY_PATH=/custom/lib` | `export LD_LIBRARY_PATH=/custom/lib:$LD_LIBRARY_PATH` |

**SOLUTIONS:** <br>
**A.** Restore defaults manually: Reset the variables to standard defaults typical for HPC clusters.
```bash
export PATH=/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin
export LD_LIBRARY_PATH=/usr/local/lib:/usr/lib
```
**B.** Contact VRSC: If unsure about the standard paths or if the issue persists, contact SCINet support team (**scinet_vrsc@usda.gov**) 
to reset the affected built-in variables to their default state.

</div>


{% include accordion title="Jobs failing with disk space errors due to temporary storage $TMPDIR" class="outline" controls="var-debug-8" %} 
<div id="var-debug-8" class="accordion_content" hidden markdown="1">    
**SYMPTOMS:** Jobs fail with disk space errors, warnings about insufficient storage or unexpected job terminations when handling large datasets or temporary files. This issue commonly occurs when your job writes temorary files to a wrong location or the selected location is either full or too small for job data.
```bash
# ERROR: No space left on device
# ERROR: Job 12345 exceeded disk quota on /tmp
# ERROR: cannot create tempfile '/tmp/Rtmp12345', reason 'No space left on device'
```

**SOLUTIONS:** <br>
On SCINet clusters, all compute nodes have 1.5 TB of fast local temporary data file storage space. A scheduled job or interactive session on a compute node sets up automatically a unique local space (e.g., `/local/bgfs/alex.badacz/13968447`) accessible only with the job script via the environmental `$TMPDIR` variable. You can use this for any scratch space disk space you need. You must copy any output data you need to keep back to permanent storage before the job ends, since `$TMPDIR` will be erased upon job exit. 
![temporary_storage](../assets/img/temporary_storage.png)

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
If you plan to compute on an existing large data set (such as a sequence assembly job) it might be beneficial to copy all your input data to scratch space at the beginning of your job, and then do all your computation on `$TMPDIR`. Follow instructions provided in the [SCINet User Guide: Scratch Space](https://scinet.usda.gov/guides/use/scratch#scratch-space).
</div>
</div>

</div>


{% include accordion title="Best practices for debugging" class="outline" controls="var-debug-10" %} 
<div id="var-debug-10" class="accordion_content" hidden markdown="1">    
- Check a variable's Value: `echo $VAR`
- List all environment variables: `printenv`
- List all (local) shell variables: `set`
- Identify where a variable was set: `grep VAR ~/.bashrc ~/.bash_profile`
- Check current modules loaded: `module list`
- Start a clean shell
</div>
</div>