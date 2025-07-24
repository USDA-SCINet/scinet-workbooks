---

title: "Shell configuration files (startup scripts)"
description: "Advanced customization of shell environment settings with environment variables, aliases, and functions during shell startup."
type: lesson module
order: 7
tags: [unix, customization, bashrc]
author: Aleksandra Badaczewska

objectives:
  - Understand the role of `.bashrc` in the shell startup process and how it affects your session.
  - Learn to define permanent aliases, environment variables and functions to streamline repetitive tasks.
  - Automate software environment setup and module loading for seamless HPC workflows.
  - Implement best practices to keep `.bashrc` efficient and avoid common pitfalls.
applications:
  - "**Shell customization for productivity:** Define aliases, environment variables and functions to enhance efficiency."
  - "**Automated environment setup:** Load software modules and set variables automatically on session startup."
  - "**Persistent shell modifications:** Ensure that all customizations remain effective across different sessions."
  - "**Troubleshooting configuration issues:** Identify and fix common problems related to `.bashrc` setups."
terms:
  - term: Bash shell
    definition: A popular shell environment (command interpreter) available on most Unix-like and HPC systems.
  - term: Configuration file
    definition: Text file like `.bashrc` or `.bash_profile` that define environment variables and other shell settings.
  - term: Module system
    definition: The `module` command used in HPC clusters to load software environments.

overview: [objectives, applications, terminology]

##setup: [intro]
---

## Overview

This tutorial offers a comprehensive, hands-on guide to customizing shell environments using the `.bashrc` configuration file. The focus is on real-world applications that make daily tasks on SCINet HPC clusters more efficient and user-friendly. From persisting aliases to configuring environment variables for installed software, this tutorial provides practical techniques for optimizing and automating your HPC settings on shell startup.

The tutorial is designed for regular users without administrative privileges.

{% include overviews %}


## Getting Started

