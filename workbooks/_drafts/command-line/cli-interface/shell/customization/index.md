---

title: Shell customization
description: "Configuration of the shell environment through prompt styling, color schemes, aliases and startup scripts."
type: introduction
order: 3
index: 4
tags: [UNIX, ANSI codes, prompt styling, CLI text coloring, shell customization]
packages: 
level: 4
author: Aleksandra Badaczewska

---

## Overview

Shell customization provides a flexible way to tailor your command-line environment to better suit your preferences and daily routine. In SCINet HPC environment, 
where managing complex tasks and large datasets is common, effective customization create a more efficient and user-friendly workspace. By adjusting visual elements *(such as prompts or text colors)* and automating configurations *(by creating shortcuts and custom shell variables)*, you can enhance productivity and reduce potential errors.

<div id="note-alerts-1" class="highlighted highlighted--note ">
<div class="highlighted__body" markdown="1">
Shell customization is essential for improving productivity, clarity and efficiency, especially in HPC environments where working with complex data sets, multiple jobs and parallel tasks across multi-cluster systems. Configuring settings specific for login, compute and transfer nodes improves user awareness, leading to better resource utilization and streamlined task management. 
</div>
</div>

**A well-configured shell helps you:**

**✓  Enhance Readability** <br>&emsp;  *Differentiate between standard output, errors and informational messages with text colors.* <br>

**✓  Streamline Workflow** <br>&emsp;  *Display essential information (e.g., current directory, active job status) directly in the prompt.* <br>

**✓  Increase Efficiency** <br>&emsp;  *Reduce the need for repetitive commands by adding dynamic elements like Git status or cluster information.* <br>

**✓  Prevent Errors** <br>&emsp;  *Highlight critical elements such as error messages and warnings in contrasting colors for quick identification.*


## Prerequisites 
<div class="usa-accordion">

{% include accordion title="Pre-setup for shell customization on SCINet HPC" class="warning " controls="launch-shell-1" %}
<div id="launch-shell-1" class="accordion_content" markdown="1">
1. **Access a Unix-based terminal on Atlas or Ceres using:**
  - SCINet OOD: [Web-based access to HPC CLI](/computing-skills/command-line/cli-interface/concepts/cli-scinet-hpc#web-based-access-to-hpc-cli)
  - SCINet SSH: [Command-line access to HPC CLI](/computing-skills/command-line/cli-interface/concepts/cli-scinet-hpc#command-line-access-to-hpc-cli)
<br><br>
2. **Identify the default Shell on a cluster:**
```bash
echo $SHELL
```
*On Atlas and Ceres, the default shell is typically Bash (`/bin/bash`).*
<br><br>
3. **List available shells and switch between them:** <br>
*To view all installed shells:*
```bash
cat /etc/shells
```
*To switch between common shells (sh, Zsh, Bash):*
```bash
/bin/sh
/bin/zsh
/bin/bash
```
*After each change, check the active shell again using `echo $SHELL`. Finally, activate `/bin/bash` for this exercise.*
</div>
</div>


## What can you customize in a shell?

| feature | description | tutorial |
| --      | --          | --       |
| **Prompt** | Modify the shell prompt to display dynamic information like the current directory, user and active Git branches. Add colors and symbols for better visibility. | [Prompt styling basics](/computing-skills/command-line/cli-interface/shell/customization/prompt) |
| **Shell text coloring** | Apply ANSI escape codes to style terminal text. Highlight important information such as errors and warnings. | [Terminal text colorig](/computing-skills/command-line/cli-interface/shell/customization/coloring) |

Beyond text coloring and prompt styling, you can also customize other shell components:

| feature | description | tutorial |
| --      | --          | --       |
| Command Aliases | Create shortcuts for frequently used commands (e.g., `alias ll='ls -la'`). | [Alias definition and usage](/computing-skills/command-line/cli-interface/shell/customization/aliases) |
| Shell Functions | Define reusable functions to simplify complex or repetitive command sequences within the shell. Functions provide greater flexibility than aliases by allowing arguments. | [Shell function definition and usage](/computing-skills/command-line/cli-interface/shell/customization/functions) |
| Shell History | Modify history size and learn how to efficiently browse and search command history. | [Command history](/computing-skills/command-line/cli-interface/shell/commands/history) |
| Auto-completion | Enable and configure auto-completion for commands and filenames, reducing typing errors and speeding up command execution. | [Command autocompletion](/computing-skills/command-line/cli-interface/shell/commands/autocompletion) |
| Environment Variables | Adjust the behavior of commands and tools by setting variables like `PATH`. | [Using environment and shell variables](/computing-skills/command-line/cli-interface/shell/variables) |
| Startup Scripts | Control how your shell initializes with startup files like `.bashrc`, `.bash_profile` or `.zshrc`. Settings defined in these scripts are applied automatically to every new shell session by default. | [Shell configuration files](/computing-skills/command-line/cli-interface/shell/customization/bashrc) |


<div id="note-alerts-1" class="highlighted highlighted--highlighted ">
<div class="highlighted__body" markdown="1">
The ability to accept and process arguments is a **key distinction between aliases and functions** in the shell.

| feature     | Alias | Function |
| --          | --    | --       |
| purpose     | Shorten and simplify commands. | Automate and modularize tasks. |
| arguments   | Cannot accept arguments directly. | Can accept and process arguments. |
| complexity  | Simple command substitution. | Can include logic (loops, conditionals). |
| scope       | Used for command shortcuts. | Suitable for more complex operations. |
| persistence | Defined in `.bashrc`, `.zshrc` for reuse. | Also defined in startup scripts for persistence. |
| example definition | `alias ll='ls -la'` | `list_files() {ls -l "$1"}` |
| example usage      | `ll`                | `list_files /home`          |


</div>