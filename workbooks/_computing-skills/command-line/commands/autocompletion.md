---

title: Command autocompletion
description: "An in-depth guide to autocomplete in Bash, and how to use it for your own scripts"
type: interactive tutorial
order: 4
tags: [command] 
language: Bash
author: Aleksandra Badaczewska


objectives:
  - Learn how `Tab` completion works for commands, filenames, and arguments in the shell.
  - Understand how Bash autocompletion improves command-line efficiency.
  - Explore advanced autocompletion features for handling command options and custom scripts.

concepts:
  - "**Command autocompletion:** A shell feature that suggests and completes commands, filenames, and arguments."
  - "**Tab completion:**  Pressing the `Tab` key to complete partially typed commands or file paths."
  - "**Bash completion:** An extended autocompletion framework that enables smart suggestions for various commands."
  - "**Custom autocompletion:** Defining personalized completion rules for scripts, aliases and custom commands."
applications: 
  - "**Faster command execution:** Use autocompletion to quickly recall commands, files and paths."
  - "**Error reduction:** Minimize typos and incorrect paths by letting the shell autocomplete inputs."
  - "**Navigating directories efficiently:** Autocomplete long or complex file paths without excessive typing."

overview: [objectives, concepts, applications]
---

## Overview

Ccommand autocompletion is a powerful shell feature that enhances efficiency by predicting and completing command names (built-in, aliases, function names, binaries on $PATH), filenames and arguments. By learning how to use `Tab`-based autocompletion, you can minimize typing errors and navigate the command line more effectively. This tutorial provides hands-on exercises for mastering autocompletion in Bash (Unix shell), particularly within SCINet HPC clusters.

{% include overviews %}


## What is command autocompletion?

Command autocompletion is a shell feature that helps users predict and complete commands, filenames, directories, tool names, and options. 
Instead of typing long commands / program names or remembering complex file paths, you can simply press `Tab` to let the shell complete the input for you.

**How Does It Work?**

1.  The shell looks at what you've typed so far.
1.  It searches for possible completions based on context.
    * If a unique match exists, it completes automatically.
    * If multiple matches exist, press `Tab` the second time and suggestions will be displayed to choose from.

<div class="process-list ul" markdown="1">

### Basic `Tab` completion

Type the beginning of a command and press `Tab` to autocomplete matching command:

{:.no-copy}
```bash
ca<Tab>   →   cat
```

Then, you can simply autocomplete filenames in the current directory:

{:.no-copy}
```bash
cat fil<Tab>   →   cat file.txt
```

It also works with relative and absolute paths:

{:.no-copy}
```bash
cd /home/$USER/D<Tab>   →   cd /home/$USER/Documents
```


### Handling multiple matches `TabTab`

If multiple matches exist, press `Tab` twice to list possibilities:

{:.no-copy}
```bash
cd D<Tab><Tab>
# Desktop/  Documents/  Downloads/
```
Use more characters *(e.g., `Do`, `Dow`)* to indicate your selection and press `Tab` again for autocompletion.

![autocompletion multi match]({{ images_path }}/autocomplete/autocompletion_multi_match.png)


### Complete tool names from $PATH

Bash searches for commands (executable tools) in directories listed in `$PATH`:
```bash
echo $PATH
```
If a binary of a desired tool is in $PATH, pressing `Tab` completes it:

{:.no-copy}
```bash
pyt<Tab>  →  python3
```

