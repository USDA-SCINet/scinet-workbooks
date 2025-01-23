---

title: "Prompt styling: <code>PS1</code> variable"
description: "Adjusting the shell prompt appearance to display dynamic information such as the user, working directory and more."
type: interactive tutorial
order: 1
tags: [UNIX, ANSI codes, prompt styling, prompt coloring, PS1, shell customization, bashrc]
packages: 
level:
author: Aleksandra Badaczewska

---

## Overview

This interactive tutorial focuses on enhancing your shell experience by mastering prompt customization for improved clarity, productivity, and aesthetics. Through practical examples and hands-on exercises, you will learn how to modify your shell prompt (PS1) to display dynamic information such as the user, working directory and custom variables. The tutorial also covers syntax for adding colors to your prompt using ANSI escape codes. It is designed for both beginners and intermediate users working with Bash, Zsh and similar Unix shells, specifically on SCINet HPC clusters.
<br>

<div id="info-alerts-1" class="highlighted highlighted--info ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Main Objectives</h4>
* Learn to modify the shell prompt (`PS1`) to display helpful information, including dynamic content.
* Develop practical skills to colorize your shell prompt and make it more informative.
* Persist your customizations across sessions and ensure compatibility with different shells.
</div>
</div>

<div id="success-alerts-1" class="highlighted highlighted--success ">
<div class="highlighted__body"  markdown="1">
<h4 class="highlighted__heading">Goals</h4>
<p>By the end of this tutorial, you will:</p>
* Develop confidence in customizing the `PS1` prompt for improved usability on SCINet clusters.
* Learn how to save your configurations permanently in `.bashrc` or `.zshrc`.
* Understand how to troubleshoot common issues when working with shell prompt customizations.
</div>
</div>


### Tutorial scope

This tutorial offers a comprehensive, hands-on guide to customizing shell environments using prompt coloring and styling techniques. The focus is on practical, real-world applications of PS1 variable customization, including persistent configurations and troubleshooting for productivity and improved convenience on SCINet computing clusters.

<div class="usa-accordion">

{% include accordion title="Key concepts" class="primary " controls="scope-concepts" %}
<div id="scope-concepts" class="accordion_content" markdown="1">
* **ANSI escape codes:** Special sequences used in the terminal to control text appearance (color, bold, underline).
* **Shell prompt (PS1):** A customizable string displayed in the terminal, commonly showing the user, hostname and current directory.
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
* **Prompt customization for productivity:** Design a dynamic shell prompt that displays essential details like the current working directory, username and Git branch.
* **Persistent customization:** Apply long-term shell modifications by editing shell configuration files.
* **Troubleshooting in shell setups:** Identify and fix issues like broken prompts or incorrect ANSI sequences.
</div>
</div>

### Prerequisites 

