---

title: Command history
description: "A record of previously executed commands that allows users to recall, search and reuse past inputs in the CLI."
type: interactive tutorial
order: 3
tags: 
packages: 
level: 
author: Aleksandra Badaczewska

---

# Overview

This interactive tutorial explores command history, a powerful shell feature that allows users to recall, reuse and search previously executed commands. 
By leveraging history navigation and search tools, you can significantly improve efficiency and avoid repetitive typing, especially in HPC environments, 
where executing long and complex commands is common. You will learn how to view, search, and manage command history using built-in shortcuts like Up/Down arrows, 
`Ctrl + R` for reverse search and the `history` command. 
<br>

<div id="info-alerts-1" class="highlighted highlighted--info ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Main Objectives</h4>
* Learn how to navigate and reuse previously entered commands efficiently.
* Explore reverse search (`Ctrl` + `R`) for quickly locating past commands.
* Understand how to manage and configure command history for improved usability.
</div>
</div>

<div id="success-alerts-1" class="highlighted highlighted--success ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Goals</h4>
<p>By the end of this tutorial, you will:</p>
* Use history navigation shortcuts (`↑↓`, `!!`, `!n`, `!string`) to recall commands efficiently.
* Master incremental search (`Ctrl` + `R`) for quickly finding past commands.
* Customize history settings to optimize command recall in HPC workflows.
* Manage and clear history when necessary for privacy and organization.
</div>
</div>


### Tutorial scope

This tutorial provides a hands-on guide to efficiently using command history in the shell. It covers basic history navigation, 
advanced search techniques, and history management, helping users reduce redundant typing and improve workflow efficiency, 
particularly when working with long job submission commands and complex scripts in SCINet HPC environments.
<div class="usa-accordion">

{% include accordion title="Key concepts" class="primary " controls="scope-concepts" %}
<div id="scope-concepts" class="accordion_content" markdown="1">
* **Command history:** A record of previously executed commands that can be recalled and reused.
* **Reverse search:** A shortcut for quickly searching past commands by keyword.
* **History expansion:** Methods for executing previous commands without retyping.
* **Persistent history:** A file storing past commands across sessions.
</div>

{% include accordion title="Tools/Technologies" class="primary " controls="scope-tools" %} 
<div id="scope-tools" class="accordion_content" markdown="1">
* **Bash shell:** A popular shell environment (command interpreter) available on most Unix-like and HPC systems.
* **`history` command:** Displays a list of past commands.
* **Keyboard shortcuts:** `Ctrl + R`, `!!`, `↑↓` for quick recall.
* **Shell configuration files (`.bashrc`):** Shell startup script used to enable and customize autocompletion behavior.
</div>

{% include accordion title="Applications" class="primary " controls="scope-apps" %} 
<div id="scope-apps" class="accordion_content" markdown="1"> 
* **Reusing long commands:** Quickly recall and modify frequently used HPC job submission commands.
* **Efficient troubleshooting:** Retrieve and rerun previous commands instead of manually retyping them. 
* **Enhanced productivity:** Use shortcuts to speed up navigation through command history.
* **History customization:** Adjust history settings for **long-term tracking** of command usage.
</div>
</div>

---


## What is command history?

Command history is a continuous record of previously executed commands that can be browsed, modified and reused for greater efficiency.
This feature minimizes redundant typing, speeds up repetitive tasks and improves troubleshooting by allowing users to quickly access past commands. 
It also aids knowledge retention and serves as a built-in project documentation tool, preserving a trace of analytical steps and computational procedures for future reference.

***Benefits of using command history, particularly in an HPC environment:***

| capabilities | practical advantage |
|-- |-- |
| **Efficiency & Productivity** | Saves time by reusing long data processing commands and automating repetitive workflows. |
| **Troubleshooting & Debugging** | Tracks command evolution, simplifies troubleshooting, and provides context for errors to refine execution. |
| **Error reduction** | Minimizes mistakes by reusing previously tested commands, reducing typos and incorrect execution. |
| **Learning & Optimization** | Reinforces CLI knowledge, accelerates learning, and optimizes command recall with history expansion. |
| **Collaboration & Documentation** | Facilitates knowledge sharing and serves as an implicit record for workflow documentation and reproducibility. |
| **Customization & Adaptability** | Enables history customization in `~/.bashrc` (e.g., `HISTIGNORE`, `HISTSIZE`) for tailored usability. |
| **Long-term usability** | Ensures history persistence across sessions and enhances multi-terminal productivity by synchronizing command history. |


### Access past commands: `history`

Most Unix-like shells, including Bash, keep a history of past commands. You can access them with a command:
```bash
history
```
*This displays a numbered list of previous commands, with the most recent ones at the bottom.*
![history command](../../assets/img/history_command.png)

To explore this output, you can scroll up the page. If the list is long, limit the output to show only the last `N=20` commands:
```bash
history 20
```

