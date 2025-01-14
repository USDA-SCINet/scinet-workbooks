---

title: Shell customization with text coloring and prompt styling
description: "(Page description here)"
type: interactive tutorial
order: 3
tags: [UNIX, ANSI codes, prompt styling, CLI text coloring, shell customization]
packages: 
level: 
author: Aleksandra Badaczewska

---

## Overview

This interactive tutorial focuses on teaching you how to customize your shell for improved clarity, productivity and aesthetics by mastering text coloring and prompt styling. Through practical examples and hands-on exercises, you will learn how to modify your shell prompt (`PS1`), apply ANSI color codes for dynamic output styling and create visually engaging terminal environments tailored to your needs. The tutorial is designed for both beginners and intermediate users working with Bash, Zsh and similar Unix shells, specifically on SCINet HPC clusters.
<br>

<div id="info-alerts-1" class="highlighted highlighted--info ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Main Objectives</h4>
* Understand how ANSI escape codes work and how they can be used for text styling in the shell.
* Learn to modify the shell prompt (`PS1`) to display helpful information, including dynamic content.
* Gain practical skills for colorizing terminal output, such as enhancing `ls` and `grep` readability.
* Persist your customizations across sessions and ensure compatibility with different shells.
</div>
</div>

<div id="success-alerts-1" class="highlighted highlighted--success ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Goals</h4>
<p>By the end of this tutorial, you will:</p>
* Acquire knowledge of how to apply ANSI escape codes for effective text coloring in **Bash and Zsh shells**.
* Develop confidence in customizing the `PS1` prompt for improved usability on SCINet clusters.
* Learn how to save your configurations permanently in `.bashrc` or `.zshrc`.
* Understand how to troubleshoot common issues when working with shell customizations.
</div>
</div>


### Tutorial scope

This tutorial offers a comprehensive, hands-on guide to customizing shell environments using text coloring and prompt styling techniques. The focus is on practical, real-world applications of shell customization, including persistent configurations and troubleshooting for productivity and improved convenience on SCINet computing clusters.

<div class="usa-accordion">

{% include accordion title="Key concepts" class="primary " controls="scope-concepts" %}
<div id="scope-concepts" class="accordion_content" markdown="1">
* **ANSI escape codes:** Special sequences used in the terminal to control text appearance (color, bold, underline).
* **Shell prompt (PS1):** A customizable string displayed in the terminal, commonly showing the user, hostname and current directory.
* **CLI text styling:** Adjusting terminal text with colors, effects (like bold or underline), and symbols to highlight important information.
* **Prompt Customization:** Modifying `PS1` to create a visually engaging and functional shell prompt.
* **Variable Persistence:** Techniques for storing customizations across sessions using configuration files like `.bashrc` and `.zshrc`.
</div>

{% include accordion title="Tools/Technologies" class="primary " controls="scope-tools" %} 
<div id="scope-tools" class="accordion_content" markdown="1">
* **Bash shell:** A popular shell environment (command interpreter) available on most Unix-like and HPC systems.
* **Configuration file:** Text file like `.bashrc` or `.bash_profile` that define environment variables and other shell settings, including text coloring and prompt styles.
</div>

{% include accordion title="Applications" class="primary " controls="scope-apps" %} 
<div id="scope-apps" class="accordion_content" markdown="1">    
* **Text styling for readability:** Enhance terminal output with colored text for better visibility of errors, warnings, and key results.
* **Prompt customization for productivity:** Design a dynamic shell prompt that displays essential details like the current working directory, username and Git branch.
* **Persistent customization:** Apply long-term shell modifications by editing shell configuration files.
* **Troubleshooting in shell setups:** Identify and fix issues like broken prompts, incorrect ANSI sequences and compatibility errors.
</div>
</div>


----

## Shell customization

<div id="note-alerts-1" class="highlighted highlighted--note ">
<div class="highlighted__body" markdown="1">
Shell customization is essential for improving productivity, clarity and efficiency, especially in HPC environments where working with complex data sets, multiple jobs and parallel tasks is common. <br>*A well-configured shell helps you:* <br>
**✓  Enhance Readability** <br>&emsp;  *Differentiate between standard output, errors and informational messages with text colors.* <br>
**✓  Streamline Workflow** <br>&emsp;  *Display essential information (e.g., current directory, active job status) directly in the prompt.* <br>
**✓  Increase Efficiency** <br>&emsp;  *Reduce the need for repetitive commands by adding dynamic elements like Git status or cluster information.* <br>
**✓  Prevent Errors** <br>&emsp;  *Highlight critical elements such as error messages and warnings in contrasting colors for quick identification.*
</div>
</div>

### Prerequisites 
<div class="usa-accordion">