[Pre-setup for shell customization on SCINet HPC](/computing-skills/command-line/cli-interface/shell/customization/index#prerequisites)

----

## **Prompt styling basics**

<div id="note-alerts-1" class="highlighted highlighted--note ">
<div class="highlighted__body" markdown="1">
The shell prompt is the text that appears before you type a command in the terminal. It updates dynamically with user actions, such as changing directories. Personalizing it allows you to display helpful system information directly to improve clarity and usability, especially in advanced computing environments like HPC clusters.
![default_prompt](../assets/img/default_prompt.png)
</div>
</div>

### *Prompt Structure*

The shell prompt is a string displayed in the terminal before the cursor where you type commands. Its behavior and appearance are controlled by the **PS1 variable** *(Prompt String 1)* in most Unix shells like Bash and Zsh. This variable is composed of **colored elements that dynamically update with information** like the `username`, `hostname` and `current directory`, using a combination of placeholders and ANSI escape codes for customization.
```
[alex.badacz@atlas-login-1 ~]$
[username@hostname workdir]$
```
The default shell prompt typically displays:
- **Username:** To indicate the current user logged in.
- **Hostname:** Identifying the system or server.
- **Current working directory:** The directory where commands will be executed.
- **Prompt symbol:** `$` for a regular user and `#` for the root user.

### *Prompt Elements*

Prompt elements are placeholders that dynamically display useful system information, such as the username, hostname, current directory and time, helping users to **customize the prompt for better context and usability**. A few predefined shortcuts, prefixed with a backslash (`\`), provide a quick way to insert these elements, making it easier to personalize the prompt efficiently. These elements can be further organized using separators, such as colons (`:`) and spaces, to improve readability, while the prompt marker, such as `$` for regular users and `#` for root, serves as a starting point for entering commands.

**Dynamic Placeholders**

| Element | Description | Example output |
| --      | --          | --             |
| `\u`    | Username    | `alex.badacz` |
| `\h`    | Hostname (system name) | `atlas-login-1` |
| `\H`  	| Full hostname (including domain) | `atlas-login-2.hpc.msstate.edu` |
| `\w`    | Current working directory (full path) | `/home/alex.badacz` |
| `\W`    | Current working directory (basename only) | `alex.badacz` or `~` |
| `\t`    | Current time in HH:MM:SS format (24-hour) | `14:35:22` |
| `\T`    | Current time in HH:MM:SS format (12-hour) | `02:35:22` |
| `\d`    | Current date in Weekday Month Date format	| `Mon Jan 15` |
| `\j`    | Number of jobs currently managed by the shell | `3` |
| `\l`    | Current terminal device (tty) | `pts/0` |
| `\n`    | Newline (starts a new line in the prompt) | (New line) |
| `\s`    | Name of the shell | `bash` |
| `\v`    | Version of the shell | `5.1.8` |
| `\V`    | Detailed version of the shell | `5.1.8(1)-release` |
| `\!`    | Command history number | `123` |
| `\#`    | Command number in the current session | `45` |
| `\$`    | Typical prompt marker; shows `$` for normal users and `#` for root | `$` or `#` |
| `\\`    | Backslash character `\` | `\` |

**Separators and Markers**

| Element | Description | Example output |
| --      | --          | --             |
| `@`     | Typically used as a separator between user and hostname, e.g., `\u@\h`         | `alex.badacz@atlas-login-1` |
| `:`     | Typically used as a separator between hostname and workdir path, e.g., `\h:\W` | `atlas-login-1:~`
| space   | A white character, such as a space or tab, is used as an element separator to enhance readability, e.g., `\d \u` | `16:33:09 alex.badacz` |
| `[` `]` | Brackets are used for enhanced clarity and visibility, e.g., `[\d] \u`       | `[16:33:09] alex.badacz` |


<div id="note-alerts-1" class="highlighted highlighted--highlighted ">
<div class="highlighted__body" markdown="1">
The `\$` is used instead of `$` because the dollar sign has a special meaning in the shell, representing variables and commands, 
so escaping it (`\$`) ensures it is displayed literally in the prompt, whereas `@` does not have special meaning 
and can be used directly as a separator.
</div>
</div>

### *Prompt Variable:* `PS1`

Prompt behavior and appearance are controlled by the *Prompt String 1*, i.e., the `PS1` **shell variable**, in most Unix shells like Bash and Zsh. 
It is defined like any other [shell variable](/computing-skills/command-line/cli-interface/shell/variables), with a string value assigned to the variable name. 
This string is composed of placeholders that represent various [prompt elements](#prompt-elements) dynamically updated by the shell.

```
PS1="[\u@\h \W]\$ "
```
*This will display the prompt in the format explained above, i.e.,* `[username@hostname workdir]$ ` *for example:*
```
[alex.badacz@atlas-login-1 ~]$ 
```
*This is a typical default mono-color prompt found on many computing machines, including HPC systems.*

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
Users can [personalize PS1](#ps1-customization) to better suit their needs by modifying its appearance: adjusting the text content, elements order and adding colors.
</div>
</div>

### *Prompt Colors & Effects*

You can modify text colors and effects in the prompt using [**ANSI escape codes** *(see full list)*](#ansi-escape-codes). These codes use the `\e` (escape) character, followed by a color code. Text placed immediately after an ANSI escape code will take on the desired color or effect, and the sequence should always be terminated with the reset code (`\e[0m`) to revert to normal formatting. 

*You can test ANSI color codes followed by custom text in the terminal using the `echo -e` command (with single quotes `''`) before applying them to your custom `PS1` prompt configuration.*

| Escape code | Effect     | Example syntax      | Code for testing in a terminal | 
| --          | --         | --                | --           |
| `\e[31m`    | <span style="color: red;">Red text</span>   | `\e[31mError!`    | `echo -e '\e[31mError!\e[0m'` |
| `\e[32m`    | <span style="color: green;">Green text</span> | `\e[32mSuccess!`  | `echo -e '\e[32mSuccess!\e[0m'` |
| `\e[1m`     | **Bold text**  | `\e[1mImportant!` | `echo -e '\e[1mImportant!\e[0m'` |
| `\e[0m`     | Reset (clears all styling) | `\e[0m` *(back to normal)* | - |

![ansi-simple-examples](../assets/img/ansi-simple-examples.png)

**Example of single-colored PS1:**
```bash
PS1="\e[32m\u@\h:\w\$ \e[0m"
```
- placeholders: `\u` for username, `\h` for hostname and `\w` for current directory
- ANSI escape sequences `\e[32m` for green text and `\e[0m` to resets text formatting at the end of the prmpt syntax

*Output: Green prompt string including username, hostname and working directory, with a default `$` prompt marker.*
![green-prompt-example](../assets/img/green-prompt-example.png)

<div id="note-alerts-1" class="highlighted highlighted--highlighted ">
<div class="highlighted__body" markdown="1">
Inserting escape codes start formatting from the point they appear and continue until they are explicitly reset using the reset code (`\e[0m`). 
Each escape code applies a specific color or style to the text that follows, and without resetting, the effect persists across the entire prompt 
or command output.
```
PS1="\e[32m\u@\h:\w\$ "     # missing \e[0m at the end of the syntax
```
![ps1_missing_reset_code](../assets/img/ps1_missing_reset_code.png)
</div>
</div>

**Example of multi-colored PS1:**
```bash
PS1="\e[32m\u\e[0m@\e[34m\h\e[0m:\e[33m\w\e[0m\$ "
```
To analyze this PS1 setting, start by splitting the syntax at every `\e[0m`, which will reveal the number of sections with different colors:

| syntax    | **\e[32m\u\e[0m**  | **@** | **\e[34m\h\e[0m** | **:** | **\e[33m\w\e[0m**  | **\$**  |
| --        | --                 | --  | --                  | --    | --                 | --      |
| ANSI code | `\e[32m` , `\e[0m` | -   | `\e[34m` , `\e[0m`  | -     | `\e[33m` , `\e[0m` | -       |
| dynamic element | `\u`         | -   | `\h`                | -     | `\w`               | -       |
| formatting    | green username | default @ | blue hostname | default : | yellow workdir | default $ |
| output    | <span style="color:green;">alex.badacz</span> | @ | <span style="color:blue;">atlas-login-2</span> | : | <span style="color:yellow; background-color:black;"> ~ </span> | $ |

Then, within each section, identify the [ANSI color code](#ansi-escape-codes) (e.g., `\e[32m` for green), 
followed by the [placeholder](#prompt-elements) (e.g., `\u` for username), and any literal characters (`@ :`) that separate elements.

![ps1_multicolor](../assets/img/ps1_multicolor.png)


### **PS1 customization**

`PS1` (Prompt String 1) is the primary shell prompt variable that defines how the prompt appears in interactive shell sessions.

Here are some key reasons for customizing the PS1 prompt:
- **Enhanced Readability:** Organize prompt elements to make it easier to read and distinguish information at a glance.
- **Increased Productivity:** Quickly access relevant details such as the current directory, username or system time.
- **Error Prevention:** Clearly indicate important information such as root privileges to avoid accidental destructive commands.
- **Context Awareness:** Differentiate between environments by customizing prompt colors or markers.
- **Personalization:** Tailor the prompt's appearance with colors and symbols to reflect personal preferences and workflow style.

<div class="usa-accordion">
<h4>Examples of practical applications</h4>

{% include accordion title="Display useful dynamic information ::: (hostname, workdir, date and time)" class="outline" controls="ps1-custom-1" %}
<div id="ps1-custom-1" class="accordion_content" markdown="1">

Learn [built-in placeholders](#prompt-elements) to include essential elements:
* user, hostname and absolute path to a workdir:
```bash
PS1="\u@\h:\w\$ "             # alex.badacz@atlas-login-2:~/geo_data$
```
* simplify to a basename of a workdir: 
```bash
PS1="\u:\W\$ "                # alex.badacz:geo_data$
```
* add date and time:
```bash
PS1="\d \t @\h\$ "            # Tue Jan 21 13:51:39 @atlas-login-2$
```
*(OUTPUT: basic, colorless prompt built with various elements)*
![basic_prompt_examples](../assets/img/basic_prompt_example.png)

</div>

{% include accordion title="Improve visibility and readability ::: (arrange elements, add separators, symbols and emojis)" class="outline" controls="ps1-custom-2" %}
<div id="ps1-custom-2" class="accordion_content" markdown="1">

The PS1 variable can include custom text to enhance readability and organization. Enhance your prompt by rearranging elements and using separators to improve clarity and ease of use. Also, make your terminal experience more engaging and enjoyable with creative use of colors, icons and symbols.

* use common separators:
  - spaces after the prompt marker (`$`) to separate prompt and command line
  - colons (`:`) to separate elements like the hostname and working directory
  - at (`@`) to separate elements like the user and hostname

```bash
PS1="\u\h\W\$"              # alex.badaczatlas-login-2geo_data$
# compare to:
PS1="\u@\h:\W\$ "           # alex.badacz@atlas-login-2:geo_data$ 
```
*These customizations help create a prompt that is both informative and easy to read.*
![ps1_custom_text](../assets/img/ps1_custom_text.png)

* use visual aids to make your prompt more intuitive:
  - Unicode symbols for better visibility
  - emojis to make the prompt visually engaging

```bash
PS1="\u ⚡ \h ➜ \w \$ "  
PS1="\u@\h:\w 🔥 "
PS1="👨‍💻 @\h 📂 \W \$ "
```
*These customizations improve the user experience by making it easier to quickly locate relevant information.*
![ps1_custom_engaging](../assets/img/ps1_custom_engaging.png)
</div>

{% include accordion title="Personalize the prompt marker ::: (use any symbol or emoji)" class="outline" controls="ps1-custom-3" %}
<div id="ps1-custom-3" class="accordion_content" markdown="1">

Modify the default prompt marker (`$`) by using alternative symbols such as `#`, `>`, `|` or even emojis (⚡ 🔸 🔥 🎯 🛠️) to make the prompt more visually appealing and easier to separate it from the command line.
```bash
PS1="\u: \W > "              # using alterante character as prompt marker >
PS1="\u: \W ⇨ "              # using arrow symbol as prompt marker
PS1="\u: \W 🎯 "             # using emoji as prompt marker
PS1="\u: \W  ✅ "            # using checkmark as prompt marker
```
*Custom prompt markers can personalize your shell and enhance readability or distinguish between different environments.*
![ps1_custom_marker](../assets/img/ps1_custom_marker.png)
</div>

{% include accordion title="Enhance prompt with colors ::: (apply ANSI escape codes to style text)" class="outline" controls="ps1-custom-4" %}
<div id="ps1-custom-4" class="accordion_content" markdown="1">

Add colors to your prompt using [ANSI escape codes](#ansi-escape-codes) to improve visual clarity and organization. Colors can help highlight important elements such as the username, hostname or working directory, making it easier to distinguish between different sections of the prompt. *Learn basics of the prompt syntax coloring in section [Prompt Colors & Effects](#prompt-colors--effects).*
```bash
# Bold red user@host, cyan working directory and a clean > marker.
PS1="\e[1;31m[\u@\h]\e[0m \e[1;36m\w\e[0m > " 

# Username in green, hostname in blue and working directory in yellow.
PS1="\e[32m\u\e[0m@\e[34m\h\e[0m:\e[33m\w\e[0m\$ " 

# Current time in purple, username in light green, hostname in light blue and directory in yellow.
PS1="\e[35m[\t]\e[0m \e[92m\u\e[0m@\e[94m\h\e[0m:\e[93m\W\e[0m\$ "
```
*These color customizations make the prompt visually appealing and help improve efficiency by quickly identifying information.*
![ps1_custom_marker](../assets/img/ps1_custom_colors.png)
</div>

</div>


### Advanced prompt customization

Dynamic prompts can significantly enhance your workflow by providing immediate feedback based on your actions. 

<div id="note-alerts-1" class="highlighted highlighted--tip ">
<div class="highlighted__body" markdown="1">
In the PS1 definition, the use of `$VAR` and `$()` allows for dynamically inserting the current value 
of shell variables and the result of evaluated commands, respectively. The `$VAR` syntax directly substitutes the current value 
of an environment or shell variable, while `$()` executes a command and inserts its output into the prompt each time a new command line is displayed. 
Commands can be invoked directly using standard Bash syntax, pre-defined aliases or conditional statements to customize the prompt based on specific conditions.
</div>
</div>

<div class="usa-accordion">

{% include accordion title="Display built-in or custom shell variables" class="outline" controls="ps1-advanced-1" %}
<div id="ps1-advanced-1" class="accordion_content" markdown="1">

For example, show details about HPC environment, such as $CLUSTER (system-wide) or $SLURM_JOB_ID (on a compute node).
```bash
PS1='[$CLUSTER] \u:\W\$ '                     # [atlas] alex.badacz:DSW_tutorials$
PS1='[Job: $SLURM_JOB_ID] \u:\W\$ '           # [Job: 16786549] alex.badacz:DSW_tutorials$
```
![ps1_shell_variable](../assets/img/ps1_shell_variable.p)
</div>

{% include accordion title="Display custom aliases, like the number of active jobs in the queue" class="outline" controls="ps1-advanced-2" %}
<div id="ps1-advanced-2" class="accordion_content" markdown="1">

For example, show the number of your HPC jobs.
```bash
# define custom alias
alias jobcount='squeue -u $USER --noheader | wc -l'
# use alias in your PS1 variable
PS1="[\$(jobcount) jobs] \u@\h:\W$ "
```
*This prompt displays the number of your jobs in a queue dynamically.*
![ps1_alias_job_counter](../assets/img/ps1_alias_job_counter.png)
</div>

{% include accordion title="Display Git status indicators" class="outline" controls="ps1-advanced-3" %}
<div id="ps1-advanced-3" class="accordion_content" markdown="1">

You can display the current Git branch and its status directly in your prompt for development efficiency.
```bash
PS1='\u@\h:\W $(git branch 2>/dev/null | grep "*" | sed "s/* //")\$ '
```
*This prompt shows the current branch when inside a Git repository.*
![ps1_git_branch](../assets/img/ps1_git_branch.png)
</div>

{% include accordion title="Indicate failed commands using exit codes" class="outline" controls="ps1-advanced-4" %}
<div id="ps1-advanced-4" class="accordion_content" markdown="1">

One common customization is changing the prompt based on the exit status of the last executed command. 
This allows you to quickly identify whether the previous command succeeded or failed.
```bash
PS1='$(if [ $? -eq 0 ]; then echo "✔"; else echo "✖"; fi) \u@\h:\W\$ '
```
***Explanation:***
- The `$(...)` syntax executes a command substitution each time the prompt is displayed.
- The `if` statement checks the exit status of the last command (`$?`).
- If the exit status is `0`, a checkmark (✔) is displayed.
- If the exit status is non-zero, a cross (✖) is displayed.
- This indicator is followed by the standard `username@hostname:current_directory$` prompt.

*This PS1 variable display a different color indicator depending on whether the last command was successful (exit code 0) or failed (non-zero exit code).*
![ps1_exit_code](../assets/img/ps1_exit_code.png)
</div>

</div>

## Persisting shell customizations

* **Immediate Effect:** <br>
Note that changes to the `PS1` variable take effect immediately once reassigned, allowing you to see the updated prompt right away.

* **Persistence with Export:** <br>
Note that using `export PS1="..."` ensures the custom prompt is applied across subshells during the current session.

* **Permanent Customization:** <br>
Note that adding the `PS1` assignment to your `~/.bashrc` file makes the customization permanent, applying it automatically in new shell sessions.

*How to Apply Changes?*
- Sourcing: 
```bash
source ~/.bashrc
```

### Reset PS1 to default

Resetting the default prompt:
```bash
PS1="[\u@\h \W]\$ "
```


## **Troubleshooting common issues**

- Broken prompts after edits.

<div class="usa-accordion">

{% include accordion title="Error: event not found" class="outline" controls="shell-custom-1" %} 
<div id="shell-custom-1" class="accordion_content" markdown="1">    
**SYMPTOMS:** When customizing the shell prompt with ANSI escape codes to add colors, an error message such as `event not found` appears if the customization includes an exclamation mark (`!`), which is commonly used to show command history numbers.
```bash
export PS1="\e[31m[\u@\h \W]!\$\e[0m"
# -bash: !\$: event not found
```
**SOLUTIONS:** <br>
The issue occurs because double quotes (`""`) allow Bash to perform history expansion, interpreting `!` as a special character instead of displaying it literally in the prompt. To prevent this, use single quotes (`''`), which prevent special character interpretation and ensure the prompt displays correctly.
```bash
export PS1='\e[31m[\u@\h \W]!\$\e[0m'
```
*By using single quotes, the `!` character is treated as a literal and will appear in the prompt as intended, avoiding unintended shell behavior.*
</div>

{% include accordion title="Best practices for readability and functionality" class="outline" controls="shell-custom-10" %} 
<div id="shell-custom-10" class="accordion_content" markdown="1">    
- Balance aesthetics and clarity.
- Avoid excessive colors.
</div>
</div>