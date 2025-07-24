---

title: "Alias definition and usage: create shortcuts for repetitive commands"
description: "Simplify complex or frequently used commands with user-defined abbreviations."
type: lesson module
order: 2
tags: [unix, customization, bashrc]
author: Aleksandra Badaczewska


objectives:
  - Grasp the syntax and conventions for creating aliases in a Bash shell.
  - Be able to define both temporary and permanent aliases to improve your command-line experience.
  - Develop an understanding of best practices for managing aliases to avoid conflicts and ensure reliability.
  - Confidently troubleshoot common issues related to aliases, such as path conflicts or quotation errors.

concepts:
  - "**Command aliases:** Shortcuts that allow you to replace long or repetitive commands with simpler, custom keywords."
  - "**Alias persistence:** Techniques for saving aliases permanently using shell configuration files."
  - "**Temporary vs. permanent aliases:** The difference between session-specific and persistent alias definitions."
  - "**Alias expansion and nesting:** Handling complex commands or sequences of commands using aliases."

terms:
  - term: Bash shell
    definition: A popular shell environment (command interpreter) available on most Unix-like and HPC systems.
  - term: Configuration file
    definition: Text file like `.bashrc` or `.bash_profile` that define environment variables and other shell settings, including text coloring and prompt styles.
  - term: Command substitution
    definition: A technique used to enhance aliases by embedding dynamic commands.

applications:
  - "**Time-saving shortcuts:** Define aliases for long or complex commands, such as for data processing or file management."
  - "**Automation:** Simplify cluster-specific tasks like job submission, monitoring or file transfers with user-defined shortcuts."
  - "**Environment setup:** Create startup aliases that load specific modules, set variables or initialize project environments."
  - "**Error-prone commands:** Minimize typos and accidental mistakes by using intuitive aliases for potentially dangerous commands (e.g., replacing `rm` with a safer version)."
  - "**Coloring text outputs:** Combine aliases with `echo`, `grep`, `awk` or `tail` commands using ANSI color codes to highlight specific keywords, warnings or errors. *This is particularly useful when exploring log files or quickly detecting issues during interactive debugging sessions on clusters.*"

overview: [objectives, concepts, applications, terminology]
---

## Overview

This tutorial offers a practical, step-by-step guide to creating and managing command aliases. The focus is on real-world applications where repetitive tasks can be simplified, allowing for faster and more efficient interaction with the shell. 

{% include overviews %}

## Getting Started