<div id="info-alerts-1" class="highlighted highlighted--note ">
<div class="highlighted__body"  markdown="1">
1. The `history` command shows the in-shell record of **commands stored in memory for the current session**, 
which may not yet be **written to the [persistent `~/.bash_history` file]()** until the session ends or is manually updated.
2. Each entry consists of a **history index number** followed by the actual command, 
with the most recent ones appearing at the bottom of the list. 
3. The index numbers in history serve as unique references, allowing [direct retrieval and execution]() of specific commands. 
4. Due to the default limit on stored commands, **older entries are automatically removed** to make space for newer ones, 
though this limit can be adjusted to maintain an [unlimited history]().
</div></div>


### Navigate history with keyboard

Besides using `history` command to display the entire command history or showing a specific number of recent entries, 
you can also **browse past commands one at a time** using keyboard shortcuts. 
This method is useful when searching for a recent command without overwhelming output.

* Press `↑` (Up Arrow) to go to the previous command.
* Press `↓` (Down Arrow) to move forward in history.

<div id="info-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body"  markdown="1">
For faster navigation and editing, when working with long or multi-line commands:
* `Ctrl + A` moves the cursor to the beginning of the line.
* `Ctrl + E` moves the cursor to the end of the line.
</div></div>


## Recall commands using expansion

