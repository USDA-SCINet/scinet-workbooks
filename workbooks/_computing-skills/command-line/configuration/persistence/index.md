---
title: Shell configuration persistence
description: "Persisting your custom shell configuration with scripts."
order: 7
index: 3
type: interactive tutorial

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

This tutorial offers a comprehensive, hands-on guide to persisting your customized shell environments across sessions. The focus is on real-world applications that make daily tasks on SCINet HPC clusters more efficient and user-friendly. From persisting aliases to configuring environment variables for installed software, this tutorial provides practical techniques for optimizing and automating your HPC settings.

By using customized configuration files, users can:  
  * Set environment variables (e.g., `PATH`, `EDITOR`)  
  * Create aliases for quicker command execution  
  * Define shell functions to automate repetitive tasks  
  * Load modules and software automatically  
  * Configure shell behavior for an optimized workflow 

{% include overviews folder=1 %}

## Getting Started

To complete this tutorial, you will need to launch the shell on SCINet. If you are unsure how to do this, please refer to [Getting Started with SCINet Workbooks](/about/use#using-the-shell) for instructions.  

This tutorial assumes you are familiar with [Unix basics](../../), and are comfortable with customizing your shell using [variables](../variables), [functions](../functions), and [aliases](../aliases).


**There are two main ways to persist your shell customizations:**
* [Project-specific configuration files](#project-specific-configuration-files)
  * Ideal for project-specific functions and customization
  * Needs to be loaded in every shell
* [Modifying .bashrc](#global-configuration-files-bashrc)
  * Allows for custom configurations to persist between interactive sessions.
  * Any modification must be done carefully to ensure your system-wide settings remain intact.

**Both of these methods work best with [modular configuration files](#modular-configuration-files):**
  * Keeps your main configuration files minimal and easy to manage.
  * Allows for quick modifications without affecting the entire configuration.


## Modular configuration files  

A cluttered configuration file can slow down shell startup and make maintenance difficult. The best approach is to modularize configurations by splitting them into separate files.

Instead of filling your main configuration file with aliases, functions, and environment variables, load them into it from separate files.
```bash
[[ -f ~/.aliases.sh ]] && source ~/.aliases.sh
[[ -f ~/.functions.sh ]] && source ~/.functions.sh
[[ -f ~/.env_variables.sh ]] && source ~/.env_variables.sh    # user-defined environment variables such as paths
```

This keeps your main configuration file minimal and easy to manage, while allowing quick modifications without affecting the entire configuration.


Separating out important settings, such as any custom SLURM-related settings, will make them much easier to maintain as needed.
```bash
[[ -f ~/.my_slurm.sh ]] && source ~/.my_slurm.sh
```


## Project-specific configuration files

When working on multiple HPC projects, maintaining a clean and organized environment is essential. 

Instead of cluttering your global environment with all of your persisting customizations, a project-specific approach allows you to load only the custom resources you need for a given project. 

This keeps your environment lightweight and prevents unnecessary definitions from overwhelming your shell session.

{:.fancy-ul}
* **Avoids clutter:** Your `.bashrc` remains clean, keeping only essential configurations.
* **Improves maintainability:** Functions are grouped by project, making them easy to manage.
* **Prevents function overload:**  You only load what you need, avoiding unnecessary commands in your environment.
* **Supports multiple projects:** Easily switch between different function sets as required.



For example, create a `bin` directory (if not present) and add a definitions file for each project separately:

{:.no-copy}
```
~/bin/
│── definitions_projectA.sh
│── definitions_projectB.sh
│── definitions_projectC.sh
```

Once you have defined the desired definitions (functions, aliases, variables) inside your configuration file, or loaded them into it from modular files, you can manually load your custom shell and all that is defined within it for a project when needed.
  
```bash
source ~/bin/definitions_projectA.sh
```

Now, everything defined in the sourced file is available in your current shell.


By following this project-specific approach, you keep your HPC work organized, scalable, and efficient while ensuring that your customizations remain relevant and manageable across different projects.


## Global configuration files - bashrc

The `.bashrc` file is a user-specific shell startup script that automatically executes when opening a new interactive shell session. 
It allows users to customize their command-line environment, automate frequently performed tasks and define personalized configurations without requiring administrative privileges.  By leveraging this startup script, you can create a highly efficient and personalized CLI environment that works seamlessly across sessions.


`.bashrc` is executed every time you start an interactive shell that is not a login shell.
  * **interactive shell:** A shell session where you type commands manually.  
    (e.g., opening a terminal, opening SCINet shell access via OOD, starting Bash in an existing session)
  * **non-interactive shell:** A shell session used for executing scripts.  
    (e.g., running a job script on HPC)



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

## Customizing your configuration files


### Best Practices

Regardless of the configuration files you choose to edit, there are several best practices you should follow.

<div class="process-list ul h4" markdown="1">

#### Back up configuration files

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


#### Checking for errors

Before applying changes to your configuration files, it's crucial to check for syntax errors to avoid breaking your shell.
**This is extremely important when editing .bashrc**, but if you are checking other configuration files you can replace `~./bashrc` with the path to your desired file.

* To check for syntax errors without executing the file, run:
  ```bash
  bash -n ~/.bashrc           # syntax check
  ```
  This ensures there are no typos, misplaced quotes or missing brackets. If errors exist, they will be reported without applying the changes.

* To track where a script is failing, enable debug mode:
  ```bash
  bash -x ~/.bashrc
  ```
  This prints each command before execution, helping identify where .bashrc is failing.

#### Experiment and refine setups

Customizing configuration files is an iterative process — it's good practice to test and refine changes before making them permanent.


Instead of modifying existing configuration files directly and risking shell issues, create a separate script (e.g., `~/.bashrc-test`)`, introduce your changes there, and test them in a subshell before moving them to your configuration file and applying them permanently. 

```bash
bash --rcfile ~/.bashrc-test
```
* This runs a new Bash instance with the test file. Once you `exit`, all changes are gone, leaving your original shell unchanged.

#### Use modular configuration files

Where possible, using [modular configuration files](#modular-configuration-files) allows for safer, more efficient customization.

</div>

### Editing the files

<div class="process-list ul h4" markdown="1">

#### Editing

Use a command-line text editor like nano or vim to modify your configuration file:
```bash
nano ~/.bashrc       # or ~/bin/your-project-config.sh
```
When you are finished with your edits, save the file (`CTRL + X`, then `Y`).

#### Applying changes 

After modifying your configuration files, you can apply the changes immediately without starting a new terminal:
```bash
source ~/.bashrc     # or ~/bin/your-project-config.sh
```

Alternatively, you can restart your shell by closing and reopening the terminal.

* **When to use `source <config>`?**
  * If you added aliases, functions or variable exports and want to apply them in a curent session.
  * Useful for testing small changes without opening a new session.
* **When to restart the shell?**
  * If the changes involve `PATH` modifications or environment variables, a fresh session ensures they are applied consistently.

#### Restoring from backup

If something breaks, open a new shell and revert your configuration file from your backup.  

If you are using `.bashrc`, you can create a new one and copy-paste the [default `.bashrc` content](./startup-scripts).

</div>

### Common mistakes

- Overwriting `$PATH` and `LD_LIBRARY_PATH` instead of [appending](#modifying-path-for-local-binaries)
- Forgetting to [make changes take effect](#applying-changes)
- Infinite Loops due to sourcing `~/.bashrc` inside itself
  - **NOTE:** Running `source ~/.bashrc` inside `.bashrc` creates an infinite recursion, causing the shell to hang.


## Custom configuration demo

Here we will set up a demo custom environment in your home directory.

### Demo project configuration

Ideal for project-specific functions and customization.

<div class="process-list h4" markdown="1">

#### Set up configuration files

1.  Make your directory and required files 
    ```
    mkdir -p ~/bin/configs
    touch ~/bin/demo-config.sh  ## create your main configuration file
    touch ~/bin/configs/demo-aliases.sh ~/bin/configs/demo-functions.sh ~/bin/configs/demo-variables.sh
    ```
1.  Open your main configuration file in nano 
    ```bash
    nano ~/bin/demo-config.sh
    ```
1.  Paste the following into the file:  
    ```bash
    [[ -f ~/bin/configs/demo-aliases.sh ]] && source ~/bin/configs/demo-aliases.sh
    [[ -f ~/bin/configs/demo-functions.sh ]] && source ~/bin/configs/demo-functions.sh
    [[ -f ~/bin/configs/demo-variables.sh ]] && source ~/bin/configs/demo-variables.sh
    ```
    * When you run your main config file, this code will check to make sure your indicated configuration files exist before loading them. 
1.  Save the file (CTRL + X, then Y) and load the configuration:  
    ```bash
    source ~/bin/demo-config.sh
    ```

#### Add variables to modular configuration

We can create a variable that goes to your specific project directory.

```bash
echo "export PROJECT_DIR=/90daydata/shared/$USER >> ~/bin/configs/demo-variables.sh"
source ~/bin/demo-config.sh
```

This would later be used like: 
```
cd $PROJECT_DIR
```

#### Add functions to modular configuration

If you frequently use specific software, you can ensure it loads when you load your project configuration.  
By specifying them in project-specific configuration files, you can ensure you are loading the correct software for your particular project.  

To prevent errors, you should conditionally load modules only when on a compute node.

1.  Open your function configuration file in nano
1.  Paste the following into the file  
    ```bash
    if [[ $(hostname) =~ "compute" ]]; then
      module load python_3/3.9.18 gcc/12.2.0
    fi
    ```  
  This ensures that Python 3.9 and GCC 12.2 are always available when you load your project configuration script.
1.  Save the file (CTRL + X, then Y) and load the configuration: 
    ```bash
    source ~/bin/demo-config.sh
    ```

</div>


### Demo bashrc customization

This method allows for custom configurations to persist between interactive sessions, but must be done carefully!

<div class="process-list h4" markdown="1">

#### Create a backup of your current .bashrc before personalizing:

```
cp ~/.bashrc ~/.bashrc.backup
```

#### Edit your .bashrx using a file editor

```
nano ~/.bashrc
```

#### Create an alias 

Lets create an alias that allows you to quickly check the status of all jobs submitted under your username in an HPC environment.  
By defining this as a permanent alias, you ensure that you can monitor your job submissions efficiently across multiple sessions without additional configuration.

```bash
# Aliases for job monitoring
alias my_jobs='qstat -u $USER'      # usage: my_jobs
```

Note: Documenting the purpose of your alias in comments helps with long-term maintenence and usability of your files. 

#### Add an environmental variable 

If your install software in a local directory (e.g., `$HOME/software`), you must update your `PATH` so that the system can locate and execute these programs.  The program executable is typically stored in a bin subdirectory of installed software.

```bash
export PATH=\"$HOME/software/bin:$PATH\"
```
* This adds `~/software/bin` to the system's search path for executables, ensuring that binaries in this directory 
  can be run without specifying their full path.
* It then reloads your main configuration script.

#### Apply changes to your .bashrc file

Save the file (`CTRL + X`, then `Y`) and reload the configuration:
```
source ~/.bashrc
```

#### Test your changes

```
my_jobs
```


</div>

### Useful customizations

We have compiled many useful ways you can customize your startup scripts in [Shell customization applications](./examples).