To complete this tutorial, you will need to launch the shell on SCINet. If you are unsure how to do this, please refer to [Getting Started with SCINet Workbooks](/about/use#using-the-shell) for instructions.  


## What is an alias in a shell?

An alias in Unix-like systems is a simple, user-defined shortcut that represents a longer or more complex command. Instead of typing out the full command with all flags and options every time, you can create a short, memorable word or abbreviation to run the command with all configurations instantly. 
```bash
alias lsc='ls --color=auto'         # define alias
lsc                                 # use alias like a new command
```
Aliases are a key tool for making repetitive tasks quicker and more efficient, minimizing the risk of mistakes and improving overall productivity on the command line.

They fit seamlessly into the larger shell customization ecosystem, working alongside [environment variables](./variables), [shell functions](./functions) and [configuration files](./bashrc). Together, these components allow users to tailor their shell environment to their specific needs, whether that means automating tasks, enhancing readability or ensuring safer command execution.

Imagine you frequently need to list files in detail within a directory. Instead of typing `ls -l` every time, you can create an alias like `ll` to perform the same task. Or perhaps you want to check the status of a Git project repeatedly, so setting up `alias gs='git status'` could save you lots of typing. 

In daily work on HPC infrastructure, aliases can help you highlight errors or quickly search logs without manually adding options to every command.

<div class="highlighted highlighted--tip">
<div class="highlighted__body" markdown="1">
While built-in commands handle core system tasks, aliases allow for lightweight customization and enhanced user productivity without altering the fundamental behavior of the shell.
</div>
</div>


### Aliases vs Variables

While both aliases and variables play a role in simplifying tasks on the command line, they serve different purposes and behave differently. 
- Variables are designed for storing and manipulating data
- Aliases focus on command substitution to streamline shell usage. 

{% include table caption="Differences between shell variables and aliases" classes="striped" sticky="true" fixed="true" no-row-labels="true" content="| shell variables   | aliases |
| --                 | --       |
| Variables store data or values, e.g., strings, numbers or file paths. <br>For example, `mydir=\"/project/my_project/subfolder\"`. | Aliases act as shortcuts that store command sequences, making it easier to execute repetitive tasks. <br>For example, `alias ll='ls -l'`. |
| When a variable is referenced (e.g., `$mydir`), the shell replaces it with its assigned value before execution. | When an alias is referenced (e.g., `ll`), the shell expands it into the original command (e.g., `ls -l`) before execution. |
| Variables are used for dynamic content like user input, configuration values or temporary storage. | Aliases provide static command substitutions and are not meant to hold or manipulate dynamic data. |
| Variables are flexible and can be used in scripting and programming logic, such as loops and conditionals. | Aliases are limited to simple command substitutions and are not suited for conditional or complex logic. |
| Variables are defined using the syntax: `name=value`, and are referenced with `$name`. | Aliases are defined using `alias name='command'` and called directly by their `name`. |" %}

### Aliases vs Functions

The ability to accept and process arguments is a key distinction between aliases and functions in the shell.


{% include table caption="Differences between aliases and functions" content="| feature     | Alias | Function |
| --          | --    | --       |
| purpose     | Shorten and simplify commands. | Automate and modularize tasks. |
| arguments   | Cannot accept arguments directly. | Can accept and process arguments. |
| complexity  | Simple command substitution. | Can include logic (loops, conditionals). |
| scope       | Used for command shortcuts. | Suitable for more complex operations. |
| persistence | Defined in startup scripts for persistence | Defined in startup scripts for persistence. |
| example definition | `alias ll='ls -la'` | `list_files() {ls -l \"$1\"}` |
| example usage      | `ll`                | `list_files /home`          |" %}

### Temporary and Permanent Aliases

Understanding the correct usage of temporary and permanent aliases in an HPC environment can significantly enhance your workflow, 
especially when dealing with large-scale job submissions, data processing and system monitoring.

#### Temporary aliases

Aliases defined within the current shell session are temporary and are not retained once the session ends. 
These aliases are particularly useful for testing or for one-time use during interactive sessions on HPC nodes.

Limitations of temporary aliases include:
- **Session-specific:** These aliases are valid only for the session in which they are defined.
- **Lost after logout:** Once you log out or terminate the session, these aliases will no longer exist.
- **No long-term applications:** For repetitive tasks that span multiple sessions or across different nodes, temporary aliases are insufficient.

Suppose you are working on a project where you need to frequently process large log files generated during a simulation. The (long) output path and searching for (Error) keywords is only relevant for this project and not for general use, so you don’t want to create a permanent alias.

Use the `alias` command directly in the terminal (shell session) to define temporary aliases:
```bash
alias process_log='cat /project/my_account/my_project/iteration_X/*.log | grep "ERROR"'
```
After defining the alias, you can invoke it immediately just like any other command:
```bash
process_log
```
You get a quick summary of all error messages from the simulation logs. Once the project is done, you don’t need this alias anymore.

This is particularly useful during debugging or analysis in a project where you’re reviewing simulation issues or results 
but won’t need the alias after this step is complete.


#### Permanent Aliases

Permanent aliases are stored in configuration files, allowing them to persist across shell sessions. 
* For bash shell users, `~/.bashrc` file is commonly used to store aliases. 
* Persistent across sessions: Since these aliases are stored in configuration files, they will be available each time you log in.  
  This is useful for workflows on HPC clusters where you frequently log in and out of different nodes.

Working on HPC, you frequently submit jobs, so you repeatedly need to check their status, making it a common task. A permanent alias can help streamline this process and ensure quick access across sessions.

**To create a permanent alias:**
1. Open your `~/.bashrc` configuration file:
```bash
nano ~/.bashrc
```
2. Add the alias definition:
```bash
alias my_jobs='qstat -u $USER'      # usage: my_jobs
```
*This alias helps you quickly check the status of all jobs submitted under your username in an HPC environment. By defining a permanent alias, you ensure that you can monitor your job submissions efficiently across multiple sessions without additional configuration.*
3. Save the file (`CTRL + X`, then `Y`) and reload the configuration:
```bash
source ~/.bashrc 
```


## Creating aliases

When you define an alias, you are essentially assigning a custom name to a command using the alias keyword, making the command easier and quicker to execute. 
The process is straightforward and flexible, but understanding the syntax and how to avoid common pitfalls is important for making the most of them.

To define an alias, use the following syntax:
```bash
alias name='command'
```
- `alias`  is the keyword to define an alias.
- `name` is the shortcut you will use to execute the command.
- `command` is the full command that will be run when the alias is called.  
  ***Always wrap the command in single quotes `'command'`!***


Think of it as storing a frequently used command in a variable-like structure that can be called anytime. 

<div class="usa-accordion">

{% include accordion title="Common and useful basic alias examples" class="tip" controls="alias-examples-1" icon=true %}
<div id="alias-examples-1" class="accordion_content" hidden markdown="1">


* Listing files with detailed information: *(new shortcut)*
  ```bash
  alias ll='ls -l'                     # usage:  ll
  ```
* Git status shortcut: *(new shortcut)*
  ```bash
  alias gs='git status'                # usage:  gs
  ```
* Colorized search with `grep`: *(overwritten command)*
  ```bash
  alias grep='grep --color=auto'       # usage:  grep
  ```

</div>

</div>

### Quoting and escaping special characters 

When defining an alias, it's important to correctly handle commands that contain spaces, special characters, or multiple commands.  

Aliases are treated like text substitutions, so quoting and escaping ensure the commands work as intended when expanded.

* **Expansion** refers to the process of replacing the alias with the corresponding command or sequence of commands before execution.
* **Quoting** in the context of aliases ensures that special characters, spaces or arguments within the alias are treated as literal values, preserving their intended meaning.
* **Escaping** special characters in command aliases prevents them from being interpreted by the shell, allowing them to be used as part of the command instead of triggering their usual functions.

- Use double quotes (`"`) when you want variable expansion (`$var` → its value) but still protect spaces and special characters. 
  * Variable $USER expands correctly to its assigned value.
    ```bash
    greet_user() { echo "Hello, $USER!"; }
    # OUTPUT: Hello, alex.badacz!
    ```
- Use single quotes (`'`) to treat everything literally (no variable expansion, no special character interpretation). 
  * Variable $HOME will NOT expand to its value.
    ```bash
    print_literal() { echo 'This will not expand: $HOME'; }
    # OUTPUT: This will not expand: $HOME 
    ```
- Use escaping (`\`) to treat special characters as regular characters inside functions when quoting isn't an option. 
  * Special characters are treated as regular characters.
    ```bash
    escape_example() { echo "Dollar sign: \$"; }
    # OUTPUT: Dollar sign: $
    ```

<div class="process-list h4 ul" markdown="1">

#### Use single quotes

Always wrap the command in single quotes ' ' to prevent the shell from interpreting special characters immediately.
```bash
alias today='date +%Y-%m-%d'      # usage: today
```
Without quotes, the shell could try to expand the `date` command during the alias definition, which may cause errors.

#### Commands containing variables

If you're using variables (like some environment variables `$HOME` or `$USER`) in the alias, ensure they are properly escaped when necessary.
```bash
alias mydir='echo "You are in $HOME"'
# usage: mydir
```


</div>

### Combining commands

<div class="process-list h4 ul" markdown="1">

#### Combine multiple commands in sequence

Commands separated by ; are executed sequentially, one after the other, regardless of whether the previous command succeeds or fails.
```bash
alias example='command1; command2'    # command2 will execute even if command1 fails
```
For example, automatically list files and display disk usage information one after the other.
```bash
alias files_and_space='ls -lh; du -sh .'
# usage: files_and_space
```

#### Combine multiple commands conditionally

Commands separated by `&&` are executed sequentially, but the second command will only run if the first command succeeds (returns a zero exit status).
```bash
alias example='command1 && command2'    # command2 will execute only if command1 is successful
```

For example, compile a program with `gcc` and run it to display usage instrutions only if the compilation succeeds.
```bash
alias compile_run='gcc program.c -o program && ./program -h'
# usage: compile_run
```

#### Aliases can be piped with other commands

Aliases can be piped with other commands or used directly on files when they are designed to accept input from stdin (standard input) or file arguments. 
This is especially useful for tasks like log monitoring, file parsing or real-time output filtering. 

* When an alias is designed to read input (i.e., uses commands like `grep`, `awk` or `sed`), it can be used in a pipe chain with commands like `cat`, `echo` or any process that streams data.
  ```bash
  cat <input_file> | customized_alias
  # e.g., cat job_output.log | logcheck
  ```
  The `cat` command streams the file's content, which alias processes - for example to highlight errors and warnings.
* Some aliases are designed to continuously monitor output, like those using `tail -f`, and pipe that output through additional processing. Such aliases expect input file to be provided.
  ```bash
  customized_alias <input_file> 
  # e.g., tailgrep slurm-16364729.out
  ```
  This alias monitors the live output of the SLURM log file, highlighting errors and warnings as they appear.

</div>

## Alias best practices

To get the most use out of aliases - and use them safely - there are some best practices you should follow.

<div class="process-list ul" markdown="1">

### Check if a command name is already taken

Before creating an alias, use the following command to check whether a command name already exists as a built-in shell command, alias or executable program:
```bash
type -a command_name
```

{% include alert class="warning" title="Shell aliases can override system commands" content="Never alias commonly used system utilities (`rm`, `cp`, `mv`, etc.) unless you have a very good reason and understand the risks.  
Overriding these commands could lead to unintended behavior." %}

For example, the command `type -a` shows that `new_alias` is not defined, while `grep` is both an alias  to `grep --color=auto` and an executable located at `/usr/bin/grep`, demonstrating how shell aliases can override system commands.
![check if alias exists]({{ images_path }}/alias/check_alias_exists.png)



If you accidentally redefine a built-in command (e.g., creating `alias rm='rm -i'`), you can temporarily disable it using:
```bash
unalias command_name
```


### Use descriptive words to indicate specific tasks

Use descriptive and distinct names for aliases in HPC to avoid conflicts with system commands.

When defining aliases in an HPC environment, it’s important to choose names that clearly describe their function while avoiding conflicts with existing system commands or other users' aliases. This ensures that your aliases don’t inadvertently override essential commands and are easy to remember and use effectively.

{% include table caption="Alias name examples" content="| Good Alias Name   | Why it's good? | Bad Alias Name | Why it's bad? |
| --                 | --              | --              | --             |
| `my_jobs`         | Clearly describes the purpose (checking job status). | `jobs`   | Conflicts with the built-in shell command jobs. |
| `process_logs`    | Indicates the action of processing log files.        | `log`    | Too generic and could conflict with project-specific scripts. |
| `disk_usage`      | Descriptive and specific about showing disk usage.   | `du`     | Overwrites the existing du command for disk usage. |
| `submit_sbatch`   | Makes it clear that it submits jobs using sbatch.    | `submit` |	Too broad and could be confusing in job scripts. |
| `clean_tmp_files` | Clearly specifies the action of cleaning temporary files. | `rm` | Dangerous as it overrides the default rm command. |" %}

<div class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
<h4 class="highlighted__heading">Tip</h4>

Adding a personal or project-based prefix can help distinguish your aliases from system commands.
```bash
alias my_ls='ls -lh --color=auto'           # usage: my_ls
alias dev_start='cd /path/to/project/dev'   # usage: dev_start
```

</div>
</div>

### Test new aliases before making them permanent

When defining a new alias, test it as a temporary alias first to ensure it works as expected and does not cause issues. 
If successful, then make it permanent by [adding it to your configuration file](./bashrc) (`~/.bashrc`).

### Document your aliases

If you're defining many aliases, especially in a shared HPC environment, consider creating a brief list or comments 
in your configuration file (`~/.bashrc`) for future reference.

```bash
# Aliases for job monitoring
alias my_jobs='squeue -u $USER'             # usage: my_jobs

# Aliases for quick navigation
alias go_to_project='cd /path/to/project/my_account/project_X'  # usage: go_to_project
```

</div>



## Practical aliases for HPC

These practical aliases are crafted to reduce repetitive typing and help you navigate, manage data and monitor jobs efficiently in SCINet HPC environments.

<div class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">

<h4 class="highlighted__heading">Boost your productivity by creating project-specific aliases tailored to your workflows!</h4>

These aliases allow you to navigate project directories, run commands, and simplify daily tasks with just a few keystrokes. 
With flexible nature of aliases, you can quickly update or remove them as your project evolves, ensuring your development environment stays clean and efficient. 

</div></div>



### Shortcuts for frequently used commands

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

### Aliases for commands with options and flags

<div class="usa-accordion">

{% include accordion title="Colorized grep for easier output reading" class="overview " controls="alias-set3-1" %}
<div id="alias-set3-1" class="accordion_content" markdown="1" hidden> 

Enhance your aliases by using ANSI escape codes to colorize outputs and highlight important information like errors or warnings. 
For a deeper dive, check out tutorials on [shell text coloring](./coloring) with `echo`, `grep`, `awk` and other commands.

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

For a deeper dive, check out tutorials on [shell text coloring](./coloring) with `ls` commands.
</div></div>

</div>

</div>

### Combining multiple independent commands

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


### Dynamic aliases using command substitution and shell variables

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


### Configuring aliases for job submission and resource monitoring

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

## Troubleshooting common issues

- Alias not working: [Check shell sessions, typos, and file sources](#tips-for-alias-management)
- Persistent aliases not loading: [Ensure the aliases are correctly defined in configuration files and that the file is sourced](#persisting-aliases)
- Conflicts with system commands: [Identify and resolve overlaps](#avoiding-conflicts-with-system-commands)
  - Avoid aliasing dangerous commands (such as `rm`) or do it safely.
- Unexpected output or alias execution failures: [Explore guides on quoting and escaping special characters](#quoting-and-escaping-special-characters)
  - Use **single quotes** `' '` to prevent expansion of variables and special characters, treating everything literally.
  - Use **double quotes** `" "` to allow variable expansion and globbing while preserving spaces.
  - Use **backslashes** `\` to escape individual characters when needed.


### Summary of best practices

- Naming conventions: Keep aliases short but meaningful, intuitive and easy to remember.
  - Defined aliases can be autocompleted using the `Tab` key, as long as you've typed enough of the alias name for the shell to recognize and expand it.
- Avoiding conflicts: Check existing aliases or commands before creating new ones.
  ```bash
  type -a alias_name
  ```
- Organizing aliases: Group related aliases in your shell configuration files.
  - Use comments (`#`) to document aliases in configuration files for maintainability.
- Backup aliases: Regularly back up your aliases using version control (e.g., track your configuration in a Git repository).
- Parameterizing aliases: Use [shell functions](/computing-skills/command-line/cli-interface/shell/customization/functions) for tasks that require arguments.

For more tips and best practices, see the section [Alias best practices](#alias-best-practices).