To complete this tutorial, you will need to launch the shell on SCINet. If you are unsure how to do this, please refer to [Getting Started with SCINet Workbooks](/about/use#using-the-shell) for instructions.  


## Working with .bashrc

The `.bashrc` file is a user-specific shell startup script that automatically executes when opening a new interactive shell session. 
It allows users to customize their command-line environment, automate frequently performed tasks and define personalized configurations without requiring administrative privileges.  By leveraging this startup script, you can create a highly efficient and personalized CLI environment that works seamlessly across sessions.

By editing `.bashrc`, users can:  
  * Set environment variables (e.g., `PATH`, `EDITOR`)  
  * Create aliases for quicker command execution  
  * Define shell functions to automate repetitive tasks  
  * Load modules and software automatically  
  * Configure shell behavior for an optimized workflow, for example: 
      * Set never ending history to track all past commands across sessions.  
      * Optimize apptainer usage by setting up paths and default bind mounts.  
      * Set default text editor for system-wide consistency.  


`.bashrc` is executed every time you start an interactive shell that is not a login shell.
  * **interactive shell:** A shell session where you type commands manually 
    *(e.g., opening a terminal, opening SCINet shell access via OOD, starting Bash in an existing session).*
  * **non-interactive shell:** A shell session used for executing scripts 
    *(e.g., running a job script on HPC)*.

<div class="usa-accordion" markdown="1">
{% include accordion title=".bashrc vs. .bash_profile" class="note" controls="bash-profile-acc" icon=true %}
<div id="bash-profile-acc" class="accordion_content" hidden markdown='1'>

In Unix-like systems, multiple configuration files control shell behavior, but they serve different purposes. 
Understanding their differences helps in properly managing startup scripts on HPC systems.

{% include table caption="Configuration file differences" content="| file              | When does it run? | purpose |
| --                 | --               | --       |
| `~/.bashrc`       | every time an interactive, non-login shell starts | configures the shell environment (aliases, functions, prompt, etc.)   |
| `~/.bash_profile` | only on login shell sessions (e.g., SSH login)    | runs once per session, used to set up environment variables |
| `~/.profile`      | only on login shell sessions, but applies to multiple shells (not just Bash) | similar to `.bash_profile`, but used by shells like `sh`, `dash` |" %}

Since `.bash_profile` runs only in login shells, it’s common to include `.bashrc` inside `.bash_profile` to apply customized user settings in all shell sessions.  
This ensures that when you log in via SSH, `.bashrc` settings are also loaded automatically (so, no need for separate in-shell sourcing).
```bash
# inside ~/.bash_profile
if [ -f ~/.bashrc ]; then
    source ~/.bashrc
fi
```

</div>
</div>

Customizing `.bashrc` requires careful editing to avoid errors that might disrupt your shell environment. 

{% include alert class="emergency" title="Proceed carefully" content="**SCINet HPC clusters provide a default `.bashrc` for every user - modifying it carefully ensures system-wide settings remain intact.**  

**Before making changes, always create a backup to restore previous settings if needed.**" %}

<div class="process-list" markdown="1">

### Locating .bashrc

The `.bashrc` file is stored in your home directory (shortcuted with `~`) and can be accessed on a path:
```bash
~/.bashrc
```

To check if it exists, use:
```bash
ls -la ~/.bashrc
```

If the file is missing, you can create one using:
```bash
touch ~/.bashrc
```

### Backing up configuration files

Before making changes, always create a backup to restore previous settings if needed:
```bash
cp ~/.bashrc ~/.bashrc.backup      # Copy current .bashrc as a backup with a new filename
```

If an error occurs, you can restore the backup with:
```bash
cp ~/.bashrc.backup ~/.bashrc && source ~/.bashrc
```

<div class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">

Consider using version control (`git`) to track changes over time:
```bash
git init ~/bashrc_backup
cp ~/.bashrc ~/bashrc_backup/
cd ~/bashrc_backup
git add .bashrc
git commit -m "Initial backup of .bashrc"
```

</div> </div>


### Editing

Use a command-line text editor like nano or vim to modify `.bashrc`:
```bash
nano ~/.bashrc       # easy-to-use text editor
```
or
```bash
vim ~/.bashrc        # advanced editor (if you're comfortable with Vim)
```


### Applying changes 

After modifying `.bashrc`, you can apply the changes immediately without starting a new terminal:
```bash
source ~/.bashrc
```

Alternatively, you can restart your shell by closing and reopening the terminal.

When to use `source ~/.bashrc`?
  * If you added aliases, functions or variable exports and want to apply them in a curent session.
  * Useful for testing small changes without opening a new session.

When to restart the shell?
  * If the changes involve `PATH` modifications or environment variables, a fresh session ensures they are applied consistently.

### Restoring from backup

If something breaks, open a new shell and revert `~/.bashrc` from your backup or create a new one and copy-paste the [default `.bashrc` content](./startup-scripts).


</div>

## Shell customization in .bashrc

Customizing your shell settings through `~/.bashrc` allows you to create a more efficient, user-friendly and automated by default command-line experience. 
By defining variables, aliases, shell functions, and modifying system paths, you can significantly speed up your daily routine and repetitive tasks on SCINet clusters.

<div class="process-list ul" markdown="1">

### Setting environment and shell variables

To make a variable available globally across all processes, use `export`. 
  * **SYNTAX:** `export VAR_NAME=value`

Add `export` statments to `.bashrc` to persist them across sessions.
```bash
# paste these lines into your ~/.bashrc 
export EDITOR=nano   # Set default text editor to nano
export MY_PROJECT_DIR=/projects/<scinet-project>/$USER    # Define project directory variable
```
*`source ~/.bashrc` or open a new shell to have changes applied.*

{% include alert class="tip" content="For an in-depth tutorial on variables, see [Using environment and shell variables](./variables)" %}

### Modifying $PATH for local binaries


The `$PATH` variable determines where the shell looks for executable programs when you type a command. 
Appending directories to `$PATH` allows you to run programs from custom locations using directly its name, without specifying full paths. 
To add a new directory (`/your/custom/path`) to your `$PATH`, ensure that each path is separated by a colon (`:`), as shown below:
```bash
export PATH="$HOME/bin:/your/custom/path:$PATH"
```
`$HOME/bin` is a commonly used directory for user scripts and binaries, but you can add a path (`/your/custom/path`) to any custom directory with executables to make them directly accessible in the command line.
* `:$PATH` at the end, ensures existing directories remain in the search path and the new ones are appended.


#### Adding ~/bin to $PATH 

If you have custom software in `~/bin`, adding it to `$PATH` lets you run it from anywhere without specifying its full path.
```bash
# paste these lines into your ~/.bashrc 
export PATH=$HOME/bin:$PATH
```
*`source ~/.bashrc` or open a new shell to have changes applied.*

Verify changes using:
```bash
echo $PATH
```

### Defining useful aliases




Aliases allow you to create shortcuts for frequently used commands, reducing typing and preventing errors.
Add `alias` statments to `~/.bashrc` or dedicated `~/.aliases` file to persist them across sessions.

For example:
* Defining an alias for a long command
  ```bash
  # paste these lines into your ~/.bashrc 
  alias ll='ls -lah --color=auto'     # List files with details and color output
  ```
* Alias for checking job status
  ```bash
  # paste these lines into your ~/.bashrc 
  alias myjobs='squeue -u $USER'      # Show only your running jobs
  ```
*`source ~/.bashrc` or open a new shell to have changes applied.*

{% include alert class="tip" content="For an in-depth tutorial on aliases, see [Alias definition and usage](./aliases)" %}

### Creating simple shell functions

Shell functions group multiple commands into a single callable function, making repetitive tasks more efficient.

Add `function` definitions to `~/.bashrc` or dedicated `~/.functions.sh` file to persist them across sessions.

For example:
* Function for quick directory creation & navigation
  ```bash
  # paste these lines into your ~/.bashrc 
  mkcd() { mkdir -p "$1" && cd "$1"; }        # Instead of typing `mkdir newdir && cd newdir` every time
  # usage: mkcd newdir
  ```
* Function for batch file renaming
  ```bash
  # paste these lines into your ~/.bashrc 
  rename_to_backup() {
      for file in *.txt; do
          mv "$file" "${file%.txt}.backup"
      done
  }
  ```
*`source ~/.bashrc` or open a new shell to have changes applied.*

{% include alert class="tip" content="For an in-depth tutorial on functions, see [Shell Functions](./functions)" %}

### Enhancing shell usability 

Optimizing your shell experience goes beyond just defining aliases and functions. By customizing tab completion, 
command history, and formatting to suit your workflow, you can work more efficiently in interactive sessions on SCINet HPC clusters. 
This section covers tweaks that can enhance usability, reduce repetitive typing, and beautify the text outputs in a shell. 

<div class="usa-accordion">

{% include accordion title="Improve tab completion" controls="tab-completion" class="outline" %}
<div id="tab-completion" class="accordion_content"   markdown='1' hidden>

Tab completion is a powerful feature that helps you auto-complete file names, directories and commands with the `Tab` key. 

If you include the following in your `.bashrc` file, instead of typing `cd myfolder` you can simply type `myfolder` and press `Enter`.

```bash
shopt -s autocd         # Change directories by typing their name without `cd`  
```

</div>

{% include accordion title="Enable command auto-correction" controls="auto-correction" class="outline" %}
<div id="auto-correction" class="accordion_content"   markdown='1' hidden>

To make navigation easier, you can enable automatic correction for minor typos when changing directories.
```bash
shopt -s cdspell        # Correct minor directory name typos automatically
```

</div>

{% include accordion title="Automatically adjust window size" controls="window-size" class="outline" %}
<div id="window-size" class="accordion_content"   markdown='1' hidden>

The following setting ensures the terminal updates its display correctly after resizing, preventing visual glitches when working in SSH sessions or with resizable terminal windows.
```bash
shopt -s checkwinsize   # Automatically adjust window size after resizing terminal  
```

</div>


{% include accordion title="Enhance command history" controls="history" class="outline" %}
<div id="history" class="accordion_content"   markdown='1' hidden>

The shell's history feature allows you to revisit and reuse previously typed commands, making it a crucial tool for productivity. 

By default, Bash limits the number of commands stored in history. 
However, on HPC systems, keeping an extensive persistent command history can be helpful for tracking past jobs, debugging commands, and reusing complex workflows.

By optimizing history settings, you can track past commands across sessions and keep a copy of never-ending history.

```bash
export HISTFILESIZE=    # no limit on the number of commands stored in history file  
export HISTSIZE=        # no limit on the number of commands stored in memory  
export HISTFILE=~/.bash_eternal_history  # use a dedicated history file  
export HISTTIMEFORMAT="[%F %T] " 
export HISTCONTROL=ignoredups:erasedups  # remove duplicate entries  
shopt -s histappend                      # append history instead of overwriting it  
export PROMPT_COMMAND="${PROMPT_COMMAND:+$PROMPT_COMMAND$'\n'}history -a; history -c; history -r"
```

This is useful when working with multiple terminals to keep the command history synchronized across sessions.

  * Large history storage ensures you can retrieve commands from previous sessions, making it easier to reuse complex commands.
  * `ignoredups:erasedups` prevents duplicate entries (e.g., running `ls` multiple times won't clutter your history).
  * `histappend` ensures that new commands are added to history instead of replacing the previous session's history, preserving command history between multiple terminal windows.
  * `PROMPT_COMMAND` is a special Bash variable that runs a command before displaying each prompt. <br>The syntax used ensures that every time a new prompt is displayed:  
      * `history -a` : The command history is saved to the history file (`~/.bash_history`).  
      * `history -c` : The in-memory history is cleared.  
      * `history -r` : The latest history is reloaded from the file (`~/.bash_history`).

</div>

{% include accordion title="Set default text editor" controls="text-editor" class="outline" %}
<div id="text-editor" class="accordion_content"   markdown='1' hidden>

Many programs, such as `git` or `visudo`, rely on a default text editor when opening files. 
* If `EDITOR` variable is not set, some applications might default to `vi`, which may not be user-friendly for everyone.

Setting the `EDITOR` variable ensures consistency across applications.

```bash
export EDITOR=nano  # Use nano (or replace with vim/emacs)  
```

</div>

{% include accordion title="Improve `less` and `grep` formatting" controls="less-grep" class="outline" %}
<div id="less-grep" class="accordion_content"   markdown='1' hidden>

By tweaking settings for commonly used commands like `less` and `grep`, you make output more readable and visually distinct.
* Highlights matching text in selected color, making it easier to locate search results in long log files.
* Improves readability when scrolling through formatted log files and command outputs.

**Enable Color Output for `grep`**  
```bash
export GREP_OPTIONS='--color=auto'  # Enable colored output  
export GREP_COLOR='1;32'            # Set color to bright green  
```
  
**Optimize `less` for better navigation**  
```bash
export LESS='-R'                    # Enable raw control characters for color output  
```

</div>
</div>


</div>

## Manage software accessibility

SCINet HPC environments include a wide range of [pre-installed software](https://scinet.usda.gov/guides/software/), but most applications are located outside the space dedicated for individual users. 
Instead, software is managed through environment modules, allowing users to load, unload, and switch between different versions of programs seamlessly.

<div class="process-list ul" markdown="1">

### Environment modules on SCINet

HPC systems typically use module systems to dynamically configure the software environment. 
Instead of manually setting environment variables, users can load specific software versions with the `module` command.

#### Automatically loading frequently used modules

If you frequently use specific software, you can ensure it loads automatically when you start a new session by adding the following command to your `~/.bashrc` file:
```bash
module load python_3/3.9.18 gcc/12.2.0              # specify your desired modules
```
This ensures that Python 3.9 and GCC 12.2 are always available without needing to manually load them each time you log in.

<div class="highlighted highlighted--warning ">
<div class="highlighted__body" markdown="1">

On Ceres Cluster, the `module` command is only available on compute nodes, meaning it cannot be used directly on the login or transfer node.  
To prevent errors when sourcing `~/.bashrc`, you should conditionally load modules only when on a compute node.  
You can add conditional `module` loading in your `.bashrc` like this:  
```bash
if [[ $(hostname) =~ "compute" ]]; then
    module load python_3/3.9.18 gcc/12.2.0
fi
```

</div></div>


### Custom user installations

While HPC clusters provide many pre-installed software packages via the [module system](#environment-modules-on-scinet), you may need to install and manage your own software, 
particularly if a required package is missing or you need a specific version. Since regular users do not have root access, 
software must be installed in `/home` directories or allocated storage locations (`/project/<scinet-project>/$USER/SOFTWARE`). 

To make custom installations accessible, you need to properly configure environment variables such as <br> `PATH` and `LD_LIBRARY_PATH`.


#### Setting `PATH` for locally installed software

If you install software in a local directory (e.g., `$HOME/software`), you must update your `PATH` so that the system can locate and execute these programs.
```bash
export PATH=$HOME/software/bin:$PATH            # the executable is typically stored in a bin subdirectory of installed software
```
This adds `~/software/bin` to the system's search path for executables, ensuring that binaries in this directory can be run without specifying their full path.


#### Setting `LD_LIBRARY_PATH` for custom library locations

Some software depends on custom-built libraries stored outside standard system locations. <br>(e.g., `/usr/local/bin:/usr/bin:/usr/local/sbin:/usr/sbin:/usr/local/cuda/bin:/usr/local/cuda/lib64`) <br>
If an application complains about missing shared libraries (`.so` files), you need to extend `LD_LIBRARY_PATH`:

```bash
export LD_LIBRARY_PATH=$HOME/software/lib:$LD_LIBRARY_PATH
```
This ensures that shared libraries in `~/software/lib` are found by programs that need them.

<div class="highlighted highlighted--warning ">
<div class="highlighted__body" markdown="1">

Modifying `LD_LIBRARY_PATH` incorrectly can cause system applications to behave unexpectedly.  
Always append a new value using colon syntax (`:`$LD_LIBRARY_PATH) rather than overwrite the variable.

To check whether the correct library path is set, use:
```bash
echo $LD_LIBRARY_PATH
# or
ldd /path/to/binary         # Lists the shared libraries used by a program
```
</div></div>


### Customize SLURM tasks

In high-performance computing (HPC) environments, job scheduling with SLURM is essential for efficiently managing computational workloads. 
Customizing SLURM-related settings in your `~/.bashrc` file can streamline job submissions, optimize resource allocation and simplify the starting of an interactive session on a compute node. 

To get started with custom configurations, check out:
- **[Practical Aliases for HPC](./aliases#practical-aliases-for-hpc)** provided in the Aliases tutorial, including:
  - Load module and check module list:
    ```bash
    alias load_python='module load python_3 && module list'
    # usage: load_python
    ```
  - Check names of available partitions:
    ```bash
    alias show_partitions='scontrol show partitions | grep "PartitionName"'
    # usage: show_partitions
    ```
  - Interactive session request:
    ```bash
    alias get_interactive='salloc -N1 -n1 -t 1:00:00 -A <scinet-account>'
    # usage: get_interactive
    ```
  - Monitor resource usage on a current node:
    ```bash
    alias node_usage='top -b -n1 | head -n 20'
    # usage: node_usage
    ```

- **[Practical Shell Functions](./functions#practical-shell-functions-for-hpc)** provided in the Functions tutorial, including:
  - [Check quota on any SCINet cluster](./functions#practical-shell-2)
  - [Quick stats on queued jobs](./functions#practical-shell-3)
  - [GPU resources check](./functions#practical-shell-6)
  - [CPU and memory on a node](./functions#practical-shell-7)

These resources offer ready-to-use shortcuts and functions that streamline job management, making your HPC workflow more efficient right from the start.

Here, you'll find a few more practical examples to further streamline your daily work with SLURM tasks, helping you save time and manage jobs more efficiently.


#### Quick SLURM job submission for any script


Any Bash script (`.sh`) can be submitted with sbatch, even if it does not contain #SBATCH directives inside the script itself. 
Instead of embedding `#SLURM` directives in the script, you can specify all SLURM options directly in the command line when submitting the job.  

If a script does contain #SBATCH directives and you also specify options in the `sbatch` command, the command-line options override the ones in the script.

Since SLURM allows submitting any `.sh` script using sbatch with command-line options, it's useful to create a shell function with predefined settings (or a few customizable via arguments). 
This enables quick submission of test jobs for any script, saving time and effort when working in an HPC environment.

```bash
# Replace <your_account> with your actual scinet account
function sbatch_quick {
    sbatch --account=<your_account> --nodes=1 --ntasks=4 --time=01:00:00 "$1"
}
# usage: sbatch_quick my_script.sh
```

![function sbatch_quick](./assets/img/function/function_sbatch_quick.png)

#### Quick SLURM job submission with custom request for memory, CPU and partition

This version allows users to specify memory (in GB) CPU cores and partition as arguments to enable more flexible applications:
```bash
# Replace <your_account> with your actual scinet account
function sbatch_flex {
    local script="$1"        # script to run
    local cores="${2:-2}"    # default: 2 cores
    local queue="${3}"       # optional: user-selected partition
    local mem="${4:-4G}"     # default: 4GB


    if [[ -z "$script" ]]; then
        echo "Usage: sbatch_flex <script> <cores> <queue> <mem>"
        return 1
    fi
    
    if [[ -z "$queue" ]]; then
        case "$HOSTNAME" in
            *atlas*) queue="atlas" ;;  # if $HOSTNAME is Atlas cluster, sets "atlas" partition as default
            *ceres*) queue="short" ;;  # if $HOSTNAME is Ceres cluster, ses "short" partition as default
        esac
    fi

    sbatch --account=<your_account> --time=02:00:00 --ntasks="$cores" --partition="$queue" --mem="$mem" "$script"
}
# usage:  sbatch_flex my_script.sh                # default cores and memory
# usage:  sbatch_flex my_script.sh 4              # request 4 cores for this job
# usage:  sbatch_flex my_script.sh 2 development  # specify cores and preferred partition
# usage:  sbatch_flex my_script.sh 8 bigmem 8G    # specify all prior arguments to request custom memory
```

![function sbatch_flex_submit](./assets/img/function/function_sbatch_flex_submit.png)

<div class="highlighted highlighted--note ">
<div class="highlighted__body" markdown="1">
It's best to order arguments from most essential to least frequently changed. This improves usability by making the function intuitive while reducing unnecessary typing for common cases.
- **required arguments**, always needed for the function to work *(e.g., script name in sbatch_flex)*
- **frequently altered arguments**, often modified based on job requirements *(e.g., CPU cores, partition)*
- **rarely changed arguments**, defaults are usually sufficient, but customization is still possible *(e.g., timewall, memory)*
- **fixed values**, the default determined will always be used *(e.g., `<scinet-account>`)*
</div></div>

</div>

## Advanced .bashrc configurations

Beyond basic aliases and functions, `~/.bashrc` can be tailored for adaptive behavior based on system conditions such as hostname, user, or shell type. 
This allows for smarter resource usage, conditional command execution and dynamic environment adjustments.

Below are a few practical examples of advanced `~/.bashrc` configurations to optimize efficiency and flexibility in an HPC environment.

<div class="process-list ul" markdown="1">

###  Conditional execution

<div class="highlighted highlighted--info ">
<div class="highlighted__body" markdown="1">
***Quick recap:*** <br>
Conditional execution in Bash allows scripts to make decisions based on conditions like the hostname, user or environment variables, enabling more dynamic and efficient behavior.

For a deeper dive into practical use cases, check out [Conditionals and loops](./functions#conditionals-and-loops) section in the tutorial about Shell Functions.
</div> </div>

#### Distinguishing between interactive and non-interactive shells

Some commands (e.g., prompts, aliases) are only needed for interactive shells, while non-interactive shells (e.g., batch jobs submitted via sbatch) should avoid unnecessary processing.

```bash
case $- in
  *i*) echo "Interactive shell detected";;
  *) return ;;      # exit early for non-interactive shells
esac
```
- `$-` contains shell flags, where `i` indicates an interactive shell.

If the shell is interactive, it prints a message but can be enhanced to load any interactive-specific settings required by your tasks. If not interactive (e.g., running in batch mode), it exits early, skipping unnecessary commands.

![conditional interactive shell](./assets/img/conditional_interactive_shell.png)

<div class="highlighted highlighted--info ">
<div class="highlighted__body" markdown="1">

To use this snippet effectively, place it in your `~/.bashrc` before executing commands that should only run in an interactive shell. 
You can use it standalone to load modules, set up environment variables or call functions conditionally, 
ensuring that non-interactive shells (such as SLURM batch jobs) skip unnecessary processing.
</div> </div> 

<div class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">

To ensure that certain configurations or commands only run in batch jobs (non-interactive shells), you can use the opposite logic of the interactive shell check. 
This is particularly useful for loading specific modules, setting environment variables (e.g., software/library paths) or configuring SLURM-specific settings only when running a batch job.
```bash
case $- in
  *i*) ;;  # Do nothing for interactive shells; adjust accordingly
  *)
    echo "Batch job detected"
    module load python/3.12.5        # load python module only for batch jobs
    export PYTHONPATH="/path/to/custom/python/modules:$PYTHONPATH"  # set custom Python path
    ;;
esac
```

Batch jobs automatically load Python and set PYTHONPATH, ensuring the correct environment is available.
</div> </div>


#### Prevent running scripts in certain cases

Sometimes, you might want to avoid running scripts on login nodes or specific hosts.

```bash
if [[ "$HOSTNAME" =~ login ]]; then
    echo "Skipping resource-heavy commands on login node"
else
    my_heavy_command          # runs only if NOT on the login node
fi
```
Prevents resource-intensive scripts from running on login nodes, ensuring compliance with HPC policies.

![conditional hostname](./assets/img/conditional_hostname.png)

### Lazy-loading: avoid heavy setup

Loading software modules every time the shell starts can slow down login times and consume resources, especially in HPC environments. 
A more efficient approach is lazy-loading, where modules are loaded only when needed. This can be done using a function or alias, ensuring that the module is initialized on demand rather than at every session start.
```bash
function load_python {
    module load python/3.12.5
}
alias pyload=load_python
```
Now, instead of loading Python automatically at login, you can simply run this in a shell or script when needed:
```bash
pyload         # loads Python on request
```
This method keeps your shell lightweight and responsive while still allowing quick access to essential modules when needed.

### Unified setup for Atlas & Ceres

When working across multiple clusters (e.g., Atlas & Ceres), differences in environment paths, modules or project directories can cause inconsistencies. 
Setting environment variables dynamically based on the `hostname` ensures a seamless transition between systems while using the same functions or entire configuration files.


```bash
case "$HOSTNAME" in
    *atlas*) export MY_PROJECT_DIR=/project/<scinet-account>/$USER/my_custom_path_1 ;;
    *ceres*) export MY_PROJECT_DIR=/project/<scinet-account>/$USER/my_custom_path_2 ;;
    *) export MY_PROJECT_DIR=~ ;;
esac
```
This adjusts the MY_PROJECT_DIR path dynamically based on the cluster hostname.

### Experiment and refine setups

Customizing `~/.bashrc` is an iterative process — it's good practice to test and refine changes before making them permanent.

#### Safe testing in a temporary shell

Instead of modifying ~/.bashrc directly and risking shell issues, create a separate script (e.g., `~/.bashrc-test`)`, introduce your changes there, and test them in a subshell before applying them permanently. 
```bash
bash --rcfile ~/.bashrc-test
```
*This runs a new Bash instance with the test file. Once you `exit`, all changes are gone, leaving your original shell unchanged.*

</div>

## Troubleshooting common issues

A well-configured .bashrc can significantly improve productivity in an HPC environment, but misconfigurations can lead to login issues, broken environments or unexpected behavior. 
This section covers error detection, organization tips, common mistakes and best practices to help keep your setup clean and reliable.

### Common mistakes

- Overwriting `$PATH` and `LD_LIBRARY_PATH` instead of [appending](#modifying-path-for-local-binaries)
- Forgetting to [make changes take effect](#applying-changes)
- Infinite Loops due to sourcing `~/.bashrc` inside itself
  - **NOTE:** Running `source ~/.bashrc` inside `.bashrc` creates an infinite recursion, causing the shell to hang.

### Best practices

#### Check for errors

Before applying changes to .bashrc, it's crucial to check for syntax errors to avoid breaking your shell.

*To check for syntax errors without executing the file, run:*
```bash
bash -n ~/.bashrc           # syntax check
```
*This ensures there are no typos, misplaced quotes or missing brackets. If errors exist, they will be reported without applying the changes.*

*To track where a script is failing, enable debug mode:*
```bash
bash -x ~/.bashrc
```
*This prints each command before execution, helping identify where .bashrc is failing.*

#### Keep .bashrc clean & modular

A cluttered `~/.bashrc` can slow down shell startup and make maintenance difficult. The best approach is to modularize configurations by splitting them into separate files.

Instead of filling `~/.bashrc` with aliases, functions and environment variables, load them in your .bashrc from separate files:
```bash
[[ -f ~/.aliases.sh ]] && source ~/.aliases.sh
[[ -f ~/.functions.sh ]] && source ~/.functions.sh
[[ -f ~/.env_variables.sh ]] && source ~/.env_variables.sh    # user-defined environment variables such as paths
```
*This keeps .bashrc minimal and easy to manage, while allowing quick modifications without affecting the entire configuration.*

For HPC environments, it's useful to separate SLURM-related settings:
```bash
[[ -f ~/.my_slurm.sh ]] && source ~/.my_slurm.sh
```