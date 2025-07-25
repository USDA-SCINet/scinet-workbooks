---
title: Shell configuration persistance
description: "Persisting your custom shell configuration with scripts."
order: 7
index: 3
type: lesson module

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

This tutorial offers a comprehensive, hands-on guide to persisting your customized shell environments. The focus is on real-world applications that make daily tasks on SCINet HPC clusters more efficient and user-friendly. From persisting aliases to configuring environment variables for installed software, this tutorial provides practical techniques for optimizing and automating your HPC settings.

{% include overviews folder=1 %}

## Getting Started

To complete this tutorial, you will need to launch the shell on SCINet. If you are unsure how to do this, please refer to [Getting Started with SCINet Workbooks](/about/use#using-the-shell) for instructions.  


## Loading configurations from a file

When working on multiple HPC projects, maintaining a clean and organized environment is essential. 

Instead of cluttering your `~/.bashrc` with all permanent functions, a project-specific approach allows you to load only the functions you need for a given project. 

This keeps your environment lightweight and prevents unnecessary function definitions from overwhelming your shell session.

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">

When working with complex scripts or multiple reusable functions, it's best to organize them into separate files and load them into your session dynamically.
</div>
</div>

### Organizing functions by project

A better approach than defining all functions in `.bashrc` is to store them in separate function files per project and load them dynamically when needed.

For example, create a `bin` directory (if not present) and add a functions file for each project separately:
```
~/bin/
│── functions_projectA.sh
│── functions_projectB.sh
│── functions_projectC.sh
```

1. Create a new function file for your project.
2. Define reusable functions inside the file. *Save the file and exit edition mode.*
3. Manually load functions for a project when needed.
```bash
source ~/bin/functions_projectA.sh
```
Now, all functions defined in the sourced file are available in your current shell.

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
<h4 class="highlighted__heading">Why Use a Project-Specific Approach?</h4>

{:.fancy-ul}
* **Avoids clutter:** Your `.bashrc` remains clean, keeping only essential configurations.
* **Improves maintainability:** Functions are grouped by project, making them easy to manage.
* **Prevents function overload:**  You only load what you need, avoiding unnecessary commands in your environment.
* **Supports multiple projects:** Easily switch between different function sets as required.

By following this modular and project-specific approach, you keep your HPC work organized, scalable and efficient while ensuring that functions remain relevant and manageable across different projects.
</div>
</div>

## Customizing bashrc

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

If something breaks, open a new shell and revert `~/.bashrc` from your backup or create a new one and copy-paste the [default `.bashrc` content](./default-scripts).


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