History expansion allows you to quickly reuse previously executed commands without retyping them. 
This feature is especially useful in HPC environments, where commands for job submissions, file management or on-the-fly data processing 
are often repetitive and long. Instead of [scrolling through history](#navigate-history-with-keyboard) and [manually copying commands](#access-past-commands-history) you can execute them directly using shortcuts.

<div id="info-alerts-1" class="highlighted highlighted--note ">
<div class="highlighted__body"  markdown="1">
**History expansion** allows you to **retrieve and execute previous commands using their index numbers** from the history list, so you first need to check the command's index with `history` or `history | grep "keyword"` before referencing it with `!<index>` (absolute) or `!-<index>` (relative) syntax.
<br><br>
*This approach becomes especially useful when you naturally remember the index of a frequently used command over time, allowing you to quickly rerun it without searching through history, saving time and effort.*
</div></div>

<div id="info-alerts-1" class="highlighted highlighted--warning ">
<div class="highlighted__body"  markdown="1">
Be cautious when running history expansion commands (`!!`, `!n`, `!-n`) as they execute immediately without confirmation. 
Use the preview option (`:p`) if unsure about a command's content before running it.
</div></div>


### *Always Preview before running*

Each command in history has an [index number](#access-past-commands-history), which allows you to reference and execute it directly.
To preview a command from history at a specific index before executing it, append `:p` *(print)* to the `!<index>` expansion command. 
This prevents accidental execution, allowing you to verify its content.

```bash
!100:p
```
*This prints command #100 from history instead of running it.*
![history preview command](../../assets/img/history_preview_command.png)


### *Repeat last command: `!!`*

The `!!` shortcut executes the most recent command from history. <br>
This is useful when retrying a failed command or quickly re-running previous operations.

```bash
!!
```
*This runs the latest command again.*
![history repeat last command](../../assets/img/history_repeat_last.png)


### *Run command by* ***relative index***

You can **execute a previously used command based on its position relative to the most recent one**. 
This approach is useful when you know how many steps back a command was run but don't need to check its exact history index. 
It provides a quick way to recall recent commands without listing the full history. 

```bash
!-3
```
*This executes the command that was run three steps ago.*

<div id="info-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body"  markdown="1">
This is useful when you know exactly how many steps ago a command was executed, allowing you to recall it directly using relative history expansion.
</div></div>


### *Run command by* ***absolute index***

Once you know the **exact history index of a command**, you can retrieve and execute it in a single step using the `!<index>` expansion. 
This method is useful when recalling a specific command from history, especially for frequently used or complex commands.
```bash
!100
```
*This runs command #100 from the history list.*

<div id="info-alerts-1" class="highlighted highlighted--warning ">
<div class="highlighted__body"  markdown="1">
Ensure you [check the command before execution](#preview-a-command-before-execution) to avoid running unintended or outdated commands. 
In this case, use `!100:p` to preview before running.
</div></div>


## **Search command history**

When working in the terminal, manually scrolling through past commands can be inefficient, 
especially in HPC environments where the number of entered commands is large and repetitive. 
Instead of [cycling through history one command at a time](#navigate-history-with-keyboard), you can **quickly locate and reuse specific commands using search techniques**. The shell provides powerful tools like [incremental search](#incremental-search-ctrl--r) and [filtering with `grep`](#filter-history-with-grep) 
to find past commands based on keywords, saving time and reducing repetitive typing.

### *Incremental search: `Ctrl + R`*

<div id="info-alerts-1" class="highlighted highlighted--note ">
<div class="highlighted__body"  markdown="1">
Incremental search allows you to **dynamically search through your command history as you type**, refining results with each keystroke. 
This is particularly useful in HPC environments where job submission or data processing commands are frequently reused.
</div></div>

Press `Ctrl + R` and start typing part of a previous command, e.g., `sbatch`. <br>
The shell will dynamically display the most recent matching command:
```bash
# (reverse-i-search)`sbatch': sbatch job_script.sh
```
* Press `Enter` to execute the command immediately.
* Press `→` (Right Arrow) to move the command to the prompt for editing before execution.
    * Press `Ctrl + A` to move the cursor to the beginning of the command.
    * press `Ctrl + E` to move the cursor to the end of the command.
* Press `Ctrl + R` again to cycle through older matches.
* Press `Ctrl + G` to exit the search without selecting a command.

![history search](../../assets/img/history_search.gif)

<div id="info-alerts-1" class="highlighted highlighted--warning ">
<div class="highlighted__body"  markdown="1">
Be cautious when executing history commands directly, especially destructive ones (e.g.,`rm -rf *`). <br>
Always review before hitting `Enter`.
</div></div>

### *Filter history with `grep`*

Instead of [manually scrolling](#navigate-history-with-keyboard) through history or using [incremental search](#incremental-search-ctrl--r), 
you can filter past commands using `grep` to quickly locate specific entries. 
This method is useful when you need to **find all occurrences of a particular command**, option or keyword.

*For example,* to find a past SLURM job submission command without entering search mode, run:
```bash
history | grep sbatch
```
*This will list all previously executed commands that contain `sbatch`.*
![history grep commands](../../assets/img/history_grep_commands.png)

<div id="info-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body"  markdown="1">
If you frequently use specific commands, consider [creating an alias](/computing-skills/command-line/cli-interface/shell/customization/aliases) in 
[your startup configuration file `~/.bashrc`](/computing-skills/command-line/cli-interface/shell/customization/bashrc) 
for quicker access and to avoid repetitive typing. *(links redirect to the corresponding tutorials)*
</div></div>


## Managing and clearing history

The shell automatically stores command history in the `~/.bash_history` file, allowing users to recall past commands across sessions. 
However, there are times when you may want to edit, clear or temporarily disable history, for example, to remove sensitive commands, declutter your history or prevent logging of specific actions. The following techniques help manage history effectively based on different use cases.


### Edit `.bash_history` file

The `~/.bash_history` file stores past commands even after you log out. 
If you need to manually remove or modify specific entries (e.g., clearing sensitive commands like passwords or API keys), you can edit the file directly.

To edit history records manually, use text editor:
```bash
nano ~/.bash_history
```
*Make the necessary changes, then save by pressing `Ctrl + X`, then `Y`, then `Enter` to exit.*

<div id="info-alerts-1" class="highlighted highlighted--highlighted ">
<div class="highlighted__body"  markdown="1">
Editing the history file won't take effect immediately in the current session. To reload the modified history, run:
```bash
history -r
```
</div></div>

### Clear history

If you want to remove your command history, either for privacy reasons or to clear unnecessary clutter, use the following commands based on your needs.

To remove the history for the current session:
```bash
history -c
```
*This clears history only for the current shell session, but past commands will still be saved in `~/.bash_history` when you log out.*

<div id="info-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body"  markdown="1">
Useful when testing commands or executing temporary operations you don’t want recorded in the session history.
</div></div>

To disable history temporarily:
```bash
unset HISTFILE
```
*This prevents the shell from saving history for the current session, meaning no commands will be written to `~/.bash_history`. However, history will return to normal when you start a new session.*

<div id="info-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body"  markdown="1">
Helpful when running sensitive commands that shouldn’t be stored, such as handling credentials, accessing restricted files or performing security-related tasks.
</div></div>


## Customizing history behavior

You can modify history behavior by setting variables in `~/.bashrc` *(shell startp script)*:

### Configure history size

Control how many commands are stored:
```bash
export HISTSIZE=1000        # Number of commands in memory
export HISTFILESIZE=2000    # Number of commands in the history file
```

### Ignore duplicated entries

To prevent duplicate history entries:
```bash
export HISTCONTROL=ignoredups
```

### Ignore specific commands

To ignore commands like `ls` and `pwd`:
```bash
export HISTIGNORE="ls:pwd:clear"
```

### Append instead of overwriting history

Ensure that history from multiple sessions is merged rather than overwritten:
```bash
shopt -s histappend
```

### Make updates immediate

By default, history updates when you exit a session. To write commands instantly:
```bash
export PROMPT_COMMAND='history -a'
```

### Multi-session history synchronization

When using multiple terminals, synchronize history across them:
```bash
export HISTCONTROL=ignoreboth
export PROMPT_COMMAND="history -a; history -n"
```

### Export history to share

For collaborative work, you can share your history:
```bash
history > my_hpc_commands.txt
```

And reload it in another session:
```bash
cat my_hpc_commands.txt >> ~/.bash_history
```

