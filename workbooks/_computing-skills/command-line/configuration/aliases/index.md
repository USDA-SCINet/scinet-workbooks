---

title: "Alias definition and usage: create shortcuts for repetitive commands"
description: "Simplify complex or frequently used commands with user-defined abbreviations."
type: lesson module
order: 2
tags: [unix, customization, bashrc]
author: Aleksandra Badaczewska

index: 3

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

{% include overviews folder=1 %}

## Getting Started

To complete this tutorial, you will need to launch the shell on SCINet. If you are unsure how to do this, please refer to [Getting Started with SCINet Workbooks](/about/use#using-the-shell) for instructions.  


## What is an alias in a shell?

An alias in Unix-like systems is a simple, user-defined shortcut that represents a longer or more complex command. Instead of typing out the full command with all flags and options every time, you can create a short, memorable word or abbreviation to run the command with all configurations instantly. 
```bash
alias lsc='ls --color=auto'         # define alias
lsc                                 # use alias like a new command
```
Aliases are a key tool for making repetitive tasks quicker and more efficient, minimizing the risk of mistakes and improving overall productivity on the command line.

They fit seamlessly into the larger shell customization ecosystem, working alongside [environment variables](../variables) and [shell functions](../functions). Together, these components allow users to tailor their shell environment to their specific needs, whether that means automating tasks, enhancing readability or ensuring safer command execution.

Imagine you frequently need to list files in detail within a directory. Instead of typing `ls -l` every time, you can create an alias like `ll` to perform the same task. Or perhaps you want to check the status of a Git project repeatedly, so setting up `alias gs='git status'` could save you lots of typing. 

In daily work on HPC infrastructure, aliases can help you highlight errors or quickly search logs without manually adding options to every command.

<div class="highlighted highlighted--tip">
<div class="highlighted__body" markdown="1">
While built-in commands handle core system tasks, aliases allow for lightweight customization and enhanced user productivity without altering the fundamental behavior of the shell.
</div>
</div>

<div class="usa-accordion">

{% include accordion title="Aliases vs Variables" class="tip" controls="aliases-var" icon=true %}
<div id="aliases-var" class="accordion_content" hidden markdown="1">


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

</div>

{% include accordion title="Aliases vs Functions" class="tip" controls="functions-aliases" icon=true %}
<div id="functions-aliases" class="accordion_content" hidden markdown="1">


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

</div>
</div>

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

<!--change to questions!-->
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
If successful, then you can make it permanent by [adding it to your project scripts or configuration file](../persistance).

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
- Organizing aliases: Group related aliases in your shell scripts or shell configuration files.
  - Use comments (`#`) to document aliases in configuration files for maintainability.
- Backup aliases: Regularly back up your aliases using version control (e.g., track your configuration in a Git repository).
- Parameterizing aliases: Use [shell functions](../functions) for tasks that require arguments.

For more tips and best practices, see the section [Alias best practices](#alias-best-practices).