{% include alert class="tip" content="To make a custom-installed tool available in the command line by its name, you must ensure its directory is included in the `$PATH` environment variable.  

For example, if the tool is installed in `~/software/`, you can add it to `$PATH` by adding the following line to your `~/.bashrc`:
```bash
export PATH=\"$HOME/software:$PATH\"
```  

For more information on persisting your configurations, see the [Shell configuration persistence tutorial](../configuration/persistence/)" %}



### Complete command options


Bash's built-in tab completion does not automatically suggest flags or options (like `--all`, `--help`) unless bash-completion is installed. 
This advanced flag/option completion for commands like `ls`, `tar`, `git`, etc., is enabled by default on Atlas but not on Ceres cluster.  

You can check if `bash-completion` is installed by running:
```bash
type _init_completion
```


When bash-completion is enabled, many commands support autocompletion for flags and options.  
Try this feature by typing `ls --` and pres `Tab` twice:

{:.no-copy}
```bash
ls --<Tab><Tab>  
```
![autocompletion for command options]({{ images_path }}/autocomplete/autocompletion_options.png)

If you know the beginning of the option name, type one letter or more to narrow down the match. Pres `Tab` twice:

{:.no-copy}
```bash
ls --h<Tab><Tab>  
```

![autocompletion narrow match]({{ images_path }}/autocomplete/autocompletion_narrow_match.png)



#### Completing options works for some external tools

Some external tools support their options and subcommands to be completed with the `Tab` key. 
This works because they have predefined completion scripts integrated into Bash (usually provided by the `bash-completion` package).

For example, when using `git`:
{:.no-copy}
```bash
git chec<Tab>   →   checkout   # unique match completed with a single Tab
git st<Tab><Tab>  →   stage    stash    status      # list of matches displayed with Tab pressed twice
```
![autocompletion of tool options]({{ images_path }}/autocomplete/autocompletion_tool_options.png)

Besides `git`, many CLI-based tools support option autocompletion, including `ssh`, `module`, `awk`.
</div>

## Autocompletion for your own scripts

You can also define custom autocompletion for your own scripts. This is particularly useful when working with frequently used scripts that accept specific arguments. 
It will also remind you of valid options before running the script in the distant future.


By defining custom autocompletions, you can significantly improve the efficiency of working with your scripts! 
The approaches presented in this section work consistently on both Atlas and Ceres clusters, as they rely on built-in Bash features and standard environment configurations.


This is possible by leveraging a few built-in commands in a Bash shell:
* `compgen` to generate possible completion
* `complete` to assign them to a command
* `compopt` to fine-tune behavior

Together, they help create custom autocompletion logic, which gets triggered when pressing `Tab` while calling a script.  

These commands work natively in Bash, but their functionality can be extended with the bash-completion package 
(not covered in this tutorial), which adds predefined completions for many tools.

### Set up your Example Script

We will be using the example script `myscript.sh` for the following two sections.  

Create a new file in your working directory called `myscript.sh`.  
Copy the following and paste to the `myscript.sh` file.  
```bash
#!/bin/bash

[[ $# -eq 0 ]] && { echo "Usage: $0 {start|stop|restart|status}"; exit 1; }

case "$1" in
    start) echo "Starting the task...";;
    stop) echo "Stopping the task...";;
    restart) echo "Restarting the task...";;
    status) echo "Checking status of the task...";;
    *) echo "Invalid option: $1"; exit 1;;
esac
```
  
Make it executable, and test with a `start` option:
```bash
chmod +x myscript.sh
./myscript.sh start         # expected output: Starting the task...
```

### Write a custom completion function

Our `myscript.sh` file accepts specific arguments such as `start`, `stop`, `restart` and `status`.  
You can create a custom completion function to suggest these options when pressing `Tab`.

<div class="process-list h4" markdown="1">

#### Create an autocompletion function

1.  Define a function in a dedicated sourced script, e.g., `~/.my_tab_completion`, that provides the completion behavior:
    ```bash
    _myscript_complete() {
      local cur prev opts
      COMPREPLY=()
      cur="${COMP_WORDS[COMP_CWORD]}"         # stores the current word being typed
      prev="${COMP_WORDS[COMP_CWORD-1]}"
      opts="start stop restart status"
      
      COMPREPLY=( $(compgen -W "$opts" -- "$cur") )    # generates completions based on predefined options
      return 0
    }
    ```
1.  Source the configuration file:
    ```
    source ~/.my_tab_completion
    ```

#### Register the completion function 

To activate this autocompletion for `myscript.sh`, link the function to the script using `complete` command:
```bash
complete -r ./myscript.sh     # clears any existing completion (like _minimal) before applying your custom one              
complete -F _myscript_complete myscript.sh    # register custom completion
```
This tells Bash to call `_myscript_complete` function whenever you type `./myscript.sh` and press `Tab`.

#### Test the Autocompletion

After defining the function and registering it, test the autocompletion:  

{:.no-copy}
```bash
./myscript.sh <Tab><Tab>
```
If everything is set up correctly, `Tab` should suggest pre-defined options.  
![autocompletion for custom scripts]({{ images_path }}/autocomplete/autocompletion_custom_scripts.png)



#### Persist the setup for all future shells

To keep autocompletion active in future sessions, add these lines to your `~/.bashrc`:
```bash
# Custom autocompletion using Tab
source ~/.my_tab_completion
complete -r ./myscript.sh       # provide an absolute path to your custom script
complete -F _myscript_complete ./myscript.sh    # same here
```

`source ~/.bashrc` to apply changes in a current shell.


{% include alert class="tip" content="For more information on persisting your setup for all future shells, see the [Shell configuration persistence tutorial](../configuration/persistence/)" %}

</div>

### Define an alias to preview options

Alternatively, you can use a simple alias combined with `complete -W` to display predefined options for a custom script. 
This can be useful for quickly recalling frequently used settings without needing to remember them each time.
* Reminds you of valid options before running the script.
* Speeds up command entry with autocompletion.
* Ensures consistency, preventing forgotten arguments.

<div class="process-list h4 ul" markdown="1">

#### OPTION 1: Define an alias returning options

Create an alias for `myscript.sh` to quickly recall common options:
```bash
alias myscript_opts='echo "start stop restart status"'
```
Now, running `myscript_opts` will print: *start stop restart status*.

![autocompletion options stored in the alias]({{ images_path }}/autocomplete/autocompletion_options_in_alias.png)

This is useful for quickly listing valid options before running the actual command. It requires that you manually create an alias with available options once.



Following our example, if a project required frequent status checks in the analysis, we could create an alias to always run a script in the correct configuration:
```bash
alias myscript_status='./myscript.sh status'    # simple example
```
This approach is even more useful for scripts that require multiple parameters. Suppose you have an analysis script that takes specific arguments:
```bash
alias analysis_for_projectX='./analysis_script.sh --mode strict --threshold 0.05'    # more advanced settings, specific to a project 
```
This ensures repeatability in your workflow, helps retain the exact settings used in past analyses, and prevents errors when revisiting a project after a long time.


#### OPTION 2: Define an alias filtering options with `Tab`

To allow `Tab` autocompletion for an alias storing the options:
```bash
complete -W "start stop restart status" myscript
```
Now, after typing `myscript` and pressing `Tab` twice, you will see all options suggested: *start stop restart status*.  
You can always narrow down options using the filtering based on matched pattern.

![autocompletion: preview options using an alias]({{ images_path }}/autocomplete/autocompletion_preview_options_alias.png)

{% include alert class="warning" content="This alias does not execute the actual script. It only provides informational autocompletion, meaning you can see and filter options with `Tab`.  

To execute the script with the selected option, use the correct script name (e.g., `./myscript.sh start`)." %}

</div>