{% include accordion title="Pre-setup for shell customization on SCINet HPC" class="warning " controls="launch-shell-1" %}
<div id="launch-shell-1" class="accordion_content" markdown="1">
1. **Access a Unix-based terminal on Atlas or Ceres using:**
  - SCINet OOD: [Web-based access to HPC CLI](/computing-skills/command-line/cli-interface/concepts/cli-scinet-hpc#web-based-access-to-hpc-cli)
  - SCINet SSH: [Command-line access to HPC CLI](/computing-skills/command-line/cli-interface/concepts/cli-scinet-hpc#command-line-access-to-hpc-cli)
<br>
2. **Identify the default Shell on a cluster:**
```bash
echo $SHELL
```
*On Atlas and Ceres, the default shell is typically Bash (`/bin/bash`).*
<br>
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

***What can be customized in a Shell appearance?***

| feature | description | quick navigation |
| --      | --          | --               |
| **Prompt** | Modify the shell prompt to display dynamic information like the current directory, user and active Git branches. Add colors and symbols for better visibility. | [Prompt styling basics](#prompt-styling-basics) |
| **CLI text coloring** | Apply ANSI escape codes to style terminal text. Highlight important information such as errors and warnings. | [Terminal text colorig](#text-coloring-for-shell-output) |

Beyond text coloring and prompt styling, you can also customize other shell components:

| feature | description | tutorial |
| --      | --          | --       |
| Command Aliases | Create shortcuts for frequently used commands (e.g., `alias ll='ls -la'`). | []() |
| Shell History | Modify history size and learn how to efficiently browse and search command history.. | [Command history](/computing-skills/command-line/cli-interface/shell/commands/history) |
| Auto-completion | Enable and configure auto-completion for commands and filenames, reducing typing errors and speeding up command execution. | [Command autocompletion](/computing-skills/command-line/cli-interface/shell/commands/autocompletion) |
| Environment Variables | Adjust the behavior of commands and tools by setting variables like `PATH` and `EDITOR`. | [Using environment and shell variables](/computing-skills/command-line/cli-interface/shell/variables) |
| Startup Scripts | Control how your shell initializes with startup files like `.bashrc`, `.bash_profile`, and `.zshrc`. | []() |


## **Prompt styling basics**

<div id="note-alerts-1" class="highlighted highlighted--note ">
<div class="highlighted__body" markdown="1">
The shell prompt is the text that appears before you type a command in the terminal. It updates dynamically with user actions, such as changing directories. Personalizing it allows you to display helpful system information directly to improve clarity and usability, especially in complex computing environments like HPC clusters.
![default_prompt](../assets/img/default_prompt.png)
</div>
</div>

**Prompt Structure**

The shell prompt is a string displayed in the terminal before the cursor where you type commands. Its behavior and appearance are controlled by the `PS1` (Prompt String 1) **variable** in most Unix shells like Bash and Zsh.
```
[alex.badacz@atlas-login-1 ~]$
[username@hostname workdir]$
```
The default shell prompt typically displays:
- **Username:** To indicate the current user logged in.
- **Hostname:** Identifying the system or server.
- **Current working directory:** The directory where commands will be executed.
- **Prompt symbol:** `$` for a regular user and `#` for the root user.


**Prompt Elements**

| Element | Description | Example output |
| --      | --          | --             |
| `\u`    | Username    | john |
| `\h`    | Hostname (system name) | compute-node1 |
| `\w`    | Current working directory (full path) | /home/john |
| `\W`    | Current working directory (basename only) | john   |
| `\t` or `\T` | Current time in HH:MM:SS format | 14:35:22 |
| `\$`    | Display `$` for normal users and `#` for root | $ or # |

**Prompt Colors**

You can modify text colors and effects in the prompt using **ANSI escape codes**. These codes use the `\e` (escape) character, followed by a color code.

| Escape code | Effect     | Example use |
| --          | --         | --          |
| `\e[31m`    | Red text   | `\e[31mError!` |
| `\e[32m`    | Green text | `\e[32mSuccess!` |
| `\e[1m`     | Bold text  | `\e[1mImportant!` |
| `\e[0m`     | Reset (clears all styling) | `\e[0m` *(back to normal)* |

**Example:**
```bash
PS1="\e[32m\u@\h:\w\$ \e[0m"
```
*Output: Green username, hostname, and working directory, with a default `$` prompt.*

- Variables (\u for username, \w for current directory).
- Escape Sequences (\e[32m for green text).
- Multiline prompts and dynamic content.

### PS1 customization

`PS1` (Prompt String 1) is the primary shell prompt variable that defines how the prompt appears in interactive shell sessions.

Customizing PS1:
- Improve visibility and readability.
- Display essential information like time, username, and working directory.
- Add visual separation between commands and results.

#### Creating a basic custom Prompt

You can set a basic, colorful prompt by directly modifying the `PS1` variable in the terminal.
```bash
PS1="\e[34m[\u@\h:\w]\$ \e[0m"
```
*Output: Blue username and working directory, with a default `$` sign for standard user, `#` for root.*

Exercise: 
- Display time, user and working directory with colors.

#### Make customized PS1 permanent

To save prompt customization, add the `PS1` definition to your `~/.bashrc` or `~/.zshrc` file.

### Advanced prompt customization

#### Incorporating Git integration

You can display the current Git branch and its status directly in your prompt for development efficiency.
```bash
PS1='\u@\h:\w $(git branch 2>/dev/null | grep "*" | sed "s/* //")\$ '
```
*Output: Shows the current branch when inside a Git repository.*

#### Adding emojis and symbols

You can use Unicode symbols for better visibility and emojis to make the prompt visually engaging.
```bash
PS1="\u@\h:\w 🔥 \$ "
```
*Output: john@server:/home/john 🔥 $*

#### Making the Prompt dynamic
- Changing the prompt based on exit codes.

Exercise:
- Create a Fully Customized Prompt showing username, working directory, git status and last command exit code with colors.

